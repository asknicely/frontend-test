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
      <h1 className="page-title">{title}</h1>

      <table className="table">
        <TodoTableHeader />

        {todoList.length >= 1 && (
          <TodoListItem
            list={todoList}
            openDeleteConfirmation={openDeleteConfirmation}
            handlToggleCompleteTask={handlToggleCompleteTask}
          />
        )}
      </table>
    </React.Fragment>
  );
}

export default TodoTable;
