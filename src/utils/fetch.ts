/* eslint-disable no-unused-vars */
import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import api from './api';
import { makeErrorMessage } from './useGracefulAPIErrorHandling';

export type ErrorType = {
    message?: string;
    statusCode?: number;
  };

  
export interface FetchResults {
  isLoading: boolean;
  isRefreshing: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: false | ErrorType;
  data: any;
}

/**
 * @description Abstract fetch logic that affects state into a reusable hook
 * @param  {string} path From whence to fetch
 * @param {string | string[]} name  Unique identifier for what's being fetched, for caching purposes
 * @param  {Objec} args extra configs

 * @return {FetchResults} State changes across the fetch cycle
 */
export default function useFetch(
  path: string,
  name: string | string[],
  args?: { [key: string]: any },
): FetchResults {
  const {
    isLoading,
    isSuccess,
    isError,
    isFetching: isRefreshing,
    data,
    error,
  } = useQuery(
    name,
    async () => {
      const res = args?.isExternalUrl
        ? await axios.get(path)
        : await api.get(path);
      return res.data;
    },
    {
      retry: (failureCount, err) => false,
      ...args,
      ...(args?.onError && {
        onError: (err: AxiosError) =>
          args.onError({
            message: makeErrorMessage(err),
            statusCode: err.response?.status,
          }),
      }),
    },
  );

  return {
    isLoading,
    isRefreshing,
    isSuccess,
    isError,
    data,
    error: {
      message: error ? makeErrorMessage(error as AxiosError) : '',
      statusCode: (error as AxiosError)?.response?.status || 0,
    },
  };
}
