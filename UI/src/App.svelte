<script lang="ts">
  import "tw-elements";
  import "tw-elements/dist/css/index.min.css";
  import Router_, { push, location } from "svelte-spa-router";
  import { routes } from "@/UI/src/routes/routes";
  import LoginButton from "./pages/User/LoginButton.svelte";
  import { crypto } from "webcrypto-liner/build/index.es";
  import { ethWallet } from "@/UI/src/stores/user";
  import { isAdmin } from "./stores/admin";
  if (!self?.crypto?.subtle) {
    self.crypto.subtle = crypto.subtle; ///HAAAAAAAAAAAAAAACK
  }

  $: {
    if ($ethWallet) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = undefined;
    }
  }
  const Router: any = Router_; ///HAAAAAAAAAAAAAAACK
</script>

<div class="text-[.5rem] md:text-xs lg:text-sm wrap-safe-pad flex flex-col min-h-screen">
  <nav
    class="sticky top-0 z-10 w-full font-sans navbar navbar-expand-lg shadow-md bg-white flex items-center justify-between">
    <div>
      <ul class="flex cursor-pointer justify-center items-center gap-2 h-12">
        {#each Object.entries(routes).filter((a) => a[1].navBar) as [route, value], i}
          {#if value.name !== "Admin" || $isAdmin}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li
              on:click={(e) => {
                push(route);
              }}
              class:border-blue-400={$location === route}
              class:border-white={$location !== route}
              class="h-12 border-b-2 flex items-center justify-center p-2">
              {value.name.toUpperCase()}
            </li>
          {/if}
        {/each}
      </ul>
    </div>
    <div class="h-12"><LoginButton /></div>
  </nav>
  <div class="flex-grow">
    <Router {routes} />
  </div>
</div>

<style>
  :global(::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }

  :global(::-webkit-scrollbar-thumb) {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  :global(::-webkit-scrollbar-thumb:hover) {
    background-color: rgba(0, 0, 0, 0.5);
  }

  :global(::-webkit-scrollbar-track) {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  :global(::-webkit-scrollbar-corner) {
    background-color: transparent;
  }
</style>
