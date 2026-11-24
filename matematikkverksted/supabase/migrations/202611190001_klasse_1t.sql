begin;
create schema verksted_1t;
revoke all on schema verksted_1t from public, anon, authenticated;

create table verksted_1t.laerere (
  bruker uuid primary key references auth.users(id) on delete cascade
);
create table verksted_1t.klasser (
  id uuid primary key default gen_random_uuid(),
  eier uuid not null references verksted_1t.laerere(bruker) on delete cascade,
  navn text not null check (char_length(navn) between 1 and 60),
  opprettet timestamptz not null default now()
);
create table verksted_1t.elever (
  id uuid primary key default gen_random_uuid(),
  klasse uuid not null references verksted_1t.klasser(id) on delete cascade,
  kallenavn text not null check (char_length(kallenavn) between 1 and 40),
  hemmelig_hash bytea not null unique,
  revisjon integer not null default 0,
  oppsummering jsonb not null default '[]'::jsonb,
  sist_synket timestamptz,
  unique (klasse, kallenavn)
);

alter table verksted_1t.laerere enable row level security;
alter table verksted_1t.klasser enable row level security;
alter table verksted_1t.elever enable row level security;
revoke all on all tables in schema verksted_1t from public, anon, authenticated;

create function public.verksted_1t_klasser() returns jsonb
language plpgsql security definer set search_path = '' as $$
begin
  if not exists (select 1 from verksted_1t.laerere where bruker = auth.uid()) then
    raise exception using errcode = '42501';
  end if;
  return (
    select coalesce(jsonb_agg(jsonb_build_object('id', id, 'navn', navn) order by opprettet), '[]'::jsonb)
    from verksted_1t.klasser where eier = auth.uid()
  );
end;
$$;

create function public.verksted_1t_opprett_klasse(nytt_navn text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  ny_id uuid;
begin
  insert into verksted_1t.klasser(eier, navn) values (auth.uid(), btrim(nytt_navn))
  returning id into ny_id;
  return ny_id;
end;
$$;

create function public.verksted_1t_slett_klasse(klasse_id uuid) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  delete from verksted_1t.klasser where id = klasse_id and eier = auth.uid();
  return found;
end;
$$;

create function public.verksted_1t_elever(klasse_id uuid) returns jsonb
language sql security definer set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'id', e.id, 'kallenavn', e.kallenavn, 'sistSynket', e.sist_synket,
    'ferdigheter', e.oppsummering
  ) order by e.kallenavn), '[]'::jsonb)
  from verksted_1t.elever e join verksted_1t.klasser k on k.id = e.klasse
  where k.id = klasse_id and k.eier = auth.uid()
$$;

create function public.verksted_1t_opprett_elev(klasse_id uuid, nytt_kallenavn text, elevnokkel text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  ny_id uuid;
begin
  if elevnokkel is null or elevnokkel !~ '^[a-f0-9]{64}$' then
    raise exception using errcode = '22023';
  end if;
  insert into verksted_1t.elever(klasse, kallenavn, hemmelig_hash)
  select id, btrim(nytt_kallenavn), sha256(convert_to(elevnokkel, 'UTF8'))
  from verksted_1t.klasser where id = klasse_id and eier = auth.uid()
  returning id into ny_id;
  if ny_id is null then
    raise exception using errcode = '42501';
  end if;
  return ny_id;
end;
$$;

create function public.verksted_1t_slett_elev(klasse_id uuid, elev_id uuid) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  delete from verksted_1t.elever e using verksted_1t.klasser k
  where e.klasse = k.id and k.id = klasse_id and k.eier = auth.uid() and e.id = elev_id;
  return found;
end;
$$;

create function public.verksted_1t_elevstatus(elevnokkel text) returns jsonb
language sql security definer set search_path = '' as $$
  select jsonb_build_object('kallenavn', e.kallenavn, 'revisjon', e.revisjon, 'sistSynket', e.sist_synket)
  from verksted_1t.elever e
  where elevnokkel ~ '^[a-f0-9]{64}$' and e.hemmelig_hash = sha256(convert_to(elevnokkel, 'UTF8'))
$$;

create function public.verksted_1t_synk(elevnokkel text, forventet_revisjon integer, fremdrift jsonb)
returns integer language plpgsql security definer set search_path = '' as $$
declare
  rad jsonb;
  felt text;
  sett text[] := '{}';
  ny_revisjon integer;
begin
  if elevnokkel is null or elevnokkel !~ '^[a-f0-9]{64}$'
     or forventet_revisjon is null or forventet_revisjon < 0
     or jsonb_typeof(fremdrift) is distinct from 'array' then
    raise exception using errcode = '22023';
  end if;
  if jsonb_array_length(fremdrift) > 100 or pg_column_size(fremdrift) > 24000 then
    raise exception using errcode = '22023';
  end if;
  for rad in select value from jsonb_array_elements(fremdrift) loop
    if jsonb_typeof(rad) <> 'object' then
      raise exception using errcode = '22023';
    end if;
    if (select count(*) from jsonb_object_keys(rad)) <> 6
       or jsonb_typeof(rad -> 'id') is distinct from 'string'
       or rad ->> 'id' !~ '^(grunnlag/[1-4]|(algebra|likninger|andregrad|funksjoner|polynomdivisjon|derivasjon|trigonometri|modellering)/[1-3])$'
       or rad ->> 'id' = any(sett) then
      raise exception using errcode = '22023';
    end if;
    sett := array_append(sett, rad ->> 'id');
    foreach felt in array array['selvstendig','medStotte','nyeForsok','ulost','varianter'] loop
      if jsonb_typeof(rad -> felt) is distinct from 'number'
         or rad ->> felt !~ '^(0|[1-9][0-9]{0,5})$' then
        raise exception using errcode = '22023';
      end if;
    end loop;
    if (rad ->> 'varianter')::integer not between 1 and (
      (rad ->> 'selvstendig')::integer + (rad ->> 'medStotte')::integer +
      (rad ->> 'nyeForsok')::integer + (rad ->> 'ulost')::integer
    ) then
      raise exception using errcode = '22023';
    end if;
  end loop;
  update verksted_1t.elever
  set oppsummering = fremdrift, revisjon = revisjon + 1, sist_synket = statement_timestamp()
  where hemmelig_hash = sha256(convert_to(elevnokkel, 'UTF8'))
    and revisjon = forventet_revisjon
  returning revisjon into ny_revisjon;
  return ny_revisjon;
end;
$$;

revoke execute on function
  public.verksted_1t_klasser(), public.verksted_1t_opprett_klasse(text),
  public.verksted_1t_slett_klasse(uuid), public.verksted_1t_elever(uuid),
  public.verksted_1t_opprett_elev(uuid,text,text), public.verksted_1t_slett_elev(uuid,uuid),
  public.verksted_1t_elevstatus(text), public.verksted_1t_synk(text,integer,jsonb)
from public, anon, authenticated;

grant execute on function
  public.verksted_1t_klasser(), public.verksted_1t_opprett_klasse(text),
  public.verksted_1t_slett_klasse(uuid), public.verksted_1t_elever(uuid),
  public.verksted_1t_opprett_elev(uuid,text,text), public.verksted_1t_slett_elev(uuid,uuid)
to authenticated;

grant execute on function public.verksted_1t_elevstatus(text), public.verksted_1t_synk(text,integer,jsonb)
to anon, authenticated;
commit;
