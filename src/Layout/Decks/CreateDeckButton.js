import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./CreateDeckButton.css";

function CreateDeckButton() {
  return (
    <div className="button">
      <Link to="/decks/new" className="button-link">
        <button type="submit" className="btn btn-secondary btn-lg button">
          Create Deck
        </button>
      </Link>
    </div>
  );
}

export default CreateDeckButton;
