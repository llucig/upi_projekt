// tests/exampleTest.js

module.exports = {
    'My first Nightwatch test': function (browser) {
      browser
        .url('https://upi-projekt-2024.vercel.app/')
        .waitForElementVisible('body')
        .assert.title('Restoran Stranica')
        .assert.visible('input[type="text"]')
        .setValue('input[type="text"]', 'nightwatch')
        .click('input[type="submit"]')
        .waitForElementVisible('#main')
        .assert.containsText('#main', 'Nightwatch')
        .end();
    },
  };