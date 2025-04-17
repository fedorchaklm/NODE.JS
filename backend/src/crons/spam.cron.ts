import { CronJob } from "cron";

import { emailConstants } from "../constants/email.constatnts";
import { User } from "../models/user.model";
import { emailService } from "../services/email.service";

const handler = async () => {
    try {
        const users = await User.find();
        for (const user of users) {
            const userName = user.name;
            const email = user.email;
            await emailService.sendEmail(email, emailConstants.spam, {
                name: userName,
            });
        }
    } catch (e) {
        console.error(e);
    }
};

export const spamCron = new CronJob("* * * * * ", handler);
