import React from 'react';
import { useSyncExternalStore } from 'react';

const subscribe = callback => {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
};

const getSnapshot = () => navigator.onLine;

function OnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return <p>You are {isOnline ? 'online' : 'offline'}</p>;
}

export default OnlineStatus;