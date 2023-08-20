const {getDB} = require("../../utility/nosqldb");

class Command {
    constructor(BotID,LocatorType,Role,Query,nth,Xcoord,Ycoord,Options,Action,ConsecutiveCommand){
        this.BotID = BotID;
        this.LocatorType = LocatorType;
        this.Role = Role;
        this.Query = Query;
        this.nth = nth;
        this.Xcoord = Xcoord;
        this.Ycoord = Ycoord;
        this.Options = Options;
        this.Action = Action;
        this.ConsecutiveCommand = ConsecutiveCommand;
    }

    save(){
        const db = getDB();
        db.collection('Bot_' + this.BotID + '_Commands').insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
    }

    static FetchAll(BotID){
        //SMALL COLLECTION
        const db = getDB();
        return db.collection('Bot_' + BotID + '_Commands').find().toArray()
        .then(Commands => {
            console.log(Commands);
            return Commands;
        }).catch(error => {
            console.log(error);
        });        
    }
}

module.exports = Command;