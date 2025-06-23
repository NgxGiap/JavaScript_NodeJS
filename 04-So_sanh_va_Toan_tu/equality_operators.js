console.log(5 === 5);         // true (cùng giá trị, cùng kiểu number)
console.log('5' === 5);       // false (khác kiểu dữ liệu: string vs number)
console.log(true === 1);      // false (khác kiểu dữ liệu: boolean vs number)
console.log(null === undefined); // false (chúng là hai kiểu nguyên thủy khác nhau)
console.log(0 === -0);        // true

const obj1 = { a: 1 };
const obj2 = { a: 1 };
console.log(obj1 === obj2);   // false (vì chúng là hai đối tượng khác nhau trong bộ nhớ, dù có cùng nội dung)

const obj3 = obj1;
console.log(obj1 === obj3);   // true (vì chúng cùng tham chiếu đến một đối tượng)

console.log("============================");

console.log(5 == 5);         // true
console.log('5' == 5);       // true (chuỗi '5' được chuyển thành số 5 trước khi so sánh)
console.log(true == 1);      // true (boolean true được chuyển thành số 1)
console.log(false == 0);     // true (boolean false được chuyển thành số 0)
console.log('' == 0);        // true (chuỗi rỗng được chuyển thành số 0)
console.log(null == undefined); // true (đây là một trường hợp đặc biệt được định nghĩa trong spec)