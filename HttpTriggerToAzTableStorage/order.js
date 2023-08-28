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
const data_tables_1 = require("@azure/data-tables");
const uuid_1 = require("uuid");
class Order {
    constructor(context, body) {
        this.context = context;
        this.body = body;
    }
    createOrder() {
        const uuidc = (0, uuid_1.v4)();
        const theNewOrder = {
            partitionKey: uuidc,
            rowKey: uuidc + "-" + 1,
            orderDetails: this.body.orderDetails
        };
        this.context.bindings.outputTable = theNewOrder;
        return theNewOrder;
    }
    retrieveOrder() {
        // Beware of the capital P and R in PartitionKey and RowKey
        return this.context.bindings.inputTable.filter((order) => order.PartitionKey === this.body.partitionKey && order.RowKey === this.body.rowKey)[0];
    }
    updateOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = data_tables_1.TableClient.fromConnectionString(process.env.nibestoracc_STORAGE || "", "orders");
            yield client.updateEntity({
                partitionKey: this.body.partitionKey,
                rowKey: this.body.rowKey,
                orderDetails: typeof this.body.orderDetails === "object" ? JSON.stringify(this.body.orderDetails) : this.body.orderDetails
            }); //Never use "Replace" here, it will delete the other properties
            return {
                "message": "Order with partitionKey=" + this.body.partitionKey + " and rowKey=" + this.body.rowKey + " successfully updated."
            };
        });
    }
    deleteOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = data_tables_1.TableClient.fromConnectionString(process.env.nibestoracc_STORAGE || "", "orders");
            yield client.deleteEntity(this.body.partitionKey, this.body.rowKey);
            return {
                "message": "Order with partitionKey=" + this.body.partitionKey + " and rowKey=" + this.body.rowKey + " successfully deleted."
            };
        });
    }
    fetchOrders() {
        return this.context.bindings.inputTable;
    }
}
exports.default = Order;
