
export const fetchRecords = async (fetchXml: string, entityName: string, context: ComponentFramework.Context<IInputs>) => {    
    try{    
        const res = await context.webAPI.retrieveMultipleRecords(entityName, "?fetchXml=" + fetchXml)
        const records = res.entities.map((entity: any) => {        
            const entityEntries = Object.entries(entity).map(([key, value]) => {                        
                const index = key.indexOf("@Microsoft.Dynamics.CRM.lookuplogicalname");
                if(index>0){
                    return [key.substring(0, index) + "_logicalName", value];                            
                }
                const index1 = key.indexOf("@OData.Community.Display.V1.FormattedValue");
                if(index1>0){                    
                    return [key.substring(0, index1) + "_formatted", value];                            
                }
                return [key, value];
            });          
            return Object.fromEntries(entityEntries);
        });    
     return records;
    }
    catch(e){
        if(e instanceof Error){
            if(e.name === "PCFNonImplementedError"){
                return [{"industrycode": 1, "industrycode_formatted": "Accounting", "activity_count": 10}];
            }
        }
        throw e;
    }
}