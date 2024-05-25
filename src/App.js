// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import UpdatePassword from './components/UpdatePassword'; // Import the new component


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/forgot-password" component={UpdatePassword} /> 
        {/* Redirect to register page by default */}
        <Redirect from="/register" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
