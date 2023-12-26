import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createDeck } from "../../utils/api/index"; // Adjust the path accordingly
import { useHistory } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import "./CreateDeck.css";

function CreateDeck() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const newDeck = {
        name,
        description,
      };

      await createDeck(newDeck);
      history.push("/");

      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => history.push("/")} active>
          View Deck
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="create-deck-container">
        <h2>Create Deck</h2>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={handleDescriptionChange}
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

export default CreateDeck;
