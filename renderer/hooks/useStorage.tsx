import { useState, useEffect } from 'react';

function useStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key:', key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error setting localStorage key:', key, error);
    }
  }, [key, storedValue]);

  const updateValue = (value: T | ((val: T) => T)) => {
    setStoredValue((prevValue) =>
      value instanceof Function ? value(prevValue) : value
    );
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error('Error removing localStorage key:', key, error);
    }
  };

  return { storedValue, updateValue, removeValue };
}

export default useStorage;