/* =====================================================================
   MUSIC — quiet, randomized background music player.
   Reads its playlist from Model.music.tracks (js/model.js).
   If that list is empty, this whole module just stays dormant and the
   toggle button hides itself — safe to leave in the codebase either way.
   ===================================================================== */

const Music = {

  el: null,
  btn: null,
  order: [],
  pos: 0,
  started: false,
  muted: false,

  init() {
    this.el = document.getElementById("bgm");
    this.btn = document.getElementById("music-toggle");
    if (!this.el || !this.btn) return;

    const cfg = (window.Model && Model.music) || {};
    const tracks = (cfg.tracks || []).filter(Boolean);

    // No tracks configured yet — hide the toggle, do nothing else.
    if (!tracks.length) {
      this.btn.style.display = "none";
      return;
    }

    this.el.volume = cfg.volume != null ? cfg.volume : 0.18;
    this.order = cfg.shuffle ? this.shuffle([...tracks]) : [...tracks];

    // Restore mute preference between visits
    this.muted = localStorage.getItem("bgm-muted") === "1";
    this.updateButton();

    this.el.addEventListener("ended", () => this.playNext());
    this.btn.addEventListener("click", () => this.toggle());

    if (cfg.autoplay) {
      const startOnce = () => {
        if (!this.started && !this.muted) this.playNext();
        removeEventListener("pointerdown", startOnce, true);
        removeEventListener("keydown", startOnce, true);
      };
      // Browsers block audio before a user gesture, so wait for the first one.
      addEventListener("pointerdown", startOnce, { once: true, capture: true });
      addEventListener("keydown", startOnce, { once: true, capture: true });
    }
  },

  // Fisher–Yates shuffle
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  playNext() {
    if (!this.order.length) return;
    if (this.pos >= this.order.length) {
      this.order = Model.music.shuffle ? this.shuffle([...this.order]) : this.order;
      this.pos = 0;
    }
    this.el.src = this.order[this.pos++];
    this.started = true;
    this.el.play().catch(() => { /* ignored — needs a user gesture first */ });
    this.updateButton();
  },

  toggle() {
    this.muted = !this.muted;
    localStorage.setItem("bgm-muted", this.muted ? "1" : "0");
    if (this.muted) {
      this.el.pause();
    } else if (this.started) {
      this.el.play().catch(() => {});
    } else {
      this.playNext();
    }
    this.updateButton();
  },

  updateButton() {
    if (!this.btn) return;
    this.btn.setAttribute("aria-pressed", String(!this.muted));
    this.btn.classList.toggle("muted", this.muted);
  },
};

document.addEventListener("DOMContentLoaded", () => Music.init());
