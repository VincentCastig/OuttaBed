
const dotenv = require('dotenv');
require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
const cors = require('cors');
const path = require('path');
// const config = require('./config/config.js');
//const userCtrl = require('./ctrl/userCtrl');


const app = express();
app.use(json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({
//     secret: "VincentChrisVuGentApp007",
//     saveUninitialized: false,
//     resave: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());
const connectionString = process.env.DATABASE_URL; //Connects to heroku bro
massive(connectionString).then(db => app.set('db', db).catch(
    error => console.log(error)
));

// app.post('/postMatch', userCtrl.post_match);
// app.post('/addUser', userCtrl.post_user);

// app.get('/getHome/:id', userCtrl.get_user_profile);
// app.get('/getPreferences', userCtrl.get_user_preferences);
// app.get('/shopTillYouDrop/:gender', userCtrl.get_shopping);

// app.put('/putPics', userCtrl.put_user_pics);
// app.put('/putHome', userCtrl.put_user_profile);
// app.put('/putBio', userCtrl.put_user_bio);

// app.delete('/deleteMatch', userCtrl.delete_match);
// app.get('/deleteUserAccount/:id', userCtrl.delete_user_account);



app.listen(process.env.PORT, () => { console.log('Listening on port: 3000'); });
