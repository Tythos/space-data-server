import cluster from "cluster";
import { cpus } from "os";
import { pid } from "process";
const totalCPUs = cpus().length;
let bingoProcess = 0;
export default {
    init: function () {
        console.log(`Number of CPUs is ${totalCPUs}`);
        console.log(`Master ${pid} is running`);
        // Fork workers.
        for (let i = 0; i < totalCPUs; i++) {
            let cWorker = cluster.fork();
            if (!bingoProcess) {
                bingoProcess = cWorker.process.pid;
                console.log(bingoProcess);
            }
        }
        cluster.on("exit", (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
            while (Object.keys(cluster.workers).length < totalCPUs) {
                let cWorker = cluster.fork();
                if (worker.process.pid === bingoProcess) {
                    bingoProcess = cWorker.process.pid;
                }
                console.log(bingoProcess, Object.keys(cluster.workers), totalCPUs);
            }
        });
    },
    deinit: function () {
    }
};
