import dayjs, { Dayjs } from "dayjs";


interface DateRange {
    label: string;
    getRange: () => [Dayjs, Dayjs];

}

export const DATE_RANGES: DateRange[] = [
    {
        label: "Today",
        getRange: () => [dayjs().startOf("minute").add(1, "minute"), dayjs()],
    },
    {
        label: "Tomorrow",
        getRange: () => [dayjs().add(1, "day").startOf("minute").add(1, "minute"), dayjs().add(1, "day")],
    },
    {
        label: "Next Week",
        getRange: () => [dayjs().startOf("minute").add(1, "minute").add(1, "week"), dayjs().add(1, "week")],
    },
];