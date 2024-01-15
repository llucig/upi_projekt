// tests/exampleTest.js
  
  module.exports = {
    'Test login functionality': function (browser) {
      const loginEmail = 'test@example.com';
      const loginPassword = 'password123';
      // Navigate to the login page
      browser.url('https://upi-projekt-2024.vercel.app/');
      // Fill in the login form and submit it
      browser.setValue('#loginEmail', loginEmail);
      browser.setValue('#loginPassword', loginPassword);
      browser.click('#loginForm button[type="submit"]');
      // Assert that the login was successful
      browser.waitForElementVisible('body', { timeout: 30000 });
      browser.assert.containsText('h1', 'Prijava');
      // Assert that the user is logged in and the logged-in user's name is displayed
      browser.assert.containsText('test user');
      // Log out the user
      browser.click('#logoutButton');
      // Assert that the user is logged out and redirected to the login page
      browser.assert.urlEquals('https://upi-projekt-2024.vercel.app/');
      browser.assert.elementNotPresent('#loggedInUserName');
      // Clean up registered users
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
      const updatedUsers = registeredUsers.filter(user => user.email !== loginEmail);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      // Close the browser
      browser.end();
    }
  };
  