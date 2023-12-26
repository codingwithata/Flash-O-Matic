// EditDeck.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck, listCards } from "../../utils/api/index";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ViewDeck() {
  const { deckId } = useParams();
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

  return (
    <div>
      <div className="card-container">
        <Card key={decks.id} className="mb-4">
          <Card.Body>
            <Card.Title>{decks.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Deck ID: {decks.id}
            </Card.Subtitle>
            <Card.Text>{decks.description}</Card.Text>
          </Card.Body>
          <div className="button-container">
            <Link to={`/decks/${deckId}/edit`} className="button-link">
              <Button variant="secondary" size="lg" className="button">
                Edit Deck
              </Button>
            </Link>
            <Button type="submit" variant="primary" className="submit-button">
              Study
            </Button>
            <Link to={`/decks/${deckId}/cards`} className="button-link">
              <Button variant="secondary" size="lg" className="button">
                Add Cards
              </Button>
            </Link>
          </div>
        </Card>

        <Card key={cards.id} className="mb-4">
          {cards.map((card) => (
            <Card.Body key={card.id}>
              <Card.Title>{card.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Deck ID: {card.id}
              </Card.Subtitle>
              <Card.Text>Front: {card.front}</Card.Text>
              <Card.Text>Back: {card.back}</Card.Text>
              <div className="button-container">
                <Link
                  to={`/decks/${deckId}/cards/${card.id}/edit`}
                  className="button-link"
                >
                  <Button variant="secondary" size="lg" className="button">
                    Edit Card
                  </Button>
                </Link>
                <Button
                  type="submit"
                  variant="primary"
                  className="submit-button"
                >
                  Delete
                </Button>
                <Link
                  to={`/decks/${deckId}/cards`}
                  className="button-link"
                ></Link>
              </div>
            </Card.Body>
          ))}
        </Card>
      </div>
    </div>
  );
}

export default ViewDeck;
