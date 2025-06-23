1. Giới Thiệu JavaScript và Node.js
JavaScript: Định nghĩa và Vai trò trong Phát triển Web

Định nghĩa:

JavaScript (thường được viết tắt là JS) là một ngôn ngữ lập trình thông dịch (interpreted), linh hoạt, và đa năng. Ban đầu, nó được tạo ra để chạy trên trình duyệt web phía client (client-side) nhằm mục đích làm cho các trang web trở nên "sống động" và tương tác hơn.

Vai trò trong Phát triển Web:

JavaScript là một trong ba trụ cột chính của công nghệ web front-end, bên cạnh HTML và CSS:
HTML (HyperText Markup Language): Cung cấp cấu trúc và nội dung cho trang web (giống như khung xương của ngôi nhà).
CSS (Cascading Style Sheets): Định dạng và tạo kiểu cho nội dung HTML (giống như màu sơn, đồ nội thất của ngôi nhà).
JavaScript: Thêm tính tương tác, xử lý logic, và thay đổi nội dung của trang web một cách linh hoạt mà không cần tải lại trang (giống như các thiết bị điện, hệ thống nước trong nhà, cho phép bạn tương tác và sử dụng).

Các vai trò cụ thể:

Tương tác với người dùng: Xử lý các sự kiện như nhấp chuột, gõ phím, di chuyển chuột (ví dụ: hiển thị một menu khi nhấp vào nút).
Thay đổi DOM (Document Object Model): Thêm, xóa, hoặc sửa đổi các phần tử HTML và CSS trên trang một cách linh hoạt.
Gửi và nhận dữ liệu (AJAX/Fetch API): Giao tiếp với máy chủ để lấy dữ liệu mới và cập nhật một phần của trang web mà không cần tải lại toàn bộ trang (ví dụ: tải thêm bài viết khi cuộn xuống, cập nhật giỏ hàng).
Tạo hiệu ứng, hoạt ảnh: Làm cho giao diện người dùng trở nên mượt mà và hấp dẫn hơn.
Xác thực dữ liệu (Form Validation): Kiểm tra dữ liệu người dùng nhập vào biểu mẫu ngay trên trình duyệt trước khi gửi đến máy chủ.
./dom_example.html

==

Node.js: Định nghĩa, Lịch sử phát triển, và Lý do sử dụng
Định nghĩa:

Node.js là một môi trường chạy (runtime environment) JavaScript mã nguồn mở, đa nền tảng, cho phép thực thi mã JavaScript bên ngoài trình duyệt web. Về cơ bản, Node.js đã "mang" JavaScript ra khỏi trình duyệt và cho phép nó chạy trực tiếp trên máy chủ. Node.js được xây dựng trên V8 JavaScript engine của Google Chrome.

Lịch sử phát triển:

Node.js được tạo ra bởi Ryan Dahl vào năm 2009. Ông cảm thấy không hài lòng với khả năng xử lý đồng thời (concurrency) của các máy chủ web phổ biến lúc bấy giờ (như Apache). Các máy chủ này thường tạo ra một luồng (thread) mới cho mỗi kết nối, rất tốn tài nguyên. Dahl muốn tạo ra một cách tiếp cận khác, cho phép xử lý nhiều kết nối cùng lúc một cách hiệu quả hơn bằng cách sử dụng mô hình I/O không chặn (non-blocking I/O) và vòng lặp sự kiện (event loop).

Lý do sử dụng Node.js:

JavaScript ở mọi nơi (JavaScript Everywhere): Cho phép các nhà phát triển sử dụng cùng một ngôn ngữ (JavaScript) cho cả front-end và back-end. Điều này giúp thống nhất đội ngũ phát triển, chia sẻ mã nguồn và giảm thời gian học công nghệ mới.
Hiệu năng cao cho ứng dụng I/O: Rất mạnh mẽ trong việc xử lý các tác vụ liên quan đến I/O (Input/Output) như đọc/ghi file, kết nối cơ sở dữ liệu, gọi API... nhờ vào mô hình non-blocking I/O.
Khả năng mở rộng (Scalability): Có khả năng xử lý hàng ngàn kết nối đồng thời một cách hiệu quả trên một tiến trình duy nhất, rất phù hợp cho các ứng dụng thời gian thực như chat, game online, streaming.
Hệ sinh thái NPM (Node Package Manager) khổng lồ: NPM là kho lưu trữ các thư viện và công cụ mã nguồn mở lớn nhất thế giới. Bạn có thể dễ dàng tìm và cài đặt gần như mọi thứ bạn cần cho dự án của mình chỉ với một dòng lệnh.

Các chức năng chính của Node.js
1. Lập trình phía máy chủ (Server-side Programming)

Đây là ứng dụng phổ biến nhất của Node.js. Nó cho phép bạn xây dựng các máy chủ web, API (Application Programming Interface), và các dịch vụ back-end khác.
Ví dụ cụ thể: Tạo một máy chủ web đơn giản
./simple_server.js

2. I/O không chặn (Non-blocking I/O)

Đây là khái niệm cốt lõi làm nên sức mạnh của Node.js.

Blocking I/O (Truyền thống): Khi một tác vụ I/O (ví dụ: đọc một file lớn từ ổ đĩa) được thực hiện, toàn bộ tiến trình sẽ phải dừng lại và chờ cho đến khi tác vụ đó hoàn thành. Trong thời gian chờ, tiến trình không thể làm gì khác. Điều này giống như bạn xếp hàng mua cà phê và phải đứng chờ đến lượt mình, không thể làm việc khác.

Non-blocking I/O (Node.js): Khi một tác vụ I/O được yêu cầu, Node.js sẽ gửi yêu cầu đó đi và ngay lập tức tiếp tục thực hiện các công việc tiếp theo mà không cần chờ đợi. Khi tác vụ I/O hoàn thành, nó sẽ thông báo kết quả thông qua một hàm gọi lại (callback function). Điều này giống như bạn gọi món ở nhà hàng, sau đó quay về bàn ngồi lướt điện thoại. Khi món ăn sẵn sàng, nhân viên sẽ mang ra cho bạn.

Ví dụ cụ thể: So sánh Blocking và Non-blocking khi đọc file
./blocking_io.js
./non_blocking_io.js

