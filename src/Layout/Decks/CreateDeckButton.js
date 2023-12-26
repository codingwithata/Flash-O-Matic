import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./CreateDeckButton.css";

function CreateDeckButton() {
  return (
    <Link to="/decks/new" className="button-link">
      <Button variant="secondary" size="lg" className="button">
        Create Deck
      </Button>
    </Link>
  );
}

export default CreateDeckButton;
