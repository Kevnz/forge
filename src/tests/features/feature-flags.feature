Feature: FeatureFlags
  In order to deliver faster
  As a user
  I want to enable feature flags

  Scenario: go to
    Given I go to 'flags'
    When the page loads
    Then the page should show the text 'Feature Flag: true'
    And the page should show the text 'Disabled Flag: false'
    And the page should show the text 'Enabled Flag: true'
    And the page should match the 'flags' screenshot


