import { TimelineItem } from '../types/timeline';

export const assignLanes = (items: TimelineItem[]): TimelineItem[] => {
    const sortedItems = [...items].sort((a, b) => a.start.getTime() - b.start.getTime());

    const lanes: TimelineItem[][] = [];

    sortedItems.forEach(item => {
        let assignedLane = 0;

        for (let i = 0; i < lanes.length; i++) {
            const lastItemInLane = lanes[i][lanes[i].length - 1];

            if (!lastItemInLane || item.start >= lastItemInLane.end) {
                assignedLane = i;
                break;
            }

            assignedLane = i + 1;
        }

        if (!lanes[assignedLane]) {
            lanes[assignedLane] = [];
        }

        item.lane = assignedLane;
        lanes[assignedLane].push(item);
    });

    return sortedItems;
};
