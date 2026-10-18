import { describe, it, expect } from 'vitest';
import { createTimer, formatElapsedTime } from '../timer';

describe('Timer Utilities', () => {
  it('calculates elapsed time using a mock clock', () => {
    let fakeTime = 1000;
    const mockClock = () => fakeTime;

    const timer = createTimer(mockClock);
    expect(timer.isRunning()).toBe(false);
    expect(timer.getElapsedMs()).toBe(0);

    timer.start();
    expect(timer.isRunning()).toBe(true);

    fakeTime = 3500; // 2500ms elapsed
    expect(timer.getElapsedMs()).toBe(2500);

    const stoppedMs = timer.stop();
    expect(stoppedMs).toBe(2500);
    expect(timer.isRunning()).toBe(false);
  });

  it('accumulates across pause and resume, and can reset', () => {
    let fakeTime = 0;
    const timer = createTimer(() => fakeTime);

    timer.start();
    fakeTime = 1000;
    timer.stop();
    fakeTime = 5000; // paused: should not count
    expect(timer.getElapsedMs()).toBe(1000);

    timer.start();
    fakeTime = 5500;
    expect(timer.getElapsedMs()).toBe(1500);

    timer.reset();
    expect(timer.isRunning()).toBe(false);
    expect(timer.getElapsedMs()).toBe(0);
  });

  it('formats elapsed time correctly', () => {
    expect(formatElapsedTime(0)).toBe('00:00');
    expect(formatElapsedTime(65000)).toBe('01:05');
    expect(formatElapsedTime(3661000)).toBe('61:01');
    expect(formatElapsedTime(-500)).toBe('00:00');
  });
});