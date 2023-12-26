// Layout.js
import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import CreateDeckButton from "./Decks/CreateDeckButton";
import CreateDeck from "./Decks/CreateDeck";
import Decks from "./Decks/Decks";
import ViewDeck from "./Decks/ViewDeck";
import EditDeck from "./Decks/EditDeck";
import CreateCard from "./Cards/CreateCard";
import EditCard from "./Cards/EditCard";
import ViewStudy from "./Study/ViewStudy";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <CreateDeckButton />
            <br />
            <Decks />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards">
            <CreateCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <ViewStudy />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
