<script lang="ts">
  import { onMount } from "svelte";
  import * as standards from "@/lib/standards/standards";
  import { readFB, writeFB } from "@/lib/utility/flatbufferConversion";
  import { ByteBuffer } from "flatbuffers";
  let results = {
    json: { start: 0, stop: 0, data: { RECORDS: [] } },
    fbs: { start: 0, stop: 0, data: { RECORDS: [] } },
  };
  let currentData = new standards.OMM.OMMCOLLECTIONT();
  let cDT;
  let templateURL = `${
    ~window.location.host.indexOf("localhost") ? "http://localhost:8080" : ""
  }/spacedatalatest/omm/0x9858effd232b4033e47d90003d41ec34ecaeda94/`;
  let loading = false;
  const getData = async (format) => {
    results[format].start = performance.now();
    const xresults = await fetch(`${templateURL}?format=${format}`);
    if (format === "json") {
      results[format].data = await xresults.json();
    } else {
      let rawBuffer = new Uint8Array(await xresults.arrayBuffer());
      results[format].data = readFB(rawBuffer, "OMM", standards.OMM);
    }
    results[format].stop = (performance.now() - results[format].start) / 1000;
    clearTimeout(cDT);
    cDT = setTimeout(() => {
      currentData = results[format].data;
    }, 1000);
  };
  const RunTest = async () => {
    loading = true;
    for (let format in results) {
      await getData(format);
    }
    loading = false;
  };
</script>
<h1>Test 2</h1>
<main
  class="w-full flex flex-col items-center border border-2 border-gray-400 background-black">
  <input
    class="p-2 w-1/2 rounded-md border-solid border-2 border-gray-400"
    bind:value={templateURL} />
  {#each Object.entries(results) as [format, result]}
    <div>
      <h2>
        <a href={`${templateURL}?format=${format}`}>{format.toUpperCase()}</a>
      </h2>
      Loaded: {result.data.RECORDS.length} RECORDS <br />
      {result.stop} seconds
    </div>
  {/each}
  <div style="margin:10px;padding:10px">
    {#if !loading}
      <button style="border:1px black solid" on:click={RunTest}
        >Run Test</button>
    {:else}
      <div>RUNNING TEST...</div>
    {/if}
  </div>
  <div class="overflow-auto border rounded-md h-24 w-1/2">
    {#each currentData.RECORDS.slice(0, 100) as record}
      <div class="border rounded-md m-2">
        {#each Object.entries(record) as [key, value]}
          <div>{key}:{value}</div>
        {/each}
      </div>
    {/each}
  </div>
</main>

<style global lang="postcss">
  :global(body, html, #app) {
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    padding: 0px;
    margin: 0px;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }
</style>
