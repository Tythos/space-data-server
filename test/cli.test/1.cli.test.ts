import { execSync } from "child_process";
import { getPrivateKey } from "../../cli";

describe("installServiceFile function", () => {
    test("shows commands to install service file", () => {
        expect(execSync("node ./build/cli.cjs service-file-install-commands").toString().length).toBeGreaterThan(0);
    });
    test("creates the correct service file", () => {
        expect(execSync("node ./build/cli.cjs create-service-file --path").toString().length).toBeGreaterThan(0);
    });

    describe("ingests a ethereum key", () => {

    });

    describe("yargs command line arguments", () => {

    });
});