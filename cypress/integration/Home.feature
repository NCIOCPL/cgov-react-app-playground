Feature: Home Page
  There is a home page

  @focus
  Scenario: The home page will load
    Given the user visits the home page
    Then page title is "NCI Dictionary of Cancer Terms"
    And search link with url "/search" appears on page
    And search link contains text "Search page"
