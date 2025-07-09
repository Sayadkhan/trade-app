import { useState, useEffect, useCallback } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const handler = useCallback(() => {
    setDebouncedValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(handler, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [handler, delay]);

  return debouncedValue;
}

export default useDebounce;
