/* VMAX — JavaScript thuần. Không phụ thuộc thư viện hoặc công cụ build. */
"use strict";

const config = window.VMAX_CONFIG;
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHTML = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );

// Bộ icon SVG nét mảnh được lưu ngay trong mã để trang hoạt động ngoại tuyến.
const icons = {
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  "arrow-down": '<path d="M12 3v18m-6-6 6 6 6-6"/>',
  "chevron-left": '<path d="m14 5-7 7 7 7"/>',
  "chevron-right": '<path d="m9 5 7 7-7 7"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  play: '<path d="m8 4 13 8-13 8Z"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  strategy:
    '<path d="M8 4c-5-3-7 4-2 8s5 10 9 8 1-7-3-10-5-8-1-9m5 3c5-3 7 4 2 8s-5 10-9 8-1-7 3-10 5-8 1-9"/>',
  puzzle:
    '<path d="M9 3H4v6h2a2 2 0 1 1 0 4H4v7h6v-2a2 2 0 1 1 4 0v2h6v-6h-2a2 2 0 1 1 0-4h2V3h-6v2a2 2 0 1 1-4 0V3Z"/>',
  support:
    '<rect x="5" y="3" width="14" height="18" rx="3"/><path d="M9 8h6v6H9zM11 18h2"/>',
  diamond:
    '<path d="m3 8 4-5h10l4 5-9 13L3 8Zm0 0h18M7 3l5 18 5-18M8 8l4-5 4 5"/>',
  users:
    '<circle cx="10" cy="7" r="3"/><path d="M4 21v-5a6 6 0 0 1 12 0v5H4Zm13-16a3 3 0 0 1 0 6m2 3c2 1 3 3 3 6h-4"/>',
  layout:
    '<rect x="3" y="4" width="18" height="14" rx="1"/><path d="M8 21h8m-4-3v3M7 8h3v5H7zm7 0h3m-3 4h3M2 8H1m22 6h-1"/>',
  phone:
    '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/>',
  settings:
    '<path d="m9 3-1 3-3 1-1 3 2 2-1 3 2 3 3-1 2 3 3-1 1-3 3-1 1-3-2-2 1-3-2-3-3 1-2-3Z"/><circle cx="12" cy="11" r="3"/>',
  "thumbs-up":
    '<path d="M8 10 11 3a2 2 0 0 1 3 2v4h5a2 2 0 0 1 2 2l-2 9H8V10ZM3 10h5v10H3Z"/>',
  trend: '<path d="m3 20 6-9 5 4 7-12m-6 0h6v6"/>',
  headphones:
    '<path d="M4 14v-3a8 8 0 0 1 16 0v3M4 12H2v7h4v-7H4Zm16 0h2v7h-4v-7h2Zm0 7v2h-7"/><path d="M9 5c-3 1-4 3-4 5m10-5c3 1 4 3 4 5"/>',
  file: '<path d="M6 2h9l4 4v16H6V2Zm9 0v5h4"/><rect x="9" y="12" width="7" height="6" rx="1"/><path d="M11 12v-1a2 2 0 0 1 4 0v1"/>',
  call: '<path d="m5 3 4 1 1 5-3 2a15 15 0 0 0 6 6l2-3 5 1 1 4c0 2-2 3-4 2C9 20 4 15 3 7c-1-2 0-4 2-4Z"/><path d="M15 3a7 7 0 0 1 6 6m-6-2a3 3 0 0 1 2 2"/>',
  pin: '<path d="M19 10c0 6-7 12-7 12S5 16 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="9" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  youtube:
    '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z"/>',
};

function renderIcons(root = document) {
  $$("[data-icon]", root).forEach((node) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = icons[node.dataset.icon] || icons.arrow;
    node.replaceWith(svg);
  });
}
renderIcons();

$$("[data-stat]").forEach((node) => {
  node.textContent = config.stats[node.dataset.stat] || node.textContent;
});
$("#copyright-year").textContent = new Date().getFullYear();
// Official business data is distinct from the remaining illustrative images.
$$(".testimonial-grid .testimonial").forEach((card, index) => {
  const review = config.testimonials?.[index];
  if (!review) return;
  $(".review-text", card).textContent = review.summary;
  const avatar = $(".testimonial-avatar", card);
  if (avatar) {
    avatar.src = review.avatar;
    avatar.alt = `Ảnh ${review.name} được đăng trên vmaxtech.vn`;
  }
  $(".reviewer strong", card).textContent = review.name;
  const role = $(".reviewer small", card);
  role.textContent = review.shortRole;
  role.title = review.role;
  $(".stars", card).setAttribute(
    "aria-label",
    `${review.rating} trên 5 sao, theo vmaxtech.vn`,
  );
  $(".review-rating", card).textContent = `${review.rating}/5`;
});
$$('a[href^="tel:"]').forEach((node) => {
  node.href = `tel:${config.contact.phoneLink}`;
  node.lastChild.textContent = ` ${config.contact.phone}`;
});
$$('a[href^="mailto:"]').forEach((node) => {
  node.href = `mailto:${config.contact.email}`;
  if (!node.id && node.hasAttribute("data-contact-email"))
    node.lastChild.textContent = ` ${config.contact.email}`;
});

// Mobile navigation: native links, Escape, and resize all close the menu.
const menuToggle = $(".menu-toggle");
const nav = $("#main-nav");
function closeMenu() {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Mở menu");
  document.body.classList.remove("mobile-menu-open");
}
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  nav.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
  document.body.classList.toggle("mobile-menu-open", open);
});
nav.addEventListener("click", (event) => {
  if (event.target.closest("a,button")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});
window.matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});
const header = $(".site-header");
window.addEventListener(
  "scroll",
  () => header.classList.toggle("scrolled", window.scrollY > 15),
  { passive: true },
);

// Section reveal and active navigation respect reduced-motion preferences.
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window) {
  if (!motionPreference.matches)
    document.documentElement.classList.add("js-motion");
  const revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      }),
    { threshold: 0.08 },
  );
  $$(".reveal").forEach((node) => revealObserver.observe(node));
  const sectionObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        $$(".main-nav a").forEach((link) => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }),
    { rootMargin: "-15% 0px -55% 0px" },
  );
  $$("main section[id], .service-card[id]").forEach((section) =>
    sectionObserver.observe(section),
  );
}

// Project cards are built from config.projects; the carousel behaviour lives in projects-vmax.js.
const track = $("#project-track");
config.projects.forEach((project) => {
  const card = document.createElement("article");
  card.className = "project-card";
  card.innerHTML = `<button class="project-image-button" data-project="${escapeHTML(project.id)}" aria-label="Xem dự án ${escapeHTML(project.name)}"><div class="project-thumbnail official"><img src="${escapeHTML(project.image)}" alt="Ảnh dự án ${escapeHTML(project.name)} được công bố trên vmaxtech.vn" width="700" height="347" loading="lazy" decoding="async" draggable="false"></div></button><div class="project-info"><div><h3>${escapeHTML(project.name)}</h3><p>${escapeHTML(project.category)}</p></div><button class="round-arrow" data-project="${escapeHTML(project.id)}" aria-label="Chi tiết ${escapeHTML(project.name)}"><i data-icon="arrow"></i></button></div>`;
  track.append(card);
});
renderIcons(track);

const contactDialog = $("#contact-dialog");
const detailDialog = $("#detail-dialog");
function closeDialog(dialog) {
  dialog.close();
}
$$("dialog").forEach((dialog) => {
  dialog.addEventListener("close", () => {
    if (!$$("dialog[open]").length)
      document.body.classList.remove("modal-open");
    $$("video", dialog).forEach((video) => video.pause());
  });
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      closeDialog(dialog);
  });
});
function openContact(service) {
  closeMenu();
  if (detailDialog.open) detailDialog.close();
  if (service) $("#service").value = service;
  document.body.classList.add("modal-open");
  contactDialog.showModal();
}
function openDetail(markup) {
  $("#detail-body").innerHTML = markup;
  renderIcons($("#detail-body"));
  document.body.classList.add("modal-open");
  if (!detailDialog.open) detailDialog.showModal();
  detailDialog.scrollTop = 0;
}
const detailHeader = (label, title) =>
  `<p class="eyebrow"><em>${label}</em> VMAX</p><h2 id="detail-heading">${title}</h2>`;
const contactButton = (service = "") =>
  `<button class="button button-green" data-contact="${escapeHTML(service)}">Trao đổi về dự án <i data-icon="arrow"></i></button>`;
const services = {
  website: {
    title: 'Thiết kế Website<br><span class="text-green">chuẩn SEO.</span>',
    name: "Thiết kế Website",
    intro:
      "Một website tốt là nền tảng để doanh nghiệp thể hiện thương hiệu, giới thiệu sản phẩm và kết nối với khách hàng.",
    items: [
      "Tư vấn cấu trúc nội dung phù hợp với mục tiêu kinh doanh.",
      "Thiết kế giao diện riêng, đồng nhất nhận diện thương hiệu.",
      "Hiển thị linh hoạt trên máy tính, máy tính bảng và điện thoại.",
      "Tối ưu tốc độ, cấu trúc SEO và khả năng quản trị nội dung.",
      "Kiểm thử, bàn giao và hướng dẫn vận hành.",
    ],
  },
  seo: {
    title:
      'SEO tổng thể.<br><span class="text-green">Tăng trưởng bền vững.</span>',
    name: "SEO tổng thể",
    intro:
      "Xây dựng khả năng hiện diện trên công cụ tìm kiếm bằng chiến lược nội dung, nền tảng kỹ thuật và trải nghiệm người dùng.",
    items: [
      "Đánh giá hiện trạng website và thị trường mục tiêu.",
      "Nghiên cứu từ khóa theo nhu cầu tìm kiếm của khách hàng.",
      "Xây dựng cấu trúc website và kế hoạch nội dung.",
      "Tối ưu kỹ thuật, nội dung và các liên kết nội bộ.",
      "Theo dõi, đo lường và điều chỉnh chiến lược định kỳ.",
    ],
  },
  ads: {
    title:
      'Quảng cáo Google Ads.<br><span class="text-green">Đúng người, đúng thời điểm.</span>',
    name: "Google Ads",
    intro:
      "Tiếp cận khách hàng có nhu cầu bằng chiến dịch được xây dựng từ mục tiêu, ngân sách và dữ liệu chuyển đổi.",
    items: [
      "Phân tích sản phẩm, khách hàng và khu vực tiếp cận.",
      "Lập kế hoạch ngân sách và cấu trúc chiến dịch.",
      "Xây dựng nội dung quảng cáo và trang đích phù hợp.",
      "Thiết lập đo lường chuyển đổi và theo dõi hiệu suất.",
      "Tối ưu chiến dịch và báo cáo minh bạch.",
    ],
  },
};
function openService(key) {
  const service = services[key];
  if (!service) return;
  openDetail(
    `${detailHeader("GIẢI PHÁP", service.title)}<p>${service.intro}</p><h3>Đồng hành cùng doanh nghiệp</h3><ul>${service.items.map((item) => `<li>${item}</li>`).join("")}</ul><p><a class="contact-inline" href="${escapeHTML(config.servicesSource[key])}" target="_blank" rel="noopener noreferrer">Xem thông tin dịch vụ trên vmaxtech.vn →</a></p>${contactButton(service.name)}`,
  );
}
function openProject(id) {
  const project = config.projects.find((item) => item.id === id);
  if (!project) return;
  openDetail(
    `${detailHeader("DỰ ÁN", escapeHTML(project.name))}<span class="content-label">${escapeHTML(project.category)}</span><img class="detail-image" src="${escapeHTML(project.image)}" alt="Ảnh dự án ${escapeHTML(project.name)} từ vmaxtech.vn"><p>${escapeHTML(project.description)}</p><p><a class="contact-inline" href="${escapeHTML(project.url)}" target="_blank" rel="noopener noreferrer">Xem hồ sơ dự án trên website chính thức →</a></p>${contactButton("Thiết kế Website")}`,
  );
}
const articles = config.news;
function openContent(key) {
  const officialLink = (url, label) =>
    '<a class="contact-inline" href="' +
    escapeHTML(url) +
    '" target="_blank" rel="noopener noreferrer">' +
    label +
    " →</a>";
  const content = {
    about:
      detailHeader(
        "VỀ",
        'Đồng hành<br><span class="text-green">để dẫn đầu.</span>',
      ) +
      "<p>Công ty TNHH Công Nghệ số Vmax phát triển giải pháp website và SEO cho doanh nghiệp. Hệ sinh thái được giới thiệu trên website chính còn bao gồm tiếp thị đa kênh, công cụ tự động hóa và đào tạo.</p><p>VMAX nhấn mạnh việc theo sát hoạt động kinh doanh, đo lường hiệu quả và giúp doanh nghiệp chủ động vận hành nền tảng số.</p><p>" +
      officialLink(
        config.source.about,
        "Đọc giới thiệu đầy đủ trên vmaxtech.vn",
      ) +
      "</p>" +
      contactButton(),
    services:
      detailHeader(
        "DỊCH VỤ",
        'Giải pháp số<br><span class="text-green">cho doanh nghiệp.</span>',
      ) +
      "<p>Chọn dịch vụ để xem nội dung tư vấn.</p>" +
      Object.entries(services)
        .map(
          ([id, item]) =>
            '<button class="article-link" data-service="' +
            id +
            '">' +
            item.name +
            " →</button>",
        )
        .join("") +
      '<button class="article-link" data-content="maintenance">Bảo trì website →</button>',
    projects:
      detailHeader(
        "DỰ ÁN",
        'Những giải pháp<br><span class="text-green">VMAX đã giới thiệu.</span>',
      ) +
      "<p>Thông tin và ảnh lấy từ danh mục dự án trên website chính thức.</p>" +
      config.projects
        .map(
          (project) =>
            '<button class="project-list-item" data-project="' +
            escapeHTML(project.id) +
            '"><img src="' +
            escapeHTML(project.image) +
            '" alt=""><span><strong>' +
            escapeHTML(project.name) +
            "</strong><small>" +
            escapeHTML(project.category) +
            "</small></span></button>",
        )
        .join("") +
      "<p>" +
      officialLink(
        config.source.projects,
        "Xem toàn bộ dự án trên vmaxtech.vn",
      ) +
      "</p>",
    news:
      detailHeader(
        "GÓC KIẾN THỨC",
        'Bài viết từ<br><span class="text-green">VMAX Tech.</span>',
      ) +
      "<p>Đọc bài viết đầy đủ trên website chính thức.</p>" +
      articles
        .map(
          (article) =>
            '<a class="article-link" href="' +
            escapeHTML(article.url) +
            '" target="_blank" rel="noopener noreferrer">' +
            escapeHTML(article.title) +
            " →</a>",
        )
        .join(""),
    maintenance:
      detailHeader(
        "DỊCH VỤ",
        'Chăm sóc và<br><span class="text-green">bảo trì website.</span>',
      ) +
      "<p>Trao đổi với VMAX để xác định phạm vi hỗ trợ, cập nhật và sao lưu phù hợp với website.</p><p>" +
      officialLink(
        "https://vmaxtech.vn/chinh-sach-bao-hanh",
        "Xem chính sách bảo hành của VMAX",
      ) +
      "</p>" +
      contactButton(),
    privacy:
      detailHeader("THÔNG TIN", "Chính sách bảo mật") +
      "<p>Bản chạy thử chỉ xử lý thông tin trong trình duyệt để soạn email, không tự gửi lên máy chủ.</p><p>" +
      officialLink(
        "https://vmaxtech.vn/chinh-sach-bao-mat",
        "Đọc chính sách chính thức của VMAX",
      ) +
      "</p>",
    terms:
      detailHeader("THÔNG TIN", "Điều khoản sử dụng") +
      "<p>Thông tin doanh nghiệp được đối chiếu với vmaxtech.vn. Mockup hero và ảnh văn phòng là hình minh họa.</p><p>" +
      officialLink(
        "https://vmaxtech.vn/dieu-khoan-su-dung",
        "Đọc điều khoản chính thức của VMAX",
      ) +
      "</p>",
    video:
      detailHeader(
        "GIỚI THIỆU",
        'Cùng tìm hiểu<br><span class="text-green">VMAX Tech.</span>',
      ) +
      '<p>Video giới thiệu được liên kết từ trang chủ chính thức của VMAX.</p><a class="button button-green" href="' +
      escapeHTML(config.videoWatchUrl) +
      '" target="_blank" rel="noopener noreferrer">Xem video trên YouTube <i data-icon="play"></i></a>',
  };
  if (content[key]) openDetail(content[key]);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, a[data-social]");
  if (!target) return;
  if (target.hasAttribute("data-close")) closeDialog(target.closest("dialog"));
  else if (target.hasAttribute("data-contact"))
    openContact(target.dataset.contact);
  else if (target.dataset.service) openService(target.dataset.service);
  else if (target.dataset.project) openProject(target.dataset.project);
  else if (target.dataset.content) openContent(target.dataset.content);
  else if (target.dataset.social) {
    const channel = target.dataset.social;
    const socialUrl = config.social[channel];
    if (socialUrl && /^https:\/\//.test(socialUrl))
      window.open(socialUrl, "_blank", "noopener,noreferrer");
    else
      openDetail(
        `${detailHeader("KẾT NỐI", "Trò chuyện cùng VMAX.")}<p>Kênh ${escapeHTML(channel)} chính thức đang chờ cập nhật. Bạn có thể liên hệ qua:</p><p><a class="contact-inline" href="tel:${escapeHTML(config.contact.phoneLink)}">${escapeHTML(config.contact.phone)}</a><br><a class="contact-inline" href="mailto:${escapeHTML(config.contact.email)}">${escapeHTML(config.contact.email)}</a></p>${contactButton()}`,
      );
  }
});

// Form validation and email adapter. No data is transmitted by this page.
const form = $("#contact-form");
let requestBody = "";
const fieldRules = [
  {
    name: "fullName",
    error: "name-error",
    validate: (value) => value.length >= 2,
    message: "Vui lòng nhập họ tên từ 2 ký tự.",
  },
  {
    name: "phone",
    error: "phone-error",
    validate: (value) =>
      /^(?:\+?84|0)[1-9]\d{8,9}$/.test(value.replace(/[\s().-]/g, "")),
    message: "Vui lòng nhập số điện thoại Việt Nam hợp lệ.",
  },
  {
    name: "email",
    error: "email-error",
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value),
    message: "Vui lòng nhập địa chỉ email hợp lệ.",
  },
  {
    name: "message",
    error: "message-error",
    validate: (value) => value.length >= 10,
    message: "Vui lòng mô tả nhu cầu ít nhất 10 ký tự.",
  },
];
function validateField(rule) {
  const field = form.elements.namedItem(rule.name);
  const valid = rule.validate(field.value.trim()) && field.validity.valid;
  field.setAttribute("aria-invalid", String(!valid));
  $(`#${rule.error}`).textContent = valid ? "" : rule.message;
  return valid;
}
fieldRules.forEach((rule) => {
  const field = form.elements.namedItem(rule.name);
  field.addEventListener("blur", () => {
    if (field.value || field.getAttribute("aria-invalid") === "true")
      validateField(rule);
  });
  field.addEventListener("input", () => {
    if (field.getAttribute("aria-invalid") === "true") validateField(rule);
  });
});
form.addEventListener("input", () => {
  $("#form-result").hidden = true;
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const results = fieldRules.map(validateField);
  if (results.includes(false)) {
    form.elements.namedItem(fieldRules[results.indexOf(false)].name).focus();
    return;
  }
  const data = Object.fromEntries(new FormData(form));
  requestBody = `Yêu cầu tư vấn VMAX\n\nHọ và tên: ${data.fullName.trim()}\nĐiện thoại: ${data.phone.trim()}\nEmail: ${data.email.trim()}\nDịch vụ: ${data.service}\n\nNội dung dự án:\n${data.message.trim()}`;
  $("#email-draft").href =
    `mailto:${config.contact.email}?subject=${encodeURIComponent(`Yêu cầu tư vấn — ${data.service}`)}&body=${encodeURIComponent(requestBody)}`;
  $("#form-result").hidden = false;
  $("#form-result").scrollIntoView({
    behavior: motionPreference.matches ? "instant" : "smooth",
    block: "nearest",
  });
});
let toastTimer;
function toast(message) {
  clearTimeout(toastTimer);
  const node = $("#toast");
  node.textContent = message;
  node.hidden = false;
  toastTimer = setTimeout(() => {
    node.hidden = true;
  }, 3500);
}
$("#copy-request").addEventListener("click", async () => {
  try {
    if (!navigator.clipboard) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(requestBody);
    toast("Đã sao chép nội dung yêu cầu.");
  } catch {
    const existing = $("#request-copy-text");
    if (existing) {
      existing.focus();
      existing.select();
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.id = "request-copy-text";
    textarea.readOnly = true;
    textarea.value = requestBody;
    textarea.setAttribute(
      "aria-label",
      "Nội dung yêu cầu — nhấn Ctrl+C hoặc giữ để sao chép",
    );
    textarea.style.cssText =
      "width:100%;min-height:150px;margin-top:12px;padding:10px;border:1px solid #c0d8c5;border-radius:8px;font-size:12px";
    $("#form-result").append(textarea);
    textarea.focus();
    textarea.select();
  }
});
