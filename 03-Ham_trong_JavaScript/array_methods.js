const fruits = ['apple', 'banana', 'cherry'];

fruits.forEach((fruit, index) => {
    console.log(`Vị trí ${index}: ${fruit}`);
});
// Output:
// Vị trí 0: apple
// Vị trí 1: banana
// Vị trí 2: cherry

console.log("============================");

const numbers = [1, 2, 3, 4, 5];

const squaredNumbers = numbers.map(num => num * num);

console.log(squaredNumbers); // [1, 4, 9, 16, 25]
console.log(numbers);        // [1, 2, 3, 4, 5] (mảng gốc không đổi)

console.log("============================");

const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8];

const evenNumbers = numbers2.filter(num => num % 2 === 0);

console.log(evenNumbers); // [2, 4, 6, 8]
console.log(numbers2);     // Mảng gốc không đổi

console.log("============================");

const numbers3 = [1, 2, 3, 4, 5];

// 0 là giá trị khởi tạo (initialValue) cho 'sum'
const total = numbers3.reduce((sum, currentNumber) => {
    return sum + currentNumber;
}, 0);

console.log(total); // 15

console.log("============================");

const products = [
    { name: 'Laptop', category: 'Electronics' },
    { name: 'T-shirt', category: 'Apparel' },
    { name: 'Mouse', category: 'Electronics' },
    { name: 'Jeans', category: 'Apparel' }
];

const groupedProducts = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
        acc[category] = []; // Nếu chưa có key này, tạo một mảng rỗng
    }
    acc[category].push(product); // Thêm sản phẩm vào đúng danh mục
    return acc;
}, {}); // Giá trị khởi tạo là một object rỗng {}

console.log(groupedProducts);
/*
Output:
{
  Electronics: [
    { name: 'Laptop', category: 'Electronics' },
    { name: 'Mouse', category: 'Electronics' }
  ],
  Apparel: [
    { name: 'T-shirt', category: 'Apparel' },
    { name: 'Jeans', category: 'Apparel' }
  ]
}
*/