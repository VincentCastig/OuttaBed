import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3000',
    //baseURL: 'https://get-up-now.herokuapp.com',
    headers: {
        accept: 'application/json',
        "Content-Type": "application/x-www-form-urlencoded"
    }
});


