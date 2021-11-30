"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneGraphSystem = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _glMatrix = require("gl-matrix");

var _inversify = require("inversify");

var _identifier = require("../../identifier");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

var SceneGraphSystem = (_dec = (0, _inversify.injectable)(), _dec2 = (0, _inversify.inject)(_identifier.IDENTIFIER.HierarchyComponentManager), _dec3 = (0, _inversify.inject)(_identifier.IDENTIFIER.TransformComponentManager), _dec4 = (0, _inversify.inject)(_identifier.IDENTIFIER.MeshComponentManager), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function SceneGraphSystem() {
    (0, _classCallCheck2.default)(this, SceneGraphSystem);
    (0, _initializerDefineProperty2.default)(this, "hierarchy", _descriptor, this);
    (0, _initializerDefineProperty2.default)(this, "transform", _descriptor2, this);
    (0, _initializerDefineProperty2.default)(this, "mesh", _descriptor3, this);
  }

  (0, _createClass2.default)(SceneGraphSystem, [{
    key: "execute",
    value: function () {
      var _execute = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.runTransformUpdateSystem();
                this.runHierarchyUpdateSystem();

              case 2:
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
      this.hierarchy.clear();
      this.transform.clear();
    }
  }, {
    key: "getHierarchyComponentManager",
    value: function getHierarchyComponentManager() {
      return this.hierarchy;
    }
  }, {
    key: "getTransformComponentManager",
    value: function getTransformComponentManager() {
      return this.transform;
    }
  }, {
    key: "runTransformUpdateSystem",
    value: function runTransformUpdateSystem() {
      var _this = this;

      // 原版基于 JobSystem 实现
      this.transform.forEach(function (entity, transform) {
        if (transform.isDirty() || transform.isLocalDirty()) {
          _this.setMeshAABBDirty(_this.mesh.getComponentByEntity(entity));

          transform.updateTransform();
        }
      });
    }
  }, {
    key: "runHierarchyUpdateSystem",
    value: function runHierarchyUpdateSystem() {
      var _this2 = this;

      this.hierarchy.forEach(function (entity, parentComponent) {
        var transformChild = _this2.transform.getComponentByEntity(entity);

        var transformParent = _this2.transform.getComponentByEntity(parentComponent.parentID);

        if (transformChild !== null && transformParent !== null) {
          transformChild.updateTransformWithParent(transformParent);
        }
      });
    }
  }, {
    key: "attach",
    value: function attach(entity, parent, isChildAlreadyInLocalSpace) {
      if (this.hierarchy.contains(entity)) {
        this.detach(entity);
      }

      this.hierarchy.create(entity, {
        parentID: parent
      });
      var mesh = this.mesh.getComponentByEntity(parent); // inform parent mesh to update its aabb

      this.setMeshAABBDirty(mesh);

      if (mesh && mesh.children.indexOf(entity) === -1) {
        mesh.children.push(entity);
      }

      if (this.hierarchy.getCount() > 1) {
        for (var i = this.hierarchy.getCount() - 1; i > 0; --i) {
          var parentCandidateEntity = this.hierarchy.getEntity(i); // const parentCandidateComponent = this.hierarchy.getComponent(i);

          for (var j = 0; j < i; ++j) {
            var childCandidateEntity = this.hierarchy.getComponent(j);

            if (childCandidateEntity.parentID === parentCandidateEntity) {
              this.hierarchy.moveItem(i, j);
              ++i; // next outer iteration will check the same index again as parent candidate, however things were moved upwards, so it will be a different entity!

              break;
            }
          }
        }
      } // Re-query parent after potential MoveItem(), because it invalidates references:


      var parentcomponent = this.hierarchy.getComponentByEntity(entity);
      var transformParent = this.transform.getComponentByEntity(parent);

      if (transformParent === null) {
        transformParent = this.transform.create(parent);
      }

      var transformChild = this.transform.getComponentByEntity(entity);

      if (transformChild === null) {
        transformChild = this.transform.create(entity); // after transforms.Create(), transform_parent pointer could have become invalidated!

        transformParent = this.transform.getComponentByEntity(parent);
      }

      transformChild.parent = transformParent;

      if (!isChildAlreadyInLocalSpace && transformParent) {
        transformChild.matrixTransform(_glMatrix.mat4.invert(_glMatrix.mat4.create(), transformParent.worldTransform));
        transformChild.updateTransform();
      }

      if (transformParent) {
        transformChild.updateTransformWithParent(transformParent);
      }
    }
  }, {
    key: "detach",
    value: function detach(entity) {
      var self = this.hierarchy.getComponentByEntity(entity);

      if (self !== null) {
        var transform = this.transform.getComponentByEntity(entity);

        if (transform !== null) {
          transform.parent = null;
          transform.applyTransform();
        }

        this.hierarchy.removeKeepSorted(entity); // inform parent mesh to update its aabb

        var mesh = this.mesh.getComponentByEntity(self.parentID);

        if (mesh) {
          var index = mesh.children.indexOf(entity);
          mesh.children.splice(index, 1);
        }

        this.setMeshAABBDirty(mesh);
      }
    }
  }, {
    key: "detachChildren",
    value: function detachChildren(parent) {
      var mesh = this.mesh.getComponentByEntity(parent);

      if (mesh) {
        mesh.children = [];
      }

      for (var i = 0; i < this.hierarchy.getCount();) {
        var _this$hierarchy$getCo;

        if (((_this$hierarchy$getCo = this.hierarchy.getComponent(i)) === null || _this$hierarchy$getCo === void 0 ? void 0 : _this$hierarchy$getCo.parentID) === parent) {
          var entity = this.hierarchy.getEntity(i);
          this.detach(entity);
        } else {
          ++i;
        }
      }
    }
  }, {
    key: "setMeshAABBDirty",
    value: function setMeshAABBDirty(mesh) {
      if (mesh) {
        mesh.aabbDirty = true;
      }
    }
  }]);
  return SceneGraphSystem;
}(), _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "hierarchy", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "transform", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "mesh", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.SceneGraphSystem = SceneGraphSystem;
//# sourceMappingURL=System.js.map