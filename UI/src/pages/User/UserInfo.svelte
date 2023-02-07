<script lang="ts">
  import { ethWallet, provider } from "@/UI/src/stores/user";
  import { Contract, providers, Signer, utils } from "ethers";
  import { onMount } from "svelte";
  import QRCode from "qrcode";
  let ensAddress, error, qrCodeImage, balance;
  onMount(async () => {
    // let resolvedName = await $provider.resolveName("celestrak.eth");
  });
  $: {
    QRCode.toDataURL(`https://etherscan.io/address/${$ethWallet.address}`).then(
      (qsrc) => {
        qrCodeImage = qsrc;
      }
    );
    $provider.getBalance($ethWallet.address).then((b) => {
      balance = utils.formatEther(b);
    });
    $provider.lookupAddress($ethWallet.address).then((a) => {
      ensAddress = a;
    });
  }
</script>

<div class="container">
  <!-- Section: Design Block -->
  <section class="mb-32 text-gray-800 text-center md:text-left">
    <div class="block rounded-lg shadow-lg bg-white">
      <div class="flex flex-wrap items-center">
        <div
          class="items-center justify-center grow-0 shrink-0 basis-auto block flex w-full lg:w-6/12 xl:w-4/12 p-6">
          <img src={qrCodeImage} class="w-1/2 h-1/2" alt="qrcode" />
        </div>
        <div class="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
          <div class="px-2 py-5 md:px-12">
            <div class="text-3xl font-bold mb-6 pb-2 flex flex-col gap-2">
              <div class="text-sm">{$ethWallet.address}</div>
              <div />
              <div>{ensAddress || "----"}</div>
            </div>
            <p class="text-gray-500 mb-6 pb-2">
              Balance: {balance} ETH
            </p>
            <!-- <div class="flex flex-wrap mb-6">
              <div class="w-full lg:w-6/12 xl:w-4/12 mb-4">
                <p class="flex items-center justify-center md:justify-start">
                  <svg
                    class="w-4 h-4 mr-2"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path
                      fill="currentColor"
                      d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
                  </svg>Noise cancelling
                </p>
              </div>
              <div class="w-full lg:w-6/12 xl:w-4/12 mb-4">
                <p class="flex items-center justify-center md:justify-start">
                  <svg
                    class="w-4 h-4 mr-2"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path
                      fill="currentColor"
                      d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
                  </svg>Touch controls
                </p>
              </div>
              <div class="w-full lg:w-6/12 xl:w-4/12 mb-4">
                <p class="flex items-center justify-center md:justify-start">
                  <svg
                    class="w-4 h-4 mr-2"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path
                      fill="currentColor"
                      d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
                  </svg>Clear calls
                </p>
              </div>
              <div class="w-full lg:w-6/12 xl:w-4/12 mb-4">
                <p class="flex items-center justify-center md:justify-start">
                  <svg
                    class="w-4 h-4 mr-2"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path
                      fill="currentColor"
                      d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
                  </svg>Quite mode
                </p>
              </div>
              <div class="w-full lg:w-6/12 xl:w-4/12 mb-4">
                <p class="flex items-center justify-center md:justify-start">
                  <svg
                    class="w-4 h-4 mr-2"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path
                      fill="currentColor"
                      d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
                  </svg>Secure
                </p>
              </div>
              <div class="w-full lg:w-6/12 xl:w-4/12 mb-4">
                <p class="flex items-center justify-center md:justify-start">
                  <svg
                    class="w-4 h-4 mr-2"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path
                      fill="currentColor"
                      d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
                  </svg>Comfortable
                </p>
              </div>
            </div>-->
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
  </section>
  <!-- Section: Design Block -->
</div>
<!-- Container for demo purpose -->
