<script lang="ts">
  import { HDNodeWallet } from "ethers";
  import { Icon } from "svelte-awesome";
  import argon2 from "argon2-browser/dist/argon2-bundled.min";
  import { entropyToMnemonic } from "bip39";
  import { repeat } from "svelte-awesome/icons";
  import SeedPhrase from "./SeedPhrase.svelte";
  import { onMount } from "svelte";

  export let wallet;
  export let LoginButton;

  const MODES = {
    PASSWORD: 0,
    MNEMONIC: 1,
  };

  let mode = MODES.PASSWORD;

  let username, password, seedPhrase, error;

  onMount(() => {});

  const login = async (e) => {
    e.preventDefault();

    if (username && password) {
      let { hashHex } = await argon2.hash({
        pass: username,
        salt: password,
        hashLen: 32,
        time: 100,
      });
      seedPhrase = entropyToMnemonic(hashHex);
    }
    try {
      wallet = HDNodeWallet.fromPhrase(seedPhrase);
    } catch (e) {
      error = e;
    }
  };
</script>

<form class="md:w-1/2 sm:w-1/2 lg:w-1/2 xs:w-2/3" on:submit={login}>
  <div class="h-36">
    {#if mode === MODES.PASSWORD}
      <!-- Email input -->
      <div class="mb-6">
        <input
          bind:value={username}
          required
          type="email"
          autocomplete="username"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Email address" />
      </div>

      <!-- Password input -->
      <div class="mb-2">
        <input
          required
          minlength="24"
          bind:value={password}
          type="password"
          autocomplete="current-password"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Password" />
      </div>
    {:else if mode === MODES.MNEMONIC}
      <div class="p-1">
        <SeedPhrase bind:seedPhrase bind:error />
      </div>
    {/if}
  </div>
  <div class="flex justify-between items-center mb-2 text-sm lg:text-xs">
    <div class="form-group form-check flex items-center justify-center gap-1" />

    <div class="flex items-center justify-center gap-2 text-xs">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <p
        class:bg-gray-800={mode === MODES["MNEMONIC"]}
        class:bg-black={mode === MODES["PASSWORD"]}
        class="text-white p-1 px-2 cursor-pointer flex gap-2 items-center"
        on:click={() => (mode = MODES[!mode ? "MNEMONIC" : "PASSWORD"])}>
        <Icon data={repeat} />{!mode
          ? "Import Seed Phrase"
          : "UserName / Password"}
      </p>
    </div>
  </div>

  <LoginButton />
</form>
