import { useEffect, useState } from "react";

export default function useLocalStorage(localStorageKey, initialValue) {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || initialValue
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value))
  }, [value, localStorageKey]);

  return [value, setValue]
}

