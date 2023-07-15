const { error } = require("console");

const fs = require("fs");
require("dotenv").config();

const DBJsonConnect = (JsonPath, cb) => {
    console.log("CONN  STRING: " + JsonPath);
    fs.readFile(JsonPath, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            cb(null);
        }
        cb({
            data: JSON.parse(data),
            maxid: JSON.parse(data)
                .slice()
                .sort((a, b) => b.id - a.id)[0].id,
        });
    });
};

const DBJsonUpdate = async (JsonPath, newObj, replaceAll, cb) => {
    if (replaceAll) {
        fs.writeFile(JsonPath, JSON.stringify(newObj, null, 2), (error) => {
            if (error) {
                console.log(error);
                cb(null);
            }

            cb(true);
        });
    } else {
        DBJsonConnect(JsonPath, (result) => {
            if (result) {
                const data = result.data.slice(0);
                newObj.id = result.maxid + 1;
                data.push(newObj);
                fs.writeFile(
                    JsonPath,
                    JSON.stringify(data, null, 2),
                    (error) => {
                        if (error) {
                            console.log(error);
                            cb(null);
                        }

                        cb(newObj);
                    }
                );
            }
        });
    }
};

module.exports = { DBJsonConnect, DBJsonUpdate };
