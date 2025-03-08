import {read, write} from "../services/fs.service.js";

class UserRepository {
    getAll = async () => {
        return read();
    }

    create = async (user) => {
        const users = await read();
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            name: user.name,
            surname: user.surname,
            age: user.age
        }
        users.push(newUser);
        await write(users);
        return newUser;
    }

    getById = async (id) => {
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        return users[index]
    }

    updateById = async (id, user) => {
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        users[index] = user;
        await write(users);
        return user;
    }

    deleteById = async (id) => {
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        users.splice(index, 1);
        await write(users);
    }
}

export const userRepository = new UserRepository();

