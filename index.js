import express from 'express';
import dotenv from 'dotenv';
import cluster from "cluster";
import { cpus } from "os";
import { pid } from "process";
const totalCPUs = cpus().length;
if (cluster.isPrimary) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${pid} is running`);
    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });
}
else {
    dotenv.config();
    const app = express();
    const port = process.env.PORT;
    app.get('/', (req, res) => {
        console.log(new Date(), pid);
        res.send(`Express + TypeScript Server ${pid}`);
    });
    app.listen(port, () => {
        console.log(`⚡️[child process ${pid} server]: Server is running at https://localhost:${port}`);
    });
}
