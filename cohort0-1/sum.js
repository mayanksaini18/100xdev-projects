
// cpu_test.js
function heavyLoop() {
    let sum = 0;
    // Infinite loop to keep CPU busy
    while (true) {
        for (let i = 0; i < 1e7; i++) {
            sum += i;
        }
    }
}

heavyLoop();
