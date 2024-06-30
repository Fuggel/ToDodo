import { Todo, RepeatFrequency } from "../types/Todo";


export function displayedFrequency(todo: Todo) {
    const checkVerb = (singular: string, plural: string) => {
        return todo.repeat?.interval === 1 ? singular : `Every ${todo.repeat?.interval} ${plural}`;
    };

    switch (todo.repeat?.frequency) {
        case RepeatFrequency.Daily:
            return checkVerb("Daily", "days");
        case RepeatFrequency.Weekly:
            return checkVerb("Weekly", "weeks");
        case RepeatFrequency.Monthly:
            return checkVerb("Monthly", "months");
        case RepeatFrequency.Yearly:
            return checkVerb("Yearly", "years");
    }
};