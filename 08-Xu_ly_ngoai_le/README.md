## 8. Xử lý ngoại lệ (Error Handling)

- Cú pháp `throw` và `try...catch`

- Xử lý lỗi trong bất đồng bộ (Callback, Promise, Async/Await)

Trong lập trình, **ngoại lệ (exception)** là những sự kiện bất thường xảy ra trong quá trình thực thi chương trình, làm gián đoạn luồng hoạt động bình thường của nó. Việc xử lý ngoại lệ là rất quan trọng để đảm bảo ứng dụng của bạn không bị crash và có thể phục hồi một cách duyên dáng.

### A. Cú pháp `throw` và `try/catch`

JavaScript cung cấp cơ chế `throw` để tạo ra một ngoại lệ và khối `try...catch...finally` để bắt và xử lý các ngoại lệ đó.

- `throw`: Từ khóa này được dùng để tạo và "ném" một ngoại lệ. Bạn có thể ném bất kỳ giá trị nào (chuỗi, số, đối tượng), nhưng tốt nhất là ném một đối tượng `Error` hoặc một kiểu `Error` tùy chỉnh, vì chúng chứa thông tin hữu ích như stack trace.

- `try` **block**: Khối code mà bạn muốn giám sát để phát hiện các lỗi tiềm ẩn. Nếu một lỗi xảy ra trong khối `try`, việc thực thi sẽ dừng lại ngay lập tức và chuyển sang khối `catch`.

- `catch` **block**: Khối code này được thực thi khi một lỗi được "ném" ra trong khối `try`. Nó nhận một đối số (thường được đặt tên là `error` hoặc `err`) chứa thông tin về lỗi.

- `finally` **block**: Khối code này **luôn luôn** được thực thi, bất kể có lỗi xảy ra hay không và lỗi có được bắt hay không. Nó thường được dùng để thực hiện các tác vụ dọn dẹp tài nguyên (ví dụ: đóng kết nối file, giải phóng bộ nhớ).

File: `./try_catch_example.js`

### B. Xử lý lỗi trong bất đồng bộ (Callback, Promise, Async/Await)

#### I. Xử lý lỗi với Callbacks

Với callbacks, mô hình phổ biến là "**error-first callback**". Hàm callback sẽ nhận đối số đầu tiên là `error` (nếu có) và đối số thứ hai là `data` (kết quả thành công).

**Hạn chế**: Khi có nhiều tác vụ bất đồng bộ lồng nhau, việc kiểm tra lỗi ở mỗi cấp độ sẽ dẫn đến "Callback Hell" và làm cho việc quản lý lỗi trở nên cực kỳ khó khăn.

File: `./callback_error_handling.js`

#### II. Xử lý lỗi với Promise

Promises cung cấp một cơ chế xử lý lỗi tập trung hơn thông qua phương thức `.catch()`. Khi một Promise bị `rejected`, luồng điều khiển sẽ nhảy đến `.catch()` gần nhất trong chuỗi Promise.

**Cách hoạt động:**

- Nếu hàm `executor` của `new Promise()` gọi `reject(error)`, Promise sẽ chuyển sang trạng thái `Rejected`.

- Nếu có lỗi xảy ra trong khối `executor` (hoặc trong bất kỳ `.then()` nào), Promise cũng sẽ tự động bị `rejected`.

- `.catch(onRejected)` sẽ bắt lỗi này.

- Lỗi sẽ "lan truyền" xuống chuỗi Promise cho đến khi gặp một `.catch()` hoặc cho đến khi không có `.catch()` nào, lúc đó lỗi sẽ bị ném ra ngoài (unhandled rejection).

File: `./promise_error_handling.js`

#### III. Xử lý lỗi với Async/Await

`Async/Await` làm cho việc xử lý lỗi bất đồng bộ trở nên đơn giản và giống với code đồng bộ nhất, bằng cách sử dụng khối `try...catch` quen thuộc.

**Cách hoạt động:**

- Bạn đặt các lệnh `await` trong khối `try`.

- Nếu một Promise mà `await` đang chờ bị `rejected`, lỗi sẽ được `throw` ra và có thể được bắt bởi khối `catch` tương ứng.

- Điều này giúp bạn quản lý lỗi một cách tuyến tính và dễ đọc hơn rất nhiều.

File: `./async_await_error_handling.js`

C. Xử lý lỗi với Async/Await (try...catch)

Cách hoạt động: async/await cho phép chúng ta quay trở lại sử dụng cú pháp try...catch quen thuộc để xử lý lỗi trong code bất đồng bộ, làm cho nó trở nên cực kỳ trực quan.
Cơ chế: Khi một Promise được await bị reject, nó sẽ hoạt động giống như một câu lệnh throw đồng bộ. Lỗi đó sẽ được bắt bởi khối catch bên ngoài.
