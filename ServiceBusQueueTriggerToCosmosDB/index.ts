import { AzureFunction, Context } from "@azure/functions"

const serviceBusQueueTrigger: AzureFunction = async function(context: Context, mySbMsg: any): Promise<void> {
    if (mySbMsg) {
        const incomingDocument = JSON.stringify({
            // create a random ID
            id: new Date().toISOString() + Math.random().toString().substring(2, 10),
            payload: mySbMsg
        });
        // write the message to CosmosDB
        context.bindings.outputDocument = incomingDocument;
        context.log('ServiceBus queue trigger function processed message: ', incomingDocument);
    }
};

export default serviceBusQueueTrigger;
