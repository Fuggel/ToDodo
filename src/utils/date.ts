export function formatTime(time: string) {
    return new Date(time).toLocaleString("de-DE", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}