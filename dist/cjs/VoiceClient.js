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
 * TeleSign's Voice API allows you to easily send voice messages. You can send alerts,
 * reminders, and notifications, or you can send verification messages containing time-based,
 * one-time passcodes (TOTP).
 */
var VoiceClient = exports["default"] = /*#__PURE__*/function (_RestClient) {
  function VoiceClient(requestWrapper, customerId, apiKey) {
    var _this;
    var restEndpoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var timeout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 15000;
    var useragent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    _classCallCheck(this, VoiceClient);
    _this = _callSuper(this, VoiceClient, [requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent]);
    _this.voice_resource = "/v1/voice";
    _this.voice_status_resource = "/v1/voice/";
    return _this;
  }

  /***
   * Send a voice callto the target phoneNumber.
   *
   * See https://developer.telesign.com/docs/voice-api for detailed API documentation.
   *
   * @param callback: Callback method to handle response.
   * @param phoneNumber: Phone number to call
   * @param message: Text of the message to be converted to voice on call to the end
   * user. [max 2000 code points]
   * @param messageType: This parameter specifies the traffic type being sent in the message.
   * @param voice: The voice parameter allows you to specify a voice to be used to speak your
   * text to speech message.
   * @param callbackURL: (Optional) URL of the callback server you would like to receive updates
   * on.
   * @param accountLifecycleEvent: (Optional) Indicates the phase in lifecycle for the
   * transaction.
   * @param originatingIP: (Optional) End user's IP address.
   */
  _inherits(VoiceClient, _RestClient);
  return _createClass(VoiceClient, [{
    key: "call",
    value: function call(callback, phoneNumber, message, messageType) {
      var voice = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var callbackURL = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
      var accountLifecycleEvent = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
      var originatingIP = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
      var params = {
        phone_number: phoneNumber,
        message: message,
        message_type: messageType
      };
      if (voice != null) {
        params.voice = voice;
      }
      if (callbackURL != null) {
        params.callbackURL = callbackURL;
      }
      if (accountLifecycleEvent != null) {
        params.account_lifecycle_event = accountLifecycleEvent;
      }
      if (originatingIP != null) {
        params.originating_ip = originatingIP;
      }
      this.execute(callback, "POST", this.voice_resource, params);
    }

    /***
     * Get status of voice call transaction.
     *
     * @param callback: Callback method to handle the response.
     * @param referenceId: Reference ID received in the response of call.
     */
  }, {
    key: "status",
    value: function status(callback, referenceId) {
      var status_resource = this.voice_status_resource + referenceId;
      this.execute(callback, "GET", status_resource);
    }
  }]);
}(_RestClient2["default"]);
module.exports = exports.default;