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
  - Person vs Organization Account
  - Import / Export vCard
  - Directory
  */
  onMount(() => {
    /*const mnemonic: string = `${Array(12).join("abandon ")}about`;
    const untrustedMnemonic: string = `excess shallow future wheat amazing fee rug hammer hire crazy lumber mean`;
    $ethWallet = utils.HDNode.fromMnemonic(mnemonic).derivePath(
      getBIP32Path($derivationPath)
    );
    console.log($ethWallet.extendedKey);*/
  });
</script>

<div class="w-full flex items-start justify-center p-4">
  {#if !$ethWallet}
    <LoginForm />
  {:else}
    <UserInfo />
  {/if}
</div>
