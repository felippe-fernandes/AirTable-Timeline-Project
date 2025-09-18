import React, { useState } from 'react';
import { TimelineConfig, TimelineItem } from '../types/timeline';
import { formatDate, getDatePosition, getItemWidth } from '../utils/dateUtils';

interface TimelineItemComponentProps {
  item: TimelineItem;
  config: TimelineConfig;
}

const TimelineItemComponent: React.FC<TimelineItemComponentProps> = ({
  item,
  config
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const left = getDatePosition(item.start, config.startDate, config.pixelsPerDay);
  const width = getItemWidth(item.start, item.end, config.pixelsPerDay);

  return (
    <>
      <div
        className={`
          absolute flex items-center justify-center rounded px-2 text-white text-xs font-medium
          cursor-pointer transition-all duration-200 ease-in-out
          ${isHovered ? 'transform -translate-y-0.5 shadow-lg z-10' : 'shadow-sm z-0'}
        `}
        style={{
          left: `${left}px`,
          width: `${width}px`,
          backgroundColor: item.color || '#3B82F6',
          top: '10px',
          height: '40px'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
          {item.name}
        </span>
      </div>

      {isHovered && (
        <div
          className="absolute bg-gray-800 text-white px-3 py-2 rounded-md text-xs whitespace-nowrap z-20 shadow-lg"
          style={{
            left: `${left}px`,
            top: '-40px'
          }}
        >
          <div className="font-semibold">{item.name}</div>
          <div className="text-gray-300 mt-0.5">
            {formatDate(item.start)} → {formatDate(item.end)}
          </div>
        </div>
      )}
    </>
  );
};

export default TimelineItemComponent;
