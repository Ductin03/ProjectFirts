const mongoose = require('mongoose');


module.exports.connectApi= async()=>{
    try {
        await mongoose.connect(process.env.Mongo_api);//link của api mongodb
        console.log("Connect Success");

    } catch (error) {
        console.log("Connect Error!")
    }
}
