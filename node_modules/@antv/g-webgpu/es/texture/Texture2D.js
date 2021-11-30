import _regeneratorRuntime from "@babel/runtime/regenerator";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { IDENTIFIER } from '@antv/g-webgpu-core';
import { inject, injectable } from 'inversify';
import { TextureCache } from './Cache';
export var Texture2D = (_dec = injectable(), _dec2 = inject(TextureCache), _dec3 = inject(IDENTIFIER.RenderEngine), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function Texture2D() {
    _classCallCheck(this, Texture2D);

    _initializerDefineProperty(this, "textureCache", _descriptor, this);

    _initializerDefineProperty(this, "engine", _descriptor2, this);

    this.config = void 0;
    this.loaded = false;
    this.texture = void 0;
  }

  _createClass(Texture2D, [{
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
      var _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var _this = this;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
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
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "textureCache", [_dec2], {
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
//# sourceMappingURL=Texture2D.js.map