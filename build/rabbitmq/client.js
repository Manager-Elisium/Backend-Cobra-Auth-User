"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeService = consumeService;
const rabbitmq_1 = require("src/connection/rabbitmq");
const user_1 = require("src/repository/user");
async function consumeService() {
    try {
        if (rabbitmq_1.connection) {
            const channel = await rabbitmq_1.connection.createConfirmChannel();
            let checkQueued = await channel.checkQueue('ONLINE_OFFLINE_USER');
            console.log(checkQueued, ` checkQueued `);
            await channel.consume('ONLINE_OFFLINE_USER', (data) => {
                if (!!data?.content?.toString()) {
                    const isOnline = JSON.parse(data?.content?.toString());
                    if (isOnline?.ONLINE) {
                        (0, user_1.updateById)(isOnline?.USER_ID, { ONLINE: isOnline?.ONLINE, SOCKET_ID: isOnline?.SOCKET_ID });
                    }
                    else {
                        (0, user_1.updateSocketId)(isOnline?.SOCKET_ID, { ONLINE: isOnline?.ONLINE });
                    }
                }
            }, { noAck: true });
        }
    }
    catch (error) {
    }
}
