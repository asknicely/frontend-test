import React from 'react';

function TodoListItem(props) {
  const { list, handleDeleteTodo } = props;

  const listItems = Object.keys(list).map(key => (
    <tr key={list[key].id}>
      <td>{list[key].id}</td>
      <td>{list[key].user_id}</td>
      <td>
        <a href={`/todo/${list[key].id}`}>{list[key].description}</a>
      </td>
      <td>
        <button
          className="btn btn-xs btn-danger"
          onClick={() => handleDeleteTodo(list[key].id)}
        >
          <span className="glyphicon glyphicon-remove glyphicon-white"></span>
        </button>
      </td>
    </tr>
  ));
  return listItems;
}

export default TodoListItem;
