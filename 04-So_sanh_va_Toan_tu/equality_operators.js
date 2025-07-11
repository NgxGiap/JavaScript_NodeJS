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
