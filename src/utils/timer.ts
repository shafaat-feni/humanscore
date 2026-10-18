export interface TimerInstance {
  start: () => void;
  stop: () => number;
  getElapsedMs: () => number;
  isRunning: () => boolean;
  reset: () => void;
}

export function createTimer(clockFn: () => number = () => performance.now()): TimerInstance {
  let startTime: number | null = null;
  let accumulatedMs: number = 0;
  let running = false;

  return {
    start: () => {
      if (!running) {
        startTime = clockFn();
        running = true;
      }
    },
    stop: () => {
      if (running && startTime !== null) {
        accumulatedMs += clockFn() - startTime;
        startTime = null;
        running = false;
      }
      return accumulatedMs;
    },
    getElapsedMs: () => {
      if (running && startTime !== null) {
        return accumulatedMs + (clockFn() - startTime);
      }
      return accumulatedMs;
    },
    isRunning: () => running,
    reset: () => {
      startTime = null;
      accumulatedMs = 0;
      running = false;
    },
  };
}

export function formatElapsedTime(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return '00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(minutes)}:${pad(seconds)}`;
}