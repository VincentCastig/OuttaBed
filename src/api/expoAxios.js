import axios from 'axios';

export default axios.create({
    baseURL: 'https://exp.host/--/api/v2/push/send',
    headers: {
        host: 'exp.host',
        accept: 'application/json',
        'accept-encoding': 'gzip, deflate',
        'content-type': 'application/json'
    }
});
