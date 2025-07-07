## 2. Kiểu dữ liệu và Biến

### A. Các kiểu dữ liệu: Primitive vs Reference

Trong JavaScript, các kiểu dữ liệu được chia thành hai nhóm chính: **Kiểu dữ liệu nguyên thủy (Primitive Types)** và **Kiểu dữ liệu tham chiếu (Reference Types)**. Sự khác biệt cốt lõi giữa chúng nằm ở cách chúng được lưu trữ và sao chép trong bộ nhớ.

### I. Kiểu dữ liệu nguyên thủy (Primitive Types)

Đây là những dữ liệu cơ bản, **bất biến (immutable)** - không thể thay đổi trực tiếp giá trị gốc. Khi bạn gán một biến nguyên thủy cho một biến khác, bạn đang sao chép giá trị của nó.

Có 7 kiểu dữ liệu nguyên thủy:

- `string`: Chuỗi ký tự. Ví dụ: `"Hello World"`, `'JavaScript'`.

- `number`: Số (bao gồm cả số nguyên và số thực). Ví dụ: `100`, `3.14`.

- `boolean`: Logic đúng/sai. Ví dụ: `true`, `false`.

- `null`: Đại diện cho sự "rỗng" hoặc "vô giá trị" một cách có chủ đích.

- `undefined`: Biến đã được khai báo nhưng chưa được gán giá trị.

- `symbol`: (ES6) Tạo ra các giá trị định danh duy nhất.

- `bigint`: (ES2020) Dùng cho các số nguyên cực lớn, vượt ngoài giới hạn của number.

### II. Kiểu dữ liệu tham chiếu (Reference Types)

Tất cả các `object` trong JavaScript đều là kiểu tham chiếu. Điều này bao gồm:

- `Object`: Đối tượng `{ key: 'value' }`.

- `Array`: Mảng `[1, 2, 3]`.

- `Function`: Hàm `function() {}`.

- ... và các đối tượng khác như `Date`, `RegExp`.

Khi bạn gán một biến tham chiếu cho một biến khác, bạn không sao chép đối tượng đó. Thay vào đó, bạn đang sao chép `địa chỉ (tham chiếu)` đến vị trí của đối tượng đó trong bộ nhớ. Cả hai biến sẽ cùng trỏ về một đối tượng duy nhất.

File: `./primitive_vs_reference.js`

```
let a = 10;
let b = a; // b nhận một bản sao giá trị của a

console.log("a =", a); // a = 10
console.log("b =", b); // b = 10

// Thay đổi giá trị của b
b = 20;

console.log("Sau khi thay đổi b:");
console.log("a =", a); // a vẫn là 10, không bị ảnh hưởng
console.log("b =", b); // b bây giờ là 20

let person1 = { name: 'Alice', age: 25 };
let person2 = person1; // person2 nhận tham chiếu đến cùng một đối tượng

console.log("person1:", person1); // { name: 'Alice', age: 25 }
console.log("person2:", person2); // { name: 'Alice', age: 25 }

// Thay đổi thuộc tính thông qua person2
person2.name = 'Bob';

console.log("Sau khi thay đổi person2:");
// Vì cả hai cùng trỏ đến một đối tượng, person1 cũng bị thay đổi
console.log("person1:", person1); // { name: 'Bob', age: 25 }
console.log("person2:", person2); // { name: 'Bob', age: 25 }
```

### B. Khai báo biến: `var`, `let`, và `const`

Trước ES6 (ES2015), `var` là cách duy nhất để khai báo biến. ES6 đã giới thiệu `let` và `const` để giải quyết các vấn đề của `var`.

| Loại    | Hoisting | Phạm vi  | Có thể gán lại      | Ghi chú                                                              | Khai báo lại               |
| ------- | -------- | -------- | ------------------- | -------------------------------------------------------------------- | -------------------------- |
| `var`   | Có       | Function | <center>✅</center> | Dễ gây lỗi, hạn chế dùng                                             | Có thể trong cùng scope    |
| `let`   | Không    | Block    | <center>✅</center> | Sử dụng phổ biến                                                     | Không thể trong cùng scope |
| `const` | Không    | Block    | <center>❌</center> | Không thể gán lại giá trị (nhưng object bên trong vẫn thay đổi được) | Không thể trong cùng scope |

File: `./var_let_const.js`

```
// 1. Vấn đề về scope của var
function run() {
    if (true) {
        var a = 1; // a có function scope
        let b = 2; // b có block scope
        const c = 3; // c có block scope
    }
    console.log(a); // 1 (Có thể truy cập a ở ngoài block if)
    // console.log(b); // ReferenceError: b is not defined (Không thể truy cập)
    // console.log(c); // ReferenceError: c is not defined (Không thể truy cập)
}
run();

// 2. Vấn đề về hoisting của var
console.log(x); // undefined (x được hoisted và gán undefined)
var x = 5;

// console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

// 3. Vấn đề về gán lại của const
const myObject = { id: 1 };
// myObject = { id: 2 }; // TypeError: Assignment to constant variable.

// Tuy nhiên, bạn CÓ THỂ thay đổi thuộc tính của đối tượng được gán bằng const
myObject.id = 2; // Điều này hợp lệ!
console.log(myObject); // { id: 2 }
```

### C. Phạm vi (Scope): Global, Function, Block

Scope xác định khả năng truy cập (khả năng nhìn thấy) của các biến và hàm tại các vị trí khác nhau trong code của bạn.

#### I. Global Scope (Phạm vi toàn cục)

Biến được khai báo bên ngoài tất cả các hàm và block `{}` sẽ có phạm vi toàn cục. Nó có thể được truy cập từ bất kỳ đâu trong chương trình.

#### II. Function Scope (Phạm vi hàm)

Biến được khai báo bằng `var` bên trong một hàm chỉ có thể được truy cập bên trong hàm đó.

#### III. Block Scope (Phạm vi khối)

Được giới thiệu trong ES6, phạm vi khối áp dụng cho các biến được khai báo bằng `let` và `const`. Biến chỉ tồn tại và có thể được truy cập bên trong khối `{...}` nơi nó được khai báo (ví dụ: trong `if`, `for`, `while` hoặc một cặp `{}` đơn thuần).

File: `./scope.js`

```
const globalVar = "Tôi là biến toàn cục";

function showGlobal() {
    console.log(globalVar); // "Tôi là biến toàn cục"
}

if (true) {
    console.log(globalVar); // "Tôi là biến toàn cục"
}
showGlobal();

function myFunction() {
    var functionVar = "Tôi ở trong hàm";
    console.log(functionVar); // "Tôi ở trong hàm"
}

myFunction();
// console.log(functionVar); // ReferenceError: functionVar is not defined

if (true) {
    let blockLet = "Tôi là biến let trong block";
    const blockConst = "Tôi là biến const trong block";
    console.log(blockLet);   // OK
    console.log(blockConst); // OK
}

// console.log(blockLet);   // ReferenceError
// console.log(blockConst); // ReferenceError
```

### D. Destructuring (Array và Object)

Destructuring (phá vỡ cấu trúc) là một cú pháp tiện lợi cho phép bạn "giải nén" các giá trị từ mảng hoặc thuộc tính từ đối tượng vào các biến riêng biệt.

#### I. Object Destructuring

Cho phép bạn trích xuất các thuộc tính từ đối tượng và gán chúng vào các biến có cùng tên với thuộc tính, hoặc đổi tên biến nếu cần.

#### II. Array Destructuring

Cho phép bạn trích xuất các phần tử từ mảng và gán chúng vào các biến theo thứ tự vị trí.

File: `./destructuring.js`

```
const user = {
    id: 123,
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    profile: {
        avatar: '/path/to/avatar.jpg',
        theme: 'dark'
    }
};

// Lấy thuộc tính fullName và email
const { fullName, email } = user;
console.log(fullName); // "John Doe"
console.log(email);    // "john.doe@example.com"

// Đổi tên biến và gán giá trị mặc định
const { fullName: a, age = 30 } = user;
console.log(a);    // "John Doe" (biến mới tên là 'a')
console.log(age);  // 30 (vì 'age' không tồn tại trong 'user', nó sẽ lấy giá trị mặc định)

// Destructuring lồng nhau
const { profile: { avatar } } = user;
console.log(avatar); // "/path/to/avatar.jpg"

const numbers = [10, 20, 30, 40, 50];

// Lấy 2 phần tử đầu tiên
const [first, second] = numbers;
console.log(first);  // 10
console.log(second); // 20

// Bỏ qua phần tử
const [ , , third] = numbers;
console.log(third); // 30

// Sử dụng Rest syntax (...) để lấy các phần tử còn lại
const [x1, x2, ...rest] = numbers;
console.log(x1);   // 10
console.log(x2);   // 20
console.log(rest); // [30, 40, 50] (một mảng mới)
```
