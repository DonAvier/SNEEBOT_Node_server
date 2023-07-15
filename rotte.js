require("dotenv").config();

const BotListPath = () => {
  return process.env.CONNSTRING_DBJSON_ROOT + process.env.JSON__BOT_LIST;
};

const JSONCmdPath = (id) => {
  return (
    process.env.CONNSTRING_DBJSON_ROOT +
    process.env.JSON__CMD_FILE +
    id +
    ".json"
  );
};

const JSONUsersPath = (id) => {
  return (
    process.env.CONNSTRING_DBJSON_ROOT +
    process.env.JSON__USERS_FILE +
    id +
    ".json"
  );
};

const JSONConfigFile = (id) => {
  return (
    process.env.CONNSTRING_DBJSON_ROOT +
    process.env.JSON__USER_CONFIG_FILE +
    id +
    ".json"
  );
};

module.exports = { BotListPath, JSONCmdPath, JSONUsersPath, JSONConfigFile };
