import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

var _dec, _class;

import { injectable } from 'inversify';
export var IInteractorEvent;

(function (IInteractorEvent) {
  IInteractorEvent["PANSTART"] = "PANSTART";
  IInteractorEvent["PANEND"] = "PANEND";
  IInteractorEvent["PANMOVE"] = "PANMOVE";
  IInteractorEvent["PINCH"] = "PINCH";
  IInteractorEvent["KEYDOWN"] = "KEYDOWN";
  IInteractorEvent["KEYUP"] = "KEYUP";
  IInteractorEvent["HOVER"] = "HOVER";
})(IInteractorEvent || (IInteractorEvent = {}));

export var InteractorService = (_dec = injectable(), _dec(_class = /*#__PURE__*/function () {
  function InteractorService() {
    _classCallCheck(this, InteractorService);
  }

  _createClass(InteractorService, [{
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
//# sourceMappingURL=IteractorService.js.map