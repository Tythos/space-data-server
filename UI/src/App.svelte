<script lang="ts">
  import "tw-elements";
  import "tw-elements/dist/css/index.min.css";
  import Router_, { push, location } from "svelte-spa-router";
  import { routes } from "@/UI/src/routes/routes";
  import LoginButton from "./pages/User/LoginButton.svelte";
  import { crypto } from "webcrypto-liner/build/index.es";
  import { ethWallet } from "@/UI/src/stores/user";
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

<div class="flex flex-col">
  <nav
    class="sticky top-0 z-10 w-full font-sans navbar navbar-expand-lg shadow-md py-2 bg-white flex items-center justify-between">
    <div class="px-6 w-full flex items-center justify-between">
      <ul class="navbar-nav mr-auto flex gap-4">
        {#each Object.entries(routes).filter((a) => a[1].navBar) as [route, value], i}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li
            on:click={(e) => {
              push(route);
            }}
            class:border-b-2={$location === route}
            class="p-2">
            {value.name}
          </li>
        {/each}
      </ul>
    </div>
    <div class="mr-6 h-full flex items-center"><LoginButton /></div>
  </nav>
  <div>
    <Router {routes} />
  </div>
</div>

<style>
</style>
