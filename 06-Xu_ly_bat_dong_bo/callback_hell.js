fs.readFile('file1.txt', 'utf8', (err1, data1) => {
    if (err1) {
        console.error(err1);
    } else {
        // Tác vụ 2: Dùng data1 để đọc file2
        fs.readFile(data1.trim() + '.txt', 'utf8', (err2, data2) => {
            if (err2) {
                console.error(err2);
            } else {
                // Tác vụ 3: Dùng data2 để làm gì đó
                setTimeout(() => {
                    console.log('Hoàn thành tất cả tác vụ!');
                }, 1000);
            }
        });
    }
});