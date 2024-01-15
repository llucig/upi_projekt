module.exports = {
    'Registration Form Validation': function (browser) {
      browser
        .url('https://upi-projekt-2024.vercel.app/registration.html') 
        .waitForElementVisible('#registrationForm', 1000)
        .setValue('input[name=firstName]', 'John')
        .setValue('input[name=lastName]', 'Doe')
        .setValue('input[name=address]', '123 Main Street')
        .setValue('input[name=email]', 'john.doe@example.com')
        .setValue('input[name=phoneNumber]', '123456789')
        .setValue('input[name=password]', 'password123')
        .setValue('input[name=confirmPassword]', 'password123')
        .click('button[type=submit]')
        .pause(1000) 
        .end();
    },
  
    // tests/registrationTest.js

    'Invalid Registration Form Submission': function (browser) {
        browser
          .url('https://upi-projekt-2024.vercel.app/registration.html') 
          .waitForElementVisible('#registrationForm', 1000)
          .setValue('input[name=firstName]', 'Invalid')
          .setValue('input[name=lastName]', 'User')
          .click('button[type=submit]')
          .pause(1000)
          .execute(function() {
            console.log('Checking for alert presence...');
            return window.confirmationAlertPresent = window.confirmationAlertPresent || window.confirm("Is alert present?");
          }, [], function(result) {
            console.log('Result:', result.value);
            if (result.value) {
              console.log('Alert present. Accepting alert...');
              browser.acceptAlert(); 
            } else {
              console.warn('Alert not present.');
            }
          })
          .end();
    },
  };
  

  