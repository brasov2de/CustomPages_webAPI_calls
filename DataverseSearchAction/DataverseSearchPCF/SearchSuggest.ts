/*
import toJsonSchema = require("to-json-schema");

export class SearchSuggest{
    public search: string | undefined; 
    public entities: string | undefined;
    public filter: string | undefined; 
    public orderBy: string | undefined; 
    public top: number | undefined; 
    public skip: number | undefined;    
   // public options: "lucene" | "besteffortsearch" | "groupranking" | "searchmodelall";
    constructor(search: string | undefined, entities: string | undefined, filter: string | undefined, orderBy: string | undefined, pageNumber: number | undefined, pageSize: number | undefined)
    {
        if(search!=null && search!=""){
            this.search = search;
        }
        if(entities!=null && entities!=""){
            this.entities = JSON.stringify(entities?.split(",").map((entity) => { return {"name" : entity}})) ;
        }
        if(filter!=null && filter!=""){
            this.filter = filter;
        }
        if(orderBy!=null && orderBy!=""){
            this.orderBy = orderBy;
        }
        if(pageNumber || pageSize){
            this.top = pageSize ?? 50;
            this.skip = pageNumber ? (pageNumber - 1) * (pageSize ?? 50) : 0;
        }      

    }
    
    public getMetadata(){
        return {
            boundParameter: null,
            parameterTypes: {
                "search": {
                    typeName: "Edm.String",
                    structuralProperty: 1
                },
                 "entities": {                       
                    structuralProperty: 1,
                     typeName: "Edm.String"
                }, 
                "top": {
                    structuralProperty: 1
                },               
                "skip": {
                    structuralProperty: 1
                },  
                "propertybag": {
                    structuralProperty: 1, 
                    typeName: "Edm.String"
                },                               
                "filter": {
                    structuralProperty: 1, 
                    typeName: "Edm.String"
                },
                "orderby": {
                    structuralProperty: 1,
                    typeName: "Edm.String"
                }
            
            },
            operationType: 0,
            operationName: "searchquery"
        }
    }
}


export const SearchSuggestDummyResponse = {
    Count:1, 
    Error: null, 
    Facets: {},
    Value: [
        {
            Attributes: {
                "@search.objecttypecode":1,
                "@search.ownerid.logicalname": "systemuser", 
                "createdon":"2022-10-26T15:15:49Z",
                "createdon@OData.Community.Display.V1.FormattedValue" : "26.10.2022 17:15",
                "modifiedon":"2022-10-26T15:15:49Z",
                "modifiedon@OData.Community.Display.V1.FormattedValue": "26.10.2022 17:15",
                "name":"Team N",
                "ownerid":"dce1f6ca-e8bf-eb11-8235-0022487f30ac",
                "owneridname": "Diana Birkelbach"},
            EntityName: "account",
            Id: "3634e80d-4155-ed11-bba2-000d3abcdeb0",
            ObjectTypeCode: 0, 
            Highlights: {name : ['{crmhit}Team{/crmhit} N']},
            Score: -0.2955312728881836 
        }]
    };

export async function execRequest(WebApi: ComponentFramework.WebApi, req: SearchSuggest){
        try{
             // @ts-ignore
            const result = await WebApi.execute(req);
            if(result.ok){
                const response = await result.json();
                const parsed = JSON.parse(response.response);                              
                return parsed;
            }
        }
        catch(e){
            if(e instanceof Error && e.name === "PCFNonImplementedError"){                               
                return SearchSuggestDummyResponse;
           }
           else{
            throw e;        
           }        
        }
    }
    */