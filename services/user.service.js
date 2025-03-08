import {userRepository} from "../repositories/user.repository.js";

class UserService {
    getAll = async () => {
        return await userRepository.getAll();
    }

    create = async (user) => {
        return await userRepository.create(user);
    }

    getById = async (id) => {
        return await userRepository.getById();
    }

    updateById = async (id, user) => {
        return await userRepository.updateById(id, user);
    }

    deleteById = async (id) => {
        return await userRepository.deleteById(id);
    }
}

export const userService = new UserService();

