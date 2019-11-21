import { initial, Context, reducer } from '../../redux/app'

const initialTest = {
    username: '',
    isLoggedIn: false,
    token: ''
}

test('should match default state ', () => {
    expect(initial).toEqual(initialTest)
})

test('should get correct reducer STATE, type = DO_LOGIN', () => {

    const username = 'test-username'
    const token = 'hkgj2gJYUsnNbKDDAs8Z'

    const state = reducer(undefined, { 
        type: 'DO_LOGIN',
        username,
        token
    });

    expect(state.isLoggedIn).toBe(true)
    expect(state.username).toBe(username)
    expect(state.token).toBe(token)

})

test('should get correct reducer STATE, type = DO_LOGOUT', () => {

    const username = ''
    const token = ''

    const state = reducer(undefined, { 
        type: 'DO_LOGOUT',
        username,
        token
    });

    expect(state.isLoggedIn).toBe(false)
    expect(state.username).toBe(username)
    expect(state.token).toBe(token)

})