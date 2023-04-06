<script lang="ts">
  import { ethWallet, provider, vCard } from "@/UI/src/stores/user";
  import IDCard from "@/UI/src/components/IDCard.svelte";
</script>

<!--
<div class="w-full flex flex-col text-gray-500">
  <div class="p-2 flex gap-2 items-center justify-end w-full h-full border">
    <label for="default-wallet" class="text-lg">Use Default Wallet?</label>
    <input
      type="checkbox"
      id="default-wallet"
      class="form-checkbox h-4 w-4"
      bind:checked={$useDefaultWallet} />
  </div>
  {#if !$useDefaultWallet}
    <div class="border-l border-r border-b flex items-center justify-center">
      <div class="flex text-[1em]">
        {#each Object.keys($derivationPath) as key}
          <div class="flex flex-col m-2 gap-1">
            <label for={key}>{key.split("_")[0]}:</label>
            <div class="flex justify-center items-center">
              <div class="pr-2 w-full">
                {#if key === "purpose"}m {/if}/
              </div>
              <input
                type="number"
                id={key}
                min="0"
                readonly={~["purpose", "cointype"].indexOf(key) ? true : false}
                class="w-6 md:w-12 border rounded p-1"
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
</div>-->
<IDCard {ethWallet} {provider} {vCard} />
