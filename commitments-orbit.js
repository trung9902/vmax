/* VMAX commitments: the 9 items travel along the orbit around the logo (desktop only). */
(() => {
  const net = document.querySelector("#cam-ket .commitment-network");
  const svg = net && net.querySelector(".commitment-connections");
  if (!net || !svg) return;

  const nodes = [...net.querySelectorAll(".commitment-node")];
  const count = nodes.length;
  const desktop = matchMedia("(min-width: 900px)");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const SVG_NS = "http://www.w3.org/2000/svg";
  const SECONDS_PER_TURN = 70;
  const START = -Math.PI / 2;

  // Spokes from the logo to each item, plus one travelling dot per spoke.
  const group = document.createElementNS(SVG_NS, "g");
  group.setAttribute("class", "orbit-spokes");
  const spokes = nodes.map(() => {
    const line = document.createElementNS(SVG_NS, "line");
    group.appendChild(line);
    return line;
  });
  const packets = nodes.map((_, i) => {
    const dot = document.createElementNS(SVG_NS, "circle");
    dot.setAttribute("r", "3.4");
    if (i % 2) dot.setAttribute("class", "packet-orange");
    group.appendChild(dot);
    return dot;
  });
  svg.appendChild(group);

  let width = 0;
  let height = 0;
  let rx = 0;
  let ry = 0;
  let offsets = [];
  let angle = 0;
  let speed = 1;
  let target = 1;
  let last = 0;
  let raf = 0;
  let inView = true;

  function measure() {
    width = net.clientWidth;
    height = net.clientHeight;
    offsets = nodes.map((node) => {
      const visual = node.querySelector(".commitment-visual");
      return {
        x: node.offsetWidth / 2,
        y: visual.offsetTop + visual.offsetHeight / 2,
        h: node.offsetHeight,
      };
    });
    const halfW = Math.max(...offsets.map((o) => o.x));
    const above = Math.max(...offsets.map((o) => o.y));
    const below = Math.max(...offsets.map((o) => o.h - o.y));
    rx = Math.max(60, width / 2 - halfW - 8);
    ry = Math.max(60, height / 2 - Math.max(above, below) - 8);
    net.style.setProperty("--orbit-w", rx * 2 + "px");
    net.style.setProperty("--orbit-h", ry * 2 + "px");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("preserveAspectRatio", "none");
    spokes.forEach((line) => {
      line.setAttribute("x1", width / 2);
      line.setAttribute("y1", height / 2);
    });
  }

  function render(seconds) {
    const cx = width / 2;
    const cy = height / 2;
    nodes.forEach((node, i) => {
      const a = START + (i * 2 * Math.PI) / count + angle;
      const x = cx + rx * Math.cos(a);
      const y = cy + ry * Math.sin(a);
      node.style.translate = `${x - offsets[i].x}px ${y - offsets[i].y}px`;
      spokes[i].setAttribute("x2", x);
      spokes[i].setAttribute("y2", y);
      const phase = (seconds * 0.3 + i * 0.13) % 1;
      packets[i].setAttribute("cx", cx + (x - cx) * phase);
      packets[i].setAttribute("cy", cy + (y - cy) * phase);
      packets[i].setAttribute("opacity", Math.sin(Math.PI * phase).toFixed(2));
    });
  }

  function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000 || 0);
    last = now;
    speed += (target - speed) * Math.min(1, dt * 6);
    angle += (speed * dt * 2 * Math.PI) / SECONDS_PER_TURN;
    render(now / 1000);
    raf = requestAnimationFrame(tick);
  }

  function start() {
    if (raf || reduceMotion.matches || !inView || !net.classList.contains("is-orbit")) return;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  }

  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  function sync() {
    stop();
    const on = desktop.matches;
    net.classList.toggle("is-orbit", on);
    if (!on) {
      nodes.forEach((node) => node.style.removeProperty("translate"));
      return;
    }
    measure();
    render(0);
    start();
  }

  nodes.forEach((node) => {
    node.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "mouse") target = 0;
    });
    node.addEventListener("pointerleave", () => {
      target = 1;
    });
  });

  desktop.addEventListener("change", sync);
  reduceMotion.addEventListener("change", sync);
  if ("ResizeObserver" in window) {
    new ResizeObserver(() => {
      if (net.classList.contains("is-orbit")) {
        measure();
        render(last / 1000);
      }
    }).observe(net);
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    }).observe(net);
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (net.classList.contains("is-orbit")) {
        measure();
        render(last / 1000);
      }
    });
  }
  sync();
})();
