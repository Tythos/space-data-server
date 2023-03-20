<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { _host, devMode, devProvider } from "@/UI/src/stores/dev";
  import { settings, cwd } from "@/UI/src/stores/admin";
  import { Icon } from "svelte-awesome";
  import { angleLeft, angleRight } from "svelte-awesome/icons";
  const getJSON = async (url: string) => await (await fetch(url)).json();
  onMount(async () => {
    $cwd =
      (await getJSON(window.location.protocol + "//" + _host + "/admin/cwd"))
        .cwd || "";
    $settings =
      (await getJSON(
        window.location.protocol + "//" + _host + "/admin/settings"
      )) || $settings;
  });

  let activeSection = writable(null);

  function toggleSection(section) {
    activeSection.update((current) => (current === section ? null : section));
  }

  const updateSettings = () => {
    console.log($settings);
  };

  let activeTrustedAddressIndex = 0;
  let activeTrustedAddress;
  $: {
    if (
      $settings.trustedAddresses &&
      Object.keys($settings.trustedAddresses)?.length
    ) {
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
        Object.keys($settings.trustedAddresses).length - 1
      ),
      0
    );
  };

  function addTrustedAddress(address) {
    // Generate a unique key for the new trusted address
    settings.update((current) => {
      current.trustedAddresses[address] = {
        DN: "",
        CN: "",
        comment: "",
        trust: 0,
      };
      return current;
    });
  }

  function removeTrustedAddress(key) {
    settings.update((current) => {
      delete current.trustedAddresses[key];
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
      {#if $settings?.trustedAddresses && Object.keys($settings?.trustedAddresses)?.length}
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
          <div
            class="flex flex-col h-84 overflow-y-auto border rounded-md items-center">
            <div class="border m-2 rounded-md w-1/2">
              <div
                class="px-6 py-4 text-center justify-center flex flex-col gap-2">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <span
                  class="text-xs"
                  on:click={(e) =>
                    window.open(
                      `https://etherscan.io/address/${activeTrustedAddress}`
                    )}>{activeTrustedAddress}</span>
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
                <label for="dn_input">TRUST (0-255)</label>
                <input
                  type="number"
                  min="1"
                  max="255"
                  bind:value={$settings.trustedAddresses[activeTrustedAddress]
                    .trust}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              </div>
              <div class="px-6 py-6 flex flex-col gap-1">
                <button
                  on:click={() => removeTrustedAddress(activeTrustedAddress)}
                  class="bg-red-500 text-white px-3 py-1 rounded-md focus:outline-none w-1/3"
                  >Remove</button>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Database Settings
    <div class="mb-6">
      <h2 class="mb-2 text-lg font-bold">Database</h2> 
      <!-- Add database settings inputs here -->
    </div>-->

    <button
      type="submit"
      class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
      Update Settings
    </button>
  </form>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
