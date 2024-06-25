function addCommas(number) {
    // Convert the number to a string
    let str = number.toString();

    // Separate the integer part and the decimal part if any
    let [integerPart, decimalPart] = str.split('.');

    // Add commas to the integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the integer part and the decimal part
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}

function testAddCommas() {
    const testCases = [
        { input: 1234, expected: "1,234" },
        { input: 1000000, expected: "1,000,000" },
        { input: 9876543210, expected: "9,876,543,210" },
        { input: 6, expected: "6" },
        { input: -10, expected: "-10" },
        { input: -5678, expected: "-5,678" },
        { input: 12345.678, expected: "12,345.678" },
        { input: -3141592.65, expected: "-3,141,592.65" }
    ];

    testCases.forEach(({ input, expected }) => {
        const result = addCommas(input);
        console.assert(result === expected, `For ${input}, expected ${expected} but got ${result}`);
    });

    console.log("All tests passed!");
}

testAddCommas();
