# Câu A1 (5đ) — Sync vs Async
 - Kết quả Output: 1 - Start -> 4 - End -> 3 - Promise -> 6 - Promise 2 -> 2 - Timeout 0ms -> 7 - Nested timeout -> 5 - Timeout 100ms
 - Giải thích:
    + Call Stack: Nơi chạy code đồng bộ (Sync). Chạy ngay lập tức, xong trước tất cả mọi thứ khác (1, 4).
    + Microtask Queue (Ưu tiên cao): Chứa các callback của Promise. Sau khi Call Stack trống, Event Loop sẽ vét sạch hàng đợi này rồi mới sang việc khác (3, 6).
    + Macrotask Queue (Ưu tiên thấp): Chứa các callback của setTimeout. Chỉ được chạy từng cái một sau khi Microtask Queue đã trống hoàn toàn (2, 7, 5).
 - Tại sao 7 lại chạy trước 5? Vì 7 có thời gian chờ là 0ms nên nó được đẩy vào hàng đợi Macrotask và sẵn sàng thực thi ngay lập tức, trong khi 5 phải đợi đủ 100ms mới đủ điều kiện lọt vào hàng đợi.

# Câu A2 (5đ) — Fetch API
 * Giải thích từng dòng code
 - 1: async function getData() {
    -> Định nghĩa một hàm bất đồng bộ bằng từ khóa async. Hàm này sẽ luôn trả về một Promise.
 - 2: try {
    -> Bắt đầu một khối lệnh giám sát lỗi. Nếu bất kỳ dòng code nào bên trong try xảy ra lỗi, chương trình sẽ lập tức nhảy xuống khối catch
 - 3: const response = await fetch("https://api.example.com/data");
    -> Gửi một yêu cầu HTTP đến API. Từ khóa await tạm dừng hàm để đợi server phản hồi và trả về một đối tượng Response, gán vào biến response.
 - 4: if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
    -> Kiểm tra nếu phản hồi từ server không thành công (status code nằm ngoài khoảng 200–299). Nếu đúng, chủ động tự ném (throw) ra một lỗi kèm mã trạng thái HTTP để nhảy xuống catch.
 - 5: const data = await response.json();
    -> Đọc và chuyển đổi nội dung phản hồi (vốn là text dạng JSON) thành một đối tượng JavaScript. Việc này tốn thời gian nên cần await tiếp.
 - 6: return data;
    -> Trả về dữ liệu đã parse thành công. Thực tế, dữ liệu này sẽ được bọc bên trong một Promise đã hoàn thành (resolved).
 - 7: } catch (error) {
        console.error("Failed:", error.message);
        return null;
    }
}
    -> Nơi xử lý khi có lỗi xảy ra ở khối try. In thông báo lỗi ra tab console của trình duyệt và trả về null để ứng dụng không bị crash.

 1. await fetch(...) — fetch trả về gì? Tại sao cần await?
  - fetch() trả về: Một Promise, và Promise này sẽ resolve ra một đối tượng Response (chứa thông tin chung về phản hồi như headers, status, nhưng chưa chứa body dữ liệu).
  - Tại sao cần await: Vì gửi yêu cầu qua mạng internet là một tác vụ tốn thời gian (bất đồng bộ). await giúp tạm dừng dòng code, đợi cho đến khi server phản hồi xong xuôi rồi mới chạy tiếp dòng dưới, giúp code viết trông giống như đồng bộ (gần gũi, dễ đọc).
 
 2. response.ok — Khi nào false? Liệt kê 3 status codes tương ứng.
  - Khi nào false: Khi mã trạng thái HTTP (status code) trả về từ server nằm ngoài khoảng 200 - 299 (tức là yêu cầu thất bại).
  - 3 status codes ví dụ:
    + 404 (Not Found - Không tìm thấy đường dẫn).
    + 500 (Internal Server Error - Lỗi hệ thống phía server).
    + 403 (Forbidden - Bị từ chối truy cập / Không có quyền).

 3. response.json() — Tại sao cần await lần nữa?
  - Lý do: Khi fetch hoàn thành, trình duyệt mới chỉ nhận được phần Header của HTTP. Phần thân dữ liệu (Body) có thể rất lớn và vẫn đang được tải về ngầm dưới dạng luồng dữ liệu (Stream).
  - Hàm .json() đảm nhận nhiệm vụ đọc toàn bộ luồng dữ liệu đó và parse nó sang Object. Việc đọc luồng dữ liệu này cũng là tác vụ bất đồng bộ, do đó nó tiếp tục trả về một Promise và bắt buộc bạn phải dùng await lần 2.

 4. try...catch — Catch những lỗi gì?
  - Khối catch trong đoạn code trên sẽ bắt được các lỗi sau:
    + Network error (Lỗi mạng): Có bắt được. (Ví dụ: Đứt cáp, mất mạng, sai tên miền, lỗi CORS). Lúc này hàm fetch() sẽ thất bại ngay lập tức và tự ném lỗi xuống catch.
    + JSON parse error (Lỗi cú pháp JSON): Có bắt được. Nếu API bị lỗi và trả về một chuỗi HTML (như trang 500 của server) thay vì chuỗi JSON, hàm response.json() sẽ bị lỗi cú pháp cấu trúc và ném lỗi xuống catch.
    + Lỗi HTTP (404, 500,...): Bản thân hàm fetch() của JavaScript không tự ném lỗi khi gặp 404 hay 500. Tuy nhiên, nhờ đoạn code if (!response.ok) { throw new Error(...) } mà bạn chủ động viết, các lỗi này sẽ được chuyển tiếp xuống khối catch thành công.

# Câu A3 (5đ) — Promise States
 1. Sơ đồ 3 trạng thái của Promise

             +-----------+
            |  Pending  |
            +-----------+
             /         \
            /           \
 resolve() /             \ reject()
          /               \
         v                 v
 +---------------+   +--------------+
 |   Fulfilled   |   |   Rejected   |
 +---------------+   +--------------+
  
  - Pending: trạng thái ban đầu, chưa hoàn thành.
  - Fulfilled: Promise thực hiện thành công (resolve() được gọi).
  - Rejected: Promise thất bại (reject() được gọi).
 
 2. Callback Hell là gì?
  - Callback Hell là tình trạng các hàm callback lồng nhau quá nhiều tầng, khiến mã nguồn khó đọc, khó bảo trì và khó xử lý lỗi.
  - Ví dụ cấu trúc thường có dạng:
  
  function1(function(result1) {
    function2(result1, function(result2) {
        function3(result2, function(result3) {
            function4(result3, function(result4) {
                console.log(result4);
            });
        });
    });
});

  -> Càng nhiều tầng callback thì code càng bị "thụt lề sang phải", tạo thành hình tam giác (Pyramid of Doom).
 
 3. Ví dụ Callback Hell 4 cấp
  - Code:
    setTimeout(() => {
    console.log("Bước 1");

    setTimeout(() => {
        console.log("Bước 2");

        setTimeout(() => {
            console.log("Bước 3");

            setTimeout(() => {
                console.log("Bước 4");
            }, 1000);

        }, 1000);

    }, 1000);

}, 1000);

  - Kết quả:
    Bước 1
    Bước 2
    Bước 3
    Bước 4

 4. Refactor bằng async/await
  - Code: 
    function waitStep(step) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Bước ${step}`);
            resolve();
        }, 1000);
    });
}

async function run() {
    await waitStep(1);
    await waitStep(2);
    await waitStep(3);
    await waitStep(4);
}

run();

 - Ưu điểm của async/await
    + Code ngắn gọn hơn.
    + Dễ đọc như mã đồng bộ.
    + Dễ xử lý lỗi bằng try...catch.
    + Tránh Callback Hell.



