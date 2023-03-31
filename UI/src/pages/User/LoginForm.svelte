<script lang="ts">
  import WalletInput from "../../components/WalletLogin/WalletInput.svelte";
  import LoginButton from "./WalletLoginButton.svelte";
  import { ethWallet } from "@/UI/src/stores/user";
</script>

<div class="w-full py-12 h-full text-gray-800 bg-white-300 select-none">
  <div class="w-full flex gap-4 items-center justify-center mb-12 md:mb-0">
    <WalletInput bind:wallet={$ethWallet} {LoginButton} />
  </div>
</div>
