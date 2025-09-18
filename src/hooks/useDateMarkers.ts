import { useMemo } from 'react';
import { TimelineConfig } from '../types/timeline';
import { addDaysToDate } from '../utils/dateUtils';

export function useDateMarkers(config: TimelineConfig) {
  const { startDate, totalDays, pixelsPerDay } = config;

  return useMemo(() => {
    const dateMarkers = [];
    for (let i = 0; i <= totalDays; i += 7) {
      const date = addDaysToDate(startDate, i);
      const position = i * pixelsPerDay;
      dateMarkers.push({
        date,
        position,
        isStart: i === 0,
        isEnd: i >= totalDays
      });
    }
    return dateMarkers;
  }, [startDate, totalDays, pixelsPerDay]);
}
