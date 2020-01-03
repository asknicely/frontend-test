'use strict';

function TodoList(props) {
  const list = props.list;
  const listItems = Object.keys(list).map(key => (
    <tr key={list[key].id}>
      <td>{list[key].id}</td>
      <td>{list[key].user_id}</td>
      <td>
        <a href={`/todo/${list[key].id}`}>{list[key].description}</a>
      </td>
      <td>
        <form method="post" action="/todo/delete/{ list[key].id }">
          <button type="submit" className="btn btn-xs btn-danger">
            <span className="glyphicon glyphicon-remove glyphicon-white"></span>
          </button>
        </form>
      </td>
    </tr>
  ));
  return listItems;
}

class TodoListApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: {},
      loading: false,
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
        this.setState({ todoList: results });
      })
      .catch(err =>
        alert('Network error, please try refreshing page manually.'),
      );
  };

  componentDidMount = () => {
    this.fetchTodoList();
  };

  render() {
    const { todoList } = this.state;

    return (
      <section
        className="col-md-8 col-md-offset-2"
        role="application"
        aria-roledescription="To Do List App"
        aria-describedby="Displays the list of tasks by user"
      >
        <h1>List of tasks</h1>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{todoList.length >= 1 && <TodoList list={todoList} />}</tbody>
          <tfoot>
            <tr>
              <td colSpan="4">
                <form
                  method="post"
                  action="/todo/add"
                  aria-label="Add a todo task"
                >
                  <label htmlFor="description">Type a new task</label>
                  <input
                    id="description"
                    type="textbox"
                    name="description"
                    className="small-6 small-center"
                    placeholder="e.g: Eat Donuts :)"
                  />
                  <button type="submit" className="btn btn-sm btn-primary">
                    Add
                  </button>
                </form>
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
    );
  }
}

let domContainer = document.querySelector('#todo-app');
ReactDOM.render(<TodoListApp />, domContainer);
