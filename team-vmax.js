/* VMAX In Action: builds the photo rows from config.js (gallery.photos) and loops them as a marquee. */
(() => {
  const section = document.querySelector("#doi-ngu");
  if (!section) return;
  const tracks = [...section.querySelectorAll(".team-track")];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const PIXELS_PER_SECOND = 24;

  // Photos come from window.VMAX_CONFIG.gallery.photos. The HTML already holds the same list as a fallback.
  const gallery = window.VMAX_CONFIG && window.VMAX_CONFIG.gallery;
  if (gallery && Array.isArray(gallery.photos)) {
    ["top", "bottom"].forEach((rowName) => {
      const row = section.querySelector(`.team-row--${rowName}`);
      const track = row && row.querySelector(".team-track");
      if (!track) return;
      const photos = gallery.photos.filter((p) => p.row === rowName && p.visible !== false && p.src);
      row.hidden = photos.length === 0;
      if (!photos.length) return;
      track.replaceChildren(
        ...photos.map((photo) => {
          const li = document.createElement("li");
          li.className = "team-tile tile-" + (photo.size || "mid");
          const img = document.createElement("img");
          img.src = photo.src;
          img.alt = photo.alt || "";
          img.width = 1000;
          img.height = 700;
          img.loading = "lazy";
          img.decoding = "async";
          if (photo.position) img.style.objectPosition = photo.position;
          li.appendChild(img);
          return li;
        }),
      );
    });
  }

  function build() {
    tracks.forEach((track) => {
      track.querySelectorAll("[data-clone]").forEach((node) => node.remove());
      track.classList.remove("is-marquee");
      track.style.removeProperty("--shift");
      if (reduceMotion.matches || !track.children.length) return;

      const originals = [...track.children];
      const setWidth = track.scrollWidth;
      if (!setWidth) return;
      // Enough copies to cover the viewport; clones reuse the same image URLs, so nothing is downloaded twice.
      const copies = Math.max(1, Math.ceil(section.clientWidth / setWidth));
      for (let c = 0; c < copies; c++) {
        originals.forEach((tile) => {
          const clone = tile.cloneNode(true);
          clone.dataset.clone = "";
          clone.setAttribute("aria-hidden", "true");
          const img = clone.querySelector("img");
          if (img) img.alt = "";
          track.appendChild(clone);
        });
      }
      track.style.setProperty("--shift", setWidth + "px");
      track.style.setProperty("--duration", setWidth / PIXELS_PER_SECOND + "s");
      track.classList.add("is-marquee");
    });
  }

  let timer = 0;
  let lastWidth = section.clientWidth;
  window.addEventListener("resize", () => {
    if (section.clientWidth === lastWidth) return;
    lastWidth = section.clientWidth;
    clearTimeout(timer);
    timer = setTimeout(build, 200);
  });
  reduceMotion.addEventListener("change", build);
  build();
})();
