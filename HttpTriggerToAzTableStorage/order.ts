import { TableClient } from "@azure/data-tables";
import { v4 as uuidv4 } from 'uuid';

class Order{
  private context: any;
  private body: any;
  private partitionKey!: string;
  private rowKey!: string;
  public orderDetails!: any;
  
  constructor(context: any, body: any) {
    this.context = context;
    this.body = body;
  }

  createOrder(): any {
    const uuidc = uuidv4();
    const theNewOrder = {
      partitionKey: uuidc,
      rowKey: uuidc + "-" + 1,
      orderDetails: this.body.orderDetails
    }
    this.context.bindings.outputTable = theNewOrder;
    return theNewOrder;
  }

  retrieveOrder(): any {
    // Beware of the capital P and R in PartitionKey and RowKey
    return this.context.bindings.inputTable.filter((order: any) => order.PartitionKey === this.body.partitionKey && order.RowKey === this.body.rowKey)[0];
  }

  async updateOrder():Promise<any> {
    const client = TableClient.fromConnectionString(process.env.nibestoracc_STORAGE || "", "orders");
    await client.updateEntity({
      partitionKey: this.body.partitionKey,
      rowKey: this.body.rowKey,
      orderDetails: typeof this.body.orderDetails === "object" ? JSON.stringify(this.body.orderDetails) : this.body.orderDetails
    }); //Never use "Replace" here, it will delete the other properties
    return {
      "message": "Order with partitionKey=" + this.body.partitionKey + " and rowKey=" + this.body.rowKey + " successfully updated."
    };
  }

  async deleteOrder():Promise<any> {
    const client = TableClient.fromConnectionString(process.env.nibestoracc_STORAGE || "", "orders");
    await client.deleteEntity(this.body.partitionKey, this.body.rowKey);
    return {
      "message": "Order with partitionKey=" + this.body.partitionKey + " and rowKey=" + this.body.rowKey + " successfully deleted."
    };
  }

  fetchOrders():[] {
    return this.context.bindings.inputTable;
  }

}

export default Order;