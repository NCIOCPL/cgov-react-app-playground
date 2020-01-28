import { And, Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('the user visits the search page', () => {
    cy.visit('http://localhost:3000/search');
});

Then('page title {string} appears on page', (title) => {
    cy.get('h3').should('contain', title);
});

And('home page link with url {string} appears on page', (a) => {
    cy.get('a').should('have.attr', 'href');
    cy.get('a').invoke('attr','href').should('contain', a);
});

And('home page link contains text {string}', (a) => {
    cy.get('a').should('have.text',a);
});