import { IPC } from "../class/ipc.interface";

export async function ipcRequest(message: IPC) {
    return new Promise((resolve, reject) => {
        const id = performance.now();
        const listener = (response) => {
            if (response.id === id) {
                process.off('message', listener);
                if (response.error) {
                    reject(new Error(response.error));
                } else {
                    resolve(response.payload);
                }
            }
        };
        process.on('message', listener);
        message.id = id;
        (process as any).send(message);
    });
}