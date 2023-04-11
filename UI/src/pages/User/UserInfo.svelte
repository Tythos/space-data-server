<script lang="ts">
  import Info from "./UserComponents/Info.svelte";
  import VCard from "@/UI/src/components/VCard.svelte";
  import {
    ethWallet,
    provider,
    vCard,
    getDigitalVCFSignature,
    verifyDigitalVCFSignature,
  } from "@/UI/src/stores/user";
  import { Icon } from "svelte-awesome";
  import { download, upload } from "svelte-awesome/icons";
  import { createCSV, createV3, readVCARD } from "vcard-cryptoperson";
  import { downloadFile } from "@/UI/src/lib/download";

  let activeTab = 0;

  const exportToVCard = () => {
    ($vCard as any).signature = getDigitalVCFSignature($vCard).serialized;
    downloadFile(createV3($vCard), `${$ethWallet.address}.vcf`);
  };
  const importVCard = async () => {
    const file = await promptFileUpload("text/vcard");
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const vcard = readVCARD(fileReader.result as string);
        if (!verifyDigitalVCFSignature(vcard)) {
          alert("Digital Signature Invalid");
        }
        $vCard = vcard;
      } catch (error) {
        console.error(error);
        alert("Error importing vCard file.");
      }
    };
    fileReader.readAsText(file);
  };

  const promptFileUpload = async (accept = "") => {
    return new Promise<File | null>((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = accept;
      input.onchange = (e) => {
        const files = (e.target as HTMLInputElement).files;
        resolve(files ? files[0] : null);
      };
      input.click();
    });
  };
</script>

<div class="flex flex-col w-full md:w-2/3 text-[.5rem] md:text-sm">
  <div class="flex justify-between">
    <ul
      class="cursor-pointer mb-4 flex list-none border-b-0 pl-0"
      id="tabs-tab3"
      role="tablist"
      data-te-nav-ref>
      <li
        role="presentation"
        on:click={(e) => {
          activeTab = 0;
        }}>
        <div
          class:border-transparent={activeTab}
          class="my-2 block border-x-0 border-t-0 border-b-2 px-7 pt-4 pb-3.5 font-medium uppercase leading-tight text-neutral-500 hover:isolate focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
          id="tabs-home-tab3"
          role="tab"
          aria-controls="tabs-home3"
          aria-selected="true">
          User Info
        </div>
      </li>
      <li
        role="presentation"
        on:click={(e) => {
          activeTab = 2;
        }}>
        <div
          class:border-transparent={activeTab !== 2}
          class="focus:border-transparent my-2 block border-x-0 border-t-0 border-b-2 px-7 pt-4 pb-3.5 font-medium uppercase leading-tight text-neutral-500 hover:isolate focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
          id="tabs-profile-tab3"
          role="tab"
          aria-controls="tabs-profile3"
          aria-selected="false">
          Edit
        </div>
      </li>
    </ul>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="flex gap-1">
      <div
        class="my-2 block px-4 pt-4 pb-3.5 font-medium uppercase leading-tight text-neutral-500 hover:isolate focus:isolate data-[te-nav-active]:text-primary dark:text-neutral-400 dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400 cursor-pointer"
        id="tabs-export-tab3"
        role="tab"
        aria-controls="tabs-export3"
        aria-selected="false"
        on:click={importVCard}>
        Import
        <Icon data={upload} scale={0.65} />
      </div>
      <div
        class="my-2 block px-4 pt-4 pb-3.5 font-medium uppercase leading-tight text-neutral-500 hover:isolate focus:isolate data-[te-nav-active]:text-primary dark:text-neutral-400 dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400 cursor-pointer"
        id="tabs-export-tab3"
        role="tab"
        aria-controls="tabs-export3"
        aria-selected="false"
        on:click={exportToVCard}>
        Export
        <Icon data={download} scale={0.65} />
      </div>
    </div>
  </div>
  <div>
    {#if activeTab === 0}
      <Info />
    {:else if activeTab === 2}
      <VCard {vCard} />
    {/if}
  </div>
</div>
