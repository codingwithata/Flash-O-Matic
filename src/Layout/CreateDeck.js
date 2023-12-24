import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './CreateDeck.css';
import { useState } from "react";

function CreateDeck() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange= (event) => {
    setName(event.target.value)
  }

  const handleDescriptionChange= (event) => {
    setDescription(event.target.value)
  }
  const handleOnSubmit= (event) => {
    
  }
  return (
    <div className="create-deck-container">
      <h2>Create Deck</h2>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Enter name"
          value={name}  // Set the value to the current state
          onChange={handleNameChange}  // Handle changes
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control 
          as="textarea" 
          rows={3} 
          placeholder="Enter description" 
          value={description}  // Set the value to the current state
          onChange={handleDescriptionChange}  // Handle changes
          />
        </Form.Group>
        <div className="button-container">
          <Button variant="secondary" className="cancel-button">
            Cancel
          </Button>
          <Button variant="primary" className="submit-button">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateDeck;
