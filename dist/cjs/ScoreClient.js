"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _RestClient2 = _interopRequireDefault(require("./RestClient"));
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
/***
 * Score provides risk information about a specified phone number.
 */
var ScoreClient = exports["default"] = /*#__PURE__*/function (_RestClient) {
  function ScoreClient(requestWrapper, customerId, apiKey) {
    var _this;
    var restEndpoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var timeout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 15000;
    var userAgent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    _classCallCheck(this, ScoreClient);
    _this = _callSuper(this, ScoreClient, [requestWrapper, customerId, apiKey, restEndpoint, timeout, userAgent]);
    _this.scoreResource = "/v1/score/";
    return _this;
  }

  /***
   * Score is an API that delivers reputation scoring based on phone number intelligence,
   * traffic patterns, machine learning, and a global data consortium.
   *
   * See https://developer.telesign.com/docs/score-api for detailed API documentation.
   *
   * @param callback: Callback method to handle response.
   * @param phoneNumber: Phone number for which to check score
   * @param accountLifecycleEvent: Indicate what phase of the lifecycle you are in when you
   * send a transaction.
   * @param originatingIP: (Optional) End user's IP address.
   * @param deviceId: (Optional) End user’s device identifier.
   * @param accountId: (Optional) End user’s account id
   * @param emailAddress: (Optional) End user’s email address
   * @param requestRiskInsights: (Optional) Boolean value of true, false or null for reason codes
   *                              ONLY SET IF Score 2.0 requests is enabled, confirm with your Telesign representative
   */
  _inherits(ScoreClient, _RestClient);
  return _createClass(ScoreClient, [{
    key: "score",
    value: function score(callback, phoneNumber, accountLifecycleEvent) {
      var originatingIP = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var deviceId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var accountId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
      var emailAddress = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
      var requestRiskInsights = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
      var params = {
        account_lifecycle_event: accountLifecycleEvent
      };
      if (originatingIP != null) {
        params.originating_ip = originatingIP;
      }
      if (deviceId != null) {
        params.device_id = deviceId;
      }
      if (accountId != null) {
        params.account_id = accountId;
      }
      if (emailAddress != null) {
        params.email_address = emailAddress;
      }
      if (requestRiskInsights != null) {
        params.request_risk_insights = requestRiskInsights;
      }
      this.execute(callback, "POST", this.scoreResource + encodeURI(phoneNumber), params);
    }
  }]);
}(_RestClient2["default"]);
module.exports = exports.default;