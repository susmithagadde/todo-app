import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import Add from "../Add/Add";
import * as uuid from "uuid";
import DisplayList from "../DisplayList/DisplayList";

import "./List.css";
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      completedList: [],
      toggleList: false,

      todoname: ""
    };
  }

  addItem = item => {
    this.state.items.push(item);

    this.setState({ items: this.state.items });
  };

  onSort = toggleList => {
    if (toggleList) {
      this.state.completedList.sort(
        (a, b) => Date.parse(b.datetime) - Date.parse(a.datetime)
      );
      this.setState({ completedList: this.state.completedList });
    } else {
      this.state.items.sort(
        (a, b) => Date.parse(b.datetime) - Date.parse(a.datetime)
      );
      this.setState({ items: this.state.items });
    }
  };

  onDeleteTodo = (index, num, e) => {
    e.preventDefault();
    if (num === "a") {
      this.state.items.splice(index, 1);
      this.setState({
        items: this.state.items
      });
    } else {
      this.state.completedList.splice(index, 1);
      this.setState({
        completedList: this.state.completedList
      });
    }

    ToastsStore.success("Deleted Successfully!");
  };

  handleOptionChange = e => {
    let nam = e.target.name;
    let val = e.target.value;

    this.setState({
      [nam]: val
    });
  };

  reset = () => {
    var date = new Date();
    document.querySelector(".rdt input").value = date;
    this.setState({
      todoname: ""
    });
  };

  onSave = e => {
    e.preventDefault();
    var d = document.querySelector(".rdt input").value;
    if (this.state.todoname !== "") {
      let item = {
        id: uuid.v4(),
        todoname: this.state.todoname,
        datetime: d,
        status: "pending",
        done: false
      };
      this.addItem(item);
      ToastsStore.success("Added Successfully!");
      this.reset();
    } else {
      ToastsStore.error("Fields are empty");
    }
  };

  onCheck = (item, num) => {
    var items;
    if (num === 0) {
      items = [...this.state.items];
    } else {
      items = [...this.state.completedList];
    }

    var index = items.findIndex(todo => todo.id === item.id);
    items[index].done = !items[index].done;
    if (items[index].done) {
      this.state.items.splice(index, 1);
      this.state.completedList.push(items[index]);

      this.setState({
        items: this.state.items,
        completedList: this.state.completedList
      });
    } else {
      this.state.completedList.splice(index, 1);
      this.state.items.push(items[index]);

      this.setState({
        items: this.state.items,
        completedList: this.state.completedList
      });
    }
  };
  onToggle = () => {
    const toggle = document.getElementsByClassName("toggle-list")[0].checked;
    this.setState({ toggleList: toggle });
  };
  componentDidMount() {
    let items = localStorage.getItem("items");
    let completedList = localStorage.getItem("completedList");
    if (items) {
      this.setState({
        items: JSON.parse(localStorage.getItem("items"))
      });
    }
    if (completedList) {
      this.setState({
        completedList: JSON.parse(localStorage.getItem("completedList"))
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("items", JSON.stringify(this.state.items));
    localStorage.setItem(
      "completedList",
      JSON.stringify(this.state.completedList)
    );
  }

  render() {
    const { items, toggleList, completedList, todoname } = this.state;

    return (
      <div className="container mt-5">
        <ToastsContainer store={ToastsStore} />
        <div className="row justify-content-center">
          <div className="todo-container col-md-10">
            <div className="row header">
              <h2>Add Todo</h2>
            </div>
            <div className=" main">
              <div className="add-container">
                <Add
                  addItem={this.addItem}
                  items={items}
                  todoname={todoname}
                  handleOptionChange={this.handleOptionChange}
                  onSave={this.onSave}
                />
              </div>
              <div className=" list-container">
                <DisplayList
                  items={items}
                  completedList={completedList}
                  toggleList={toggleList}
                  onSort={this.onSort}
                  onDeleteTodo={this.onDeleteTodo}
                  onCheck={this.onCheck}
                  onToggle={this.onToggle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
