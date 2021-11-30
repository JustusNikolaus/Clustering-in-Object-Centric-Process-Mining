"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Renderable = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _gWebgpuCore = require("@antv/g-webgpu-core");

var _inversify = require("inversify");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

var Renderable = (_dec = (0, _inversify.injectable)(), _dec2 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.MeshComponentManager), _dec3 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.CullableComponentManager), _dec4 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.TransformComponentManager), _dec5 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.Systems), _dec6 = (0, _inversify.named)(_gWebgpuCore.IDENTIFIER.SceneGraphSystem), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function () {
  function Renderable() {
    (0, _classCallCheck2.default)(this, Renderable);
    this.attributes = {};
    this.config = void 0;
    (0, _initializerDefineProperty2.default)(this, "mesh", _descriptor, this);
    (0, _initializerDefineProperty2.default)(this, "cullable", _descriptor2, this);
    (0, _initializerDefineProperty2.default)(this, "transform", _descriptor3, this);
    (0, _initializerDefineProperty2.default)(this, "sceneGraphSystem", _descriptor4, this);
    this.meshComponent = void 0;
    this.transformComponent = void 0;
    this.entity = void 0;
  }

  (0, _createClass2.default)(Renderable, [{
    key: "getEntity",
    value: function getEntity() {
      return this.entity;
    }
  }, {
    key: "getTransformComponent",
    value: function getTransformComponent() {
      return this.transformComponent;
    }
  }, {
    key: "getMeshComponent",
    value: function getMeshComponent() {
      return this.meshComponent;
    }
  }, {
    key: "setConfig",
    value: function setConfig(config) {
      this.config = config;
    }
  }, {
    key: "setEntity",
    value: function setEntity(entity) {
      this.entity = entity;
      this.cullable.create(entity);
      this.meshComponent = this.mesh.create(entity);
      this.transformComponent = this.transform.create(entity);
      this.onEntityCreated();
    }
  }, {
    key: "setMaterial",
    value: function setMaterial(material) {
      this.meshComponent.material = material;
      return this;
    }
  }, {
    key: "setGeometry",
    value: function setGeometry(geometry) {
      this.meshComponent.geometry = geometry;
      return this;
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(attributes) {
      var _this = this;

      Object.keys(attributes).forEach(function (name) {
        if (attributes[name] !== undefined && attributes[name] !== _this.attributes[name]) {
          _this.onAttributeChanged({
            name: name,
            data: attributes[name]
          });

          _this.attributes[name] = attributes[name];
        }
      });
    }
  }, {
    key: "setVisible",
    value: function setVisible(visible) {
      var _this2 = this;

      this.meshComponent.visible = visible;
      this.meshComponent.children.forEach(function (childEntity) {
        var child = _this2.mesh.getComponentByEntity(childEntity);

        if (child) {
          child.visible = visible;
        }
      });
      return this;
    }
  }, {
    key: "isVisible",
    value: function isVisible() {
      return this.meshComponent.visible;
    }
  }, {
    key: "attach",
    value: function attach(parentRenderable) {
      this.sceneGraphSystem.attach(this.entity, parentRenderable.entity);
      return this;
    }
  }, {
    key: "detach",
    value: function detach() {
      this.sceneGraphSystem.detach(this.entity);
      return this;
    }
  }, {
    key: "detachChildren",
    value: function detachChildren() {
      this.sceneGraphSystem.detachChildren(this.entity);
      return this;
    }
  }, {
    key: "onEntityCreated",
    value: function onEntityCreated() {//
    }
  }, {
    key: "onAttributeChanged",
    value: function onAttributeChanged(_ref) {
      var name = _ref.name,
          data = _ref.data;

      if (this.meshComponent && this.meshComponent.material) {
        this.meshComponent.material.setUniform(this.convertAttributeName2UniformName(name), data);
      }
    }
  }, {
    key: "convertAttributeName2UniformName",
    value: function convertAttributeName2UniformName(attributeName) {
      return attributeName;
    }
  }]);
  return Renderable;
}(), _class3.POINT = 'point', _class3.LINE = 'line', _class3.GRID = 'grid', _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "mesh", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "cullable", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "transform", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "sceneGraphSystem", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Renderable = Renderable;
//# sourceMappingURL=Renderable.js.map