import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function isCompleted(infoComplete) {
  let isChecked = infoComplete === '1' ? true : false;
  return isChecked;
}

function TodoListItem(props) {
  const { list, openDeleteConfirmation, handlToggleCompleteTask } = props;

  if (list) {
    const listItems = list.map(key => {
      let itemIsCompleted = isCompleted(key.completed);

      return (
        <CSSTransition
          classNames="todo"
          key={key.id}
          timeout={{ enter: 500, exit: 500 }}
        >
          <tr
            key={key.id}
            className={
              itemIsCompleted ? 'todo-item todo-item--completed' : 'todo-item'
            }
          >
            <td>
              <div
                className="form-check"
                data-tip={
                  itemIsCompleted
                    ? 'Uncheck to undo a task'
                    : 'Check to complete a task'
                }
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`checkbox_${key.id}`}
                  checked={itemIsCompleted}
                  onChange={() => handlToggleCompleteTask(key.id)}
                ></input>
                <label
                  className="form-check-label"
                  htmlFor={`checkbox_${key.id}`}
                ></label>
              </div>
            </td>
            <td>{key.user_id}</td>
            <td>
              <a href={`/todo/${key.id}`}>{key.description}</a>
            </td>
            <td>
              <button
                className="btn btn-xs btn-danger"
                onClick={() => openDeleteConfirmation(key.id)}
                data-tip="Delete"
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

  return null;
}

export default TodoListItem;
