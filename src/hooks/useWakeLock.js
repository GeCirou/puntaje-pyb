import { useEffect } from 'react';

// Equivalente a solicitarBloqueoPantalla() del score.js original.
export function useWakeLock() {
  useEffect(() => {
    let wakeLock = null;

    async function requestWakeLock() {
      try {
        if (!navigator.wakeLock) return;
        wakeLock = await navigator.wakeLock.request('screen');
      } catch (error) {
        console.log('Error de bloqueo: ' + error);
      }
    }

    requestWakeLock();

    return () => {
      wakeLock?.release?.();
    };
  }, []);
}
