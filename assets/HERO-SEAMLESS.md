# Nền hero liền mạch

Tạo ngày 16/10/2026 bằng imagegen tích hợp, chỉnh từ `hero-future-background-source.png`. Giữ nguyên hai asset thiết bị, tạo lại riêng nền thành panorama 2079 × 756px.

- Gốc: `assets/hero-seamless-source.png`.
- Dùng trên trang: `assets/hero-seamless.webp`, WebP quality 90, giữ kích thước và nội dung.
- Nền nằm trực tiếp trong section `.hero` với vị trí absolute phủ toàn chiều rộng và chiều cao trên desktop. Không còn ảnh nền có mặt nạ dọc bên trong `.hero-stage`.
- Mobile dùng vùng phải của cùng ảnh và chuyển sắc theo chiều dọc vào nền mint của section.
- Ảnh kiểm tra: `qa/seamless-1440.png`, `qa/seamless-1920.png`, `qa/seamless-390-hero.png`.

Prompt:

> Edit target: existing mint studio background with emerald glass ribbons and a dark rough stone platform. Outpaint and recompose this background into one single ultra-wide panoramic website hero background, aspect ratio 2.75:1 (e.g. 2640x960). This is one continuous seamless scene edge to edge, absolutely no inset rectangle, no vertical dividing line, no fade-to-white panel, no separate image card. LEFT 46%: mostly empty pale mint studio space for dark text, with very subtle diagonal white light rays that continue naturally into right side. RIGHT 54%: retain sculptural translucent emerald glass ribbons from the reference, arching behind an empty space where a laptop and phone will later be composited. Dark rough stone slab only in bottom right, begins at x47% with a realistic angled rocky end at its left, its top supporting surface at y82%, stone front edge visible below to bottom. Rightmost slab cropped to edge. Large glass ribbons occupy x50-100%, y0-82%, with center x60-85%, y20-75% fairly empty for devices. Background light and color must be continuous across the full canvas, pale mint white on both sides, no blur or white fade at x46%. Refined bright premium futuristic 3D studio render. No devices, no text, no icons, no numbers, no logos, no labels, no UI, no watermark. Single full bleed background plate.
