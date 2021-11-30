"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scene = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inversify = require("inversify");

var _dec, _class, _temp;

var Scene = (_dec = (0, _inversify.injectable)(), _dec(_class = (_temp = /*#__PURE__*/function () {
  function Scene() {
    (0, _classCallCheck2.default)(this, Scene);
    this.entities = [];
  }

  (0, _createClass2.default)(Scene, [{
    key: "getEntities",
    value: function getEntities() {
      return this.entities;
    }
  }, {
    key: "addRenderable",
    value: function addRenderable(renderable) {
      this.addEntity(renderable.getEntity());
      return this;
    }
  }, {
    key: "removeRenderable",
    value: function removeRenderable(renderable) {
      this.removeEntity(renderable.getEntity());
      return this;
    }
  }, {
    key: "addLight",
    value: function addLight() {}
  }, {
    key: "addEntity",
    value: function addEntity(entity) {
      if (this.entities.indexOf(entity) === -1) {
        this.entities.push(entity);
      }

      return this;
    }
  }, {
    key: "removeEntity",
    value: function removeEntity(entity) {
      var index = this.entities.indexOf(entity);
      this.entities.splice(index, 1);
      return this;
    }
  }]);
  return Scene;
}(), _temp)) || _class);
exports.Scene = Scene;
//# sourceMappingURL=Scene.js.map