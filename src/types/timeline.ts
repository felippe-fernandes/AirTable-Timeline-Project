export interface TimelineItem {
  id: string;
  name: string;
  start: string;
  end: string;
  color?: string;
  lane?: number;
}

export interface TimelineLane {
  id: number;
  items: TimelineItem[];
}

export interface TimelineConfig {
  startDate: string;
  endDate: string;
  totalDays: number;
  pixelsPerDay: number;
}
