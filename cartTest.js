module.exports = {
    'Testiranje kartičnog plaćanja': function (browser) {
      browser
        .url('https://upi-projekt-2024.vercel.app/cart.html') // Zamijenite s pravim URL-om
        .waitForElementVisible('#cardPayment', 5000) // Čeka vidljivost opcije za kartično plaćanje
  
        // Testiranje uspješne kartične transakcije
        .click('#cardPayment')
        .setValue('#cardOwnerName', 'Ime Prezime')
        .setValue('#cardNumber', '4111111111111111') // Validan broj kartice
        .setValue('#cardExpiration', '1223') // Datum isteka u budućnosti (MMYY)
        .setValue('#cardCVC', '123') // Validan CVC
        .click('#narucivanje')
        
        // Čeka da se pojavi potvrda narudžbe
        .waitForElementVisible('body', 500000)
        .assert.containsText('body', 'Narudžba izvršena!') // Provjerite poruku o uspješnoj narudžbi
  
        // Dodajte više scenarija prema potrebi
  
        .end(); // Završite test
    }
  };
  module.exports = {
    'Testiranje neuspješnih kartičnih transakcija': function (browser) {
      browser
        .url('https://upi-projekt-2024.vercel.app/cart.html') // Zamijenite s pravim URL-om
        .waitForElementVisible('#cardPayment', 5000) // Čeka vidljivost opcije za kartično plaćanje
  
        // Testiranje neuspješne transakcije s krivim brojem kartice
        .click('#cardPayment')
        .setValue('#cardOwnerName', 'Ime Prezime')
        .setValue('#cardNumber', '12345678901234567') // Neispravan broj kartice
        .setValue('#cardExpiration', '1224')
        .setValue('#cardCVC', '123')
        .click('#narucivanje')
        .waitForElementVisible('body', 5000)
        // Provjerite poruku o grešci
  
        // Testiranje neuspješne transakcije s krivim CVC
        .click('#cardPayment')
        .setValue('#cardOwnerName', 'Ime Prezime')
        .setValue('#cardNumber', '4111111111111111')
        .setValue('#cardExpiration', '1223')
        .setValue('#cardCVC', '000') // Neispravan CVC
        .click('#narucivanje')
        .waitForElementVisible('body', 5000)
         // Provjerite poruku o grešci
  
        // Testiranje neuspješne transakcije s isteklom karticom
        .click('#cardPayment')
        .setValue('#cardOwnerName', 'Ime Prezime')
        .setValue('#cardNumber', '4111111111111111')
        .setValue('#cardExpiration', '0100') // Prošli datum isteka kartice
        .setValue('#cardCVC', '123')
        .click('#narucivanje')
        .waitForElementVisible('body', 5000)
        // Provjerite poruku o grešci
  
        .end(); // Završite test
    }
  };
  