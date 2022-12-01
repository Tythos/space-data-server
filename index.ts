import * as Ctl from "ipfsd-ctl";
import * as ipfsModule from "ipfs";
import * as ipfsHttpModule from "ipfs-http-client"
//@ts-ignore
import * as goIpfsModule from "go-ipfs";

import PrimaryProcess from "./lib/primary/primary.js";
import WorkerProcess from "./lib/worker/worker.js";
import cluster from "cluster";
const { isPrimary } = cluster;
(isPrimary ? PrimaryProcess : WorkerProcess).init();

const startIPFS = async () => {
    const ipfsd = await Ctl.createController({
        ipfsHttpModule,
        ipfsBin: goIpfsModule.path()
    })
    const id = await ipfsd.api.id()

    console.log(id)
    setTimeout(async () => {
        await ipfsd.stop()
    }, 10000)

}

if (isPrimary) {
    startIPFS();
}
