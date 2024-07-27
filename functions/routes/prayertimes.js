const express = require('express');
const prayerRouter = express.Router();
const puppeteer = require('puppeteer-core');

prayerRouter.get('/RCM', async (req, res) => {

    let browser;
    let auth = "brd-customer-hl_424e6333-zone-masjidscraper" + ":" + "6jkhy6gu0nwd";
    try {
        browser = await puppeteer.connect({
            browserWSEndpoint: `wss://${auth}@brd.superproxy.io:9222`
        });
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(2 * 60 * 1000);
        await page.goto("https://roswellmasjid.org/");



        const prayerTimes = await page.evaluate(() => {
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

        res.status(200).json(prayerTimes);


    } catch (e) {

        res.sendStatus(404);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
});

module.exports = prayerRouter;

