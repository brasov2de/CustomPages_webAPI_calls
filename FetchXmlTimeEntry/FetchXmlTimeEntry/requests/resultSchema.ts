import { JSONSchema4 } from 'json-schema';

export const responseDataSchema: JSONSchema4 = {
    type: 'object',
    properties: {       
        timestamp: { type: 'string' },
        byDay: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    date: { type: 'string', format: 'date' },
                    day: { type: 'number' },
                    weekday: { type: 'number' },
                    month: { type: 'number' },
                    year: { type: 'number' },
                    hours: { type: 'number' },
                    hours_formatted: { type: 'string' },
                    isCurrentMonth: { type: 'boolean' },
                    isToday: { type: 'boolean' }
                }
            },
        }
    }
};

const today = new Date();

export const responseData = { 
    "timestamp": new Date().toISOString(),
    "byDay" : [
        {
            "date" : today,
            "day": today.getDate(),
            "weekday": today.getDay() + 1,
            "month":today.getMonth() + 1,
            "year": today.getFullYear(),
            "hours": 2,
            "hours_formatted": " hrs",
            "isCurrentMonth": true, 
            "isToday": false
        }]       
};
