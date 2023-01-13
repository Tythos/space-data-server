<script lang="ts">
  import swaggerDoc from "@/swagger-output.json";
  import type { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
  import { onMount } from "svelte";
  import { handleRequest } from "./handleRequest";
  let swagger: any = null;

  let baseurl: any = "";
  /* Active */
  let active: any;
  let activeHeaders = {
    accept: "",
  };
  let selectedAcceptHeader = 0;
  let activeProduces = [];
  let activeAccept;
  const devMode = window.location.hostname === "localhost";

  $: {
    activeAccept = activeProduces.find((o) => o.id === selectedAcceptHeader);
    activeHeaders.accept = activeAccept?.name;
  }

  let responseCode = 400;
  let responseBody = "";
  let responseHeaders = {};
  let responses: any = {};
  let requestParams: any = {};
  let requestBodyExample = {};
  let paths: KeyValueDataStructure = {};

  onMount(async () => {
    swagger = swaggerDoc;
    baseurl = window.location.host;

    Object.entries(swagger.paths).forEach((route, routeIdx) => {
      let category = Object.values(route[1])[0]?.tags;
      category = category ? category[0] : "Default";
      Object.entries(route[1]).map((method, methodIdx) => {
        const id = `${routeIdx}-${methodIdx}`;
        if (method[1].requestBody) {
          Object.entries(method[1].requestBody.content).forEach(
            (item: any, fiel) => {
              if ("$ref" in item[1].schema) {
                requestBodyExample[id] = JSON.stringify(
                  getSchema(item[1].schema["$ref"]).example,
                  null,
                  2
                );
              }
            }
          );
        }
        if (category in paths) {
          paths[category].push({
            id,
            route: route[0],
            method: method[0],
            ...method[1],
          });
        } else {
          paths[category] = [
            {
              id,
              route: route[0],
              method: method[0],
              ...method[1],
            },
          ];
        }
      });
    });
  });
  const getSchema = (refName) => {
    const division = refName.replace("#/", "").split("/");
    return swagger[division[0]][division[1]][division[2]];
  };

  const changeHeader = (header, e) => {
    activeHeaders[header] = e.target.value;
  };
  $: {
    console.log(requestParams);
  }

  let httpV = [
    { id: "0", value: "HTTP" },
    { id: "1", value: "HTTPS" },
  ];
  let selectedHttpV = "0";
  $: selectedHttpVO = httpV.find((o) => o.id === selectedHttpV);
  const devCSS = devMode
    ? ".accordion-collapse .collapse"
    : "accordion-collapse collapse";

  const execute = async () => {
    let response = await handleRequest(
      `${selectedHttpVO.value.toLowerCase()}://${
        swaggerDoc.host || devMode
          ? window.location.hostname + ":8080"
          : window.location.host
      }`,
      active,
      active.id,
      active.parameters,
      requestParams,
      requestBodyExample
    );
    const isJSON = activeAccept?.name === "application/json";
    responseBody = await response[isJSON ? "json" : "text"]();

    if (isJSON) {
      responseBody = JSON.stringify(responseBody, null, 4);
    }
    console.log(responseBody, isJSON);
  };

  console.log(swaggerDoc);
</script>

<div class="text-left">
  <h1 class="text-4xl text-gray-600 font-bold mt-0 mb-6 flex gap-2">
    {swaggerDoc.info.title}
    <div
      class="h-6 bg-gray-500 rounded-3xl text-xs flex items-center justify-center p-1 text-white">
      {swaggerDoc.info.version}
    </div>
  </h1>
</div>
<div class="text-sm font-bold flex flex-col gap-1 w-24 h-24 text-left">
  Schemes
  <select
    bind:value={selectedHttpV}
    class="bg-white border-black border rounded p-1 pl-4 pr-4">
    {#each httpV as option}
      <option value={option.id}>{option.value}</option>
    {/each}
  </select>
</div>
{#each Object.entries(paths) as [category, routes], ID}
  <div class="accordion" id="main_category_{ID}">
    <div class="accordion-item border border-gray-200">
      <h2 class="accordion-header mb-0" id="heading_category_{ID}">
        <button
          class="fixRound accordion-button
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
          focus:outline-none;"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#category_{ID}"
          aria-expanded="true"
          aria-controls="category_{ID}">
          <div class="flex items-center gap-2 text-black">
            <div
              class="p-1 pl-6 pr-6 text-gray-500 text-xl text-white rounded font-bold">
              {category}
            </div>
            {swaggerDoc.tags?.find((t) => t.name === category)[0].description ||
              ""}
          </div>
        </button>
      </h2>
      <div
        id="category_{ID}"
        class="accordion-collapse collapse show"
        aria-labelledby="heading_category_{ID}"
        data-bs-parent="#main_category_{ID}">
        <div class="accordion-body py-4 px-5 flex flex-col gap-2">
          <div
            id="collapseOne"
            class="flex flex-col gap-2 accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample">
            <!--ts-ignore-->
            {#each routes as route, r}
              <div
                class="accordion border border-gray-400 border rounded-lg"
                id="main_category_{route.id}">
                <div class="accordion-item border rounded-lg">
                  <h2
                    style="border:0px;"
                    class="accordion-header mb-0"
                    id="heading_category_{route.id}">
                    <button
                      style="border:0px;
                         border-bottom:1px #aaa solid;
                         border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;"
                      class:blue={route.method.toUpperCase() === "GET"}
                      class:green={route.method.toUpperCase() === "POST"}
                      class:orange={route.method.toUpperCase() === "PUT"}
                      class:red={route.method.toUpperCase() === "DELETE"}
                      class="fixRound accordion-button
                      relative
                      collapsed
                      flex
                      items-center
                      w-full
                      py-2
                      px-3
                      text-base text-gray-800 text-left
                      border-0
                      rounded-none
                      transition
                      focus:outline-none"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#category_{route.id}"
                      aria-expanded="false"
                      aria-controls="category_{route.id}">
                      <div
                        class="flex items-center gap-4 text-gray-800 sm:text-xs text-sm">
                        <div
                          class:bg-blue-400={route.method.toUpperCase() ===
                            "GET"}
                          class:bg-green-400={route.method.toUpperCase() ===
                            "POST"}
                          class:bg-purple-400={route.method.toUpperCase() ===
                            "PUT"}
                          class:bg-red-400={route.method.toUpperCase() ===
                            "DELETE"}
                          class="w-32 flex item--center justify-center p-1 pl-6 pr-6 text-white rounded font-bold">
                          {route.method.toUpperCase()}
                        </div>
                        <div class="font-bold text-sm break-all pr-2">
                          {route.route}
                        </div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="category_{route.id}"
                    class={devCSS}
                    aria-labelledby="heading_category_{route.id}"
                    data-bs-parent="#main_category_{route.id}">
                    <div class="accordion-body flex flex-col gap-2">
                      <div class="flex flex-col">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div class="inline-block min-w-full sm:px-6 lg:px-8">
                            <div
                              class:bg-blue-100={route.method.toUpperCase() ===
                                "GET"}
                              class:bg-green-100={route.method.toUpperCase() ===
                                "POST"}
                              class:bg-purple-100={route.method.toUpperCase() ===
                                "PUT"}
                              class:bg-red-100={route.method.toUpperCase() ===
                                "DELETE"}
                              class="text-black flex text-left text-xs flex px-4 py-6">
                              {route.description || "No Description"}
                            </div>
                            <div
                              class="z-10 text-black flex items-center justify-between text-left text-sm font-bold shadow-md border-b border-gray-300 flex p-2 px-4">
                              <div>Parameters</div>
                              <button
                                class="p-2 border-2 rounded w-24"
                                on:click={() => {
                                  active = route;
                                  activeHeaders.accept = route.pro;
                                  activeProduces = (
                                    route?.produces || swaggerDoc.produces
                                  ).map((p, pid) => {
                                    return { id: pid, name: p };
                                  });
                                }}>Try It Out</button>
                            </div>
                            <div
                              class:bg-blue-100={route.method.toUpperCase() ===
                                "GET"}
                              class:bg-green-100={route.method.toUpperCase() ===
                                "POST"}
                              class:bg-purple-100={route.method.toUpperCase() ===
                                "PUT"}
                              class:bg-red-100={route.method.toUpperCase() ===
                                "DELETE"}
                              class="overflow-hidden flex flex-col items-start justify-center p-8">
                              <div class="w-full">
                                {#if !route.parameters.length}
                                  <h2
                                    class="flex h-24 items-center justify-center">
                                    No Parameters
                                  </h2>
                                {:else}
                                  <table class="min-w-full">
                                    <thead
                                      class="border-b border-black text-left">
                                      <tr>
                                        <th
                                          scope="col"
                                          class="text-sm font-medium text-gray-900 py-4 text-left">
                                          Name
                                        </th>
                                        <th
                                          scope="col"
                                          class="text-sm font-medium text-gray-900 py-4 text-left">
                                          Description
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody class="text-left">
                                      {#each route.parameters as param, p}
                                        <tr class="border-b">
                                          <td
                                            class=" py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                            ><div>
                                              <div>
                                                {param.name.replace("?", "")}
                                              </div>
                                              <div class="font-bold">
                                                {param.type}
                                              </div>
                                              <div class="italic">
                                                ({param.in})
                                              </div>
                                            </div>
                                          </td>
                                          <td
                                            class="flex flex-col gap-2 text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                                            <div>{param.description || ""}</div>
                                            <input
                                              bind:value={requestParams[
                                                `${route.id}-${param.name}`
                                              ]}
                                              type="text"
                                              class="w-1/3 border-2 border-gray-400 rounded p-1" />
                                          </td>
                                        </tr>
                                      {/each}
                                    </tbody>
                                  </table>
                                {/if}
                              </div>
                              {#if active?.id === route.id}
                                <div class="flex gap-2 mt-5 w-full">
                                  <button
                                    on:click={execute}
                                    class="flex items-center justify-center w-1/2 bg-blue-500 text-white font-bold rounded p-1"
                                    >Execute</button>
                                  <button
                                    on:click={() => {
                                      active = {};
                                      console.log(active);
                                    }}
                                    class="flex items-center justify-center w-1/2 text-black font-bold rounded border border-black p-1"
                                    >Clear</button>
                                </div>
                              {/if}
                            </div>
                            {#if active?.id === route.id}
                              <div
                                class="z-10 text-black flex items-center justify-between text-left text-sm font-bold shadow-md border-b border-gray-300 flex p-3 px-4">
                                <div>Responses</div>
                                <div
                                  class="flex gap-2 items-center justify-center text-xs">
                                  <div>Response Content Type</div>

                                  <select
                                    bind:value={selectedAcceptHeader}
                                    class="border-black border rounded p-2">
                                    {#each activeProduces as popt, p}
                                      <option value={popt.id}
                                        >{popt.name}</option>
                                    {/each}
                                  </select>
                                </div>
                              </div>
                              <div
                                class:bg-blue-100={route.method.toUpperCase() ===
                                  "GET"}
                                class:bg-green-100={route.method.toUpperCase() ===
                                  "POST"}
                                class:bg-purple-100={route.method.toUpperCase() ===
                                  "PUT"}
                                class:bg-red-100={route.method.toUpperCase() ===
                                  "DELETE"}
                                class="flex flex-col gap-2 items-start text-xs font-bold p-4 w-full">
                                <div>Curl</div>
                                <code
                                  class="w-full p-2 bg-gray-800 rounded text-white text-left">
                                  curl -X '{active.method.toUpperCase()}' \
                                  <br />
                                  '{selectedHttpVO?.value?.toLowerCase()}://{window
                                    .location.host}{active.route}' \ <br />
                                  {#each Object.entries(activeHeaders) as [header, value], h}
                                    -H '{header}: {value}'
                                  {/each}
                                </code>
                                <div>Request URL</div>
                                <code
                                  class="w-full p-2 bg-gray-800 rounded text-white text-left">
                                  {selectedHttpVO?.value?.toLowerCase()}://{window
                                    .location.host}{active.route}
                                </code>
                                <div class="text-md mt-3">Server Response</div>
                                <table class="min-w-full">
                                  <thead
                                    class="border-b border-black text-left">
                                    <tr>
                                      <th
                                        scope="col"
                                        class="text-sm font-medium text-gray-900 py-4 text-left">
                                        Code
                                      </th>
                                      <th
                                        scope="col"
                                        class="text-sm font-medium text-gray-900 py-4 text-left">
                                        Details
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody class="text-left">
                                    <tr
                                      ><td
                                        style="width:10px"
                                        class="m-0 w-6 flex pt-2">
                                        {responseCode}
                                      </td><td>
                                        <div class="flex flex-col gap-2 p-2">
                                          <div>Response Body</div>
                                          <code
                                            class="whitespace-pre w-full p-2 bg-gray-800 rounded text-white text-left max-h-32 overflow-y-scroll overflow-x-hidden">
                                            {responseBody}
                                          </code>
                                          <div>Response Headers</div>
                                          <code
                                            class="w-full p-2 bg-gray-800 rounded text-white text-left h-12">
                                            {#each Object.entries(responseHeaders) as [header, value], h}
                                              {header}:{value}<br />
                                            {/each}
                                          </code>
                                        </div>
                                      </td></tr>
                                  </tbody>
                                </table>
                              </div>
                            {/if}
                          </div>
                        </div>
                      </div>
                      <!--End Body-->
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
{/each}

<style lang="postcss">
  .fixRound {
    border-radius: 5px;
  }
  .blue {
    @apply bg-blue-100 border-2 border-blue-300;
  }
  .green {
    @apply bg-green-100 border-2 border-green-300;
  }
  .orange {
    @apply bg-orange-100 border-2 border-orange-300;
  }
  .red {
    @apply bg-red-100 border-2 border-red-300;
  }
  /*.headerButton {
    @apply blue accordion-button
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
            focus:outline-none;
  }*/

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #999;
  }
</style>
