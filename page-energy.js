/* Lightweight data-grid and radar ambience for every main section. */
(() => {
  "use strict";

  const sections = [...document.querySelectorAll("main > section[id]")];
  if (!sections.length) return;

  const signalMap = [
    [12, 24, -0.4],
    [29, 72, -2.1],
    [43, 37, -1.2],
    [58, 81, -3.3],
    [68, 19, -0.9],
    [81, 58, -2.7],
    [91, 31, -1.7],
    [76, 88, -3.6],
    [21, 49, -2.9],
  ];

  sections.forEach((section, sectionIndex) => {
    section.classList.add("data-grid-section");

    const layer = document.createElement("div");
    layer.className = "data-grid";
    layer.setAttribute("aria-hidden", "true");

    const radarSide = sectionIndex % 2 ? " data-grid__radar--left" : "";
    const radarTop = 34 + ((sectionIndex * 17) % 33);
    const signals = signalMap
      .map(([x, y, delay], signalIndex) => {
        const shiftedX = (x + sectionIndex * 9 + signalIndex * 3) % 94;
        const shiftedY = (y + sectionIndex * 13) % 91;
        return `<i class="data-grid__signal" style="--signal-x:${shiftedX}%;--signal-y:${shiftedY}%;--signal-delay:${delay}s"></i>`;
      })
      .join("");

    layer.innerHTML = `
      <span class="data-grid__plane"></span>
      <span class="data-grid__scanline"></span>
      <span class="data-grid__radar${radarSide}" style="--radar-top:${radarTop}%"></span>
      ${signals}`;

    section.prepend(layer);
  });

  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-data-grid-active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-data-grid-active", entry.isIntersecting);
      });
    },
    { rootMargin: "12% 0px", threshold: 0.01 },
  );

  sections.forEach((section) => observer.observe(section));
})();
