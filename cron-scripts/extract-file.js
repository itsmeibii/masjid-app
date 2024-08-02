const fs = require('fs');
const unzipper = require('unzipper');
const path = require('path');

const whatsappnames = [['Gwinnett Islamic Circle (GIC)Suwanee Masjid ','GIC'], ['Hamzah Islamic Center', 'HIC'], ['Roswell Community Masjid', 'RCM'], ['ICNF Masjid Of Alpharetta', 'ICNF']]
const date = new Date().toLocaleDateString().split('/').join('-');
for (let i = 0; i < whatsappnames.length; i++) {
    const zipFilePath = path.resolve(`/Users/itsmeibi/Downloads/WhatsApp Chat - ${whatsappnames[i][0]} .zip`);
const extractToPath = path.resolve(`/Users/itsmeibi/Desktop/school yeah/chat-logs/${whatsappnames[i][1]}_extrc-${date}`);

fs.createReadStream(zipFilePath)
    .pipe(unzipper.Extract({ path: extractToPath }))
    .on('close', () => {
        console.log('Extraction complete');
        fs.unlink(zipFilePath, (err) => {
            if (err) {
                console.error('An error occurred while deleting the ZIP file:', err);
            } else {
                console.log(`Deleted ZIP file: ${zipFilePath}`);
            }
        });
    })
    .on('error', (err) => {
        console.error('An error occurred:', err);
    });
}
// const zipFilePath = path.resolve(__dirname, `../../../../Downloads/WhatsApp Chat - ${whatsappnames[0]}.zip`);
// const extractToPath = path.resolve(__dirname, 'Documents/ExtractedFolder');

// fs.createReadStream(zipFilePath)
//     .pipe(unzipper.Extract({ path: extractToPath }))
//     .on('close', () => {
//         console.log('Extraction complete');
//     })
//     .on('error', (err) => {
//         console.error('An error occurred:', err);
//     });

module.exports.whatsappnames = whatsappnames;