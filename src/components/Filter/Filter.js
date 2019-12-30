import React, { Component } from 'react';

import './Filter.css'

export default class Filter extends Component {
  state = {
    text: ''
  }

  buttons = [
    { name: 'all', title: 'All' },
    { name: 'active', title: 'Active' },
    { name: 'done', title: 'Done' },
  ]

  onInputChange = ({ target: { value } }) => {
    this.setState({ text: value });
    this.props.onSearchChange(value);
  };

  render() {
    const btns = this.buttons.map((b) => {
      let classes = ''
      classes += b.name === this.props.filter ? ' active' : '';
      return (
        <button className={classes} onClick={() => this.props.onFilterChange(b.name)} key={b.name}>{b.title}</button>
      )
    })
    return (
      <div className="filter" >
        <input type="text" placeholder="Type to Search" onChange={this.onInputChange} value={this.state.text} />
        {btns}
      </div>
    );
  };
}