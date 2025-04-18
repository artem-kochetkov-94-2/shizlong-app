export class ApiError extends Error {
  constructor(message: string) {
    super(message);
  }
}

type IsApiError = {
  errors: string[];
  message: string;
}

const isApiError = (response: unknown): response is IsApiError => {
  if ( 
    response
      && typeof response === 'object'
      && response !== null
      && ('errors' in response || 'message' in response)
  ) {
    return true;
  }

  return false;
};

export const validateResponse = (response: unknown) => {
  if (isApiError(response)) {
    throw new ApiError(response.message || response.errors[0]);
  }
};
