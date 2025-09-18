import React from 'react';
import { useTimelineItemUpdate } from '../hooks/useTimelineItemUpdate';
import { TimelineConfig, TimelineItem } from '../types/timeline';
import TimelineItemComponent from './TimelineItemComponent';

interface TimelineLaneProps {
  laneNumber: number;
  items: TimelineItem[];
  config: TimelineConfig;
}

const TimelineLane: React.FC<TimelineLaneProps> = ({
  laneNumber,
  items,
  config
}) => {
  const handleUpdateDates = useTimelineItemUpdate();

  return (
    <div
      className="relative border-b border-gray-200"
      style={{ height: '60px' }}
    >
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-xs text-gray-600 font-medium">
        Lane {laneNumber + 1}
      </div>

      {items.map(item => (
        <TimelineItemComponent
          key={item.id}
          item={item}
          config={config}
          onUpdateDates={handleUpdateDates}
        />
      ))}
    </div>
  );
};

export default TimelineLane;
