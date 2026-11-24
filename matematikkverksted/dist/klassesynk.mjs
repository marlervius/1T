const TELLEFELT = ["selvstendig", "medStotte", "nyeForsok", "ulost", "varianter"];

export function hentSynkFremdrift(rapport) {
  if (!Array.isArray(rapport.ferdigheter) || rapport.ferdigheter.length > 100) {
    throw new Error("Øvingssammendraget har feil format.");
  }
  const ider = new Set();
  return rapport.ferdigheter.map(rad => {
    if (!/^(?:grunnlag\/[1-4]|(?:algebra|likninger|andregrad|funksjoner|polynomdivisjon|derivasjon|trigonometri|modellering)\/[1-3])$/.test(rad.id) || ider.has(rad.id)) {
      throw new Error("Øvingssammendraget har en ugyldig ferdighet.");
    }
    ider.add(rad.id);
    const utdrag = { id: rad.id };
    for (const felt of TELLEFELT) {
      if (!Number.isInteger(rad[felt]) || rad[felt] < 0 || rad[felt] > 999999) {
        throw new Error("Øvingssammendraget har et ugyldig oppgavetall.");
      }
      utdrag[felt] = rad[felt];
    }
    return utdrag;
  });
}

export function lagElevnokkel() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)), byte =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

export function klassesynkKlient(prosjektadresse, publiserbarNokkel, foresporsel = fetch) {
  const adresse = new URL(prosjektadresse);
  if (adresse.protocol !== "https:" || adresse.username || adresse.password ||
      adresse.pathname !== "/" || adresse.search || adresse.hash ||
      !/^sb_publishable_[a-zA-Z0-9_-]+$/.test(publiserbarNokkel)) {
    throw new Error("Skolens klassesynk er feil konfigurert.");
  }

  async function send(sti, parametere, tilgang) {
    const headers = { apikey: publiserbarNokkel, "Content-Type": "application/json" };
    if (tilgang) headers.Authorization = `Bearer ${tilgang}`;
    const svar = await foresporsel(new URL(sti, adresse), {
      method: "POST", headers, body: JSON.stringify(parametere), cache: "no-store",
      credentials: "omit", redirect: "error", referrerPolicy: "no-referrer"
    });
    if (!svar.ok) {
      const feil = new Error("Skolens løsning kunne ikke fullføre handlingen. Prøv igjen.");
      feil.status = svar.status;
      feil.kode = (await svar.json().catch(() => null))?.code;
      throw feil;
    }
    return svar.json();
  }

  return {
    loggInn(email, password) {
      return send("/auth/v1/token?grant_type=password", { email, password });
    },
    rpc(navn, parametere = {}, tilgang) {
      return send(`/rest/v1/rpc/verksted_1t_${navn}`, parametere, tilgang);
    }
  };
}
