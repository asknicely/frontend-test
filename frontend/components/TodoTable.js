import React from 'react';
import TodoListItem from './TodoListItem';
import TodoTableHeader from './TodoTableHeader';

function TodoTable(props) {
  const { title, todoList, handleDeleteTodo } = props;

  return (
    <React.Fragment>
      <h1>{title}</h1>

      <table className="table table-striped">
        <TodoTableHeader />
        <tbody>
          {todoList.length >= 1 && (
            <TodoListItem list={todoList} handleDeleteTodo={handleDeleteTodo} />
          )}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default TodoTable;
