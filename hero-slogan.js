/* HeroSlogan progressively enhances semantic HTML without a framework. */
(() => {
  "use strict";
  class HeroSlogan {
    constructor(root) {
      const hero = root.closest(".hero");
      const measure = () =>
        hero.style.setProperty(
          "--hero-slogan-height",
          `${root.offsetHeight}px`,
        );
      measure();
      if ("ResizeObserver" in window) new ResizeObserver(measure).observe(root);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (!("IntersectionObserver" in window)) return;
      root.dataset.enhanced = "true";
      let inView = false;
      const update = () =>
        root.classList.toggle(
          "is-in-view",
          inView && !document.hidden && !reduced.matches,
        );
      new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          if (inView) root.classList.add("is-visible");
          update();
        },
        { threshold: 0.1 },
      ).observe(root);
      reduced.addEventListener("change", update);
      document.addEventListener("visibilitychange", update);
    }
  }
  document
    .querySelectorAll('[data-component="HeroSlogan"]')
    .forEach((root) => new HeroSlogan(root));
})();
