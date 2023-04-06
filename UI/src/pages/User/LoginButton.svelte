<script lang="ts">
  import { ethWallet } from "@/UI/src/stores/user";
  import { push } from "svelte-spa-router";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="text-gray-600 mr-2 h-12">
  <div class="flex items-center h-full">
    {$ethWallet?.address
      ? `${$ethWallet.address.slice(0, 5)}...${$ethWallet.address.slice(-5)}`
      : ""}
  </div>
</div>
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
      uppercase">
  {$ethWallet?.address ? "Account" : "Login"}
</div>
