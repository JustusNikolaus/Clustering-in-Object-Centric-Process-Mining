import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

var _dec, _class, _temp;

import { injectable } from 'inversify';
export var Scene = (_dec = injectable(), _dec(_class = (_temp = /*#__PURE__*/function () {
  function Scene() {
    _classCallCheck(this, Scene);

    this.entities = [];
  }

  _createClass(Scene, [{
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
//# sourceMappingURL=Scene.js.map