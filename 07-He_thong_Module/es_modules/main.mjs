// main.mjs (ES Module)

// Nhập Named Exports
import { multiply, divide } from './utils.mjs';

// Nhập Default Export (có thể đặt tên bất kỳ)
import myPi from './utils.mjs';

// Nhập tất cả Named Exports dưới dạng một đối tượng
import * as Utils from './utils.mjs';

console.log('ES Modules Examples:');
console.log(`4 * 5 = ${multiply(4, 5)}`); // Output: 4 * 5 = 20
console.log(`10 / 2 = ${divide(10, 2)}`); // Output: 10 / 2 = 5
console.log(`Value of PI: ${myPi}`);    // Output: Value of PI: 3.14159

console.log('Using imported object:', Utils.multiply(6, 6)); // Output: Using imported object: 36

// Ví dụ về import.meta.url (thay thế __dirname, __filename)
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Current file path:', __filename);
console.log('Current directory:', __dirname);