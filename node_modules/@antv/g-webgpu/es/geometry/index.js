import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _class, _class2, _descriptor, _class3, _temp;

import { IDENTIFIER } from '@antv/g-webgpu-core';
import { inject, injectable } from 'inversify';
export var Geometry = (_dec = injectable(), _dec2 = inject(IDENTIFIER.GeometryComponentManager), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function () {
  function Geometry() {
    _classCallCheck(this, Geometry);

    this.config = void 0;

    _initializerDefineProperty(this, "geometry", _descriptor, this);

    this.entity = void 0;
    this.component = void 0;
  }

  _createClass(Geometry, [{
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
    value: function setEntity(entity) {
      this.entity = entity;
      this.component = this.geometry.create(entity);
      this.component.entity = entity;
      this.onEntityCreated();
    }
  }, {
    key: "onEntityCreated",
    value: function onEntityCreated() {//
    }
  }]);

  return Geometry;
}(), _class3.BOX = 'box', _class3.SPHERE = 'sphere', _class3.PLANE = 'plane', _class3.MERGED = 'merged', _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "geometry", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
//# sourceMappingURL=index.js.map