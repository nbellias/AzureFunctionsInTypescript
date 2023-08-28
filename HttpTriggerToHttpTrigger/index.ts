import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    let responseMessage = "This HTTP triggered function executed successfully. Pass a request body for a personalized response.";
    
    if (req.body) {
        responseMessage = req.body;
        fetch('https://nibefunctionsintypescript.azurewebsites.net/api/HttpTriggerMessageToServiceBus?code=0izEQhDKUamJTBt6BnL0PDWqoN3ZM_jCkbrPCnKZYXBNAzFuCv_p-Q==', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({ messageFromTopic: responseMessage })
    })
        .then(res => res.json())
            .then(res => context.log('Send message to SB: ', responseMessage));
    }
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;