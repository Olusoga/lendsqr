import express from 'express';
import TransactionServices from '../services/transaction.service';

class AccountController {
    public static async transfer(req: express.Request, res: express.Response) {
        try {
            const transaction = await TransactionServices.transferFunds(req.body);

            return res.status(201).json({
                data: transaction,
                msg: 'Transaction successful'
            });
        } catch (error) {
            res.status(500).json({ msg: error });
        }
    }
}
export default AccountController;
