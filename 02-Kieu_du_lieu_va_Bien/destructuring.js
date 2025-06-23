const user = {
    id: 123,
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    profile: {
        avatar: '/path/to/avatar.jpg',
        theme: 'dark'
    }
};

// Lấy thuộc tính fullName và email
const { fullName, email } = user;
console.log(fullName); // "John Doe"
console.log(email);    // "john.doe@example.com"

// Đổi tên biến và gán giá trị mặc định
const { fullName: a, age = 30 } = user;
console.log(a);    // "John Doe" (biến mới tên là 'a')
console.log(age);  // 30 (vì 'age' không tồn tại trong 'user', nó sẽ lấy giá trị mặc định)

// Destructuring lồng nhau
const { profile: { avatar } } = user;
console.log(avatar); // "/path/to/avatar.jpg"

console.log("============================");

const numbers = [10, 20, 30, 40, 50];

// Lấy 2 phần tử đầu tiên
const [first, second] = numbers;
console.log(first);  // 10
console.log(second); // 20

// Bỏ qua phần tử
const [ , , third] = numbers;
console.log(third); // 30

// Sử dụng Rest syntax (...) để lấy các phần tử còn lại
const [x1, x2, ...rest] = numbers;
console.log(x1);   // 10
console.log(x2);   // 20
console.log(rest); // [30, 40, 50] (một mảng mới)