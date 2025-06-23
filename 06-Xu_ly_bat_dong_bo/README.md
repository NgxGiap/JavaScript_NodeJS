6. Xử lý bất đồng bộ trong JavaScript và Node.js
A. Callback: Cách hoạt động và hạn chế
Cách hoạt động:

Callback là cách tiếp cận cơ bản và lâu đời nhất để xử lý các tác vụ bất đồng bộ trong JavaScript. Ý tưởng rất đơn giản: Callback là một hàm được truyền vào một hàm khác dưới dạng đối số, và nó sẽ được gọi (executed) sau khi tác vụ bất đồng bộ hoàn thành.

Hạn chế của Callback:

Vấn đề lớn nhất và nổi tiếng nhất của callback là "Callback Hell" (hay "Pyramid of Doom" - Kim tự tháp của sự diệt vong). Khi bạn cần thực hiện nhiều tác vụ bất đồng bộ nối tiếp nhau (ví dụ: đọc file user, sau đó dùng thông tin user để gọi API, sau đó dùng kết quả API để ghi vào CSDL), code của bạn sẽ bị lồng vào nhau theo nhiều cấp, tạo ra một cấu trúc rất khó đọc, khó gỡ lỗi và khó bảo trì.
./callback_hell.js

B.Promise: Cấu trúc và cách sử dụng
Promise (Lời hứa) được giới thiệu trong ES6 để giải quyết vấn đề của Callback Hell. Một Promise là một đối tượng đại diện cho sự hoàn thành hoặc thất bại (trong tương lai) của một tác vụ bất đồng bộ.

Một Promise có 3 trạng thái:

pending: Trạng thái ban đầu, chưa hoàn thành hay thất bại.
fulfilled (hoặc resolved): Tác vụ đã hoàn thành thành công.
rejected: Tác vụ đã thất bại.
Cấu trúc và cách sử dụng:

Một Promise được tạo bằng constructor new Promise(). Nó nhận vào một hàm (executor) có hai tham số là resolve và reject.

Gọi resolve(value) khi tác vụ thành công và trả về kết quả value.
Gọi reject(error) khi có lỗi xảy ra.
Để xử lý kết quả của Promise, chúng ta sử dụng các phương thức:

.then(onFulfilled): Được gọi khi Promise ở trạng thái fulfilled.
.catch(onRejected): Được gọi khi Promise ở trạng thái rejected.
.finally(onFinally): Được gọi khi Promise kết thúc, dù là fulfilled hay rejected.

Giải quyết Callback Hell bằng Promise Chaining (Nối chuỗi Promise):

Promise cho phép chúng ta "làm phẳng" code bằng cách nối các phương thức .then() lại với nhau.
./promises.js

C.Async/Await: Cú pháp và ứng dụng
async/await được giới thiệu trong ES2017 (ES8) và là một cú pháp đặc biệt (syntactic sugar) được xây dựng dựa trên Promise. Nó giúp chúng ta viết code bất đồng bộ trông giống hệt như code đồng bộ, làm cho nó trở nên cực kỳ trực quan và dễ hiểu.

async: Đặt trước một hàm để biến nó thành một "hàm bất đồng bộ". Một hàm async luôn ngầm trả về một Promise. Nếu hàm trả về một giá trị, Promise sẽ resolve với giá trị đó. Nếu hàm throw một lỗi, Promise sẽ reject với lỗi đó.
await: Chỉ có thể được sử dụng bên trong một hàm async. Nó sẽ tạm dừng việc thực thi của hàm async và chờ cho đến khi Promise được resolve hoặc reject. Sau đó, nó sẽ tiếp tục thực thi và trả về kết quả đã được resolve của Promise.
./async_await.js