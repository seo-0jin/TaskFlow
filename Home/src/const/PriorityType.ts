import type { ItemContent } from './IssueStatus';

export const PriorityType = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    EMERGENCY: 'EMERGENCY',
} as const;

// 사용 예시 > {PriorityLabel[TODO]}
export const PriorityLabel: Record<PriorityValue, string> = {
    LOW: '낮음',
    MEDIUM: '보통',
    HIGH: '높음',
    EMERGENCY: '긴급',
};

export const buildDefaultPriorityItems = (): ItemContent[] => [
    { id: crypto.randomUUID(), name: PriorityLabel.EMERGENCY, color: '#DC2626' },
    { id: crypto.randomUUID(), name: PriorityLabel.HIGH, color: '#EF4444' },
    { id: crypto.randomUUID(), name: PriorityLabel.MEDIUM, color: '#F59E0B' },
    { id: crypto.randomUUID(), name: PriorityLabel.LOW, color: '#10B981' },
];

export type PriorityKey = keyof typeof PriorityType;
export type PriorityValue = (typeof PriorityType)[PriorityKey];
