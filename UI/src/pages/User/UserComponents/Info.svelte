<script lang="ts">
  import {
    ethWallet,
    provider,
    derivationPath,
    useDefaultWallet,
  } from "@/UI/src/stores/user";
  import { formatEther } from "ethers";
  import { onDestroy, onMount } from "svelte";
  import QRCode from "qrcode";
  import cc from "copy-to-clipboard";

  let ensAddress = "...",
    qrCodeImage,
    balance,
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

  /*
  let addresses = [];

  const recalculateAddresses = () => {
    let hdWallet = $ethWallet;
    let dPath = "m";
    for (let d in $derivationPath) {
      dPath += `/${$derivationPath[d].value}${$derivationPath[d].h}`;
    }
    addresses = [];
    for (let i = 0; i < 100; i++) {
      addresses.push(hdWallet.derivePath(`${dPath}/${i}`).address);
    }
  };

  $: {
    recalculateAddresses();
  }*/
</script>

<div class="w-full flex flex-col text-gray-500">
  <div class="p-2 flex gap-2 items-center justify-center w-full h-full border">
    <label for="default-wallet">Use Default Wallet?</label>
    <input
      type="checkbox"
      id="default-wallet"
      class="form-checkbox h-4 w-4"
      bind:checked={$useDefaultWallet} />
  </div>
  {#if !$useDefaultWallet}
    <div class="border-l border-r border-b flex items-center justify-center">
      <div class="flex text-xs">
        {#each Object.keys($derivationPath) as key}
          <div class="flex flex-col m-2 gap-1">
            <label for={key}>{key.split("_")[0]}:</label>
            <div class="flex justify-center items-center">
              <div class="text-xs pr-2 w-full">
                {#if key === "purpose"}m {/if}/
              </div>
              <input
                type="number"
                id={key}
                min="0"
                readonly={~["purpose", "cointype"].indexOf(key) ? true : false}
                class="w-12 border rounded p-1"
                bind:value={$derivationPath[key].value}
                disabled={$useDefaultWallet} />
              <input
                type="text"
                class="w-3 rounded p-1"
                readonly
                bind:value={$derivationPath[key].h}
                disabled={$useDefaultWallet} />
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
<section class="mb-32 text-gray-800 text-center md:text-left">
  <div class="block rounded-lg shadow-lg bg-white">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="cursor-pointer w-full flex flex-col items-start justify-start p-2 pl-4 gap-2 text-gray-400"
      on:click={(e) => cc($ethWallet.address)}>
      <div class="break-all text-left text-[.5rem] md:text-xs">
        {$ethWallet.address}
      </div>
      <div class="flex items-center justify-center gap-4">
        <a
          class="text-blue-800 text-base"
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
        <img src={qrCodeImage} class="w-1/2 h-1/2" alt="qrcode" />
      </div>
      <div
        class="text-center grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
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
