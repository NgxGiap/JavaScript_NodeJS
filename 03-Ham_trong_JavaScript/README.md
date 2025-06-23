3. Hàm trong JavaScript
Hàm thông thường (Function Declaration & Function Expression)
Hàm là những khối mã có thể tái sử dụng, được định nghĩa để thực hiện một tác vụ cụ thể. Trong JavaScript, có hai cách chính để tạo hàm thông thường.

A. Function Declaration (Định nghĩa hàm)

Đây là cách khai báo hàm truyền thống và phổ biến nhất.

Đặc điểm:

Bắt đầu bằng từ khóa function.
Có một tên hàm bắt buộc.
Được hoisted: Nghĩa là bạn có thể gọi hàm trước khi nó được định nghĩa trong code. JavaScript engine sẽ "nâng" toàn bộ phần định nghĩa hàm lên đầu scope của nó trước khi thực thi.
Cú pháp:

function functionName(parameter1, parameter2) {
    // code để thực thi
    return result; // (tùy chọn)
}

II. Function Expression (Biểu thức hàm)

Đây là cách gán một hàm (thường là ẩn danh - anonymous) cho một biến.

Đặc điểm:

Hàm được coi như một giá trị và được gán cho một biến.
Không được hoisted: Nếu bạn khai báo bằng let hoặc const (cách làm phổ biến), bạn phải định nghĩa nó trước khi gọi. Điều này tuân theo quy tắc của "Temporal Dead Zone". Nếu dùng var, biến sẽ được hoisted nhưng giá trị là undefined cho đến dòng được gán, dẫn đến lỗi TypeError.
Cú pháp:

const variableName = function(parameter1, parameter2) {
    // code để thực thi
    return result;
}; // Lưu ý dấu chấm phẩy ở cuối
./declarations_vs_expressions.js

C. Arrow Function (Hàm mũi tên)
Được giới thiệu trong ES6, Arrow Function cung cấp một cú pháp ngắn gọn hơn để viết hàm và có một khác biệt quan trọng về cách nó xử lý từ khóa this.

Đặc điểm:

Cú pháp ngắn gọn.
Không có từ khóa function.
Không có binding (ràng buộc) this của riêng nó. Nó sẽ kế thừa this từ context (ngữ cảnh) bao bọc nó (lexical this). Đây là điểm khác biệt lớn nhất và quan trọng nhất.
Không có đối tượng arguments như hàm thông thường (thay vào đó, sử dụng rest parameters ...args).
Không thể được sử dụng làm constructor (không thể dùng với từ khóa new).

// 1. Nhiều tham số, nhiều dòng lệnh
const greet = (name, message) => {
    return `${message}, ${name}!`;
};

// 2. Một tham số, có thể bỏ dấu ngoặc ()
const square = x => {
    return x * x;
};

// 3. Một biểu thức trả về duy nhất, có thể bỏ {} và return (implicit return)
const subtract = (a, b) => a - b;

console.log(greet('Alice', 'Hello')); // "Hello, Alice!"
console.log(square(5));             // 25
console.log(subtract(10, 4));         // 6
./arrow_functions_this.js

D. Các phương thức mảng phổ biến
Đây là những "utility function" cực kỳ mạnh mẽ giúp xử lý mảng một cách hiệu quả và dễ đọc hơn rất nhiều so với vòng lặp for truyền thống. Chúng đều nhận một hàm (callback) làm đối số.

I. forEach()

Công dụng: Thực thi một hàm cung cấp một lần cho mỗi phần tử trong mảng.
Không trả về giá trị mới: Nó luôn trả về undefined. Dùng khi bạn muốn thực hiện một hành động gì đó với mỗi phần tử mà không cần tạo ra mảng mới.
Ví dụ: In ra từng phần tử của mảng.

II. map()

Công dụng: Tạo ra một mảng mới với kết quả của việc gọi một hàm cung cấp trên mỗi phần tử trong mảng ban đầu.
Luôn trả về một mảng mới có cùng độ dài với mảng gốc.
Ví dụ: Tạo một mảng mới chứa bình phương của các số trong mảng cũ.

III. filter()

Công dụng: Tạo ra một mảng mới với tất cả các phần tử vượt qua bài kiểm tra (trả về true) được triển khai bởi hàm được cung cấp.
Luôn trả về một mảng mới, có thể có độ dài ngắn hơn mảng gốc.
Ví dụ: Lọc ra các số chẵn từ một mảng.

IV. reduce()

Công dụng: Thực thi một hàm "reducer" (bạn cung cấp) trên mỗi phần tử của mảng, dẫn đến một giá trị đầu ra duy nhất.
Rất linh hoạt: Có thể dùng để tính tổng, tìm giá trị lớn nhất/nhỏ nhất, biến đổi mảng thành object...
Cú pháp: array.reduce(callback(accumulator, currentValue, index, array), initialValue)
accumulator: Biến tích lũy, lưu kết quả trả về của lần lặp trước.
currentValue: Phần tử đang được xử lý.
initialValue (tùy chọn): Giá trị khởi tạo cho accumulator. Nếu không có, accumulator sẽ là phần tử đầu tiên và vòng lặp bắt đầu từ phần tử thứ hai.
Ví dụ: Tính tổng các số trong một mảng.
./array_methods.js