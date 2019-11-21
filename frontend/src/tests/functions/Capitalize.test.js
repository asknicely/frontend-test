import capitalize from '../../functions/Capitalize'

test('function capitalize', () => {
    const input = 'hello santa is coming to Town'
    const output = 'Hello santa is coming to Town'
    expect(capitalize(input)).toBe(output)
})

