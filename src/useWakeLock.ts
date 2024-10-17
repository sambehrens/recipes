import { useState, useEffect, useRef, useCallback } from 'react';

type WakeLockOptions = {
  onError?: (error: any) => void;
  onRelease?: () => void;
};

export function useWakeLock({ onError, onRelease }: WakeLockOptions = {}) {
  const [isWakeLockActive, setIsWakeLockActive] = useState(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  const requestWakeLock = useCallback(async () => {
    try {
      if ('wakeLock' in navigator) {
        const wakeLock = await navigator.wakeLock.request('screen');
        wakeLockRef.current = wakeLock;
        setIsWakeLockActive(true);

        wakeLock.addEventListener('release', () => {
          setIsWakeLockActive(false);
          onRelease?.();
        });
      } else {
        console.warn('Wake Lock API not supported on this browser.');
      }
    } catch (err) {
      onError?.(err);
    }
  }, [onError, onRelease]);

  const releaseWakeLock = useCallback(async () => {
    try {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        setIsWakeLockActive(false);
      }
    } catch (err) {
      onError?.(err);
    }
  }, [onError]);

  useEffect(() => {
    return () => {
      releaseWakeLock();
    };
  }, [releaseWakeLock]);

  return { isWakeLockActive, requestWakeLock, releaseWakeLock };
}
