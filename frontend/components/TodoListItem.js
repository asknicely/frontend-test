import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function isCompleted(infoComplete) {
  let isChecked = infoComplete === '1' ? true : false;
  return isChecked;
}

function TodoListItem(props) {
  const { list, openDeleteConfirmation, handlToggleCompleteTask } = props;

  const listItems = Object.keys(list).map(key => {
    let itemIsCompleted = isCompleted(list[key].completed);

    return (
      <CSSTransition
        classNames="todo"
        key={list[key].id}
        timeout={{ enter: 500, exit: 500 }}
      >
        <tr
          key={list[key].id}
          className={
            itemIsCompleted ? 'todo-item todo-item--completed' : 'todo-item'
          }
        >
          <td>
            <div className="form-check">
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
              ></label>
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
      </CSSTransition>
    );
  });
  return (
    <TransitionGroup component="tbody" className="todo">
      {listItems}
    </TransitionGroup>
  );
}

export default TodoListItem;
