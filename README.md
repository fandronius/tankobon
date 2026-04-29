# 巻 Tankōbon — Manga Tracker

> Tieni traccia della tua collezione di manga. Gratuito, offline, nessun account.

**[→ Apri l'app](https://fandronius.github.io/tankobon/)**

---

## Funzionalità

- 📚 Collezione + Wishlist in tab separati
- 🏷️ Tag e generi per ogni serie (18 preset + custom)
- 🔍 Ricerca copertine e dati ufficiali via AniList
- ▦ Scansione ISBN tramite fotocamera
- ⭐ Consigliati personalizzati in base alla tua collezione
- 📊 Progressione volumi con barra grafica
- 🌙 Tema chiaro/scuro
- 💾 Backup/ripristino JSON
- 🔄 Verifica aggiornamenti dal menu
- 📡 Funziona offline (PWA installabile)

## Installazione come app

Apri il link dal tuo telefono e tocca **"Aggiungi alla schermata Home"** dal menu del browser. Funziona su Android e iOS.

---

## Changelog

### v1.10.0 — Riscrittura: addio AniList, benvenuta Jikan
- **Nuova API**: tutte le funzioni di ricerca/raccomandazioni passate da AniList a **Jikan (MyAnimeList wrapper)** — gratuita, senza chiave, con CORS abilitato di default. Niente più proxy, niente più Worker, niente più 403.
- **Plot/sinossi**: ogni serie ora salva la trama. Quando cerchi online viene scaricata automaticamente; in alternativa puoi scriverla a mano nel form modifica
- **Sezione Trama nel dettaglio**: visibile sotto i volumi sia in collezione che in wishlist
- Rimosso tutto il codice del proxy CORS, Cloudflare Worker, fallback proxy

### v1.9.3
- Fix URL Cloudflare Worker: aggiornato a `tankobon-proxy.fandroleto.workers.dev`
- Worker ora su repo separato `tankobon-worker` per compatibilità con Cloudflare Pages CI

### v1.9.2
- **Soluzione definitiva CORS AniList**: aggiunto Cloudflare Worker proprio (`tankobon.fandroleto.workers.dev`) come endpoint primario
- Il Worker fa da proxy verso AniList con header CORS corretti, senza rate limit (100k req/giorno gratis su Cloudflare)
- Mantenuta chiamata diretta come fallback nel caso il Worker fosse offline
- Rimossi proxy pubblici inaffidabili (allorigins, codetabs) dalla lista
- Cleanup automatico delle preferenze endpoint obsolete in localStorage

### v1.9.1
- **Fix definitivo CORS AniList — versione corretta**: la v1.9.0 con GET tornava "Not Found" perché AniList GraphQL accetta solo POST
- Ora usa POST con `Content-Type: text/plain` invece di `application/json`: questo è un header CORS-safelisted che evita il preflight OPTIONS senza cambiare il funzionamento di AniList (legge comunque il body come JSON)
- Cambiati i proxy fallback: `allorigins.win/post` e `codetabs.com/v1/proxy`
- Sistema di endpoint riorganizzato in array con label leggibili e log su console

### v1.9.0
- **Fix definitivo CORS AniList**: convertite tutte le chiamate da POST a GET con query string. Le richieste GET non richiedono il preflight CORS (OPTIONS) che AniList ha smesso di gestire correttamente, quindi ora funzionano in modo nativo dal browser senza bisogno di proxy
- Sostituiti i proxy non più funzionanti (corsproxy.io a 403, cors.lol bloccato): ora usa allorigins.win e codetabs.com come fallback se la chiamata diretta dovesse fallire
- Aggiornato bypass del service worker con i nuovi domini

### v1.8.9
- Fix definitivo "Failed to fetch" AniList: aggiunto sistema di proxy CORS in cascata
- Tenta prima la chiamata diretta, poi fallback automatico su corsproxy.io e cors.lol
- L'endpoint funzionante viene memorizzato in localStorage per evitare ritentativi
- Aggiunti domini proxy al bypass del service worker

### v1.8.8
- Aggiunto pulsante \`🗑 Reset cache app\` nel menu: deregistra il service worker e svuota tutte le cache, poi ricarica (utile per risolvere problemi di connessione alle API)

### v1.8.7
- Fix ISBN: sostituita Open Library con Google Books API come fonte primaria (migliore copertura manga)
- Open Library rimane come fallback secondario
- Se nessuna API trova il titolo, si apre comunque la ricerca AniList con campo vuoto
- Aggiunto googleapis.com al bypass del service worker

### v1.8.6
- Fix critico: tutte le chiamate AniList centralizzate in `anilistFetch()` con `cache: 'no-store'` per evitare interferenze del service worker
- Aggiunto timeout di 10 secondi su ogni richiesta AniList
- Messaggi di errore più precisi: distingue timeout, nessuna connessione, errore HTTP

### v1.8.5
- Fix critico service worker: le richieste POST verso AniList e OpenLibrary non vengono più intercettate/cachate (la Cache API ignora il body delle POST causando errori silenziosi)
- SW aggiornato a versione v3 con lista domini bypass esplicita

### v1.8.4
- Fix onboarding: il CSS era andato perso durante cleanup precedenti, l'onboarding appariva fisso a schermo invece di essere nascosto
- Ripristinato `display: none` di default sul backdrop

### v1.8.3
- Fix ricerca AniList dal bottone rosso nella lista principale: `openSearchModal()` ora ricorda se è stata aperta dal form o standalone, e "Indietro" si comporta di conseguenza
- Aggiunta funzione `closeSearchModal()` centralizzata

### v1.8.2
- Pull-to-refresh: trascina verso il basso dalla cima della lista per ricaricare dal DB
- Indicatore animato con freccia e spinner
- Attivo solo nella vista principale, non nel dettaglio

### v1.8.1
- Fix bug: percentuale sempre 0% nella schermata principale anche con tutti i volumi posseduti
- Fix `computeStats`: calcola percentuale reale anche per serie ongoing
- Fix: spostare da wishlist a collezione non imposta più `ongoing: true` automaticamente

### v1.8
- Verifica aggiornamenti nel menu ☰ (confronta versione locale con GitHub)
- Service worker aggiornato: attivazione su richiesta con SKIP_WAITING
- Versione aggiunta al manifest.webmanifest
- Link README visualizzabile dal menu

### v1.7
- Onboarding al primo avvio (5 slide scorrevoli, swipe supportato)
- Voce "Rivedi la guida" nel menu ☰
- Conferma prima di rimuovere un volume già posseduto

### v1.6
- Scansione ISBN via fotocamera (BarcodeDetector nativa + ZXing fallback)
- Flusso ISBN → Open Library → AniList automatico
- Condivisione link app dal menu ☰
- Pulsante "Cerca su AniList" spostato in cima al form, più visibile
- Fix consigliati: esclusione di tutte le serie già presenti (collezione + wishlist)
- Cache consigliati invalidata ad ogni modifica della collezione

### v1.5
- Redesign completo: card bianche, tipografia DM Serif/DM Sans, palette corallo
- Tag e generi multipli per serie (18 preset + custom)
- Filtro per tag nella barra sotto l'ordinamento
- Sezione "Consigliati" in wishlist (raccomandazioni AniList personalizzate)
- Tema scuro migliorato

### v1.4 e precedenti
- Collezione + Wishlist
- Serie in corso
- Copertine da AniList o upload
- Ordinamento e ricerca
- Backup JSON
- PWA offline

---

*di [Fandronius](https://github.com/fandronius)*
