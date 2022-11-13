import { IInputs } from "./generated/ManifestTypes";

export const fetchRecords = async (fetchXml: string, entityName: string, context: ComponentFramework.Context<IInputs>) => {  
    let colors = new Map();
    try {
      const metadata = await context.utils.getEntityMetadata("account", ["industrycode"]);
      colors = new Map((metadata.Attributes.get("industrycode")?.attributeDescriptor.OptionSet ?? []).map((option: any) => {
        return [option.Value.toString(), option.Color];
      }));
    } catch (e) {
      console.log(e);
    }  
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
            if (entity.industrycode != null) {
                entityEntries.push(["industrycode_color", colors.get(entity.industrycode.toString())]);
              }
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