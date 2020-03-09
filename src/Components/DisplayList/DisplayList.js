import React, { Component } from "react";

import "./DisplayList.css";
class DisplayList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      items,
      onCheck,
      onToggle,
      toggleList,
      completedList,
      onSort
    } = this.props;

    return (
      <div className="tasks">
        <div className="list-heading-toggle">
          <h1>Todo List</h1>
          <div className="d-flex">
            <p className="status">{toggleList ? "Completed" : "Pending"}</p>
            <label className="switch">
              <input
                type="checkbox"
                className="toggle-list"
                onChange={() => onToggle()}
              />
              <span className="slider round"></span>
            </label>
            <button
              type="button"
              className="btn btn-default btn-sm sort"
              onClick={() => onSort(toggleList)}
            >
              <span className="fa fa-fw fa-sort"></span> Sort
            </button>
          </div>
        </div>
        {toggleList ? (
          completedList.length === 0 ? (
            <h1 className="no-contents">No contents added</h1>
          ) : (
            completedList.map((item, key) => (
              <div key={key}>
                <label htmlFor="label-1" className="list-label">
                  <input
                    id="label-1"
                    type="checkbox"
                    checked={item.done}
                    onChange={() => onCheck(item, 1)}
                  />
                  <h3 className="todo-name completed">{item.todoname}</h3>

                  <p>{item.datetime}</p>

                  <i
                    className="fa fa-trash"
                    onClick={e => this.props.onDeleteTodo(key, "b", e)}
                  ></i>
                </label>
              </div>
            ))
          )
        ) : items.length === 0 ? (
          <h1 className="no-contents">No contents added</h1>
        ) : (
          items.map((item, key) => (
            <div key={key}>
              <label htmlFor="label-1" className="list-label">
                <input
                  id="label-1"
                  type="checkbox"
                  checked={item.done}
                  onChange={() => onCheck(item, 0)}
                />
                <h3 className="todo-name">{item.todoname}</h3>

                <p>{item.datetime}</p>

                <i
                  className="fa fa-trash"
                  onClick={e => this.props.onDeleteTodo(key, "a", e)}
                ></i>
              </label>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default DisplayList;
