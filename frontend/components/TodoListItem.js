import React from 'react';

function TodoListItem(props) {
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

export default TodoListItem;
