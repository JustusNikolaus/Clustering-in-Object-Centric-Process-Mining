import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _class, _class2, _descriptor, _temp;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { inject, injectable } from 'inversify';
import { IDENTIFIER } from '../../identifier';
import { FrameGraphHandle } from './FrameGraphHandle';
import { FrameGraphPass } from './FrameGraphPass';
import { PassNode } from './PassNode';
import { ResourceEntry } from './ResourceEntry';
import { ResourceNode } from './ResourceNode';
/**
 * ported from FrameGraph implemented by SakuraRender
 * @see https://zhuanlan.zhihu.com/p/98572442
 * @see https://github.com/SaeruHikari/Sakura/blob/RenderGraph/SakuraCore/Source/Framework/GraphicTypes/FrameGraph/SakuraFrameGraph.cpp
 */

export var FrameGraphSystem = (_dec = injectable(), _dec2 = inject(IDENTIFIER.RenderEngine), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function FrameGraphSystem() {
    _classCallCheck(this, FrameGraphSystem);

    this.passNodes = [];
    this.resourceNodes = [];
    this.frameGraphPasses = [];

    _initializerDefineProperty(this, "engine", _descriptor, this);
  }

  _createClass(FrameGraphSystem, [{
    key: "execute",
    value: function () {
      var _execute = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(views) {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // this.engine.beginFrame();
                this.compile();
                _context.next = 3;
                return this.executePassNodes(views);

              case 3:
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
      this.frameGraphPasses.forEach(function (pass) {
        if (pass.tearDown) {
          pass.tearDown();
        }
      });
      this.reset();
    }
  }, {
    key: "addPass",
    value: function addPass(name, setup, execute, tearDown) {
      var frameGraphPass = new FrameGraphPass();
      frameGraphPass.execute = execute;

      if (tearDown) {
        frameGraphPass.tearDown = tearDown;
      }

      frameGraphPass.name = name;
      var passNode = new PassNode();
      passNode.name = name;
      this.passNodes.push(passNode);
      this.frameGraphPasses.push(frameGraphPass);
      setup(this, passNode, frameGraphPass);
      return frameGraphPass;
    }
  }, {
    key: "getPass",
    value: function getPass(name) {
      return this.frameGraphPasses.find(function (p) {
        return p.name === name;
      });
    }
  }, {
    key: "compile",
    value: function compile() {
      var _this = this;

      var _iterator = _createForOfIteratorHelper(this.passNodes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _pass = _step.value;
          _pass.refCount = _pass.writes.length + (_pass.hasSideEffect ? 1 : 0);

          _pass.reads.forEach(function (handle) {
            _this.resourceNodes[handle.index].readerCount++;
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var stack = [];

      var _iterator2 = _createForOfIteratorHelper(this.resourceNodes),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var node = _step2.value;

          if (node.readerCount === 0) {
            stack.push(node);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      while (stack.length) {
        var pNode = stack.pop();
        var writer = pNode && pNode.writer;

        if (writer) {
          if (--writer.refCount === 0) {
            // this pass is culled
            // assert(!writer->hasSideEffect);
            var _iterator3 = _createForOfIteratorHelper(writer.reads),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var resource = _step3.value;
                var r = this.resourceNodes[resource.index];

                if (--r.readerCount === 0) {
                  stack.push(r);
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
        }
      } // update the final reference counts


      this.resourceNodes.forEach(function (node) {
        node.resource.refs += node.readerCount;
      });

      var _iterator4 = _createForOfIteratorHelper(this.passNodes),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _pass2 = _step4.value;

          if (!_pass2.refCount) {
            continue;
          }

          var _iterator6 = _createForOfIteratorHelper(_pass2.reads),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var _resource2 = _step6.value;
              var pResource = this.resourceNodes[_resource2.index].resource;
              pResource.first = pResource.first ? pResource.first : _pass2;
              pResource.last = _pass2;
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }

          var _iterator7 = _createForOfIteratorHelper(_pass2.writes),
              _step7;

          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var _resource3 = _step7.value;
              var _pResource = this.resourceNodes[_resource3.index].resource;
              _pResource.first = _pResource.first ? _pResource.first : _pass2;
              _pResource.last = _pass2;
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      for (var priority = 0; priority < 2; priority++) {
        var _iterator5 = _createForOfIteratorHelper(this.resourceNodes),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var resoureNode = _step5.value;
            var _resource = resoureNode.resource;

            if (_resource.priority === priority && _resource.refs) {
              var pFirst = _resource.first;
              var pLast = _resource.last;

              if (pFirst && pLast) {
                pFirst.devirtualize.push(_resource);
                pLast.destroy.push(_resource);
              }
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
    }
  }, {
    key: "executePassNodes",
    value: function () {
      var _executePassNodes = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(views) {
        var _iterator8, _step8, _step8$value, index, node, _iterator9, _step9, resource, _iterator10, _step10, _resource4, _iterator11, _step11, _resource5, _iterator12, _step12, _resource6;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _iterator8 = _createForOfIteratorHelper(this.passNodes.entries());
                _context2.prev = 1;

                _iterator8.s();

              case 3:
                if ((_step8 = _iterator8.n()).done) {
                  _context2.next = 18;
                  break;
                }

                _step8$value = _slicedToArray(_step8.value, 2), index = _step8$value[0], node = _step8$value[1];

                if (!node.refCount) {
                  _context2.next = 16;
                  break;
                }

                _iterator9 = _createForOfIteratorHelper(node.devirtualize);

                try {
                  for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                    resource = _step9.value;
                    resource.preExecuteDevirtualize(this.engine);
                  }
                } catch (err) {
                  _iterator9.e(err);
                } finally {
                  _iterator9.f();
                }

                _iterator10 = _createForOfIteratorHelper(node.destroy);

                try {
                  for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                    _resource4 = _step10.value;

                    _resource4.preExecuteDestroy(this.engine);
                  }
                } catch (err) {
                  _iterator10.e(err);
                } finally {
                  _iterator10.f();
                }

                _context2.next = 12;
                return this.frameGraphPasses[index].execute(this, this.frameGraphPasses[index], views);

              case 12:
                _iterator11 = _createForOfIteratorHelper(node.devirtualize);

                try {
                  for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                    _resource5 = _step11.value;

                    _resource5.postExecuteDevirtualize(this.engine);
                  }
                } catch (err) {
                  _iterator11.e(err);
                } finally {
                  _iterator11.f();
                }

                _iterator12 = _createForOfIteratorHelper(node.destroy);

                try {
                  for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                    _resource6 = _step12.value;

                    _resource6.postExecuteDestroy(this.engine);
                  }
                } catch (err) {
                  _iterator12.e(err);
                } finally {
                  _iterator12.f();
                }

              case 16:
                _context2.next = 3;
                break;

              case 18:
                _context2.next = 23;
                break;

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2["catch"](1);

                _iterator8.e(_context2.t0);

              case 23:
                _context2.prev = 23;

                _iterator8.f();

                return _context2.finish(23);

              case 26:
                this.reset();

              case 27:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 20, 23, 26]]);
      }));

      function executePassNodes(_x2) {
        return _executePassNodes.apply(this, arguments);
      }

      return executePassNodes;
    }()
  }, {
    key: "reset",
    value: function reset() {
      this.passNodes = [];
      this.resourceNodes = [];
      this.frameGraphPasses = [];
    }
  }, {
    key: "getResourceNode",
    value: function getResourceNode(r) {
      return this.resourceNodes[r.index];
    }
  }, {
    key: "createResourceNode",
    value: function createResourceNode(resourceEntry) {
      var resourceNode = new ResourceNode();
      resourceNode.resource = resourceEntry;
      resourceNode.version = resourceEntry.version;
      this.resourceNodes.push(resourceNode);
      var fgh = new FrameGraphHandle();
      fgh.index = this.resourceNodes.length - 1;
      return fgh;
    }
  }, {
    key: "createTexture",
    value: function createTexture(passNode, name, descriptor) {
      var resource = new ResourceEntry();
      resource.name = name;
      resource.descriptor = descriptor;
      return this.createResourceNode(resource);
    }
  }, {
    key: "createRenderTarget",
    value: function createRenderTarget(passNode, name, descriptor) {
      var resource = new ResourceEntry();
      resource.name = name;
      resource.descriptor = descriptor;
      return this.createResourceNode(resource);
    }
  }, {
    key: "present",
    value: function present(input) {
      this.addPass('Present', function (fg, passNode) {
        passNode.read(input);
        passNode.hasSideEffect = true;
      }, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      })));
    }
  }]);

  return FrameGraphSystem;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "engine", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
//# sourceMappingURL=System.js.map