Feature: Animation
  In order to express movement
  As a user
  I want to an element to be animated

  Scenario: basic animation
    Given I go to 'animation-demo'
    When the page loads
    Then the page should show the text 'Hinge'
  Scenario: full animations
    Given I go to 'animations'
    When the page loads
    Then the page should show the text 'Animation:'
