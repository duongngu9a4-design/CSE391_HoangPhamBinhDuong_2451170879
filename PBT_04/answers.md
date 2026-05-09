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

