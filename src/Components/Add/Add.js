import React, { Component } from "react";
//import DateTimePicker from "react-datetime-picker";
import * as Datetime from "react-datetime";
import "./Add.css";
class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.getElementsByClassName("rdtPicker")[0].style.display = "none";
  }

  onChangeDate = () => {
    document.getElementsByClassName("rdtPicker")[0].style.display = "block";
  };

  render() {
    const { todoname, handleOptionChange, onSave } = this.props;
    return (
      <div className="input-container">
        <form
          type="submit"
          name="addTodo"
          className="AddTodo"
          onSubmit={onSave}
        >
          <input
            type="text"
            className="form-control mb-custm mt-custm"
            value={todoname}
            name="todoname"
            id="todoname"
            placeholder="Todo Name"
            onChange={handleOptionChange}
          />
          <div>
            <Datetime
              onFocus={this.onChangeDate}
              renderInput={this.renderInput}
            />
          </div>
          <br />
          <input
            type="submit"
            value="Add Todo"
            className="btn btn-warning mb-2"
          />
        </form>
      </div>
    );
  }
}

export default Add;
