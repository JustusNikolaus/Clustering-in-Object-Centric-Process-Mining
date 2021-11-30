"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourcePool = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _inversify = require("inversify");

var _identifier = require("../../identifier");

var _gl = require("../renderer/gl");

var _dec, _dec2, _class, _class2, _descriptor, _temp;

var ResourcePool = (_dec = (0, _inversify.injectable)(), _dec2 = (0, _inversify.inject)(_identifier.IDENTIFIER.RenderEngine), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function ResourcePool() {
    (0, _classCallCheck2.default)(this, ResourcePool);
    (0, _initializerDefineProperty2.default)(this, "engine", _descriptor, this);
    this.resourcePool = {};
  }

  (0, _createClass2.default)(ResourcePool, [{
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
            wrapS: _gl.gl.CLAMP_TO_EDGE,
            wrapT: _gl.gl.CLAMP_TO_EDGE,
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
}(), _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "engine", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.ResourcePool = ResourcePool;
//# sourceMappingURL=ResourcePool.js.map