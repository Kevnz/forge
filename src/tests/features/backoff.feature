Feature: BackOff
  In order to improve resilience
  As a user
  I want to execute back off

  Scenario: go to
    Given I go to 'homepage'
    When I click the 'Back Off' link
    Then the page should show the Button 'Back Off Test'
    When I click the 'Back Off Test' Button
    Then the page should show the text 'Executed 3 times'
