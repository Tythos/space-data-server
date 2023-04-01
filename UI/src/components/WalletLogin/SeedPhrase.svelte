<script>
  import {
    entropyToMnemonic,
    mnemonicToSeed,
    wordlists,
    generateMnemonic,
  } from "bip39";

  import { _host, devKey } from "../../stores/dev";

  export let seedPhrase = ~_host.indexOf("localhost") ? devKey : "";
  export let error = "";
  const generateRandom = (e) => {
    e.preventDefault();
    seedPhrase = generateMnemonic();
  };
  function validateSeedPhrase() {
    error = "";
    const words = seedPhrase.split(/\s{1,}/g).filter(Boolean);
    for (const word of words) {
      error = `"${word}" is not a valid word.`;
      for (const wordlist in wordlists) {
        if (wordlists[wordlist].includes(word)) {
          error = "";
        }
      }
      if (error) {
        return;
      }
    }
    if (words.length < 12 || words.length > 24) {
      error = "Seed phrase must contain between 12 and 24 words.";
      return;
    }
    error = "";
  }
</script>

<div class="flex gap-2">
  <textarea
    autocomplete="on"
    class="h-28 p-3 border border-gray-300 rounded w-full resize-none"
    bind:value={seedPhrase}
    on:input={validateSeedPhrase} />
  <button
    on:click={generateRandom}
    class="text-xs p-1 font-bold bg-orange-500 text-white"
    >GENERATE RANDOM</button>
</div>
{#if error}
  <p class="absolute text-red-500 text-left float-left w-84 text-xs">
    {error?.toString()?.split("(")[0]}
  </p>
{/if}
