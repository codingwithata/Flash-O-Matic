import React, { useEffect, useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { readDeck, updateDeck } from "../utils/api/index"; // Adjust the path accordingly
import { API_BASE_URL, stripCards, fetchJson } from "../utils/api/index"; // Import API-related functions
import { useParams, useHistory} from 'react-router-dom';

import './CreateDeck.css';

function EditDeck() {
  const [deck, setDeck] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const history = useHistory()
  
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
     
      history.push('/');

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

export default EditDeck;
