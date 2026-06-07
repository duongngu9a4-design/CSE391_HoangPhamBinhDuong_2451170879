# Câu A1 (5đ) — DOM Tree
1. Sơ đồ cây DOM Tree
 - Khi trình duyệt đọc đoạn mã HTML của bạn, nó sẽ chuyển đổi các thẻ thành các đối tượng dạng nút (nodes) và sắp xếp chúng theo cấu trúc cây phân cấp (Cha - Con) như sau:
```
                 document
                     │
                  <div#app>
           ┌─────────┴─────────┐
       <header>             <main>
     ┌─────┴─────┐       ┌─────┴──────────┐
   <h1>        <nav>  <form#todoForm>  <ul#todoList>
                 │       ┌─────┴─────┐    ┌────┴────┐
                (a)    <input>   <button> (li)     (li)
              ┌──┼──┐
             <a><a><a>
```
2. Các câu lệnh querySelector theo yêu cầu
 - JavaScript cung cấp hai phương thức chính để tìm kiếm phần tử là document.querySelector() (trả về 1 phần tử đầu tiên tìm thấy) và document.querySelectorAll() (trả về một danh sách tất cả các phần tử trùng khớp).
 - Code:
 ```
 // 1. Chọn thẻ <h1>
const heading = document.querySelector("h1");

// 2. Chọn input trong form
const todoInput = document.querySelector("#todoForm input"); 
// Hoặc đơn giản nếu ID là duy nhất: document.querySelector("#todoInput");

// 3. Chọn tất cả .todo-item (Dùng ALL vì yêu cầu chọn "tất cả")
const todoItems = document.querySelectorAll(".todo-item");

// 4. Chọn link đang active
const activeLink = document.querySelector("nav a.active");

// 5. Chọn <li> đầu tiên trong #todoList
const firstTodo = document.querySelector("#todoList li:first-child");
// Hoặc ngắn gọn: document.querySelector("#todoList li"); (querySelector luôn tự lấy thằng đầu tiên)

// 6. Chọn tất cả <a> bên trong <nav> (Dùng ALL)
const navLinks = document.querySelectorAll("nav a");
```

# Câu A2 (5đ) — innerHTML vs textContent
1. Phân biệt innerHTML vs innerText vs textContent
 - innerHTML: Lấy/ghi cả văn bản và thẻ HTML. Trình duyệt sẽ biên dịch chuỗi thành giao diện.
 - innerText: Chỉ lấy/ghi văn bản hiển thị trên màn hình (bỏ qua phần tử bị ẩn bởi CSS display: none). Hiệu năng vừa phải.
 - textContent: Chỉ lấy/ghi văn bản thô của tất cả các node (kể cả phần tử ẩn). Nhanh nhất và an toàn nhất cho text.
 - Ví dụ khi nào dùng:
    + Dùng innerHTML khi cần chèn một khối giao diện mới do bạn tự viết (Ví dụ: box.innerHTML = "<div><p>Hello</p></div>").
    + Dùng textContent khi hiển thị thông tin dạng chữ do người dùng nhập vào (Ví dụ: Tên user, số lượng thông báo).

2. Tại sao innerHTML gây lỗ hổng XSS?
 - Vì innerHTML sẽ thực thi trực tiếp bất kỳ đoạn mã lệnh nào nằm trong chuỗi truyền vào. Nếu kẻ tấn công cố tình nhập mã độc, 
 - trình duyệt sẽ chạy mã đó ngay lập tức, dẫn đến lộ thông tin tài khoản (Cookie, Token).
 - Cách sửa đổi code để an toàn
    + Cách 1: Thay bằng textContent (Khuyên dùng cho văn bản thô) Biến mọi ký tự lạ thành văn bản thuần, trình duyệt sẽ không thể thực thi lệnh.
```
    const userInput = document.querySelector("#search").value;
    // SỬA: Thay innerHTML bằng textContent
    document.querySelector("#result").textContent = userInput;
``` 
    + Cách 2: Dùng thư viện lọc (Nếu bắt buộc phải nhận HTML từ user)
    Sử dụng thư viện DOMPurify để tự động rà quét và xóa bỏ các đoạn mã độc trước khi gán.
```
const userInput = document.querySelector("#search").value;
// SỬA: Làm sạch dữ liệu trước khi gán vào innerHTML
document.querySelector("#result").innerHTML = DOMPurify.sanitize(userInput);
```
# Câu A3 (5đ) — Event Bubbling
1. Dự đoán Output
 - Trường hợp 1: Khi ĐÓNG comment (Mặc định) khi bạn click vào <button id="btn">, sự kiện sẽ bắt đầu kích hoạt từ phần tử trong cùng (Target), sau đó "sủi bọt" (lan truyền) ngược lên các phần tử cha bên ngoài theo thứ tự:
    BUTTON
    INNER
    OUTER

 - Trường hợp 2: Khi MỞ comment e.stopPropagation(); phương thức e.stopPropagation() có nhiệm vụ ngăn chặn không cho sự kiện tiếp tục lan truyền (sủi bọt) lên các phần tử cha phía trên nữa. Do đó, sự kiện bị chặn đứng ngay tại Button:
   BUTTON

2. Giải thích cơ chế Event Bubbling
 
 - Mặc định trong JavaScript, khi một sự kiện xảy ra trên một phần tử, trình duyệt sẽ thực hiện quá trình xử lý qua các giai đoạn, trong đó có Event Bubbling.
 - Sự kiện sẽ chạy từ phần tử đích (nơi bạn click) rồi dịch chuyển thẳng lên trên Node tổ tiên (thường là <body> và document). Do #btn nằm trong #inner, và #inner lại nằm trong #outer, nên việc click vào nút bấm cũng đồng nghĩa với việc bạn đang click vào các thẻ div bọc nó.
 - Khi không có stopPropagation(): Trình duyệt gọi lần lượt các hàm xử lý sự kiện của #btn $\rightarrow$ #inner $\rightarrow$ #outer.
 - Khi có stopPropagation(): Hàm xử lý tại #btn chạy xong $\rightarrow$ gặp lệnh chặn $\rightarrow$ quá trình sủi bọt bị hủy bỏ lập tức, các phần tử cha phía trên hoàn toàn "vô cảm" với cú click này.