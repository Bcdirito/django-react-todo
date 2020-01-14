import React, {Component} from 'react';
import axios from "axios"
import CustomModal from "./components/Modal"

export default class App extends Component {
  state = {
    viewCompleted: false,
    modal: false,
    todoList: [],
    activeItem: {
      title: "",
      description: "",
      completed: false
    }
  }

  componentDidMount = () => {
    axios.get(process.env.REACT_APP_API_BASE)
    .then(res => {
      this.setState({
        ...this.state,
        todoList: res.data
      }, () => console.log(this.state))
    })
    .catch(err => console.log(err))
  }

  createItem = () => {
    this.setState({
      ...this.state,
      modal: true
    })
  }

  toggle = () => {
    this.setState({
      ...this.state,
      modal: !this.state.modal
    })
  }

  displayCompleted = (status) => {
    if (status) this.setState({viewCompleted: true})
    else this.setState({viewCompleted: false})
  }

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span onClick={() => this.displayCompleted(true)} className={this.state.viewCompleted ? "active" : ""}>Complete</span>
        <span onClick={() => this.displayCompleted(false)} className={this.state.viewCompleted ? "" : "active"}>Incomplete</span>
      </div>
    )
  }

  renderItems = () => {
    const displayItems = this.state.todoList.filter(item => {
        return item.completed === this.state.viewCompleted
    })

    return displayItems.map(item => {
      return (
        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
          <span className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`} title={item.description}>{item.title}</span>
          <span>
            <button onClick={() => this.editItem()} className="btn btn-secondary mr-2">{" "}Edit{" "}</button>
            <button onClick={() => this.handleDelete(item)} className="btn btn-danger">Delete{" "}</button>
          </span>
        </li>
      )
    })
  }

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button className="btn btn-primary" onClick={() => this.createItem()}>Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? <CustomModal activeItem={this.state.activeItem}/> : null}
      </main>
    )
  }
}

