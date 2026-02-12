export type BaseItem = {
    id: string;
    name: string;
    order?: number;
    color?: string;
};

export type IssueStatusDef = BaseItem & {
    isDefault?: boolean;
};

export type IssueTypeDef = BaseItem & {
    icon?: string;
};

export type PriorityDef = BaseItem & {
    level?: number;
};

export type RoleDef = {
    code: string;   // "PM" | "DEV" ...
    name: string;
    order: number;
};
