import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

import { IDENTIFIER } from '@antv/g-webgpu-core';
import { inject, injectable, named } from 'inversify';
export var View = (_dec = injectable(), _dec2 = inject(IDENTIFIER.Systems), _dec3 = named(IDENTIFIER.RendererSystem), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function View() {
    _classCallCheck(this, View);

    _initializerDefineProperty(this, "rendererSystem", _descriptor, this);

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

  _createClass(View, [{
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
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rendererSystem", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
//# sourceMappingURL=View.js.map