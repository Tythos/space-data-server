export const devMode = window.location.host === "localhost:5173";
export const devProvider = devMode
    ? "0x9858effd232b4033e47d90003d41ec34ecaeda94"
    : null;

export const _host = devMode ? "localhost:8080" : window.location.host;