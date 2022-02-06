function TodoItem({ todo }) {
    const { id, user_id, description, completed } = todo;

    return (<tr><td>{id}</td>
        <td>{user_id}</td>
        <td>
            {/* <a href="{ app.request.baseurl }/todo/{ id }"> */}
            {description}
            {/* </a> */}
        </td>
        <td>{
            completed === "1" ?
                <form
                    method="post"
                // action="{ app.request.baseurl }/todo/complete/{ id }"
                >
                    <button title="mark as complete" type="submit" class="btn btn-xs">
                        <span class="glyphicon glyphicon-ok glyphicon-white"></span>
                    </button>
                </form> :
                <button title="completed" class="btn btn-xs btn-success">
                    <span class="glyphicon glyphicon-ok glyphicon-white"></span>
                </button>
        }
        </td>
        <td>
            <form
                method="post"
            // action="{ app.request.baseurl }/todo/delete/{ id }"
            >
                <button type="submit" class="btn btn-xs btn-danger">
                    <span class="glyphicon glyphicon-remove glyphicon-white"></span>
                </button>
            </form>
        </td></tr>);
}