2. Kiểu dữ liệu và Biến
A. Các kiểu dữ liệu: Primitive vs Reference
Trong JavaScript, các kiểu dữ liệu được chia thành hai nhóm chính: Kiểu dữ liệu nguyên thủy (Primitive Types) và Kiểu dữ liệu tham chiếu (Reference Types). Sự khác biệt cốt lõi giữa chúng nằm ở cách chúng được lưu trữ và sao chép trong bộ nhớ.

I. Kiểu dữ liệu nguyên thủy (Primitive Types)

Đây là những dữ liệu cơ bản, bất biến (immutable - không thể thay đổi trực tiếp giá trị gốc). Khi bạn gán một biến nguyên thủy cho một biến khác, bạn đang sao chép giá trị của nó.

Có 7 kiểu dữ liệu nguyên thủy:

string: Chuỗi ký tự. Ví dụ: "Hello World", 'JavaScript'.
number: Số (bao gồm cả số nguyên và số thực). Ví dụ: 100, 3.14.
boolean: Logic đúng/sai. Ví dụ: true, false.
null: Đại diện cho sự "rỗng" hoặc "vô giá trị" một cách có chủ đích.
undefined: Biến đã được khai báo nhưng chưa được gán giá trị.
symbol: (ES6) Tạo ra các giá trị định danh duy nhất.
bigint: (ES2020) Dùng cho các số nguyên cực lớn, vượt ngoài giới hạn của number.
./primitive_vs_reference.js

II. Kiểu dữ liệu tham chiếu (Reference Types)

Tất cả các object trong JavaScript đều là kiểu tham chiếu. Điều này bao gồm:

Object: Đối tượng { key: 'value' }.
Array: Mảng [1, 2, 3].
Function: Hàm function() {}.
... và các đối tượng khác như Date, RegExp.
Khi bạn gán một biến tham chiếu cho một biến khác, bạn không sao chép đối tượng đó. Thay vào đó, bạn đang sao chép địa chỉ (tham chiếu) đến vị trí của đối tượng đó trong bộ nhớ. Cả hai biến sẽ cùng trỏ về một đối tượng duy nhất.

B. Khai báo biến: var, let, và const
Trước ES6 (ES2015), var là cách duy nhất để khai báo biến. ES6 đã giới thiệu let và const để giải quyết các vấn đề của var.
| Loại    | Hoisting | Phạm vi  | Có thể gán lại | Ghi chú                    |Khai báo lại
| ------- | -------- | -------- | -------------- | ---------------------------|
| `var`   | Có       | Function | ✅             | Dễ gây lỗi, hạn chế dùng  |Có thể trong cùng scope
| `let`   | Không    | Block    | ✅             | Sử dụng phổ biến          |Không thể trong cùng scope
| `const` | Không    | Block    | ❌             | Không thể gán lại giá trị |Không thể trong cùng scope
                                                   (nhưng object bên trong   |
                                                   vẫn thay đổi được)
./var_let_const.js

C. Phạm vi (Scope): Global, Function, Block
Scope xác định khả năng truy cập (khả năng nhìn thấy) của các biến và hàm tại các vị trí khác nhau trong code của bạn.

I. Global Scope (Phạm vi toàn cục)

Biến được khai báo bên ngoài tất cả các hàm và block {} sẽ có phạm vi toàn cục. Nó có thể được truy cập từ bất kỳ đâu trong chương trình.

II. Function Scope (Phạm vi hàm)

Biến được khai báo bằng var bên trong một hàm chỉ có thể được truy cập bên trong hàm đó.

III. Block Scope (Phạm vi khối)

Được giới thiệu trong ES6, phạm vi khối áp dụng cho các biến được khai báo bằng let và const. Biến chỉ tồn tại và có thể được truy cập bên trong khối {...} nơi nó được khai báo (ví dụ: trong if, for, while hoặc một cặp {} đơn thuần).
./scope.js

D. Destructuring (Array và Object)
Destructuring (phá vỡ cấu trúc) là một cú pháp tiện lợi cho phép bạn "giải nén" các giá trị từ mảng hoặc thuộc tính từ đối tượng vào các biến riêng biệt.

I. Object Destructuring
II. Array Destructuring
./destructuring.js