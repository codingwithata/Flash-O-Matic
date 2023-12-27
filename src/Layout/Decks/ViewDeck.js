// EditDeck.js
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, deleteCard, deleteDeck } from "../../utils/api/index";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumb from "react-bootstrap/Breadcrumb";

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
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item href="/" className="breadcrumb-text">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="breadcrumb-text">
            View Deck {deckId}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="vd-deck-container">
        <Card key={decks.id} className="mb-4" style={{ border: "none" }}>
          <Card.Body>
            <Card.Title>{decks.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Deck ID: {decks.id}
            </Card.Subtitle>
            <Card.Text>{decks.description}</Card.Text>
          </Card.Body>

          <div className="vd-deck-button-container">
            <Link to={`/decks/${deckId}/edit`} className="button-link">
              <Button variant="secondary" size="lg" className="button">
                Edit Deck
              </Button>
            </Link>
            <Link to={`/decks/${deckId}/study`} className="button-link">
              <Button variant="primary" size="lg">
                Study
              </Button>
            </Link>
            <Link to={`/decks/${deckId}/cards`} className="button-link">
              <Button variant="primary" size="lg" className="button">
                Add Cards
              </Button>
            </Link>
            <Button variant="danger" onClick={() => handleDeleteDeck(deckId)}>
              Delete
            </Button>
          </div>
        </Card>
      </div>

      <div className="vd-card-container">
        <h1 style={{ marginLeft: "10px" }}>Cards</h1>
        {cards.map((card) => (
          <Card key={card.id} className="mb-4">
            <Card.Body>
              <Card.Title>{card.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Card ID: {card.id}
              </Card.Subtitle>
              <Card.Text>Front: {card.front}</Card.Text>
              <Card.Text>Back: {card.back}</Card.Text>

              <div className="vd-card-button-container">
                <Link
                  to={`/decks/${deckId}/cards/${card.id}/edit`}
                  className="button-link"
                >
                  <Button variant="secondary" size="lg" className="button">
                    Edit Card
                  </Button>
                </Link>
                <Button onClick={() => handleRemoveCard(card)} variant="danger">
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ViewDeck;
