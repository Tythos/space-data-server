<script lang="ts">
  import { ethWallet, provider } from "@/UI/src/stores/user";
  import { ethers, utils } from "ethers";
  import { onDestroy, onMount } from "svelte";
  import QRCode from "qrcode";
  import { copy } from "svelte-awesome/icons";
  import Icon from "svelte-awesome";
  import cc from "copy-to-clipboard";

  let ensAddress, qrCodeImage, balance, etherscanLink;
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

  const recipient = "0x9858effd232b4033e47d90003d41ec34ecaeda94";
  const amount = ethers.utils.parseEther("1");
  const data = "0x01";

  const transaction = {
    to: recipient,
    value: amount,
    data: data,
  };

  let dataInterval;

  onMount(async () => {
    getData();
    dataInterval = setInterval(getData, 30000);
  });
  onDestroy(() => {
    clearInterval(dataInterval);
  });
</script>

<div />
<div class="mt-12">
  <!-- Section: Design Block -->
  <section class="mb-32 text-gray-800 text-center md:text-left">
    <div class="block rounded-lg shadow-lg bg-white">
      <div class="flex flex-wrap items-center">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          on:click={(e) => window.open(etherscanLink)}
          class="items-center justify-center grow-0 shrink-0 basis-auto block flex w-full lg:w-6/12 xl:w-4/12 p-6">
          <img src={qrCodeImage} class="w-1/3 h-1/3" alt="qrcode" />
        </div>
        <div
          class="text-center grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
          <div class="px-2 py-5 md:px-12">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              class="text-3xl font-bold mb-6 pb-2 flex flex-col gap-4"
              on:click={(e) => {
                cc($ethWallet.address);
              }}>
              <div class="text-sm">
                ETH WALLET: <Icon class="w-3" data={copy} />
                <br />
                <div class="text-xs">{$ethWallet.address}</div>
              </div>
              <a
                class="text-blue-800 text-base"
                target="_blank"
                rel="noreferrer"
                href={ensAddress
                  ? `https://app.ens.domains/name/${ensAddress}/details`
                  : `https://app.ens.domains`}>
                ENS: {ensAddress || "(NO ENTRY)"}</a>
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
