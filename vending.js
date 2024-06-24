// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VendingMachine from './components/VendingMachine';
import Snack1 from './components/Snack1';
import Snack2 from './components/Snack2';
import Snack3 from './components/Snack3';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VendingMachine />} />
        <Route path="/snack1" element={<Snack1 />} />
        <Route path="/snack2" element={<Snack2 />} />
        <Route path="/snack3" element={<Snack3 />} />
      </Routes>
    </Router>
  );
}

export default App;

// src/components/VendingMachine.js
import React from 'react';
import { Link } from 'react-router-dom';

function VendingMachine() {
  return (
    <div>
      <h1>Vending Machine</h1>
      <ul>
        <li><Link to="/snack1">Snack 1</Link></li>
        <li><Link to="/snack2">Snack 2</Link></li>
        <li><Link to="/snack3">Snack 3</Link></li>
      </ul>
    </div>
  );
}

export default VendingMachine;


// src/components/Snack1.js
import React from 'react';
import { Link } from 'react-router-dom';

function Snack1() {
  return (
    <div>
      <h2>Snack 1</h2>
      <p>This is the detail page for Snack 1.</p>
      <Link to="/">Back to Vending Machine</Link>
    </div>
  );
}

export default Snack1;

// src/components/VendingMachine.js
const styles = {
    listStyle: 'none',
    margin: '0',
    padding: '0',
  };
  
  function VendingMachine() {
    return (
      <div>
        <h1>Vending Machine</h1>
        <ul style={styles}>
          <li><Link to="/snack1">Snack 1</Link></li>
          <li><Link to="/snack2">Snack 2</Link></li>
          <li><Link to="/snack3">Snack 3</Link></li>
        </ul>
      </div>
    );
  }
  
