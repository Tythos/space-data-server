#!/usr/bin/env node
import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { Wallet, utils, providers } from "ethers";
import { keyconverter, pubKeyToEthAddress } from "keyconverter/src/keyconverter";
import { mnemonicToEntropy } from "bip39";
import readline from "readline";
import yargs from "yargs";
import { IPFSController, startIPFS, IPFSUtilities } from "./lib/ipfs/index";

export const showServiceFileInstallCommands = () => {
    console.log(`
sudo cp spacedataserver.service /etc/systemd/system/spacedataserver.service
sudo systemctl daemon-reload
sudo systemctl enable spacedataserver.service
sudo systemctl restart spacedataserver.service
 `)
}

export const createServiceFile = (serviceFilePath: string) => {
    const cc = (c: string) => c.toString().replace(/\n/g, "");
    const whichNode: any = cc(execSync(`which node`).toString());
    const group: any = (process.getgroups ? process.getgroups() : [])[0];

    const serviceFile = `[Unit]
Description=SpaceDataServer

[Service]
ExecStart=${whichNode} ${process.cwd()}/build/server.cjs
Restart=always
User=${process.env.USER}
Group=${group}
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=${process.cwd()}

[Install]
WantedBy=multi-user.target`;
    console.log(serviceFilePath);
    if (!serviceFilePath) {
        console.log(serviceFile);
    } else {
        writeFileSync(serviceFilePath, serviceFile);
    }
};

export async function getPrivateKey(prompt: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
        historySize: 0, // Set the history size to 0 to disable history
    });

    const mnemonic = await new Promise<string>((resolve, reject) => {
        rl.question(prompt + " \n", (password) => {
            rl.close();
            resolve(password);
        });

        // Disable echoing of typed characters to hide the password
        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }
    });

    return mnemonic;
}

yargs(process.argv.slice(2))
    .usage("Usage: $0 <command> [options]")
    .command(
        "create-service-file",
        "Install SpaceDataServer service file",
        (yargs) => {
            yargs.positional("path", {
                describe: "Service file path",
                default: "",
                type: "string",
            });
        },
        (argv) => {
            createServiceFile(argv.path as string);
        }
    )
    .command("service-file-install-commands", "Show commands needed to install service file", (yargs) => {
    },
        (argv) => {
            showServiceFileInstallCommands();
        })
    .command("add-private-key", "Add a private key", () => { }, async () => {
        const mnemonic = await getPrivateKey("Enter your mnemonic passphrase\n");
        let kC = new keyconverter({ kty: "EC", name: "ECDSA", namedCurve: "K-256", hash: "SHA-256" } as EcKeyGenParams);
        const entropy = mnemonicToEntropy(mnemonic.trim());
        await kC.import(Buffer.from(entropy).toString('hex'));
        let binKey = await kC.export("ipfs:protobuf", "private") as ArrayBuffer;
        let hash = IPFSUtilities.importKey(binKey);
        const hdNode = utils.HDNode.fromMnemonic(mnemonic.trim());

        const ethWallet = new Wallet(
            hdNode.derivePath(`m/44'/60'/0'/0/0`).privateKey
        );
        console.log(`Your ETH address is: ${ethWallet.address}\n`);
        console.log(`Your IPNS Hash: ${hash}`);
    })
    .option("name", {
        describe: "Your name",
        type: "string",
    })
    .option("u", {
        alias: "uppercase",
        describe: "Convert name to uppercase",
        type: "boolean",
    })
    .demandCommand(1)
    .help()
    .argv;



// Install service file
// Show current Ethereum address, ipns address, ENS domain (if applicable)
// Import Ethereum Key to ipfs
// Export Ethereum Key from ipfs
// Show trusted addresses (call contract)