import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TodoTable from '../TodoTable';
import {
  todos,
  openDeleteConfirmation,
  handlToggleCompleteTask,
} from './helpers/helpers';

const todoList = todos;
const titleListPage = 'List of tasks';

describe('TodoTable', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<TodoTable />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render TodoTable correctly', () => {
    const wrapper = shallow(
      <TodoTable
        title={titleListPage}
        todoList={todoList}
        openDeleteConfirmation={openDeleteConfirmation}
        handlToggleCompleteTask={handlToggleCompleteTask}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
