/* VMAX featured projects: a single-row carousel with a raised centre card.
   Cards are built from config.projects in script.js; this file positions them, handles
   arrows, dragging/swiping, keyboard and the pagination bars. */
(() => {
  const section = document.querySelector("#du-an");
  const stage = section && section.querySelector("#project-track");
  const cards = stage ? [...stage.querySelectorAll(".project-card")] : [];
  if (!cards.length) return;

  const pagination = section.querySelector("#project-pagination");
  const status = section.querySelector("#slider-status");
  const controls = [...section.querySelectorAll("[data-slide]")];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const count = cards.length;
  const names = cards.map((card) => card.querySelector("h3").textContent.trim());

  let active = 0;
  let step = 0;
  let cardWidth = 0;
  let drag = 0;
  let dragging = false;
  let suppressClick = false;
  let previous = cards.map(() => null);

  const SCALE = { 0: 1.14, 1: 0.92, 2: 0.86 };
  const LIFT = { 0: 0, 1: 16, 2: 34 };
  const PUSH = 0.06; // side cards sit a little further out so the enlarged centre card never touches them
  const TILT = { 0: 0, 1: 1.2, 2: 1.8 };

  // Signed shortest distance of card i from the active card (the row wraps around).
  function offsetOf(i) {
    let d = (((i - active) % count) + count) % count;
    if (d > count / 2) d -= count;
    return d;
  }

  function measure() {
    const width = stage.clientWidth;
    const visible = width >= 1480 ? 4.3 : width >= 1080 ? 3.3 : width >= 680 ? 2.3 : 1.28;
    const gap = width < 680 ? 14 : 20;
    cardWidth = Math.min(460, (width - (visible - 1) * gap) / visible);
    step = cardWidth + gap;
    stage.style.setProperty("--cw", cardWidth + "px");
  }

  function place(card, i, instant) {
    const d = offsetOf(i);
    const far = Math.abs(d);
    const key = Math.min(far, 2);
    const sign = Math.sign(d);
    const opacity = far <= 1 ? 1 : far === 2 ? 0.7 : 0;
    const wrapped = previous[i] !== null && Math.abs(d - previous[i]) > 2 && !instant;
    previous[i] = d;

    if (wrapped) {
      // The card jumps across the row: do it unseen, then fade it in at its new place.
      card.style.transition = "none";
      card.style.opacity = "0";
    }
    const x = d * step + sign * (far ? PUSH * cardWidth : 0) + (dragging ? drag : 0);
    card.style.translate = `${x}px ${LIFT[key]}px`;
    card.style.scale = SCALE[key];
    card.style.rotate = `${sign * TILT[key]}deg`;
    card.style.zIndex = String(10 - far * 2 + (d === 0 ? 1 : 0));
    card.classList.toggle("is-active", d === 0);
    if (d === 0) card.setAttribute("aria-current", "true");
    else card.removeAttribute("aria-current");

    if (wrapped) {
      void card.offsetWidth;
      card.style.transition = "";
      requestAnimationFrame(() => {
        card.style.opacity = String(opacity);
      });
    } else {
      card.style.opacity = String(opacity);
    }
  }

  function render(instant) {
    cards.forEach((card, i) => place(card, i, instant));
    dots.forEach((dot, i) => {
      if (i === active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function go(index, announce = true) {
    active = ((index % count) + count) % count;
    render(false);
    if (announce) status.textContent = `Dự án ${active + 1} trên ${count}: ${names[active]}.`;
  }

  // Pagination bars
  const dots = names.map((name, i) => {
    const dot = document.createElement("button");
    dot.className = "project-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Xem dự án ${name}`);
    dot.addEventListener("click", () => go(i));
    pagination.append(dot);
    return dot;
  });

  controls.forEach((button) =>
    button.addEventListener("click", () => go(active + Number(button.dataset.slide))),
  );
  if (count < 2) {
    controls.forEach((button) => (button.hidden = true));
    pagination.hidden = true;
  }

  // Keyboard
  stage.tabIndex = 0;
  stage.setAttribute("aria-label", "Danh sách dự án. Dùng phím mũi tên trái phải để xem tiếp.");
  stage.addEventListener("keydown", (event) => {
    if (event.target !== stage) return;
    const next = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: count - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    go(next);
  });

  // Mouse / touch drag. Vertical scrolling stays native (touch-action: pan-y in the CSS).
  // Tracking is done on window so the drag always ends on release, even if the browser drops pointer capture.
  let startX = 0;
  let pointerId = null;
  function onMove(event) {
    if (pointerId !== event.pointerId) return;
    const dx = event.clientX - startX;
    if (!dragging && Math.abs(dx) > 8) {
      dragging = true;
      stage.classList.add("is-dragging");
    }
    if (dragging) {
      drag = dx;
      render(true);
    }
  }
  function endDrag(event) {
    if (pointerId !== event.pointerId) return;
    pointerId = null;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", endDrag);
    window.removeEventListener("pointercancel", endDrag);
    if (!dragging) return;
    const moved = drag;
    dragging = false;
    drag = 0;
    stage.classList.remove("is-dragging");
    suppressClick = true;
    setTimeout(() => (suppressClick = false), 80);
    const steps = Math.abs(moved) > step * 0.18 ? Math.max(1, Math.min(2, Math.round(Math.abs(moved) / step))) : 0;
    if (steps) go(active - Math.sign(moved) * steps);
    else render(false);
  }
  stage.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    startX = event.clientX;
    pointerId = event.pointerId;
    drag = 0;
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
  });

  // A click on a side card brings it to the centre; only the centre card (or its arrow) opens the project.
  stage.addEventListener(
    "click",
    (event) => {
      if (suppressClick) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      const image = event.target.closest(".project-image-button");
      const card = image && image.closest(".project-card");
      if (!card) return;
      const index = cards.indexOf(card);
      if (index !== active) {
        event.preventDefault();
        event.stopPropagation();
        go(index);
      }
    },
    true,
  );

  // Layout
  function layout() {
    measure();
    stage.classList.add("is-measuring");
    render(true);
    void stage.offsetWidth;
    stage.classList.remove("is-measuring");
  }
  if ("ResizeObserver" in window) new ResizeObserver(layout).observe(stage);
  else window.addEventListener("resize", layout);
  layout();
  status.textContent = "";
  void reduceMotion;
})();
