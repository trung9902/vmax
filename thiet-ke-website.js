const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Menu di động */
const header = document.querySelector(".wd-header");
const menuButton = document.querySelector(".wd-menu-toggle");
const menu = document.querySelector(".wd-nav");

function closeMenu() {
  if (!menuButton || !menu) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Mở menu");
  menu.classList.remove("is-open");
}

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    menu.classList.toggle("is-open", open);
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
}

/* Scroll reveal. Sau khi hiện xong, bỏ lớp wd-reveal để hover transform hoạt động. */
const revealItems = document.querySelectorAll(".wd-reveal");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const item = entry.target;
        item.classList.add("is-visible");
        observer.unobserve(item);
        window.setTimeout(() => item.classList.remove("wd-reveal"), 1400);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  revealItems.forEach((item, index) => {
    item.style.setProperty("--rd", `${(index % 3) * 0.08}s`);
    revealObserver.observe(item);
  });
}

/* Xem trước website theo ngành */
const industries = document.querySelectorAll(".wd-industry");
const previews = document.querySelectorAll(".wd-preview-stack img");

function showPreview(index) {
  industries.forEach((item) => item.classList.toggle("is-active", item.dataset.preview === index));
  previews.forEach((img, i) => img.classList.toggle("is-active", String(i) === index));
}
industries.forEach((item) => {
  ["mouseenter", "focus"].forEach((type) => item.addEventListener(type, () => showPreview(item.dataset.preview)));
});

/* Timeline: đường nối và các mốc sáng dần theo vị trí cuộn */
const timeline = document.getElementById("wd-timeline");
const steps = timeline ? [...timeline.querySelectorAll(".wd-step")] : [];
let ticking = false;

function updateScroll() {
  ticking = false;
  const y = window.scrollY;
  header?.classList.toggle("is-stuck", y > 8);

  if (timeline) {
    const rect = timeline.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.min(1, Math.max(0, (vh * 0.72 - rect.top) / (rect.height + vh * 0.1)));
    timeline.style.setProperty("--p", reduceMotion ? 1 : progress.toFixed(3));
    steps.forEach((step, i) => step.classList.toggle("is-done", reduceMotion || progress >= (i + 0.35) / steps.length));
  }
}
function requestUpdate() {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(updateScroll);
}
window.addEventListener("scroll", requestUpdate, { passive: true });
window.addEventListener("resize", requestUpdate);
updateScroll();

/* Hero: chiều sâu nhẹ theo con trỏ (chỉ trên thiết bị có chuột, tôn trọng giảm chuyển động) */
const stage = document.querySelector(".wd-stage");
if (stage && !reduceMotion && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
  const layers = [...stage.querySelectorAll("[data-depth]")];
  let frame = 0;
  const move = (event) => {
    const box = stage.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth);
        layer.style.translate = `${(x * depth).toFixed(1)}px ${(y * depth * 0.7).toFixed(1)}px`;
      });
    });
  };
  stage.addEventListener("pointermove", move);
  stage.addEventListener("pointerleave", () => layers.forEach((layer) => (layer.style.translate = "")));
}

const year = document.getElementById("wd-year");
if (year) year.textContent = String(new Date().getFullYear());
