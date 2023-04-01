<script lang="ts">
  export let form;
</script>

<div class="flex flex-col gap-4 text-left lg:text-left">
  <button
    {form}
    type="submit"
    class="w-48 inline-block px-3 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase  shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
    Change Server Key
  </button>
  <div>
    <p
      class="break-normal text-xs text-red-700 font-semibold mt-2 pt-1 mb-0 w-full">
      BE CAREFUL! Changing the server key will irrevocably change the IPFS key
      on this server.
    </p>
  </div>
</div>
