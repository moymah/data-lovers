import React from 'react';
import Champions from './pages/Champions';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Champions} />
    </Router>
  );
}

export default App
