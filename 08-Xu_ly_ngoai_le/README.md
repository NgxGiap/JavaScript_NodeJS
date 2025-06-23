8. Xử lý ngoại lệ (Error Handling)
Cú pháp throw và try...catch
Đây là cơ chế xử lý lỗi cơ bản và đồng bộ trong JavaScript.

A. throw Statement (Câu lệnh throw)

Công dụng: Dùng để "ném" ra một ngoại lệ (exception) do người dùng định nghĩa. Khi một ngoại lệ được ném ra, việc thực thi của hàm hiện tại sẽ bị dừng lại.
Cái gì có thể được throw? Bạn có thể ném ra bất cứ thứ gì: một đối tượng Error, một chuỗi, một số, một boolean. Tuy nhiên, thực hành tốt nhất là luôn luôn throw một đối tượng Error (hoặc một lớp kế thừa từ Error) vì nó chứa các thông tin hữu ích như message (thông điệp lỗi) và stack (dấu vết ngăn xếp cuộc gọi - call stack trace), giúp cho việc gỡ lỗi dễ dàng hơn rất nhiều.

B. try...catch...finally Block (Khối try...catch...finally)

Công dụng: Dùng để "bắt" và xử lý các lỗi có thể xảy ra trong một khối code mà không làm "crash" toàn bộ chương trình.
try: Đặt đoạn code có khả năng gây ra lỗi vào trong khối này.
catch (error): Nếu một lỗi xảy ra bên trong khối try, việc thực thi sẽ ngay lập tức nhảy đến khối catch. Đối tượng lỗi được throw sẽ được truyền vào biến error.
finally: Khối này luôn luôn được thực thi sau khi try (và catch, nếu có lỗi) hoàn thành, bất kể có lỗi xảy ra hay không. Nó thường được dùng để dọn dẹp tài nguyên (ví dụ: đóng kết nối CSDL, đóng file).
./sync_error_handling.js

C. Xử lý lỗi trong bất đồng bộ
Cơ chế try...catch truyền thống chỉ hoạt động với code đồng bộ. Nó không thể bắt lỗi xảy ra bên trong các hàm callback bất đồng bộ. Vì vậy, mỗi phương pháp xử lý bất đồng bộ có cách xử lý lỗi riêng.

I. Xử lý lỗi với Callback (Error-first Pattern)

Quy ước: Trong Node.js, có một quy ước rất phổ biến gọi là "Error-first Callback". Theo đó, hàm callback luôn nhận tham số đầu tiên là đối tượng lỗi.
Cách hoạt động: Khi tác vụ bất đồng bộ kết thúc, bạn phải luôn kiểm tra xem tham số error có tồn tại (khác null/undefined) hay không. Nếu có, bạn xử lý lỗi. Nếu không, bạn mới tiếp tục xử lý dữ liệu ở các tham số tiếp theo.
Quên kiểm tra if (error) là một lỗi rất phổ biến của người mới bắt đầu.

B. Xử lý lỗi với Promise (.catch())

Cách hoạt động: Promise cung cấp một cơ chế xử lý lỗi tập trung và rõ ràng hơn nhiều thông qua phương thức .catch(). Khi một Promise bị reject (bằng cách gọi hàm reject() hoặc có một lỗi được throw bên trong executor hoặc .then()), luồng điều khiển sẽ nhảy đến khối .catch() gần nhất trong chuỗi promise.
Ưu điểm lớn là chỉ cần một khối .catch() để xử lý lỗi cho cả một chuỗi các tác vụ bất đồng bộ.

C. Xử lý lỗi với Async/Await (try...catch)

Cách hoạt động: async/await cho phép chúng ta quay trở lại sử dụng cú pháp try...catch quen thuộc để xử lý lỗi trong code bất đồng bộ, làm cho nó trở nên cực kỳ trực quan.
Cơ chế: Khi một Promise được await bị reject, nó sẽ hoạt động giống như một câu lệnh throw đồng bộ. Lỗi đó sẽ được bắt bởi khối catch bên ngoài.