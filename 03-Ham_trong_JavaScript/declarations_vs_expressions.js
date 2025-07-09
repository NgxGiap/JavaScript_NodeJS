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