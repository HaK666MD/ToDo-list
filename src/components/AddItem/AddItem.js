import React, { Component } from 'react';

import './AddItem.css'

export default class AddItem extends Component {
  state = {
    text: ''
  }

  onInputChange = ({ target }) => {
    this.setState({
      text: target.value
    })
  }

  onBtnClick = () => {
    const { onAddItem } = this.props;
    this.setState((state) => {
      onAddItem(state.text.trim())
      return {
        text: ''
      }
    })
  };

  render() {
    return (
      <div className='adder'>
        <input placeholder="What ToDo?" onChange={this.onInputChange} value={this.state.text}></input>
        <button className='btn btn-danger' onClick={this.onBtnClick}>ADD</button>
      </div>
    );
  };
}