import * as Amqp from "amqp-ts";

let brokerHost = process.env.BROKER_HOST || 'broker'
let brokerPort = process.env.BROKER_PORT || 5672
let connection = new Amqp.Connection(`amqp://${brokerHost}:${brokerPort}`);
let queue = connection.declareQueue("my_queue");

queue.activateConsumer((message) => {
    console.log(`Received '${message.getContent()}' from '${queue.name}'`);
});
