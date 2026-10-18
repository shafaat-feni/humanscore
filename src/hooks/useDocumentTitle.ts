import { useEffect } from 'react';

const BASE = 'HumanScore';

/** Sets document.title for the current page, e.g. "BMI Calculator | HumanScore". */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : `${BASE} — Measure. Understand. Explore.`;
  }, [title]);
}
