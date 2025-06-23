10. Giới thiệu Express.js
Express.js là gì?

Express.js là một framework ứng dụng web tối giản (minimalist) và linh hoạt (flexible) dành cho Node.js. Nó không áp đặt một cấu trúc cứng nhắc nào mà thay vào đó cung cấp một bộ công cụ mạnh mẽ để xây dựng các ứng dụng web và API.

Tại sao cần dùng Express.js?

Hãy tưởng tượng module http của Node.js là một động cơ xe hơi. Nó rất mạnh mẽ nhưng để chế tạo một chiếc xe hoàn chỉnh, bạn cần thêm khung gầm, vô lăng, bánh xe, hệ thống phanh... Express chính là bộ khung và các bộ phận đó. Nó xây dựng dựa trên module http và cung cấp các tính năng cấp cao hơn, giúp bạn:

Định tuyến (Routing): Dễ dàng xử lý các yêu cầu HTTP (GET, POST, PUT, DELETE...) đến các URL (/users, /products/:id) khác nhau.
Middleware: Cung cấp một cơ chế cực kỳ mạnh mẽ để xử lý các yêu cầu theo từng bước.
Tích hợp Template Engine: Dễ dàng kết hợp với các template engine như Pug, EJS để render các trang HTML động.
Đơn giản hóa Request/Response: Cung cấp các phương thức tiện ích trên đối tượng request và response (ví dụ: res.json(), req.params, req.body).

I. Các khái niệm cốt lõi
a. Routing (Định tuyến)

Routing là cách ứng dụng xác định làm thế nào để phản hồi một yêu cầu của client đến một endpoint cụ thể, bao gồm một URI (hoặc path) và một phương thức HTTP cụ thể (GET, POST...).

Cú pháp: app.METHOD(PATH, HANDLER)

METHOD: Một phương thức HTTP viết thường (ví dụ: get, post, put, delete).
PATH: Một đường dẫn trên server (ví dụ: /, /about, /api/users).
HANDLER: Hàm được thực thi khi route được khớp.

b. Middleware

Đây là khái niệm quan trọng nhất trong Express.

Middleware là gì? Là những hàm có quyền truy cập vào đối tượng request (req), đối tượng response (res), và hàm next() trong chu kỳ request-response của ứng dụng.
Hoạt động như thế nào? Hãy tưởng tượng một yêu cầu HTTP đi qua một "dây chuyền lắp ráp" các hàm middleware. Mỗi hàm có thể:
Thực thi bất kỳ đoạn code nào.
Thay đổi đối tượng req và res.
Kết thúc chu kỳ request-response (ví dụ: res.send()).
Gọi hàm next() để chuyển quyền điều khiển cho middleware tiếp theo trong dây chuyền.
Nếu một middleware không gọi next() và cũng không gửi phản hồi, yêu cầu sẽ bị "treo" lại.

Các loại Middleware:

Application-level Middleware: Gắn vào app bằng app.use() hoặc app.get(),...
Router-level Middleware: Gắn vào một instance của express.Router().
Error-handling Middleware: Middleware đặc biệt có 4 tham số (err, req, res, next).
Built-in Middleware: Các middleware có sẵn của Express (ví dụ: express.json(), express.static()).
Third-party Middleware: Các middleware được cài đặt từ NPM (ví dụ: cors, morgan, body-parser).

c. Serving Static Files (Phục vụ file tĩnh)

Để phục vụ các file tĩnh như HTML, CSS, JavaScript phía client, và hình ảnh, bạn sử dụng middleware express.static.

II. Xử lý lỗi trong Express
Express có một cơ chế xử lý lỗi đặc biệt. Bạn tạo một middleware với 4 tham số (err, req, res, next). Middleware này phải được định nghĩa sau cùng, sau tất cả các app.use() và các route khác.