import { readable, writable } from "svelte/store";
import { providers } from "ethers";

export const ethWallet = writable(null);
export const provider = readable(window["ethereum"] ? new providers.Web3Provider(window["ethereum"]) : new providers.CloudflareProvider());