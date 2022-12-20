<script lang="ts">
  import { onMount } from "svelte";
  import * as standards from "@/lib/standards/standards";
  import { readFB, writeFB } from "@/lib/utility/flatbufferConversion";
  import { ByteBuffer } from "flatbuffers";
  let results = {
    json: { start: 0, stop: 0, data: { RECORDS: [] } },
    fb: { start: 0, stop: 0, data: { RECORDS: [] } },
  };
  let templateURL = `${
    window.location.host === "localhost" ? "localhost:8080" : ""
  }/spacedata/omm/0x9858effd232b4033e47d90003d41ec34ecaeda94/`;
  let loading = false;
  const getData = async (format) => {
    results[format].start = performance.now();
    const xresults = await fetch(`${templateURL}?&format=${format}`);
    if (format === "json") {
      results[format].data = await xresults.json();
    } else {
      let rawBuffer = new Uint8Array(await xresults.arrayBuffer());
      results[format].data = readFB(rawBuffer, "OMM", standards.OMM);
    }
    results[format].stop = (performance.now() - results[format].start) / 1000;
  };
  const RunTest = async () => {
    loading = true;
    for (let format in results) {
      await getData(format);
    }
    loading = false;
  };
</script>

<main style="width:100vw">
  <input style="width:50vw" bind:value={templateURL} />
  {#each Object.entries(results) as [format, result]}
    <div>
      <h2>{format.toUpperCase()}</h2>
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
</main>

<style>
  :global(body, html) {
    overflow: hidden;
    width: 100vw;
    height: 100vh;
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
