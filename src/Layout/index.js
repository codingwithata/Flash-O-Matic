// Layout.js
import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import CreateDeckButton from "./CreateDeckButton";
import CreateDeck from "./CreateDeck";
import Decks from "./Decks";
import ViewDeck from "./ViewDeck";
import EditDeck from "./EditDeck"
import CreateCard from "./CreateCard"
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
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards">
            <CreateCard />
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
