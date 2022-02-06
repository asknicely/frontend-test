'use strict';

const e = React.createElement;

// TODO: Refactor with axios interceptor so we don't have to repeat definition of headers 
const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  data: {}
};

function TodoList() {
  const [todos, setTodos] = React.useState();

  React.useEffect(() => {
    const todos = async () => {
      const response = await axios.get("/todo", headers);
      setTodos(response.data);
    }
    todos();
  }, []);

  const completeTodo = async (id) => {
    const { data } = await axios.post(`/todo/complete/${id}`, {}, headers);
    if (data.success) {
      setTodos(todos.map((t) => t.id === id ? ({ ...t, completed: '1' }) : t));
    }
  }

  const deleteTodo = async (id) => {
    const { data } = await axios.post(`/todo/delete/${id}`, {}, headers);

    if (data.success) {
      setTodos(todos.filter(t => t.id !== id));
    }
  }

  return !todos ? <div class="loader" /> :
    (<React.Fragment><h1>Todo List:</h1><table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Description</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {todos.map((t) => { return <TodoItem todo={t} completeTodo={completeTodo} deleteTodo={deleteTodo} /> })}
      </tbody>
    </table></React.Fragment>
    );
}

const domContainer = document.querySelector('#todo_list');
ReactDOM.render(e(TodoList), domContainer);