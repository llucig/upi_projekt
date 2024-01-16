module.exports = {
  'Successful Login': function (browser) {
    browser
      .url('https://upi-projekt-2024.vercel.app/')
      .waitForElementVisible('#loginForm', 15000)
      .setValue('input[name=loginEmail]', 'test@example.com')
      .setValue('input[name=loginPassword]', 'password123')
      .click('button[type=submit]')
      .pause(1000)
      .assert.urlEquals('https://upi-projekt-2024.vercel.app/login.html')
      .end();
  },

  'Unsuccessful Login': function (browser) {
    browser
      .url('https://upi-projekt-2024.vercel.app/')
      .waitForElementVisible('#loginForm', 15000)
      .setValue('input[name=loginEmail]', 'nonexistent@example.com')
      .setValue('input[name=loginPassword]', 'wrongpassword')
      .click('button[type=submit]')
      .pause(1000)
      .assert.urlEquals('https://upi-projekt-2024.vercel.app/login.html') // ili provjerite poruku o grešci
      .end();
  },
};
