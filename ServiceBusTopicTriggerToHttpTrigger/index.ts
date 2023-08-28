import { AzureFunction, Context } from "@azure/functions"

const serviceBusTopicTrigger: AzureFunction = async function (context: Context, mySbMsg: any): Promise<void> {
    if (mySbMsg) {
        let responseMessage = mySbMsg;
        fetch('https://nibefunctionsintypescript.azurewebsites.net/api/HttpTriggerMessageToServiceBus?code=0izEQhDKUamJTBt6BnL0PDWqoN3ZM_jCkbrPCnKZYXBNAzFuCv_p-Q==', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messageFromTopic: responseMessage })
        })
            .then(res => res.json())
            .then(res => context.log('ServiceBus topic trigger function processed message: ', responseMessage));
    }
};

export default serviceBusTopicTrigger;
