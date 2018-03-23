import * as Amqp from "amqp-ts";

let brokerHost = process.env.BROKER_HOST || 'broker'
let brokerPort = process.env.BROKER_PORT || 5672
let connection = new Amqp.Connection(`amqp://${brokerHost}:${brokerPort}`);
let queue = connection.declareQueue("my_queue");

connection.completeConfiguration().then(() => {
    let message = JSON.stringify({ timestamp: Date.now(), payload: "Yo" })
    console.log(`Sending '${message}' to '${queue.name}'`)
    queue.send(new Amqp.Message(message));

    // bail out after sending
    setTimeout(async () => {
        await connection.close()
        process.exit()
    }, 1000)
});
