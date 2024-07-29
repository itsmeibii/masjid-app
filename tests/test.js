const puppeteer = require('puppeteer');

async function run() {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    await page.goto('https://masjidal.com/widget/simple/?masjid_id=pQKMMBKB&monthly=v3');


    await new Promise(resolve => setTimeout(resolve, 500)); //delay by 1000


    const prayerTimes = await page.evaluate(() => {
        // Find the table
        const table = document.querySelector('#time-table');

        if (!table) return null;

        const prayerTimes = { Masjid: 'Gwinnett Islamic Circle' };

        // Find all rows in the table
        const rows = table.querySelectorAll('tbody tr');

        // Iterate over each row to get prayer times, skipping the header
        rows.forEach((row, index) => {
            if (index > 5 && index < 13) {
                const columns = row.querySelectorAll('td');
                columns.forEach((column, colIndex) => {
                    console.log(`Row ${index} Column ${colIndex}: ${column.innerText}`);
                });
                // If the row contains the prayer name and times
                if (columns.length >= 2) {
                    const prayerName = columns[0].innerText.trim();
                    // Adjust extraction logic based on the available columns
                    const azanTime = columns[1].innerText.trim();
                    // const iqamaTime = columns[2] ? columns[2].innerText.trim() : null;

                    // Only add prayer names and times if they are not "Shurooq" (optional)
                    if (prayerName !== 'Shurooq') {
                        prayerTimes[prayerName] = azanTime;
                    }
                }
            }
        });

        return prayerTimes;
    });

    console.log(prayerTimes);

    await browser.close();
}

run();
