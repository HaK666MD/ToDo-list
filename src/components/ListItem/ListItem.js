import React, { Component } from 'react';

import './ListItem.css';

export default class ListItem extends Component {

  render() {
    const { label, deleteList, onlabelClick, onImportant } = this.props;

    let listClassName = '';

    listClassName += label.important ? ' important' : '';
    listClassName += label.isDone ? ' done' : '';
    return (
      <li >
        <a href='#' className="fa fa-exclamation-triangle" onClick={() => onImportant(label.id)}></a>
        <span className={listClassName} onClick={() => onlabelClick(label.id)}>{label.title}</span>
        <a href='#' className="fa fa-trash" onClick={() => deleteList(label.id)}></a>
      </li>
    );
  }
}