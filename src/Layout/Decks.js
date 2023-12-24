import React, { useEffect, useState } from "react";

function Decks() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/db.json");
        const jsonData = await response.json();
        setDecks(jsonData.decks);
        console.log(jsonData)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <h2>Deck List:</h2>
      <ul>
        {decks.map((deck) => (
          <li key={deck.id}>
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Decks;
