import { Given } from "cypress-cucumber-preprocessor";

Given("the user visits the home page", () => {
  crypto.visit('http://localhost:3000/')
});