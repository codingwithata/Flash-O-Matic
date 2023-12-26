// EditDeck.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck, listCards } from "../utils/api/index";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ViewDeck() {
  const { deckId } = useParams();
  const [cards, setCards] = useState([])
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deckData = await readDeck(deckId);
        setDecks(deckData || []);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    const fetchCards = async () => {
        try{
            const cardData = await listCards(deckId);
            setCards(cardData || [])
            console.log(cardData)
        } catch (error) {
                console.error("Error fetching decks:", error);
        }
    };

    fetchCards()
    fetchData();
  }, [deckId]);

  
  return (
    <div>
      <div className="card-container">
          <Card key={decks.id} className="mb-4">
            <Card.Body>
              <Card.Title>{decks.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Deck ID: {decks.id}</Card.Subtitle>
              <Card.Text>{decks.description}</Card.Text>
            </Card.Body>
          </Card>
          <div className="button-container">
          <Link to={`/decks/${deckId}/edit`} className="button-link">
          <Button variant="secondary" size="lg" className="button">
            Edit Deck
          </Button>
          </Link>
          <Button type="submit" variant="primary" className="submit-button">
            Study
          </Button><Button type="submit" variant="primary" className="submit-button">
            Add cards
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ViewDeck;
