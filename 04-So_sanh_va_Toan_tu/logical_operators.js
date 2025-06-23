// Kiểm tra điều kiện
const age = 25;
const hasLicense = true;
if (age >= 18 && hasLicense) {
    console.log("Được phép lái xe."); // In ra
}

// Trả về giá trị
console.log('Hello' && 'World');   // 'World' (vì 'Hello' là truthy, nó đi tiếp và trả về vế phải)
console.log(0 && 'World');         // 0 (vì 0 là falsy, nó dừng lại và trả về 0)
console.log(null && 'World');      // null (vì null là falsy)

// Thực thi có điều kiện
const userIsLoggedIn = true;
userIsLoggedIn && console.log('Chào mừng quay trở lại!'); // In ra

console.log("2============================");

// Kiểm tra điều kiện
const hasCreditCard = false;
const hasCash = true;
if (hasCreditCard || hasCash) {
    console.log("Có thể thanh toán."); // In ra
}

// Trả về giá trị / Cung cấp giá trị mặc định
const username = null;
const displayName = username || 'Guest';
console.log(displayName); // 'Guest' (vì username là null (falsy), nó đi tiếp và trả về 'Guest')

const currentUser = 'Alice';
const displayUser = currentUser || 'Guest';
console.log(displayUser); // 'Alice' (vì 'Alice' là truthy, nó dừng và trả về 'Alice')

console.log("3============================");

const isOpen = false;
if (!isOpen) {
    console.log("Cửa hàng đã đóng cửa."); // In ra
}

console.log(!true);   // false
console.log(!0);      // true (vì 0 là falsy)
console.log(!"Hello"); // false (vì "Hello" là truthy)

// Sử dụng !! để ép kiểu
console.log(!!"");      // false
console.log(!!10);     // true
console.log(!!null);   // false

console.log("4============================");

// Trường hợp với `null` hoặc `undefined`
const val1 = null ?? 'Default';    // 'Default'
const val2 = null || 'Default';    // 'Default' (kết quả giống nhau)

// Trường hợp với 0
const quantity1 = 0 ?? 10; // 0 (vì 0 không phải null/undefined, nó lấy giá trị 0)
const quantity2 = 0 || 10; // 10 (vì 0 là falsy, nó bỏ qua và lấy 10)

// Trường hợp với chuỗi rỗng
const text1 = '' ?? 'Default text'; // ''
const text2 = '' || 'Default text'; // 'Default text'

// => Sử dụng `??` khi bạn muốn cung cấp giá trị mặc định chỉ cho `null` và `undefined`.

console.log("5============================");

const userAge = 20;

// Dùng if...else
let message;
if (userAge >= 18) {
    message = "Người lớn";
} else {
    message = "Trẻ em";
}

// Dùng toán tử ba ngôi (ngắn gọn hơn)
const messageTernary = userAge >= 18 ? "Người lớn" : "Trẻ em";

console.log(message);         // "Người lớn"
console.log(messageTernary);  // "Người lớn"