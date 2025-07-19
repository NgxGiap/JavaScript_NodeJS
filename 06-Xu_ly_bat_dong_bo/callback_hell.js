// Mô phỏng các tác vụ bất đồng bộ phụ thuộc
function step1(callback) {
    setTimeout(() => {
        console.log("Bước 1 hoàn thành");
        callback(null, "Kết quả từ bước 1");
    }, 1000);
}

function step2(dataFromStep1, callback) {
    setTimeout(() => {
        console.log("Bước 2 hoàn thành với:", dataFromStep1);
        callback(null, "Kết quả từ bước 2");
    }, 1000);
}

function step3(dataFromStep2, callback) {
    setTimeout(() => {
        console.log("Bước 3 hoàn thành với:", dataFromStep2);
        callback(null, "Kết quả cuối cùng");
    }, 1000);
}

// Callback Hell
step1((err1, result1) => {
    if (err1) {
        console.error("Lỗi ở bước 1:", err1);
        return;
    }
    step2(result1, (err2, result2) => {
        if (err2) {
            console.error("Lỗi ở bước 2:", err2);
            return;
        }
        step3(result2, (err3, result3) => {
            if (err3) {
                console.error("Lỗi ở bước 3:", err3);
                return;
            }
            console.log("Tất cả các bước hoàn thành:", result3);
        });
    });
});
