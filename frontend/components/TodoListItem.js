import React from 'react';

function isCompleted(infoComplete) {
  let isChecked = infoComplete === '1' ? true : false;
  return isChecked;
}

function TodoListItem(props) {
  const { list, openDeleteConfirmation, handlToggleCompleteTask } = props;

  const listItems = Object.keys(list).map(key => {
    let itemIsCompleted = isCompleted(list[key].completed);

    return (
      <tr
        key={list[key].id}
        className={itemIsCompleted ? 'todo-item--completed' : 'todo-item'}
      >
        <td>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`checkbox_${list[key].id}`}
              checked={itemIsCompleted}
              onChange={() => handlToggleCompleteTask(list[key].id)}
            ></input>
            <label
              className="form-check-label"
              htmlFor={`checkbox_${list[key].id}`}
            >
              {list[key].id}
            </label>
          </div>
        </td>
        <td>{list[key].user_id}</td>
        <td>
          <a href={`/todo/${list[key].id}`}>{list[key].description}</a>
        </td>
        <td>
          <button
            className="btn btn-xs btn-danger"
            onClick={() => openDeleteConfirmation(list[key].id)}
          >
            <span className="glyphicon glyphicon-remove glyphicon-white"></span>
          </button>
        </td>
      </tr>
    );
  });
  return listItems;
}

export default TodoListItem;
