const { execSync } = require("child_process");
const { writeFileSync } = require("fs");

const serviceFilePath = "/etc/systemd/system/spacedataserver.service";
const cc = (c) => c.toString().replace(/\n/g, "");
const whichNode = cc(execSync(`which node`));
const group = process.getgroups()[0];
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