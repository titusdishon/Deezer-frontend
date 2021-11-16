import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ArtistView from "../pages/ArtistView";
import PlayListView from "../pages/PlayListView";
import Tracks from "../pages/Tracks";
import NavBar from "./NavBar";


const Music = () => {

  return (
    <div>
      <BrowserRouter>
      <NavBar />
        <Switch>
          <Redirect exact from="/Deezer-frontend" to="/" />
          <Route exact path="/">
            <Tracks />
          </Route>
          <Route exact path="/playlist/:id">
            <PlayListView />
          </Route>
          <Route exact path="/artist">
            <ArtistView />
          </Route>
          <Redirect exact from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Music;
