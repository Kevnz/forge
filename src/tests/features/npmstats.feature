Feature: NPM Stats
  In order to view npm downloads
  As a user
  I want to go to see an overview of downloads for my modules

  Scenario: View Stats
    Given I go to 'stats'
    When the page loads
    Then the page should display the correct totals

  Scenario: View Stat Tracking
    Given I go to 'tracking'
    When the page loads
    Then the page should match the 'tracking' screenshot




