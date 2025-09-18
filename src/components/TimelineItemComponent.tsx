import React, { useState } from 'react';
import { TimelineConfig, TimelineItem } from '../types/timeline';
import { formatDate, getDatePosition, getItemWidth } from '../utils/dateUtils';

interface TimelineItemComponentProps {
  item: TimelineItem;
  config: TimelineConfig;
  onUpdateDates?: (id: string, newStart: string, newEnd: string) => void;
}

const TimelineItemComponent: React.FC<TimelineItemComponentProps> = ({
  item,
  config,
  onUpdateDates
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const left = getDatePosition(item.start, config.startDate, config.pixelsPerDay) + dragOffset;
  const width = getItemWidth(item.start, item.end, config.pixelsPerDay);

  // Mouse events for drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setDragStartX(e.clientX);
    e.stopPropagation();
  };

  React.useEffect(() => {
    if (!dragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (dragStartX !== null) {
        setDragOffset(e.clientX - dragStartX);
      }
    };
    const handleMouseUp = () => {
      if (dragStartX !== null && dragOffset !== 0 && onUpdateDates) {
        // Calculate days moved
        const daysMoved = Math.round(dragOffset / config.pixelsPerDay);
        if (daysMoved !== 0) {
          // Update start/end date
          const startDateObj = new Date(item.start);
          const endDateObj = new Date(item.end);
          startDateObj.setDate(startDateObj.getDate() + daysMoved);
          endDateObj.setDate(endDateObj.getDate() + daysMoved);
          onUpdateDates(
            item.id,
            startDateObj.toISOString().slice(0, 10),
            endDateObj.toISOString().slice(0, 10)
          );
        }
      }
      setDragging(false);
      setDragStartX(null);
      setDragOffset(0);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, dragStartX, dragOffset, config.pixelsPerDay, item, onUpdateDates]);

  return (
    <>
      <div
        className={`
          absolute flex items-center justify-center rounded px-2 text-white text-xs font-medium
          cursor-move transition-all duration-200 ease-in-out
          ${isHovered ? 'transform -translate-y-0.5 shadow-lg z-10' : 'shadow-sm z-0'}
          ${dragging ? 'opacity-70' : ''}
        `}
        style={{
          left: `${left}px`,
          width: `${width}px`,
          backgroundColor: item.color || '#3B82F6',
          top: '10px',
          height: '40px',
          zIndex: dragging ? 100 : undefined
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleMouseDown}
      >
        <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
          {item.name}
        </span>
      </div>

      {isHovered && !dragging && (
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
