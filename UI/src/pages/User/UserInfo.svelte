<script lang="ts">
  import Info from "./UserComponents/Info.svelte";
  import VCard from "@/UI/src/components/VCard.svelte";
  import { ethWallet, provider, vCard } from "@/UI/src/stores/user";
  import { Icon } from "svelte-awesome";
  import { download } from "svelte-awesome/icons";

  let activeTab = 0;

  const exportToJson = () => {};
  const exportToVCard = () => {};
</script>

<div class="flex flex-col w-full md:w-2/3">
  <div class="flex justify-between">
    <ul
      class="cursor-pointer mb-4 flex list-none border-b-0 pl-0"
      id="tabs-tab3"
      role="tablist"
      data-te-nav-ref>
      <li
        role="presentation"
        on:click={(e) => {
          activeTab = 0;
        }}>
        <div
          class:border-transparent={activeTab}
          class="my-2 block border-x-0 border-t-0 border-b-2 px-7 pt-4 pb-3.5 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
          id="tabs-home-tab3"
          role="tab"
          aria-controls="tabs-home3"
          aria-selected="true">
          User Info
        </div>
      </li>
      <li
        role="presentation"
        on:click={(e) => {
          activeTab = 2;
        }}>
        <div
          class:border-transparent={activeTab !== 2}
          class="focus:border-transparent my-2 block border-x-0 border-t-0 border-b-2 px-7 pt-4 pb-3.5 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
          id="tabs-profile-tab3"
          role="tab"
          aria-controls="tabs-profile3"
          aria-selected="false">
          Edit
        </div>
      </li>
    </ul>
    <div
      class="my-2 block px-7 pt-4 pb-3.5 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate focus:isolate data-[te-nav-active]:text-primary dark:text-neutral-400 dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400 cursor-pointer"
      id="tabs-export-tab3"
      role="tab"
      aria-controls="tabs-export3"
      aria-selected="false">
      Export
      <Icon data={download} />
    </div>
  </div>
  <div>
    {#if activeTab === 0}
      <Info />
    {:else if activeTab === 2}
      <VCard {vCard} />
    {/if}
  </div>
</div>
