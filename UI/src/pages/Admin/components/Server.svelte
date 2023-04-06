<script lang="ts">
  import { onMount } from "svelte";
  import { _host } from "@/UI/src/stores/dev";
  import {
    serverPK,
    getAuthHeaders,
    serverEthWallet,
    getServerPK,
  } from "@/UI/src/stores/admin";
  import { Icon } from "svelte-awesome";
  import { copy } from "svelte-awesome/icons";
  import { ethWallet } from "@/UI/src/stores/user";
  import { encryptMessage, decryptMessage } from "@/lib/utility/encryption";
  import WalletInput from "@/UI/src/components/WalletLogin/WalletInput.svelte";
  import LoginButton from "./AdminWalletLoginButton.svelte";
  import type { HDNodeWallet } from "ethers";
  import { pubKeyToIPFSCID } from "keyconverter/src/keyconverter";
  import copyToClipboard from "copy-to-clipboard";
  /**
   *
   * Server Admin Key
   *
   *
   **/

  let verifyChange = false;
  let oldAddress = $serverEthWallet?.address;
  let newCID;

  $: {
    if ($serverEthWallet?.address && $serverEthWallet?.address !== oldAddress) {
      verifyChange = true;
      newCID = pubKeyToIPFSCID(
        $serverEthWallet?.publicKey.replace(/^0x/, "")
      ).then((m) => {
        newCID = m;
      });
    }
  }

  let serverKeySaveStatus: Response;

  const sendServerKey = async () => {
    const body = JSON.stringify(
      await encryptMessage(
        $serverPK.publicKeyBuffer,
        $serverEthWallet.mnemonic.phrase,
        $ethWallet
      )
    );
    serverKeySaveStatus = (await fetch(
      window.location.protocol + "//" + _host + "/admin/saveServerKey",
      {
        method: "POST",
        headers: {
          ...(await getAuthHeaders()),
          "Content-Type": "application/json",
        },
        body,
      }
    ).catch((e) => {
      serverKeySaveStatus = { status: 500 } as Response;
    })) as Response;
    if (serverKeySaveStatus?.status === 200) {
      await getServerPK();
    }
    setTimeout(async () => {
      if (serverKeySaveStatus?.status === 200) {
        verifyChange = false;
      }
      serverKeySaveStatus = null;
      await getServerPK();
    }, 3000);
  };
</script>

<div class="flex flex-col gap-2 items-center">
  <div class="flex gap-2 items-center justify-between w-full">
    <h2 class="mb-2 text-lg font-bold w-full">
      Server Key
      <div class="text-xs">{$serverPK.ethAddress}</div>
    </h2>
  </div>
  {#if verifyChange}
    <div class="bg-gray-100 px-4 py-2 rounded-lg border border-gray-400 w-2/3">
      <div class="mt-4 w-full bg-gray-500 text-white font-bold py-2 px-4">
        Change From
      </div>

      <div class="mt-2 table w-full">
        <div class="table-row bg-gray-200">
          <div class="table-cell font-medium mr-2 font-bold">ETH:</div>
          <div class="table-cell">
            <div class="flex justify-between items-center break-all">
              <a
                href={"https://etherscan.io/address/" + $serverPK.ethAddress}
                class="text-blue-600 hover:underline selectable"
                >{$serverPK.ethAddress}</a>
              <button
                on:click={() => copyToClipboard($serverPK.ethAddress)}
                class="ml-2">
                <Icon data={copy} />
              </button>
            </div>
          </div>
        </div>
        <div class="table-row bg-gray-300">
          <div class="table-cell font-medium mr-2 font-bold">CID:</div>
          <div class="table-cell">
            <div class="flex justify-between items-center break-all">
              <span class="selectable">{$serverPK.ipnsCID}</span>
              <button
                on:click={() => copyToClipboard($serverPK.ipnsCID)}
                class="ml-2">
                <Icon data={copy} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 w-full bg-gray-500 text-white font-bold py-2 px-4">
        To
      </div>
      <div class="mt-2 table w-full">
        <div class="table-row bg-gray-200">
          <div class="table-cell font-medium mr-2 font-bold">ETH:</div>
          <div class="table-cell">
            <div class="flex justify-between items-center break-all">
              <a
                href={"https://etherscan.io/address/" +
                  $serverEthWallet.address}
                class="text-blue-600 hover:underline selectable"
                >{$serverEthWallet.address}</a>
              <button
                on:click={() => copyToClipboard($serverEthWallet.address)}
                class="ml-2">
                <Icon data={copy} />
              </button>
            </div>
          </div>
        </div>
        <div class="table-row bg-gray-300">
          <div class="table-cell font-medium mr-2 font-bold">CID:</div>
          <div class="table-cell">
            <div class="flex justify-between items-center break-all">
              <span class="selectable">{newCID}</span>
              <button on:click={() => copyToClipboard(newCID)} class="ml-2">
                <Icon data={copy} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {#if serverKeySaveStatus?.status === 500}
        <div
          class="mt-4 w-1/3 flex items-center justify-center bg-red-600 text-white text-xl font-bold py-2 px-4">
          ERROR (500)
        </div>
      {:else}
        <button
          form="N/A"
          on:click={sendServerKey}
          class="mt-4 bg-blue-500 text-white text-xl font-bold py-2 px-4"
          >{serverKeySaveStatus?.status === 200
            ? "Success"
            : "Confirm"}</button>
        {#if !serverKeySaveStatus?.status}
          <button
            form="N/A"
            on:click={() => (verifyChange = false)}
            class="mt-4 bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-2 px-4"
            >Cancel</button
          >{/if}
      {/if}
    </div>
  {:else}
    <WalletInput bind:wallet={$serverEthWallet} {LoginButton} />
  {/if}
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  .table {
    display: table;
    width: 100%;
  }

  .table-row {
    display: table-row;
  }

  .table-cell {
    overflow-wrap: break-word;
    display: table-cell;
    padding: 0.5rem;
    vertical-align: middle;
  }
</style>
