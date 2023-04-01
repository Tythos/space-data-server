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

<textarea
  autocomplete="on"
  class="h-28 p-3 border border-gray-300 rounded w-full resize-none"
  bind:value={seedPhrase}
  on:input={validateSeedPhrase} />

{#if error}
  <p class="absolute text-red-500 text-left float-left w-84 text-xs">
    {error?.toString()?.split("(")[0]}
  </p>
{/if}
