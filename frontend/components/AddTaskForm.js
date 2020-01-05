import React from 'react';

function AddTaskForm(props) {
  const {
    handleAddTaskSubmit,
    handleChangeAddTaskField,
    addTaskField,
    addButtonIsActive,
  } = props;

  return (
    <form
      onSubmit={handleAddTaskSubmit}
      aria-label="Create a task"
      className="add-task-form"
    >
      <label htmlFor="description">Add a new todo</label>
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
  );
}

export default AddTaskForm;
