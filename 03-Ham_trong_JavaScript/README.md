## 3. Hàm trong JavaScript

- Hàm thông thường (Function Declaration & Function Expression)

- Hàm mũi tên (Arrow Function)

- Các phương thức mảng phổ biến

Hàm là những khối mã có thể tái sử dụng, được định nghĩa để thực hiện một tác vụ cụ thể.

### A. Hàm thông thường (Function Declaration & Function Expression)

Trong JavaScript, có hai cách chính để tạo hàm thông thường.

#### I. Function Declaration (Định nghĩa hàm)

Đây là cách khai báo hàm truyền thống và phổ biến nhất.

**Đặc điểm:**

- Bắt đầu bằng từ khóa `function`.

- Có một tên hàm bắt buộc.

- Được `hoisted`: Nghĩa là bạn có thể gọi hàm trước khi nó được định nghĩa trong code. JavaScript engine sẽ "nâng" toàn bộ phần định nghĩa hàm lên đầu scope của nó trước khi thực thi.

**Cú pháp:**

```
function functionName(parameter1, parameter2) {
    // code để thực thi
    return result; // (tùy chọn)
}
```

#### II. Function Expression (Biểu thức hàm)

Đây là cách gán một hàm (thường là ẩn danh - anonymous) cho một biến.

**Đặc điểm:**

- Hàm được coi như một giá trị và được gán cho một biến.

- **Không được hoisted**: Nếu bạn khai báo bằng `let` hoặc `const` (cách làm phổ biến), bạn phải định nghĩa nó trước khi gọi. Điều này tuân theo quy tắc của "Temporal Dead Zone". Nếu dùng `var`, biến sẽ được hoisted nhưng giá trị là `undefined` cho đến dòng được gán, dẫn đến lỗi `TypeError`.

**Cú pháp:**

```
const variableName = function(parameter1, parameter2) {
    // code để thực thi
    return result;
}; // Lưu ý dấu chấm phẩy ở cuối

```

File: `./declarations_vs_expressions.js`

```
// Ví dụ Function Declaration
greetDeclaration("Alice"); // Có thể gọi trước khi định nghĩa (hoisting)
function greetDeclaration(name) {
    console.log(`Hello from Declaration, ${name}!`);
}
greetDeclaration("Bob");

// Ví dụ Function Expression
const greetExpression = function(name) {
    console.log(`Hello from Expression, ${name}!`);
};
greetExpression("Charlie");

// greetExpressionBefore("David"); // Lỗi: Cannot access 'greetExpressionBefore' before initialization
// const greetExpressionBefore = function(name) {
//     console.log(`Hello from Expression Before, ${name}!`);
// };

// Nếu dùng var, biến được hoisted nhưng giá trị là undefined
// var greetVarExpression;
// greetVarExpression("Eve"); // Lỗi: TypeError: greetVarExpression is not a function
// greetVarExpression = function(name) {
//     console.log(`Hello from Var Expression, ${name}!`);
// };

```

### B. Arrow Function (Hàm mũi tên)

Được giới thiệu trong ES6, Arrow Function cung cấp một cú pháp ngắn gọn hơn để viết hàm và có một khác biệt quan trọng về cách nó xử lý từ khóa `this`.

**Đặc điểm:**

- Cú pháp ngắn gọn.

- Không có từ khóa `function`.

- Không có binding (ràng buộc) `this` của riêng nó. Nó sẽ kế thừa this từ context (ngữ cảnh) bao bọc nó **(lexical this)**. Đây là điểm khác biệt lớn nhất và quan trọng nhất.

- Không có đối tượng `arguments` như hàm thông thường (thay vào đó, sử dụng rest parameters `...args`).

- Không thể được sử dụng làm constructor (không thể dùng với từ khóa `new`).

**Cú pháp ví dụ:**

```
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
console.log(subtract(10, 4));       // 6

```

File: `./arrow_functions_this.js`

```
// Ví dụ về 'this' trong hàm thông thường và Arrow Function

// Hàm thông thường: 'this' phụ thuộc vào cách hàm được gọi
const traditionalFunc = {
    name: "Traditional",
    sayHello: function() {
        console.log(`Hello, I am ${this.name}`); // 'this' ở đây là traditionalFunc
        setTimeout(function() {
            console.log(`Inside setTimeout (Traditional): Hello, I am ${this.name}`); // 'this' ở đây là window/global object (trong non-strict mode) hoặc undefined (trong strict mode)
        }, 100);
    }
};
traditionalFunc.sayHello(); // Output: Hello, I am Traditional; Inside setTimeout (Traditional): Hello, I am undefined/window

// Arrow Function: 'this' kế thừa từ ngữ cảnh bao bọc (lexical this)
const arrowFunc = {
    name: "Arrow",
    sayHello: function() {
        console.log(`Hello, I am ${this.name}`); // 'this' ở đây là arrowFunc
        setTimeout(() => {
            console.log(`Inside setTimeout (Arrow): Hello, I am ${this.name}`); // 'this' ở đây vẫn là arrowFunc (kế thừa từ ngữ cảnh bên ngoài)
        }, 100);
    }
};
arrowFunc.sayHello(); // Output: Hello, I am Arrow; Inside setTimeout (Arrow): Hello, I am Arrow

// Arrow Function không có đối tượng arguments
const sum = (...args) => { // Sử dụng rest parameters thay vì arguments
    console.log(args); // Output: [1, 2, 3]
    return args.reduce((acc, val) => acc + val, 0);
};
console.log(sum(1, 2, 3)); // Output: 6

// Hàm thông thường có đối tượng arguments
function sumTraditional() {
    console.log(arguments); // Output: [Arguments] { '0': 4, '1': 5, '2': 6 }
    return Array.from(arguments).reduce((acc, val) => acc + val, 0);
}
console.log(sumTraditional(4, 5, 6)); // Output: 15

```

### C. Các phương thức mảng phổ biến

Đây là những "utility function" cực kỳ mạnh mẽ giúp xử lý mảng một cách hiệu quả và dễ đọc hơn rất nhiều so với vòng lặp `for` truyền thống. Chúng đều nhận một hàm (callback) làm đối số.

#### I. forEach()

- **Công dụng:** Thực thi một hàm cung cấp một lần cho mỗi phần tử trong mảng.

- **Không trả về giá trị mới:** Nó luôn trả về `undefined`. Dùng khi bạn muốn thực hiện một hành động gì đó với mỗi phần tử mà không cần tạo ra mảng mới.

- **Ví dụ:** In ra từng phần tử của mảng.

#### II. map()

- **Công dụng:** Tạo ra một mảng mới với kết quả của việc gọi một hàm cung cấp trên mỗi phần tử trong mảng ban đầu.

- **Luôn trả về một mảng mới** có cùng độ dài với mảng gốc.

- **Ví dụ:** Tạo một mảng mới chứa bình phương của các số trong mảng cũ.

#### III. filter()

- **Công dụng:** Tạo ra một mảng mới với tất cả các phần tử vượt qua bài kiểm tra (trả về true) được triển khai bởi hàm được cung cấp.

- **Luôn trả về một mảng mới**, có thể có độ dài ngắn hơn mảng gốc.

- **Ví dụ:** Lọc ra các số chẵn từ một mảng.

#### IV. reduce()

- **Công dụng:** Thực thi một hàm "reducer" (bạn cung cấp) trên mỗi phần tử của mảng, dẫn đến một giá trị đầu ra duy nhất.

- **Rất linh hoạt:** Có thể dùng để tính tổng, tìm giá trị lớn nhất/nhỏ nhất, biến đổi mảng thành object...

- **Cú pháp:** `array.reduce(callback(accumulator, currentValue, index, array), initialValue)`

  - `accumulator`: Biến tích lũy, lưu kết quả trả về của lần lặp trước.

  - `currentValue`: Phần tử đang được xử lý.

  - `index` (tùy chọn): Chỉ mục của phần tử đang được xử lý.

  - `array` (tùy chọn): Mảng mà `reduce()` đang được gọi trên đó.

  - `initialValue` (tùy chọn): Giá trị khởi tạo cho `accumulator`. Nếu không có, `accumulator` sẽ là phần tử đầu tiên và vòng lặp bắt đầu từ phần tử thứ hai.

- **Ví dụ:** Tính tổng các số trong một mảng.

File: `./array_methods.js`

```
const numbers = [1, 2, 3, 4, 5];
const fruits = ['apple', 'banana', 'cherry'];

// I. forEach()
console.log("--- forEach() ---");
numbers.forEach((num, index) => {
    console.log(`Element at index ${index}: ${num}`);
});
// Output:
// Element at index 0: 1
// Element at index 1: 2
// Element at index 2: 3
// Element at index 3: 4
// Element at index 4: 5

// II. map()
console.log("\n--- map() ---");
const squaredNumbers = numbers.map(num => num * num);
console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]

const uppercasedFruits = fruits.map(fruit => fruit.toUpperCase());
console.log(uppercasedFruits); // Output: ['APPLE', 'BANANA', 'CHERRY']

// III. filter()
console.log("\n--- filter() ---");
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // Output: [2, 4]

const longFruits = fruits.filter(fruit => fruit.length > 5);
console.log(longFruits); // Output: ['banana', 'cherry']

// IV. reduce()
console.log("\n--- reduce() ---");
// Tính tổng các số
const sumOfNumbers = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0); // initialValue là 0
console.log(sumOfNumbers); // Output: 15 (1+2+3+4+5)

// Nối các chuỗi thành một
const combinedFruits = fruits.reduce((acc, fruit) => acc + ' ' + fruit);
console.log(combinedFruits); // Output: "apple banana cherry" (initialValue mặc định là 'apple')

// Chuyển mảng thành object (ví dụ: đếm số lần xuất hiện của mỗi phần tử)
const votes = ['yes', 'no', 'yes', 'yes', 'no'];
const voteCounts = votes.reduce((counts, vote) => {
    counts[vote] = (counts[vote] || 0) + 1;
    return counts;
}, {}); // initialValue là một object rỗng
console.log(voteCounts); // Output: { yes: 3, no: 2 }

```
