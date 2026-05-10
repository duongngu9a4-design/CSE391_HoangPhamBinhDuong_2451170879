# Câu A1 (10đ) — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | có |  Không có   | có | Mặc định — không cần viết |
| `relative` | có | Vị trí gốc của chính nó | có| Làm anchor cho absolute con, dịch nhẹ |
| `absolute` | không | cha relative gần nhất có position| không | Badge, dropdown, tooltip, overlay |
| `fixed` | không | viewport (màn hình) | không | Chat button, cookie banner, header cố định |
| `sticky` | có(ban đầu) | Container gần nhất |Có (rồi dính lại) | Sticky header, sticky table header, sidebar |

* Câu hỏi thêm: Khi nào absolute tham chiếu body? Khi nào tham chiếu parent? Giải thích khái niệm "nearest positioned ancestor".
- `position: absolute` sẽ tham chiếu body (hoặc html) khi:
    + Không có bất kỳ phần tử cha nào (từ nó đi lên) có position khác static
    -> Nghĩa là: không tìm được “điểm neo” trong DOM.

- absolute sẽ tham chiếu parent (cha) khi:
    + Có ít nhất một phần tử cha có position là:
    + relative
    + absolute
    + fixed
    + sticky
    -> Và nó sẽ chọn cha gần nhất thỏa điều kiện đó
- “nearest positioned ancestor” là tổ tiên gần nhất (closest ancestor) của phần tử hiện tại mà không phải là `static`.Có thể là `relative absolute fixed sticky`

# Câu A2 (10đ) — Flexbox vs Grid

/* Trường hợp 1 */
`.container { display: flex; } .item { flex: 1; }`
/* 4 items → Bố cục = 1 hàng, 4 cột bằng nhau (chia đều không gian do flex: 1) */

/* Trường hợp 2 */
`.container { display: flex; flex-wrap: wrap; } .item { width: 45%; margin: 2.5%; }`
/* 6 items → Bố cục = 3 hàng, 2 cột(mỗi item chiếm 50%->1 hàng có 2 item -> 3 hàng) */

/* Trường hợp 3 */
`.container { display: flex; justify-content: space-between; align-items: center; }`
/* 3 items → Bố cục = 1 hàng item 1 sát trái,item 2 ở giữa,item 3 sát phải */

/* Trường hợp 4 */
`.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }`
/* 3 items → Bố cục = 1 hàng 3 cột */

/* Trường hợp 5 */
`.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }`
/* 7 items → Bố cục = 3 hàng 3 cột ,item 7 nằm hàng cuối, cột 1 */

# Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?

1. Navigation bar ngang (logo + menu + buttons)
- Nên dùng flexbox vì: Navbar là layout 1 chiều `(horizontal)`. Flexbox rất mạnh để căn hàng ngang, spacing, align center, đẩy item sang trái/phải bằng justify-content.

2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
- Nên dùng grid vì đây là layout dạng 2 chiều `(rows + columns)`. CSS Grid giúp chia cột đều cực dễ bằng grid-template-columns: repeat(3, 1fr). Ảnh tự xuống hàng khi thêm mới.

3. Layout blog: main content + sidebar
- Kết hợp Grid + Flexbox: Dùng Grid cho bố cục lớn `(main + sidebar)` vì cần chia cột rõ ràng. Bên trong từng khu vực có thể dùng Flexbox để căn nội dung nhỏ hơn.

4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)
- Dùng grid vì footer nhiều cột ngang đều nhau thì Grid phù hợp hơn vì kiểm soát cột rõ ràng và responsive dễ.

5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
- Dùng flexbox: Card là layout 1 chiều dọc. Dùng display: flex; flex-direction: column; rồi margin-top: auto cho nút để nút luôn nằm sát đáy card.

# Câu C2 (10đ) — Debug Flexbox
* Lỗi 1:Card không đều chiều cao, nút “Mua” bị lệch
 - Nguyên nhân: Các card có lượng text khác nhau nên chiều cao mỗi card khác nhau.
Nút .btn nằm ngay sau nội dung nên bị đẩy lên/xuống theo độ dài text.
 - code đã sửa
 ```css
 .card-container{
    display: flex;
    flex-wrap: wrap;
 }

 .card{
    width: 30%;
    margin: 1.5%;

    display: flex;
    flex-direction: column;
 }

 .card img{
    width: 100%;
 }

 .card h3{
    font-size: 18px;
 }

 .card p{
    flex-grow: 1;
 }

 .card .btn{
    padding: 10px;
    margin-top: auto;
 }
 ```
 - Giải thích cách sửa
    + display: flex + flex-direction: column biến card thành layout dọc.
    + flex-grow: 1 cho phần text để chiếm khoảng trống.
    + margin-top: auto đẩy nút xuống đáy card.

* Lỗi 2 — Không căn giữa trong container 100vh
 - Nguyên nhân: display: flex chỉ bật Flexbox nhưng chưa có thuộc tính căn chỉnh.
 - Mặc định:
    + justify-content: flex-start
    + align-items: stretch
    -> nên item nằm góc trên bên trái.
 - code sửa
 ```css
 .hero {
    height: 100vh;

    display: flex;

    justify-content: center;
    align-items: center;
}

.hero-content {
    text-align: center;
}
```
 - Giải thích cách sửa
    + justify-content: center → căn giữa ngang.
    + align-items: center → căn giữa dọc.

* Lỗi 3: Sidebar bị co lại khi content quá dài
 - Nguyên nhân: trong Flexbox, item mặc định có `flex-shrink: 1;` nên sidebar bị co khi content quá lớn.
 - Code đã sửa: 
 ```css
 .layout{
    display: flex;
}

.sidebar{
    width: 250px;

    flex-shrink: 0;

    background: red;
}

.content{
    flex: 1;

    background: lightblue;
}
```
 - Giải thích:
    + flex-shrink: 0 ngăn sidebar bị co lại.
    + Sidebar luôn giữ đúng 250px.
