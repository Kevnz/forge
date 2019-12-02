Feature: Home Page
  In order to use the site
  As a user
  I want to go to home page

  Scenario: Visit Homepage
    Given I go to 'homepage'
    When the page loads
    Then the page should show 'Make Things'
    And the page should match the 'homepage' screenshot
