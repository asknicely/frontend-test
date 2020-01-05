import React from 'react';
import Loader from './Loader';
import TodoTable from './TodoTable';
import AddTaskForm from './AddTaskForm';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

class TodoListApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: {},
      loading: true,
      shouldDisplayAddForm: true,
      addTaskField: '',
      addButtonIsActive: false,
      isCompletedListDisplayed: true,
      urlId: null,
      visibleAlert: false,
      itemToBeDeleted: null,
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
        // console.log(results);
        this.setState({
          todoList: results,
          loading: false,
        });
      })
      .catch(err =>
        alert('Network error, please try refreshing page manually.'),
      );
  };

  fetchTodoListItem = id => {
    fetch(`/todo/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(results => {
        return results.json();
      })
      .then(results => {
        // console.log(results);
        this.setState({
          todoList: [results],
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

  openDeleteConfirmation = id => {
    this.setState({
      visibleAlert: true,
      itemToBeDeleted: id,
    });
  };

  closeDeleteConfirmation = () => {
    this.setState({ visibleAlert: false });
  };

  handleDeleteTodo = () => {
    let id = this.state.itemToBeDeleted;

    axios
      .delete(`/todo/delete/${id}`)
      .then(response => {
        console.log(response);
        this.fetchListBasedOnURL();
        this.setState({ visibleAlert: false });
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
        this.fetchListBasedOnURL();
      })
      .catch(error => {
        console.log(error);
      });
  };

  fetchListBasedOnURL = () => {
    const { isCompletedListDisplayed, urlId } = this.state;

    isCompletedListDisplayed
      ? this.fetchTodoList()
      : this.fetchTodoListItem(urlId);
  };

  populateTodoItemPage = () => {
    let pathName = document.location.pathname;
    let pathArray = window.location.pathname.split('/');
    let urlId = pathArray[2] ? pathArray[2] : null;

    // Apply specific changes for /todo/item page
    if (
      pathName.indexOf('/todo/') == 0 &&
      pathName.length > 6 &&
      urlId !== null
    ) {
      this.fetchTodoListItem(urlId);

      this.setState({
        shouldDisplayAddForm: false,
        isCompletedListDisplayed: false,
        urlId: urlId,
      });
    }
  };

  componentDidMount() {
    this.fetchListBasedOnURL();
    this.populateTodoItemPage();
  }

  render() {
    const {
      todoList,
      loading,
      shouldDisplayAddForm,
      addTaskField,
      addButtonIsActive,
      visibleAlert,
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
          openDeleteConfirmation={this.openDeleteConfirmation}
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
        {visibleAlert && (
          <SweetAlert
            danger
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            onConfirm={this.handleDeleteTodo}
            onCancel={this.closeDeleteConfirmation}
            focusCancelBtn
          >
            You will not be able to recover this todo item later!
          </SweetAlert>
        )}
      </section>
    );
  }
}

export default TodoListApp;
