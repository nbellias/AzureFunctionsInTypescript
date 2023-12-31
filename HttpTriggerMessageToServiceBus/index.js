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
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
};
exports.default = httpTrigger;
