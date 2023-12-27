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
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item href="/" className="breadcrumb-text">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="breadcrumb-text">
            Study deck {deckId}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="studyCards">
        {cards.length > 2 ? (
          <Card key={currentCard.id} className="mb-4">
            <Card.Body>
              <Card.Title>{currentCard.name}</Card.Title>
              <Card.Text>
                {showFront
                  ? `Front: ${currentCard.front}`
                  : `Back: ${currentCard.back}`}
              </Card.Text>
              <div className="button-container">
                <Button
                  onClick={handleFlip}
                  variant="secondary"
                  size="lg"
                  className="button"
                >
                  Flip
                </Button>
                <Button
                  onClick={handleNext}
                  type="submit"
                  variant="primary"
                  className="submit-button"
                >
                  Next
                </Button>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <div>
            <h1>React Router: Study</h1>
            <h2>Not enough cards.</h2>
            <p>
              You need at least 3 cards to study. There are {cards.length} in
              this deck{" "}
            </p>
            <Link to={`/decks/${deckId}/cards`}>
              <Button>Add Cards</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewStudy;
