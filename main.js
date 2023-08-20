//========================== MODULI ==========================
const bodyParser = require("body-parser");
const path = require("path");
//EXPRESS
const express = require("express");
const app = express();
//CRON
const cronJobs = require("./cronJob/timer/cronTimers");
//REQUEST-ROUTES
const botsRoutes = require("./routes/botsRoutes");
const commandRoutes = require("./routes/commandRoutes");
const userConfigRoutes = require("./routes/userConfigRoutes");
const userRoutes = require("./routes/userRoutes");
const utilRoutes = require("./routes/UtilRoutes");
const geoRoutes = require("./routes/geoRoutes");

//HUBS
const botshub = require("./hubs/botshub");

//DATABASE
const BotDatabase = require("./utility/database");
const AllowedAdress = require("./models/AllowedAdress");
const Country = require("./models/Country");
const People = require("./models/People");

//NOSQL DB
const mongoConnect = require("./utility/nosqldb").mongoDBConnect;
const getDB = require("./utility/nosqldb").getDB;

//========================== FINE MODULI ==========================

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
app.use("/bots/:botid/account/config", userConfigRoutes);
//app.use("/bots/:botid/account", userRoutes); TODO;
app.use("/bots", botsRoutes);
app.use("/util", utilRoutes);
app.use("/geo", geoRoutes);
app.use("/user", userRoutes);

//========================== FINE ROUTES ==========================

//========================== SERVER ==========================

//404 - home
app.all("*", (req, res) => {
    const error = { message: "Pagina non trovata" };
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(error));
});

//{ force: true }
BotDatabase.sync({ force: true })
    .then((result) => {
        console.info(
            "SERVER CORRECTLY ATTACHTED AND SYNCRONIZED WITH SQL DATABASE"
        );
        mongoConnect(() => {
            console.info(
                "SERVER CORRECTLY ATTACHTED AND SYNCRONIZED WITH MONGO"
            );

            const port = 3003;
            const useSignalr = false;
            const useCronJob = false;

            console.info(
                `SERVER STARTING ON PORT ${port} with singlar status = ${
                    useSignalr ? "Active" : "Inactive"
                } `
            );

            app.listen(port, async () => {
                console.info("SERVER STARTED ON PORT: " + port);

                if (useCronJob) {
                    //========================== CRON - Time Bot ==========================
                    // # AVVIO TIMER DI 1 MIN E RELATIVI JOB
                    cronJobs.OneMinuteJob;
                    //========================== FINE CRON - Time Bot ==========================
                }

                if (useSignalr) {
                    console.info(
                        "TRYING TO CONNECT TO SIGNALR HUB (WEB SOCKET)"
                    );
                    await botshub
                        .initializeConnection()
                        .then(() => {
                            console.info("CONNECTED TO SIGNALR");
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                }
            });
        });
    })
    .catch((error) => {
        console.log(error);
    });

//========================== FINE SERVER ==========================
