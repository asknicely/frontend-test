const { useEffect, useState } = React;

function useRequestQuery() {
  const [todoList, setTodoList] = useState([]);
  const [fetchingList, setFetchingList] = useState(false);
  const [updatingList, setUpdatingList] = useState(null);
  const [error, setError] = useState(false);
  
  async function fetchRequest(method, url) {
    const request = new Request(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setError(false);
    return await fetch(request)
      .then(res => res.json())
      .catch(() => {
        setError(true);
      });
  }

  function startUpdatingList(id) {
    setUpdatingList(id);
  }

  function finishedUpdatingList(id) {
    setUpdatingList(null);
  }

  async function fetchTodoList() {
    setFetchingList(true);
    const data = await fetchRequest('GET', '/todo');
    setTodoList(data);
    setFetchingList(false);
  }

  async function completeTodo(id) {
    startUpdatingList(id);
    const data = await fetchRequest('GET', `/todo/complete/${id}`)
    setTodoList(data);
    finishedUpdatingList(id);
  }

  async function deleteTodo(id) {
    startUpdatingList(id);
    const data = await fetchRequest('GET', `/todo/delete/${id}`)
    setTodoList(data);
    finishedUpdatingList(id);
  }

  useEffect(() => fetchTodoList(), [])

  return {
    completeTodo,
    deleteTodo,
    error,
    fetchTodoList,
    fetchingList,
    todoList,
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
  const wrapperClassName = [
    'animate__animated',
    'animate__fadeIn',
  ];

  if (hasCompleted) {
    wrapperClassName.push('success');
  }

  return (
    <tr className={wrapperClassName.join(' ')}>
      <td>
        { updating ? (
          <i className="fas fa-spinner fa-spin" />
        ) : id}
      </td>
      <td>
        <a href={`/todo/${id}`}>
          { description }
        </a>
      </td>
      <td className="todo-action">
        <button type="button" disabled={updatingList} className="btn btn-xs btn-danger" onClick={() => deleteTodo(id)}>
          <span className="glyphicon glyphicon-remove glyphicon-white" />
        </button>
      </td>
      <td className="todo-action">
        { hasCompleted ? <span className="glyphicon glyphicon-ok text-success" /> : '' }
        { !hasCompleted &&
          <button type="button" disabled={updatingList} className="btn btn-xs btn-success" onClick={() => completeTodo(id)}>
            <span className="glyphicon glyphicon-ok glyphicon-white" />
          </button>
        }
      </td>
    </tr>
  )
}

function TodoMessageRow({
  children,
  theme = "default",
}) {
  const rowClasses =[
    theme,
    `text-${theme}`,
    'text-center',
  ]

  return (
    <tr className={rowClasses.join(' ')}>
      <td colSpan={5}>
        {children}
      </td>
    </tr>
  )
}

function TodoList() {
  const { error, fetchingList, todoList, ...restRequestProps } = useRequestQuery();
  const noList = todoList && todoList.length === 0;
  const noActiveList = todoList && !noList && todoList.every(({ completed }) => completed === "1");

  if (fetchingList) {
    return  [...Array(5).keys()].map((number) => <div key={`skeleton-${number}`} className="skeleton-box" />);
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th><th>Description</th><th></th><th></th>
        </tr>
      </thead>
      <tbody>
        { error && (
          <TodoMessageRow theme="danger">
            Whoops! Something went wrong, please try again later
            {' '}
            <i className="fas fa-frown"/>
          </TodoMessageRow>
        )}
        { noList && (
          <TodoMessageRow>
            Nothing to do, let's add something to start a productive day!
          </TodoMessageRow>
        )}
        { noActiveList && (
          <TodoMessageRow>
            Great job! You have completed everything! Let's keep the momentum going.
          </TodoMessageRow>
        )}
        { todoList && todoList.map(todo => (
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