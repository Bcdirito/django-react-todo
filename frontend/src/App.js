import React, {Component} from 'react';
import CustomModal from "./components/Modal"

const {getRequest, postPatchRequest, deleteRequest} = require("./utils/apiCalls").default

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
    getRequest(this.loadList)
  }

  resetState = () => {
    this.setState({
      ...this.state,
      modal: false,
      activeItem: {
        id: 0,
        title: "",
        description: "",
        completed: false
      }
    })
  }

  loadList = (list) => {
    this.setState({
      ...this.state,
      todoList: list
    })
  }

  addToList = (item) => {
    this.setState({
      ...this.state,
      todoList: [...this.state.todoList, item]
    })
  }

  createItem = () => {
    this.setState({
      ...this.state,
      modal: true
    })
  }

  editItem = (item) => {
    debugger
    this.setState({
      ...this.state,
      modal: true,
      activeItem: {

      }
    })
  }

  toggle = () => {
    this.setState({
      ...this.state,
      modal: !this.state.modal
    })
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      activeItem: {
        ...this.state.activeItem,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    postPatchRequest(this.state.activeItem, this.addToList)
    this.resetState()
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
            <button onClick={() => this.editItem(item)} className="btn btn-secondary mr-2">{" "}Edit{" "}</button>
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
        {this.state.modal ? <CustomModal activeItem={this.state.activeItem} changeHandler={this.handleChange} submitHandler={this.handleSubmit}/> : null}
      </main>
    )
  }
}

