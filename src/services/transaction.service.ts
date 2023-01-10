import AccountRepository from '../repositories/account.repositories';
import TransactionRepository from '../repositories/transaction.repositories';

class TransactionServices {
    public static async transferFunds(data: any) {
        try {
            const { sender_id, receiver_id, transaction_type, amount } = data;
            const senderAccount = await AccountRepository.getAccountById(sender_id);
            if (transaction_type === 'CREDIT') {
                const receiverAccount = await AccountRepository.getAccountById(receiver_id);
                if (receiverAccount.length == 0 || senderAccount.length == 0)
                    throw new Error('ivalid sender or receiver id');
                if (senderAccount[0].balance < amount) throw new Error('insufficent ');

                const senderAccountBalance = senderAccount[0].balance - amount;
                const receiverAccountBalance = receiverAccount[0].balance + amount;

                await AccountRepository.updateBalance(sender_id, senderAccountBalance);
                await AccountRepository.updateBalance(receiver_id, receiverAccountBalance);
            } else if (transaction_type === 'WITHDRAW') {
                const senderAccountBalance = senderAccount[0].balance - amount;

                if (senderAccount[0].balance < amount) throw new Error('insufficient funds');
                await AccountRepository.updateBalance(sender_id, senderAccountBalance);
            } else if (transaction_type === 'DEPOSIT') {
                const senderAccountBalance = senderAccount[0].balance + amount;
                await AccountRepository.updateBalance(sender_id, senderAccountBalance);
            }

            return TransactionRepository.create(data);
        } catch (error) {
            throw error;
        }
    }
}
export default TransactionServices;
