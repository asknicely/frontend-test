import React from 'react';
import TodoListItem from './TodoListItem';
import TodoTableHeader from './TodoTableHeader';

function TodoTable(props) {
  const {
    title,
    todoList,
    openDeleteConfirmation,
    handlToggleCompleteTask,
  } = props;

  return (
    <React.Fragment>
      <h1>{title}</h1>

      <table className="table table-striped">
        <TodoTableHeader />
        <tbody>
          {todoList.length >= 1 && (
            <TodoListItem
              list={todoList}
              openDeleteConfirmation={openDeleteConfirmation}
              handlToggleCompleteTask={handlToggleCompleteTask}
            />
          )}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default TodoTable;
