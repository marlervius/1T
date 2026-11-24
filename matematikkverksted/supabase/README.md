# Valgfri klassesynk for Matematikkverksted 1T

Den offentlige versjonen har tom konfigurasjon og lokal lagring. Skolen må ta en egen beslutning om behandling av elevdata før den setter opp klassesynk i sin distribusjon.

## Oppsett for skolen

1. Bruk et skoleadministrert Supabase-prosjekt. Kjør migreringen i `migrations/202611190001_klasse_1t.sql` som databaseadministrator. Dataskjemaet `verksted_1t` skal forbli privat. Data API trenger `public` for de avgrensede RPC-funksjonene.
2. Aktiver e-postinnlogging, slå av selvregistrering og anonym innlogging i Supabase Auth, og opprett lærerkontoene i Supabase. Autoriser hver lærer ved å sette inn kontoen i den private databasetabellen. Kjør som administrator med kontoen sin faktiske UUID.
   ```sql
   insert into verksted_1t.laerere (bruker) values ('TEACHER-USER-UUID');
   ```
3. Fyll inn skolens HTTPS-prosjektadresse og publiserbare API-nøkkel (`sb_publishable_…`) i `dist/klassesynk-konfig.mjs`. Sett `KLASSESYNK_AKTIV` til `true` kun i skolens distribusjon. Backendens privilegerte nøkler tilhører serveren.
4. Kjør SQL-testen mot et isolert utviklingsprosjekt etter migrering, f.eks. `psql -v ON_ERROR_STOP=1 -f supabase/tests/klassesynk.sql`. Prøv deretter innlogging, opprettelse, innsending, avvisning av en annen lærers tilgang, og sletting gjennom skolens faktiske nettutgave før pilotering.

[Supabase Auth](https://supabase.com/docs/guides/auth/general-configuration) · [Databasefunksjoner og tilgang](https://supabase.com/docs/guides/database/functions)

## Bruk

Læreren oppretter en klasse og én personlig lenke per kallenavn på `klassesynk.html`. Lenken vises ved opprettelse og deles privat. Eleven åpner den i samme nettleser og på samme nettsted som øvingen og sender sammendraget manuelt. Samme lenke brukes ved senere innsendinger. Synkroniseringen erstatter siste sammendrag med øvingen fra aktuell nettleser. Læreren henter oppdatert oversikt med **Hent siste sammendrag**. Øvingsdata på tvers av nettlesere kan flyttes via elevens lokale sikkerhetskopi.

Lenkens hemmelige del gir adgang til å sende et nytt sammendrag for kallenavnet. Ved tap eller deling med uvedkommende sletter læreren elevlenken og oppretter en ny. Sletting fjerner også gjeldende sammendrag. Sletting av klassen fjerner alle elevlenker og sammendrag fra de aktive databasetabellene.

## Data og drift

Databasen lagrer lærerens konto-ID, klassenavn, kallenavn, hash av elevnøkkel, siste synketid og øvingstellinger per ferdighet. Den mottar elevnøkkelen i RPC-kallet. Eleven bruker ingen konto. Læreren ser egne klasser, og elevlenken gir kun tilbake status for eleven som lenken gjelder. Øvingstellingene kommer fra elevens nettleser og kan endres av den som har lenken.

Skolen må fastsette rutiner for kallenavn, deling av lenker, sletting og håndtering av Supabase-logger og sikkerhetskopier før bruk. Ved sletting i appen gjelder databasens egne oppbevaringstider for logger og sikkerhetskopier. Avklar logging av HTTP-innhold og unngå tredjepartsskript på siden som tar imot elevlenken.
