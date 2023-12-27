import React, { useState } from "react";
import { createCard } from "../../utils/api/index"; // Adjust the path accordingly
import { useHistory, useParams } from "react-router-dom";

import "./CreateCard.css";

function CreateCard() {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const history = useHistory();

  const { deckId } = useParams();

  const handleFrontChange = (event) => {
    setFront(event.target.value);
  };

  const handleBackChange = (event) => {
    setBack(event.target.value);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const newCard = {
        front,
        back,
      };

      await createCard(Number(deckId), newCard); // Convert deckId to a number

      setFront("");
      setBack("");

      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  return (
    <div className="create-card-container">
      <div className="cc-breadcrumb-main">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/decks/${deckId}`}>View Deck</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Create Card
            </li>
          </ol>
        </nav>
      </div>

      <div className="cc-form">
        <h2>Create Card</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="front" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="front"
              placeholder="Enter front"
              value={front}
              onChange={handleFrontChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="back" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="back"
              rows={3}
              placeholder="Enter Back information"
              value={back}
              onChange={handleBackChange}
            />
          </div>

          <div className="cc-button-container">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCard;
