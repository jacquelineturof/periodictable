const hbs     = require('hbs');
const path    = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Server starting on port ${port}`);
});