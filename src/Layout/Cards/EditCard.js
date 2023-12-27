import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./EditCard.css";

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
    <div className="edit-deck-container">
      <div className="ec-breadcrumb-main">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item href="/" className="breadcrumb-text">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item
            href={`/decks/${deckId}`}
            className="breadcrumb-text"
          >
            View Deck
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="breadcrumb-text">
            Edit Card {cardId}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="ec-form">
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
          <div className="ec-button-container">
            <Link to={`/decks/${deckId}`}>
              <Button variant="primary">Cancel</Button>
            </Link>
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
