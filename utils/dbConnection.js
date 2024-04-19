const mongoose = require('mongoose');

// function to connect to mongodb
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,

        });
        console.log('Mongodb Connected Sucessfully');
    } catch (error) {
        console.log(error);
        throw new Error('Error in connection to database' + error);
    }
};

module.exports = dbConnection;