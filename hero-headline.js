/* Slow headline cross-fade; timers stop outside the viewport and in hidden tabs. */
(() => {
  "use strict";
  const root = document.querySelector("[data-hero-headline]");
  if (!root) return;
  const phrases = [...root.querySelectorAll(".headline-phrase")];
  if (phrases.length < 2) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let current = 0;
  let inView = true;
  let holdTimer;
  let fadeTimer;
  const canPlay = () => inView && !document.hidden && !reduced.matches;

  function show(index) {
    phrases.forEach((phrase, position) => {
      phrase.classList.toggle("is-active", position === index);
      phrase.classList.remove("is-leaving");
      phrase.setAttribute("aria-hidden", String(position !== index));
    });
    current = index;
  }
  function stop() {
    clearTimeout(holdTimer);
    clearTimeout(fadeTimer);
    show(current);
  }
  function schedule() {
    if (!canPlay()) return;
    holdTimer = setTimeout(() => {
      if (!canPlay()) return;
      phrases[current].classList.add("is-leaving");
      fadeTimer = setTimeout(() => {
        show((current + 1) % phrases.length);
        schedule();
      }, 450);
    }, 5000);
  }
  function update() {
    stop();
    schedule();
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }).observe(root);
  }
  document.addEventListener("visibilitychange", update);
  reduced.addEventListener("change", update);
  schedule();
})();
