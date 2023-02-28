<script lang="ts">
  import { ethWallet, provider } from "@/UI/src/stores/user";
  import { ethers, utils } from "ethers";
  import { onMount } from "svelte";
  import QRCode from "qrcode";
  import { Console } from "console";
  let ensAddress, error, qrCodeImage, balance, etherscanLink;
  const getData = async () => {
    if ($ethWallet.address) {
      etherscanLink = `https://etherscan.io/address/${$ethWallet.address}`;
      QRCode.toDataURL(etherscanLink).then((qsrc) => {
        qrCodeImage = qsrc;
      });
      balance = utils.formatEther(
        await $provider.getBalance($ethWallet.address)
      );

      $provider
        .lookupAddress($ethWallet.address)
        .then((a) => {
          ensAddress = a;
        })
        .catch((e) => {
          console.log(e);
          ensAddress = null;
        });
    }
  };

  onMount(async () => {
    getData();
  });
</script>

<div class="container">
  <!-- Section: Design Block -->
  <section class="mb-32 text-gray-800 text-center md:text-left">
    <div class="block rounded-lg shadow-lg bg-white">
      <div class="flex flex-wrap items-center">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          on:click={(e) => window.open(etherscanLink)}
          class="items-center justify-center grow-0 shrink-0 basis-auto block flex w-full lg:w-6/12 xl:w-4/12 p-6">
          <img src={qrCodeImage} class="w-1/2 h-1/2" alt="qrcode" />
        </div>
        <div class="text-center grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
          <div class="px-2 py-5 md:px-12">
            <div class="text-3xl font-bold mb-6 pb-2 flex flex-col gap-2">
              <div class="text-sm">{$ethWallet.address}</div>
              <div />
              <a
                class="text-gray-800"
                target="_blank"
                rel="noreferrer"
                href={`https://app.ens.domains/name/${ensAddress}/details`}>
                {ensAddress || "NO ENS ENTRY"}</a>
            </div>
            <p class="text-gray-500 mb-6 pb-2">
              Balance: {balance || 0} ETH
            </p>
            <div>
              <button
                on:click={(e) => {
                  $ethWallet = null;
                }}
                type="button"
                class="inline-block px-7 py-3 bg-gray-800 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Section: Design Block -->
</div>
<!-- Container for demo purpose -->
