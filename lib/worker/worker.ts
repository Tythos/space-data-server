import { InitableProcess } from "../class/process.interface";
import { app } from "./app";
import { pid } from "process";
const port: String | undefined = process.env.PORT || "3000";
import dotenv from "dotenv";

export default {
    init: function () {
        dotenv.config();
        app.listen(port, () => {
            console.log(`⚡️[child process ${pid} server]: Server is running at https://localhost:${port}`);
        });
    },
    deinit: function () {

    }
} as InitableProcess;