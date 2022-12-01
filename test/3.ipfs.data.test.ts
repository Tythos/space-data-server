import * as Ctl from "ipfsd-ctl";
import * as ipfsHttpModule from "ipfs-http-client"
import * as goIpfsModule from "go-ipfs";

describe('Test Publishing to IPFS', () => {
    test('Post Data', async () => {
        const ipfsd = await Ctl.createController({
            ipfsHttpModule,
            ipfsBin: goIpfsModule.path()
        })
        const id = await ipfsd.api.id()

        console.log(id)

        await ipfsd.stop()

    })
});