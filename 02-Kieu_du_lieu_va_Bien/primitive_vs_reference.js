let a = 10;
let b = a; // b nhận một bản sao giá trị của a

console.log("a =", a); // a = 10
console.log("b =", b); // b = 10

// Thay đổi giá trị của b
b = 20;

console.log("Sau khi thay đổi b:");
console.log("a =", a); // a vẫn là 10, không bị ảnh hưởng
console.log("b =", b); // b bây giờ là 20

console.log("============================");

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