
const { useEffect, useState } = React;

function useRequestQuery() {
  const [todoList, setTodoList] = useState([]);
  const [fetchingList, setFetchingList] = useState(false);
  
  async function fetchRequest(method, url) {
    const request = new Request(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return await fetch(request).then(res => res.json());
  }

  async function fetchTodoList() {
    setFetchingList(true);
    const data = await fetchRequest('GET', '/todo');
    setTodoList(data);
    setFetchingList(false);
  }

  useEffect(() => fetchTodoList(), [])

  return {
    fetchTodoList,
    fetchingList,
    todoList,
  };
}

function Todo(props) {
  const {
    completed,
    description,
    id,
    updatingList,
    user_id,
  } = props;
  const updating = updatingList === id;
  const hasCompleted = completed === "1";
  const wrapperClassName = [];

  if (hasCompleted) {
    wrapperClassName.push('success');
  }

  return (
    <tr className={wrapperClassName.join(' ')}>
      <td>{ updating ? `Updating` : user_id }</td>
      <td>
        <a href={`/todo/${id}`}>
          { description }
        </a>
      </td>
      <td>
        <form method="post" action={`/todo/delete/${ id }`}>
          <button type="submit" className="btn btn-xs btn-danger">
            <span className="glyphicon glyphicon-remove glyphicon-white" />
          </button>
        </form>
      </td>
      <td>
        { !hasCompleted &&
          <form method="post" action={`/todo/complete/${id}`}>
            <button type="submit" className="btn btn-xs btn-success">
              <span className="glyphicon glyphicon-ok glyphicon-white" />
            </button>
          </form>
        }
      </td>
    </tr>
  )
}

function TodoList() {
  const { todoList, ...restRequestProps } = useRequestQuery();

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th></th><th>Description</th><th></th><th></th>
        </tr>
      </thead>
      <tbody>
        { todoList.map(todo => (
          <Todo
            key={todo.id}
            {...todo}
            {...restRequestProps}
          />
        ))}
      </tbody>
    </table>
  )
}

ReactDOM.render(<TodoList />, document.getElementById("react-todolist"))