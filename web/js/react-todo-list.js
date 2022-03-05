
const { useEffect, useState } = React;

function useRequestQuery() {
  const [todoList, setTodoList] = useState([]);
  const [fetchingList, setFetchingList] = useState(false);
  const [updatingList, setUpdatingList] = useState(null);
  
  async function fetchRequest(method, url) {
    const request = new Request(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await fetch(request).then(res => res.json());
  }

  async function fetchTodoList() {
    setFetchingList(true);
    const data = await fetchRequest('GET', '/todo');
    setTodoList(data);
    setFetchingList(false);
  }

  async function completeTodo(id) {
    setUpdatingList(id);
    const data = await fetchRequest('GET', `/todo/complete/${id}`)
    setTodoList(data);
    setUpdatingList(null);
  }

  async function deleteTodo(id) {
    setUpdatingList(id);
    const data = await fetchRequest('GET', `/todo/delete/${id}`)
    setTodoList(data);
    setUpdatingList(null);
  }

  useEffect(() => fetchTodoList(), [])

  return {
    deleteTodo,
    fetchTodoList,
    fetchingList,
    todoList,
    completeTodo,
    updatingList,
  };
}

function Todo(props) {
  const {
    completed,
    completeTodo,
    deleteTodo,
    description,
    id,
    updatingList,
  } = props;
  const updating = updatingList === id;
  const hasCompleted = completed === "1";
  const wrapperClassName = [];

  if (hasCompleted) {
    wrapperClassName.push('success');
  }

  return (
    <tr className={wrapperClassName.join(' ')}>
      <td>
        { updating ? (
          <i className="fas fa-spinner fa-spin" />
        ) : ''}
      </td>
      <td>
        <a href={`/todo/${id}`}>
          { description }
        </a>
      </td>
      <td>
        <button type="button" className="btn btn-xs btn-danger" onClick={() => deleteTodo(id)}>
          <span className="glyphicon glyphicon-remove glyphicon-white" />
        </button>
      </td>
      <td>
        { !hasCompleted &&
          <button type="button" className="btn btn-xs btn-success" onClick={() => completeTodo(id)}>
            <span className="glyphicon glyphicon-ok glyphicon-white" />
          </button>
        }
      </td>
    </tr>
  )
}

function TodoList() {
  const { todoList, fetchingList, ...restRequestProps } = useRequestQuery();

  if (fetchingList) {
    return  [...Array(5).keys()].map((number) => <div key={`skeleton-${number}`} className="skeleton-box" />);
  }

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