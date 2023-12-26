// EditDeck.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function EditDeck() {
  const { deckId } = useParams();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deckData = await readDeck(deckId);
        setDecks(deckData || []);
        console.log(deckData);
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
              <Card.Subtitle className="mb-2 text-muted">Deck ID: {decks.id}</Card.Subtitle>
              <Card.Text>{decks.description}</Card.Text>
            </Card.Body>
          </Card>
      </div>
    </div>
  );
}

export default EditDeck;
