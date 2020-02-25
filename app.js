const express = require('express');
const passport = require('passport');

const routes = require('./routes');

const app = express();

app.use(require('morgan')('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());
app.use(passport.initialize());

require('./middleware/passport')(passport);

app.get('/api/spec', (req, res) => {
    res.sendFile('API Docs.html', { root: __dirname });
});

app.use('/api/', routes);

module.exports = app;
