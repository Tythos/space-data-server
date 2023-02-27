const { execSync } = require("child_process");
const { writeFileSync } = require("fs");
import readline from 'readline';
import yargs from 'yargs';

const installServiceFile = () => {
    const serviceFilePath = "/etc/systemd/system/spacedataserver.service";
    const cc = (c) => c.toString().replace(/\n/g, "");
    const whichNode: any = cc(execSync(`which node`));
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
    console.log(serviceFile);

    writeFileSync(serviceFilePath, serviceFile);
    execSync(`sudo systemctl daemon-reload`);
    execSync(`sudo systemctl enable spacedataserver.service`);
    execSync(`sudo systemctl restart spacedataserver.service`);
}

async function getPassword(prompt: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true,
        historySize: 0, // Set the history size to 0 to disable history
    });

    const password = await new Promise<string>((resolve, reject) => {
        rl.question(prompt, (password) => {
            rl.close();
            resolve(password);
        });

        // Disable echoing of typed characters to hide the password
        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }
    });

    return password;
}

async function addPrivateKey() {
    const password = await getPassword('Enter your password: ');
    console.log(`Your password is: ${password}`);
}



const argv: any = yargs(process.argv.slice(2))
    .usage('Usage: $0 [options] <name>')
    .demandCommand(1)
    .option('u', {
        alias: 'uppercase',
        describe: 'Convert name to uppercase',
        type: 'boolean',
    })
    .help()
    .argv;

const name = argv._[0];
const greeting = `Hello, ${argv.uppercase ? name.toUpperCase() : name}!`;
console.log(greeting);

