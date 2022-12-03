globalThis.self = globalThis;

(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) =>
    typeof require !== "undefined"
      ? require
      : typeof Proxy !== "undefined"
      ? new Proxy(x, {
          get: (a, b) => (typeof require !== "undefined" ? require : a)[b],
        })
      : x)(function (x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod2) =>
    function __require2() {
      return (
        mod2 ||
          (0, cb[__getOwnPropNames(cb)[0]])(
            (mod2 = { exports: {} }).exports,
            mod2
          ),
        mod2.exports
      );
    };
  var __export = (target, all2) => {
    for (var name8 in all2)
      __defProp(target, name8, { get: all2[name8], enumerable: true });
  };
  var __copyProps = (to, from3, except, desc) => {
    if ((from3 && typeof from3 === "object") || typeof from3 === "function") {
      for (let key of __getOwnPropNames(from3))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, {
            get: () => from3[key],
            enumerable:
              !(desc = __getOwnPropDesc(from3, key)) || desc.enumerable,
          });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (
    (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}),
    __copyProps(
      isNodeMode || !mod2 || !mod2.__esModule
        ? __defProp(target, "default", { value: mod2, enumerable: true })
        : target,
      mod2
    )
  );

  // node_modules/varint/encode.js
  var require_encode = __commonJS({
    "node_modules/varint/encode.js"(exports2, module2) {
      module2.exports = encode15;
      var MSB2 = 128;
      var REST2 = 127;
      var MSBALL2 = ~REST2;
      var INT2 = Math.pow(2, 31);
      function encode15(num, out, offset) {
        if (Number.MAX_SAFE_INTEGER && num > Number.MAX_SAFE_INTEGER) {
          encode15.bytes = 0;
          throw new RangeError("Could not encode varint");
        }
        out = out || [];
        offset = offset || 0;
        var oldOffset = offset;
        while (num >= INT2) {
          out[offset++] = (num & 255) | MSB2;
          num /= 128;
        }
        while (num & MSBALL2) {
          out[offset++] = (num & 255) | MSB2;
          num >>>= 7;
        }
        out[offset] = num | 0;
        encode15.bytes = offset - oldOffset + 1;
        return out;
      }
    },
  });

  // node_modules/varint/decode.js
  var require_decode = __commonJS({
    "node_modules/varint/decode.js"(exports2, module2) {
      module2.exports = read2;
      var MSB2 = 128;
      var REST2 = 127;
      function read2(buf2, offset) {
        var res = 0,
          offset = offset || 0,
          shift = 0,
          counter = offset,
          b,
          l = buf2.length;
        do {
          if (counter >= l || shift > 49) {
            read2.bytes = 0;
            throw new RangeError("Could not decode varint");
          }
          b = buf2[counter++];
          res +=
            shift < 28
              ? (b & REST2) << shift
              : (b & REST2) * Math.pow(2, shift);
          shift += 7;
        } while (b >= MSB2);
        read2.bytes = counter - offset;
        return res;
      }
    },
  });

  // node_modules/varint/length.js
  var require_length = __commonJS({
    "node_modules/varint/length.js"(exports2, module2) {
      var N12 = Math.pow(2, 7);
      var N22 = Math.pow(2, 14);
      var N32 = Math.pow(2, 21);
      var N42 = Math.pow(2, 28);
      var N52 = Math.pow(2, 35);
      var N62 = Math.pow(2, 42);
      var N72 = Math.pow(2, 49);
      var N82 = Math.pow(2, 56);
      var N92 = Math.pow(2, 63);
      module2.exports = function (value) {
        return value < N12
          ? 1
          : value < N22
          ? 2
          : value < N32
          ? 3
          : value < N42
          ? 4
          : value < N52
          ? 5
          : value < N62
          ? 6
          : value < N72
          ? 7
          : value < N82
          ? 8
          : value < N92
          ? 9
          : 10;
      };
    },
  });

  // node_modules/varint/index.js
  var require_varint = __commonJS({
    "node_modules/varint/index.js"(exports2, module2) {
      module2.exports = {
        encode: require_encode(),
        decode: require_decode(),
        encodingLength: require_length(),
      };
    },
  });

  // node_modules/@multiformats/multiaddr/node_modules/err-code/index.js
  var require_err_code = __commonJS({
    "node_modules/@multiformats/multiaddr/node_modules/err-code/index.js"(
      exports2,
      module2
    ) {
      "use strict";
      function assign(obj, props) {
        for (const key in props) {
          Object.defineProperty(obj, key, {
            value: props[key],
            enumerable: true,
            configurable: true,
          });
        }
        return obj;
      }
      function createError(err, code8, props) {
        if (!err || typeof err === "string") {
          throw new TypeError("Please pass an Error to err-code");
        }
        if (!props) {
          props = {};
        }
        if (typeof code8 === "object") {
          props = code8;
          code8 = "";
        }
        if (code8) {
          props.code = code8;
        }
        try {
          return assign(err, props);
        } catch (_) {
          props.message = err.message;
          props.stack = err.stack;
          const ErrClass = function () {};
          ErrClass.prototype = Object.create(Object.getPrototypeOf(err));
          const output = assign(new ErrClass(), props);
          return output;
        }
      }
      module2.exports = createError;
    },
  });

  // node_modules/is-electron/index.js
  var require_is_electron = __commonJS({
    "node_modules/is-electron/index.js"(exports2, module2) {
      function isElectron() {
        if (
          typeof window !== "undefined" &&
          typeof window.process === "object" &&
          window.process.type === "renderer"
        ) {
          return true;
        }
        if (
          typeof process !== "undefined" &&
          typeof process.versions === "object" &&
          !!process.versions.electron
        ) {
          return true;
        }
        if (
          typeof navigator === "object" &&
          typeof navigator.userAgent === "string" &&
          navigator.userAgent.indexOf("Electron") >= 0
        ) {
          return true;
        }
        return false;
      }
      module2.exports = isElectron;
    },
  });

  // node_modules/ipfs-utils/src/env.js
  var require_env = __commonJS({
    "node_modules/ipfs-utils/src/env.js"(exports2, module2) {
      "use strict";
      var isElectron = require_is_electron();
      var IS_ENV_WITH_DOM =
        typeof window === "object" &&
        typeof document === "object" &&
        document.nodeType === 9;
      var IS_ELECTRON = isElectron();
      var IS_BROWSER = IS_ENV_WITH_DOM && !IS_ELECTRON;
      var IS_ELECTRON_MAIN = IS_ELECTRON && !IS_ENV_WITH_DOM;
      var IS_ELECTRON_RENDERER = IS_ELECTRON && IS_ENV_WITH_DOM;
      var IS_NODE =
        typeof __require === "function" &&
        typeof process !== "undefined" &&
        typeof process.release !== "undefined" &&
        process.release.name === "node" &&
        !IS_ELECTRON;
      var IS_WEBWORKER =
        typeof importScripts === "function" &&
        typeof self !== "undefined" &&
        typeof WorkerGlobalScope !== "undefined" &&
        self instanceof WorkerGlobalScope;
      var IS_TEST =
        typeof process !== "undefined" &&
        typeof process.env !== "undefined" &&
        false;
      var IS_REACT_NATIVE =
        typeof navigator !== "undefined" && navigator.product === "ReactNative";
      module2.exports = {
        isTest: IS_TEST,
        isElectron: IS_ELECTRON,
        isElectronMain: IS_ELECTRON_MAIN,
        isElectronRenderer: IS_ELECTRON_RENDERER,
        isNode: IS_NODE,
        isBrowser: IS_BROWSER,
        isWebWorker: IS_WEBWORKER,
        isEnvWithDom: IS_ENV_WITH_DOM,
        isReactNative: IS_REACT_NATIVE,
      };
    },
  });

  // node_modules/@libp2p/logger/node_modules/ms/index.js
  var require_ms = __commonJS({
    "node_modules/@libp2p/logger/node_modules/ms/index.js"(exports2, module2) {
      var s = 1e3;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      module2.exports = function (val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse2(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error(
          "val is not a non-empty string or a valid number. val=" +
            JSON.stringify(val)
        );
      };
      function parse2(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match =
          /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
            str
          );
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "weeks":
          case "week":
          case "w":
            return n * w;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return Math.round(ms / d) + "d";
        }
        if (msAbs >= h) {
          return Math.round(ms / h) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms / m) + "m";
        }
        if (msAbs >= s) {
          return Math.round(ms / s) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return plural(ms, msAbs, d, "day");
        }
        if (msAbs >= h) {
          return plural(ms, msAbs, h, "hour");
        }
        if (msAbs >= m) {
          return plural(ms, msAbs, m, "minute");
        }
        if (msAbs >= s) {
          return plural(ms, msAbs, s, "second");
        }
        return ms + " ms";
      }
      function plural(ms, msAbs, n, name8) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms / n) + " " + name8 + (isPlural ? "s" : "");
      }
    },
  });

  // node_modules/@libp2p/logger/node_modules/debug/src/common.js
  var require_common = __commonJS({
    "node_modules/@libp2p/logger/node_modules/debug/src/common.js"(
      exports2,
      module2
    ) {
      function setup(env) {
        createDebug.debug = createDebug;
        createDebug.default = createDebug;
        createDebug.coerce = coerce2;
        createDebug.disable = disable;
        createDebug.enable = enable;
        createDebug.enabled = enabled;
        createDebug.humanize = require_ms();
        createDebug.destroy = destroy;
        Object.keys(env).forEach((key) => {
          createDebug[key] = env[key];
        });
        createDebug.names = [];
        createDebug.skips = [];
        createDebug.formatters = {};
        function selectColor(namespace) {
          let hash = 0;
          for (let i = 0; i < namespace.length; i++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0;
          }
          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }
        createDebug.selectColor = selectColor;
        function createDebug(namespace) {
          let prevTime;
          let enableOverride = null;
          let namespacesCache;
          let enabledCache;
          function debug2(...args) {
            if (!debug2.enabled) {
              return;
            }
            const self2 = debug2;
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self2.diff = ms;
            self2.prev = prevTime;
            self2.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") {
              args.unshift("%O");
            }
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format2) => {
              if (match === "%%") {
                return "%";
              }
              index++;
              const formatter = createDebug.formatters[format2];
              if (typeof formatter === "function") {
                const val = args[index];
                match = formatter.call(self2, val);
                args.splice(index, 1);
                index--;
              }
              return match;
            });
            createDebug.formatArgs.call(self2, args);
            const logFn = self2.log || createDebug.log;
            logFn.apply(self2, args);
          }
          debug2.namespace = namespace;
          debug2.useColors = createDebug.useColors();
          debug2.color = createDebug.selectColor(namespace);
          debug2.extend = extend;
          debug2.destroy = createDebug.destroy;
          Object.defineProperty(debug2, "enabled", {
            enumerable: true,
            configurable: false,
            get: () => {
              if (enableOverride !== null) {
                return enableOverride;
              }
              if (namespacesCache !== createDebug.namespaces) {
                namespacesCache = createDebug.namespaces;
                enabledCache = createDebug.enabled(namespace);
              }
              return enabledCache;
            },
            set: (v) => {
              enableOverride = v;
            },
          });
          if (typeof createDebug.init === "function") {
            createDebug.init(debug2);
          }
          return debug2;
        }
        function extend(namespace, delimiter) {
          const newDebug = createDebug(
            this.namespace +
              (typeof delimiter === "undefined" ? ":" : delimiter) +
              namespace
          );
          newDebug.log = this.log;
          return newDebug;
        }
        function enable(namespaces) {
          createDebug.save(namespaces);
          createDebug.namespaces = namespaces;
          createDebug.names = [];
          createDebug.skips = [];
          let i;
          const split = (
            typeof namespaces === "string" ? namespaces : ""
          ).split(/[\s,]+/);
          const len = split.length;
          for (i = 0; i < len; i++) {
            if (!split[i]) {
              continue;
            }
            namespaces = split[i].replace(/\*/g, ".*?");
            if (namespaces[0] === "-") {
              createDebug.skips.push(
                new RegExp("^" + namespaces.slice(1) + "$")
              );
            } else {
              createDebug.names.push(new RegExp("^" + namespaces + "$"));
            }
          }
        }
        function disable() {
          const namespaces = [
            ...createDebug.names.map(toNamespace),
            ...createDebug.skips
              .map(toNamespace)
              .map((namespace) => "-" + namespace),
          ].join(",");
          createDebug.enable("");
          return namespaces;
        }
        function enabled(name8) {
          if (name8[name8.length - 1] === "*") {
            return true;
          }
          let i;
          let len;
          for (i = 0, len = createDebug.skips.length; i < len; i++) {
            if (createDebug.skips[i].test(name8)) {
              return false;
            }
          }
          for (i = 0, len = createDebug.names.length; i < len; i++) {
            if (createDebug.names[i].test(name8)) {
              return true;
            }
          }
          return false;
        }
        function toNamespace(regexp) {
          return regexp
            .toString()
            .substring(2, regexp.toString().length - 2)
            .replace(/\.\*\?$/, "*");
        }
        function coerce2(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }
          return val;
        }
        function destroy() {
          console.warn(
            "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
          );
        }
        createDebug.enable(createDebug.load());
        return createDebug;
      }
      module2.exports = setup;
    },
  });

  // node_modules/@libp2p/logger/node_modules/debug/src/browser.js
  var require_browser = __commonJS({
    "node_modules/@libp2p/logger/node_modules/debug/src/browser.js"(
      exports2,
      module2
    ) {
      exports2.formatArgs = formatArgs;
      exports2.save = save;
      exports2.load = load;
      exports2.useColors = useColors;
      exports2.storage = localstorage();
      exports2.destroy = (() => {
        let warned = false;
        return () => {
          if (!warned) {
            warned = true;
            console.warn(
              "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
            );
          }
        };
      })();
      exports2.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33",
      ];
      function useColors() {
        if (
          typeof window !== "undefined" &&
          window.process &&
          (window.process.type === "renderer" || window.process.__nwjs)
        ) {
          return true;
        }
        if (
          typeof navigator !== "undefined" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
        ) {
          return false;
        }
        return (
          (typeof document !== "undefined" &&
            document.documentElement &&
            document.documentElement.style &&
            document.documentElement.style.WebkitAppearance) ||
          (typeof window !== "undefined" &&
            window.console &&
            (window.console.firebug ||
              (window.console.exception && window.console.table))) ||
          (typeof navigator !== "undefined" &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
            parseInt(RegExp.$1, 10) >= 31) ||
          (typeof navigator !== "undefined" &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        );
      }
      function formatArgs(args) {
        args[0] =
          (this.useColors ? "%c" : "") +
          this.namespace +
          (this.useColors ? " %c" : " ") +
          args[0] +
          (this.useColors ? "%c " : " ") +
          "+" +
          module2.exports.humanize(this.diff);
        if (!this.useColors) {
          return;
        }
        const c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        let index = 0;
        let lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, (match) => {
          if (match === "%%") {
            return;
          }
          index++;
          if (match === "%c") {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      exports2.log = console.debug || console.log || (() => {});
      function save(namespaces) {
        try {
          if (namespaces) {
            exports2.storage.setItem("debug", namespaces);
          } else {
            exports2.storage.removeItem("debug");
          }
        } catch (error) {}
      }
      function load() {
        let r;
        try {
          r = exports2.storage.getItem("debug");
        } catch (error) {}
        if (!r && typeof process !== "undefined" && "env" in process) {
          r = process.env.DEBUG;
        }
        return r;
      }
      function localstorage() {
        try {
          return localStorage;
        } catch (error) {}
      }
      module2.exports = require_common()(exports2);
      var { formatters } = module2.exports;
      formatters.j = function (v) {
        try {
          return JSON.stringify(v);
        } catch (error) {
          return "[UnexpectedJSONParseError]: " + error.message;
        }
      };
    },
  });

  // node_modules/ipfs-utils/src/http/error.js
  var require_error = __commonJS({
    "node_modules/ipfs-utils/src/http/error.js"(exports2) {
      "use strict";
      var TimeoutError = class extends Error {
        constructor(message = "Request timed out") {
          super(message);
          this.name = "TimeoutError";
        }
      };
      exports2.TimeoutError = TimeoutError;
      var AbortError = class extends Error {
        constructor(message = "The operation was aborted.") {
          super(message);
          this.name = "AbortError";
        }
      };
      exports2.AbortError = AbortError;
      var HTTPError2 = class extends Error {
        constructor(response) {
          super(response.statusText);
          this.name = "HTTPError";
          this.response = response;
        }
      };
      exports2.HTTPError = HTTPError2;
    },
  });

  // node_modules/ipfs-utils/node_modules/node-fetch/browser.js
  var require_browser2 = __commonJS({
    "node_modules/ipfs-utils/node_modules/node-fetch/browser.js"(
      exports2,
      module2
    ) {
      "use strict";
      var getGlobal = function () {
        if (typeof self !== "undefined") {
          return self;
        }
        if (typeof window !== "undefined") {
          return window;
        }
        if (typeof global2 !== "undefined") {
          return global2;
        }
        throw new Error("unable to locate global object");
      };
      var global2 = getGlobal();
      module2.exports = exports2 = global2.fetch;
      if (global2.fetch) {
        exports2.default = global2.fetch.bind(global2);
      }
      exports2.Headers = global2.Headers;
      exports2.Request = global2.Request;
      exports2.Response = global2.Response;
    },
  });

  // node_modules/ipfs-utils/node_modules/native-fetch/src/index.js
  var require_src = __commonJS({
    "node_modules/ipfs-utils/node_modules/native-fetch/src/index.js"(
      exports2,
      module2
    ) {
      "use strict";
      if (
        globalThis.fetch &&
        globalThis.Headers &&
        globalThis.Request &&
        globalThis.Response
      ) {
        module2.exports = {
          default: globalThis.fetch,
          Headers: globalThis.Headers,
          Request: globalThis.Request,
          Response: globalThis.Response,
        };
      } else {
        module2.exports = {
          default: require_browser2().default,
          Headers: require_browser2().Headers,
          Request: require_browser2().Request,
          Response: require_browser2().Response,
        };
      }
    },
  });

  // node_modules/ipfs-utils/src/fetch.browser.js
  var require_fetch_browser = __commonJS({
    "node_modules/ipfs-utils/src/fetch.browser.js"(exports2, module2) {
      "use strict";
      module2.exports = require_src();
    },
  });

  // node_modules/ipfs-utils/src/http/fetch.browser.js
  var require_fetch_browser2 = __commonJS({
    "node_modules/ipfs-utils/src/http/fetch.browser.js"(exports2, module2) {
      "use strict";
      var { TimeoutError, AbortError } = require_error();
      var {
        Response: Response2,
        Request,
        Headers,
        default: fetch,
      } = require_fetch_browser();
      var fetchWithProgress = (url, options = {}) => {
        const request = new XMLHttpRequest();
        request.open(options.method || "GET", url.toString(), true);
        const { timeout, headers } = options;
        if (timeout && timeout > 0 && timeout < Infinity) {
          request.timeout = timeout;
        }
        if (options.overrideMimeType != null) {
          request.overrideMimeType(options.overrideMimeType);
        }
        if (headers) {
          for (const [name8, value] of new Headers(headers)) {
            request.setRequestHeader(name8, value);
          }
        }
        if (options.signal) {
          options.signal.onabort = () => request.abort();
        }
        if (options.onUploadProgress) {
          request.upload.onprogress = options.onUploadProgress;
        }
        request.responseType = "arraybuffer";
        return new Promise((resolve2, reject) => {
          const handleEvent = (event) => {
            switch (event.type) {
              case "error": {
                resolve2(Response2.error());
                break;
              }
              case "load": {
                resolve2(
                  new ResponseWithURL(request.responseURL, request.response, {
                    status: request.status,
                    statusText: request.statusText,
                    headers: parseHeaders(request.getAllResponseHeaders()),
                  })
                );
                break;
              }
              case "timeout": {
                reject(new TimeoutError());
                break;
              }
              case "abort": {
                reject(new AbortError());
                break;
              }
              default: {
                break;
              }
            }
          };
          request.onerror = handleEvent;
          request.onload = handleEvent;
          request.ontimeout = handleEvent;
          request.onabort = handleEvent;
          request.send(options.body);
        });
      };
      var fetchWithStreaming = fetch;
      var fetchWith = (url, options = {}) =>
        options.onUploadProgress != null
          ? fetchWithProgress(url, options)
          : fetchWithStreaming(url, options);
      var parseHeaders = (input) => {
        const headers = new Headers();
        for (const line of input.trim().split(/[\r\n]+/)) {
          const index = line.indexOf(": ");
          if (index > 0) {
            headers.set(line.slice(0, index), line.slice(index + 1));
          }
        }
        return headers;
      };
      var ResponseWithURL = class extends Response2 {
        constructor(url, body, options) {
          super(body, options);
          Object.defineProperty(this, "url", { value: url });
        }
      };
      module2.exports = {
        fetch: fetchWith,
        Request,
        Headers,
      };
    },
  });

  // node_modules/is-plain-obj/index.js
  var require_is_plain_obj = __commonJS({
    "node_modules/is-plain-obj/index.js"(exports2, module2) {
      "use strict";
      module2.exports = (value) => {
        if (Object.prototype.toString.call(value) !== "[object Object]") {
          return false;
        }
        const prototype = Object.getPrototypeOf(value);
        return prototype === null || prototype === Object.prototype;
      };
    },
  });

  // node_modules/merge-options/index.js
  var require_merge_options = __commonJS({
    "node_modules/merge-options/index.js"(exports2, module2) {
      "use strict";
      var isOptionObject = require_is_plain_obj();
      var { hasOwnProperty } = Object.prototype;
      var { propertyIsEnumerable } = Object;
      var defineProperty = (object, name8, value) =>
        Object.defineProperty(object, name8, {
          value,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      var globalThis2 = exports2;
      var defaultMergeOptions = {
        concatArrays: false,
        ignoreUndefined: false,
      };
      var getEnumerableOwnPropertyKeys = (value) => {
        const keys = [];
        for (const key in value) {
          if (hasOwnProperty.call(value, key)) {
            keys.push(key);
          }
        }
        if (Object.getOwnPropertySymbols) {
          const symbols = Object.getOwnPropertySymbols(value);
          for (const symbol3 of symbols) {
            if (propertyIsEnumerable.call(value, symbol3)) {
              keys.push(symbol3);
            }
          }
        }
        return keys;
      };
      function clone(value) {
        if (Array.isArray(value)) {
          return cloneArray(value);
        }
        if (isOptionObject(value)) {
          return cloneOptionObject(value);
        }
        return value;
      }
      function cloneArray(array) {
        const result = array.slice(0, 0);
        getEnumerableOwnPropertyKeys(array).forEach((key) => {
          defineProperty(result, key, clone(array[key]));
        });
        return result;
      }
      function cloneOptionObject(object) {
        const result =
          Object.getPrototypeOf(object) === null
            ? /* @__PURE__ */ Object.create(null)
            : {};
        getEnumerableOwnPropertyKeys(object).forEach((key) => {
          defineProperty(result, key, clone(object[key]));
        });
        return result;
      }
      var mergeKeys = (merged, source, keys, config) => {
        keys.forEach((key) => {
          if (typeof source[key] === "undefined" && config.ignoreUndefined) {
            return;
          }
          if (key in merged && merged[key] !== Object.getPrototypeOf(merged)) {
            defineProperty(
              merged,
              key,
              merge2(merged[key], source[key], config)
            );
          } else {
            defineProperty(merged, key, clone(source[key]));
          }
        });
        return merged;
      };
      var concatArrays = (merged, source, config) => {
        let result = merged.slice(0, 0);
        let resultIndex = 0;
        [merged, source].forEach((array) => {
          const indices = [];
          for (let k = 0; k < array.length; k++) {
            if (!hasOwnProperty.call(array, k)) {
              continue;
            }
            indices.push(String(k));
            if (array === merged) {
              defineProperty(result, resultIndex++, array[k]);
            } else {
              defineProperty(result, resultIndex++, clone(array[k]));
            }
          }
          result = mergeKeys(
            result,
            array,
            getEnumerableOwnPropertyKeys(array).filter(
              (key) => !indices.includes(key)
            ),
            config
          );
        });
        return result;
      };
      function merge2(merged, source, config) {
        if (
          config.concatArrays &&
          Array.isArray(merged) &&
          Array.isArray(source)
        ) {
          return concatArrays(merged, source, config);
        }
        if (!isOptionObject(source) || !isOptionObject(merged)) {
          return clone(source);
        }
        return mergeKeys(
          merged,
          source,
          getEnumerableOwnPropertyKeys(source),
          config
        );
      }
      module2.exports = function (...options) {
        const config = merge2(
          clone(defaultMergeOptions),
          (this !== globalThis2 && this) || {},
          defaultMergeOptions
        );
        let merged = { _: {} };
        for (const option of options) {
          if (option === void 0) {
            continue;
          }
          if (!isOptionObject(option)) {
            throw new TypeError("`" + option + "` is not an Option Object");
          }
          merged = merge2(merged, { _: option }, config);
        }
        return merged._;
      };
    },
  });

  // node_modules/iso-url/src/url-browser.js
  var require_url_browser = __commonJS({
    "node_modules/iso-url/src/url-browser.js"(exports2, module2) {
      "use strict";
      var isReactNative =
        typeof navigator !== "undefined" && navigator.product === "ReactNative";
      function getDefaultBase() {
        if (isReactNative) {
          return "http://localhost";
        }
        if (!self.location) {
          return "";
        }
        return self.location.protocol + "//" + self.location.host;
      }
      var URL2 = self.URL;
      var defaultBase = getDefaultBase();
      var URLWithLegacySupport = class {
        constructor(url = "", base3 = defaultBase) {
          this.super = new URL2(url, base3);
          this.path = this.pathname + this.search;
          this.auth =
            this.username && this.password
              ? this.username + ":" + this.password
              : null;
          this.query =
            this.search && this.search.startsWith("?")
              ? this.search.slice(1)
              : null;
        }
        get hash() {
          return this.super.hash;
        }
        get host() {
          return this.super.host;
        }
        get hostname() {
          return this.super.hostname;
        }
        get href() {
          return this.super.href;
        }
        get origin() {
          return this.super.origin;
        }
        get password() {
          return this.super.password;
        }
        get pathname() {
          return this.super.pathname;
        }
        get port() {
          return this.super.port;
        }
        get protocol() {
          return this.super.protocol;
        }
        get search() {
          return this.super.search;
        }
        get searchParams() {
          return this.super.searchParams;
        }
        get username() {
          return this.super.username;
        }
        set hash(hash) {
          this.super.hash = hash;
        }
        set host(host) {
          this.super.host = host;
        }
        set hostname(hostname) {
          this.super.hostname = hostname;
        }
        set href(href) {
          this.super.href = href;
        }
        set password(password) {
          this.super.password = password;
        }
        set pathname(pathname) {
          this.super.pathname = pathname;
        }
        set port(port) {
          this.super.port = port;
        }
        set protocol(protocol) {
          this.super.protocol = protocol;
        }
        set search(search) {
          this.super.search = search;
        }
        set username(username) {
          this.super.username = username;
        }
        static createObjectURL(o) {
          return URL2.createObjectURL(o);
        }
        static revokeObjectURL(o) {
          URL2.revokeObjectURL(o);
        }
        toJSON() {
          return this.super.toJSON();
        }
        toString() {
          return this.super.toString();
        }
        format() {
          return this.toString();
        }
      };
      function format2(obj) {
        if (typeof obj === "string") {
          const url = new URL2(obj);
          return url.toString();
        }
        if (!(obj instanceof URL2)) {
          const userPass =
            obj.username && obj.password
              ? `${obj.username}:${obj.password}@`
              : "";
          const auth = obj.auth ? obj.auth + "@" : "";
          const port = obj.port ? ":" + obj.port : "";
          const protocol = obj.protocol ? obj.protocol + "//" : "";
          const host = obj.host || "";
          const hostname = obj.hostname || "";
          const search = obj.search || (obj.query ? "?" + obj.query : "");
          const hash = obj.hash || "";
          const pathname = obj.pathname || "";
          const path = obj.path || pathname + search;
          return `${protocol}${userPass || auth}${
            host || hostname + port
          }${path}${hash}`;
        }
      }
      module2.exports = {
        URLWithLegacySupport,
        URLSearchParams: self.URLSearchParams,
        defaultBase,
        format: format2,
      };
    },
  });

  // node_modules/iso-url/src/relative.js
  var require_relative = __commonJS({
    "node_modules/iso-url/src/relative.js"(exports2, module2) {
      "use strict";
      var { URLWithLegacySupport, format: format2 } = require_url_browser();
      module2.exports = (
        url,
        location2 = {},
        protocolMap = {},
        defaultProtocol
      ) => {
        let protocol = location2.protocol
          ? location2.protocol.replace(":", "")
          : "http";
        protocol = (protocolMap[protocol] || defaultProtocol || protocol) + ":";
        let urlParsed;
        try {
          urlParsed = new URLWithLegacySupport(url);
        } catch (err) {
          urlParsed = {};
        }
        const base3 = Object.assign({}, location2, {
          protocol: protocol || urlParsed.protocol,
          host: location2.host || urlParsed.host,
        });
        return new URLWithLegacySupport(url, format2(base3)).toString();
      };
    },
  });

  // node_modules/iso-url/index.js
  var require_iso_url = __commonJS({
    "node_modules/iso-url/index.js"(exports2, module2) {
      "use strict";
      var {
        URLWithLegacySupport,
        format: format2,
        URLSearchParams: URLSearchParams2,
        defaultBase,
      } = require_url_browser();
      var relative = require_relative();
      module2.exports = {
        URL: URLWithLegacySupport,
        URLSearchParams: URLSearchParams2,
        format: format2,
        relative,
        defaultBase,
      };
    },
  });

  // node_modules/any-signal/index.js
  var require_any_signal = __commonJS({
    "node_modules/any-signal/index.js"(exports2, module2) {
      function anySignal2(signals) {
        const controller = new globalThis.AbortController();
        function onAbort() {
          controller.abort();
          for (const signal of signals) {
            if (!signal || !signal.removeEventListener) continue;
            signal.removeEventListener("abort", onAbort);
          }
        }
        for (const signal of signals) {
          if (!signal || !signal.addEventListener) continue;
          if (signal.aborted) {
            onAbort();
            break;
          }
          signal.addEventListener("abort", onAbort);
        }
        return controller.signal;
      }
      module2.exports = anySignal2;
      module2.exports.anySignal = anySignal2;
    },
  });

  // node_modules/ipfs-utils/src/http.js
  var require_http = __commonJS({
    "node_modules/ipfs-utils/src/http.js"(exports2, module2) {
      "use strict";
      var { fetch, Request, Headers } = require_fetch_browser2();
      var { TimeoutError, HTTPError: HTTPError2 } = require_error();
      var merge2 = require_merge_options().bind({ ignoreUndefined: true });
      var { URL: URL2, URLSearchParams: URLSearchParams2 } = require_iso_url();
      var anySignal2 = require_any_signal();
      var timeout = (promise, ms, abortController) => {
        if (ms === void 0) {
          return promise;
        }
        const start = Date.now();
        const timedOut = () => {
          const time = Date.now() - start;
          return time >= ms;
        };
        return new Promise((resolve2, reject) => {
          const timeoutID = setTimeout(() => {
            if (timedOut()) {
              reject(new TimeoutError());
              abortController.abort();
            }
          }, ms);
          const after = (next) => {
            const fn = (res) => {
              clearTimeout(timeoutID);
              if (timedOut()) {
                reject(new TimeoutError());
                return;
              }
              next(res);
            };
            return fn;
          };
          promise.then(after(resolve2), after(reject));
        });
      };
      var defaults = {
        throwHttpErrors: true,
        credentials: "same-origin",
      };
      var HTTP3 = class {
        constructor(options = {}) {
          this.opts = merge2(defaults, options);
        }
        async fetch(resource, options = {}) {
          const opts = merge2(this.opts, options);
          const headers = new Headers(opts.headers);
          if (
            typeof resource !== "string" &&
            !(resource instanceof URL2 || resource instanceof Request)
          ) {
            throw new TypeError("`resource` must be a string, URL, or Request");
          }
          const url = new URL2(resource.toString(), opts.base);
          const { searchParams, transformSearchParams, json } = opts;
          if (searchParams) {
            if (typeof transformSearchParams === "function") {
              url.search = transformSearchParams(
                new URLSearchParams2(opts.searchParams)
              );
            } else {
              url.search = new URLSearchParams2(opts.searchParams);
            }
          }
          if (json) {
            opts.body = JSON.stringify(opts.json);
            headers.set("content-type", "application/json");
          }
          const abortController = new AbortController();
          const signal = anySignal2([abortController.signal, opts.signal]);
          const response = await timeout(
            fetch(url.toString(), {
              ...opts,
              signal,
              timeout: void 0,
              headers,
            }),
            opts.timeout,
            abortController
          );
          if (!response.ok && opts.throwHttpErrors) {
            if (opts.handleError) {
              await opts.handleError(response);
            }
            throw new HTTPError2(response);
          }
          response.iterator = async function* () {
            yield* fromStream(response.body);
          };
          response.ndjson = async function* () {
            for await (const chunk of ndjson(response.iterator())) {
              if (options.transform) {
                yield options.transform(chunk);
              } else {
                yield chunk;
              }
            }
          };
          return response;
        }
        post(resource, options = {}) {
          return this.fetch(resource, { ...options, method: "POST" });
        }
        get(resource, options = {}) {
          return this.fetch(resource, { ...options, method: "GET" });
        }
        put(resource, options = {}) {
          return this.fetch(resource, { ...options, method: "PUT" });
        }
        delete(resource, options = {}) {
          return this.fetch(resource, { ...options, method: "DELETE" });
        }
        options(resource, options = {}) {
          return this.fetch(resource, { ...options, method: "OPTIONS" });
        }
      };
      var ndjson = async function* (source) {
        const decoder = new TextDecoder();
        let buf2 = "";
        for await (const chunk of source) {
          buf2 += decoder.decode(chunk, { stream: true });
          const lines = buf2.split(/\r?\n/);
          for (let i = 0; i < lines.length - 1; i++) {
            const l = lines[i].trim();
            if (l.length > 0) {
              yield JSON.parse(l);
            }
          }
          buf2 = lines[lines.length - 1];
        }
        buf2 += decoder.decode();
        buf2 = buf2.trim();
        if (buf2.length !== 0) {
          yield JSON.parse(buf2);
        }
      };
      var fromStream = (source) => {
        if (isNodeReadableStream(source)) {
          const iter = source[Symbol.asyncIterator]();
          return {
            [Symbol.asyncIterator]() {
              return {
                next: iter.next.bind(iter),
                return(value) {
                  source.destroy();
                  if (typeof iter.return === "function") {
                    return iter.return();
                  }
                  return Promise.resolve({ done: true, value });
                },
              };
            },
          };
        }
        if (isWebReadableStream(source)) {
          const reader = source.getReader();
          return (async function* () {
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) return;
                if (value) {
                  yield value;
                }
              }
            } finally {
              reader.releaseLock();
            }
          })();
        }
        if (isAsyncIterable(source)) {
          return source;
        }
        throw new TypeError("Body can't be converted to AsyncIterable");
      };
      var isAsyncIterable = (value) => {
        return (
          typeof value === "object" &&
          value !== null &&
          typeof value[Symbol.asyncIterator] === "function"
        );
      };
      var isWebReadableStream = (value) => {
        return value && typeof value.getReader === "function";
      };
      var isNodeReadableStream = (value) =>
        Object.prototype.hasOwnProperty.call(value, "readable") &&
        Object.prototype.hasOwnProperty.call(value, "writable");
      HTTP3.HTTPError = HTTPError2;
      HTTP3.TimeoutError = TimeoutError;
      HTTP3.streamToAsyncIterator = fromStream;
      HTTP3.post = (resource, options) =>
        new HTTP3(options).post(resource, options);
      HTTP3.get = (resource, options) =>
        new HTTP3(options).get(resource, options);
      HTTP3.put = (resource, options) =>
        new HTTP3(options).put(resource, options);
      HTTP3.delete = (resource, options) =>
        new HTTP3(options).delete(resource, options);
      HTTP3.options = (resource, options) =>
        new HTTP3(options).options(resource, options);
      module2.exports = HTTP3;
    },
  });

  // node_modules/ipfs-http-client/node_modules/err-code/index.js
  var require_err_code2 = __commonJS({
    "node_modules/ipfs-http-client/node_modules/err-code/index.js"(
      exports2,
      module2
    ) {
      "use strict";
      function assign(obj, props) {
        for (const key in props) {
          Object.defineProperty(obj, key, {
            value: props[key],
            enumerable: true,
            configurable: true,
          });
        }
        return obj;
      }
      function createError(err, code8, props) {
        if (!err || typeof err === "string") {
          throw new TypeError("Please pass an Error to err-code");
        }
        if (!props) {
          props = {};
        }
        if (typeof code8 === "object") {
          props = code8;
          code8 = "";
        }
        if (code8) {
          props.code = code8;
        }
        try {
          return assign(err, props);
        } catch (_) {
          props.message = err.message;
          props.stack = err.stack;
          const ErrClass = function () {};
          ErrClass.prototype = Object.create(Object.getPrototypeOf(err));
          const output = assign(new ErrClass(), props);
          return output;
        }
      }
      module2.exports = createError;
    },
  });

  // node_modules/@libp2p/peer-id/node_modules/err-code/index.js
  var require_err_code3 = __commonJS({
    "node_modules/@libp2p/peer-id/node_modules/err-code/index.js"(
      exports2,
      module2
    ) {
      "use strict";
      function assign(obj, props) {
        for (const key in props) {
          Object.defineProperty(obj, key, {
            value: props[key],
            enumerable: true,
            configurable: true,
          });
        }
        return obj;
      }
      function createError(err, code8, props) {
        if (!err || typeof err === "string") {
          throw new TypeError("Please pass an Error to err-code");
        }
        if (!props) {
          props = {};
        }
        if (typeof code8 === "object") {
          props = code8;
          code8 = "";
        }
        if (code8) {
          props.code = code8;
        }
        try {
          return assign(err, props);
        } catch (_) {
          props.message = err.message;
          props.stack = err.stack;
          const ErrClass = function () {};
          ErrClass.prototype = Object.create(Object.getPrototypeOf(err));
          const output = assign(new ErrClass(), props);
          return output;
        }
      }
      module2.exports = createError;
    },
  });

  // node_modules/ipfs-core-utils/node_modules/err-code/index.js
  var require_err_code4 = __commonJS({
    "node_modules/ipfs-core-utils/node_modules/err-code/index.js"(
      exports2,
      module2
    ) {
      "use strict";
      function assign(obj, props) {
        for (const key in props) {
          Object.defineProperty(obj, key, {
            value: props[key],
            enumerable: true,
            configurable: true,
          });
        }
        return obj;
      }
      function createError(err, code8, props) {
        if (!err || typeof err === "string") {
          throw new TypeError("Please pass an Error to err-code");
        }
        if (!props) {
          props = {};
        }
        if (typeof code8 === "object") {
          props = code8;
          code8 = "";
        }
        if (code8) {
          props.code = code8;
        }
        try {
          return assign(err, props);
        } catch (_) {
          props.message = err.message;
          props.stack = err.stack;
          const ErrClass = function () {};
          ErrClass.prototype = Object.create(Object.getPrototypeOf(err));
          const output = assign(new ErrClass(), props);
          return output;
        }
      }
      module2.exports = createError;
    },
  });

  // node_modules/ipfs-unixfs/node_modules/err-code/index.js
  var require_err_code5 = __commonJS({
    "node_modules/ipfs-unixfs/node_modules/err-code/index.js"(
      exports2,
      module2
    ) {
      "use strict";
      function assign(obj, props) {
        for (const key in props) {
          Object.defineProperty(obj, key, {
            value: props[key],
            enumerable: true,
            configurable: true,
          });
        }
        return obj;
      }
      function createError(err, code8, props) {
        if (!err || typeof err === "string") {
          throw new TypeError("Please pass an Error to err-code");
        }
        if (!props) {
          props = {};
        }
        if (typeof code8 === "object") {
          props = code8;
          code8 = "";
        }
        if (code8) {
          props.code = code8;
        }
        try {
          return assign(err, props);
        } catch (_) {
          props.message = err.message;
          props.stack = err.stack;
          const ErrClass = function () {};
          ErrClass.prototype = Object.create(Object.getPrototypeOf(err));
          const output = assign(new ErrClass(), props);
          return output;
        }
      }
      module2.exports = createError;
    },
  });

  // node_modules/@protobufjs/aspromise/index.js
  var require_aspromise = __commonJS({
    "node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
      "use strict";
      module2.exports = asPromise;
      function asPromise(fn, ctx) {
        var params = new Array(arguments.length - 1),
          offset = 0,
          index = 2,
          pending = true;
        while (index < arguments.length) params[offset++] = arguments[index++];
        return new Promise(function executor(resolve2, reject) {
          params[offset] = function callback(err) {
            if (pending) {
              pending = false;
              if (err) reject(err);
              else {
                var params2 = new Array(arguments.length - 1),
                  offset2 = 0;
                while (offset2 < params2.length)
                  params2[offset2++] = arguments[offset2];
                resolve2.apply(null, params2);
              }
            }
          };
          try {
            fn.apply(ctx || null, params);
          } catch (err) {
            if (pending) {
              pending = false;
              reject(err);
            }
          }
        });
      }
    },
  });

  // node_modules/@protobufjs/base64/index.js
  var require_base64 = __commonJS({
    "node_modules/@protobufjs/base64/index.js"(exports2) {
      "use strict";
      var base642 = exports2;
      base642.length = function length2(string2) {
        var p = string2.length;
        if (!p) return 0;
        var n = 0;
        while (--p % 4 > 1 && string2.charAt(p) === "=") ++n;
        return Math.ceil(string2.length * 3) / 4 - n;
      };
      var b64 = new Array(64);
      var s64 = new Array(123);
      for (i = 0; i < 64; )
        s64[
          (b64[i] =
            i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : (i - 59) | 43)
        ] = i++;
      var i;
      base642.encode = function encode15(buffer2, start, end) {
        var parts = null,
          chunk = [];
        var i2 = 0,
          j = 0,
          t;
        while (start < end) {
          var b = buffer2[start++];
          switch (j) {
            case 0:
              chunk[i2++] = b64[b >> 2];
              t = (b & 3) << 4;
              j = 1;
              break;
            case 1:
              chunk[i2++] = b64[t | (b >> 4)];
              t = (b & 15) << 2;
              j = 2;
              break;
            case 2:
              chunk[i2++] = b64[t | (b >> 6)];
              chunk[i2++] = b64[b & 63];
              j = 0;
              break;
          }
          if (i2 > 8191) {
            (parts || (parts = [])).push(
              String.fromCharCode.apply(String, chunk)
            );
            i2 = 0;
          }
        }
        if (j) {
          chunk[i2++] = b64[t];
          chunk[i2++] = 61;
          if (j === 1) chunk[i2++] = 61;
        }
        if (parts) {
          if (i2)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i2));
      };
      var invalidEncoding = "invalid encoding";
      base642.decode = function decode16(string2, buffer2, offset) {
        var start = offset;
        var j = 0,
          t;
        for (var i2 = 0; i2 < string2.length; ) {
          var c = string2.charCodeAt(i2++);
          if (c === 61 && j > 1) break;
          if ((c = s64[c]) === void 0) throw Error(invalidEncoding);
          switch (j) {
            case 0:
              t = c;
              j = 1;
              break;
            case 1:
              buffer2[offset++] = (t << 2) | ((c & 48) >> 4);
              t = c;
              j = 2;
              break;
            case 2:
              buffer2[offset++] = ((t & 15) << 4) | ((c & 60) >> 2);
              t = c;
              j = 3;
              break;
            case 3:
              buffer2[offset++] = ((t & 3) << 6) | c;
              j = 0;
              break;
          }
        }
        if (j === 1) throw Error(invalidEncoding);
        return offset - start;
      };
      base642.test = function test(string2) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
          string2
        );
      };
    },
  });

  // node_modules/@protobufjs/eventemitter/index.js
  var require_eventemitter = __commonJS({
    "node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
      "use strict";
      module2.exports = EventEmitter;
      function EventEmitter() {
        this._listeners = {};
      }
      EventEmitter.prototype.on = function on(evt, fn, ctx) {
        (this._listeners[evt] || (this._listeners[evt] = [])).push({
          fn,
          ctx: ctx || this,
        });
        return this;
      };
      EventEmitter.prototype.off = function off(evt, fn) {
        if (evt === void 0) this._listeners = {};
        else {
          if (fn === void 0) this._listeners[evt] = [];
          else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length; )
              if (listeners[i].fn === fn) listeners.splice(i, 1);
              else ++i;
          }
        }
        return this;
      };
      EventEmitter.prototype.emit = function emit(evt) {
        var listeners = this._listeners[evt];
        if (listeners) {
          var args = [],
            i = 1;
          for (; i < arguments.length; ) args.push(arguments[i++]);
          for (i = 0; i < listeners.length; )
            listeners[i].fn.apply(listeners[i++].ctx, args);
        }
        return this;
      };
    },
  });

  // node_modules/@protobufjs/float/index.js
  var require_float = __commonJS({
    "node_modules/@protobufjs/float/index.js"(exports2, module2) {
      "use strict";
      module2.exports = factory(factory);
      function factory(exports3) {
        if (typeof Float32Array !== "undefined")
          (function () {
            var f32 = new Float32Array([-0]),
              f8b = new Uint8Array(f32.buffer),
              le = f8b[3] === 128;
            function writeFloat_f32_cpy(val, buf2, pos) {
              f32[0] = val;
              buf2[pos] = f8b[0];
              buf2[pos + 1] = f8b[1];
              buf2[pos + 2] = f8b[2];
              buf2[pos + 3] = f8b[3];
            }
            function writeFloat_f32_rev(val, buf2, pos) {
              f32[0] = val;
              buf2[pos] = f8b[3];
              buf2[pos + 1] = f8b[2];
              buf2[pos + 2] = f8b[1];
              buf2[pos + 3] = f8b[0];
            }
            exports3.writeFloatLE = le
              ? writeFloat_f32_cpy
              : writeFloat_f32_rev;
            exports3.writeFloatBE = le
              ? writeFloat_f32_rev
              : writeFloat_f32_cpy;
            function readFloat_f32_cpy(buf2, pos) {
              f8b[0] = buf2[pos];
              f8b[1] = buf2[pos + 1];
              f8b[2] = buf2[pos + 2];
              f8b[3] = buf2[pos + 3];
              return f32[0];
            }
            function readFloat_f32_rev(buf2, pos) {
              f8b[3] = buf2[pos];
              f8b[2] = buf2[pos + 1];
              f8b[1] = buf2[pos + 2];
              f8b[0] = buf2[pos + 3];
              return f32[0];
            }
            exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
            exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
          })();
        else
          (function () {
            function writeFloat_ieee754(writeUint, val, buf2, pos) {
              var sign = val < 0 ? 1 : 0;
              if (sign) val = -val;
              if (val === 0) writeUint(1 / val > 0 ? 0 : 2147483648, buf2, pos);
              else if (isNaN(val)) writeUint(2143289344, buf2, pos);
              else if (val > 34028234663852886e22)
                writeUint(((sign << 31) | 2139095040) >>> 0, buf2, pos);
              else if (val < 11754943508222875e-54)
                writeUint(
                  ((sign << 31) | Math.round(val / 1401298464324817e-60)) >>> 0,
                  buf2,
                  pos
                );
              else {
                var exponent = Math.floor(Math.log(val) / Math.LN2),
                  mantissa =
                    Math.round(val * Math.pow(2, -exponent) * 8388608) &
                    8388607;
                writeUint(
                  ((sign << 31) | ((exponent + 127) << 23) | mantissa) >>> 0,
                  buf2,
                  pos
                );
              }
            }
            exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
            exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
            function readFloat_ieee754(readUint, buf2, pos) {
              var uint = readUint(buf2, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = (uint >>> 23) & 255,
                mantissa = uint & 8388607;
              return exponent === 255
                ? mantissa
                  ? NaN
                  : sign * Infinity
                : exponent === 0
                ? sign * 1401298464324817e-60 * mantissa
                : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
            }
            exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
            exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
          })();
        if (typeof Float64Array !== "undefined")
          (function () {
            var f64 = new Float64Array([-0]),
              f8b = new Uint8Array(f64.buffer),
              le = f8b[7] === 128;
            function writeDouble_f64_cpy(val, buf2, pos) {
              f64[0] = val;
              buf2[pos] = f8b[0];
              buf2[pos + 1] = f8b[1];
              buf2[pos + 2] = f8b[2];
              buf2[pos + 3] = f8b[3];
              buf2[pos + 4] = f8b[4];
              buf2[pos + 5] = f8b[5];
              buf2[pos + 6] = f8b[6];
              buf2[pos + 7] = f8b[7];
            }
            function writeDouble_f64_rev(val, buf2, pos) {
              f64[0] = val;
              buf2[pos] = f8b[7];
              buf2[pos + 1] = f8b[6];
              buf2[pos + 2] = f8b[5];
              buf2[pos + 3] = f8b[4];
              buf2[pos + 4] = f8b[3];
              buf2[pos + 5] = f8b[2];
              buf2[pos + 6] = f8b[1];
              buf2[pos + 7] = f8b[0];
            }
            exports3.writeDoubleLE = le
              ? writeDouble_f64_cpy
              : writeDouble_f64_rev;
            exports3.writeDoubleBE = le
              ? writeDouble_f64_rev
              : writeDouble_f64_cpy;
            function readDouble_f64_cpy(buf2, pos) {
              f8b[0] = buf2[pos];
              f8b[1] = buf2[pos + 1];
              f8b[2] = buf2[pos + 2];
              f8b[3] = buf2[pos + 3];
              f8b[4] = buf2[pos + 4];
              f8b[5] = buf2[pos + 5];
              f8b[6] = buf2[pos + 6];
              f8b[7] = buf2[pos + 7];
              return f64[0];
            }
            function readDouble_f64_rev(buf2, pos) {
              f8b[7] = buf2[pos];
              f8b[6] = buf2[pos + 1];
              f8b[5] = buf2[pos + 2];
              f8b[4] = buf2[pos + 3];
              f8b[3] = buf2[pos + 4];
              f8b[2] = buf2[pos + 5];
              f8b[1] = buf2[pos + 6];
              f8b[0] = buf2[pos + 7];
              return f64[0];
            }
            exports3.readDoubleLE = le
              ? readDouble_f64_cpy
              : readDouble_f64_rev;
            exports3.readDoubleBE = le
              ? readDouble_f64_rev
              : readDouble_f64_cpy;
          })();
        else
          (function () {
            function writeDouble_ieee754(
              writeUint,
              off0,
              off1,
              val,
              buf2,
              pos
            ) {
              var sign = val < 0 ? 1 : 0;
              if (sign) val = -val;
              if (val === 0) {
                writeUint(0, buf2, pos + off0);
                writeUint(1 / val > 0 ? 0 : 2147483648, buf2, pos + off1);
              } else if (isNaN(val)) {
                writeUint(0, buf2, pos + off0);
                writeUint(2146959360, buf2, pos + off1);
              } else if (val > 17976931348623157e292) {
                writeUint(0, buf2, pos + off0);
                writeUint(((sign << 31) | 2146435072) >>> 0, buf2, pos + off1);
              } else {
                var mantissa;
                if (val < 22250738585072014e-324) {
                  mantissa = val / 5e-324;
                  writeUint(mantissa >>> 0, buf2, pos + off0);
                  writeUint(
                    ((sign << 31) | (mantissa / 4294967296)) >>> 0,
                    buf2,
                    pos + off1
                  );
                } else {
                  var exponent = Math.floor(Math.log(val) / Math.LN2);
                  if (exponent === 1024) exponent = 1023;
                  mantissa = val * Math.pow(2, -exponent);
                  writeUint(
                    (mantissa * 4503599627370496) >>> 0,
                    buf2,
                    pos + off0
                  );
                  writeUint(
                    ((sign << 31) |
                      ((exponent + 1023) << 20) |
                      ((mantissa * 1048576) & 1048575)) >>>
                      0,
                    buf2,
                    pos + off1
                  );
                }
              }
            }
            exports3.writeDoubleLE = writeDouble_ieee754.bind(
              null,
              writeUintLE,
              0,
              4
            );
            exports3.writeDoubleBE = writeDouble_ieee754.bind(
              null,
              writeUintBE,
              4,
              0
            );
            function readDouble_ieee754(readUint, off0, off1, buf2, pos) {
              var lo = readUint(buf2, pos + off0),
                hi = readUint(buf2, pos + off1);
              var sign = (hi >> 31) * 2 + 1,
                exponent = (hi >>> 20) & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
              return exponent === 2047
                ? mantissa
                  ? NaN
                  : sign * Infinity
                : exponent === 0
                ? sign * 5e-324 * mantissa
                : sign *
                  Math.pow(2, exponent - 1075) *
                  (mantissa + 4503599627370496);
            }
            exports3.readDoubleLE = readDouble_ieee754.bind(
              null,
              readUintLE,
              0,
              4
            );
            exports3.readDoubleBE = readDouble_ieee754.bind(
              null,
              readUintBE,
              4,
              0
            );
          })();
        return exports3;
      }
      function writeUintLE(val, buf2, pos) {
        buf2[pos] = val & 255;
        buf2[pos + 1] = (val >>> 8) & 255;
        buf2[pos + 2] = (val >>> 16) & 255;
        buf2[pos + 3] = val >>> 24;
      }
      function writeUintBE(val, buf2, pos) {
        buf2[pos] = val >>> 24;
        buf2[pos + 1] = (val >>> 16) & 255;
        buf2[pos + 2] = (val >>> 8) & 255;
        buf2[pos + 3] = val & 255;
      }
      function readUintLE(buf2, pos) {
        return (
          (buf2[pos] |
            (buf2[pos + 1] << 8) |
            (buf2[pos + 2] << 16) |
            (buf2[pos + 3] << 24)) >>>
          0
        );
      }
      function readUintBE(buf2, pos) {
        return (
          ((buf2[pos] << 24) |
            (buf2[pos + 1] << 16) |
            (buf2[pos + 2] << 8) |
            buf2[pos + 3]) >>>
          0
        );
      }
    },
  });

  // node_modules/@protobufjs/inquire/index.js
  var require_inquire = __commonJS({
    "node_modules/@protobufjs/inquire/index.js"(exports, module) {
      "use strict";
      module.exports = inquire;
      function inquire(moduleName) {
        try {
          var mod = eval("quire".replace(/^/, "re"))(moduleName);
          if (mod && (mod.length || Object.keys(mod).length)) return mod;
        } catch (e) {}
        return null;
      }
    },
  });

  // node_modules/@protobufjs/utf8/index.js
  var require_utf8 = __commonJS({
    "node_modules/@protobufjs/utf8/index.js"(exports2) {
      "use strict";
      var utf8 = exports2;
      utf8.length = function utf8_length(string2) {
        var len = 0,
          c = 0;
        for (var i = 0; i < string2.length; ++i) {
          c = string2.charCodeAt(i);
          if (c < 128) len += 1;
          else if (c < 2048) len += 2;
          else if (
            (c & 64512) === 55296 &&
            (string2.charCodeAt(i + 1) & 64512) === 56320
          ) {
            ++i;
            len += 4;
          } else len += 3;
        }
        return len;
      };
      utf8.read = function utf8_read(buffer2, start, end) {
        var len = end - start;
        if (len < 1) return "";
        var parts = null,
          chunk = [],
          i = 0,
          t;
        while (start < end) {
          t = buffer2[start++];
          if (t < 128) chunk[i++] = t;
          else if (t > 191 && t < 224)
            chunk[i++] = ((t & 31) << 6) | (buffer2[start++] & 63);
          else if (t > 239 && t < 365) {
            t =
              (((t & 7) << 18) |
                ((buffer2[start++] & 63) << 12) |
                ((buffer2[start++] & 63) << 6) |
                (buffer2[start++] & 63)) -
              65536;
            chunk[i++] = 55296 + (t >> 10);
            chunk[i++] = 56320 + (t & 1023);
          } else
            chunk[i++] =
              ((t & 15) << 12) |
              ((buffer2[start++] & 63) << 6) |
              (buffer2[start++] & 63);
          if (i > 8191) {
            (parts || (parts = [])).push(
              String.fromCharCode.apply(String, chunk)
            );
            i = 0;
          }
        }
        if (parts) {
          if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i));
      };
      utf8.write = function utf8_write(string2, buffer2, offset) {
        var start = offset,
          c1,
          c2;
        for (var i = 0; i < string2.length; ++i) {
          c1 = string2.charCodeAt(i);
          if (c1 < 128) {
            buffer2[offset++] = c1;
          } else if (c1 < 2048) {
            buffer2[offset++] = (c1 >> 6) | 192;
            buffer2[offset++] = (c1 & 63) | 128;
          } else if (
            (c1 & 64512) === 55296 &&
            ((c2 = string2.charCodeAt(i + 1)) & 64512) === 56320
          ) {
            c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
            ++i;
            buffer2[offset++] = (c1 >> 18) | 240;
            buffer2[offset++] = ((c1 >> 12) & 63) | 128;
            buffer2[offset++] = ((c1 >> 6) & 63) | 128;
            buffer2[offset++] = (c1 & 63) | 128;
          } else {
            buffer2[offset++] = (c1 >> 12) | 224;
            buffer2[offset++] = ((c1 >> 6) & 63) | 128;
            buffer2[offset++] = (c1 & 63) | 128;
          }
        }
        return offset - start;
      };
    },
  });

  // node_modules/@protobufjs/pool/index.js
  var require_pool = __commonJS({
    "node_modules/@protobufjs/pool/index.js"(exports2, module2) {
      "use strict";
      module2.exports = pool;
      function pool(alloc2, slice2, size) {
        var SIZE = size || 8192;
        var MAX = SIZE >>> 1;
        var slab = null;
        var offset = SIZE;
        return function pool_alloc(size2) {
          if (size2 < 1 || size2 > MAX) return alloc2(size2);
          if (offset + size2 > SIZE) {
            slab = alloc2(SIZE);
            offset = 0;
          }
          var buf2 = slice2.call(slab, offset, (offset += size2));
          if (offset & 7) offset = (offset | 7) + 1;
          return buf2;
        };
      }
    },
  });

  // node_modules/protobufjs/src/util/longbits.js
  var require_longbits = __commonJS({
    "node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
      "use strict";
      module2.exports = LongBits;
      var util = require_minimal();
      function LongBits(lo, hi) {
        this.lo = lo >>> 0;
        this.hi = hi >>> 0;
      }
      var zero = (LongBits.zero = new LongBits(0, 0));
      zero.toNumber = function () {
        return 0;
      };
      zero.zzEncode = zero.zzDecode = function () {
        return this;
      };
      zero.length = function () {
        return 1;
      };
      var zeroHash = (LongBits.zeroHash = "\0\0\0\0\0\0\0\0");
      LongBits.fromNumber = function fromNumber(value) {
        if (value === 0) return zero;
        var sign = value < 0;
        if (sign) value = -value;
        var lo = value >>> 0,
          hi = ((value - lo) / 4294967296) >>> 0;
        if (sign) {
          hi = ~hi >>> 0;
          lo = ~lo >>> 0;
          if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295) hi = 0;
          }
        }
        return new LongBits(lo, hi);
      };
      LongBits.from = function from3(value) {
        if (typeof value === "number") return LongBits.fromNumber(value);
        if (util.isString(value)) {
          if (util.Long) value = util.Long.fromString(value);
          else return LongBits.fromNumber(parseInt(value, 10));
        }
        return value.low || value.high
          ? new LongBits(value.low >>> 0, value.high >>> 0)
          : zero;
      };
      LongBits.prototype.toNumber = function toNumber(unsigned) {
        if (!unsigned && this.hi >>> 31) {
          var lo = (~this.lo + 1) >>> 0,
            hi = ~this.hi >>> 0;
          if (!lo) hi = (hi + 1) >>> 0;
          return -(lo + hi * 4294967296);
        }
        return this.lo + this.hi * 4294967296;
      };
      LongBits.prototype.toLong = function toLong(unsigned) {
        return util.Long
          ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
          : {
              low: this.lo | 0,
              high: this.hi | 0,
              unsigned: Boolean(unsigned),
            };
      };
      var charCodeAt = String.prototype.charCodeAt;
      LongBits.fromHash = function fromHash(hash) {
        if (hash === zeroHash) return zero;
        return new LongBits(
          (charCodeAt.call(hash, 0) |
            (charCodeAt.call(hash, 1) << 8) |
            (charCodeAt.call(hash, 2) << 16) |
            (charCodeAt.call(hash, 3) << 24)) >>>
            0,
          (charCodeAt.call(hash, 4) |
            (charCodeAt.call(hash, 5) << 8) |
            (charCodeAt.call(hash, 6) << 16) |
            (charCodeAt.call(hash, 7) << 24)) >>>
            0
        );
      };
      LongBits.prototype.toHash = function toHash() {
        return String.fromCharCode(
          this.lo & 255,
          (this.lo >>> 8) & 255,
          (this.lo >>> 16) & 255,
          this.lo >>> 24,
          this.hi & 255,
          (this.hi >>> 8) & 255,
          (this.hi >>> 16) & 255,
          this.hi >>> 24
        );
      };
      LongBits.prototype.zzEncode = function zzEncode() {
        var mask = this.hi >> 31;
        this.hi = (((this.hi << 1) | (this.lo >>> 31)) ^ mask) >>> 0;
        this.lo = ((this.lo << 1) ^ mask) >>> 0;
        return this;
      };
      LongBits.prototype.zzDecode = function zzDecode() {
        var mask = -(this.lo & 1);
        this.lo = (((this.lo >>> 1) | (this.hi << 31)) ^ mask) >>> 0;
        this.hi = ((this.hi >>> 1) ^ mask) >>> 0;
        return this;
      };
      LongBits.prototype.length = function length2() {
        var part0 = this.lo,
          part1 = ((this.lo >>> 28) | (this.hi << 4)) >>> 0,
          part2 = this.hi >>> 24;
        return part2 === 0
          ? part1 === 0
            ? part0 < 16384
              ? part0 < 128
                ? 1
                : 2
              : part0 < 2097152
              ? 3
              : 4
            : part1 < 16384
            ? part1 < 128
              ? 5
              : 6
            : part1 < 2097152
            ? 7
            : 8
          : part2 < 128
          ? 9
          : 10;
      };
    },
  });

  // node_modules/protobufjs/src/util/minimal.js
  var require_minimal = __commonJS({
    "node_modules/protobufjs/src/util/minimal.js"(exports2) {
      "use strict";
      var util = exports2;
      util.asPromise = require_aspromise();
      util.base64 = require_base64();
      util.EventEmitter = require_eventemitter();
      util.float = require_float();
      util.inquire = require_inquire();
      util.utf8 = require_utf8();
      util.pool = require_pool();
      util.LongBits = require_longbits();
      util.isNode = Boolean(
        typeof global !== "undefined" &&
          global &&
          global.process &&
          global.process.versions &&
          global.process.versions.node
      );
      util.global =
        (util.isNode && global) ||
        (typeof window !== "undefined" && window) ||
        (typeof self !== "undefined" && self) ||
        exports2;
      util.emptyArray = Object.freeze ? Object.freeze([]) : [];
      util.emptyObject = Object.freeze ? Object.freeze({}) : {};
      util.isInteger =
        Number.isInteger ||
        function isInteger(value) {
          return (
            typeof value === "number" &&
            isFinite(value) &&
            Math.floor(value) === value
          );
        };
      util.isString = function isString(value) {
        return typeof value === "string" || value instanceof String;
      };
      util.isObject = function isObject(value) {
        return value && typeof value === "object";
      };
      util.isset = util.isSet = function isSet(obj, prop) {
        var value = obj[prop];
        if (value != null && obj.hasOwnProperty(prop))
          return (
            typeof value !== "object" ||
            (Array.isArray(value) ? value.length : Object.keys(value).length) >
              0
          );
        return false;
      };
      util.Buffer = (function () {
        try {
          var Buffer2 = util.inquire("buffer").Buffer;
          return Buffer2.prototype.utf8Write ? Buffer2 : null;
        } catch (e) {
          return null;
        }
      })();
      util._Buffer_from = null;
      util._Buffer_allocUnsafe = null;
      util.newBuffer = function newBuffer(sizeOrArray) {
        return typeof sizeOrArray === "number"
          ? util.Buffer
            ? util._Buffer_allocUnsafe(sizeOrArray)
            : new util.Array(sizeOrArray)
          : util.Buffer
          ? util._Buffer_from(sizeOrArray)
          : typeof Uint8Array === "undefined"
          ? sizeOrArray
          : new Uint8Array(sizeOrArray);
      };
      util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      util.Long =
        (util.global.dcodeIO && util.global.dcodeIO.Long) ||
        util.global.Long ||
        util.inquire("long");
      util.key2Re = /^true|false|0|1$/;
      util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
      util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
      util.longToHash = function longToHash(value) {
        return value
          ? util.LongBits.from(value).toHash()
          : util.LongBits.zeroHash;
      };
      util.longFromHash = function longFromHash(hash, unsigned) {
        var bits = util.LongBits.fromHash(hash);
        if (util.Long) return util.Long.fromBits(bits.lo, bits.hi, unsigned);
        return bits.toNumber(Boolean(unsigned));
      };
      function merge2(dst, src2, ifNotSet) {
        for (var keys = Object.keys(src2), i = 0; i < keys.length; ++i)
          if (dst[keys[i]] === void 0 || !ifNotSet)
            dst[keys[i]] = src2[keys[i]];
        return dst;
      }
      util.merge = merge2;
      util.lcFirst = function lcFirst(str) {
        return str.charAt(0).toLowerCase() + str.substring(1);
      };
      function newError(name8) {
        function CustomError(message, properties) {
          if (!(this instanceof CustomError))
            return new CustomError(message, properties);
          Object.defineProperty(this, "message", {
            get: function () {
              return message;
            },
          });
          if (Error.captureStackTrace)
            Error.captureStackTrace(this, CustomError);
          else
            Object.defineProperty(this, "stack", {
              value: new Error().stack || "",
            });
          if (properties) merge2(this, properties);
        }
        CustomError.prototype = Object.create(Error.prototype, {
          constructor: {
            value: CustomError,
            writable: true,
            enumerable: false,
            configurable: true,
          },
          name: {
            get() {
              return name8;
            },
            set: void 0,
            enumerable: false,
            configurable: true,
          },
          toString: {
            value() {
              return this.name + ": " + this.message;
            },
            writable: true,
            enumerable: false,
            configurable: true,
          },
        });
        return CustomError;
      }
      util.newError = newError;
      util.ProtocolError = newError("ProtocolError");
      util.oneOfGetter = function getOneOf(fieldNames) {
        var fieldMap = {};
        for (var i = 0; i < fieldNames.length; ++i) fieldMap[fieldNames[i]] = 1;
        return function () {
          for (
            var keys = Object.keys(this), i2 = keys.length - 1;
            i2 > -1;
            --i2
          )
            if (
              fieldMap[keys[i2]] === 1 &&
              this[keys[i2]] !== void 0 &&
              this[keys[i2]] !== null
            )
              return keys[i2];
        };
      };
      util.oneOfSetter = function setOneOf(fieldNames) {
        return function (name8) {
          for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name8) delete this[fieldNames[i]];
        };
      };
      util.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: true,
      };
      util._configure = function () {
        var Buffer2 = util.Buffer;
        if (!Buffer2) {
          util._Buffer_from = util._Buffer_allocUnsafe = null;
          return;
        }
        util._Buffer_from =
          (Buffer2.from !== Uint8Array.from && Buffer2.from) ||
          function Buffer_from(value, encoding) {
            return new Buffer2(value, encoding);
          };
        util._Buffer_allocUnsafe =
          Buffer2.allocUnsafe ||
          function Buffer_allocUnsafe(size) {
            return new Buffer2(size);
          };
      };
    },
  });

  // node_modules/protobufjs/src/writer.js
  var require_writer = __commonJS({
    "node_modules/protobufjs/src/writer.js"(exports2, module2) {
      "use strict";
      module2.exports = Writer;
      var util = require_minimal();
      var BufferWriter;
      var LongBits = util.LongBits;
      var base642 = util.base64;
      var utf8 = util.utf8;
      function Op(fn, len, val) {
        this.fn = fn;
        this.len = len;
        this.next = void 0;
        this.val = val;
      }
      function noop() {}
      function State(writer) {
        this.head = writer.head;
        this.tail = writer.tail;
        this.len = writer.len;
        this.next = writer.states;
      }
      function Writer() {
        this.len = 0;
        this.head = new Op(noop, 0, 0);
        this.tail = this.head;
        this.states = null;
      }
      var create3 = function create4() {
        return util.Buffer
          ? function create_buffer_setup() {
              return (Writer.create = function create_buffer() {
                return new BufferWriter();
              })();
            }
          : function create_array() {
              return new Writer();
            };
      };
      Writer.create = create3();
      Writer.alloc = function alloc2(size) {
        return new util.Array(size);
      };
      if (util.Array !== Array)
        Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
      Writer.prototype._push = function push(fn, len, val) {
        this.tail = this.tail.next = new Op(fn, len, val);
        this.len += len;
        return this;
      };
      function writeByte(val, buf2, pos) {
        buf2[pos] = val & 255;
      }
      function writeVarint32(val, buf2, pos) {
        while (val > 127) {
          buf2[pos++] = (val & 127) | 128;
          val >>>= 7;
        }
        buf2[pos] = val;
      }
      function VarintOp(len, val) {
        this.len = len;
        this.next = void 0;
        this.val = val;
      }
      VarintOp.prototype = Object.create(Op.prototype);
      VarintOp.prototype.fn = writeVarint32;
      Writer.prototype.uint32 = function write_uint32(value) {
        this.len += (this.tail = this.tail.next =
          new VarintOp(
            (value = value >>> 0) < 128
              ? 1
              : value < 16384
              ? 2
              : value < 2097152
              ? 3
              : value < 268435456
              ? 4
              : 5,
            value
          )).len;
        return this;
      };
      Writer.prototype.int32 = function write_int32(value) {
        return value < 0
          ? this._push(writeVarint64, 10, LongBits.fromNumber(value))
          : this.uint32(value);
      };
      Writer.prototype.sint32 = function write_sint32(value) {
        return this.uint32(((value << 1) ^ (value >> 31)) >>> 0);
      };
      function writeVarint64(val, buf2, pos) {
        while (val.hi) {
          buf2[pos++] = (val.lo & 127) | 128;
          val.lo = ((val.lo >>> 7) | (val.hi << 25)) >>> 0;
          val.hi >>>= 7;
        }
        while (val.lo > 127) {
          buf2[pos++] = (val.lo & 127) | 128;
          val.lo = val.lo >>> 7;
        }
        buf2[pos++] = val.lo;
      }
      Writer.prototype.uint64 = function write_uint64(value) {
        var bits = LongBits.from(value);
        return this._push(writeVarint64, bits.length(), bits);
      };
      Writer.prototype.int64 = Writer.prototype.uint64;
      Writer.prototype.sint64 = function write_sint64(value) {
        var bits = LongBits.from(value).zzEncode();
        return this._push(writeVarint64, bits.length(), bits);
      };
      Writer.prototype.bool = function write_bool(value) {
        return this._push(writeByte, 1, value ? 1 : 0);
      };
      function writeFixed32(val, buf2, pos) {
        buf2[pos] = val & 255;
        buf2[pos + 1] = (val >>> 8) & 255;
        buf2[pos + 2] = (val >>> 16) & 255;
        buf2[pos + 3] = val >>> 24;
      }
      Writer.prototype.fixed32 = function write_fixed32(value) {
        return this._push(writeFixed32, 4, value >>> 0);
      };
      Writer.prototype.sfixed32 = Writer.prototype.fixed32;
      Writer.prototype.fixed64 = function write_fixed64(value) {
        var bits = LongBits.from(value);
        return this._push(writeFixed32, 4, bits.lo)._push(
          writeFixed32,
          4,
          bits.hi
        );
      };
      Writer.prototype.sfixed64 = Writer.prototype.fixed64;
      Writer.prototype.float = function write_float(value) {
        return this._push(util.float.writeFloatLE, 4, value);
      };
      Writer.prototype.double = function write_double(value) {
        return this._push(util.float.writeDoubleLE, 8, value);
      };
      var writeBytes = util.Array.prototype.set
        ? function writeBytes_set(val, buf2, pos) {
            buf2.set(val, pos);
          }
        : function writeBytes_for(val, buf2, pos) {
            for (var i = 0; i < val.length; ++i) buf2[pos + i] = val[i];
          };
      Writer.prototype.bytes = function write_bytes(value) {
        var len = value.length >>> 0;
        if (!len) return this._push(writeByte, 1, 0);
        if (util.isString(value)) {
          var buf2 = Writer.alloc((len = base642.length(value)));
          base642.decode(value, buf2, 0);
          value = buf2;
        }
        return this.uint32(len)._push(writeBytes, len, value);
      };
      Writer.prototype.string = function write_string(value) {
        var len = utf8.length(value);
        return len
          ? this.uint32(len)._push(utf8.write, len, value)
          : this._push(writeByte, 1, 0);
      };
      Writer.prototype.fork = function fork() {
        this.states = new State(this);
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
        return this;
      };
      Writer.prototype.reset = function reset() {
        if (this.states) {
          this.head = this.states.head;
          this.tail = this.states.tail;
          this.len = this.states.len;
          this.states = this.states.next;
        } else {
          this.head = this.tail = new Op(noop, 0, 0);
          this.len = 0;
        }
        return this;
      };
      Writer.prototype.ldelim = function ldelim() {
        var head = this.head,
          tail = this.tail,
          len = this.len;
        this.reset().uint32(len);
        if (len) {
          this.tail.next = head.next;
          this.tail = tail;
          this.len += len;
        }
        return this;
      };
      Writer.prototype.finish = function finish() {
        var head = this.head.next,
          buf2 = this.constructor.alloc(this.len),
          pos = 0;
        while (head) {
          head.fn(head.val, buf2, pos);
          pos += head.len;
          head = head.next;
        }
        return buf2;
      };
      Writer._configure = function (BufferWriter_) {
        BufferWriter = BufferWriter_;
        Writer.create = create3();
        BufferWriter._configure();
      };
    },
  });

  // node_modules/protobufjs/src/writer_buffer.js
  var require_writer_buffer = __commonJS({
    "node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
      "use strict";
      module2.exports = BufferWriter;
      var Writer = require_writer();
      (BufferWriter.prototype = Object.create(Writer.prototype)).constructor =
        BufferWriter;
      var util = require_minimal();
      function BufferWriter() {
        Writer.call(this);
      }
      BufferWriter._configure = function () {
        BufferWriter.alloc = util._Buffer_allocUnsafe;
        BufferWriter.writeBytesBuffer =
          util.Buffer &&
          util.Buffer.prototype instanceof Uint8Array &&
          util.Buffer.prototype.set.name === "set"
            ? function writeBytesBuffer_set(val, buf2, pos) {
                buf2.set(val, pos);
              }
            : function writeBytesBuffer_copy(val, buf2, pos) {
                if (val.copy) val.copy(buf2, pos, 0, val.length);
                else for (var i = 0; i < val.length; ) buf2[pos++] = val[i++];
              };
      };
      BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
        if (util.isString(value)) value = util._Buffer_from(value, "base64");
        var len = value.length >>> 0;
        this.uint32(len);
        if (len) this._push(BufferWriter.writeBytesBuffer, len, value);
        return this;
      };
      function writeStringBuffer(val, buf2, pos) {
        if (val.length < 40) util.utf8.write(val, buf2, pos);
        else if (buf2.utf8Write) buf2.utf8Write(val, pos);
        else buf2.write(val, pos);
      }
      BufferWriter.prototype.string = function write_string_buffer(value) {
        var len = util.Buffer.byteLength(value);
        this.uint32(len);
        if (len) this._push(writeStringBuffer, len, value);
        return this;
      };
      BufferWriter._configure();
    },
  });

  // node_modules/protobufjs/src/reader.js
  var require_reader = __commonJS({
    "node_modules/protobufjs/src/reader.js"(exports2, module2) {
      "use strict";
      module2.exports = Reader;
      var util = require_minimal();
      var BufferReader;
      var LongBits = util.LongBits;
      var utf8 = util.utf8;
      function indexOutOfRange(reader, writeLength) {
        return RangeError(
          "index out of range: " +
            reader.pos +
            " + " +
            (writeLength || 1) +
            " > " +
            reader.len
        );
      }
      function Reader(buffer2) {
        this.buf = buffer2;
        this.pos = 0;
        this.len = buffer2.length;
      }
      var create_array =
        typeof Uint8Array !== "undefined"
          ? function create_typed_array(buffer2) {
              if (buffer2 instanceof Uint8Array || Array.isArray(buffer2))
                return new Reader(buffer2);
              throw Error("illegal buffer");
            }
          : function create_array2(buffer2) {
              if (Array.isArray(buffer2)) return new Reader(buffer2);
              throw Error("illegal buffer");
            };
      var create3 = function create4() {
        return util.Buffer
          ? function create_buffer_setup(buffer2) {
              return (Reader.create = function create_buffer(buffer3) {
                return util.Buffer.isBuffer(buffer3)
                  ? new BufferReader(buffer3)
                  : create_array(buffer3);
              })(buffer2);
            }
          : create_array;
      };
      Reader.create = create3();
      Reader.prototype._slice =
        util.Array.prototype.subarray || util.Array.prototype.slice;
      Reader.prototype.uint32 = (function read_uint32_setup() {
        var value = 4294967295;
        return function read_uint32() {
          value = (this.buf[this.pos] & 127) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | ((this.buf[this.pos] & 127) << 7)) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | ((this.buf[this.pos] & 127) << 14)) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | ((this.buf[this.pos] & 127) << 21)) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | ((this.buf[this.pos] & 15) << 28)) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
          }
          return value;
        };
      })();
      Reader.prototype.int32 = function read_int32() {
        return this.uint32() | 0;
      };
      Reader.prototype.sint32 = function read_sint32() {
        var value = this.uint32();
        return ((value >>> 1) ^ -(value & 1)) | 0;
      };
      function readLongVarint() {
        var bits = new LongBits(0, 0);
        var i = 0;
        if (this.len - this.pos > 4) {
          for (; i < 4; ++i) {
            bits.lo = (bits.lo | ((this.buf[this.pos] & 127) << (i * 7))) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
          }
          bits.lo = (bits.lo | ((this.buf[this.pos] & 127) << 28)) >>> 0;
          bits.hi = (bits.hi | ((this.buf[this.pos] & 127) >> 4)) >>> 0;
          if (this.buf[this.pos++] < 128) return bits;
          i = 0;
        } else {
          for (; i < 3; ++i) {
            if (this.pos >= this.len) throw indexOutOfRange(this);
            bits.lo = (bits.lo | ((this.buf[this.pos] & 127) << (i * 7))) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
          }
          bits.lo = (bits.lo | ((this.buf[this.pos++] & 127) << (i * 7))) >>> 0;
          return bits;
        }
        if (this.len - this.pos > 4) {
          for (; i < 5; ++i) {
            bits.hi =
              (bits.hi | ((this.buf[this.pos] & 127) << (i * 7 + 3))) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
          }
        } else {
          for (; i < 5; ++i) {
            if (this.pos >= this.len) throw indexOutOfRange(this);
            bits.hi =
              (bits.hi | ((this.buf[this.pos] & 127) << (i * 7 + 3))) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
          }
        }
        throw Error("invalid varint encoding");
      }
      Reader.prototype.bool = function read_bool() {
        return this.uint32() !== 0;
      };
      function readFixed32_end(buf2, end) {
        return (
          (buf2[end - 4] |
            (buf2[end - 3] << 8) |
            (buf2[end - 2] << 16) |
            (buf2[end - 1] << 24)) >>>
          0
        );
      }
      Reader.prototype.fixed32 = function read_fixed32() {
        if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, (this.pos += 4));
      };
      Reader.prototype.sfixed32 = function read_sfixed32() {
        if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, (this.pos += 4)) | 0;
      };
      function readFixed64() {
        if (this.pos + 8 > this.len) throw indexOutOfRange(this, 8);
        return new LongBits(
          readFixed32_end(this.buf, (this.pos += 4)),
          readFixed32_end(this.buf, (this.pos += 4))
        );
      }
      Reader.prototype.float = function read_float() {
        if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
        var value = util.float.readFloatLE(this.buf, this.pos);
        this.pos += 4;
        return value;
      };
      Reader.prototype.double = function read_double() {
        if (this.pos + 8 > this.len) throw indexOutOfRange(this, 4);
        var value = util.float.readDoubleLE(this.buf, this.pos);
        this.pos += 8;
        return value;
      };
      Reader.prototype.bytes = function read_bytes() {
        var length2 = this.uint32(),
          start = this.pos,
          end = this.pos + length2;
        if (end > this.len) throw indexOutOfRange(this, length2);
        this.pos += length2;
        if (Array.isArray(this.buf)) return this.buf.slice(start, end);
        return start === end
          ? new this.buf.constructor(0)
          : this._slice.call(this.buf, start, end);
      };
      Reader.prototype.string = function read_string() {
        var bytes = this.bytes();
        return utf8.read(bytes, 0, bytes.length);
      };
      Reader.prototype.skip = function skip(length2) {
        if (typeof length2 === "number") {
          if (this.pos + length2 > this.len)
            throw indexOutOfRange(this, length2);
          this.pos += length2;
        } else {
          do {
            if (this.pos >= this.len) throw indexOutOfRange(this);
          } while (this.buf[this.pos++] & 128);
        }
        return this;
      };
      Reader.prototype.skipType = function (wireType) {
        switch (wireType) {
          case 0:
            this.skip();
            break;
          case 1:
            this.skip(8);
            break;
          case 2:
            this.skip(this.uint32());
            break;
          case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
              this.skipType(wireType);
            }
            break;
          case 5:
            this.skip(4);
            break;
          default:
            throw Error(
              "invalid wire type " + wireType + " at offset " + this.pos
            );
        }
        return this;
      };
      Reader._configure = function (BufferReader_) {
        BufferReader = BufferReader_;
        Reader.create = create3();
        BufferReader._configure();
        var fn = util.Long ? "toLong" : "toNumber";
        util.merge(Reader.prototype, {
          int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
          },
          uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
          },
          sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
          },
          fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
          },
          sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
          },
        });
      };
    },
  });

  // node_modules/protobufjs/src/reader_buffer.js
  var require_reader_buffer = __commonJS({
    "node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
      "use strict";
      module2.exports = BufferReader;
      var Reader = require_reader();
      (BufferReader.prototype = Object.create(Reader.prototype)).constructor =
        BufferReader;
      var util = require_minimal();
      function BufferReader(buffer2) {
        Reader.call(this, buffer2);
      }
      BufferReader._configure = function () {
        if (util.Buffer)
          BufferReader.prototype._slice = util.Buffer.prototype.slice;
      };
      BufferReader.prototype.string = function read_string_buffer() {
        var len = this.uint32();
        return this.buf.utf8Slice
          ? this.buf.utf8Slice(
              this.pos,
              (this.pos = Math.min(this.pos + len, this.len))
            )
          : this.buf.toString(
              "utf-8",
              this.pos,
              (this.pos = Math.min(this.pos + len, this.len))
            );
      };
      BufferReader._configure();
    },
  });

  // node_modules/protobufjs/src/rpc/service.js
  var require_service = __commonJS({
    "node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
      "use strict";
      module2.exports = Service;
      var util = require_minimal();
      (Service.prototype = Object.create(
        util.EventEmitter.prototype
      )).constructor = Service;
      function Service(rpcImpl, requestDelimited, responseDelimited) {
        if (typeof rpcImpl !== "function")
          throw TypeError("rpcImpl must be a function");
        util.EventEmitter.call(this);
        this.rpcImpl = rpcImpl;
        this.requestDelimited = Boolean(requestDelimited);
        this.responseDelimited = Boolean(responseDelimited);
      }
      Service.prototype.rpcCall = function rpcCall(
        method,
        requestCtor,
        responseCtor,
        request,
        callback
      ) {
        if (!request) throw TypeError("request must be specified");
        var self2 = this;
        if (!callback)
          return util.asPromise(
            rpcCall,
            self2,
            method,
            requestCtor,
            responseCtor,
            request
          );
        if (!self2.rpcImpl) {
          setTimeout(function () {
            callback(Error("already ended"));
          }, 0);
          return void 0;
        }
        try {
          return self2.rpcImpl(
            method,
            requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](
              request
            ).finish(),
            function rpcCallback(err, response) {
              if (err) {
                self2.emit("error", err, method);
                return callback(err);
              }
              if (response === null) {
                self2.end(true);
                return void 0;
              }
              if (!(response instanceof responseCtor)) {
                try {
                  response =
                    responseCtor[
                      self2.responseDelimited ? "decodeDelimited" : "decode"
                    ](response);
                } catch (err2) {
                  self2.emit("error", err2, method);
                  return callback(err2);
                }
              }
              self2.emit("data", response, method);
              return callback(null, response);
            }
          );
        } catch (err) {
          self2.emit("error", err, method);
          setTimeout(function () {
            callback(err);
          }, 0);
          return void 0;
        }
      };
      Service.prototype.end = function end(endedByRPC) {
        if (this.rpcImpl) {
          if (!endedByRPC) this.rpcImpl(null, null, null);
          this.rpcImpl = null;
          this.emit("end").off();
        }
        return this;
      };
    },
  });

  // node_modules/protobufjs/src/rpc.js
  var require_rpc = __commonJS({
    "node_modules/protobufjs/src/rpc.js"(exports2) {
      "use strict";
      var rpc = exports2;
      rpc.Service = require_service();
    },
  });

  // node_modules/protobufjs/src/roots.js
  var require_roots = __commonJS({
    "node_modules/protobufjs/src/roots.js"(exports2, module2) {
      "use strict";
      module2.exports = {};
    },
  });

  // node_modules/protobufjs/src/index-minimal.js
  var require_index_minimal = __commonJS({
    "node_modules/protobufjs/src/index-minimal.js"(exports2) {
      "use strict";
      var protobuf = exports2;
      protobuf.build = "minimal";
      protobuf.Writer = require_writer();
      protobuf.BufferWriter = require_writer_buffer();
      protobuf.Reader = require_reader();
      protobuf.BufferReader = require_reader_buffer();
      protobuf.util = require_minimal();
      protobuf.rpc = require_rpc();
      protobuf.roots = require_roots();
      protobuf.configure = configure2;
      function configure2() {
        protobuf.util._configure();
        protobuf.Writer._configure(protobuf.BufferWriter);
        protobuf.Reader._configure(protobuf.BufferReader);
      }
      configure2();
    },
  });

  // node_modules/protobufjs/minimal.js
  var require_minimal2 = __commonJS({
    "node_modules/protobufjs/minimal.js"(exports2, module2) {
      "use strict";
      module2.exports = require_index_minimal();
    },
  });

  // node_modules/stream-to-it/source.js
  var require_source = __commonJS({
    "node_modules/stream-to-it/source.js"(exports2, module2) {
      module2.exports = (readable) => {
        if (readable[Symbol.asyncIterator]) return readable;
        if (readable.getReader) {
          return (async function* () {
            const reader = readable.getReader();
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) return;
                yield value;
              }
            } finally {
              reader.releaseLock();
            }
          })();
        }
        throw new Error("unknown stream");
      };
    },
  });

  // (disabled):node_modules/ipfs-utils/src/files/glob-source.js
  var require_glob_source = __commonJS({
    "(disabled):node_modules/ipfs-utils/src/files/glob-source.js"() {},
  });

  // node_modules/ipfs-utils/src/files/url-source.js
  var require_url_source = __commonJS({
    "node_modules/ipfs-utils/src/files/url-source.js"(exports2, module2) {
      "use strict";
      var HTTP3 = require_http();
      var urlSource = (url, options) => {
        return {
          path: decodeURIComponent(
            new URL(url).pathname.split("/").pop() || ""
          ),
          content: readURLContent(url, options),
        };
      };
      async function* readURLContent(url, options) {
        const http = new HTTP3();
        const response = await http.get(url, options);
        yield* response.iterator();
      }
      module2.exports = urlSource;
    },
  });

  // node_modules/ipfs-core-utils/src/multibases.js
  var LOAD_BASE = (name8) =>
    Promise.reject(new Error(`No base found for "${name8}"`));
  var Multibases = class {
    constructor(options) {
      this._basesByName = {};
      this._basesByPrefix = {};
      this._loadBase = options.loadBase || LOAD_BASE;
      for (const base3 of options.bases) {
        this.addBase(base3);
      }
    }
    addBase(base3) {
      if (this._basesByName[base3.name] || this._basesByPrefix[base3.prefix]) {
        throw new Error(`Codec already exists for codec "${base3.name}"`);
      }
      this._basesByName[base3.name] = base3;
      this._basesByPrefix[base3.prefix] = base3;
    }
    removeBase(base3) {
      delete this._basesByName[base3.name];
      delete this._basesByPrefix[base3.prefix];
    }
    async getBase(nameOrPrefix) {
      if (this._basesByName[nameOrPrefix]) {
        return this._basesByName[nameOrPrefix];
      }
      if (this._basesByPrefix[nameOrPrefix]) {
        return this._basesByPrefix[nameOrPrefix];
      }
      const base3 = await this._loadBase(nameOrPrefix);
      if (
        this._basesByName[base3.name] == null &&
        this._basesByPrefix[base3.prefix] == null
      ) {
        this.addBase(base3);
      }
      return base3;
    }
    listBases() {
      return Object.values(this._basesByName);
    }
  };

  // node_modules/ipfs-core-utils/src/multicodecs.js
  var LOAD_CODEC = (codeOrName) =>
    Promise.reject(new Error(`No codec found for "${codeOrName}"`));
  var Multicodecs = class {
    constructor(options) {
      this._codecsByName = {};
      this._codecsByCode = {};
      this._loadCodec = options.loadCodec || LOAD_CODEC;
      for (const codec of options.codecs) {
        this.addCodec(codec);
      }
    }
    addCodec(codec) {
      if (this._codecsByName[codec.name] || this._codecsByCode[codec.code]) {
        throw new Error(`Resolver already exists for codec "${codec.name}"`);
      }
      this._codecsByName[codec.name] = codec;
      this._codecsByCode[codec.code] = codec;
    }
    removeCodec(codec) {
      delete this._codecsByName[codec.name];
      delete this._codecsByCode[codec.code];
    }
    async getCodec(code8) {
      const table2 =
        typeof code8 === "string" ? this._codecsByName : this._codecsByCode;
      if (table2[code8]) {
        return table2[code8];
      }
      const codec = await this._loadCodec(code8);
      if (table2[code8] == null) {
        this.addCodec(codec);
      }
      return codec;
    }
    listCodecs() {
      return Object.values(this._codecsByName);
    }
  };

  // node_modules/ipfs-core-utils/src/multihashes.js
  var LOAD_HASHER = (codeOrName) =>
    Promise.reject(new Error(`No hasher found for "${codeOrName}"`));
  var Multihashes = class {
    constructor(options) {
      this._hashersByName = {};
      this._hashersByCode = {};
      this._loadHasher = options.loadHasher || LOAD_HASHER;
      for (const hasher of options.hashers) {
        this.addHasher(hasher);
      }
    }
    addHasher(hasher) {
      if (
        this._hashersByName[hasher.name] ||
        this._hashersByCode[hasher.code]
      ) {
        throw new Error(`Resolver already exists for codec "${hasher.name}"`);
      }
      this._hashersByName[hasher.name] = hasher;
      this._hashersByCode[hasher.code] = hasher;
    }
    removeHasher(hasher) {
      delete this._hashersByName[hasher.name];
      delete this._hashersByCode[hasher.code];
    }
    async getHasher(code8) {
      const table2 =
        typeof code8 === "string" ? this._hashersByName : this._hashersByCode;
      if (table2[code8]) {
        return table2[code8];
      }
      const hasher = await this._loadHasher(code8);
      if (table2[code8] == null) {
        this.addHasher(hasher);
      }
      return hasher;
    }
    listHashers() {
      return Object.values(this._hashersByName);
    }
  };

  // node_modules/@ipld/dag-pb/src/index.js
  var src_exports = {};
  __export(src_exports, {
    code: () => code,
    createLink: () => createLink,
    createNode: () => createNode,
    decode: () => decode5,
    encode: () => encode3,
    name: () => name,
    prepare: () => prepare,
    validate: () => validate,
  });

  // node_modules/multiformats/vendor/varint.js
  var encode_1 = encode;
  var MSB = 128;
  var REST = 127;
  var MSBALL = ~REST;
  var INT = Math.pow(2, 31);
  function encode(num, out, offset) {
    out = out || [];
    offset = offset || 0;
    var oldOffset = offset;
    while (num >= INT) {
      out[offset++] = (num & 255) | MSB;
      num /= 128;
    }
    while (num & MSBALL) {
      out[offset++] = (num & 255) | MSB;
      num >>>= 7;
    }
    out[offset] = num | 0;
    encode.bytes = offset - oldOffset + 1;
    return out;
  }
  var decode = read;
  var MSB$1 = 128;
  var REST$1 = 127;
  function read(buf2, offset) {
    var res = 0,
      offset = offset || 0,
      shift = 0,
      counter = offset,
      b,
      l = buf2.length;
    do {
      if (counter >= l) {
        read.bytes = 0;
        throw new RangeError("Could not decode varint");
      }
      b = buf2[counter++];
      res +=
        shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
      shift += 7;
    } while (b >= MSB$1);
    read.bytes = counter - offset;
    return res;
  }
  var N1 = Math.pow(2, 7);
  var N2 = Math.pow(2, 14);
  var N3 = Math.pow(2, 21);
  var N4 = Math.pow(2, 28);
  var N5 = Math.pow(2, 35);
  var N6 = Math.pow(2, 42);
  var N7 = Math.pow(2, 49);
  var N8 = Math.pow(2, 56);
  var N9 = Math.pow(2, 63);
  var length = function (value) {
    return value < N1
      ? 1
      : value < N2
      ? 2
      : value < N3
      ? 3
      : value < N4
      ? 4
      : value < N5
      ? 5
      : value < N6
      ? 6
      : value < N7
      ? 7
      : value < N8
      ? 8
      : value < N9
      ? 9
      : 10;
  };
  var varint = {
    encode: encode_1,
    decode,
    encodingLength: length,
  };
  var _brrp_varint = varint;
  var varint_default = _brrp_varint;

  // node_modules/multiformats/src/varint.js
  var decode2 = (data, offset = 0) => {
    const code8 = varint_default.decode(data, offset);
    return [code8, varint_default.decode.bytes];
  };
  var encodeTo = (int, target, offset = 0) => {
    varint_default.encode(int, target, offset);
    return target;
  };
  var encodingLength = (int) => {
    return varint_default.encodingLength(int);
  };

  // node_modules/multiformats/src/bytes.js
  var empty = new Uint8Array(0);
  var equals = (aa, bb) => {
    if (aa === bb) return true;
    if (aa.byteLength !== bb.byteLength) {
      return false;
    }
    for (let ii = 0; ii < aa.byteLength; ii++) {
      if (aa[ii] !== bb[ii]) {
        return false;
      }
    }
    return true;
  };
  var coerce = (o) => {
    if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
      return o;
    if (o instanceof ArrayBuffer) return new Uint8Array(o);
    if (ArrayBuffer.isView(o)) {
      return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
    }
    throw new Error("Unknown type, must be binary type");
  };
  var fromString = (str) => new TextEncoder().encode(str);
  var toString = (b) => new TextDecoder().decode(b);

  // node_modules/multiformats/src/hashes/digest.js
  var create = (code8, digest2) => {
    const size = digest2.byteLength;
    const sizeOffset = encodingLength(code8);
    const digestOffset = sizeOffset + encodingLength(size);
    const bytes = new Uint8Array(digestOffset + size);
    encodeTo(code8, bytes, 0);
    encodeTo(size, bytes, sizeOffset);
    bytes.set(digest2, digestOffset);
    return new Digest(code8, size, digest2, bytes);
  };
  var decode3 = (multihash) => {
    const bytes = coerce(multihash);
    const [code8, sizeOffset] = decode2(bytes);
    const [size, digestOffset] = decode2(bytes.subarray(sizeOffset));
    const digest2 = bytes.subarray(sizeOffset + digestOffset);
    if (digest2.byteLength !== size) {
      throw new Error("Incorrect length");
    }
    return new Digest(code8, size, digest2, bytes);
  };
  var equals2 = (a, b) => {
    if (a === b) {
      return true;
    } else {
      const data = b;
      return (
        a.code === data.code &&
        a.size === data.size &&
        data.bytes instanceof Uint8Array &&
        equals(a.bytes, data.bytes)
      );
    }
  };
  var Digest = class {
    constructor(code8, size, digest2, bytes) {
      this.code = code8;
      this.size = size;
      this.digest = digest2;
      this.bytes = bytes;
    }
  };

  // node_modules/multiformats/src/bases/base58.js
  var base58_exports = {};
  __export(base58_exports, {
    base58btc: () => base58btc,
    base58flickr: () => base58flickr,
  });

  // node_modules/multiformats/vendor/base-x.js
  function base(ALPHABET, name8) {
    if (ALPHABET.length >= 255) {
      throw new TypeError("Alphabet too long");
    }
    var BASE_MAP = new Uint8Array(256);
    for (var j = 0; j < BASE_MAP.length; j++) {
      BASE_MAP[j] = 255;
    }
    for (var i = 0; i < ALPHABET.length; i++) {
      var x = ALPHABET.charAt(i);
      var xc = x.charCodeAt(0);
      if (BASE_MAP[xc] !== 255) {
        throw new TypeError(x + " is ambiguous");
      }
      BASE_MAP[xc] = i;
    }
    var BASE = ALPHABET.length;
    var LEADER = ALPHABET.charAt(0);
    var FACTOR = Math.log(BASE) / Math.log(256);
    var iFACTOR = Math.log(256) / Math.log(BASE);
    function encode15(source) {
      if (source instanceof Uint8Array);
      else if (ArrayBuffer.isView(source)) {
        source = new Uint8Array(
          source.buffer,
          source.byteOffset,
          source.byteLength
        );
      } else if (Array.isArray(source)) {
        source = Uint8Array.from(source);
      }
      if (!(source instanceof Uint8Array)) {
        throw new TypeError("Expected Uint8Array");
      }
      if (source.length === 0) {
        return "";
      }
      var zeroes = 0;
      var length2 = 0;
      var pbegin = 0;
      var pend = source.length;
      while (pbegin !== pend && source[pbegin] === 0) {
        pbegin++;
        zeroes++;
      }
      var size = ((pend - pbegin) * iFACTOR + 1) >>> 0;
      var b58 = new Uint8Array(size);
      while (pbegin !== pend) {
        var carry = source[pbegin];
        var i2 = 0;
        for (
          var it1 = size - 1;
          (carry !== 0 || i2 < length2) && it1 !== -1;
          it1--, i2++
        ) {
          carry += (256 * b58[it1]) >>> 0;
          b58[it1] = carry % BASE >>> 0;
          carry = (carry / BASE) >>> 0;
        }
        if (carry !== 0) {
          throw new Error("Non-zero carry");
        }
        length2 = i2;
        pbegin++;
      }
      var it2 = size - length2;
      while (it2 !== size && b58[it2] === 0) {
        it2++;
      }
      var str = LEADER.repeat(zeroes);
      for (; it2 < size; ++it2) {
        str += ALPHABET.charAt(b58[it2]);
      }
      return str;
    }
    function decodeUnsafe(source) {
      if (typeof source !== "string") {
        throw new TypeError("Expected String");
      }
      if (source.length === 0) {
        return new Uint8Array();
      }
      var psz = 0;
      if (source[psz] === " ") {
        return;
      }
      var zeroes = 0;
      var length2 = 0;
      while (source[psz] === LEADER) {
        zeroes++;
        psz++;
      }
      var size = ((source.length - psz) * FACTOR + 1) >>> 0;
      var b256 = new Uint8Array(size);
      while (source[psz]) {
        var carry = BASE_MAP[source.charCodeAt(psz)];
        if (carry === 255) {
          return;
        }
        var i2 = 0;
        for (
          var it3 = size - 1;
          (carry !== 0 || i2 < length2) && it3 !== -1;
          it3--, i2++
        ) {
          carry += (BASE * b256[it3]) >>> 0;
          b256[it3] = carry % 256 >>> 0;
          carry = (carry / 256) >>> 0;
        }
        if (carry !== 0) {
          throw new Error("Non-zero carry");
        }
        length2 = i2;
        psz++;
      }
      if (source[psz] === " ") {
        return;
      }
      var it4 = size - length2;
      while (it4 !== size && b256[it4] === 0) {
        it4++;
      }
      var vch = new Uint8Array(zeroes + (size - it4));
      var j2 = zeroes;
      while (it4 !== size) {
        vch[j2++] = b256[it4++];
      }
      return vch;
    }
    function decode16(string2) {
      var buffer2 = decodeUnsafe(string2);
      if (buffer2) {
        return buffer2;
      }
      throw new Error(`Non-${name8} character`);
    }
    return {
      encode: encode15,
      decodeUnsafe,
      decode: decode16,
    };
  }
  var src = base;
  var _brrp__multiformats_scope_baseX = src;
  var base_x_default = _brrp__multiformats_scope_baseX;

  // node_modules/multiformats/src/bases/base.js
  var Encoder = class {
    constructor(name8, prefix, baseEncode) {
      this.name = name8;
      this.prefix = prefix;
      this.baseEncode = baseEncode;
    }
    encode(bytes) {
      if (bytes instanceof Uint8Array) {
        return `${this.prefix}${this.baseEncode(bytes)}`;
      } else {
        throw Error("Unknown type, must be binary type");
      }
    }
  };
  var Decoder = class {
    constructor(name8, prefix, baseDecode) {
      this.name = name8;
      this.prefix = prefix;
      if (prefix.codePointAt(0) === void 0) {
        throw new Error("Invalid prefix character");
      }
      this.prefixCodePoint = prefix.codePointAt(0);
      this.baseDecode = baseDecode;
    }
    decode(text) {
      if (typeof text === "string") {
        if (text.codePointAt(0) !== this.prefixCodePoint) {
          throw Error(
            `Unable to decode multibase string ${JSON.stringify(text)}, ${
              this.name
            } decoder only supports inputs prefixed with ${this.prefix}`
          );
        }
        return this.baseDecode(text.slice(this.prefix.length));
      } else {
        throw Error("Can only multibase decode strings");
      }
    }
    or(decoder) {
      return or(this, decoder);
    }
  };
  var ComposedDecoder = class {
    constructor(decoders2) {
      this.decoders = decoders2;
    }
    or(decoder) {
      return or(this, decoder);
    }
    decode(input) {
      const prefix = input[0];
      const decoder = this.decoders[prefix];
      if (decoder) {
        return decoder.decode(input);
      } else {
        throw RangeError(
          `Unable to decode multibase string ${JSON.stringify(
            input
          )}, only inputs prefixed with ${Object.keys(
            this.decoders
          )} are supported`
        );
      }
    }
  };
  var or = (left, right) =>
    new ComposedDecoder({
      ...(left.decoders || { [left.prefix]: left }),
      ...(right.decoders || { [right.prefix]: right }),
    });
  var Codec = class {
    constructor(name8, prefix, baseEncode, baseDecode) {
      this.name = name8;
      this.prefix = prefix;
      this.baseEncode = baseEncode;
      this.baseDecode = baseDecode;
      this.encoder = new Encoder(name8, prefix, baseEncode);
      this.decoder = new Decoder(name8, prefix, baseDecode);
    }
    encode(input) {
      return this.encoder.encode(input);
    }
    decode(input) {
      return this.decoder.decode(input);
    }
  };
  var from = ({ name: name8, prefix, encode: encode15, decode: decode16 }) =>
    new Codec(name8, prefix, encode15, decode16);
  var baseX = ({ prefix, name: name8, alphabet: alphabet2 }) => {
    const { encode: encode15, decode: decode16 } = base_x_default(
      alphabet2,
      name8
    );
    return from({
      prefix,
      name: name8,
      encode: encode15,
      decode: (text) => coerce(decode16(text)),
    });
  };
  var decode4 = (string2, alphabet2, bitsPerChar, name8) => {
    const codes2 = {};
    for (let i = 0; i < alphabet2.length; ++i) {
      codes2[alphabet2[i]] = i;
    }
    let end = string2.length;
    while (string2[end - 1] === "=") {
      --end;
    }
    const out = new Uint8Array(((end * bitsPerChar) / 8) | 0);
    let bits = 0;
    let buffer2 = 0;
    let written = 0;
    for (let i = 0; i < end; ++i) {
      const value = codes2[string2[i]];
      if (value === void 0) {
        throw new SyntaxError(`Non-${name8} character`);
      }
      buffer2 = (buffer2 << bitsPerChar) | value;
      bits += bitsPerChar;
      if (bits >= 8) {
        bits -= 8;
        out[written++] = 255 & (buffer2 >> bits);
      }
    }
    if (bits >= bitsPerChar || 255 & (buffer2 << (8 - bits))) {
      throw new SyntaxError("Unexpected end of data");
    }
    return out;
  };
  var encode2 = (data, alphabet2, bitsPerChar) => {
    const pad = alphabet2[alphabet2.length - 1] === "=";
    const mask = (1 << bitsPerChar) - 1;
    let out = "";
    let bits = 0;
    let buffer2 = 0;
    for (let i = 0; i < data.length; ++i) {
      buffer2 = (buffer2 << 8) | data[i];
      bits += 8;
      while (bits > bitsPerChar) {
        bits -= bitsPerChar;
        out += alphabet2[mask & (buffer2 >> bits)];
      }
    }
    if (bits) {
      out += alphabet2[mask & (buffer2 << (bitsPerChar - bits))];
    }
    if (pad) {
      while ((out.length * bitsPerChar) & 7) {
        out += "=";
      }
    }
    return out;
  };
  var rfc4648 = ({ name: name8, prefix, bitsPerChar, alphabet: alphabet2 }) => {
    return from({
      prefix,
      name: name8,
      encode(input) {
        return encode2(input, alphabet2, bitsPerChar);
      },
      decode(input) {
        return decode4(input, alphabet2, bitsPerChar, name8);
      },
    });
  };

  // node_modules/multiformats/src/bases/base58.js
  var base58btc = baseX({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
  });
  var base58flickr = baseX({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
  });

  // node_modules/multiformats/src/bases/base32.js
  var base32_exports = {};
  __export(base32_exports, {
    base32: () => base32,
    base32hex: () => base32hex,
    base32hexpad: () => base32hexpad,
    base32hexpadupper: () => base32hexpadupper,
    base32hexupper: () => base32hexupper,
    base32pad: () => base32pad,
    base32padupper: () => base32padupper,
    base32upper: () => base32upper,
    base32z: () => base32z,
  });
  var base32 = rfc4648({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5,
  });
  var base32upper = rfc4648({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5,
  });
  var base32pad = rfc4648({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5,
  });
  var base32padupper = rfc4648({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5,
  });
  var base32hex = rfc4648({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5,
  });
  var base32hexupper = rfc4648({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5,
  });
  var base32hexpad = rfc4648({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5,
  });
  var base32hexpadupper = rfc4648({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5,
  });
  var base32z = rfc4648({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5,
  });

  // node_modules/multiformats/src/cid.js
  var format = (link, base3) => {
    const { bytes, version } = link;
    switch (version) {
      case 0:
        return toStringV0(bytes, baseCache(link), base3 || base58btc.encoder);
      default:
        return toStringV1(bytes, baseCache(link), base3 || base32.encoder);
    }
  };
  var cache = /* @__PURE__ */ new WeakMap();
  var baseCache = (cid) => {
    const baseCache2 = cache.get(cid);
    if (baseCache2 == null) {
      const baseCache3 = /* @__PURE__ */ new Map();
      cache.set(cid, baseCache3);
      return baseCache3;
    }
    return baseCache2;
  };
  var CID = class {
    constructor(version, code8, multihash, bytes) {
      this.code = code8;
      this.version = version;
      this.multihash = multihash;
      this.bytes = bytes;
      this["/"] = bytes;
    }
    get asCID() {
      return this;
    }
    get byteOffset() {
      return this.bytes.byteOffset;
    }
    get byteLength() {
      return this.bytes.byteLength;
    }
    toV0() {
      switch (this.version) {
        case 0: {
          return this;
        }
        case 1: {
          const { code: code8, multihash } = this;
          if (code8 !== DAG_PB_CODE) {
            throw new Error("Cannot convert a non dag-pb CID to CIDv0");
          }
          if (multihash.code !== SHA_256_CODE) {
            throw new Error(
              "Cannot convert non sha2-256 multihash CID to CIDv0"
            );
          }
          return CID.createV0(multihash);
        }
        default: {
          throw Error(
            `Can not convert CID version ${this.version} to version 0. This is a bug please report`
          );
        }
      }
    }
    toV1() {
      switch (this.version) {
        case 0: {
          const { code: code8, digest: digest2 } = this.multihash;
          const multihash = create(code8, digest2);
          return CID.createV1(this.code, multihash);
        }
        case 1: {
          return this;
        }
        default: {
          throw Error(
            `Can not convert CID version ${this.version} to version 1. This is a bug please report`
          );
        }
      }
    }
    equals(other) {
      return CID.equals(this, other);
    }
    static equals(self2, other) {
      const unknown = other;
      return (
        unknown &&
        self2.code === unknown.code &&
        self2.version === unknown.version &&
        equals2(self2.multihash, unknown.multihash)
      );
    }
    toString(base3) {
      return format(this, base3);
    }
    toJSON() {
      return {
        code: this.code,
        version: this.version,
        hash: this.multihash.bytes,
      };
    }
    link() {
      return this;
    }
    get [Symbol.toStringTag]() {
      return "CID";
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
      return `CID(${this.toString()})`;
    }
    static asCID(input) {
      if (input == null) {
        return null;
      }
      const value = input;
      if (value instanceof CID) {
        return value;
      } else if (
        (value["/"] != null && value["/"] === value.bytes) ||
        value.asCID === value
      ) {
        const { version, code: code8, multihash, bytes } = value;
        return new CID(
          version,
          code8,
          multihash,
          bytes || encodeCID(version, code8, multihash.bytes)
        );
      } else if (value[cidSymbol] === true) {
        const { version, multihash, code: code8 } = value;
        const digest2 = decode3(multihash);
        return CID.create(version, code8, digest2);
      } else {
        return null;
      }
    }
    static create(version, code8, digest2) {
      if (typeof code8 !== "number") {
        throw new Error("String codecs are no longer supported");
      }
      if (!(digest2.bytes instanceof Uint8Array)) {
        throw new Error("Invalid digest");
      }
      switch (version) {
        case 0: {
          if (code8 !== DAG_PB_CODE) {
            throw new Error(
              `Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`
            );
          } else {
            return new CID(version, code8, digest2, digest2.bytes);
          }
        }
        case 1: {
          const bytes = encodeCID(version, code8, digest2.bytes);
          return new CID(version, code8, digest2, bytes);
        }
        default: {
          throw new Error("Invalid version");
        }
      }
    }
    static createV0(digest2) {
      return CID.create(0, DAG_PB_CODE, digest2);
    }
    static createV1(code8, digest2) {
      return CID.create(1, code8, digest2);
    }
    static decode(bytes) {
      const [cid, remainder] = CID.decodeFirst(bytes);
      if (remainder.length) {
        throw new Error("Incorrect length");
      }
      return cid;
    }
    static decodeFirst(bytes) {
      const specs = CID.inspectBytes(bytes);
      const prefixSize = specs.size - specs.multihashSize;
      const multihashBytes = coerce(
        bytes.subarray(prefixSize, prefixSize + specs.multihashSize)
      );
      if (multihashBytes.byteLength !== specs.multihashSize) {
        throw new Error("Incorrect length");
      }
      const digestBytes = multihashBytes.subarray(
        specs.multihashSize - specs.digestSize
      );
      const digest2 = new Digest(
        specs.multihashCode,
        specs.digestSize,
        digestBytes,
        multihashBytes
      );
      const cid =
        specs.version === 0
          ? CID.createV0(digest2)
          : CID.createV1(specs.codec, digest2);
      return [cid, bytes.subarray(specs.size)];
    }
    static inspectBytes(initialBytes) {
      let offset = 0;
      const next = () => {
        const [i, length2] = decode2(initialBytes.subarray(offset));
        offset += length2;
        return i;
      };
      let version = next();
      let codec = DAG_PB_CODE;
      if (version === 18) {
        version = 0;
        offset = 0;
      } else {
        codec = next();
      }
      if (version !== 0 && version !== 1) {
        throw new RangeError(`Invalid CID version ${version}`);
      }
      const prefixSize = offset;
      const multihashCode = next();
      const digestSize = next();
      const size = offset + digestSize;
      const multihashSize = size - prefixSize;
      return { version, codec, multihashCode, digestSize, multihashSize, size };
    }
    static parse(source, base3) {
      const [prefix, bytes] = parseCIDtoBytes(source, base3);
      const cid = CID.decode(bytes);
      baseCache(cid).set(prefix, source);
      return cid;
    }
  };
  var parseCIDtoBytes = (source, base3) => {
    switch (source[0]) {
      case "Q": {
        const decoder = base3 || base58btc;
        return [
          base58btc.prefix,
          decoder.decode(`${base58btc.prefix}${source}`),
        ];
      }
      case base58btc.prefix: {
        const decoder = base3 || base58btc;
        return [base58btc.prefix, decoder.decode(source)];
      }
      case base32.prefix: {
        const decoder = base3 || base32;
        return [base32.prefix, decoder.decode(source)];
      }
      default: {
        if (base3 == null) {
          throw Error(
            "To parse non base32 or base58btc encoded CID multibase decoder must be provided"
          );
        }
        return [source[0], base3.decode(source)];
      }
    }
  };
  var toStringV0 = (bytes, cache2, base3) => {
    const { prefix } = base3;
    if (prefix !== base58btc.prefix) {
      throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
    }
    const cid = cache2.get(prefix);
    if (cid == null) {
      const cid2 = base3.encode(bytes).slice(1);
      cache2.set(prefix, cid2);
      return cid2;
    } else {
      return cid;
    }
  };
  var toStringV1 = (bytes, cache2, base3) => {
    const { prefix } = base3;
    const cid = cache2.get(prefix);
    if (cid == null) {
      const cid2 = base3.encode(bytes);
      cache2.set(prefix, cid2);
      return cid2;
    } else {
      return cid;
    }
  };
  var DAG_PB_CODE = 112;
  var SHA_256_CODE = 18;
  var encodeCID = (version, code8, multihash) => {
    const codeOffset = encodingLength(version);
    const hashOffset = codeOffset + encodingLength(code8);
    const bytes = new Uint8Array(hashOffset + multihash.byteLength);
    encodeTo(version, bytes, 0);
    encodeTo(code8, bytes, codeOffset);
    bytes.set(multihash, hashOffset);
    return bytes;
  };
  var cidSymbol = Symbol.for("@ipld/js-cid/CID");

  // node_modules/@ipld/dag-pb/src/pb-decode.js
  var textDecoder = new TextDecoder();
  function decodeVarint(bytes, offset) {
    let v = 0;
    for (let shift = 0; ; shift += 7) {
      if (shift >= 64) {
        throw new Error("protobuf: varint overflow");
      }
      if (offset >= bytes.length) {
        throw new Error("protobuf: unexpected end of data");
      }
      const b = bytes[offset++];
      v += shift < 28 ? (b & 127) << shift : (b & 127) * 2 ** shift;
      if (b < 128) {
        break;
      }
    }
    return [v, offset];
  }
  function decodeBytes(bytes, offset) {
    let byteLen;
    [byteLen, offset] = decodeVarint(bytes, offset);
    const postOffset = offset + byteLen;
    if (byteLen < 0 || postOffset < 0) {
      throw new Error("protobuf: invalid length");
    }
    if (postOffset > bytes.length) {
      throw new Error("protobuf: unexpected end of data");
    }
    return [bytes.subarray(offset, postOffset), postOffset];
  }
  function decodeKey(bytes, index) {
    let wire;
    [wire, index] = decodeVarint(bytes, index);
    return [wire & 7, wire >> 3, index];
  }
  function decodeLink(bytes) {
    const link = {};
    const l = bytes.length;
    let index = 0;
    while (index < l) {
      let wireType, fieldNum;
      [wireType, fieldNum, index] = decodeKey(bytes, index);
      if (fieldNum === 1) {
        if (link.Hash) {
          throw new Error("protobuf: (PBLink) duplicate Hash section");
        }
        if (wireType !== 2) {
          throw new Error(
            `protobuf: (PBLink) wrong wireType (${wireType}) for Hash`
          );
        }
        if (link.Name !== void 0) {
          throw new Error(
            "protobuf: (PBLink) invalid order, found Name before Hash"
          );
        }
        if (link.Tsize !== void 0) {
          throw new Error(
            "protobuf: (PBLink) invalid order, found Tsize before Hash"
          );
        }
        [link.Hash, index] = decodeBytes(bytes, index);
      } else if (fieldNum === 2) {
        if (link.Name !== void 0) {
          throw new Error("protobuf: (PBLink) duplicate Name section");
        }
        if (wireType !== 2) {
          throw new Error(
            `protobuf: (PBLink) wrong wireType (${wireType}) for Name`
          );
        }
        if (link.Tsize !== void 0) {
          throw new Error(
            "protobuf: (PBLink) invalid order, found Tsize before Name"
          );
        }
        let byts;
        [byts, index] = decodeBytes(bytes, index);
        link.Name = textDecoder.decode(byts);
      } else if (fieldNum === 3) {
        if (link.Tsize !== void 0) {
          throw new Error("protobuf: (PBLink) duplicate Tsize section");
        }
        if (wireType !== 0) {
          throw new Error(
            `protobuf: (PBLink) wrong wireType (${wireType}) for Tsize`
          );
        }
        [link.Tsize, index] = decodeVarint(bytes, index);
      } else {
        throw new Error(
          `protobuf: (PBLink) invalid fieldNumber, expected 1, 2 or 3, got ${fieldNum}`
        );
      }
    }
    if (index > l) {
      throw new Error("protobuf: (PBLink) unexpected end of data");
    }
    return link;
  }
  function decodeNode(bytes) {
    const l = bytes.length;
    let index = 0;
    let links;
    let linksBeforeData = false;
    let data;
    while (index < l) {
      let wireType, fieldNum;
      [wireType, fieldNum, index] = decodeKey(bytes, index);
      if (wireType !== 2) {
        throw new Error(
          `protobuf: (PBNode) invalid wireType, expected 2, got ${wireType}`
        );
      }
      if (fieldNum === 1) {
        if (data) {
          throw new Error("protobuf: (PBNode) duplicate Data section");
        }
        [data, index] = decodeBytes(bytes, index);
        if (links) {
          linksBeforeData = true;
        }
      } else if (fieldNum === 2) {
        if (linksBeforeData) {
          throw new Error("protobuf: (PBNode) duplicate Links section");
        } else if (!links) {
          links = [];
        }
        let byts;
        [byts, index] = decodeBytes(bytes, index);
        links.push(decodeLink(byts));
      } else {
        throw new Error(
          `protobuf: (PBNode) invalid fieldNumber, expected 1 or 2, got ${fieldNum}`
        );
      }
    }
    if (index > l) {
      throw new Error("protobuf: (PBNode) unexpected end of data");
    }
    const node = {};
    if (data) {
      node.Data = data;
    }
    node.Links = links || [];
    return node;
  }

  // node_modules/@ipld/dag-pb/src/pb-encode.js
  var textEncoder = new TextEncoder();
  var maxInt32 = 2 ** 32;
  var maxUInt32 = 2 ** 31;
  function encodeLink(link, bytes) {
    let i = bytes.length;
    if (typeof link.Tsize === "number") {
      if (link.Tsize < 0) {
        throw new Error("Tsize cannot be negative");
      }
      if (!Number.isSafeInteger(link.Tsize)) {
        throw new Error("Tsize too large for encoding");
      }
      i = encodeVarint(bytes, i, link.Tsize) - 1;
      bytes[i] = 24;
    }
    if (typeof link.Name === "string") {
      const nameBytes = textEncoder.encode(link.Name);
      i -= nameBytes.length;
      bytes.set(nameBytes, i);
      i = encodeVarint(bytes, i, nameBytes.length) - 1;
      bytes[i] = 18;
    }
    if (link.Hash) {
      i -= link.Hash.length;
      bytes.set(link.Hash, i);
      i = encodeVarint(bytes, i, link.Hash.length) - 1;
      bytes[i] = 10;
    }
    return bytes.length - i;
  }
  function encodeNode(node) {
    const size = sizeNode(node);
    const bytes = new Uint8Array(size);
    let i = size;
    if (node.Data) {
      i -= node.Data.length;
      bytes.set(node.Data, i);
      i = encodeVarint(bytes, i, node.Data.length) - 1;
      bytes[i] = 10;
    }
    if (node.Links) {
      for (let index = node.Links.length - 1; index >= 0; index--) {
        const size2 = encodeLink(node.Links[index], bytes.subarray(0, i));
        i -= size2;
        i = encodeVarint(bytes, i, size2) - 1;
        bytes[i] = 18;
      }
    }
    return bytes;
  }
  function sizeLink(link) {
    let n = 0;
    if (link.Hash) {
      const l = link.Hash.length;
      n += 1 + l + sov(l);
    }
    if (typeof link.Name === "string") {
      const l = textEncoder.encode(link.Name).length;
      n += 1 + l + sov(l);
    }
    if (typeof link.Tsize === "number") {
      n += 1 + sov(link.Tsize);
    }
    return n;
  }
  function sizeNode(node) {
    let n = 0;
    if (node.Data) {
      const l = node.Data.length;
      n += 1 + l + sov(l);
    }
    if (node.Links) {
      for (const link of node.Links) {
        const l = sizeLink(link);
        n += 1 + l + sov(l);
      }
    }
    return n;
  }
  function encodeVarint(bytes, offset, v) {
    offset -= sov(v);
    const base3 = offset;
    while (v >= maxUInt32) {
      bytes[offset++] = (v & 127) | 128;
      v /= 128;
    }
    while (v >= 128) {
      bytes[offset++] = (v & 127) | 128;
      v >>>= 7;
    }
    bytes[offset] = v;
    return base3;
  }
  function sov(x) {
    if (x % 2 === 0) {
      x++;
    }
    return Math.floor((len64(x) + 6) / 7);
  }
  function len64(x) {
    let n = 0;
    if (x >= maxInt32) {
      x = Math.floor(x / maxInt32);
      n = 32;
    }
    if (x >= 1 << 16) {
      x >>>= 16;
      n += 16;
    }
    if (x >= 1 << 8) {
      x >>>= 8;
      n += 8;
    }
    return n + len8tab[x];
  }
  var len8tab = [
    0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8,
  ];

  // node_modules/@ipld/dag-pb/src/util.js
  var pbNodeProperties = ["Data", "Links"];
  var pbLinkProperties = ["Hash", "Name", "Tsize"];
  var textEncoder2 = new TextEncoder();
  function linkComparator(a, b) {
    if (a === b) {
      return 0;
    }
    const abuf = a.Name ? textEncoder2.encode(a.Name) : [];
    const bbuf = b.Name ? textEncoder2.encode(b.Name) : [];
    let x = abuf.length;
    let y = bbuf.length;
    for (let i = 0, len = Math.min(x, y); i < len; ++i) {
      if (abuf[i] !== bbuf[i]) {
        x = abuf[i];
        y = bbuf[i];
        break;
      }
    }
    return x < y ? -1 : y < x ? 1 : 0;
  }
  function hasOnlyProperties(node, properties) {
    return !Object.keys(node).some((p) => !properties.includes(p));
  }
  function asLink(link) {
    if (typeof link.asCID === "object") {
      const Hash = CID.asCID(link);
      if (!Hash) {
        throw new TypeError("Invalid DAG-PB form");
      }
      return { Hash };
    }
    if (typeof link !== "object" || Array.isArray(link)) {
      throw new TypeError("Invalid DAG-PB form");
    }
    const pbl = {};
    if (link.Hash) {
      let cid = CID.asCID(link.Hash);
      try {
        if (!cid) {
          if (typeof link.Hash === "string") {
            cid = CID.parse(link.Hash);
          } else if (link.Hash instanceof Uint8Array) {
            cid = CID.decode(link.Hash);
          }
        }
      } catch (e) {
        throw new TypeError(`Invalid DAG-PB form: ${e.message}`);
      }
      if (cid) {
        pbl.Hash = cid;
      }
    }
    if (!pbl.Hash) {
      throw new TypeError("Invalid DAG-PB form");
    }
    if (typeof link.Name === "string") {
      pbl.Name = link.Name;
    }
    if (typeof link.Tsize === "number") {
      pbl.Tsize = link.Tsize;
    }
    return pbl;
  }
  function prepare(node) {
    if (node instanceof Uint8Array || typeof node === "string") {
      node = { Data: node };
    }
    if (typeof node !== "object" || Array.isArray(node)) {
      throw new TypeError("Invalid DAG-PB form");
    }
    const pbn = {};
    if (node.Data !== void 0) {
      if (typeof node.Data === "string") {
        pbn.Data = textEncoder2.encode(node.Data);
      } else if (node.Data instanceof Uint8Array) {
        pbn.Data = node.Data;
      } else {
        throw new TypeError("Invalid DAG-PB form");
      }
    }
    if (node.Links !== void 0) {
      if (Array.isArray(node.Links)) {
        pbn.Links = node.Links.map(asLink);
        pbn.Links.sort(linkComparator);
      } else {
        throw new TypeError("Invalid DAG-PB form");
      }
    } else {
      pbn.Links = [];
    }
    return pbn;
  }
  function validate(node) {
    if (!node || typeof node !== "object" || Array.isArray(node)) {
      throw new TypeError("Invalid DAG-PB form");
    }
    if (!hasOnlyProperties(node, pbNodeProperties)) {
      throw new TypeError("Invalid DAG-PB form (extraneous properties)");
    }
    if (node.Data !== void 0 && !(node.Data instanceof Uint8Array)) {
      throw new TypeError("Invalid DAG-PB form (Data must be a Uint8Array)");
    }
    if (!Array.isArray(node.Links)) {
      throw new TypeError("Invalid DAG-PB form (Links must be an array)");
    }
    for (let i = 0; i < node.Links.length; i++) {
      const link = node.Links[i];
      if (!link || typeof link !== "object" || Array.isArray(link)) {
        throw new TypeError("Invalid DAG-PB form (bad link object)");
      }
      if (!hasOnlyProperties(link, pbLinkProperties)) {
        throw new TypeError(
          "Invalid DAG-PB form (extraneous properties on link object)"
        );
      }
      if (!link.Hash) {
        throw new TypeError("Invalid DAG-PB form (link must have a Hash)");
      }
      if (link.Hash.asCID !== link.Hash) {
        throw new TypeError("Invalid DAG-PB form (link Hash must be a CID)");
      }
      if (link.Name !== void 0 && typeof link.Name !== "string") {
        throw new TypeError("Invalid DAG-PB form (link Name must be a string)");
      }
      if (
        link.Tsize !== void 0 &&
        (typeof link.Tsize !== "number" || link.Tsize % 1 !== 0)
      ) {
        throw new TypeError(
          "Invalid DAG-PB form (link Tsize must be an integer)"
        );
      }
      if (i > 0 && linkComparator(link, node.Links[i - 1]) === -1) {
        throw new TypeError(
          "Invalid DAG-PB form (links must be sorted by Name bytes)"
        );
      }
    }
  }
  function createNode(data, links = []) {
    return prepare({ Data: data, Links: links });
  }
  function createLink(name8, size, cid) {
    return asLink({ Hash: cid, Name: name8, Tsize: size });
  }

  // node_modules/@ipld/dag-pb/src/index.js
  var name = "dag-pb";
  var code = 112;
  function encode3(node) {
    validate(node);
    const pbn = {};
    if (node.Links) {
      pbn.Links = node.Links.map((l) => {
        const link = {};
        if (l.Hash) {
          link.Hash = l.Hash.bytes;
        }
        if (l.Name !== void 0) {
          link.Name = l.Name;
        }
        if (l.Tsize !== void 0) {
          link.Tsize = l.Tsize;
        }
        return link;
      });
    }
    if (node.Data) {
      pbn.Data = node.Data;
    }
    return encodeNode(pbn);
  }
  function decode5(bytes) {
    const pbn = decodeNode(bytes);
    const node = {};
    if (pbn.Data) {
      node.Data = pbn.Data;
    }
    if (pbn.Links) {
      node.Links = pbn.Links.map((l) => {
        const link = {};
        try {
          link.Hash = CID.decode(l.Hash);
        } catch (e) {}
        if (!link.Hash) {
          throw new Error("Invalid Hash field found in link, expected CID");
        }
        if (l.Name !== void 0) {
          link.Name = l.Name;
        }
        if (l.Tsize !== void 0) {
          link.Tsize = l.Tsize;
        }
        return link;
      });
    }
    return node;
  }

  // node_modules/@ipld/dag-cbor/src/index.js
  var src_exports2 = {};
  __export(src_exports2, {
    code: () => code2,
    decode: () => decode7,
    encode: () => encode5,
    name: () => name2,
  });

  // node_modules/cborg/esm/lib/is.js
  var typeofs = ["string", "number", "bigint", "symbol"];
  var objectTypeNames = [
    "Function",
    "Generator",
    "AsyncGenerator",
    "GeneratorFunction",
    "AsyncGeneratorFunction",
    "AsyncFunction",
    "Observable",
    "Array",
    "Buffer",
    "Object",
    "RegExp",
    "Date",
    "Error",
    "Map",
    "Set",
    "WeakMap",
    "WeakSet",
    "ArrayBuffer",
    "SharedArrayBuffer",
    "DataView",
    "Promise",
    "URL",
    "HTMLElement",
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Uint16Array",
    "Int32Array",
    "Uint32Array",
    "Float32Array",
    "Float64Array",
    "BigInt64Array",
    "BigUint64Array",
  ];
  function is(value) {
    if (value === null) {
      return "null";
    }
    if (value === void 0) {
      return "undefined";
    }
    if (value === true || value === false) {
      return "boolean";
    }
    const typeOf2 = typeof value;
    if (typeofs.includes(typeOf2)) {
      return typeOf2;
    }
    if (typeOf2 === "function") {
      return "Function";
    }
    if (Array.isArray(value)) {
      return "Array";
    }
    if (isBuffer(value)) {
      return "Buffer";
    }
    const objectType = getObjectType(value);
    if (objectType) {
      return objectType;
    }
    return "Object";
  }
  function isBuffer(value) {
    return (
      value &&
      value.constructor &&
      value.constructor.isBuffer &&
      value.constructor.isBuffer.call(null, value)
    );
  }
  function getObjectType(value) {
    const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);
    if (objectTypeNames.includes(objectTypeName)) {
      return objectTypeName;
    }
    return void 0;
  }

  // node_modules/cborg/esm/lib/token.js
  var Type = class {
    constructor(major, name8, terminal) {
      this.major = major;
      this.majorEncoded = major << 5;
      this.name = name8;
      this.terminal = terminal;
    }
    toString() {
      return `Type[${this.major}].${this.name}`;
    }
    compare(typ) {
      return this.major < typ.major ? -1 : this.major > typ.major ? 1 : 0;
    }
  };
  Type.uint = new Type(0, "uint", true);
  Type.negint = new Type(1, "negint", true);
  Type.bytes = new Type(2, "bytes", true);
  Type.string = new Type(3, "string", true);
  Type.array = new Type(4, "array", false);
  Type.map = new Type(5, "map", false);
  Type.tag = new Type(6, "tag", false);
  Type.float = new Type(7, "float", true);
  Type.false = new Type(7, "false", true);
  Type.true = new Type(7, "true", true);
  Type.null = new Type(7, "null", true);
  Type.undefined = new Type(7, "undefined", true);
  Type.break = new Type(7, "break", true);
  var Token = class {
    constructor(type, value, encodedLength) {
      this.type = type;
      this.value = value;
      this.encodedLength = encodedLength;
      this.encodedBytes = void 0;
      this.byteValue = void 0;
    }
    toString() {
      return `Token[${this.type}].${this.value}`;
    }
  };

  // node_modules/cborg/esm/lib/byte-utils.js
  var useBuffer =
    globalThis.process &&
    !globalThis.process.browser &&
    globalThis.Buffer &&
    typeof globalThis.Buffer.isBuffer === "function";
  var textDecoder2 = new TextDecoder();
  var textEncoder3 = new TextEncoder();
  function isBuffer2(buf2) {
    return useBuffer && globalThis.Buffer.isBuffer(buf2);
  }
  function asU8A(buf2) {
    if (!(buf2 instanceof Uint8Array)) {
      return Uint8Array.from(buf2);
    }
    return isBuffer2(buf2)
      ? new Uint8Array(buf2.buffer, buf2.byteOffset, buf2.byteLength)
      : buf2;
  }
  var toString2 = useBuffer
    ? (bytes, start, end) => {
        return end - start > 64
          ? globalThis.Buffer.from(bytes.subarray(start, end)).toString("utf8")
          : utf8Slice(bytes, start, end);
      }
    : (bytes, start, end) => {
        return end - start > 64
          ? textDecoder2.decode(bytes.subarray(start, end))
          : utf8Slice(bytes, start, end);
      };
  var fromString2 = useBuffer
    ? (string2) => {
        return string2.length > 64
          ? globalThis.Buffer.from(string2)
          : utf8ToBytes(string2);
      }
    : (string2) => {
        return string2.length > 64
          ? textEncoder3.encode(string2)
          : utf8ToBytes(string2);
      };
  var fromArray = (arr) => {
    return Uint8Array.from(arr);
  };
  var slice = useBuffer
    ? (bytes, start, end) => {
        if (isBuffer2(bytes)) {
          return new Uint8Array(bytes.subarray(start, end));
        }
        return bytes.slice(start, end);
      }
    : (bytes, start, end) => {
        return bytes.slice(start, end);
      };
  var concat = useBuffer
    ? (chunks, length2) => {
        chunks = chunks.map((c) =>
          c instanceof Uint8Array ? c : globalThis.Buffer.from(c)
        );
        return asU8A(globalThis.Buffer.concat(chunks, length2));
      }
    : (chunks, length2) => {
        const out = new Uint8Array(length2);
        let off = 0;
        for (let b of chunks) {
          if (off + b.length > out.length) {
            b = b.subarray(0, out.length - off);
          }
          out.set(b, off);
          off += b.length;
        }
        return out;
      };
  var alloc = useBuffer
    ? (size) => {
        return globalThis.Buffer.allocUnsafe(size);
      }
    : (size) => {
        return new Uint8Array(size);
      };
  function compare(b1, b2) {
    if (isBuffer2(b1) && isBuffer2(b2)) {
      return b1.compare(b2);
    }
    for (let i = 0; i < b1.length; i++) {
      if (b1[i] === b2[i]) {
        continue;
      }
      return b1[i] < b2[i] ? -1 : 1;
    }
    return 0;
  }
  function utf8ToBytes(string2, units = Infinity) {
    let codePoint;
    const length2 = string2.length;
    let leadSurrogate = null;
    const bytes = [];
    for (let i = 0; i < length2; ++i) {
      codePoint = string2.charCodeAt(i);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          } else if (i + 1 === length2) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint =
          (((leadSurrogate - 55296) << 10) | (codePoint - 56320)) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1) bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0) break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0) break;
        bytes.push((codePoint >> 6) | 192, (codePoint & 63) | 128);
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0) break;
        bytes.push(
          (codePoint >> 12) | 224,
          ((codePoint >> 6) & 63) | 128,
          (codePoint & 63) | 128
        );
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0) break;
        bytes.push(
          (codePoint >> 18) | 240,
          ((codePoint >> 12) & 63) | 128,
          ((codePoint >> 6) & 63) | 128,
          (codePoint & 63) | 128
        );
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function utf8Slice(buf2, offset, end) {
    const res = [];
    while (offset < end) {
      const firstByte = buf2[offset];
      let codePoint = null;
      let bytesPerSequence =
        firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (offset + bytesPerSequence <= end) {
        let secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf2[offset + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = ((firstByte & 31) << 6) | (secondByte & 63);
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf2[offset + 1];
            thirdByte = buf2[offset + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint =
                ((firstByte & 15) << 12) |
                ((secondByte & 63) << 6) |
                (thirdByte & 63);
              if (
                tempCodePoint > 2047 &&
                (tempCodePoint < 55296 || tempCodePoint > 57343)
              ) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf2[offset + 1];
            thirdByte = buf2[offset + 2];
            fourthByte = buf2[offset + 3];
            if (
              (secondByte & 192) === 128 &&
              (thirdByte & 192) === 128 &&
              (fourthByte & 192) === 128
            ) {
              tempCodePoint =
                ((firstByte & 15) << 18) |
                ((secondByte & 63) << 12) |
                ((thirdByte & 63) << 6) |
                (fourthByte & 63);
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(((codePoint >>> 10) & 1023) | 55296);
        codePoint = 56320 | (codePoint & 1023);
      }
      res.push(codePoint);
      offset += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  var MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    let res = "";
    let i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, (i += MAX_ARGUMENTS_LENGTH))
      );
    }
    return res;
  }

  // node_modules/cborg/esm/lib/bl.js
  var defaultChunkSize = 256;
  var Bl = class {
    constructor(chunkSize = defaultChunkSize) {
      this.chunkSize = chunkSize;
      this.cursor = 0;
      this.maxCursor = -1;
      this.chunks = [];
      this._initReuseChunk = null;
    }
    reset() {
      this.cursor = 0;
      this.maxCursor = -1;
      if (this.chunks.length) {
        this.chunks = [];
      }
      if (this._initReuseChunk !== null) {
        this.chunks.push(this._initReuseChunk);
        this.maxCursor = this._initReuseChunk.length - 1;
      }
    }
    push(bytes) {
      let topChunk = this.chunks[this.chunks.length - 1];
      const newMax = this.cursor + bytes.length;
      if (newMax <= this.maxCursor + 1) {
        const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
        topChunk.set(bytes, chunkPos);
      } else {
        if (topChunk) {
          const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
          if (chunkPos < topChunk.length) {
            this.chunks[this.chunks.length - 1] = topChunk.subarray(
              0,
              chunkPos
            );
            this.maxCursor = this.cursor - 1;
          }
        }
        if (bytes.length < 64 && bytes.length < this.chunkSize) {
          topChunk = alloc(this.chunkSize);
          this.chunks.push(topChunk);
          this.maxCursor += topChunk.length;
          if (this._initReuseChunk === null) {
            this._initReuseChunk = topChunk;
          }
          topChunk.set(bytes, 0);
        } else {
          this.chunks.push(bytes);
          this.maxCursor += bytes.length;
        }
      }
      this.cursor += bytes.length;
    }
    toBytes(reset = false) {
      let byts;
      if (this.chunks.length === 1) {
        const chunk = this.chunks[0];
        if (reset && this.cursor > chunk.length / 2) {
          byts =
            this.cursor === chunk.length
              ? chunk
              : chunk.subarray(0, this.cursor);
          this._initReuseChunk = null;
          this.chunks = [];
        } else {
          byts = slice(chunk, 0, this.cursor);
        }
      } else {
        byts = concat(this.chunks, this.cursor);
      }
      if (reset) {
        this.reset();
      }
      return byts;
    }
  };

  // node_modules/cborg/esm/lib/common.js
  var decodeErrPrefix = "CBOR decode error:";
  var encodeErrPrefix = "CBOR encode error:";
  var uintMinorPrefixBytes = [];
  uintMinorPrefixBytes[23] = 1;
  uintMinorPrefixBytes[24] = 2;
  uintMinorPrefixBytes[25] = 3;
  uintMinorPrefixBytes[26] = 5;
  uintMinorPrefixBytes[27] = 9;
  function assertEnoughData(data, pos, need) {
    if (data.length - pos < need) {
      throw new Error(`${decodeErrPrefix} not enough data for type`);
    }
  }

  // node_modules/cborg/esm/lib/0uint.js
  var uintBoundaries = [
    24,
    256,
    65536,
    4294967296,
    BigInt("18446744073709551616"),
  ];
  function readUint8(data, offset, options) {
    assertEnoughData(data, offset, 1);
    const value = data[offset];
    if (options.strict === true && value < uintBoundaries[0]) {
      throw new Error(
        `${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`
      );
    }
    return value;
  }
  function readUint16(data, offset, options) {
    assertEnoughData(data, offset, 2);
    const value = (data[offset] << 8) | data[offset + 1];
    if (options.strict === true && value < uintBoundaries[1]) {
      throw new Error(
        `${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`
      );
    }
    return value;
  }
  function readUint32(data, offset, options) {
    assertEnoughData(data, offset, 4);
    const value =
      data[offset] * 16777216 +
      (data[offset + 1] << 16) +
      (data[offset + 2] << 8) +
      data[offset + 3];
    if (options.strict === true && value < uintBoundaries[2]) {
      throw new Error(
        `${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`
      );
    }
    return value;
  }
  function readUint64(data, offset, options) {
    assertEnoughData(data, offset, 8);
    const hi =
      data[offset] * 16777216 +
      (data[offset + 1] << 16) +
      (data[offset + 2] << 8) +
      data[offset + 3];
    const lo =
      data[offset + 4] * 16777216 +
      (data[offset + 5] << 16) +
      (data[offset + 6] << 8) +
      data[offset + 7];
    const value = (BigInt(hi) << BigInt(32)) + BigInt(lo);
    if (options.strict === true && value < uintBoundaries[3]) {
      throw new Error(
        `${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`
      );
    }
    if (value <= Number.MAX_SAFE_INTEGER) {
      return Number(value);
    }
    if (options.allowBigInt === true) {
      return value;
    }
    throw new Error(
      `${decodeErrPrefix} integers outside of the safe integer range are not supported`
    );
  }
  function decodeUint8(data, pos, _minor, options) {
    return new Token(Type.uint, readUint8(data, pos + 1, options), 2);
  }
  function decodeUint16(data, pos, _minor, options) {
    return new Token(Type.uint, readUint16(data, pos + 1, options), 3);
  }
  function decodeUint32(data, pos, _minor, options) {
    return new Token(Type.uint, readUint32(data, pos + 1, options), 5);
  }
  function decodeUint64(data, pos, _minor, options) {
    return new Token(Type.uint, readUint64(data, pos + 1, options), 9);
  }
  function encodeUint(buf2, token) {
    return encodeUintValue(buf2, 0, token.value);
  }
  function encodeUintValue(buf2, major, uint) {
    if (uint < uintBoundaries[0]) {
      const nuint = Number(uint);
      buf2.push([major | nuint]);
    } else if (uint < uintBoundaries[1]) {
      const nuint = Number(uint);
      buf2.push([major | 24, nuint]);
    } else if (uint < uintBoundaries[2]) {
      const nuint = Number(uint);
      buf2.push([major | 25, nuint >>> 8, nuint & 255]);
    } else if (uint < uintBoundaries[3]) {
      const nuint = Number(uint);
      buf2.push([
        major | 26,
        (nuint >>> 24) & 255,
        (nuint >>> 16) & 255,
        (nuint >>> 8) & 255,
        nuint & 255,
      ]);
    } else {
      const buint = BigInt(uint);
      if (buint < uintBoundaries[4]) {
        const set = [major | 27, 0, 0, 0, 0, 0, 0, 0];
        let lo = Number(buint & BigInt(4294967295));
        let hi = Number((buint >> BigInt(32)) & BigInt(4294967295));
        set[8] = lo & 255;
        lo = lo >> 8;
        set[7] = lo & 255;
        lo = lo >> 8;
        set[6] = lo & 255;
        lo = lo >> 8;
        set[5] = lo & 255;
        set[4] = hi & 255;
        hi = hi >> 8;
        set[3] = hi & 255;
        hi = hi >> 8;
        set[2] = hi & 255;
        hi = hi >> 8;
        set[1] = hi & 255;
        buf2.push(set);
      } else {
        throw new Error(
          `${decodeErrPrefix} encountered BigInt larger than allowable range`
        );
      }
    }
  }
  encodeUint.encodedSize = function encodedSize(token) {
    return encodeUintValue.encodedSize(token.value);
  };
  encodeUintValue.encodedSize = function encodedSize2(uint) {
    if (uint < uintBoundaries[0]) {
      return 1;
    }
    if (uint < uintBoundaries[1]) {
      return 2;
    }
    if (uint < uintBoundaries[2]) {
      return 3;
    }
    if (uint < uintBoundaries[3]) {
      return 5;
    }
    return 9;
  };
  encodeUint.compareTokens = function compareTokens(tok1, tok2) {
    return tok1.value < tok2.value ? -1 : tok1.value > tok2.value ? 1 : 0;
  };

  // node_modules/cborg/esm/lib/1negint.js
  function decodeNegint8(data, pos, _minor, options) {
    return new Token(Type.negint, -1 - readUint8(data, pos + 1, options), 2);
  }
  function decodeNegint16(data, pos, _minor, options) {
    return new Token(Type.negint, -1 - readUint16(data, pos + 1, options), 3);
  }
  function decodeNegint32(data, pos, _minor, options) {
    return new Token(Type.negint, -1 - readUint32(data, pos + 1, options), 5);
  }
  var neg1b = BigInt(-1);
  var pos1b = BigInt(1);
  function decodeNegint64(data, pos, _minor, options) {
    const int = readUint64(data, pos + 1, options);
    if (typeof int !== "bigint") {
      const value = -1 - int;
      if (value >= Number.MIN_SAFE_INTEGER) {
        return new Token(Type.negint, value, 9);
      }
    }
    if (options.allowBigInt !== true) {
      throw new Error(
        `${decodeErrPrefix} integers outside of the safe integer range are not supported`
      );
    }
    return new Token(Type.negint, neg1b - BigInt(int), 9);
  }
  function encodeNegint(buf2, token) {
    const negint = token.value;
    const unsigned =
      typeof negint === "bigint" ? negint * neg1b - pos1b : negint * -1 - 1;
    encodeUintValue(buf2, token.type.majorEncoded, unsigned);
  }
  encodeNegint.encodedSize = function encodedSize3(token) {
    const negint = token.value;
    const unsigned =
      typeof negint === "bigint" ? negint * neg1b - pos1b : negint * -1 - 1;
    if (unsigned < uintBoundaries[0]) {
      return 1;
    }
    if (unsigned < uintBoundaries[1]) {
      return 2;
    }
    if (unsigned < uintBoundaries[2]) {
      return 3;
    }
    if (unsigned < uintBoundaries[3]) {
      return 5;
    }
    return 9;
  };
  encodeNegint.compareTokens = function compareTokens2(tok1, tok2) {
    return tok1.value < tok2.value ? 1 : tok1.value > tok2.value ? -1 : 0;
  };

  // node_modules/cborg/esm/lib/2bytes.js
  function toToken(data, pos, prefix, length2) {
    assertEnoughData(data, pos, prefix + length2);
    const buf2 = slice(data, pos + prefix, pos + prefix + length2);
    return new Token(Type.bytes, buf2, prefix + length2);
  }
  function decodeBytesCompact(data, pos, minor, _options) {
    return toToken(data, pos, 1, minor);
  }
  function decodeBytes8(data, pos, _minor, options) {
    return toToken(data, pos, 2, readUint8(data, pos + 1, options));
  }
  function decodeBytes16(data, pos, _minor, options) {
    return toToken(data, pos, 3, readUint16(data, pos + 1, options));
  }
  function decodeBytes32(data, pos, _minor, options) {
    return toToken(data, pos, 5, readUint32(data, pos + 1, options));
  }
  function decodeBytes64(data, pos, _minor, options) {
    const l = readUint64(data, pos + 1, options);
    if (typeof l === "bigint") {
      throw new Error(
        `${decodeErrPrefix} 64-bit integer bytes lengths not supported`
      );
    }
    return toToken(data, pos, 9, l);
  }
  function tokenBytes(token) {
    if (token.encodedBytes === void 0) {
      token.encodedBytes =
        token.type === Type.string ? fromString2(token.value) : token.value;
    }
    return token.encodedBytes;
  }
  function encodeBytes(buf2, token) {
    const bytes = tokenBytes(token);
    encodeUintValue(buf2, token.type.majorEncoded, bytes.length);
    buf2.push(bytes);
  }
  encodeBytes.encodedSize = function encodedSize4(token) {
    const bytes = tokenBytes(token);
    return encodeUintValue.encodedSize(bytes.length) + bytes.length;
  };
  encodeBytes.compareTokens = function compareTokens3(tok1, tok2) {
    return compareBytes(tokenBytes(tok1), tokenBytes(tok2));
  };
  function compareBytes(b1, b2) {
    return b1.length < b2.length
      ? -1
      : b1.length > b2.length
      ? 1
      : compare(b1, b2);
  }

  // node_modules/cborg/esm/lib/3string.js
  function toToken2(data, pos, prefix, length2, options) {
    const totLength = prefix + length2;
    assertEnoughData(data, pos, totLength);
    const tok = new Token(
      Type.string,
      toString2(data, pos + prefix, pos + totLength),
      totLength
    );
    if (options.retainStringBytes === true) {
      tok.byteValue = slice(data, pos + prefix, pos + totLength);
    }
    return tok;
  }
  function decodeStringCompact(data, pos, minor, options) {
    return toToken2(data, pos, 1, minor, options);
  }
  function decodeString8(data, pos, _minor, options) {
    return toToken2(data, pos, 2, readUint8(data, pos + 1, options), options);
  }
  function decodeString16(data, pos, _minor, options) {
    return toToken2(data, pos, 3, readUint16(data, pos + 1, options), options);
  }
  function decodeString32(data, pos, _minor, options) {
    return toToken2(data, pos, 5, readUint32(data, pos + 1, options), options);
  }
  function decodeString64(data, pos, _minor, options) {
    const l = readUint64(data, pos + 1, options);
    if (typeof l === "bigint") {
      throw new Error(
        `${decodeErrPrefix} 64-bit integer string lengths not supported`
      );
    }
    return toToken2(data, pos, 9, l, options);
  }
  var encodeString = encodeBytes;

  // node_modules/cborg/esm/lib/4array.js
  function toToken3(_data, _pos, prefix, length2) {
    return new Token(Type.array, length2, prefix);
  }
  function decodeArrayCompact(data, pos, minor, _options) {
    return toToken3(data, pos, 1, minor);
  }
  function decodeArray8(data, pos, _minor, options) {
    return toToken3(data, pos, 2, readUint8(data, pos + 1, options));
  }
  function decodeArray16(data, pos, _minor, options) {
    return toToken3(data, pos, 3, readUint16(data, pos + 1, options));
  }
  function decodeArray32(data, pos, _minor, options) {
    return toToken3(data, pos, 5, readUint32(data, pos + 1, options));
  }
  function decodeArray64(data, pos, _minor, options) {
    const l = readUint64(data, pos + 1, options);
    if (typeof l === "bigint") {
      throw new Error(
        `${decodeErrPrefix} 64-bit integer array lengths not supported`
      );
    }
    return toToken3(data, pos, 9, l);
  }
  function decodeArrayIndefinite(data, pos, _minor, options) {
    if (options.allowIndefinite === false) {
      throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
    }
    return toToken3(data, pos, 1, Infinity);
  }
  function encodeArray(buf2, token) {
    encodeUintValue(buf2, Type.array.majorEncoded, token.value);
  }
  encodeArray.compareTokens = encodeUint.compareTokens;
  encodeArray.encodedSize = function encodedSize5(token) {
    return encodeUintValue.encodedSize(token.value);
  };

  // node_modules/cborg/esm/lib/5map.js
  function toToken4(_data, _pos, prefix, length2) {
    return new Token(Type.map, length2, prefix);
  }
  function decodeMapCompact(data, pos, minor, _options) {
    return toToken4(data, pos, 1, minor);
  }
  function decodeMap8(data, pos, _minor, options) {
    return toToken4(data, pos, 2, readUint8(data, pos + 1, options));
  }
  function decodeMap16(data, pos, _minor, options) {
    return toToken4(data, pos, 3, readUint16(data, pos + 1, options));
  }
  function decodeMap32(data, pos, _minor, options) {
    return toToken4(data, pos, 5, readUint32(data, pos + 1, options));
  }
  function decodeMap64(data, pos, _minor, options) {
    const l = readUint64(data, pos + 1, options);
    if (typeof l === "bigint") {
      throw new Error(
        `${decodeErrPrefix} 64-bit integer map lengths not supported`
      );
    }
    return toToken4(data, pos, 9, l);
  }
  function decodeMapIndefinite(data, pos, _minor, options) {
    if (options.allowIndefinite === false) {
      throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
    }
    return toToken4(data, pos, 1, Infinity);
  }
  function encodeMap(buf2, token) {
    encodeUintValue(buf2, Type.map.majorEncoded, token.value);
  }
  encodeMap.compareTokens = encodeUint.compareTokens;
  encodeMap.encodedSize = function encodedSize6(token) {
    return encodeUintValue.encodedSize(token.value);
  };

  // node_modules/cborg/esm/lib/6tag.js
  function decodeTagCompact(_data, _pos, minor, _options) {
    return new Token(Type.tag, minor, 1);
  }
  function decodeTag8(data, pos, _minor, options) {
    return new Token(Type.tag, readUint8(data, pos + 1, options), 2);
  }
  function decodeTag16(data, pos, _minor, options) {
    return new Token(Type.tag, readUint16(data, pos + 1, options), 3);
  }
  function decodeTag32(data, pos, _minor, options) {
    return new Token(Type.tag, readUint32(data, pos + 1, options), 5);
  }
  function decodeTag64(data, pos, _minor, options) {
    return new Token(Type.tag, readUint64(data, pos + 1, options), 9);
  }
  function encodeTag(buf2, token) {
    encodeUintValue(buf2, Type.tag.majorEncoded, token.value);
  }
  encodeTag.compareTokens = encodeUint.compareTokens;
  encodeTag.encodedSize = function encodedSize7(token) {
    return encodeUintValue.encodedSize(token.value);
  };

  // node_modules/cborg/esm/lib/7float.js
  var MINOR_FALSE = 20;
  var MINOR_TRUE = 21;
  var MINOR_NULL = 22;
  var MINOR_UNDEFINED = 23;
  function decodeUndefined(_data, _pos, _minor, options) {
    if (options.allowUndefined === false) {
      throw new Error(`${decodeErrPrefix} undefined values are not supported`);
    } else if (options.coerceUndefinedToNull === true) {
      return new Token(Type.null, null, 1);
    }
    return new Token(Type.undefined, void 0, 1);
  }
  function decodeBreak(_data, _pos, _minor, options) {
    if (options.allowIndefinite === false) {
      throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
    }
    return new Token(Type.break, void 0, 1);
  }
  function createToken(value, bytes, options) {
    if (options) {
      if (options.allowNaN === false && Number.isNaN(value)) {
        throw new Error(`${decodeErrPrefix} NaN values are not supported`);
      }
      if (
        options.allowInfinity === false &&
        (value === Infinity || value === -Infinity)
      ) {
        throw new Error(`${decodeErrPrefix} Infinity values are not supported`);
      }
    }
    return new Token(Type.float, value, bytes);
  }
  function decodeFloat16(data, pos, _minor, options) {
    return createToken(readFloat16(data, pos + 1), 3, options);
  }
  function decodeFloat32(data, pos, _minor, options) {
    return createToken(readFloat32(data, pos + 1), 5, options);
  }
  function decodeFloat64(data, pos, _minor, options) {
    return createToken(readFloat64(data, pos + 1), 9, options);
  }
  function encodeFloat(buf2, token, options) {
    const float = token.value;
    if (float === false) {
      buf2.push([Type.float.majorEncoded | MINOR_FALSE]);
    } else if (float === true) {
      buf2.push([Type.float.majorEncoded | MINOR_TRUE]);
    } else if (float === null) {
      buf2.push([Type.float.majorEncoded | MINOR_NULL]);
    } else if (float === void 0) {
      buf2.push([Type.float.majorEncoded | MINOR_UNDEFINED]);
    } else {
      let decoded;
      let success = false;
      if (!options || options.float64 !== true) {
        encodeFloat16(float);
        decoded = readFloat16(ui8a, 1);
        if (float === decoded || Number.isNaN(float)) {
          ui8a[0] = 249;
          buf2.push(ui8a.slice(0, 3));
          success = true;
        } else {
          encodeFloat32(float);
          decoded = readFloat32(ui8a, 1);
          if (float === decoded) {
            ui8a[0] = 250;
            buf2.push(ui8a.slice(0, 5));
            success = true;
          }
        }
      }
      if (!success) {
        encodeFloat64(float);
        decoded = readFloat64(ui8a, 1);
        ui8a[0] = 251;
        buf2.push(ui8a.slice(0, 9));
      }
    }
  }
  encodeFloat.encodedSize = function encodedSize8(token, options) {
    const float = token.value;
    if (
      float === false ||
      float === true ||
      float === null ||
      float === void 0
    ) {
      return 1;
    }
    if (!options || options.float64 !== true) {
      encodeFloat16(float);
      let decoded = readFloat16(ui8a, 1);
      if (float === decoded || Number.isNaN(float)) {
        return 3;
      }
      encodeFloat32(float);
      decoded = readFloat32(ui8a, 1);
      if (float === decoded) {
        return 5;
      }
    }
    return 9;
  };
  var buffer = new ArrayBuffer(9);
  var dataView = new DataView(buffer, 1);
  var ui8a = new Uint8Array(buffer, 0);
  function encodeFloat16(inp) {
    if (inp === Infinity) {
      dataView.setUint16(0, 31744, false);
    } else if (inp === -Infinity) {
      dataView.setUint16(0, 64512, false);
    } else if (Number.isNaN(inp)) {
      dataView.setUint16(0, 32256, false);
    } else {
      dataView.setFloat32(0, inp);
      const valu32 = dataView.getUint32(0);
      const exponent = (valu32 & 2139095040) >> 23;
      const mantissa = valu32 & 8388607;
      if (exponent === 255) {
        dataView.setUint16(0, 31744, false);
      } else if (exponent === 0) {
        dataView.setUint16(
          0,
          ((inp & 2147483648) >> 16) | (mantissa >> 13),
          false
        );
      } else {
        const logicalExponent = exponent - 127;
        if (logicalExponent < -24) {
          dataView.setUint16(0, 0);
        } else if (logicalExponent < -14) {
          dataView.setUint16(
            0,
            ((valu32 & 2147483648) >> 16) | (1 << (24 + logicalExponent)),
            false
          );
        } else {
          dataView.setUint16(
            0,
            ((valu32 & 2147483648) >> 16) |
              ((logicalExponent + 15) << 10) |
              (mantissa >> 13),
            false
          );
        }
      }
    }
  }
  function readFloat16(ui8a2, pos) {
    if (ui8a2.length - pos < 2) {
      throw new Error(`${decodeErrPrefix} not enough data for float16`);
    }
    const half = (ui8a2[pos] << 8) + ui8a2[pos + 1];
    if (half === 31744) {
      return Infinity;
    }
    if (half === 64512) {
      return -Infinity;
    }
    if (half === 32256) {
      return NaN;
    }
    const exp = (half >> 10) & 31;
    const mant = half & 1023;
    let val;
    if (exp === 0) {
      val = mant * 2 ** -24;
    } else if (exp !== 31) {
      val = (mant + 1024) * 2 ** (exp - 25);
    } else {
      val = mant === 0 ? Infinity : NaN;
    }
    return half & 32768 ? -val : val;
  }
  function encodeFloat32(inp) {
    dataView.setFloat32(0, inp, false);
  }
  function readFloat32(ui8a2, pos) {
    if (ui8a2.length - pos < 4) {
      throw new Error(`${decodeErrPrefix} not enough data for float32`);
    }
    const offset = (ui8a2.byteOffset || 0) + pos;
    return new DataView(ui8a2.buffer, offset, 4).getFloat32(0, false);
  }
  function encodeFloat64(inp) {
    dataView.setFloat64(0, inp, false);
  }
  function readFloat64(ui8a2, pos) {
    if (ui8a2.length - pos < 8) {
      throw new Error(`${decodeErrPrefix} not enough data for float64`);
    }
    const offset = (ui8a2.byteOffset || 0) + pos;
    return new DataView(ui8a2.buffer, offset, 8).getFloat64(0, false);
  }
  encodeFloat.compareTokens = encodeUint.compareTokens;

  // node_modules/cborg/esm/lib/jump.js
  function invalidMinor(data, pos, minor) {
    throw new Error(
      `${decodeErrPrefix} encountered invalid minor (${minor}) for major ${
        data[pos] >>> 5
      }`
    );
  }
  function errorer(msg) {
    return () => {
      throw new Error(`${decodeErrPrefix} ${msg}`);
    };
  }
  var jump = [];
  for (let i = 0; i <= 23; i++) {
    jump[i] = invalidMinor;
  }
  jump[24] = decodeUint8;
  jump[25] = decodeUint16;
  jump[26] = decodeUint32;
  jump[27] = decodeUint64;
  jump[28] = invalidMinor;
  jump[29] = invalidMinor;
  jump[30] = invalidMinor;
  jump[31] = invalidMinor;
  for (let i = 32; i <= 55; i++) {
    jump[i] = invalidMinor;
  }
  jump[56] = decodeNegint8;
  jump[57] = decodeNegint16;
  jump[58] = decodeNegint32;
  jump[59] = decodeNegint64;
  jump[60] = invalidMinor;
  jump[61] = invalidMinor;
  jump[62] = invalidMinor;
  jump[63] = invalidMinor;
  for (let i = 64; i <= 87; i++) {
    jump[i] = decodeBytesCompact;
  }
  jump[88] = decodeBytes8;
  jump[89] = decodeBytes16;
  jump[90] = decodeBytes32;
  jump[91] = decodeBytes64;
  jump[92] = invalidMinor;
  jump[93] = invalidMinor;
  jump[94] = invalidMinor;
  jump[95] = errorer("indefinite length bytes/strings are not supported");
  for (let i = 96; i <= 119; i++) {
    jump[i] = decodeStringCompact;
  }
  jump[120] = decodeString8;
  jump[121] = decodeString16;
  jump[122] = decodeString32;
  jump[123] = decodeString64;
  jump[124] = invalidMinor;
  jump[125] = invalidMinor;
  jump[126] = invalidMinor;
  jump[127] = errorer("indefinite length bytes/strings are not supported");
  for (let i = 128; i <= 151; i++) {
    jump[i] = decodeArrayCompact;
  }
  jump[152] = decodeArray8;
  jump[153] = decodeArray16;
  jump[154] = decodeArray32;
  jump[155] = decodeArray64;
  jump[156] = invalidMinor;
  jump[157] = invalidMinor;
  jump[158] = invalidMinor;
  jump[159] = decodeArrayIndefinite;
  for (let i = 160; i <= 183; i++) {
    jump[i] = decodeMapCompact;
  }
  jump[184] = decodeMap8;
  jump[185] = decodeMap16;
  jump[186] = decodeMap32;
  jump[187] = decodeMap64;
  jump[188] = invalidMinor;
  jump[189] = invalidMinor;
  jump[190] = invalidMinor;
  jump[191] = decodeMapIndefinite;
  for (let i = 192; i <= 215; i++) {
    jump[i] = decodeTagCompact;
  }
  jump[216] = decodeTag8;
  jump[217] = decodeTag16;
  jump[218] = decodeTag32;
  jump[219] = decodeTag64;
  jump[220] = invalidMinor;
  jump[221] = invalidMinor;
  jump[222] = invalidMinor;
  jump[223] = invalidMinor;
  for (let i = 224; i <= 243; i++) {
    jump[i] = errorer("simple values are not supported");
  }
  jump[244] = invalidMinor;
  jump[245] = invalidMinor;
  jump[246] = invalidMinor;
  jump[247] = decodeUndefined;
  jump[248] = errorer("simple values are not supported");
  jump[249] = decodeFloat16;
  jump[250] = decodeFloat32;
  jump[251] = decodeFloat64;
  jump[252] = invalidMinor;
  jump[253] = invalidMinor;
  jump[254] = invalidMinor;
  jump[255] = decodeBreak;
  var quick = [];
  for (let i = 0; i < 24; i++) {
    quick[i] = new Token(Type.uint, i, 1);
  }
  for (let i = -1; i >= -24; i--) {
    quick[31 - i] = new Token(Type.negint, i, 1);
  }
  quick[64] = new Token(Type.bytes, new Uint8Array(0), 1);
  quick[96] = new Token(Type.string, "", 1);
  quick[128] = new Token(Type.array, 0, 1);
  quick[160] = new Token(Type.map, 0, 1);
  quick[244] = new Token(Type.false, false, 1);
  quick[245] = new Token(Type.true, true, 1);
  quick[246] = new Token(Type.null, null, 1);
  function quickEncodeToken(token) {
    switch (token.type) {
      case Type.false:
        return fromArray([244]);
      case Type.true:
        return fromArray([245]);
      case Type.null:
        return fromArray([246]);
      case Type.bytes:
        if (!token.value.length) {
          return fromArray([64]);
        }
        return;
      case Type.string:
        if (token.value === "") {
          return fromArray([96]);
        }
        return;
      case Type.array:
        if (token.value === 0) {
          return fromArray([128]);
        }
        return;
      case Type.map:
        if (token.value === 0) {
          return fromArray([160]);
        }
        return;
      case Type.uint:
        if (token.value < 24) {
          return fromArray([Number(token.value)]);
        }
        return;
      case Type.negint:
        if (token.value >= -24) {
          return fromArray([31 - Number(token.value)]);
        }
    }
  }

  // node_modules/cborg/esm/lib/encode.js
  var defaultEncodeOptions = {
    float64: false,
    mapSorter,
    quickEncodeToken,
  };
  function makeCborEncoders() {
    const encoders = [];
    encoders[Type.uint.major] = encodeUint;
    encoders[Type.negint.major] = encodeNegint;
    encoders[Type.bytes.major] = encodeBytes;
    encoders[Type.string.major] = encodeString;
    encoders[Type.array.major] = encodeArray;
    encoders[Type.map.major] = encodeMap;
    encoders[Type.tag.major] = encodeTag;
    encoders[Type.float.major] = encodeFloat;
    return encoders;
  }
  var cborEncoders = makeCborEncoders();
  var buf = new Bl();
  var Ref = class {
    constructor(obj, parent) {
      this.obj = obj;
      this.parent = parent;
    }
    includes(obj) {
      let p = this;
      do {
        if (p.obj === obj) {
          return true;
        }
      } while ((p = p.parent));
      return false;
    }
    static createCheck(stack, obj) {
      if (stack && stack.includes(obj)) {
        throw new Error(
          `${encodeErrPrefix} object contains circular references`
        );
      }
      return new Ref(obj, stack);
    }
  };
  var simpleTokens = {
    null: new Token(Type.null, null),
    undefined: new Token(Type.undefined, void 0),
    true: new Token(Type.true, true),
    false: new Token(Type.false, false),
    emptyArray: new Token(Type.array, 0),
    emptyMap: new Token(Type.map, 0),
  };
  var typeEncoders = {
    number(obj, _typ, _options, _refStack) {
      if (!Number.isInteger(obj) || !Number.isSafeInteger(obj)) {
        return new Token(Type.float, obj);
      } else if (obj >= 0) {
        return new Token(Type.uint, obj);
      } else {
        return new Token(Type.negint, obj);
      }
    },
    bigint(obj, _typ, _options, _refStack) {
      if (obj >= BigInt(0)) {
        return new Token(Type.uint, obj);
      } else {
        return new Token(Type.negint, obj);
      }
    },
    Uint8Array(obj, _typ, _options, _refStack) {
      return new Token(Type.bytes, obj);
    },
    string(obj, _typ, _options, _refStack) {
      return new Token(Type.string, obj);
    },
    boolean(obj, _typ, _options, _refStack) {
      return obj ? simpleTokens.true : simpleTokens.false;
    },
    null(_obj, _typ, _options, _refStack) {
      return simpleTokens.null;
    },
    undefined(_obj, _typ, _options, _refStack) {
      return simpleTokens.undefined;
    },
    ArrayBuffer(obj, _typ, _options, _refStack) {
      return new Token(Type.bytes, new Uint8Array(obj));
    },
    DataView(obj, _typ, _options, _refStack) {
      return new Token(
        Type.bytes,
        new Uint8Array(obj.buffer, obj.byteOffset, obj.byteLength)
      );
    },
    Array(obj, _typ, options, refStack) {
      if (!obj.length) {
        if (options.addBreakTokens === true) {
          return [simpleTokens.emptyArray, new Token(Type.break)];
        }
        return simpleTokens.emptyArray;
      }
      refStack = Ref.createCheck(refStack, obj);
      const entries = [];
      let i = 0;
      for (const e of obj) {
        entries[i++] = objectToTokens(e, options, refStack);
      }
      if (options.addBreakTokens) {
        return [
          new Token(Type.array, obj.length),
          entries,
          new Token(Type.break),
        ];
      }
      return [new Token(Type.array, obj.length), entries];
    },
    Object(obj, typ, options, refStack) {
      const isMap = typ !== "Object";
      const keys = isMap ? obj.keys() : Object.keys(obj);
      const length2 = isMap ? obj.size : keys.length;
      if (!length2) {
        if (options.addBreakTokens === true) {
          return [simpleTokens.emptyMap, new Token(Type.break)];
        }
        return simpleTokens.emptyMap;
      }
      refStack = Ref.createCheck(refStack, obj);
      const entries = [];
      let i = 0;
      for (const key of keys) {
        entries[i++] = [
          objectToTokens(key, options, refStack),
          objectToTokens(isMap ? obj.get(key) : obj[key], options, refStack),
        ];
      }
      sortMapEntries(entries, options);
      if (options.addBreakTokens) {
        return [new Token(Type.map, length2), entries, new Token(Type.break)];
      }
      return [new Token(Type.map, length2), entries];
    },
  };
  typeEncoders.Map = typeEncoders.Object;
  typeEncoders.Buffer = typeEncoders.Uint8Array;
  for (const typ of "Uint8Clamped Uint16 Uint32 Int8 Int16 Int32 BigUint64 BigInt64 Float32 Float64".split(
    " "
  )) {
    typeEncoders[`${typ}Array`] = typeEncoders.DataView;
  }
  function objectToTokens(obj, options = {}, refStack) {
    const typ = is(obj);
    const customTypeEncoder =
      (options && options.typeEncoders && options.typeEncoders[typ]) ||
      typeEncoders[typ];
    if (typeof customTypeEncoder === "function") {
      const tokens = customTypeEncoder(obj, typ, options, refStack);
      if (tokens != null) {
        return tokens;
      }
    }
    const typeEncoder = typeEncoders[typ];
    if (!typeEncoder) {
      throw new Error(`${encodeErrPrefix} unsupported type: ${typ}`);
    }
    return typeEncoder(obj, typ, options, refStack);
  }
  function sortMapEntries(entries, options) {
    if (options.mapSorter) {
      entries.sort(options.mapSorter);
    }
  }
  function mapSorter(e1, e2) {
    const keyToken1 = Array.isArray(e1[0]) ? e1[0][0] : e1[0];
    const keyToken2 = Array.isArray(e2[0]) ? e2[0][0] : e2[0];
    if (keyToken1.type !== keyToken2.type) {
      return keyToken1.type.compare(keyToken2.type);
    }
    const major = keyToken1.type.major;
    const tcmp = cborEncoders[major].compareTokens(keyToken1, keyToken2);
    if (tcmp === 0) {
      console.warn(
        "WARNING: complex key types used, CBOR key sorting guarantees are gone"
      );
    }
    return tcmp;
  }
  function tokensToEncoded(buf2, tokens, encoders, options) {
    if (Array.isArray(tokens)) {
      for (const token of tokens) {
        tokensToEncoded(buf2, token, encoders, options);
      }
    } else {
      encoders[tokens.type.major](buf2, tokens, options);
    }
  }
  function encodeCustom(data, encoders, options) {
    const tokens = objectToTokens(data, options);
    if (!Array.isArray(tokens) && options.quickEncodeToken) {
      const quickBytes = options.quickEncodeToken(tokens);
      if (quickBytes) {
        return quickBytes;
      }
      const encoder = encoders[tokens.type.major];
      if (encoder.encodedSize) {
        const size = encoder.encodedSize(tokens, options);
        const buf2 = new Bl(size);
        encoder(buf2, tokens, options);
        if (buf2.chunks.length !== 1) {
          throw new Error(
            `Unexpected error: pre-calculated length for ${tokens} was wrong`
          );
        }
        return asU8A(buf2.chunks[0]);
      }
    }
    buf.reset();
    tokensToEncoded(buf, tokens, encoders, options);
    return buf.toBytes(true);
  }
  function encode4(data, options) {
    options = Object.assign({}, defaultEncodeOptions, options);
    return encodeCustom(data, cborEncoders, options);
  }

  // node_modules/cborg/esm/lib/decode.js
  var defaultDecodeOptions = {
    strict: false,
    allowIndefinite: true,
    allowUndefined: true,
    allowBigInt: true,
  };
  var Tokeniser = class {
    constructor(data, options = {}) {
      this.pos = 0;
      this.data = data;
      this.options = options;
    }
    done() {
      return this.pos >= this.data.length;
    }
    next() {
      const byt = this.data[this.pos];
      let token = quick[byt];
      if (token === void 0) {
        const decoder = jump[byt];
        if (!decoder) {
          throw new Error(
            `${decodeErrPrefix} no decoder for major type ${
              byt >>> 5
            } (byte 0x${byt.toString(16).padStart(2, "0")})`
          );
        }
        const minor = byt & 31;
        token = decoder(this.data, this.pos, minor, this.options);
      }
      this.pos += token.encodedLength;
      return token;
    }
  };
  var DONE = Symbol.for("DONE");
  var BREAK = Symbol.for("BREAK");
  function tokenToArray(token, tokeniser, options) {
    const arr = [];
    for (let i = 0; i < token.value; i++) {
      const value = tokensToObject(tokeniser, options);
      if (value === BREAK) {
        if (token.value === Infinity) {
          break;
        }
        throw new Error(
          `${decodeErrPrefix} got unexpected break to lengthed array`
        );
      }
      if (value === DONE) {
        throw new Error(
          `${decodeErrPrefix} found array but not enough entries (got ${i}, expected ${token.value})`
        );
      }
      arr[i] = value;
    }
    return arr;
  }
  function tokenToMap(token, tokeniser, options) {
    const useMaps = options.useMaps === true;
    const obj = useMaps ? void 0 : {};
    const m = useMaps ? /* @__PURE__ */ new Map() : void 0;
    for (let i = 0; i < token.value; i++) {
      const key = tokensToObject(tokeniser, options);
      if (key === BREAK) {
        if (token.value === Infinity) {
          break;
        }
        throw new Error(
          `${decodeErrPrefix} got unexpected break to lengthed map`
        );
      }
      if (key === DONE) {
        throw new Error(
          `${decodeErrPrefix} found map but not enough entries (got ${i} [no key], expected ${token.value})`
        );
      }
      if (useMaps !== true && typeof key !== "string") {
        throw new Error(
          `${decodeErrPrefix} non-string keys not supported (got ${typeof key})`
        );
      }
      const value = tokensToObject(tokeniser, options);
      if (value === DONE) {
        throw new Error(
          `${decodeErrPrefix} found map but not enough entries (got ${i} [no value], expected ${token.value})`
        );
      }
      if (useMaps) {
        m.set(key, value);
      } else {
        obj[key] = value;
      }
    }
    return useMaps ? m : obj;
  }
  function tokensToObject(tokeniser, options) {
    if (tokeniser.done()) {
      return DONE;
    }
    const token = tokeniser.next();
    if (token.type === Type.break) {
      return BREAK;
    }
    if (token.type.terminal) {
      return token.value;
    }
    if (token.type === Type.array) {
      return tokenToArray(token, tokeniser, options);
    }
    if (token.type === Type.map) {
      return tokenToMap(token, tokeniser, options);
    }
    if (token.type === Type.tag) {
      if (options.tags && typeof options.tags[token.value] === "function") {
        const tagged = tokensToObject(tokeniser, options);
        return options.tags[token.value](tagged);
      }
      throw new Error(`${decodeErrPrefix} tag not supported (${token.value})`);
    }
    throw new Error("unsupported");
  }
  function decode6(data, options) {
    if (!(data instanceof Uint8Array)) {
      throw new Error(`${decodeErrPrefix} data to decode must be a Uint8Array`);
    }
    options = Object.assign({}, defaultDecodeOptions, options);
    const tokeniser = options.tokenizer || new Tokeniser(data, options);
    const decoded = tokensToObject(tokeniser, options);
    if (decoded === DONE) {
      throw new Error(`${decodeErrPrefix} did not find any content to decode`);
    }
    if (decoded === BREAK) {
      throw new Error(`${decodeErrPrefix} got unexpected break`);
    }
    if (!tokeniser.done()) {
      throw new Error(
        `${decodeErrPrefix} too many terminals, data makes no sense`
      );
    }
    return decoded;
  }

  // node_modules/@ipld/dag-cbor/src/index.js
  var CID_CBOR_TAG = 42;
  function cidEncoder(obj) {
    if (obj.asCID !== obj && obj["/"] !== obj.bytes) {
      return null;
    }
    const cid = CID.asCID(obj);
    if (!cid) {
      return null;
    }
    const bytes = new Uint8Array(cid.bytes.byteLength + 1);
    bytes.set(cid.bytes, 1);
    return [new Token(Type.tag, CID_CBOR_TAG), new Token(Type.bytes, bytes)];
  }
  function undefinedEncoder() {
    throw new Error(
      "`undefined` is not supported by the IPLD Data Model and cannot be encoded"
    );
  }
  function numberEncoder(num) {
    if (Number.isNaN(num)) {
      throw new Error(
        "`NaN` is not supported by the IPLD Data Model and cannot be encoded"
      );
    }
    if (num === Infinity || num === -Infinity) {
      throw new Error(
        "`Infinity` and `-Infinity` is not supported by the IPLD Data Model and cannot be encoded"
      );
    }
    return null;
  }
  var encodeOptions = {
    float64: true,
    typeEncoders: {
      Object: cidEncoder,
      undefined: undefinedEncoder,
      number: numberEncoder,
    },
  };
  function cidDecoder(bytes) {
    if (bytes[0] !== 0) {
      throw new Error("Invalid CID for CBOR tag 42; expected leading 0x00");
    }
    return CID.decode(bytes.subarray(1));
  }
  var decodeOptions = {
    allowIndefinite: false,
    coerceUndefinedToNull: true,
    allowNaN: false,
    allowInfinity: false,
    allowBigInt: true,
    strict: true,
    useMaps: false,
    tags: [],
  };
  decodeOptions.tags[CID_CBOR_TAG] = cidDecoder;
  var name2 = "dag-cbor";
  var code2 = 113;
  var encode5 = (node) => encode4(node, encodeOptions);
  var decode7 = (data) => decode6(data, decodeOptions);

  // node_modules/@ipld/dag-json/src/index.js
  var src_exports3 = {};
  __export(src_exports3, {
    code: () => code3,
    decode: () => decode9,
    encode: () => encode7,
    name: () => name3,
  });

  // node_modules/multiformats/src/hashes/hasher.js
  var from2 = ({ name: name8, code: code8, encode: encode15 }) =>
    new Hasher(name8, code8, encode15);
  var Hasher = class {
    constructor(name8, code8, encode15) {
      this.name = name8;
      this.code = code8;
      this.encode = encode15;
    }
    digest(input) {
      if (input instanceof Uint8Array) {
        const result = this.encode(input);
        return result instanceof Uint8Array
          ? create(this.code, result)
          : result.then((digest2) => create(this.code, digest2));
      } else {
        throw Error("Unknown type, must be binary type");
      }
    }
  };

  // node_modules/multiformats/src/bases/base64.js
  var base64_exports = {};
  __export(base64_exports, {
    base64: () => base64,
    base64pad: () => base64pad,
    base64url: () => base64url,
    base64urlpad: () => base64urlpad,
  });
  var base64 = rfc4648({
    prefix: "m",
    name: "base64",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6,
  });
  var base64pad = rfc4648({
    prefix: "M",
    name: "base64pad",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6,
  });
  var base64url = rfc4648({
    prefix: "u",
    name: "base64url",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6,
  });
  var base64urlpad = rfc4648({
    prefix: "U",
    name: "base64urlpad",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6,
  });

  // node_modules/cborg/esm/lib/json/encode.js
  var JSONEncoder = class extends Array {
    constructor() {
      super();
      this.inRecursive = [];
    }
    prefix(buf2) {
      const recurs = this.inRecursive[this.inRecursive.length - 1];
      if (recurs) {
        if (recurs.type === Type.array) {
          recurs.elements++;
          if (recurs.elements !== 1) {
            buf2.push([44]);
          }
        }
        if (recurs.type === Type.map) {
          recurs.elements++;
          if (recurs.elements !== 1) {
            if (recurs.elements % 2 === 1) {
              buf2.push([44]);
            } else {
              buf2.push([58]);
            }
          }
        }
      }
    }
    [Type.uint.major](buf2, token) {
      this.prefix(buf2);
      const is2 = String(token.value);
      const isa = [];
      for (let i = 0; i < is2.length; i++) {
        isa[i] = is2.charCodeAt(i);
      }
      buf2.push(isa);
    }
    [Type.negint.major](buf2, token) {
      this[Type.uint.major](buf2, token);
    }
    [Type.bytes.major](_buf, _token) {
      throw new Error(`${encodeErrPrefix} unsupported type: Uint8Array`);
    }
    [Type.string.major](buf2, token) {
      this.prefix(buf2);
      const byts = fromString2(JSON.stringify(token.value));
      buf2.push(byts.length > 32 ? asU8A(byts) : byts);
    }
    [Type.array.major](buf2, _token) {
      this.prefix(buf2);
      this.inRecursive.push({
        type: Type.array,
        elements: 0,
      });
      buf2.push([91]);
    }
    [Type.map.major](buf2, _token) {
      this.prefix(buf2);
      this.inRecursive.push({
        type: Type.map,
        elements: 0,
      });
      buf2.push([123]);
    }
    [Type.tag.major](_buf, _token) {}
    [Type.float.major](buf2, token) {
      if (token.type.name === "break") {
        const recurs = this.inRecursive.pop();
        if (recurs) {
          if (recurs.type === Type.array) {
            buf2.push([93]);
          } else if (recurs.type === Type.map) {
            buf2.push([125]);
          } else {
            throw new Error(
              "Unexpected recursive type; this should not happen!"
            );
          }
          return;
        }
        throw new Error("Unexpected break; this should not happen!");
      }
      if (token.value === void 0) {
        throw new Error(`${encodeErrPrefix} unsupported type: undefined`);
      }
      this.prefix(buf2);
      if (token.type.name === "true") {
        buf2.push([116, 114, 117, 101]);
        return;
      } else if (token.type.name === "false") {
        buf2.push([102, 97, 108, 115, 101]);
        return;
      } else if (token.type.name === "null") {
        buf2.push([110, 117, 108, 108]);
        return;
      }
      const is2 = String(token.value);
      const isa = [];
      let dp = false;
      for (let i = 0; i < is2.length; i++) {
        isa[i] = is2.charCodeAt(i);
        if (!dp && (isa[i] === 46 || isa[i] === 101 || isa[i] === 69)) {
          dp = true;
        }
      }
      if (!dp) {
        isa.push(46);
        isa.push(48);
      }
      buf2.push(isa);
    }
  };
  function mapSorter2(e1, e2) {
    if (Array.isArray(e1[0]) || Array.isArray(e2[0])) {
      throw new Error(`${encodeErrPrefix} complex map keys are not supported`);
    }
    const keyToken1 = e1[0];
    const keyToken2 = e2[0];
    if (keyToken1.type !== Type.string || keyToken2.type !== Type.string) {
      throw new Error(
        `${encodeErrPrefix} non-string map keys are not supported`
      );
    }
    if (keyToken1 < keyToken2) {
      return -1;
    }
    if (keyToken1 > keyToken2) {
      return 1;
    }
    throw new Error(
      `${encodeErrPrefix} unexpected duplicate map keys, this is not supported`
    );
  }
  var defaultEncodeOptions2 = {
    addBreakTokens: true,
    mapSorter: mapSorter2,
  };
  function encode6(data, options) {
    options = Object.assign({}, defaultEncodeOptions2, options);
    return encodeCustom(data, new JSONEncoder(), options);
  }

  // node_modules/cborg/esm/lib/json/decode.js
  var Tokenizer = class {
    constructor(data, options = {}) {
      this.pos = 0;
      this.data = data;
      this.options = options;
      this.modeStack = ["value"];
      this.lastToken = "";
    }
    done() {
      return this.pos >= this.data.length;
    }
    ch() {
      return this.data[this.pos];
    }
    currentMode() {
      return this.modeStack[this.modeStack.length - 1];
    }
    skipWhitespace() {
      let c = this.ch();
      while (c === 32 || c === 9 || c === 13 || c === 10) {
        c = this.data[++this.pos];
      }
    }
    expect(str) {
      if (this.data.length - this.pos < str.length) {
        throw new Error(
          `${decodeErrPrefix} unexpected end of input at position ${this.pos}`
        );
      }
      for (let i = 0; i < str.length; i++) {
        if (this.data[this.pos++] !== str[i]) {
          throw new Error(
            `${decodeErrPrefix} unexpected token at position ${
              this.pos
            }, expected to find '${String.fromCharCode(...str)}'`
          );
        }
      }
    }
    parseNumber() {
      const startPos = this.pos;
      let negative = false;
      let float = false;
      const swallow = (chars) => {
        while (!this.done()) {
          const ch = this.ch();
          if (chars.includes(ch)) {
            this.pos++;
          } else {
            break;
          }
        }
      };
      if (this.ch() === 45) {
        negative = true;
        this.pos++;
      }
      if (this.ch() === 48) {
        this.pos++;
        if (this.ch() === 46) {
          this.pos++;
          float = true;
        } else {
          return new Token(Type.uint, 0, this.pos - startPos);
        }
      }
      swallow([48, 49, 50, 51, 52, 53, 54, 55, 56, 57]);
      if (negative && this.pos === startPos + 1) {
        throw new Error(
          `${decodeErrPrefix} unexpected token at position ${this.pos}`
        );
      }
      if (!this.done() && this.ch() === 46) {
        if (float) {
          throw new Error(
            `${decodeErrPrefix} unexpected token at position ${this.pos}`
          );
        }
        float = true;
        this.pos++;
        swallow([48, 49, 50, 51, 52, 53, 54, 55, 56, 57]);
      }
      if (!this.done() && (this.ch() === 101 || this.ch() === 69)) {
        float = true;
        this.pos++;
        if (!this.done() && (this.ch() === 43 || this.ch() === 45)) {
          this.pos++;
        }
        swallow([48, 49, 50, 51, 52, 53, 54, 55, 56, 57]);
      }
      const numStr = String.fromCharCode.apply(
        null,
        this.data.subarray(startPos, this.pos)
      );
      const num = parseFloat(numStr);
      if (float) {
        return new Token(Type.float, num, this.pos - startPos);
      }
      if (this.options.allowBigInt !== true || Number.isSafeInteger(num)) {
        return new Token(
          num >= 0 ? Type.uint : Type.negint,
          num,
          this.pos - startPos
        );
      }
      return new Token(
        num >= 0 ? Type.uint : Type.negint,
        BigInt(numStr),
        this.pos - startPos
      );
    }
    parseString() {
      if (this.ch() !== 34) {
        throw new Error(
          `${decodeErrPrefix} unexpected character at position ${this.pos}; this shouldn't happen`
        );
      }
      this.pos++;
      for (
        let i = this.pos, l = 0;
        i < this.data.length && l < 65536;
        i++, l++
      ) {
        const ch = this.data[i];
        if (ch === 92 || ch < 32 || ch >= 128) {
          break;
        }
        if (ch === 34) {
          const str = String.fromCharCode.apply(
            null,
            this.data.subarray(this.pos, i)
          );
          this.pos = i + 1;
          return new Token(Type.string, str, l);
        }
      }
      const startPos = this.pos;
      const chars = [];
      const readu4 = () => {
        if (this.pos + 4 >= this.data.length) {
          throw new Error(
            `${decodeErrPrefix} unexpected end of unicode escape sequence at position ${this.pos}`
          );
        }
        let u4 = 0;
        for (let i = 0; i < 4; i++) {
          let ch = this.ch();
          if (ch >= 48 && ch <= 57) {
            ch -= 48;
          } else if (ch >= 97 && ch <= 102) {
            ch = ch - 97 + 10;
          } else if (ch >= 65 && ch <= 70) {
            ch = ch - 65 + 10;
          } else {
            throw new Error(
              `${decodeErrPrefix} unexpected unicode escape character at position ${this.pos}`
            );
          }
          u4 = u4 * 16 + ch;
          this.pos++;
        }
        return u4;
      };
      const readUtf8Char = () => {
        const firstByte = this.ch();
        let codePoint = null;
        let bytesPerSequence =
          firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (this.pos + bytesPerSequence > this.data.length) {
          throw new Error(
            `${decodeErrPrefix} unexpected unicode sequence at position ${this.pos}`
          );
        }
        let secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = this.data[this.pos + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = ((firstByte & 31) << 6) | (secondByte & 63);
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = this.data[this.pos + 1];
            thirdByte = this.data[this.pos + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint =
                ((firstByte & 15) << 12) |
                ((secondByte & 63) << 6) |
                (thirdByte & 63);
              if (
                tempCodePoint > 2047 &&
                (tempCodePoint < 55296 || tempCodePoint > 57343)
              ) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = this.data[this.pos + 1];
            thirdByte = this.data[this.pos + 2];
            fourthByte = this.data[this.pos + 3];
            if (
              (secondByte & 192) === 128 &&
              (thirdByte & 192) === 128 &&
              (fourthByte & 192) === 128
            ) {
              tempCodePoint =
                ((firstByte & 15) << 18) |
                ((secondByte & 63) << 12) |
                ((thirdByte & 63) << 6) |
                (fourthByte & 63);
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          chars.push(((codePoint >>> 10) & 1023) | 55296);
          codePoint = 56320 | (codePoint & 1023);
        }
        chars.push(codePoint);
        this.pos += bytesPerSequence;
      };
      while (!this.done()) {
        const ch = this.ch();
        let ch1;
        switch (ch) {
          case 92:
            this.pos++;
            if (this.done()) {
              throw new Error(
                `${decodeErrPrefix} unexpected string termination at position ${this.pos}`
              );
            }
            ch1 = this.ch();
            this.pos++;
            switch (ch1) {
              case 34:
              case 39:
              case 92:
              case 47:
                chars.push(ch1);
                break;
              case 98:
                chars.push(8);
                break;
              case 116:
                chars.push(9);
                break;
              case 110:
                chars.push(10);
                break;
              case 102:
                chars.push(12);
                break;
              case 114:
                chars.push(13);
                break;
              case 117:
                chars.push(readu4());
                break;
              default:
                throw new Error(
                  `${decodeErrPrefix} unexpected string escape character at position ${this.pos}`
                );
            }
            break;
          case 34:
            this.pos++;
            return new Token(
              Type.string,
              decodeCodePointsArray(chars),
              this.pos - startPos
            );
          default:
            if (ch < 32) {
              throw new Error(
                `${decodeErrPrefix} invalid control character at position ${this.pos}`
              );
            } else if (ch < 128) {
              chars.push(ch);
              this.pos++;
            } else {
              readUtf8Char();
            }
        }
      }
      throw new Error(
        `${decodeErrPrefix} unexpected end of string at position ${this.pos}`
      );
    }
    parseValue() {
      switch (this.ch()) {
        case 123:
          this.modeStack.push("obj-start");
          this.pos++;
          return new Token(Type.map, Infinity, 1);
        case 91:
          this.modeStack.push("array-start");
          this.pos++;
          return new Token(Type.array, Infinity, 1);
        case 34: {
          return this.parseString();
        }
        case 110:
          this.expect([110, 117, 108, 108]);
          return new Token(Type.null, null, 4);
        case 102:
          this.expect([102, 97, 108, 115, 101]);
          return new Token(Type.false, false, 5);
        case 116:
          this.expect([116, 114, 117, 101]);
          return new Token(Type.true, true, 4);
        case 45:
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          return this.parseNumber();
        default:
          throw new Error(
            `${decodeErrPrefix} unexpected character at position ${this.pos}`
          );
      }
    }
    next() {
      this.skipWhitespace();
      switch (this.currentMode()) {
        case "value":
          this.modeStack.pop();
          return this.parseValue();
        case "array-value": {
          this.modeStack.pop();
          if (this.ch() === 93) {
            this.pos++;
            this.skipWhitespace();
            return new Token(Type.break, void 0, 1);
          }
          if (this.ch() !== 44) {
            throw new Error(
              `${decodeErrPrefix} unexpected character at position ${
                this.pos
              }, was expecting array delimiter but found '${String.fromCharCode(
                this.ch()
              )}'`
            );
          }
          this.pos++;
          this.modeStack.push("array-value");
          this.skipWhitespace();
          return this.parseValue();
        }
        case "array-start": {
          this.modeStack.pop();
          if (this.ch() === 93) {
            this.pos++;
            this.skipWhitespace();
            return new Token(Type.break, void 0, 1);
          }
          this.modeStack.push("array-value");
          this.skipWhitespace();
          return this.parseValue();
        }
        case "obj-key":
          if (this.ch() === 125) {
            this.modeStack.pop();
            this.pos++;
            this.skipWhitespace();
            return new Token(Type.break, void 0, 1);
          }
          if (this.ch() !== 44) {
            throw new Error(
              `${decodeErrPrefix} unexpected character at position ${
                this.pos
              }, was expecting object delimiter but found '${String.fromCharCode(
                this.ch()
              )}'`
            );
          }
          this.pos++;
          this.skipWhitespace();
        case "obj-start": {
          this.modeStack.pop();
          if (this.ch() === 125) {
            this.pos++;
            this.skipWhitespace();
            return new Token(Type.break, void 0, 1);
          }
          const token = this.parseString();
          this.skipWhitespace();
          if (this.ch() !== 58) {
            throw new Error(
              `${decodeErrPrefix} unexpected character at position ${
                this.pos
              }, was expecting key/value delimiter ':' but found '${String.fromCharCode(
                this.ch()
              )}'`
            );
          }
          this.pos++;
          this.modeStack.push("obj-value");
          return token;
        }
        case "obj-value": {
          this.modeStack.pop();
          this.modeStack.push("obj-key");
          this.skipWhitespace();
          return this.parseValue();
        }
        default:
          throw new Error(
            `${decodeErrPrefix} unexpected parse state at position ${this.pos}; this shouldn't happen`
          );
      }
    }
  };
  function decode8(data, options) {
    options = Object.assign(
      { tokenizer: new Tokenizer(data, options) },
      options
    );
    return decode6(data, options);
  }

  // node_modules/@ipld/dag-json/src/index.js
  function cidEncoder2(obj) {
    if (obj.asCID !== obj && obj["/"] !== obj.bytes) {
      return null;
    }
    const cid = CID.asCID(obj);
    if (!cid) {
      return null;
    }
    const cidString = cid.toString();
    return [
      new Token(Type.map, Infinity, 1),
      new Token(Type.string, "/", 1),
      new Token(Type.string, cidString, cidString.length),
      new Token(Type.break, void 0, 1),
    ];
  }
  function bytesEncoder(bytes) {
    const bytesString = base64.encode(bytes).slice(1);
    return [
      new Token(Type.map, Infinity, 1),
      new Token(Type.string, "/", 1),
      new Token(Type.map, Infinity, 1),
      new Token(Type.string, "bytes", 5),
      new Token(Type.string, bytesString, bytesString.length),
      new Token(Type.break, void 0, 1),
      new Token(Type.break, void 0, 1),
    ];
  }
  function undefinedEncoder2() {
    throw new Error(
      "`undefined` is not supported by the IPLD Data Model and cannot be encoded"
    );
  }
  function numberEncoder2(num) {
    if (Number.isNaN(num)) {
      throw new Error(
        "`NaN` is not supported by the IPLD Data Model and cannot be encoded"
      );
    }
    if (num === Infinity || num === -Infinity) {
      throw new Error(
        "`Infinity` and `-Infinity` is not supported by the IPLD Data Model and cannot be encoded"
      );
    }
    return null;
  }
  var encodeOptions2 = {
    typeEncoders: {
      Object: cidEncoder2,
      Uint8Array: bytesEncoder,
      Buffer: bytesEncoder,
      undefined: undefinedEncoder2,
      number: numberEncoder2,
    },
  };
  var DagJsonTokenizer = class extends Tokenizer {
    constructor(data, options) {
      super(data, options);
      this.tokenBuffer = [];
    }
    done() {
      return this.tokenBuffer.length === 0 && super.done();
    }
    _next() {
      if (this.tokenBuffer.length > 0) {
        return this.tokenBuffer.pop();
      }
      return super.next();
    }
    next() {
      const token = this._next();
      if (token.type === Type.map) {
        const keyToken = this._next();
        if (keyToken.type === Type.string && keyToken.value === "/") {
          const valueToken = this._next();
          if (valueToken.type === Type.string) {
            const breakToken = this._next();
            if (breakToken.type !== Type.break) {
              throw new Error("Invalid encoded CID form");
            }
            this.tokenBuffer.push(valueToken);
            return new Token(Type.tag, 42, 0);
          }
          if (valueToken.type === Type.map) {
            const innerKeyToken = this._next();
            if (
              innerKeyToken.type === Type.string &&
              innerKeyToken.value === "bytes"
            ) {
              const innerValueToken = this._next();
              if (innerValueToken.type === Type.string) {
                for (let i = 0; i < 2; i++) {
                  const breakToken = this._next();
                  if (breakToken.type !== Type.break) {
                    throw new Error("Invalid encoded Bytes form");
                  }
                }
                const bytes = base64.decode(`m${innerValueToken.value}`);
                return new Token(
                  Type.bytes,
                  bytes,
                  innerValueToken.value.length
                );
              }
              this.tokenBuffer.push(innerValueToken);
            }
            this.tokenBuffer.push(innerKeyToken);
          }
          this.tokenBuffer.push(valueToken);
        }
        this.tokenBuffer.push(keyToken);
      }
      return token;
    }
  };
  var decodeOptions2 = {
    allowIndefinite: false,
    allowUndefined: false,
    allowNaN: false,
    allowInfinity: false,
    allowBigInt: true,
    strict: true,
    useMaps: false,
    tags: [],
  };
  decodeOptions2.tags[42] = CID.parse;
  var name3 = "dag-json";
  var code3 = 297;
  var encode7 = (node) => encode6(node, encodeOptions2);
  var decode9 = (data) => {
    const options = Object.assign(decodeOptions2, {
      tokenizer: new DagJsonTokenizer(data, decodeOptions2),
    });
    return decode8(data, options);
  };

  // node_modules/dag-jose/lib/index.js
  var lib_exports = {};
  __export(lib_exports, {
    code: () => code4,
    decode: () => decode12,
    encode: () => encode10,
    name: () => name4,
    toGeneral: () => toGeneral,
  });

  // node_modules/dag-jose/lib/utils.js
  function toBase64url(b) {
    return base64url.encode(b).slice(1);
  }
  function fromBase64url(s) {
    return base64url.decode(`u${s}`);
  }

  // node_modules/dag-jose/lib/signing.js
  function fromSplit(split) {
    const [protectedHeader, payload, signature] = split;
    return {
      payload,
      signatures: [{ protected: protectedHeader, signature }],
      link: CID.decode(fromBase64url(payload)),
    };
  }
  function encodeSignature(signature) {
    const encoded = {
      signature: fromBase64url(signature.signature),
    };
    if (signature.header) encoded.header = signature.header;
    if (signature.protected)
      encoded.protected = fromBase64url(signature.protected);
    return encoded;
  }
  function encode8(jws) {
    const payload = fromBase64url(jws.payload);
    try {
      CID.decode(payload);
    } catch (e) {
      throw new Error("Not a valid DagJWS");
    }
    return {
      payload,
      signatures: jws.signatures.map(encodeSignature),
    };
  }
  function decodeSignature(encoded) {
    const sign = {
      signature: toBase64url(encoded.signature),
    };
    if (encoded.header) sign.header = encoded.header;
    if (encoded.protected) sign.protected = toBase64url(encoded.protected);
    return sign;
  }
  function decode10(encoded) {
    const decoded = {
      payload: toBase64url(encoded.payload),
      signatures: encoded.signatures.map(decodeSignature),
    };
    decoded.link = CID.decode(new Uint8Array(encoded.payload));
    return decoded;
  }

  // node_modules/dag-jose/lib/encryption.js
  function fromSplit2(split) {
    const [protectedHeader, encrypted_key, iv, ciphertext, tag] = split;
    const jwe = {
      ciphertext,
      iv,
      protected: protectedHeader,
      tag,
    };
    if (encrypted_key) jwe.recipients = [{ encrypted_key }];
    return jwe;
  }
  function encodeRecipient(recipient) {
    const encRec = {};
    if (recipient.encrypted_key)
      encRec.encrypted_key = fromBase64url(recipient.encrypted_key);
    if (recipient.header) encRec.header = recipient.header;
    return encRec;
  }
  function encode9(jwe) {
    const encJwe = {
      ciphertext: fromBase64url(jwe.ciphertext),
      protected: fromBase64url(jwe.protected),
      iv: fromBase64url(jwe.iv),
      tag: fromBase64url(jwe.tag),
    };
    if (jwe.aad) encJwe.aad = fromBase64url(jwe.aad);
    if (jwe.recipients) encJwe.recipients = jwe.recipients.map(encodeRecipient);
    if (jwe.unprotected) encJwe.unprotected = jwe.unprotected;
    return encJwe;
  }
  function decodeRecipient(encoded) {
    const recipient = {};
    if (encoded.encrypted_key)
      recipient.encrypted_key = toBase64url(encoded.encrypted_key);
    if (encoded.header) recipient.header = encoded.header;
    return recipient;
  }
  function decode11(encoded) {
    const jwe = {
      ciphertext: toBase64url(encoded.ciphertext),
      protected: toBase64url(encoded.protected),
      iv: toBase64url(encoded.iv),
      tag: toBase64url(encoded.tag),
    };
    if (encoded.aad) jwe.aad = toBase64url(encoded.aad);
    if (encoded.recipients)
      jwe.recipients = encoded.recipients.map(decodeRecipient);
    if (encoded.unprotected) jwe.unprotected = encoded.unprotected;
    return jwe;
  }

  // node_modules/dag-jose/lib/index.js
  var name4 = "dag-jose";
  var code4 = 133;
  function isDagJWS(jose) {
    return (
      "payload" in jose &&
      typeof jose.payload === "string" &&
      "signatures" in jose &&
      Array.isArray(jose.signatures)
    );
  }
  function isEncodedJWS(jose) {
    return (
      "payload" in jose &&
      jose.payload instanceof Uint8Array &&
      "signatures" in jose &&
      Array.isArray(jose.signatures)
    );
  }
  function isEncodedJWE(jose) {
    return (
      "ciphertext" in jose &&
      jose.ciphertext instanceof Uint8Array &&
      "iv" in jose &&
      jose.iv instanceof Uint8Array &&
      "protected" in jose &&
      jose.protected instanceof Uint8Array &&
      "tag" in jose &&
      jose.tag instanceof Uint8Array
    );
  }
  function isDagJWE(jose) {
    return (
      "ciphertext" in jose &&
      typeof jose.ciphertext === "string" &&
      "iv" in jose &&
      typeof jose.iv === "string" &&
      "protected" in jose &&
      typeof jose.protected === "string" &&
      "tag" in jose &&
      typeof jose.tag === "string"
    );
  }
  function toGeneral(jose) {
    if (typeof jose === "string") {
      const split = jose.split(".");
      if (split.length === 3) {
        return fromSplit(split);
      } else if (split.length === 5) {
        return fromSplit2(split);
      }
      throw new Error("Not a valid JOSE string");
    }
    if (isDagJWS(jose) || isDagJWE(jose)) {
      return jose;
    }
    throw new Error("Not a valid unencoded JOSE object");
  }
  function encode10(obj) {
    if (typeof obj === "string") {
      obj = toGeneral(obj);
    }
    let encodedJose;
    if (isDagJWS(obj)) {
      encodedJose = encode8(obj);
    } else if (isDagJWE(obj)) {
      encodedJose = encode9(obj);
    } else {
      throw new Error("Not a valid JOSE object");
    }
    return new Uint8Array(encode5(encodedJose));
  }
  function decode12(data) {
    let encoded;
    try {
      encoded = decode7(data);
    } catch (e) {
      throw new Error("Not a valid DAG-JOSE object");
    }
    if (isEncodedJWS(encoded)) {
      return decode10(encoded);
    } else if (isEncodedJWE(encoded)) {
      return decode11(encoded);
    } else {
      throw new Error("Not a valid DAG-JOSE object");
    }
  }

  // node_modules/multiformats/src/hashes/identity.js
  var identity_exports = {};
  __export(identity_exports, {
    identity: () => identity,
  });
  var code5 = 0;
  var name5 = "identity";
  var encode11 = coerce;
  var digest = (input) => create(code5, encode11(input));
  var identity = { code: code5, name: name5, encode: encode11, digest };

  // node_modules/multiformats/src/bases/identity.js
  var identity_exports2 = {};
  __export(identity_exports2, {
    identity: () => identity2,
  });
  var identity2 = from({
    prefix: "\0",
    name: "identity",
    encode: (buf2) => toString(buf2),
    decode: (str) => fromString(str),
  });

  // node_modules/multiformats/src/bases/base2.js
  var base2_exports = {};
  __export(base2_exports, {
    base2: () => base2,
  });
  var base2 = rfc4648({
    prefix: "0",
    name: "base2",
    alphabet: "01",
    bitsPerChar: 1,
  });

  // node_modules/multiformats/src/bases/base8.js
  var base8_exports = {};
  __export(base8_exports, {
    base8: () => base8,
  });
  var base8 = rfc4648({
    prefix: "7",
    name: "base8",
    alphabet: "01234567",
    bitsPerChar: 3,
  });

  // node_modules/multiformats/src/bases/base10.js
  var base10_exports = {};
  __export(base10_exports, {
    base10: () => base10,
  });
  var base10 = baseX({
    prefix: "9",
    name: "base10",
    alphabet: "0123456789",
  });

  // node_modules/multiformats/src/bases/base16.js
  var base16_exports = {};
  __export(base16_exports, {
    base16: () => base16,
    base16upper: () => base16upper,
  });
  var base16 = rfc4648({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4,
  });
  var base16upper = rfc4648({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4,
  });

  // node_modules/multiformats/src/bases/base36.js
  var base36_exports = {};
  __export(base36_exports, {
    base36: () => base36,
    base36upper: () => base36upper,
  });
  var base36 = baseX({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz",
  });
  var base36upper = baseX({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  });

  // node_modules/multiformats/src/bases/base256emoji.js
  var base256emoji_exports = {};
  __export(base256emoji_exports, {
    base256emoji: () => base256emoji,
  });
  var alphabet = Array.from(
    "\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}"
  );
  var alphabetBytesToChars = alphabet.reduce((p, c, i) => {
    p[i] = c;
    return p;
  }, []);
  var alphabetCharsToBytes = alphabet.reduce((p, c, i) => {
    p[c.codePointAt(0)] = i;
    return p;
  }, []);
  function encode12(data) {
    return data.reduce((p, c) => {
      p += alphabetBytesToChars[c];
      return p;
    }, "");
  }
  function decode13(str) {
    const byts = [];
    for (const char of str) {
      const byt = alphabetCharsToBytes[char.codePointAt(0)];
      if (byt === void 0) {
        throw new Error(`Non-base256emoji character: ${char}`);
      }
      byts.push(byt);
    }
    return new Uint8Array(byts);
  }
  var base256emoji = from({
    prefix: "\u{1F680}",
    name: "base256emoji",
    encode: encode12,
    decode: decode13,
  });

  // node_modules/multiformats/src/hashes/sha2-browser.js
  var sha2_browser_exports = {};
  __export(sha2_browser_exports, {
    sha256: () => sha256,
    sha512: () => sha512,
  });
  var sha = (name8) => async (data) =>
    new Uint8Array(await crypto.subtle.digest(name8, data));
  var sha256 = from2({
    name: "sha2-256",
    code: 18,
    encode: sha("SHA-256"),
  });
  var sha512 = from2({
    name: "sha2-512",
    code: 19,
    encode: sha("SHA-512"),
  });

  // node_modules/multiformats/src/codecs/raw.js
  var raw_exports = {};
  __export(raw_exports, {
    code: () => code6,
    decode: () => decode14,
    encode: () => encode13,
    name: () => name6,
  });
  var name6 = "raw";
  var code6 = 85;
  var encode13 = (node) => coerce(node);
  var decode14 = (data) => coerce(data);

  // node_modules/multiformats/src/codecs/json.js
  var json_exports2 = {};
  __export(json_exports2, {
    code: () => code7,
    decode: () => decode15,
    encode: () => encode14,
    name: () => name7,
  });
  var textEncoder4 = new TextEncoder();
  var textDecoder3 = new TextDecoder();
  var name7 = "json";
  var code7 = 512;
  var encode14 = (node) => textEncoder4.encode(JSON.stringify(node));
  var decode15 = (data) => JSON.parse(textDecoder3.decode(data));

  // node_modules/multiformats/src/basics.js
  var bases = {
    ...identity_exports2,
    ...base2_exports,
    ...base8_exports,
    ...base10_exports,
    ...base16_exports,
    ...base32_exports,
    ...base36_exports,
    ...base58_exports,
    ...base64_exports,
    ...base256emoji_exports,
  };
  var hashes = { ...sha2_browser_exports, ...identity_exports };
  var codecs = { raw: raw_exports, json: json_exports2 };

  // node_modules/@chainsafe/is-ip/lib/parser.js
  var Parser = class {
    index = 0;
    input = "";
    new(input) {
      this.index = 0;
      this.input = input;
      return this;
    }
    readAtomically(fn) {
      const index = this.index;
      const result = fn();
      if (result === void 0) {
        this.index = index;
      }
      return result;
    }
    parseWith(fn) {
      const result = fn();
      if (this.index !== this.input.length) {
        return void 0;
      }
      return result;
    }
    peekChar() {
      if (this.index >= this.input.length) {
        return void 0;
      }
      return this.input[this.index];
    }
    readChar() {
      if (this.index >= this.input.length) {
        return void 0;
      }
      return this.input[this.index++];
    }
    readGivenChar(target) {
      return this.readAtomically(() => {
        const char = this.readChar();
        if (char !== target) {
          return void 0;
        }
        return char;
      });
    }
    readSeparator(sep, index, inner) {
      return this.readAtomically(() => {
        if (index > 0) {
          if (this.readGivenChar(sep) === void 0) {
            return void 0;
          }
        }
        return inner();
      });
    }
    readNumber(radix, maxDigits, allowZeroPrefix, maxBytes) {
      return this.readAtomically(() => {
        let result = 0;
        let digitCount = 0;
        const leadingChar = this.peekChar();
        if (leadingChar === void 0) {
          return void 0;
        }
        const hasLeadingZero = leadingChar === "0";
        const maxValue = 2 ** (8 * maxBytes) - 1;
        while (true) {
          const digit = this.readAtomically(() => {
            const char = this.readChar();
            if (char === void 0) {
              return void 0;
            }
            const num = Number.parseInt(char, radix);
            if (Number.isNaN(num)) {
              return void 0;
            }
            return num;
          });
          if (digit === void 0) {
            break;
          }
          result *= radix;
          result += digit;
          if (result > maxValue) {
            return void 0;
          }
          digitCount += 1;
          if (maxDigits !== void 0) {
            if (digitCount > maxDigits) {
              return void 0;
            }
          }
        }
        if (digitCount === 0) {
          return void 0;
        } else if (!allowZeroPrefix && hasLeadingZero && digitCount > 1) {
          return void 0;
        } else {
          return result;
        }
      });
    }
    readIPv4Addr() {
      return this.readAtomically(() => {
        const out = new Uint8Array(4);
        for (let i = 0; i < out.length; i++) {
          const ix = this.readSeparator(".", i, () =>
            this.readNumber(10, 3, false, 1)
          );
          if (ix === void 0) {
            return void 0;
          }
          out[i] = ix;
        }
        return out;
      });
    }
    readIPv6Addr() {
      const readGroups = (groups) => {
        for (let i = 0; i < groups.length / 2; i++) {
          const ix = i * 2;
          if (i < groups.length - 3) {
            const ipv4 = this.readSeparator(":", i, () => this.readIPv4Addr());
            if (ipv4 !== void 0) {
              groups[ix] = ipv4[0];
              groups[ix + 1] = ipv4[1];
              groups[ix + 2] = ipv4[2];
              groups[ix + 3] = ipv4[3];
              return [ix + 4, true];
            }
          }
          const group = this.readSeparator(":", i, () =>
            this.readNumber(16, 4, true, 2)
          );
          if (group === void 0) {
            return [ix, false];
          }
          groups[ix] = group >> 8;
          groups[ix + 1] = group & 255;
        }
        return [groups.length, false];
      };
      return this.readAtomically(() => {
        const head = new Uint8Array(16);
        const [headSize, headIp4] = readGroups(head);
        if (headSize === 16) {
          return head;
        }
        if (headIp4) {
          return void 0;
        }
        if (this.readGivenChar(":") === void 0) {
          return void 0;
        }
        if (this.readGivenChar(":") === void 0) {
          return void 0;
        }
        const tail = new Uint8Array(14);
        const limit = 16 - (headSize + 2);
        const [tailSize] = readGroups(tail.subarray(0, limit));
        head.set(tail.subarray(0, tailSize), 16 - tailSize);
        return head;
      });
    }
    readIPAddr() {
      return this.readIPv4Addr() ?? this.readIPv6Addr();
    }
  };

  // node_modules/@chainsafe/is-ip/lib/parse.js
  var MAX_IPV6_LENGTH = 45;
  var MAX_IPV4_LENGTH = 15;
  var parser = new Parser();
  function parseIPv4(input) {
    if (input.length > MAX_IPV4_LENGTH) {
      return void 0;
    }
    return parser.new(input).parseWith(() => parser.readIPv4Addr());
  }
  function parseIPv6(input) {
    if (input.length > MAX_IPV6_LENGTH) {
      return void 0;
    }
    return parser.new(input).parseWith(() => parser.readIPv6Addr());
  }
  function parseIP(input) {
    if (input.length > MAX_IPV6_LENGTH) {
      return void 0;
    }
    return parser.new(input).parseWith(() => parser.readIPAddr());
  }

  // node_modules/@chainsafe/is-ip/lib/is-ip.js
  function isIPv4(input) {
    return Boolean(parseIPv4(input));
  }
  function isIPv6(input) {
    return Boolean(parseIPv6(input));
  }
  function isIP(input) {
    return Boolean(parseIP(input));
  }

  // node_modules/uint8arrays/dist/src/util/as-uint8array.js
  function asUint8Array(buf2) {
    if (globalThis.Buffer != null) {
      return new Uint8Array(buf2.buffer, buf2.byteOffset, buf2.byteLength);
    }
    return buf2;
  }

  // node_modules/uint8arrays/dist/src/alloc.js
  function allocUnsafe(size = 0) {
    if (globalThis.Buffer?.allocUnsafe != null) {
      return asUint8Array(globalThis.Buffer.allocUnsafe(size));
    }
    return new Uint8Array(size);
  }

  // node_modules/uint8arrays/dist/src/util/bases.js
  function createCodec(name8, prefix, encode15, decode16) {
    return {
      name: name8,
      prefix,
      encoder: {
        name: name8,
        prefix,
        encode: encode15,
      },
      decoder: {
        decode: decode16,
      },
    };
  }
  var string = createCodec(
    "utf8",
    "u",
    (buf2) => {
      const decoder = new TextDecoder("utf8");
      return "u" + decoder.decode(buf2);
    },
    (str) => {
      const encoder = new TextEncoder();
      return encoder.encode(str.substring(1));
    }
  );
  var ascii = createCodec(
    "ascii",
    "a",
    (buf2) => {
      let string2 = "a";
      for (let i = 0; i < buf2.length; i++) {
        string2 += String.fromCharCode(buf2[i]);
      }
      return string2;
    },
    (str) => {
      str = str.substring(1);
      const buf2 = allocUnsafe(str.length);
      for (let i = 0; i < str.length; i++) {
        buf2[i] = str.charCodeAt(i);
      }
      return buf2;
    }
  );
  var BASES = {
    utf8: string,
    "utf-8": string,
    hex: bases.base16,
    latin1: ascii,
    ascii,
    binary: ascii,
    ...bases,
  };
  var bases_default = BASES;

  // node_modules/uint8arrays/dist/src/to-string.js
  function toString3(array, encoding = "utf8") {
    const base3 = bases_default[encoding];
    if (base3 == null) {
      throw new Error(`Unsupported encoding "${encoding}"`);
    }
    if (
      (encoding === "utf8" || encoding === "utf-8") &&
      globalThis.Buffer != null &&
      globalThis.Buffer.from != null
    ) {
      return globalThis.Buffer.from(
        array.buffer,
        array.byteOffset,
        array.byteLength
      ).toString("utf8");
    }
    return base3.encoder.encode(array).substring(1);
  }

  // node_modules/@multiformats/multiaddr/dist/src/ip.js
  var isV4 = isIPv4;
  var isV6 = isIPv6;
  var toBytes = function (ip) {
    let offset = 0;
    ip = ip.toString().trim();
    if (isV4(ip)) {
      const bytes = new Uint8Array(offset + 4);
      ip.split(/\./g).forEach((byte) => {
        bytes[offset++] = parseInt(byte, 10) & 255;
      });
      return bytes;
    }
    if (isV6(ip)) {
      const sections = ip.split(":", 8);
      let i;
      for (i = 0; i < sections.length; i++) {
        const isv4 = isV4(sections[i]);
        let v4Buffer;
        if (isv4) {
          v4Buffer = toBytes(sections[i]);
          sections[i] = toString3(v4Buffer.slice(0, 2), "base16");
        }
        if (v4Buffer != null && ++i < 8) {
          sections.splice(i, 0, toString3(v4Buffer.slice(2, 4), "base16"));
        }
      }
      if (sections[0] === "") {
        while (sections.length < 8) sections.unshift("0");
      } else if (sections[sections.length - 1] === "") {
        while (sections.length < 8) sections.push("0");
      } else if (sections.length < 8) {
        for (i = 0; i < sections.length && sections[i] !== ""; i++);
        const argv = [i, 1];
        for (i = 9 - sections.length; i > 0; i--) {
          argv.push("0");
        }
        sections.splice.apply(sections, argv);
      }
      const bytes = new Uint8Array(offset + 16);
      for (i = 0; i < sections.length; i++) {
        const word = parseInt(sections[i], 16);
        bytes[offset++] = (word >> 8) & 255;
        bytes[offset++] = word & 255;
      }
      return bytes;
    }
    throw new Error("invalid ip address");
  };
  var toString4 = function (buf2, offset = 0, length2) {
    offset = ~~offset;
    length2 = length2 ?? buf2.length - offset;
    const view = new DataView(buf2.buffer);
    if (length2 === 4) {
      const result = [];
      for (let i = 0; i < length2; i++) {
        result.push(buf2[offset + i]);
      }
      return result.join(".");
    }
    if (length2 === 16) {
      const result = [];
      for (let i = 0; i < length2; i += 2) {
        result.push(view.getUint16(offset + i).toString(16));
      }
      return result
        .join(":")
        .replace(/(^|:)0(:0)*:0(:|$)/, "$1::$3")
        .replace(/:{3,4}/, "::");
    }
    return "";
  };

  // node_modules/@multiformats/multiaddr/dist/src/protocols-table.js
  var V = -1;
  var names = {};
  var codes = {};
  var table = [
    [4, 32, "ip4"],
    [6, 16, "tcp"],
    [33, 16, "dccp"],
    [41, 128, "ip6"],
    [42, V, "ip6zone"],
    [53, V, "dns", true],
    [54, V, "dns4", true],
    [55, V, "dns6", true],
    [56, V, "dnsaddr", true],
    [132, 16, "sctp"],
    [273, 16, "udp"],
    [275, 0, "p2p-webrtc-star"],
    [276, 0, "p2p-webrtc-direct"],
    [277, 0, "p2p-stardust"],
    [280, 0, "webrtc"],
    [290, 0, "p2p-circuit"],
    [301, 0, "udt"],
    [302, 0, "utp"],
    [400, V, "unix", false, true],
    [421, V, "ipfs"],
    [421, V, "p2p"],
    [443, 0, "https"],
    [444, 96, "onion"],
    [445, 296, "onion3"],
    [446, V, "garlic64"],
    [460, 0, "quic"],
    [465, 0, "webtransport"],
    [466, V, "certhash"],
    [477, 0, "ws"],
    [478, 0, "wss"],
    [479, 0, "p2p-websocket-star"],
    [480, 0, "http"],
    [777, V, "memory"],
  ];
  table.forEach((row) => {
    const proto = createProtocol(...row);
    codes[proto.code] = proto;
    names[proto.name] = proto;
  });
  function createProtocol(code8, size, name8, resolvable, path) {
    return {
      code: code8,
      size,
      name: name8,
      resolvable: Boolean(resolvable),
      path: Boolean(path),
    };
  }
  function getProtocol(proto) {
    if (typeof proto === "number") {
      if (codes[proto] != null) {
        return codes[proto];
      }
      throw new Error(`no protocol with code: ${proto}`);
    } else if (typeof proto === "string") {
      if (names[proto] != null) {
        return names[proto];
      }
      throw new Error(`no protocol with name: ${proto}`);
    }
    throw new Error(`invalid protocol id type: ${typeof proto}`);
  }

  // node_modules/@multiformats/multiaddr/dist/src/convert.js
  var import_varint2 = __toESM(require_varint(), 1);

  // node_modules/uint8arrays/dist/src/from-string.js
  function fromString3(string2, encoding = "utf8") {
    const base3 = bases_default[encoding];
    if (base3 == null) {
      throw new Error(`Unsupported encoding "${encoding}"`);
    }
    if (
      (encoding === "utf8" || encoding === "utf-8") &&
      globalThis.Buffer != null &&
      globalThis.Buffer.from != null
    ) {
      return asUint8Array(globalThis.Buffer.from(string2, "utf-8"));
    }
    return base3.decoder.decode(`${base3.prefix}${string2}`);
  }

  // node_modules/uint8arrays/dist/src/concat.js
  function concat2(arrays, length2) {
    if (length2 == null) {
      length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
    }
    const output = allocUnsafe(length2);
    let offset = 0;
    for (const arr of arrays) {
      output.set(arr, offset);
      offset += arr.length;
    }
    return asUint8Array(output);
  }

  // node_modules/@multiformats/multiaddr/dist/src/convert.js
  function convertToString(proto, buf2) {
    const protocol = getProtocol(proto);
    switch (protocol.code) {
      case 4:
      case 41:
        return bytes2ip(buf2);
      case 6:
      case 273:
      case 33:
      case 132:
        return bytes2port(buf2).toString();
      case 53:
      case 54:
      case 55:
      case 56:
      case 400:
      case 777:
        return bytes2str(buf2);
      case 421:
        return bytes2mh(buf2);
      case 444:
        return bytes2onion(buf2);
      case 445:
        return bytes2onion(buf2);
      case 466:
        return bytes2mb(buf2);
      default:
        return toString3(buf2, "base16");
    }
  }
  function convertToBytes(proto, str) {
    const protocol = getProtocol(proto);
    switch (protocol.code) {
      case 4:
        return ip2bytes(str);
      case 41:
        return ip2bytes(str);
      case 6:
      case 273:
      case 33:
      case 132:
        return port2bytes(parseInt(str, 10));
      case 53:
      case 54:
      case 55:
      case 56:
      case 400:
      case 777:
        return str2bytes(str);
      case 421:
        return mh2bytes(str);
      case 444:
        return onion2bytes(str);
      case 445:
        return onion32bytes(str);
      case 466:
        return mb2bytes(str);
      default:
        return fromString3(str, "base16");
    }
  }
  var decoders = Object.values(bases).map((c) => c.decoder);
  var anybaseDecoder = (function () {
    let acc = decoders[0].or(decoders[1]);
    decoders.slice(2).forEach((d) => (acc = acc.or(d)));
    return acc;
  })();
  function ip2bytes(ipString) {
    if (!isIP(ipString)) {
      throw new Error("invalid ip address");
    }
    return toBytes(ipString);
  }
  function bytes2ip(ipBuff) {
    const ipString = toString4(ipBuff, 0, ipBuff.length);
    if (ipString == null) {
      throw new Error("ipBuff is required");
    }
    if (!isIP(ipString)) {
      throw new Error("invalid ip address");
    }
    return ipString;
  }
  function port2bytes(port) {
    const buf2 = new ArrayBuffer(2);
    const view = new DataView(buf2);
    view.setUint16(0, port);
    return new Uint8Array(buf2);
  }
  function bytes2port(buf2) {
    const view = new DataView(buf2.buffer);
    return view.getUint16(buf2.byteOffset);
  }
  function str2bytes(str) {
    const buf2 = fromString3(str);
    const size = Uint8Array.from(import_varint2.default.encode(buf2.length));
    return concat2([size, buf2], size.length + buf2.length);
  }
  function bytes2str(buf2) {
    const size = import_varint2.default.decode(buf2);
    buf2 = buf2.slice(import_varint2.default.decode.bytes);
    if (buf2.length !== size) {
      throw new Error("inconsistent lengths");
    }
    return toString3(buf2);
  }
  function mh2bytes(hash) {
    let mh;
    if (hash[0] === "Q" || hash[0] === "1") {
      mh = decode3(base58btc.decode(`z${hash}`)).bytes;
    } else {
      mh = CID.parse(hash).multihash.bytes;
    }
    const size = Uint8Array.from(import_varint2.default.encode(mh.length));
    return concat2([size, mh], size.length + mh.length);
  }
  function mb2bytes(mbstr) {
    const mb = anybaseDecoder.decode(mbstr);
    const size = Uint8Array.from(import_varint2.default.encode(mb.length));
    return concat2([size, mb], size.length + mb.length);
  }
  function bytes2mb(buf2) {
    const size = import_varint2.default.decode(buf2);
    const hash = buf2.slice(import_varint2.default.decode.bytes);
    if (hash.length !== size) {
      throw new Error("inconsistent lengths");
    }
    return "u" + toString3(hash, "base64url");
  }
  function bytes2mh(buf2) {
    const size = import_varint2.default.decode(buf2);
    const address = buf2.slice(import_varint2.default.decode.bytes);
    if (address.length !== size) {
      throw new Error("inconsistent lengths");
    }
    return toString3(address, "base58btc");
  }
  function onion2bytes(str) {
    const addr = str.split(":");
    if (addr.length !== 2) {
      throw new Error(
        `failed to parse onion addr: ["'${addr.join(
          '", "'
        )}'"]' does not contain a port number`
      );
    }
    if (addr[0].length !== 16) {
      throw new Error(
        `failed to parse onion addr: ${addr[0]} not a Tor onion address.`
      );
    }
    const buf2 = base32.decode("b" + addr[0]);
    const port = parseInt(addr[1], 10);
    if (port < 1 || port > 65536) {
      throw new Error("Port number is not in range(1, 65536)");
    }
    const portBuf = port2bytes(port);
    return concat2([buf2, portBuf], buf2.length + portBuf.length);
  }
  function onion32bytes(str) {
    const addr = str.split(":");
    if (addr.length !== 2) {
      throw new Error(
        `failed to parse onion addr: ["'${addr.join(
          '", "'
        )}'"]' does not contain a port number`
      );
    }
    if (addr[0].length !== 56) {
      throw new Error(
        `failed to parse onion addr: ${addr[0]} not a Tor onion3 address.`
      );
    }
    const buf2 = base32.decode(`b${addr[0]}`);
    const port = parseInt(addr[1], 10);
    if (port < 1 || port > 65536) {
      throw new Error("Port number is not in range(1, 65536)");
    }
    const portBuf = port2bytes(port);
    return concat2([buf2, portBuf], buf2.length + portBuf.length);
  }
  function bytes2onion(buf2) {
    const addrBytes = buf2.slice(0, buf2.length - 2);
    const portBytes = buf2.slice(buf2.length - 2);
    const addr = toString3(addrBytes, "base32");
    const port = bytes2port(portBytes);
    return `${addr}:${port}`;
  }

  // node_modules/@multiformats/multiaddr/dist/src/codec.js
  var import_varint3 = __toESM(require_varint(), 1);
  function stringToStringTuples(str) {
    const tuples = [];
    const parts = str.split("/").slice(1);
    if (parts.length === 1 && parts[0] === "") {
      return [];
    }
    for (let p = 0; p < parts.length; p++) {
      const part = parts[p];
      const proto = getProtocol(part);
      if (proto.size === 0) {
        tuples.push([part]);
        continue;
      }
      p++;
      if (p >= parts.length) {
        throw ParseError("invalid address: " + str);
      }
      if (proto.path === true) {
        tuples.push([part, cleanPath(parts.slice(p).join("/"))]);
        break;
      }
      tuples.push([part, parts[p]]);
    }
    return tuples;
  }
  function stringTuplesToString(tuples) {
    const parts = [];
    tuples.map((tup) => {
      const proto = protoFromTuple(tup);
      parts.push(proto.name);
      if (tup.length > 1 && tup[1] != null) {
        parts.push(tup[1]);
      }
      return null;
    });
    return cleanPath(parts.join("/"));
  }
  function stringTuplesToTuples(tuples) {
    return tuples.map((tup) => {
      if (!Array.isArray(tup)) {
        tup = [tup];
      }
      const proto = protoFromTuple(tup);
      if (tup.length > 1) {
        return [proto.code, convertToBytes(proto.code, tup[1])];
      }
      return [proto.code];
    });
  }
  function tuplesToStringTuples(tuples) {
    return tuples.map((tup) => {
      const proto = protoFromTuple(tup);
      if (tup[1] != null) {
        return [proto.code, convertToString(proto.code, tup[1])];
      }
      return [proto.code];
    });
  }
  function tuplesToBytes(tuples) {
    return fromBytes(
      concat2(
        tuples.map((tup) => {
          const proto = protoFromTuple(tup);
          let buf2 = Uint8Array.from(import_varint3.default.encode(proto.code));
          if (tup.length > 1 && tup[1] != null) {
            buf2 = concat2([buf2, tup[1]]);
          }
          return buf2;
        })
      )
    );
  }
  function sizeForAddr(p, addr) {
    if (p.size > 0) {
      return p.size / 8;
    } else if (p.size === 0) {
      return 0;
    } else {
      const size = import_varint3.default.decode(addr);
      return size + import_varint3.default.decode.bytes;
    }
  }
  function bytesToTuples(buf2) {
    const tuples = [];
    let i = 0;
    while (i < buf2.length) {
      const code8 = import_varint3.default.decode(buf2, i);
      const n = import_varint3.default.decode.bytes;
      const p = getProtocol(code8);
      const size = sizeForAddr(p, buf2.slice(i + n));
      if (size === 0) {
        tuples.push([code8]);
        i += n;
        continue;
      }
      const addr = buf2.slice(i + n, i + n + size);
      i += size + n;
      if (i > buf2.length) {
        throw ParseError(
          "Invalid address Uint8Array: " + toString3(buf2, "base16")
        );
      }
      tuples.push([code8, addr]);
    }
    return tuples;
  }
  function bytesToString(buf2) {
    const a = bytesToTuples(buf2);
    const b = tuplesToStringTuples(a);
    return stringTuplesToString(b);
  }
  function stringToBytes(str) {
    str = cleanPath(str);
    const a = stringToStringTuples(str);
    const b = stringTuplesToTuples(a);
    return tuplesToBytes(b);
  }
  function fromString4(str) {
    return stringToBytes(str);
  }
  function fromBytes(buf2) {
    const err = validateBytes(buf2);
    if (err != null) {
      throw err;
    }
    return Uint8Array.from(buf2);
  }
  function validateBytes(buf2) {
    try {
      bytesToTuples(buf2);
    } catch (err) {
      return err;
    }
  }
  function cleanPath(str) {
    return (
      "/" +
      str
        .trim()
        .split("/")
        .filter((a) => a)
        .join("/")
    );
  }
  function ParseError(str) {
    return new Error("Error parsing address: " + str);
  }
  function protoFromTuple(tup) {
    const proto = getProtocol(tup[0]);
    return proto;
  }

  // node_modules/@multiformats/multiaddr/dist/src/index.js
  var import_varint4 = __toESM(require_varint(), 1);
  var import_err_code = __toESM(require_err_code(), 1);

  // node_modules/uint8arrays/dist/src/equals.js
  function equals3(a, b) {
    if (a === b) {
      return true;
    }
    if (a.byteLength !== b.byteLength) {
      return false;
    }
    for (let i = 0; i < a.byteLength; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }

  // node_modules/@multiformats/multiaddr/dist/src/index.js
  var __classPrivateFieldGet = function (receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it"
      );
    return kind === "m"
      ? f
      : kind === "a"
      ? f.call(receiver)
      : f
      ? f.value
      : state.get(receiver);
  };
  var __classPrivateFieldSet = function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it"
      );
    return (
      kind === "a"
        ? f.call(receiver, value)
        : f
        ? (f.value = value)
        : state.set(receiver, value),
      value
    );
  };
  var _DefaultMultiaddr_string;
  var _DefaultMultiaddr_tuples;
  var _DefaultMultiaddr_stringTuples;
  var _a;
  var inspect = Symbol.for("nodejs.util.inspect.custom");
  var DNS_CODES = [
    getProtocol("dns").code,
    getProtocol("dns4").code,
    getProtocol("dns6").code,
    getProtocol("dnsaddr").code,
  ];
  var P2P_CODES = [getProtocol("p2p").code, getProtocol("ipfs").code];
  var resolvers = /* @__PURE__ */ new Map();
  var symbol = Symbol.for("@multiformats/js-multiaddr/multiaddr");
  function isMultiaddr(value) {
    return Boolean(value?.[symbol]);
  }
  var DefaultMultiaddr = class {
    constructor(addr) {
      _DefaultMultiaddr_string.set(this, void 0);
      _DefaultMultiaddr_tuples.set(this, void 0);
      _DefaultMultiaddr_stringTuples.set(this, void 0);
      this[_a] = true;
      if (addr == null) {
        addr = "";
      }
      if (addr instanceof Uint8Array) {
        this.bytes = fromBytes(addr);
      } else if (typeof addr === "string") {
        if (addr.length > 0 && addr.charAt(0) !== "/") {
          throw new Error(`multiaddr "${addr}" must start with a "/"`);
        }
        this.bytes = fromString4(addr);
      } else if (isMultiaddr(addr)) {
        this.bytes = fromBytes(addr.bytes);
      } else {
        throw new Error("addr must be a string, Buffer, or another Multiaddr");
      }
    }
    toString() {
      if (__classPrivateFieldGet(this, _DefaultMultiaddr_string, "f") == null) {
        __classPrivateFieldSet(
          this,
          _DefaultMultiaddr_string,
          bytesToString(this.bytes),
          "f"
        );
      }
      return __classPrivateFieldGet(this, _DefaultMultiaddr_string, "f");
    }
    toJSON() {
      return this.toString();
    }
    toOptions() {
      const codes2 = this.protoCodes();
      const parts = this.toString().split("/").slice(1);
      let transport;
      let port;
      if (parts.length > 2) {
        if (DNS_CODES.includes(codes2[0]) && P2P_CODES.includes(codes2[1])) {
          transport = getProtocol("tcp").name;
          port = 443;
        } else {
          transport = getProtocol(parts[2]).name;
          port = parseInt(parts[3]);
        }
      } else if (DNS_CODES.includes(codes2[0])) {
        transport = getProtocol("tcp").name;
        port = 443;
      } else {
        throw new Error(
          'multiaddr must have a valid format: "/{ip4, ip6, dns4, dns6, dnsaddr}/{address}/{tcp, udp}/{port}".'
        );
      }
      const opts = {
        family: codes2[0] === 41 || codes2[0] === 55 ? 6 : 4,
        host: parts[1],
        transport,
        port,
      };
      return opts;
    }
    protos() {
      return this.protoCodes().map((code8) =>
        Object.assign({}, getProtocol(code8))
      );
    }
    protoCodes() {
      const codes2 = [];
      const buf2 = this.bytes;
      let i = 0;
      while (i < buf2.length) {
        const code8 = import_varint4.default.decode(buf2, i);
        const n = import_varint4.default.decode.bytes;
        const p = getProtocol(code8);
        const size = sizeForAddr(p, buf2.slice(i + n));
        i += size + n;
        codes2.push(code8);
      }
      return codes2;
    }
    protoNames() {
      return this.protos().map((proto) => proto.name);
    }
    tuples() {
      if (__classPrivateFieldGet(this, _DefaultMultiaddr_tuples, "f") == null) {
        __classPrivateFieldSet(
          this,
          _DefaultMultiaddr_tuples,
          bytesToTuples(this.bytes),
          "f"
        );
      }
      return __classPrivateFieldGet(this, _DefaultMultiaddr_tuples, "f");
    }
    stringTuples() {
      if (
        __classPrivateFieldGet(this, _DefaultMultiaddr_stringTuples, "f") ==
        null
      ) {
        __classPrivateFieldSet(
          this,
          _DefaultMultiaddr_stringTuples,
          tuplesToStringTuples(this.tuples()),
          "f"
        );
      }
      return __classPrivateFieldGet(this, _DefaultMultiaddr_stringTuples, "f");
    }
    encapsulate(addr) {
      addr = new DefaultMultiaddr(addr);
      return new DefaultMultiaddr(this.toString() + addr.toString());
    }
    decapsulate(addr) {
      const addrString = addr.toString();
      const s = this.toString();
      const i = s.lastIndexOf(addrString);
      if (i < 0) {
        throw new Error(
          `Address ${this.toString()} does not contain subaddress: ${addr.toString()}`
        );
      }
      return new DefaultMultiaddr(s.slice(0, i));
    }
    decapsulateCode(code8) {
      const tuples = this.tuples();
      for (let i = tuples.length - 1; i >= 0; i--) {
        if (tuples[i][0] === code8) {
          return new DefaultMultiaddr(tuplesToBytes(tuples.slice(0, i)));
        }
      }
      return this;
    }
    getPeerId() {
      try {
        const tuples = this.stringTuples().filter((tuple2) => {
          if (tuple2[0] === names.ipfs.code) {
            return true;
          }
          return false;
        });
        const tuple = tuples.pop();
        if (tuple?.[1] != null) {
          const peerIdStr = tuple[1];
          if (peerIdStr[0] === "Q" || peerIdStr[0] === "1") {
            return toString3(base58btc.decode(`z${peerIdStr}`), "base58btc");
          }
          return toString3(CID.parse(peerIdStr).multihash.bytes, "base58btc");
        }
        return null;
      } catch (e) {
        return null;
      }
    }
    getPath() {
      let path = null;
      try {
        path = this.stringTuples().filter((tuple) => {
          const proto = getProtocol(tuple[0]);
          if (proto.path === true) {
            return true;
          }
          return false;
        })[0][1];
        if (path == null) {
          path = null;
        }
      } catch {
        path = null;
      }
      return path;
    }
    equals(addr) {
      return equals3(this.bytes, addr.bytes);
    }
    async resolve(options) {
      const resolvableProto = this.protos().find((p) => p.resolvable);
      if (resolvableProto == null) {
        return [this];
      }
      const resolver = resolvers.get(resolvableProto.name);
      if (resolver == null) {
        throw (0, import_err_code.default)(
          new Error(`no available resolver for ${resolvableProto.name}`),
          "ERR_NO_AVAILABLE_RESOLVER"
        );
      }
      const addresses = await resolver(this, options);
      return addresses.map((a) => new DefaultMultiaddr(a));
    }
    nodeAddress() {
      const options = this.toOptions();
      if (options.transport !== "tcp" && options.transport !== "udp") {
        throw new Error(
          `multiaddr must have a valid format - no protocol with name: "${options.transport}". Must have a valid transport protocol: "{tcp, udp}"`
        );
      }
      return {
        family: options.family,
        address: options.host,
        port: options.port,
      };
    }
    isThinWaistAddress(addr) {
      const protos = (addr ?? this).protos();
      if (protos.length !== 2) {
        return false;
      }
      if (protos[0].code !== 4 && protos[0].code !== 41) {
        return false;
      }
      if (protos[1].code !== 6 && protos[1].code !== 273) {
        return false;
      }
      return true;
    }
    [((_DefaultMultiaddr_string = /* @__PURE__ */ new WeakMap()),
    (_DefaultMultiaddr_tuples = /* @__PURE__ */ new WeakMap()),
    (_DefaultMultiaddr_stringTuples = /* @__PURE__ */ new WeakMap()),
    (_a = symbol),
    inspect)]() {
      return this.inspect();
    }
    inspect() {
      return (
        "<Multiaddr " +
        toString3(this.bytes, "base16") +
        " - " +
        bytesToString(this.bytes) +
        ">"
      );
    }
  };
  function multiaddr(addr) {
    return new DefaultMultiaddr(addr);
  }

  // node_modules/ipfs-http-client/src/lib/core.js
  var import_env = __toESM(require_env(), 1);

  // node_modules/parse-duration/index.mjs
  var durationRE = /(-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?)\s*([\p{L}]*)/giu;
  parse.nanosecond = parse.ns = 1 / 1e6;
  parse["\xB5s"] = parse["\u03BCs"] = parse.us = parse.microsecond = 1 / 1e3;
  parse.millisecond = parse.ms = parse[""] = 1;
  parse.second = parse.sec = parse.s = parse.ms * 1e3;
  parse.minute = parse.min = parse.m = parse.s * 60;
  parse.hour = parse.hr = parse.h = parse.m * 60;
  parse.day = parse.d = parse.h * 24;
  parse.week = parse.wk = parse.w = parse.d * 7;
  parse.month = parse.b = parse.d * (365.25 / 12);
  parse.year = parse.yr = parse.y = parse.d * 365.25;
  function parse(str = "", format2 = "ms") {
    var result = null;
    str = (str + "").replace(/(\d)[,_](\d)/g, "$1$2");
    str.replace(durationRE, function (_, n, units) {
      units = unitRatio(units);
      if (units) result = (result || 0) + parseFloat(n, 10) * units;
    });
    return result && result / (unitRatio(format2) || 1);
  }
  function unitRatio(str) {
    return parse[str] || parse[str.toLowerCase().replace(/s$/, "")];
  }
  var parse_duration_default = parse;

  // node_modules/@libp2p/logger/dist/src/index.js
  var import_debug = __toESM(require_browser(), 1);
  import_debug.default.formatters.b = (v) => {
    return v == null ? "undefined" : base58btc.baseEncode(v);
  };
  import_debug.default.formatters.t = (v) => {
    return v == null ? "undefined" : base32.baseEncode(v);
  };
  import_debug.default.formatters.m = (v) => {
    return v == null ? "undefined" : base64.baseEncode(v);
  };
  import_debug.default.formatters.p = (v) => {
    return v == null ? "undefined" : v.toString();
  };
  import_debug.default.formatters.c = (v) => {
    return v == null ? "undefined" : v.toString();
  };
  import_debug.default.formatters.k = (v) => {
    return v == null ? "undefined" : v.toString();
  };
  function logger(name8) {
    return Object.assign((0, import_debug.default)(name8), {
      error: (0, import_debug.default)(`${name8}:error`),
      trace: (0, import_debug.default)(`${name8}:trace`),
    });
  }

  // node_modules/ipfs-http-client/src/lib/core.js
  var import_http = __toESM(require_http(), 1);

  // node_modules/merge-options/index.mjs
  var import_index2 = __toESM(require_merge_options(), 1);
  var merge_options_default = import_index2.default;

  // node_modules/@multiformats/multiaddr-to-uri/dist/src/index.js
  var reduceValue = (_, v) => v;
  var tcpUri = (str, port, parts, opts) => {
    if (opts != null && opts.assumeHttp === false)
      return `tcp://${str}:${port}`;
    let protocol = "tcp";
    let explicitPort = `:${port}`;
    const last2 = parts[parts.length - 1];
    if (last2.protocol === "tcp") {
      protocol = port === "443" ? "https" : "http";
      explicitPort = port === "443" || port === "80" ? "" : explicitPort;
    }
    return `${protocol}://${str}${explicitPort}`;
  };
  var Reducers = {
    ip4: reduceValue,
    ip6: (str, content, i, parts) =>
      parts.length === 1 && parts[0].protocol === "ip6"
        ? content
        : `[${content}]`,
    tcp: (str, content, i, parts, opts) =>
      parts.some((p) => ["http", "https", "ws", "wss"].includes(p.protocol))
        ? `${str}:${content}`
        : tcpUri(str, content, parts, opts),
    udp: (str, content) => `udp://${str}:${content}`,
    dnsaddr: reduceValue,
    dns4: reduceValue,
    dns6: reduceValue,
    ipfs: (str, content) => `${str}/ipfs/${content}`,
    p2p: (str, content) => `${str}/p2p/${content}`,
    http: (str) => `http://${str}`,
    https: (str) => `https://${str}`,
    ws: (str) => `ws://${str}`,
    wss: (str) => `wss://${str}`,
    "p2p-websocket-star": (str) => `${str}/p2p-websocket-star`,
    "p2p-webrtc-star": (str) => `${str}/p2p-webrtc-star`,
    "p2p-webrtc-direct": (str) => `${str}/p2p-webrtc-direct`,
  };
  function multiaddrToUri(input, opts) {
    const ma = multiaddr(input);
    const parts = ma.toString().split("/").slice(1);
    return ma
      .tuples()
      .map((tuple) => ({
        protocol: parts.shift() ?? "",
        content: tuple[1] != null ? parts.shift() ?? "" : "",
      }))
      .reduce((str, part, i, parts2) => {
        const reduce = Reducers[part.protocol];
        if (reduce == null) {
          throw new Error(`Unsupported protocol ${part.protocol}`);
        }
        return reduce(str, part.content, i, parts2, opts);
      }, "");
  }

  // node_modules/ipfs-core-utils/src/to-url-string.js
  function toUrlString(url) {
    try {
      url = multiaddrToUri(multiaddr(url));
    } catch (err) {}
    url = url.toString();
    return url;
  }

  // node_modules/ipfs-core-utils/src/agent.browser.js
  var agent_browser_default = () => {};

  // node_modules/ipfs-http-client/src/lib/core.js
  var log = logger("ipfs-http-client:lib:error-handler");
  var merge = merge_options_default.bind({ ignoreUndefined: true });
  var DEFAULT_PROTOCOL =
    import_env.isBrowser || import_env.isWebWorker ? location.protocol : "http";
  var DEFAULT_HOST =
    import_env.isBrowser || import_env.isWebWorker
      ? location.hostname
      : "localhost";
  var DEFAULT_PORT =
    import_env.isBrowser || import_env.isWebWorker ? location.port : "5001";
  var normalizeOptions = (options = {}) => {
    let url;
    let opts = {};
    let agent;
    if (typeof options === "string" || isMultiaddr(options)) {
      url = new URL(toUrlString(options));
    } else if (options instanceof URL) {
      url = options;
    } else if (typeof options.url === "string" || isMultiaddr(options.url)) {
      url = new URL(toUrlString(options.url));
      opts = options;
    } else if (options.url instanceof URL) {
      url = options.url;
      opts = options;
    } else {
      opts = options || {};
      const protocol = (opts.protocol || DEFAULT_PROTOCOL).replace(":", "");
      const host = (opts.host || DEFAULT_HOST).split(":")[0];
      const port = opts.port || DEFAULT_PORT;
      url = new URL(`${protocol}://${host}:${port}`);
    }
    if (opts.apiPath) {
      url.pathname = opts.apiPath;
    } else if (url.pathname === "/" || url.pathname === void 0) {
      url.pathname = "api/v0";
    }
    if (import_env.isNode) {
      const Agent = agent_browser_default(url);
      agent =
        opts.agent ||
        new Agent({
          keepAlive: true,
          maxSockets: 6,
        });
    }
    return {
      ...opts,
      host: url.host,
      protocol: url.protocol.replace(":", ""),
      port: Number(url.port),
      apiPath: url.pathname,
      url,
      agent,
    };
  };
  var errorHandler = async (response) => {
    let msg;
    try {
      if (
        (response.headers.get("Content-Type") || "").startsWith(
          "application/json"
        )
      ) {
        const data = await response.json();
        log(data);
        msg = data.Message || data.message;
      } else {
        msg = await response.text();
      }
    } catch (err) {
      log("Failed to parse error response", err);
      msg = err.message;
    }
    let error = new import_http.default.HTTPError(response);
    if (msg) {
      if (msg.includes("deadline has elapsed")) {
        error = new import_http.default.TimeoutError();
      }
      if (msg && msg.includes("context deadline exceeded")) {
        error = new import_http.default.TimeoutError();
      }
    }
    if (msg && msg.includes("request timed out")) {
      error = new import_http.default.TimeoutError();
    }
    if (msg) {
      error.message = msg;
    }
    throw error;
  };
  var KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
  var kebabCase = (str) => {
    return str.replace(KEBAB_REGEX, function (match) {
      return "-" + match.toLowerCase();
    });
  };
  var parseTimeout = (value) => {
    return typeof value === "string" ? parse_duration_default(value) : value;
  };
  var Client = class extends import_http.default {
    constructor(options = {}) {
      const opts = normalizeOptions(options);
      super({
        timeout: parseTimeout(opts.timeout || 0) || void 0,
        headers: opts.headers,
        base: `${opts.url}`,
        handleError: errorHandler,
        transformSearchParams: (search) => {
          const out = new URLSearchParams();
          for (const [key, value] of search) {
            if (value !== "undefined" && value !== "null" && key !== "signal") {
              out.append(kebabCase(key), value);
            }
            if (key === "timeout" && !isNaN(value)) {
              out.append(kebabCase(key), value);
            }
          }
          return out;
        },
        agent: opts.agent,
      });
      delete this.get;
      delete this.put;
      delete this.delete;
      delete this.options;
      const fetch = this.fetch;
      this.fetch = (resource, options2 = {}) => {
        if (typeof resource === "string" && !resource.startsWith("/")) {
          resource = `${opts.url}/${resource}`;
        }
        return fetch.call(
          this,
          resource,
          merge(options2, {
            method: "POST",
          })
        );
      };
    }
  };
  var HTTPError = import_http.default.HTTPError;

  // node_modules/ipfs-http-client/src/lib/configure.js
  var configure = (fn) => {
    return (options) => {
      return fn(new Client(options), options);
    };
  };

  // node_modules/ipfs-http-client/src/lib/mode-to-string.js
  function modeToString(mode) {
    if (mode == null) {
      return void 0;
    }
    if (typeof mode === "string") {
      return mode;
    }
    return mode.toString(8).padStart(4, "0");
  }

  // node_modules/ipfs-http-client/src/lib/parse-mtime.js
  var import_err_code2 = __toESM(require_err_code2(), 1);
  function parseMtime(input) {
    if (input == null) {
      return void 0;
    }
    let mtime;
    if (input.secs != null) {
      mtime = {
        secs: input.secs,
        nsecs: input.nsecs,
      };
    }
    if (input.Seconds != null) {
      mtime = {
        secs: input.Seconds,
        nsecs: input.FractionalNanoseconds,
      };
    }
    if (Array.isArray(input)) {
      mtime = {
        secs: input[0],
        nsecs: input[1],
      };
    }
    if (input instanceof Date) {
      const ms = input.getTime();
      const secs = Math.floor(ms / 1e3);
      mtime = {
        secs,
        nsecs: (ms - secs * 1e3) * 1e3,
      };
    }
    if (!Object.prototype.hasOwnProperty.call(mtime, "secs")) {
      return void 0;
    }
    if (
      mtime != null &&
      mtime.nsecs != null &&
      (mtime.nsecs < 0 || mtime.nsecs > 999999999)
    ) {
      throw (0, import_err_code2.default)(
        new Error("mtime-nsecs must be within the range [0,999999999]"),
        "ERR_INVALID_MTIME_NSECS"
      );
    }
    return mtime;
  }

  // node_modules/ipfs-http-client/src/lib/to-url-search-params.js
  function toUrlSearchParams({
    arg,
    searchParams,
    hashAlg,
    mtime,
    mode,
    ...options
  } = {}) {
    if (searchParams) {
      options = {
        ...options,
        ...searchParams,
      };
    }
    if (hashAlg) {
      options.hash = hashAlg;
    }
    if (mtime != null) {
      mtime = parseMtime(mtime);
      options.mtime = mtime.secs;
      options.mtimeNsecs = mtime.nsecs;
    }
    if (mode != null) {
      options.mode = modeToString(mode);
    }
    if (options.timeout && !isNaN(options.timeout)) {
      options.timeout = `${options.timeout}ms`;
    }
    if (arg === void 0 || arg === null) {
      arg = [];
    } else if (!Array.isArray(arg)) {
      arg = [arg];
    }
    const urlSearchParams = new URLSearchParams(options);
    arg.forEach((arg2) => urlSearchParams.append("arg", arg2));
    return urlSearchParams;
  }

  // node_modules/ipfs-http-client/src/bitswap/wantlist.js
  var createWantlist = configure((api) => {
    async function wantlist(options = {}) {
      const res = await (
        await api.post("bitswap/wantlist", {
          signal: options.signal,
          searchParams: toUrlSearchParams(options),
          headers: options.headers,
        })
      ).json();
      return (res.Keys || []).map((k) => CID.parse(k["/"]));
    }
    return wantlist;
  });

  // node_modules/ipfs-http-client/src/bitswap/wantlist-for-peer.js
  var createWantlistForPeer = configure((api) => {
    async function wantlistForPeer(peerId, options = {}) {
      const res = await (
        await api.post("bitswap/wantlist", {
          signal: options.signal,
          searchParams: toUrlSearchParams({
            ...options,
            peer: peerId.toString(),
          }),
          headers: options.headers,
        })
      ).json();
      return (res.Keys || []).map((k) => CID.parse(k["/"]));
    }
    return wantlistForPeer;
  });

  // node_modules/@libp2p/peer-id/dist/src/index.js
  var import_err_code3 = __toESM(require_err_code3(), 1);

  // node_modules/@libp2p/interface-peer-id/dist/src/index.js
  var symbol2 = Symbol.for("@libp2p/peer-id");

  // node_modules/@libp2p/peer-id/dist/src/index.js
  var baseDecoder = Object.values(bases)
    .map((codec) => codec.decoder)
    .reduce((acc, curr) => acc.or(curr), bases.identity.decoder);
  var LIBP2P_KEY_CODE = 114;
  var MARSHALLED_ED225519_PUBLIC_KEY_LENGTH = 36;
  var MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH = 37;
  var PeerIdImpl = class {
    constructor(init) {
      this.type = init.type;
      this.multihash = init.multihash;
      this.privateKey = init.privateKey;
      Object.defineProperty(this, "string", {
        enumerable: false,
        writable: true,
      });
    }
    get [Symbol.toStringTag]() {
      return `PeerId(${this.toString()})`;
    }
    get [symbol2]() {
      return true;
    }
    toString() {
      if (this.string == null) {
        this.string = base58btc.encode(this.multihash.bytes).slice(1);
      }
      return this.string;
    }
    toCID() {
      return CID.createV1(LIBP2P_KEY_CODE, this.multihash);
    }
    toBytes() {
      return this.multihash.bytes;
    }
    toJSON() {
      return this.toString();
    }
    equals(id) {
      if (id instanceof Uint8Array) {
        return equals3(this.multihash.bytes, id);
      } else if (typeof id === "string") {
        return peerIdFromString(id).equals(this);
      } else if (id?.multihash?.bytes != null) {
        return equals3(this.multihash.bytes, id.multihash.bytes);
      } else {
        throw new Error("not valid Id");
      }
    }
  };
  var RSAPeerIdImpl = class extends PeerIdImpl {
    constructor(init) {
      super({ ...init, type: "RSA" });
      this.type = "RSA";
      this.publicKey = init.publicKey;
    }
  };
  var Ed25519PeerIdImpl = class extends PeerIdImpl {
    constructor(init) {
      super({ ...init, type: "Ed25519" });
      this.type = "Ed25519";
      this.publicKey = init.multihash.digest;
    }
  };
  var Secp256k1PeerIdImpl = class extends PeerIdImpl {
    constructor(init) {
      super({ ...init, type: "secp256k1" });
      this.type = "secp256k1";
      this.publicKey = init.multihash.digest;
    }
  };
  function peerIdFromString(str, decoder) {
    decoder = decoder ?? baseDecoder;
    if (str.charAt(0) === "1" || str.charAt(0) === "Q") {
      const multihash = decode3(base58btc.decode(`z${str}`));
      if (str.startsWith("12D")) {
        return new Ed25519PeerIdImpl({ multihash });
      } else if (str.startsWith("16U")) {
        return new Secp256k1PeerIdImpl({ multihash });
      } else {
        return new RSAPeerIdImpl({ multihash });
      }
    }
    return peerIdFromBytes(baseDecoder.decode(str));
  }
  function peerIdFromBytes(buf2) {
    try {
      const multihash = decode3(buf2);
      if (multihash.code === identity.code) {
        if (multihash.digest.length === MARSHALLED_ED225519_PUBLIC_KEY_LENGTH) {
          return new Ed25519PeerIdImpl({ multihash });
        } else if (
          multihash.digest.length === MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH
        ) {
          return new Secp256k1PeerIdImpl({ multihash });
        }
      }
      if (multihash.code === sha256.code) {
        return new RSAPeerIdImpl({ multihash });
      }
    } catch {
      return peerIdFromCID(CID.decode(buf2));
    }
    throw new Error("Supplied PeerID CID is invalid");
  }
  function peerIdFromCID(cid) {
    if (
      cid == null ||
      cid.multihash == null ||
      cid.version == null ||
      (cid.version === 1 && cid.code !== LIBP2P_KEY_CODE)
    ) {
      throw new Error("Supplied PeerID CID is invalid");
    }
    const multihash = cid.multihash;
    if (multihash.code === sha256.code) {
      return new RSAPeerIdImpl({ multihash: cid.multihash });
    } else if (multihash.code === identity.code) {
      if (multihash.digest.length === MARSHALLED_ED225519_PUBLIC_KEY_LENGTH) {
        return new Ed25519PeerIdImpl({ multihash: cid.multihash });
      } else if (
        multihash.digest.length === MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH
      ) {
        return new Secp256k1PeerIdImpl({ multihash: cid.multihash });
      }
    }
    throw new Error("Supplied PeerID CID is invalid");
  }

  // node_modules/ipfs-http-client/src/bitswap/stat.js
  var createStat = configure((api) => {
    async function stat(options = {}) {
      const res = await api.post("bitswap/stat", {
        searchParams: toUrlSearchParams(options),
        signal: options.signal,
        headers: options.headers,
      });
      return toCoreInterface(await res.json());
    }
    return stat;
  });
  function toCoreInterface(res) {
    return {
      provideBufLen: res.ProvideBufLen,
      wantlist: (res.Wantlist || []).map((k) => CID.parse(k["/"])),
      peers: (res.Peers || []).map((str) => peerIdFromString(str)),
      blocksReceived: BigInt(res.BlocksReceived),
      dataReceived: BigInt(res.DataReceived),
      blocksSent: BigInt(res.BlocksSent),
      dataSent: BigInt(res.DataSent),
      dupBlksReceived: BigInt(res.DupBlksReceived),
      dupDataReceived: BigInt(res.DupDataReceived),
    };
  }

  // node_modules/ipfs-http-client/src/bitswap/unwant.js
  var createUnwant = configure((api) => {
    async function unwant(cid, options = {}) {
      const res = await api.post("bitswap/unwant", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: cid.toString(),
          ...options,
        }),
        headers: options.headers,
      });
      return res.json();
    }
    return unwant;
  });

  // node_modules/ipfs-http-client/src/bitswap/index.js
  function createBitswap(config) {
    return {
      wantlist: createWantlist(config),
      wantlistForPeer: createWantlistForPeer(config),
      unwant: createUnwant(config),
      stat: createStat(config),
    };
  }

  // node_modules/ipfs-http-client/src/block/get.js
  var createGet = configure((api) => {
    async function get(cid, options = {}) {
      const res = await api.post("block/get", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: cid.toString(),
          ...options,
        }),
        headers: options.headers,
      });
      return new Uint8Array(await res.arrayBuffer());
    }
    return get;
  });

  // node_modules/ipfs-core-utils/src/files/normalise-content.browser.js
  var import_err_code4 = __toESM(require_err_code4(), 1);

  // node_modules/it-peekable/dist/src/index.js
  function peekableIterator(iterable) {
    const [iterator, symbol3] =
      iterable[Symbol.asyncIterator] != null
        ? [iterable[Symbol.asyncIterator](), Symbol.asyncIterator]
        : [iterable[Symbol.iterator](), Symbol.iterator];
    const queue = [];
    return {
      peek: () => {
        return iterator.next();
      },
      push: (value) => {
        queue.push(value);
      },
      next: () => {
        if (queue.length > 0) {
          return {
            done: false,
            value: queue.shift(),
          };
        }
        return iterator.next();
      },
      [symbol3]() {
        return this;
      },
    };
  }

  // node_modules/browser-readablestream-to-it/dist/src/index.js
  async function* browserReadableStreamToIt(stream, options = {}) {
    const reader = stream.getReader();
    try {
      while (true) {
        const result = await reader.read();
        if (result.done) {
          return;
        }
        yield result.value;
      }
    } finally {
      if (options.preventCancel !== true) {
        await reader.cancel();
      }
      reader.releaseLock();
    }
  }

  // node_modules/it-all/dist/src/index.js
  async function all(source) {
    const arr = [];
    for await (const entry of source) {
      arr.push(entry);
    }
    return arr;
  }

  // node_modules/ipfs-core-utils/src/files/utils.js
  function isBytes(obj) {
    return ArrayBuffer.isView(obj) || obj instanceof ArrayBuffer;
  }
  function isBlob(obj) {
    return (
      obj.constructor &&
      (obj.constructor.name === "Blob" || obj.constructor.name === "File") &&
      typeof obj.stream === "function"
    );
  }
  function isFileObject(obj) {
    return typeof obj === "object" && (obj.path || obj.content);
  }
  var isReadableStream = (value) =>
    value && typeof value.getReader === "function";

  // node_modules/ipfs-core-utils/src/files/normalise-content.browser.js
  async function normaliseContent(input) {
    if (isBytes(input)) {
      return new Blob([input]);
    }
    if (typeof input === "string" || input instanceof String) {
      return new Blob([input.toString()]);
    }
    if (isBlob(input)) {
      return input;
    }
    if (isReadableStream(input)) {
      input = browserReadableStreamToIt(input);
    }
    if (Symbol.iterator in input || Symbol.asyncIterator in input) {
      const peekable = peekableIterator(input);
      const { value, done } = await peekable.peek();
      if (done) {
        return itToBlob(peekable);
      }
      peekable.push(value);
      if (Number.isInteger(value)) {
        return new Blob([Uint8Array.from(await all(peekable))]);
      }
      if (
        isBytes(value) ||
        typeof value === "string" ||
        value instanceof String
      ) {
        return itToBlob(peekable);
      }
    }
    throw (0, import_err_code4.default)(
      new Error(`Unexpected input: ${input}`),
      "ERR_UNEXPECTED_INPUT"
    );
  }
  async function itToBlob(stream) {
    const parts = [];
    for await (const chunk of stream) {
      parts.push(chunk);
    }
    return new Blob(parts);
  }

  // node_modules/ipfs-core-utils/src/files/normalise-candidate-multiple.js
  var import_err_code6 = __toESM(require_err_code4(), 1);

  // node_modules/it-map/dist/src/index.js
  async function* map(source, func) {
    for await (const val of source) {
      yield func(val);
    }
  }

  // node_modules/ipfs-unixfs/src/index.js
  var import_err_code5 = __toESM(require_err_code5(), 1);

  // node_modules/ipfs-unixfs/src/unixfs.js
  var import_minimal = __toESM(require_minimal2(), 1);
  var $Reader = import_minimal.default.Reader;
  var $Writer = import_minimal.default.Writer;
  var $util = import_minimal.default.util;
  var $root =
    import_minimal.default.roots["ipfs-unixfs"] ||
    (import_minimal.default.roots["ipfs-unixfs"] = {});
  var Data = ($root.Data = (() => {
    function Data2(p) {
      this.blocksizes = [];
      if (p) {
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
          if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    Data2.prototype.Type = 0;
    Data2.prototype.Data = $util.newBuffer([]);
    Data2.prototype.filesize = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
    Data2.prototype.blocksizes = $util.emptyArray;
    Data2.prototype.hashType = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
    Data2.prototype.fanout = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
    Data2.prototype.mode = 0;
    Data2.prototype.mtime = null;
    Data2.encode = function encode15(m, w) {
      if (!w) w = $Writer.create();
      w.uint32(8).int32(m.Type);
      if (m.Data != null && Object.hasOwnProperty.call(m, "Data"))
        w.uint32(18).bytes(m.Data);
      if (m.filesize != null && Object.hasOwnProperty.call(m, "filesize"))
        w.uint32(24).uint64(m.filesize);
      if (m.blocksizes != null && m.blocksizes.length) {
        for (var i = 0; i < m.blocksizes.length; ++i)
          w.uint32(32).uint64(m.blocksizes[i]);
      }
      if (m.hashType != null && Object.hasOwnProperty.call(m, "hashType"))
        w.uint32(40).uint64(m.hashType);
      if (m.fanout != null && Object.hasOwnProperty.call(m, "fanout"))
        w.uint32(48).uint64(m.fanout);
      if (m.mode != null && Object.hasOwnProperty.call(m, "mode"))
        w.uint32(56).uint32(m.mode);
      if (m.mtime != null && Object.hasOwnProperty.call(m, "mtime"))
        $root.UnixTime.encode(m.mtime, w.uint32(66).fork()).ldelim();
      return w;
    };
    Data2.decode = function decode16(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === void 0 ? r.len : r.pos + l,
        m = new $root.Data();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            m.Type = r.int32();
            break;
          case 2:
            m.Data = r.bytes();
            break;
          case 3:
            m.filesize = r.uint64();
            break;
          case 4:
            if (!(m.blocksizes && m.blocksizes.length)) m.blocksizes = [];
            if ((t & 7) === 2) {
              var c2 = r.uint32() + r.pos;
              while (r.pos < c2) m.blocksizes.push(r.uint64());
            } else m.blocksizes.push(r.uint64());
            break;
          case 5:
            m.hashType = r.uint64();
            break;
          case 6:
            m.fanout = r.uint64();
            break;
          case 7:
            m.mode = r.uint32();
            break;
          case 8:
            m.mtime = $root.UnixTime.decode(r, r.uint32());
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      if (!m.hasOwnProperty("Type"))
        throw $util.ProtocolError("missing required 'Type'", { instance: m });
      return m;
    };
    Data2.fromObject = function fromObject(d) {
      if (d instanceof $root.Data) return d;
      var m = new $root.Data();
      switch (d.Type) {
        case "Raw":
        case 0:
          m.Type = 0;
          break;
        case "Directory":
        case 1:
          m.Type = 1;
          break;
        case "File":
        case 2:
          m.Type = 2;
          break;
        case "Metadata":
        case 3:
          m.Type = 3;
          break;
        case "Symlink":
        case 4:
          m.Type = 4;
          break;
        case "HAMTShard":
        case 5:
          m.Type = 5;
          break;
      }
      if (d.Data != null) {
        if (typeof d.Data === "string")
          $util.base64.decode(
            d.Data,
            (m.Data = $util.newBuffer($util.base64.length(d.Data))),
            0
          );
        else if (d.Data.length) m.Data = d.Data;
      }
      if (d.filesize != null) {
        if ($util.Long)
          (m.filesize = $util.Long.fromValue(d.filesize)).unsigned = true;
        else if (typeof d.filesize === "string")
          m.filesize = parseInt(d.filesize, 10);
        else if (typeof d.filesize === "number") m.filesize = d.filesize;
        else if (typeof d.filesize === "object")
          m.filesize = new $util.LongBits(
            d.filesize.low >>> 0,
            d.filesize.high >>> 0
          ).toNumber(true);
      }
      if (d.blocksizes) {
        if (!Array.isArray(d.blocksizes))
          throw TypeError(".Data.blocksizes: array expected");
        m.blocksizes = [];
        for (var i = 0; i < d.blocksizes.length; ++i) {
          if ($util.Long)
            (m.blocksizes[i] = $util.Long.fromValue(
              d.blocksizes[i]
            )).unsigned = true;
          else if (typeof d.blocksizes[i] === "string")
            m.blocksizes[i] = parseInt(d.blocksizes[i], 10);
          else if (typeof d.blocksizes[i] === "number")
            m.blocksizes[i] = d.blocksizes[i];
          else if (typeof d.blocksizes[i] === "object")
            m.blocksizes[i] = new $util.LongBits(
              d.blocksizes[i].low >>> 0,
              d.blocksizes[i].high >>> 0
            ).toNumber(true);
        }
      }
      if (d.hashType != null) {
        if ($util.Long)
          (m.hashType = $util.Long.fromValue(d.hashType)).unsigned = true;
        else if (typeof d.hashType === "string")
          m.hashType = parseInt(d.hashType, 10);
        else if (typeof d.hashType === "number") m.hashType = d.hashType;
        else if (typeof d.hashType === "object")
          m.hashType = new $util.LongBits(
            d.hashType.low >>> 0,
            d.hashType.high >>> 0
          ).toNumber(true);
      }
      if (d.fanout != null) {
        if ($util.Long)
          (m.fanout = $util.Long.fromValue(d.fanout)).unsigned = true;
        else if (typeof d.fanout === "string")
          m.fanout = parseInt(d.fanout, 10);
        else if (typeof d.fanout === "number") m.fanout = d.fanout;
        else if (typeof d.fanout === "object")
          m.fanout = new $util.LongBits(
            d.fanout.low >>> 0,
            d.fanout.high >>> 0
          ).toNumber(true);
      }
      if (d.mode != null) {
        m.mode = d.mode >>> 0;
      }
      if (d.mtime != null) {
        if (typeof d.mtime !== "object")
          throw TypeError(".Data.mtime: object expected");
        m.mtime = $root.UnixTime.fromObject(d.mtime);
      }
      return m;
    };
    Data2.toObject = function toObject(m, o) {
      if (!o) o = {};
      var d = {};
      if (o.arrays || o.defaults) {
        d.blocksizes = [];
      }
      if (o.defaults) {
        d.Type = o.enums === String ? "Raw" : 0;
        if (o.bytes === String) d.Data = "";
        else {
          d.Data = [];
          if (o.bytes !== Array) d.Data = $util.newBuffer(d.Data);
        }
        if ($util.Long) {
          var n = new $util.Long(0, 0, true);
          d.filesize =
            o.longs === String
              ? n.toString()
              : o.longs === Number
              ? n.toNumber()
              : n;
        } else d.filesize = o.longs === String ? "0" : 0;
        if ($util.Long) {
          var n = new $util.Long(0, 0, true);
          d.hashType =
            o.longs === String
              ? n.toString()
              : o.longs === Number
              ? n.toNumber()
              : n;
        } else d.hashType = o.longs === String ? "0" : 0;
        if ($util.Long) {
          var n = new $util.Long(0, 0, true);
          d.fanout =
            o.longs === String
              ? n.toString()
              : o.longs === Number
              ? n.toNumber()
              : n;
        } else d.fanout = o.longs === String ? "0" : 0;
        d.mode = 0;
        d.mtime = null;
      }
      if (m.Type != null && m.hasOwnProperty("Type")) {
        d.Type = o.enums === String ? $root.Data.DataType[m.Type] : m.Type;
      }
      if (m.Data != null && m.hasOwnProperty("Data")) {
        d.Data =
          o.bytes === String
            ? $util.base64.encode(m.Data, 0, m.Data.length)
            : o.bytes === Array
            ? Array.prototype.slice.call(m.Data)
            : m.Data;
      }
      if (m.filesize != null && m.hasOwnProperty("filesize")) {
        if (typeof m.filesize === "number")
          d.filesize = o.longs === String ? String(m.filesize) : m.filesize;
        else
          d.filesize =
            o.longs === String
              ? $util.Long.prototype.toString.call(m.filesize)
              : o.longs === Number
              ? new $util.LongBits(
                  m.filesize.low >>> 0,
                  m.filesize.high >>> 0
                ).toNumber(true)
              : m.filesize;
      }
      if (m.blocksizes && m.blocksizes.length) {
        d.blocksizes = [];
        for (var j = 0; j < m.blocksizes.length; ++j) {
          if (typeof m.blocksizes[j] === "number")
            d.blocksizes[j] =
              o.longs === String ? String(m.blocksizes[j]) : m.blocksizes[j];
          else
            d.blocksizes[j] =
              o.longs === String
                ? $util.Long.prototype.toString.call(m.blocksizes[j])
                : o.longs === Number
                ? new $util.LongBits(
                    m.blocksizes[j].low >>> 0,
                    m.blocksizes[j].high >>> 0
                  ).toNumber(true)
                : m.blocksizes[j];
        }
      }
      if (m.hashType != null && m.hasOwnProperty("hashType")) {
        if (typeof m.hashType === "number")
          d.hashType = o.longs === String ? String(m.hashType) : m.hashType;
        else
          d.hashType =
            o.longs === String
              ? $util.Long.prototype.toString.call(m.hashType)
              : o.longs === Number
              ? new $util.LongBits(
                  m.hashType.low >>> 0,
                  m.hashType.high >>> 0
                ).toNumber(true)
              : m.hashType;
      }
      if (m.fanout != null && m.hasOwnProperty("fanout")) {
        if (typeof m.fanout === "number")
          d.fanout = o.longs === String ? String(m.fanout) : m.fanout;
        else
          d.fanout =
            o.longs === String
              ? $util.Long.prototype.toString.call(m.fanout)
              : o.longs === Number
              ? new $util.LongBits(
                  m.fanout.low >>> 0,
                  m.fanout.high >>> 0
                ).toNumber(true)
              : m.fanout;
      }
      if (m.mode != null && m.hasOwnProperty("mode")) {
        d.mode = m.mode;
      }
      if (m.mtime != null && m.hasOwnProperty("mtime")) {
        d.mtime = $root.UnixTime.toObject(m.mtime, o);
      }
      return d;
    };
    Data2.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(
        this,
        import_minimal.default.util.toJSONOptions
      );
    };
    Data2.DataType = (function () {
      const valuesById = {},
        values = Object.create(valuesById);
      values[(valuesById[0] = "Raw")] = 0;
      values[(valuesById[1] = "Directory")] = 1;
      values[(valuesById[2] = "File")] = 2;
      values[(valuesById[3] = "Metadata")] = 3;
      values[(valuesById[4] = "Symlink")] = 4;
      values[(valuesById[5] = "HAMTShard")] = 5;
      return values;
    })();
    return Data2;
  })());
  var UnixTime = ($root.UnixTime = (() => {
    function UnixTime2(p) {
      if (p) {
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
          if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    UnixTime2.prototype.Seconds = $util.Long
      ? $util.Long.fromBits(0, 0, false)
      : 0;
    UnixTime2.prototype.FractionalNanoseconds = 0;
    UnixTime2.encode = function encode15(m, w) {
      if (!w) w = $Writer.create();
      w.uint32(8).int64(m.Seconds);
      if (
        m.FractionalNanoseconds != null &&
        Object.hasOwnProperty.call(m, "FractionalNanoseconds")
      )
        w.uint32(21).fixed32(m.FractionalNanoseconds);
      return w;
    };
    UnixTime2.decode = function decode16(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === void 0 ? r.len : r.pos + l,
        m = new $root.UnixTime();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            m.Seconds = r.int64();
            break;
          case 2:
            m.FractionalNanoseconds = r.fixed32();
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      if (!m.hasOwnProperty("Seconds"))
        throw $util.ProtocolError("missing required 'Seconds'", {
          instance: m,
        });
      return m;
    };
    UnixTime2.fromObject = function fromObject(d) {
      if (d instanceof $root.UnixTime) return d;
      var m = new $root.UnixTime();
      if (d.Seconds != null) {
        if ($util.Long)
          (m.Seconds = $util.Long.fromValue(d.Seconds)).unsigned = false;
        else if (typeof d.Seconds === "string")
          m.Seconds = parseInt(d.Seconds, 10);
        else if (typeof d.Seconds === "number") m.Seconds = d.Seconds;
        else if (typeof d.Seconds === "object")
          m.Seconds = new $util.LongBits(
            d.Seconds.low >>> 0,
            d.Seconds.high >>> 0
          ).toNumber();
      }
      if (d.FractionalNanoseconds != null) {
        m.FractionalNanoseconds = d.FractionalNanoseconds >>> 0;
      }
      return m;
    };
    UnixTime2.toObject = function toObject(m, o) {
      if (!o) o = {};
      var d = {};
      if (o.defaults) {
        if ($util.Long) {
          var n = new $util.Long(0, 0, false);
          d.Seconds =
            o.longs === String
              ? n.toString()
              : o.longs === Number
              ? n.toNumber()
              : n;
        } else d.Seconds = o.longs === String ? "0" : 0;
        d.FractionalNanoseconds = 0;
      }
      if (m.Seconds != null && m.hasOwnProperty("Seconds")) {
        if (typeof m.Seconds === "number")
          d.Seconds = o.longs === String ? String(m.Seconds) : m.Seconds;
        else
          d.Seconds =
            o.longs === String
              ? $util.Long.prototype.toString.call(m.Seconds)
              : o.longs === Number
              ? new $util.LongBits(
                  m.Seconds.low >>> 0,
                  m.Seconds.high >>> 0
                ).toNumber()
              : m.Seconds;
      }
      if (
        m.FractionalNanoseconds != null &&
        m.hasOwnProperty("FractionalNanoseconds")
      ) {
        d.FractionalNanoseconds = m.FractionalNanoseconds;
      }
      return d;
    };
    UnixTime2.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(
        this,
        import_minimal.default.util.toJSONOptions
      );
    };
    return UnixTime2;
  })());
  var Metadata = ($root.Metadata = (() => {
    function Metadata2(p) {
      if (p) {
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
          if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    Metadata2.prototype.MimeType = "";
    Metadata2.encode = function encode15(m, w) {
      if (!w) w = $Writer.create();
      if (m.MimeType != null && Object.hasOwnProperty.call(m, "MimeType"))
        w.uint32(10).string(m.MimeType);
      return w;
    };
    Metadata2.decode = function decode16(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === void 0 ? r.len : r.pos + l,
        m = new $root.Metadata();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            m.MimeType = r.string();
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      return m;
    };
    Metadata2.fromObject = function fromObject(d) {
      if (d instanceof $root.Metadata) return d;
      var m = new $root.Metadata();
      if (d.MimeType != null) {
        m.MimeType = String(d.MimeType);
      }
      return m;
    };
    Metadata2.toObject = function toObject(m, o) {
      if (!o) o = {};
      var d = {};
      if (o.defaults) {
        d.MimeType = "";
      }
      if (m.MimeType != null && m.hasOwnProperty("MimeType")) {
        d.MimeType = m.MimeType;
      }
      return d;
    };
    Metadata2.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(
        this,
        import_minimal.default.util.toJSONOptions
      );
    };
    return Metadata2;
  })());

  // node_modules/ipfs-unixfs/src/index.js
  var DEFAULT_FILE_MODE = parseInt("0644", 8);
  var DEFAULT_DIRECTORY_MODE = parseInt("0755", 8);
  function parseMode(mode) {
    if (mode == null) {
      return void 0;
    }
    if (typeof mode === "number") {
      return mode & 4095;
    }
    mode = mode.toString();
    if (mode.substring(0, 1) === "0") {
      return parseInt(mode, 8) & 4095;
    }
    return parseInt(mode, 10) & 4095;
  }
  function parseMtime2(input) {
    if (input == null) {
      return void 0;
    }
    let mtime;
    if (input.secs != null) {
      mtime = {
        secs: input.secs,
        nsecs: input.nsecs,
      };
    }
    if (input.Seconds != null) {
      mtime = {
        secs: input.Seconds,
        nsecs: input.FractionalNanoseconds,
      };
    }
    if (Array.isArray(input)) {
      mtime = {
        secs: input[0],
        nsecs: input[1],
      };
    }
    if (input instanceof Date) {
      const ms = input.getTime();
      const secs = Math.floor(ms / 1e3);
      mtime = {
        secs,
        nsecs: (ms - secs * 1e3) * 1e3,
      };
    }
    if (!Object.prototype.hasOwnProperty.call(mtime, "secs")) {
      return void 0;
    }
    if (
      mtime != null &&
      mtime.nsecs != null &&
      (mtime.nsecs < 0 || mtime.nsecs > 999999999)
    ) {
      throw (0, import_err_code5.default)(
        new Error("mtime-nsecs must be within the range [0,999999999]"),
        "ERR_INVALID_MTIME_NSECS"
      );
    }
    return mtime;
  }

  // node_modules/ipfs-core-utils/src/files/normalise-candidate-multiple.js
  async function* normaliseCandidateMultiple(input, normaliseContent3) {
    if (
      typeof input === "string" ||
      input instanceof String ||
      isBytes(input) ||
      isBlob(input) ||
      input._readableState
    ) {
      throw (0, import_err_code6.default)(
        new Error(
          "Unexpected input: single item passed - if you are using ipfs.addAll, please use ipfs.add instead"
        ),
        "ERR_UNEXPECTED_INPUT"
      );
    }
    if (isReadableStream(input)) {
      input = browserReadableStreamToIt(input);
    }
    if (Symbol.iterator in input || Symbol.asyncIterator in input) {
      const peekable = peekableIterator(input);
      const { value, done } = await peekable.peek();
      if (done) {
        yield* [];
        return;
      }
      peekable.push(value);
      if (Number.isInteger(value)) {
        throw (0, import_err_code6.default)(
          new Error(
            "Unexpected input: single item passed - if you are using ipfs.addAll, please use ipfs.add instead"
          ),
          "ERR_UNEXPECTED_INPUT"
        );
      }
      if (value._readableState) {
        yield* map(peekable, (value2) =>
          toFileObject({ content: value2 }, normaliseContent3)
        );
        return;
      }
      if (isBytes(value)) {
        yield toFileObject({ content: peekable }, normaliseContent3);
        return;
      }
      if (
        isFileObject(value) ||
        value[Symbol.iterator] ||
        value[Symbol.asyncIterator] ||
        isReadableStream(value) ||
        isBlob(value)
      ) {
        yield* map(peekable, (value2) =>
          toFileObject(value2, normaliseContent3)
        );
        return;
      }
    }
    if (isFileObject(input)) {
      throw (0, import_err_code6.default)(
        new Error(
          "Unexpected input: single item passed - if you are using ipfs.addAll, please use ipfs.add instead"
        ),
        "ERR_UNEXPECTED_INPUT"
      );
    }
    throw (0, import_err_code6.default)(
      new Error("Unexpected input: " + typeof input),
      "ERR_UNEXPECTED_INPUT"
    );
  }
  async function toFileObject(input, normaliseContent3) {
    const { path, mode, mtime, content } = input;
    const file = {
      path: path || "",
      mode: parseMode(mode),
      mtime: parseMtime2(mtime),
    };
    if (content) {
      file.content = await normaliseContent3(content);
    } else if (!path) {
      file.content = await normaliseContent3(input);
    }
    return file;
  }

  // node_modules/ipfs-core-utils/src/files/normalise-input-multiple.browser.js
  function normaliseInput(input) {
    return normaliseCandidateMultiple(input, normaliseContent, true);
  }

  // node_modules/ipfs-core-utils/src/mode-to-string.js
  function modeToString2(mode) {
    if (mode == null) {
      return void 0;
    }
    if (typeof mode === "string") {
      return mode;
    }
    return mode.toString(8).padStart(4, "0");
  }

  // node_modules/ipfs-core-utils/src/multipart-request.browser.js
  async function multipartRequest(source, abortController, headers = {}) {
    const parts = [];
    const formData = new FormData();
    let index = 0;
    let total = 0;
    for await (const { content, path, mode, mtime } of normaliseInput(source)) {
      let fileSuffix = "";
      const type = content ? "file" : "dir";
      if (index > 0) {
        fileSuffix = `-${index}`;
      }
      let fieldName = type + fileSuffix;
      const qs = [];
      if (mode !== null && mode !== void 0) {
        qs.push(`mode=${modeToString2(mode)}`);
      }
      if (mtime != null) {
        const { secs, nsecs } = mtime;
        qs.push(`mtime=${secs}`);
        if (nsecs != null) {
          qs.push(`mtime-nsecs=${nsecs}`);
        }
      }
      if (qs.length) {
        fieldName = `${fieldName}?${qs.join("&")}`;
      }
      if (content) {
        formData.set(
          fieldName,
          content,
          path != null ? encodeURIComponent(path) : void 0
        );
        const end = total + content.size;
        parts.push({ name: path, start: total, end });
        total = end;
      } else if (path != null) {
        formData.set(
          fieldName,
          new File([""], encodeURIComponent(path), {
            type: "application/x-directory",
          })
        );
      } else {
        throw new Error("path or content or both must be set");
      }
      index++;
    }
    return {
      total,
      parts,
      headers,
      body: formData,
    };
  }

  // node_modules/ipfs-http-client/src/lib/abort-signal.js
  var import_any_signal = __toESM(require_any_signal(), 1);
  function filter(signals) {
    return signals.filter(Boolean);
  }
  function abortSignal(...signals) {
    return (0, import_any_signal.anySignal)(filter(signals));
  }

  // node_modules/ipfs-http-client/src/block/put.js
  var createPut = configure((api) => {
    async function put(data, options = {}) {
      const controller = new AbortController();
      const signal = abortSignal(controller.signal, options.signal);
      let res;
      try {
        const response = await api.post("block/put", {
          signal,
          searchParams: toUrlSearchParams(options),
          ...(await multipartRequest([data], controller, options.headers)),
        });
        res = await response.json();
      } catch (err) {
        if (options.format === "dag-pb") {
          return put(data, { ...options, format: "protobuf" });
        } else if (options.format === "dag-cbor") {
          return put(data, { ...options, format: "cbor" });
        }
        throw err;
      }
      return CID.parse(res.Key);
    }
    return put;
  });

  // node_modules/ipfs-http-client/src/block/rm.js
  var createRm = configure((api) => {
    async function* rm(cid, options = {}) {
      if (!Array.isArray(cid)) {
        cid = [cid];
      }
      const res = await api.post("block/rm", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: cid.map((cid2) => cid2.toString()),
          "stream-channels": true,
          ...options,
        }),
        headers: options.headers,
      });
      for await (const removed of res.ndjson()) {
        yield toCoreInterface2(removed);
      }
    }
    return rm;
  });
  function toCoreInterface2(removed) {
    const out = {
      cid: CID.parse(removed.Hash),
    };
    if (removed.Error) {
      out.error = new Error(removed.Error);
    }
    return out;
  }

  // node_modules/ipfs-http-client/src/block/stat.js
  var createStat2 = configure((api) => {
    async function stat(cid, options = {}) {
      const res = await api.post("block/stat", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: cid.toString(),
          ...options,
        }),
        headers: options.headers,
      });
      const data = await res.json();
      return { cid: CID.parse(data.Key), size: data.Size };
    }
    return stat;
  });

  // node_modules/ipfs-http-client/src/block/index.js
  function createBlock(config) {
    return {
      get: createGet(config),
      put: createPut(config),
      rm: createRm(config),
      stat: createStat2(config),
    };
  }

  // node_modules/ipfs-http-client/src/bootstrap/add.js
  var createAdd = configure((api) => {
    async function add(addr, options = {}) {
      const res = await api.post("bootstrap/add", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: addr,
          ...options,
        }),
        headers: options.headers,
      });
      const { Peers } = await res.json();
      return { Peers: Peers.map((ma) => multiaddr(ma)) };
    }
    return add;
  });

  // node_modules/ipfs-http-client/src/bootstrap/clear.js
  var createClear = configure((api) => {
    async function clear(options = {}) {
      const res = await api.post("bootstrap/rm", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          ...options,
          all: true,
        }),
        headers: options.headers,
      });
      const { Peers } = await res.json();
      return { Peers: Peers.map((ma) => multiaddr(ma)) };
    }
    return clear;
  });

  // node_modules/ipfs-http-client/src/bootstrap/list.js
  var createList = configure((api) => {
    async function list(options = {}) {
      const res = await api.post("bootstrap/list", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      const { Peers } = await res.json();
      return { Peers: Peers.map((ma) => multiaddr(ma)) };
    }
    return list;
  });

  // node_modules/ipfs-http-client/src/bootstrap/reset.js
  var createReset = configure((api) => {
    async function reset(options = {}) {
      const res = await api.post("bootstrap/add", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          ...options,
          default: true,
        }),
        headers: options.headers,
      });
      const { Peers } = await res.json();
      return { Peers: Peers.map((ma) => multiaddr(ma)) };
    }
    return reset;
  });

  // node_modules/ipfs-http-client/src/bootstrap/rm.js
  var createRm2 = configure((api) => {
    async function rm(addr, options = {}) {
      const res = await api.post("bootstrap/rm", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: addr,
          ...options,
        }),
        headers: options.headers,
      });
      const { Peers } = await res.json();
      return { Peers: Peers.map((ma) => multiaddr(ma)) };
    }
    return rm;
  });

  // node_modules/ipfs-http-client/src/bootstrap/index.js
  function createBootstrap(config) {
    return {
      add: createAdd(config),
      clear: createClear(config),
      list: createList(config),
      reset: createReset(config),
      rm: createRm2(config),
    };
  }

  // node_modules/ipfs-http-client/src/config/profiles/apply.js
  var createApply = configure((api) => {
    async function apply(profile, options = {}) {
      const res = await api.post("config/profile/apply", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: profile,
          ...options,
        }),
        headers: options.headers,
      });
      const data = await res.json();
      return {
        original: data.OldCfg,
        updated: data.NewCfg,
      };
    }
    return apply;
  });

  // node_modules/ipfs-http-client/src/lib/object-to-camel.js
  function objectToCamel(obj) {
    if (obj == null) {
      return obj;
    }
    const caps = /^[A-Z]+$/;
    const output = {};
    return Object.keys(obj).reduce((camelObj, k) => {
      if (caps.test(k)) {
        camelObj[k.toLowerCase()] = obj[k];
      } else if (caps.test(k[0])) {
        camelObj[k[0].toLowerCase() + k.slice(1)] = obj[k];
      } else {
        camelObj[k] = obj[k];
      }
      return camelObj;
    }, output);
  }

  // node_modules/ipfs-http-client/src/config/profiles/list.js
  var createList2 = configure((api) => {
    async function list(options = {}) {
      const res = await api.post("config/profile/list", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      const data = await res.json();
      return data.map((profile) => objectToCamel(profile));
    }
    return list;
  });

  // node_modules/ipfs-http-client/src/config/profiles/index.js
  function createProfiles(config) {
    return {
      apply: createApply(config),
      list: createList2(config),
    };
  }

  // node_modules/ipfs-http-client/src/config/get.js
  var createGet2 = configure((api) => {
    const get = async (key, options = {}) => {
      if (!key) {
        throw new Error("key argument is required");
      }
      const res = await api.post("config", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: key,
          ...options,
        }),
        headers: options.headers,
      });
      const data = await res.json();
      return data.Value;
    };
    return get;
  });

  // node_modules/ipfs-http-client/src/config/get-all.js
  var createGetAll = configure((api) => {
    const getAll = async (options = {}) => {
      const res = await api.post("config/show", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          ...options,
        }),
        headers: options.headers,
      });
      const data = await res.json();
      return data;
    };
    return getAll;
  });

  // node_modules/ipfs-http-client/src/config/replace.js
  var createReplace = configure((api) => {
    const replace = async (config, options = {}) => {
      const controller = new AbortController();
      const signal = abortSignal(controller.signal, options.signal);
      const res = await api.post("config/replace", {
        signal,
        searchParams: toUrlSearchParams(options),
        ...(await multipartRequest(
          [fromString3(JSON.stringify(config))],
          controller,
          options.headers
        )),
      });
      await res.text();
    };
    return replace;
  });

  // node_modules/ipfs-http-client/src/config/set.js
  var createSet = configure((api) => {
    const set = async (key, value, options = {}) => {
      if (typeof key !== "string") {
        throw new Error("Invalid key type");
      }
      const params = {
        ...options,
        ...encodeParam(key, value),
      };
      const res = await api.post("config", {
        signal: options.signal,
        searchParams: toUrlSearchParams(params),
        headers: options.headers,
      });
      await res.text();
    };
    return set;
  });
  var encodeParam = (key, value) => {
    switch (typeof value) {
      case "boolean":
        return { arg: [key, value.toString()], bool: true };
      case "string":
        return { arg: [key, value] };
      default:
        return { arg: [key, JSON.stringify(value)], json: true };
    }
  };

  // node_modules/ipfs-http-client/src/config/index.js
  function createConfig(config) {
    return {
      getAll: createGetAll(config),
      get: createGet2(config),
      set: createSet(config),
      replace: createReplace(config),
      profiles: createProfiles(config),
    };
  }

  // node_modules/ipfs-http-client/src/dag/export.js
  var createExport = configure((api) => {
    async function* dagExport(root, options = {}) {
      const res = await api.post("dag/export", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: root.toString(),
        }),
        headers: options.headers,
      });
      yield* res.iterator();
    }
    return dagExport;
  });

  // node_modules/ipfs-http-client/src/lib/resolve.js
  var import_err_code7 = __toESM(require_err_code2(), 1);
  async function* resolve(cid, path, codecs2, getBlock, options) {
    const load = async (cid2) => {
      const codec = await codecs2.getCodec(cid2.code);
      const block = await getBlock(cid2, options);
      return codec.decode(block);
    };
    const parts = path.split("/").filter(Boolean);
    let value = await load(cid);
    let lastCid = cid;
    while (parts.length) {
      const key = parts.shift();
      if (!key) {
        throw (0, import_err_code7.default)(
          new Error(`Could not resolve path "${path}"`),
          "ERR_INVALID_PATH"
        );
      }
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        value = value[key];
        yield {
          value,
          remainderPath: parts.join("/"),
        };
      } else {
        throw (0, import_err_code7.default)(
          new Error(`no link named "${key}" under ${lastCid}`),
          "ERR_NO_LINK"
        );
      }
      const cid2 = CID.asCID(value);
      if (cid2) {
        lastCid = cid2;
        value = await load(value);
      }
    }
    yield {
      value,
      remainderPath: "",
    };
  }

  // node_modules/it-first/dist/src/index.js
  async function first(source) {
    for await (const entry of source) {
      return entry;
    }
    return void 0;
  }

  // node_modules/it-last/dist/src/index.js
  async function last(source) {
    let res;
    for await (const entry of source) {
      res = entry;
    }
    return res;
  }

  // node_modules/ipfs-http-client/src/dag/get.js
  var import_err_code8 = __toESM(require_err_code2(), 1);
  var createGet3 = (codecs2, options) => {
    const fn = configure((api, opts) => {
      const getBlock = createGet(opts);
      const get = async (cid, options2 = {}) => {
        if (options2.path) {
          const entry = options2.localResolve
            ? await first(
                resolve(cid, options2.path, codecs2, getBlock, options2)
              )
            : await last(
                resolve(cid, options2.path, codecs2, getBlock, options2)
              );
          const result = entry;
          if (!result) {
            throw (0, import_err_code8.default)(
              new Error("Not found"),
              "ERR_NOT_FOUND"
            );
          }
          return result;
        }
        const codec = await codecs2.getCodec(cid.code);
        const block = await getBlock(cid, options2);
        const node = codec.decode(block);
        return {
          value: node,
          remainderPath: "",
        };
      };
      return get;
    });
    return fn(options);
  };

  // node_modules/ipfs-http-client/src/dag/import.js
  var createImport = configure((api) => {
    async function* dagImport(source, options = {}) {
      const controller = new AbortController();
      const signal = abortSignal(controller.signal, options.signal);
      const { headers, body } = await multipartRequest(
        source,
        controller,
        options.headers
      );
      const res = await api.post("dag/import", {
        signal,
        headers,
        body,
        searchParams: toUrlSearchParams({ "pin-roots": options.pinRoots }),
      });
      for await (const { Root } of res.ndjson()) {
        if (Root !== void 0) {
          const {
            Cid: { "/": Cid },
            PinErrorMsg,
          } = Root;
          yield {
            root: {
              cid: CID.parse(Cid),
              pinErrorMsg: PinErrorMsg,
            },
          };
        }
      }
    }
    return dagImport;
  });

  // node_modules/ipfs-http-client/src/dag/put.js
  var createPut2 = (codecs2, options) => {
    const fn = configure((api) => {
      const put = async (dagNode, options2 = {}) => {
        const settings = {
          storeCodec: "dag-cbor",
          hashAlg: "sha2-256",
          ...options2,
        };
        let serialized;
        if (settings.inputCodec) {
          if (!(dagNode instanceof Uint8Array)) {
            throw new Error(
              "Can only inputCodec on raw bytes that can be decoded"
            );
          }
          serialized = dagNode;
        } else {
          const storeCodec = await codecs2.getCodec(settings.storeCodec);
          serialized = storeCodec.encode(dagNode);
          settings.inputCodec = settings.storeCodec;
        }
        const controller = new AbortController();
        const signal = abortSignal(controller.signal, settings.signal);
        const res = await api.post("dag/put", {
          timeout: settings.timeout,
          signal,
          searchParams: toUrlSearchParams(settings),
          ...(await multipartRequest(
            [serialized],
            controller,
            settings.headers
          )),
        });
        const data = await res.json();
        return CID.parse(data.Cid["/"]);
      };
      return put;
    });
    return fn(options);
  };

  // node_modules/ipfs-http-client/src/dag/resolve.js
  var createResolve = configure((api) => {
    const resolve2 = async (ipfsPath, options = {}) => {
      const res = await api.post("dag/resolve", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: `${ipfsPath}${
            options.path ? `/${options.path}`.replace(/\/[/]+/g, "/") : ""
          }`,
          ...options,
        }),
        headers: options.headers,
      });
      const data = await res.json();
      return { cid: CID.parse(data.Cid["/"]), remainderPath: data.RemPath };
    };
    return resolve2;
  });

  // node_modules/ipfs-http-client/src/dag/index.js
  function createDag(codecs2, config) {
    return {
      export: createExport(config),
      get: createGet3(codecs2, config),
      import: createImport(config),
      put: createPut2(codecs2, config),
      resolve: createResolve(config),
    };
  }

  // node_modules/ipfs-http-client/src/dht/response-types.js
  var SendingQuery = 0;
  var PeerResponse = 1;
  var FinalPeer = 2;
  var QueryError = 3;
  var Provider = 4;
  var Value = 5;
  var AddingPeer = 6;
  var DialingPeer = 7;

  // node_modules/ipfs-http-client/src/dht/map-event.js
  var mapEvent = (event) => {
    if (event.Type === SendingQuery) {
      return {
        name: "SENDING_QUERY",
        type: event.Type,
      };
    }
    if (event.Type === PeerResponse) {
      return {
        from: peerIdFromString(event.ID),
        name: "PEER_RESPONSE",
        type: event.Type,
        messageType: 0,
        messageName: "PUT_VALUE",
        closer: (event.Responses || []).map(({ ID, Addrs }) => ({
          id: peerIdFromString(ID),
          multiaddrs: Addrs.map((addr) => multiaddr(addr)),
          protocols: [],
        })),
        providers: (event.Responses || []).map(({ ID, Addrs }) => ({
          id: peerIdFromString(ID),
          multiaddrs: Addrs.map((addr) => multiaddr(addr)),
          protocols: [],
        })),
      };
    }
    if (event.Type === FinalPeer) {
      let peer = {
        id: event.ID ?? peerIdFromString(event.ID),
        multiaddrs: [],
        protocols: [],
      };
      if (event.Responses && event.Responses.length) {
        peer = {
          id: peerIdFromString(event.Responses[0].ID),
          multiaddrs: event.Responses[0].Addrs.map((addr) => multiaddr(addr)),
          protocols: [],
        };
      }
      return {
        name: "FINAL_PEER",
        type: event.Type,
        peer,
      };
    }
    if (event.Type === QueryError) {
      return {
        name: "QUERY_ERROR",
        type: event.Type,
        error: new Error(event.Extra),
      };
    }
    if (event.Type === Provider) {
      return {
        name: "PROVIDER",
        type: event.Type,
        providers: event.Responses.map(({ ID, Addrs }) => ({
          id: peerIdFromString(ID),
          multiaddrs: Addrs.map((addr) => multiaddr(addr)),
          protocols: [],
        })),
      };
    }
    if (event.Type === Value) {
      return {
        name: "VALUE",
        type: event.Type,
        value: fromString3(event.Extra, "base64pad"),
      };
    }
    if (event.Type === AddingPeer) {
      const peers = event.Responses.map(({ ID }) => peerIdFromString(ID));
      if (!peers.length) {
        throw new Error("No peer found");
      }
      return {
        name: "ADDING_PEER",
        type: event.Type,
        peer: peers[0],
      };
    }
    if (event.Type === DialingPeer) {
      return {
        name: "DIALING_PEER",
        type: event.Type,
        peer: peerIdFromString(event.ID),
      };
    }
    throw new Error("Unknown DHT event type");
  };

  // node_modules/ipfs-http-client/src/dht/find-peer.js
  var createFindPeer = configure((api) => {
    async function* findPeer(peerId, options = {}) {
      const res = await api.post("dht/findpeer", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: peerId,
          ...options,
        }),
        headers: options.headers,
      });
      for await (const event of res.ndjson()) {
        yield mapEvent(event);
      }
    }
    return findPeer;
  });

  // node_modules/ipfs-http-client/src/dht/find-provs.js
  var createFindProvs = configure((api) => {
    async function* findProvs(cid, options = {}) {
      const res = await api.post("dht/findprovs", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: cid.toString(),
          ...options,
        }),
        headers: options.headers,
      });
      for await (const event of res.ndjson()) {
        yield mapEvent(event);
      }
    }
    return findProvs;
  });

  // node_modules/ipfs-http-client/src/dht/get.js
  var createGet4 = configure((api) => {
    async function* get(key, options = {}) {
      const res = await api.post("dht/get", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: key instanceof Uint8Array ? toString3(key) : key.toString(),
          ...options,
        }),
        headers: options.headers,
      });
      for await (const event of res.ndjson()) {
        yield mapEvent(event);
      }
    }
    return get;
  });

  // node_modules/ipfs-http-client/src/dht/provide.js
  var createProvide = configure((api) => {
    async function* provide(cids, options = { recursive: false }) {
      const cidArr = Array.isArray(cids) ? cids : [cids];
      const res = await api.post("dht/provide", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: cidArr.map((cid) => cid.toString()),
          ...options,
        }),
        headers: options.headers,
      });
      for await (const event of res.ndjson()) {
        yield mapEvent(event);
      }
    }
    return provide;
  });

  // node_modules/ipfs-http-client/src/dht/put.js
  var createPut3 = configure((api) => {
    async function* put(key, value, options = {}) {
      const controller = new AbortController();
      const signal = abortSignal(controller.signal, options.signal);
      const res = await api.post("dht/put", {
        signal,
        searchParams: toUrlSearchParams({
          arg: key instanceof Uint8Array ? toString3(key) : key.toString(),
          ...options,
        }),
        ...(await multipartRequest([value], controller, options.headers)),
      });
      for await (const event of res.ndjson()) {
        yield mapEvent(event);
      }
    }
    return put;
  });

  // node_modules/ipfs-http-client/src/dht/query.js
  var createQuery = configure((api) => {
    async function* query(peerId, options = {}) {
      const res = await api.post("dht/query", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: peerId.toString(),
          ...options,
        }),
        headers: options.headers,
      });
      for await (const event of res.ndjson()) {
        yield mapEvent(event);
      }
    }
    return query;
  });

  // node_modules/ipfs-http-client/src/dht/index.js
  function createDht(config) {
    return {
      findPeer: createFindPeer(config),
      findProvs: createFindProvs(config),
      get: createGet4(config),
      provide: createProvide(config),
      put: createPut3(config),
      query: createQuery(config),
    };
  }

  // node_modules/ipfs-http-client/src/diag/cmds.js
  var createCmds = configure((api) => {
    async function cmds(options = {}) {
      const res = await api.post("diag/cmds", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      return res.json();
    }
    return cmds;
  });

  // node_modules/ipfs-http-client/src/diag/net.js
  var createNet = configure((api) => {
    async function net(options = {}) {
      const res = await api.post("diag/net", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      return res.json();
    }
    return net;
  });

  // node_modules/ipfs-http-client/src/diag/sys.js
  var createSys = configure((api) => {
    async function sys(options = {}) {
      const res = await api.post("diag/sys", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      return res.json();
    }
    return sys;
  });

  // node_modules/ipfs-http-client/src/diag/index.js
  function createDiag(config) {
    return {
      cmds: createCmds(config),
      net: createNet(config),
      sys: createSys(config),
    };
  }

  // node_modules/ipfs-http-client/src/files/chmod.js
  var createChmod = configure((api) => {
    async function chmod(path, mode, options = {}) {
      const res = await api.post("files/chmod", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: path,
          mode,
          ...options,
        }),
        headers: options.headers,
      });
      await res.text();
    }
    return chmod;
  });

  // node_modules/ipfs-http-client/src/files/cp.js
  var createCp = configure((api) => {
    async function cp(sources, destination, options = {}) {
      const sourceArr = Array.isArray(sources) ? sources : [sources];
      const res = await api.post("files/cp", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: sourceArr
            .concat(destination)
            .map((src2) => (CID.asCID(src2) ? `/ipfs/${src2}` : src2)),
          ...options,
        }),
        headers: options.headers,
      });
      await res.text();
    }
    return cp;
  });

  // node_modules/ipfs-http-client/src/files/flush.js
  var createFlush = configure((api) => {
    async function flush(path, options = {}) {
      if (!path || typeof path !== "string") {
        throw new Error("ipfs.files.flush requires a path");
      }
      const res = await api.post("files/flush", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: path,
          ...options,
        }),
        headers: options.headers,
      });
      const data = await res.json();
      return CID.parse(data.Cid);
    }
    return flush;
  });

  // node_modules/ipfs-http-client/src/lib/object-to-camel-with-metadata.js
  function objectToCamelWithMetadata(entry) {
    const file = objectToCamel(entry);
    if (Object.prototype.hasOwnProperty.call(file, "mode")) {
      file.mode = parseInt(file.mode, 8);
    }
    if (Object.prototype.hasOwnProperty.call(file, "mtime")) {
      file.mtime = {
        secs: file.mtime,
        nsecs: file.mtimeNsecs || 0,
      };
      delete file.mtimeNsecs;
    }
    return file;
  }

  // node_modules/ipfs-http-client/src/files/ls.js
  var createLs = configure((api) => {
    async function* ls(path, options = {}) {
      if (!path) {
        throw new Error("ipfs.files.ls requires a path");
      }
      const res = await api.post("files/ls", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: CID.asCID(path) ? `/ipfs/${path}` : path,
          long: true,
          ...options,
          stream: true,
        }),
        headers: options.headers,
      });
      for await (const result of res.ndjson()) {
        if ("Entries" in result) {
          for (const entry of result.Entries || []) {
            yield toCoreInterface3(objectToCamelWithMetadata(entry));
          }
        } else {
          yield toCoreInterface3(objectToCamelWithMetadata(result));
        }
      }
    }
    return ls;
  });
  function toCoreInterface3(entry) {
    if (entry.hash) {
      entry.cid = CID.parse(entry.hash);
    }
    delete entry.hash;
    entry.type = entry.type === 1 ? "directory" : "file";
    return entry;
  }

  // node_modules/ipfs-http-client/src/files/mkdir.js
  var createMkdir = configure((api) => {
    async function mkdir(path, options = {}) {
      const res = await api.post("files/mkdir", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: path,
          ...options,
        }),
        headers: options.headers,
      });
      await res.text();
    }
    return mkdir;
  });

  // node_modules/ipfs-http-client/src/files/mv.js
  var createMv = configure((api) => {
    async function mv(sources, destination, options = {}) {
      if (!Array.isArray(sources)) {
        sources = [sources];
      }
      const res = await api.post("files/mv", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: sources.concat(destination),
          ...options,
        }),
        headers: options.headers,
      });
      await res.text();
    }
    return mv;
  });

  // node_modules/ipfs-http-client/src/files/read.js
  var import_source = __toESM(require_source(), 1);
  var createRead = configure((api) => {
    async function* read2(path, options = {}) {
      const res = await api.post("files/read", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: path,
          count: options.length,
          ...options,
        }),
        headers: options.headers,
      });
      yield* (0, import_source.default)(res.body);
    }
    return read2;
  });

  // node_modules/ipfs-http-client/src/files/rm.js
  var import_http2 = __toESM(require_http(), 1);
  var createRm3 = configure((api) => {
    async function rm(path, options = {}) {
      const res = await api.post("files/rm", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: path,
          ...options,
        }),
        headers: options.headers,
      });
      const body = await res.text();
      if (body !== "") {
        const error = new import_http2.default.HTTPError(res);
        error.message = body;
        throw error;
      }
    }
    return rm;
  });

  // node_modules/ipfs-http-client/src/files/stat.js
  var createStat3 = configure((api) => {
    async function stat(path, options = {}) {
      const res = await api.post("files/stat", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: path,
          ...options,
        }),
        headers: options.headers,
      });
      const data = await res.json();
      data.WithLocality = data.WithLocality || false;
      return toCoreInterface4(objectToCamelWithMetadata(data));
    }
    return stat;
  });
  function toCoreInterface4(entry) {
    entry.cid = CID.parse(entry.hash);
    delete entry.hash;
    return entry;
  }

  // node_modules/ipfs-http-client/src/files/touch.js
  var createTouch = configure((api) => {
    async function touch(path, options = {}) {
      const res = await api.post("files/touch", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: path,
          ...options,
        }),
        headers: options.headers,
      });
      await res.text();
    }
    return touch;
  });

  // node_modules/ipfs-http-client/src/files/write.js
  var createWrite = configure((api) => {
    async function write(path, input, options = {}) {
      const controller = new AbortController();
      const signal = abortSignal(controller.signal, options.signal);
      const res = await api.post("files/write", {
        signal,
        searchParams: toUrlSearchParams({
          arg: path,
          streamChannels: true,
          count: options.length,
          ...options,
        }),
        ...(await multipartRequest(
          [
            {
              content: input,
              path: "arg",
              mode: modeToString(options.mode),
              mtime: parseMtime(options.mtime),
            },
          ],
          controller,
          options.headers
        )),
      });
      await res.text();
    }
    return write;
  });

  // node_modules/ipfs-http-client/src/files/index.js
  function createFiles(config) {
    return {
      chmod: createChmod(config),
      cp: createCp(config),
      flush: createFlush(config),
      ls: createLs(config),
      mkdir: createMkdir(config),
      mv: createMv(config),
      read: createRead(config),
      rm: createRm3(config),
      stat: createStat3(config),
      touch: createTouch(config),
      write: createWrite(config),
    };
  }

  // node_modules/ipfs-http-client/src/key/export.js
  var import_err_code9 = __toESM(require_err_code2(), 1);
  var createExport2 = configure((api) => {
    const exportKey = async (name8, password, options = {}) => {
      throw (0, import_err_code9.default)(
        new Error("Not implemented"),
        "ERR_NOT_IMPLEMENTED"
      );
    };
    return exportKey;
  });

  // node_modules/ipfs-http-client/src/key/gen.js
  var createGen = configure((api) => {
    async function gen(name8, options = { type: "Ed25519" }) {
      const res = await api.post("key/gen", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: name8,
          ...options,
        }),
        headers: options.headers,
      });
      const data = await res.json();
      return objectToCamel(data);
    }
    return gen;
  });

  // node_modules/ipfs-http-client/src/key/import.js
  var createImport2 = configure((api) => {
    async function importKey(name8, pem, password, options = {}) {
      const res = await api.post("key/import", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: name8,
          pem,
          password,
          ...options,
        }),
        headers: options.headers,
      });
      const data = await res.json();
      return objectToCamel(data);
    }
    return importKey;
  });

  // node_modules/ipfs-http-client/src/key/info.js
  var import_err_code10 = __toESM(require_err_code2(), 1);
  var createInfo = configure((api) => {
    const info = async (name8, options = {}) => {
      throw (0, import_err_code10.default)(
        new Error("Not implemented"),
        "ERR_NOT_IMPLEMENTED"
      );
    };
    return info;
  });

  // node_modules/ipfs-http-client/src/key/list.js
  var createList3 = configure((api) => {
    async function list(options = {}) {
      const res = await api.post("key/list", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      const data = await res.json();
      return (data.Keys || []).map((k) => objectToCamel(k));
    }
    return list;
  });

  // node_modules/ipfs-http-client/src/key/rename.js
  var createRename = configure((api) => {
    async function rename(oldName, newName, options = {}) {
      const res = await api.post("key/rename", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: [oldName, newName],
          ...options,
        }),
        headers: options.headers,
      });
      return objectToCamel(await res.json());
    }
    return rename;
  });

  // node_modules/ipfs-http-client/src/key/rm.js
  var createRm4 = configure((api) => {
    async function rm(name8, options = {}) {
      const res = await api.post("key/rm", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: name8,
          ...options,
        }),
        headers: options.headers,
      });
      const data = await res.json();
      return objectToCamel(data.Keys[0]);
    }
    return rm;
  });

  // node_modules/ipfs-http-client/src/key/index.js
  function createKey(config) {
    return {
      export: createExport2(config),
      gen: createGen(config),
      import: createImport2(config),
      info: createInfo(config),
      list: createList3(config),
      rename: createRename(config),
      rm: createRm4(config),
    };
  }

  // node_modules/ipfs-http-client/src/log/level.js
  var createLevel = configure((api) => {
    async function level(subsystem, level2, options = {}) {
      const res = await api.post("log/level", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: [subsystem, level2],
          ...options,
        }),
        headers: options.headers,
      });
      return objectToCamel(await res.json());
    }
    return level;
  });

  // node_modules/ipfs-http-client/src/log/ls.js
  var createLs2 = configure((api) => {
    async function ls(options = {}) {
      const res = await api.post("log/ls", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      const data = await res.json();
      return data.Strings;
    }
    return ls;
  });

  // node_modules/ipfs-http-client/src/log/tail.js
  var createTail = configure((api) => {
    async function* tail(options = {}) {
      const res = await api.post("log/tail", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      yield* res.ndjson();
    }
    return tail;
  });

  // node_modules/ipfs-http-client/src/log/index.js
  function createLog(config) {
    return {
      level: createLevel(config),
      ls: createLs2(config),
      tail: createTail(config),
    };
  }

  // node_modules/ipfs-http-client/src/name/publish.js
  var createPublish = configure((api) => {
    async function publish(path, options = {}) {
      const res = await api.post("name/publish", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: `${path}`,
          ...options,
        }),
        headers: options.headers,
      });
      return objectToCamel(await res.json());
    }
    return publish;
  });

  // node_modules/ipfs-http-client/src/name/resolve.js
  var createResolve2 = configure((api) => {
    async function* resolve2(path, options = {}) {
      const res = await api.post("name/resolve", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: path,
          stream: true,
          ...options,
        }),
        headers: options.headers,
      });
      for await (const result of res.ndjson()) {
        yield result.Path;
      }
    }
    return resolve2;
  });

  // node_modules/ipfs-http-client/src/name/pubsub/cancel.js
  var createCancel = configure((api) => {
    async function cancel(name8, options = {}) {
      const res = await api.post("name/pubsub/cancel", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: name8,
          ...options,
        }),
        headers: options.headers,
      });
      return objectToCamel(await res.json());
    }
    return cancel;
  });

  // node_modules/ipfs-http-client/src/name/pubsub/state.js
  var createState = configure((api) => {
    async function state(options = {}) {
      const res = await api.post("name/pubsub/state", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      return objectToCamel(await res.json());
    }
    return state;
  });

  // node_modules/ipfs-http-client/src/name/pubsub/subs.js
  var createSubs = configure((api) => {
    async function subs(options = {}) {
      const res = await api.post("name/pubsub/subs", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      const data = await res.json();
      return data.Strings || [];
    }
    return subs;
  });

  // node_modules/ipfs-http-client/src/name/pubsub/index.js
  function createPubsub(config) {
    return {
      cancel: createCancel(config),
      state: createState(config),
      subs: createSubs(config),
    };
  }

  // node_modules/ipfs-http-client/src/name/index.js
  function createName(config) {
    return {
      publish: createPublish(config),
      resolve: createResolve2(config),
      pubsub: createPubsub(config),
    };
  }

  // node_modules/ipfs-http-client/src/object/data.js
  var createData = configure((api) => {
    async function data(cid, options = {}) {
      const res = await api.post("object/data", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: `${cid instanceof Uint8Array ? CID.decode(cid) : cid}`,
          ...options,
        }),
        headers: options.headers,
      });
      const data2 = await res.arrayBuffer();
      return new Uint8Array(data2, 0, data2.byteLength);
    }
    return data;
  });

  // node_modules/ipfs-http-client/src/object/get.js
  var createGet5 = configure((api) => {
    async function get(cid, options = {}) {
      const res = await api.post("object/get", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: `${cid instanceof Uint8Array ? CID.decode(cid) : cid}`,
          dataEncoding: "base64",
          ...options,
        }),
        headers: options.headers,
      });
      const data = await res.json();
      return {
        Data: fromString3(data.Data, "base64pad"),
        Links: (data.Links || []).map((link) => ({
          Name: link.Name,
          Hash: CID.parse(link.Hash),
          Tsize: link.Size,
        })),
      };
    }
    return get;
  });

  // node_modules/ipfs-http-client/src/object/links.js
  var createLinks = configure((api) => {
    async function links(cid, options = {}) {
      const res = await api.post("object/links", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: `${cid instanceof Uint8Array ? CID.decode(cid) : cid}`,
          ...options,
        }),
        headers: options.headers,
      });
      const data = await res.json();
      return (data.Links || []).map((l) => ({
        Name: l.Name,
        Tsize: l.Size,
        Hash: CID.parse(l.Hash),
      }));
    }
    return links;
  });

  // node_modules/ipfs-http-client/src/object/new.js
  var createNew = configure((api) => {
    async function newObject(options = {}) {
      const res = await api.post("object/new", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: options.template,
          ...options,
        }),
        headers: options.headers,
      });
      const { Hash } = await res.json();
      return CID.parse(Hash);
    }
    return newObject;
  });

  // node_modules/ipfs-http-client/src/object/put.js
  var createPut4 = (codecs2, options) => {
    const fn = configure((api) => {
      const dagPut = createPut2(codecs2, options);
      async function put(obj, options2 = {}) {
        return dagPut(obj, {
          ...options2,
          storeCodec: "dag-pb",
          hashAlg: "sha2-256",
          version: 1,
        });
      }
      return put;
    });
    return fn(options);
  };

  // node_modules/ipfs-http-client/src/object/stat.js
  var createStat4 = configure((api) => {
    async function stat(cid, options = {}) {
      const res = await api.post("object/stat", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: `${cid}`,
          ...options,
        }),
        headers: options.headers,
      });
      const output = await res.json();
      return {
        ...output,
        Hash: CID.parse(output.Hash),
      };
    }
    return stat;
  });

  // node_modules/ipfs-http-client/src/object/patch/add-link.js
  var createAddLink = configure((api) => {
    async function addLink(cid, dLink, options = {}) {
      const res = await api.post("object/patch/add-link", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: [
            `${cid}`,
            dLink.Name || dLink.name || "",
            (dLink.Hash || dLink.cid || "").toString() || null,
          ],
          ...options,
        }),
        headers: options.headers,
      });
      const { Hash } = await res.json();
      return CID.parse(Hash);
    }
    return addLink;
  });

  // node_modules/ipfs-http-client/src/object/patch/append-data.js
  var createAppendData = configure((api) => {
    async function appendData(cid, data, options = {}) {
      const controller = new AbortController();
      const signal = abortSignal(controller.signal, options.signal);
      const res = await api.post("object/patch/append-data", {
        signal,
        searchParams: toUrlSearchParams({
          arg: `${cid}`,
          ...options,
        }),
        ...(await multipartRequest([data], controller, options.headers)),
      });
      const { Hash } = await res.json();
      return CID.parse(Hash);
    }
    return appendData;
  });

  // node_modules/ipfs-http-client/src/object/patch/rm-link.js
  var createRmLink = configure((api) => {
    async function rmLink(cid, dLink, options = {}) {
      const res = await api.post("object/patch/rm-link", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: [`${cid}`, dLink.Name || dLink.name || null],
          ...options,
        }),
        headers: options.headers,
      });
      const { Hash } = await res.json();
      return CID.parse(Hash);
    }
    return rmLink;
  });

  // node_modules/ipfs-http-client/src/object/patch/set-data.js
  var createSetData = configure((api) => {
    async function setData(cid, data, options = {}) {
      const controller = new AbortController();
      const signal = abortSignal(controller.signal, options.signal);
      const res = await api.post("object/patch/set-data", {
        signal,
        searchParams: toUrlSearchParams({
          arg: [`${cid}`],
          ...options,
        }),
        ...(await multipartRequest([data], controller, options.headers)),
      });
      const { Hash } = await res.json();
      return CID.parse(Hash);
    }
    return setData;
  });

  // node_modules/ipfs-http-client/src/object/patch/index.js
  function createPatch(config) {
    return {
      addLink: createAddLink(config),
      appendData: createAppendData(config),
      rmLink: createRmLink(config),
      setData: createSetData(config),
    };
  }

  // node_modules/ipfs-http-client/src/object/index.js
  function createObject(codecs2, config) {
    return {
      data: createData(config),
      get: createGet5(config),
      links: createLinks(config),
      new: createNew(config),
      put: createPut4(codecs2, config),
      stat: createStat4(config),
      patch: createPatch(config),
    };
  }

  // node_modules/ipfs-core-utils/src/pins/normalise-input.js
  var import_err_code11 = __toESM(require_err_code4(), 1);
  async function* normaliseInput2(input) {
    if (input === null || input === void 0) {
      throw (0, import_err_code11.default)(
        new Error(`Unexpected input: ${input}`),
        "ERR_UNEXPECTED_INPUT"
      );
    }
    const cid = CID.asCID(input);
    if (cid) {
      yield toPin({ cid });
      return;
    }
    if (input instanceof String || typeof input === "string") {
      yield toPin({ path: input });
      return;
    }
    if (input.cid != null || input.path != null) {
      return yield toPin(input);
    }
    if (Symbol.iterator in input) {
      const iterator = input[Symbol.iterator]();
      const first2 = iterator.next();
      if (first2.done) return iterator;
      if (
        CID.asCID(first2.value) ||
        first2.value instanceof String ||
        typeof first2.value === "string"
      ) {
        yield toPin({ cid: first2.value });
        for (const cid2 of iterator) {
          yield toPin({ cid: cid2 });
        }
        return;
      }
      if (first2.value.cid != null || first2.value.path != null) {
        yield toPin(first2.value);
        for (const obj of iterator) {
          yield toPin(obj);
        }
        return;
      }
      throw (0, import_err_code11.default)(
        new Error("Unexpected input: " + typeof input),
        "ERR_UNEXPECTED_INPUT"
      );
    }
    if (Symbol.asyncIterator in input) {
      const iterator = input[Symbol.asyncIterator]();
      const first2 = await iterator.next();
      if (first2.done) return iterator;
      if (
        CID.asCID(first2.value) ||
        first2.value instanceof String ||
        typeof first2.value === "string"
      ) {
        yield toPin({ cid: first2.value });
        for await (const cid2 of iterator) {
          yield toPin({ cid: cid2 });
        }
        return;
      }
      if (first2.value.cid != null || first2.value.path != null) {
        yield toPin(first2.value);
        for await (const obj of iterator) {
          yield toPin(obj);
        }
        return;
      }
      throw (0, import_err_code11.default)(
        new Error("Unexpected input: " + typeof input),
        "ERR_UNEXPECTED_INPUT"
      );
    }
    throw (0, import_err_code11.default)(
      new Error("Unexpected input: " + typeof input),
      "ERR_UNEXPECTED_INPUT"
    );
  }
  function toPin(input) {
    const path = input.cid || `${input.path}`;
    if (!path) {
      throw (0, import_err_code11.default)(
        new Error("Unexpected input: Please path either a CID or an IPFS path"),
        "ERR_UNEXPECTED_INPUT"
      );
    }
    const pin = {
      path,
      recursive: input.recursive !== false,
    };
    if (input.metadata != null) {
      pin.metadata = input.metadata;
    }
    return pin;
  }

  // node_modules/ipfs-http-client/src/pin/add-all.js
  var createAddAll = configure((api) => {
    async function* addAll(source, options = {}) {
      for await (const { path, recursive, metadata } of normaliseInput2(
        source
      )) {
        const res = await api.post("pin/add", {
          signal: options.signal,
          searchParams: toUrlSearchParams({
            ...options,
            arg: path,
            recursive,
            metadata: metadata ? JSON.stringify(metadata) : void 0,
            stream: true,
          }),
          headers: options.headers,
        });
        for await (const pin of res.ndjson()) {
          if (pin.Pins) {
            for (const cid of pin.Pins) {
              yield CID.parse(cid);
            }
            continue;
          }
          yield CID.parse(pin);
        }
      }
    }
    return addAll;
  });

  // node_modules/ipfs-http-client/src/pin/add.js
  function createAdd2(config) {
    const all2 = createAddAll(config);
    return configure(() => {
      async function add(path, options = {}) {
        return last(
          all2(
            [
              {
                path,
                ...options,
              },
            ],
            options
          )
        );
      }
      return add;
    })(config);
  }

  // node_modules/ipfs-http-client/src/pin/ls.js
  function toPin2(type, cid, metadata) {
    const pin = {
      type,
      cid: CID.parse(cid),
    };
    if (metadata) {
      pin.metadata = metadata;
    }
    return pin;
  }
  var createLs3 = configure((api) => {
    async function* ls(options = {}) {
      let paths = [];
      if (options.paths) {
        paths = Array.isArray(options.paths) ? options.paths : [options.paths];
      }
      const res = await api.post("pin/ls", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          ...options,
          arg: paths.map((path) => `${path}`),
          stream: true,
        }),
        headers: options.headers,
      });
      for await (const pin of res.ndjson()) {
        if (pin.Keys) {
          for (const cid of Object.keys(pin.Keys)) {
            yield toPin2(pin.Keys[cid].Type, cid, pin.Keys[cid].Metadata);
          }
          return;
        }
        yield toPin2(pin.Type, pin.Cid, pin.Metadata);
      }
    }
    return ls;
  });

  // node_modules/ipfs-http-client/src/pin/rm-all.js
  var createRmAll = configure((api) => {
    async function* rmAll(source, options = {}) {
      for await (const { path, recursive } of normaliseInput2(source)) {
        const searchParams = new URLSearchParams(options.searchParams);
        searchParams.append("arg", `${path}`);
        if (recursive != null) searchParams.set("recursive", String(recursive));
        const res = await api.post("pin/rm", {
          signal: options.signal,
          headers: options.headers,
          searchParams: toUrlSearchParams({
            ...options,
            arg: `${path}`,
            recursive,
          }),
        });
        for await (const pin of res.ndjson()) {
          if (pin.Pins) {
            yield* pin.Pins.map((cid) => CID.parse(cid));
            continue;
          }
          yield CID.parse(pin);
        }
      }
    }
    return rmAll;
  });

  // node_modules/ipfs-http-client/src/pin/rm.js
  var createRm5 = (config) => {
    const all2 = createRmAll(config);
    return configure(() => {
      async function rm(path, options = {}) {
        return last(
          all2(
            [
              {
                path,
                ...options,
              },
            ],
            options
          )
        );
      }
      return rm;
    })(config);
  };

  // node_modules/ipfs-http-client/src/pin/remote/utils.js
  var decodePin = ({ Name: name8, Status: status, Cid: cid }) => {
    return {
      cid: CID.parse(cid),
      name: name8,
      status,
    };
  };
  var encodeService = (service) => {
    if (typeof service === "string" && service !== "") {
      return service;
    } else {
      throw new TypeError("service name must be passed");
    }
  };
  var encodeCID2 = (cid) => {
    if (CID.asCID(cid)) {
      return cid.toString();
    } else {
      throw new TypeError(`CID instance expected instead of ${typeof cid}`);
    }
  };
  var encodeQuery = ({ service, cid, name: name8, status, all: all2 }) => {
    const query = toUrlSearchParams({
      service: encodeService(service),
      name: name8,
      force: all2 ? true : void 0,
    });
    if (cid) {
      for (const value of cid) {
        query.append("cid", encodeCID2(value));
      }
    }
    if (status) {
      for (const value of status) {
        query.append("status", value);
      }
    }
    return query;
  };
  var encodeAddParams = ({
    cid,
    service,
    background,
    name: name8,
    origins,
  }) => {
    const params = toUrlSearchParams({
      arg: encodeCID2(cid),
      service: encodeService(service),
      name: name8,
      background: background ? true : void 0,
    });
    if (origins) {
      for (const origin of origins) {
        params.append("origin", origin.toString());
      }
    }
    return params;
  };

  // node_modules/ipfs-http-client/src/pin/remote/add.js
  function createAdd3(client) {
    async function add(cid, { timeout, signal, headers, ...query }) {
      const response = await client.post("pin/remote/add", {
        timeout,
        signal,
        headers,
        searchParams: encodeAddParams({ cid, ...query }),
      });
      return decodePin(await response.json());
    }
    return add;
  }

  // node_modules/ipfs-http-client/src/pin/remote/ls.js
  function createLs4(client) {
    async function* ls({ timeout, signal, headers, ...query }) {
      const response = await client.post("pin/remote/ls", {
        timeout,
        signal,
        headers,
        searchParams: encodeQuery(query),
      });
      for await (const pin of response.ndjson()) {
        yield decodePin(pin);
      }
    }
    return ls;
  }

  // node_modules/ipfs-http-client/src/pin/remote/rm.js
  function createRm6(client) {
    async function rm({ timeout, signal, headers, ...query }) {
      await client.post("pin/remote/rm", {
        timeout,
        signal,
        headers,
        searchParams: encodeQuery({
          ...query,
          all: false,
        }),
      });
    }
    return rm;
  }

  // node_modules/ipfs-http-client/src/pin/remote/rm-all.js
  function createRmAll2(client) {
    async function rmAll({ timeout, signal, headers, ...query }) {
      await client.post("pin/remote/rm", {
        timeout,
        signal,
        headers,
        searchParams: encodeQuery({
          ...query,
          all: true,
        }),
      });
    }
    return rmAll;
  }

  // node_modules/ipfs-http-client/src/pin/remote/service/utils.js
  function encodeEndpoint(url) {
    const href = String(url);
    if (href === "undefined") {
      throw Error("endpoint is required");
    }
    return href[href.length - 1] === "/" ? href.slice(0, -1) : href;
  }
  function decodeRemoteService(json) {
    return {
      service: json.Service,
      endpoint: new URL(json.ApiEndpoint),
      ...(json.Stat && { stat: decodeStat(json.Stat) }),
    };
  }
  function decodeStat(json) {
    switch (json.Status) {
      case "valid": {
        const { Pinning, Pinned, Queued, Failed } = json.PinCount;
        return {
          status: "valid",
          pinCount: {
            queued: Queued,
            pinning: Pinning,
            pinned: Pinned,
            failed: Failed,
          },
        };
      }
      case "invalid": {
        return { status: "invalid" };
      }
      default: {
        return { status: json.Status };
      }
    }
  }

  // node_modules/ipfs-http-client/src/pin/remote/service/add.js
  function createAdd4(client) {
    async function add(name8, options) {
      const { endpoint, key, headers, timeout, signal } = options;
      await client.post("pin/remote/service/add", {
        timeout,
        signal,
        searchParams: toUrlSearchParams({
          arg: [name8, encodeEndpoint(endpoint), key],
        }),
        headers,
      });
    }
    return add;
  }

  // node_modules/ipfs-http-client/src/pin/remote/service/ls.js
  function createLs5(client) {
    async function ls(options = {}) {
      const { stat, headers, timeout, signal } = options;
      const response = await client.post("pin/remote/service/ls", {
        timeout,
        signal,
        headers,
        searchParams: stat === true ? toUrlSearchParams({ stat }) : void 0,
      });
      const { RemoteServices } = await response.json();
      return RemoteServices.map(decodeRemoteService);
    }
    return ls;
  }

  // node_modules/ipfs-http-client/src/pin/remote/service/rm.js
  function createRm7(client) {
    async function rm(name8, options = {}) {
      await client.post("pin/remote/service/rm", {
        signal: options.signal,
        headers: options.headers,
        searchParams: toUrlSearchParams({
          arg: name8,
        }),
      });
    }
    return rm;
  }

  // node_modules/ipfs-http-client/src/pin/remote/service/index.js
  function createService(config) {
    const client = new Client(config);
    return {
      add: createAdd4(client),
      ls: createLs5(client),
      rm: createRm7(client),
    };
  }

  // node_modules/ipfs-http-client/src/pin/remote/index.js
  function createRemote(config) {
    const client = new Client(config);
    return {
      add: createAdd3(client),
      ls: createLs4(client),
      rm: createRm6(client),
      rmAll: createRmAll2(client),
      service: createService(config),
    };
  }

  // node_modules/ipfs-http-client/src/pin/index.js
  function createPin(config) {
    return {
      addAll: createAddAll(config),
      add: createAdd2(config),
      ls: createLs3(config),
      rmAll: createRmAll(config),
      rm: createRm5(config),
      remote: createRemote(config),
    };
  }

  // node_modules/ipfs-http-client/src/lib/http-rpc-wire-format.js
  var rpcArrayToTextArray = (strings) => {
    if (Array.isArray(strings)) {
      return strings.map(rpcToText);
    }
    return strings;
  };
  var rpcToText = (mb) => toString3(rpcToBytes(mb));
  var rpcToBytes = (mb) => base64url.decode(mb);
  var rpcToBigInt = (mb) =>
    BigInt(`0x${toString3(base64url.decode(mb), "base16")}`);
  var textToUrlSafeRpc = (text) => base64url.encode(fromString3(text));

  // node_modules/ipfs-http-client/src/pubsub/ls.js
  var createLs6 = configure((api) => {
    async function ls(options = {}) {
      const { Strings } = await (
        await api.post("pubsub/ls", {
          signal: options.signal,
          searchParams: toUrlSearchParams(options),
          headers: options.headers,
        })
      ).json();
      return rpcArrayToTextArray(Strings) || [];
    }
    return ls;
  });

  // node_modules/ipfs-http-client/src/pubsub/peers.js
  var createPeers = configure((api) => {
    async function peers(topic, options = {}) {
      const res = await api.post("pubsub/peers", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: textToUrlSafeRpc(topic),
          ...options,
        }),
        headers: options.headers,
      });
      const { Strings } = await res.json();
      return Strings || [];
    }
    return peers;
  });

  // node_modules/ipfs-http-client/src/pubsub/publish.js
  var createPublish2 = configure((api) => {
    async function publish(topic, data, options = {}) {
      const searchParams = toUrlSearchParams({
        arg: textToUrlSafeRpc(topic),
        ...options,
      });
      const controller = new AbortController();
      const signal = abortSignal(controller.signal, options.signal);
      const res = await api.post("pubsub/pub", {
        signal,
        searchParams,
        ...(await multipartRequest([data], controller, options.headers)),
      });
      await res.text();
    }
    return publish;
  });

  // node_modules/ipfs-http-client/src/pubsub/subscribe.js
  var log2 = logger("ipfs-http-client:pubsub:subscribe");
  var createSubscribe = (options, subsTracker) => {
    return configure((api) => {
      async function subscribe(topic, handler, options2 = {}) {
        options2.signal = subsTracker.subscribe(
          topic,
          handler,
          options2.signal
        );
        let done;
        let fail;
        const result = new Promise((resolve2, reject) => {
          done = resolve2;
          fail = reject;
        });
        const ffWorkaround = setTimeout(() => done(), 1e3);
        api
          .post("pubsub/sub", {
            signal: options2.signal,
            searchParams: toUrlSearchParams({
              arg: textToUrlSafeRpc(topic),
              ...options2,
            }),
            headers: options2.headers,
          })
          .catch((err) => {
            subsTracker.unsubscribe(topic, handler);
            fail(err);
          })
          .then((response) => {
            clearTimeout(ffWorkaround);
            if (!response) {
              return;
            }
            readMessages(response, {
              onMessage: (message) => {
                if (!handler) {
                  return;
                }
                if (typeof handler === "function") {
                  handler(message);
                  return;
                }
                if (typeof handler.handleEvent === "function") {
                  handler.handleEvent(message);
                }
              },
              onEnd: () => subsTracker.unsubscribe(topic, handler),
              onError: options2.onError,
            });
            done();
          });
        return result;
      }
      return subscribe;
    })(options);
  };
  async function readMessages(response, { onMessage, onEnd, onError }) {
    onError = onError || log2;
    try {
      for await (const msg of response.ndjson()) {
        try {
          if (!msg.from) {
            continue;
          }
          if (msg.from != null && msg.seqno != null) {
            onMessage({
              type: "signed",
              from: peerIdFromString(msg.from),
              data: rpcToBytes(msg.data),
              sequenceNumber: rpcToBigInt(msg.seqno),
              topic: rpcToText(msg.topicIDs[0]),
              key: rpcToBytes(msg.key ?? "u"),
              signature: rpcToBytes(msg.signature ?? "u"),
            });
          } else {
            onMessage({
              type: "unsigned",
              data: rpcToBytes(msg.data),
              topic: rpcToText(msg.topicIDs[0]),
            });
          }
        } catch (err) {
          err.message = `Failed to parse pubsub message: ${err.message}`;
          onError(err, false, msg);
        }
      }
    } catch (err) {
      if (!isAbortError(err)) {
        onError(err, true);
      }
    } finally {
      onEnd();
    }
  }
  var isAbortError = (error) => {
    switch (error.type) {
      case "aborted":
        return true;
      case "abort":
        return true;
      default:
        return error.name === "AbortError";
    }
  };

  // node_modules/ipfs-http-client/src/pubsub/unsubscribe.js
  var createUnsubscribe = (options, subsTracker) => {
    async function unsubscribe(topic, handler) {
      subsTracker.unsubscribe(topic, handler);
    }
    return unsubscribe;
  };

  // node_modules/ipfs-http-client/src/pubsub/subscription-tracker.js
  var SubscriptionTracker = class {
    constructor() {
      this._subs = /* @__PURE__ */ new Map();
    }
    subscribe(topic, handler, signal) {
      const topicSubs = this._subs.get(topic) || [];
      if (topicSubs.find((s) => s.handler === handler)) {
        throw new Error(`Already subscribed to ${topic} with this handler`);
      }
      const controller = new AbortController();
      this._subs.set(topic, [{ handler, controller }].concat(topicSubs));
      if (signal) {
        signal.addEventListener("abort", () =>
          this.unsubscribe(topic, handler)
        );
      }
      return controller.signal;
    }
    unsubscribe(topic, handler) {
      const subs = this._subs.get(topic) || [];
      let unsubs;
      if (handler) {
        this._subs.set(
          topic,
          subs.filter((s) => s.handler !== handler)
        );
        unsubs = subs.filter((s) => s.handler === handler);
      } else {
        this._subs.set(topic, []);
        unsubs = subs;
      }
      if (!(this._subs.get(topic) || []).length) {
        this._subs.delete(topic);
      }
      unsubs.forEach((s) => s.controller.abort());
    }
  };

  // node_modules/ipfs-http-client/src/pubsub/index.js
  function createPubsub2(config) {
    const subscriptionTracker = new SubscriptionTracker();
    return {
      ls: createLs6(config),
      peers: createPeers(config),
      publish: createPublish2(config),
      subscribe: createSubscribe(config, subscriptionTracker),
      unsubscribe: createUnsubscribe(config, subscriptionTracker),
    };
  }

  // node_modules/ipfs-http-client/src/refs/local.js
  var createLocal = configure((api) => {
    async function* refsLocal(options = {}) {
      const res = await api.post("refs/local", {
        signal: options.signal,
        transform: objectToCamel,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      yield* res.ndjson();
    }
    return refsLocal;
  });

  // node_modules/ipfs-http-client/src/refs/index.js
  var createRefs = configure((api, opts) => {
    const refs = async function* (args, options = {}) {
      const argsArr = Array.isArray(args) ? args : [args];
      const res = await api.post("refs", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: argsArr.map(
            (arg) => `${arg instanceof Uint8Array ? CID.decode(arg) : arg}`
          ),
          ...options,
        }),
        headers: options.headers,
        transform: objectToCamel,
      });
      yield* res.ndjson();
    };
    return Object.assign(refs, {
      local: createLocal(opts),
    });
  });

  // node_modules/ipfs-http-client/src/repo/gc.js
  var createGc = configure((api) => {
    async function* gc(options = {}) {
      const res = await api.post("repo/gc", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
        transform: (res2) => {
          return {
            err: res2.Error ? new Error(res2.Error) : null,
            cid: (res2.Key || {})["/"] ? CID.parse(res2.Key["/"]) : null,
          };
        },
      });
      yield* res.ndjson();
    }
    return gc;
  });

  // node_modules/ipfs-http-client/src/repo/stat.js
  var createStat5 = configure((api) => {
    async function stat(options = {}) {
      const res = await api.post("repo/stat", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      const data = await res.json();
      return {
        numObjects: BigInt(data.NumObjects),
        repoSize: BigInt(data.RepoSize),
        repoPath: data.RepoPath,
        version: data.Version,
        storageMax: BigInt(data.StorageMax),
      };
    }
    return stat;
  });

  // node_modules/ipfs-http-client/src/repo/version.js
  var createVersion = configure((api) => {
    async function version(options = {}) {
      const res = await (
        await api.post("repo/version", {
          signal: options.signal,
          searchParams: toUrlSearchParams(options),
          headers: options.headers,
        })
      ).json();
      return res.Version;
    }
    return version;
  });

  // node_modules/ipfs-http-client/src/repo/index.js
  function createRepo(config) {
    return {
      gc: createGc(config),
      stat: createStat5(config),
      version: createVersion(config),
    };
  }

  // node_modules/ipfs-http-client/src/stats/bw.js
  var createBw = configure((api) => {
    async function* bw(options = {}) {
      const res = await api.post("stats/bw", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
        transform: (stats) => ({
          totalIn: BigInt(stats.TotalIn),
          totalOut: BigInt(stats.TotalOut),
          rateIn: parseFloat(stats.RateIn),
          rateOut: parseFloat(stats.RateOut),
        }),
      });
      yield* res.ndjson();
    }
    return bw;
  });

  // node_modules/ipfs-http-client/src/stats/index.js
  function createStats(config) {
    return {
      bitswap: createStat(config),
      repo: createStat5(config),
      bw: createBw(config),
    };
  }

  // node_modules/ipfs-http-client/src/swarm/addrs.js
  var createAddrs = configure((api) => {
    async function addrs(options = {}) {
      const res = await api.post("swarm/addrs", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      const { Addrs } = await res.json();
      return Object.keys(Addrs).map((id) => ({
        id: peerIdFromString(id),
        addrs: (Addrs[id] || []).map((a) => multiaddr(a)),
      }));
    }
    return addrs;
  });

  // node_modules/ipfs-http-client/src/swarm/connect.js
  var createConnect = configure((api) => {
    async function connect(addr, options = {}) {
      const res = await api.post("swarm/connect", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: addr,
          ...options,
        }),
        headers: options.headers,
      });
      const { Strings } = await res.json();
      return Strings || [];
    }
    return connect;
  });

  // node_modules/ipfs-http-client/src/swarm/disconnect.js
  var createDisconnect = configure((api) => {
    async function disconnect(addr, options = {}) {
      const res = await api.post("swarm/disconnect", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: addr,
          ...options,
        }),
        headers: options.headers,
      });
      const { Strings } = await res.json();
      return Strings || [];
    }
    return disconnect;
  });

  // node_modules/ipfs-http-client/src/swarm/local-addrs.js
  var createLocalAddrs = configure((api) => {
    async function localAddrs(options = {}) {
      const res = await api.post("swarm/addrs/local", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      const { Strings } = await res.json();
      return (Strings || []).map((a) => multiaddr(a));
    }
    return localAddrs;
  });

  // node_modules/ipfs-http-client/src/swarm/peers.js
  var createPeers2 = configure((api) => {
    async function peers(options = {}) {
      const res = await api.post("swarm/peers", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      const { Peers } = await res.json();
      return (Peers || []).map((peer) => {
        return {
          addr: multiaddr(peer.Addr),
          peer: peerIdFromString(peer.Peer),
          muxer: peer.Muxer,
          latency: peer.Latency,
          streams: peer.Streams,
          direction:
            peer.Direction == null
              ? void 0
              : peer.Direction === 0
              ? "inbound"
              : "outbound",
        };
      });
    }
    return peers;
  });

  // node_modules/ipfs-http-client/src/swarm/index.js
  function createSwarm(config) {
    return {
      addrs: createAddrs(config),
      connect: createConnect(config),
      disconnect: createDisconnect(config),
      localAddrs: createLocalAddrs(config),
      peers: createPeers2(config),
    };
  }

  // node_modules/ipfs-http-client/src/add-all.js
  var createAddAll2 = configure((api) => {
    async function* addAll(source, options = {}) {
      const controller = new AbortController();
      const signal = abortSignal(controller.signal, options.signal);
      const { headers, body, total, parts } = await multipartRequest(
        source,
        controller,
        options.headers
      );
      const [progressFn, onUploadProgress] =
        typeof options.progress === "function"
          ? createProgressHandler(total, parts, options.progress)
          : [void 0, void 0];
      const res = await api.post("add", {
        searchParams: toUrlSearchParams({
          "stream-channels": true,
          ...options,
          progress: Boolean(progressFn),
        }),
        onUploadProgress,
        signal,
        headers,
        body,
      });
      for await (let file of res.ndjson()) {
        file = objectToCamel(file);
        if (file.hash !== void 0) {
          yield toCoreInterface5(file);
        } else if (progressFn) {
          progressFn(file.bytes || 0, file.name);
        }
      }
    }
    return addAll;
  });
  var createProgressHandler = (total, parts, progress) =>
    parts
      ? [void 0, createOnUploadProgress(total, parts, progress)]
      : [progress, void 0];
  var createOnUploadProgress = (size, parts, progress) => {
    let index = 0;
    const count = parts.length;
    return ({ loaded, total }) => {
      const position = Math.floor((loaded / total) * size);
      while (index < count) {
        const { start, end, name: name8 } = parts[index];
        if (position < end) {
          progress(position - start, name8);
          break;
        } else {
          progress(end - start, name8);
          index += 1;
        }
      }
    };
  };
  function toCoreInterface5({
    name: name8,
    hash,
    size,
    mode,
    mtime,
    mtimeNsecs,
  }) {
    const output = {
      path: name8,
      cid: CID.parse(hash),
      size: parseInt(size),
    };
    if (mode != null) {
      output.mode = parseInt(mode, 8);
    }
    if (mtime != null) {
      output.mtime = {
        secs: mtime,
        nsecs: mtimeNsecs || 0,
      };
    }
    return output;
  }

  // node_modules/ipfs-core-utils/src/files/normalise-content.js
  var import_err_code12 = __toESM(require_err_code4(), 1);

  // node_modules/blob-to-it/dist/src/index.js
  function blobToIt(blob) {
    if (typeof blob.stream === "function") {
      return browserReadableStreamToIt(blob.stream());
    }
    return browserReadableStreamToIt(new Response(blob).body);
  }

  // node_modules/ipfs-core-utils/src/files/normalise-content.js
  async function* toAsyncIterable(thing) {
    yield thing;
  }
  async function normaliseContent2(input) {
    if (isBytes(input)) {
      return toAsyncIterable(toBytes2(input));
    }
    if (typeof input === "string" || input instanceof String) {
      return toAsyncIterable(toBytes2(input.toString()));
    }
    if (isBlob(input)) {
      return blobToIt(input);
    }
    if (isReadableStream(input)) {
      input = browserReadableStreamToIt(input);
    }
    if (Symbol.iterator in input || Symbol.asyncIterator in input) {
      const peekable = peekableIterator(input);
      const { value, done } = await peekable.peek();
      if (done) {
        return toAsyncIterable(new Uint8Array(0));
      }
      peekable.push(value);
      if (Number.isInteger(value)) {
        return toAsyncIterable(Uint8Array.from(await all(peekable)));
      }
      if (
        isBytes(value) ||
        typeof value === "string" ||
        value instanceof String
      ) {
        return map(peekable, toBytes2);
      }
    }
    throw (0, import_err_code12.default)(
      new Error(`Unexpected input: ${input}`),
      "ERR_UNEXPECTED_INPUT"
    );
  }
  function toBytes2(chunk) {
    if (chunk instanceof Uint8Array) {
      return chunk;
    }
    if (ArrayBuffer.isView(chunk)) {
      return new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
    }
    if (chunk instanceof ArrayBuffer) {
      return new Uint8Array(chunk);
    }
    if (Array.isArray(chunk)) {
      return Uint8Array.from(chunk);
    }
    return fromString3(chunk.toString());
  }

  // node_modules/ipfs-core-utils/src/files/normalise-candidate-single.js
  var import_err_code13 = __toESM(require_err_code4(), 1);
  async function* normaliseCandidateSingle(input, normaliseContent3) {
    if (input === null || input === void 0) {
      throw (0, import_err_code13.default)(
        new Error(`Unexpected input: ${input}`),
        "ERR_UNEXPECTED_INPUT"
      );
    }
    if (typeof input === "string" || input instanceof String) {
      yield toFileObject2(input.toString(), normaliseContent3);
      return;
    }
    if (isBytes(input) || isBlob(input)) {
      yield toFileObject2(input, normaliseContent3);
      return;
    }
    if (isReadableStream(input)) {
      input = browserReadableStreamToIt(input);
    }
    if (Symbol.iterator in input || Symbol.asyncIterator in input) {
      const peekable = peekableIterator(input);
      const { value, done } = await peekable.peek();
      if (done) {
        yield { content: [] };
        return;
      }
      peekable.push(value);
      if (
        Number.isInteger(value) ||
        isBytes(value) ||
        typeof value === "string" ||
        value instanceof String
      ) {
        yield toFileObject2(peekable, normaliseContent3);
        return;
      }
      throw (0, import_err_code13.default)(
        new Error(
          "Unexpected input: multiple items passed - if you are using ipfs.add, please use ipfs.addAll instead"
        ),
        "ERR_UNEXPECTED_INPUT"
      );
    }
    if (isFileObject(input)) {
      yield toFileObject2(input, normaliseContent3);
      return;
    }
    throw (0, import_err_code13.default)(
      new Error(
        'Unexpected input: cannot convert "' +
          typeof input +
          '" into ImportCandidate'
      ),
      "ERR_UNEXPECTED_INPUT"
    );
  }
  async function toFileObject2(input, normaliseContent3) {
    const { path, mode, mtime, content } = input;
    const file = {
      path: path || "",
      mode: parseMode(mode),
      mtime: parseMtime2(mtime),
    };
    if (content) {
      file.content = await normaliseContent3(content);
    } else if (!path) {
      file.content = await normaliseContent3(input);
    }
    return file;
  }

  // node_modules/ipfs-core-utils/src/files/normalise-input-single.js
  function normaliseInput3(input) {
    return normaliseCandidateSingle(input, normaliseContent2);
  }

  // node_modules/ipfs-http-client/src/add.js
  function createAdd5(options) {
    const all2 = createAddAll2(options);
    return configure(() => {
      async function add(input, options2 = {}) {
        return await last(all2(normaliseInput3(input), options2));
      }
      return add;
    })(options);
  }

  // node_modules/ipfs-http-client/src/cat.js
  var createCat = configure((api) => {
    async function* cat(path, options = {}) {
      const res = await api.post("cat", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: path.toString(),
          ...options,
        }),
        headers: options.headers,
      });
      yield* res.iterator();
    }
    return cat;
  });

  // node_modules/ipfs-http-client/src/commands.js
  var createCommands = configure((api) => {
    const commands = async (options = {}) => {
      const res = await api.post("commands", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      return res.json();
    };
    return commands;
  });

  // node_modules/ipfs-http-client/src/dns.js
  var createDns = configure((api) => {
    const dns = async (domain, options = {}) => {
      const res = await api.post("dns", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: domain,
          ...options,
        }),
        headers: options.headers,
      });
      const data = await res.json();
      return data.Path;
    };
    return dns;
  });

  // node_modules/ipfs-http-client/src/get-endpoint-config.js
  var createGetEndpointConfig = configure((api) => {
    return () => {
      const url = new URL(api.opts.base || "");
      return {
        host: url.hostname,
        port: url.port,
        protocol: url.protocol,
        pathname: url.pathname,
        "api-path": url.pathname,
      };
    };
  });

  // node_modules/ipfs-http-client/src/get.js
  var createGet6 = configure((api) => {
    async function* get(path, options = {}) {
      const opts = {
        arg: `${path instanceof Uint8Array ? CID.decode(path) : path}`,
        ...options,
      };
      if (opts.compressionLevel) {
        opts["compression-level"] = opts.compressionLevel;
        delete opts.compressionLevel;
      }
      const res = await api.post("get", {
        signal: options.signal,
        searchParams: toUrlSearchParams(opts),
        headers: options.headers,
      });
      yield* res.iterator();
    }
    return get;
  });

  // node_modules/ipfs-http-client/src/id.js
  var createId = configure((api) => {
    async function id(options = {}) {
      const res = await api.post("id", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: options.peerId ? options.peerId.toString() : void 0,
          ...options,
        }),
        headers: options.headers,
      });
      const data = await res.json();
      const output = {
        ...objectToCamel(data),
      };
      output.id = peerIdFromString(output.id);
      if (output.addresses) {
        output.addresses = output.addresses.map((ma) => multiaddr(ma));
      }
      return output;
    }
    return id;
  });

  // node_modules/ipfs-http-client/src/is-online.js
  var createIsOnline = (options) => {
    const id = createId(options);
    async function isOnline(options2 = {}) {
      const res = await id(options2);
      return Boolean(res && res.addresses && res.addresses.length);
    }
    return isOnline;
  };

  // node_modules/ipfs-http-client/src/ls.js
  var createLs7 = configure((api, opts) => {
    async function* ls(path, options = {}) {
      const pathStr = `${path instanceof Uint8Array ? CID.decode(path) : path}`;
      async function mapLink(link) {
        let hash = link.Hash;
        if (hash.includes("/")) {
          const ipfsPath = hash.startsWith("/ipfs/") ? hash : `/ipfs/${hash}`;
          const stats = await createStat3(opts)(ipfsPath);
          hash = stats.cid;
        } else {
          hash = CID.parse(hash);
        }
        const entry = {
          name: link.Name,
          path: pathStr + (link.Name ? `/${link.Name}` : ""),
          size: link.Size,
          cid: hash,
          type: typeOf(link),
        };
        if (link.Mode) {
          entry.mode = parseInt(link.Mode, 8);
        }
        if (link.Mtime !== void 0 && link.Mtime !== null) {
          entry.mtime = {
            secs: link.Mtime,
          };
          if (link.MtimeNsecs !== void 0 && link.MtimeNsecs !== null) {
            entry.mtime.nsecs = link.MtimeNsecs;
          }
        }
        return entry;
      }
      const res = await api.post("ls", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: pathStr,
          ...options,
        }),
        headers: options.headers,
      });
      for await (let result of res.ndjson()) {
        result = result.Objects;
        if (!result) {
          throw new Error("expected .Objects in results");
        }
        result = result[0];
        if (!result) {
          throw new Error("expected one array in results.Objects");
        }
        const links = result.Links;
        if (!Array.isArray(links)) {
          throw new Error("expected one array in results.Objects[0].Links");
        }
        if (!links.length) {
          yield mapLink(result);
          return;
        }
        yield* links.map(mapLink);
      }
    }
    return ls;
  });
  function typeOf(link) {
    switch (link.Type) {
      case 1:
      case 5:
        return "dir";
      case 2:
        return "file";
      default:
        return "file";
    }
  }

  // node_modules/ipfs-http-client/src/mount.js
  var createMount = configure((api) => {
    async function mount(options = {}) {
      const res = await api.post("dns", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      return objectToCamel(await res.json());
    }
    return mount;
  });

  // node_modules/ipfs-http-client/src/ping.js
  var createPing = configure((api) => {
    async function* ping(peerId, options = {}) {
      const res = await api.post("ping", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: `${peerId}`,
          ...options,
        }),
        headers: options.headers,
        transform: objectToCamel,
      });
      yield* res.ndjson();
    }
    return ping;
  });

  // node_modules/ipfs-http-client/src/resolve.js
  var createResolve3 = configure((api) => {
    async function resolve2(path, options = {}) {
      const res = await api.post("resolve", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          arg: path,
          ...options,
        }),
        headers: options.headers,
      });
      const { Path } = await res.json();
      return Path;
    }
    return resolve2;
  });

  // node_modules/ipfs-http-client/src/start.js
  var import_err_code14 = __toESM(require_err_code2(), 1);
  var createStart = configure((api) => {
    const start = async (options = {}) => {
      throw (0, import_err_code14.default)(
        new Error("Not implemented"),
        "ERR_NOT_IMPLEMENTED"
      );
    };
    return start;
  });

  // node_modules/ipfs-http-client/src/stop.js
  var createStop = configure((api) => {
    async function stop(options = {}) {
      const res = await api.post("shutdown", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      await res.text();
    }
    return stop;
  });

  // node_modules/ipfs-http-client/src/version.js
  var createVersion2 = configure((api) => {
    async function version(options = {}) {
      const res = await api.post("version", {
        signal: options.signal,
        searchParams: toUrlSearchParams(options),
        headers: options.headers,
      });
      return {
        ...objectToCamel(await res.json()),
        "ipfs-http-client": "1.0.0",
      };
    }
    return version;
  });

  // node_modules/ipfs-http-client/src/index.js
  var import_glob_source = __toESM(require_glob_source(), 1);
  var import_url_source = __toESM(require_url_source(), 1);
  function create2(options = {}) {
    const id = {
      name: identity.name,
      code: identity.code,
      encode: (id2) => id2,
      decode: (id2) => id2,
    };
    const multibaseCodecs = Object.values(bases);
    (options.ipld && options.ipld.bases ? options.ipld.bases : []).forEach(
      (base3) => multibaseCodecs.push(base3)
    );
    const multibases = new Multibases({
      bases: multibaseCodecs,
      loadBase: options.ipld && options.ipld.loadBase,
    });
    const blockCodecs = Object.values(codecs);
    [src_exports, src_exports2, src_exports3, lib_exports, id]
      .concat((options.ipld && options.ipld.codecs) || [])
      .forEach((codec) => blockCodecs.push(codec));
    const multicodecs = new Multicodecs({
      codecs: blockCodecs,
      loadCodec: options.ipld && options.ipld.loadCodec,
    });
    const multihashHashers = Object.values(hashes);
    (options.ipld && options.ipld.hashers ? options.ipld.hashers : []).forEach(
      (hasher) => multihashHashers.push(hasher)
    );
    const multihashes = new Multihashes({
      hashers: multihashHashers,
      loadHasher: options.ipld && options.ipld.loadHasher,
    });
    const client = {
      add: createAdd5(options),
      addAll: createAddAll2(options),
      bitswap: createBitswap(options),
      block: createBlock(options),
      bootstrap: createBootstrap(options),
      cat: createCat(options),
      commands: createCommands(options),
      config: createConfig(options),
      dag: createDag(multicodecs, options),
      dht: createDht(options),
      diag: createDiag(options),
      dns: createDns(options),
      files: createFiles(options),
      get: createGet6(options),
      getEndpointConfig: createGetEndpointConfig(options),
      id: createId(options),
      isOnline: createIsOnline(options),
      key: createKey(options),
      log: createLog(options),
      ls: createLs7(options),
      mount: createMount(options),
      name: createName(options),
      object: createObject(multicodecs, options),
      pin: createPin(options),
      ping: createPing(options),
      pubsub: createPubsub2(options),
      refs: createRefs(options),
      repo: createRepo(options),
      resolve: createResolve3(options),
      start: createStart(options),
      stats: createStats(options),
      stop: createStop(options),
      swarm: createSwarm(options),
      version: createVersion2(options),
      bases: multibases,
      codecs: multicodecs,
      hashers: multihashes,
    };
    return client;
  }
  var globSource = import_glob_source.default;
})();