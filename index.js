const app = require('./app');
const port = process.env.PORT || 4000;
const db = require('./db/db');
const keys = require('./config/keys');

db.connect(keys.mongoURI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server has been started. Open your browser on http://localhost:${port}`);
        })
    })
    .catch(err => {
        console.log(err);
    });
