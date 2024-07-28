

const puppeteer = require('puppeteer-core');
const  admin  = require('firebase-admin');


admin.initializeApp();
const db = admin.firestore();


let auth = "brd-customer-hl_424e6333-zone-masjidscraper" + ":" + "6jkhy6gu0nwd";






const mosques = {
    RCM: {
        url: 'https://roswellmasjid.org/',
        scraper: async (page) => {
            return await page.evaluate(() => {
                // Find the table
                const table = document.querySelector('#post-26050 > div > div > div > div.elementor-element.elementor-element-0ffd6a2.sc_fly_static.elementor-widget.elementor-widget-template.trx_addons_parallax_layers_inited.trx_addons_parallax_blocks_inited > div > div > div > div > section > div.elementor-container.elementor-column-gap-extended > div > div > div.elementor-element.elementor-element-07895dc.sc_layouts_hide_on_wide.sc_layouts_hide_on_desktop.sc_layouts_hide_on_notebook.prayer-time-mobile.sc_fly_static.elementor-widget.elementor-widget-wp-widget-dailyprayertime.trx_addons_parallax_layers_inited.trx_addons_parallax_blocks_inited > div > aside > table');

                if (!table) return null;

                const prayerTimes = {Masjid: 'Roswell Community Masjid'};

                // Find all rows in the table
                const rows = table.querySelectorAll('tr');

                // Iterate over each row to get prayer times, skipping the first row (headers)
                for (let i = 2; i < rows.length; i++) {
                    const row = rows[i];
                    const columns = row.querySelectorAll('th, td');

                    // If the row contains the prayer name and time
                    if (columns.length >= 2 && columns[0] && columns[1]) {
                        const prayerName = columns[0].innerText.trim();
                        prayerTimes[prayerName] = columns[1].innerText.trim();
                    }
                }

                return prayerTimes;
            });
        }
    },
    ICNF: {
        url: 'https://icnf.org/',
        scraper: async (page) => {
            await page.waitForSelector('#prayerTimeApp > div > div.ptTableContainer > table');

            return await page.evaluate(() => {
                // Find the table
                const table = document.querySelector('#prayerTimeApp > div > div.ptTableContainer > table');

                if (!table) return null;

                const prayerTimes = {Masjid: 'Islamic Center of North Fulton (ICNF)'};

                // Find all rows in the table, skipping the header row
                const rows = table.querySelectorAll('tbody tr');

                // Iterate over each row to get prayer times
                rows.forEach(row => {
                    const columns = row.querySelectorAll('th, td');

                    // If the row contains the prayer name and time
                    if (columns.length >= 2 && columns[0] && columns[1]) {
                        const prayerName = columns[0].innerText.trim();
                        prayerTimes[prayerName] = columns[1].innerText.trim()
                    }
                });

                return prayerTimes;
            });
        }
    }
}


 async function scrapeandstore(mosqueKey) {
    const mosque = mosques[mosqueKey];
    if (!mosque) {
        throw new Error(`No configuration found for mosque: ${mosqueKey}`);
    }

    let browser;
    try {
        browser = await puppeteer.connect({
            browserWSEndpoint: `wss://${auth}@brd.superproxy.io:9222`
        });
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(2 * 60 * 1000);

        await page.goto(mosque.url);

        const prayerTimes = await mosque.scraper(page);

        // Save the prayer times to Firestore
        await db.collection('prayerTimes').doc(mosqueKey).set(prayerTimes);
        console.log(`Prayer times for ${mosqueKey} updated successfully`);
    } catch (e) {
        console.error(`Error scraping prayer times for ${mosqueKey}:`, e);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

module.exports.scrapeandstore = scrapeandstore;
module.exports.db = db;