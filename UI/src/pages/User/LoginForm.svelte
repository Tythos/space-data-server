<script lang="ts">
  import { Wallet, utils, providers } from "ethers";
  import { Icon } from "svelte-awesome";
  import argon2 from "argon2-browser/dist/argon2-bundled.min";
  import { entropyToMnemonic } from "bip39";
  import { repeat } from "svelte-awesome/icons";
  import SeedPhrase from "./SeedPhrase.svelte";

  import {
    ethWallet,
    hdNode,
    getBIP32Path,
    derivationPath,
    provider,
  } from "@/UI/src/stores/user";
  import { onMount } from "svelte";

  const MODES = {
    PASSWORD: 0,
    MNEMONIC: 1,
  };

  let mode = MODES.PASSWORD;

  let username, password, seedPhrase, error;

  onMount(() => {});

  const connectWallet = async () => {
    error = "";
    try {
      const windowEthereum = window["ethereum"] || window["web3"];
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
    } catch (e) {
      error = e;
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
      $hdNode = utils.HDNode.fromMnemonic(seedPhrase);

      $ethWallet = new Wallet(
        $hdNode.derivePath(getBIP32Path($derivationPath)).privateKey
      );
    } catch (e) {
      error = e;
    }
  };
</script>

<div class="py-12 h-full text-gray-800 bg-white-300">
  <div
    class="w-full flex flex-col gap-4 items-center justify-center mb-12 md:mb-0">
    {#if window.ethereum}
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
      ease-in-out whitespace-nowrap">
        Connect Wallet
      </div>
      {#if error}
        <div class="text-red-500 text-xs font-thin">{error}</div>
      {/if}
      <div class="w-1/2 relative flex py-5 items-center">
        <div class="flex-grow border-t border-gray-400" />
        <span class="flex-shrink mx-4 text-gray-400">OR</span>
        <div class="flex-grow border-t border-gray-400" />
      </div>
    {/if}
    <form class="md:w-1/2 sm:w-1/2 lg:w-1/2 xs:w-2/3" on:submit={login}>
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
        <div class="mb-2">
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
      <div class="flex justify-between items-center mb-2 text-sm lg:text-xs">
        <div
          class="form-group form-check flex items-center justify-center gap-1" />

        <div class="flex items-center justify-center gap-2">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <p
            class:bg-purple-800={mode === MODES["MNEMONIC"]}
            class:bg-blue-600={mode === MODES["PASSWORD"]}
            class="text-white p-1 px-2 rounded cursor-pointer flex gap-2 items-center"
            on:click={() => (mode = MODES[!mode ? "MNEMONIC" : "PASSWORD"])}>
            <Icon data={repeat} />{!mode
              ? "Import Seed Phrase"
              : "UserName / Password"}
          </p>
        </div>
      </div>

      <div class="flex flex-col gap-4 text-left lg:text-left">
        <button
          type="submit"
          class="w-32 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Login
        </button>
        <div>
          <h2 class="font-bold text-sm">Note:</h2>
          <p class="text-xs font-semibold mt-2 pt-1 mb-0 w-full">
            Your username and password create a unique <a
              href="https://ethereum.org/en/developers/docs/accounts/"
              >Ethereum</a>
            keypair in your browser and are not stored anywhere else. If you forget
            your login details, you won't be able to access your account, so keep
            them safe.
          </p>
        </div>
      </div>
    </form>
  </div>
</div>
