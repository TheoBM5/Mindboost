import { createContext, useState, useContext, useCallback } from "react";
import {
  getAllCardsRequest,
  getCardRequest,
  createCardRequest,
  updateCardRequest,
  deleteCardRequest,
  getAllReviewCardsRequest,
  updateReviewCardRequest,
  getAllCardsAndDateRequest,
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

  const loadCardsAndDate = async (deckId) => {
    const res = await getAllCardsAndDateRequest(deckId);
    setCards(res.data);
  };

  const createCard = async (deckId, card, user_id, typeCard) => { 
    try {
      const res = await createCardRequest(deckId, card, user_id, typeCard);

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

  const loadReviewCards = useCallback(async (user_id, deckId) => {
    const res = await getAllReviewCardsRequest(user_id, deckId);

    setCards(res.data);
  }, []);

  const updateReviewCards = async (racha, ef, interval_repeat, review_date, id) => {
    try{
      
      const data = {
        racha,
        ef,
        interval_repeat,
        review_date
      };
   
      const res = await updateReviewCardRequest(id, data);
 
      return res.data;
    } catch(error){
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
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
        updateReviewCards,
        loadCardsAndDate,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};