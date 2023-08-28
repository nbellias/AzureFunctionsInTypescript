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
const serviceBusQueueTrigger = function (context, mySbMsg) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
};
exports.default = serviceBusQueueTrigger;
