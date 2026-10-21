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

/* Hero: chiều sâu 3D tương tác theo con trỏ chuột */
const heroVisual = document.querySelector(".wd-hero-visual");
if (heroVisual && !reduceMotion && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
  const container = heroVisual.querySelector(".wd-visual-container");
  const depthElements = [...heroVisual.querySelectorAll("[data-depth]")];
  let frame = 0;

  const move = (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      if (container) {
        container.style.transform = `perspective(1200px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg)`;
      }
      depthElements.forEach((el) => {
        const depth = Number(el.dataset.depth) || 10;
        el.style.translate = `${(x * depth).toFixed(1)}px ${(y * depth * 0.75).toFixed(1)}px`;
      });
    });
  };

  heroVisual.addEventListener("pointermove", move);
  heroVisual.addEventListener("pointerleave", () => {
    if (container) {
      container.style.transition = "transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)";
      container.style.transform = "";
      window.setTimeout(() => { container.style.transition = ""; }, 600);
    }
    depthElements.forEach((el) => {
      el.style.transition = "translate 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)";
      el.style.translate = "";
      window.setTimeout(() => { el.style.transition = ""; }, 600);
    });
  });
}

/* Hiệu ứng số đếm động cho thẻ thống kê năng lực */
function initHeroCounters() {
  const statNumbers = document.querySelectorAll(".wd-stat-num");
  if (!statNumbers.length) return;

  if (reduceMotion) {
    statNumbers.forEach((el) => {
      el.textContent = `${el.dataset.target}${el.dataset.suffix || ""}`;
    });
    return;
  }

  const duration = 1600;
  const startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    // Smooth easeOutExpo curve
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

    statNumbers.forEach((el) => {
      const target = Number(el.dataset.target) || 0;
      const suffix = el.dataset.suffix || "";
      const current = Math.round(target * ease);
      el.textContent = `${current}${suffix}`;
    });

    if (progress < 1) {
      window.requestAnimationFrame(animate);
    }
  }

  // Chạy sau khi hero hoàn tất fade-in
  window.setTimeout(() => window.requestAnimationFrame(animate), 350);
}
initHeroCounters();

/* Mobile Carousel cho Section Giải Pháp (Phương án 2) */
function initSolutionCarousel() {
  const container = document.getElementById("wdSolProjects");
  const dots = document.querySelectorAll(".wd-sol-dot");
  if (!container || !dots.length) return;

  const cards = container.querySelectorAll(".wd-sol-card");

  let scrollTimeout;
  container.addEventListener("scroll", () => {
    if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
    scrollTimeout = requestAnimationFrame(() => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = cards[0]?.offsetWidth || container.offsetWidth;
      const activeIndex = Math.min(
        dots.length - 1,
        Math.max(0, Math.round(scrollLeft / (cardWidth + 14)))
      );
      dots.forEach((dot, i) => {
        const isActive = i === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-selected", String(isActive));
      });
    });
  }, { passive: true });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.index) || 0;
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      }
    });
  });
}
initSolutionCarousel();

const year = document.getElementById("wd-year");
if (year) year.textContent = String(new Date().getFullYear());

