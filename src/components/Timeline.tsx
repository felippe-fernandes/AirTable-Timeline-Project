import React, { useMemo } from 'react';
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
  const config: TimelineConfig = useMemo(() => {
    if (items.length === 0) {
      const today = getDateInString();
      return {
        startDate: today,
        endDate: today,
        totalDays: 0,
        pixelsPerDay
      };
    }

    const allDates = items.flatMap(item => [item.start, item.end]);
    const startDate = allDates.reduce((min, d) => d < min ? d : min, allDates[0]);
    const endDate = allDates.reduce((max, d) => d > max ? d : max, allDates[0]);
    const totalDays = getDaysBetween(startDate, endDate);

    return {
      startDate,
      endDate,
      totalDays,
      pixelsPerDay
    };
  }, [items, pixelsPerDay]);

  const itemsWithLanes = useMemo(() => assignLanes(items), [items]);

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
        <div className="mb-4 text-sm text-gray-600">
          <span className="font-semibold">{config.totalDays}</span> days timeline •
          <span className="font-semibold"> {lanes.length}</span> lanes •
          <span className="font-semibold"> {items.length}</span> items
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
