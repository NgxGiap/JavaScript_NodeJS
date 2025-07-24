## 10. Express.js

**Express.js** (thường được gọi tắt là Express) là một framework ứng dụng web tối giản, linh hoạt của Node.js, cung cấp một bộ tính năng mạnh mẽ để phát triển các ứng dụng web và API. Nó được thiết kế để xây dựng các ứng dụng web nhanh chóng và dễ dàng bằng cách cung cấp các công cụ và quy ước để xử lý các yêu cầu HTTP, định tuyến, middleware, và nhiều hơn nữa.

Express.js là framework phổ biến nhất cho Node.js và là một phần quan trọng của ngăn xếp MEAN (MongoDB, Express.js, AngularJS/Angular, Node.js) và MERN (MongoDB, Express.js, React, Node.js).

### A. Giới thiệu Express.js

Express.js cung cấp một lớp trừu tượng (abstraction layer) trên Node.js's native HTTP module, giúp đơn giản hóa việc viết code server. Nó không áp đặt một cấu trúc dự án cụ thể nào, cho phép các nhà phát triển tự do tổ chức code theo cách họ muốn.

**Các tính năng cốt lõi của Express.js:**

- **Định tuyến (Routing):** Khả năng định nghĩa các endpoint (URL) khác nhau và cách ứng dụng phản hồi các yêu cầu HTTP (GET, POST, PUT, DELETE, v.v.) đến các endpoint đó.

- **Middleware:** Các hàm có quyền truy cập vào đối tượng yêu cầu (`req`), đối tượng phản hồi (`res`), và hàm middleware tiếp theo trong chu trình yêu cầu-phản hồi của ứng dụng. Middleware có thể thực hiện các tác vụ như ghi log, xác thực, phân tích cú pháp body của yêu cầu, v.v.

- **Hỗ trợ công cụ tạo template (Templating Engines):** Cho phép bạn tạo ra các trang HTML động bằng cách sử dụng các template engine như Pug (Jade), EJS, Handlebars, v.v.

- **Xử lý lỗi:** Cung cấp cơ chế mạnh mẽ để xử lý các lỗi xảy ra trong ứng dụng.

### B. Cách sử dụng và các ứng dụng thực tế

#### I. Cài đặt Express.js

Để bắt đầu với Express.js, bạn cần có Node.js và npm (Node Package Manager) đã được cài đặt. Sau đó, bạn có thể cài đặt Express trong dự án của mình bằng lệnh:

```
npm init -y # Khởi tạo một dự án Node.js mới (nếu chưa có)
npm install express
```

#### II. Tạo một Web Server đơn giản với Express.js

Đây là ví dụ cơ bản nhất về cách tạo một server Express và định tuyến một yêu cầu GET.

**File: `./app.js`**

```
const express = require('express'); // 1. Import Express
const app = express();              // 2. Tạo một instance của ứng dụng Express
const port = 3000;                  // 3. Định nghĩa cổng mà server sẽ lắng nghe

// 4. Định tuyến cho yêu cầu GET đến URL gốc '/'
app.get('/', (req, res) => {
  res.send('Chào mừng bạn đến với trang chủ Express.js!'); // Gửi phản hồi về client
});

// 5. Định tuyến cho yêu cầu GET đến URL '/about'
app.get('/about', (req, res) => {
  res.send('Đây là trang giới thiệu về chúng tôi.');
});

// 6. Lắng nghe các yêu cầu trên cổng đã định nghĩa
app.listen(port, () => {
  console.log(`Server Express đang chạy tại http://localhost:${port}`);
});

/*
Để chạy ví dụ này:
1. Lưu code trên vào file app.js
2. Mở terminal trong thư mục chứa file app.js
3. Chạy lệnh: node app.js
4. Mở trình duyệt và truy cập:
   - http://localhost:3000/
   - http://localhost:3000/about
*/
```

#### III. Sử dụng Middleware

Middleware là các hàm được thực thi giữa khi server nhận được yêu cầu và khi nó gửi phản hồi. Chúng có thể thực hiện các tác vụ như:

- Thực thi bất kỳ code nào.

- Thay đổi đối tượng yêu cầu (req) và đối tượng phản hồi (res).

- Kết thúc chu trình yêu cầu-phản hồi.

- Gọi middleware tiếp theo trong ngăn xếp (next()).

**Ví dụ Middleware:**

```
const express = require('express');
const app = express();
const port = 3000;

// Middleware ghi log mọi yêu cầu đến
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Gọi middleware tiếp theo hoặc hàm định tuyến
});

// Middleware để phân tích cú pháp JSON body từ yêu cầu POST
app.use(express.json());

// Định tuyến GET
app.get('/', (req, res) => {
  res.send('Trang chủ với middleware ghi log.');
});

// Định tuyến POST (ví dụ nhận dữ liệu JSON)
app.post('/api/data', (req, res) => {
  console.log('Dữ liệu nhận được:', req.body); // req.body chứa dữ liệu JSON từ client
  res.json({ message: 'Dữ liệu đã được nhận thành công!', receivedData: req.body });
});

// Middleware xử lý lỗi (luôn đặt cuối cùng)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Đã xảy ra lỗi gì đó!');
});

app.listen(port, () => {
  console.log(`Server Express với Middleware đang chạy tại http://localhost:${port}`);
});

/*
Để kiểm tra middleware POST:
1. Chạy server: node app.js
2. Sử dụng công cụ như Postman, Insomnia, hoặc fetch API trong trình duyệt/Node.js để gửi yêu cầu POST:
   URL: http://localhost:3000/api/data
   Method: POST
   Headers: Content-Type: application/json
   Body (raw JSON):
   {
       "name": "Test User",
       "value": 123
   }
*/
```

### C. Các ứng dụng thực tế của Express.js

Express.js được sử dụng rộng rãi để xây dựng nhiều loại ứng dụng khác nhau:

- **API RESTful:** Đây là ứng dụng phổ biến nhất của Express, nơi nó cung cấp các endpoint để ứng dụng client (web, mobile) giao tiếp với server.

- **Ứng dụng Web truyền thống (Server-rendered applications):** Kết hợp với các template engine (như EJS, Pug), Express có thể tạo ra các trang HTML động được render ở phía server.

- **Microservices:** Express là lựa chọn tuyệt vời để xây dựng các dịch vụ nhỏ, độc lập trong kiến trúc microservices.

- **Real-time applications:** Kết hợp với Socket.IO, Express có thể được sử dụng để xây dựng các ứng dụng thời gian thực như ứng dụng chat hoặc game.

- **Middleware cho các tác vụ backend:** Ví dụ, một API gateway có thể được xây dựng bằng Express để xử lý xác thực, ghi log, và định tuyến yêu cầu đến các dịch vụ backend khác.

Express.js là một công cụ mạnh mẽ và linh hoạt, cho phép bạn xây dựng các ứng dụng web và API hiệu quả với Node.js.
