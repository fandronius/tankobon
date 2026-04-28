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

### v1.8.1
- Fix bug: percentuale sempre 0% nella schermata principale anche con tutti i volumi posseduti
- Fix: computeStats ora calcola la percentuale reale anche per serie ongoing
- Fix: spostare da wishlist a collezione non imposta più ongoing:true automaticamente

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
