"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInstalledVersion = getInstalledVersion;
var _package = _interopRequireDefault(require("../../package.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function getInstalledVersion() {
  return _package["default"].version;
}