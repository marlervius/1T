import { KLASSESYNK_AKTIV, SUPABASE_URL, SUPABASE_PUBLISERBAR_NOKKEL } from "./klassesynk-konfig.mjs";
import { hentSynkFremdrift, klassesynkKlient, lagElevnokkel } from "./klassesynk.mjs";

const element = id => document.getElementById(id);
const status = melding => { element("status").textContent = melding; };
const dato = tidspunkt => new Date(tidspunkt).toLocaleString("nb-NO");

function visListe(id, rader, lagRad) {
  element(id).replaceChildren(...rader.map(rad => {
    const punkt = document.createElement("li");
    lagRad(punkt, rad);
    return punkt;
  }));
}

function knapp(tekst, handling) {
  const knapp = document.createElement("button");
  knapp.type = "button";
  knapp.textContent = tekst;
  knapp.addEventListener("click", handling);
  return knapp;
}

function skjulLenke() {
  element("lenke").hidden = true;
  element("elevlenke").value = "";
}

function on(id, hendelse, handling) {
  element(id).addEventListener(hendelse, handling);
}

function opprettElevvisning(klient, elevnokkel, kjor) {
  element("elev").hidden = false;
  if (!/^[a-f0-9]{64}$/.test(elevnokkel)) {
    status("Elevlenken er ugyldig.");
    return;
  }

  async function hentElev() {
    const elev = await klient.rpc("elevstatus", { elevnokkel });
    element("synk").disabled = !elev;
    if (!elev) {
      status("Elevlenken er utløpt eller slettet.");
      return null;
    }
    element("elevstatus").textContent = elev.sistSynket
      ? `${elev.kallenavn} · Sist sendt ${dato(elev.sistSynket)}`
      : `${elev.kallenavn} · Første innsending`;
    return elev;
  }

  on("synk", "click", kjor(async () => {
    const elev = await hentElev();
    if (!elev) return;
    const { byggElevrapport } = await import("./1t-data.mjs");
    const rapport = byggElevrapport(localStorage, "synk", "elev");
    const fremdrift = hentSynkFremdrift(rapport).filter(rad =>
      rad.selvstendig || rad.medStotte || rad.nyeForsok || rad.ulost || rad.varianter
    );
    if (!fremdrift.length) {
      status("Denne nettleseren har ingen øving å sende.");
      return;
    }
    if (elev.sistSynket && !confirm("Vil du erstatte det forrige sammendraget med øvingen fra denne nettleseren?")) return;
    const revisjon = await klient.rpc("synk", { elevnokkel, forventet_revisjon: elev.revisjon, fremdrift });
    if (revisjon === null) {
      status("Sammendraget ble endret eller elevlenken ble slettet. Hent status ved å åpne lenken på nytt.");
      return;
    }
    element("elevstatus").textContent = `${elev.kallenavn} · Sist sendt ${dato(Date.now())}`;
    status("Sammendraget er sendt til læreren.");
  }));
  void kjor(async () => {
    if (await hentElev()) status("Klar til å sende øving fra denne nettleseren.");
  })();
}

function opprettLaerervisning(klient, kjor) {
  let tilgang = null;
  let valgtKlasse = null;
  const rpc = (navn, parametere) => klient.rpc(navn, parametere, tilgang);
  element("innlogging").hidden = false;
  status("Logg inn med lærerkontoen skolen har opprettet.");

  function loggUt() {
    tilgang = null;
    valgtKlasse = null;
    document.forms.innlogging.reset();
    element("innlogging").hidden = false;
    element("laerer").hidden = true;
    element("klasse").hidden = true;
    element("klasser").replaceChildren();
    element("elever").replaceChildren();
    skjulLenke();
    status("Du er logget ut.");
  }

  async function hentElever() {
    const elever = await rpc("elever", { klasse_id: valgtKlasse.id });
    const { ferdigheter: katalog } = await import("./1t-data.mjs");
    const navn = new Map(katalog.map(rad => [rad.id, rad.kort]));
    visListe("elever", elever, (punkt, elev) => {
      const overskrift = document.createElement("strong");
      overskrift.textContent = elev.kallenavn;
      const beskrivelse = document.createTextNode(elev.sistSynket
        ? ` · Sist sendt ${dato(elev.sistSynket)} `
        : " · Venter på innsending ");
      punkt.append(overskrift, beskrivelse, knapp("Slett elevlenke og data", kjor(async () => {
        if (!confirm(`Slette elevlenken og sammendraget for ${elev.kallenavn}?`)) return;
        await rpc("slett_elev", { klasse_id: valgtKlasse.id, elev_id: elev.id });
        skjulLenke();
        await hentElever();
      })));
      if (elev.ferdigheter.length) {
        const detaljer = document.createElement("details");
        const sammendrag = document.createElement("summary");
        sammendrag.textContent = "Sammendrag per ferdighet";
        const ferdigheter = document.createElement("ul");
        for (const rad of elev.ferdigheter) {
          const ferdighet = document.createElement("li");
          ferdighet.textContent = `${navn.get(rad.id) ?? rad.id} · ${rad.selvstendig} selvstendig · ${rad.medStotte} med støtte · ${rad.nyeForsok} nye forsøk · ${rad.ulost} uløst · ${rad.varianter} varianter`;
          ferdigheter.append(ferdighet);
        }
        detaljer.append(sammendrag, ferdigheter);
        punkt.append(detaljer);
      }
    });
  }

  async function hentKlasser() {
    visListe("klasser", await rpc("klasser"), (punkt, klasse) => {
      punkt.append(knapp(klasse.navn, kjor(async () => {
        valgtKlasse = klasse;
        skjulLenke();
        element("elever").replaceChildren();
        element("klassenavn").textContent = klasse.navn;
        element("klasse").hidden = false;
        await hentElever();
      })));
    });
  }

  on("innlogging", "submit", kjor(async event => {
    const skjema = event.currentTarget;
    const data = new FormData(skjema);
    skjema.elements.password.value = "";
    let sesjon;
    try {
      sesjon = await klient.loggInn(data.get("email"), data.get("password"));
      tilgang = sesjon.access_token;
      await hentKlasser();
    } catch (feil) {
      tilgang = null;
      if (feil.status === 400 || feil.status === 401 || feil.status === 403) {
        status("Innloggingen mislyktes. Kontroller kontoen og lærerens tilgang hos skolen.");
        return;
      }
      throw feil;
    }
    skjema.reset();
    element("innlogging").hidden = true;
    element("laerer").hidden = false;
    status("Innlogget som lærer.");
  }));

  on("loggut", "click", kjor(loggUt));
  on("ny-klasse", "submit", kjor(async event => {
    const skjema = event.currentTarget;
    await rpc("opprett_klasse", { nytt_navn: skjema.elements.navn.value });
    skjema.reset();
    await hentKlasser();
  }));
  on("oppdater", "click", kjor(hentElever));
  on("slett-klasse", "click", kjor(async () => {
    if (!confirm(`Slette ${valgtKlasse.navn}, alle elevlenker og alle sammendrag i klassen?`)) return;
    await rpc("slett_klasse", { klasse_id: valgtKlasse.id });
    valgtKlasse = null;
    skjulLenke();
    element("klasse").hidden = true;
    element("elever").replaceChildren();
    await hentKlasser();
    status("Klassen er slettet.");
  }));
  on("ny-elev", "submit", kjor(async event => {
    const skjema = event.currentTarget;
    const elevnokkel = lagElevnokkel();
    skjulLenke();
    try {
      await rpc("opprett_elev", {
        klasse_id: valgtKlasse.id, nytt_kallenavn: skjema.elements.kallenavn.value, elevnokkel
      });
    } catch (feil) {
      if (feil.kode === "23505") {
        status("Dette kallenavnet er allerede i bruk i klassen.");
        return;
      }
      throw feil;
    }
    const lenke = new URL(location.href);
    lenke.hash = `elev=${elevnokkel}`;
    element("elevlenke").value = lenke.href;
    element("lenke").hidden = false;
    element("elevlenke").select();
    skjema.reset();
    await hentElever();
  }));
}

if (KLASSESYNK_AKTIV) {
  try {
    const klient = klassesynkKlient(SUPABASE_URL, SUPABASE_PUBLISERBAR_NOKKEL);
    let opptatt = false;
    const kjor = handling => async event => {
      event?.preventDefault();
      if (opptatt) return;
      opptatt = true;
      try {
        await handling(event);
      } catch (feil) {
        status(feil.status === 401 ? "Økten er utløpt. Last inn siden og logg inn på nytt."
          : feil.message || "Handlingen mislyktes.");
      } finally {
        opptatt = false;
      }
    };
    addEventListener("hashchange", () => location.reload());
    const fragment = new URLSearchParams(location.hash.slice(1));
    if (fragment.has("elev")) opprettElevvisning(klient, fragment.get("elev"), kjor);
    else opprettLaerervisning(klient, kjor);
  } catch {
    status("Skolens klassesynk er feil konfigurert.");
  }
}
