import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _class, _class2, _descriptor, _temp;

import { inject, injectable } from 'inversify';
import { IDENTIFIER } from '../../identifier';
import { gl } from '../renderer/gl';
export var ResourcePool = (_dec = injectable(), _dec2 = inject(IDENTIFIER.RenderEngine), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function ResourcePool() {
    _classCallCheck(this, ResourcePool);

    _initializerDefineProperty(this, "engine", _descriptor, this);

    this.resourcePool = {};
  }

  _createClass(ResourcePool, [{
    key: "getOrCreateResource",

    /**
     * 负责实例化虚拟资源，通过引擎服务
     * @param resource 虚拟资源
     */
    value: function getOrCreateResource(resource) {
      if (!this.resourcePool[resource.name]) {
        var _resource$descriptor = resource.descriptor,
            width = _resource$descriptor.width,
            height = _resource$descriptor.height,
            usage = _resource$descriptor.usage;
        this.resourcePool[resource.name] = this.engine.createFramebuffer({
          color: this.engine.createTexture2D({
            width: width,
            height: height,
            wrapS: gl.CLAMP_TO_EDGE,
            wrapT: gl.CLAMP_TO_EDGE,
            usage: usage
          })
        });
      }

      return this.resourcePool[resource.name];
    }
  }, {
    key: "clean",
    value: function clean() {
      this.resourcePool = {};
    }
  }]);

  return ResourcePool;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "engine", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
//# sourceMappingURL=ResourcePool.js.map