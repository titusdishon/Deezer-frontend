import { AxiosError } from 'axios';

/**
 * @description Attempt to make a useful error message from the API error
 * @param {AxiosError} error The api error
 * @return {string}
 */
export const makeErrorMessage = (error: AxiosError) => {
  if (error.response?.status === 404) {
    return error.response?.data.message || 'Resource not found';
  }

  if (error.response?.status === 401) {
    return 'Invalid email or password';
  }

  if (error?.response?.data?.message) {
    return error?.response?.data?.message;
  }

  if (error?.response?.data?.errors) {
    return JSON.stringify(Object.values(error.response?.data?.errors)[0])
      .replaceAll('"', '')
      .replaceAll('[', '')
      .replaceAll(']', '');
  }

  return `${error?.message}` || 'Something went wrong';
};
