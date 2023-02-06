<script lang="ts">
  import { Wallet } from "ethers";
  import argon2 from "argon2-browser/dist/argon2-bundled.min";
  import { onMount } from "svelte";
  import { entropyToMnemonic, mnemonicToSeed } from "bip39";

  onMount(async () => {
    let { hashHex } = await argon2.hash({
      pass: "password",
      salt: "somesalt",
      length: 64,
    });
    console.log(hashHex);
  });

  /*
  export const mnemonic: string = `${Array(12).join("abandon ")}about`;
  export const untrustedMnemonic: string = `excess shallow future wheat amazing fee rug hammer hire crazy lumber mean`;
  export const ethWallet: Wallet = Wallet.fromMnemonic(mnemonic);
  export const untrustedEthWallet: Wallet =
    Wallet.fromMnemonic(untrustedMnemonic);
  export const btcNode: any = bip32.fromSeed(mnemonicToSeedSync(mnemonic));
  export const btcWallet: any = btcNode.derivePath("84'/0'/0'/1");
  export const { address: btcAddress } = p2pkh({
    pubkey: btcWallet.publicKey,
    network: networks.bitcoin,
  });


  if (typeof window.ethereum !== 'undefined') {
    // Use the browser's provider
    web3 = new Web3(window.ethereum);
  } else {
    // Use a local provider
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }*/
</script>

<h1>USER LOGIN</h1>
