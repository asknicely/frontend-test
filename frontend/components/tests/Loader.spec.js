import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Loader from '../Loader';

describe('Loader', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<Loader />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render Loader correctly', () => {
    const wrapper = shallow(<Loader />);

    expect(wrapper).toMatchSnapshot();
  });
});
