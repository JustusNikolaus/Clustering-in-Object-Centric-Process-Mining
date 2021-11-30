"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeometrySystem = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _inversify = require("inversify");

var _2 = require("../..");

var _identifier = require("../../identifier");

var _gl = require("../renderer/gl");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

var GeometrySystem = (_dec = (0, _inversify.injectable)(), _dec2 = (0, _inversify.inject)(_identifier.IDENTIFIER.GeometryComponentManager), _dec3 = (0, _inversify.inject)(_identifier.IDENTIFIER.RenderEngine), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function GeometrySystem() {
    (0, _classCallCheck2.default)(this, GeometrySystem);
    (0, _initializerDefineProperty2.default)(this, "geometry", _descriptor, this);
    (0, _initializerDefineProperty2.default)(this, "engine", _descriptor2, this);
  }

  (0, _createClass2.default)(GeometrySystem, [{
    key: "execute",
    value: function () {
      var _execute = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _this = this;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.geometry.forEach(function (entity, component) {
                  // build buffers for each geometry
                  if (component.dirty) {
                    component.attributes.forEach(function (attribute) {
                      if (attribute.dirty && attribute.data) {
                        if (!attribute.buffer) {
                          attribute.buffer = _this.engine.createBuffer({
                            data: attribute.data,
                            type: _gl.gl.FLOAT
                          });
                        } else {
                          var _attribute$buffer;

                          (_attribute$buffer = attribute.buffer) === null || _attribute$buffer === void 0 ? void 0 : _attribute$buffer.subData({
                            data: attribute.data,
                            // TODO: support offset in subdata
                            offset: 0
                          });
                        }

                        attribute.dirty = false;
                      }
                    }); // create index buffer if needed

                    if (component.indices) {
                      if (!component.indicesBuffer) {
                        component.indicesBuffer = _this.engine.createElements({
                          data: component.indices,
                          count: component.indices.length,
                          type: _gl.gl.UNSIGNED_INT,
                          usage: _gl.gl.STATIC_DRAW
                        });
                      } else {
                        component.indicesBuffer.subData({
                          data: component.indices,
                          offset: 0
                        });
                      }
                    }

                    component.dirty = false;
                  }
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function execute() {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }, {
    key: "tearDown",
    value: function tearDown() {
      this.geometry.forEach(function (_, geometry) {
        if (geometry.indicesBuffer) {
          geometry.indicesBuffer.destroy();
        }

        geometry.attributes.forEach(function (attribute) {
          if (attribute.buffer) {
            attribute.buffer.destroy();
          }
        });
      });
      this.geometry.clear();
    }
    /**
     * @see https://threejs.org/docs/#api/en/core/BufferGeometry
     */

  }, {
    key: "createBufferGeometry",
    value: function createBufferGeometry() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        vertexCount: 3
      },
          vertexCount = _ref.vertexCount;

      var entity = (0, _2.createEntity)();
      return this.geometry.create(entity, {
        vertexCount: vertexCount
      });
    }
    /**
     * @see https://threejs.org/docs/#api/en/core/InstancedBufferGeometry
     */

  }, {
    key: "createInstancedBufferGeometry",
    value: function createInstancedBufferGeometry(_ref2) {
      var maxInstancedCount = _ref2.maxInstancedCount,
          vertexCount = _ref2.vertexCount;
      var entity = (0, _2.createEntity)();
      return this.geometry.create(entity, {
        maxInstancedCount: maxInstancedCount,
        vertexCount: vertexCount
      });
    }
  }]);
  return GeometrySystem;
}(), _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "geometry", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "engine", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.GeometrySystem = GeometrySystem;
//# sourceMappingURL=System.js.map