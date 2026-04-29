# 巻 Tankōbon — Manga Tracker

> Tieni traccia della tua collezione di manga. Gratuito, offline, nessun account.

**[→ Apri l'app](https://fandronius.github.io/tankobon/)**

---

## Funzionalità

- 📚 Collezione + Wishlist in tab separati
- 🏷️ Tag e generi per ogni serie (18 preset + custom)
- 🔍 Ricerca dati ufficiali via Jikan/MyAnimeList (copertina, autore, plot, generi, numero volumi)
- 📖 Trama in italiano (traduzione automatica del synopsis EN)
- ▦ Scansione ISBN tramite fotocamera
- ⭐ Consigliati personalizzati in base alla tua collezione
- 📊 Progressione volumi con barra grafica
- 🔗 Condivisione con deep-link: gli amici aprono il link e l'app propone l'aggiunta diretta alla loro wishlist
- 🔄 Pull-to-refresh per aggiornare la lista
- 🌙 Tema chiaro/scuro
- 💾 Backup/ripristino JSON
- 🆕 Verifica aggiornamenti dal menu
- 📡 Funziona offline (PWA installabile)

## Installazione come app

Apri il link dal tuo telefono e tocca **"Aggiungi alla schermata Home"** dal menu del browser. Funziona su Android e iOS.

---

## Changelog

### v1.11.1 — Donazioni e contatti
- Aggiunto bottone "Offrimi un caffè" nel menu ☰: link a PayPal con messaggio di ringraziamento, design discreto ma in evidenza con sfondo corallo sfumato
- "di Fandronius" nel footer del menu ora è cliccabile e apre un'email a `fandroleto@gmail.com` con oggetto pre-compilato per suggerimenti

### v1.11.0 — Deep-link condivisione
- La condivisione di una serie ora include un link tipo `?add=Title&author=...`
- Chi apre il link vede un nuovo modale **"Un amico ti consiglia una serie"** con copertina, autore e trama tradotta in italiano
- Pulsante "Aggiungi alla wishlist" salva direttamente la serie con tutti i dati pre-compilati (cover, plot, generi, numero volumi)
- Compatibilità con onboarding: se è il primo avvio, prima viene mostrata la guida e poi il modale invito
- Detection serie già esistente: se l'utente ha già la serie in lista, mostra solo un toast "Già in lista"
- URL pulita dopo l'apertura per evitare ricomparse del modale al refresh

### v1.10.3 — Memoria volumi e condivisione semplice
- **Memoria volumi tra wishlist e collezione**: nuovo campo `totalVolumes` salvato sulla serie. Se aggiungi una wishlist con "Cerca online", il numero viene memorizzato. Quando sposti in collezione, la griglia volumi viene ricreata automaticamente con quel numero (tutti non posseduti). Funziona anche al contrario.
- **Condivisione semplificata**: messaggio uguale per wishlist e collezione, solo titolo + autore + link, senza dettagli sui volumi posseduti

### v1.10.2 — Trama anche in wishlist
- Fix: la sezione Trama ora appare correttamente anche nelle serie in wishlist (prima era nascosta perché veniva renderizzata insieme ai volumi)
- Estratta la logica in una funzione helper `renderPlotSection()` chiamata sempre

### v1.10.1 — Traduzione automatica della trama
- Aggiunta traduzione automatica EN→IT via Google Translate (endpoint pubblico, no API key)
- Quando cerchi online, la trama viene scaricata in inglese e poi tradotta in background
- Pulsante "🌐 Traduci" nel dettaglio della serie per tradurre a richiesta serie esistenti
- Heuristica automatica per mostrare il pulsante solo quando la trama sembra in inglese
- Gestione testi lunghi tramite split in chunk per rispettare il limite di Google Translate

### v1.10.0 — Migrazione completa a Jikan
- **Sostituita AniList con Jikan/MyAnimeList API** — gratuita, senza chiave, CORS abilitato di default. Niente più proxy, niente più Worker, niente più 403.
- **Plot/sinossi**: ogni serie ora salva la trama, scaricata automaticamente con "Cerca online" o scrivibile a mano
- **Sezione Trama nel dettaglio**: visibile sotto i volumi, sia in collezione che in wishlist
- Rimosso tutto il codice del proxy CORS, Cloudflare Worker e fallback proxy

### v1.9.x — Tentativi (falliti) di risolvere il blocco CORS di AniList
> Cronaca breve: AniList ha smesso di rispondere correttamente al preflight CORS, rendendo le chiamate dirette impossibili. Questi tentativi documentano il percorso di debugging che ha portato infine alla migrazione a Jikan.

#### v1.9.4
- Aggiornato URL Worker a `anilist-proxy.fandroleto.workers.dev` (il precedente era stato cancellato per errore)

#### v1.9.3
- Spostato Worker su repo GitHub separato (`tankobon-worker`) con `wrangler.toml` per integrazione Cloudflare Pages CI

#### v1.9.2
- Aggiunto Cloudflare Worker proprio come endpoint primario (100k req/giorno gratis)
- Worker fa proxy verso AniList con header CORS corretti
- Mantenuta chiamata diretta come fallback
- Cleanup automatico delle preferenze endpoint obsolete in localStorage

#### v1.9.1
- Tentativo POST con `Content-Type: text/plain` per evitare preflight CORS (header safelisted)
- Sostituiti i proxy non più funzionanti con `allorigins.win/post` e `codetabs.com/v1/proxy`
- Sistema di endpoint riorganizzato in array con label leggibili e log su console

#### v1.9.0
- Tentativo conversione POST→GET con query string nell'URL (poi rivelato impossibile: AniList GraphQL accetta solo POST)

#### v1.8.9
- Sistema di proxy CORS in cascata: corsproxy.io e cors.lol come fallback dopo la chiamata diretta
- Endpoint funzionante memorizzato in localStorage per evitare ritentativi

### v1.8.8 — Reset cache
- Pulsante "🗑 Reset cache app" nel menu: deregistra il service worker e svuota tutte le cache, poi ricarica (utile per risolvere problemi di connessione)

### v1.8.7 — ISBN più affidabile
- Sostituita Open Library con **Google Books API** come fonte primaria per ricerca titoli da ISBN (migliore copertura manga)
- Open Library rimane come fallback secondario
- Se nessuna API trova il titolo, l'app apre comunque la ricerca con campo vuoto
- Aggiunto `googleapis.com` al bypass del service worker

### v1.8.6 — Fetch AniList rifattorizzato
- Tutte le chiamate AniList centralizzate in `anilistFetch()` con `cache: 'no-store'` per evitare interferenze del service worker
- Aggiunto timeout di 10 secondi su ogni richiesta
- Messaggi di errore più precisi: distingue timeout, no connessione, errore HTTP

### v1.8.5 — Fix critico service worker
- Le richieste POST verso AniList e Open Library non vengono più intercettate/cachate (la Cache API ignora il body delle POST causando errori silenziosi)
- SW aggiornato con lista domini bypass esplicita

### v1.8.4 — Fix onboarding
- Il CSS dell'onboarding era andato perso durante cleanup precedenti, faceva apparire il pannello fisso a schermo
- Ripristinato `display: none` di default sul backdrop

### v1.8.3 — Fix bottone ricerca dalla lista
- `openSearchModal()` ora ricorda se è stata aperta dal form "Nuova serie" o standalone
- "Indietro" si comporta di conseguenza: ritorna al form se era aperto, altrimenti chiude
- Aggiunta funzione `closeSearchModal()` centralizzata

### v1.8.2 — Pull-to-refresh
- Trascina verso il basso dalla cima della lista per ricaricare dal DB
- Indicatore animato con freccia che ruota e spinner durante il caricamento
- Soglia di 68px con damping per il trascinamento
- Attivo solo nella vista principale, non nel dettaglio

### v1.8.1 — Fix percentuale completamento
- Bug: la percentuale risultava sempre 0% nella schermata principale anche con tutti i volumi posseduti
- Fix `computeStats`: calcola percentuale reale anche per serie ongoing
- Fix: spostare da wishlist a collezione non imposta più `ongoing: true` automaticamente

### v1.8 — Sistema aggiornamenti
- Voce **"Verifica aggiornamenti"** nel menu ☰ (confronta versione locale con manifest remoto su GitHub)
- Service worker aggiornato: attivazione su richiesta tramite `SKIP_WAITING` invece di automatica
- Versione esposta nel `manifest.webmanifest`
- Link "Visualizza README & changelog" in fondo al menu

### v1.7 — Onboarding e conferme
- **Onboarding al primo avvio**: 5 slide scorrevoli con swipe (Benvenuto, Collezione/Wishlist, Scansione ISBN, Consigliati, Tutto pronto)
- Voce "Rivedi la guida" nel menu ☰ per riaprire l'onboarding in qualsiasi momento
- **Conferma prima di rimuovere un volume già posseduto**: evita cancellazioni accidentali con tap distratti

### v1.6 — Scansione ISBN
- Scansione codice a barre via fotocamera con `BarcodeDetector` API nativa (Chrome Android) e fallback ZXing-js per Safari/iOS
- Flusso: ISBN → Open Library (per titolo) → AniList (per dati completi)
- Inserimento manuale ISBN nello stesso modale come fallback
- **Condivisione link app** dal menu ☰ via Web Share API
- Pulsante "Cerca su AniList" spostato in cima al form (era sotto Copertina) e reso più visibile in stile card corallo
- Fix consigliati: esclusione di TUTTE le serie già presenti (collezione + wishlist), non solo i seed
- Cache consigliati invalidata ad ogni modifica della collezione

### v1.5 — Redesign completo
- Card bianche arrotondate con ombre soft, tipografia DM Serif Display + DM Sans, palette corallo/grigio
- Tag e generi multipli per serie con 18 preset (Shōnen, Seinen, Shōjo, Josei, Horror, Sci-Fi, Fantasy, Action, Romance, Commedia, Drama, Sport, Slice of Life, Mistero, Mecha, Soprannaturale, Thriller, Storico) + tag custom salvabili
- Filtro per tag nella barra sotto l'ordinamento (mostra solo tag effettivamente usati)
- **Sezione "Consigliati"** in fondo alla Wishlist: usa l'endpoint `recommendations` di AniList per mostrare manga simili in base alla tua collezione (max 5 seed). Se hai meno di 2 serie, mostra i trending del momento. Cache 6 ore con pulsante refresh manuale.
- Auto-suggerimento generi quando cerchi su AniList
- Tema scuro completamente curato

### v1.4 e precedenti
- Collezione + Wishlist in tab separati
- Serie in corso (senza totale fisso, + per aggiungere volumi)
- Copertine scaricate da AniList o caricate da galleria
- Ordinamento: alfabetico, autore, completamento
- Ricerca per titolo/autore
- Condivisione testuale via WhatsApp/Email/altro
- Tema chiaro/scuro
- Backup/ripristino JSON
- Funzionamento offline (PWA), nessun account, dati locali in IndexedDB

---

## Tecnologie

- **HTML/CSS/JS vanilla** (nessun framework, nessun build)
- **IndexedDB** per persistenza locale
- **Service Worker** per offline e installabilità
- **Web Share API** per condivisione nativa
- **BarcodeDetector API** + ZXing-js per scansione ISBN
- **Jikan API** (MyAnimeList wrapper) per dati manga
- **Google Translate** (endpoint pubblico) per traduzione automatica plot

## Storage

I dati restano sul tuo dispositivo (IndexedDB). Niente account, niente cloud, niente tracking. Backup manuale via JSON dal menu.

## Licenza

Uso personale gratuito. Codice aperto, modifiche benvenute.

---

*di [Fandronius](mailto:fandroleto@gmail.com) · [GitHub](https://github.com/fandronius)*
