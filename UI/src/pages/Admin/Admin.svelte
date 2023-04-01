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
  } from "@/UI/src/stores/admin";
  import { Icon } from "svelte-awesome";
  import { angleLeft, angleRight, externalLink } from "svelte-awesome/icons";
  import { ethWallet } from "../../stores/user";
  import { encryptMessage, decryptMessage } from "@/lib/utility/encryption";
  import type { Settings } from "@/lib/class/settings.interface";
  import WalletInput from "../../components/WalletLogin/WalletInput.svelte";
  import LoginButton from "./AdminWalletLoginButton.svelte";
  import type { HDNodeWallet } from "ethers";
  import { pubKeyToIPFSCID } from "keyconverter/src/keyconverter";

  const getJSON = async (url: string) => {
    return await (
      await fetch(url, {
        headers: await getAuthHeaders(),
      })
    ).text();
  };

  onMount(async () => {
    $cwd = (
      await decryptMessage(
        $ethWallet.privateKey,
        await getJSON(window.location.protocol + "//" + _host + "/admin/cwd")
      )
    ).toString();

    $settings = JSON.parse(
      (
        await decryptMessage(
          $ethWallet.privateKey,
          await getJSON(
            window.location.protocol + "//" + _host + "/admin/settings"
          )
        )
      ).toString()
    ) as Settings;
  });

  let saveStatus;

  const updateSettings = async () => {
    const body = JSON.stringify(
      await encryptMessage($serverPK.publicKeyBuffer, JSON.stringify($settings))
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
    setTimeout(() => (saveStatus = null), 2000);
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
      console.log(sWallet.publicKey)
      newCID = await pubKeyToIPFSCID(sWallet.publicKey.replace(/^0x/, ""));
    }
  });
</script>

<div class="p-6 bg-white rounded-lg shadow select-none">
  <form on:submit|preventDefault={updateSettings} class="w-full">
    <div class="mb-4 text-sm">
      <div class="flex flex-col gap-2 items-center">
        <div class="flex gap-2 items-center justify-between w-full">
          <h2 class="mb-2 text-lg font-bold w-full">
            Server Key
            <div class="text-xs">{$serverPK.ethAddress}</div>
          </h2>
        </div>
        {#if verifyChange}
          <div>
            <div>CONFIRM:</div>
            CHANGE SERVER FROM:
            <div>
              ETH: {$serverPK.ethAddress}
              CID: {$serverPK.ipnsCID}
            </div>
            <div>TO</div>
            <div>
              ETH: {$serverEthWallet.address}
              CID: {newCID}
            </div>
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
            <div class="flex gap-2 items-center text-[1rem]">
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                class="flex items-center cursor-pointer"
                on:click={(e) => changeTrustedAddress(-1)}>
                <Icon data={angleLeft} />
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
                <Icon data={angleRight} />
              </div>
            </div>
            {#if $settings.trustedAddresses[activeTrustedAddress]}
              <div
                class="flex flex-col h-84 overflow-y-auto border items-center">
                <div class="border m-2 w-1/2">
                  <div
                    class="px-6 py-4 text-center justify-center flex flex-col gap-2">
                    <input
                      id="dn_input"
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
</style>
