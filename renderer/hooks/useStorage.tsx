import { useState, useEffect } from 'react';

export default function useStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // if (typeof window === 'undefined') {
    //   return initialValue;
    // }
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key:', key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const item = localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : initialValue);
    } catch (error) {
      console.error('Error reading localStorage key:', key, error);
    }
  }, [key]);

  const updateValue = (value: T | ((val: T) => T)) => {
    setStoredValue((prevValue) =>
      value instanceof Function ? value(prevValue) : value
    );
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(
          key,
          JSON.stringify(
            value instanceof Function ? value(storedValue) : value
          )
        );
      } catch (error) {
        console.error('Error setting localStorage key:', key, error);
      }
    }
  };

  const removeValue = () => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing localStorage key:', key, error);
      }
    }
    setStoredValue(initialValue);
  };

  return { storedValue, updateValue, removeValue };
}