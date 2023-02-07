<script lang="ts">
  import { Wallet, utils, providers } from "ethers";
  import { Icon } from "svelte-awesome";
  import argon2 from "argon2-browser/dist/argon2-bundled.min";
  import { entropyToMnemonic, mnemonicToSeed, wordlists } from "bip39";
  import { infoCircle } from "svelte-awesome/icons";
  import SeedPhrase from "./SeedPhrase.svelte";
  import {
    ethWallet,
    getBIP32Path,
    derivationPath,
    provider,
  } from "@/UI/src/stores/user";
  const MODES = {
    PASSWORD: 0,
    MNEMONIC: 1,
  };

  let mode = MODES.PASSWORD;

  let username, password, seedPhrase, error;
  const connectWallet = async () => {
    const windowEthereum = window["ethereum"];
    const externalEthAddress = await windowEthereum.request({
      method: "eth_requestAccounts",
    });
    var provider = new providers.Web3Provider(windowEthereum);

    if (externalEthAddress.length) {
      $ethWallet = {
        address: externalEthAddress[0],
        signMessage: async (message) => {
          const signer = provider.getSigner();
          return signer.signMessage(message);
        },
      };
    }
  };

  const login = async (e) => {
    e.preventDefault();
    if (!seedPhrase) {
      let { hashHex } = await argon2.hash({
        pass: username,
        salt: password,
        hashLen: 32,
      });
      seedPhrase = entropyToMnemonic(hashHex);
    }
    try {
      $ethWallet = utils.HDNode.fromMnemonic(seedPhrase).derivePath(
        getBIP32Path($derivationPath)
      );
    } catch (e) {
      error = e;
    }
  };
</script>

<div class="py-12 h-full text-gray-800">
  <div
    class="w-full flex flex-col gap-4 items-center justify-center mb-12 md:mb-0">
    <div
      on:keyup={connectWallet}
      on:click={connectWallet}
      class="sm:w-3/4 md:w-1/2 lg:w-1/3 h-8 text-xs flex items-center justify-center px-12
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">
      Connect Wallet
    </div>
    <div class="w-1/2 relative flex py-5 items-center">
      <div class="flex-grow border-t border-gray-400" />
      <span class="flex-shrink mx-4 text-gray-400">OR</span>
      <div class="flex-grow border-t border-gray-400" />
    </div>
    <form class="w-full lg:w-1/2 xs:w-2/3" on:submit={login}>
      {#if mode === MODES.PASSWORD}
        <!-- Email input -->
        <div class="mb-6">
          <input
            bind:value={username}
            required
            type="email"
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Email address" />
        </div>

        <!-- Password input -->
        <div class="mb-6">
          <input
            required
            minlength="24"
            bind:value={password}
            type="password"
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Password" />
        </div>
      {:else if mode === MODES.MNEMONIC}
        <div class="p-1">
          <SeedPhrase bind:seedPhrase bind:error />
        </div>
      {/if}
      <div class="flex justify-between items-center mb-6 text-sm lg:text-xs">
        <div
          class="form-group form-check flex items-center justify-center gap-1">
          {#if mode === MODES.PASSWORD}
            <input
              type="checkbox"
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
              id="exampleCheck2" />
            <label
              class="form-check-label inline-block text-gray-800"
              for="exampleCheck2">Remember me</label>
          {/if}
        </div>

        <div class="flex items-center justify-center gap-2">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <p
            class="text-blue-600 cursor-pointer"
            on:click={() => (mode = MODES[!mode ? "MNEMONIC" : "PASSWORD"])}>
            {!mode ? "Import Seed Phrase" : "UserName / Password"}
          </p>
          <a href="https://en.bitcoin.it/wiki/Seed_phrase" class="text-black">
            <Icon data={infoCircle} /></a>
        </div>
      </div>

      <div class="text-left lg:text-left">
        <button
          type="submit"
          class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Login
        </button>
        <h2 class="font-bold mt-6 text-sm">Note:</h2>
        <p class="text-xs font-semibold mt-2 pt-1 mb-0 w-full">
          Your username and password create a unique <a
            href="https://ethereum.org/en/developers/docs/accounts/"
            >Ethereum</a>
          keypair in your browser and are not stored anywhere else. If you forget
          your login details, you won't be able to access your account, so keep them
          safe.
        </p>
      </div>
    </form>
  </div>
</div>
