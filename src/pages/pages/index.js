import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Me from '../../pages1/Me';
import Projects from '../../pages1/Projects';
import Work from '../../pages1/Work';
import Education from '../../pages1/Education';

const Pages = ({ user }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
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
      </Switch>
    </Router>
  );
};

export default Pages;