import { useCallback } from 'react';

export function useTimelineItemUpdate() {
  return useCallback((id: string, newStart: string, newEnd: string) => {
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(
        new CustomEvent('timelineItemUpdate', {
          detail: { id, newStart, newEnd }
        })
      );
    }
  }, []);
}
