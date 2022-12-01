export function execSearchRequest(search: string | undefined, 
    entity: string | undefined, 
    filter: string | undefined, 
    orderBy: string | undefined, 
    pageNumber: number | undefined, 
    pageSize: number | undefined, 
    searchMode : "any" |"all",
    searchType: "simple" | "full"): Promise<any> {

    if(search==null || search==""){
        return Promise.resolve(dummyResponse);
    }   
    return fetch("/api/search/v1.0/query", {
        method: 'POST',  
        credentials: 'same-origin',  
        headers: {
          'Content-Type': 'application/json',
           'Accept': "application/json",
           'Prefer': "odata.include-annotations='*'",
        },  
        body: JSON.stringify({
            "search": search,
            "entities": (entity != null && entity!="") ? [entity] : undefined,
            "advancedsearchoptions":  ["grouprankingenabled","fuzzymatchingenabled","includeoptionsetcode"], 
            "skip": (pageNumber && pageSize) ? (pageNumber - 1) * pageSize : undefined,
            "top": pageSize != 0 ? pageSize : undefined, 
            "orderby": (orderBy!=null && orderBy!="") ? orderBy?.split(",") : undefined,
            "filter": (filter!=null && filter!="") ? filter : undefined,
            "searchmode": searchMode,
            "searchtype": searchType
        })
    }).then((r)=>r.json().then((resp)=>{
        resp.value = resp.value.map((item : any)=>{
            return {
                Id: item["@search.objectid"],
                EntityName: item["@search.entityname"],
                Score: item["@search.score"],
                ...item
            }
        })
        return resp;
    }))
    .catch((e)=>{
        console.error(e);    
        if(window.location.href.startsWith("https://authoring")){
            return Promise.resolve(dummyResponse);
        }          
        throw e;
    });
}


const dummyResponse = {    
    "value": [
      {
      /*  "@search.score": 22.426637649536133,
        "@search.highlights": {
          "name": [
            "{crmhit}Team A{/crmhit}"
          ]
        },
        "@search.entityname": "account",
        "@search.objectid": "a47a36a4-c1c7-ec11-a7b6-000d3a3884b5",*/
        "ownerid": "dce1f6ca-e8bf-eb11-8235-0022487f30ac",
        "owneridname": "Diana Birkelbach",
        "Id": "a47a36a4-c1c7-ec11-a7b6-000d3a3884b5",
        "EntityName" : "account",
        "Score": 22.426637649536133,       
        "objecttypecode": 1,
        "name": "Team A",
        "entityimage_url": "",
        "createdon": "2021-10-26T15:15:49Z",
        "modifiedon": "2021-10-26T15:15:49Z",
        "emailaddress1": "",
        "address1_city": "",
        "accountnumber": "",
        "primarycontactid": "",
        "primarycontactidname": "",
        "telephone1": ""
      }
    ],
    "facets": {},
    "totalrecordcount": -1
  };