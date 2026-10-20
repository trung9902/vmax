/* Bright tech hero: gentle CSS motion with scroll depth, no mouse rotation. */
(() => {
  "use strict";
  const hero = document.querySelector(".hero");
  const art = hero?.querySelector(".hero-art");
  if (!art) return;
  const settings = window.VMAX_CONFIG?.heroMotion ?? {};
  if (settings.enabled === false) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = window.matchMedia("(min-width: 1001px)");
  let ready = false;
  let inView = true;
  let frame = null;
  const canAnimate = () =>
    ready && inView && !document.hidden && !reduced.matches;
  const canParallax = () =>
    canAnimate() && desktop.matches && settings.parallax !== false;

  function clearDepth() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    art.style.removeProperty("--hero-scroll-shift");
  }
  function updateDepth() {
    frame = null;
    if (!canParallax()) return;
    const rect = hero.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
    // Only the decorative glass panels move, by at most 8px over the whole hero.
    art.style.setProperty(
      "--hero-scroll-shift",
      `${(progress * 8).toFixed(2)}px`,
    );
  }
  function requestDepth() {
    if (frame === null && canParallax())
      frame = requestAnimationFrame(updateDepth);
  }
  function updateState() {
    art.dataset.motionPaused = String(!canAnimate());
    if (canParallax()) requestDepth();
    else clearDepth();
  }

  window.addEventListener("scroll", requestDepth, { passive: true });
  window.addEventListener("resize", updateState, { passive: true });
  document.addEventListener("visibilitychange", updateState);
  reduced.addEventListener("change", updateState);
  desktop.addEventListener("change", updateState);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        updateState();
      },
      { threshold: 0 },
    ).observe(hero);
  }

  Promise.all(
    [...hero.querySelectorAll(".hero-scene, .hero-stage img")].map((image) =>
      image.decode(),
    ),
  )
    .then(() => {
      ready = true;
      art.classList.add("hero-layered", "hero-motion");
      updateState();
    })
    .catch(() => {
      clearDepth();
      art.dataset.motionPaused = "true";
    });
})();
