import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function EditCard() {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const history = useHistory();

  const { deckId, cardId } = useParams();

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
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href={`/decks/${deckId}`}>View Deck</Breadcrumb.Item>
        <Breadcrumb.Item active>Edit Card {cardId}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="create-deck-container">
        <h2>Edit Card</h2>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={front}
              value={front}
              onChange={handleFrontChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={back}
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
    </div>
  );
}

export default EditCard;
