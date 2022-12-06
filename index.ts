
import PrimaryProcess from "./lib/primary/primary.js";
import WorkerProcess from "./lib/worker/worker.js";
import cluster from "cluster";
const { isPrimary } = cluster;
(async function () {
    await (isPrimary ? PrimaryProcess : WorkerProcess).init();
})()
