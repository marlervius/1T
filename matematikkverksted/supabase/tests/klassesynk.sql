-- Run with psql -v ON_ERROR_STOP=1 against an isolated development database after applying the migration.
begin;

insert into auth.users(id, email) values
  ('10000000-0000-4000-8000-000000000001', 'test-a@example.invalid'),
  ('10000000-0000-4000-8000-000000000002', 'test-b@example.invalid'),
  ('10000000-0000-4000-8000-000000000003', 'test-c@example.invalid');
insert into verksted_1t.laerere values
  ('10000000-0000-4000-8000-000000000001'),
  ('10000000-0000-4000-8000-000000000002');

set local role authenticated;
set local request.jwt.claim.sub = '10000000-0000-4000-8000-000000000003';
do $$
begin
  begin
    perform public.verksted_1t_klasser();
    raise exception 'A user outside the allowlist retrieved classes';
  exception when insufficient_privilege then null;
  end;
end;
$$;

set local request.jwt.claim.sub = '10000000-0000-4000-8000-000000000001';
select set_config('verksted_test.klasse', public.verksted_1t_opprett_klasse('Testklasse')::text, true);
select public.verksted_1t_opprett_elev(current_setting('verksted_test.klasse')::uuid, 'Elev A', repeat('a',64));
select public.verksted_1t_opprett_elev(current_setting('verksted_test.klasse')::uuid, 'Elev B', repeat('b',64));
set local request.jwt.claim.sub = '10000000-0000-4000-8000-000000000002';
do $$
declare
  klasse uuid := current_setting('verksted_test.klasse')::uuid;
begin
  assert public.verksted_1t_klasser() = '[]'::jsonb;
  assert public.verksted_1t_elever(klasse) = '[]'::jsonb;
  assert not public.verksted_1t_slett_klasse(klasse);
  begin
    perform public.verksted_1t_opprett_elev(klasse, 'Uvedkommende', repeat('c',64));
    raise exception 'Another teacher added a student';
  exception when insufficient_privilege then null;
  end;
end;
$$;

set local role anon;
set local request.jwt.claim.sub = '';
do $$
declare
  elev text := repeat('a',64);
  rapport jsonb := '[{"id":"grunnlag/1","selvstendig":1,"medStotte":0,"nyeForsok":0,"ulost":0,"varianter":1}]';
begin
  begin
    perform public.verksted_1t_klasser();
    raise exception 'Anonymous client accessed teacher RPC';
  exception when insufficient_privilege then null;
  end;
  assert public.verksted_1t_elevstatus(repeat('f',64)) is null;
  assert public.verksted_1t_elevstatus(elev) = '{"kallenavn":"Elev A","revisjon":0,"sistSynket":null}'::jsonb;
  assert public.verksted_1t_synk(elev, 0, rapport) = 1;
  assert public.verksted_1t_synk(elev, 0, rapport) is null;
  assert public.verksted_1t_elevstatus(repeat('b',64)) ->> 'revisjon' = '0';
  begin
    perform public.verksted_1t_synk(elev, 1, '[{"raw":"privat svar"}]'::jsonb);
    raise exception 'Unrecognised data accepted';
  exception when invalid_parameter_value then null;
  end;
end;
$$;

set local role authenticated;
set local request.jwt.claim.sub = '10000000-0000-4000-8000-000000000001';
do $$
declare
  klasse uuid := current_setting('verksted_test.klasse')::uuid;
  elever jsonb := public.verksted_1t_elever(klasse);
begin
  assert jsonb_array_length(elever) = 2;
  assert elever #>> '{0,ferdigheter,0,id}' = 'grunnlag/1';
  assert not (elever -> 0 ? 'hemmelig_hash');
  assert public.verksted_1t_slett_klasse(klasse);
  assert public.verksted_1t_elevstatus(repeat('a',64)) is null;
  assert public.verksted_1t_elevstatus(repeat('b',64)) is null;
end;
$$;

rollback;
