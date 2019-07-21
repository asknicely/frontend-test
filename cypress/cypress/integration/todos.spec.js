/// <reference types="Cypress" />

const toDosUrl = '/todo';
const username = 'user1';
const password = 'user1';
const descriptionToEnter = 'Cypress testing!';

context('To Dos', () => {
    beforeEach(() => {
        // Login
        cy.login(username, password);
        cy.visit(toDosUrl);
    });

    it('should be able to create a to do', () => {
        cy.server();
        cy.route({ url: '/todo/add', method: 'POST' }).as('addToDo');

        // When the user types in a new to do and presses enter (to submit the form)
        cy.get('input[name="description"]')
            .type(descriptionToEnter)
            .type('{enter}');

        // It should appear on the page as the bottom-most element
        cy.get('[data-testid="toDoList"]>li')
            .eq(-1)
            .within(selector => {
                cy.get(selector).should('contain', descriptionToEnter);
            });

        cy.wait('@addToDo')
            .should('exist')
            .as('networkCall');
    });

    it('should be able to mark a todo as complete', () => {
        cy.server();
        cy.route({ url: `/todo/complete/*`, method: 'PUT' }).as('completeToDo');

        cy.get('[data-testid="toDoList"]>li')
            .eq(-1)
            .within(selector => {
                // Find the correct one to manipulate (the one created in the previous test)
                cy.get(selector).should('contain', descriptionToEnter);
                cy.get('[data-testid="todos-checkbox"]').click();

                // The text should be crossed out and the opacity should be reduced
                cy.get(selector).should('have.css', 'text-decoration', 'line-through solid rgb(33, 37, 41)');
                cy.get(selector).should('have.css', 'filter', 'opacity(0.5)');
            });

        cy.wait('@completeToDo').should('exist');
    });

    it('toggling to only show non-complete items should not show the completed item', () => {
        cy.get('[data-testid="todos-toggleHideCompleted"]').click();

        // It should not be there anymore
        cy.get('[data-testid="toDoList"]>li')
            .contains(descriptionToEnter)
            .should('not.exist');

        // Click it again
        cy.get('[data-testid="todos-toggleHideCompleted"]').click();

        // It should reappear
        cy.get('[data-testid="toDoList"]>li')
            .contains(descriptionToEnter)
            .should('exist');
    });

    it('should be able to delete a todo', () => {
        cy.server();
        cy.route({ url: `/todo/delete/*`, method: 'PUT' }).as('deleteToDo');

        cy.get('[data-testid="toDoList"]>li')
            .eq(-1)
            .within(selector => {
                // Find the correct one to manipulate (the one created in the previous test)
                cy.get(selector).should('contain', descriptionToEnter);
                cy.get('[data-testid="todos-deleteButton"]').click();
            });

        // It should not be there anymore
        cy.get('[data-testid="toDoList"]>li')
            .contains(descriptionToEnter)
            .should('not.exist');

        cy.wait('@deleteToDo').should('exist');
    });
});
