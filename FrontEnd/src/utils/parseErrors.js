export const parseErrors = (err) => {
  // check if the error is a validation error
  if (err?.response?.data?.error?.name === 'ValidationError') {
    return {
      message: err?.response?.data?.error?.message,
      details: err?.response?.data?.error?.details?.errors,
    };
  }

  if (err?.message === 'Network Error') {
    return {
      message: ' Unable to connect to the server endpoint provided',
      details: [],
    };
  }

  if (err?.response?.data?.error?.details?.name === 'ForbiddenError') {
    return {
      message: 'You do not have access to this page',
      details: [],
    };
  }

  return {
    message: 'Oops an error occured :(  ',
    details: [],
  };
};
