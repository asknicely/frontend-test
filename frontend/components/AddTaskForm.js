import React from 'react';

function AddTaskForm(props) {
  const {
    handleAddTaskSubmit,
    handleChangeAddTaskField,
    addTaskField,
    addButtonIsActive,
  } = props;

  return (
    <div>
      <form onSubmit={handleAddTaskSubmit} aria-label="Add a todo task">
        <label htmlFor="description">Type a new task</label>
        <input
          id="description"
          type="textbox"
          name="description"
          className="small-6 small-center"
          placeholder="e.g: Eat Donuts :)"
          value={addTaskField}
          onChange={handleChangeAddTaskField}
        />
        <button
          type="submit"
          className="btn btn-sm btn-primary"
          disabled={!addButtonIsActive}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddTaskForm;
