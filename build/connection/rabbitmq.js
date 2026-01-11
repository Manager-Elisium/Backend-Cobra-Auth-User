"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
exports.createRabbitmqConnection = createRabbitmqConnection;
const amqplib_1 = __importDefault(require("amqplib"));
const client_1 = require("src/rabbitmq/client");
exports.connection = null;
async function createRabbitmqConnection() {
    try {
        if (!exports.connection) {
            const amqpServer = process.env.RABBITMQ_CLIENT ?? "amqps://rxqrqqri:CiBnRQqljzD0degYECM6JCWj_d_chRb7@lionfish.rmq.cloudamqp.com/rxqrqqri";
            exports.connection = await amqplib_1.default.connect(amqpServer);
        }
        await (0, client_1.consumeService)();
        return exports.connection;
    }
    catch (error) {
        console.log(`Error ::: `, error);
        // return null;
    }
}
