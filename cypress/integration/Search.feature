Feature: Search Page
  Search page
  
  @focus
  Scenario: The search page loads
    Given the user visits the search page
    Then page title is "NCI Dictionary of Cancer Terms"
    And home page link with url "/" appears on page
    And home page link contains text "Home page"
