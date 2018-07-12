import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Home from './views/home'

const Root = () => (
    <Router>
        <Route exact path="/:rental?" component={Home} />
    </Router>
)

export default Root;
