import { TimelineItem } from '../types/timeline';

export const assignLanes = (items: TimelineItem[]): TimelineItem[] => {
    // Ordenar por data de início
    const sortedItems = [...items].sort((a, b) => a.start.getTime() - b.start.getTime());

    const lanes: TimelineItem[][] = [];

    sortedItems.forEach(item => {
        // Encontrar a primeira lane disponível
        let assignedLane = 0;

        for (let i = 0; i < lanes.length; i++) {
            const lastItemInLane = lanes[i][lanes[i].length - 1];

            // Se o item atual começa depois que o último da lane termina
            if (!lastItemInLane || item.start >= lastItemInLane.end) {
                assignedLane = i;
                break;
            }

            assignedLane = i + 1;
        }

        // Criar nova lane se necessário
        if (!lanes[assignedLane]) {
            lanes[assignedLane] = [];
        }

        // Atribuir lane ao item
        item.lane = assignedLane;
        lanes[assignedLane].push(item);
    });

    return sortedItems;
};
