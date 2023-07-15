const Mongodb = require('mongodb');
const MongoClient = Mongodb.MongoClient;

const url = 'mongodb+srv://michelelunghi98:e5J8iMmLP4otUWX9@micheledb.mmo9gkq.mongodb.net/?retryWrites=true&w=majority';


const mongoDBConnect = (callback) => {
    MongoClient.connect(url,{

    }).then(result => {
        console.log("connected");
        callback(result);
    }).catch(err => {
        console.log(err);
    });
}


module.exports = mongoDBConnect;