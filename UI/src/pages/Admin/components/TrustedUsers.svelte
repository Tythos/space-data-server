<script lang="ts">
  import { onMount } from "svelte";
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
  import { angleLeft, angleRight, externalLink } from "svelte-awesome/icons";
  import { ethWallet } from "@/UI/src/stores/user";
  import { encryptMessage, decryptMessage } from "@/lib/utility/encryption";
  import type { Settings } from "@/lib/class/settings.interface";
  import { pubKeyToIPFSCID } from "keyconverter/src/keyconverter";

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
    if ($settings.trustedUsers && $settings.trustedUsers.length) {
      activeTrustedAddress = Object.keys($settings.trustedUsers)[
        activeTrustedAddressIndex
      ];
    }
  }

  const changeTrustedAddress = (amount) => {
    activeTrustedAddressIndex += amount;
    activeTrustedAddressIndex = Math.max(
      Math.min(
        activeTrustedAddressIndex,
        $settings.trustedUsers.length - 1
      ),
      0
    );
  };

  function addTrustedAddress() {
    settings.update((current) => {
      current.trustedUsers.push({
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
      Object.keys($settings.trustedUsers).length - 1;
  }

  function removeTrustedAddress() {
    settings.update((current) => {
      delete current.trustedUsers[activeTrustedAddress];
      return current;
    });
  }
</script>

<div class="p-2 bg-white rounded-lg shadow select-none">
  <form
    on:submit|preventDefault={updateSettings}
    id="settingsForm"
    class="w-full">
    <!-- Trusted Users Settings -->
    <div class="mb-4 text-sm">
      {#if $settings?.trustedUsers}
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
                $settings?.trustedUsers
              )?.length}
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              class="flex items-center cursor-pointer"
              on:click={(e) => changeTrustedAddress(1)}>
              <Icon scale={1.5} data={angleRight} />
            </div>
          </div>
          {#if $settings.trustedUsers[activeTrustedAddress]}
            <div class="flex flex-col h-84 overflow-y-auto border items-center">
              <div class="border m-2 w-1/2">
                <div
                  class="px-6 py-2 text-center justify-center flex flex-col gap-2">
                  <input
                    id="address_input"
                    type="text"
                    pattern="^0x[a-fA-F0-9]{'{'}40{'}'}"
                    bind:value={$settings.trustedUsers[activeTrustedAddress]
                      .address}
                    required
                    class="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <div
                    class="flex gap-2 cursor-pointer"
                    on:click={(e) =>
                      window.open(
                        `https://etherscan.io/address/${$settings.trustedUsers[activeTrustedAddress].address}`
                      )}>
                    <span class="text-xs">ETHERSCAN</span><Icon
                      data={externalLink} />
                  </div>
                </div>
                <div class="px-6 py-2 flex flex-col gap-1">
                  <label for="dn_input">DN</label>
                  <input
                    id="dn_input"
                    type="text"
                    bind:value={$settings.trustedUsers[activeTrustedAddress]
                      .DN}
                    class="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div class="px-6 py-2 flex flex-col gap-1">
                  <label for="dn_input">CN</label>
                  <input
                    type="text"
                    bind:value={$settings.trustedUsers[activeTrustedAddress]
                      .CN}
                    class="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div class="px-6 py-2 flex flex-col gap-1">
                  <label for="dn_input">COMMENT</label>
                  <input
                    type="text"
                    bind:value={$settings.trustedUsers[activeTrustedAddress]
                      .comment}
                    class="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div class="px-6 py-2 flex flex-col gap-1">
                  <label for="dn_input">TRUST (1-255)</label>
                  <input
                    type="number"
                    min="1"
                    max="255"
                    bind:value={$settings.trustedUsers[activeTrustedAddress]
                      .trust}
                    class="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div class="px-6 py-2 flex gap-3">
                  <label for="isAdmin_input">SERVER ADMIN</label>
                  <input
                    type="checkbox"
                    bind:checked={$settings.trustedUsers[
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
