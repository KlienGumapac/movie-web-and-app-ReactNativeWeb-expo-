export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateLoginForm = (email: string, password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!email.trim()) {
    errors.push('Email is required');
  } else if (!validateEmail(email)) {
    errors.push('Please enter a valid email address');
  }

  if (!password.trim()) {
    errors.push('Password is required');
  } else if (!validatePassword(password)) {
    errors.push('Password must be at least 6 characters long');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateSignUpForm = (formData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!formData.firstName.trim()) {
    errors.push('First name is required');
  } else if (formData.firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters long');
  }

  if (!formData.lastName.trim()) {
    errors.push('Last name is required');
  } else if (formData.lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters long');
  }

  if (!formData.email.trim()) {
    errors.push('Email is required');
  } else if (!validateEmail(formData.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!formData.password.trim()) {
    errors.push('Password is required');
  } else if (!validatePassword(formData.password)) {
    errors.push('Password must be at least 6 characters long');
  }

  if (!formData.confirmPassword.trim()) {
    errors.push('Please confirm your password');
  } else if (formData.password !== formData.confirmPassword) {
    errors.push('Passwords do not match');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}; 