<script lang="ts">
</script>

<div class="flex flex-col h-full w-full fixed bg-red-400">
  <div class="flex justify-center items-center bg-blue-300">
    <div class="h-12 justify-center items-center flex w-full">
      Space Data Server
    </div>
  </div>
  <div class="overflow-y-scroll overflow-x-hidden break-all body-safe-pad">
    <div class="bg-red-400">
      {new Array(3000).fill(0).map((n, i) => {
        return i;
      })}
    </div>
  </div>
</div>

<style global lang="postcss">
  .body-safe-pad {
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
  @supports (-webkit-touch-callout: none) {
    body {
      /* The hack for Safari */
      height: -webkit-fill-available;
      width: -webkit-fill-available;
    }
  }
  :global(body, html) {
    overflow: hidden;
    min-height: 100vh;
    /* mobile viewport bug fix */
    min-height: -webkit-fill-available;
    min-width: -webkit-fill-available;
    width: 100vw;
    height: 100vh;
    padding: 0px;
    margin: 0px;
  }
</style>
