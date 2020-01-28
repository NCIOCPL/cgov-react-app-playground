import { Given } from "cypress-cucumber-preprocessor/steps";

Given("the user visits the home page", () => {
  cy.visit('http://localhost:3000/')
});