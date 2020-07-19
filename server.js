var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pug = require('ejs');
var path = require('path');
app.use(bodyParser.json());

const authenRoute = require('./routers/authen');
const regisRoute = require('./routers/register');
const reportRoute = require('./routers/report');

app.use('/api/authen', authenRoute);
app.use('/api/register', regisRoute);
app.use('/api/report', reportRoute);

app.set('view engine', 'ejs');
app.set('views', './public/views/');

app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/signup.html'));
});

/*app.get('/register/', (req, res) => {
    //res.sendFile(path.join(__dirname, '/public/views/regiscode.html'), { userid: req.params.id });
    res.render('regiscode', { userid: req.body.id, tk: req.body.token });
});*/

app.get('/register/', (req, res) => {
    //res.sendFile(path.join(__dirname, '/public/views/regiscode.html'), { userid: req.params.id });
    res.render('regiscode', { userid: req.query.id, tk: req.query.token });
});

app.get('/history', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/history.html'));
});

app.get('/code', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/code.html'));
});



app.listen(3000, () => { console.log('Server Up and Running')});