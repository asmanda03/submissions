function timeToWords(time) {
    const [hour, minute] = time.split(':').map(Number);

    const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", 
                     "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty"];

    if (hour === 0 && minute === 0) return "midnight";
    if (hour === 12 && minute === 0) return "noon";

    const period = hour < 12 ? 'am' : 'pm';
    const adjustedHour = hour % 12 || 12;
    const hourWord = numbers[adjustedHour];

    let minuteWord;
    if (minute === 0) {
        minuteWord = "o’clock";
    } else if (minute < 20) {
        minuteWord = numbers[minute];
    } else {
        minuteWord = tens[Math.floor(minute / 10)];
        if (minute % 10 !== 0) {
            minuteWord += ` ${numbers[minute % 10]}`;
        }
    }

    return minute === 0 ? `${hourWord} ${minuteWord} ${period}` : `${hourWord} ${minuteWord} ${period}`;
}

// Test cases
console.log(timeToWords("00:00")); // midnight
console.log(timeToWords("00:12")); // twelve twelve am
console.log(timeToWords("01:00")); // one o’clock am
console.log(timeToWords("06:01")); // six oh one am
console.log(timeToWords("06:10")); // six ten am
console.log(timeToWords("06:18")); // six eighteen am
console.log(timeToWords("06:30")); // six thirty am
console.log(timeToWords("10:34")); // ten thirty four am
console.log(timeToWords("12:00")); // noon
console.log(timeToWords("12:09")); // twelve oh nine pm
console.log(timeToWords("23:23")); // eleven twenty three pm
