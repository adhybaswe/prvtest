import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import RegisterLogin from './views/RegisterLogin';
import KonfirmasiOTP from './views/KonfirmasiOTP';
import User from './views/User';

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/konfirmasiotp">
                <KonfirmasiOTP />
            </Route>
            <Route path="/user">
                <User />
            </Route>
            <Route path="/">
                <RegisterLogin />
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
