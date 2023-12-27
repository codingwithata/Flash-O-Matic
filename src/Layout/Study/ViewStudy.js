// EditDeck.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck, deleteCard } from "../../utils/api/index";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ViewStudy() {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [decks, setDecks] = useState([]);
  const [cardIndex, setCardIndex] = useState(0); // To keep track of the current card index

  const [showFront, setShowFront] = useState(true); // To toggle between front and back content

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

  const handleFlip = () => {
    setShowFront((prevShowFront) => !prevShowFront);
  };

  const handleNext = () => {
    setCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setShowFront(true);
  };

  if (cards.length === 0) {
    return <p>No cards available for this deck.</p>;
  }

  const currentCard = cards[cardIndex];

  return (
    <div className="study-container">
      <div className="s-breadcrumb-main">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" className="breadcrumb-text">
                Home
              </a>
            </li>
            <li className="breadcrumb-item active breadcrumb-text">
              Study deck {deckId}
            </li>
          </ol>
        </nav>
      </div>

      <div className="studyCards">
        {cards.length > 2 ? (
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{currentCard.name}</h5>
              <p className="card-text">
                {showFront
                  ? `Front: ${currentCard.front}`
                  : `Back: ${currentCard.back}`}
              </p>
              <div className="button-container">
                <button
                  onClick={handleFlip}
                  type="button"
                  className="btn btn-secondary btn-lg button"
                >
                  Flip
                </button>
                <button
                  onClick={handleNext}
                  type="submit"
                  className="btn btn-primary btn-lg submit-button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1>React Router: Study</h1>
            <h2>Not enough cards.</h2>
            <p>
              You need at least 3 cards to study. There are {cards.length} in
              this deck{" "}
            </p>
            <Link to={`/decks/${deckId}/cards`} className="btn btn-primary">
              Add Cards
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewStudy;
