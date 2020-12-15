delete global.XMLHttpRequest;
const dotenv = require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');
// const config = require('./config/config.js');
const userController = require('./controllers/UserController');
const { Expo } = require('expo-server-sdk');
const {sendNotifications} = require('./src/api/expoServer');

cron.schedule('* * * * *', function () {
    sendNotifications()
});

const app = express();
app.use(json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const connectionString = process.env.DATABASE_URL; //Connects to heroku
massive(connectionString).then(db => {
    app.set('db', db);
    sendNotifications()
});


process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.get('/privacy-policy', function(req, res){
    res.sendFile(__dirname + '/public/privacy.html');
});

app.post('/create-user', userController.createUser);

app.put('/add-time', userController.addTime);

app.put('/update-active', userController.updateActive);

app.delete('/delete-time/:id', userController.deleteTime);

app.get('/get-time/:device_id', userController.getTime);

app.get('/get-all-tokens', userController.getTokens);

app.get('/get-quotes', userController.getQuotes);

app.listen(process.env.PORT, () => { console.log(`Listening on port: ${process.env.PORT}`); });
