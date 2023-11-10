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
      return function isHttpError(val) {
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

// src/middlewares/auth.ts
var auth_exports = {};
__export(auth_exports, {
  default: () => auth
});
module.exports = __toCommonJS(auth_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_http_errors = __toESM(require_http_errors());

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

// src/middlewares/auth.ts
async function auth(req, res, next) {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) {
      throw (0, import_http_errors.default)(401, "Token n\xE3o encontrado.");
    }
    const decoded = import_jsonwebtoken.default.verify(authToken, process.env.JWT_SECRET);
    if (typeof decoded === "string") {
      throw (0, import_http_errors.default)(401, "Token inv\xE1lido.");
    }
    const { id } = decoded;
    const user = await userRepository_default.findById(id);
    if (!user) {
      throw (0, import_http_errors.default)(401, "Sem autoriza\xE7\xE3o.");
    }
    return next();
  } catch (error) {
    return next(error);
  }
}
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
