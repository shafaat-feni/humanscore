import { describe, it, expect } from 'vitest';
import { ASSESSMENTS } from '../assessments';
import { CATEGORIES } from '../categories';

describe('Assessment catalogue', () => {
  it('has unique ids and slugs', () => {
    expect(new Set(ASSESSMENTS.map(a => a.id)).size).toBe(ASSESSMENTS.length);
    expect(new Set(ASSESSMENTS.map(a => a.slug)).size).toBe(ASSESSMENTS.length);
  });

  it('only uses known categories', () => {
    const known = new Set(CATEGORIES.map(c => c.slug as string));
    for (const a of ASSESSMENTS) expect(known.has(a.category)).toBe(true);
  });

  it('uses URL-safe slugs', () => {
    for (const a of ASSESSMENTS) expect(a.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });
});
