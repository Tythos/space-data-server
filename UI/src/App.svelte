<script lang="ts">
  import "tw-elements";
  import "tw-elements/dist/css/index.min.css";
  import Router_, { push } from "svelte-spa-router";
  import { routes } from "@/UI/src/routes/routes";
  import LoginButton from "./pages/User/LoginButton.svelte";
  import { crypto } from "webcrypto-liner/build/index.es";

  self.crypto.subtle = crypto.subtle; ///HAAAAAAAAAAAAAAACK

  const Router: any = Router_; ///HAAAAAAAAAAAAAAACK
</script>

<div class="wrap-safe-pad flex flex-col h-full w-full fixed">
  <nav
    style="z-index:100"
    class="w-100vw font-sans navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
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
        <ul class="navbar-nav mr-auto min-[990px]:flex">
          {#each Object.entries(routes).filter((a) => a[1].navBar) as [route, value], i}
            <li class="nav-item">
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                on:click={(e) => {
                  push(route);
                }}
                class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light">
                {value.name}
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>
    <div class="mr-6 h-full flex items-center"><LoginButton /></div>
  </nav>
  <div
    class="bg-white overflow-y-auto overflow-x-hidden break-all body-safe-pad">
    <Router {routes} />
  </div>
</div>

<style>
  .body-safe-pad {
    overscroll-behavior: initial;
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
  .wrap-safe-pad {
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
    height: 100vh;
    overscroll-behavior: none;
    /* mobile viewport bug fix */
    min-height: -webkit-fill-available;
    min-width: -webkit-fill-available;
    width: 100vw;
    padding: 0px;
    margin: 0px;
  }
  :global(.modal-backdrop) {
    display: fixed;
    z-index: -1;
  }
</style>
