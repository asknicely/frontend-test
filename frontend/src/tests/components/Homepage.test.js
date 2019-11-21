import React, { useReducer } from 'react';
import { shallow, mount, render } from 'enzyme';
import Homepage from '../../components/Homepage';

import mockAxios from "axios";
jest.mock('axios');

test('should render Homepage correctly', () => {

	const mockedResponse = {
		status: 200,
		statusTxt: 'ok',
		contents: 'This is a mocked axios response for unit testing on Homepage component'
	};

	mockAxios.get.mockImplementationOnce(() =>
		Promise.resolve(mockedResponse)
	);	

	// axios.get.mockResolvedValue(mockedResponse);

	const wrapper = shallow(<Homepage />);
	expect(wrapper).toMatchSnapshot();
	
});
