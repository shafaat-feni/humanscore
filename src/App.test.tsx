import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

describe('Routing', () => {
  it('renders the home page', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 1, name: /Measure\. Understand\. Explore\./ })).toBeTruthy();
  });

  it('renders a known category page', () => {
    renderAt('/physical');
    expect(screen.getByRole('heading', { level: 1, name: 'Physical Assessments' })).toBeTruthy();
  });

  it('shows 404 for an unknown single-segment path', () => {
    renderAt('/foo');
    expect(screen.getByRole('heading', { level: 1, name: /404/ })).toBeTruthy();
  });

  it('renders a known assessment page', () => {
    renderAt('/tests/bmi-calculator');
    expect(screen.getByRole('heading', { level: 1, name: 'BMI Calculator' })).toBeTruthy();
  });

  it('shows 404 for an unknown assessment slug', () => {
    renderAt('/tests/does-not-exist');
    expect(screen.getByRole('heading', { level: 1, name: /404/ })).toBeTruthy();
  });

  it('renders the privacy policy and disclaimer pages', () => {
    const { unmount } = renderAt('/privacy-policy');
    expect(screen.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeTruthy();
    unmount();
    renderAt('/disclaimer');
    expect(screen.getByRole('heading', { level: 1, name: 'Medical Disclaimer' })).toBeTruthy();
  });
});
