const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

require('./models/User');

require('./config/passport')(passport);

const auth = require('./routes/auth');

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

const app = express();

app.get('/', (req, res) => {
    res.send('It works!');
});

app.use('/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});