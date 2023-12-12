// registration.test.js

const { register } = require('./registration');

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

describe('register function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a user with correct data and show success message', () => {
    register();

    expect(global.localStorage.setItem).toHaveBeenCalledWith('user', expect.any(String));
    expect(global.alert).toHaveBeenCalledWith('Registracija uspješna!\nIme: mockValue\nPrezime: mockValue\nEmail: mockValue\nAdresa: mockValue\nBroj mobitela: mockValue');
  });

  it('should display an alert if passwords do not match', () => {
    global.document.getElementById = jest.fn()
      .mockReturnValueOnce({ value: 'John' })
      .mockReturnValueOnce({ value: 'Doe' })
      .mockReturnValueOnce({ value: 'john.doe@example.com' })
      .mockReturnValueOnce({ value: '123 Main St' })
      .mockReturnValueOnce({ value: '555-1234' })
      .mockReturnValueOnce({ value: 'password123' })
      .mockReturnValueOnce({ value: 'password456' });

    register();

    expect(global.alert).toHaveBeenCalledWith('Lozinke se ne podudaraju');
  });

  it('should display an alert if any field is empty', () => {
    global.document.getElementById = jest.fn()
      .mockReturnValueOnce({ value: '' })
      .mockReturnValueOnce({ value: 'Doe' })
      .mockReturnValueOnce({ value: 'john.doe@example.com' })
      .mockReturnValueOnce({ value: '123 Main St' })
      .mockReturnValueOnce({ value: '555-1234' })
      .mockReturnValueOnce({ value: 'password123' })
      .mockReturnValueOnce({ value: 'password123' });

    register();

    expect(global.alert).toHaveBeenCalledWith('Molimo popunite sva polja.');
  });

  
});
