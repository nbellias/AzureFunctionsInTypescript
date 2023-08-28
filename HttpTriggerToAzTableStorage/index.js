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
const order_1 = require("./order");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log('HTTP trigger function processed a request.');
        let response = {};
        let status = 500;
        if (req.body && req.body.action) {
            // Data from request body
            const order = new order_1.default(context, req.body);
            switch (req.body.action) {
                case 'create':
                    response = order.createOrder();
                    break;
                case 'retrieve':
                    response = order.retrieveOrder();
                    break;
                case 'update':
                    response = yield order.updateOrder();
                    break;
                case 'delete':
                    response = yield order.deleteOrder();
                    break;
                default:
                    response = order.fetchOrders();
                    break;
            }
            status = 200;
        }
        context.res = {
            status: status,
            body: response
        };
    });
};
exports.default = httpTrigger;
