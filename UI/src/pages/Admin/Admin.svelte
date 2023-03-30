<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { _host } from "@/UI/src/stores/dev";
  import {
    settings,
    cwd,
    serverPK,
    getAuthHeaders,
  } from "@/UI/src/stores/admin";
  import { Icon } from "svelte-awesome";
  import {
    angleLeft,
    angleRight,
    externalLink,
    save,
  } from "svelte-awesome/icons";
  import { ethWallet } from "../../stores/user";
  import { encryptMessage, decryptMessage } from "@/lib/utility/encryption";
  import type { Settings } from "@/lib/class/settings.interface";

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

  let activeSection = writable(null);

  function toggleSection(section) {
    activeSection.update((current) => (current === section ? null : section));
  }

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
      console.log(current.trustedAddresses, activeTrustedAddress);
      return current;
    });
  }
</script>

<div class="p-6 bg-white rounded-lg shadow select-none">
  <form on:submit|preventDefault={updateSettings} class="w-full">
    <!-- Server Settings -->
    <div class="mb-6">
      <h2 class="mb-2 text-lg font-bold">Server</h2>
      <div class="space-y-4">
        <div class="flex items-center">
          <label for="port" class="w-32">Port:</label>
          <input
            type="number"
            id="port"
            min="1"
            max="65535"
            bind:value={$settings.server.port}
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div class="flex items-center">
          <label for="key" class="w-32">Path to SSL Key:</label>
          <input
            type="text"
            id="key"
            bind:value={$settings.server.key}
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div class="flex items-center">
          <label for="cert" class="w-32">Path to SSL Cert:</label>
          <input
            type="text"
            id="cert"
            bind:value={$settings.server.cert}
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
        </div>
      </div>
    </div>

    <!-- Data Settings -->
    <div class="mb-6">
      <h2 class="mb-2 text-lg font-bold">Data</h2>
      <h3 class="mb-2">All paths relative to: <b class="text-sm">{$cwd}</b></h3>
      <div class="space-y-4">
        <div class="flex items-center">
          <label for="ingest" class="w-48">Ingest:</label>
          <input
            type="text"
            id="ingest"
            bind:value={$settings.data.ingest}
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div class="flex items-center">
          <label for="fileSystemPath" class="w-48">File System Path:</label>
          <input
            type="text"
            id="fileSystemPath"
            bind:value={$settings.data.fileSystemPath}
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div class="flex items-center">
          <label for="useDatabase" class="w-36">Use Database:</label>
          <input
            type="checkbox"
            id="useDatabase"
            bind:checked={$settings.data.useDatabase}
            class="w-4 h-4 rounded border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div class="flex items-center">
          <label for="cache" class="w-48">Cache:</label>
          <input
            type="text"
            id="cache"
            bind:value={$settings.data.cache}
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div class="flex items-center">
          <label for="verbose" class="w-36">Verbose Ingest Logging:</label>
          <input
            type="checkbox"
            id="verbose"
            bind:checked={$settings.data.verbose}
            class="w-4 h-4 rounded border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
        </div>
      </div>
    </div>

    <!-- Trusted Addresses Settings -->
    <div class="mb-4 text-sm">
      <div class="flex gap-2 items-center justify-between">
        <h2 class="mb-2 text-lg font-bold">Trusted Addresses</h2>
        <button
          on:click={() => addTrustedAddress()}
          class="mb-4 bg-indigo-500 text-white px-4 py-2 rounded-md focus:outline-none">
          Add Trusted Address
        </button>
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
              class="flex flex-col h-84 overflow-y-auto border rounded-md items-center">
              <div class="border m-2 rounded-md w-1/2">
                <div
                  class="px-6 py-4 text-center justify-center flex flex-col gap-2">
                  <input
                    id="dn_input"
                    type="text"
                    pattern="^0x[a-fA-F0-9]{'{'}40{'}'}"
                    bind:value={$settings.trustedAddresses[activeTrustedAddress]
                      .address}
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
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
                    bind:value={$settings.trustedAddresses[activeTrustedAddress]
                      .DN}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div class="px-6 py-4 flex flex-col gap-1">
                  <label for="dn_input">CN</label>
                  <input
                    type="text"
                    bind:value={$settings.trustedAddresses[activeTrustedAddress]
                      .CN}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div class="px-6 py-4 flex flex-col gap-1">
                  <label for="dn_input">COMMENT</label>
                  <input
                    type="text"
                    bind:value={$settings.trustedAddresses[activeTrustedAddress]
                      .comment}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div class="px-6 py-4 flex flex-col gap-1">
                  <label for="dn_input">TRUST (1-255)</label>
                  <input
                    type="number"
                    min="1"
                    max="255"
                    bind:value={$settings.trustedAddresses[activeTrustedAddress]
                      .trust}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div class="px-6 py-4 flex gap-3">
                  <label for="isAdmin_input">SERVER ADMIN</label>
                  <input
                    type="checkbox"
                    bind:checked={$settings.trustedAddresses[
                      activeTrustedAddress
                    ].isAdmin}
                    class=" px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div class="px-6 py-6 flex flex-col gap-1">
                  <button
                    on:click={() => removeTrustedAddress()}
                    class="bg-red-500 text-white px-3 py-1 rounded-md focus:outline-none w-1/3"
                    >Remove</button>
                </div>
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Database Settings
    <div class="mb-6">
      <h2 class="mb-2 text-lg font-bold">Database</h2> 
    
    </div>-->
    <div class="flex gap-2 items-center justify-start text-sm">
      <button
        type="submit"
        class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Update Settings
      </button>
      {#if saveStatus}
        <div
          class:text-blue-800={saveStatus.status === 200}
          class:text-red-800={saveStatus.status !== 200}>
          {saveStatus.status === 200 ? "SUCCESS" : "ERROR"}
        </div>
      {/if}
    </div>
  </form>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
