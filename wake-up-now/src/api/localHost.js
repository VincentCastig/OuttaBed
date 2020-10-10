import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        accept: 'application/json',
        "Content-Type": "application/x-www-form-urlencoded"
    }
});


