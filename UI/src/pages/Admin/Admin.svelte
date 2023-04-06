<script lang="ts">
  import Server from "./components/Server.svelte";
  import TrustedUsers from "./components/TrustedUsers.svelte";
  import TrustedServers from "./components/TrustedServers.svelte";
  let activeTab = 0;
</script>

<div class="flex flex-col w-full lg:w-2/3">
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
        Server
      </div>
    </li>
    <li
      role="presentation"
      on:click={(e) => {
        activeTab = 1;
      }}>
      <div
        class:border-transparent={activeTab !== 1}
        class="focus:border-transparent my-2 block border-x-0 border-t-0 border-b-2 px-7 pt-4 pb-3.5 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
        id="tabs-profile-tab3"
        role="tab"
        aria-controls="tabs-profile3"
        aria-selected="false">
        Trusted Users
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
        Trusted Servers
      </div>
    </li>
  </ul>
  <div>
    {#if activeTab === 0}
      <Server />
    {:else if activeTab === 1}
      <TrustedUsers />
    {:else if activeTab === 2}
      <TrustedServers />
    {/if}
  </div>
</div>
