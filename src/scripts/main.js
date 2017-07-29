// scripts
import React from 'react';
import ReactDOM from 'react-dom';

// styles
import '../styles/main.scss';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["render"] }] */
class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>Quick Hand - Ludum Dare 39</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  React.createElement(Main, null),
  document.getElementById('app'),
);
