"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _RestClient = _interopRequireDefault(require("./RestClient"));
var _MessagingClient = _interopRequireDefault(require("./MessagingClient"));
var _ScoreClient = _interopRequireDefault(require("./ScoreClient"));
var _PhoneIDClient = _interopRequireDefault(require("./PhoneIDClient"));
var _VoiceClient = _interopRequireDefault(require("./VoiceClient"));
var _AppVerifyClient = _interopRequireDefault(require("./AppVerifyClient"));
var _IntelligenceClient = _interopRequireDefault(require("./IntelligenceClient"));
var _RequestWrapper = require("./RequestWrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var TeleSign = exports["default"] = /*#__PURE__*/_createClass(function TeleSign(customerId, apiKey) {
  var restEndpoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "https://rest-api.telesign.com";
  var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 15000;
  var useragent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var source = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "node_telesign";
  var sdkVersionOrigin = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  var sdkVersionDependency = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
  _classCallCheck(this, TeleSign);
  var requestWrapper = new _RequestWrapper.FetchRequestWrapper();
  this.rest = new _RestClient["default"](requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent, source, sdkVersionOrigin, sdkVersionDependency);
  this.sms = new _MessagingClient["default"](requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
  this.voice = new _VoiceClient["default"](requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
  this.score = new _ScoreClient["default"](requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
  this.phoneid = new _PhoneIDClient["default"](requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
  this.appverify = new _AppVerifyClient["default"](requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
  this.intelligence = new _IntelligenceClient["default"](requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
});
;
module.exports = exports.default;