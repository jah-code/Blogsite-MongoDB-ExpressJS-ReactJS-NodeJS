import { useState, useEffect, useCallback, useRef } from "react";

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeRequests = useRef([]);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      const requestAbortCtrl = new AbortController();
      activeRequests.current.push(requestAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          //   signal: requestAbortCtrl.signal,
        });

        const result = await response.json();

        activeRequests.current = activeRequests.current.filter(
          (reqCtrl) => reqCtrl !== requestAbortCtrl
        );

        if (!response.ok) {
          throw new Error(result.message);
        }

        setIsLoading(false);
        return result;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, request, clearError };
};
