<script lang="ts">
  import { ethWallet } from "@/UI/src/stores/user";
  import { Contract, providers, Signer, Wallet } from "ethers";
  import { onMount } from "svelte";
  import LoginForm from "./LoginForm.svelte";
  import UserInfo from "./UserInfo.svelte";
  console.log($ethWallet);
  onMount(() => {
    /*const mnemonic: string = `${Array(12).join("abandon ")}about`;
    const untrustedMnemonic: string = `excess shallow future wheat amazing fee rug hammer hire crazy lumber mean`;
    $ethWallet = Wallet.fromMnemonic(mnemonic);*/
  });
</script>

<section class="w-full flex items-center justify-center">
  {#if !$ethWallet}
    <LoginForm />
  {:else}
    <UserInfo />
  {/if}
</section>
