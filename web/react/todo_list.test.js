// TODO Tests currently aren't working but write out the tests cases anyway - need to figure out how to get testing-library to work 😢
describe('TodoList ', () => {
    describe('given todo list with 3 items', () => {
        test('renders', () => {
            // given props

            // when renders

            // then expect the length of the list of items rendered to be 3
        });

        // Here we can write an integration test
        describe('when todo is deleted', () => {
            test('then list of items is 2', () => {
                // given props

                // when renders

                // then expect the length of the list of items rendered to be 2
            })
        });

        describe('when todo is marked as completed', () => {
            test('then list of items with completed = 1 has length 1', () => {
                // given props

                // when renders

                // then expect the length of the completed list of items rendered to be 1
            })
        })
    });
});