<script lang="ts">
  import rawSwaggerDoc from "@/swagger-output.json";
  import type { KeyValueDataStructure } from "@/lib/class/utility/KeyValueDataStructure";
  import { onMount } from "svelte";
  import { handleRequest } from "./handleRequest";
  import JSONTree from "svelte-json-tree";
  import { resolver } from "@/lib/utility/resolver";
  import Icon from "svelte-awesome";
  import { copy, download } from "svelte-awesome/icons";
  import downloadjs from "downloadjs";
  import ipfsHash from "pure-ipfs-only-hash";
  import cc from "copy-to-clipboard";
  import type { AuthHeader } from "@/lib/class/authheader.json.interface";
  import { Buffer } from "buffer";
  import { ethWallet } from "@/UI/src/stores/user";

  const swaggerDoc: any = rawSwaggerDoc;

  async function copyText(responseBody) {
    if (activeHeaders.accept === "application/json") {
      cc(responseBody, {
        debug: true,
        message: "Press #{key} to copy",
      });
    } else if ((activeHeaders.accept = "application/octet-stream")) {
      let bContent = new Uint8Array(responseBody);
      downloadjs(
        bContent,
        `${await ipfsHash.of(bContent)}.fbs`,
        activeHeaders.accept
      );
    }
  }

  let swagger: any = null;

  let baseurl: any = "";
  /* Active */
  let active: any;
  let activeHeaders = {
    accept: "",
  };

  let responseContentTypes = {};
  let currentResponseContentType = {};
  let curlTemplate;
  let activeURL;
  let activeExecuted;

  const devMode = window.location.host === "localhost:5173";
  const devProvider = devMode
    ? "0x9858effd232b4033e47d90003d41ec34ecaeda94"
    : null;

  const _host = devMode ? "localhost:8080" : window.location.host;

  $: {
    activeHeaders.accept = active?.id
      ? responseContentTypes[active?.id][currentResponseContentType[active?.id]]
          .name
      : "";
    if (active) {
      curlTemplate = `curl -X "${active.method?.toUpperCase()}" \\
${[
  ...new Set(
    Object.entries(requestParams)
      ?.filter((rp: any) => rp[1].isFile)
      .map((file: any) => {
        return `--data-binary "@${file[1].name}"`;
      })
  ),
].join(" \\\n")} \\
"${activeURL}" ${Object.entries(activeHeaders).length ? "\\" : ""}
${Object.entries(activeHeaders)
  .map(([header, value], h) => {
    return `-H '${header}: ${value}'`;
  })
  .join(" \\\n")}`;
      curlTemplate += ";";
    }
  }

  let responses: any = {};
  let requestParams: any = {};
  let paths: KeyValueDataStructure = {};

  onMount(async () => {
    swagger = swaggerDoc;
    baseurl = window.location.host;

    Object.entries(swagger.paths).forEach((route, routeIdx) => {
      let category = Object.values(route[1])[0]?.tags;
      category = category ? category[0] : "MAIN";
      Object.entries(route[1]).map((method, methodIdx) => {
        const id = `${routeIdx}-${methodIdx}`;

        const hasReqBodyContent =
          method[1].hasOwnProperty("requestBody") &&
          method[1].requestBody.content;

        /*Add Body To Parameters*/
        if (
          method[1].requestBody &&
          !method[1].parameters.find((p) => p.name === "body")
        ) {
          method[1].parameters = [
            ...method[1].parameters,
            {
              name: "body",
              schema: {
                type: Object.keys(method[1].requestBody.content)
                  .map((m) => {
                    if (m === "application/text") {
                      return "string";
                    } else if (m === "application/json") {
                      return "object";
                    } else if (m === "application/octet-stream") {
                      return "buffer";
                    }
                  })
                  .join(","),
              },
              ...method[1].requestBody,
            },
          ];
        }
        /*ResponseContentTypes OPENAPI v3.0*/
        responseContentTypes[id] = responseContentTypes[id] || [];
        for (let response in method[1].responses) {
          if (method[1].responses[response].content) {
            for (let content in method[1].responses[response].content) {
              responseContentTypes[id].push(content);
            }
          }
        }

        if (!responseContentTypes[id].length) {
          responseContentTypes[id] = ["application/json"];
        }

        responseContentTypes[id] = responseContentTypes[id].map((p, pid) => {
          return { id: pid, name: p };
        });

        currentResponseContentType[id] = 0;

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

  let httpV = [
    { id: "0", value: "HTTP" },
    { id: "1", value: "HTTPS" },
  ];

  let selectedHttpV = document.location.protocol === "http:" ? "0" : "1";

  $: selectedHttpVO = httpV.find((o) => o.id === selectedHttpV);
  const devCSS = devMode
    ? ".accordion-collapse .collapse"
    : "accordion-collapse collapse";

  let requestOut = false;
  let requestError = null;
  const execute = async (e) => {
    e.preventDefault();

    requestOut = true;

    let { url, response, error } = await handleRequest(
      `${selectedHttpVO.value.toLowerCase()}://${_host}`,
      { ...active, route: active.route },
      active.id,
      active.parameters,
      requestParams,
      activeHeaders
    );
    requestError = error;
    setTimeout(() => {
      requestOut = false;
      requestError = null;
    }, 1000);

    activeURL = url;
    const isJSON = activeHeaders.accept === "application/json";
    const isText = activeHeaders.accept === "application/text";
    responses[active.id] = responses[active.id] || {
      responseBody: null,
      responseHeaders: {},
      responseCode: 0,
    };

    responses[active.id].responseBody = await response[
      isJSON ? "json" : isText ? "text" : "arrayBuffer"
    ]();

    if (isJSON) {
      responses[active.id].responseBody = JSON.stringify(
        responses[active.id].responseBody,
        null,
        4
      );
    }
    for (let header of response.headers.entries()) {
      responses[active.id].responseHeaders[header[0]] = header[1];
    }
    responses[active.id].responseCode = response.status;
    activeExecuted = true;
  };

  const resetActive = () => {
    active = null;
    activeExecuted = false;
  };

  const setAuthHeader = async (CID, route) => {
    const authHeader: AuthHeader = {
      CID,
      signature: await $ethWallet.signMessage(CID),
      nonce: performance.now(),
    };
    requestParams[`${route.id}-Authorization`] = `${Buffer.from(
      JSON.stringify(authHeader)
    ).toString("base64")}`;
  };

  const bufferSign = (e, route, param, CID?) => {
    if (!$ethWallet) {
      requestParams[`${route.id}-Authorization`] = "NOT LOGGED IN";
    } else {
      let file = e.target.files[0];
      requestParams[`${route.id}-${param.name}`] = file;
      requestParams[`${route.id}-${param.name}`].isFile = true;
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        let arrayBuffer = reader.result,
          array = new Uint8Array(arrayBuffer as any),
          binaryString = String.fromCharCode.apply(null, array);

        const CID = await ipfsHash.of(array);
        await setAuthHeader(CID, route);
      };
    }
  };
</script>

<div class="p-4 w-full mb-2">
  <div class="text-left py-6">
    <h1
      class="lg:text-4xl text-2xl text-gray-600 font-bold mt-0 mb-6 flex gap-2">
      {swaggerDoc.info.title}
      <div
        class="h-6 bg-gray-500 rounded-3xl text-[.5rem] lg:text-xs flex items-center justify-center p-1 pl-2 pr-2 text-white">
        {swaggerDoc.info.version}
      </div>
    </h1>
  </div>
  <div class="text-sm font-bold flex flex-col gap-1 w-24 h-24 text-left">
    Schemes
    <select
      bind:value={selectedHttpV}
      class="bg-white border-black border rounded p-1 pl-4 pr-4 text-xs">
      {#each httpV as option}
        <option value={option.id}>{option.value}</option>
      {/each}
    </select>
  </div>
  {#each Object.entries(paths) as [category, routes], ID}
    <div class="accordion lg:w-3/4 m-auto" id="main_category_{ID}">
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
              {swaggerDoc.tags?.find((t) => t.name === category)[0]
                .description || ""}
            </div>
          </button>
        </h2>
        <div
          id="category_{ID}"
          class="accordion-collapse collapse show"
          aria-labelledby="heading_category_{ID}"
          data-bs-parent="#main_category_{ID}">
          <div
            class="overflow-hidden accordion-body py-4 px-5 flex flex-col gap-2">
            <div
              class="flex flex-col gap-2 accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#model-box">
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
                        class:blue={route.method?.toUpperCase() === "GET"}
                        class:green={route.method?.toUpperCase() === "POST"}
                        class:orange={route.method?.toUpperCase() === "PUT"}
                        class:red={route.method?.toUpperCase() === "DELETE"}
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
                            class:bg-blue-400={route.method?.toUpperCase() ===
                              "GET"}
                            class:bg-green-400={route.method?.toUpperCase() ===
                              "POST"}
                            class:bg-purple-400={route.method?.toUpperCase() ===
                              "PUT"}
                            class:bg-red-400={route.method?.toUpperCase() ===
                              "DELETE"}
                            class="w-32 flex item--center justify-center p-1 pl-6 pr-6 text-white rounded font-bold">
                            {route.method?.toUpperCase()}
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
                          <div class="overflow-x-hidden flex sm:-mx-6 lg:-mx-8">
                            <div
                              class="inline-block min-w-full sm:px-6 lg:px-8">
                              <div
                                class:bg-blue-100={route.method?.toUpperCase() ===
                                  "GET"}
                                class:bg-green-100={route.method?.toUpperCase() ===
                                  "POST"}
                                class:bg-purple-100={route.method?.toUpperCase() ===
                                  "PUT"}
                                class:bg-red-100={route.method?.toUpperCase() ===
                                  "DELETE"}
                                class="text-black flex text-left text-xs flex px-4 py-6">
                                {@html route.description || "No Description"}
                              </div>
                              <div
                                class="z-10 text-black flex items-center justify-between text-left text-sm font-bold shadow-md border-b border-gray-300 flex p-2 px-4">
                                <div>Parameters</div>
                                <button
                                  class="p-2 border-2 rounded w-24"
                                  on:click={() => {
                                    activeExecuted = false;
                                    active = route;
                                    activeHeaders.accept = route.pro;
                                  }}>Try It Out</button>
                              </div>
                              <form
                                on:submit={execute}
                                class:bg-blue-100={route.method?.toUpperCase() ===
                                  "GET"}
                                class:bg-green-100={route.method?.toUpperCase() ===
                                  "POST"}
                                class:bg-purple-100={route.method?.toUpperCase() ===
                                  "PUT"}
                                class:bg-red-100={route.method?.toUpperCase() ===
                                  "DELETE"}
                                class="overflow-hidden flex flex-col items-start justify-center p-8">
                                <div class="text-left">
                                  <!--<JSONTree value={swaggerDoc.definitions.CDM} />-->
                                </div>
                                <div class="w-full">
                                  {#if !route.parameters.length}
                                    <h2
                                      class="flex h-12 items-center justify-center">
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
                                                  <span
                                                    class="font-bold text-[1.1rem]">
                                                    {param.name}
                                                  </span>
                                                  {#if param.required}
                                                    <sup
                                                      class="text-[.55rem] relative -top-2 text-red-500"
                                                      >Required</sup>
                                                  {/if}
                                                </div>
                                                <div class="font-semibold">
                                                  {resolver(
                                                    param.schema,
                                                    swaggerDoc
                                                  ).type}
                                                </div>
                                                <div class="italic">
                                                  ({param.in})
                                                </div>
                                              </div>
                                            </td>
                                            <td
                                              class="flex flex-col gap-2 text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                                              <div>
                                                {@html param.description || ""}
                                              </div>
                                              {#if resolver(param?.schema ? param.schema : param, swaggerDoc).enum}
                                                <select
                                                  required={param.required}
                                                  disabled={active?.id !==
                                                    route.id}
                                                  class="border-black border rounded p-2"
                                                  bind:value={requestParams[
                                                    `${route.id}-${param.name}`
                                                  ]}>
                                                  {#each resolver(param.schema, swaggerDoc).enum.filter( (s) => (param.required ? s.toString().length : true) ) as en, e}
                                                    <option>{en}</option>
                                                  {/each}
                                                </select>
                                              {:else if param.schema.format === "date"}
                                                <input
                                                  required={param.required}
                                                  disabled={active?.id !==
                                                    route.id}
                                                  bind:value={requestParams[
                                                    `${route.id}-${param.name}`
                                                  ]}
                                                  style={active?.id !== route.id
                                                    ? "cursor:not-allowed"
                                                    : ""}
                                                  type="datetime-local"
                                                  class="w-full border-2 border-gray-400 rounded p-1" />
                                              {:else if param.schema.type === "number"}
                                                <input
                                                  required={param.required}
                                                  disabled={active?.id !==
                                                    route.id}
                                                  bind:value={requestParams[
                                                    `${route.id}-${param.name}`
                                                  ]}
                                                  style={active?.id !== route.id
                                                    ? "cursor:not-allowed"
                                                    : ""}
                                                  type="number"
                                                  class="w-full border-2 border-gray-400 rounded p-1" />
                                              {:else if param.schema.type === "buffer"}
                                                <input
                                                  type="file"
                                                  on:change={(e) =>
                                                    bufferSign(e, route, param)}
                                                  required={param.required}
                                                  disabled={active?.id !==
                                                    route.id} />
                                              {:else}
                                                <input
                                                  required={param.required}
                                                  disabled={active?.id !==
                                                    route.id}
                                                  bind:value={requestParams[
                                                    `${route.id}-${param.name}`
                                                  ]}
                                                  on:keyup={(e) => {
                                                    if (
                                                      route.method.toUpperCase() ===
                                                      "DELETE"
                                                    ) {
                                                      setAuthHeader(
                                                        e.target["value"],
                                                        route
                                                      );
                                                    }
                                                  }}
                                                  style={active?.id !== route.id
                                                    ? "cursor:not-allowed"
                                                    : ""}
                                                  type="text"
                                                  class="w-full border-2 border-gray-400 rounded p-1" />
                                              {/if}

                                              {#if active?.id && param?.content}
                                                <select
                                                  bind:value={activeHeaders[
                                                    "Content-Type"
                                                  ]}
                                                  class="border-black border rounded p-1 w-1/2 text-xs">
                                                  {#each Object.entries(param.content) as [key, value], p}
                                                    <option value={key}
                                                      >{key}</option>
                                                  {/each}
                                                </select>
                                              {/if}
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
                                      disabled={requestOut}
                                      type="submit"
                                      class="{activeExecuted
                                        ? 'w-1/2'
                                        : 'w-full'} flex items-center justify-center bg-blue-500 text-white font-bold rounded p-1"
                                      >{requestOut
                                        ? "Executing..."
                                        : "Execute"}</button>
                                    {#if requestError}
                                      <p
                                        class="text-sm text-red-500 text-center">
                                        {requestError}
                                      </p>
                                    {/if}
                                    {#if activeExecuted}
                                      <button
                                        on:click={() => {
                                          resetActive();
                                          requestParams = {};
                                        }}
                                        class="flex items-center justify-center w-1/2 text-black font-bold rounded border border-black p-1"
                                        >Clear</button>
                                    {/if}
                                  </div>
                                {/if}
                              </form>
                              <div
                                class="z-10 text-black flex items-center justify-between text-left text-sm font-bold shadow-md border-b border-gray-300 flex p-3 px-4">
                                <div>Responses</div>
                                <div
                                  class="flex gap-2 items-center justify-center text-xs">
                                  <div>Response Content Type</div>
                                  <select
                                    bind:value={currentResponseContentType[
                                      route.id
                                    ]}
                                    class="border-black border rounded p-2">
                                    {#each responseContentTypes[route.id] as popt, p}
                                      <option value={popt.id}
                                        >{popt.name}</option>
                                    {/each}
                                  </select>
                                </div>
                              </div>
                              {#if active?.id === route.id && activeExecuted}
                                <div
                                  class:bg-blue-100={route.method?.toUpperCase() ===
                                    "GET"}
                                  class:bg-green-100={route.method?.toUpperCase() ===
                                    "POST"}
                                  class:bg-purple-100={route.method?.toUpperCase() ===
                                    "PUT"}
                                  class:bg-red-100={route.method?.toUpperCase() ===
                                    "DELETE"}
                                  class="flex flex-col gap-2 items-start text-xs font-bold p-4 w-full">
                                  <div class="flex justify-between">
                                    <div>Curl</div>
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <span
                                      on:click={(e) => copyText(curlTemplate)}
                                      class="cursor-pointer text-gray-500 ml-2"
                                      ><Icon data={copy} /></span>
                                  </div>
                                  <code
                                    class="w-full p-2 bg-gray-800 rounded text-white text-left">
                                    {curlTemplate}
                                  </code>
                                  <div class="flex justify-between">
                                    <div>Request URL</div>
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <span
                                      on:click={(e) => copyText(activeURL)}
                                      class="cursor-pointer text-gray-500 ml-2"
                                      ><Icon data={copy} /></span>
                                  </div>
                                  <code
                                    class="w-full p-2 bg-gray-800 rounded text-white text-left">
                                    {activeURL}
                                  </code>

                                  <div class="text-md mt-3">
                                    Server Response
                                  </div>
                                  <div class="flex overflow-x-auto w-full">
                                    <table class="w-full">
                                      <thead
                                        class="border-b border-black text-left">
                                        <tr>
                                          <th
                                            scope="col"
                                            class="text-sm font-medium text-gray-900 py-4 text-left w-20"
                                            >Code</th>
                                          <th
                                            scope="col"
                                            class="text-sm font-medium text-gray-900 py-4 text-left"
                                            >Details</th>
                                        </tr>
                                      </thead>
                                      <tbody class="text-left">
                                        <tr>
                                          <td class="m-0 w-6 flex pt-2"
                                            >{responses[route.id]
                                              ?.responseCode}</td>
                                          <td>
                                            <div
                                              class="flex flex-col gap-2 p-2 w-full">
                                              <div>
                                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                                Response Body
                                                <span
                                                  on:click={(e) =>
                                                    copyText(
                                                      responses[route.id]
                                                        ?.responseBody
                                                    )}
                                                  class="cursor-pointer text-gray-500 ml-2"
                                                  ><Icon data={copy} /></span>
                                              </div>
                                              <div
                                                class="overflow-x-auto relative max-h-[100px]">
                                                <code
                                                  id="{route.id}-body"
                                                  class="h-full whitespace-pre p-2 bg-gray-800 rounded text-white text-left overflow-y-scroll">
                                                  {responses[
                                                    route.id
                                                  ]?.responseBody?.slice(
                                                    0,
                                                    1000
                                                  )}{responses[route.id]
                                                    ?.responseBody?.length >
                                                  1000
                                                    ? "..."
                                                    : ""}
                                                </code>
                                              </div>
                                              <div>Response Headers</div>
                                              <div class="overflow-x-auto">
                                                {#if responses[route.id]?.responseHeaders}
                                                  <code
                                                    class="p-2 bg-gray-800 rounded text-white text-left">
                                                    {#each Object.entries(responses[route.id]?.responseHeaders) as [header, value], h}
                                                      {header}: {value}<br />
                                                    {/each}
                                                  </code>
                                                {/if}
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
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
  <div class="accordion lg:w-3/4 m-auto mt-5" id="model-box">
    <div class="accordion-item bg-white border border-gray-200">
      <h2 class="accordion-header mb-0" id="headingOne">
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
          data-bs-target="#model-body"
          aria-expanded="true"
          aria-controls="model-body">
          <div class="flex items-center gap-2 text-black">
            <div
              class="p-1 pl-6 pr-6 text-gray-500 text-xl text-white rounded font-bold">
              MODELS
            </div>
          </div>
        </button>
      </h2>
      <div
        id="model-body"
        class="accordion-collapse collapse show"
        aria-labelledby="headingOne"
        data-bs-parent="#model-box">
        <div class="accordion-body py-4 px-5">
          {#each Object.entries(swagger?.definitions || {}) as [modelName, model], m}
            <div
              class="accordion-item bg-white border border-gray-200"
              id="{modelName}-model">
              <h2 class="accordion-header mb-0" id="headingOne">
                <button
                  class="
  accordion-button
  relative
  flex
  items-center
  w-full
  py-4
  px-5
  text-base text-gray-800 text-left
  bg-white
  border-0
  rounded-none
  transition
  focus:outline-none
  collapsed
"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#{modelName}-body"
                  aria-expanded="true"
                  aria-controls="{modelName}-body">
                  {modelName}
                </button>
              </h2>
              <div
                id="{modelName}-body"
                class="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#{modelName}-model">
                <div class="accordion-body text-left py-4 px-5">
                  <JSONTree value={model} />
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  :global(a) {
    color: blue;
  }

  code {
    word-break: break-all;
    display: inline-block;
    white-space: break-spaces;
    @apply w-full overflow-y-scroll overflow-x-hidden;
  }
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
