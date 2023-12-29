// EditDeck.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck, deleteCard } from "../../utils/api/index";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ViewStudy() {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [decks, setDecks] = useState([]);
  const [cardIndex, setCardIndex] = useState(0); // To keep track of the current card index

  const [showFront, setShowFront] = useState(true); // To toggle between front and back content
  const [showRestartPrompt, setShowRestartPrompt] = useState(false);
  const [insufficientCards, setInsufficientCards] = useState(false);
  const [nextButton, setNextButton] = useState(false);

  useEffect(() => {
    console.log(cardIndex);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deckData = await readDeck(deckId);
        setDecks(deckData || []);
        console.log(deckData);
        setCards(deckData.cards);
        console.log(deckData);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };
    fetchData();
  }, [deckId]);

  // useEffect(() => {
  //   const fetchCards = async () => {
  //     try {
  //       const cards = await fetch(
  //         `http://localhost:8080/cards?deckId=${deckId}`
  //       );
  //       const response = await cards.json();
  //       setCards(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchCards();
  // }, [deckId]);

  const handleFlip = () => {
    setNextButton(true);
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
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="breadcrumb-text">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`} className="breadcrumb-text">
                {decks.name}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="card-title">{decks.name}: Study</h1>
      <div className="studyCards">
        {cards.length > 2 ? (
          <div className="card mb-4">
            <p className="card-index-text">
              Card {cardIndex + 1} of {cards.length}
            </p>
            <div className="card-body">
              <p className="card-text">
                {showFront ? `${currentCard.front}` : `${currentCard.back}`}
              </p>
              <div className="button-container">
                <button
                  onClick={handleFlip}
                  type="button"
                  className="btn btn-secondary btn-lg button"
                >
                  flip
                </button>
                {nextButton && (
                  <button
                    onClick={handleNext}
                    type="submit"
                    className="btn btn-primary btn-lg submit-button"
                  >
                    next
                  </button>
                )}
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
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
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
