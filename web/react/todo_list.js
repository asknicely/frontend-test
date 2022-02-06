'use strict';

const e = React.createElement;

function TodoList() {
  const [todos, setTodos] = React.useState();

  React.useEffect(() => {
    const todos = async () => {
      const response = await axios.get("/todo", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: {}
      });
      setTodos(response.data);
    }
    todos();
  }, []);

  return !todos ? <div>Loading todos</div> :
    (<React.Fragment><table class="table table-striped">
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
        {todos.map((t) => { return <TodoItem todo={t} /> })}
      </tbody>
    </table></React.Fragment>
    );

}

const domContainer = document.querySelector('#todo_list');
ReactDOM.render(e(TodoList), domContainer);