import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createDeck } from "../../utils/api/index"; // Adjust the path accordingly
import { useHistory } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
    <div className="create-deck-container">
      <div className="cd-breadcrumb-main">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item href="/" className="breadcrumb-text">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => history.push("/")}
            active
            className="breadcrumb-text"
          >
            View Deck
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="cd-form">
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

          <div className="cd-button-container">
            <Link to={`/`}>
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

export default CreateDeck;
