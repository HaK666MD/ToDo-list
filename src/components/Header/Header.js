import React, { Component } from 'react';

import './Header.css';

export default class App extends Component {

  render() {
    const { done, todo } = this.props;
    return (
      <header>
        <h1>ToDo List</h1>
        <div className="stats">
          <span>{todo} more todo </span>
          <span>{done} done</span>
        </div>
      </header >
    );
  }
};