"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractorService = exports.IInteractorEvent = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inversify = require("inversify");

var _dec, _class;

var IInteractorEvent;
exports.IInteractorEvent = IInteractorEvent;

(function (IInteractorEvent) {
  IInteractorEvent["PANSTART"] = "PANSTART";
  IInteractorEvent["PANEND"] = "PANEND";
  IInteractorEvent["PANMOVE"] = "PANMOVE";
  IInteractorEvent["PINCH"] = "PINCH";
  IInteractorEvent["KEYDOWN"] = "KEYDOWN";
  IInteractorEvent["KEYUP"] = "KEYUP";
  IInteractorEvent["HOVER"] = "HOVER";
})(IInteractorEvent || (exports.IInteractorEvent = IInteractorEvent = {}));

var InteractorService = (_dec = (0, _inversify.injectable)(), _dec(_class = /*#__PURE__*/function () {
  function InteractorService() {
    (0, _classCallCheck2.default)(this, InteractorService);
  }

  (0, _createClass2.default)(InteractorService, [{
    key: "listen",
    value: function listen(canvas) {}
  }, {
    key: "on",
    value: function on(event, args) {}
  }, {
    key: "connect",
    value: function connect() {}
  }, {
    key: "disconnect",
    value: function disconnect() {}
  }, {
    key: "destroy",
    value: function destroy() {}
  }]);
  return InteractorService;
}()) || _class);
exports.InteractorService = InteractorService;
//# sourceMappingURL=IteractorService.js.map