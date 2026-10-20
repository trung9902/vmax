/* Nội dung đối chiếu từ vmaxtech.vn ngày 16/10/2026.
 * Số liệu và đánh giá là thông tin do VMAX công bố, không phải kiểm định độc lập.
 * Hero và ảnh văn phòng vẫn là hình minh họa; form chưa có backend.
 */
window.VMAX_CONFIG = {
  source: {
    website: "https://vmaxtech.vn/",
    about: "https://vmaxtech.vn/ve-chung-toi",
    projects: "https://vmaxtech.vn/du-an",
    contact: "https://vmaxtech.vn/lien-he",
    news: "https://vmaxtech.vn/tin-tuc",
    checkedOn: "2026-10-16",
  },
  company: {
    name: "Công ty TNHH Công Nghệ số Vmax",
    taxId: "0111534208",
    tagline: "Đồng hành để dẫn đầu",
  },
  heroMotion: { enabled: true, parallax: true },
  stats: {
    projects: "500+",
    clients: "500+",
    satisfaction: "98%",
    testimonialClients: "500+",
  },
  contact: {
    email: "vmaxdigital102@gmail.com",
    phone: "0818.99.33.55",
    phoneLink: "0818993355",
    address: "Số 95 Hưng Phúc, phường Yên Sở, Hoàng Mai, Hà Nội",
    hours: "Thứ 2 – Thứ 7, 8:00 – 18:00",
    zalo: "https://zalo.me/0818993355",
  },
  social: {
    YouTube: "https://www.youtube.com/watch?v=WyiyPiWL0cg",
    Zalo: "https://zalo.me/0818993355",
  },
  servicesSource: {
    website: "https://vmaxtech.vn/thiet-ke-website",
    seo: "https://vmaxtech.vn/dich-vu-seo",
    ads: "https://vmaxtech.vn/ve-chung-toi",
  },
  // Add a local MP4 path here later, for example "assets/vmax-intro.mp4".
  videoUrl: "",
  videoAutoplay: true,
  videoWatchUrl: "https://www.youtube.com/watch?v=WyiyPiWL0cg",
  news: [
    {
      title: "Chuyển đổi số cho doanh nghiệp",
      url: "https://vmaxtech.vn/vmax-dong-hanh-de-dan-dau-trong-chuyen-doi-so-cho-doanh-nghiep",
    },
    {
      title: "Tìm hiểu trình duyệt Anti Detect",
      url: "https://vmaxtech.vn/trinh-duyet-anti-detect-la-gi",
    },
    {
      title: "Plugin WordPress cho người mới",
      url: "https://vmaxtech.vn/plugin-wordpress-la-gi-huong-dan-cho-nguoi-moi-bat-dau",
    },
  ],
  testimonials: [
    {
      name: "Chị Minh Thư",
      role: "CEO & Sáng lập — Thời trang LinStore",
      shortRole: "CEO, LinStore",
      avatar: "assets/review-official-0.webp",
      rating: "4.95",
      summary:
        "Website tải nhanh hơn, hỗ trợ cải thiện lượng đơn hàng trực tuyến.",
    },
    {
      name: "Anh Quốc Hoàng",
      role: "Giám đốc — Nội thất Luxury Home",
      shortRole: "GĐ, Luxury Home",
      avatar: "assets/review-official-1.webp",
      rating: "4.90",
      summary:
        "Đánh giá tích cực về báo cáo SEO và khả năng cải thiện thứ hạng.",
    },
    {
      name: "Bác sĩ Lê Tâm",
      role: "Đồng sáng lập — Nha Khoa Quốc Tế Flora",
      shortRole: "Đồng sáng lập, Flora",
      avatar: "assets/review-official-2.webp",
      rating: "5.00",
      summary: "Hài lòng với sự ổn định của website và cách hỗ trợ kỹ thuật.",
    },
  ],
  projects: [
    {
      id: "luxhome",
      name: "Nội thất LuxHome",
      category: "Nội thất & xây dựng",
      image: "assets/project-luxhome.webp",
      theme: "official",
      url: "https://vmaxtech.vn/noi-that-cao-cap-luxhome-biet-thu",
      description:
        "Website giới thiệu không gian nội thất, năng lực thiết kế và thi công của LuxHome.",
    },
    {
      id: "masteri",
      name: "Masteri Land",
      category: "Bất động sản",
      image: "assets/project-masteri.webp",
      theme: "official",
      url: "https://vmaxtech.vn/landing-page-masteri-land-bat-dong-san",
      description:
        "Trang đích giới thiệu bất động sản, hỗ trợ khách hàng đăng ký tìm hiểu và xem nhà mẫu.",
    },
    {
      id: "spa",
      name: "Spa Thảo Mộc",
      category: "Thẩm mỹ & chăm sóc sức khỏe",
      image: "assets/project-spa.webp",
      theme: "official",
      url: "https://vmaxtech.vn/spa-thao-moc-duong-sinh-tri-lieu",
      description:
        "Website thông tin liệu trình, giá dịch vụ và hỗ trợ đặt lịch cho Spa Thảo Mộc.",
    },
    {
      id: "auto",
      name: "Auto Luxury",
      category: "Showroom ô tô",
      image: "assets/project-auto.webp",
      theme: "official",
      url: "https://vmaxtech.vn/showroom-auto-luxury-xe-sang",
      description:
        "Website trưng bày xe, cung cấp thông số và hỗ trợ khách hàng đăng ký lái thử.",
    },
    {
      id: "monamour",
      name: "MonAmour Studio",
      category: "Nhiếp ảnh & ảnh cưới",
      image: "assets/project-monamour.webp",
      theme: "official",
      url: "https://vmaxtech.vn/monamour-wedding-studio-anh-cuoi",
      description:
        "Website giới thiệu bộ ảnh cưới, các gói chụp và tiếp nhận lịch hẹn.",
    },
  ],
  // Section "VMAX In Action" (#doi-ngu). To change a photo: replace the file in assets/team/ or edit "src".
  // row: "top" | "bottom" · size: "tall" | "mid" | "narrow" | "wide" | "short" · position: CSS object-position
  // visible: false hides a photo. Update "alt" to describe each real photo. Order = order in its row.
  gallery: {
    photos: [
      {
        src: "assets/team/team-01.webp",
        alt: "Hoạt động của đội ngũ VMAX — ảnh 1",
        row: "top",
        size: "mid",
        position: "50% 30%",
        visible: true,
      },
      {
        src: "assets/team/team-02.webp",
        alt: "Hoạt động của đội ngũ VMAX — ảnh 2",
        row: "top",
        size: "tall",
        position: "50% 30%",
        visible: true,
      },
      {
        src: "assets/team/team-03.webp",
        alt: "Hoạt động của đội ngũ VMAX — ảnh 3",
        row: "top",
        size: "mid",
        position: "50% 30%",
        visible: true,
      },
      {
        src: "assets/team/team-04.webp",
        alt: "Hoạt động của đội ngũ VMAX — ảnh 4",
        row: "top",
        size: "short",
        position: "50% 30%",
        visible: true,
      },
      {
        src: "assets/team/team-05.webp",
        alt: "Hoạt động của đội ngũ VMAX — ảnh 5",
        row: "top",
        size: "mid",
        position: "50% 30%",
        visible: true,
      },
      {
        src: "assets/team/team-06.webp",
        alt: "Hoạt động của đội ngũ VMAX — ảnh 6",
        row: "top",
        size: "tall",
        position: "50% 30%",
        visible: true,
      },
      {
        src: "assets/team/team-07.webp",
        alt: "Hoạt động của đội ngũ VMAX — ảnh 7",
        row: "bottom",
        size: "mid",
        position: "50% 30%",
        visible: true,
      },
      {
        src: "assets/team/team-08.webp",
        alt: "Hoạt động của đội ngũ VMAX — ảnh 8",
        row: "bottom",
        size: "narrow",
        position: "50% 30%",
        visible: true,
      },
      {
        src: "assets/team/team-09.webp",
        alt: "Hoạt động của đội ngũ VMAX — ảnh 9",
        row: "bottom",
        size: "mid",
        position: "50% 30%",
        visible: true,
      },
      {
        src: "assets/team/team-10.webp",
        alt: "Hoạt động của đội ngũ VMAX — ảnh 10",
        row: "bottom",
        size: "tall",
        position: "50% 30%",
        visible: true,
      },
      {
        src: "assets/team/team-11.webp",
        alt: "Hoạt động của đội ngũ VMAX — ảnh 11",
        row: "bottom",
        size: "mid",
        position: "50% 30%",
        visible: true,
      },
      {
        src: "assets/team/team-12.webp",
        alt: "Hoạt động của đội ngũ VMAX — ảnh 12",
        row: "bottom",
        size: "wide",
        position: "50% 30%",
        visible: true,
      },
    ],
  },
};
