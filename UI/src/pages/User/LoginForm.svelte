<script lang="ts">
  import { Wallet } from "ethers";
  import { Icon } from "svelte-awesome";
  import argon2 from "argon2-browser/dist/argon2-bundled.min";
  import { entropyToMnemonic, mnemonicToSeed, wordlists } from "bip39";
  import { infoCircle } from "svelte-awesome/icons";
  import SeedPhrase from "./SeedPhrase.svelte";
  import { ethWallet } from "@/UI/src/stores/user";
  const MODES = {
    PASSWORD: 0,
    MNEMONIC: 1,
  };

  let mode = MODES.PASSWORD;

  let username, password, seedPhrase, error;
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
    console.log(seedPhrase)
    try {
      $ethWallet = Wallet.fromMnemonic(seedPhrase);
    } catch (e) {
        error = e;
    }
  };
  $: {
    console.log(seedPhrase);
  }
</script>

<div class="py-12 h-full text-gray-800">
  <div class="w-full flex items-center justify-center mb-12 md:mb-0">
    <form class="w-1/2 lg:w-1/2 xs:w-3/4" on:submit={login}>
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
      <div class="flex justify-between items-center mb-6">
        <div class="form-group form-check">
          {#if mode === MODES.PASSWORD}
            <input
              type="checkbox"
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
        <h2 class="font-bold mt-6">Note:</h2>
        <p class="text-sm font-semibold mt-2 pt-1 mb-0 w-full">
          Your username and password generate a unique <a
            href="https://ethereum.org/en/developers/docs/accounts/"
            >Ethereum</a>
          keypair in your browser and are not stored anywhere else. If you forget
          your login details, you won't be able to access your account, so keep them
          safe.
          <!--<a
            href="#!"
            class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
            >More Information</a>-->
        </p>
      </div>
    </form>
  </div>
</div>
