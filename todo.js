//app.js
import React from 'react';
import TodoList from './TodoList';

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;

//todolist.js
import React, { useState } from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos(todos => [...todos, newTodo]);
  };

  const removeTodo = (id) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <NewTodoForm addTodo={addTodo} />
      {todos.map(({ id, task }) => (
        <Todo
          key={id}
          id={id}
          task={task}
          removeTodo={removeTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;

//todo.js
import React from 'react';

function Todo({ id, task, removeTodo }) {
  const handleRemove = () => removeTodo(id);

  return (
    <div>
      <div>{task}</div>
      <button onClick={handleRemove}>X</button>
    </div>
  );
}

export default Todo;

//newtodoform.js
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

function NewTodoForm({ addTodo }) {
  const [task, setTask] = useState('');

  const handleChange = evt => {
    setTask(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    addTodo({ task, id: uuid() });
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task">Task:</label>
      <input
        id="task"
        type="text"
        value={task}
        onChange={handleChange}
      />
      <button>Add Todo</button>
    </form>
  );
}

export default NewTodoForm;

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

//todolist.test.js
import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

test('renders without crashing', () => {
  render(<TodoList />);
});

test('matches snapshot', () => {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

test('can add and remove a todo', () => {
  const { getByLabelText, getByText } = render(<TodoList />);
  
  const input = getByLabelText('Task:');
  const button = getByText('Add Todo');

  fireEvent.change(input, { target: { value: 'Test Todo' } });
  fireEvent.click(button);

  const removeButton = getByText('X');
  expect(removeButton).toBeInTheDocument();
  fireEvent.click(removeButton);
  expect(removeButton).not.toBeInTheDocument();
});

//todo.test.js
import { render, fireEvent } from '@testing-library/react';
import Todo from './Todo';

test('renders without crashing', () => {
  render(<Todo id="1" task="Test Todo" />);
});

test('matches snapshot', () => {
  const { asFragment } = render(<Todo id="1" task="Test Todo" />);
  expect(asFragment()).toMatchSnapshot();
});

test('calls remove function on button click', () => {
  const removeMock = jest.fn();
  const { getByText } = render(<Todo id="1" task="Test Todo" removeTodo={removeMock} />);
  const button = getByText('X');
  fireEvent.click(button);
  expect(removeMock).toHaveBeenCalledWith('1');
});

//newtodoform.test.js
import { render, fireEvent } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';

test('renders without crashing', () => {
  render(<NewTodoForm />);
});

test('matches snapshot', () => {
  const { asFragment } = render(<NewTodoForm />);
  expect(asFragment()).toMatchSnapshot();
});

test('can fill out the form and submit', () => {
  const addTodoMock = jest.fn();
  const { getByLabelText, getByText } = render(<NewTodoForm addTodo={addTodoMock} />);

  const input = getByLabelText('Task:');
  const button = getByText('Add Todo');

  fireEvent.change(input, { target: { value: 'Test Todo' } });
  fireEvent.click(button);

  expect(addTodoMock).toHaveBeenCalledWith(expect.objectContaining({ task: 'Test Todo' }));
});



