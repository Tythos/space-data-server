<script lang="ts">
  import { ethWallet } from "@/UI/src/stores/user";
  import { push } from "svelte-spa-router";
</script>

<div class="flex gap-2">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="text-gray-600 mr-2">
    <div class="flex items-center justify-center h-full">
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
      px-5
      py-1
      h-12
      flex
      items-center
      justify-center
      bg-gray-700
      text-white
      uppercase">
    {$ethWallet?.address ? "Account" : "Login"}
  </div>
</div>
