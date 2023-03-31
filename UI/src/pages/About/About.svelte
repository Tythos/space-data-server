<script lang="ts">
  import {
    settings,
    cwd,
    serverPK,
    getAuthHeaders,
  } from "@/UI/src/stores/admin";

  let displayPK = { publicKey: "", ethAddress: "", ipnsCID: "", ipfsPID: "" };
  $: {
    if ($serverPK.publicKey) {
      for (let x in displayPK) {
        displayPK[x] = $serverPK[x];
      }
    }
  }
</script>

<div class="h-full flex flex-col">
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
                  {value}
                </dd>
              </div>
            {/each}
          </dl>
        </div>
      </div>
    </div>
  </div>
</div>
