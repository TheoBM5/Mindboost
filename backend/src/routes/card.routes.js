import express from 'express';
import { getAllCards, getCard, createCard, updateCard, deleteCard } from '../controllers/card.controller.js';

const router = express.Router();

router.get('/:deckid/cards', getAllCards);
router.get('/:deckid/cards/:idcard', getCard);
router.post('/decks/:deckId/cards', createCard);
router.put('/:deckid/cards/:id', updateCard);
router.delete('/:deckid/cards/:id', deleteCard);

export default router;