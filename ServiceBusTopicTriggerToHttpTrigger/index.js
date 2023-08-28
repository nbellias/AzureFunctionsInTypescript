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
const serviceBusTopicTrigger = function (context, mySbMsg) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
};
exports.default = serviceBusTopicTrigger;
