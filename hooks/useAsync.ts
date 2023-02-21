// @ts-nocheck
import { useState, useCallback } from 'react';

type StatusTypes = 'IDLE' | 'PENDING' | 'ERROR' | 'SUCCESS';

export const useAsync = <T>() => {
  const [status, setStatus] = useState<StatusTypes>('IDLE');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<T | null>(null);

  const run = useCallback((promise: Promise<T>) => {
    setStatus('PENDING');
    if (!promise || !promise.then) {
      throw new Error(
        `The argument passed to useAsync().run must be a promise.`
      );
    }

    promise
      // @ts-expect-error
      .then(({ data }) => {
        setData(data);
        setStatus('SUCCESS');
      })
      .catch(({ data }) => {
        setError(data);
        setStatus('ERROR');
      });
  }, []);

  const setValue = useCallback(
    (val) => {
      setData(val);
    },
    [setData]
  );

  const setErrorMessage = useCallback(
    (error) => {
      setError(error);
    },
    [setError]
  );

  return {
    isSuccess: status === 'SUCCESS',
    isError: status === 'ERROR',
    isLoading: status === 'PENDING',
    isIdle: status === 'IDLE',
    data,
    error,
    run,
    setValue,
    setStatus,
    setErrorMessage,
  };
};
