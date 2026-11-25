# Background music

This folder is empty on purpose. The music toggle button in the HUD stays
hidden until you add tracks here.

## How to add your own music

1. Drop mp3 files into this folder, e.g. `assets/music/track1.mp3`.
2. Open `js/model.js` and list the filenames in `Model.music.tracks`:

   ```js
   music: {
     tracks: [
       "assets/music/track1.mp3",
       "assets/music/track2.mp3",
     ],
     volume: 0.18,
     shuffle: true,
     autoplay: true,
   },
   ```
3. Reload the page. The toggle button in the top HUD will appear, playback
   starts quietly after your first click/keypress (browsers block audio
   before that), and tracks shuffle and loop through the playlist.

## Where to find music you can actually use here

Only use tracks you have the rights to publish on a public GitHub Pages
site — official game/film soundtracks (Persona, Under Night In-Birth, etc.)
are copyrighted and **should not** go here, even for a personal portfolio.
Safe sources instead:

- **Pixabay Music** — pixabay.com/music — free, no attribution required
- **YouTube Audio Library** — free tracks, some require crediting the artist
- **Free Music Archive** — freemusicarchive.org — filter by CC license
- **Incompetech (Kevin MacLeod)** — incompetech.com — free with attribution
- **OpenGameArt.org** — audio section — game-jam-friendly CC/public-domain tracks
- **ccMixter** — ccmixter.org — remixes and originals under Creative Commons
- Or record/compose something yourself

Check each track's specific license before publishing — "free" sites still
vary between no-attribution, attribution-required, and non-commercial-only.
