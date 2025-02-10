import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateUtilService {
    
    public static overrideTimezone(dateStr: string): Date {
        const date: Date = new Date(dateStr);
        const hours: number = date.getHours();
        const tIndex: number = dateStr.indexOf("T");
        const dateStrHours: number = +(dateStr.slice(tIndex + 1, tIndex + 3));
        const tzOffset =  this.getTimezoneOffset("h");
    
        // compares hours sliced from string and hours from date. if different,
        // then I know timezone was calculated into the Date
    
        if (dateStrHours === hours) return date;  // everything's OK
    
        // webview factored in timezone, so add it back to correct
        else return new Date(date.setHours(date.getHours() + tzOffset));
    
    }
    
    // can scale it to include "ms", "s", "m", etc
    public static getTimezoneOffset(unit = "h") {
        switch(unit) {
            case "h": 
                return (new Date()).getTimezoneOffset() / 60;
            default:
                return (new Date()).getTimezoneOffset() / 60;
        }
    }
}