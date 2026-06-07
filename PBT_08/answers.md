# Câu A1 (5đ) — Function Declaration vs Expression vs Arrow
 - Cách 1: Function Declaration (Khai báo hàm)
 ```
 function tinhThueBaoHiemDeclaration(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
}
```
 - Cách 2: Function Expression (Biểu thức hàm)
 ```
 const tinhThueBaoHiemExpression = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};
```
 - Cách 3: Arrow Function (Hàm mũi tên)
 ```
 const tinhThueBaoHiemArrow = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};
```
 - Trả lời: Có sự khác biệt rất lớn về Hoisting giữa Function Declaration và hai cách còn lại (Function Expression & Arrow Function).
     + Function Declaration: Được hoisting hoàn toàn (cả tên và định nghĩa hàm). Bạn có thể gọi hàm trước khi nó được khai báo trong code.
     + Function Expression & Arrow Function: Phụ thuộc vào từ khóa khai báo biến (var, let, hoặc const). Khi dùng const hoặc let, chúng bị đưa vào vùng "Temporal Dead Zone" (Vùng chết tạm thời). Bạn không thể gọi hàm trước khi dòng khai báo đó chạy qua, nếu cố tình gọi sẽ bị lỗi ReferenceError.

# Câu A2 (5đ) — Scope & Closure
 - Đoạn 1: output
    1
    2
    3
    2
    2

 - Đoạn 2: output
    var: 3
    var: 3
    var: 3
    let: 0
    let: 1
    let: 2

- giải thích:
    
    + var có function scope, nên trong vòng lặp chỉ tồn tại một biến i duy nhất.
    + Khi các hàm trong setTimeout được tạo ra, chúng đều tham chiếu tới cùng một biến i.
    + Sau khi vòng lặp kết thúc, i = 3.
    + Đến lúc setTimeout chạy, cả 3 callback đều đọc giá trị hiện tại của i
    + let có block scope, nên mỗi lần lặp sẽ tạo ra một biến j mới.
    + Mỗi callback của setTimeout giữ (closure) một bản sao riêng của giá trị j tại lần lặp đó.
    + Vì vậy khi callback chạy, chúng lần lượt đọc các giá trị
 
 -> Kết luận: var dùng chung một biến cho toàn bộ vòng lặp, còn let tạo biến mới cho mỗi lần lặp, nên kết quả của setTimeout khác nhau.

# Câu A3 (5đ) — Array Methods
```
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const evenNums = nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3
const tripleNums = nums.map(n => n * 3);

// 3. Tính tổng tất cả
const sumAll = nums.reduce((acc, curr) => acc + curr, 0);

// 4. Tìm số đầu tiên > 7
const firstGretaterThan7 = nums.find(n => n > 7);

// 5. Kiểm tra CÓ số > 10 không
const hasGreaterThan10 = nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
const allGreaterThan0 = nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const parityStrings = nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);

// 8. Đảo ngược mảng (không mutate gốc)
const reversedNums = [...nums].reverse(); // Hoặc: nums.toReversed(); (Hỗ trợ từ ES2023)
```

# Câu A4 (5đ) — Object Destructuring & Spread

1. Dự đoán Output

 - console.log(name, price, ram, color);  // iPhone 16 25990000 8 Titan
 - console.log(specs);                     // ReferenceError: specs is not defined
 - console.log(updated.price);            // 23990000
 - console.log(updated.sale);             // true
 - console.log(product.price);            // 25990000 (Mảng gốc KHÔNG đổi)
 - console.log(product.specs.ram);        // 16 (Bị thay đổi thành 16!)

2. Giải thích chi tiết
 - Phần 1: Destructuring (Phá vỡ cấu trúc): 
    + console.log(name, price, ram, color); hoạt động hoàn hảo vì cú pháp destructuring đã bóc tách trực tiếp các thuộc tính này thành các biến độc lập.
    + console.log(specs); gây ra lỗi ReferenceError. Lý do là khi bạn viết specs: { ram, color }, JavaScript chỉ hiểu specs: là đường dẫn (định hướng) để đi sâu vào bên trong bóc tách hai biến ram và color. Bản thân specs không được tạo ra như một biến độc lập trong phạm vi này.
 
 - Phần 2: Spread Operator (Sao chép và ghi đè)
    + const updated = { ...product, price: 23990000, sale: true };
    + Toán tử ...product sẽ trải (sao chép) tất cả các thuộc tính của product sang object mới. Sau đó, thuộc tính price được viết phía sau sẽ ghi đè (overwrite) lên giá trị cũ, và sale: true được thêm mới vào.
    + Quá trình này tạo ra một object hoàn toàn mới ở một vùng nhớ khác, nên giá trị gốc product.price vẫn giữ nguyên là 25990000.
 
 - Phần 3: Spread Gotcha (Bẫy sao chép nông - Shallow Copy)
    + Tại sao product.specs.ram lại bị đổi thành 16?
    + Toán tử Spread (...) trong JavaScript chỉ thực hiện Shallow Copy (Sao chép nông). Nghĩa là nó chỉ sao chép các giá trị ở tầng thức nhất (tầng nguyên thủy như name, price).
    + Đối với các thuộc tính là một Object lồng bên trong (như specs), Spread Operator không tạo ra một Object specs mới, mà nó chỉ sao chép cái địa chỉ vùng nhớ (reference) của specs cũ sang cho copy.
    + Do đó, cả product.specs và copy.specs đều đang trỏ chung vào cùng một ô nhớ trên Heap. Khi bạn thay đổi copy.specs.ram = 16, bạn vô tình đã làm thay đổi object chung đó, khiến product.specs.ram của object gốc bị đổi theo.

