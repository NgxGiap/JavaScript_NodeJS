# 1. Giới Thiệu JavaScript và Node.js

## JavaScript: Định nghĩa và Vai trò trong Phát triển Web

### Định nghĩa:

**JavaScript** (thường được viết tắt là JS) là một ngôn ngữ lập trình thông dịch (interpreted), linh hoạt, và đa năng. Ban đầu, nó được tạo ra để chạy trên trình duyệt web phía client (client-side) nhằm mục đích làm cho các trang web trở nên "sống động" và tương tác hơn.

### Vai trò trong Phát triển Web:

JavaScript là một trong ba trụ cột chính của công nghệ web **front-end**, bên cạnh HTML và CSS:

- **HTML (HyperText Markup Language)**: Cung cấp cấu trúc và nội dung cho trang web (giống như khung xương của ngôi nhà).

- **CSS (Cascading Style Sheets)**: Định dạng và tạo kiểu cho nội dung HTML (giống như màu sơn, đồ nội thất của ngôi nhà).

- **JavaScript**: Thêm tính tương tác, xử lý logic, và thay đổi nội dung của trang web một cách linh hoạt mà không cần tải lại trang (giống như các thiết bị điện, hệ thống nước trong nhà, cho phép bạn tương tác và sử dụng).

Các vai trò cụ thể:

- **Tương tác với người dùng**: Xử lý các sự kiện như nhấp chuột, gõ phím, di chuyển chuột (ví dụ: hiển thị một menu khi nhấp vào nút).

- **Thay đổi DOM (Document Object Model)**: Thêm, xóa, hoặc sửa đổi các phần tử HTML và CSS trên trang một cách linh hoạt.

- **Gửi và nhận dữ liệu (AJAX/Fetch API)**: Giao tiếp với máy chủ để lấy dữ liệu mới và cập nhật một phần của trang web mà không cần tải lại toàn bộ trang (ví dụ: tải thêm bài viết khi cuộn xuống, cập nhật giỏ hàng).

- **Tạo hiệu ứng, hoạt ảnh**: Làm cho giao diện người dùng trở nên mượt mà và hấp dẫn hơn.

- **Xác thực dữ liệu (Form Validation)**: Kiểm tra dữ liệu người dùng nhập vào biểu mẫu ngay trên trình duyệt trước khi gửi đến máy chủ.

File: `./dom_example.html`

```
<!DOCTYPE html>
<html>
<head>
    <title>Ví dụ JavaScript</title>
</head>
<body>
    <h1 id="greeting">Chào bạn!</h1>
    <button id="changeButton">Đổi lời chào</button>

    <script src="dom_example.js"></script>
</body>
</html>
```

## Node.js: Định nghĩa, Lịch sử phát triển, và Lý do sử dụng

### Định nghĩa:

**Node.js** là một môi trường chạy **(runtime environment)** JavaScript mã nguồn mở, đa nền tảng, cho phép thực thi mã JavaScript bên ngoài trình duyệt web. Về cơ bản, Node.js đã "mang" JavaScript ra khỏi trình duyệt và cho phép nó chạy trực tiếp trên máy chủ. Node.js được xây dựng trên **V8 JavaScript engine** của Google Chrome.

### Lịch sử phát triển:

Node.js được tạo ra bởi **Ryan Dahl** vào năm 2009. Ông cảm thấy không hài lòng với khả năng xử lý đồng thời **(concurrency)** của các máy chủ web phổ biến lúc bấy giờ (như Apache). Các máy chủ này thường tạo ra một luồng **(thread)** mới cho mỗi kết nối, rất tốn tài nguyên. Dahl muốn tạo ra một cách tiếp cận khác, cho phép xử lý nhiều kết nối cùng lúc một cách hiệu quả hơn bằng cách sử dụng mô hình I/O không chặn **(non-blocking I/O)** và vòng lặp sự kiện **(event loop)**.

### Lý do sử dụng Node.js:

- **JavaScript ở mọi nơi (JavaScript Everywhere)**: Cho phép các nhà phát triển sử dụng cùng một ngôn ngữ (JavaScript) cho cả front-end và back-end. Điều này giúp thống nhất đội ngũ phát triển, chia sẻ mã nguồn và giảm thời gian học công nghệ mới.

- **Hiệu năng cao cho ứng dụng I/O**: Rất mạnh mẽ trong việc xử lý các tác vụ liên quan đến I/O (Input/Output) như đọc/ghi file, kết nối cơ sở dữ liệu, gọi API... nhờ vào mô hình non-blocking I/O.

- **Khả năng mở rộng (Scalability)**: Có khả năng xử lý hàng ngàn kết nối đồng thời một cách hiệu quả trên một tiến trình duy nhất, rất phù hợp cho các ứng dụng thời gian thực như chat, game online, streaming.

- **Hệ sinh thái NPM (Node Package Manager) khổng lồ**: NPM là kho lưu trữ các thư viện và công cụ mã nguồn mở lớn nhất thế giới. Bạn có thể dễ dàng tìm và cài đặt gần như mọi thứ bạn cần cho dự án của mình chỉ với một dòng lệnh.

### Các chức năng chính của Node.js

#### 1. Lập trình phía máy chủ (Server-side Programming)

Đây là ứng dụng phổ biến nhất của Node.js. Nó cho phép bạn xây dựng các máy chủ web, API (Application Programming Interface), và các dịch vụ back-end khác.

Ví dụ cụ thể: Tạo một máy chủ web đơn giản

File: `./simple_server.js`

```
// Import module 'http' có sẵn của Node.js
const http = require('http');

// Định nghĩa cổng mà máy chủ sẽ lắng nghe
const port = 3000;

// Tạo một máy chủ
const server = http.createServer((req, res) => {
    // req: request (yêu cầu từ client)
    // res: response (phản hồi từ server)

    // Thiết lập mã trạng thái và kiểu nội dung phản hồi
    res.statusCode = 200; // 200 có nghĩa là OK
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    // Gửi nội dung phản hồi về cho client
    res.end('Xin chào! Đây là server Node.js đầu tiên của bạn.\n');
});

// Cho máy chủ bắt đầu lắng nghe các yêu cầu đến ở cổng đã định nghĩa
server.listen(port, () => {
    console.log(`Máy chủ đang chạy tại http://localhost:${port}/`);
});
```

#### 2. I/O không chặn (Non-blocking I/O)

Đây là khái niệm cốt lõi làm nên sức mạnh của Node.js.

- **Blocking I/O (Truyền thống)**: Khi một tác vụ I/O (ví dụ: đọc một file lớn từ ổ đĩa) được thực hiện, toàn bộ tiến trình sẽ phải dừng lại và chờ cho đến khi tác vụ đó hoàn thành. Trong thời gian chờ, tiến trình không thể làm gì khác. Điều này giống như bạn xếp hàng mua cà phê và phải đứng chờ đến lượt mình, không thể làm việc khác.

- **Non-blocking I/O (Node.js)**: Khi một tác vụ I/O được yêu cầu, Node.js sẽ gửi yêu cầu đó đi và ngay lập tức tiếp tục thực hiện các công việc tiếp theo mà không cần chờ đợi. Khi tác vụ I/O hoàn thành, nó sẽ thông báo kết quả thông qua một hàm gọi lại (callback function). Điều này giống như bạn gọi món ở nhà hàng, sau đó quay về bàn ngồi lướt điện thoại. Khi món ăn sẵn sàng, nhân viên sẽ mang ra cho bạn.

Ví dụ cụ thể: So sánh Blocking và Non-blocking khi đọc file

File: `./blocking_io.js`

```
const fs = require('fs'); // fs = file system

console.log("Bắt đầu đọc file (blocking)...");

// Đọc file một cách đồng bộ (blocking)
try {
    const data = fs.readFileSync('data.txt', 'utf8');
    console.log("Nội dung file:", data);
} catch (err) {
    console.error(err);
}

console.log("...Kết thúc chương trình.");
```

File: `./non_blocking_io.js`

```
const fs = require('fs');

console.log("Bắt đầu đọc file (non-blocking)...");

// Đọc file một cách bất đồng bộ (non-blocking)
fs.readFile('data.txt', 'utf8', (err, data) => {
    // Hàm này (callback) sẽ chỉ được gọi khi việc đọc file hoàn tất
    if (err) {
        console.error(err);
        return;
    }
    console.log("Nội dung file:", data);
});

console.log("...Kết thúc chương trình.");
```

# Các thành phần chính của Node.js

Node.js được xây dựng từ nhiều thành phần cốt lõi, mỗi thành phần đóng một vai trò quan trọng trong việc cung cấp môi trường thực thi JavaScript hiệu quả và không chặn (non-blocking):

**1. V8 JavaScript Engine**

- **Vai trò:** Đây là "trái tim" của Node.js. V8 là công cụ JavaScript mã nguồn mở hiệu suất cao được phát triển bởi Google, cũng là công cụ mà trình duyệt Chrome sử dụng.

- **Hoạt động:** V8 chịu trách nhiệm biên dịch và thực thi mã JavaScript của bạn thành mã máy (machine code) trực tiếp. Điều này làm cho JavaScript trong Node.js chạy cực kỳ nhanh. Nó cũng quản lý Call Stack (nơi các hàm đang thực thi được lưu trữ) và Heap (bộ nhớ cho các biến và đối tượng).

- **2. libuv**

**Vai trò:** Đây là một thư viện C++ đa nền tảng, là xương sống cho khả năng I/O bất đồng bộ và Event Loop của Node.js. `libuv` cung cấp một lớp trừu tượng (abstraction layer) để Node.js có thể tương tác với hệ điều hành một cách không chặn trên nhiều nền tảng (Windows, macOS, Linux).

- **Hoạt động:** `libuv` xử lý hầu hết các tác vụ bất đồng bộ nặng nhọc, bao gồm:

  - **File System (FS) operations:** Đọc, ghi, xóa file (ví dụ: `fs.readFile()`).

  - **Networking:** Xử lý kết nối TCP/UDP, HTTP requests (ví dụ: `http.createServer()`).

  - **Timers:** Quản lý `setTimeout()` và `setInterval().`

  - **Child Processes:** Cho phép Node.js chạy các lệnh hệ thống bên ngoài.

  - **Thread Pool:** Đối với một số tác vụ I/O chặn hoặc các phép tính toán nặng mà hệ điều hành không hỗ trợ API không chặn (ví dụ: mã hóa/giải mã, nén dữ liệu), `libuv` sẽ ủy quyền chúng cho một nhóm các luồng riêng biệt (thread pool). Điều này đảm bảo luồng chính của JavaScript không bị chặn.

**3. Event Loop**

- **Vai trò:** Event Loop là cơ chế cốt lõi cho phép Node.js thực thi các tác vụ bất đồng bộ mà không làm chặn luồng chính. Nó là một vòng lặp liên tục kiểm tra và điều phối các tác vụ.

- **Hoạt động:** Event Loop không ngừng kiểm tra xem Call Stack (nơi mã đồng bộ đang chạy) có rỗng không. Nếu rỗng, nó sẽ:

  - Xử lý các callback trong **Microtask Queue** (từ Promises, process.nextTick()) với ưu tiên cao nhất.

  - Sau đó, nó sẽ chuyển qua các giai đoạn khác nhau để xử lý các callback từ Macrotask Queue (hay Callback Queue/Task Queue), bao gồm các callback từ `setTimeout`, `setInterval`, I/O (từ `libuv`), và `setImmediate()`.

  - Sự phân chia thành các giai đoạn và ưu tiên này giúp Node.js duy trì khả năng phản hồi và xử lý một lượng lớn các kết nối đồng thời một cách hiệu quả.

**4. Node.js Core Modules (Built-in Modules)**

- **Vai trò:** Đây là một tập hợp các module được tích hợp sẵn trong Node.js, cung cấp các API cấp cao để tương tác với các tính năng của hệ điều hành và thực hiện các tác vụ phổ biến. Chúng được viết bằng cả JavaScript và C++.

- **Hoạt động:** Các module này được xây dựng dựa trên `libuv` và V8 để cung cấp giao diện dễ sử dụng cho lập trình viên. Ví dụ:

  - http: Để xây dựng máy chủ web và thực hiện các yêu cầu `HTTP`.

  - `fs` **(File System)**: Để tương tác với hệ thống file (đọc/ghi/xóa file).

  - `path`: Để làm việc với đường dẫn file và thư mục.

  - `events`: Cung cấp cơ chế Event Emitter để xây dựng các ứng dụng hướng sự kiện.

  - `crypto`: Cung cấp các chức năng mã hóa và băm.

**5. Node.js Bindings**

- **Vai trò:** Đây là lớp trung gian cho phép mã JavaScript trong Node.js gọi các chức năng được viết bằng C++ (và các ngôn ngữ cấp thấp khác).

- **Hoạt động:** Khi bạn sử dụng một module Node.js cấp cao như `fs` (ví dụ: `fs.readFile()`), thực chất có một phần của module đó được viết bằng C++ để giao tiếp trực tiếp với `libuv` và hệ điều hành. Các Node.js Bindings là cầu nối cho phép JavaScript gọi các chức năng C++ này một cách mượt mà.

# Tóm tắt mối quan hệ giữa các thành phần

Hãy hình dung một yêu cầu tới máy chủ Node.js của bạn:

1. Một yêu cầu HTTP đến (do `libuv` lắng nghe).

2. `libuv` nhận yêu cầu và đưa callback tương ứng vào hàng đợi.

3. **Event Loop** thấy luồng chính rảnh, lấy callback (từ module `http` của **Core Modules**) và đẩy vào **Call Stack**.

4. Mã JavaScript của bạn trong Call Stack có thể gọi `fs.readFile()` (từ module `fs` của Core Modules).

5. `fs.readFile()` thông qua Node.js Bindings sẽ yêu cầu `libuv` thực hiện việc đọc file.

6. `libuv` sẽ sử dụng **Thread Pool** (nếu việc đọc file là blocking I/O) hoặc các API không chặn của hệ điều hành để đọc file ở chế độ nền.

7. Trong khi đó, **V8 Engine** tiếp tục thực thi các mã JavaScript khác nếu có trong Call Stack.

8. Khi `libuv` hoàn thành việc đọc file, nó đưa callback của `fs.readFile()` vào Callback Queue (Macrotask Queue).

9. **Event Loop** lại kiểm tra Call Stack, thấy nó rỗng, sau đó lấy callback của `fs.readFile()` từ Callback Queue và đẩy vào Call Stack để **V8** thực thi.

Sự kết hợp ăn ý giữa V8 Engine để thực thi JavaScript, libuv để xử lý I/O bất đồng bộ, Event Loop để điều phối, và các Core Modules cùng Bindings để cung cấp API đã tạo nên một Node.js mạnh mẽ, hiệu quả và có khả năng mở rộng cao cho các ứng dụng phía máy chủ và ứng dụng thời gian thực.
