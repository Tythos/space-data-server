<script lang="ts">
  import { ethWallet } from "@/UI/src/stores/user";
  import { push } from "svelte-spa-router";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="text-xs text-gray-600 mr-2">
  {$ethWallet?.address
    ? `${$ethWallet.address.slice(0, 5)}...${$ethWallet.address.slice(-5)}`
    : ""}
</div>
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
