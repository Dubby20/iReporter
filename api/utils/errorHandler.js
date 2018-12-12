export const errors = {
  validationError: 'Fill all required fields'
};

export const handleError = (response, message, code = 422) => {
  return response.status(code).json({
    status: code,
    error: message
  });
};