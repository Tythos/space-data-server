<script lang="ts">
  import { ethWallet, provider } from "@/UI/src/stores/user";
  import { formatEther } from "ethers";
  import { onDestroy, onMount } from "svelte";
  import QRCode from "qrcode";
  import cc from "copy-to-clipboard";

  onMount(async () => {
    try {
      getData();
      // $provider.on("block", getData);
    } catch (e) {}
  });
  onDestroy(() => {
    try {
      //  $provider.off(getData);
    } catch (e) {}
  });
</script>

<div class="block rounded-lg shadow-lg bg-white">
  <div class="w-full flex flex-col text-gray-500">
    <div
      class="p-2 flex gap-2 items-center justify-center w-full h-full border">
      Tdasf
    </div>
  </div>
</div>
