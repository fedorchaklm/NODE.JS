import { CronJob } from "cron";

const handler = async () => {
    console.log("Hello fron cron!");
};

export const testCron = new CronJob("*/30 * * * * *", handler);
