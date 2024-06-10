import { createContext, useState, useContext } from "react";
import {
  getAllCardsRequest,
  getCardRequest,
  createCardRequest,
  updateCardRequest,
  deleteCardRequest,
  getAllReviewCardsRequest,
} from "../api/card.api";

const CardContext = createContext();

export const useCards = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCards debe estar dentro del proveedor CardProvider");
  }
  return context;
};

export const CardProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [errors, setErrors] = useState([]);

  const loadCards = async (deckId) => {
    const res = await getAllCardsRequest(deckId);
    setCards(res.data);
  };

  const loadCard = async (deckId, id) => {
    const res = await getCardRequest(deckId, id);
    return res.data;
  };

  const createCard = async (deckId, card, user_id) => {
    console.log     
    try {
      const res = await createCardRequest(deckId, card, user_id);
      console.log(res)
      setCards([...cards, res.data]);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  const deleteCard = async (deckId, id) => {
    const res = await deleteCardRequest(deckId, id);
    if (res.status === 204) {
      setCards(cards.filter((card) => card.id !== id));
    }
  };

  const updateCard = async (deckId, cardId, card) => {
    try {
      const res = await updateCardRequest(deckId, cardId, card);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  const loadReviewCards = async (user_id, deckId) => {
    
    const res = await getAllReviewCardsRequest(user_id, deckId);
    console.log(res.data);
    setCards(res.data);
  };

  const updateReviewCards = async (user_id, deckId) => {
    
    const res = await (user_id, deckId);
    setCards(res.data);
  };

  return (
    <CardContext.Provider
      value={{
        cards,
        loadCards,
        deleteCard,
        createCard,
        loadCard,
        errors,
        updateCard,
        loadReviewCards,
        updateReviewCards
      }}
    >
      {children}
    </CardContext.Provider>
  );
};