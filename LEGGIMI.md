# Tankōbon — Manga Tracker (v1.5)

App per tenere traccia della tua collezione di manga.

*di Fandronius*

## Novità della v1.5

**Redesign completo** in stile moderno: card bianche arrotondate con ombre soft, tipografia DM Serif / DM Sans, palette corallo/grigio. Tema scuro altrettanto curato.

**Tag e generi** — ogni serie può avere più tag. Lista preimpostata di 18 generi (Shōnen, Seinen, Shōjo, Josei, Horror, Sci-Fi, Fantasy, Action, Romance, Commedia, Drama, Sport, Slice of Life, Mistero, Mecha, Soprannaturale, Thriller, Storico), ognuno con colore distinto. Puoi anche aggiungere tag custom che vengono salvati. Quando cerchi una serie su AniList, i generi vengono suggeriti automaticamente.

**Filtro per tag** — sotto l'ordinamento compare una barra orizzontale con i tag effettivamente usati nel tab corrente. Toccane uno per filtrare, tocca "Tutti ✕" per rimuovere il filtro.

**Sezione Consigliati** in fondo alla Wishlist — se hai almeno 2 serie in collezione, mostra manga simili pescati da AniList tramite le loro "recommendations" (aggrega le raccomandazioni di tutte le tue serie e mostra i più consigliati). Se hai meno di 2 serie, mostra i manga in trend del momento. Tocca una copertina per aggiungerla direttamente alla wishlist. Pulsante ↻ per forzare il refresh. I risultati sono cachati 6 ore per non consumare chiamate API.

## Tutto il resto (dalle versioni precedenti)

- Collezione + Wishlist in tab separati
- Serie in corso (niente totale, + per aggiungere volumi)
- Copertine (AniList o upload)
- Autore
- Ordinamento: alfabetico, autore, completamento
- Ricerca titoli/autori
- Condivisione via WhatsApp/Email/altro
- Tema chiaro/scuro
- Backup JSON
- Offline, nessun account, dati locali

## Come aggiornare (se hai già la v1.3/1.4 installata)

1. Vai sul tuo sito Netlify
2. Deploys → Deploy manually → trascina la cartella `manga-tracker` aggiornata
3. Apri/riapri l'app sul telefono (se è installata come PWA, potrebbe dover scaricare l'aggiornamento in background; riavvia se non si aggiorna)

**I tuoi dati restano**: le serie già nel database sono retrocompatibili, gli manca solo il campo `tags` che sarà `[]`. Puoi aggiungere i tag a mano aprendo ogni serie → Modifica.

## Come mettere gli URL delle copertine AniList in cache offline

Quando scarichi una copertina dalla ricerca, l'app tenta prima di convertirla in base64 (così resta offline). Se per qualche motivo la conversione fallisce (CORS), l'URL esterno viene comunque usato. Puoi aprire una serie e rifare "Modifica" → "Cerca online" per provare a rifare il download.

## Una nota sui consigliati

I "Consigliati per te" si basano sull'endpoint `recommendations` di AniList, che è community-driven ("chi ha letto X ha letto Y"). Funziona bene con serie famose (shonen, seinen classici), peggio con serie di nicchia. Se la ricerca del seed non trova la serie, quella serie viene saltata.

Usiamo un max di 5 serie della tua collezione come seed per rispettare il rate-limit (30 req/min) di AniList. Il risultato viene aggregato e ordinato per conteggio (quanti seed l'hanno raccomandata) + rating.

## File nella cartella

- `index.html` — l'app (~3000 righe ormai!)
- `manifest.webmanifest` — PWA manifest
- `sw.js` — service worker
- `icon-192.png`, `icon-512.png`, `icon-maskable.png` — icone
- `dati-iniziali.json` — dati Bleach/Berserk pronti da importare
