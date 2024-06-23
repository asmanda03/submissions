import React from 'react';
import Deck from "./Deck"

function App() {
  return (
      <div>
        <Deck />
      </div>
  );
}

export default App;


import React, { useState } from "react";
import "./Card.css";

/** Single card: just renders the card as received from deck. */

function Card({ name, image }) {
  // get these once; it will never be updated for the same card
  const [{ angle, xPos, yPos }] = useState({
    angle: Math.random() * 90 - 45,
    xPos: Math.random() * 40 - 20,
    yPos: Math.random() * 40 - 20,
  });

  const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;

  return <img
      className="Card"
      alt={name}
      src={image}
      style={{ transform }} />;
}

export default Card;

import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";
/** Deck: uses deck API, allows drawing card at a time. */

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(function loadDeckFromAPI() {
    async function fetchData() {
      const d = await axios.get(`${API_BASE_URL}/new/shuffle/`);
      setDeck(d.data);
    }
    fetchData();
  }, []);



  /** Draw card: change the state & effect will kick in. */
  async function draw() {
    try {
      const drawRes = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);

      if (drawRes.data.remaining === 0) throw new Error("Deck empty!");

      const card = drawRes.data.cards[0];

      setDrawn(d => [
        ...d,
        {
          id: card.code,
          name: card.suit + " " + card.value,
          image: card.image,
        },
      ]);
    } catch (err) {
      alert(err);
    }
  }

  /** Shuffle: change the state & effect will kick in. */
  async function startShuffling() {
    setIsShuffling(true);
    try {
      await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
      setDrawn([]);
    } catch (err) {
      alert(err);
    } finally {
      setIsShuffling(false);
    }
  }

  /** Return draw button (disabled if shuffling) */
  function renderDrawBtnIfOk() {
    if (!deck) return null;

    return (
      <button
        className="Deck-gimme"
        onClick={draw}
        disabled={isShuffling}>
        DRAW
      </button>
    );
  }

  /** Return shuffle button (disabled if already is) */
  function renderShuffleBtnIfOk() {
    if (!deck) return null;
    return (
      <button
        className="Deck-gimme"
        onClick={startShuffling}
        disabled={isShuffling}>
        SHUFFLE DECK
      </button>
    );
  }

  return (
    <main className="Deck">

      {renderDrawBtnIfOk()}
      {renderShuffleBtnIfOk()}

      <div className="Deck-cardarea">{
        drawn.map(c => (
          <Card key={c.id} name={c.name} image={c.image} />
        ))}
      </div>

    </main>
  );
}

export default Deck;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const reportWebVitals = onPerfEntry => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      });
    }
  };
  
  export default reportWebVitals;
  


