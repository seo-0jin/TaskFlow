import type { PriorityDef } from './ItemContent';

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

export const buildDefaultPriorityItems = (): PriorityDef[] => {
    const base = [
    { name: PriorityLabel.EMERGENCY, color: '#DC2626' },
    { name: PriorityLabel.HIGH, color: '#EF4444' },
    { name: PriorityLabel.MEDIUM, color: '#F59E0B' },
    { name: PriorityLabel.LOW, color: '#10B981' },
];

return base.map((x, idx) => ({
    id: crypto.randomUUID(),
    name: x.name,
    color: x.color,
    order: idx + 1,
}))
};

export type PriorityKey = keyof typeof PriorityType;
export type PriorityValue = (typeof PriorityType)[PriorityKey];
