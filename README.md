# VMAX — HTML, CSS, JavaScript

Website được dựng theo ảnh tham chiếu bằng HTML, CSS và JavaScript thuần. Không dùng framework; khi phát video YouTube, trang tải API player chính thức của YouTube.

## Mở website

Mở `index.html` trực tiếp bằng trình duyệt, hoặc dùng Live Server trong VS Code.

Nếu có Node.js, có thể chạy máy chủ xem trước không cần cài dependencies:

```sh
npm run dev
```

Sau đó mở **http://localhost:5173**. Dừng máy chủ bằng `Ctrl+C`.

## Cấu trúc

- `index.html`: nội dung, cấu trúc trang, biểu mẫu và hộp thoại.
- `styles.css`: design tokens, bố cục và các breakpoint responsive.
- `hero-theme.css`: giao diện header và hero phong cách futuristic tech sáng.
- `script.js`: menu, slider, animation, hộp thoại và kiểm tra biểu mẫu.
- `hero-motion.js`: tải các lớp thiết bị, độ sâu khi cuộn và điều khiển trạng thái chuyển động.
- `hero-slogan.css`, `hero-slogan.js`: component `HeroSlogan`, typography, đường cầu nối SVG và reveal khi cuộn. Nội dung HTML thật nằm tại `#hero-slogan` trong `index.html`.
- `hero-headline.css`, `hero-headline.js`: tiêu đề hero luân phiên ba dịch vụ; giữ mỗi câu 5 giây, chuyển mờ 450ms, dùng chung khung ba dòng. Dừng khi tiêu đề ra khỏi viewport, tab bị ẩn hoặc bật giảm chuyển động. Nội dung nằm trong HTML để hoạt động cả khi JavaScript tắt.
- `about-vmax.css`, `about-vmax.js`: section Về VMAX tối giản, ba cột desktop, năng lực 2×2; video tự chạy tắt tiếng khi cuộn tới, ưu tiên MP4 và có modal xem lớn. Mobile xếp giới thiệu → video → năng lực → số liệu; giữ dữ liệu từ cấu hình.
- `thiet-ke-website.html`, `thiet-ke-website.css`, `thiet-ke-website.js`: trang Thiết kế website (route `/thiet-ke-website`). CSS tự chứa, không tải `styles.css`; dùng đúng token trang chủ (xanh `#15803d` / gradient `#157a35→#00a637`, cam `#ff7900` / `#ff9500→#ff7500`, tối `#05120f`, navy dự án `#061b27`, nút bo tròn). Chỉ dùng ảnh dự án thật trong `assets/project-*.webp` và dữ liệu giá/đánh giá/FAQ đã đối chiếu.
- `config.js`: số liệu, thông tin liên hệ, dự án, URL mạng xã hội và video.
- `assets/`: ảnh, font Inter và favicon cục bộ.
- `server.mjs`: máy chủ xem trước tùy chọn, chỉ dùng API có sẵn của Node.js.
- `ASSETS.md`: nguồn ảnh, prompt tạo hero và danh sách tài nguyên cần bổ sung.
- `qa/`: ảnh chụp kiểm tra giao diện desktop và mobile.

## Bố cục theo ảnh

Giữ thứ tự: header → hero → giới thiệu → dịch vụ → dự án → 9 cam kết → quy trình 6 bước → đánh giá → CTA → footer.

Các section bên dưới giữ container rộng 89%, tối đa 1290px. Header và hero được cập nhật theo ảnh futuristic tech mới: header 80px, hero desktop 650–700px, container hero tối đa 1480px. Màu chính: xanh `#15803D`, xanh sáng `#22C55E`, cam `#FF7900`, nền tối `#05120F`.

Trên mobile: hero chuyển thành hai hàng; ba dịch vụ xếp dọc; dự án kéo ngang bằng tay hoặc nút điều hướng; cam kết dùng lưới 3 × 3; quy trình dùng hai hàng, mỗi hàng ba bước. Có hỗ trợ `prefers-reduced-motion`.

## Hiệu ứng lơ lửng ở hero

Laptop, điện thoại và nền đá là ba ảnh riêng. Laptop lơ lửng 6px trong 9 giây, điện thoại 9px trong 8 giây; các nhãn dịch vụ chuyển động 6px trong 9 giây với thời điểm lệch nhau. Thiết bị chỉ trượt dọc, không xoay. Nền đá và dải kính xanh đứng yên; SVG tạo vòng sáng và bảng dữ liệu được dựng bằng HTML/CSS. Đường sáng phía trước chỉ nằm dưới thiết bị, không chạy xuyên màn hình. Ảnh thiết bị được tách bằng imagegen từ mockup ban đầu nên một số chi tiết màn hình đã được tái dựng.

Khi cuộn trên màn hình từ 1001px, hai bảng kính dịch dọc tối đa 8px để tạo độ sâu. Thiết bị không chạy theo chuột. Trên mobile, laptop lơ lửng 4px, điện thoại 6px và các nhãn dịch vụ 4px.

Chuyển động tự dừng khi hero ra khỏi màn hình, tab trình duyệt bị ẩn hoặc hệ điều hành bật giảm chuyển động. Các giá trị CSS nằm ở `hero-theme.css` và nhóm `Independent hero layers` cuối `styles.css`. Đặt `heroMotion.parallax: false` trong `config.js` để tắt độ sâu khi cuộn, hoặc `heroMotion.enabled: false` để dùng lại ảnh tĩnh ban đầu. Nếu một lớp ảnh không tải được, trang tự giữ ảnh tĩnh.

Hai ảnh thiết bị dùng WebP giữ alpha, tổng dung lượng khoảng 273KB. Nền hiện tại là một ảnh panorama phủ toàn hero, không còn mặt nạ làm mờ mép dọc giữa phần chữ và thiết bị. Nguồn nền và prompt nằm trong `assets/HERO-SEAMLESS.md`; bản trước nằm trong `assets/HERO-FUTURE.md`. Ảnh kiểm tra mới có tiền tố `qa/seamless-`; ảnh các bản trước được giữ lại để đối chiếu.

## Nội dung chính thức và cấu hình

Logo, thông tin doanh nghiệp, hotline, email, địa chỉ, số liệu, dự án và đánh giá được đối chiếu với **https://vmaxtech.vn/** ngày **16/10/2026**. Dữ liệu nằm trong `config.js`; bản HTML cũng có nội dung để hiển thị khi JavaScript chưa chạy. Số liệu được ghi rõ là do VMAX công bố, không phải kết quả kiểm định độc lập. Đánh giá được tóm lược, không viết lại thành trích dẫn nguyên văn. Xem [OFFICIAL-SOURCES.md](OFFICIAL-SOURCES.md) để biết nguồn từng mục.

Các nút dịch vụ, tin tức, dự án và chính sách mở nội dung trong hộp thoại. Điều hướng trên trang dùng anchor có đích hợp lệ; không cần cấu hình router hoặc URL rewrite trên hosting.

Footer sử dụng các kênh tìm thấy trên website chính: Zalo, video YouTube và email. Tin tức và chính sách dẫn tới nội dung gốc. Chi tiết mỗi dự án có liên kết hồ sơ trên website chính.

### Video tự phát trong Về VMAX

Video bắt đầu chạy **tắt tiếng** khi ít nhất 55% khung video xuất hiện, tạm dừng khi còn dưới 15%, khi tab bị ẩn hoặc khi mở hộp thoại. Nhấn khung video để xem lớn có âm thanh và điều khiển; đóng hộp thoại sẽ dừng bản xem lớn và tiếp tục bản xem trước nếu khung còn trong màn hình. Nếu trình duyệt chặn tự phát, nút Play vẫn dùng được. Tôn trọng `prefers-reduced-motion`: không tự phát khi người dùng chọn giảm chuyển động.

Khi có MP4, chép file vào `assets/`, rồi sửa trong `config.js`:

```js
videoUrl: "assets/vmax-intro.mp4",
videoAutoplay: true,
```

Để `videoUrl: ""` sẽ dùng video YouTube chính thức từ `videoWatchUrl`; API chỉ tải khi cuộn tới video. Khi MP4 không tải được, trang chuyển sang nguồn YouTube dự phòng. Đặt `videoAutoplay: false` để chỉ phát khi nhấn. Khung 16:9 và thumbnail giữ nguyên trong lúc tải, tránh nhảy bố cục.

## Form liên hệ

Kiểm tra họ tên, số điện thoại Việt Nam, email và mô tả dự án. Form **chưa có backend**, không gửi dữ liệu lên máy chủ và không lưu thông tin vào localStorage. Sau khi dữ liệu hợp lệ, người dùng có thể mở bản nháp email hoặc sao chép nội dung. Người dùng kiểm tra và tự gửi trong ứng dụng email.

Muốn tiếp nhận yêu cầu trực tiếp, tích hợp API tại phần xử lý `submit` của `contact-form` trong `script.js`. Chỉ hiển thị trạng thái đã gửi khi máy chủ xác nhận thành công.

## Kiểm tra

```sh
npm run check
```

Đã kiểm tra trong Chrome ở các độ rộng 375, 430, 768, 1024, 1440 và 1920px: không tràn ngang hoặc tràn chữ heading. Kiểm tra thêm menu mobile, slider, đóng/mở hộp thoại, chuyển từ chi tiết dịch vụ sang form, validation và tạo bản nháp email. Không có lỗi JavaScript của website; các cảnh báo từ extension của trình duyệt được tách khỏi kết quả.

Kiểm thử trình duyệt được thực hiện qua `localhost`. Chính sách của công cụ kiểm thử chặn URL `file://`, nên thao tác mở file trực tiếp chưa được kiểm chứng bằng công cụ này. Mã trang sử dụng script thường và đường dẫn tương đối, không có module import hoặc fetch yêu cầu máy chủ.

Ảnh hero vẫn là đồ họa minh họa. Section Về VMAX chỉ dùng thumbnail video chính thức của đội ngũ, đã bỏ mockup và ảnh văn phòng minh họa của các bản trước. Logo gốc dùng ở header và footer. Thumbnail thật khác ảnh thiết kế tham chiếu nên giao diện không được tuyên bố trùng khớp 100%.
