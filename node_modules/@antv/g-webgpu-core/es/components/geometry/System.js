import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

import { inject, injectable } from 'inversify';
import { createEntity } from '../..';
import { IDENTIFIER } from '../../identifier';
import { gl } from '../renderer/gl';
export var GeometrySystem = (_dec = injectable(), _dec2 = inject(IDENTIFIER.GeometryComponentManager), _dec3 = inject(IDENTIFIER.RenderEngine), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function GeometrySystem() {
    _classCallCheck(this, GeometrySystem);

    _initializerDefineProperty(this, "geometry", _descriptor, this);

    _initializerDefineProperty(this, "engine", _descriptor2, this);
  }

  _createClass(GeometrySystem, [{
    key: "execute",
    value: function () {
      var _execute = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var _this = this;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
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
                            type: gl.FLOAT
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
                          type: gl.UNSIGNED_INT,
                          usage: gl.STATIC_DRAW
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

      var entity = createEntity();
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
      var entity = createEntity();
      return this.geometry.create(entity, {
        maxInstancedCount: maxInstancedCount,
        vertexCount: vertexCount
      });
    }
  }]);

  return GeometrySystem;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "geometry", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "engine", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
//# sourceMappingURL=System.js.map