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