import { TimelineItem } from '../types/timeline';

export const timelineItems: TimelineItem[] = [
  {
    id: '1',
    name: 'Project Planning',
    start: new Date(2023, 11, 1),
    end: new Date(2023, 11, 15),
    color: '#3B82F6'
  },
  {
    id: '2',
    name: 'Development Phase',
    start: new Date(2023, 11, 10),
    end: new Date(2024, 0, 20),
    color: '#10B981'
  },
  {
    id: '3',
    name: 'Testing',
    start: new Date(2024, 0, 15),
    end: new Date(2024, 0, 30),
    color: '#F59E0B'
  },
  {
    id: '4',
    name: 'Deployment',
    start: new Date(2024, 0, 25),
    end: new Date(2024, 1, 5),
    color: '#EF4444'
  }
];

export default timelineItems;
