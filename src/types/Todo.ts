export interface Todo {
    id: string;
    task: string;
    startDate: string;
    endDate: string;
    repeat?: {
        frequency?: RepeatFrequency;
        interval?: number;
    };
    hiddenUntil?: string;
}

export enum RepeatFrequency {
    Daily = "daily",
    Weekly = "weekly",
    Monthly = "monthly",
    Yearly = "yearly",
}

export enum TodoTab {
    BASIC = 0,
    HIDDEN = 1,
}