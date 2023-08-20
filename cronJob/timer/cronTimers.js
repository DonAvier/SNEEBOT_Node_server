const botJob = require("../jobs/BotJob");
const CronJob = require("cron").CronJob;

const OneMinuteJob = new CronJob(
    "* * * * *",
    () => {
        botJob.searchScheduledBot();
    },
    null,
    true,
    "America/Los_Angeles"
);

module.exports = { OneMinuteJob };
