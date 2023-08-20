const Mongodb = require('mongodb');
const MongoClient = Mongodb.MongoClient;

const url = 'mongodb+srv://michelelunghi98:e5J8iMmLP4otUWX9@micheledb.mmo9gkq.mongodb.net/?retryWrites=true&w=majority';

let db;

const mongoDBConnect = (callback) => {
    MongoClient.connect(url)
    .then(client => {
        console.log("connected");       
        db = client.db();
        callback();
    }).catch(err => {
        console.log(err);
        throw err;
    });
}

const getDB = () => {
    if(db){
        return db;
    }
    return "no db found!";
}




module.exports = {mongoDBConnect,getDB};