module.exports = {
    createDeviceId: (req, res) => {
        console.log('device_time');
        const db = req.app.get('db');
        const {device_time, device_id} = req.body;

        console.log(device_time, device_id);

        db.createDeviceId(device_time, device_id).then((data)=>res.status('200').send(data)).catch((error)=> {
            console.log(error)
        })
    },
    getDeviceId: (req, res) => {
        const db = req.app.get('db');
        const {device_id} = req.params;


        console.log('device ', device_id);

        db.getDeviceId(device_id).then((data)=>res.status('200').send(data)).catch((error)=> {
            console.log(error)
        })
    }
}
