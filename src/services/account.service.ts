import AccountRepository from '../repositories/account.repositories';
import UserService from './user.service';
import { AccountDTO } from '../interface/account';

class AccountServices {
    public static async getAccountById(account_id: string) {
        const accountId = typeof account_id !== 'undefined' ? account_id : null;
        const account = await AccountRepository.getAccountById(accountId);
        if (account.length < 1) return { status: 404, message: 'Account with this id does notexist' };
        return account;
    }

    public static async createAccount(AccountDTO: AccountDTO) {
        const user = await UserService.getUserById(AccountDTO.user_id);
        if (!user[0]) {
            throw { status: 400, message: 'no user found' };
        } else {
            const accountId = typeof AccountDTO.account_id !== 'undefined' ? AccountDTO.account_id : null;
            const account = await AccountRepository.getAccountById(accountId);
            if (account.length >= 1) throw { status: 400, message: 'account already exist' };
        }

        const accountUser = await AccountRepository.getAccountByUserId(AccountDTO.user_id);

        if (accountUser.length > 1) throw { status: 409, message: 'account already exist for this user' };
        const AccountData = {
            user_id: AccountDTO.user_id,
            balance: AccountDTO.balance
        };

        const newAccount = await AccountRepository.createAccount(AccountData);
        return newAccount;
    }
}

export default AccountServices;
