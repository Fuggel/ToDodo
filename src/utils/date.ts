import dayjs, { Dayjs } from "dayjs";


export function formatDate(date: Dayjs): string {
    return dayjs(date).format("MMMM DD, YYYY");
}
