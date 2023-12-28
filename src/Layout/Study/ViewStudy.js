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
  const [showRestartPrompt, setShowRestartPrompt] = useState(false);
  const [insufficientCards, setInsufficientCards] = useState(false);

  useEffect(() => {
    console.log(cardIndex);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deckData = await readDeck(deckId);
        setDecks(deckData || []);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };
    fetchData();
  }, [deckId]);

  useEffect(() => {
    const abort = new AbortController();
    const signal = abort.signal;

    const fetchCards = async () => {
      try {
        const cards = await fetch(
          `http://localhost:8080/cards?deckId=${deckId}`,
          { signal: signal } // Fixed the syntax here
        );
        const response = await cards.json();
        setCards(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCards();

    return () => {
      console.log("Aborted");
      abort.abort();
    };
  }, [deckId]);

  const handleFlip = () => {
    setShowFront((prevShowFront) => !prevShowFront);
  };

  const handleNext = () => {
    if (cardIndex + 1 < cards.length) {
      setCardIndex((prevIndex) => prevIndex + 1);
      setShowFront(true);
    } else {
      setShowRestartPrompt(true);
    }
  };

  const handleRestart = () => {
    setCardIndex(0);
    setShowRestartPrompt(false);
  };
  const currentCard = cards[cardIndex];

  return (
    <div className="study-container">
      <div className="s-breadcrumb-main">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/" className="breadcrumb-text">
              Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="breadcrumb-text">
            <Link to={`/decks/${deckId}`} className="breadcrumb-text">
              {decks.name}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="breadcrumb-text">
            Study
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <h1 className="card-title">Study:{decks.name}</h1>
      <div className="studyCards">
        {cards.length > 2 ? (
          <div className="card mb-4">
            <div className="card-body">
              <p className="card-index-text">
                Card {cardIndex + 1} of {cards.length}
              </p>
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
            <h2>Not enough cards</h2>
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
      {/* Restart Prompt */}
      {showRestartPrompt &&
        window.confirm("Do you want to restart the deck?") &&
        handleRestart()}
    </div>
  );
}

export default ViewStudy;
