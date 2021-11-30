import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _class, _class2, _descriptor, _class3, _temp;

import { IDENTIFIER } from '@antv/g-webgpu-core';
import { inject, injectable } from 'inversify';
export var Material = (_dec = injectable(), _dec2 = inject(IDENTIFIER.MaterialComponentManager), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function () {
  function Material() {
    _classCallCheck(this, Material);

    this.config = void 0;

    _initializerDefineProperty(this, "material", _descriptor, this);

    this.entity = void 0;
    this.component = void 0;
  }

  _createClass(Material, [{
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
}(), _class3.BASIC = 'basic', _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
//# sourceMappingURL=index.js.map