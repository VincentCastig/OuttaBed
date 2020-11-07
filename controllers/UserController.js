module.exports = {
    createUser: (req, res) => {
        console.log('device in user controller');
        const db = req.app.get('db');
        const {device_id, token} = req.body;

        console.log('creating the user');
        console.log('device_id ', device_id);

        db.createUser(device_id, token).then((data)=>res.status('200').send(data)).catch((error)=> {
            console.log(error)
        })
    },
    addTime: (req, res) => {
        console.log('device_time');
        const db = req.app.get('db');
        const {id, device_time, device_id} = req.body;

        console.log('adding time now ', device_time);
        console.log('adding time now id', id);
        console.log(req.body);

        db.addTime(id, device_time, device_id).then((data)=>res.status('200').send(data)).catch((error)=> {
            console.log('error ', error)
        })
    },
    getTime: (req, res) => {
        const db = req.app.get('db');
        const {device_id} = req.params;

        console.log('device ', device_id);

        db.getTime(device_id).then((data)=>res.status('200').send(data)).catch((error)=> {
            console.log('error ', error)
        })
    },
    getTokens: (req, res) => {
        const db = req.app.get('db');

        console.log('dbm');

        db.getTokens().then((data)=>res.status('200').send(data)).catch((error)=> {
            console.log('error')
        })
    },
    getQuote: (req, res) => {
        const db = req.app.get('db');

        db.getQuote().then((data)=>res.status('200').send(data)).catch((error)=> {
            console.log('error ', error)
        })
    },
}
