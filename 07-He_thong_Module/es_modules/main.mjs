// Import tất cả mọi thứ: default và named
// 'message' là tên bạn đặt cho default export
// { capitalize, countWords } là tên chính xác của các named exports
import message, { capitalize, countWords } from './stringUtils.mjs';

// Hoặc import riêng lẻ
// import message from './stringUtils.mjs';
// import { capitalize } from './stringUtils.mjs';

// Đổi tên khi import
// import { capitalize as cap } from './stringUtils.mjs';

// Import tất cả named exports vào một object
// import * as utils from './stringUtils.mjs';
// console.log(utils.capitalize('hello'));

console.log(message); // "Hello from the module!"
console.log(capitalize('world')); // "World"
console.log(`Số từ: ${countWords('Học ES Modules')}`); // Số từ: 3