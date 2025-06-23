function third() {
    console.log("Ba");
}

function second() {
    console.log("Hai");
    third(); // Gọi hàm third
    console.log("Kết thúc hai");
}

function first() {
    console.log("Một");
    second(); // Gọi hàm second
    console.log("Kết thúc một");
}

first(); // Bắt đầu

// Diễn biến trên Call Stack:

// first() được gọi -> first FEC được đẩy vào stack. ([GEC, first])
// In ra "Một".
// second() được gọi từ first() -> second FEC được đẩy vào stack. ([GEC, first, second])
// In ra "Hai".
// third() được gọi từ second() -> third FEC được đẩy vào stack. ([GEC, first, second, third])
// In ra "Ba".
// third() kết thúc -> third FEC được pop ra. ([GEC, first, second])
// second() tiếp tục -> In ra "Kết thúc hai".
// second() kết thúc -> second FEC được pop ra. ([GEC, first])
// first() tiếp tục -> In ra "Kết thúc một".
// first() kết thúc -> first FEC được pop ra. ([GEC])
// Chương trình kết thúc.