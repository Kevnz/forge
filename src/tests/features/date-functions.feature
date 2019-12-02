Feature: Date Packages
  In order to verify date modules
  As a user
  I want to go to see the results of them

  Scenario: View Date Results
    Given I go to 'dates'
    When the page loads
    Then the page should match the 'dates' screenshot






