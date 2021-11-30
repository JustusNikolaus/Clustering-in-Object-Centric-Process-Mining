"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Material = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _gWebgpuCore = require("@antv/g-webgpu-core");

var _inversify = require("inversify");

var _dec, _dec2, _class, _class2, _descriptor, _class3, _temp;

var Material = (_dec = (0, _inversify.injectable)(), _dec2 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.MaterialComponentManager), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function () {
  function Material() {
    (0, _classCallCheck2.default)(this, Material);
    this.config = void 0;
    (0, _initializerDefineProperty2.default)(this, "material", _descriptor, this);
    this.entity = void 0;
    this.component = void 0;
  }

  (0, _createClass2.default)(Material, [{
    key: "getEntity",
    value: function getEntity() {
      return this.entity;
    }
  }, {
    key: "getComponent",
    value: function getComponent() {
      return this.component;
    }
  }, {
    key: "setConfig",
    value: function setConfig(config) {
      this.config = config;
    }
  }, {
    key: "setEntity",
    value: function setEntity(entity, type) {
      this.entity = entity;
      this.component = this.material.create(entity);
      this.component.entity = entity;
      this.component.type = type;
      this.onEntityCreated();
    }
  }, {
    key: "onEntityCreated",
    value: function onEntityCreated() {//
    }
  }]);
  return Material;
}(), _class3.BASIC = 'basic', _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "material", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Material = Material;
//# sourceMappingURL=index.js.map