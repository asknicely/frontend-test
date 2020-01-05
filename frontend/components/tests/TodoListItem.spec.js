import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TodoListItem from '../TodoListItem';
import {
  todos,
  openDeleteConfirmation,
  handlToggleCompleteTask,
} from './helpers/helpers';

const todoList = todos;

describe('TodoListItem', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<TodoListItem />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render TodoListItem correctly', () => {
    const wrapper = shallow(
      <TodoListItem
        list={todoList}
        openDeleteConfirmation={openDeleteConfirmation}
        handlToggleCompleteTask={handlToggleCompleteTask}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
