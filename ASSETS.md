# Tài nguyên hình ảnh

Tất cả tài nguyên cần để hiển thị trang đã được lưu trong `assets/`. Trang không cần kết nối nguồn ảnh hoặc font bên ngoài.

## Section Về VMAX — 17/10/2026

- Bản tối giản hiện tại không dùng sóng nền, mockup hoặc ảnh chụp website. Các file `about-vmax-website.*` được giữ từ bản trước, không còn tham chiếu trong section.
- `assets/vmax-video-thumbnail.jpg`: thumbnail max-resolution của video chính thức, tải từ https://i.ytimg.com/vi/WyiyPiWL0cg/maxresdefault.jpg, 1280 × 720px. Không sử dụng ảnh đội ngũ được tạo bằng AI.
- Bản hiện dùng `assets/vmax-video-thumbnail.webp`, WebP quality 88, giữ nội dung và kích thước, khoảng 93KB thay JPEG 135KB. Ảnh lazy-load với khung 16:9 cố định.
- Video được nhúng sau thao tác Play từ https://www.youtube.com/watch?v=WyiyPiWL0cg. Trang chủ VMAX đang liên kết video này; oEmbed xác nhận kênh `@vmaxtech-vn`. Không có video giả hoặc file MP4 minh họa.
- Icon outline là SVG. Các heading, nhóm dịch vụ, chỉ số, nhãn và nút là HTML thật; không dùng ảnh thiết kế chứa chữ thay nội dung.

## Section Dự án tiêu biểu — 17/10/2026

- Card dự án dùng các ảnh chụp website đã có trong source, lấy từ danh mục dự án chính thức của VMAX; không tạo mockup hoặc ảnh AI mới.
- Dữ liệu tên, lĩnh vực, mô tả và liên kết hồ sơ lấy từ `config.js`. Section hiển thị ba card trên desktop, hai card trên tablet và carousel ngang trên mobile.
- Typography, CTA, tên dự án và pagination là HTML/CSS thật. Ảnh dùng lazy loading; khung ảnh có tỷ lệ cố định để hạn chế dịch chuyển bố cục.

## Cần bổ sung để khớp ảnh gốc

1. Logo chính thức đã được lấy từ vmaxtech.vn, lưu ở `vmax-logo.png`; bản tối ưu dùng trên trang là `vmax-logo.webp`. Chỉ cắt lề trong suốt và thu nhỏ, giữ hình và màu gốc. Footer dùng phiên bản trắng bằng CSS như website nguồn.
2. File mockup laptop + điện thoại + khối đá gốc, tốt nhất nền trong suốt, khoảng 1200 × 1000px. Hiện dùng `assets/hero.jpg` được tạo bằng công cụ imagegen tích hợp.
3. `assets/office.jpg` là ảnh văn phòng minh họa của bản cũ, hiện không dùng trong section Về VMAX. Bản mới dùng thumbnail đội ngũ lấy từ video chính thức ở trên.
4. Thumbnail của LuxHome, Masteri Land, Spa Thảo Mộc, Auto Luxury và MonAmour đã lấy từ danh mục dự án chính thức; các file dùng trên trang có tiền tố `project-` và đuôi `.webp`.
5. Avatar và thông tin đánh giá của Chị Minh Thư, Anh Quốc Hoàng và Bác sĩ Lê Tâm được lấy từ trang chủ chính thức. Nội dung hiển thị là tóm lược đánh giá. Các avatar được lưu dưới tên `review-official-*.webp`.
6. Video giới thiệu đã có liên kết YouTube từ website chính, cấu hình tại `videoWatchUrl`. Chưa có file MP4 cục bộ.
7. Footer dùng Zalo, video YouTube và email đã tìm thấy. Không tự đoán các tài khoản Facebook, LinkedIn hoặc TikTok.
8. Hotline, email, địa chỉ, MST và số liệu đã được đối chiếu với thông tin website chính đang công bố; nguồn và ngày đọc được lưu trong `OFFICIAL-SOURCES.md`.

## Hero được tạo

- Công cụ: **imagegen tích hợp**, không dùng API/CLI dự phòng.
- Bản gốc: `assets/hero.png`, 1448 × 1086px.
- Bản dùng trên trang: `assets/hero.jpg`, JPEG quality 90, khoảng 334KB, giữ nguyên nội dung ảnh.
- Đây là ảnh mockup minh họa, không phải dự án hoặc sản phẩm thực tế của VMAX.

Prompt đã dùng:

> Use case: product-mockup. Asset type: website hero illustration, photorealistic premium 3D render, landscape 4:3. Make an isolated realistic silver laptop with black screen bezel and a black-framed smartphone standing diagonally in front of it on the right, both showing the same elegant white and forest-green Vietnamese interior design website with a cream living room photograph, minimalist tiny navigation and headline 'Nâng tầm không gian sống'. Laptop tilts diagonally counterclockwise, screen top edge rises to the right, keyboard and silver base visible below, device occupies most of composition. Smartphone in portrait in front at lower right. Devices rest on a rough gray dark stone mound cropped at bottom. Background extremely pale mint white #f6faf7, no setting, no horizon, studio daylight. A few glossy green spheres behind the laptop, one large at lower left and one smaller at upper right, subtle soft mint gradients. Crisp photorealistic devices, convincing glass reflections and aluminium materials. Composition fills image with devices, leave 6% top whitespace, laptop begins around 10% x and 6% y and reaches bottom. Do not add floating labels or text outside screens. No watermark. This is a placeholder asset for a screenshot recreation.

## Ảnh placeholder

Nguồn: Unsplash. Các ảnh chỉ minh họa bố cục, không thể hiện đội ngũ hoặc khách hàng thật của VMAX.

| File               | ID ảnh Unsplash                    |
| ------------------ | ---------------------------------- |
| `office.jpg`       | `photo-1522071820081-009f0129c71c` |
| `interior.jpg`     | `photo-1600210492486-724fe5c67fb0` |
| `building.jpg`     | `photo-1486406146926-c627a92ad1ab` |
| `fashion.jpg`      | `photo-1483985988355-763728e1935b` |
| `avatar-mai.jpg`   | `photo-1580489944761-15a19d654956` |
| `avatar-hung.jpg`  | `photo-1500648767791-00dcc994a43e` |
| `avatar-trang.jpg` | `photo-1534528741775-53994a69daeb` |

URL nguồn có cấu trúc `https://images.unsplash.com/<ID ảnh>`.

## Font và đồ họa

Font Inter tải từ Google Fonts, được lưu cục bộ. Giấy phép SIL Open Font License nằm trong `assets/Inter-OFL.txt`.

Icon SVG, biểu đồ SEO, dashboard quảng cáo và khối cầu trang trí được dựng trực tiếp trong HTML/CSS/JavaScript, không phụ thuộc bộ icon/CDN. Logo chính lấy từ website chính thức. Logo thu nhỏ bên trong hình mockup dịch vụ vẫn là đồ họa minh họa.

## Các lớp hero chuyển động

Ba lớp được chỉnh bằng công cụ **imagegen tích hợp**, lấy `hero.png` làm ảnh tham chiếu để giữ phối cảnh và phong cách. Một số chi tiết bị che khuất được tái dựng. Prompt đầy đủ được lưu trong `assets/HERO-LAYERS.md`.

| File dùng trên trang  | Vai trò                                             |
| --------------------- | --------------------------------------------------- |
| `hero-background.jpg` | Khối đá, hai quả cầu và nền mint, đứng yên          |
| `hero-laptop.webp`    | Laptop nền trong suốt, 1200 × 944px, khoảng 183KB   |
| `hero-phone.webp`     | Điện thoại nền trong suốt, 480 × 845px, khoảng 90KB |

Hero hiện dùng `hero-seamless.webp` làm nền xuyên suốt toàn section. Nguồn và prompt nằm trong [assets/HERO-SEAMLESS.md](assets/HERO-SEAMLESS.md). Bản nền riêng phía phải trước đó được giữ lại, xem [assets/HERO-FUTURE.md](assets/HERO-FUTURE.md). Hai thiết bị vẫn dùng lại các file WebP trên. Bảng kính, đường mạng và vòng sáng là SVG/CSS riêng để kiểm soát chuyển động.

Các file `hero-*-source.png` giữ kết quả gốc của imagegen. Script `scripts/prepare-hero-assets.ps1` cắt lề trong suốt, thu nhỏ ảnh thiết bị và xuất JPEG nền. Chạy script với `-WebP` để xuất thêm các file WebP dùng trên trang (cần Node.js và mạng để chạy sharp-cli qua npx). Bản WebP dùng quality 90, alpha quality 100 để giữ viền trong suốt. Công cụ chuyển đổi chỉ tối ưu định dạng, không thay đổi thiết kế. `hero.jpg` vẫn là ảnh dự phòng nếu tắt hiệu ứng hoặc một lớp không tải được.
