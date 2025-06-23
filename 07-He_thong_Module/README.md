7. Hệ thống Module trong Node.js
Module trong Node.js là các khối code có thể tái sử dụng, được đóng gói trong các file riêng biệt. Chúng giúp chúng ta tổ chức code một cách logic, tránh ô nhiễm phạm vi toàn cục (global scope) và chia sẻ code giữa các phần khác nhau của ứng dụng hoặc giữa các dự án.

Node.js hỗ trợ hai hệ thống module chính: CommonJS (CJS) và ES Modules (ESM).

A. CommonJS (CJS): Cách hoạt động và cú pháp
CommonJS là hệ thống module mặc định và truyền thống của Node.js. Hầu hết các tài liệu, hướng dẫn và thư viện cũ hơn mà bạn tìm thấy đều sử dụng cú pháp này.

Cách hoạt động:

Đồng bộ (Synchronous): Khi bạn dùng require(), Node.js sẽ dừng việc thực thi code hiện tại, đọc file module từ ổ đĩa, thực thi nó và trả về đối tượng exports. Quá trình này diễn ra một cách đồng bộ (blocking). Điều này hợp lý vì các file module thường nằm trên cùng một máy chủ, việc truy cập rất nhanh.
Được bao bọc (Wrapped): Trước khi thực thi code trong một module, Node.js sẽ bao bọc nó trong một hàm đặc biệt. Hàm này cung cấp cho module các biến cục bộ quan trọng như require, module, exports, __filename, và __dirname.
Được cache lại (Cached): Lần đầu tiên một module được require, nó sẽ được thực thi và kết quả được lưu vào cache. Các lần require sau đó đến cùng một module sẽ trả về kết quả đã được cache mà không cần thực thi lại file.
Cú pháp chính:

I. Để "xuất" (export) code từ một module:
Bạn sử dụng đối tượng module.exports hoặc biến exports.

module.exports: Đây là đối tượng thực sự được trả về khi một module được require. Bạn có thể gán bất cứ thứ gì cho nó (một hàm, một object, một class, một chuỗi...).
exports: Đây chỉ là một biến tham chiếu (shortcut) trỏ đến module.exports ban đầu. Bạn có thể thêm thuộc tính vào exports, nhưng không thể gán lại nó cho một giá trị mới, vì làm vậy sẽ phá vỡ tham chiếu đến module.exports.
./commonjs/math.js

II. Để "nhập" (import) code vào một module khác:
Bạn sử dụng hàm require().
./commonjs/app.js

B.ES Modules (ESM): Sự khác biệt và cách sử dụng
ES Modules là hệ thống module chính thức và hiện đại của ngôn ngữ JavaScript (được chuẩn hóa từ ES6). Node.js đã hỗ trợ ESM từ các phiên bản gần đây và nó đang dần trở nên phổ biến hơn.

Sự khác biệt chính so với CommonJS:

Bất đồng bộ (Asynchronous): ESM được thiết kế để hoạt động cả trên trình duyệt và server. Việc tải module có thể là một tác vụ bất đồng bộ (ví dụ: tải qua mạng). Cấu trúc của nó được phân tích tĩnh tại "compile time" (thời điểm phân tích code) thay vì "run time" (thời điểm thực thi) như CJS.
Cú pháp tĩnh (Static Syntax): Bạn phải sử dụng import và export ở cấp cao nhất (top-level) của module. Bạn không thể đặt chúng trong các khối if, vòng lặp hay trong hàm. Điều này cho phép các công cụ phân tích code (bundlers, tree-shaking tools) có thể xác định các phụ thuộc mà không cần chạy code.
Bindings trực tiếp (Live bindings): Khi bạn import một biến từ một module ESM, bạn đang tạo ra một "binding" (liên kết) trực tiếp đến biến đó. Nếu giá trị của biến trong module gốc thay đổi, giá trị đó cũng sẽ được cập nhật trong module đã import. CommonJS chỉ sao chép giá trị tại thời điểm require.
Cách sử dụng:

Để Node.js nhận diện một file là ES Module, bạn cần làm một trong hai việc sau:

Đặt tên file với đuôi .mjs.
Hoặc, trong file package.json của dự án, thêm dòng: "type": "module". Khi đó, tất cả các file .js sẽ được coi là ESM. (Nếu muốn dùng CJS trong dự án này, bạn phải đổi tên file CJS thành .cjs).
Cú pháp chính:

I. Để "xuất" (export) code:

Named Export (Xuất theo tên): Xuất nhiều giá trị từ một module.
Default Export (Xuất mặc định): Mỗi module chỉ có thể có một default export. Đây là giá trị chính mà module muốn cung cấp.
./es_modules/stringUtils.mjs

II. Để "nhập" (import) code:
./es_modules/main.mjs