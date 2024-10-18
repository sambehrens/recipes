import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const initial = (): T => {
    return initialValue instanceof Function ? initialValue() : initialValue;
  };

  // Retrieve the value from local storage during initialization
  const readValue = (): T => {
    if (typeof window === "undefined") {
      return initial();
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      } else {
        const initialV = initial();
        window.localStorage.setItem(key, JSON.stringify(initialV));
        return initialV;
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initial();
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = (value: T | ((old: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
  }, [key]);

  return [storedValue, setValue] as const;
}
