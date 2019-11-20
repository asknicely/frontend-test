import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(axios);

test('is homepage working', async () => {

    const url = `${process.env.REACT_APP_BACKEND_URL}`
    const response = await axios.get(url)
    console.log(response)
    expect(addition(2, 2)).toBe(4)
})

