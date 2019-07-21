/// <reference types="Cypress" />

const loginUrl = '/login';
const username = 'user1';
const password = 'user1';
const wrongPassword = 'wrongPassword';

context('Login', () => {
    beforeEach(() => {
        cy.visit(loginUrl);
    });

    it('should be able to login into the system with a valid username and password', () => {
        // When the user types in the username and password and clicks Login
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();

        // The user should be in the To Dos page
        cy.url().should('contains', '/todo');

        // The user should see a logout button
        cy.get('[data-testid=logout]').then(selector => {
            cy.get(selector).should('contain', username);
        });
    });

    it('should not be able to login into the system with a invalid username and password', () => {
        // When the user types in the username and an incorrect password and clicks Login
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(wrongPassword);
        cy.get('button[type="submit"]').click();

        // The user should remain in the Login page
        cy.url().should('contains', '/login');

        // It should clear the username and password boxes
        cy.get('input[name="username"]').should('have.value', '');
        cy.get('input[name="password"]').should('have.value', '');

        // The user should still see the Login button
        cy.get('[data-testid=login]').then(selector => {
            cy.get(selector).should('contain', 'Login');
        });
    });
});
