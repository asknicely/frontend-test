import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import AddTaskForm from '../AddTaskForm';
import {
  handleChangeAddTaskField,
  handleAddTaskSubmit,
} from './helpers/helpers';

const addButtonIsActive = true;
const addTaskField = 'test';

describe('AddTaskForm', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<AddTaskForm />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render AddTaskForm correctly', () => {
    const wrapper = shallow(
      <AddTaskForm
        handleAddTaskSubmit={handleAddTaskSubmit}
        handleChangeAddTaskField={handleChangeAddTaskField}
        addTaskField={addTaskField}
        addButtonIsActive={addButtonIsActive}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
