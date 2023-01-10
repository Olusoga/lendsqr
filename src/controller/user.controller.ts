import express from 'express';
import UserService from '../services/user.service';

class UserController {
    public static async signup(req: express.Request, res: express.Response) {
        try {
            const user = await UserService.registerUser(req.body);
            if (user)
                return res.status(201).json({
                    data: user,
                    msg: 'user created successfully, a mail has been sent to you for Email verification'
                });
            res.status(500).json({ msg: 'error' });
        } catch (error) {
            res.status(500).json({ msg: error });
        }
    }

    public static async login(req: express.Request, res: express.Response) {
        try {
            const user = await UserService.signIn(req.body);
            if (user) return res.status(200).json({ data: user, msg: 'user login successfully' });
            res.status(500).json({ msg: 'cannot login' });
        } catch (error) {
            res.status(500).json({ msg: error });
        }
    }
}
export default UserController;
