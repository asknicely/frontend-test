import React from 'react';
import Loader from './Loader';
import TodoTable from './TodoTable';
import AddTaskForm from './AddTaskForm';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';

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
      listOfCompletedItems: [],
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
        this.updateCompletedList(results);
      })
      .catch(err =>
        toast.error('👎 Network error, please try refreshing page manually.'),
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
        let finalResults = [results];
        this.setState({
          todoList: finalResults,
          loading: false,
        });
        this.updateCompletedList(finalResults);
      })
      .catch(err =>
        toast.error('👎 Network error, please try refreshing page manually.'),
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

        toast.success('👍 You added a new TODO!');
      })
      .catch(error => {
        console.log(error);
        toast.error('👎 Sorry, an error occurred!');
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
        toast.success('👍 TODO deleted!');
      })
      .catch(error => {
        console.log(error);
        toast.error('👎 Sorry, an error occurred!');
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
        let isAlreadyCompleted = this.state.listOfCompletedItems.find(
          item => item === id,
        );
        console.log(isAlreadyCompleted);
        if (isAlreadyCompleted) {
          toast.info('TODO undone!');
        } else {
          toast.success('TODO completed!');
        }
      })
      .catch(error => {
        console.log(error);
        toast.error('👎 Sorry, an error occurred!');
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

  updateCompletedList = todoList => {
    let listItemsIds = Object.keys(todoList).map(key => {
      if (todoList[key].completed === '1') {
        return todoList[key].id;
      }
    });

    let finalList = listItemsIds.filter(item => item !== undefined);

    this.setState({ listOfCompletedItems: finalList });
  };

  componentDidMount(prevState) {
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
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </section>
    );
  }
}

export default TodoListApp;
