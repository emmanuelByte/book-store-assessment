import { Router } from 'express';

import { authenticate } from '../middlewares/authMiddleware';
import userValidation from '../validation/userValidation';
import userController from '../controllers/userController';
import AuthorController from '../controllers/authorController';
const router = Router();
// UnAuthenticated
// POST ROUTES
router.post('/register', userValidation.registerValidation, userController.register);
router.post('/login', userValidation.loginValidation, userController.login);

// Protect the routes below with the authenticate middleware
router.use(authenticate);
// GET ROUTES
router.get('/profile', userController.getProfile);
router.post('/author', AuthorController.create);
router.get('/author', AuthorController.getAuthor);
router.post('/book', userController.addBook);
router.get('/book', userController.getBooks);

export default router;
