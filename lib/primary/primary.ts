import { InitableProcess } from "../class/process.interface";
import cluster from "cluster";
import { cpus } from "os";
import { pid } from "process";
import { ChildProcess } from 'child_process';
const totalCPUs = cpus().length;

let bingoProcess: Number = 0;

export default {
    init: function () {
        console.log(`Number of CPUs is ${totalCPUs}`);
        console.log(`Master ${pid} is running`);

        // Fork workers.
        for (let i = 0; i < totalCPUs; i++) {
            let cWorker: ChildProcess | any = cluster.fork();
            if (!bingoProcess) {
                bingoProcess = cWorker.process.pid;
                console.log(bingoProcess);
            }

        }

        cluster.on("exit", (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
            console.log("Let's fork another worker!");
            while (Object.keys(
                cluster.workers as unknown as NodeJS.Dict<Worker>
            ).length < totalCPUs) {
                let cWorker: ChildProcess | any = cluster.fork();
                if (worker.process.pid === bingoProcess) {
                    bingoProcess = cWorker.process.pid;
                }
                console.log(bingoProcess, Object.keys(cluster.workers as unknown as NodeJS.Dict<Worker>), totalCPUs)
            }
        });
    },
    deinit: function () {

    }
} as InitableProcess