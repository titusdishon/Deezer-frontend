import { AxiosError } from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

/**
 * @description Intercept API errors and redirect to auth if
 * error is unauthorised error
 * @param {AxiosError} error
 */
export const useRedirectOnUnauthorised = (
  error: any,
  path: string,
  onFailure?: Function,
) => {
  const history = useHistory();
  const location = useLocation();
  if (
    !path.includes('auth/get-my-detail-after-login') &&
    error &&
    (error as AxiosError)?.response?.status === 401
  ) {
    const newLocation = {
      pathname: '/',
      state: { from: location },
    };
    history.push(newLocation);
    return;
  }
  if (error && (error as AxiosError)?.response?.status === 403) {
    const newLocation = {
      pathname: '/access-denied',
      state: { from: location },
    };
    history.push(newLocation);
    return;
  }
  onFailure &&
    onFailure({
      message: makeErrorMessage(error),
      statusCode: error.response?.status,
    });
};

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
