# TRACK A — BOOTSTRAP 5

## Câu A1 (10đ) — Grid System

- <768px:
  + Grid: 12 cột nền tảng, layout hiện tại 1 cột.
  + Box layout: Box 1, Box 2, Box 3, Box 4 xếp chồng dọc.
- 768px - 991px:
  + Grid: vẫn 12 cột, layout phổ biến là 2 cột ngang.
  + Box layout: hàng 1 chứa Box 1 | Box 2, hàng 2 chứa Box 3 | Box 4.
- ≥992px:
  + Grid: 12 cột, layout desktop thường 4 cột.
  + Box layout: một hàng chứa Box 1 | Box 2 | Box 3 | Box 4.

Giải thích thêm:
- `col-md-6` nghĩa là phần tử chiếm 6/12 cột (= 50% chiều rộng) khi viewport ở kích thước trung bình (medium) trở lên.
- Không cần viết `col-sm-12` vì Bootstrap là mobile-first: khi không có class breakpoint nhỏ hơn, phần tử mặc định sẽ xếp 100% chiều rộng trên thiết bị nhỏ. `col-md-6` chỉ bắt đầu áp dụng từ `md` trở lên, còn dưới `md` thì tự động là full-width.

## Câu A2 (10đ) — Utilities & Components

1. `d-none d-md-block`:
  - Hiển thị: khi viewport ở kích thước `md` hoặc lớn hơn.
  - Ẩn: khi viewport nhỏ hơn `md` (xs, sm).
  - Giải thích: `d-none` ẩn ở mọi kích thước; `d-md-block` ghi đè thành `display: block` từ điểm ngắt `md` trở lên.

2. 5 spacing utilities:
  - `mt-3`: margin-top với giá trị scale 3.
  - `mb-4`: margin-bottom với giá trị scale 4.
  - `mx-2`: margin-left và margin-right with scale 2.
  - `px-4`: padding-left và padding-right with scale 4.
  - `py-1`: padding-top và padding-bottom with scale 1.

   Giải thích:
  - `mt-3` đẩy phần tử xuống dưới bằng khoảng cách chuẩn của hệ thống.
  - `mb-4` tạo khoảng cách dưới phần tử.
  - `mx-2` tạo khoảng cách hai bên trái/phải.
  - `px-4` tạo khoảng đệm ngang bên trong phần tử.
  - `py-1` tạo khoảng đệm dọc bên trong phần tử.

3. Khác nhau giữa `.container`, `.container-fluid`, `.container-md`:
  - `.container`: chiều rộng cố định theo breakpoint, ví dụ `max-width` thay đổi tại sm, md, lg, xl; luôn có padding ngang.
  - `.container-fluid`: rộng 100% viewport ở mọi kích thước.
  - `.container-md`: thiết kế mobile-first, full-width ở dưới `md`, và chuyển sang chiều rộng cố định từ `md` trở lên.

## Câu C1 (10đ) — Tùy biến Bootstrap

1. Quy trình đổi màu `$primary`:
  - Cần công cụ: Sass compiler (ví dụ Dart Sass) và source Bootstrap Sass.
  - Cách làm:
    + Tạo file SCSS tùy chỉnh, ví dụ `custom.scss`.
    + Đặt biến trước khi import/bootstrap: `@use "bootstrap" with ($primary: #E63946);`.
    + Nếu dùng Bootstrap source, có thể chỉnh trong `_variables.scss` hoặc dùng `@use` cấu hình biến trước khi sử dụng module Bootstrap.
    + Biên dịch `custom.scss` thành `custom.css` bằng Sass.
  - File cần modify: file SCSS của project (ví dụ `custom.scss`) chứ không phải file CSS đã build.

2. Tại sao không nên override `.btn-primary { background: red; }`?
  - Vì Bootstrap dùng biến để sinh ra nhiều giá trị liên quan như `hover`, `active`, `border`, `focus`, `disabled`.
  - Override trực tiếp chỉ thay đổi một selector, còn không cập nhật các biến và trạng thái khác, nên dễ gây inconsistency.
  - Sass variables giúp thay đổi chủ đề toàn cục một cách nhất quán, nhỏ gọn và dễ bảo trì.
  - Khi dùng variables thì Bootstrap có thể tạo ra classes, color utilities và component styles đồng nhất; override thủ công lại dễ gây xung đột specificity và khó bảo trì.

## Câu C2 (10đ) — So sánh

- Số dòng CSS cần viết:
  - CSS thuần: thường cần khoảng 40-60 dòng CSS để làm responsive navbar + product card từ đầu, bao gồm layout flex/grid, padding, màu nền, hover và media query.
  - Bootstrap: gần như không cần viết CSS riêng cho layout này, chỉ cần HTML với class Bootstrap. Nếu muốn, có thể cần 0-10 dòng CSS tùy chỉnh cho branding.

- Thời gian phát triển:
  - CSS thuần: lâu hơn, vì phải thiết kế cấu trúc responsive và xử lý các trạng thái tương tác bằng tay.
  - Bootstrap: nhanh hơn nhiều, vì đã có sẵn grid, navbar, card và utilities.

- Khả năng tùy biến:
  - CSS thuần: cao nhất, vì bạn hoàn toàn kiểm soát mọi chi tiết và không bị phụ thuộc class framework.
  - Bootstrap: dễ tùy biến với biến Sass và lớp tiện ích, nhưng hạn chế khi bạn muốn thiết kế quá khác biệt so với kiểu Bootstrap mặc định.

- Khi nào NÊN dùng Bootstrap?
  - Khi cần phát triển nhanh, làm prototype, dashboard, admin panel, hoặc website có thiết kế chuẩn và cần nhất quán.
  - Khi muốn tiết kiệm thời gian, tránh viết quá nhiều CSS cơ bản và cần hàng loạt component sẵn có.

- Khi nào KHÔNG NÊN dùng Bootstrap?
  - Khi cần UI rất độc đáo, thương hiệu riêng biệt và không muốn kết quả giống “Bootstrap mặc định”.
  - Khi dự án nhỏ, không cần framework, hoặc cần tối ưu hiệu năng và giảm phụ thuộc bên ngoài.
  - Khi muốn giữ CSS thật gọn nhẹ và tránh tải thêm thư viện không cần thiết.
