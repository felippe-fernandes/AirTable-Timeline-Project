import React from 'react';
import { useDateMarkers } from '../hooks/useDateMarkers';
import { TimelineConfig } from '../types/timeline';
import { formatDate } from '../utils/dateUtils';

interface TimelineAxisProps {
  config: TimelineConfig;
}

const TimelineAxis: React.FC<TimelineAxisProps> = ({ config }) => {
  const dateMarkers = useDateMarkers(config);

  return (
    <div className="absolute top-0 left-0 w-full h-12 border-b border-gray-300 bg-white">
      {dateMarkers.map((marker, index) => (
        <div
          key={index}
          className="absolute top-0 h-full flex flex-col justify-center"
          style={{ left: `${marker.position}px` }}
        >
          <div className="absolute top-0 w-px h-full bg-gray-300" />

          <div className="absolute top-1 left-2 text-xs text-gray-600 font-medium whitespace-nowrap">
            {formatDate(marker.date)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineAxis;
