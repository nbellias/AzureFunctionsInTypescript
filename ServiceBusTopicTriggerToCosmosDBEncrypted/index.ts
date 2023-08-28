import { AzureFunction, Context } from "@azure/functions"
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import * as crypto from "crypto-js"


const serviceBusTopicTrigger: AzureFunction = async function (context: Context, mySbMsg: any): Promise<void> {
    
    // get the secret from Azure Key Vault
    // const secretForEncryption = "FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=";//await getSecretFromAzureKeyVault();
    
    if (mySbMsg) {
        const incomingDocument = JSON.stringify({
            // create a random ID
            id: new Date().toISOString() + Math.random().toString().substring(2, 10),
            payload: crypto.AES.encrypt(JSON.stringify(mySbMsg), process.env.secret || "").toString()
        });
        // write the message to CosmosDB
        context.bindings.outputDocumentEncrypted = incomingDocument;
        context.log('ServiceBus topic trigger function processed message = ', mySbMsg);
        let bytes = crypto.AES.decrypt(crypto.AES.encrypt(JSON.stringify(mySbMsg), process.env.secret || "").toString(), process.env.secret || "");
        let decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));
        context.log('Decrypted message = ', decryptedData);
    }
    
};


//Unfortunately this does not work due to the fact that I do not have access
//to the AAD and cannot create secrets in the Key Vault
async function getSecretFromAzureKeyVault(): Promise<string> {
    const credential = new DefaultAzureCredential();

    // Build the URL to reach your key vault
    const vaultName = process.env.keyvault_NAME;
    const url = `https://${vaultName}.vault.azure.net`;

    // Lastly, create our secrets client and connect to the service
    const client = new SecretClient(url, credential);
    const secretForEncryption = await client.getSecret(process.env.secretName || '');
    // const specificSecret = await client.getSecret(process.env.secretName, { version: secretForEncryption.properties.version! });

    return secretForEncryption.value || '';
}

export default serviceBusTopicTrigger;
