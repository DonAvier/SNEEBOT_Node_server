//========================== MODULI ==========================
const bodyParser = require("body-parser");
const path = require("path");
//EXPRESS
const express = require("express");
const app = express();
//CRON
//const cronJobs = require("./cronJob/timer/cronTimers");
//REQUEST-ROUTES
const botsRoutes = require("./routes/botsRoutes");
const commandRoutes = require("./routes/commandRoutes");
const userConfigRoutes = require("./routes/userConfigRoutes");
const userRoutes = require("./routes/userRoutes");
const utilRoutes = require("./routes/UtilRoutes");
const geoRoutes = require("./routes/geoRoutes")

//HUBS
const botshub = require("./hubs/botshub");

//DATABASE
const BotDatabase = require("./utility/database");
const AllowedAdress = require("./models/AllowedAdress");
const Country = require("./models/Country");
const People = require("./models/People");

//NOSQL DB
const mongoConnect = require("./utility/nosqldb");

//========================== FINE MODULI ==========================

//========================== CRON - Time Bot ==========================
// # AVVIO TIMER DI 1 MIN E RELATIVI JOB
// cronJobs.OneMinuteJob;
//========================== FINE CRON - Time Bot ==========================

//========================== MIDDLEWARE ==========================
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     next();
// });
//========================== FINE MIDDLEWARE ==========================

//========================== ROUTES ==========================

app.param("botid", (req, res, next, botid) => {
    req.botid = botid;
    next();
});

app.use("/bots/:botid/command", commandRoutes);
app.use("/bots/:botid/user/config", userConfigRoutes);
app.use("/bots/:botid/users", userRoutes);
app.use("/bots", botsRoutes);
app.use("/util", utilRoutes);
app.use("/geo",geoRoutes);


//========================== FINE ROUTES ==========================

//========================== SERVER ==========================

//404 - home
app.all("*", (req, res) => {
    const error = { message: "Pagina non trovata" };
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(error));
});

//L'indirizzo appartiene alla nazione, una nazione può avere più indirizzi
AllowedAdress.belongsTo(Country, { onDelete : 'CASCADE' });
Country.hasMany(AllowedAdress);

//Una persona può avere solo un indirizzo di consegna ma al medesimo indirizzo possono esserci più persone
People.belongsTo(AllowedAdress);



BotDatabase.sync({force : true})
    .then((result) => {
        const port = 3003;
        const useSignalr = false;
        app.listen(port, async () => {
            console.log("SERVER PARTITO SULLA PORTA " + port);
            if (useSignalr) {
                await botshub
                    .initializeConnection()
                    .then(() => {
                        console.log("connesso a signalr");
                    })
                    .catch((err) => {
                        console.error(err);
                    })
                    .finally(() => {});
            }
        });
    })
    .catch((error) => {});

    //TODO: RELATIONSSHIP COUNTRY - ALLOWED ADRESS



//========================== FINE SERVER ==========================
