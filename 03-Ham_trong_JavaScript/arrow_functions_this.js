// Sử dụng Function Expression (hàm thông thường)
const person = {
    name: 'John',
    age: 30,
    sayHello: function() {
        console.log(`Hello, my name is ${this.name}.`); // 'this' ở đây là đối tượng 'person'

        setTimeout(function() {
            // Bên trong hàm callback của setTimeout, 'this' không còn là 'person' nữa.
            // Trong non-strict mode, nó là đối tượng global (window trong trình duyệt).
            // Trong strict mode, nó là 'undefined'.
            console.log(`I am ${this.age} years old.`); // Sẽ in ra "I am undefined years old." (lỗi)
        }, 1000);
    }
};
person.sayHello();

console.log("============================");

// Sử dụng Arrow Function để giải quyết vấn đề
const personWithArrow = {
    name: 'Jane',
    age: 25,
    sayHello: function() {
        console.log(`Hello, my name is ${this.name}.`); // 'this' ở đây là 'personWithArrow'

        // Sử dụng Arrow Function
        setTimeout(() => {
            // Arrow function không có 'this' của riêng nó, nó "mượn" 'this' từ ngữ cảnh bên ngoài.
            // Ngữ cảnh bên ngoài là hàm sayHello, nơi 'this' chính là 'personWithArrow'.
            console.log(`I am ${this.age} years old.`); // Sẽ in ra "I am 25 years old." (đúng)
        }, 1000);
    }
};
personWithArrow.sayHello();