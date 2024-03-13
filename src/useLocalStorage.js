import { useSyncExternalStore } from "react";

const subscribe = (sbs) => {
  window.addEventListener("storage", sbs);
  return () => window.removeEventListener("storage", sbs);
};

const getSnapShot = (key) => localStorage.getItem(key);

export const UseLocalStorage = (lsKey, defaultValue) => {
  const state = useSyncExternalStore(
    (sbs) => subscribe(sbs),
    () => getSnapShot(lsKey)
  );

  const setState = (newState) => {
    window.localStorage.setItem(lsKey, JSON.stringify(newState));
  };

  window.dispatchEvent(
    new StorageEvent("storage", { key: lsKey, newValue: defaultValue })
  );

  return { data: JSON.parse(state), setState };
};
