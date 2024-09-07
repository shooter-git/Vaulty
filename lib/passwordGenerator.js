const crypto = typeof window === 'undefined' ? require('crypto') : window.crypto;

const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function getRandomInt(max) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

export function generatePassword(length = 16, includeNumbers = true, includeSymbols = true) {
  let chars = lowercase + uppercase;
  if (includeNumbers) chars += numbers;
  if (includeSymbols) chars += symbols;

  let password = '';
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < length; i++) {
    password += chars[randomValues[i] % chars.length];
  }

  // Ensure the password contains at least one character from each selected category
  const categories = [lowercase, uppercase];
  if (includeNumbers) categories.push(numbers);
  if (includeSymbols) categories.push(symbols);

  categories.forEach(category => {
    if (!password.split('').some(char => category.includes(char))) {
      const randomPosition = getRandomInt(length);
      const randomChar = category[getRandomInt(category.length)];
      password = password.substring(0, randomPosition) + randomChar + password.substring(randomPosition + 1);
    }
  });

  return password;
}

export function checkPasswordStrength(password) {
  let strength = 0;
  const checks = [
    { regex: /[a-z]/, score: 1 },
    { regex: /[A-Z]/, score: 1 },
    { regex: /[0-9]/, score: 1 },
    { regex: /[^a-zA-Z0-9]/, score: 1 },
    { regex: /.{8,}/, score: 1 },
    { regex: /.{12,}/, score: 1 },
    { regex: /.{16,}/, score: 1 }
  ];

  checks.forEach(check => {
    if (check.regex.test(password)) {
      strength += check.score;
    }
  });

  if (strength < 3) return 'Weak';
  if (strength < 5) return 'Medium';
  if (strength < 7) return 'Strong';
  return 'Very Strong';
}