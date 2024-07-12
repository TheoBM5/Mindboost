import Router from 'express-promise-router'
import {createDeck, deleteDeck, getAllDecks, getDeck, updateDeck, getDeckReview} from '../controllers/tasks.controller.js'
import { isAuth } from '../middlewares/auth.middleware.js';
import { validateSchema } from '../middlewares/validate.middleware.js';
import {createDeckSchema, updateDeckSchema} from '../schemas/task.schema.js'; 


const router = Router();

router.get('/decks', isAuth, getAllDecks);
router.get('/decks/:id', isAuth, getDeck);
router.post('/decks', isAuth, validateSchema(createDeckSchema), createDeck); 
router.put('/decks/:id', isAuth, validateSchema(updateDeckSchema), updateDeck);
router.delete('/decks/:id', isAuth, deleteDeck);
router.get('/review', isAuth, getDeckReview);

export default router;