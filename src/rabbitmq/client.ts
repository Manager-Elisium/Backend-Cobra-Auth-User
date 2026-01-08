import { connection, createRabbitmqConnection } from "src/connection/rabbitmq";
import { User } from "src/domain/user.entity";
import { updateById, updateSocketId } from "src/repository/user";

async function consumeService() {
    try {
        if (connection) {
            const channel = await connection.createConfirmChannel();
            let checkQueued = await channel.checkQueue('ONLINE_OFFLINE_USER')
            console.log(checkQueued, ` checkQueued `)
            await channel.consume('ONLINE_OFFLINE_USER', (data: any) => {
                if (!!data?.content?.toString()) {
                    const isOnline = JSON.parse(data?.content?.toString());
                    if (isOnline?.ONLINE) {
                        updateById(isOnline?.USER_ID, { ONLINE: isOnline?.ONLINE, SOCKET_ID: isOnline?.SOCKET_ID } as User);
                    } else {
                        updateSocketId(isOnline?.SOCKET_ID, { ONLINE: isOnline?.ONLINE } as User);
                    }
                }
            }, { noAck: true });
        }
    } catch (error) {

    }
}


export { consumeService };