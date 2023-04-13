<script lang="ts">
  import {
    settings,
    cwd,
    serverPK,
    getAuthHeaders,
    getServerPK,
  } from "@/UI/src/stores/admin";
  import { onMount } from "svelte";

  let displayPK = {
    publicKey: "",
    ethAddress: "",
    ipnsCID: "",
    ipfsPID: "",
    ipfsCID: "",
  };

  onMount(async () => {
    await getServerPK();
  });

  const lastFetchTime = parseInt(localStorage.getItem("lastFetchTime"));
  const currentTime = new Date().getTime();
  const ONE_HOUR_IN_MS = 60 * 60 * 1000;

  if (!lastFetchTime || currentTime - lastFetchTime > ONE_HOUR_IN_MS) {
    if ($serverPK.publicKey) {
      for (let x in displayPK) {
        if (x === "ipfsCID") {
          fetch(`https://ipfs.io/ipfs/${$serverPK[x]}`);
        } else if (x === "ipnsCID") {
          fetch(`https://ipfs.io/ipns/${$serverPK[x]}`);
        }
        displayPK[x] = $serverPK[x];
      }
      localStorage.setItem("lastFetchTime", currentTime.toString());
    }
  }
</script>

<div class="h-full flex flex-col justify-center items-center">
  <div class="flex-grow flex items-center justify-center">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="border-t border-gray-200">
          <dl class="divide-y divide-gray-200">
            {#each Object.entries(displayPK) as [key, value]}
              <div
                class="flex flex-wrap sm:flex-nowrap py-3 sm:py-4 px-4 sm:space-x-4 space-y-1 sm:space-y-0">
                <dt
                  class="text-lg font-semibold text-gray-600 w-full sm:w-auto">
                  {key}:
                </dt>
                <dd
                  class="mt-2 sm:mt-0 ml-0 sm:ml-4 text-lg font-medium text-gray-900 break-all w-full sm:w-auto flex-grow">
                  {#if key === "ipfsCID"}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://ipfs.io/ipfs/{value}">{value}</a>
                  {:else if key === "ipnsCID"}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://ipfs.io/ipns/{value}">{value}</a>
                  {:else}
                    {value}
                  {/if}
                </dd>
              </div>
            {/each}
          </dl>
        </div>
      </div>
    </div>
  </div>
</div>
