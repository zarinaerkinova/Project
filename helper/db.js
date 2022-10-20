const mongoose = require('mongoose')

module.exports = async (uri) => {
    try {
        await mongoose.connect(uri,  (err) => {
            if(err) {
                console.log(err);
            }

            console.log('Mongodb connected');
        })
    } catch (error) {
        console.error(err);
    }
}