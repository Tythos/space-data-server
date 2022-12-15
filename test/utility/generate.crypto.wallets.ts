import { Wallet } from "ethers";
import { networks, payments } from "bitcoinjs-lib";
import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { mnemonicToSeedSync } from "bip39";
const bip32 = BIP32Factory(ecc);
const { p2pkh } = payments;

export const mnemonic: string = `${Array(12).join("abandon ")}about`;
export const untrustedMnemonic: string = `excess shallow future wheat amazing fee rug hammer hire crazy lumber mean`;
export const ethWallet: Wallet = Wallet.fromMnemonic(mnemonic);
export const untrustedEthWallet: Wallet = Wallet.fromMnemonic(untrustedMnemonic);
export const btcNode: any = bip32.fromSeed(mnemonicToSeedSync(mnemonic));
export const btcWallet: any = btcNode.derivePath("84'/0'/0'/1");
export const { address: btcAddress } = p2pkh({
    pubkey: btcWallet.publicKey,
    network: networks.bitcoin,
});