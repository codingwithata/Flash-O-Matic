// EditDeck.js
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, deleteCard, deleteDeck } from "../../utils/api/index";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import "./ViewDeck.css";

function ViewDeck() {
  const { deckId } = useParams();
  const history = useHistory();

  const [cards, setCards] = useState([]);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deckData = await readDeck(deckId);
        setDecks(deckData || []);
        setCards(deckData.cards || []);
        console.log(deckData.cards);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };
    fetchData();
  }, [deckId]);

  const handleRemoveCard = async (selectedCard) => {
    try {
      await deleteCard(selectedCard.id);
      setCards((prevCards) =>
        prevCards.filter((card) => card.id !== selectedCard.id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteDeck = async (deckId) => {
    try {
      await deleteDeck(deckId);
      history.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="view-deck-container">
      <div className="vd-breadcrumb-main">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" className="text-decoration-none">
                Home
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              View Deck {deckId}
            </li>
          </ol>
        </nav>
      </div>
      <div className="vd-deck-container mb-4">
        <div className="card" style={{ border: "none" }}>
          <div className="card-body">
            <h5 className="card-title">{decks.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Deck ID: {decks.id}
            </h6>
            <p className="card-text">{decks.description}</p>
          </div>

          <div className="vd-deck-button-container">
            <Link
              to={`/decks/${deckId}/edit`}
              className="btn btn-secondary btn-lg"
            >
              Edit Deck
            </Link>
            <Link
              to={`/decks/${deckId}/study`}
              className="btn btn-primary btn-lg"
            >
              Study
            </Link>
            <Link
              to={`/decks/${deckId}/cards`}
              className="btn btn-primary btn-lg"
            >
              Add Cards
            </Link>
            <button onClick={handleDeleteDeck} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="vd-card-container">
        <h1 className="ms-3">Cards</h1>
        {cards.map((card) => (
          <div key={card.id} className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{card.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Card ID: {card.id}
              </h6>
              <p className="card-text">Front: {card.front}</p>
              <p className="card-text">Back: {card.back}</p>

              <div className="vd-card-button-container">
                <Link
                  to={`/decks/${deckId}/cards/${card.id}/edit`}
                  className="btn btn-secondary btn-lg"
                >
                  Edit Card
                </Link>
                <button
                  onClick={() => handleRemoveCard(card)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewDeck;
