import { useEffect, useState } from 'react';

interface UseTimelineItemDragProps {
  config: { pixelsPerDay: number };
  item: { start: string; end: string; id: string };
  onUpdateDates?: (id: string, newStart: string, newEnd: string) => void;
}

export function useTimelineItemDrag({ config, item, onUpdateDates }: UseTimelineItemDragProps) {
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    if (!dragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (dragStartX !== null) {
        setDragOffset(e.clientX - dragStartX);
      }
    };
    const handleMouseUp = () => {
      if (dragStartX !== null && dragOffset !== 0 && onUpdateDates) {
        const daysMoved = Math.round(dragOffset / config.pixelsPerDay);
        if (daysMoved !== 0) {
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

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setDragStartX(e.clientX);
    e.stopPropagation();
  };

  return {
    dragging,
    dragOffset,
    handleMouseDown,
    setDragging,
    setDragOffset,
    setDragStartX
  };
}
