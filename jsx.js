part1

function FirstComponent() {
  return <h1>My very first component.</h1>;
}

function NamedComponent({ name }) {
  return <p>My name is {name}.</p>;
}

function App() {
  return (
    <div>
      <FirstComponent />
      <NamedComponent name="Bob" />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);


part2
function Tweet({ date, message, name, username }) {
  return (
    <div className="tweet">
      <span>{name}</span>
      <span className="username">{username}</span>
      <span className="date">{date}</span>
      <p>{message}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Tweet
        name="Matt Lane"
        username="mmmaaatttttt"
        date={new Date().toDateString()}
        message="This app will disrupt everything!!"
      />
      <Tweet
        name="Elie Schoppik"
        username="eschoppik"
        date={new Date().toDateString()}
        message="#Ilovehashtags"
      />
      <Tweet
        name="Tim Garcia"
        username="TimGarcia0"
        date={new Date().toDateString()}
        message="Follow me on Twitter!"
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

part3
const MAX_NAME_LENGTH_TO_SHOW = 6;


function Person({ age, hobbies, name }) {
  const voteText = age >= 18
      ? "Go vote!"
      : "Go study!";

  // your browser will issue a stern warning about this; we'll learn how to fix
  // that later.
  const hobbiesLIs = hobbies.map(hobby => <li>{hobby}</li>);

  return (
    <div>
      <p>Learn some information about this person:</p>
      <ul>
        <li>Name: {name.slice(0, MAX_NAME_LENGTH_TO_SHOW)}</li>
        <li>Age: {age}</li>
        <ul>
          Hobbies:
          {hobbiesLIs}
        </ul>
      </ul>
      <h3>{voteText}</h3>
    </div>
  );
}

function App() {
  return (
    <div>
      <Person
        name="Homer"
        age={38}
        hobbies={["bowling", "watching tv", "drinking beer"]}
      />
      <Person name="Marge" age={34} hobbies={["painting", "gambling"]} />
      <Person
        name="Bart"
        age={10}
        hobbies={["skateboarding", "making prank calls"]}
      />
      <Person
        name="Lisa"
        age={8}
        hobbies={["reading", "saxophone", "eating vegetables"]}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);