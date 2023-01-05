import express from "express"
import { config } from "@/lib/config/config";

const checkAccount = (ethAddress: string) => {
    let check = (config.trustedAddresses[ethAddress.toLowerCase()]);
    //TODO stub
    return (config.trustedAddresses[ethAddress.toLowerCase()]?.trust === 4);
}
export const authorization: express.RequestHandler = async (req, res, next) => {


}