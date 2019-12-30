import React, { Component } from 'react';

import Header from '../Header'
import Filter from '../Filter'
import List from '../List';
import AddItem from '../AddItem';

import './App.css'

export default class App extends Component {

  dataid = 1;

  state = {
    todoData: [
      this.createNewItem('REact'),
      this.createNewItem('HTML'),
      this.createNewItem('Node'),
      this.createNewItem('Sass')
    ],
    searchText: '',
    filter: 'all' // active, done or all
  }

  createNewItem(title) {
    return {
      id: this.dataid++,
      title,
      important: false,
      isDone: false
    }
  }

  findId(todoData, id) {
    return todoData.findIndex((obj) => obj.id === id);
  }

  doneOrImportant = (type, id) => {
    this.setState(({ todoData }) => {
      const idx = this.findId(todoData, id)

      const obj = {
        ...todoData[idx],
        [type]: !todoData[idx][type]
      };
      return {
        todoData: [
          ...todoData.slice(0, idx),
          obj,
          ...todoData.slice(idx + 1)
        ]
      }
    });
  }

  onDeleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = this.findId(todoData, id)
      return {
        todoData: [
          ...todoData.slice(0, idx),
          ...todoData.slice(idx + 1)
        ]
      }
    })
  }

  onAddItem = (text) => {
    if (!text) return;
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, this.createNewItem(text)]
      }
    })
  }

  onlabelClick = (id) => {
    this.doneOrImportant('isDone', id)
  };

  onImportant = (id) => {
    this.doneOrImportant('important', id)
  };

  filterIt(todoData, filter) {
    switch (filter) {
      case 'active': return todoData.filter((e) => !e.isDone);
      case 'done': return todoData.filter((e) => e.isDone);
      default: return todoData
    }
  }

  filterList = (filter) => {
    this.setState({ filter })
  }

  onSearchChange = (text) => {
    this.setState({ searchText: text });
  }

  search = (todoData, searchText) => {
    if (!searchText.length) return todoData;

    return todoData.filter((item) => {
      return item.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
  };

  render() {
    const { todoData, searchText, filter } = this.state;
    const visibilItems = this.filterIt(
      this.search(todoData, searchText), filter
    );

    const done = visibilItems.filter(e => e.isDone).length;
    const todo = visibilItems.length - done;
    return (
      <>
        <Header done={done} todo={todo} />
        <Filter onSearchChange={this.onSearchChange}
          onFilterChange={this.filterList}
          filter={this.state.filter} />
        <List
          todoList={visibilItems}
          deleteItem={this.onDeleteItem}
          onlabelClick={this.onlabelClick}
          onImportant={this.onImportant}
        />
        <AddItem onAddItem={this.onAddItem} />
      </>
    );
  };
}