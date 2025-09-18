import React from 'react';
import { TimelineConfig } from '../types/timeline';
import { addDaysToDate, formatDate } from '../utils/dateUtils';

interface TimelineAxisProps {
  config: TimelineConfig;
}

const TimelineAxis: React.FC<TimelineAxisProps> = ({ config }) => {
  const { startDate, totalDays, pixelsPerDay } = config;

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
