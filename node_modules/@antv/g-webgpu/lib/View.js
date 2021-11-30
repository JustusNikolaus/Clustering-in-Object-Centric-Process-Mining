"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _gWebgpuCore = require("@antv/g-webgpu-core");

var _inversify = require("inversify");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

var View = (_dec = (0, _inversify.injectable)(), _dec2 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.Systems), _dec3 = (0, _inversify.named)(_gWebgpuCore.IDENTIFIER.RendererSystem), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function View() {
    (0, _classCallCheck2.default)(this, View);
    (0, _initializerDefineProperty2.default)(this, "rendererSystem", _descriptor, this);
    this.camera = void 0;
    this.scene = void 0;
    this.viewport = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.clearColor = [1, 1, 1, 1];
  }

  (0, _createClass2.default)(View, [{
    key: "getCamera",
    value: function getCamera() {
      return this.camera;
    }
  }, {
    key: "getScene",
    value: function getScene() {
      return this.scene;
    }
  }, {
    key: "getViewport",
    value: function getViewport() {
      return this.viewport;
    }
  }, {
    key: "getClearColor",
    value: function getClearColor() {
      return this.clearColor;
    }
  }, {
    key: "setCamera",
    value: function setCamera(camera) {
      this.camera = camera;
      return this;
    }
  }, {
    key: "setScene",
    value: function setScene(scene) {
      this.scene = scene;
      return this;
    }
  }, {
    key: "setViewport",
    value: function setViewport(viewport) {
      this.viewport = viewport;
      return this;
    }
  }, {
    key: "setClearColor",
    value: function setClearColor(clearColor) {
      this.clearColor = clearColor;
      return this;
    }
  }, {
    key: "pick",
    value: function pick(position) {
      return this.rendererSystem.pick(position, this);
    }
  }]);
  return View;
}(), _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "rendererSystem", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.View = View;
//# sourceMappingURL=View.js.map