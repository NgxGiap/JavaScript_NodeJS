// Tái sử dụng hàm Promise từ ví dụ trước
function readFileAsync(filename) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (filename === "error.txt") {
                reject(new Error("Không tìm thấy file (Async/Await): " + filename));
            } else {
                resolve("Nội dung của " + filename);
            }
        }, 1000);
    });
}

async function processFiles() {
    try {
        console.log("Bắt đầu xử lý file (Async/Await)...");

        // Ví dụ thành công
        const data1 = await readFileAsync("file1.txt");
        console.log("Đọc thành công file1.txt:", data1);

        // Ví dụ lỗi
        const data2 = await readFileAsync("error.txt"); // Dòng này sẽ ném lỗi
        console.log("Đọc thành công error.txt:", data2); // Dòng này sẽ không được thực thi

    } catch (error) {
        // Lỗi từ bất kỳ Promise nào bị reject trong khối try sẽ được bắt ở đây
        console.error("Đã bắt được lỗi trong hàm async:", error.message);
    } finally {
        console.log("Quá trình xử lý file đã kết thúc (Async/Await).");
    }
}

async function chainedAsyncOperations() {
    try {
        console.log("\nBắt đầu chuỗi tác vụ Async/Await...");
        const resultA = await readFileAsync("stepA.txt");
        console.log("Kết quả bước A:", resultA);

        const resultB = await readFileAsync("error.txt"); // Lỗi ở đây
        console.log("Kết quả bước B:", resultB); // Sẽ không chạy

        const resultC = await readFileAsync("stepC.txt");
        console.log("Kết quả bước C:", resultC); // Sẽ không chạy

    } catch (error) {
        console.error("Lỗi trong chuỗi tác vụ Async/Await:", error.message);
    }
}

processFiles();
chainedAsyncOperations();

console.log("Tiếp tục thực thi code đồng bộ bên ngoài...");