delete global.XMLHttpRequest;
const dotenv = require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
const cors = require('cors');
const path = require('path');
// const cron = require('node-cron');
// const config = require('./config/config.js');
const userController = require('./controllers/userController');
const { Expo } = require('expo-server-sdk');
const {sendNotifications} = require('./src/api/expoServer');

// sendNotifications();


// cron.schedule('* * * * *', function () {
//     console.log('Running Cron Job');
//     //sendNotifications()
// });

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const connectionString = process.env.DATABASE_URL; //Connects to heroku
massive(connectionString).then(db => app.set('db', db));

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


app.post('/create-user', userController.createUser);

app.put('/add-time', userController.addTime);

app.get('/get-time/:device_id', userController.getTime);
app.get('/get-all-tokens', userController.getTokens);
// app.get('/getPreferences', userCtrl.get_user_preferences);

// app.put('/putPics', userCtrl.put_user_pics);

// app.delete('/deleteMatch', userCtrl.delete_match);
// app.get('/deleteUserAccount/:id', userCtrl.delete_user_account);



app.listen(3000, () => { console.log(`Listening on port: ${process.env.PORT}`); });
