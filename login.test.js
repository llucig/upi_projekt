// login.test.js

const { login } = require('./login');

// Mock-ujemo globalni objekat `document` i funkciju `getElementById`
global.document = {
  getElementById: jest.fn((id) => ({ value: 'mockValue' })),
};

// Mock-ujemo globalni objekat `localStorage`
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

// Mock-ujemo alert funkciju
global.alert = jest.fn();

describe('login function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log in a user with correct credentials and show success message', () => {
    // Postavljamo mock podatke u lokalnu pohranu
    const mockUser = {
      email: 'test@example.com',
      password: 'testPassword',
    };
    global.localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockUser));

    login('test@example.com', 'testPassword');

    expect(global.alert).toHaveBeenCalledWith('Uspješna prijava!');
  });

  it('should alert if there is no registered user', () => {
    // Simuliramo situaciju gdje nema registriranog korisnika
    global.localStorage.getItem.mockReturnValueOnce(null);

    login();

    expect(global.alert).toHaveBeenCalledWith('Nema registriranog korisnika. Molimo, registrirajte se.');
  });

  it('should alert if login credentials are incorrect', () => {
    // Postavljamo mock podatke u lokalnu pohranu
    const mockUser = {
      email: 'test@example.com',
      password: 'testPassword',
    };
    global.localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockUser));

    login('test@example.com', 'incorrectPassword');

    expect(global.alert).toHaveBeenCalledWith('Neuspješna prijava. Provjerite svoje podatke.');
  });
});
