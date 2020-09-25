module.exports = {
    createDeviceId: (request, response) => {
        console.log('request ', request);
        const {deviceId} = request.body;

        db.createDeviceId(deviceId).then((deviceId)=>res.status('200').send(deviceId)).catch(()=> res.status('200').send());
    },
    post_user: (req,res) => {
        const db = req.app.get('db');
        let { id, name, birthday, work, gender, picture } = req.body.user;
        
        console.log( 'id', id);
        function first(val) {
            val = val.split(' ')[0];
            return val;
          }
          
          name = first(name);
        // console.log(work[0].position.name, id);
        let newBirthday = new Date(birthday);
        let katkatAge = Math.floor(((Date.now() - newBirthday) / (31557600000)));
        // console.log(katkatAge);
        console.log('this is work', work);
        if (work) {
         work = work[0].employer.name;
        }
        else if (!work) { 
            work = null
        }
        if (gender === 'male') {
            gender = '1';
        }
        else {
            gender = '0';
        }
        // if(work) {
        //     works = work[0].position.name
        // }
        db.post_user([id, name, katkatAge, work, gender, picture.data.url]).then((user)=>res.status('200').send(user)).catch(()=> res.status('200').send());
    },
}