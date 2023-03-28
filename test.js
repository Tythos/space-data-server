const { spawn } = require("child_process");
const ipath = `${process.cwd()}/go-ipfs/`;

const env = { IPFS_PATH: ipath };

let tt = spawn(`${ipath}ipfs`, ["daemon"]);
while (tt) { }