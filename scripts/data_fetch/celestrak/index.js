"use strict";

// scripts/data_fetch/celestrak/src/index.ts
(async function() {
  const celestrakTemplate = (format) => `https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=${format}`;
  const ommCSVFile = await fetch(celestrakTemplate("csv")).then((response) => response.text());
  console.log(ommCSVFile);
})();
