export interface TimelineItem {
  id: string;
  name: string;
  start: Date;
  end: Date;
  color?: string;
  lane?: number;
}

export interface TimelineLane {
  id: number;
  items: TimelineItem[];
}

export interface TimelineConfig {
  startDate: Date;
  endDate: Date;
  totalDays: number;
  pixelsPerDay: number;
}
