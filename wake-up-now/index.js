
const dotenv = require('dotenv');
require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
const cors = require('cors');
const path = require('path');
// const config = require('./config/config.js');
const userController = require('./controllers/userController');


const app = express();
app.use(json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const connectionString = process.env.DATABASE_URL; //Connects to heroku bro
massive(connectionString).then(db => app.set('db', db));

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.post('/create-user', userController.createDeviceId);



app.get('/get-device-id/:device_id', userController.getDeviceId);
// app.get('/getPreferences', userCtrl.get_user_preferences);

// app.put('/putPics', userCtrl.put_user_pics);

// app.delete('/deleteMatch', userCtrl.delete_match);
// app.get('/deleteUserAccount/:id', userCtrl.delete_user_account);



app.listen(process.env.PORT, () => { console.log(`Listening on port: ${process.env.PORT}`); });
