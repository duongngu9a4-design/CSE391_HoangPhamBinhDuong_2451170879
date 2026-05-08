# Câu A1 (5đ) — 3 Cách nhúng CSS
1. Inline CSS
- Inline CSS là viết CSS trực tiếp trong thuộc tính style của thẻ HTML.
- Ví dụ:
`<h1 style="color: #2563eb; font-size: 32px;">Tiêu đề</h1>`
- Ưu điểm
    + Nhanh, dễ viết
    + Phù hợp chỉnh sửa một phần tử nhỏ
    + Không cần tạo file CSS riêng
- Nhược điểm
    + Không tái sử dụng được CSS
    + khó Maintain
- Khi nào nên dùng
    + Test nhanh giao diện
    + Chỉnh sửa tạm thời cho một phần tử
    + Email HTML đơn giản

2. Internal CSS
- Internal CSS là viết CSS trong thẻ `<style>` bên trong file HTML.
- ví dụ: 
<head>
    <style>
        h1 { color: #2563eb; font-size: 32px; }
    </style>
</head>

- Ưu điểm
    + Dễ quản lý hơn inline
    + CSS áp dụng cho toàn bộ trang
    + Không cần file CSS riêng
- Nhược điểm
    + Chỉ dùng được cho một trang
    + Không tái sử dụng cho nhiều file HTML
    + File HTML có thể bị dài
- Khi nào nên dùng
    + Website nhỏ
    + Bài tập thực hành
    + Trang đơn lẻ cần style riêng

3. External CSS
- External CSS là viết CSS trong file .css riêng rồi liên kết với HTML bằng thẻ `<link>.`
- Ví dụ:
<head>
    <link rel="stylesheet" href="styles.css">
</head>
/* styles.css */
h1 { color: #2563eb; font-size: 32px; }

- Ưu điểm
    + Quản lý code dễ dàng
    + Tái sử dụng cho nhiều trang
    + Website chuyên nghiệp và gọn gàng
    + Dễ bảo trì, dễ cập nhật
- Nhược điểm
    + Phải tạo file CSS riêng
    + Nếu file CSS lỗi hoặc mất link thì giao diện hỏng
- Khi nào nên dùng
    + Website lớn
    + Dự án thực tế
    + Khi có nhiều trang HTML dùng chung giao diện
* câu hỏi thêm:
- Thứ tự ưu tiên (CSS Priority): Inline CSS > Internal CSS > External CSS
- CSS hoạt động theo cơ chế gọi là: Cascade (xếp tầng)
- Trình duyệt sẽ xét:
    + Độ ưu tiên (specificity)
    + Vị trí khai báo
    + !important (nếu có)

# Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả

1. h1                           → Chọn: ShopTLU
2. .price                       → Chọn: 25.990.000đ,45.990.000đ
3. #app header                  → Chọn: element <header class="top-bar dark">
4. nav a:first-child             → Chọn: Home vì đây là thẻ <a> đầu tiên bên trong <nav>.
5. .product.featured h2         → Chọn: MacBook Pro
6. article > p                  → Chọn tất cả thẻ <p> là con trực tiếp của <article>:
7. a[href="/"]                  → Chọn: Home
8. .top-bar.dark h1              → Chọn: ShopTLU

# Câu A3 (7đ) — Box Model — Tính toán kích thước

* Trường hợp 1: content-box (mặc định)
 - Chiều rộng hiển thị : 400+20×2+5×2 = 450px
 - Không gian chiếm trên trang : Cộng thêm margin trái + phải 450+10×2=470px

* Trường hợp 2: border-box
 - Trong border-box: width: 400px đã bao gồm content padding border -> Chiều rộng hiển thị = 400px
 - Kích thước content thực tế : Trừ đi padding và border hai bên 400−20×2−5×2=350px
 - Không gian chiếm trên trang : Cộng thêm margin 400+10×2=420px

* Trường hợp 3: Margin Collapse
 - Khoảng cách giữa 2 box 40px
 - Tại sao KHÔNG phải 65px?
    + Vì trong CSS, margin dọc (margin-top và margin-bottom) của các block liền kề sẽ bị collapse (gộp margin)
    + CSS sẽ không cộng mà chỉ lấy margin lớn hơn nên khoảng cách cuối cùng chỉ là 40px.

# Câu A4 (5đ) — Specificity (Độ ưu tiên)

1. Tính specificity score (a, b, c) cho mỗi rule
- Rule A:
    + Id: 0
    + class: 0
    + tag p : 1
    -> specificity: (0,0,1)
- Rule B:
    + Id: 0
    + class .price: 1
    + tag p : 0
    -> specificity: (0,1,0)
- Rule C:
    + Id: 1
    + class: 0
    + tag p : 0
    -> specificity: (1,0,0)
- Rule D:
    + Id: 0
    + class .price: 1
    + tag p : 1
    -> specificity: (0,1,1)
2. Element sẽ có màu gì? Giải thích
- Element có màu đỏ vì Rule C mạnh nhất(có id selector)

3. Nếu thêm `<p class="price" id="main-price" style="color: orange;">`, element có màu gì?
- Element sẽ có màu cam vì Inline style mạnh hơn CSS thường, thắng hết các rule.

4. Nếu Rule A thêm !important, element có màu gì? Tại sao?
- element sẽ có màu đen vì !important ưu tiên cao hơn specificity thông thường

# Bài B2 (20đ) — Box Model Lab
* Hộp 1 (content-box):
 - DevTools hiển thị content khoảng 300.111px,
 - Tính theo công thức: 300 + 20*2 + 5*2 = 350px
 - tổng chiều rộng thực tế khoảng 350px.

* Hộp 2 (border-box):
 - DevTools hiển thị content khoảng 251.111px,
 - Kích thước content thực tế: 300 - 20*2 - 5*2 = 250px
 - tổng chiều rộng vẫn là 300px.

* Giải thích sự khác biệt

 - Với content-box:
    + Thuộc tính width chỉ tính phần content.
    + Padding và border được cộng thêm bên ngoài width nên kích thước thực tế lớn hơn.

 - Với border-box:
  Width đã bao gồm:
    + content
    + padding
    + border
nên tổng chiều rộng vẫn giữ nguyên 300px

# Bài B3 (15đ) — Specificity Battle

1. Liệt kê 10 rules + specificity score
- `p`- Specificity: `0,0,1`
- `body p`- Specificity: `0,0,2`
- `.text`- Specificity: `0,1,0`
- `p.text`- Specificity: `0,1,1`
- `.text.highlight`- Specificity: `0,2,0`
- `body p.text`- Specificity: `0,1,2`
- `#demo`- Specificity: `1,0,0`
- `p#demo`- Specificity: `1,0,1`
- `#demo.highlight`- Specificity: `1,1,0`
- `body p#demo.text.highlight`- Specificity: `1,2,2`

2. Element cuối cùng hiển thị màu gì? Tại sao?
- Hiển thị màu đen vì rule `body p#demo.text.highlight` có specificity cao nhất `1,2,2`, mạnh hơn tất cả các rule còn lại nên cuối cùng là màu đen

3. Chụp screenshot kết quả
- Ảnh trong thư mục screenshots

4. Thay đổi thứ tự rules trong CSS file. Kết quả có đổi không? Giải thích.
- Kết quả không đổi vì CSS ưu tiên specificity trước rồi mới đến thứ tự xuất hiện 
- Rule có specificity cao nhất vẫn là: `body p#demo.text.highlight` nên dù có đổi vị trí các rule khác thì cuối cùng vẫn là màu đen.Chỉ khi có hai rule có specificity bằng nhau thì rule viết sau sẽ thắng

# Câu C1 (10đ) — Debug CSS Layout

1. Tính chiều rộng thực tế (content-box mặc định)
* Trong CSS mặc định: `box-sizing: content-box;`
-> width chỉ tính phần content, chưa tính padding và border
* Sidebar: `width: 300px; padding: 20px; border: 1px solid;`
 - Chiều rộng thực tế:
    + Content: 300px
    + Padding trái + phải: 20 + 20 = 40px
    + Border trái + phải: 1 + 1 = 2px
 -> Tổng: 300 + 40 + 2 = 342px
* Content width:` 660px; padding: 30px; border: 1px solid;`
 - Chiều rộng thực tế:
    + Content: 660px
    + Padding trái + phải: 30 + 30 = 60px
    + Border trái + phải: 1 + 1 = 2px
 -> Tổng: 660 + 60 + 2 = 722px
* Tổng chiều rộng layout 342 + 722 = 1064px trong khi .container chỉ có 960px => vượt quá container

2. Giải thích tại sao layout bị vỡ
- Vì: float: left; nên .sidebar và .content phải đủ chỗ để nằm cùng hàng.
- Tổng chiều rộng thực tế = 1064px lớn hơn container = 960px
=> .content không đủ chỗ nên bị đẩy xuống dòng mới.

3. Đưa ra 2 cách sửa khác nhau (1 cách dùng border-box, 1 cách không dùng)
- Cách 1: dùng box-sizing: border-box;
- để width bao gồm luôn:
    + content
    + padding
    + border
 -> Tổng sidebar + content = 300 + 660 = 960px => vừa khít container
- Cách 2: Giữ content-box, nhưng giảm width để bù cho padding + border.
    + sidebar mới: width = 300 - 40 - 2 = 258px
    + Content mới: width = 660 - 60 - 2 = 598px

# Câu C2 (10đ) — Cascade Puzzle
1. "Sản phẩm A" (h2) có font-size = ? và color = ?
- có font-size = 20px và color = green vì:
    + .title có font size riêng bằng 20px: `.card .title{font-size: 20px;}`
    + xét 2 rule `.card { color: blue; }` và `.highlight { color: green !important; }` đều chỉ đến "Sản Phẩm A" thì ưu tiên là màu xanh lá cây vì `!important` thắng tất cả

2. "Mô tả sản phẩm" (p trong card featured) có color = ?
- có color = blue vì:
    + xét 2 rule `.card p { color: inherit; }` `.card { color: blue; }` inherit = lấy từ .card nên có màu xanh

3. "Sản phẩm B" (h2) có font-size = ? và color = ?
- có font-size = 20px và color = blue vì
    + `.card { color: blue; }` màu xanh
    + `.card .title { font-size: 20px; }` font bằng 20px

4. "Mô tả sản phẩm B" (p.highlight) có color = ?
- có color = green vì
    + `.highlight { color: green !important; }` : important luôn thắng tất cả các rule -> màu xanh lá cây











