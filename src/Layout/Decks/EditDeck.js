import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { readDeck, updateDeck } from "../../utils/api/index"; // Adjust the path accordingly
import { useParams, useHistory } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import "./CreateDeck.css";

function EditDeck() {
  const [deck, setDeck] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const history = useHistory();

  const { deckId } = useParams();

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
        id: deckId,
        name,
        description,
      };

      await updateDeck(newDeck);

      history.push("/");

      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deck = await readDeck(deckId);
        setDeck(deck || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [deckId, setDeck]);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href={`/decks/${deckId}`}>View Deck</Breadcrumb.Item>
        <Breadcrumb.Item active>Edit Deck</Breadcrumb.Item>
      </Breadcrumb>

      <div className="create-deck-container">
        <h2>Create Deck</h2>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={deck.name}
              value={name}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={deck.description}
              value={description}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
          <div className="button-container">
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

export default EditDeck;
