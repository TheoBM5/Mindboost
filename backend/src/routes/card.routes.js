import express from 'express';
import { getAllCards, getCard, createCard, updateCard, deleteCard } from '../controllers/card.controller.js';

const router = express.Router();

router.get('/decks/:deckid/cards', getAllCards);
router.get('/decks/:deckid/cards/:idcard', getCard);
router.post('/decks/:deckId/cards', createCard);
router.put('/decks/:deckid/cards/:id', updateCard);
router.delete('/decks/:deckid/cards/:id', deleteCard);

export default router;