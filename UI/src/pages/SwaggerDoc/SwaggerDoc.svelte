<script lang="ts">
  import swaggerDoc from "@/swagger-output.json";
  import { compile } from "path-to-regexp";

  let swagger = null;
  let baseurl = "";
  let active = {};
  let responses = {};
  let requestParams = {};
  let requestBodyExample = {};
  let paths = {};
  const loadSwagger = async () => {
    swagger = swaggerDoc;
    baseurl = window.location.host;
    Object.entries(swagger.paths).forEach((route, routeIdx) => {
      console.log("route", Object.values(route[1]));

      let category = Object.values(route[1])[0]?.tags;
      category = category ? category[0] : "default";
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
</script>

<div class="text-left">
  <h1 class="text-xl font-bold mt-0 mb-6">{swaggerDoc.info.title}</h1>

</div>
<div class="accordion" id="accordionExample">
  <div class="accordion-item bg-white border border-gray-200">
    <h2 class="accordion-header mb-0" id="headingOne">
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
        data-bs-target="#collapseOne"
        aria-expanded="true"
        aria-controls="collapseOne">
        <div class="flex items-center gap-2 text-black">
          <div class="p-1 pl-6 pr-6 bg-blue-400 text-white rounded font-bold">
            GET
          </div>
          <div>/</div>
        </div>
      </button>
    </h2>
    <div
      id="collapseOne"
      class="accordion-collapse collapse show"
      aria-labelledby="headingOne"
      data-bs-parent="#accordionExample">
      <div class="accordion-body py-4 px-5 flex flex-col gap-2">
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full">
                  <thead class="border-b">
                    <tr>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Name
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-left">
                    <tr class="border-b">
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >Name</td>
                      <td
                        class="flex flex-col gap-2 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <div>Test Parameter</div>
                        <input
                          type="text"
                          class="w-1/3 border-2 border-gray-400 rounded" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .blue {
    @apply bg-blue-100 border-2 border-blue-300;
  }
</style>
