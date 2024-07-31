const puppeteer = require('puppeteer');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const logger = require('firebase-functions/logger')

admin.initializeApp();
const db = admin.firestore();





const mosques = {
    RCM: {
        url: 'https://roswellmasjid.org/',
        scraper: async (page) => {
            return await page.evaluate(() => {
                const table = document.querySelector('#post-26050 > div > div > div > div.elementor-element.elementor-element-0ffd6a2.sc_fly_static.elementor-widget.elementor-widget-template.trx_addons_parallax_layers_inited.trx_addons_parallax_blocks_inited > div > div > div > div > section > div.elementor-container.elementor-column-gap-extended > div > div > div.elementor-element.elementor-element-07895dc.sc_layouts_hide_on_wide.sc_layouts_hide_on_desktop.sc_layouts_hide_on_notebook.prayer-time-mobile.sc_fly_static.elementor-widget.elementor-widget-wp-widget-dailyprayertime.trx_addons_parallax_layers_inited.trx_addons_parallax_blocks_inited > div > aside > table');

                if (!table) return null;

                const prayerTimes = {Masjid: 'Roswell Community Masjid'};
                const rows = table.querySelectorAll('tr');

                for (let i = 2; i < rows.length; i++) {
                    const row = rows[i];
                    const columns = row.querySelectorAll('th, td');

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
            return await page.evaluate(() => {
                const table = document.querySelector('#prayerTimeApp > div > div.ptTableContainer > table');

                if (!table) return null;

                const prayerTimes = {Masjid: 'Islamic Center of North Fulton (ICNF)'};
                const rows = table.querySelectorAll('tbody tr');

                rows.forEach(row => {
                    const columns = row.querySelectorAll('th, td');
                    if (columns.length >= 2 && columns[0] && columns[1]) {
                        const prayerName = columns[0].innerText.trim();
                        prayerTimes[prayerName] = columns[1].innerText.trim();
                    }
                });

                return prayerTimes;
            });
        }
    },
    HIC: {
        url: 'https://masjidhamzah.com',
        scraper: async (page) => {
            return await page.evaluate(() => {
                const table = document.querySelector('#prayerTimeApp > div > div.ptTableContainer > table');

                if (!table) return null;

                const prayerTimes = {Masjid: 'Hamzah Islamic Center'};
                const rows = table.querySelectorAll('tbody tr');

                rows.forEach(row => {
                    const columns = row.querySelectorAll('th, td');

                    if (columns.length >= 2) {
                        const prayerName = columns[0].innerText.trim();
                        const azanTime = columns[1].innerText.trim();

                        if (prayerName !== 'Shurooq') {
                            prayerTimes[prayerName] = azanTime;
                        }
                    }
                });

                return prayerTimes;
            });
        }
    },
    GIC: {
        url: 'https://masjidal.com/widget/simple/?masjid_id=pQKMMBKB&monthly=v3',
        scraper: async (page) => {
            await new Promise(resolve => setTimeout(resolve, 500));
            return await page.evaluate(() => {
                const table = document.querySelector('#time-table');

                if (!table) return null;

                const prayerTimes = {Masjid: 'Gwinnett Islamic Circle'};
                const rows = table.querySelectorAll('tbody tr');

                rows.forEach((row, index) => {
                    if (index > 5 && index < 13) {
                        const columns = row.querySelectorAll('td');
                        if (columns.length >= 2) {
                            const prayerName = columns[0].innerText.trim();
                            const azanTime = columns[1].innerText.trim();
                            if (prayerName !== 'Shurooq') {
                                prayerTimes[prayerName] = azanTime;
                            }
                        }
                    }
                });

                return prayerTimes;
            });
        }
    }
};

async function scrapeandstore(mosqueKey) {
    const mosque = mosques[mosqueKey];
    if (!mosque) {
        throw new Error(`No configuration found for mosque: ${mosqueKey}`);
    }

    let browser;
    try {
        browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(2 * 60 * 1000);

        await page.goto(mosque.url);

        const prayerTimes = await mosque.scraper(page);

        await db.collection('prayerTimes').doc(mosqueKey).set({
            ...prayerTimes,
            lastUpdated: new Date().toLocaleDateString()
        });
        logger.log(`Prayer times for ${mosqueKey} updated successfully`);
    } catch (e) {
        logger.warn(`Error scraping prayer times for ${mosqueKey}:`, e);
        throw new Error(e);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

module.exports.scrapeandstore = scrapeandstore;
module.exports.db = db;

