const mongoose = require('mongoose');

let connected = false;

module.exports.connect = (url) => {
    return new Promise((resolve, reject) => {
        if (connected) {
            resolve();
        } else {
            mongoose.connect(url, { useNewUrlParser: true })
                .then(() => {
                    connected = true;
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        }
    });
};
