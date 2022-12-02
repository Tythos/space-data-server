
import PrimaryProcess from "./lib/primary/primary.js";
import WorkerProcess from "./lib/worker/worker.js";
import { startIPFS } from "./lib/ipfs/index";
import cluster from "cluster";
const { isPrimary } = cluster;
(isPrimary ? PrimaryProcess : WorkerProcess).init();


if (isPrimary) {
    startIPFS();
}
