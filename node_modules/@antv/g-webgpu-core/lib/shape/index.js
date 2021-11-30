"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AABB = require("./AABB");

Object.keys(_AABB).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AABB[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AABB[key];
    }
  });
});

var _BoundingSphere = require("./BoundingSphere");

Object.keys(_BoundingSphere).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BoundingSphere[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BoundingSphere[key];
    }
  });
});

var _Frustum = require("./Frustum");

Object.keys(_Frustum).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Frustum[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Frustum[key];
    }
  });
});

var _Plane = require("./Plane");

Object.keys(_Plane).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Plane[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Plane[key];
    }
  });
});

var _Ray = require("./Ray");

Object.keys(_Ray).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Ray[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Ray[key];
    }
  });
});
//# sourceMappingURL=index.js.map