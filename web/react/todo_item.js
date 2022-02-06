function TodoItem({ todo, completeTodo, deleteTodo }) {
    const { id, user_id, description, completed } = todo;

    return (<tr><td>{id}</td>
        <td>{user_id}</td>
        <td>
            {/* todo */}
            {/* <a href="{ app.request.baseurl }/todo/{ id }"> */}
            {description}
            {/* </a> */}
        </td>
        <td>{
            completed === "0" ?
                <button onClick={() => completeTodo(id)} title="mark as complete" type="submit" class="btn btn-xs">
                    <span class="glyphicon glyphicon-ok glyphicon-disabled"></span>
                </button>
                :
                <button title="completed" class="btn btn-xs btn-success" disabled>
                    <span class="glyphicon glyphicon-ok glyphicon-white"></span>
                </button>
        }
        </td>
        <td>
            <button onClick={() => deleteTodo(id)} type="submit" class="btn btn-xs btn-danger">
                <span class="glyphicon glyphicon-remove glyphicon-white"></span>
            </button>
        </td></tr>);
}