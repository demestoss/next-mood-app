import { format } from "date-fns/format";

export function formatFullDate(date: Date | string) {
    const d = new Date(date);
    const includeYear = d.getFullYear() !== new Date().getFullYear();
    return format(d, `EEEE d MMM${includeYear ? " yyyy" : ""}, HH:mm`);
}
