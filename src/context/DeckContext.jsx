import { createContext, useState, useContext } from "react";
import {
  getAllDecksRequest,
  deleteDeckRequest,
  createDeckRequest,
  getDeckRequest,
  updateDeckRequest,
} from "../api/tasks.api";

const DeckContext = createContext();

export const useDecks = () => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDecks debe estar dentro del proveedor DeckProvider");
  }
  return context;
};

export const DeckProvider = ({ children }) => {
  const [decks, setDecks] = useState([]);
  const [errors, setErrors] = useState([]);

  const loadDecks = async () => {
    const res = await getAllDecksRequest();
    setDecks(res.data);
  };

  const loadDeck = async (id) => {
    const res = await getDeckRequest(id);
    return res.data;
  };

  const createDeck = async (deck) => {
    try {
      const res = await createDeckRequest(deck);
      setDecks([...decks, res.data]);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  const deleteDeck = async (id) => {
    const res = await deleteDeckRequest(id);
    console.log("cardContext",res)
    if (res.status === 204) {
      setDecks(decks.filter((deck) => deck.id !== id));
    }
  };

  const updateDeck = async (id, deck) => {
    try {
      const res = await updateDeckRequest(id, deck);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  return (
    <DeckContext.Provider
      value={{
        decks,
        loadDecks,
        deleteDeck,
        createDeck,
        loadDeck,
        errors,
        updateDeck
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};