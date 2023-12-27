import React, { useEffect, useState } from "react";
import { listDecks } from "../../utils/api/index"; // Adjust the path accordingly
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Decks.css";
import { deleteDeck } from "../../utils/api/index"; // Adjust the path accordingly
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CreateDeckButton from "./CreateDeckButton";
function Decks() {
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decksData = await listDecks();
        setDecks(decksData || []);
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
    <div className="card-container">
      <CreateDeckButton />
      {decks.map((deck) => (
        <div key={deck.id} className="mb-4 card">
          <div className="cardTitle">
            <p className="name">{deck.name}</p>
            <p className="number">{deck.cards.length} Cards</p>
          </div>

          <p className="description">{deck.description}</p>
          <div className="button-container">
            <div className="button-group">
              <Button
                variant="primary"
                className="mr-2"
                onClick={() => handleViewDeck(deck)}
              >
                View
              </Button>
              <Link to={`/decks/${deck.id}/study`} className="button-link">
                <Button class="btn btn-secondary">Study</Button>
              </Link>
            </div>

            {/* Trash Button */}
            <Button variant="danger" onClick={() => handleDeleteDeck(deck)}>
              Delete
              <i className="fas fa-trash-alt"></i> {/* Icon here */}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Decks;
