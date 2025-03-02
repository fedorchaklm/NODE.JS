import bcrypt from 'bcrypt';

class PasswordService {
    public hash = (password: string) => {
        return bcrypt.hash(password, 7);
    }
}

export const passwordService = new PasswordService();