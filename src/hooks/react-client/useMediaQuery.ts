'use client';

import { useCallback, useSyncExternalStore } from 'react';

const mediaQueryChangeSubscribe = (mq: MediaQueryList, handler: () => void) => {
  if (mq.addEventListener) {
    mq.addEventListener('change', handler);
  } else {
    mq.addListener(handler);
  }
};

const mediaQueryChangeUnsubscribe = (mq: MediaQueryList, handler: () => void) => {
  if (mq.removeEventListener) {
    mq.removeEventListener('change', handler);
  } else {
    mq.removeListener(handler);
  }
};

const useMediaQuery = (query: string): boolean | undefined => {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return () => undefined;
      }

      const mediaQuery = window.matchMedia(query);
      mediaQueryChangeSubscribe(mediaQuery, onStoreChange);

      return () => mediaQueryChangeUnsubscribe(mediaQuery, onStoreChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    return window.matchMedia(query).matches;
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => undefined);
};

export default useMediaQuery;
