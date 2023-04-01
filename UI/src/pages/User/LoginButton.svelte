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
      px-3
      py-2
      bg-gray-700
      text-white
      font-medium
      text-xs
      uppercase
   ">
  {$ethWallet?.address ? "Account" : "Login"}
</div>
