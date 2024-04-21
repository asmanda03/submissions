const fs = require('fs');
const https = require('https');
const path = require('path');

// Function to download URL content and save it to a file
function downloadUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, response => {
            let data = '';

            // A chunk of data has been received
            response.on('data', chunk => {
                data += chunk;
            });

            // The whole response has been received
            response.on('end', () => {
                resolve(data);
            });
        }).on('error', error => {
            reject(error);
        });
    });
}

// Function to read URLs from file and download content
async function processUrls(filename) {
    try {
        const urls = fs.readFileSync(filename, 'utf8').trim().split('\n');

        for (const url of urls) {
            const filename = new URL(url).hostname;

            try {
                const html = await downloadUrl(url);
                fs.writeFileSync(`${filename}.txt`, html);
                console.log(`Wrote to ${filename}.txt`);
            } catch (error) {
                console.error(`Couldn't download ${url}`);
            }
        }
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
        process.exit(1);
    }
}

// Main function
function main() {
    const args = process.argv.slice(2);

    if (args.length !== 1) {
        console.error('Usage: node urls.js FILENAME');
        process.exit(1);
    }

    const filename = args[0];

    processUrls(filename);
}

// Run the script
main();
