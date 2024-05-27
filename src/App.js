import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import UpdatePassword from './components/UpdatePassword'; // Import the new component
import Dashboard from './components/Dashboard';
import AddItemForm from './components/AddItemForm';
import MakeSaleForm from './components/MakeSaleForm';
import ItemList from './components/ItemList';
import users from './components/users';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RegisterForm} /> {/* Render RegisterForm component by default */}
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/forgot-password" component={UpdatePassword} /> 
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/items/add" component={AddItemForm} />
        <Route exact path="/items/makesale" component={MakeSaleForm} />
        <Route exact path="/items/itemlist" component={ItemList} />
        <Route exact path="/users" component={users} />
                {/* Redirect from /register to /login */}
        <Redirect from="/register" to="/login" />
        {/* Redirect from any other path to /dashboard */}
        <Redirect to="/dashboard" />
      </Switch>
    </Router>
  );
}

export default App;
