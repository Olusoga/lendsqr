import UserRepository from '../repositories/user.repositories';
import { UsersDTO } from '../interface/user';
import bcrypt from 'bcrypt';
import { createVerificationToken } from '../helpers/createToken';
import jwt from 'jsonwebtoken';
import { sendEmailVerification } from '../utils/email';

class UserServices {
    public static async registerUser(data: UsersDTO) {
        const email = data.email.toLowerCase();
        const existingUsers = await UserRepository.getUsers(email);
        if (existingUsers.length >= 1) throw { status: 400, code: 'EMAIL_TAKEN', message: 'email already taken' };
        const saltRounds = parseInt(process.env.SALT_ROUNDS);
        const harshedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = harshedPassword;
        const userData = {
            password: harshedPassword,
            email: data.email
        };
        const newUser = await UserRepository.createUser(userData);
        if (!newUser)
            throw { status: 500, code: 'INTERNAL SERVER ERROR', message: 'something went wrong, pls try again.' };
        const token = createVerificationToken({ email: newUser.email, user_id: newUser.user_id });
        const authUserData = {
            email: newUser.email,
            password: newUser.password,
            user_id: newUser.user_id,
            token: token
        };
        sendEmailVerification(email, token);
        return authUserData;
    }

    public static async signIn(data: UsersDTO): Promise<any> {
        const email = data.email.toLowerCase();
        const users = await UserRepository.getUsers(email);

        if (users.length < 0)
            throw { status: 400, code: 'EMAIL_NOT_EXIST', message: 'user account does not exist, please register' };
        const isValidPassword = await bcrypt.compare(data.password, users[0].password);
        if (!isValidPassword) {
            throw { status: 401, code: 'BAD_REQUEST', message: 'Incorrect password.' };
        } else {
            const token = jwt.sign(
                { user_id: users[0].user_id.toString(), email: users[0].email },
                process.env.JWT_SECRET,
                { expiresIn: 8640000 }
            );
            const authUserData = {
                user_id: users[0].user_id,
                email: users[0].email,
                token: token
            };
            return authUserData;
        }
    }

    public static async getUserById(user_id: string) {
        const user = await UserRepository.getUserById(user_id);
        if (user.length < 0) throw Error;
        return user;
    }
}
export default UserServices;
