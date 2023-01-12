<script lang="ts">
  import swaggerDoc from "@/swagger-output.json";
  import { compile } from "path-to-regexp";
  import type { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";

  let swagger: any = null;
  let baseurl: any = "";
  let active: any = {};
  let responses: any = {};
  let requestParams: any = {};
  let requestBodyExample = {};
  let paths: KeyValueDataStructure = {};

  const loadSwagger = async () => {
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
  };
  const getSchema = (refName) => {
    const division = refName.replace("#/", "").split("/");
    return swagger[division[0]][division[1]][division[2]];
  };
  const handleRequest = async (route, method, methodId, paramDetails) => {
    const reqParams = Object.entries(requestParams).filter(
      (x) => x[0].indexOf(methodId) > -1
    );
    const params = {};
    if (reqParams.length > 0) {
      reqParams.forEach((x) => {
        const paramName = `${x[0].split("-")[2]}`;
        const paramIn = paramDetails.find(
          (param) => param.name === paramName
        ).in;
        if (paramIn == "query") {
          params[paramName] = x[1];
        }
      });
    }
    const headers = { "Content-Type": "application/json" };
    const inPath = {};
    paramDetails.forEach((x) => {
      if (x.in === "path") {
        if (
          reqParams.length > 0 &&
          reqParams.find((param) => param[0] === `${methodId}-${x.name}`)[1]
        ) {
          inPath[x.name] = reqParams.find(
            (param) => param[0] === `${methodId}-${x.name}`
          )[1]; // paramDetails.indexOf(param => param.name === x.name)params[x.name]
        } else {
          inPath[x.name] = null;
        }
      }
      if (x.in === "header") {
        if (
          reqParams.length > 0 &&
          reqParams.find((param) => param[0] === `${methodId}-${x.name}`)[1]
        ) {
          headers[x.name] = reqParams.find(
            (param) => param[0] === `${methodId}-${x.name}`
          )[1];
        }
      }
    });
    const toPath = compile(route, { encode: encodeURIComponent });
    const encodedUri = toPath(inPath);
    const queryString = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
    const url = `${baseurl}${encodedUri}${
      queryString ? `?${queryString}` : ""
    }`;
    const response = await fetch(url, {
      method: method.toUpperCase(), // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: headers,
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: requestBodyExample[methodId], // JSON.stringify(data) // body data type must match "Content-Type" header
    });
    responses[methodId] = response;
    //response.json(); // parses JSON response into native JavaScript objects
  };
  loadSwagger();
  console.log(paths);

  $: {
    console.log(active);
  }
</script>

<div class="text-left">
  <h1 class="text-xl font-bold mt-0 mb-6">{swaggerDoc.info.title}</h1>
</div>

{#each Object.entries(paths) as [category, routes], ID}
  <div class="accordion" id="main_category_{ID}">
    <div class="accordion-item border border-gray-200">
      <h2 class="accordion-header mb-0" id="heading_category_{ID}">
        <button
          class="fixRound blue accordion-button
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
            <div class="p-1 pl-6 pr-6 bg-blue-400 text-white rounded font-bold">
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
              <div class="accordion" id="main_category_{route.id}">
                <div class="accordion-item border border-gray-200">
                  <h2
                    class="accordion-header mb-0"
                    id="heading_category_{route.id}">
                    <button
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
                    class="accordion-collapse collapse"
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
                                on:click={() => (active = route)}
                                >Try It Out</button>
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
</style>
