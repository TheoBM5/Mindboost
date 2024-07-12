import express from 'express';
import { getAllCards, getCard, createCard, updateCard, deleteCard, getAllReviewCards, updateReviewCard } from '../controllers/card.controller.js';
import {createCardSchema, updateCardSchema} from '../schemas/card.schema.js'
import { isAuth } from '../middlewares/auth.middleware.js';
import { validateSchema } from '../middlewares/validate.middleware.js';
const router = express.Router();

router.get('/decks/:deckid/cards',isAuth, getAllCards);
router.get('/decks/:deckid/cards/:idcard',isAuth, getCard);
router.post('/decks/:userId/:deckId/cards',isAuth, createCard, validateSchema(createCardSchema));
router.put('/decks/:deckid/cards/:id',isAuth, updateCard, validateSchema(updateCardSchema));
router.delete('/decks/:deckid/cards/:id',isAuth, deleteCard);
router.get('/decks/:id/:deckId/cards',isAuth, getAllReviewCards);
router.put('/decks/:id/cards',isAuth, updateReviewCard);
export default router;