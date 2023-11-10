"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/depd/index.js
var require_depd = __commonJS({
  "node_modules/depd/index.js"(exports, module2) {
    "use strict";
    var relative = require("path").relative;
    module2.exports = depd;
    var basePath = process.cwd();
    function containsNamespace(str, namespace) {
      var vals = str.split(/[ ,]+/);
      var ns = String(namespace).toLowerCase();
      for (var i = 0; i < vals.length; i++) {
        var val = vals[i];
        if (val && (val === "*" || val.toLowerCase() === ns)) {
          return true;
        }
      }
      return false;
    }
    function convertDataDescriptorToAccessor(obj, prop, message) {
      var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
      var value = descriptor.value;
      descriptor.get = function getter() {
        return value;
      };
      if (descriptor.writable) {
        descriptor.set = function setter(val) {
          return value = val;
        };
      }
      delete descriptor.value;
      delete descriptor.writable;
      Object.defineProperty(obj, prop, descriptor);
      return descriptor;
    }
    function createArgumentsString(arity) {
      var str = "";
      for (var i = 0; i < arity; i++) {
        str += ", arg" + i;
      }
      return str.substr(2);
    }
    function createStackString(stack) {
      var str = this.name + ": " + this.namespace;
      if (this.message) {
        str += " deprecated " + this.message;
      }
      for (var i = 0; i < stack.length; i++) {
        str += "\n    at " + stack[i].toString();
      }
      return str;
    }
    function depd(namespace) {
      if (!namespace) {
        throw new TypeError("argument namespace is required");
      }
      var stack = getStack();
      var site = callSiteLocation(stack[1]);
      var file = site[0];
      function deprecate(message) {
        log.call(deprecate, message);
      }
      deprecate._file = file;
      deprecate._ignored = isignored(namespace);
      deprecate._namespace = namespace;
      deprecate._traced = istraced(namespace);
      deprecate._warned = /* @__PURE__ */ Object.create(null);
      deprecate.function = wrapfunction;
      deprecate.property = wrapproperty;
      return deprecate;
    }
    function eehaslisteners(emitter, type) {
      var count = typeof emitter.listenerCount !== "function" ? emitter.listeners(type).length : emitter.listenerCount(type);
      return count > 0;
    }
    function isignored(namespace) {
      if (process.noDeprecation) {
        return true;
      }
      var str = process.env.NO_DEPRECATION || "";
      return containsNamespace(str, namespace);
    }
    function istraced(namespace) {
      if (process.traceDeprecation) {
        return true;
      }
      var str = process.env.TRACE_DEPRECATION || "";
      return containsNamespace(str, namespace);
    }
    function log(message, site) {
      var haslisteners = eehaslisteners(process, "deprecation");
      if (!haslisteners && this._ignored) {
        return;
      }
      var caller;
      var callFile;
      var callSite;
      var depSite;
      var i = 0;
      var seen = false;
      var stack = getStack();
      var file = this._file;
      if (site) {
        depSite = site;
        callSite = callSiteLocation(stack[1]);
        callSite.name = depSite.name;
        file = callSite[0];
      } else {
        i = 2;
        depSite = callSiteLocation(stack[i]);
        callSite = depSite;
      }
      for (; i < stack.length; i++) {
        caller = callSiteLocation(stack[i]);
        callFile = caller[0];
        if (callFile === file) {
          seen = true;
        } else if (callFile === this._file) {
          file = this._file;
        } else if (seen) {
          break;
        }
      }
      var key = caller ? depSite.join(":") + "__" + caller.join(":") : void 0;
      if (key !== void 0 && key in this._warned) {
        return;
      }
      this._warned[key] = true;
      var msg = message;
      if (!msg) {
        msg = callSite === depSite || !callSite.name ? defaultMessage(depSite) : defaultMessage(callSite);
      }
      if (haslisteners) {
        var err = DeprecationError(this._namespace, msg, stack.slice(i));
        process.emit("deprecation", err);
        return;
      }
      var format = process.stderr.isTTY ? formatColor : formatPlain;
      var output = format.call(this, msg, caller, stack.slice(i));
      process.stderr.write(output + "\n", "utf8");
    }
    function callSiteLocation(callSite) {
      var file = callSite.getFileName() || "<anonymous>";
      var line = callSite.getLineNumber();
      var colm = callSite.getColumnNumber();
      if (callSite.isEval()) {
        file = callSite.getEvalOrigin() + ", " + file;
      }
      var site = [file, line, colm];
      site.callSite = callSite;
      site.name = callSite.getFunctionName();
      return site;
    }
    function defaultMessage(site) {
      var callSite = site.callSite;
      var funcName = site.name;
      if (!funcName) {
        funcName = "<anonymous@" + formatLocation(site) + ">";
      }
      var context = callSite.getThis();
      var typeName = context && callSite.getTypeName();
      if (typeName === "Object") {
        typeName = void 0;
      }
      if (typeName === "Function") {
        typeName = context.name || typeName;
      }
      return typeName && callSite.getMethodName() ? typeName + "." + funcName : funcName;
    }
    function formatPlain(msg, caller, stack) {
      var timestamp = (/* @__PURE__ */ new Date()).toUTCString();
      var formatted = timestamp + " " + this._namespace + " deprecated " + msg;
      if (this._traced) {
        for (var i = 0; i < stack.length; i++) {
          formatted += "\n    at " + stack[i].toString();
        }
        return formatted;
      }
      if (caller) {
        formatted += " at " + formatLocation(caller);
      }
      return formatted;
    }
    function formatColor(msg, caller, stack) {
      var formatted = "\x1B[36;1m" + this._namespace + "\x1B[22;39m \x1B[33;1mdeprecated\x1B[22;39m \x1B[0m" + msg + "\x1B[39m";
      if (this._traced) {
        for (var i = 0; i < stack.length; i++) {
          formatted += "\n    \x1B[36mat " + stack[i].toString() + "\x1B[39m";
        }
        return formatted;
      }
      if (caller) {
        formatted += " \x1B[36m" + formatLocation(caller) + "\x1B[39m";
      }
      return formatted;
    }
    function formatLocation(callSite) {
      return relative(basePath, callSite[0]) + ":" + callSite[1] + ":" + callSite[2];
    }
    function getStack() {
      var limit = Error.stackTraceLimit;
      var obj = {};
      var prep = Error.prepareStackTrace;
      Error.prepareStackTrace = prepareObjectStackTrace;
      Error.stackTraceLimit = Math.max(10, limit);
      Error.captureStackTrace(obj);
      var stack = obj.stack.slice(1);
      Error.prepareStackTrace = prep;
      Error.stackTraceLimit = limit;
      return stack;
    }
    function prepareObjectStackTrace(obj, stack) {
      return stack;
    }
    function wrapfunction(fn, message) {
      if (typeof fn !== "function") {
        throw new TypeError("argument fn must be a function");
      }
      var args = createArgumentsString(fn.length);
      var stack = getStack();
      var site = callSiteLocation(stack[1]);
      site.name = fn.name;
      var deprecatedfn = new Function(
        "fn",
        "log",
        "deprecate",
        "message",
        "site",
        '"use strict"\nreturn function (' + args + ") {log.call(deprecate, message, site)\nreturn fn.apply(this, arguments)\n}"
      )(fn, log, this, message, site);
      return deprecatedfn;
    }
    function wrapproperty(obj, prop, message) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        throw new TypeError("argument obj must be object");
      }
      var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
      if (!descriptor) {
        throw new TypeError("must call property on owner object");
      }
      if (!descriptor.configurable) {
        throw new TypeError("property must be configurable");
      }
      var deprecate = this;
      var stack = getStack();
      var site = callSiteLocation(stack[1]);
      site.name = prop;
      if ("value" in descriptor) {
        descriptor = convertDataDescriptorToAccessor(obj, prop, message);
      }
      var get = descriptor.get;
      var set = descriptor.set;
      if (typeof get === "function") {
        descriptor.get = function getter() {
          log.call(deprecate, message, site);
          return get.apply(this, arguments);
        };
      }
      if (typeof set === "function") {
        descriptor.set = function setter() {
          log.call(deprecate, message, site);
          return set.apply(this, arguments);
        };
      }
      Object.defineProperty(obj, prop, descriptor);
    }
    function DeprecationError(namespace, message, stack) {
      var error = new Error();
      var stackString;
      Object.defineProperty(error, "constructor", {
        value: DeprecationError
      });
      Object.defineProperty(error, "message", {
        configurable: true,
        enumerable: false,
        value: message,
        writable: true
      });
      Object.defineProperty(error, "name", {
        enumerable: false,
        configurable: true,
        value: "DeprecationError",
        writable: true
      });
      Object.defineProperty(error, "namespace", {
        configurable: true,
        enumerable: false,
        value: namespace,
        writable: true
      });
      Object.defineProperty(error, "stack", {
        configurable: true,
        enumerable: false,
        get: function() {
          if (stackString !== void 0) {
            return stackString;
          }
          return stackString = createStackString.call(this, stack);
        },
        set: function setter(val) {
          stackString = val;
        }
      });
      return error;
    }
  }
});

// node_modules/setprototypeof/index.js
var require_setprototypeof = __commonJS({
  "node_modules/setprototypeof/index.js"(exports, module2) {
    "use strict";
    module2.exports = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties);
    function setProtoOf(obj, proto) {
      obj.__proto__ = proto;
      return obj;
    }
    function mixinProperties(obj, proto) {
      for (var prop in proto) {
        if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
          obj[prop] = proto[prop];
        }
      }
      return obj;
    }
  }
});

// node_modules/statuses/codes.json
var require_codes = __commonJS({
  "node_modules/statuses/codes.json"(exports, module2) {
    module2.exports = {
      "100": "Continue",
      "101": "Switching Protocols",
      "102": "Processing",
      "103": "Early Hints",
      "200": "OK",
      "201": "Created",
      "202": "Accepted",
      "203": "Non-Authoritative Information",
      "204": "No Content",
      "205": "Reset Content",
      "206": "Partial Content",
      "207": "Multi-Status",
      "208": "Already Reported",
      "226": "IM Used",
      "300": "Multiple Choices",
      "301": "Moved Permanently",
      "302": "Found",
      "303": "See Other",
      "304": "Not Modified",
      "305": "Use Proxy",
      "307": "Temporary Redirect",
      "308": "Permanent Redirect",
      "400": "Bad Request",
      "401": "Unauthorized",
      "402": "Payment Required",
      "403": "Forbidden",
      "404": "Not Found",
      "405": "Method Not Allowed",
      "406": "Not Acceptable",
      "407": "Proxy Authentication Required",
      "408": "Request Timeout",
      "409": "Conflict",
      "410": "Gone",
      "411": "Length Required",
      "412": "Precondition Failed",
      "413": "Payload Too Large",
      "414": "URI Too Long",
      "415": "Unsupported Media Type",
      "416": "Range Not Satisfiable",
      "417": "Expectation Failed",
      "418": "I'm a Teapot",
      "421": "Misdirected Request",
      "422": "Unprocessable Entity",
      "423": "Locked",
      "424": "Failed Dependency",
      "425": "Too Early",
      "426": "Upgrade Required",
      "428": "Precondition Required",
      "429": "Too Many Requests",
      "431": "Request Header Fields Too Large",
      "451": "Unavailable For Legal Reasons",
      "500": "Internal Server Error",
      "501": "Not Implemented",
      "502": "Bad Gateway",
      "503": "Service Unavailable",
      "504": "Gateway Timeout",
      "505": "HTTP Version Not Supported",
      "506": "Variant Also Negotiates",
      "507": "Insufficient Storage",
      "508": "Loop Detected",
      "509": "Bandwidth Limit Exceeded",
      "510": "Not Extended",
      "511": "Network Authentication Required"
    };
  }
});

// node_modules/statuses/index.js
var require_statuses = __commonJS({
  "node_modules/statuses/index.js"(exports, module2) {
    "use strict";
    var codes = require_codes();
    module2.exports = status;
    status.message = codes;
    status.code = createMessageToStatusCodeMap(codes);
    status.codes = createStatusCodeList(codes);
    status.redirect = {
      300: true,
      301: true,
      302: true,
      303: true,
      305: true,
      307: true,
      308: true
    };
    status.empty = {
      204: true,
      205: true,
      304: true
    };
    status.retry = {
      502: true,
      503: true,
      504: true
    };
    function createMessageToStatusCodeMap(codes2) {
      var map = {};
      Object.keys(codes2).forEach(function forEachCode(code) {
        var message = codes2[code];
        var status2 = Number(code);
        map[message.toLowerCase()] = status2;
      });
      return map;
    }
    function createStatusCodeList(codes2) {
      return Object.keys(codes2).map(function mapCode(code) {
        return Number(code);
      });
    }
    function getStatusCode(message) {
      var msg = message.toLowerCase();
      if (!Object.prototype.hasOwnProperty.call(status.code, msg)) {
        throw new Error('invalid status message: "' + message + '"');
      }
      return status.code[msg];
    }
    function getStatusMessage(code) {
      if (!Object.prototype.hasOwnProperty.call(status.message, code)) {
        throw new Error("invalid status code: " + code);
      }
      return status.message[code];
    }
    function status(code) {
      if (typeof code === "number") {
        return getStatusMessage(code);
      }
      if (typeof code !== "string") {
        throw new TypeError("code must be a number or string");
      }
      var n = parseInt(code, 10);
      if (!isNaN(n)) {
        return getStatusMessage(n);
      }
      return getStatusCode(code);
    }
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports, module2) {
    "use strict";
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "node_modules/inherits/inherits.js"(exports, module2) {
    "use strict";
    try {
      util = require("util");
      if (typeof util.inherits !== "function")
        throw "";
      module2.exports = util.inherits;
    } catch (e) {
      module2.exports = require_inherits_browser();
    }
    var util;
  }
});

// node_modules/toidentifier/index.js
var require_toidentifier = __commonJS({
  "node_modules/toidentifier/index.js"(exports, module2) {
    "use strict";
    module2.exports = toIdentifier;
    function toIdentifier(str) {
      return str.split(" ").map(function(token) {
        return token.slice(0, 1).toUpperCase() + token.slice(1);
      }).join("").replace(/[^ _0-9a-z]/gi, "");
    }
  }
});

// node_modules/http-errors/index.js
var require_http_errors = __commonJS({
  "node_modules/http-errors/index.js"(exports, module2) {
    "use strict";
    var deprecate = require_depd()("http-errors");
    var setPrototypeOf = require_setprototypeof();
    var statuses = require_statuses();
    var inherits = require_inherits();
    var toIdentifier = require_toidentifier();
    module2.exports = createError;
    module2.exports.HttpError = createHttpErrorConstructor();
    module2.exports.isHttpError = createIsHttpErrorFunction(module2.exports.HttpError);
    populateConstructorExports(module2.exports, statuses.codes, module2.exports.HttpError);
    function codeClass(status) {
      return Number(String(status).charAt(0) + "00");
    }
    function createError() {
      var err;
      var msg;
      var status = 500;
      var props = {};
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var type = typeof arg;
        if (type === "object" && arg instanceof Error) {
          err = arg;
          status = err.status || err.statusCode || status;
        } else if (type === "number" && i === 0) {
          status = arg;
        } else if (type === "string") {
          msg = arg;
        } else if (type === "object") {
          props = arg;
        } else {
          throw new TypeError("argument #" + (i + 1) + " unsupported type " + type);
        }
      }
      if (typeof status === "number" && (status < 400 || status >= 600)) {
        deprecate("non-error status code; use only 4xx or 5xx status codes");
      }
      if (typeof status !== "number" || !statuses.message[status] && (status < 400 || status >= 600)) {
        status = 500;
      }
      var HttpError = createError[status] || createError[codeClass(status)];
      if (!err) {
        err = HttpError ? new HttpError(msg) : new Error(msg || statuses.message[status]);
        Error.captureStackTrace(err, createError);
      }
      if (!HttpError || !(err instanceof HttpError) || err.status !== status) {
        err.expose = status < 500;
        err.status = err.statusCode = status;
      }
      for (var key in props) {
        if (key !== "status" && key !== "statusCode") {
          err[key] = props[key];
        }
      }
      return err;
    }
    function createHttpErrorConstructor() {
      function HttpError() {
        throw new TypeError("cannot construct abstract class");
      }
      inherits(HttpError, Error);
      return HttpError;
    }
    function createClientErrorConstructor(HttpError, name, code) {
      var className = toClassName(name);
      function ClientError(message) {
        var msg = message != null ? message : statuses.message[code];
        var err = new Error(msg);
        Error.captureStackTrace(err, ClientError);
        setPrototypeOf(err, ClientError.prototype);
        Object.defineProperty(err, "message", {
          enumerable: true,
          configurable: true,
          value: msg,
          writable: true
        });
        Object.defineProperty(err, "name", {
          enumerable: false,
          configurable: true,
          value: className,
          writable: true
        });
        return err;
      }
      inherits(ClientError, HttpError);
      nameFunc(ClientError, className);
      ClientError.prototype.status = code;
      ClientError.prototype.statusCode = code;
      ClientError.prototype.expose = true;
      return ClientError;
    }
    function createIsHttpErrorFunction(HttpError) {
      return function isHttpError2(val) {
        if (!val || typeof val !== "object") {
          return false;
        }
        if (val instanceof HttpError) {
          return true;
        }
        return val instanceof Error && typeof val.expose === "boolean" && typeof val.statusCode === "number" && val.status === val.statusCode;
      };
    }
    function createServerErrorConstructor(HttpError, name, code) {
      var className = toClassName(name);
      function ServerError(message) {
        var msg = message != null ? message : statuses.message[code];
        var err = new Error(msg);
        Error.captureStackTrace(err, ServerError);
        setPrototypeOf(err, ServerError.prototype);
        Object.defineProperty(err, "message", {
          enumerable: true,
          configurable: true,
          value: msg,
          writable: true
        });
        Object.defineProperty(err, "name", {
          enumerable: false,
          configurable: true,
          value: className,
          writable: true
        });
        return err;
      }
      inherits(ServerError, HttpError);
      nameFunc(ServerError, className);
      ServerError.prototype.status = code;
      ServerError.prototype.statusCode = code;
      ServerError.prototype.expose = false;
      return ServerError;
    }
    function nameFunc(func, name) {
      var desc = Object.getOwnPropertyDescriptor(func, "name");
      if (desc && desc.configurable) {
        desc.value = name;
        Object.defineProperty(func, "name", desc);
      }
    }
    function populateConstructorExports(exports2, codes, HttpError) {
      codes.forEach(function forEachCode(code) {
        var CodeError;
        var name = toIdentifier(statuses.message[code]);
        switch (codeClass(code)) {
          case 400:
            CodeError = createClientErrorConstructor(HttpError, name, code);
            break;
          case 500:
            CodeError = createServerErrorConstructor(HttpError, name, code);
            break;
        }
        if (CodeError) {
          exports2[code] = CodeError;
          exports2[name] = CodeError;
        }
      });
    }
    function toClassName(name) {
      return name.substr(-5) !== "Error" ? name + "Error" : name;
    }
  }
});

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.3.1",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      funding: "https://github.com/motdotla/dotenv?sponsor=1",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@definitelytyped/dtslint": "^0.0.133",
        "@types/node": "^18.11.3",
        decache: "^4.6.1",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.5.0",
        tap: "^16.3.0",
        tar: "^6.1.11",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module2) {
    "use strict";
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var crypto = require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      const vaultPath = _vaultPath(options);
      const result = DotenvModule.configDotenv({ path: vaultPath });
      if (!result.parsed) {
        throw new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _log(message) {
      console.log(`[dotenv@${version}][INFO] ${message}`);
    }
    function _warn(message) {
      console.log(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          throw new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development");
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        throw new Error("INVALID_DOTENV_KEY: Missing key part");
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        throw new Error("INVALID_DOTENV_KEY: Missing environment part");
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      if (options && options.path && options.path.length > 0) {
        dotenvPath = options.path;
      }
      return dotenvPath.endsWith(".vault") ? dotenvPath : `${dotenvPath}.vault`;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      _log("Loading env from encrypted .env.vault");
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      if (options) {
        if (options.path != null) {
          dotenvPath = _resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }));
        let processEnv = process.env;
        if (options && options.processEnv != null) {
          processEnv = options.processEnv;
        }
        DotenvModule.populate(processEnv, parsed, options);
        return { parsed };
      } catch (e) {
        if (debug) {
          _debug(`Failed to load ${dotenvPath} ${e.message}`);
        }
        return { error: e };
      }
    }
    function config(options) {
      const vaultPath = _vaultPath(options);
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      if (!fs.existsSync(vaultPath)) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.slice(0, 12);
      const authTag = ciphertext.slice(-16);
      ciphertext = ciphertext.slice(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const msg = "INVALID_DOTENV_KEY: It must be 64 characters long (or more)";
          throw new Error(msg);
        } else if (decryptionFailed) {
          const msg = "DECRYPTION_FAILED: Please check your DOTENV_KEY";
          throw new Error(msg);
        } else {
          console.error("Error: ", error.code);
          console.error("Error: ", error.message);
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        throw new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config,
      decrypt,
      parse,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "node_modules/dotenv/lib/env-options.js"(exports, module2) {
    "use strict";
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    if (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {
      options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY;
    }
    module2.exports = options;
  }
});

// node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "node_modules/dotenv/lib/cli-options.js"(exports, module2) {
    "use strict";
    var re = /^dotenv_config_(encoding|path|debug|override|DOTENV_KEY)=(.+)$/;
    module2.exports = function optionMatcher(args) {
      return args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
    };
  }
});

// src/routes/MailRoutes.ts
var MailRoutes_exports = {};
__export(MailRoutes_exports, {
  default: () => MailRoutes_default
});
module.exports = __toCommonJS(MailRoutes_exports);
var import_express = require("express");

// src/controllers/UserController.ts
var import_bcryptjs = require("bcryptjs");
var import_http_errors = __toESM(require_http_errors());

// src/DTOs/User.ts
var import_zod = require("zod");
var UserSchema = import_zod.z.object({
  name: import_zod.z.string({ required_error: "O nome \xE9 obrigat\xF3rio." }),
  email: import_zod.z.string({ required_error: "O e-mail \xE9 obrigat\xF3rio." }).email({ message: "O e-mail \xE9 inv\xE1lido." }),
  password: import_zod.z.string({ required_error: "A senha \xE9 obrigat\xF3ria." }).min(8, { message: "A senha deve ter no m\xEDnimo 8 caracteres." }).regex(/[a-z]/i, { message: "A senha deve ter pelo menos uma letra." }).regex(/[0-9]/, { message: "A senha deve ter pelo menos um n\xFAmero." }),
  image: import_zod.z.string({ required_error: "A imagem \xE9 obrigat\xF3ria." }),
  acceptedTerms: import_zod.z.boolean({ required_error: "Os termos s\xE3o obrigat\xF3rios." }),
  role: import_zod.z.enum(["USER", "ADMIN"], {
    invalid_type_error: "O cargo deve ser USER ou ADMIN."
  }).default("USER")
});
var UserUpdateSchema = UserSchema.partial().omit({
  acceptedTerms: true,
  role: true
}).extend({
  password: import_zod.z.string().optional(),
  newPassword: import_zod.z.string().min(8, {
    message: "A senha deve ter no m\xEDnimo 8 caracteres."
  }).regex(/[a-z]/i, { message: "A senha deve ter pelo menos uma letra." }).regex(/[0-9]/, { message: "A senha deve ter pelo menos um n\xFAmero." }).optional()
}).refine(
  (data) => {
    if (!data.newPassword || !data.password) {
      return false;
    }
    return true;
  },
  { message: "Insira a senha para que a mesma possa ser alterada." }
);
var UserEmailVerificationSchema = import_zod.z.object({
  email: import_zod.z.string({ required_error: "O e-mail \xE9 obrigat\xF3rio." }).email({ message: "O e-mail \xE9 inv\xE1lido." }),
  token: import_zod.z.string({ required_error: "O token \xE9 obrigat\xF3rio." }).min(6, { message: "O token deve ter 6 caracteres." }).max(6, { message: "O token deve ter 6 caracteres." })
});

// src/DTOs/Post.ts
var import_zod2 = require("zod");
var PostSchema = import_zod2.z.object({
  title: import_zod2.z.string({ required_error: "O t\xEDtulo \xE9 obrigat\xF3rio." }),
  content: import_zod2.z.string({ required_error: "O conte\xFAdo \xE9 obrigat\xF3rio." }),
  authorId: import_zod2.z.string({ required_error: "O id do autor \xE9 obrigat\xF3rio." }),
  published: import_zod2.z.boolean({
    required_error: "O status de publica\xE7\xE3o \xE9 obrigat\xF3rio.",
    invalid_type_error: "O status de publica\xE7\xE3o deve ser um booleano."
  }).default(false)
});
var PostUpdateSchema = PostSchema.partial().omit({
  authorId: true,
  published: true
});
var PostGetSchema = import_zod2.z.object({
  search: import_zod2.z.string({ invalid_type_error: "O t\xEDtulo deve deve ser um texto." }).optional(),
  page: import_zod2.z.coerce.number({ invalid_type_error: "A p\xE1gina deve deve ser um n\xFAmero." }).int({ message: "A p\xE1gina deve ser um n\xFAmero inteiro." }).min(1, { message: "A p\xE1gina deve ser maior que 0." }).default(1),
  limit: import_zod2.z.coerce.number({ invalid_type_error: "O limite deve deve ser um n\xFAmero." }).int({ message: "O limite deve ser um n\xFAmero inteiro." }).min(1, { message: "O limite deve ser maior que 0." }).default(50),
  isDraft: import_zod2.z.coerce.boolean({
    invalid_type_error: "O status de publica\xE7\xE3o deve ser um booleano."
  }).optional(),
  orderField: import_zod2.z.enum(
    [
      "id",
      "createdAt",
      "updatedAt",
      "title",
      "content",
      "published",
      "authorId"
    ],
    {
      invalid_type_error: "O campo de ordena\xE7\xE3o deve ser 'id', 'createdAt', 'updatedAt', 'title', 'content', 'published' ou 'authorId'."
    }
  ).optional(),
  order: import_zod2.z.enum(["asc", "desc"], {
    invalid_type_error: "A ordena\xE7\xE3o deve ser 'asc' ou 'desc'."
  }).optional()
});

// src/DTOs/Comment.ts
var import_zod3 = require("zod");
var CommentSchema = import_zod3.z.object({
  content: import_zod3.z.string({ required_error: "O conte\xFAdo \xE9 obrigat\xF3rio." }),
  authorId: import_zod3.z.string({ required_error: "O id do autor \xE9 obrigat\xF3rio." }),
  postId: import_zod3.z.string({ required_error: "O id do post \xE9 obrigat\xF3rio." }),
  commentParentId: import_zod3.z.string({
    required_error: "O id do coment\xE1rio pai \xE9 obrigat\xF3rio."
  }).optional()
});
var CommentUpdateSchema = CommentSchema.partial().omit({
  authorId: true,
  postId: true,
  commentParentId: true
});
var CommentGetSchema = import_zod3.z.object({
  search: import_zod3.z.string({ invalid_type_error: "O t\xEDtulo deve deve ser um texto." }).optional(),
  page: import_zod3.z.coerce.number({ invalid_type_error: "A p\xE1gina deve deve ser um n\xFAmero." }).int({ message: "A p\xE1gina deve ser um n\xFAmero inteiro." }).min(1, { message: "A p\xE1gina deve ser maior que 0." }).default(1),
  limit: import_zod3.z.coerce.number({ invalid_type_error: "O limite deve deve ser um n\xFAmero." }).int({ message: "O limite deve ser um n\xFAmero inteiro." }).min(1, { message: "O limite deve ser maior que 0." }).default(50),
  isEdited: import_zod3.z.coerce.boolean({
    invalid_type_error: "O status de edi\xE7\xE3o deve ser um booleano."
  }).optional(),
  orderField: import_zod3.z.enum(
    [
      "content",
      "authorId",
      "postId",
      "commentParentId",
      "edited",
      "id",
      "createdAt"
    ],
    {
      invalid_type_error: "O campo de ordena\xE7\xE3o deve ser 'content', 'authorId', 'postId', 'commentParentId', 'edited', 'id', 'createdAt'."
    }
  ).optional(),
  order: import_zod3.z.enum(["asc", "desc"], {
    invalid_type_error: "A ordena\xE7\xE3o deve ser 'asc' ou 'desc'."
  }).optional()
});

// src/database/client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error", "error"] : []
});
var client_default = prisma;

// src/repositories/userRepository.ts
var UserRepository = class {
  async create(data) {
    const user = await client_default.user.create({
      data
    });
    return user;
  }
  async findByEmail(email) {
    const user = await client_default.user.findUnique({
      where: {
        email
      }
    });
    return user;
  }
  async findById(id) {
    const user = await client_default.user.findUnique({
      where: {
        id
      }
    });
    return user;
  }
  async findAll() {
    const users = await client_default.user.findMany();
    return users;
  }
  async update(id, data) {
    const user = await client_default.user.update({
      where: {
        id
      },
      data
    });
    return user;
  }
  async delete(id) {
    const user = await client_default.user.delete({
      where: {
        id
      }
    });
    return user;
  }
};
var userRepository_default = new UserRepository();

// src/repositories/postRepository.ts
var PostRepository = class {
  async create(data) {
    const post = await client_default.post.create({
      data
    });
    return post;
  }
  async findById(id) {
    const post = await client_default.post.findUnique({
      where: {
        id
      }
    });
    return post;
  }
  async findByUser(userId, page, limit, isDraft, orderField, order) {
    const posts = await client_default.post.findMany({
      where: {
        AND: [
          {
            authorId: userId
          },
          {
            published: isDraft || void 0
          }
        ]
      },
      orderBy: {
        [orderField || "createdAt"]: order || "desc"
      },
      skip: (page - 1) * limit,
      take: limit
    });
    const count = await client_default.post.count({
      where: {
        AND: [
          {
            authorId: userId
          },
          {
            published: isDraft || void 0
          }
        ]
      }
    });
    return { posts, count };
  }
  async findByText(search, page, limit, isDraft, orderField, order) {
    const posts = await client_default.post.findMany({
      where: {
        AND: [
          {
            published: isDraft || void 0
          },
          {
            OR: [
              {
                content: {
                  contains: search,
                  mode: "insensitive"
                }
              },
              {
                title: {
                  contains: search,
                  mode: "insensitive"
                }
              }
            ]
          }
        ]
      },
      orderBy: {
        [orderField || "createdAt"]: order || "desc"
      },
      skip: (page - 1) * limit,
      take: limit
    });
    const count = await client_default.post.count({
      where: {
        AND: [
          {
            published: isDraft || void 0
          },
          {
            OR: [
              {
                content: {
                  contains: search,
                  mode: "insensitive"
                }
              },
              {
                title: {
                  contains: search,
                  mode: "insensitive"
                }
              }
            ]
          }
        ]
      }
    });
    return { posts, count };
  }
  async findAll(page, limit, isDraft, orderField, order) {
    const posts = await client_default.post.findMany({
      where: {
        published: isDraft
      },
      orderBy: {
        [orderField || "createdAt"]: order || "desc"
      },
      skip: (page - 1) * limit,
      take: limit
    });
    const count = await client_default.post.count({
      where: {
        published: isDraft
      }
    });
    return { posts, count };
  }
  async update(id, data) {
    const post = await client_default.post.update({
      where: {
        id
      },
      data
    });
    return post;
  }
  async delete(id) {
    const post = await client_default.post.delete({
      where: {
        id
      }
    });
    return post;
  }
};
var postRepository_default = new PostRepository();

// src/repositories/commentRepository.ts
var CommentRepository = class {
  async create(data) {
    const comment = await client_default.comment.create({
      data
    });
    return comment;
  }
  async findAll(page, limit, isEdited, orderField, order) {
    const comments = await client_default.comment.findMany({
      where: {
        edited: isEdited || void 0
      },
      orderBy: {
        [orderField || "createdAt"]: order || "desc"
      },
      skip: (page - 1) * limit,
      take: limit
    });
    const count = await client_default.comment.count({
      where: {
        edited: isEdited || void 0
      }
    });
    return { comments, count };
  }
  async findByPost(postId, page, limit, isEdited, orderField, order) {
    const comments = await client_default.comment.findMany({
      where: {
        AND: [
          {
            postId
          },
          {
            edited: isEdited || void 0
          }
        ]
      },
      orderBy: {
        [orderField || "createdAt"]: order || "desc"
      },
      skip: (page - 1) * limit,
      take: limit
    });
    const count = await client_default.comment.count({
      where: {
        AND: [
          {
            postId
          },
          {
            edited: isEdited || void 0
          }
        ]
      }
    });
    return { comments, count };
  }
  async findByUser(userId, page, limit, isEdited, orderField, order) {
    const comments = await client_default.comment.findMany({
      where: {
        AND: [
          {
            authorId: userId
          },
          {
            edited: isEdited || void 0
          }
        ]
      },
      orderBy: {
        [orderField || "createdAt"]: order || "desc"
      },
      skip: (page - 1) * limit,
      take: limit
    });
    const count = await client_default.comment.count({
      where: {
        AND: [
          {
            authorId: userId
          },
          {
            edited: isEdited || void 0
          }
        ]
      }
    });
    return { comments, count };
  }
  async findById(id) {
    const comment = await client_default.comment.findUnique({
      where: {
        id
      }
    });
    return comment;
  }
  async findByText(text, page, limit, isEdited, orderField, order) {
    const comments = await client_default.comment.findMany({
      where: {
        AND: [
          {
            content: {
              contains: text,
              mode: "insensitive"
            }
          },
          {
            edited: isEdited
          }
        ]
      },
      orderBy: {
        [orderField || "createdAt"]: order || "desc"
      },
      skip: (page - 1) * limit,
      take: limit
    });
    const count = await client_default.comment.count({
      where: {
        AND: [
          {
            content: {
              contains: text,
              mode: "insensitive"
            }
          },
          {
            edited: isEdited
          }
        ]
      }
    });
    return { comments, count };
  }
  async update(id, data) {
    const comment = await client_default.comment.update({
      where: {
        id
      },
      data
    });
    return comment;
  }
  async delete(id) {
    await client_default.comment.delete({
      where: {
        id
      }
    });
  }
};
var commentRepository_default = new CommentRepository();

// src/controllers/UserController.ts
var UserController = class {
  async create(req, res, next) {
    try {
      const data = UserSchema.parse(req.body);
      if (!data.acceptedTerms) {
        throw (0, import_http_errors.default)(400, "Voc\xEA precisa aceitar os termos.");
      }
      const alreadyExistsUserWithSameEmail = await userRepository_default.findByEmail(
        data.email
      );
      if (alreadyExistsUserWithSameEmail) {
        throw (0, import_http_errors.default)(
          400,
          "J\xE1 existe um usu\xE1rio cadastrado com esse e-mail."
        );
      }
      const hashedPassword = await (0, import_bcryptjs.hash)(data.password, 6);
      const userWithHashedPassword = { ...data, password: hashedPassword };
      const user = await userRepository_default.create(userWithHashedPassword);
      res.status(201).json({
        data: user,
        message: "Usu\xE1rio criado com sucesso."
      });
      return next();
    } catch (error) {
      next(error);
    }
  }
  async read(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userRepository_default.findById(id);
      if (!user) {
        throw (0, import_http_errors.default)(404, "Usu\xE1rio n\xE3o encontrado.");
      }
      res.status(200).json({
        data: user,
        message: "Usu\xE1rio encontrado com sucesso."
      });
      return next();
    } catch (error) {
      next(error);
    }
  }
  async readAll(req, res, next) {
    try {
      const users = await userRepository_default.findAll();
      res.status(200).json({
        data: users,
        message: "Usu\xE1rios encontrados com sucesso."
      });
      return next();
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = UserUpdateSchema.parse(req.body);
      const userExists = await userRepository_default.findById(id);
      if (!userExists) {
        throw (0, import_http_errors.default)(404, "Usu\xE1rio n\xE3o encontrado.");
      }
      if (data.email) {
        const alreadyExistsUserWithSameEmail = await userRepository_default.findByEmail(
          data.email
        );
        if (alreadyExistsUserWithSameEmail) {
          throw (0, import_http_errors.default)(
            400,
            "J\xE1 existe um usu\xE1rio cadastrado com esse e-mail."
          );
        }
      }
      if (data.password) {
        const isSamePassword = await (0, import_bcryptjs.compare)(
          data.password,
          userExists.password
        );
        if (!isSamePassword) {
          throw (0, import_http_errors.default)(400, "A senha atual est\xE1 incorreta.");
        }
      }
      if (data.newPassword === data.password) {
        throw (0, import_http_errors.default)(400, "A senha nova deve ser diferente da atual.");
      }
      const { newPassword: _, ...dataWithoutNewPassword } = data;
      const newPassword = data.newPassword;
      const user = newPassword ? await userRepository_default.update(id, {
        ...dataWithoutNewPassword,
        password: await (0, import_bcryptjs.hash)(newPassword, 6)
      }) : await userRepository_default.update(id, dataWithoutNewPassword);
      res.status(200).json({
        data: user,
        message: "Usu\xE1rio atualizado com sucesso."
      });
      return next();
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const userExists = await userRepository_default.findById(id);
      if (!userExists) {
        throw (0, import_http_errors.default)(404, "Usu\xE1rio n\xE3o encontrado.");
      }
      const user = await userRepository_default.delete(id);
      res.status(200).json({
        data: user,
        message: "Usu\xE1rio deletado com sucesso."
      });
      return next();
    } catch (error) {
      next(error);
    }
  }
  async verifyEmail(req, res, next) {
    try {
      const { email, token } = UserEmailVerificationSchema.parse(req.body);
      const user = await userRepository_default.findByEmail(email);
      if (!user) {
        throw (0, import_http_errors.default)(404, "Usu\xE1rio n\xE3o encontrado.");
      }
      if (user.emailVerified) {
        throw (0, import_http_errors.default)(400, "O e-mail j\xE1 foi verificado.");
      }
      const isTokenValid = user.emailVerifyToken === token;
      if (!isTokenValid) {
        throw (0, import_http_errors.default)(400, "O token \xE9 inv\xE1lido.");
      }
      if (!user.emailVerifyExpiry) {
        throw (0, import_http_errors.default)(
          401,
          "N\xE3o foi solicitada uma verifica\xE7\xE3o de e-mail para este usu\xE1rio."
        );
      }
      const now = /* @__PURE__ */ new Date();
      const isTokenExpired = now > user.emailVerifyExpiry;
      if (isTokenExpired) {
        throw (0, import_http_errors.default)(400, "O token expirou.");
      }
      const updatedUser = await userRepository_default.update(user.id, {
        emailVerified: true,
        emailVerifyToken: null,
        emailVerifyExpiry: null
      });
      res.status(200).json({
        data: updatedUser,
        message: "E-mail verificado com sucesso."
      });
      return next();
    } catch (error) {
      next(error);
    }
  }
};
var UserController_default = new UserController();

// src/controllers/AuthController.ts
var import_http_errors2 = __toESM(require_http_errors());
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_bcryptjs2 = require("bcryptjs");
var AuthController = class {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userRepository_default.findByEmail(email);
      if (!user) {
        throw (0, import_http_errors2.default)(400, "Login e/ou senha incorretos.");
      }
      const isPasswordValid = await (0, import_bcryptjs2.compare)(password, user.password);
      if (!isPasswordValid) {
        throw (0, import_http_errors2.default)(400, "Login e/ou senha incorretos.");
      }
      const accessToken = import_jsonwebtoken.default.sign(
        {
          id: user.id,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d"
        }
      );
      const { password: _, ...loggedUser } = user;
      res.status(200).json({
        data: {
          user: loggedUser,
          accessToken,
          message: "Login realizado com sucesso."
        }
      });
      return next();
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      delete req.headers.authorization;
      res.status(204).json({
        message: "Logout realizado com sucesso."
      });
      return next();
    } catch (error) {
      next(error);
    }
  }
};
var AuthController_default = new AuthController();

// src/controllers/PostController.ts
var import_http_errors3 = __toESM(require_http_errors());
var PostController = class {
  async create(req, res, next) {
    try {
      const data = PostSchema.parse(req.body);
      const post = await postRepository_default.create(data);
      res.status(201).json({
        data: post,
        message: "Post criado com sucesso."
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async readByUser(req, res, next) {
    try {
      const { id } = req.params;
      const { page, limit, isDraft, order, orderField } = PostGetSchema.parse(
        req.query
      );
      const userExists = await postRepository_default.findById(id);
      if (!userExists) {
        throw (0, import_http_errors3.default)(404, "Usu\xE1rio n\xE3o encontrado.");
      }
      const { count, posts } = await postRepository_default.findByUser(
        id,
        page,
        limit,
        isDraft,
        orderField,
        order
      );
      res.status(200).json({
        data: {
          posts,
          count
        },
        message: "Posts encontrados com sucesso."
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async read(req, res, next) {
    try {
      const { id } = req.params;
      const post = await postRepository_default.findById(id);
      if (!post) {
        throw (0, import_http_errors3.default)(404, "Post n\xE3o encontrado.");
      }
      res.status(200).json({
        data: post,
        message: "Post encontrado com sucesso."
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async readAll(req, res, next) {
    try {
      const { search, page, limit, isDraft, order, orderField } = PostGetSchema.parse(req.query);
      const { posts, count } = search ? await postRepository_default.findByText(
        search,
        page,
        limit,
        isDraft,
        orderField,
        order
      ) : await postRepository_default.findAll(page, limit, isDraft, orderField, order);
      res.status(200).json({
        data: {
          posts,
          count
        },
        message: "Posts encontrados com sucesso."
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = PostUpdateSchema.parse(req.body);
      const postExists = await postRepository_default.findById(id);
      if (!postExists) {
        throw (0, import_http_errors3.default)(404, "Post n\xE3o encontrado.");
      }
      const post = await postRepository_default.update(id, data);
      res.status(200).json({
        data: post,
        message: "Post atualizado com sucesso."
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const postExists = await postRepository_default.findById(id);
      if (!postExists) {
        throw (0, import_http_errors3.default)(404, "Post n\xE3o encontrado.");
      }
      const post = await postRepository_default.delete(id);
      res.status(200).json({
        data: post,
        message: "Post deletado com sucesso."
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
};
var PostController_default = new PostController();

// src/controllers/MailController.ts
var import_http_errors4 = __toESM(require_http_errors());
var import_node_crypto = require("crypto");

// node_modules/dotenv/config.js
(function() {
  require_main().config(
    Object.assign(
      {},
      require_env_options(),
      require_cli_options()(process.argv)
    )
  );
})();

// src/utils/mailHandler.ts
var import_nodemailer = __toESM(require("nodemailer"));
var MailServer = async (EmailConfig) => {
  try {
    const transporter = import_nodemailer.default.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    await transporter.sendMail({
      from: `[damattag] <${process.env.EMAIL}>`,
      to: `${EmailConfig.userName} <${EmailConfig.userEmail}>`,
      subject: EmailConfig.subjectText,
      html: EmailConfig.html
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
var mailHandler_default = MailServer;

// src/utils/mailTemplate.ts
function mailTemplate(name, token) {
  const html = `
  <div style="background-color: #f5f5f5; padding: 20px; font-family: Arial, Helvetica, sans-serif; font-size: 16px;">
    <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
      <h1 style="text-align: center; color: #333;">Ol\xE1, ${name}!</h1>
      <p style="text-align: center; color: #333;">Para alterar sua senha, use o token abaixo, ele tem validade de uma hora.</p>
      <p style="text-align: center; color: #333;">Token: ${token}</p>
      <p style="text-align: center; color: #333;">Se voc\xEA n\xE3o solicitou uma altera\xE7\xE3o de senha, ignore este email.</p>
    </div>
  </div>
  `;
  return html;
}

// src/controllers/MailController.ts
var MailController = class {
  async emailVerification(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userRepository_default.findByEmail(email);
      if (!user) {
        throw (0, import_http_errors4.default)(404, "Usu\xE1rio n\xE3o encontrado.");
      }
      const randomUuid = (0, import_node_crypto.randomUUID)();
      const token = randomUuid.slice(0, 6);
      const now = /* @__PURE__ */ new Date();
      const tokenExpiration = new Date(now.setHours(now.getHours() + 1));
      await userRepository_default.update(user.id, {
        emailVerifyToken: token,
        emailVerifyExpiry: tokenExpiration
      });
      const options = {
        userName: user.name,
        subjectText: "Verifica\xE7\xE3o de e-mail",
        html: mailTemplate(user.name, token),
        userEmail: user.email
      };
      const mailResponse = await mailHandler_default(options);
      if (!mailResponse) {
        throw (0, import_http_errors4.default)(503, "Erro ao enviar e-mail.");
      }
      res.status(200).json({
        message: "E-mail enviado com sucesso."
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
};
var MailController_default = new MailController();

// src/controllers/CommentController.ts
var import_http_errors5 = __toESM(require_http_errors());
var CommentController = class {
  async create(req, res, next) {
    try {
      const data = CommentSchema.parse(req.body);
      const comment = await commentRepository_default.create(data);
      res.status(201).json({
        data: comment,
        message: "Coment\xE1rio criado com sucesso."
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async readByPost(req, res, next) {
    try {
      const { id } = req.params;
      const { page, limit, order, orderField, isEdited } = CommentGetSchema.parse(req.query);
      const { count, comments } = await commentRepository_default.findByPost(
        id,
        page,
        limit,
        isEdited,
        orderField,
        order
      );
      const postExists = await postRepository_default.findById(id);
      if (!postExists) {
        throw (0, import_http_errors5.default)(404, "Post n\xE3o encontrado.");
      }
      res.status(200).json({
        data: {
          comments,
          count
        },
        message: "Coment\xE1rios encontrados com sucesso."
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async readByUser(req, res, next) {
    try {
      const { id } = req.params;
      const { page, limit, order, orderField, isEdited } = CommentGetSchema.parse(req.query);
      const userExists = await userRepository_default.findById(id);
      if (!userExists) {
        throw (0, import_http_errors5.default)(404, "Usu\xE1rio n\xE3o encontrado.");
      }
      const { count, comments } = await commentRepository_default.findByUser(
        id,
        page,
        limit,
        isEdited,
        orderField,
        order
      );
      res.status(200).json({
        data: {
          comments,
          count
        },
        message: "Coment\xE1rios encontrados com sucesso."
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async read(req, res, next) {
    try {
      const { id } = req.params;
      const comment = await commentRepository_default.findById(id);
      if (!comment) {
        throw (0, import_http_errors5.default)(404, "Coment\xE1rio n\xE3o encontrado.");
      }
      res.status(200).json({
        data: comment,
        message: "Coment\xE1rio encontrado com sucesso."
      });
      return next();
    } catch (error) {
      next(error);
    }
  }
  async readAll(req, res, next) {
    try {
      const { search, page, limit, order, orderField, isEdited } = CommentGetSchema.parse(req.query);
      const { count, comments } = search ? await commentRepository_default.findByText(
        search,
        page,
        limit,
        isEdited,
        orderField,
        order
      ) : await commentRepository_default.findAll(
        page,
        limit,
        isEdited,
        orderField,
        order
      );
      res.status(200).json({
        data: {
          comments,
          count
        },
        message: "Coment\xE1rios encontrados com sucesso."
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = CommentUpdateSchema.parse(req.body);
      const commentExists = await commentRepository_default.findById(id);
      if (!commentExists) {
        throw (0, import_http_errors5.default)(404, "Coment\xE1rio n\xE3o encontrado.");
      }
      const comment = await commentRepository_default.update(id, {
        ...data,
        edited: true
      });
      res.status(200).json({
        data: comment,
        message: "Coment\xE1rio atualizado com sucesso."
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const commentExists = await commentRepository_default.findById(id);
      if (!commentExists) {
        throw (0, import_http_errors5.default)(404, "Coment\xE1rio n\xE3o encontrado.");
      }
      const comment = await commentRepository_default.delete(id);
      res.status(200).json({
        data: comment,
        message: "Coment\xE1rio deletado com sucesso."
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }
};
var CommentController_default = new CommentController();

// src/middlewares/errorHandler.ts
var import_zod4 = require("zod");
var import_http_errors6 = __toESM(require_http_errors());
var import_jsonwebtoken2 = require("jsonwebtoken");

// src/middlewares/auth.ts
var import_jsonwebtoken3 = __toESM(require("jsonwebtoken"));
var import_http_errors7 = __toESM(require_http_errors());
async function auth(req, res, next) {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) {
      throw (0, import_http_errors7.default)(401, "Token n\xE3o encontrado.");
    }
    const decoded = import_jsonwebtoken3.default.verify(authToken, process.env.JWT_SECRET);
    if (typeof decoded === "string") {
      throw (0, import_http_errors7.default)(401, "Token inv\xE1lido.");
    }
    const { id } = decoded;
    const user = await userRepository_default.findById(id);
    if (!user) {
      throw (0, import_http_errors7.default)(401, "Sem autoriza\xE7\xE3o.");
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

// src/middlewares/emailVerify.ts
var import_jsonwebtoken4 = __toESM(require("jsonwebtoken"));
var import_http_errors8 = __toESM(require_http_errors());

// src/middlewares/adminVerify.ts
var import_http_errors9 = __toESM(require_http_errors());
var import_jsonwebtoken5 = __toESM(require("jsonwebtoken"));

// src/routes/MailRoutes.ts
var MailRouter = (0, import_express.Router)();
MailRouter.route("/email-verification").post(
  [auth],
  MailController_default.emailVerification
);
var MailRoutes_default = MailRouter;
/*! Bundled license information:

depd/index.js:
  (*!
   * depd
   * Copyright(c) 2014-2018 Douglas Christopher Wilson
   * MIT Licensed
   *)

statuses/index.js:
  (*!
   * statuses
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2016 Douglas Christopher Wilson
   * MIT Licensed
   *)

toidentifier/index.js:
  (*!
   * toidentifier
   * Copyright(c) 2016 Douglas Christopher Wilson
   * MIT Licensed
   *)

http-errors/index.js:
  (*!
   * http-errors
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2016 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
