function unroll(square) {
    const result = [];
    let startRow = 0;
    let endRow = square.length - 1;
    let startCol = 0;
    let endCol = square.length - 1;
  
    while (startRow <= endRow && startCol <= endCol) {
      // Traverse from left to right along the top row
      for (let col = startCol; col <= endCol; col++) {
        result.push(square[startRow][col]);
      }
      startRow++;
  
      // Traverse from top to bottom along the right column
      for (let row = startRow; row <= endRow; row++) {
        result.push(square[row][endCol]);
      }
      endCol--;
  
      // Traverse from right to left along the bottom row
      if (startRow <= endRow) {
        for (let col = endCol; col >= startCol; col--) {
          result.push(square[endRow][col]);
        }
        endRow--;
      }
  
      // Traverse from bottom to top along the left column
      if (startCol <= endCol) {
        for (let row = endRow; row >= startRow; row--) {
          result.push(square[row][startCol]);
        }
        startCol++;
      }
    }
  
    return result;
  }
  
  // Test cases
  const square = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ];
  console.log(unroll(square)); // [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]
  
  const smallerSquare = [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"]
  ];
  console.log(unroll(smallerSquare)); // ["a", "b", "c", "f", "i", "h", "g", "d", "e"]
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fs = require('fs');
const https = require('https');
const url = require('url');

// Function to download content from a URL
function downloadUrl(urlStr, callback) {
  https.get(urlStr, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      callback(null, data);
    });
  }).on('error', (err) => {
    callback(err);
  });
}

// Main function to process URLs
function processUrls(filename) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
      process.exit(1);
    }

    const urls = data.trim().split('\n');
    urls.forEach((urlStr) => {
      const { hostname } = url.parse(urlStr);
      downloadUrl(urlStr, (err, content) => {
        if (err) {
          console.error(`Couldn't download ${urlStr}`);
          return;
        }
        fs.writeFile(`${hostname}.txt`, content, (err) => {
          if (err) {
            console.error(`Couldn't write to ${hostname}.txt`);
          } else {
            console.log(`Wrote to ${hostname}.txt`);
          }
        });
      });
    });
  });
}

// Command-line argument handling
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node urls.js FILENAME');
  process.exit(1);
}

const filename = args[0];
processUrls(filename);
