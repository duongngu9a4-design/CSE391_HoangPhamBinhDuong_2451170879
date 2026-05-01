Tài liệu tham chiếu: tuan_1_html5/06_graphics_multimedia.md + 07_forms_interactive.md
# Câu A1 (5đ) — Input Types
1. type="email" → Ô nhập text, trình duyệt kiểm tra có dấu @ và định dạng email → Dùng cho 
form đăng ký / đăng nhập tài khoản
2. type="password" → Ô nhập text nhưng ký tự bị ẩn (***), không có validation đặc biệt → 
Dùng cho nhập mật khẩu tài khoản
3. type="number" → Ô nhập số, có nút tăng/giảm (spinner), chỉ cho nhập số → Dùng nhập số
lượng sản phẩm khi mua hàng
4. type="tel" → Ô nhập số điện thoại, không validate chặt nhưng hỗ trợ bàn phím số trên mobile → Dùng nhập số điện thoại giao hàng
5. type="url" → Ô nhập link, tự kiểm tra định dạng URL (http/https) → Dùng khi seller nhập link sản phẩm / website
6. type="date" → Hiển thị lịch chọn ngày → Dùng chọn ngày giao hàng hoặc ngày sinh khách hàng
7. type="time" → Hiển thị chọn giờ → Dùng chọn khung giờ nhận hàng
8. type="checkbox" → Ô tick chọn (có thể chọn nhiều) → Dùng chọn nhiều sản phẩm / đồng ý điều khoản
9. type="radio" → Nút chọn tròn (chỉ chọn 1 trong nhiều) → Dùng chọn phương thức thanh toán (COD / Visa / Momo)
10. type="file" → Nút upload file → Dùng upload ảnh đánh giá sản phẩm hoặc ảnh xác minh

# Câu A2 (5đ) — Validation Attributes

<!-- Trường hợp 1 -->
```<input type="text" required value="">```   <!-- User để trống -->
- Không submit được, phải nhập một giá trị vào ô text.
- Vì thuộc tính required bắt buộc phải nhập, nhưng value đang rỗng.

<!-- Trường hợp 2 -->
```<input type="email" value="abc">```       <!-- User gõ "abc" -->
- Không submit được, phải đúng định dạng @ có trong mail
- Vì ```type="email"`` yêu cầu đúng định dạng email, "abc" không có @ ⇒ sai format

<!-- Trường hợp 3 -->
```<input type="number" min="1" max="10" value="15">``` <!-- User gõ 15 -->
- Không submit được, giá trị chỉ nhận từ 1 đến 10 mà nhập 15 -> sai dữ liệu,vượt giới hạn cho phép

<!-- Trường hợp 4 -->
```<input type="text" pattern="[0-9]{10}" value="abc123">``` <!-- User gõ "abc123" -->
- Không submit được, báo lỗi pattern mismatch
- Vì regex [0-9]{10} yêu cầu đúng 10 chữ số, còn "abc123" vừa có chữ vừa không đủ 10 số ⇒ sai

<!-- Trường hợp 5 -->
```<input type="password" minlength="8" value="123">```  <!-- User gõ "123" -->
- Không submit được, minlength="8" yêu cầu ≥ 8 ký tự, nhưng "123" chỉ có 3 ký tự ⇒ không đạt

# Câu A3 (5đ) — Accessibility

1. Tại sao `<label for="email">` quan trọng cho screen reader
- `<label for="email">` liên kết nhãn với input có id="email"
Screen reader (NVDA, VoiceOver…) sẽ đọc tên trường + loại input
    -> Ví dụ: “Email, edit text”
- Nếu không có label:
    -> Screen reader chỉ đọc “edit text” → người dùng không biết phải nhập gì

2. Khi nào dùng `<fieldset>` + `<legend>`
- Dùng khi có nhóm các input liên quan với nhau
    + `<fieldset>`: nhóm lại
    + `<legend>`: tiêu đề của nhóm (screen reader sẽ đọc trước)
- Ví dụ: 
```html
<fieldset>
    <legend>Phương thức thanh toán</legend>

    <input type="radio" id="cod" name="pay">
    <label for="cod">COD</label>

    <input type="radio" id="visa" name="pay">
    <label for="visa">Visa</label>
</fieldset>
```
- Screen reader đọc:
    + “Phương thức thanh toán”
    + “COD, radio button”
    + “Visa, radio button”
- Không có <fieldset> -> Người dùng không biết các option này thuộc cùng 1 nhóm

3. aria-label dùng khi nào

 - Dùng khi Không có text hiển thị nhưng vẫn cần mô tả cho screen reader
 - ví dụ:
```html
<button aria-label="Tìm kiếm">
    🔍
</button>
```
 - Icon 🔍 không có chữ → cần aria-label

* Tại sao KHÔNG nên dùng aria-label khi đã có `<label>`
 - Vì `<label>` là semantic chuẩn HTML, được ưu tiên aria-label chỉ là giải pháp bổ sung (fallback)
 -  Nếu dùng cả hai:
    + Có thể gây trùng lặp / xung đột
    + Screen reader có thể đọc 2 lần hoặc đọc sai

# Câu A4 (5đ) — Media

1. loading="lazy" trên `<img>`
- Là cơ chế lazy loading (tải lười):
- Ảnh chỉ được tải khi gần xuất hiện trong viewport Không tải ngay khi load trang
- Cải thiện:
    + Tăng tốc độ load trang ban đầu
    + Giảm băng thông
    + Cải thiện Core Web Vitals (LCP, CLS gián tiếp)
- Không nên dùng:
    + Ảnh above-the-fold (hiện ngay khi mở trang)
    + Ảnh hero/banner chính Vì lazy load có thể làm ảnh hiện chậm → UX kém

2. Tại sao nên dùng nhiều `<source>` trong `<video>`
- vì Trình duyệt khác nhau hỗ trợ codec khác nhau
- Nếu 1 format không chạy → fallback sang format khác
- ví dụ:
```html
<video controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <source src="video.ogv" type="video/ogg">
</video>
```
- 3 format video phổ biến:
    + MP4 (H.264) → phổ biến nhất
    + WebM → tối ưu web, open-source
    + Ogg (OGV) → ít dùng hơn nhưng vẫn có

3. Thuộc tính alt trên <`img>`

- Dùng để:
    + Mô tả nội dung ảnh cho screen reader
    + Hiển thị khi ảnh bị lỗi không load
    + Giúp SEO hiểu nội dung ảnh
- ALt chuẩn:
    + Ảnh sản phẩm iphone 16:
     `<img src="iphone16.jpg" alt="iPhone 16 màu đen, mặt trước và sau">`
    + Ảnh trang trí (decorative):
     `<img src="bg.png" alt="">`
    + Ảnh biểu đồ doanh thu Q1/2026:
     `<img src="chart.png" alt="Biểu đồ doanh thu quý 1 năm 2026, tăng từ tháng 1 đến tháng 3">`

# Câu A5 (5đ) — So sánh `<figure>` vs `<img>`

* dùng Cách 1 (`<img>` + alt) khi: 
 - Ảnh đơn giản, tự nó đã đủ nghĩa
 - Không cần caption hiển thị thêm cho người dùng
 - Ảnh chỉ là một phần nhỏ trong layout
 - ví dụ: ở cách 1 `<img src="product.jpg" alt="iPhone">` là ảnh với alt là mô tả iphone, không cần hiển thị thông tin dưới ảnh

* dùng Cách 2 (`<figure>` + `<figcaption>`) khi:
 - Ảnh có nội dung quan trọng, cần giải thích thêm
 - Caption là một phần của nội dung, không phải trang trí
 - Muốn nhóm ảnh + mô tả thành 1 khối semantic
 - ví dụ:
 ```<figure>
    <img src="iphone.jpg" alt="iPhone 16 Pro Max 256GB Titan">
    <figcaption>iPhone 16 Pro Max — 25.990.000đ</figcaption>
 </figure>```
  -> Caption cung cấp giá + tên đầy đủ
 



