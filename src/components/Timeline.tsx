import React, { useMemo, useState } from 'react';
import { TimelineConfig, TimelineItem } from '../types/timeline';
import { assignLanes } from '../utils/assignLanes';
import { getDateInString, getDaysBetween } from '../utils/dateUtils';
import TimelineAxis from './TimelineAxis';
import TimelineLane from './TimelineLane';

interface TimelineProps {
  items: TimelineItem[];
  pixelsPerDay?: number;
}

const Timeline: React.FC<TimelineProps> = ({
  items,
  pixelsPerDay = 15
}) => {
  const [zoom, setZoom] = useState(pixelsPerDay);
  const minZoom = 5;
  const maxZoom = 60;
  const [timelineItems, setTimelineItems] = useState(items);

  const handleZoomIn = () => setZoom(z => Math.min(z + 5, maxZoom));
  const handleZoomOut = () => setZoom(z => Math.max(z - 5, minZoom));

  React.useEffect(() => {
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

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4">
        <div className="mb-4 text-sm text-gray-600 flex items-center gap-4">
          <span className="font-semibold">{config.totalDays}</span> days timeline •
          <span className="font-semibold"> {lanes.length}</span> lanes •
          <span className="font-semibold"> {items.length}</span> items
          <div className="ml-auto flex items-center gap-2">
            <button
              className="px-2 py-1 rounded border bg-gray-100 hover:bg-gray-200"
              onClick={handleZoomOut}
              disabled={zoom === minZoom}
              title="Zoom Out"
            >
              -
            </button>
            <span className="px-2 text-xs">Zoom: {zoom}</span>
            <button
              className="px-2 py-1 rounded border bg-gray-100 hover:bg-gray-200"
              onClick={handleZoomIn}
              disabled={zoom === maxZoom}
              title="Zoom In"
            >
              +
            </button>
          </div>
        </div>

        <div
          className="relative bg-gray-50 border border-gray-200 rounded-lg ml-24"
          style={{
            width: `${timelineWidth}px`,
            height: `${timelineHeight}px`
          }}
        >
          <TimelineAxis config={config} />

          <div className="mt-12">
            {lanes.map(({ laneNumber, items: laneItems }) => (
              <TimelineLane
                key={laneNumber}
                laneNumber={laneNumber}
                items={laneItems}
                config={config}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
