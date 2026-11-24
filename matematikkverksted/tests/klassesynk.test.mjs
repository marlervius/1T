import test from "node:test";
import assert from "node:assert/strict";
import { webcrypto } from "node:crypto";
import { KLASSESYNK_AKTIV } from "../dist/klassesynk-konfig.mjs";
import { hentSynkFremdrift, klassesynkKlient, lagElevnokkel } from "../dist/klassesynk.mjs";
import { byggElevrapport, nokler } from "../dist/1t-data.mjs";

test("public deployment defaults to offline operation", () => {
  assert.equal(KLASSESYNK_AKTIV, false);
});

test("school sync projects existing local exercise data to the six allowed fields", () => {
  const tid = 1700000000000;
  const lagring = new Map([[nokler.oving, JSON.stringify({
    logg: [{ id: "grunnlag/1", ref: "intern-id", variant: "intern-variant", nivaa: 0,
      riktig: true, hint: 0, forsok: 1, tid, raw: "privat" }]
  })]]);
  const rapport = byggElevrapport({ getItem: key => lagring.get(key) }, "synk", "elev", tid);
  assert.deepEqual(hentSynkFremdrift(rapport), [
    { id: "grunnlag/1", selvstendig: 1, medStotte: 0, nyeForsok: 0, ulost: 0, varianter: 1 }
  ]);
  assert.throws(() => hentSynkFremdrift({ ferdigheter: [{ ...rapport.ferdigheter[0], id: "privat/1" }] }));
  assert.throws(() => hentSynkFremdrift({ ferdigheter: [rapport.ferdigheter[0], rapport.ferdigheter[0]] }));
});

test("student invitation keys contain 256 random bits and differ across calls", () => {
  globalThis.crypto ??= webcrypto;
  const forste = lagElevnokkel();
  assert.match(forste, /^[0-9a-f]{64}$/);
  assert.notEqual(lagElevnokkel(), forste);
});

test("RPC requests send student credentials in the body and refuse a privileged API key", async () => {
  const adresse = "https://skole.example";
  assert.throws(() => klassesynkKlient(adresse, "sb_secret_hidden"));
  assert.throws(() => klassesynkKlient("http://skole.example", "sb_publishable_example"));

  const kall = [];
  const klient = klassesynkKlient(adresse, "sb_publishable_example", async (url, valg) => {
    kall.push([url, valg]);
    return { ok: true, json: async () => null };
  });
  const elevnokkel = "d".repeat(64);
  await klient.rpc("elevstatus", { elevnokkel });
  await klient.rpc("klasser", {}, "JWT");
  assert.equal(kall[0][0].href, `${adresse}/rest/v1/rpc/verksted_1t_elevstatus`);
  assert.deepEqual(JSON.parse(kall[0][1].body), { elevnokkel });
  assert.equal(kall[0][1].headers.Authorization, undefined);
  assert.equal(kall[0][1].credentials, "omit");
  assert.equal(kall[0][1].referrerPolicy, "no-referrer");
  assert.equal(kall[1][1].headers.Authorization, "Bearer JWT");
});
