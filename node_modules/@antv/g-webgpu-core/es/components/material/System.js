import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { inject, injectable } from 'inversify';
import { createEntity } from '../..';
import { IDENTIFIER } from '../../identifier';
export var MaterialSystem = (_dec = injectable(), _dec2 = inject(IDENTIFIER.MaterialComponentManager), _dec3 = inject(IDENTIFIER.RenderEngine), _dec4 = inject(IDENTIFIER.ShaderModuleService), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function MaterialSystem() {
    _classCallCheck(this, MaterialSystem);

    _initializerDefineProperty(this, "material", _descriptor, this);

    _initializerDefineProperty(this, "engine", _descriptor2, this);

    _initializerDefineProperty(this, "shaderModule", _descriptor3, this);
  }

  _createClass(MaterialSystem, [{
    key: "execute",
    value: function () {
      var _execute = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function execute() {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }, {
    key: "tearDown",
    value: function tearDown() {
      this.material.clear();
    }
    /**
     * @see https://threejs.org/docs/#api/en/materials/ShaderMaterial
     */

  }, {
    key: "createShaderMaterial",
    value: function createShaderMaterial(params) {
      var entity = createEntity();
      var vertexShaderGLSL = params.vertexShader;
      var fragmentShaderGLSL = params.fragmentShader;
      var uniforms = [];

      if (!this.engine.supportWebGPU) {
        var moduleName = "material-".concat(entity);
        this.shaderModule.registerModule(moduleName, {
          vs: params.vertexShader,
          fs: params.fragmentShader
        });
        var materialModule = this.shaderModule.getModule(moduleName);
        vertexShaderGLSL = materialModule.vs;
        fragmentShaderGLSL = materialModule.fs;

        if (materialModule.uniforms) {
          // @ts-ignore
          uniforms = Object.keys(materialModule.uniforms).map(function (uniformName) {
            return {
              dirty: true,
              name: uniformName,
              // @ts-ignore
              data: materialModule.uniforms[uniformName]
            };
          });
        }
      }

      return this.material.create(entity, _objectSpread(_objectSpread({
        vertexShaderGLSL: vertexShaderGLSL,
        fragmentShaderGLSL: fragmentShaderGLSL
      }, params), {}, {
        uniforms: uniforms
      }));
    }
  }]);

  return MaterialSystem;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "engine", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "shaderModule", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
//# sourceMappingURL=System.js.map