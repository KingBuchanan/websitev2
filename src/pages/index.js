import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Me from './Me';
import Projects from './Projects';
import Work from './Work';
import Education from './Education';
import AnimeFave from './Anime/AnimeFave';
import AnimeCurrent from  './Anime/AnimeCurrent';
import AnimeComplete from './Anime/AnimeComplete';

const Pages = ({ user }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/websitev2">
          <Me user={user} />
        </Route>
        <Route path="/projects">
          <Projects user={user} />
        </Route>
        <Route path="/work">
          <Work user={user} />
        </Route>
        <Route path="/education">
          <Education user={user} />
        </Route>
        <Route path="/favorites">
          <AnimeFave user={user} />
        </Route>
        <Route path="/watching">
          <AnimeCurrent user={user} />
        </Route>
        <Route path="/completed">
          <AnimeComplete user={user} />
        </Route>
      </Switch>
    </Router>
  );
};

export default Pages;