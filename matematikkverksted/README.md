# Matematikkverksted 1T

Dette er kildekoden fra versjon 6 av det publiserte Matematikkverkstedet (kildecommit `b09d6c634546cbdb5578b41634aff9d33e733ce1`). Mappen `dist/` inneholder både den redigerbare HTML-, CSS- og JavaScript-koden og nettstedet slik det publiseres. KaTeX, skrifter og lisens følger med. Fagvelgeren inkluderer også 1P, 2P, R1 og R2.

## Kjør lokalt

Kjør kommandoene fra denne mappen. Testene er kontrollert med Node.js 24.

```sh
node --test tests/*.test.mjs
python3 -m http.server 8000 --directory dist
```

Åpne http://localhost:8000/. Ved lokal testing med denne enkle serveren kan du bruke filnavn som `/klasse.html`.

## Publiser på Vercel

Importer GitHub-repoet og sett **Root Directory** til `matematikkverksted`. Velg Node.js 24.x. Konfigurasjonen i `vercel.json` kjører testene som byggesteg og publiserer `dist/` med adresser som `/klasse` og `/r1`. Nettstedet har ingen pakkeavhengigheter som må installeres og trenger ingen miljøvariabler for vanlig bruk.

## Klasseoversikt

Den ordinære løsningen bruker lokal lagring i nettleseren. Skolesynk er deaktivert. Oppsett for en eventuell skoleadministrert Supabase-instans ligger i [supabase/README.md](supabase/README.md).
