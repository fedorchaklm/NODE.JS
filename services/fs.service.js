import fs from 'node:fs/promises';
import path from 'node:path';

const filePath = path.join(process.cwd(), 'db', 'users.json');

export const read = async () => {
    try {
        const json = await fs.readFile(filePath, 'utf8');
        return json ? JSON.parse(json) : [];
    } catch (e) {
        console.log(e.message)
    }
};

export const write = async (users) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    } catch (e) {
    }
};

