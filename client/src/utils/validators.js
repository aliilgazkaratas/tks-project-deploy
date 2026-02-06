export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const isValidPassword = (password) => {
  return password.length >= 6;
};

// Validate password match
export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

// Validate required field
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

// Validate minimum length
export const minLength = (value, length) => {
  return value.length >= length;
};

// Validate maximum length
export const maxLength = (value, length) => {
  return value.length <= length;
};

// Validate number range
export const inRange = (value, min, max) => {
  const num = Number(value);
  return num >= min && num <= max;
};

// Validate URL format
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Get validation errors
export const getValidationErrors = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const value = formData[field];
    const fieldRules = rules[field];

    if (fieldRules.required && !isRequired(value)) {
      errors[field] = `${field} is required`;
    } else if (fieldRules.email && !isValidEmail(value)) {
      errors[field] = 'Invalid email format';
    } else if (fieldRules.password && !isValidPassword(value)) {
      errors[field] = 'Password must be at least 6 characters';
    } else if (fieldRules.minLength && !minLength(value, fieldRules.minLength)) {
      errors[field] = `Must be at least ${fieldRules.minLength} characters`;
    } else if (fieldRules.maxLength && !maxLength(value, fieldRules.maxLength)) {
      errors[field] = `Must be no more than ${fieldRules.maxLength} characters`;
    } else if (fieldRules.match && value !== formData[fieldRules.match]) {
      errors[field] = `${field} must match ${fieldRules.match}`;
    }
  });

  return errors;
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};