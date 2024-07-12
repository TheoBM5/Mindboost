import axios from "./axios";

export const getAllDecksRequest = () => axios.get("/decks");

export const createDeckRequest = (deck) => axios.post("/decks", deck);

export const deleteDeckRequest = (id) => axios.delete(`/decks/${id}`);

export const getDeckRequest = (id) => axios.get(`/decks/${id}`);

export const updateDeckRequest = (id, deck) => axios.put(`/decks/${id}`, deck);

export const getDeckReviewRequest = () => axios.get("/review");