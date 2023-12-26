import React, { useEffect, useState } from "react";
import { listDecks } from "../../utils/api/index"; // Adjust the path accordingly
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Decks.css";
import { deleteDeck } from "../../utils/api/index"; // Adjust the path accordingly
import { useHistory } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function Decks() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decksData = await listDecks();
        setDecks(decksData || []); // Ensure decksData is an array or default to an empty array
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteDeck = async (selectDeck) => {
    try {
      await deleteDeck(selectDeck.id);

      setDecks((prevDecks) =>
        prevDecks.filter((deck) => deck.id !== selectDeck.id)
      );
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  };

  const handleViewDeck = async (deckToView) => {
    console.log(deckToView.id);
    history.push(`/decks/${deckToView.id}`);
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item active>Home</Breadcrumb.Item>
      </Breadcrumb>

      <div className="card-container">
        {decks.map((deck) => (
          <Card key={deck.id} className="mb-4">
            <Card.Body>
              <Card.Title>{deck.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Deck ID: {deck.id}
              </Card.Subtitle>
              <Card.Text>{deck.description}</Card.Text>

              {/* Button Container */}
              <div className="button-container">
                <div className="button-group">
                  {/* View and Study Buttons */}
                  <Button
                    variant="primary"
                    className="mr-2"
                    onClick={() => handleViewDeck(deck)}
                  >
                    View
                  </Button>
                  <Button variant="success">Study</Button>
                </div>

                {/* Trash Button */}
                <Button variant="danger" onClick={() => handleDeleteDeck(deck)}>
                  Delete
                  <i className="fas fa-trash-alt"></i> {/* Icon here */}
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Decks;
