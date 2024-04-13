import { IInputs } from "../generated/ManifestTypes";
import { responseData } from "./resultSchema";

 

export const fetchByDay = async (dateFrom : Date, dateTo: Date, context: ComponentFramework.Context<IInputs>) => {  
    const fetchXml = [
      "<fetch aggregate='true' ><entity name='diana_timeentry'>" ,
      "<attribute name='diana_value' alias='hours' aggregate='sum' />" ,
      "<attribute name='diana_date' alias='groupday' groupby='true' dategrouping='day'/>" ,
      "<attribute name='diana_date' alias='groupmonth' groupby='true' dategrouping='month'/>" ,
      "<attribute name='diana_date' alias='groupyear' groupby='true' dategrouping='year'/>", 
      "<filter>",
        `<condition attribute='diana_date' operator='between'>`,
          `<value>${dateFrom.toISOString()}</value>`,
          `<value>${dateTo.toISOString()}</value>`,
        "</condition>",
      "</filter></entity></fetch>"
     ].join("")
    try{    
        const res = await context.webAPI.retrieveMultipleRecords("diana_timeentry", "?fetchXml=" + fetchXml)
        const records = res.entities.map((entity: any) => {  
            return {
              "date" : new Date(entity["groupyear"], entity["groupmonth"] - 1, entity["groupday"]),            
              "hours": entity["hours"]
            }                
        });    
     return records;
    }
    catch(e){
        if(e instanceof Error){
            if(e.name === "PCFNonImplementedError"){
                return responseData.byDay;
            }
        }
        throw e;
    }
}