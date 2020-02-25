const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

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
