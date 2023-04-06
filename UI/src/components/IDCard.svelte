<script lang="ts">
  import { HDNodeWallet, formatEther } from "ethers";
  import type { Writable } from "svelte/store";
  import { onDestroy, onMount } from "svelte";
  import QRCode from "qrcode";
  import cc from "copy-to-clipboard";
  export let ethWallet;
  export let provider;
  export let vCard: Writable<any>;
  export let type = "Person";

  //(($ethWallet as HDNodeWallet).neuter().extendedKey);

  let ensAddress = "...",
    qrCodeImage,
    balance = "0",
    etherscanLink,
    lastUpdated;
  const getData = async () => {
    if ($ethWallet?.address) {
      etherscanLink = `https://etherscan.io/address/${$ethWallet.address}`;
      QRCode.toDataURL(etherscanLink).then((qsrc) => {
        qrCodeImage = qsrc;
      });
      balance = formatEther(await $provider.getBalance($ethWallet.address));
      $provider
        .lookupAddress($ethWallet.address)
        .then((a) => {
          ensAddress = a;
        })
        .catch((e) => {
          console.log(e);
          ensAddress = null;
        });
      lastUpdated = new Date().toISOString();
    }
  };

  $: {
    if ($ethWallet?.address) {
      getData();
    }
  }
  onMount(async () => {
    try {
      getData();
      $provider.on("block", getData);
    } catch (e) {}
  });
  onDestroy(() => {
    try {
      $provider.off("block", getData);
    } catch (e) {}
  });
</script>

<section class="mb-32 text-gray-800 text-center md:text-left">
  <div class="block rounded-lg shadow-lg bg-white">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="cursor-pointer w-full flex flex-col items-start justify-start p-2 pl-4 gap-2 text-gray-400"
      on:click={(e) => cc($ethWallet.address)}>
      <div class="break-all text-left text-xs md:text-sm">
        {$ethWallet.address}
      </div>
      <div class="flex items-center justify-center gap-4">
        <a
          class="text-underline text-sm"
          target="_blank"
          rel="noreferrer"
          href={ensAddress
            ? `https://app.ens.domains/name/${ensAddress}/details`
            : `https://app.ens.domains`}>
          ENS: {ensAddress || "NONE"}</a>
      </div>
    </div>
    <div class="flex flex-wrap items-center">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:click={(e) => window.open(etherscanLink)}
        class="items-center justify-center grow-0 shrink-0 basis-auto block flex w-full lg:w-6/12 xl:w-4/12 p-6">
        <img
          src={qrCodeImage}
          class="w-1/3 h-1/3 md:w-1/2 md:h-1/2"
          alt="qrcode" />
      </div>
      <div
        class="text-center grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12 text-xs md:text-sm">
        <div>
          {#if type === "Person"}
            {#if $vCard.honorificPrefix || $vCard.givenName || $vCard.familyName || $vCard.honorificSuffix}
              {$vCard.honorificPrefix}
              {$vCard.givenName}
              {$vCard.familyName}
              {$vCard.honorificSuffix}
            {/if}
          {/if}
          <div class="m-2 font">
            {$vCard.affiliation.name || $vCard.affiliation.legalName}
          </div>
        </div>
        <div class="px-2 py-5 md:px-12">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <p class="text-gray-500 mb-6 pb-2" title={balance}>
            Balance<br />
            {parseFloat(balance)?.toFixed(6) || 0} ETH
          </p>
          <div>
            <button
              on:click={(e) => {
                $ethWallet = null;
              }}
              type="button"
              class="inline-block px-7 py-3 bg-gray-800 text-white font-medium text-sm leading-snug uppercase shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="pl-4 p-2 text-xs text-gray-500">
      UPDATED: {lastUpdated || ""}
    </div>
  </div>
</section>
