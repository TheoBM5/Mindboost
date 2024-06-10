import axios from "./axios";

export const getAllCardsRequest = (deckId) => axios.get(`/decks/${deckId}/cards`);

export const createCardRequest = (deckId, card, userId) => axios.post(`/decks/${userId}/${deckId}/cards`, {card, userId, deckId});

export const deleteCardRequest = (deckId, id) => axios.delete(`/decks/${deckId}/cards/${id}`);

export const getCardRequest = (deckId, id) => axios.get(`/decks/${deckId}/cards/${id}`);

export const updateCardRequest = (deckId, id, card) => axios.put(`/decks/${deckId}/cards/${id}`, card);

export const getAllReviewCardsRequest = (id, deckId) => axios.get(`/decks/${id}/${deckId}/cards`);

