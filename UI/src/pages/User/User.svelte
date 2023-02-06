<script lang="ts">
  import { Wallet } from "ethers";
  import argon2 from "argon2-browser/dist/argon2-bundled.min";
  import { onMount } from "svelte";
  import { entropyToMnemonic, mnemonicToSeed } from "bip39";

  onMount(async () => {
    let { hashHex } = await argon2.hash({
      pass: "password",
      salt: "somesalt",
      hashLen: 32,
    });
    console.log(hashHex, hashHex.length);
    const mnemonic: string = `${Array(12).join("abandon ")}about`;
    const untrustedMnemonic: string = `excess shallow future wheat amazing fee rug hammer hire crazy lumber mean`;
    const ethWallet: Wallet = Wallet.fromMnemonic(mnemonic);
    console.log(ethWallet);
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

<section class="h-full">
  <div class="py-24 h-full text-gray-800">
    <div class="w-full flex items-center justify-center mb-12 md:mb-0">
      <form class="w-1/2 lg:w-1/2 sm:w-3/4">
        <!-- Email input -->
        <div class="mb-6">
          <input
            type="text"
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Email address" />
        </div>

        <!-- Password input -->
        <div class="mb-6">
          <input
            type="password"
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Password" />
        </div>

        <div class="flex justify-between items-center mb-6">
          <div class="form-group form-check">
            <input
              type="checkbox"
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              id="exampleCheck2" />
            <label
              class="form-check-label inline-block text-gray-800"
              for="exampleCheck2">Remember me</label>
          </div>
          <a href="#!" class="text-gray-800">Forgot password?</a>
        </div>

        <div class="text-left lg:text-left">
          <button
            type="button"
            class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Login
          </button>
          <p class="text-sm font-semibold mt-2 pt-1 mb-0 w-full">
            Your username and password generate a unique ethereum keypair in your browser and are not stored by us. 
            If you forget your login details, you won't be able to access your account, so keep them safe.
            <a
              href="#!"
              class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
              >More Information</a>
          </p>
        </div>
      </form>
    </div>
  </div>
</section>
