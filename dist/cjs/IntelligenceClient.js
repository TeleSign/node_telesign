"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _RestClient2 = _interopRequireDefault(require("./RestClient"));
var _Constants = require("./Constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var INTELLIGENCE_ENDPOINT_PATH = "/intelligence";
var contentType = "application/json";

/***
 * It is critical today to evaluate fraud risk throughout the entire customer journey.
 *
 * Telesign Intelligence makes it easy to understand the risk and the reason behind it with tailored scoring models
 *and comprehensive reason codes.
 */
var IntelligenceClient = exports["default"] = /*#__PURE__*/function (_RestClient) {
  function IntelligenceClient(requestWrapper, customerId, apiKey) {
    var _this;
    var restEndpoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var timeout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 15000;
    var userAgent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    _classCallCheck(this, IntelligenceClient);
    _this = _callSuper(this, IntelligenceClient, [requestWrapper, customerId, apiKey, restEndpoint, timeout, userAgent, contentType]);
    _this.intelligenceResource = INTELLIGENCE_ENDPOINT_PATH;
    return _this;
  }

  /***
   * Telesign Intelligence is like a credit check for digital profiles.
   *
   * You submit a phone number, IP, and email to the service, the individual
   *identifiers are each evaluated, and then a score is returned telling you how risky
   *that user is.
   *
   * You decide whether to proceed based on the score.
   *
   * See https://developer.telesign.com/enterprise/docs/intelligence-overview
   *for detailed API documentation.
   *
   * @param callback: Callback method to handle response.
   * @param requestBody: requestBody to be passed to Intelligence API
   */
  _inherits(IntelligenceClient, _RestClient);
  return _createClass(IntelligenceClient, [{
    key: "intelligence",
    value: function intelligence(callback, requestBody) {
      this.execute(callback, "POST", this.intelligenceResource, requestBody, _Constants.AuthMethodNames.BASIC);
    }
  }]);
}(_RestClient2["default"]);
module.exports = exports.default;