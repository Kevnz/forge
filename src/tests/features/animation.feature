Feature: Animation
  In order to express movement
  As a user
  I want to an element to be animated

  Scenario: basic animation
    Given I go to 'animation-demo'
    When the page loads
    Then the page should match the 'animation-demo' screenshot
  Scenario: basic animation
    Given I go to 'animations'
    When the page loads
    Then the page should match the 'animations' screenshot
