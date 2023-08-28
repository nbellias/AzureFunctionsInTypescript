"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const identity_1 = require("@azure/identity");
const keyvault_secrets_1 = require("@azure/keyvault-secrets");
const crypto = require("crypto-js");
const serviceBusTopicTrigger = function (context, mySbMsg) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
};
//Unfortunately this does not work due to the fact that I do not have access
//to the AAD and cannot create secrets in the Key Vault
function getSecretFromAzureKeyVault() {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = new identity_1.DefaultAzureCredential();
        // Build the URL to reach your key vault
        const vaultName = process.env.keyvault_NAME;
        const url = `https://${vaultName}.vault.azure.net`;
        // Lastly, create our secrets client and connect to the service
        const client = new keyvault_secrets_1.SecretClient(url, credential);
        const secretForEncryption = yield client.getSecret(process.env.secretName || '');
        // const specificSecret = await client.getSecret(process.env.secretName, { version: secretForEncryption.properties.version! });
        return secretForEncryption.value || '';
    });
}
exports.default = serviceBusTopicTrigger;
