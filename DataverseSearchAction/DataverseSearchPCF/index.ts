import { IInputs, IOutputs } from "./generated/ManifestTypes";
import toJsonSchema = require("to-json-schema");
import { execSearchRequest } from "./DataverseSearchRequest";
import { runInThisContext } from "vm";

export class DataverseSearchPCF implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    
    private notifyOutputChanged: () => void;

    private search: string | undefined; 
    private entity: string | undefined;
    private filter: string | undefined; 
    private orderBy: string | undefined; 
    private pageNumber : number | undefined;
    private pageSize : number | undefined;
    private searchMode : "any" | "all";
    private searchType : "simple" | "full";

    private resultSchema ?: toJsonSchema.JSONSchema3or4;
    private result ?: any | null ;
    

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

   

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {

       
        if(context.parameters.search.raw === this.search && context.parameters.entity.raw === this.entity
            && context.parameters.filter.raw == this.filter && context.parameters.orderBy.raw == this.orderBy
            && context.parameters.pageNumber.raw === this.pageNumber && context.parameters.pageSize.raw === this.pageSize
            && context.parameters.searchMode.raw === this.searchMode && context.parameters.searchType.raw === this.searchType
            ){
            return;
        }
        this.search = context.parameters.search.raw ?? undefined;
        this.entity = context.parameters.entity.raw ?? undefined;
        this.filter = context.parameters.filter.raw ?? undefined;
        this.orderBy = context.parameters.orderBy.raw?? undefined;
        this.pageNumber = context.parameters.pageNumber.raw ?? undefined;
        this.pageSize = context.parameters.pageSize.raw ?? undefined;
        this.searchMode = context.parameters.searchMode.raw ?? "any";
        this.searchType = context.parameters.searchType.raw ?? "simple";
        
        execSearchRequest(this.search, this.entity, this.filter, this.orderBy, this.pageNumber, this.pageSize, this.searchMode, this.searchType)
        .then((result) => {
            this.result = result;
            this.resultSchema = toJsonSchema(result);
            this.notifyOutputChanged();
        }).catch((er:any) => {
            console.error(er);
            this.result = {error: er};
            this.resultSchema = toJsonSchema(this.result);
            this.notifyOutputChanged();
        });
       
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return { 
            result: this.result ?? "", 
            resultSchema : JSON.stringify(this.resultSchema)
         };
    }


          /**
     * It is called by the framework prior to a control init to get the output object(s) schema
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns an object schema based on nomenclature defined in manifest
     */
    public async getOutputSchema(context: ComponentFramework.Context<IInputs>): Promise<any> {
        return Promise.resolve({
            result: this.resultSchema
        });
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
