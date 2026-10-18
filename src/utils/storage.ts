export interface SavedResult {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  category: string;
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

export const storageService = {
  saveResult(result: Omit<SavedResult, 'id' | 'timestamp' | 'version'>): SavedResult | null {
    try {
      const results = storageService.getResults();
      const newRecord: SavedResult = {
        ...result,
        id: `res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: Date.now(),
        version: CURRENT_SCHEMA_VERSION,
      };

      results.unshift(newRecord);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
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
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      // Validate records against basic schema requirements
      return parsed.filter((item): item is SavedResult => {
        return (
          item !== null &&
          typeof item === 'object' &&
          typeof item.id === 'string' &&
          typeof item.assessmentId === 'string' &&
          typeof item.timestamp === 'number'
        );
      });
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