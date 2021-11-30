"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaterialSystem = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _inversify = require("inversify");

var _ = require("../..");

var _identifier = require("../../identifier");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var MaterialSystem = (_dec = (0, _inversify.injectable)(), _dec2 = (0, _inversify.inject)(_identifier.IDENTIFIER.MaterialComponentManager), _dec3 = (0, _inversify.inject)(_identifier.IDENTIFIER.RenderEngine), _dec4 = (0, _inversify.inject)(_identifier.IDENTIFIER.ShaderModuleService), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function MaterialSystem() {
    (0, _classCallCheck2.default)(this, MaterialSystem);
    (0, _initializerDefineProperty2.default)(this, "material", _descriptor, this);
    (0, _initializerDefineProperty2.default)(this, "engine", _descriptor2, this);
    (0, _initializerDefineProperty2.default)(this, "shaderModule", _descriptor3, this);
  }

  (0, _createClass2.default)(MaterialSystem, [{
    key: "execute",
    value: function () {
      var _execute = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
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
      var entity = (0, _.createEntity)();
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
}(), _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "material", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "engine", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "shaderModule", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.MaterialSystem = MaterialSystem;
//# sourceMappingURL=System.js.map