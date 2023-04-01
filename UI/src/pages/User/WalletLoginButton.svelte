<script lang="ts">
  export let form;
</script>

<div class="flex flex-col gap-4 text-left lg:text-left">
  <button
    {form}
    type="submit"
    class="w-32 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase  shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
    Login
  </button>
  <div>
    <h2 class="font-bold text-sm">Note:</h2>
    <p class="break-normal text-xs font-semibold mt-2 pt-1 mb-0 w-full">
      Your username and password create a unique <a
        href="https://ethereum.org/en/developers/docs/accounts/">Ethereum</a>
      keypair in your browser and are not stored anywhere else. If you forget your
      login details, you won't be able to access your account, so keep them safe.
    </p>
  </div>
</div>
