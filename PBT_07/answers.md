# Câu A1 – var / let / const

## Đoạn 1

```javascript
console.log(x);
var x = 5;
```

**Output:** `undefined`

**Giải thích:** `var` được hoisting nên biến tồn tại trước khi gán giá trị.

---

## Đoạn 2

```javascript
console.log(y);
let y = 10;
```

**Output:** `ReferenceError`

**Giải thích:** `let` nằm trong Temporal Dead Zone (TDZ), không được truy cập trước khi khai báo.

---

## Đoạn 3

```javascript
const z = 15;
z = 20;
console.log(z);
```

**Output:** `TypeError`

**Giải thích:** `const` không cho phép gán lại giá trị.

---

## Đoạn 4

```javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```

**Output:**

```text
[1, 2, 3, 4]
```

**Giải thích:** `const` không đổi được tham chiếu nhưng vẫn sửa được nội dung mảng.

---

## Đoạn 5

```javascript
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
```

**Output:**

```text
Trong block: 2
Ngoài block: 1
```

**Giải thích:** `let` có phạm vi khối (block scope), nên hai biến `a` là độc lập.

---

## Kết luận

* `var`: hoisting, không có block scope.
* `let`: có block scope, không truy cập được trước khi khai báo.
* `const`: giống `let` nhưng không được gán lại giá trị.
* `const` vẫn cho phép thay đổi nội dung object hoặc mảng.

# Câu A2 – Data Types & Coercion

## Dự đoán kết quả

```javascript
console.log(typeof null);          // "object"
console.log(typeof undefined);     // "undefined"
console.log(typeof NaN);           // "number"
console.log("5" + 3);             // "53"
console.log("5" - 3);             // 2
console.log("5" * "3");           // 15
console.log(true + true);         // 2
console.log([] + []);             // ""
console.log([] + {});             // "[object Object]"
console.log({} + []);             // 0
```

## Giải thích

### typeof null

Kết quả là `"object"` do lỗi lịch sử của JavaScript.

### typeof undefined

Kết quả là `"undefined"` vì đây là kiểu dữ liệu riêng.

### typeof NaN

Kết quả là `"number"` mặc dù NaN có nghĩa là "Not a Number".

### "5" + 3

Kết quả: `"53"`

Toán tử `+` ưu tiên nối chuỗi khi có một toán hạng là chuỗi.

### "5" - 3

Kết quả: `2`

Toán tử `-` ép kiểu chuỗi `"5"` thành số `5` rồi thực hiện phép trừ.

### "5" * "3"

Kết quả: `15`

Toán tử `*` ép cả hai chuỗi thành số rồi nhân.

### true + true

Kết quả: `2`

`true` được ép thành `1`.

### [] + []

Kết quả: `""`

Hai mảng rỗng được chuyển thành chuỗi rỗng rồi nối lại.

### [] + {}

Kết quả: `"[object Object]"`

Mảng rỗng thành `""`, object thành `"[object Object]"`.

### {} + []

Kết quả: `0`

JavaScript hiểu `{}` là một block rỗng, còn `+[]` được chuyển thành số `0`.

---

## Tại sao "5" + 3 và "5" - 3 khác nhau?

* Toán tử `+` có thể dùng để nối chuỗi nên `"5" + 3` → `"53"`.
* Toán tử `-` chỉ dùng cho số nên `"5" - 3` → `5 - 3 = 2`.

Đây là hiện tượng **Type Coercion (ép kiểu tự động)** trong JavaScript.

# Câu A3 – So sánh == và ===

## Dự đoán kết quả

```javascript
console.log(5 == "5");              // true
console.log(5 === "5");             // false
console.log(null == undefined);     // true
console.log(null === undefined);    // false
console.log(NaN == NaN);            // false
console.log(0 == false);            // true
console.log(0 === false);           // false
console.log("" == false);           // true
```

## Giải thích

### 5 == "5"

Kết quả: `true`

`==` cho phép ép kiểu nên `"5"` được chuyển thành số `5`.

### 5 === "5"

Kết quả: `false`

`===` so sánh cả giá trị và kiểu dữ liệu.

### null == undefined

Kết quả: `true`

Đây là một quy tắc đặc biệt của JavaScript.

### null === undefined

Kết quả: `false`

Khác kiểu dữ liệu nên kết quả là `false`.

### NaN == NaN

Kết quả: `false`

`NaN` không bằng bất kỳ giá trị nào, kể cả chính nó.

### 0 == false

Kết quả: `true`

`false` được ép thành `0`.

### 0 === false

Kết quả: `false`

Một bên là `number`, một bên là `boolean`.

### "" == false

Kết quả: `true`

Chuỗi rỗng được ép thành `0`, `false` cũng được ép thành `0`.

---

## Kết luận

* `==` so sánh sau khi ép kiểu.
* `===` so sánh cả giá trị và kiểu dữ liệu.
* Nên ưu tiên dùng `===` để tránh các kết quả bất ngờ do ép kiểu tự động.

# Câu A4 – Truthy & Falsy

## Tất cả giá trị Falsy trong JavaScript

```javascript
false
0
-0
0n
""
null
undefined
NaN
```

Ngoài các giá trị trên, hầu hết các giá trị còn lại đều là **Truthy**.

---

## Dự đoán kết quả

```javascript
if ("0") console.log("A");     // In
if ("") console.log("B");      // Không in
if ([]) console.log("C");      // In
if ({}) console.log("D");      // In
if (null) console.log("E");    // Không in
if (0) console.log("F");       // Không in
if (-1) console.log("G");      // In
if (" ") console.log("H");     // In
```

### Output

```text
A
C
D
G
H
```

---

## Giải thích

* `"0"` là chuỗi không rỗng ⇒ Truthy.
* `""` là chuỗi rỗng ⇒ Falsy.
* `[]` (mảng rỗng) ⇒ Truthy.
* `{}` (object rỗng) ⇒ Truthy.
* `null` ⇒ Falsy.
* `0` ⇒ Falsy.
* `-1` là số khác 0 ⇒ Truthy.
* `" "` chứa một ký tự khoảng trắng nên không phải chuỗi rỗng ⇒ Truthy.

---

## Kết luận

Nhiều người dễ nhầm:

```javascript
[]      // Truthy
{}      // Truthy
"0"     // Truthy
" "     // Truthy
```

Chỉ chuỗi rỗng `""` mới là Falsy.

# Câu A5 – Template Literals

## Cách 1

### Code gốc

```javascript
var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";
```

### Template Literal

```javascript
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

---

## Cách 2

### Code gốc

```javascript
var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;
```

### Template Literal

```javascript
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

---

## Cách 3

### Code gốc

```javascript
var html = "<div class=\"card\">" +
    "<h2>" + title + "</h2>" +
    "<p>" + description + "</p>" +
    "<span>Giá: " + price + "đ</span>" +
    "</div>";
```

### Template Literal

```javascript
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```

---

## Kết luận

Template Literal sử dụng dấu backtick (`) và cú pháp `${biến}` để chèn giá trị vào chuỗi.

Ưu điểm:

* Dễ đọc hơn khi nối nhiều chuỗi.
* Hỗ trợ xuống dòng tự nhiên.
* Không cần dùng toán tử `+` liên tục.

