import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    let sum = 0;
    const x = (req.body && req.body.x);
    const y = (req.body && req.body.y);
    sum = x + y;
    const responseMessage = sum
        ? "Result, " + sum + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a json with x and y in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;