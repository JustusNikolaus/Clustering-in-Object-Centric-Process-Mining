import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { mat3, vec3 } from 'gl-matrix';
import { inject, injectable } from 'inversify';
import { IDENTIFIER } from '../../identifier';
import { Mask } from '../../shape/Frustum';
import { getRotationScale } from '../../utils/math';
export var MeshSystem = (_dec = injectable(), _dec2 = inject(IDENTIFIER.MeshComponentManager), _dec3 = inject(IDENTIFIER.CullableComponentManager), _dec4 = inject(IDENTIFIER.GeometryComponentManager), _dec5 = inject(IDENTIFIER.HierarchyComponentManager), _dec6 = inject(IDENTIFIER.TransformComponentManager), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function MeshSystem() {
    _classCallCheck(this, MeshSystem);

    _initializerDefineProperty(this, "mesh", _descriptor, this);

    _initializerDefineProperty(this, "cullable", _descriptor2, this);

    _initializerDefineProperty(this, "geometry", _descriptor3, this);

    _initializerDefineProperty(this, "hierarchy", _descriptor4, this);

    _initializerDefineProperty(this, "transform", _descriptor5, this);

    this.planes = void 0;
  }

  _createClass(MeshSystem, [{
    key: "setFrustumPlanes",
    value: function setFrustumPlanes(planes) {
      this.planes = planes;
    }
  }, {
    key: "execute",
    value: function () {
      var _execute = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(views) {
        var _iterator, _step, view, scene, camera, _iterator2, _step2, entity, component, hierarchyComponent, cullableComponent, geometryComponent, meshTransform, worldTransform, _geometryComponent$aa, center, halfExtents, transformedCenter, rotationScale, transformedHalfExtents, parentCullableComponent;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iterator = _createForOfIteratorHelper(views);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    view = _step.value;
                    scene = view.getScene();
                    camera = view.getCamera(); // get VP matrix from camera

                    _iterator2 = _createForOfIteratorHelper(scene.getEntities());

                    try {
                      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        entity = _step2.value;
                        component = this.mesh.getComponentByEntity(entity);

                        if (component) {
                          hierarchyComponent = this.hierarchy.getComponentByEntity(entity);
                          cullableComponent = this.cullable.getComponentByEntity(entity);
                          geometryComponent = component.geometry;
                          meshTransform = this.transform.getComponentByEntity(entity); // update mesh.aabb

                          if (geometryComponent && geometryComponent.aabb && meshTransform && component.aabbDirty) {
                            worldTransform = meshTransform.worldTransform; // apply transform to geometry.aabb

                            _geometryComponent$aa = geometryComponent.aabb, center = _geometryComponent$aa.center, halfExtents = _geometryComponent$aa.halfExtents;
                            transformedCenter = vec3.transformMat4(vec3.create(), center, worldTransform);
                            rotationScale = getRotationScale(worldTransform, mat3.create());
                            transformedHalfExtents = vec3.transformMat3(vec3.create(), halfExtents, rotationScale);
                            component.aabb.update(transformedCenter, transformedHalfExtents);
                            component.aabbDirty = false;
                          } // culling


                          if (cullableComponent && geometryComponent) {
                            parentCullableComponent = this.cullable.getComponentByEntity((hierarchyComponent === null || hierarchyComponent === void 0 ? void 0 : hierarchyComponent.parentID) || -1);
                            cullableComponent.visibilityPlaneMask = this.computeVisibilityWithPlaneMask(component.aabb, (parentCullableComponent === null || parentCullableComponent === void 0 ? void 0 : parentCullableComponent.visibilityPlaneMask) || Mask.INDETERMINATE, this.planes || camera.getFrustum().planes);
                            cullableComponent.visible = cullableComponent.visibilityPlaneMask !== Mask.OUTSIDE;
                          }
                        }
                      }
                    } catch (err) {
                      _iterator2.e(err);
                    } finally {
                      _iterator2.f();
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function execute(_x) {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }, {
    key: "tearDown",
    value: function tearDown() {
      this.cullable.clear();
      this.mesh.clear();
    }
    /**
     *
     * @see「Optimized View Frustum Culling Algorithms for Bounding Boxes」
     * @see https://github.com/antvis/GWebGPUEngine/issues/3
     *
     * * 基础相交测试 the basic intersection test
     * * 标记 masking @see https://cesium.com/blog/2015/08/04/fast-hierarchical-culling/
     * * TODO: 平面一致性测试 the plane-coherency test
     * * TODO: 支持 mesh 指定自身的剔除策略，参考 Babylon.js @see https://doc.babylonjs.com/how_to/optimizing_your_scene#changing-mesh-culling-strategy
     *
     * @param aabb aabb
     * @param parentPlaneMask mask of parent
     * @param planes planes of frustum
     */

  }, {
    key: "computeVisibilityWithPlaneMask",
    value: function computeVisibilityWithPlaneMask(aabb, parentPlaneMask, planes) {
      if (parentPlaneMask === Mask.OUTSIDE || parentPlaneMask === Mask.INSIDE) {
        // 父节点完全位于视锥内或者外部，直接返回
        return parentPlaneMask;
      } // Start with MASK_INSIDE (all zeros) so that after the loop, the return value can be compared with MASK_INSIDE.
      // (Because if there are fewer than 31 planes, the upper bits wont be changed.)


      var mask = Mask.INSIDE;

      for (var k = 0, len = planes.length; k < len; ++k) {
        // For k greater than 31 (since 31 is the maximum number of INSIDE/INTERSECTING bits we can store), skip the optimization.
        var flag = k < 31 ? 1 << k : 0;

        if (k < 31 && (parentPlaneMask & flag) === 0) {
          // 父节点处于当前面内部，可以跳过
          continue;
        } // 使用 p-vertex 和 n-vertex 加速，避免进行平面和 aabb 全部顶点的相交检测


        var _planes$k = planes[k],
            normal = _planes$k.normal,
            distance = _planes$k.distance;

        if (vec3.dot(normal, aabb.getNegativeFarPoint(planes[k])) + distance > 0) {
          return Mask.OUTSIDE;
        }

        if (vec3.dot(normal, aabb.getPositiveFarPoint(planes[k])) + distance > 0) {
          // 和当前面相交，对应位置为1，继续检测下一个面
          mask |= flag;
        }
      }

      return mask;
    }
  }]);

  return MeshSystem;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mesh", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "cullable", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "geometry", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "hierarchy", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "transform", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
//# sourceMappingURL=System.js.map