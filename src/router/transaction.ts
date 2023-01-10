import express from 'express';
const router = express.Router();
import TransactionController from '../controller/transaction.controller';

router.post('/transfer', TransactionController.transfer);
export default router;
