<script lang="ts">
  import { onMount } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import { _host } from "@/UI/src/stores/dev";
  import {
    settings,
    cwd,
    serverPK,
    getAuthHeaders,
    serverEthWallet,
    getServerPK,
  } from "@/UI/src/stores/admin";
  import { Icon } from "svelte-awesome";
  import {
    angleLeft,
    angleRight,
    externalLink,
    copy,
  } from "svelte-awesome/icons";
  import { ethWallet } from "../../stores/user";
  import { encryptMessage, decryptMessage } from "@/lib/utility/encryption";
  import type { Settings } from "@/lib/class/settings.interface";
  import WalletInput from "../../components/WalletLogin/WalletInput.svelte";
  import LoginButton from "./AdminWalletLoginButton.svelte";
  import type { HDNodeWallet } from "ethers";
  import { pubKeyToIPFSCID } from "keyconverter/src/keyconverter";
  import copyToClipboard from "copy-to-clipboard";

  const getJSON = async (url: string) => {
    return await (
      await fetch(url, {
        headers: await getAuthHeaders(),
      })
    ).text();
  };

  onMount(async () => {
    if (!$serverPK?.ethAddress) {
      await getServerPK();
    }
    $cwd = (
      await decryptMessage(
        $ethWallet.privateKey,
        await getJSON(window.location.protocol + "//" + _host + "/admin/cwd"),
        [$serverPK.ethAddress]
      )
    ).toString();
    $settings = JSON.parse(
      (
        await decryptMessage(
          $ethWallet.privateKey,
          await getJSON(
            window.location.protocol + "//" + _host + "/admin/settings"
          ),
          [$serverPK.ethAddress]
        )
      ).toString()
    ) as Settings;
  });

  let saveStatus;

  const updateSettings = async () => {
    const body = JSON.stringify(
      await encryptMessage(
        $serverPK.publicKeyBuffer,
        JSON.stringify($settings),
        $ethWallet
      )
    );
    saveStatus = await fetch(
      window.location.protocol + "//" + _host + "/admin/settings",
      {
        method: "POST",
        headers: {
          ...(await getAuthHeaders()),
          "Content-Type": "application/json",
        },
        body,
      }
    );
    setTimeout(() => (saveStatus = null), 5000);
  };

  let activeTrustedAddressIndex: number = 0;
  let activeTrustedAddress: string;

  $: {
    if ($settings.trustedAddresses && $settings.trustedAddresses.length) {
      activeTrustedAddress = Object.keys($settings.trustedAddresses)[
        activeTrustedAddressIndex
      ];
    }
  }

  const changeTrustedAddress = (amount) => {
    activeTrustedAddressIndex += amount;
    activeTrustedAddressIndex = Math.max(
      Math.min(
        activeTrustedAddressIndex,
        $settings.trustedAddresses.length - 1
      ),
      0
    );
  };

  function addTrustedAddress() {
    settings.update((current) => {
      current.trustedAddresses.push({
        address: "",
        DN: "",
        CN: "",
        comment: "",
        trust: 1,
        isAdmin: false,
      });
      return current;
    });
    activeTrustedAddressIndex =
      Object.keys($settings.trustedAddresses).length - 1;
  }

  function removeTrustedAddress() {
    settings.update((current) => {
      delete current.trustedAddresses[activeTrustedAddress];
      return current;
    });
  }

  /**
   *
   * Server Admin Key
   *
   *
   **/

  let verifyChange = false;
  let newCID;
  serverEthWallet.subscribe(async (sWallet: HDNodeWallet) => {
    if (sWallet?.address) {
      verifyChange = true;
      newCID = await pubKeyToIPFSCID(sWallet.publicKey.replace(/^0x/, ""));
    }
  });

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

<div class="p-6 bg-white rounded-lg shadow select-none">
  <form
    on:submit|preventDefault={updateSettings}
    id="settingsForm"
    class="w-full">
    <div class="mb-4 text-sm">
      <div class="flex flex-col gap-2 items-center">
        <div class="flex gap-2 items-center justify-between w-full">
          <h2 class="mb-2 text-lg font-bold w-full">
            Server Key
            <div class="text-xs">{$serverPK.ethAddress}</div>
          </h2>
        </div>
        {#if verifyChange}
          <div
            class="bg-gray-100 px-4 py-2 rounded-lg border border-gray-400 w-2/3">
            <div class="mt-4 w-full bg-gray-500 text-white font-bold py-2 px-4">
              Change From
            </div>

            <div class="mt-2 table w-full">
              <div class="table-row bg-gray-200">
                <div class="table-cell font-medium mr-2 font-bold">ETH:</div>
                <div class="table-cell">
                  <div class="flex justify-between items-center break-all">
                    <a
                      href={"https://etherscan.io/address/" +
                        $serverPK.ethAddress}
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
                    <button
                      on:click={() => copyToClipboard(newCID)}
                      class="ml-2">
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
      <!-- Trusted Addresses Settings -->
      <hr class="m-4 h-12" />
      <div class="mb-4 text-sm">
        <div class="flex gap-2 items-center justify-between">
          <h2 class="mb-2 text-lg font-bold">Trusted Addresses</h2>
        </div>
        {#if $settings?.trustedAddresses}
          <div class="mt-2 space-y-4">
            <div class="flex gap-2 items-center text-[1.5rem]">
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                class="flex items-center cursor-pointer"
                on:click={(e) => changeTrustedAddress(-1)}>
                <Icon scale={1.5} data={angleLeft} />
              </div>
              <div>
                {activeTrustedAddressIndex + 1} of {Object.keys(
                  $settings?.trustedAddresses
                )?.length}
              </div>
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                class="flex items-center cursor-pointer"
                on:click={(e) => changeTrustedAddress(1)}>
                <Icon scale={1.5} data={angleRight} />
              </div>
            </div>
            {#if $settings.trustedAddresses[activeTrustedAddress]}
              <div
                class="flex flex-col h-84 overflow-y-auto border items-center">
                <div class="border m-2 w-1/2">
                  <div
                    class="px-6 py-4 text-center justify-center flex flex-col gap-2">
                    <input
                      id="address_input"
                      type="text"
                      pattern="^0x[a-fA-F0-9]{'{'}40{'}'}"
                      bind:value={$settings.trustedAddresses[
                        activeTrustedAddress
                      ].address}
                      required
                      class="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                      class="flex gap-2 cursor-pointer"
                      on:click={(e) =>
                        window.open(
                          `https://etherscan.io/address/${$settings.trustedAddresses[activeTrustedAddress].address}`
                        )}>
                      <span class="text-xs">ETHERSCAN</span><Icon
                        data={externalLink} />
                    </div>
                  </div>
                  <div class="px-6 py-4 flex flex-col gap-1">
                    <label for="dn_input">DN</label>
                    <input
                      id="dn_input"
                      type="text"
                      bind:value={$settings.trustedAddresses[
                        activeTrustedAddress
                      ].DN}
                      class="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                  </div>
                  <div class="px-6 py-4 flex flex-col gap-1">
                    <label for="dn_input">CN</label>
                    <input
                      type="text"
                      bind:value={$settings.trustedAddresses[
                        activeTrustedAddress
                      ].CN}
                      class="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                  </div>
                  <div class="px-6 py-4 flex flex-col gap-1">
                    <label for="dn_input">COMMENT</label>
                    <input
                      type="text"
                      bind:value={$settings.trustedAddresses[
                        activeTrustedAddress
                      ].comment}
                      class="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                  </div>
                  <div class="px-6 py-4 flex flex-col gap-1">
                    <label for="dn_input">TRUST (1-255)</label>
                    <input
                      type="number"
                      min="1"
                      max="255"
                      bind:value={$settings.trustedAddresses[
                        activeTrustedAddress
                      ].trust}
                      class="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                  </div>
                  <div class="px-6 py-4 flex gap-3">
                    <label for="isAdmin_input">SERVER ADMIN</label>
                    <input
                      type="checkbox"
                      bind:checked={$settings.trustedAddresses[
                        activeTrustedAddress
                      ].isAdmin}
                      class=" px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                  </div>
                  <div class="px-6 py-6 flex flex-col gap-1">
                    <button
                      on:click={() => removeTrustedAddress()}
                      class="bg-red-500 text-white px-3 py-1 focus:outline-none w-1/3"
                      >Remove</button>
                  </div>
                </div>
                <div class="flex items-center h-24">
                  <button
                    on:click={() => addTrustedAddress()}
                    class="mb-4 bg-indigo-500 text-white px-4 py-2 focus:outline-none">
                    Add New Trusted Address
                  </button>
                </div>
              </div>
            {/if}
          </div>
        {/if}
      </div>
      <div class="flex gap-2 items-center justify-between text-sm">
        <div class="flex gap-2 justify-center items-center">
          <button
            form="settingsForm"
            type="submit"
            class="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600">
            Update Settings
          </button>
          {#if saveStatus}
            <div>{saveStatus.status === 200 ? "SUCCESS" : "ERROR"}</div>
          {/if}
        </div>
      </div>
    </div>
  </form>
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
