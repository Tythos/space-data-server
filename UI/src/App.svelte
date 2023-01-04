<script lang="ts">
</script>

<div class="flex flex-column h-full">
  <div class="w-full fixed top-0 bg-white w-full z-10 h-12 bg-blue-300">
    Header
  </div>
  <div class="overflow-y-scroll fixed top-12 w-full">
    <div class="bg-red-400 ">{new Array(3000).join("lorem ipsum")}</div>
  </div>
</div>

<style global lang="postcss">
  :global(body, html) {
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    padding: 0px;
    margin: 0px;
  }
  
</style>
