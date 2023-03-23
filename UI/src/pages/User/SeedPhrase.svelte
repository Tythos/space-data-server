<script>
  import { entropyToMnemonic, mnemonicToSeed, wordlists } from "bip39";
  import { _host } from "../../stores/dev";

  export let seedPhrase = ~_host.indexOf("localhost")
    ? "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
    : "";
  export let error = "";

  function validateSeedPhrase() {
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
  class="h-32 p-3 border border-gray-300 rounded w-full resize-none"
  bind:value={seedPhrase}
  on:input={validateSeedPhrase} />
{#if error}
  <p class="text-red-500 text-left float-left w-1/2 text-xs">{error}</p>
{/if}
