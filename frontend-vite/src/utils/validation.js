export const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

export const validateZipCode = (zipCode) => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

export const validateFirstName = (name) => {
  return name.trim().length >= 2;
};

export const validateLastName = (name) => {
  return name.trim().length >= 2;
};

export const validateAddress = (address) => {
  return address.trim().length >= 5;
};

export const validateCity = (city) => {
  return city.trim().length >= 2;
};

export const validateState = (state) => {
  return state.trim().length >= 2;
};

export const validateDateOfBirth = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return false;
  
  const age = new Date().getFullYear() - date.getFullYear();
  const monthDiff = new Date().getMonth() - date.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < date.getDate())) {
    return age - 1 >= 18;
  }
  return age >= 18;
};

export const validateGender = (gender) => {
  return ['Male', 'Female', 'Other'].includes(gender);
};

export const validateProfilePicture = (file) => {
  if (!file) return true; // Profile picture is optional
  
  // Check file type
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    return 'Invalid file type. Please upload an image (JPEG, PNG, GIF)';
  }
  
  // Check file size (5MB max)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return 'Image size should be less than 5MB';
  }
  
  return true;
};

export const validateForm = (formData) => {
  const errors = {};

  if (!validateFirstName(formData.firstName)) {
    errors.firstName = 'First name must be at least 2 characters long';
  }

  if (!validateLastName(formData.lastName)) {
    errors.lastName = 'Last name must be at least 2 characters long';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validatePhoneNumber(formData.phoneNumber)) {
    errors.phoneNumber = 'Phone number must be exactly 10 digits';
  }

  if (!validateAddress(formData.address)) {
    errors.address = 'Address must be at least 5 characters long';
  }

  if (!validateCity(formData.city)) {
    errors.city = 'City must be at least 2 characters long';
  }

  if (!validateState(formData.state)) {
    errors.state = 'State must be at least 2 characters long';
  }

  if (!validateZipCode(formData.zipCode)) {
    errors.zipCode = 'Zip code must be valid (e.g., 12345 or 12345-6789)';
  }

  if (!formData.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else if (!validateDateOfBirth(formData.dateOfBirth)) {
    errors.dateOfBirth = 'You must be at least 18 years old';
  }
  
  // Validate gender
  if (!formData.gender) {
    errors.gender = 'Gender is required';
  } else if (!validateGender(formData.gender)) {
    errors.gender = 'Please select a valid gender';
  }
  
  // Validate profile picture if it's a File object (optional)
  if (formData.profile && formData.profile instanceof File) {
    const profileValidation = validateProfilePicture(formData.profile);
    if (profileValidation !== true) {
      errors.profile = profileValidation;
    }
  }

  return errors;
};
