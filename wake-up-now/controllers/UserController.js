module.exports = {
    createDeviceId: (req, res) => {
        console.log('device_time');
        const db = req.app.get('db');
        const {device_time, device_id} = req.body;

        console.log(device_time, device_id);

        db.createDeviceId(device_time, device_id).then((data)=>res.status('200').send(data)).catch((error)=> {
            console.log(error)
        })
    }
    // post_user: (req,res) => {
    //     const db = req.app.get('db');
    //     let { id, name, birthday, work, gender, picture } = req.body.user;
    //
    //     console.log( 'id', id);
    //     function first(val) {
    //         val = val.split(' ')[0];
    //         return val;
    //       }
    //
    //       name = first(name);
    //     // console.log(work[0].position.name, id);
    //     let newBirthday = new Date(birthday);
    //     let katkatAge = Math.floor(((Date.now() - newBirthday) / (31557600000)));
    //     // console.log(katkatAge);
    //     console.log('this is work', work);
    //     if (work) {
    //      work = work[0].employer.name;
    //     }
    //     else if (!work) {
    //         work = null
    //     }
    //     if (gender === 'male') {
    //         gender = '1';
    //     }
    //     else {
    //         gender = '0';
    //     }
    //     // if(work) {
    //     //     works = work[0].position.name
    //     // }
    //     db.post_user([id, name, katkatAge, work, gender, picture.data.url]).then((user)=>res.status('200').send(user)).catch((error)=> res.status('200').send(error));
    // },
}
