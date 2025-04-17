import { removeOldTokensCron } from "./remove-old-tokens.cron";
import { spamCron } from "./spam.cron";

export const cronRunner = async () => {
    removeOldTokensCron.start();
    spamCron.start();
};
