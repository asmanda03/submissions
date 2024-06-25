// src/App.js
import React from 'react';
import Madlib from './Madlib';

function App() {
  return (
    <div className="App">
      <Madlib />
    </div>
  );
}

export default App;

// src/Madlib.js
import React, { useState } from 'react';
import MadlibForm from './MadlibForm';
import MadlibStory from './MadlibStory';

function Madlib() {
  const [inputs, setInputs] = useState(null);

  const handleSubmit = (data) => {
    setInputs(data);
  };

  const handleReset = () => {
    setInputs(null);
  };

  return (
    <div>
      <h1>Madlibs!</h1>
      {inputs ? (
        <MadlibStory inputs={inputs} onReset={handleReset} />
      ) : (
        <MadlibForm onSubmit={handleSubmit} />
      )}
    </div>
  );
}

export default Madlib;

// src/MadlibForm.js
import React, { useState } from 'react';

function MadlibForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    noun1: '',
    noun2: '',
    adjective: '',
    color: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="noun1"
        placeholder="noun"
        value={formData.noun1}
        onChange={handleChange}
      />
      <input
        type="text"
        name="noun2"
        placeholder="noun 2"
        value={formData.noun2}
        onChange={handleChange}
      />
      <input
        type="text"
        name="adjective"
        placeholder="adjective"
        value={formData.adjective}
        onChange={handleChange}
      />
      <input
        type="text"
        name="color"
        placeholder="color"
        value={formData.color}
        onChange={handleChange}
      />
      <button type="submit">Get Story</button>
    </form>
  );
}

export default MadlibForm;

// src/MadlibStory.js
import React from 'react';

function MadlibStory({ inputs, onReset }) {
  return (
    <div>
      <p>
        Once upon a time, there was a {inputs.adjective} {inputs.noun1} who loved a {inputs.color} {inputs.noun2}.
      </p>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default MadlibStory;

