//app.js
import React from 'react';
import BoxList from './BoxList';

function App() {
  return (
    <div className="App">
      <BoxList />
    </div>
  );
}

export default App;

//boxlist.js
import React, { useState } from 'react';
import Box from './Box';
import NewBoxForm from './NewBoxForm';

function BoxList() {
  const [boxes, setBoxes] = useState([]);

  const addBox = (newBox) => {
    setBoxes(boxes => [...boxes, newBox]);
  };

  const removeBox = (id) => {
    setBoxes(boxes => boxes.filter(box => box.id !== id));
  };

  return (
    <div>
      <NewBoxForm addBox={addBox} />
      {boxes.map(({ id, width, height, backgroundColor }) => (
        <Box
          key={id}
          id={id}
          width={width}
          height={height}
          backgroundColor={backgroundColor}
          removeBox={removeBox}
        />
      ))}
    </div>
  );
}

export default BoxList;

//box.js
import React from 'react';

function Box({ id, width, height, backgroundColor, removeBox }) {
  const handleRemove = () => removeBox(id);

  return (
    <div>
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor
        }}
      ></div>
      <button onClick={handleRemove}>X</button>
    </div>
  );
}

export default Box;

//newboxform.js
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

function NewBoxForm({ addBox }) {
  const INITIAL_STATE = { width: '', height: '', backgroundColor: '' };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    addBox({ ...formData, id: uuid() });
    setFormData(INITIAL_STATE);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="width">Width:</label>
      <input
        id="width"
        type="number"
        name="width"
        value={formData.width}
        onChange={handleChange}
      />
      <label htmlFor="height">Height:</label>
      <input
        id="height"
        type="number"
        name="height"
        value={formData.height}
        onChange={handleChange}
      />
      <label htmlFor="backgroundColor">Background Color:</label>
      <input
        id="backgroundColor"
        type="text"
        name="backgroundColor"
        value={formData.backgroundColor}
        onChange={handleChange}
      />
      <button>Add Box</button>
    </form>
  );
}

export default NewBoxForm;

//app.test.js
import { render } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
});

test('matches snapshot', () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

//boxlist.test.js
import { render, fireEvent } from '@testing-library/react';
import BoxList from './BoxList';

test('renders without crashing', () => {
  render(<BoxList />);
});

test('matches snapshot', () => {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});

test('can add and remove a box', () => {
  const { getByLabelText, getByText } = render(<BoxList />);
  
  const widthInput = getByLabelText('Width:');
  const heightInput = getByLabelText('Height:');
  const colorInput = getByLabelText('Background Color:');
  const button = getByText('Add Box');

  fireEvent.change(widthInput, { target: { value: '100' } });
  fireEvent.change(heightInput, { target: { value: '100' } });
  fireEvent.change(colorInput, { target: { value: 'red' } });
  fireEvent.click(button);

  const removeButton = getByText('X');
  expect(removeButton).toBeInTheDocument();
  fireEvent.click(removeButton);
  expect(removeButton).not.toBeInTheDocument();
});

//box.test.js
import { render, fireEvent } from '@testing-library/react';
import Box from './Box';

test('renders without crashing', () => {
  render(<Box id="1" width="100" height="100" backgroundColor="red" />);
});

test('matches snapshot', () => {
  const { asFragment } = render(<Box id="1" width="100" height="100" backgroundColor="red" />);
  expect(asFragment()).toMatchSnapshot();
});

test('calls remove function on button click', () => {
  const removeMock = jest.fn();
  const { getByText } = render(<Box id="1" width="100" height="100" backgroundColor="red" removeBox={removeMock} />);
  const button = getByText('X');
  fireEvent.click(button);
  expect(removeMock).toHaveBeenCalledWith('1');
});

//newboxform.test.js
import { render, fireEvent } from '@testing-library/react';
import NewBoxForm from './NewBoxForm';

test('renders without crashing', () => {
  render(<NewBoxForm />);
});

test('matches snapshot', () => {
  const { asFragment } = render(<NewBoxForm />);
  expect(asFragment()).toMatchSnapshot();
});

test('can fill out the form and submit', () => {
  const addBoxMock = jest.fn();
  const { getByLabelText, getByText } = render(<NewBoxForm addBox={addBoxMock} />);

  const widthInput = getByLabelText('Width:');
  const heightInput = getByLabelText('Height:');
  const colorInput = getByLabelText('Background Color:');
  const button = getByText('Add Box');

  fireEvent.change(widthInput, { target: { value: '100' } });
  fireEvent.change(heightInput, { target: { value: '100' } });
  fireEvent.change(colorInput, { target: { value: 'red' } });
  fireEvent.click(button);

  expect(addBoxMock).toHaveBeenCalledWith(expect.objectContaining({ width: '100', height: '100', backgroundColor: 'red' }));
});





