<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { PersonCryptoKey } from "vcard-cryptoperson/src/class/class";
  export let vCard: Writable<PersonCryptoKey | any>;
  const handleSubmit = () => {};
</script>

<section
  class="mb-32 text-gray-800 text-center md:text-left flex border md:border-none">
  <div
    class="block rounded-lg shadow-lg bg-white h-[70vh] w-full overflow-y-auto p-4">
    <form on:submit={handleSubmit} class="m-auto flex flex-col gap-2">
      <div class="flex gap-2 w-full">
        <div class="mb-4">
          <label for="givenName" class="block text-gray-700 font-bold mb-2"
            >First Name</label>
          <input
            type="text"
            id="givenName"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="givenName"
            bind:value={$vCard.givenName} />
        </div>
        <div class="mb-4">
          <label for="additionalName" class="block text-gray-700 font-bold mb-2"
            >Middle Name</label>
          <input
            type="text"
            id="additionalName"
            class="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="additionalName"
            bind:value={$vCard.additionalName} />
        </div>
        <div class="mb-4">
          <label for="familyName" class="block text-gray-700 font-bold mb-2"
            >Last Name</label>
          <input
            type="text"
            id="familyName"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="familyName"
            bind:value={$vCard.familyName} />
        </div>
      </div>
      <div class="flex gap-2">
        <div class="mb-4">
          <label
            for="honorificPrefix"
            class="block text-gray-700 font-bold mb-2">Prefix</label>
          <input
            type="text"
            id="honorificPrefix"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="honorificPrefix"
            bind:value={$vCard.honorificPrefix} />
        </div>
        <div class="mb-4">
          <label
            for="honorificSuffix"
            class="block text-gray-700 font-bold mb-2">Suffix</label>
          <input
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            bind:value={$vCard.honorificSuffix} />
        </div>
      </div>
      <div class="mb-4">
        <label
          for="hasOccupationName"
          class="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          id="hasOccupationName"
          class="shadow appearance-none border rounded w-full md:w-2/3 lg:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="hasOccupation.name"
          bind:value={$vCard.hasOccupation.name} />
      </div>
      <div class="border p-4">
        <div class="text-xl border-b-[1px] mb-4">Organization</div>
        <div class="mb-4">
          <label
            for="affiliationLegalName"
            class="block text-gray-700 font-bold mb-2">Legal Name</label>
          <input
            type="text"
            id="affiliationLegalName"
            class="shadow appearance-none border rounded w-full md:w-2/3 lg:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="affiliation.legalName"
            bind:value={$vCard.affiliation.legalName} />
        </div>
        <div class="mb-4">
          <label
            for="affiliationName"
            class="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="affiliationName"
            class="shadow appearance-none border rounded w-full md:w-2/3 lg:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="affiliation.name"
            bind:value={$vCard.affiliation.name} />
        </div>
      </div>
      <div class="border p-4">
        <div class="text-xl border-b-[1px] mb-4">Address</div>
        <div class="mb-4">
          <label
            for="addressPostOfficeBoxNumber"
            class="block text-gray-700 font-bold mb-2"
            >Post Office Box Number</label>
          <input
            type="text"
            id="addressPostOfficeBoxNumber"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="postOfficeBoxNumber"
            bind:value={$vCard.address.postOfficeBoxNumber}
            autocomplete="postal-code" />
        </div>
        <div class="mb-4">
          <label
            for="addressStreetAddress"
            class="block text-gray-700 font-bold mb-2">Street Address</label>
          <input
            type="text"
            id="addressStreetAddress"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="streetAddress"
            bind:value={$vCard.address.streetAddress}
            autocomplete="street-address" />
        </div>
        <div class="mb-4">
          <label
            for="addressLocality"
            class="block text-gray-700 font-bold mb-2">City</label>
          <input
            type="text"
            id="addressLocality"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="addressLocality"
            bind:value={$vCard.address.addressLocality}
            autocomplete="address-level2" />
        </div>
        <div class="mb-4">
          <label for="addressRegion" class="block text-gray-700 font-bold mb-2"
            >State</label>
          <input
            type="text"
            id="addressRegion"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="addressRegion"
            bind:value={$vCard.address.addressRegion}
            autocomplete="address-level1" />
        </div>
        <div class="mb-4">
          <label for="addressCountry" class="block text-gray-700 font-bold mb-2"
            >Country</label>
          <input
            type="text"
            id="addressCountry"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="addressCountry"
            bind:value={$vCard.address.addressCountry}
            autocomplete="country" />
        </div>
        <div class="mb-4">
          <label for="addressCountry" class="block text-gray-700 font-bold mb-2"
            >Postal Code</label>
          <input
            type="text"
            id="addressZIP"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="addressZIP"
            bind:value={$vCard.address.postalCode}
            autocomplete="postal-code" />
        </div>
      </div>
    </form>
  </div>
</section>
