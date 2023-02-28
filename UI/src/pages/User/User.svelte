<script lang="ts">
  import {
    derivationPath,
    ethWallet,
    getBIP32Path,
  } from "@/UI/src/stores/user";
  import { Contract, providers, Signer, Wallet, utils } from "ethers";
  import { onMount } from "svelte";
  import LoginForm from "./LoginForm.svelte";
  import UserInfo from "./UserInfo.svelte";

  /*
  - HDWallet - https://docs.ethers.org/v5/api/utils/hdnode/
  - Import / Export vCard
  - Directory
  */
  onMount(() => {

  });
</script>

<div class="w-full flex items-start justify-center p-4">
  {#if !$ethWallet}
    <LoginForm />
  {:else}
    <UserInfo />
  {/if}
</div>
