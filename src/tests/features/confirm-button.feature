Feature: Confirm Button
  In order to submit a form
  As a user
  I want to go to have a dialog

  Scenario: go to
    Given I go to 'homepage'
    When I click the 'Confirm Button Example' link
    Then the page should show the Button 'Send'
    When I fill out the form
    And I click the 'Send' Button
    Then the confirm dialog should be shown