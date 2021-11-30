// @ts-ignore
import { copy, create, dot } from 'gl-vec2'; // @ts-ignore

import { computeMiter, direction, normal } from 'polyline-miter-util';

function extrusions(positions, out, point, normal, scale) {
  addNext(out, normal, -scale);
  addNext(out, normal, scale);
  positions.push(point);
  positions.push(point);
}

function addNext(out, normal, length) {
  out.push([[normal[0], normal[1]], length]);
}

export default function (points, closed, indexOffset) {
  var lineA = [0, 0];
  var lineB = [0, 0];
  var tangent = [0, 0];
  var miter = [0, 0];

  var _lastFlip = -1;

  var _started = false;
  var _normal = null;
  var tmp = create();
  var count = indexOffset || 0;
  var miterLimit = 3;
  var out = [];
  var attrPos = [];
  var attrIndex = [];
  var attrCounters = [0, 0];

  if (closed) {
    points = points.slice();
    points.push(points[0]);
  }

  var total = points.length;

  for (var i = 1; i < total; i++) {
    var index = count;
    var last = points[i - 1];
    var cur = points[i];
    var next = i < points.length - 1 ? points[i + 1] : null;
    attrCounters.push(i / total, i / total);
    direction(lineA, cur, last);

    if (!_normal) {
      _normal = [0, 0];
      normal(_normal, lineA);
    }

    if (!_started) {
      _started = true;
      extrusions(attrPos, out, last, _normal, 1);
    }

    attrIndex.push([index + 0, index + 1, index + 2]);

    if (!next) {
      // no miter, simple segment
      normal(_normal, lineA); // reset normal

      extrusions(attrPos, out, cur, _normal, 1);
      attrIndex.push(_lastFlip === 1 ? [index, index + 2, index + 3] : [index + 2, index + 1, index + 3]);
      count += 2;
    } else {
      // miter with last
      // get unit dir of next line
      direction(lineB, next, cur); // stores tangent & miter

      var miterLen = computeMiter(tangent, miter, lineA, lineB, 1); // get orientation

      var flip = dot(tangent, _normal) < 0 ? -1 : 1;
      var bevel = miterLen > miterLimit; // 处理相邻线段重叠的情况

      if (!isFinite(miterLen)) {
        normal(_normal, lineA); // reset normal

        extrusions(attrPos, out, cur, _normal, 1);
        attrIndex.push(_lastFlip === 1 ? [index, index + 2, index + 3] : [index + 2, index + 1, index + 3]);
        count += 2;
        _lastFlip = flip;
        continue;
      }

      if (bevel) {
        miterLen = miterLimit;
        attrCounters.push(i / total); // next two points in our first segment

        addNext(out, _normal, -flip);
        attrPos.push(cur);
        addNext(out, miter, miterLen * flip);
        attrPos.push(cur);
        attrIndex.push(_lastFlip !== -flip ? [index, index + 2, index + 3] : [index + 2, index + 1, index + 3]); // now add the bevel triangle

        attrIndex.push([index + 2, index + 3, index + 4]);
        normal(tmp, lineB);
        copy(_normal, tmp); // store normal for next round

        addNext(out, _normal, -flip);
        attrPos.push(cur); // the miter is now the normal for our next join

        count += 3;
      } else {
        // miter
        // next two points for our miter join
        extrusions(attrPos, out, cur, miter, miterLen);
        attrIndex.push(_lastFlip === 1 ? [index, index + 2, index + 3] : [index + 2, index + 1, index + 3]);
        flip = -1; // the miter is now the normal for our next join

        copy(_normal, miter);
        count += 2;
      }

      _lastFlip = flip;
    }
  }

  return {
    normals: out,
    attrIndex: attrIndex,
    attrPos: attrPos,
    attrCounters: attrCounters
  };
}
//# sourceMappingURL=polyline-normals.js.map