import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { makeRequests } from "./requests/AllRequests";
import { responseDataSchema } from "./requests/resultSchema";

export class FetchXmlTimeEntry implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private response : any;
    private notifyOutputChanged: () => void;    

    private timestamp : string |null;
   private dateFrom : string | null;
   private dateTo : string | null;
    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this.notifyOutputChanged = notifyOutputChanged;
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        if(!context.parameters.dateFrom?.raw) return;
        if(context.parameters.dateFrom!.raw?.toISOString()  == this.dateFrom && context.parameters.dateTo!.raw?.toISOString()  == this.dateTo && context.parameters.timestamp!.raw == this.timestamp ) return;      
        this.dateFrom = context.parameters.dateFrom!.raw.toISOString();  
        this.dateTo = context.parameters.dateTo!.raw?.toISOString() ?? null;  
        this.timestamp = context.parameters.timestamp!.raw;

        let dateTo = context.parameters.dateTo!.raw;
        if(dateTo==null){
               dateTo = new Date(this.dateFrom);
               dateTo.setDate(dateTo.getDate() + 7);        
        }
        makeRequests(context.parameters.dateFrom!.raw, dateTo, context).then((response : any) => {            
            this.response = {
                ...response, 
                timestamp: this.timestamp,                
            }            
            this.notifyOutputChanged();                
        })
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {
            result: this.response
        };
    }

        /**
     * It is called by the framework prior to a control init to get the output object(s) schema
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns an object schema based on nomenclature defined in manifest
     */
        public async getOutputSchema(context: ComponentFramework.Context<IInputs>): Promise<any> {
            return Promise.resolve({
                result: responseDataSchema
            });
        }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
