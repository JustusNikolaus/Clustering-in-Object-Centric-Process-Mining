"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  AST_TOKEN_TYPES: true,
  AST_NODE_TYPES: true,
  STORAGE_CLASS: true,
  Target: true,
  DefineValuePlaceholder: true,
  Component: true,
  ComponentManager: true,
  FrameGraphSystem: true,
  GeometryComponent: true,
  GeometrySystem: true,
  MaterialComponent: true,
  MaterialSystem: true,
  CullableComponent: true,
  MeshComponent: true,
  MeshSystem: true,
  PixelPickingPass: true,
  RendererSystem: true,
  HierarchyComponent: true,
  SceneGraphSystem: true,
  TransformComponent: true,
  createEntity: true,
  IDENTIFIER: true,
  container: true,
  createWorldContainer: true,
  lazyInject: true,
  lazyMultiInject: true,
  generateAABBFromVertices: true,
  isSafari: true
};
Object.defineProperty(exports, "Component", {
  enumerable: true,
  get: function get() {
    return _ComponentManager.Component;
  }
});
Object.defineProperty(exports, "ComponentManager", {
  enumerable: true,
  get: function get() {
    return _ComponentManager.ComponentManager;
  }
});
Object.defineProperty(exports, "FrameGraphSystem", {
  enumerable: true,
  get: function get() {
    return _System.FrameGraphSystem;
  }
});
Object.defineProperty(exports, "GeometryComponent", {
  enumerable: true,
  get: function get() {
    return _GeometryComponent.GeometryComponent;
  }
});
Object.defineProperty(exports, "GeometrySystem", {
  enumerable: true,
  get: function get() {
    return _System2.GeometrySystem;
  }
});
Object.defineProperty(exports, "MaterialComponent", {
  enumerable: true,
  get: function get() {
    return _MaterialComponent.MaterialComponent;
  }
});
Object.defineProperty(exports, "MaterialSystem", {
  enumerable: true,
  get: function get() {
    return _System3.MaterialSystem;
  }
});
Object.defineProperty(exports, "CullableComponent", {
  enumerable: true,
  get: function get() {
    return _CullableComponent.CullableComponent;
  }
});
Object.defineProperty(exports, "MeshComponent", {
  enumerable: true,
  get: function get() {
    return _MeshComponent.MeshComponent;
  }
});
Object.defineProperty(exports, "MeshSystem", {
  enumerable: true,
  get: function get() {
    return _System4.MeshSystem;
  }
});
Object.defineProperty(exports, "PixelPickingPass", {
  enumerable: true,
  get: function get() {
    return _PixelPickingPass.PixelPickingPass;
  }
});
Object.defineProperty(exports, "RendererSystem", {
  enumerable: true,
  get: function get() {
    return _System5.RendererSystem;
  }
});
Object.defineProperty(exports, "HierarchyComponent", {
  enumerable: true,
  get: function get() {
    return _HierarchyComponent.HierarchyComponent;
  }
});
Object.defineProperty(exports, "SceneGraphSystem", {
  enumerable: true,
  get: function get() {
    return _System6.SceneGraphSystem;
  }
});
Object.defineProperty(exports, "TransformComponent", {
  enumerable: true,
  get: function get() {
    return _TransformComponent.TransformComponent;
  }
});
Object.defineProperty(exports, "createEntity", {
  enumerable: true,
  get: function get() {
    return _Entity.createEntity;
  }
});
Object.defineProperty(exports, "IDENTIFIER", {
  enumerable: true,
  get: function get() {
    return _identifier.IDENTIFIER;
  }
});
Object.defineProperty(exports, "container", {
  enumerable: true,
  get: function get() {
    return _inversify.container;
  }
});
Object.defineProperty(exports, "createWorldContainer", {
  enumerable: true,
  get: function get() {
    return _inversify.createWorldContainer;
  }
});
Object.defineProperty(exports, "lazyInject", {
  enumerable: true,
  get: function get() {
    return _inversify.lazyInject;
  }
});
Object.defineProperty(exports, "lazyMultiInject", {
  enumerable: true,
  get: function get() {
    return _inversify.lazyMultiInject;
  }
});
Object.defineProperty(exports, "generateAABBFromVertices", {
  enumerable: true,
  get: function get() {
    return _aabb.generateAABBFromVertices;
  }
});
Object.defineProperty(exports, "isSafari", {
  enumerable: true,
  get: function get() {
    return _isSafari.isSafari;
  }
});
exports.DefineValuePlaceholder = exports.Target = exports.STORAGE_CLASS = exports.AST_NODE_TYPES = exports.AST_TOKEN_TYPES = void 0;

require("reflect-metadata");

var _ComponentManager = require("./ComponentManager");

Object.keys(_ComponentManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ComponentManager[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ComponentManager[key];
    }
  });
});

var _System = require("./components/framegraph/System");

var _GeometryComponent = require("./components/geometry/GeometryComponent");

var _System2 = require("./components/geometry/System");

var _MaterialComponent = require("./components/material/MaterialComponent");

var _System3 = require("./components/material/System");

var _CullableComponent = require("./components/mesh/CullableComponent");

var _MeshComponent = require("./components/mesh/MeshComponent");

var _System4 = require("./components/mesh/System");

var _PixelPickingPass = require("./components/renderer/passes/PixelPickingPass");

var _System5 = require("./components/renderer/System");

var _HierarchyComponent = require("./components/scenegraph/HierarchyComponent");

var _System6 = require("./components/scenegraph/System");

var _TransformComponent = require("./components/scenegraph/TransformComponent");

var _Entity = require("./Entity");

var _identifier = require("./identifier");

var _inversify = require("./inversify.config");

var _aabb = require("./utils/aabb");

var _isSafari = require("./utils/isSafari");

var _services = require("./services");

Object.keys(_services).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _services[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _services[key];
    }
  });
});

var _shape = require("./shape");

Object.keys(_shape).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _shape[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _shape[key];
    }
  });
});

var _renderer = require("./components/renderer");

Object.keys(_renderer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _renderer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _renderer[key];
    }
  });
});

var _interface = require("./components/material/interface");

Object.keys(_interface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _interface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _interface[key];
    }
  });
});

var _interface2 = require("./components/mesh/interface");

Object.keys(_interface2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _interface2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _interface2[key];
    }
  });
});
// tslint:disable-next-line:no-reference
/// <reference path="../../../node_modules/@webgpu/types/dist/index.d.ts" />
var AST_TOKEN_TYPES;
exports.AST_TOKEN_TYPES = AST_TOKEN_TYPES;

(function (AST_TOKEN_TYPES) {
  AST_TOKEN_TYPES["Void"] = "Void";
  AST_TOKEN_TYPES["Boolean"] = "Boolean";
  AST_TOKEN_TYPES["Float"] = "Float";
  AST_TOKEN_TYPES["Uint32"] = "Uint32";
  AST_TOKEN_TYPES["Int32"] = "Int32";
  AST_TOKEN_TYPES["Vector"] = "Vector";
  AST_TOKEN_TYPES["Vector2Float"] = "vec2<f32>";
  AST_TOKEN_TYPES["Vector3Float"] = "vec3<f32>";
  AST_TOKEN_TYPES["Vector4Float"] = "vec4<f32>";
  AST_TOKEN_TYPES["Vector2Boolean"] = "vec2<bool>";
  AST_TOKEN_TYPES["Vector3Boolean"] = "vec3<bool>";
  AST_TOKEN_TYPES["Vector4Boolean"] = "vec4<bool>";
  AST_TOKEN_TYPES["Vector2Uint"] = "vec2<u32>";
  AST_TOKEN_TYPES["Vector3Uint"] = "vec3<u32>";
  AST_TOKEN_TYPES["Vector4Uint"] = "vec4<u32>";
  AST_TOKEN_TYPES["Vector2Int"] = "vec2<i32>";
  AST_TOKEN_TYPES["Vector3Int"] = "vec3<i32>";
  AST_TOKEN_TYPES["Vector4Int"] = "vec4<i32>";
  AST_TOKEN_TYPES["Matrix"] = "Matrix";
  AST_TOKEN_TYPES["Matrix3x3Float"] = "mat3x3<f32>";
  AST_TOKEN_TYPES["Matrix4x4Float"] = "mat4x4<i32>";
  AST_TOKEN_TYPES["Struct"] = "Struct";
  AST_TOKEN_TYPES["FloatArray"] = "Float[]";
  AST_TOKEN_TYPES["Vector4FloatArray"] = "vec4<f32>[]";
})(AST_TOKEN_TYPES || (exports.AST_TOKEN_TYPES = AST_TOKEN_TYPES = {}));

var AST_NODE_TYPES;
exports.AST_NODE_TYPES = AST_NODE_TYPES;

(function (AST_NODE_TYPES) {
  AST_NODE_TYPES["Program"] = "Program";
  AST_NODE_TYPES["Identifier"] = "Identifier";
  AST_NODE_TYPES["VariableDeclaration"] = "VariableDeclaration";
  AST_NODE_TYPES["BlockStatement"] = "BlockStatement";
  AST_NODE_TYPES["ReturnStatement"] = "ReturnStatement";
  AST_NODE_TYPES["FunctionDeclaration"] = "FunctionDeclaration";
  AST_NODE_TYPES["VariableDeclarator"] = "VariableDeclarator";
  AST_NODE_TYPES["AssignmentExpression"] = "AssignmentExpression";
  AST_NODE_TYPES["LogicalExpression"] = "LogicalExpression";
  AST_NODE_TYPES["BinaryExpression"] = "BinaryExpression";
  AST_NODE_TYPES["ArrayExpression"] = "ArrayExpression";
  AST_NODE_TYPES["UnaryExpression"] = "UnaryExpression";
  AST_NODE_TYPES["UpdateExpression"] = "UpdateExpression";
  AST_NODE_TYPES["FunctionExpression"] = "FunctionExpression";
  AST_NODE_TYPES["MemberExpression"] = "MemberExpression";
  AST_NODE_TYPES["ConditionalExpression"] = "ConditionalExpression";
  AST_NODE_TYPES["ExpressionStatement"] = "ExpressionStatement";
  AST_NODE_TYPES["CallExpression"] = "CallExpression";
  AST_NODE_TYPES["NumThreadStatement"] = "NumThreadStatement";
  AST_NODE_TYPES["StorageStatement"] = "StorageStatement";
  AST_NODE_TYPES["DoWhileStatement"] = "DoWhileStatement";
  AST_NODE_TYPES["WhileStatement"] = "WhileStatement";
  AST_NODE_TYPES["ForStatement"] = "ForStatement";
  AST_NODE_TYPES["BreakStatement"] = "BreakStatement";
  AST_NODE_TYPES["ContinueStatement"] = "ContinueStatement";
  AST_NODE_TYPES["IfStatement"] = "IfStatement";
  AST_NODE_TYPES["ImportedFunctionStatement"] = "ImportedFunctionStatement";
})(AST_NODE_TYPES || (exports.AST_NODE_TYPES = AST_NODE_TYPES = {}));

var STORAGE_CLASS;
exports.STORAGE_CLASS = STORAGE_CLASS;

(function (STORAGE_CLASS) {
  STORAGE_CLASS["Input"] = "Input";
  STORAGE_CLASS["Output"] = "Output";
  STORAGE_CLASS["Uniform"] = "Uniform";
  STORAGE_CLASS["Workgroup"] = "Workgroup";
  STORAGE_CLASS["UniformConstant"] = "UniformConstant";
  STORAGE_CLASS["Image"] = "Image";
  STORAGE_CLASS["StorageBuffer"] = "StorageBuffer";
  STORAGE_CLASS["Private"] = "Private";
  STORAGE_CLASS["Function"] = "Function";
})(STORAGE_CLASS || (exports.STORAGE_CLASS = STORAGE_CLASS = {}));

/**
 * 根据目标平台生成 Shader 代码
 * * WebGL GLSL 1.0
 * * WebGPU Chrome/Edge GLSL 4.5 & WGSL @see https://gpuweb.github.io/gpuweb/wgsl.html
 * * Safari WHLSL (maybe deprecated)
 */
var Target;
exports.Target = Target;

(function (Target) {
  Target["GLSL100"] = "GLSL100";
  Target["GLSL450"] = "GLSL450";
  Target["WGSL"] = "WGSL";
})(Target || (exports.Target = Target = {}));

var DefineValuePlaceholder = '__DefineValuePlaceholder__';
exports.DefineValuePlaceholder = DefineValuePlaceholder;
//# sourceMappingURL=index.js.map