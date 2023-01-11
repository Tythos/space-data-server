<script lang="ts">
  import "tw-elements";
  import "tw-elements/dist/css/index.min.css";
  import Router from "svelte-spa-router";
  import { routes } from "@/UI/src/routes/routes";
  console.log(routes);
</script>

<nav
  style="position:fixed;z-index:100"
  class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
  <div class="px-6 w-full flex flex-wrap items-center justify-between">
    <div class="flex items-center">
      <button
        class="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContentY"
        aria-controls="navbarSupportedContentY"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          class="w-5"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512">
          <path
            fill="currentColor"
            d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
        </svg>
      </button>
    </div>
    <div
      class="navbar-collapse collapse grow items-center"
      id="navbarSupportedContentY">
      <ul class="navbar-nav mr-auto lg:flex lg:flex-row">
        {#each Object.entries(routes) as [route, value], i}
          <li class="nav-item">
            <a
              class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
              href="#{route}"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light">{value.name}</a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>
<header>
  <!-- Navbar -->

  <!-- Navbar -->
  <div class="text-center text-gray-800 py-20 px-6">
    <Router {routes} />
  </div>
</header>
