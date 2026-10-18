import type { AssessmentCategory } from '../types/assessment';

export interface SavedResult {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  category: AssessmentCategory;
  timestamp: number;
  rawResult: number | string;
  normalizedScore?: number;
  maxScore?: number;
  unit?: string;
  durationMs?: number;
  version: number;
}

const STORAGE_KEY = 'humanscore_assessments_v1';
const CURRENT_SCHEMA_VERSION = 1;
/** Oldest results are dropped beyond this many records to keep localStorage bounded. */
export const MAX_STORED_RESULTS = 500;

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `res_${crypto.randomUUID()}`;
  }
  return `res_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function isOptionalFiniteNumber(v: unknown): boolean {
  return v === undefined || (typeof v === 'number' && Number.isFinite(v));
}

function isValidRecord(item: unknown): item is SavedResult {
  if (item === null || typeof item !== 'object') return false;
  const r = item as Record<string, unknown>;
  return (
    typeof r.id === 'string' &&
    typeof r.assessmentId === 'string' &&
    typeof r.assessmentTitle === 'string' &&
    typeof r.category === 'string' &&
    typeof r.timestamp === 'number' &&
    Number.isFinite(r.timestamp) &&
    (typeof r.rawResult === 'string' || (typeof r.rawResult === 'number' && Number.isFinite(r.rawResult))) &&
    isOptionalFiniteNumber(r.normalizedScore) &&
    isOptionalFiniteNumber(r.maxScore) &&
    isOptionalFiniteNumber(r.durationMs) &&
    typeof r.version === 'number' &&
    r.version <= CURRENT_SCHEMA_VERSION
  );
}

export const storageService = {
  saveResult(result: Omit<SavedResult, 'id' | 'timestamp' | 'version'>): SavedResult | null {
    try {
      const results = storageService.getResults();
      const newRecord: SavedResult = {
        ...result,
        id: generateId(),
        timestamp: Date.now(),
        version: CURRENT_SCHEMA_VERSION,
      };

      results.unshift(newRecord);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(results.slice(0, MAX_STORED_RESULTS)));
      return newRecord;
    } catch (e) {
      console.error('Failed to save assessment result to localStorage:', e);
      return null;
    }
  },

  getResults(): SavedResult[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(isValidRecord);
    } catch (e) {
      console.error('Failed to read or parse assessment results from localStorage:', e);
      return [];
    }
  },

  removeResult(id: string): boolean {
    try {
      const results = storageService.getResults();
      const filtered = results.filter(r => r.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (e) {
      console.error('Failed to remove result:', e);
      return false;
    }
  },

  clearResults(): boolean {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (e) {
      console.error('Failed to clear results:', e);
      return false;
    }
  },
};
