<script lang="ts">
  import { SwaggerUIBundle } from "swagger-ui-dist";
  import { onMount } from "svelte";
  import swaggerDoc from "@/swagger-output.json";

  onMount(() => {
    const ui = SwaggerUIBundle({
      spec: swaggerDoc,
      dom_id: "#swaggerTarget",
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset,
      ],
    });
  });
</script>

<head>
  <link
    rel="stylesheet"
    type="text/css"
    href="https://unpkg.com/swagger-ui-dist@3.12.1/swagger-ui.css" />

  <script
    src="https://unpkg.com/swagger-ui-dist@3.12.1/swagger-ui-standalone-preset.js"></script>
  <script
    src="https://unpkg.com/swagger-ui-dist@3.12.1/swagger-ui-bundle.js"></script>
</head>
<div id="swaggerTarget" />
