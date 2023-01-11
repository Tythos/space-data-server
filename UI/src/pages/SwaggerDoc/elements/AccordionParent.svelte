<script lang="ts">
  export let ID: any;
  export let Title: any;
  export let Description: any;
  export let BodyElement: any;
  export let swaggerDoc: any;
</script>

<div class="accordion" id="main_category_{ID}">
  <div class="accordion-item border border-gray-200">
    <h2 class="accordion-header mb-0" id="heading_category_{ID}">
      <button
        class="
            blue
            accordion-button
            relative
            flex
            items-center
            w-full
            py-2
            px-3
            text-base text-gray-800 text-left
            border-0
            rounded-none
            transition
            focus:outline-none
          "
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#category_{ID}"
        aria-expanded="true"
        aria-controls="category_{ID}">
        <div class="flex items-center gap-2 text-black">
          <div class="p-1 pl-6 pr-6 bg-blue-400 text-white rounded font-bold">
            {Title}
          </div>
          {Description}
        </div>
      </button>
    </h2>
    <div
      id="category_{ID}"
      class="accordion-collapse collapse show"
      aria-labelledby="heading_category_{ID}"
      data-bs-parent="#main_category_{ID}">
      <div class="accordion-body py-4 px-5 flex flex-col gap-2">
        <BodyElement {swaggerDoc} />
      </div>
    </div>
  </div>
</div>
