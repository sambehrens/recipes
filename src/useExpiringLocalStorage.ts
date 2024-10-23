import { useState, useEffect } from "react";

type ExpiringStorageItem<T> = {
  value: T;
  expiration: number; // Unix timestamp in milliseconds
};

export function useExpiringLocalStorage<T, E>(
  key: string,
  trackedObject: E,
  initialValue: T | (() => T),
  defaultDuration: number // Default duration in milliseconds
) {
  const initial = (): T => {
    return initialValue instanceof Function ? initialValue() : initialValue;
  };

  const now = () => new Date().getTime(); // Get current time in ms

  const readValue = (): T => {
    if (typeof window === "undefined") {
      return initial();
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed: ExpiringStorageItem<T> = JSON.parse(item);

        // Check if the item has expired
        if (now() >= parsed.expiration) {
          window.localStorage.removeItem(key);
          return initial();
        }
        return parsed.value;
      } else {
        const initialV = initial();
        saveValue(initialV, now() + defaultDuration);
        return initialV;
      }
    } catch (error) {
      return initial();
    }
  };

  const [storedValue, setStoredValue] = useState(initial());

  const saveValue = (value: T, expiration: number) => {
    const item: ExpiringStorageItem<T> = { value, expiration };
    window.localStorage.setItem(key, JSON.stringify(item));
  };

  const setValue = (value: T | ((old: T) => T), duration?: number) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      const expirationTime = now() + (duration ?? defaultDuration);

      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        saveValue(valueToStore, expirationTime);
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
  }, [key, trackedObject]);

  return [storedValue, setValue] as const;
}
