# Câu A1 (5đ) — Viewport & Mobile-First
1. Viết chính xác thẻ <meta viewport> chuẩn. Giải thích từng thuộc tính.
<!-- Trong <head> — PHẢI CÓ -->
`<meta name="viewport" content="width=device-width, initial-scale=1.0">`
* Giải thích : 
 - width=device-width
    + Đặt chiều rộng trang bằng đúng chiều rộng màn hình thiết bị (iPhone, Android, tablet...).
    + Không bị “thu nhỏ” như trang desktop.
 - initial-scale=1.0
    + Mức zoom ban đầu khi mở trang là 100%.
    + Không phóng to hoặc thu nhỏ mặc định.

2. Nếu thiếu thẻ viewport thì iPhone hiển thị thế nào?
 - iPhone giả định trang rộng 980px (như desktop) → thu nhỏ lại → chữ bé xíu → UX tệ.

3. Mobile-First và Desktop-First khác nhau thế nào? Viết ví dụ CSS cho mỗi cách với breakpoint 768px. Tại sao Mobile-First được khuyên dùng?
* Mobile-First (khuyến nghị ✅): Viết CSS cho mobile trước, sau đó mở rộng cho màn hình lớn
 - Ví dụ: 
 /* 1. Code cho mobile trước (không cần @media) */
.product-grid {
    display: grid;
    grid-template-columns: 1fr;     /* 1 cột trên mobile */
    gap: 16px;
}

/* 2. Thêm complexity khi màn hình rộng hơn */
@media (min-width: 576px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);   /* 2 cột tablet nhỏ */
    }
}

@media (min-width: 992px) {
    .product-grid {
        grid-template-columns: repeat(3, 1fr);   /* 3 cột desktop */
    }
}

@media (min-width: 1200px) {
    .product-grid {
        grid-template-columns: repeat(4, 1fr);   /* 4 cột desktop lớn */
    }
}

* Desktop-First (cách cũ ❌): Viết CSS cho desktop trước, sau đó thu nhỏ cho mobile.
 - Ví dụ: 
 .product-grid { grid-template-columns: repeat(4, 1fr); }
 @media (max-width: 1200px) { /* 3 cột */ }
 @media (max-width: 992px)  { /* 2 cột */ }
 @media (max-width: 576px)  { /* 1 cột */ }

* Lý do Mobile-First tốt hơn:
 - Mobile tải ít CSS hơn (mobile chỉ tải mobile styles, không download desktop styles)
 - Buộc bạn ưu tiên nội dung quan trọng trước (content thinking)
 - Google và performance tools đánh giá cao hơn

# Câu A2 (5đ) — Breakpoints
Breakpoints chuẩn
| Breakpoint        | Kích thước | Thiết bị đại diện                       | Ví dụ lưới sản phẩm |
| ----------------- | ---------- | --------------------------------------- | ------------------- |
| Mobile **xs**     | `< 576px`  | Điện thoại nhỏ (iPhone SE, Android nhỏ) | **1 cột**           |
|  Mobile L **sm**  | `≥ 576px`  | Điện thoại lớn                          | **1–2 cột**         |
| Tablet **md**     | `≥ 768px`  | Tablet dọc (iPad mini, tablet Android)  | **2–3 cột**         |
| Desktop **lg**    | `≥ 992px`  | Laptop nhỏ                              | **3 cột**           |
| Desktop L **xl**  | `≥ 1200px` | Laptop lớn / desktop                    | **4 cột**           |
| Desktop XL **xxl**| `≥ 1400px` | Màn hình lớn (4K, ultrawide)            | **4–6 cột**         |

# Câu A3 (5đ) — Media Queries

| Chiều rộng màn hình   | `.container` width |
| --------------------- | ------------------ |
| **375px (iPhone SE)** | **100%**           |
| **600px**             | **540px**          |
| **800px**             | **720px**          |
| **1000px**            | **960px**          |
| **1400px**            | **1140px**         |

# Câu A4 (5đ) — SCSS Basics

1. Variables ($primary-color): 
 - Dùng để lưu giá trị dùng lại nhiều lần (màu sắc, font, spacing...) (ở đây là màu chính)
 - Ví dụ:
 
 $primary-color: #7c3aed;
 $font-size: 16px;

 button {
   background: $primary-color;
  font-size: $font-size;
 }

 - Ý nghĩa:
    + Đổi 1 chỗ → toàn bộ thay đổi
    + Giống “biến” trong lập trình

2. Nesting (viết CSS lồng nhau)
 - Viết CSS theo cấu trúc HTML, dễ đọc hơn
 - Ví dụ:
 
 // SCSS — rõ ràng, dễ đọc
.navbar {
    background: #1a202c;
    padding: $space-4;
    display: flex;
    align-items: center;
    justify-content: space-between;

    // & = tham chiếu đến selector cha (.navbar)
    &__logo {
        color: white;
        font-size: $font-size-lg;
        font-weight: 700;
        text-decoration: none;
    }

    &__links {
        display: flex;
        gap: $space-6;
        list-style: none;
    }

    &__item {
        &__link {
            color: rgba(white, 0.8);
            text-decoration: none;
            transition: color $transition-base;

            &:hover {
                color: white;
            }

            &--active {
                color: $color-primary;
                font-weight: 600;
            }
        }
    }
}
 - Ý nghĩa:
    + Gọn hơn CSS thường
    + Dễ nhìn quan hệ cha–con

3. Mixins (@mixin, @include)
 - Tạo “hàm CSS” để tái sử dụng code
 - Ví dụ: 
 @mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  @include flex-center;
  height: 200px;
}
 - Ý nghĩa:
    + Giảm lặp code
    + Dùng như function trong lập trình

4. @extend / Inheritance
 - Cho phép một class kế thừa style của class khác
 - ví dụ: 
 .btn {
  padding: 10px;
  border-radius: 6px;
  border: none;
}

.btn-primary {
  @extend .btn;
  background: blue;
} 

.btn-danger {
  @extend .btn;
  background: red;
}git pull origin main --rebase
 - Ý nghĩa:
    + Tái sử dụng style
    + Tránh viết lại CSS giống nhau

* Vì sao browser KHÔNG đọc được .scss?
 - Vì:    
    + Trình duyệt chỉ hiểu: HTML, CSS, JavaScript
    + .scss là ngôn ngữ tiền xử lý (preprocessor)
    + Có syntax đặc biệt: $variable, @mixin, nesting... -> Browser không hiểu các cú pháp này

* Các bước để chuyển SCSS → CSS
 - VS Code + Live Sass Compiler extension
   → Click "Watch Sass" ở status bar
   → Tự compile mỗi khi save

 - Vite (React/Vue project):
   npm install -D sass
   → Vite tự detect và compile .scss files

 - Node.js script:
   npm install -D sass
   npx sass styles/main.scss styles/main.css --watch

 - Create React App:
   npm install sass
   → Đổi .css thành .scss → tự compile
