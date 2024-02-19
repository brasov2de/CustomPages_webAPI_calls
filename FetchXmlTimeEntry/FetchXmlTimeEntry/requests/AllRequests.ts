
import { IInputs } from "../generated/ManifestTypes";
import { fetchByDay } from "./ByDay";

const isToday = (someDate: Date) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }

const daysBetween = (date1: Date, date2: Date) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((date1.getTime() - date2.getTime()) / (oneDay)));    
}

export const makeRequests = async (dateFrom : Date, dateTo: Date, context: ComponentFramework.Context<IInputs>, ) => {    
    if(!dateFrom || !dateTo) {
       return {   
        "byDay" : []      
        }; 
    }
    const byDays = await fetchByDay(dateFrom, dateTo, context);            

    let currentDate = new Date(dateFrom);
    currentDate.setDate(currentDate.getDate() - 1);
        
    const allDays = Array.from({length: daysBetween(dateFrom, dateTo)}, (_, i) =>  {
        currentDate.setDate(currentDate.getDate() + 1);
        const hours = byDays.find((day) => day.date.toISOString().substring(0,10) === currentDate.toISOString().substring(0, 10))?.hours ?? 0;        
        return {
            "date" : currentDate.toISOString().substring(0,10),
            "day": currentDate.getDate(),
            "weekday": currentDate.getDay() + 1,
            "month": currentDate.getMonth() + 1,
            "year": currentDate.getFullYear(),
            "hours": hours,
            "hours_formatted": `${(hours).toFixed(2)} hrs`, 
            "isCurrentMonth": dateFrom.getDate() == 1 ? currentDate.getMonth() === dateFrom.getMonth() : currentDate.getMonth() === dateFrom.getMonth()+1, 
            "isToday": isToday(currentDate), 
            "index": i + 1
        }    
    });

    return {           
    "daysCount": allDays.length,
    "byDay" : allDays     
};


}