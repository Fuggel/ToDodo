export interface Todo {
    id: string;
    task: string;
    startDate: string;
    endDate: string;
    repeatInterval: string | null;
    hiddenUntil?: string;
}