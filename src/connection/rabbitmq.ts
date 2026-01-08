import amqp from 'amqplib';
import { consumeService } from 'src/rabbitmq/client';


export let connection: amqp.Connection | null = null;

export async function createRabbitmqConnection(): Promise<amqp.Connection> {
  try {
    if (!connection) {
      const amqpServer = process.env.RABBITMQ_CLIENT ?? "amqps://rxqrqqri:CiBnRQqljzD0degYECM6JCWj_d_chRb7@lionfish.rmq.cloudamqp.com/rxqrqqri";
      connection = await amqp.connect(amqpServer);
    }

    await consumeService();
    return connection;
  } catch (error) {
    console.log(`Error ::: `, error);
    // return null;
  }
}