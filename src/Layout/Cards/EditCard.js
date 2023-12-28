import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateCard, readCard } from "../../utils/api";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./EditCard.css";

function EditCard() {
  const [card, setCard] = useState([]);

  const [front, setFront] = useState(card.front || "");
  const [back, setBack] = useState(card.back || "");

  const history = useHistory();
  const { deckId, cardId } = useParams();

  const handleFrontChange = (event) => {
    setFront(event.target.value);
  };

  const handleBackChange = (event) => {
    setBack(event.target.value);
  };

  useEffect(() => {
    console.log(front, back);
  });

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const card = await readCard(cardId);
        setFront(card.front);
        setBack(card.back);
        console.log(card);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCard();
  }, [cardId]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (!front.trim() || !back.trim()) {
      alert("Please enter both front and back .");
      return;
    }

    try {
      const cardToUpdate = {
        id: cardId,
        deckId: deckId,
        front,
        back,
      };

      await updateCard(cardToUpdate);

      history.push(`/decks/${deckId}`);
      setFront("");
      setBack("");
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  return (
    <div className="edit-card-container">
      <div className="ec-breadcrumb-main">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/decks/${deckId}`}>View Deck</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Card {cardId}
            </li>
          </ol>
        </nav>
      </div>

      <div className="ec-form">
        <h2>Edit Card</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="front" className="form-label">
              Front
            </label>
            <input
              type="text"
              className="form-control"
              id="front"
              value={front}
              placeholder={front}
              onChange={handleFrontChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="back" className="form-label">
              Back
            </label>
            <textarea
              className="form-control"
              id="back"
              rows={3}
              value={back}
              placeholder={back}
              onChange={handleBackChange}
            />
          </div>

          <div className="ec-button-container">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to={`/decks/${deckId}`}>
              <button type="button" className="btn btn-primary submit-button">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditCard;
