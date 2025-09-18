import React from 'react';
import { useTimelineState } from '../hooks/useTimelineState';
import { TimelineItem } from '../types/timeline';
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
  const {
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
  } = useTimelineState(items, pixelsPerDay);

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
