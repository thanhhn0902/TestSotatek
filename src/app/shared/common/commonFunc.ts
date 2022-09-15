import { formatDate } from "@angular/common";

export class commonFunc {
    static formatDateTime = (date: Date) => {
        if (date) {
            const format = 'yyyy-MM-dd';
            const locale = 'en-US';
            const formatedDate = formatDate(date, format, locale);
            return formatedDate;
        }
        return date;
    }

    static compareDate = (date: Date) => {
        if (date) {
            const toDay = new Date(this.formatDateTime(new Date())).getTime();
            const chooseDate = new Date(this.formatDateTime(date)).getTime();
            if (chooseDate < toDay) {
                return false;
            }
            return true;
        }
        return false;
    }
}