import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createCard } from "../../utils/api/index"; // Adjust the path accordingly
import { useHistory, useParams } from "react-router-dom";

import "./CreateDeck.css";

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
      const updateCard = {
        front,
        back,
      };

      await updateCard(updateCard);

      setFront("");
      setBack("");

      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  return (
    <div className="create-deck-container">
      <h2>Create Card</h2>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter front"
            value={front}
            onChange={handleFrontChange}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Back information"
            value={back}
            onChange={handleBackChange}
          />
        </Form.Group>
        <div className="button-container">
          <Button variant="secondary" className="cancel-button">
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="submit-button">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateCard;
