export const errors = {
  validationError: 'Missing input fields'
};

export const handleError = (response, message, code = 422) => {
  return response.status(code).json({
    status: code,
    error: message
  });
};