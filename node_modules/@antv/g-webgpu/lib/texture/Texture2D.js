"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Texture2D = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _gWebgpuCore = require("@antv/g-webgpu-core");

var _inversify = require("inversify");

var _Cache = require("./Cache");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Texture2D = (_dec = (0, _inversify.injectable)(), _dec2 = (0, _inversify.inject)(_Cache.TextureCache), _dec3 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.RenderEngine), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function Texture2D() {
    (0, _classCallCheck2.default)(this, Texture2D);
    (0, _initializerDefineProperty2.default)(this, "textureCache", _descriptor, this);
    (0, _initializerDefineProperty2.default)(this, "engine", _descriptor2, this);
    this.config = void 0;
    this.loaded = false;
    this.texture = void 0;
  }

  (0, _createClass2.default)(Texture2D, [{
    key: "setConfig",
    value: function setConfig(config) {
      this.config = config;
    }
  }, {
    key: "isLoaded",
    value: function isLoaded() {
      return this.loaded;
    } // public update(config: ITexture2DInitializationOptions) {
    //   if (this.loaded && this.texture) {
    //     const t = this.texture.get();
    //   }
    // }

  }, {
    key: "load",
    value: function () {
      var _load = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _this = this;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.config.url) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  var existed = _this.textureCache.get(_this.config.url);

                  if (existed) {
                    resolve(existed);
                  } else {
                    var image = new Image();
                    image.crossOrigin = 'Anonymous';
                    image.src = _this.config.url;

                    image.onload = function () {
                      var texture = _this.engine.createTexture2D(_objectSpread(_objectSpread({}, _this.config), {}, {
                        data: image,
                        width: image.width,
                        height: image.height,
                        flipY: true
                      }));

                      _this.textureCache.set(_this.config.url, texture);

                      _this.texture = texture;
                      _this.loaded = true;
                      resolve(texture);
                    };

                    image.onerror = function () {
                      reject();
                    };
                  }
                }));

              case 4:
                this.loaded = true;
                this.texture = this.engine.createTexture2D(this.config);
                return _context.abrupt("return", this.texture);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load() {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }]);
  return Texture2D;
}(), _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "textureCache", [_dec2], {
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
exports.Texture2D = Texture2D;
//# sourceMappingURL=Texture2D.js.map