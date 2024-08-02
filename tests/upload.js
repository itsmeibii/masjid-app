const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dhgy0ct5f',
    api_key: '943615329866896',
    api_secret: '64b7czOIKOv6ol5K9vFo4VP-HEs'
});
function upload(path) {
    return new Promise((resolve, reject) => {
        let id = path.split('/').pop().split('.')[0];
        cloudinary.uploader.upload(path, {public_id: id}).then((result) => {
            resolve(result.url);
        }).catch((error) => {
            reject(error);
        });
    });
}
module.exports.upload = upload;

