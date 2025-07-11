// Ví dụ về && (Logic AND)
console.log("--- && (Logic AND) ---");
console.log(true && true);   // true
console.log(true && false);  // false
console.log(false && true);  // false
console.log(false && false); // false

// Short-circuiting với &&
const user = { name: "John", age: 25 };
const admin = null;

// Kiểm tra user có tồn tại và có tên không
user && user.name && console.log(`User name: ${user.name}`); // Output: User name: John
admin && admin.name && console.log(`Admin name: ${admin.name}`); // Không output gì (admin là falsy)

// Ví dụ về || (Logic OR)
console.log("\n--- || (Logic OR) ---");
console.log(true || true);   // true
console.log(true || false);  // true
console.log(false || true);  // true
console.log(false || false); // false

// Short-circuiting với || (cung cấp giá trị mặc định)
const name1 = "Alice";
const name2 = "";
const name3 = null;

const displayName1 = name1 || "Guest";
console.log(displayName1); // Output: Alice

const displayName2 = name2 || "Guest";
console.log(displayName2); // Output: Guest (vì "" là falsy)

const displayName3 = name3 || "Guest";
console.log(displayName3); // Output: Guest (vì null là falsy)

// Ví dụ về ! (Logic NOT)
console.log("\n--- ! (Logic NOT) ---");
console.log(!true);  // false
console.log(!false); // true
console.log(!0);     // true (0 là falsy)
console.log(!"");    // true ("" là falsy)
console.log(!null);  // true (null là falsy)
console.log(!undefined); // true (undefined là falsy)
console.log(!"hello"); // false ("hello" là truthy)

// Ví dụ về !! (Double NOT)
console.log("\n--- !! (Double NOT) ---");
console.log(!!0);       // false
console.log(!!"");      // false
console.log(!!null);    // false
console.log(!!undefined); // false
console.log(!!false);   // false
console.log(!!1);       // true
console.log(!!"hello"); // true
console.log(!!{});      // true
console.log(!![]);      // true

// Ví dụ về ?? (Nullish Coalescing Operator)
console.log("\n--- ?? (Nullish Coalescing Operator) ---");
const value1 = 0;
const value2 = "";
const value3 = false;
const value4 = null;
const value5 = undefined;
const value6 = "hello";

const result1 = value1 ?? "default"; // value1 không phải null/undefined
console.log(result1); // Output: 0

const result2 = value2 ?? "default"; // value2 không phải null/undefined
console.log(result2); // Output: ""

const result3 = value3 ?? "default"; // value3 không phải null/undefined
console.log(result3); // Output: false

const result4 = value4 ?? "default"; // value4 là null
console.log(result4); // Output: default

const result5 = value5 ?? "default"; // value5 là undefined
console.log(result5); // Output: default

const result6 = value6 ?? "default"; // value6 không phải null/undefined
console.log(result6); // Output: hello

// Ví dụ về ?: (Ternary Operator)
console.log("\n--- ?: (Ternary Operator) ---");
const age = 18;
const canVote = (age >= 18) ? "Yes, can vote" : "No, cannot vote";
console.log(canVote); // Output: Yes, can vote

const temperature = 25;
const weather = (temperature > 30) ? "Hot" : (temperature > 20) ? "Warm" : "Cold";
console.log(weather); // Output: Warm