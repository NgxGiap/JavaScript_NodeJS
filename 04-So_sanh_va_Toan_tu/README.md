## 4. So sánh và Toán tử

- So sánh: `==` vs `===` (Equality Operators)

- Các toán tử logic và toán tử liên quan

### A. `===` (Toán tử so sánh bằng nghiêm ngặt - Strict Equality)

**Hoạt động:** So sánh cả giá trị (value) và kiểu dữ liệu (type) của hai vế. Nó sẽ chỉ trả về `true` nếu cả hai vế hoàn toàn giống nhau.

**Không thực hiện chuyển đổi kiểu (Type Coercion):** Đây là điểm mấu chốt. `===` không cố gắng "biến đổi" kiểu dữ liệu của một vế để khớp với vế còn lại.

**Lời khuyên:** Luôn luôn ưu tiên sử dụng `===` trong code của bạn. Nó an toàn hơn, dễ đoán hơn và tránh được nhiều lỗi ngầm. Chỉ sử dụng == khi bạn có lý do rất cụ thể để làm vậy (điều này rất hiếm).

### B. == (Toán tử so sánh bằng lỏng lẻo - Loose Equality)

**Hoạt động:** Chỉ so sánh giá trị (value) sau khi đã thực hiện `chuyển đổi kiểu (Type Coercion)` nếu cần thiết. Nó cố gắng đưa hai vế về cùng một kiểu dữ liệu trước khi so sánh.

**Quy tắc chuyển đổi kiểu phức tạp:** Các quy tắc mà == tuân theo có thể khá phức tạp và khó nhớ, dễ dẫn đến những kết quả không mong muốn.

File: `./equality_operators.js`

```
// Ví dụ về === (Strict Equality)
console.log("--- === (Strict Equality) ---");
console.log(5 === 5);         // true (giá trị và kiểu đều giống nhau)
console.log(5 === "5");       // false (kiểu khác nhau: number vs string)
console.log(true === 1);      // false (kiểu khác nhau: boolean vs number)
console.log(null === undefined); // false (kiểu khác nhau)
console.log(0 === false);     // false (kiểu khác nhau)
console.log([] === []);       // false (hai mảng khác nhau trong bộ nhớ, dù nội dung giống)
console.log({} === {});       // false (hai đối tượng khác nhau trong bộ nhớ)

let a = [1];
let b = a;
console.log(a === b);         // true (cùng tham chiếu đến một đối tượng)

// Ví dụ về == (Loose Equality)
console.log("\n--- == (Loose Equality) ---");
console.log(5 == 5);          // true
console.log(5 == "5");        // true (JavaScript chuyển đổi "5" thành 5)
console.log(true == 1);       // true (JavaScript chuyển đổi true thành 1)
console.log(false == 0);      // true (JavaScript chuyển đổi false thành 0)
console.log(null == undefined); // true (trường hợp đặc biệt)
console.log("" == 0);         // true (JavaScript chuyển đổi "" thành 0)
console.log("" == false);     // true (JavaScript chuyển đổi "" thành false)
console.log([] == 0);         // true (mảng rỗng chuyển thành chuỗi rỗng rồi thành 0)
console.log([] == false);     // true (mảng rỗng chuyển thành chuỗi rỗng rồi thành false)
console.log([1] == "1");      // true (mảng [1] chuyển thành chuỗi "1")

// Các trường hợp cần cẩn trọng với ==
console.log("\n--- Cẩn trọng với == ---");
console.log(null == 0);       // false
console.log(undefined == 0);  // false
console.log(NaN == NaN);      // false (NaN không bằng chính nó)

```

### C. Các toán tử logic và toán tử liên quan

Đây là những toán tử dùng để kết hợp hoặc đảo ngược các biểu thức logic (thường là `true`/`false`).

#### I. `&&` (Logic AND)

**Ý nghĩa:** Trả về `true` nếu cả hai vế đều là `true`.

**Hành vi "Short-Circuiting":** Nếu vế bên trái là `false` (hoặc một giá trị "falsy" như `0`, `""`, `null`, `undefined`), nó sẽ ngay lập tức trả về giá trị của vế trái mà không cần kiểm tra vế phải.

**Ứng dụng:**

- Kiểm tra nhiều điều kiện cùng lúc.

- Thực thi có điều kiện một cách ngắn gọn.

#### II. `||` (Logic OR)

Ý nghĩa: Trả về `true` nếu ít nhất một trong hai vế là `true`.

**Hành vi "Short-Circuiting":** Nếu vế bên trái là `true` (hoặc một giá trị "truthy"), nó sẽ ngay lập tức trả về giá trị của vế trái mà không cần kiểm tra vế phải.

**Ứng dụng:**

- Cung cấp giá trị mặc định/dự phòng (trước khi có `??`).

#### III. `!` (Logic NOT)

**Ý nghĩa:** Đảo ngược giá trị boolean của một biểu thức. Biến `true` thành `false` và ngược lại. Nó luôn trả về `true` hoặc `false`.

`!!` **(Double NOT):** Một mẹo để chuyển đổi bất kỳ giá trị nào thành dạng boolean tường minh của nó (`true` hoặc `false`).

#### IV. `??` (Nullish Coalescing Operator - Toán tử kết hợp Null)

Được giới thiệu trong ES2020.

**Ý nghĩa:** Đây là một phiên bản "thông minh hơn" của `||`. Nó chỉ trả về vế phải khi vế trái là `null` hoặc `undefined`. Nó không coi các giá trị falsy khác như `0`, `''` (chuỗi rỗng), hoặc `false` là "nullish".

**Tại sao nó hữu ích?** Để giải quyết trường hợp khi `0` hoặc chuỗi rỗng là những giá trị hợp lệ mà bạn muốn giữ lại.

#### V. `?:` (Ternary Operator - Toán tử ba ngôi)

**Ý nghĩa:** Là một cách viết tắt cho câu lệnh `if...else`.

**Cú pháp:** `condition ? expressionIfTrue : expressionIfFalse`

File: `./logical_operators.js`

```
// Ví dụ về && (Logic AND)
console.log("--- && (Logic AND) ---");
console.log(true && true);   // true
console.log(true && false);  // false
console.log(false && true);  // false
console.log(false && false); // false

// Short-circuiting với &&
const user = { name: "John", age: 25 };
const admin = null;

// Kiểm tra user có tồn tại và có tên không
user && user.name && console.log(`User name: ${user.name}`); // Output: User name: John
admin && admin.name && console.log(`Admin name: ${admin.name}`); // Không output gì (admin là falsy)

// Ví dụ về || (Logic OR)
console.log("\n--- || (Logic OR) ---");
console.log(true || true);   // true
console.log(true || false);  // true
console.log(false || true);  // true
console.log(false || false); // false

// Short-circuiting với || (cung cấp giá trị mặc định)
const name1 = "Alice";
const name2 = "";
const name3 = null;

const displayName1 = name1 || "Guest";
console.log(displayName1); // Output: Alice

const displayName2 = name2 || "Guest";
console.log(displayName2); // Output: Guest (vì "" là falsy)

const displayName3 = name3 || "Guest";
console.log(displayName3); // Output: Guest (vì null là falsy)

// Ví dụ về ! (Logic NOT)
console.log("\n--- ! (Logic NOT) ---");
console.log(!true);  // false
console.log(!false); // true
console.log(!0);     // true (0 là falsy)
console.log(!"");    // true ("" là falsy)
console.log(!null);  // true (null là falsy)
console.log(!undefined); // true (undefined là falsy)
console.log(!"hello"); // false ("hello" là truthy)

// Ví dụ về !! (Double NOT)
console.log("\n--- !! (Double NOT) ---");
console.log(!!0);       // false
console.log(!!"");      // false
console.log(!!null);    // false
console.log(!!undefined); // false
console.log(!!false);   // false
console.log(!!1);       // true
console.log(!!"hello"); // true
console.log(!!{});      // true
console.log(!![]);      // true

// Ví dụ về ?? (Nullish Coalescing Operator)
console.log("\n--- ?? (Nullish Coalescing Operator) ---");
const value1 = 0;
const value2 = "";
const value3 = false;
const value4 = null;
const value5 = undefined;
const value6 = "hello";

const result1 = value1 ?? "default"; // value1 không phải null/undefined
console.log(result1); // Output: 0

const result2 = value2 ?? "default"; // value2 không phải null/undefined
console.log(result2); // Output: ""

const result3 = value3 ?? "default"; // value3 không phải null/undefined
console.log(result3); // Output: false

const result4 = value4 ?? "default"; // value4 là null
console.log(result4); // Output: default

const result5 = value5 ?? "default"; // value5 là undefined
console.log(result5); // Output: default

const result6 = value6 ?? "default"; // value6 không phải null/undefined
console.log(result6); // Output: hello

// Ví dụ về ?: (Ternary Operator)
console.log("\n--- ?: (Ternary Operator) ---");
const age = 18;
const canVote = (age >= 18) ? "Yes, can vote" : "No, cannot vote";
console.log(canVote); // Output: Yes, can vote

const temperature = 25;
const weather = (temperature > 30) ? "Hot" : (temperature > 20) ? "Warm" : "Cold";
console.log(weather); // Output: Warm
```
