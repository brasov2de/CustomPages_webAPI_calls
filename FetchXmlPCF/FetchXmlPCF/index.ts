import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { fetchRecords } from "./requests";

export class FetchXmlPCF implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private response : any;
    private fetchXml: any;
    private entityName: any;

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
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {    
        if(context.parameters.fetchXml.raw && context.parameters.entityName.raw 
            && (context.parameters.fetchXml.raw != this.fetchXml || context.parameters.entityName.raw != this.entityName)){
            this.fetchXml = context.parameters.fetchXml?.raw ?? "";
            this.entityName = context.parameters.entityName?.raw ?? "";
            fetchRecords(this.fetchXml, this.entityName, context).then((records) => {
                this.response = JSON.stringify(records);
                this.notifyOutputChanged();
            });
        }
        return React.createElement(React.Fragment);
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return { output: this.response };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}


/*

<fetch distinct='false' mapping='logical' aggregate='true' >
  <entity name='activitypointer' >
    <attribute name='activityid' alias='activity_count' aggregate='countcolumn' />
    <link-entity name='account' from='accountid' to='regardingobjectid' >
      <attribute name='industrycode' alias='industrycode' groupby='true' />      
      <attribute name='creditlimit' alias='creditlimit' aggregate='sum' />	  
      <attribute name='accountid' alias='account_count' aggregate='count' />
    </link-entity>
  </entity>
</fetch>

FetchResult = ForAll( Table(ParseJSON(FetchXmlPCF1.output)), 
    { 
        industrycode: Value(ThisRecord.Value.industrycode),
        industrycode_name: Text(ThisRecord.Value.industrycode_formatted),
        activityCount: Value(ThisRecord.Value.activity_count)
    }
);

https://www.develop1.net/public/post/2022/10/09/perform-complex-dataverse-fetchxml-queries-using-power-fx-from-a-canvas-app
https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-parsejson
https://itmustbecode.com/how-to-call-a-dataverse-custom-api-from-a-canvas-app/
*/