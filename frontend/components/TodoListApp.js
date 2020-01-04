import React from 'react';
import Loader from './Loader';
import TodoTable from './TodoTable';
import AddTaskForm from './AddTaskForm';
import axios from 'axios';

class TodoListApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: {},
      loading: true,
      shouldDisplayAddForm: true,
      addTaskField: '',
      addButtonIsActive: false,
    };
  }

  fetchTodoList = () => {
    fetch('/todo', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(results => {
        return results.json();
      })
      .then(results => {
        this.setState({
          todoList: results,
          loading: false,
        });
      })
      .catch(err =>
        alert('Network error, please try refreshing page manually.'),
      );
  };

  handleAddTaskSubmit = e => {
    e.preventDefault();
    console.log(this.state.addTaskField);
    let myDescription = this.state.addTaskField;

    axios
      .post(
        '/todo/add',
        {
          description: myDescription,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        console.log(response);
        this.fetchTodoList();
        this.setState({ addTaskField: '' });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChangeAddTaskField = e => {
    this.setState({ addTaskField: e.target.value });

    if (e.target.value && e.target.value.length >= 1) {
      this.setState({ addButtonIsActive: true });
    } else {
      this.setState({ addButtonIsActive: false });
    }
  };

  handleDeleteTodo = id => {
    axios
      .delete(`/todo/delete/${id}`)
      .then(response => {
        console.log(response);
        this.fetchTodoList();
      })
      .catch(error => {
        console.log(error);
      });
  };

  handlToggleCompleteTask = id => {
    axios
      .patch(`/todo/complete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log(response);
        this.fetchTodoList();
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    this.fetchTodoList();
  };

  render() {
    const {
      todoList,
      loading,
      shouldDisplayAddForm,
      addTaskField,
      addButtonIsActive,
    } = this.state;

    if (loading) {
      return <Loader />;
    }

    return (
      <section
        className="col-md-8 col-md-offset-2 u-mt--lg u-mb--lg"
        role="application"
        aria-roledescription="To-Do List App"
        aria-describedby="Displays the list of tasks by user"
      >
        <TodoTable
          title="List of tasks"
          todoList={todoList}
          handleDeleteTodo={this.handleDeleteTodo}
          handlToggleCompleteTask={this.handlToggleCompleteTask}
        />
        {shouldDisplayAddForm && (
          <AddTaskForm
            handleAddTaskSubmit={this.handleAddTaskSubmit}
            handleChangeAddTaskField={this.handleChangeAddTaskField}
            addTaskField={addTaskField}
            addButtonIsActive={addButtonIsActive}
          />
        )}
      </section>
    );
  }
}

export default TodoListApp;
