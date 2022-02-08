// TODO Tests currently aren't working but write out the tests cases anyway - need to figure out how to get testing-library to work 😢
describe('TodoItem ', () => {
    describe('given todo item', () => {
        test('when completed is 0 then renders with mark as complete button', () => {
            // given props
            // const todo = { id: 1, user_id: 2, description: "", completed: "0" };

            // when renders
            // render(<TodoItem todo={todo} completeTodo={() => { }} deleteTodo={() => { }} />);

            // then
            // assert that todo item is rendered
            // assert that 'mark as complete' button is visible
        });

        test('when complete is 1 then renders with completed button', () => {
            // given props
            // const todo = { id: 1, user_id: 2, description: "", completed: "1" };

            // when renders
            // render(<TodoItem todo={todo} completeTodo={() => { }} deleteTodo={() => { }} />);

            // then
            // assert that todo item is rendered
            // assert that 'completed' button is visible
        })
    });

    describe('when complete is selected', () => {
        test('then marking as complete text is visible', () => {
            // given default props and render

            // when
            // here we fire off a user click event (with testing-library) on the mark as complete button 

            // then
            // assert that 'marking as complete' span is present
        });
    });
});