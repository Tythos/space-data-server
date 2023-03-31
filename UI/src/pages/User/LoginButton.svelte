<script lang="ts">
  import { ethWallet } from "@/UI/src/stores/user";
  import { push } from "svelte-spa-router";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  on:click={(e) => {
    push("/user");
  }}
  class="cursor-pointer 
      px-6
      py-2.5
      bg-gray-700
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      shadow-md
      hover:bg-gray-700 hover:shadow-lg
      focus:bg-gray-700 focus:shadow-lg 
      focus:outline-none focus:ring-0
      active:bg-gray-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">
  {$ethWallet?.address ? "Account" : "Login"}
</div>
