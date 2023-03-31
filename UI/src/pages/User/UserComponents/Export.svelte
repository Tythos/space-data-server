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

<section class="mb-32 text-gray-800 text-center md:text-left">
  Tdasf
</section>
