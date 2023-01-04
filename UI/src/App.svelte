<script lang="ts">
</script>

<div class="flex flex-col h-full fixed bg-red-400">
  <div class="flex justify-center items-center bg-blue-300">
    <div class="h-12 justify-center items-center flex w-full">
      Space Data Server
    </div>
  </div>
  <div class="overflow-y-scroll overflow-x-hidden break-all">
    <div class="bg-red-400 ">
      {new Array(3000).fill(0).map((n, i) => {
        return i;
      })}
    </div>
  </div>
</div>

<style global lang="postcss">
  @supports (-webkit-touch-callout: none) {
    body {
      /* The hack for Safari */
      height: -webkit-fill-available;
    }
  }
  :global(body, html) {
    overflow: hidden;
    min-height: 100vh;
    /* mobile viewport bug fix */
    min-height: -webkit-fill-available;
    width: 100vw;
    height: 100vh;
    padding: 0px;
    margin: 0px;
  }
</style>
