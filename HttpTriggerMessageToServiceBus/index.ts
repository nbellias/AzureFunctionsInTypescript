import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const payload = req.body;
    const responseMessage = payload
        ? "The following payload: " + JSON.stringify(payload) + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a payload in the request body for a personalized response.";
    
    context.bindings.outputSbMsg = responseMessage;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;