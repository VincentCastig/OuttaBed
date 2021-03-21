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
        const db = req.app.get('db');
        const {device_time, device_id} = req.body;

        console.log('adding time now ', device_time);

        db.addTime(device_time, device_id).then((data)=>res.status('200').send(data)).catch((error)=> {
            console.log('error ', error)
        })
    },
    updateActive: (req, res) => {
        const db = req.app.get('db');
        const {id, active} = req.body;
        console.log('updating active now ', active);

        db.updateActive(id, active).then((data)=>res.status('200').send(data)).catch((error)=> {
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
    deleteTime: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;

        console.log('device ', id);

        db.deleteTime(id).then((data)=>res.status('200').send(data)).catch((error)=> {
            console.log('error ', error)
        })
    },
    getTokens: (req, res) => {
        const db = req.app.get('db');

        console.log('dbm', db);

        db.getTokens().then((data)=>res.status('200').send(data)).catch((error)=> {
            console.log('error')
        })
    },
    getQuotes: (req, res) => {
        const db = req.app.get('db');

        db.getQuotes().then((data)=>res.status('200').send(data)).catch((error)=> {
            console.log('error ', error)
        })
    },
    getQuote: (req, res) => {
        const db = req.app.get('db');

        db.getQuote().then((data)=>res.status('200').send(data)).catch((error)=> {
            console.log('error ', error)
        })
    },
    getQuoteId: (req, res) => {
        const db = req.app.get('db');

        db.getQuoteId().then((data)=>res.status('200').send(data)).catch((error)=> {
            console.log('error ', error)
        })
    },
    setActiveQuote: (req, res) => {
        const db = req.app.get('db');

        const {id} = req.body;

        db.setQuotesInactive()
            .then((data)=> {
                db.setActiveQuote(id).then((data)=> res.status('200').send(data)).catch((error)=> {
                    console.log('error ', error)
                });
                res.status('200').send(data)
            })
            .catch((error)=> {
                console.log('error ', error)
            });

    }
}


