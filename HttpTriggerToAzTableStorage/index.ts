import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import Order from "./order";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    let response = {};
    let status = 500;

    if (req.body && req.body.action) { 
        // Data from request body
        const order = new Order(context, req.body);

        switch (req.body.action) { 
            case 'create':
                response = order.createOrder();
                break;
            case 'retrieve':
                response = order.retrieveOrder();  
                break;
            case 'update':
                response = await order.updateOrder();
                break;
            case 'delete':
                response = await order.deleteOrder();
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

};

export default httpTrigger;