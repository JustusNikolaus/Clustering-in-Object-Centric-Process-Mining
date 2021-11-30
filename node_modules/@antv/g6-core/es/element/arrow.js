export default {
  triangle: function triangle(width, length, d) {
    if (width === void 0) {
      width = 10;
    }

    if (length === void 0) {
      length = 15;
    }

    if (d === void 0) {
      d = 0;
    }

    var begin = d * 2;
    var path = "M " + begin + ",0 L " + (begin + length) + ",-" + width / 2 + " L " + (begin + length) + "," + width / 2 + " Z";
    return path;
  },
  vee: function vee(width, length, d) {
    if (width === void 0) {
      width = 15;
    }

    if (length === void 0) {
      length = 20;
    }

    if (d === void 0) {
      d = 0;
    }

    var begin = d * 2;
    var path = "M " + begin + ",0 L " + (begin + length) + ",-" + width / 2 + "\n        L " + (begin + 2 * length / 3) + ",0 L " + (begin + length) + "," + width / 2 + " Z";
    return path;
  },
  circle: function circle(r, d) {
    if (r === void 0) {
      r = 5;
    }

    if (d === void 0) {
      d = 0;
    }

    var begin = d * 2;
    var path = "M " + begin + ", 0\n            a " + r + "," + r + " 0 1,0 " + r * 2 + ",0\n            a " + r + "," + r + " 0 1,0 " + -r * 2 + ",0";
    return path;
  },
  rect: function rect(width, length, d) {
    if (width === void 0) {
      width = 10;
    }

    if (length === void 0) {
      length = 10;
    }

    if (d === void 0) {
      d = 0;
    }

    var begin = d * 2;
    var path = "M " + begin + "," + -width / 2 + " \n        L " + (begin + length) + "," + -width / 2 + " \n        L " + (begin + length) + "," + width / 2 + " \n        L " + begin + "," + width / 2 + " Z";
    return path;
  },
  diamond: function diamond(width, length, d) {
    if (width === void 0) {
      width = 15;
    }

    if (length === void 0) {
      length = 15;
    }

    if (d === void 0) {
      d = 0;
    }

    var begin = d * 2;
    var path = "M " + begin + ",0 \n        L " + (begin + length / 2) + "," + -width / 2 + " \n        L " + (begin + length) + ",0 \n        L " + (begin + length / 2) + "," + width / 2 + " Z";
    return path;
  },
  triangleRect: function triangleRect(tWidth, tLength, rWidth, rLength, gap, d) {
    if (tWidth === void 0) {
      tWidth = 15;
    }

    if (tLength === void 0) {
      tLength = 15;
    }

    if (rWidth === void 0) {
      rWidth = 15;
    }

    if (rLength === void 0) {
      rLength = 3;
    }

    if (gap === void 0) {
      gap = 5;
    }

    if (d === void 0) {
      d = 0;
    }

    var begin = d * 2;
    var rectBegin = begin + tLength + gap;
    var path = "M " + begin + ",0 L " + (begin + tLength) + ",-" + tWidth / 2 + " L " + (begin + tLength) + "," + tWidth / 2 + " Z\n            M " + rectBegin + ", -" + rWidth / 2 + "\n            L " + (rectBegin + rLength) + " -" + rWidth / 2 + "\n            L " + (rectBegin + rLength) + " " + rWidth / 2 + "\n            L " + rectBegin + " " + rWidth / 2 + "\n            Z";
    return path;
  }
};