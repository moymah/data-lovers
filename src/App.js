import React from 'react';
// import Home from './pages/Home';
import Champions from './pages/Champions';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Champions} />
      {/* <Route path="/champions" exact component={Home} /> */}
    </Router>
  );
}

export default App;
