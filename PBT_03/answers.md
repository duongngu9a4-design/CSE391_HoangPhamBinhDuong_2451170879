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










