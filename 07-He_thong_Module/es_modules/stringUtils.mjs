// Named exports
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const countWords = (str) => str.split(' ').length;

// Default export
const GREETING = "Hello from the module!";
export default GREETING;