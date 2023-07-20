import { Router } from 'express';

import { authenticate } from '../middlewares/authMiddleware';
import BookController from '../controllers/bookController';
import bookValidation from '../validation/bookValidation';
const router = Router();
// UnAuthenticated
router.get('/', BookController.getAllBooks);
router.get('/:bookId', bookValidation.bookIdValidation, BookController.getSingleBooks);

// Protect the routes below with the authenticate middleware
router.use(authenticate);
// GET ROUTES
router.post('/', bookValidation.addBookValidation, BookController.addBook);
router.put('/:bookId', bookValidation.bookIdValidation, bookValidation.updateBookValidation, BookController.updateBook);
router.delete('/:bookId', bookValidation.bookIdValidation, BookController.deleteBook);

export default router;
