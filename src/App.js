import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import RegisterLogin from './views/RegisterLogin';
import KonfirmasiOTP from './views/KonfirmasiOTP';

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/">
                <RegisterLogin />
            </Route>
            <Route path="/konfirmasiotp">
                <KonfirmasiOTP />
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
