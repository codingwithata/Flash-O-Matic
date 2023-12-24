import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { createDeck } from "../utils/api/index"; // Adjust the path accordingly
import { API_BASE_URL, stripCards, fetchJson } from "../utils/api/index"; // Import API-related functions

import './CreateDeck.css';

function CreateDeck() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Create a new deck object
      const newDeck = {
        name,
        description,
      };

      // Call the createDeck function to create a new deck
      await createDeck(newDeck);

      // Optionally, you can add logic to handle success, navigate to another page, etc.

      // Clear the form fields after submission
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  return (
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
  );
}

export default CreateDeck;
