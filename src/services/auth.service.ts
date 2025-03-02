import {IUser} from "../types/IUser";
import {userRepository} from "../repositories/user.repository";

class AuthService {
   public register = async (data: IUser) => {
      await userRepository.create(data);
   }
}

export const authService = new AuthService();