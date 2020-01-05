import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TodoTableHeader from '../TodoTableHeader';

describe('TodoTableHeader', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<TodoTableHeader />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render TodoTableHeader correctly', () => {
    const wrapper = shallow(<TodoTableHeader />);

    expect(wrapper).toMatchSnapshot();
  });
});
