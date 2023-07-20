import { Router } from 'express';
import userRoutes from './userRoutes';
import bookRouter from './bookRoutes';
const router = Router();
router.use('/users', userRoutes);
router.use('/books', bookRouter);

export default router;
