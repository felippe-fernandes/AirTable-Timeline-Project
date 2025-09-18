import { useState, useMemo, useEffect } from 'react';
import { TimelineItem, TimelineConfig } from '../types/timeline';
import { assignLanes } from '../utils/assignLanes';
import { getDateInString, getDaysBetween } from '../utils/dateUtils';

export function useTimelineState(items: TimelineItem[], pixelsPerDayDefault = 15) {
  const [zoom, setZoom] = useState(pixelsPerDayDefault);
  const minZoom = 5;
  const maxZoom = 60;
  const [timelineItems, setTimelineItems] = useState(items);

  const handleZoomIn = () => setZoom(z => Math.min(z + 5, maxZoom));
  const handleZoomOut = () => setZoom(z => Math.max(z - 5, minZoom));

  useEffect(() => {
    const handler = (e: any) => {
      const { id, newStart, newEnd } = e.detail;
      setTimelineItems(prev => prev.map(item =>
        item.id === id ? { ...item, start: newStart, end: newEnd } : item
      ));
    };
    window.addEventListener('timelineItemUpdate', handler);
    return () => window.removeEventListener('timelineItemUpdate', handler);
  }, []);

  const config: TimelineConfig = useMemo(() => {
    if (timelineItems.length === 0) {
      const today = getDateInString();
      return {
        startDate: today,
        endDate: today,
        totalDays: 0,
        pixelsPerDay: zoom
      };
    }
    const allDates = timelineItems.flatMap(item => [item.start, item.end]);
    const startDate = allDates.reduce((min, d) => d < min ? d : min, allDates[0]);
    const endDate = allDates.reduce((max, d) => d > max ? d : max, allDates[0]);
    const totalDays = getDaysBetween(startDate, endDate);
    return {
      startDate,
      endDate,
      totalDays,
      pixelsPerDay: zoom
    };
  }, [timelineItems, zoom]);

  const itemsWithLanes = useMemo(() => assignLanes(timelineItems), [timelineItems]);

  const lanes = useMemo(() => {
    const laneMap = new Map<number, TimelineItem[]>();
    itemsWithLanes.forEach(item => {
      const laneNumber = item.lane || 0;
      if (!laneMap.has(laneNumber)) {
        laneMap.set(laneNumber, []);
      }
      laneMap.get(laneNumber)!.push(item);
    });
    return Array.from(laneMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([laneNumber, laneItems]) => ({ laneNumber, items: laneItems }));
  }, [itemsWithLanes]);

  const timelineWidth = config.totalDays * config.pixelsPerDay + 200;
  const timelineHeight = lanes.length * 60 + 80;

  return {
    zoom,
    minZoom,
    maxZoom,
    handleZoomIn,
    handleZoomOut,
    timelineItems,
    setTimelineItems,
    config,
    lanes,
    timelineWidth,
    timelineHeight
  };
}
