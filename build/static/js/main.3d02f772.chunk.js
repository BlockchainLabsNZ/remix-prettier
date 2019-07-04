(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */


function arrayToString(a) {
  return "[" + a.join(", ") + "]";
}

String.prototype.seed = String.prototype.seed || Math.round(Math.random() * Math.pow(2, 32));

String.prototype.hashCode = function () {
  var remainder,
      bytes,
      h1,
      h1b,
      c1,
      c1b,
      c2,
      c2b,
      k1,
      i,
      key = this.toString();
  remainder = key.length & 3; // key.length % 4

  bytes = key.length - remainder;
  h1 = String.prototype.seed;
  c1 = 0xcc9e2d51;
  c2 = 0x1b873593;
  i = 0;

  while (i < bytes) {
    k1 = key.charCodeAt(i) & 0xff | (key.charCodeAt(++i) & 0xff) << 8 | (key.charCodeAt(++i) & 0xff) << 16 | (key.charCodeAt(++i) & 0xff) << 24;
    ++i;
    k1 = (k1 & 0xffff) * c1 + (((k1 >>> 16) * c1 & 0xffff) << 16) & 0xffffffff;
    k1 = k1 << 15 | k1 >>> 17;
    k1 = (k1 & 0xffff) * c2 + (((k1 >>> 16) * c2 & 0xffff) << 16) & 0xffffffff;
    h1 ^= k1;
    h1 = h1 << 13 | h1 >>> 19;
    h1b = (h1 & 0xffff) * 5 + (((h1 >>> 16) * 5 & 0xffff) << 16) & 0xffffffff;
    h1 = (h1b & 0xffff) + 0x6b64 + (((h1b >>> 16) + 0xe654 & 0xffff) << 16);
  }

  k1 = 0;

  switch (remainder) {
    case 3:
      k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      k1 ^= key.charCodeAt(i) & 0xff;
      k1 = (k1 & 0xffff) * c1 + (((k1 >>> 16) * c1 & 0xffff) << 16) & 0xffffffff;
      k1 = k1 << 15 | k1 >>> 17;
      k1 = (k1 & 0xffff) * c2 + (((k1 >>> 16) * c2 & 0xffff) << 16) & 0xffffffff;
      h1 ^= k1;
  }

  h1 ^= key.length;
  h1 ^= h1 >>> 16;
  h1 = (h1 & 0xffff) * 0x85ebca6b + (((h1 >>> 16) * 0x85ebca6b & 0xffff) << 16) & 0xffffffff;
  h1 ^= h1 >>> 13;
  h1 = (h1 & 0xffff) * 0xc2b2ae35 + (((h1 >>> 16) * 0xc2b2ae35 & 0xffff) << 16) & 0xffffffff;
  h1 ^= h1 >>> 16;
  return h1 >>> 0;
};

function standardEqualsFunction(a, b) {
  return a.equals(b);
}

function standardHashCodeFunction(a) {
  return a.hashCode();
}

function Set(hashFunction, equalsFunction) {
  this.data = {};
  this.hashFunction = hashFunction || standardHashCodeFunction;
  this.equalsFunction = equalsFunction || standardEqualsFunction;
  return this;
}

Object.defineProperty(Set.prototype, "length", {
  get: function get() {
    var l = 0;

    for (var key in this.data) {
      if (key.indexOf("hash_") === 0) {
        l = l + this.data[key].length;
      }
    }

    return l;
  }
});

Set.prototype.add = function (value) {
  var hash = this.hashFunction(value);
  var key = "hash_" + hash;

  if (key in this.data) {
    var values = this.data[key];

    for (var i = 0; i < values.length; i++) {
      if (this.equalsFunction(value, values[i])) {
        return values[i];
      }
    }

    values.push(value);
    return value;
  } else {
    this.data[key] = [value];
    return value;
  }
};

Set.prototype.contains = function (value) {
  return this.get(value) != null;
};

Set.prototype.get = function (value) {
  var hash = this.hashFunction(value);
  var key = "hash_" + hash;

  if (key in this.data) {
    var values = this.data[key];

    for (var i = 0; i < values.length; i++) {
      if (this.equalsFunction(value, values[i])) {
        return values[i];
      }
    }
  }

  return null;
};

Set.prototype.values = function () {
  var l = [];

  for (var key in this.data) {
    if (key.indexOf("hash_") === 0) {
      l = l.concat(this.data[key]);
    }
  }

  return l;
};

Set.prototype.toString = function () {
  return arrayToString(this.values());
};

function BitSet() {
  this.data = [];
  return this;
}

BitSet.prototype.add = function (value) {
  this.data[value] = true;
};

BitSet.prototype.or = function (set) {
  var bits = this;
  Object.keys(set.data).map(function (alt) {
    bits.add(alt);
  });
};

BitSet.prototype.remove = function (value) {
  delete this.data[value];
};

BitSet.prototype.contains = function (value) {
  return this.data[value] === true;
};

BitSet.prototype.values = function () {
  return Object.keys(this.data);
};

BitSet.prototype.minValue = function () {
  return Math.min.apply(null, this.values());
};

BitSet.prototype.hashCode = function () {
  var hash = new Hash();
  hash.update(this.values());
  return hash.finish();
};

BitSet.prototype.equals = function (other) {
  if (!(other instanceof BitSet)) {
    return false;
  }

  return this.hashCode() === other.hashCode();
};

Object.defineProperty(BitSet.prototype, "length", {
  get: function get() {
    return this.values().length;
  }
});

BitSet.prototype.toString = function () {
  return "{" + this.values().join(", ") + "}";
};

function Map(hashFunction, equalsFunction) {
  this.data = {};
  this.hashFunction = hashFunction || standardHashCodeFunction;
  this.equalsFunction = equalsFunction || standardEqualsFunction;
  return this;
}

Object.defineProperty(Map.prototype, "length", {
  get: function get() {
    var l = 0;

    for (var hashKey in this.data) {
      if (hashKey.indexOf("hash_") === 0) {
        l = l + this.data[hashKey].length;
      }
    }

    return l;
  }
});

Map.prototype.put = function (key, value) {
  var hashKey = "hash_" + this.hashFunction(key);

  if (hashKey in this.data) {
    var entries = this.data[hashKey];

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];

      if (this.equalsFunction(key, entry.key)) {
        var oldValue = entry.value;
        entry.value = value;
        return oldValue;
      }
    }

    entries.push({
      key: key,
      value: value
    });
    return value;
  } else {
    this.data[hashKey] = [{
      key: key,
      value: value
    }];
    return value;
  }
};

Map.prototype.containsKey = function (key) {
  var hashKey = "hash_" + this.hashFunction(key);

  if (hashKey in this.data) {
    var entries = this.data[hashKey];

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (this.equalsFunction(key, entry.key)) return true;
    }
  }

  return false;
};

Map.prototype.get = function (key) {
  var hashKey = "hash_" + this.hashFunction(key);

  if (hashKey in this.data) {
    var entries = this.data[hashKey];

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (this.equalsFunction(key, entry.key)) return entry.value;
    }
  }

  return null;
};

Map.prototype.entries = function () {
  var l = [];

  for (var key in this.data) {
    if (key.indexOf("hash_") === 0) {
      l = l.concat(this.data[key]);
    }
  }

  return l;
};

Map.prototype.getKeys = function () {
  return this.entries().map(function (e) {
    return e.key;
  });
};

Map.prototype.getValues = function () {
  return this.entries().map(function (e) {
    return e.value;
  });
};

Map.prototype.toString = function () {
  var ss = this.entries().map(function (entry) {
    return '{' + entry.key + ':' + entry.value + '}';
  });
  return '[' + ss.join(", ") + ']';
};

function AltDict() {
  this.data = {};
  return this;
}

AltDict.prototype.get = function (key) {
  key = "k-" + key;

  if (key in this.data) {
    return this.data[key];
  } else {
    return null;
  }
};

AltDict.prototype.put = function (key, value) {
  key = "k-" + key;
  this.data[key] = value;
};

AltDict.prototype.values = function () {
  var data = this.data;
  var keys = Object.keys(this.data);
  return keys.map(function (key) {
    return data[key];
  });
};

function DoubleDict() {
  return this;
}

function Hash() {
  this.count = 0;
  this.hash = 0;
  return this;
}

Hash.prototype.update = function () {
  for (var i = 0; i < arguments.length; i++) {
    var value = arguments[i];
    if (value == null) continue;
    if (Array.isArray(value)) this.update.apply(value);else {
      var k = 0;

      switch (typeof value === "undefined" ? "undefined" : _typeof(value)) {
        case 'undefined':
        case 'function':
          continue;

        case 'number':
        case 'boolean':
          k = value;
          break;

        case 'string':
          k = value.hashCode();
          break;

        default:
          value.updateHashCode(this);
          continue;
      }

      k = k * 0xCC9E2D51;
      k = k << 15 | k >>> 32 - 15;
      k = k * 0x1B873593;
      this.count = this.count + 1;
      var hash = this.hash ^ k;
      hash = hash << 13 | hash >>> 32 - 13;
      hash = hash * 5 + 0xE6546B64;
      this.hash = hash;
    }
  }
};

Hash.prototype.finish = function () {
  var hash = this.hash ^ this.count * 4;
  hash = hash ^ hash >>> 16;
  hash = hash * 0x85EBCA6B;
  hash = hash ^ hash >>> 13;
  hash = hash * 0xC2B2AE35;
  hash = hash ^ hash >>> 16;
  return hash;
};

function hashStuff() {
  var hash = new Hash();
  hash.update.apply(arguments);
  return hash.finish();
}

DoubleDict.prototype.get = function (a, b) {
  var d = this[a] || null;
  return d === null ? null : d[b] || null;
};

DoubleDict.prototype.set = function (a, b, o) {
  var d = this[a] || null;

  if (d === null) {
    d = {};
    this[a] = d;
  }

  d[b] = o;
};

function escapeWhitespace(s, escapeSpaces) {
  s = s.replace("\t", "\\t");
  s = s.replace("\n", "\\n");
  s = s.replace("\r", "\\r");

  if (escapeSpaces) {
    s = s.replace(" ", "\xB7");
  }

  return s;
}

function titleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
}

;

function equalArrays(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a == b) return true;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; i++) {
    if (a[i] == b[i]) continue;
    if (!a[i].equals(b[i])) return false;
  }

  return true;
}

;
exports.Hash = Hash;
exports.Set = Set;
exports.Map = Map;
exports.BitSet = BitSet;
exports.AltDict = AltDict;
exports.DoubleDict = DoubleDict;
exports.hashStuff = hashStuff;
exports.escapeWhitespace = escapeWhitespace;
exports.arrayToString = arrayToString;
exports.titleCase = titleCase;
exports.equalArrays = equalArrays;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
// A token has properties: text, type, line, character position in the line
// (so we can ignore tabs), token channel, index, and source from which
// we obtained this token.

function Token() {
  this.source = null;
  this.type = null; // token type of the token

  this.channel = null; // The parser ignores everything not on DEFAULT_CHANNEL

  this.start = null; // optional; return -1 if not implemented.

  this.stop = null; // optional; return -1 if not implemented.

  this.tokenIndex = null; // from 0..n-1 of the token object in the input stream

  this.line = null; // line=1..n of the 1st character

  this.column = null; // beginning of the line at which it occurs, 0..n-1

  this._text = null; // text of the token.

  return this;
}

Token.INVALID_TYPE = 0; // During lookahead operations, this "token" signifies we hit rule end ATN state
// and did not follow it despite needing to.

Token.EPSILON = -2;
Token.MIN_USER_TOKEN_TYPE = 1;
Token.EOF = -1; // All tokens go to the parser (unless skip() is called in that rule)
// on a particular "channel". The parser tunes to a particular channel
// so that whitespace etc... can go to the parser on a "hidden" channel.

Token.DEFAULT_CHANNEL = 0; // Anything on different channel than DEFAULT_CHANNEL is not parsed
// by parser.

Token.HIDDEN_CHANNEL = 1; // Explicitly set the text for this token. If {code text} is not
// {@code null}, then {@link //getText} will return this value rather than
// extracting the text from the input.
//
// @param text The explicit text of the token, or {@code null} if the text
// should be obtained from the input along with the start and stop indexes
// of the token.

Object.defineProperty(Token.prototype, "text", {
  get: function get() {
    return this._text;
  },
  set: function set(text) {
    this._text = text;
  }
});

Token.prototype.getTokenSource = function () {
  return this.source[0];
};

Token.prototype.getInputStream = function () {
  return this.source[1];
};

function CommonToken(source, type, channel, start, stop) {
  Token.call(this);
  this.source = source !== undefined ? source : CommonToken.EMPTY_SOURCE;
  this.type = type !== undefined ? type : null;
  this.channel = channel !== undefined ? channel : Token.DEFAULT_CHANNEL;
  this.start = start !== undefined ? start : -1;
  this.stop = stop !== undefined ? stop : -1;
  this.tokenIndex = -1;

  if (this.source[0] !== null) {
    this.line = source[0].line;
    this.column = source[0].column;
  } else {
    this.column = -1;
  }

  return this;
}

CommonToken.prototype = Object.create(Token.prototype);
CommonToken.prototype.constructor = CommonToken; // An empty {@link Pair} which is used as the default value of
// {@link //source} for tokens that do not have a source.

CommonToken.EMPTY_SOURCE = [null, null]; // Constructs a new {@link CommonToken} as a copy of another {@link Token}.
//
// <p>
// If {@code oldToken} is also a {@link CommonToken} instance, the newly
// constructed token will share a reference to the {@link //text} field and
// the {@link Pair} stored in {@link //source}. Otherwise, {@link //text} will
// be assigned the result of calling {@link //getText}, and {@link //source}
// will be constructed from the result of {@link Token//getTokenSource} and
// {@link Token//getInputStream}.</p>
//
// @param oldToken The token to copy.
//

CommonToken.prototype.clone = function () {
  var t = new CommonToken(this.source, this.type, this.channel, this.start, this.stop);
  t.tokenIndex = this.tokenIndex;
  t.line = this.line;
  t.column = this.column;
  t.text = this.text;
  return t;
};

Object.defineProperty(CommonToken.prototype, "text", {
  get: function get() {
    if (this._text !== null) {
      return this._text;
    }

    var input = this.getInputStream();

    if (input === null) {
      return null;
    }

    var n = input.size;

    if (this.start < n && this.stop < n) {
      return input.getText(this.start, this.stop);
    } else {
      return "<EOF>";
    }
  },
  set: function set(text) {
    this._text = text;
  }
});

CommonToken.prototype.toString = function () {
  var txt = this.text;

  if (txt !== null) {
    txt = txt.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
  } else {
    txt = "<no text>";
  }

  return "[@" + this.tokenIndex + "," + this.start + ":" + this.stop + "='" + txt + "',<" + this.type + ">" + (this.channel > 0 ? ",channel=" + this.channel : "") + "," + this.line + ":" + this.column + "]";
};

exports.Token = Token;
exports.CommonToken = CommonToken;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

/*jslint smarttabs:true */

var Token = __webpack_require__(3).Token;
/* stop is not included! */


function Interval(start, stop) {
  this.start = start;
  this.stop = stop;
  return this;
}

Interval.prototype.contains = function (item) {
  return item >= this.start && item < this.stop;
};

Interval.prototype.toString = function () {
  if (this.start === this.stop - 1) {
    return this.start.toString();
  } else {
    return this.start.toString() + ".." + (this.stop - 1).toString();
  }
};

Object.defineProperty(Interval.prototype, "length", {
  get: function get() {
    return this.stop - this.start;
  }
});

function IntervalSet() {
  this.intervals = null;
  this.readOnly = false;
}

IntervalSet.prototype.first = function (v) {
  if (this.intervals === null || this.intervals.length === 0) {
    return Token.INVALID_TYPE;
  } else {
    return this.intervals[0].start;
  }
};

IntervalSet.prototype.addOne = function (v) {
  this.addInterval(new Interval(v, v + 1));
};

IntervalSet.prototype.addRange = function (l, h) {
  this.addInterval(new Interval(l, h + 1));
};

IntervalSet.prototype.addInterval = function (v) {
  if (this.intervals === null) {
    this.intervals = [];
    this.intervals.push(v);
  } else {
    // find insert pos
    for (var k = 0; k < this.intervals.length; k++) {
      var i = this.intervals[k]; // distinct range -> insert

      if (v.stop < i.start) {
        this.intervals.splice(k, 0, v);
        return;
      } // contiguous range -> adjust
      else if (v.stop === i.start) {
          this.intervals[k].start = v.start;
          return;
        } // overlapping range -> adjust and reduce
        else if (v.start <= i.stop) {
            this.intervals[k] = new Interval(Math.min(i.start, v.start), Math.max(i.stop, v.stop));
            this.reduce(k);
            return;
          }
    } // greater than any existing


    this.intervals.push(v);
  }
};

IntervalSet.prototype.addSet = function (other) {
  if (other.intervals !== null) {
    for (var k = 0; k < other.intervals.length; k++) {
      var i = other.intervals[k];
      this.addInterval(new Interval(i.start, i.stop));
    }
  }

  return this;
};

IntervalSet.prototype.reduce = function (k) {
  // only need to reduce if k is not the last
  if (k < this.intervalslength - 1) {
    var l = this.intervals[k];
    var r = this.intervals[k + 1]; // if r contained in l

    if (l.stop >= r.stop) {
      this.intervals.pop(k + 1);
      this.reduce(k);
    } else if (l.stop >= r.start) {
      this.intervals[k] = new Interval(l.start, r.stop);
      this.intervals.pop(k + 1);
    }
  }
};

IntervalSet.prototype.complement = function (start, stop) {
  var result = new IntervalSet();
  result.addInterval(new Interval(start, stop + 1));

  for (var i = 0; i < this.intervals.length; i++) {
    result.removeRange(this.intervals[i]);
  }

  return result;
};

IntervalSet.prototype.contains = function (item) {
  if (this.intervals === null) {
    return false;
  } else {
    for (var k = 0; k < this.intervals.length; k++) {
      if (this.intervals[k].contains(item)) {
        return true;
      }
    }

    return false;
  }
};

Object.defineProperty(IntervalSet.prototype, "length", {
  get: function get() {
    var len = 0;
    this.intervals.map(function (i) {
      len += i.length;
    });
    return len;
  }
});

IntervalSet.prototype.removeRange = function (v) {
  if (v.start === v.stop - 1) {
    this.removeOne(v.start);
  } else if (this.intervals !== null) {
    var k = 0;

    for (var n = 0; n < this.intervals.length; n++) {
      var i = this.intervals[k]; // intervals are ordered

      if (v.stop <= i.start) {
        return;
      } // check for including range, split it
      else if (v.start > i.start && v.stop < i.stop) {
          this.intervals[k] = new Interval(i.start, v.start);
          var x = new Interval(v.stop, i.stop);
          this.intervals.splice(k, 0, x);
          return;
        } // check for included range, remove it
        else if (v.start <= i.start && v.stop >= i.stop) {
            this.intervals.splice(k, 1);
            k = k - 1; // need another pass
          } // check for lower boundary
          else if (v.start < i.stop) {
              this.intervals[k] = new Interval(i.start, v.start);
            } // check for upper boundary
            else if (v.stop < i.stop) {
                this.intervals[k] = new Interval(v.stop, i.stop);
              }

      k += 1;
    }
  }
};

IntervalSet.prototype.removeOne = function (v) {
  if (this.intervals !== null) {
    for (var k = 0; k < this.intervals.length; k++) {
      var i = this.intervals[k]; // intervals is ordered

      if (v < i.start) {
        return;
      } // check for single value range
      else if (v === i.start && v === i.stop - 1) {
          this.intervals.splice(k, 1);
          return;
        } // check for lower boundary
        else if (v === i.start) {
            this.intervals[k] = new Interval(i.start + 1, i.stop);
            return;
          } // check for upper boundary
          else if (v === i.stop - 1) {
              this.intervals[k] = new Interval(i.start, i.stop - 1);
              return;
            } // split existing range
            else if (v < i.stop - 1) {
                var x = new Interval(i.start, v);
                i.start = v + 1;
                this.intervals.splice(k, 0, x);
                return;
              }
    }
  }
};

IntervalSet.prototype.toString = function (literalNames, symbolicNames, elemsAreChar) {
  literalNames = literalNames || null;
  symbolicNames = symbolicNames || null;
  elemsAreChar = elemsAreChar || false;

  if (this.intervals === null) {
    return "{}";
  } else if (literalNames !== null || symbolicNames !== null) {
    return this.toTokenString(literalNames, symbolicNames);
  } else if (elemsAreChar) {
    return this.toCharString();
  } else {
    return this.toIndexString();
  }
};

IntervalSet.prototype.toCharString = function () {
  var names = [];

  for (var i = 0; i < this.intervals.length; i++) {
    var v = this.intervals[i];

    if (v.stop === v.start + 1) {
      if (v.start === Token.EOF) {
        names.push("<EOF>");
      } else {
        names.push("'" + String.fromCharCode(v.start) + "'");
      }
    } else {
      names.push("'" + String.fromCharCode(v.start) + "'..'" + String.fromCharCode(v.stop - 1) + "'");
    }
  }

  if (names.length > 1) {
    return "{" + names.join(", ") + "}";
  } else {
    return names[0];
  }
};

IntervalSet.prototype.toIndexString = function () {
  var names = [];

  for (var i = 0; i < this.intervals.length; i++) {
    var v = this.intervals[i];

    if (v.stop === v.start + 1) {
      if (v.start === Token.EOF) {
        names.push("<EOF>");
      } else {
        names.push(v.start.toString());
      }
    } else {
      names.push(v.start.toString() + ".." + (v.stop - 1).toString());
    }
  }

  if (names.length > 1) {
    return "{" + names.join(", ") + "}";
  } else {
    return names[0];
  }
};

IntervalSet.prototype.toTokenString = function (literalNames, symbolicNames) {
  var names = [];

  for (var i = 0; i < this.intervals.length; i++) {
    var v = this.intervals[i];

    for (var j = v.start; j < v.stop; j++) {
      names.push(this.elementName(literalNames, symbolicNames, j));
    }
  }

  if (names.length > 1) {
    return "{" + names.join(", ") + "}";
  } else {
    return names[0];
  }
};

IntervalSet.prototype.elementName = function (literalNames, symbolicNames, a) {
  if (a === Token.EOF) {
    return "<EOF>";
  } else if (a === Token.EPSILON) {
    return "<EPSILON>";
  } else {
    return literalNames[a] || symbolicNames[a];
  }
};

exports.Interval = Interval;
exports.IntervalSet = IntervalSet;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
// The following images show the relation of states and
// {@link ATNState//transitions} for various grammar constructs.
//
// <ul>
//
// <li>Solid edges marked with an &//0949; indicate a required
// {@link EpsilonTransition}.</li>
//
// <li>Dashed edges indicate locations where any transition derived from
// {@link Transition} might appear.</li>
//
// <li>Dashed nodes are place holders for either a sequence of linked
// {@link BasicState} states or the inclusion of a block representing a nested
// construct in one of the forms below.</li>
//
// <li>Nodes showing multiple outgoing alternatives with a {@code ...} support
// any number of alternatives (one or more). Nodes without the {@code ...} only
// support the exact number of alternatives shown in the diagram.</li>
//
// </ul>
//
// <h2>Basic Blocks</h2>
//
// <h3>Rule</h3>
//
// <embed src="images/Rule.svg" type="image/svg+xml"/>
//
// <h3>Block of 1 or more alternatives</h3>
//
// <embed src="images/Block.svg" type="image/svg+xml"/>
//
// <h2>Greedy Loops</h2>
//
// <h3>Greedy Closure: {@code (...)*}</h3>
//
// <embed src="images/ClosureGreedy.svg" type="image/svg+xml"/>
//
// <h3>Greedy Positive Closure: {@code (...)+}</h3>
//
// <embed src="images/PositiveClosureGreedy.svg" type="image/svg+xml"/>
//
// <h3>Greedy Optional: {@code (...)?}</h3>
//
// <embed src="images/OptionalGreedy.svg" type="image/svg+xml"/>
//
// <h2>Non-Greedy Loops</h2>
//
// <h3>Non-Greedy Closure: {@code (...)*?}</h3>
//
// <embed src="images/ClosureNonGreedy.svg" type="image/svg+xml"/>
//
// <h3>Non-Greedy Positive Closure: {@code (...)+?}</h3>
//
// <embed src="images/PositiveClosureNonGreedy.svg" type="image/svg+xml"/>
//
// <h3>Non-Greedy Optional: {@code (...)??}</h3>
//
// <embed src="images/OptionalNonGreedy.svg" type="image/svg+xml"/>
//

var INITIAL_NUM_TRANSITIONS = 4;

function ATNState() {
  // Which ATN are we in?
  this.atn = null;
  this.stateNumber = ATNState.INVALID_STATE_NUMBER;
  this.stateType = null;
  this.ruleIndex = 0; // at runtime, we don't have Rule objects

  this.epsilonOnlyTransitions = false; // Track the transitions emanating from this ATN state.

  this.transitions = []; // Used to cache lookahead during parsing, not used during construction

  this.nextTokenWithinRule = null;
  return this;
} // constants for serialization


ATNState.INVALID_TYPE = 0;
ATNState.BASIC = 1;
ATNState.RULE_START = 2;
ATNState.BLOCK_START = 3;
ATNState.PLUS_BLOCK_START = 4;
ATNState.STAR_BLOCK_START = 5;
ATNState.TOKEN_START = 6;
ATNState.RULE_STOP = 7;
ATNState.BLOCK_END = 8;
ATNState.STAR_LOOP_BACK = 9;
ATNState.STAR_LOOP_ENTRY = 10;
ATNState.PLUS_LOOP_BACK = 11;
ATNState.LOOP_END = 12;
ATNState.serializationNames = ["INVALID", "BASIC", "RULE_START", "BLOCK_START", "PLUS_BLOCK_START", "STAR_BLOCK_START", "TOKEN_START", "RULE_STOP", "BLOCK_END", "STAR_LOOP_BACK", "STAR_LOOP_ENTRY", "PLUS_LOOP_BACK", "LOOP_END"];
ATNState.INVALID_STATE_NUMBER = -1;

ATNState.prototype.toString = function () {
  return this.stateNumber;
};

ATNState.prototype.equals = function (other) {
  if (other instanceof ATNState) {
    return this.stateNumber === other.stateNumber;
  } else {
    return false;
  }
};

ATNState.prototype.isNonGreedyExitState = function () {
  return false;
};

ATNState.prototype.addTransition = function (trans, index) {
  if (index === undefined) {
    index = -1;
  }

  if (this.transitions.length === 0) {
    this.epsilonOnlyTransitions = trans.isEpsilon;
  } else if (this.epsilonOnlyTransitions !== trans.isEpsilon) {
    this.epsilonOnlyTransitions = false;
  }

  if (index === -1) {
    this.transitions.push(trans);
  } else {
    this.transitions.splice(index, 1, trans);
  }
};

function BasicState() {
  ATNState.call(this);
  this.stateType = ATNState.BASIC;
  return this;
}

BasicState.prototype = Object.create(ATNState.prototype);
BasicState.prototype.constructor = BasicState;

function DecisionState() {
  ATNState.call(this);
  this.decision = -1;
  this.nonGreedy = false;
  return this;
}

DecisionState.prototype = Object.create(ATNState.prototype);
DecisionState.prototype.constructor = DecisionState; //  The start of a regular {@code (...)} block.

function BlockStartState() {
  DecisionState.call(this);
  this.endState = null;
  return this;
}

BlockStartState.prototype = Object.create(DecisionState.prototype);
BlockStartState.prototype.constructor = BlockStartState;

function BasicBlockStartState() {
  BlockStartState.call(this);
  this.stateType = ATNState.BLOCK_START;
  return this;
}

BasicBlockStartState.prototype = Object.create(BlockStartState.prototype);
BasicBlockStartState.prototype.constructor = BasicBlockStartState; // Terminal node of a simple {@code (a|b|c)} block.

function BlockEndState() {
  ATNState.call(this);
  this.stateType = ATNState.BLOCK_END;
  this.startState = null;
  return this;
}

BlockEndState.prototype = Object.create(ATNState.prototype);
BlockEndState.prototype.constructor = BlockEndState; // The last node in the ATN for a rule, unless that rule is the start symbol.
//  In that case, there is one transition to EOF. Later, we might encode
//  references to all calls to this rule to compute FOLLOW sets for
//  error handling.
//

function RuleStopState() {
  ATNState.call(this);
  this.stateType = ATNState.RULE_STOP;
  return this;
}

RuleStopState.prototype = Object.create(ATNState.prototype);
RuleStopState.prototype.constructor = RuleStopState;

function RuleStartState() {
  ATNState.call(this);
  this.stateType = ATNState.RULE_START;
  this.stopState = null;
  this.isPrecedenceRule = false;
  return this;
}

RuleStartState.prototype = Object.create(ATNState.prototype);
RuleStartState.prototype.constructor = RuleStartState; // Decision state for {@code A+} and {@code (A|B)+}.  It has two transitions:
//  one to the loop back to start of the block and one to exit.
//

function PlusLoopbackState() {
  DecisionState.call(this);
  this.stateType = ATNState.PLUS_LOOP_BACK;
  return this;
}

PlusLoopbackState.prototype = Object.create(DecisionState.prototype);
PlusLoopbackState.prototype.constructor = PlusLoopbackState; // Start of {@code (A|B|...)+} loop. Technically a decision state, but
//  we don't use for code generation; somebody might need it, so I'm defining
//  it for completeness. In reality, the {@link PlusLoopbackState} node is the
//  real decision-making note for {@code A+}.
//

function PlusBlockStartState() {
  BlockStartState.call(this);
  this.stateType = ATNState.PLUS_BLOCK_START;
  this.loopBackState = null;
  return this;
}

PlusBlockStartState.prototype = Object.create(BlockStartState.prototype);
PlusBlockStartState.prototype.constructor = PlusBlockStartState; // The block that begins a closure loop.

function StarBlockStartState() {
  BlockStartState.call(this);
  this.stateType = ATNState.STAR_BLOCK_START;
  return this;
}

StarBlockStartState.prototype = Object.create(BlockStartState.prototype);
StarBlockStartState.prototype.constructor = StarBlockStartState;

function StarLoopbackState() {
  ATNState.call(this);
  this.stateType = ATNState.STAR_LOOP_BACK;
  return this;
}

StarLoopbackState.prototype = Object.create(ATNState.prototype);
StarLoopbackState.prototype.constructor = StarLoopbackState;

function StarLoopEntryState() {
  DecisionState.call(this);
  this.stateType = ATNState.STAR_LOOP_ENTRY;
  this.loopBackState = null; // Indicates whether this state can benefit from a precedence DFA during SLL decision making.

  this.isPrecedenceDecision = null;
  return this;
}

StarLoopEntryState.prototype = Object.create(DecisionState.prototype);
StarLoopEntryState.prototype.constructor = StarLoopEntryState; // Mark the end of a * or + loop.

function LoopEndState() {
  ATNState.call(this);
  this.stateType = ATNState.LOOP_END;
  this.loopBackState = null;
  return this;
}

LoopEndState.prototype = Object.create(ATNState.prototype);
LoopEndState.prototype.constructor = LoopEndState; // The Tokens rule start state linking to each lexer rule start state */

function TokensStartState() {
  DecisionState.call(this);
  this.stateType = ATNState.TOKEN_START;
  return this;
}

TokensStartState.prototype = Object.create(DecisionState.prototype);
TokensStartState.prototype.constructor = TokensStartState;
exports.ATNState = ATNState;
exports.BasicState = BasicState;
exports.DecisionState = DecisionState;
exports.BlockStartState = BlockStartState;
exports.BlockEndState = BlockEndState;
exports.LoopEndState = LoopEndState;
exports.RuleStartState = RuleStartState;
exports.RuleStopState = RuleStopState;
exports.TokensStartState = TokensStartState;
exports.PlusLoopbackState = PlusLoopbackState;
exports.StarLoopbackState = StarLoopbackState;
exports.StarLoopEntryState = StarLoopEntryState;
exports.PlusBlockStartState = PlusBlockStartState;
exports.StarBlockStartState = StarBlockStartState;
exports.BasicBlockStartState = BasicBlockStartState;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
// The basic notion of a tree has a parent, a payload, and a list of children.
//  It is the most abstract interface for all the trees used by ANTLR.
///

var Token = __webpack_require__(3).Token;

var Interval = __webpack_require__(4).Interval;

var INVALID_INTERVAL = new Interval(-1, -2);

var Utils = __webpack_require__(2);

function Tree() {
  return this;
}

function SyntaxTree() {
  Tree.call(this);
  return this;
}

SyntaxTree.prototype = Object.create(Tree.prototype);
SyntaxTree.prototype.constructor = SyntaxTree;

function ParseTree() {
  SyntaxTree.call(this);
  return this;
}

ParseTree.prototype = Object.create(SyntaxTree.prototype);
ParseTree.prototype.constructor = ParseTree;

function RuleNode() {
  ParseTree.call(this);
  return this;
}

RuleNode.prototype = Object.create(ParseTree.prototype);
RuleNode.prototype.constructor = RuleNode;

function TerminalNode() {
  ParseTree.call(this);
  return this;
}

TerminalNode.prototype = Object.create(ParseTree.prototype);
TerminalNode.prototype.constructor = TerminalNode;

function ErrorNode() {
  TerminalNode.call(this);
  return this;
}

ErrorNode.prototype = Object.create(TerminalNode.prototype);
ErrorNode.prototype.constructor = ErrorNode;

function ParseTreeVisitor() {
  return this;
}

ParseTreeVisitor.prototype.visit = function (ctx) {
  if (Array.isArray(ctx)) {
    return ctx.map(function (child) {
      return child.accept(this);
    }, this);
  } else {
    return ctx.accept(this);
  }
};

ParseTreeVisitor.prototype.visitChildren = function (ctx) {
  return this.visit(ctx.children);
};

ParseTreeVisitor.prototype.visitTerminal = function (node) {};

ParseTreeVisitor.prototype.visitErrorNode = function (node) {};

function ParseTreeListener() {
  return this;
}

ParseTreeListener.prototype.visitTerminal = function (node) {};

ParseTreeListener.prototype.visitErrorNode = function (node) {};

ParseTreeListener.prototype.enterEveryRule = function (node) {};

ParseTreeListener.prototype.exitEveryRule = function (node) {};

function TerminalNodeImpl(symbol) {
  TerminalNode.call(this);
  this.parentCtx = null;
  this.symbol = symbol;
  return this;
}

TerminalNodeImpl.prototype = Object.create(TerminalNode.prototype);
TerminalNodeImpl.prototype.constructor = TerminalNodeImpl;

TerminalNodeImpl.prototype.getChild = function (i) {
  return null;
};

TerminalNodeImpl.prototype.getSymbol = function () {
  return this.symbol;
};

TerminalNodeImpl.prototype.getParent = function () {
  return this.parentCtx;
};

TerminalNodeImpl.prototype.getPayload = function () {
  return this.symbol;
};

TerminalNodeImpl.prototype.getSourceInterval = function () {
  if (this.symbol === null) {
    return INVALID_INTERVAL;
  }

  var tokenIndex = this.symbol.tokenIndex;
  return new Interval(tokenIndex, tokenIndex);
};

TerminalNodeImpl.prototype.getChildCount = function () {
  return 0;
};

TerminalNodeImpl.prototype.accept = function (visitor) {
  return visitor.visitTerminal(this);
};

TerminalNodeImpl.prototype.getText = function () {
  return this.symbol.text;
};

TerminalNodeImpl.prototype.toString = function () {
  if (this.symbol.type === Token.EOF) {
    return "<EOF>";
  } else {
    return this.symbol.text;
  }
}; // Represents a token that was consumed during resynchronization
// rather than during a valid match operation. For example,
// we will create this kind of a node during single token insertion
// and deletion as well as during "consume until error recovery set"
// upon no viable alternative exceptions.


function ErrorNodeImpl(token) {
  TerminalNodeImpl.call(this, token);
  return this;
}

ErrorNodeImpl.prototype = Object.create(TerminalNodeImpl.prototype);
ErrorNodeImpl.prototype.constructor = ErrorNodeImpl;

ErrorNodeImpl.prototype.isErrorNode = function () {
  return true;
};

ErrorNodeImpl.prototype.accept = function (visitor) {
  return visitor.visitErrorNode(this);
};

function ParseTreeWalker() {
  return this;
}

ParseTreeWalker.prototype.walk = function (listener, t) {
  var errorNode = t instanceof ErrorNode || t.isErrorNode !== undefined && t.isErrorNode();

  if (errorNode) {
    listener.visitErrorNode(t);
  } else if (t instanceof TerminalNode) {
    listener.visitTerminal(t);
  } else {
    this.enterRule(listener, t);

    for (var i = 0; i < t.getChildCount(); i++) {
      var child = t.getChild(i);
      this.walk(listener, child);
    }

    this.exitRule(listener, t);
  }
}; //
// The discovery of a rule node, involves sending two events: the generic
// {@link ParseTreeListener//enterEveryRule} and a
// {@link RuleContext}-specific event. First we trigger the generic and then
// the rule specific. We to them in reverse order upon finishing the node.
//


ParseTreeWalker.prototype.enterRule = function (listener, r) {
  var ctx = r.getRuleContext();
  listener.enterEveryRule(ctx);
  ctx.enterRule(listener);
};

ParseTreeWalker.prototype.exitRule = function (listener, r) {
  var ctx = r.getRuleContext();
  ctx.exitRule(listener);
  listener.exitEveryRule(ctx);
};

ParseTreeWalker.DEFAULT = new ParseTreeWalker();
exports.RuleNode = RuleNode;
exports.ErrorNode = ErrorNode;
exports.TerminalNode = TerminalNode;
exports.ErrorNodeImpl = ErrorNodeImpl;
exports.TerminalNodeImpl = TerminalNodeImpl;
exports.ParseTreeListener = ParseTreeListener;
exports.ParseTreeVisitor = ParseTreeVisitor;
exports.ParseTreeWalker = ParseTreeWalker;
exports.INVALID_INTERVAL = INVALID_INTERVAL;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
// The root of the ANTLR exception hierarchy. In general, ANTLR tracks just
//  3 kinds of errors: prediction errors, failed predicate errors, and
//  mismatched input errors. In each case, the parser knows where it is
//  in the input, where it is in the ATN, the rule invocation stack,
//  and what kind of problem occurred.

var PredicateTransition = __webpack_require__(10).PredicateTransition;

function RecognitionException(params) {
  Error.call(this);

  if (!!Error.captureStackTrace) {
    Error.captureStackTrace(this, RecognitionException);
  } else {
    var stack = new Error().stack;
  }

  this.message = params.message;
  this.recognizer = params.recognizer;
  this.input = params.input;
  this.ctx = params.ctx; // The current {@link Token} when an error occurred. Since not all streams
  // support accessing symbols by index, we have to track the {@link Token}
  // instance itself.

  this.offendingToken = null; // Get the ATN state number the parser was in at the time the error
  // occurred. For {@link NoViableAltException} and
  // {@link LexerNoViableAltException} exceptions, this is the
  // {@link DecisionState} number. For others, it is the state whose outgoing
  // edge we couldn't match.

  this.offendingState = -1;

  if (this.recognizer !== null) {
    this.offendingState = this.recognizer.state;
  }

  return this;
}

RecognitionException.prototype = Object.create(Error.prototype);
RecognitionException.prototype.constructor = RecognitionException; // <p>If the state number is not known, this method returns -1.</p>
//
// Gets the set of input symbols which could potentially follow the
// previously matched symbol at the time this exception was thrown.
//
// <p>If the set of expected tokens is not known and could not be computed,
// this method returns {@code null}.</p>
//
// @return The set of token types that could potentially follow the current
// state in the ATN, or {@code null} if the information is not available.
// /

RecognitionException.prototype.getExpectedTokens = function () {
  if (this.recognizer !== null) {
    return this.recognizer.atn.getExpectedTokens(this.offendingState, this.ctx);
  } else {
    return null;
  }
};

RecognitionException.prototype.toString = function () {
  return this.message;
};

function LexerNoViableAltException(lexer, input, startIndex, deadEndConfigs) {
  RecognitionException.call(this, {
    message: "",
    recognizer: lexer,
    input: input,
    ctx: null
  });
  this.startIndex = startIndex;
  this.deadEndConfigs = deadEndConfigs;
  return this;
}

LexerNoViableAltException.prototype = Object.create(RecognitionException.prototype);
LexerNoViableAltException.prototype.constructor = LexerNoViableAltException;

LexerNoViableAltException.prototype.toString = function () {
  var symbol = "";

  if (this.startIndex >= 0 && this.startIndex < this.input.size) {
    symbol = this.input.getText((this.startIndex, this.startIndex));
  }

  return "LexerNoViableAltException" + symbol;
}; // Indicates that the parser could not decide which of two or more paths
// to take based upon the remaining input. It tracks the starting token
// of the offending input and also knows where the parser was
// in the various paths when the error. Reported by reportNoViableAlternative()
//


function NoViableAltException(recognizer, input, startToken, offendingToken, deadEndConfigs, ctx) {
  ctx = ctx || recognizer._ctx;
  offendingToken = offendingToken || recognizer.getCurrentToken();
  startToken = startToken || recognizer.getCurrentToken();
  input = input || recognizer.getInputStream();
  RecognitionException.call(this, {
    message: "",
    recognizer: recognizer,
    input: input,
    ctx: ctx
  }); // Which configurations did we try at input.index() that couldn't match
  // input.LT(1)?//

  this.deadEndConfigs = deadEndConfigs; // The token object at the start index; the input stream might
  // not be buffering tokens so get a reference to it. (At the
  // time the error occurred, of course the stream needs to keep a
  // buffer all of the tokens but later we might not have access to those.)

  this.startToken = startToken;
  this.offendingToken = offendingToken;
}

NoViableAltException.prototype = Object.create(RecognitionException.prototype);
NoViableAltException.prototype.constructor = NoViableAltException; // This signifies any kind of mismatched input exceptions such as
// when the current input does not match the expected token.
//

function InputMismatchException(recognizer) {
  RecognitionException.call(this, {
    message: "",
    recognizer: recognizer,
    input: recognizer.getInputStream(),
    ctx: recognizer._ctx
  });
  this.offendingToken = recognizer.getCurrentToken();
}

InputMismatchException.prototype = Object.create(RecognitionException.prototype);
InputMismatchException.prototype.constructor = InputMismatchException; // A semantic predicate failed during validation. Validation of predicates
// occurs when normally parsing the alternative just like matching a token.
// Disambiguating predicate evaluation occurs when we test a predicate during
// prediction.

function FailedPredicateException(recognizer, predicate, message) {
  RecognitionException.call(this, {
    message: this.formatMessage(predicate, message || null),
    recognizer: recognizer,
    input: recognizer.getInputStream(),
    ctx: recognizer._ctx
  });
  var s = recognizer._interp.atn.states[recognizer.state];
  var trans = s.transitions[0];

  if (trans instanceof PredicateTransition) {
    this.ruleIndex = trans.ruleIndex;
    this.predicateIndex = trans.predIndex;
  } else {
    this.ruleIndex = 0;
    this.predicateIndex = 0;
  }

  this.predicate = predicate;
  this.offendingToken = recognizer.getCurrentToken();
  return this;
}

FailedPredicateException.prototype = Object.create(RecognitionException.prototype);
FailedPredicateException.prototype.constructor = FailedPredicateException;

FailedPredicateException.prototype.formatMessage = function (predicate, message) {
  if (message !== null) {
    return message;
  } else {
    return "failed predicate: {" + predicate + "}?";
  }
};

function ParseCancellationException() {
  Error.call(this);
  Error.captureStackTrace(this, ParseCancellationException);
  return this;
}

ParseCancellationException.prototype = Object.create(Error.prototype);
ParseCancellationException.prototype.constructor = ParseCancellationException;
exports.RecognitionException = RecognitionException;
exports.NoViableAltException = NoViableAltException;
exports.LexerNoViableAltException = LexerNoViableAltException;
exports.InputMismatchException = InputMismatchException;
exports.FailedPredicateException = FailedPredicateException;
exports.ParseCancellationException = ParseCancellationException;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///

var RuleContext = __webpack_require__(20).RuleContext;

var Hash = __webpack_require__(2).Hash;

function PredictionContext(cachedHashCode) {
  this.cachedHashCode = cachedHashCode;
} // Represents {@code $} in local context prediction, which means wildcard.
// {@code//+x =//}.
// /


PredictionContext.EMPTY = null; // Represents {@code $} in an array in full context mode, when {@code $}
// doesn't mean wildcard: {@code $ + x = [$,x]}. Here,
// {@code $} = {@link //EMPTY_RETURN_STATE}.
// /

PredictionContext.EMPTY_RETURN_STATE = 0x7FFFFFFF;
PredictionContext.globalNodeCount = 1;
PredictionContext.id = PredictionContext.globalNodeCount; // Stores the computed hash code of this {@link PredictionContext}. The hash
// code is computed in parts to match the following reference algorithm.
//
// <pre>
// private int referenceHashCode() {
// int hash = {@link MurmurHash//initialize MurmurHash.initialize}({@link
// //INITIAL_HASH});
//
// for (int i = 0; i &lt; {@link //size()}; i++) {
// hash = {@link MurmurHash//update MurmurHash.update}(hash, {@link //getParent
// getParent}(i));
// }
//
// for (int i = 0; i &lt; {@link //size()}; i++) {
// hash = {@link MurmurHash//update MurmurHash.update}(hash, {@link
// //getReturnState getReturnState}(i));
// }
//
// hash = {@link MurmurHash//finish MurmurHash.finish}(hash, 2// {@link
// //size()});
// return hash;
// }
// </pre>
// /
// This means only the {@link //EMPTY} context is in set.

PredictionContext.prototype.isEmpty = function () {
  return this === PredictionContext.EMPTY;
};

PredictionContext.prototype.hasEmptyPath = function () {
  return this.getReturnState(this.length - 1) === PredictionContext.EMPTY_RETURN_STATE;
};

PredictionContext.prototype.hashCode = function () {
  return this.cachedHashCode;
};

PredictionContext.prototype.updateHashCode = function (hash) {
  hash.update(this.cachedHashCode);
};
/*
function calculateHashString(parent, returnState) {
	return "" + parent + returnState;
}
*/
// Used to cache {@link PredictionContext} objects. Its used for the shared
// context cash associated with contexts in DFA states. This cache
// can be used for both lexers and parsers.


function PredictionContextCache() {
  this.cache = {};
  return this;
} // Add a context to the cache and return it. If the context already exists,
// return that one instead and do not add a new context to the cache.
// Protect shared cache from unsafe thread access.
//


PredictionContextCache.prototype.add = function (ctx) {
  if (ctx === PredictionContext.EMPTY) {
    return PredictionContext.EMPTY;
  }

  var existing = this.cache[ctx] || null;

  if (existing !== null) {
    return existing;
  }

  this.cache[ctx] = ctx;
  return ctx;
};

PredictionContextCache.prototype.get = function (ctx) {
  return this.cache[ctx] || null;
};

Object.defineProperty(PredictionContextCache.prototype, "length", {
  get: function get() {
    return this.cache.length;
  }
});

function SingletonPredictionContext(parent, returnState) {
  var hashCode = 0;

  if (parent !== null) {
    var hash = new Hash();
    hash.update(parent, returnState);
    hashCode = hash.finish();
  }

  PredictionContext.call(this, hashCode);
  this.parentCtx = parent;
  this.returnState = returnState;
}

SingletonPredictionContext.prototype = Object.create(PredictionContext.prototype);
SingletonPredictionContext.prototype.contructor = SingletonPredictionContext;

SingletonPredictionContext.create = function (parent, returnState) {
  if (returnState === PredictionContext.EMPTY_RETURN_STATE && parent === null) {
    // someone can pass in the bits of an array ctx that mean $
    return PredictionContext.EMPTY;
  } else {
    return new SingletonPredictionContext(parent, returnState);
  }
};

Object.defineProperty(SingletonPredictionContext.prototype, "length", {
  get: function get() {
    return 1;
  }
});

SingletonPredictionContext.prototype.getParent = function (index) {
  return this.parentCtx;
};

SingletonPredictionContext.prototype.getReturnState = function (index) {
  return this.returnState;
};

SingletonPredictionContext.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof SingletonPredictionContext)) {
    return false;
  } else if (this.hashCode() !== other.hashCode()) {
    return false; // can't be same if hash is different
  } else {
    if (this.returnState !== other.returnState) return false;else if (this.parentCtx == null) return other.parentCtx == null;else return this.parentCtx.equals(other.parentCtx);
  }
};

SingletonPredictionContext.prototype.toString = function () {
  var up = this.parentCtx === null ? "" : this.parentCtx.toString();

  if (up.length === 0) {
    if (this.returnState === PredictionContext.EMPTY_RETURN_STATE) {
      return "$";
    } else {
      return "" + this.returnState;
    }
  } else {
    return "" + this.returnState + " " + up;
  }
};

function EmptyPredictionContext() {
  SingletonPredictionContext.call(this, null, PredictionContext.EMPTY_RETURN_STATE);
  return this;
}

EmptyPredictionContext.prototype = Object.create(SingletonPredictionContext.prototype);
EmptyPredictionContext.prototype.constructor = EmptyPredictionContext;

EmptyPredictionContext.prototype.isEmpty = function () {
  return true;
};

EmptyPredictionContext.prototype.getParent = function (index) {
  return null;
};

EmptyPredictionContext.prototype.getReturnState = function (index) {
  return this.returnState;
};

EmptyPredictionContext.prototype.equals = function (other) {
  return this === other;
};

EmptyPredictionContext.prototype.toString = function () {
  return "$";
};

PredictionContext.EMPTY = new EmptyPredictionContext();

function ArrayPredictionContext(parents, returnStates) {
  // Parent can be null only if full ctx mode and we make an array
  // from {@link //EMPTY} and non-empty. We merge {@link //EMPTY} by using
  // null parent and
  // returnState == {@link //EMPTY_RETURN_STATE}.
  var h = new Hash();
  h.update(parents, returnStates);
  var hashCode = h.finish();
  PredictionContext.call(this, hashCode);
  this.parents = parents;
  this.returnStates = returnStates;
  return this;
}

ArrayPredictionContext.prototype = Object.create(PredictionContext.prototype);
ArrayPredictionContext.prototype.constructor = ArrayPredictionContext;

ArrayPredictionContext.prototype.isEmpty = function () {
  // since EMPTY_RETURN_STATE can only appear in the last position, we
  // don't need to verify that size==1
  return this.returnStates[0] === PredictionContext.EMPTY_RETURN_STATE;
};

Object.defineProperty(ArrayPredictionContext.prototype, "length", {
  get: function get() {
    return this.returnStates.length;
  }
});

ArrayPredictionContext.prototype.getParent = function (index) {
  return this.parents[index];
};

ArrayPredictionContext.prototype.getReturnState = function (index) {
  return this.returnStates[index];
};

ArrayPredictionContext.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof ArrayPredictionContext)) {
    return false;
  } else if (this.hashCode() !== other.hashCode()) {
    return false; // can't be same if hash is different
  } else {
    return this.returnStates === other.returnStates && this.parents === other.parents;
  }
};

ArrayPredictionContext.prototype.toString = function () {
  if (this.isEmpty()) {
    return "[]";
  } else {
    var s = "[";

    for (var i = 0; i < this.returnStates.length; i++) {
      if (i > 0) {
        s = s + ", ";
      }

      if (this.returnStates[i] === PredictionContext.EMPTY_RETURN_STATE) {
        s = s + "$";
        continue;
      }

      s = s + this.returnStates[i];

      if (this.parents[i] !== null) {
        s = s + " " + this.parents[i];
      } else {
        s = s + "null";
      }
    }

    return s + "]";
  }
}; // Convert a {@link RuleContext} tree to a {@link PredictionContext} graph.
// Return {@link //EMPTY} if {@code outerContext} is empty or null.
// /


function predictionContextFromRuleContext(atn, outerContext) {
  if (outerContext === undefined || outerContext === null) {
    outerContext = RuleContext.EMPTY;
  } // if we are in RuleContext of start rule, s, then PredictionContext
  // is EMPTY. Nobody called us. (if we are empty, return empty)


  if (outerContext.parentCtx === null || outerContext === RuleContext.EMPTY) {
    return PredictionContext.EMPTY;
  } // If we have a parent, convert it to a PredictionContext graph


  var parent = predictionContextFromRuleContext(atn, outerContext.parentCtx);
  var state = atn.states[outerContext.invokingState];
  var transition = state.transitions[0];
  return SingletonPredictionContext.create(parent, transition.followState.stateNumber);
}
/*
function calculateListsHashString(parents, returnStates) {
	var s = "";
	parents.map(function(p) {
		s = s + p;
	});
	returnStates.map(function(r) {
		s = s + r;
	});
	return s;
}
*/


function merge(a, b, rootIsWildcard, mergeCache) {
  // share same graph if both same
  if (a === b) {
    return a;
  }

  if (a instanceof SingletonPredictionContext && b instanceof SingletonPredictionContext) {
    return mergeSingletons(a, b, rootIsWildcard, mergeCache);
  } // At least one of a or b is array
  // If one is $ and rootIsWildcard, return $ as// wildcard


  if (rootIsWildcard) {
    if (a instanceof EmptyPredictionContext) {
      return a;
    }

    if (b instanceof EmptyPredictionContext) {
      return b;
    }
  } // convert singleton so both are arrays to normalize


  if (a instanceof SingletonPredictionContext) {
    a = new ArrayPredictionContext([a.getParent()], [a.returnState]);
  }

  if (b instanceof SingletonPredictionContext) {
    b = new ArrayPredictionContext([b.getParent()], [b.returnState]);
  }

  return mergeArrays(a, b, rootIsWildcard, mergeCache);
} //
// Merge two {@link SingletonPredictionContext} instances.
//
// <p>Stack tops equal, parents merge is same; return left graph.<br>
// <embed src="images/SingletonMerge_SameRootSamePar.svg"
// type="image/svg+xml"/></p>
//
// <p>Same stack top, parents differ; merge parents giving array node, then
// remainders of those graphs. A new root node is created to point to the
// merged parents.<br>
// <embed src="images/SingletonMerge_SameRootDiffPar.svg"
// type="image/svg+xml"/></p>
//
// <p>Different stack tops pointing to same parent. Make array node for the
// root where both element in the root point to the same (original)
// parent.<br>
// <embed src="images/SingletonMerge_DiffRootSamePar.svg"
// type="image/svg+xml"/></p>
//
// <p>Different stack tops pointing to different parents. Make array node for
// the root where each element points to the corresponding original
// parent.<br>
// <embed src="images/SingletonMerge_DiffRootDiffPar.svg"
// type="image/svg+xml"/></p>
//
// @param a the first {@link SingletonPredictionContext}
// @param b the second {@link SingletonPredictionContext}
// @param rootIsWildcard {@code true} if this is a local-context merge,
// otherwise false to indicate a full-context merge
// @param mergeCache
// /


function mergeSingletons(a, b, rootIsWildcard, mergeCache) {
  if (mergeCache !== null) {
    var previous = mergeCache.get(a, b);

    if (previous !== null) {
      return previous;
    }

    previous = mergeCache.get(b, a);

    if (previous !== null) {
      return previous;
    }
  }

  var rootMerge = mergeRoot(a, b, rootIsWildcard);

  if (rootMerge !== null) {
    if (mergeCache !== null) {
      mergeCache.set(a, b, rootMerge);
    }

    return rootMerge;
  }

  if (a.returnState === b.returnState) {
    var parent = merge(a.parentCtx, b.parentCtx, rootIsWildcard, mergeCache); // if parent is same as existing a or b parent or reduced to a parent,
    // return it

    if (parent === a.parentCtx) {
      return a; // ax + bx = ax, if a=b
    }

    if (parent === b.parentCtx) {
      return b; // ax + bx = bx, if a=b
    } // else: ax + ay = a'[x,y]
    // merge parents x and y, giving array node with x,y then remainders
    // of those graphs. dup a, a' points at merged array
    // new joined parent so create new singleton pointing to it, a'


    var spc = SingletonPredictionContext.create(parent, a.returnState);

    if (mergeCache !== null) {
      mergeCache.set(a, b, spc);
    }

    return spc;
  } else {
    // a != b payloads differ
    // see if we can collapse parents due to $+x parents if local ctx
    var singleParent = null;

    if (a === b || a.parentCtx !== null && a.parentCtx === b.parentCtx) {
      // ax +
      // bx =
      // [a,b]x
      singleParent = a.parentCtx;
    }

    if (singleParent !== null) {
      // parents are same
      // sort payloads and use same parent
      var payloads = [a.returnState, b.returnState];

      if (a.returnState > b.returnState) {
        payloads[0] = b.returnState;
        payloads[1] = a.returnState;
      }

      var parents = [singleParent, singleParent];
      var apc = new ArrayPredictionContext(parents, payloads);

      if (mergeCache !== null) {
        mergeCache.set(a, b, apc);
      }

      return apc;
    } // parents differ and can't merge them. Just pack together
    // into array; can't merge.
    // ax + by = [ax,by]


    var payloads = [a.returnState, b.returnState];
    var parents = [a.parentCtx, b.parentCtx];

    if (a.returnState > b.returnState) {
      // sort by payload
      payloads[0] = b.returnState;
      payloads[1] = a.returnState;
      parents = [b.parentCtx, a.parentCtx];
    }

    var a_ = new ArrayPredictionContext(parents, payloads);

    if (mergeCache !== null) {
      mergeCache.set(a, b, a_);
    }

    return a_;
  }
} //
// Handle case where at least one of {@code a} or {@code b} is
// {@link //EMPTY}. In the following diagrams, the symbol {@code $} is used
// to represent {@link //EMPTY}.
//
// <h2>Local-Context Merges</h2>
//
// <p>These local-context merge operations are used when {@code rootIsWildcard}
// is true.</p>
//
// <p>{@link //EMPTY} is superset of any graph; return {@link //EMPTY}.<br>
// <embed src="images/LocalMerge_EmptyRoot.svg" type="image/svg+xml"/></p>
//
// <p>{@link //EMPTY} and anything is {@code //EMPTY}, so merged parent is
// {@code //EMPTY}; return left graph.<br>
// <embed src="images/LocalMerge_EmptyParent.svg" type="image/svg+xml"/></p>
//
// <p>Special case of last merge if local context.<br>
// <embed src="images/LocalMerge_DiffRoots.svg" type="image/svg+xml"/></p>
//
// <h2>Full-Context Merges</h2>
//
// <p>These full-context merge operations are used when {@code rootIsWildcard}
// is false.</p>
//
// <p><embed src="images/FullMerge_EmptyRoots.svg" type="image/svg+xml"/></p>
//
// <p>Must keep all contexts; {@link //EMPTY} in array is a special value (and
// null parent).<br>
// <embed src="images/FullMerge_EmptyRoot.svg" type="image/svg+xml"/></p>
//
// <p><embed src="images/FullMerge_SameRoot.svg" type="image/svg+xml"/></p>
//
// @param a the first {@link SingletonPredictionContext}
// @param b the second {@link SingletonPredictionContext}
// @param rootIsWildcard {@code true} if this is a local-context merge,
// otherwise false to indicate a full-context merge
// /


function mergeRoot(a, b, rootIsWildcard) {
  if (rootIsWildcard) {
    if (a === PredictionContext.EMPTY) {
      return PredictionContext.EMPTY; // // + b =//
    }

    if (b === PredictionContext.EMPTY) {
      return PredictionContext.EMPTY; // a +// =//
    }
  } else {
    if (a === PredictionContext.EMPTY && b === PredictionContext.EMPTY) {
      return PredictionContext.EMPTY; // $ + $ = $
    } else if (a === PredictionContext.EMPTY) {
      // $ + x = [$,x]
      var payloads = [b.returnState, PredictionContext.EMPTY_RETURN_STATE];
      var parents = [b.parentCtx, null];
      return new ArrayPredictionContext(parents, payloads);
    } else if (b === PredictionContext.EMPTY) {
      // x + $ = [$,x] ($ is always first if present)
      var payloads = [a.returnState, PredictionContext.EMPTY_RETURN_STATE];
      var parents = [a.parentCtx, null];
      return new ArrayPredictionContext(parents, payloads);
    }
  }

  return null;
} //
// Merge two {@link ArrayPredictionContext} instances.
//
// <p>Different tops, different parents.<br>
// <embed src="images/ArrayMerge_DiffTopDiffPar.svg" type="image/svg+xml"/></p>
//
// <p>Shared top, same parents.<br>
// <embed src="images/ArrayMerge_ShareTopSamePar.svg" type="image/svg+xml"/></p>
//
// <p>Shared top, different parents.<br>
// <embed src="images/ArrayMerge_ShareTopDiffPar.svg" type="image/svg+xml"/></p>
//
// <p>Shared top, all shared parents.<br>
// <embed src="images/ArrayMerge_ShareTopSharePar.svg"
// type="image/svg+xml"/></p>
//
// <p>Equal tops, merge parents and reduce top to
// {@link SingletonPredictionContext}.<br>
// <embed src="images/ArrayMerge_EqualTop.svg" type="image/svg+xml"/></p>
// /


function mergeArrays(a, b, rootIsWildcard, mergeCache) {
  if (mergeCache !== null) {
    var previous = mergeCache.get(a, b);

    if (previous !== null) {
      return previous;
    }

    previous = mergeCache.get(b, a);

    if (previous !== null) {
      return previous;
    }
  } // merge sorted payloads a + b => M


  var i = 0; // walks a

  var j = 0; // walks b

  var k = 0; // walks target M array

  var mergedReturnStates = [];
  var mergedParents = []; // walk and merge to yield mergedParents, mergedReturnStates

  while (i < a.returnStates.length && j < b.returnStates.length) {
    var a_parent = a.parents[i];
    var b_parent = b.parents[j];

    if (a.returnStates[i] === b.returnStates[j]) {
      // same payload (stack tops are equal), must yield merged singleton
      var payload = a.returnStates[i]; // $+$ = $

      var bothDollars = payload === PredictionContext.EMPTY_RETURN_STATE && a_parent === null && b_parent === null;
      var ax_ax = a_parent !== null && b_parent !== null && a_parent === b_parent; // ax+ax
      // ->
      // ax

      if (bothDollars || ax_ax) {
        mergedParents[k] = a_parent; // choose left

        mergedReturnStates[k] = payload;
      } else {
        // ax+ay -> a'[x,y]
        var mergedParent = merge(a_parent, b_parent, rootIsWildcard, mergeCache);
        mergedParents[k] = mergedParent;
        mergedReturnStates[k] = payload;
      }

      i += 1; // hop over left one as usual

      j += 1; // but also skip one in right side since we merge
    } else if (a.returnStates[i] < b.returnStates[j]) {
      // copy a[i] to M
      mergedParents[k] = a_parent;
      mergedReturnStates[k] = a.returnStates[i];
      i += 1;
    } else {
      // b > a, copy b[j] to M
      mergedParents[k] = b_parent;
      mergedReturnStates[k] = b.returnStates[j];
      j += 1;
    }

    k += 1;
  } // copy over any payloads remaining in either array


  if (i < a.returnStates.length) {
    for (var p = i; p < a.returnStates.length; p++) {
      mergedParents[k] = a.parents[p];
      mergedReturnStates[k] = a.returnStates[p];
      k += 1;
    }
  } else {
    for (var p = j; p < b.returnStates.length; p++) {
      mergedParents[k] = b.parents[p];
      mergedReturnStates[k] = b.returnStates[p];
      k += 1;
    }
  } // trim merged if we combined a few that had same stack tops


  if (k < mergedParents.length) {
    // write index < last position; trim
    if (k === 1) {
      // for just one merged element, return singleton top
      var a_ = SingletonPredictionContext.create(mergedParents[0], mergedReturnStates[0]);

      if (mergeCache !== null) {
        mergeCache.set(a, b, a_);
      }

      return a_;
    }

    mergedParents = mergedParents.slice(0, k);
    mergedReturnStates = mergedReturnStates.slice(0, k);
  }

  var M = new ArrayPredictionContext(mergedParents, mergedReturnStates); // if we created same array as a or b, return that instead
  // TODO: track whether this is possible above during merge sort for speed

  if (M === a) {
    if (mergeCache !== null) {
      mergeCache.set(a, b, a);
    }

    return a;
  }

  if (M === b) {
    if (mergeCache !== null) {
      mergeCache.set(a, b, b);
    }

    return b;
  }

  combineCommonParents(mergedParents);

  if (mergeCache !== null) {
    mergeCache.set(a, b, M);
  }

  return M;
} //
// Make pass over all <em>M</em> {@code parents}; merge any {@code equals()}
// ones.
// /


function combineCommonParents(parents) {
  var uniqueParents = {};

  for (var p = 0; p < parents.length; p++) {
    var parent = parents[p];

    if (!(parent in uniqueParents)) {
      uniqueParents[parent] = parent;
    }
  }

  for (var q = 0; q < parents.length; q++) {
    parents[q] = uniqueParents[parents[q]];
  }
}

function getCachedPredictionContext(context, contextCache, visited) {
  if (context.isEmpty()) {
    return context;
  }

  var existing = visited[context] || null;

  if (existing !== null) {
    return existing;
  }

  existing = contextCache.get(context);

  if (existing !== null) {
    visited[context] = existing;
    return existing;
  }

  var changed = false;
  var parents = [];

  for (var i = 0; i < parents.length; i++) {
    var parent = getCachedPredictionContext(context.getParent(i), contextCache, visited);

    if (changed || parent !== context.getParent(i)) {
      if (!changed) {
        parents = [];

        for (var j = 0; j < context.length; j++) {
          parents[j] = context.getParent(j);
        }

        changed = true;
      }

      parents[i] = parent;
    }
  }

  if (!changed) {
    contextCache.add(context);
    visited[context] = context;
    return context;
  }

  var updated = null;

  if (parents.length === 0) {
    updated = PredictionContext.EMPTY;
  } else if (parents.length === 1) {
    updated = SingletonPredictionContext.create(parents[0], context.getReturnState(0));
  } else {
    updated = new ArrayPredictionContext(parents, context.returnStates);
  }

  contextCache.add(updated);
  visited[updated] = updated;
  visited[context] = updated;
  return updated;
} // ter's recursive version of Sam's getAllNodes()


function getAllContextNodes(context, nodes, visited) {
  if (nodes === null) {
    nodes = [];
    return getAllContextNodes(context, nodes, visited);
  } else if (visited === null) {
    visited = {};
    return getAllContextNodes(context, nodes, visited);
  } else {
    if (context === null || visited[context] !== null) {
      return nodes;
    }

    visited[context] = context;
    nodes.push(context);

    for (var i = 0; i < context.length; i++) {
      getAllContextNodes(context.getParent(i), nodes, visited);
    }

    return nodes;
  }
}

exports.merge = merge;
exports.PredictionContext = PredictionContext;
exports.PredictionContextCache = PredictionContextCache;
exports.SingletonPredictionContext = SingletonPredictionContext;
exports.predictionContextFromRuleContext = predictionContextFromRuleContext;
exports.getCachedPredictionContext = getCachedPredictionContext;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

var LL1Analyzer = __webpack_require__(91).LL1Analyzer;

var IntervalSet = __webpack_require__(4).IntervalSet;

function ATN(grammarType, maxTokenType) {
  // Used for runtime deserialization of ATNs from strings///
  // The type of the ATN.
  this.grammarType = grammarType; // The maximum value for any symbol recognized by a transition in the ATN.

  this.maxTokenType = maxTokenType;
  this.states = []; // Each subrule/rule is a decision point and we must track them so we
  //  can go back later and build DFA predictors for them.  This includes
  //  all the rules, subrules, optional blocks, ()+, ()* etc...

  this.decisionToState = []; // Maps from rule index to starting state number.

  this.ruleToStartState = []; // Maps from rule index to stop state number.

  this.ruleToStopState = null;
  this.modeNameToStartState = {}; // For lexer ATNs, this maps the rule index to the resulting token type.
  // For parser ATNs, this maps the rule index to the generated bypass token
  // type if the
  // {@link ATNDeserializationOptions//isGenerateRuleBypassTransitions}
  // deserialization option was specified; otherwise, this is {@code null}.

  this.ruleToTokenType = null; // For lexer ATNs, this is an array of {@link LexerAction} objects which may
  // be referenced by action transitions in the ATN.

  this.lexerActions = null;
  this.modeToStartState = [];
  return this;
} // Compute the set of valid tokens that can occur starting in state {@code s}.
//  If {@code ctx} is null, the set of tokens will not include what can follow
//  the rule surrounding {@code s}. In other words, the set will be
//  restricted to tokens reachable staying within {@code s}'s rule.


ATN.prototype.nextTokensInContext = function (s, ctx) {
  var anal = new LL1Analyzer(this);
  return anal.LOOK(s, null, ctx);
}; // Compute the set of valid tokens that can occur starting in {@code s} and
// staying in same rule. {@link Token//EPSILON} is in set if we reach end of
// rule.


ATN.prototype.nextTokensNoContext = function (s) {
  if (s.nextTokenWithinRule !== null) {
    return s.nextTokenWithinRule;
  }

  s.nextTokenWithinRule = this.nextTokensInContext(s, null);
  s.nextTokenWithinRule.readOnly = true;
  return s.nextTokenWithinRule;
};

ATN.prototype.nextTokens = function (s, ctx) {
  if (ctx === undefined) {
    return this.nextTokensNoContext(s);
  } else {
    return this.nextTokensInContext(s, ctx);
  }
};

ATN.prototype.addState = function (state) {
  if (state !== null) {
    state.atn = this;
    state.stateNumber = this.states.length;
  }

  this.states.push(state);
};

ATN.prototype.removeState = function (state) {
  this.states[state.stateNumber] = null; // just free mem, don't shift states in list
};

ATN.prototype.defineDecisionState = function (s) {
  this.decisionToState.push(s);
  s.decision = this.decisionToState.length - 1;
  return s.decision;
};

ATN.prototype.getDecisionState = function (decision) {
  if (this.decisionToState.length === 0) {
    return null;
  } else {
    return this.decisionToState[decision];
  }
}; // Computes the set of input symbols which could follow ATN state number
// {@code stateNumber} in the specified full {@code context}. This method
// considers the complete parser context, but does not evaluate semantic
// predicates (i.e. all predicates encountered during the calculation are
// assumed true). If a path in the ATN exists from the starting state to the
// {@link RuleStopState} of the outermost context without matching any
// symbols, {@link Token//EOF} is added to the returned set.
//
// <p>If {@code context} is {@code null}, it is treated as
// {@link ParserRuleContext//EMPTY}.</p>
//
// @param stateNumber the ATN state number
// @param context the full parse context
// @return The set of potentially valid input symbols which could follow the
// specified state in the specified context.
// @throws IllegalArgumentException if the ATN does not contain a state with
// number {@code stateNumber}


var Token = __webpack_require__(3).Token;

ATN.prototype.getExpectedTokens = function (stateNumber, ctx) {
  if (stateNumber < 0 || stateNumber >= this.states.length) {
    throw "Invalid state number.";
  }

  var s = this.states[stateNumber];
  var following = this.nextTokens(s);

  if (!following.contains(Token.EPSILON)) {
    return following;
  }

  var expected = new IntervalSet();
  expected.addSet(following);
  expected.removeOne(Token.EPSILON);

  while (ctx !== null && ctx.invokingState >= 0 && following.contains(Token.EPSILON)) {
    var invokingState = this.states[ctx.invokingState];
    var rt = invokingState.transitions[0];
    following = this.nextTokens(rt.followState);
    expected.addSet(following);
    expected.removeOne(Token.EPSILON);
    ctx = ctx.parentCtx;
  }

  if (following.contains(Token.EPSILON)) {
    expected.addOne(Token.EOF);
  }

  return expected;
};

ATN.INVALID_ALT_NUMBER = 0;
exports.ATN = ATN;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
//  An ATN transition between any two ATN states.  Subclasses define
//  atom, set, epsilon, action, predicate, rule transitions.
//
//  <p>This is a one way link.  It emanates from a state (usually via a list of
//  transitions) and has a target state.</p>
//
//  <p>Since we never have to change the ATN transitions once we construct it,
//  we can fix these transitions as specific classes. The DFA transitions
//  on the other hand need to update the labels as it adds transitions to
//  the states. We'll use the term Edge for the DFA to distinguish them from
//  ATN transitions.</p>

var Token = __webpack_require__(3).Token;

var Interval = __webpack_require__(4).Interval;

var IntervalSet = __webpack_require__(4).IntervalSet;

var Predicate = __webpack_require__(14).Predicate;

var PrecedencePredicate = __webpack_require__(14).PrecedencePredicate;

function Transition(target) {
  // The target of this transition.
  if (target === undefined || target === null) {
    throw "target cannot be null.";
  }

  this.target = target; // Are we epsilon, action, sempred?

  this.isEpsilon = false;
  this.label = null;
  return this;
} // constants for serialization


Transition.EPSILON = 1;
Transition.RANGE = 2;
Transition.RULE = 3;
Transition.PREDICATE = 4; // e.g., {isType(input.LT(1))}?

Transition.ATOM = 5;
Transition.ACTION = 6;
Transition.SET = 7; // ~(A|B) or ~atom, wildcard, which convert to next 2

Transition.NOT_SET = 8;
Transition.WILDCARD = 9;
Transition.PRECEDENCE = 10;
Transition.serializationNames = ["INVALID", "EPSILON", "RANGE", "RULE", "PREDICATE", "ATOM", "ACTION", "SET", "NOT_SET", "WILDCARD", "PRECEDENCE"];
Transition.serializationTypes = {
  EpsilonTransition: Transition.EPSILON,
  RangeTransition: Transition.RANGE,
  RuleTransition: Transition.RULE,
  PredicateTransition: Transition.PREDICATE,
  AtomTransition: Transition.ATOM,
  ActionTransition: Transition.ACTION,
  SetTransition: Transition.SET,
  NotSetTransition: Transition.NOT_SET,
  WildcardTransition: Transition.WILDCARD,
  PrecedencePredicateTransition: Transition.PRECEDENCE
}; // TODO: make all transitions sets? no, should remove set edges

function AtomTransition(target, label) {
  Transition.call(this, target);
  this.label_ = label; // The token type or character value; or, signifies special label.

  this.label = this.makeLabel();
  this.serializationType = Transition.ATOM;
  return this;
}

AtomTransition.prototype = Object.create(Transition.prototype);
AtomTransition.prototype.constructor = AtomTransition;

AtomTransition.prototype.makeLabel = function () {
  var s = new IntervalSet();
  s.addOne(this.label_);
  return s;
};

AtomTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return this.label_ === symbol;
};

AtomTransition.prototype.toString = function () {
  return this.label_;
};

function RuleTransition(ruleStart, ruleIndex, precedence, followState) {
  Transition.call(this, ruleStart);
  this.ruleIndex = ruleIndex; // ptr to the rule definition object for this rule ref

  this.precedence = precedence;
  this.followState = followState; // what node to begin computations following ref to rule

  this.serializationType = Transition.RULE;
  this.isEpsilon = true;
  return this;
}

RuleTransition.prototype = Object.create(Transition.prototype);
RuleTransition.prototype.constructor = RuleTransition;

RuleTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return false;
};

function EpsilonTransition(target, outermostPrecedenceReturn) {
  Transition.call(this, target);
  this.serializationType = Transition.EPSILON;
  this.isEpsilon = true;
  this.outermostPrecedenceReturn = outermostPrecedenceReturn;
  return this;
}

EpsilonTransition.prototype = Object.create(Transition.prototype);
EpsilonTransition.prototype.constructor = EpsilonTransition;

EpsilonTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return false;
};

EpsilonTransition.prototype.toString = function () {
  return "epsilon";
};

function RangeTransition(target, start, stop) {
  Transition.call(this, target);
  this.serializationType = Transition.RANGE;
  this.start = start;
  this.stop = stop;
  this.label = this.makeLabel();
  return this;
}

RangeTransition.prototype = Object.create(Transition.prototype);
RangeTransition.prototype.constructor = RangeTransition;

RangeTransition.prototype.makeLabel = function () {
  var s = new IntervalSet();
  s.addRange(this.start, this.stop);
  return s;
};

RangeTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return symbol >= this.start && symbol <= this.stop;
};

RangeTransition.prototype.toString = function () {
  return "'" + String.fromCharCode(this.start) + "'..'" + String.fromCharCode(this.stop) + "'";
};

function AbstractPredicateTransition(target) {
  Transition.call(this, target);
  return this;
}

AbstractPredicateTransition.prototype = Object.create(Transition.prototype);
AbstractPredicateTransition.prototype.constructor = AbstractPredicateTransition;

function PredicateTransition(target, ruleIndex, predIndex, isCtxDependent) {
  AbstractPredicateTransition.call(this, target);
  this.serializationType = Transition.PREDICATE;
  this.ruleIndex = ruleIndex;
  this.predIndex = predIndex;
  this.isCtxDependent = isCtxDependent; // e.g., $i ref in pred

  this.isEpsilon = true;
  return this;
}

PredicateTransition.prototype = Object.create(AbstractPredicateTransition.prototype);
PredicateTransition.prototype.constructor = PredicateTransition;

PredicateTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return false;
};

PredicateTransition.prototype.getPredicate = function () {
  return new Predicate(this.ruleIndex, this.predIndex, this.isCtxDependent);
};

PredicateTransition.prototype.toString = function () {
  return "pred_" + this.ruleIndex + ":" + this.predIndex;
};

function ActionTransition(target, ruleIndex, actionIndex, isCtxDependent) {
  Transition.call(this, target);
  this.serializationType = Transition.ACTION;
  this.ruleIndex = ruleIndex;
  this.actionIndex = actionIndex === undefined ? -1 : actionIndex;
  this.isCtxDependent = isCtxDependent === undefined ? false : isCtxDependent; // e.g., $i ref in pred

  this.isEpsilon = true;
  return this;
}

ActionTransition.prototype = Object.create(Transition.prototype);
ActionTransition.prototype.constructor = ActionTransition;

ActionTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return false;
};

ActionTransition.prototype.toString = function () {
  return "action_" + this.ruleIndex + ":" + this.actionIndex;
}; // A transition containing a set of values.


function SetTransition(target, set) {
  Transition.call(this, target);
  this.serializationType = Transition.SET;

  if (set !== undefined && set !== null) {
    this.label = set;
  } else {
    this.label = new IntervalSet();
    this.label.addOne(Token.INVALID_TYPE);
  }

  return this;
}

SetTransition.prototype = Object.create(Transition.prototype);
SetTransition.prototype.constructor = SetTransition;

SetTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return this.label.contains(symbol);
};

SetTransition.prototype.toString = function () {
  return this.label.toString();
};

function NotSetTransition(target, set) {
  SetTransition.call(this, target, set);
  this.serializationType = Transition.NOT_SET;
  return this;
}

NotSetTransition.prototype = Object.create(SetTransition.prototype);
NotSetTransition.prototype.constructor = NotSetTransition;

NotSetTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return symbol >= minVocabSymbol && symbol <= maxVocabSymbol && !SetTransition.prototype.matches.call(this, symbol, minVocabSymbol, maxVocabSymbol);
};

NotSetTransition.prototype.toString = function () {
  return '~' + SetTransition.prototype.toString.call(this);
};

function WildcardTransition(target) {
  Transition.call(this, target);
  this.serializationType = Transition.WILDCARD;
  return this;
}

WildcardTransition.prototype = Object.create(Transition.prototype);
WildcardTransition.prototype.constructor = WildcardTransition;

WildcardTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return symbol >= minVocabSymbol && symbol <= maxVocabSymbol;
};

WildcardTransition.prototype.toString = function () {
  return ".";
};

function PrecedencePredicateTransition(target, precedence) {
  AbstractPredicateTransition.call(this, target);
  this.serializationType = Transition.PRECEDENCE;
  this.precedence = precedence;
  this.isEpsilon = true;
  return this;
}

PrecedencePredicateTransition.prototype = Object.create(AbstractPredicateTransition.prototype);
PrecedencePredicateTransition.prototype.constructor = PrecedencePredicateTransition;

PrecedencePredicateTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
  return false;
};

PrecedencePredicateTransition.prototype.getPredicate = function () {
  return new PrecedencePredicate(this.precedence);
};

PrecedencePredicateTransition.prototype.toString = function () {
  return this.precedence + " >= _p";
};

exports.Transition = Transition;
exports.AtomTransition = AtomTransition;
exports.SetTransition = SetTransition;
exports.NotSetTransition = NotSetTransition;
exports.RuleTransition = RuleTransition;
exports.ActionTransition = ActionTransition;
exports.EpsilonTransition = EpsilonTransition;
exports.RangeTransition = RangeTransition;
exports.WildcardTransition = WildcardTransition;
exports.PredicateTransition = PredicateTransition;
exports.PrecedencePredicateTransition = PrecedencePredicateTransition;
exports.AbstractPredicateTransition = AbstractPredicateTransition;

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
// Specialized {@link Set}{@code <}{@link ATNConfig}{@code >} that can track
// info about the set, with support for combining similar configurations using a
// graph-structured stack.
///

var ATN = __webpack_require__(9).ATN;

var Utils = __webpack_require__(2);

var Hash = Utils.Hash;
var Set = Utils.Set;

var SemanticContext = __webpack_require__(14).SemanticContext;

var merge = __webpack_require__(8).merge;

function hashATNConfig(c) {
  return c.hashCodeForConfigSet();
}

function equalATNConfigs(a, b) {
  if (a === b) {
    return true;
  } else if (a === null || b === null) {
    return false;
  } else return a.equalsForConfigSet(b);
}

function ATNConfigSet(fullCtx) {
  //
  // The reason that we need this is because we don't want the hash map to use
  // the standard hash code and equals. We need all configurations with the
  // same
  // {@code (s,i,_,semctx)} to be equal. Unfortunately, this key effectively
  // doubles
  // the number of objects associated with ATNConfigs. The other solution is
  // to
  // use a hash table that lets us specify the equals/hashcode operation.
  // All configs but hashed by (s, i, _, pi) not including context. Wiped out
  // when we go readonly as this set becomes a DFA state.
  this.configLookup = new Set(hashATNConfig, equalATNConfigs); // Indicates that this configuration set is part of a full context
  // LL prediction. It will be used to determine how to merge $. With SLL
  // it's a wildcard whereas it is not for LL context merge.

  this.fullCtx = fullCtx === undefined ? true : fullCtx; // Indicates that the set of configurations is read-only. Do not
  // allow any code to manipulate the set; DFA states will point at
  // the sets and they must not change. This does not protect the other
  // fields; in particular, conflictingAlts is set after
  // we've made this readonly.

  this.readOnly = false; // Track the elements as they are added to the set; supports get(i)///

  this.configs = []; // TODO: these fields make me pretty uncomfortable but nice to pack up info
  // together, saves recomputation
  // TODO: can we track conflicts as they are added to save scanning configs
  // later?

  this.uniqueAlt = 0;
  this.conflictingAlts = null; // Used in parser and lexer. In lexer, it indicates we hit a pred
  // while computing a closure operation. Don't make a DFA state from this.

  this.hasSemanticContext = false;
  this.dipsIntoOuterContext = false;
  this.cachedHashCode = -1;
  return this;
} // Adding a new config means merging contexts with existing configs for
// {@code (s, i, pi, _)}, where {@code s} is the
// {@link ATNConfig//state}, {@code i} is the {@link ATNConfig//alt}, and
// {@code pi} is the {@link ATNConfig//semanticContext}. We use
// {@code (s,i,pi)} as key.
//
// <p>This method updates {@link //dipsIntoOuterContext} and
// {@link //hasSemanticContext} when necessary.</p>
// /


ATNConfigSet.prototype.add = function (config, mergeCache) {
  if (mergeCache === undefined) {
    mergeCache = null;
  }

  if (this.readOnly) {
    throw "This set is readonly";
  }

  if (config.semanticContext !== SemanticContext.NONE) {
    this.hasSemanticContext = true;
  }

  if (config.reachesIntoOuterContext > 0) {
    this.dipsIntoOuterContext = true;
  }

  var existing = this.configLookup.add(config);

  if (existing === config) {
    this.cachedHashCode = -1;
    this.configs.push(config); // track order here

    return true;
  } // a previous (s,i,pi,_), merge with it and save result


  var rootIsWildcard = !this.fullCtx;
  var merged = merge(existing.context, config.context, rootIsWildcard, mergeCache); // no need to check for existing.context, config.context in cache
  // since only way to create new graphs is "call rule" and here. We
  // cache at both places.

  existing.reachesIntoOuterContext = Math.max(existing.reachesIntoOuterContext, config.reachesIntoOuterContext); // make sure to preserve the precedence filter suppression during the merge

  if (config.precedenceFilterSuppressed) {
    existing.precedenceFilterSuppressed = true;
  }

  existing.context = merged; // replace context; no need to alt mapping

  return true;
};

ATNConfigSet.prototype.getStates = function () {
  var states = new Set();

  for (var i = 0; i < this.configs.length; i++) {
    states.add(this.configs[i].state);
  }

  return states;
};

ATNConfigSet.prototype.getPredicates = function () {
  var preds = [];

  for (var i = 0; i < this.configs.length; i++) {
    var c = this.configs[i].semanticContext;

    if (c !== SemanticContext.NONE) {
      preds.push(c.semanticContext);
    }
  }

  return preds;
};

Object.defineProperty(ATNConfigSet.prototype, "items", {
  get: function get() {
    return this.configs;
  }
});

ATNConfigSet.prototype.optimizeConfigs = function (interpreter) {
  if (this.readOnly) {
    throw "This set is readonly";
  }

  if (this.configLookup.length === 0) {
    return;
  }

  for (var i = 0; i < this.configs.length; i++) {
    var config = this.configs[i];
    config.context = interpreter.getCachedContext(config.context);
  }
};

ATNConfigSet.prototype.addAll = function (coll) {
  for (var i = 0; i < coll.length; i++) {
    this.add(coll[i]);
  }

  return false;
};

ATNConfigSet.prototype.equals = function (other) {
  return this === other || other instanceof ATNConfigSet && Utils.equalArrays(this.configs, other.configs) && this.fullCtx === other.fullCtx && this.uniqueAlt === other.uniqueAlt && this.conflictingAlts === other.conflictingAlts && this.hasSemanticContext === other.hasSemanticContext && this.dipsIntoOuterContext === other.dipsIntoOuterContext;
};

ATNConfigSet.prototype.hashCode = function () {
  var hash = new Hash();
  this.updateHashCode(hash);
  return hash.finish();
};

ATNConfigSet.prototype.updateHashCode = function (hash) {
  if (this.readOnly) {
    if (this.cachedHashCode === -1) {
      var hash = new Hash();
      hash.update(this.configs);
      this.cachedHashCode = hash.finish();
    }

    hash.update(this.cachedHashCode);
  } else {
    hash.update(this.configs);
  }
};

Object.defineProperty(ATNConfigSet.prototype, "length", {
  get: function get() {
    return this.configs.length;
  }
});

ATNConfigSet.prototype.isEmpty = function () {
  return this.configs.length === 0;
};

ATNConfigSet.prototype.contains = function (item) {
  if (this.configLookup === null) {
    throw "This method is not implemented for readonly sets.";
  }

  return this.configLookup.contains(item);
};

ATNConfigSet.prototype.containsFast = function (item) {
  if (this.configLookup === null) {
    throw "This method is not implemented for readonly sets.";
  }

  return this.configLookup.containsFast(item);
};

ATNConfigSet.prototype.clear = function () {
  if (this.readOnly) {
    throw "This set is readonly";
  }

  this.configs = [];
  this.cachedHashCode = -1;
  this.configLookup = new Set();
};

ATNConfigSet.prototype.setReadonly = function (readOnly) {
  this.readOnly = readOnly;

  if (readOnly) {
    this.configLookup = null; // can't mod, no need for lookup cache
  }
};

ATNConfigSet.prototype.toString = function () {
  return Utils.arrayToString(this.configs) + (this.hasSemanticContext ? ",hasSemanticContext=" + this.hasSemanticContext : "") + (this.uniqueAlt !== ATN.INVALID_ALT_NUMBER ? ",uniqueAlt=" + this.uniqueAlt : "") + (this.conflictingAlts !== null ? ",conflictingAlts=" + this.conflictingAlts : "") + (this.dipsIntoOuterContext ? ",dipsIntoOuterContext" : "");
};

function OrderedATNConfigSet() {
  ATNConfigSet.call(this);
  this.configLookup = new Set();
  return this;
}

OrderedATNConfigSet.prototype = Object.create(ATNConfigSet.prototype);
OrderedATNConfigSet.prototype.constructor = OrderedATNConfigSet;
exports.ATNConfigSet = ATNConfigSet;
exports.OrderedATNConfigSet = OrderedATNConfigSet;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

exports.atn = __webpack_require__(90);
exports.codepointat = __webpack_require__(45);
exports.dfa = __webpack_require__(97);
exports.fromcodepoint = __webpack_require__(46);
exports.tree = __webpack_require__(99);
exports.error = __webpack_require__(100);
exports.Token = __webpack_require__(3).Token;
exports.CharStreams = __webpack_require__(102).CharStreams;
exports.CommonToken = __webpack_require__(3).CommonToken;
exports.InputStream = __webpack_require__(29).InputStream;
exports.FileStream = __webpack_require__(103).FileStream;
exports.CommonTokenStream = __webpack_require__(104).CommonTokenStream;
exports.Lexer = __webpack_require__(21).Lexer;
exports.Parser = __webpack_require__(106).Parser;

var pc = __webpack_require__(8);

exports.PredictionContextCache = pc.PredictionContextCache;
exports.ParserRuleContext = __webpack_require__(28).ParserRuleContext;
exports.Interval = __webpack_require__(4).Interval;
exports.Utils = __webpack_require__(2);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
// A tree structure used to record the semantic context in which
//  an ATN configuration is valid.  It's either a single predicate,
//  a conjunction {@code p1&&p2}, or a sum of products {@code p1||p2}.
//
//  <p>I have scoped the {@link AND}, {@link OR}, and {@link Predicate} subclasses of
//  {@link SemanticContext} within the scope of this outer class.</p>
//

var Set = __webpack_require__(2).Set;

var Hash = __webpack_require__(2).Hash;

function SemanticContext() {
  return this;
}

SemanticContext.prototype.hashCode = function () {
  var hash = new Hash();
  this.updateHashCode(hash);
  return hash.finish();
}; // For context independent predicates, we evaluate them without a local
// context (i.e., null context). That way, we can evaluate them without
// having to create proper rule-specific context during prediction (as
// opposed to the parser, which creates them naturally). In a practical
// sense, this avoids a cast exception from RuleContext to myruleContext.
//
// <p>For context dependent predicates, we must pass in a local context so that
// references such as $arg evaluate properly as _localctx.arg. We only
// capture context dependent predicates in the context in which we begin
// prediction, so we passed in the outer context here in case of context
// dependent predicate evaluation.</p>
//


SemanticContext.prototype.evaluate = function (parser, outerContext) {}; //
// Evaluate the precedence predicates for the context and reduce the result.
//
// @param parser The parser instance.
// @param outerContext The current parser context object.
// @return The simplified semantic context after precedence predicates are
// evaluated, which will be one of the following values.
// <ul>
// <li>{@link //NONE}: if the predicate simplifies to {@code true} after
// precedence predicates are evaluated.</li>
// <li>{@code null}: if the predicate simplifies to {@code false} after
// precedence predicates are evaluated.</li>
// <li>{@code this}: if the semantic context is not changed as a result of
// precedence predicate evaluation.</li>
// <li>A non-{@code null} {@link SemanticContext}: the new simplified
// semantic context after precedence predicates are evaluated.</li>
// </ul>
//


SemanticContext.prototype.evalPrecedence = function (parser, outerContext) {
  return this;
};

SemanticContext.andContext = function (a, b) {
  if (a === null || a === SemanticContext.NONE) {
    return b;
  }

  if (b === null || b === SemanticContext.NONE) {
    return a;
  }

  var result = new AND(a, b);

  if (result.opnds.length === 1) {
    return result.opnds[0];
  } else {
    return result;
  }
};

SemanticContext.orContext = function (a, b) {
  if (a === null) {
    return b;
  }

  if (b === null) {
    return a;
  }

  if (a === SemanticContext.NONE || b === SemanticContext.NONE) {
    return SemanticContext.NONE;
  }

  var result = new OR(a, b);

  if (result.opnds.length === 1) {
    return result.opnds[0];
  } else {
    return result;
  }
};

function Predicate(ruleIndex, predIndex, isCtxDependent) {
  SemanticContext.call(this);
  this.ruleIndex = ruleIndex === undefined ? -1 : ruleIndex;
  this.predIndex = predIndex === undefined ? -1 : predIndex;
  this.isCtxDependent = isCtxDependent === undefined ? false : isCtxDependent; // e.g., $i ref in pred

  return this;
}

Predicate.prototype = Object.create(SemanticContext.prototype);
Predicate.prototype.constructor = Predicate; //The default {@link SemanticContext}, which is semantically equivalent to
//a predicate of the form {@code {true}?}.
//

SemanticContext.NONE = new Predicate();

Predicate.prototype.evaluate = function (parser, outerContext) {
  var localctx = this.isCtxDependent ? outerContext : null;
  return parser.sempred(localctx, this.ruleIndex, this.predIndex);
};

Predicate.prototype.updateHashCode = function (hash) {
  hash.update(this.ruleIndex, this.predIndex, this.isCtxDependent);
};

Predicate.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof Predicate)) {
    return false;
  } else {
    return this.ruleIndex === other.ruleIndex && this.predIndex === other.predIndex && this.isCtxDependent === other.isCtxDependent;
  }
};

Predicate.prototype.toString = function () {
  return "{" + this.ruleIndex + ":" + this.predIndex + "}?";
};

function PrecedencePredicate(precedence) {
  SemanticContext.call(this);
  this.precedence = precedence === undefined ? 0 : precedence;
}

PrecedencePredicate.prototype = Object.create(SemanticContext.prototype);
PrecedencePredicate.prototype.constructor = PrecedencePredicate;

PrecedencePredicate.prototype.evaluate = function (parser, outerContext) {
  return parser.precpred(outerContext, this.precedence);
};

PrecedencePredicate.prototype.evalPrecedence = function (parser, outerContext) {
  if (parser.precpred(outerContext, this.precedence)) {
    return SemanticContext.NONE;
  } else {
    return null;
  }
};

PrecedencePredicate.prototype.compareTo = function (other) {
  return this.precedence - other.precedence;
};

PrecedencePredicate.prototype.updateHashCode = function (hash) {
  hash.update(31);
};

PrecedencePredicate.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof PrecedencePredicate)) {
    return false;
  } else {
    return this.precedence === other.precedence;
  }
};

PrecedencePredicate.prototype.toString = function () {
  return "{" + this.precedence + ">=prec}?";
};

PrecedencePredicate.filterPrecedencePredicates = function (set) {
  var result = [];
  set.values().map(function (context) {
    if (context instanceof PrecedencePredicate) {
      result.push(context);
    }
  });
  return result;
}; // A semantic context which is true whenever none of the contained contexts
// is false.
//


function AND(a, b) {
  SemanticContext.call(this);
  var operands = new Set();

  if (a instanceof AND) {
    a.opnds.map(function (o) {
      operands.add(o);
    });
  } else {
    operands.add(a);
  }

  if (b instanceof AND) {
    b.opnds.map(function (o) {
      operands.add(o);
    });
  } else {
    operands.add(b);
  }

  var precedencePredicates = PrecedencePredicate.filterPrecedencePredicates(operands);

  if (precedencePredicates.length > 0) {
    // interested in the transition with the lowest precedence
    var reduced = null;
    precedencePredicates.map(function (p) {
      if (reduced === null || p.precedence < reduced.precedence) {
        reduced = p;
      }
    });
    operands.add(reduced);
  }

  this.opnds = operands.values();
  return this;
}

AND.prototype = Object.create(SemanticContext.prototype);
AND.prototype.constructor = AND;

AND.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof AND)) {
    return false;
  } else {
    return this.opnds === other.opnds;
  }
};

AND.prototype.updateHashCode = function (hash) {
  hash.update(this.opnds, "AND");
}; //
// {@inheritDoc}
//
// <p>
// The evaluation of predicates by this context is short-circuiting, but
// unordered.</p>
//


AND.prototype.evaluate = function (parser, outerContext) {
  for (var i = 0; i < this.opnds.length; i++) {
    if (!this.opnds[i].evaluate(parser, outerContext)) {
      return false;
    }
  }

  return true;
};

AND.prototype.evalPrecedence = function (parser, outerContext) {
  var differs = false;
  var operands = [];

  for (var i = 0; i < this.opnds.length; i++) {
    var context = this.opnds[i];
    var evaluated = context.evalPrecedence(parser, outerContext);
    differs |= evaluated !== context;

    if (evaluated === null) {
      // The AND context is false if any element is false
      return null;
    } else if (evaluated !== SemanticContext.NONE) {
      // Reduce the result by skipping true elements
      operands.push(evaluated);
    }
  }

  if (!differs) {
    return this;
  }

  if (operands.length === 0) {
    // all elements were true, so the AND context is true
    return SemanticContext.NONE;
  }

  var result = null;
  operands.map(function (o) {
    result = result === null ? o : SemanticContext.andContext(result, o);
  });
  return result;
};

AND.prototype.toString = function () {
  var s = "";
  this.opnds.map(function (o) {
    s += "&& " + o.toString();
  });
  return s.length > 3 ? s.slice(3) : s;
}; //
// A semantic context which is true whenever at least one of the contained
// contexts is true.
//


function OR(a, b) {
  SemanticContext.call(this);
  var operands = new Set();

  if (a instanceof OR) {
    a.opnds.map(function (o) {
      operands.add(o);
    });
  } else {
    operands.add(a);
  }

  if (b instanceof OR) {
    b.opnds.map(function (o) {
      operands.add(o);
    });
  } else {
    operands.add(b);
  }

  var precedencePredicates = PrecedencePredicate.filterPrecedencePredicates(operands);

  if (precedencePredicates.length > 0) {
    // interested in the transition with the highest precedence
    var s = precedencePredicates.sort(function (a, b) {
      return a.compareTo(b);
    });
    var reduced = s[s.length - 1];
    operands.add(reduced);
  }

  this.opnds = operands.values();
  return this;
}

OR.prototype = Object.create(SemanticContext.prototype);
OR.prototype.constructor = OR;

OR.prototype.constructor = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof OR)) {
    return false;
  } else {
    return this.opnds === other.opnds;
  }
};

OR.prototype.updateHashCode = function (hash) {
  hash.update(this.opnds, "OR");
}; // <p>
// The evaluation of predicates by this context is short-circuiting, but
// unordered.</p>
//


OR.prototype.evaluate = function (parser, outerContext) {
  for (var i = 0; i < this.opnds.length; i++) {
    if (this.opnds[i].evaluate(parser, outerContext)) {
      return true;
    }
  }

  return false;
};

OR.prototype.evalPrecedence = function (parser, outerContext) {
  var differs = false;
  var operands = [];

  for (var i = 0; i < this.opnds.length; i++) {
    var context = this.opnds[i];
    var evaluated = context.evalPrecedence(parser, outerContext);
    differs |= evaluated !== context;

    if (evaluated === SemanticContext.NONE) {
      // The OR context is true if any element is true
      return SemanticContext.NONE;
    } else if (evaluated !== null) {
      // Reduce the result by skipping false elements
      operands.push(evaluated);
    }
  }

  if (!differs) {
    return this;
  }

  if (operands.length === 0) {
    // all elements were false, so the OR context is false
    return null;
  }

  var result = null;
  operands.map(function (o) {
    return result === null ? o : SemanticContext.orContext(result, o);
  });
  return result;
};

OR.prototype.toString = function () {
  var s = "";
  this.opnds.map(function (o) {
    s += "|| " + o.toString();
  });
  return s.length > 3 ? s.slice(3) : s;
};

exports.SemanticContext = SemanticContext;
exports.PrecedencePredicate = PrecedencePredicate;
exports.Predicate = Predicate;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///

var ATNConfigSet = __webpack_require__(12).ATNConfigSet;

var Utils = __webpack_require__(2);

var Hash = Utils.Hash;
var Set = Utils.Set; // Map a predicate to a predicted alternative.///

function PredPrediction(pred, alt) {
  this.alt = alt;
  this.pred = pred;
  return this;
}

PredPrediction.prototype.toString = function () {
  return "(" + this.pred + ", " + this.alt + ")";
}; // A DFA state represents a set of possible ATN configurations.
// As Aho, Sethi, Ullman p. 117 says "The DFA uses its state
// to keep track of all possible states the ATN can be in after
// reading each input symbol. That is to say, after reading
// input a1a2..an, the DFA is in a state that represents the
// subset T of the states of the ATN that are reachable from the
// ATN's start state along some path labeled a1a2..an."
// In conventional NFA&rarr;DFA conversion, therefore, the subset T
// would be a bitset representing the set of states the
// ATN could be in. We need to track the alt predicted by each
// state as well, however. More importantly, we need to maintain
// a stack of states, tracking the closure operations as they
// jump from rule to rule, emulating rule invocations (method calls).
// I have to add a stack to simulate the proper lookahead sequences for
// the underlying LL grammar from which the ATN was derived.
//
// <p>I use a set of ATNConfig objects not simple states. An ATNConfig
// is both a state (ala normal conversion) and a RuleContext describing
// the chain of rules (if any) followed to arrive at that state.</p>
//
// <p>A DFA state may have multiple references to a particular state,
// but with different ATN contexts (with same or different alts)
// meaning that state was reached via a different set of rule invocations.</p>
// /


function DFAState(stateNumber, configs) {
  if (stateNumber === null) {
    stateNumber = -1;
  }

  if (configs === null) {
    configs = new ATNConfigSet();
  }

  this.stateNumber = stateNumber;
  this.configs = configs; // {@code edges[symbol]} points to target of symbol. Shift up by 1 so (-1)
  // {@link Token//EOF} maps to {@code edges[0]}.

  this.edges = null;
  this.isAcceptState = false; // if accept state, what ttype do we match or alt do we predict?
  // This is set to {@link ATN//INVALID_ALT_NUMBER} when {@link
  // //predicates}{@code !=null} or
  // {@link //requiresFullContext}.

  this.prediction = 0;
  this.lexerActionExecutor = null; // Indicates that this state was created during SLL prediction that
  // discovered a conflict between the configurations in the state. Future
  // {@link ParserATNSimulator//execATN} invocations immediately jumped doing
  // full context prediction if this field is true.

  this.requiresFullContext = false; // During SLL parsing, this is a list of predicates associated with the
  // ATN configurations of the DFA state. When we have predicates,
  // {@link //requiresFullContext} is {@code false} since full context
  // prediction evaluates predicates
  // on-the-fly. If this is not null, then {@link //prediction} is
  // {@link ATN//INVALID_ALT_NUMBER}.
  //
  // <p>We only use these for non-{@link //requiresFullContext} but
  // conflicting states. That
  // means we know from the context (it's $ or we don't dip into outer
  // context) that it's an ambiguity not a conflict.</p>
  //
  // <p>This list is computed by {@link
  // ParserATNSimulator//predicateDFAState}.</p>

  this.predicates = null;
  return this;
} // Get the set of all alts mentioned by all ATN configurations in this
// DFA state.


DFAState.prototype.getAltSet = function () {
  var alts = new Set();

  if (this.configs !== null) {
    for (var i = 0; i < this.configs.length; i++) {
      var c = this.configs[i];
      alts.add(c.alt);
    }
  }

  if (alts.length === 0) {
    return null;
  } else {
    return alts;
  }
}; // Two {@link DFAState} instances are equal if their ATN configuration sets
// are the same. This method is used to see if a state already exists.
//
// <p>Because the number of alternatives and number of ATN configurations are
// finite, there is a finite number of DFA states that can be processed.
// This is necessary to show that the algorithm terminates.</p>
//
// <p>Cannot test the DFA state numbers here because in
// {@link ParserATNSimulator//addDFAState} we need to know if any other state
// exists that has this exact set of ATN configurations. The
// {@link //stateNumber} is irrelevant.</p>


DFAState.prototype.equals = function (other) {
  // compare set of ATN configurations in this set with other
  return this === other || other instanceof DFAState && this.configs.equals(other.configs);
};

DFAState.prototype.toString = function () {
  var s = "" + this.stateNumber + ":" + this.configs;

  if (this.isAcceptState) {
    s = s + "=>";
    if (this.predicates !== null) s = s + this.predicates;else s = s + this.prediction;
  }

  return s;
};

DFAState.prototype.hashCode = function () {
  var hash = new Hash();
  hash.update(this.configs);

  if (this.isAcceptState) {
    if (this.predicates !== null) hash.update(this.predicates);else hash.update(this.prediction);
  }

  return hash.finish();
};

exports.DFAState = DFAState;
exports.PredPrediction = PredPrediction;

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
// A tuple: (ATN state, predicted alt, syntactic, semantic context).
//  The syntactic context is a graph-structured stack node whose
//  path(s) to the root is the rule invocation(s)
//  chain used to arrive at the state.  The semantic context is
//  the tree of semantic predicates encountered before reaching
//  an ATN state.
///

var DecisionState = __webpack_require__(5).DecisionState;

var SemanticContext = __webpack_require__(14).SemanticContext;

var Hash = __webpack_require__(2).Hash;

function checkParams(params, isCfg) {
  if (params === null) {
    var result = {
      state: null,
      alt: null,
      context: null,
      semanticContext: null
    };

    if (isCfg) {
      result.reachesIntoOuterContext = 0;
    }

    return result;
  } else {
    var props = {};
    props.state = params.state || null;
    props.alt = params.alt === undefined ? null : params.alt;
    props.context = params.context || null;
    props.semanticContext = params.semanticContext || null;

    if (isCfg) {
      props.reachesIntoOuterContext = params.reachesIntoOuterContext || 0;
      props.precedenceFilterSuppressed = params.precedenceFilterSuppressed || false;
    }

    return props;
  }
}

function ATNConfig(params, config) {
  this.checkContext(params, config);
  params = checkParams(params);
  config = checkParams(config, true); // The ATN state associated with this configuration///

  this.state = params.state !== null ? params.state : config.state; // What alt (or lexer rule) is predicted by this configuration///

  this.alt = params.alt !== null ? params.alt : config.alt; // The stack of invoking states leading to the rule/states associated
  //  with this config.  We track only those contexts pushed during
  //  execution of the ATN simulator.

  this.context = params.context !== null ? params.context : config.context;
  this.semanticContext = params.semanticContext !== null ? params.semanticContext : config.semanticContext !== null ? config.semanticContext : SemanticContext.NONE; // We cannot execute predicates dependent upon local context unless
  // we know for sure we are in the correct context. Because there is
  // no way to do this efficiently, we simply cannot evaluate
  // dependent predicates unless we are in the rule that initially
  // invokes the ATN simulator.
  //
  // closure() tracks the depth of how far we dip into the
  // outer context: depth &gt; 0.  Note that it may not be totally
  // accurate depth since I don't ever decrement. TODO: make it a boolean then

  this.reachesIntoOuterContext = config.reachesIntoOuterContext;
  this.precedenceFilterSuppressed = config.precedenceFilterSuppressed;
  return this;
}

ATNConfig.prototype.checkContext = function (params, config) {
  if ((params.context === null || params.context === undefined) && (config === null || config.context === null || config.context === undefined)) {
    this.context = null;
  }
};

ATNConfig.prototype.hashCode = function () {
  var hash = new Hash();
  this.updateHashCode(hash);
  return hash.finish();
};

ATNConfig.prototype.updateHashCode = function (hash) {
  hash.update(this.state.stateNumber, this.alt, this.context, this.semanticContext);
}; // An ATN configuration is equal to another if both have
//  the same state, they predict the same alternative, and
//  syntactic/semantic contexts are the same.


ATNConfig.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof ATNConfig)) {
    return false;
  } else {
    return this.state.stateNumber === other.state.stateNumber && this.alt === other.alt && (this.context === null ? other.context === null : this.context.equals(other.context)) && this.semanticContext.equals(other.semanticContext) && this.precedenceFilterSuppressed === other.precedenceFilterSuppressed;
  }
};

ATNConfig.prototype.hashCodeForConfigSet = function () {
  var hash = new Hash();
  hash.update(this.state.stateNumber, this.alt, this.semanticContext);
  return hash.finish();
};

ATNConfig.prototype.equalsForConfigSet = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof ATNConfig)) {
    return false;
  } else {
    return this.state.stateNumber === other.state.stateNumber && this.alt === other.alt && this.semanticContext.equals(other.semanticContext);
  }
};

ATNConfig.prototype.toString = function () {
  return "(" + this.state + "," + this.alt + (this.context !== null ? ",[" + this.context.toString() + "]" : "") + (this.semanticContext !== SemanticContext.NONE ? "," + this.semanticContext.toString() : "") + (this.reachesIntoOuterContext > 0 ? ",up=" + this.reachesIntoOuterContext : "") + ")";
};

function LexerATNConfig(params, config) {
  ATNConfig.call(this, params, config); // This is the backing field for {@link //getLexerActionExecutor}.

  var lexerActionExecutor = params.lexerActionExecutor || null;
  this.lexerActionExecutor = lexerActionExecutor || (config !== null ? config.lexerActionExecutor : null);
  this.passedThroughNonGreedyDecision = config !== null ? this.checkNonGreedyDecision(config, this.state) : false;
  return this;
}

LexerATNConfig.prototype = Object.create(ATNConfig.prototype);
LexerATNConfig.prototype.constructor = LexerATNConfig;

LexerATNConfig.prototype.updateHashCode = function (hash) {
  hash.update(this.state.stateNumber, this.alt, this.context, this.semanticContext, this.passedThroughNonGreedyDecision, this.lexerActionExecutor);
};

LexerATNConfig.prototype.equals = function (other) {
  return this === other || other instanceof LexerATNConfig && this.passedThroughNonGreedyDecision == other.passedThroughNonGreedyDecision && (this.lexerActionExecutor ? this.lexerActionExecutor.equals(other.lexerActionExecutor) : !other.lexerActionExecutor) && ATNConfig.prototype.equals.call(this, other);
};

LexerATNConfig.prototype.hashCodeForConfigSet = LexerATNConfig.prototype.hashCode;
LexerATNConfig.prototype.equalsForConfigSet = LexerATNConfig.prototype.equals;

LexerATNConfig.prototype.checkNonGreedyDecision = function (source, target) {
  return source.passedThroughNonGreedyDecision || target instanceof DecisionState && target.nonGreedy;
};

exports.ATNConfig = ATNConfig;
exports.LexerATNConfig = LexerATNConfig;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
//  A rule context is a record of a single rule invocation. It knows
//  which context invoked it, if any. If there is no parent context, then
//  naturally the invoking state is not valid.  The parent link
//  provides a chain upwards from the current rule invocation to the root
//  of the invocation tree, forming a stack. We actually carry no
//  information about the rule associated with this context (except
//  when parsing). We keep only the state number of the invoking state from
//  the ATN submachine that invoked this. Contrast this with the s
//  pointer inside ParserRuleContext that tracks the current state
//  being "executed" for the current rule.
//
//  The parent contexts are useful for computing lookahead sets and
//  getting error information.
//
//  These objects are used during parsing and prediction.
//  For the special case of parsers, we use the subclass
//  ParserRuleContext.
//
//  @see ParserRuleContext
///

var RuleNode = __webpack_require__(6).RuleNode;

var INVALID_INTERVAL = __webpack_require__(6).INVALID_INTERVAL;

var INVALID_ALT_NUMBER = __webpack_require__(9).INVALID_ALT_NUMBER;

function RuleContext(parent, invokingState) {
  RuleNode.call(this); // What context invoked this rule?

  this.parentCtx = parent || null; // What state invoked the rule associated with this context?
  // The "return address" is the followState of invokingState
  // If parent is null, this should be -1.

  this.invokingState = invokingState || -1;
  return this;
}

RuleContext.prototype = Object.create(RuleNode.prototype);
RuleContext.prototype.constructor = RuleContext;

RuleContext.prototype.depth = function () {
  var n = 0;
  var p = this;

  while (p !== null) {
    p = p.parentCtx;
    n += 1;
  }

  return n;
}; // A context is empty if there is no invoking state; meaning nobody call
// current context.


RuleContext.prototype.isEmpty = function () {
  return this.invokingState === -1;
}; // satisfy the ParseTree / SyntaxTree interface


RuleContext.prototype.getSourceInterval = function () {
  return INVALID_INTERVAL;
};

RuleContext.prototype.getRuleContext = function () {
  return this;
};

RuleContext.prototype.getPayload = function () {
  return this;
}; // Return the combined text of all child nodes. This method only considers
// tokens which have been added to the parse tree.
// <p>
// Since tokens on hidden channels (e.g. whitespace or comments) are not
// added to the parse trees, they will not appear in the output of this
// method.
// /


RuleContext.prototype.getText = function () {
  if (this.getChildCount() === 0) {
    return "";
  } else {
    return this.children.map(function (child) {
      return child.getText();
    }).join("");
  }
}; // For rule associated with this parse tree internal node, return
// the outer alternative number used to match the input. Default
// implementation does not compute nor store this alt num. Create
// a subclass of ParserRuleContext with backing field and set
// option contextSuperClass.
// to set it.


RuleContext.prototype.getAltNumber = function () {
  return INVALID_ALT_NUMBER;
}; // Set the outer alternative number for this context node. Default
// implementation does nothing to avoid backing field overhead for
// trees that don't need it.  Create
// a subclass of ParserRuleContext with backing field and set
// option contextSuperClass.


RuleContext.prototype.setAltNumber = function (altNumber) {};

RuleContext.prototype.getChild = function (i) {
  return null;
};

RuleContext.prototype.getChildCount = function () {
  return 0;
};

RuleContext.prototype.accept = function (visitor) {
  return visitor.visitChildren(this);
}; //need to manage circular dependencies, so export now


exports.RuleContext = RuleContext;

var Trees = __webpack_require__(38).Trees; // Print out a whole tree, not just a node, in LISP format
// (root child1 .. childN). Print just a node if this is a leaf.
//


RuleContext.prototype.toStringTree = function (ruleNames, recog) {
  return Trees.toStringTree(this, ruleNames, recog);
};

RuleContext.prototype.toString = function (ruleNames, stop) {
  ruleNames = ruleNames || null;
  stop = stop || null;
  var p = this;
  var s = "[";

  while (p !== null && p !== stop) {
    if (ruleNames === null) {
      if (!p.isEmpty()) {
        s += p.invokingState;
      }
    } else {
      var ri = p.ruleIndex;
      var ruleName = ri >= 0 && ri < ruleNames.length ? ruleNames[ri] : "" + ri;
      s += ruleName;
    }

    if (p.parentCtx !== null && (ruleNames !== null || !p.parentCtx.isEmpty())) {
      s += " ";
    }

    p = p.parentCtx;
  }

  s += "]";
  return s;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
// A lexer is recognizer that draws input symbols from a character stream.
//  lexer grammars result in a subclass of this object. A Lexer object
//  uses simplified match() and error recovery mechanisms in the interest of speed.

var Token = __webpack_require__(3).Token;

var Recognizer = __webpack_require__(42).Recognizer;

var CommonTokenFactory = __webpack_require__(94).CommonTokenFactory;

var RecognitionException = __webpack_require__(7).RecognitionException;

var LexerNoViableAltException = __webpack_require__(7).LexerNoViableAltException;

function TokenSource() {
  return this;
}

function Lexer(input) {
  Recognizer.call(this);
  this._input = input;
  this._factory = CommonTokenFactory.DEFAULT;
  this._tokenFactorySourcePair = [this, input];
  this._interp = null; // child classes must populate this
  // The goal of all lexer rules/methods is to create a token object.
  // this is an instance variable as multiple rules may collaborate to
  // create a single token. nextToken will return this object after
  // matching lexer rule(s). If you subclass to allow multiple token
  // emissions, then set this to the last token to be matched or
  // something nonnull so that the auto token emit mechanism will not
  // emit another token.

  this._token = null; // What character index in the stream did the current token start at?
  // Needed, for example, to get the text for current token. Set at
  // the start of nextToken.

  this._tokenStartCharIndex = -1; // The line on which the first character of the token resides///

  this._tokenStartLine = -1; // The character position of first character within the line///

  this._tokenStartColumn = -1; // Once we see EOF on char stream, next token will be EOF.
  // If you have DONE : EOF ; then you see DONE EOF.

  this._hitEOF = false; // The channel number for the current token///

  this._channel = Token.DEFAULT_CHANNEL; // The token type for the current token///

  this._type = Token.INVALID_TYPE;
  this._modeStack = [];
  this._mode = Lexer.DEFAULT_MODE; // You can set the text for the current token to override what is in
  // the input char buffer. Use setText() or can set this instance var.
  // /

  this._text = null;
  return this;
}

Lexer.prototype = Object.create(Recognizer.prototype);
Lexer.prototype.constructor = Lexer;
Lexer.DEFAULT_MODE = 0;
Lexer.MORE = -2;
Lexer.SKIP = -3;
Lexer.DEFAULT_TOKEN_CHANNEL = Token.DEFAULT_CHANNEL;
Lexer.HIDDEN = Token.HIDDEN_CHANNEL;
Lexer.MIN_CHAR_VALUE = 0x0000;
Lexer.MAX_CHAR_VALUE = 0x10FFFF;

Lexer.prototype.reset = function () {
  // wack Lexer state variables
  if (this._input !== null) {
    this._input.seek(0); // rewind the input

  }

  this._token = null;
  this._type = Token.INVALID_TYPE;
  this._channel = Token.DEFAULT_CHANNEL;
  this._tokenStartCharIndex = -1;
  this._tokenStartColumn = -1;
  this._tokenStartLine = -1;
  this._text = null;
  this._hitEOF = false;
  this._mode = Lexer.DEFAULT_MODE;
  this._modeStack = [];

  this._interp.reset();
}; // Return a token from this source; i.e., match a token on the char stream.


Lexer.prototype.nextToken = function () {
  if (this._input === null) {
    throw "nextToken requires a non-null input stream.";
  } // Mark start location in char stream so unbuffered streams are
  // guaranteed at least have text of current token


  var tokenStartMarker = this._input.mark();

  try {
    while (true) {
      if (this._hitEOF) {
        this.emitEOF();
        return this._token;
      }

      this._token = null;
      this._channel = Token.DEFAULT_CHANNEL;
      this._tokenStartCharIndex = this._input.index;
      this._tokenStartColumn = this._interp.column;
      this._tokenStartLine = this._interp.line;
      this._text = null;
      var continueOuter = false;

      while (true) {
        this._type = Token.INVALID_TYPE;
        var ttype = Lexer.SKIP;

        try {
          ttype = this._interp.match(this._input, this._mode);
        } catch (e) {
          if (e instanceof RecognitionException) {
            this.notifyListeners(e); // report error

            this.recover(e);
          } else {
            console.log(e.stack);
            throw e;
          }
        }

        if (this._input.LA(1) === Token.EOF) {
          this._hitEOF = true;
        }

        if (this._type === Token.INVALID_TYPE) {
          this._type = ttype;
        }

        if (this._type === Lexer.SKIP) {
          continueOuter = true;
          break;
        }

        if (this._type !== Lexer.MORE) {
          break;
        }
      }

      if (continueOuter) {
        continue;
      }

      if (this._token === null) {
        this.emit();
      }

      return this._token;
    }
  } finally {
    // make sure we release marker after match or
    // unbuffered char stream will keep buffering
    this._input.release(tokenStartMarker);
  }
}; // Instruct the lexer to skip creating a token for current lexer rule
// and look for another token. nextToken() knows to keep looking when
// a lexer rule finishes with token set to SKIP_TOKEN. Recall that
// if token==null at end of any token rule, it creates one for you
// and emits it.
// /


Lexer.prototype.skip = function () {
  this._type = Lexer.SKIP;
};

Lexer.prototype.more = function () {
  this._type = Lexer.MORE;
};

Lexer.prototype.mode = function (m) {
  this._mode = m;
};

Lexer.prototype.pushMode = function (m) {
  if (this._interp.debug) {
    console.log("pushMode " + m);
  }

  this._modeStack.push(this._mode);

  this.mode(m);
};

Lexer.prototype.popMode = function () {
  if (this._modeStack.length === 0) {
    throw "Empty Stack";
  }

  if (this._interp.debug) {
    console.log("popMode back to " + this._modeStack.slice(0, -1));
  }

  this.mode(this._modeStack.pop());
  return this._mode;
}; // Set the char stream and reset the lexer


Object.defineProperty(Lexer.prototype, "inputStream", {
  get: function get() {
    return this._input;
  },
  set: function set(input) {
    this._input = null;
    this._tokenFactorySourcePair = [this, this._input];
    this.reset();
    this._input = input;
    this._tokenFactorySourcePair = [this, this._input];
  }
});
Object.defineProperty(Lexer.prototype, "sourceName", {
  get: function sourceName() {
    return this._input.sourceName;
  }
}); // By default does not support multiple emits per nextToken invocation
// for efficiency reasons. Subclass and override this method, nextToken,
// and getToken (to push tokens into a list and pull from that list
// rather than a single variable as this implementation does).
// /

Lexer.prototype.emitToken = function (token) {
  this._token = token;
}; // The standard method called to automatically emit a token at the
// outermost lexical rule. The token object should point into the
// char buffer start..stop. If there is a text override in 'text',
// use that to set the token's text. Override this method to emit
// custom Token objects or provide a new factory.
// /


Lexer.prototype.emit = function () {
  var t = this._factory.create(this._tokenFactorySourcePair, this._type, this._text, this._channel, this._tokenStartCharIndex, this.getCharIndex() - 1, this._tokenStartLine, this._tokenStartColumn);

  this.emitToken(t);
  return t;
};

Lexer.prototype.emitEOF = function () {
  var cpos = this.column;
  var lpos = this.line;

  var eof = this._factory.create(this._tokenFactorySourcePair, Token.EOF, null, Token.DEFAULT_CHANNEL, this._input.index, this._input.index - 1, lpos, cpos);

  this.emitToken(eof);
  return eof;
};

Object.defineProperty(Lexer.prototype, "type", {
  get: function get() {
    return this.type;
  },
  set: function set(type) {
    this._type = type;
  }
});
Object.defineProperty(Lexer.prototype, "line", {
  get: function get() {
    return this._interp.line;
  },
  set: function set(line) {
    this._interp.line = line;
  }
});
Object.defineProperty(Lexer.prototype, "column", {
  get: function get() {
    return this._interp.column;
  },
  set: function set(column) {
    this._interp.column = column;
  }
}); // What is the index of the current character of lookahead?///

Lexer.prototype.getCharIndex = function () {
  return this._input.index;
}; // Return the text matched so far for the current token or any text override.
//Set the complete text of this token; it wipes any previous changes to the text.


Object.defineProperty(Lexer.prototype, "text", {
  get: function get() {
    if (this._text !== null) {
      return this._text;
    } else {
      return this._interp.getText(this._input);
    }
  },
  set: function set(text) {
    this._text = text;
  }
}); // Return a list of all Token objects in input char stream.
// Forces load of all tokens. Does not include EOF token.
// /

Lexer.prototype.getAllTokens = function () {
  var tokens = [];
  var t = this.nextToken();

  while (t.type !== Token.EOF) {
    tokens.push(t);
    t = this.nextToken();
  }

  return tokens;
};

Lexer.prototype.notifyListeners = function (e) {
  var start = this._tokenStartCharIndex;
  var stop = this._input.index;

  var text = this._input.getText(start, stop);

  var msg = "token recognition error at: '" + this.getErrorDisplay(text) + "'";
  var listener = this.getErrorListenerDispatch();
  listener.syntaxError(this, null, this._tokenStartLine, this._tokenStartColumn, msg, e);
};

Lexer.prototype.getErrorDisplay = function (s) {
  var d = [];

  for (var i = 0; i < s.length; i++) {
    d.push(s[i]);
  }

  return d.join('');
};

Lexer.prototype.getErrorDisplayForChar = function (c) {
  if (c.charCodeAt(0) === Token.EOF) {
    return "<EOF>";
  } else if (c === '\n') {
    return "\\n";
  } else if (c === '\t') {
    return "\\t";
  } else if (c === '\r') {
    return "\\r";
  } else {
    return c;
  }
};

Lexer.prototype.getCharErrorDisplay = function (c) {
  return "'" + this.getErrorDisplayForChar(c) + "'";
}; // Lexers can normally match any char in it's vocabulary after matching
// a token, so do the easy thing and just kill a character and hope
// it all works out. You can instead use the rule invocation stack
// to do sophisticated error recovery if you are in a fragment rule.
// /


Lexer.prototype.recover = function (re) {
  if (this._input.LA(1) !== Token.EOF) {
    if (re instanceof LexerNoViableAltException) {
      // skip a char and try again
      this._interp.consume(this._input);
    } else {
      // TODO: Do we lose character or line position information?
      this._input.consume();
    }
  }
};

exports.Lexer = Lexer;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
// Provides an empty default implementation of {@link ANTLRErrorListener}. The
// default implementation of each method does nothing, but can be overridden as
// necessary.

function ErrorListener() {
  return this;
}

ErrorListener.prototype.syntaxError = function (recognizer, offendingSymbol, line, column, msg, e) {};

ErrorListener.prototype.reportAmbiguity = function (recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {};

ErrorListener.prototype.reportAttemptingFullContext = function (recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {};

ErrorListener.prototype.reportContextSensitivity = function (recognizer, dfa, startIndex, stopIndex, prediction, configs) {};

function ConsoleErrorListener() {
  ErrorListener.call(this);
  return this;
}

ConsoleErrorListener.prototype = Object.create(ErrorListener.prototype);
ConsoleErrorListener.prototype.constructor = ConsoleErrorListener; //
// Provides a default instance of {@link ConsoleErrorListener}.
//

ConsoleErrorListener.INSTANCE = new ConsoleErrorListener(); //
// {@inheritDoc}
//
// <p>
// This implementation prints messages to {@link System//err} containing the
// values of {@code line}, {@code charPositionInLine}, and {@code msg} using
// the following format.</p>
//
// <pre>
// line <em>line</em>:<em>charPositionInLine</em> <em>msg</em>
// </pre>
//

ConsoleErrorListener.prototype.syntaxError = function (recognizer, offendingSymbol, line, column, msg, e) {
  console.error("line " + line + ":" + column + " " + msg);
};

function ProxyErrorListener(delegates) {
  ErrorListener.call(this);

  if (delegates === null) {
    throw "delegates";
  }

  this.delegates = delegates;
  return this;
}

ProxyErrorListener.prototype = Object.create(ErrorListener.prototype);
ProxyErrorListener.prototype.constructor = ProxyErrorListener;

ProxyErrorListener.prototype.syntaxError = function (recognizer, offendingSymbol, line, column, msg, e) {
  this.delegates.map(function (d) {
    d.syntaxError(recognizer, offendingSymbol, line, column, msg, e);
  });
};

ProxyErrorListener.prototype.reportAmbiguity = function (recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
  this.delegates.map(function (d) {
    d.reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs);
  });
};

ProxyErrorListener.prototype.reportAttemptingFullContext = function (recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
  this.delegates.map(function (d) {
    d.reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs);
  });
};

ProxyErrorListener.prototype.reportContextSensitivity = function (recognizer, dfa, startIndex, stopIndex, prediction, configs) {
  this.delegates.map(function (d) {
    d.reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs);
  });
};

exports.ErrorListener = ErrorListener;
exports.ConsoleErrorListener = ConsoleErrorListener;
exports.ProxyErrorListener = ProxyErrorListener;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
// A DFA walker that knows how to dump them to serialized strings.#/

function DFASerializer(dfa, literalNames, symbolicNames) {
  this.dfa = dfa;
  this.literalNames = literalNames || [];
  this.symbolicNames = symbolicNames || [];
  return this;
}

DFASerializer.prototype.toString = function () {
  if (this.dfa.s0 === null) {
    return null;
  }

  var buf = "";
  var states = this.dfa.sortedStates();

  for (var i = 0; i < states.length; i++) {
    var s = states[i];

    if (s.edges !== null) {
      var n = s.edges.length;

      for (var j = 0; j < n; j++) {
        var t = s.edges[j] || null;

        if (t !== null && t.stateNumber !== 0x7FFFFFFF) {
          buf = buf.concat(this.getStateString(s));
          buf = buf.concat("-");
          buf = buf.concat(this.getEdgeLabel(j));
          buf = buf.concat("->");
          buf = buf.concat(this.getStateString(t));
          buf = buf.concat('\n');
        }
      }
    }
  }

  return buf.length === 0 ? null : buf;
};

DFASerializer.prototype.getEdgeLabel = function (i) {
  if (i === 0) {
    return "EOF";
  } else if (this.literalNames !== null || this.symbolicNames !== null) {
    return this.literalNames[i - 1] || this.symbolicNames[i - 1];
  } else {
    return String.fromCharCode(i - 1);
  }
};

DFASerializer.prototype.getStateString = function (s) {
  var baseStateStr = (s.isAcceptState ? ":" : "") + "s" + s.stateNumber + (s.requiresFullContext ? "^" : "");

  if (s.isAcceptState) {
    if (s.predicates !== null) {
      return baseStateStr + "=>" + s.predicates.toString();
    } else {
      return baseStateStr + "=>" + s.prediction.toString();
    }
  } else {
    return baseStateStr;
  }
};

function LexerDFASerializer(dfa) {
  DFASerializer.call(this, dfa, null);
  return this;
}

LexerDFASerializer.prototype = Object.create(DFASerializer.prototype);
LexerDFASerializer.prototype.constructor = LexerDFASerializer;

LexerDFASerializer.prototype.getEdgeLabel = function (i) {
  return "'" + String.fromCharCode(i) + "'";
};

exports.DFASerializer = DFASerializer;
exports.LexerDFASerializer = LexerDFASerializer;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    hardline = _require$doc$builders.hardline,
    isNextLineEmptyAfterIndex = _require.util.isNextLineEmptyAfterIndex;

function printPreservingEmptyLines(path, key, options, print) {
  var parts = [];
  path.each(function (childPath) {
    if (parts.length !== 0) {
      parts.push(hardline);
    }

    parts.push(print(childPath));

    if (isNextLineEmptyAfterIndex(options.originalText, options.locEnd(childPath.getValue()) + 1)) {
      parts.push(hardline);
    }
  }, key);
  return concat(parts);
}

module.exports = printPreservingEmptyLines;

/***/ }),
/* 25 */
/***/ (function(module) {

module.exports = {"name":"remix-prettier","version":"1.0.0-alpha.1","description":"A plugin for Remix, Ethereum-IDE that will apply formatting rules on Solidity code based on industry best practices.","private":true,"author":"Klaus Hott <klahott@gmail.com>","license":"MIT","bugs":{"url":"https://github.com/BlockchainLabsNZ/remix-prettier/issues"},"homepage":"https://remix-prettier.netlify.com","dependencies":{"@githubprimer/octicons-react":"^8.5.0","bootstrap":"^4.3.1","classnames":"^2.2.6","console-feed":"^2.8.8","prettier-plugin-solidity":"BlockchainLabsNZ/prettier-plugin-solidity.git#standalone","react":"^16.8.6","react-dom":"^16.8.6","react-scripts":"3.0.1","remix-plugin":"^0.0.2-alpha.11","styled-components":"^4.3.1"},"devDependencies":{"prettier":"^1.18.2","react-app-rewired":"^2.1.3"},"scripts":{"start":"react-app-rewired start","build":"react-app-rewired build","test":"react-app-rewired test","eject":"react-scripts eject"},"eslintConfig":{"extends":"react-app"},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]}};

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//* A rule invocation record for parsing.
//
//  Contains all of the information about the current rule not stored in the
//  RuleContext. It handles parse tree children list, Any ATN state
//  tracing, and the default values available for rule indications:
//  start, stop, rule index, current alt number, current
//  ATN state.
//
//  Subclasses made for each rule and grammar track the parameters,
//  return values, locals, and labels specific to that rule. These
//  are the objects that are returned from rules.
//
//  Note text is not an actual field of a rule return value; it is computed
//  from start and stop using the input stream's toString() method.  I
//  could add a ctor to this so that we can pass in and store the input
//  stream, but I'm not sure we want to do that.  It would seem to be undefined
//  to get the .text property anyway if the rule matches tokens from multiple
//  input streams.
//
//  I do not use getters for fields of objects that are used simply to
//  group values such as this aggregate.  The getters/setters are there to
//  satisfy the superclass interface.

var RuleContext = __webpack_require__(20).RuleContext;

var Tree = __webpack_require__(6);

var INVALID_INTERVAL = Tree.INVALID_INTERVAL;
var TerminalNode = Tree.TerminalNode;
var TerminalNodeImpl = Tree.TerminalNodeImpl;
var ErrorNodeImpl = Tree.ErrorNodeImpl;

var Interval = __webpack_require__(4).Interval;

function ParserRuleContext(parent, invokingStateNumber) {
  parent = parent || null;
  invokingStateNumber = invokingStateNumber || null;
  RuleContext.call(this, parent, invokingStateNumber);
  this.ruleIndex = -1; // * If we are debugging or building a parse tree for a visitor,
  // we need to track all of the tokens and rule invocations associated
  // with this rule's context. This is empty for parsing w/o tree constr.
  // operation because we don't the need to track the details about
  // how we parse this rule.
  // /

  this.children = null;
  this.start = null;
  this.stop = null; // The exception that forced this rule to return. If the rule successfully
  // completed, this is {@code null}.

  this.exception = null;
}

ParserRuleContext.prototype = Object.create(RuleContext.prototype);
ParserRuleContext.prototype.constructor = ParserRuleContext; // * COPY a ctx (I'm deliberately not using copy constructor)///

ParserRuleContext.prototype.copyFrom = function (ctx) {
  // from RuleContext
  this.parentCtx = ctx.parentCtx;
  this.invokingState = ctx.invokingState;
  this.children = null;
  this.start = ctx.start;
  this.stop = ctx.stop; // copy any error nodes to alt label node

  if (ctx.children) {
    this.children = []; // reset parent pointer for any error nodes

    ctx.children.map(function (child) {
      if (child instanceof ErrorNodeImpl) {
        this.children.push(child);
        child.parentCtx = this;
      }
    }, this);
  }
}; // Double dispatch methods for listeners


ParserRuleContext.prototype.enterRule = function (listener) {};

ParserRuleContext.prototype.exitRule = function (listener) {}; // * Does not set parent link; other add methods do that///


ParserRuleContext.prototype.addChild = function (child) {
  if (this.children === null) {
    this.children = [];
  }

  this.children.push(child);
  return child;
}; // * Used by enterOuterAlt to toss out a RuleContext previously added as
// we entered a rule. If we have // label, we will need to remove
// generic ruleContext object.
// /


ParserRuleContext.prototype.removeLastChild = function () {
  if (this.children !== null) {
    this.children.pop();
  }
};

ParserRuleContext.prototype.addTokenNode = function (token) {
  var node = new TerminalNodeImpl(token);
  this.addChild(node);
  node.parentCtx = this;
  return node;
};

ParserRuleContext.prototype.addErrorNode = function (badToken) {
  var node = new ErrorNodeImpl(badToken);
  this.addChild(node);
  node.parentCtx = this;
  return node;
};

ParserRuleContext.prototype.getChild = function (i, type) {
  type = type || null;

  if (this.children === null || i < 0 || i >= this.children.length) {
    return null;
  }

  if (type === null) {
    return this.children[i];
  } else {
    for (var j = 0; j < this.children.length; j++) {
      var child = this.children[j];

      if (child instanceof type) {
        if (i === 0) {
          return child;
        } else {
          i -= 1;
        }
      }
    }

    return null;
  }
};

ParserRuleContext.prototype.getToken = function (ttype, i) {
  if (this.children === null || i < 0 || i >= this.children.length) {
    return null;
  }

  for (var j = 0; j < this.children.length; j++) {
    var child = this.children[j];

    if (child instanceof TerminalNode) {
      if (child.symbol.type === ttype) {
        if (i === 0) {
          return child;
        } else {
          i -= 1;
        }
      }
    }
  }

  return null;
};

ParserRuleContext.prototype.getTokens = function (ttype) {
  if (this.children === null) {
    return [];
  } else {
    var tokens = [];

    for (var j = 0; j < this.children.length; j++) {
      var child = this.children[j];

      if (child instanceof TerminalNode) {
        if (child.symbol.type === ttype) {
          tokens.push(child);
        }
      }
    }

    return tokens;
  }
};

ParserRuleContext.prototype.getTypedRuleContext = function (ctxType, i) {
  return this.getChild(i, ctxType);
};

ParserRuleContext.prototype.getTypedRuleContexts = function (ctxType) {
  if (this.children === null) {
    return [];
  } else {
    var contexts = [];

    for (var j = 0; j < this.children.length; j++) {
      var child = this.children[j];

      if (child instanceof ctxType) {
        contexts.push(child);
      }
    }

    return contexts;
  }
};

ParserRuleContext.prototype.getChildCount = function () {
  if (this.children === null) {
    return 0;
  } else {
    return this.children.length;
  }
};

ParserRuleContext.prototype.getSourceInterval = function () {
  if (this.start === null || this.stop === null) {
    return INVALID_INTERVAL;
  } else {
    return new Interval(this.start.tokenIndex, this.stop.tokenIndex);
  }
};

RuleContext.EMPTY = new ParserRuleContext();

function InterpreterRuleContext(parent, invokingStateNumber, ruleIndex) {
  ParserRuleContext.call(parent, invokingStateNumber);
  this.ruleIndex = ruleIndex;
  return this;
}

InterpreterRuleContext.prototype = Object.create(ParserRuleContext.prototype);
InterpreterRuleContext.prototype.constructor = InterpreterRuleContext;
exports.ParserRuleContext = ParserRuleContext;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//

var Token = __webpack_require__(3).Token;

__webpack_require__(45);

__webpack_require__(46); // Vacuum all input from a string and then treat it like a buffer.


function _loadString(stream, decodeToUnicodeCodePoints) {
  stream._index = 0;
  stream.data = [];

  if (stream.decodeToUnicodeCodePoints) {
    for (var i = 0; i < stream.strdata.length;) {
      var codePoint = stream.strdata.codePointAt(i);
      stream.data.push(codePoint);
      i += codePoint <= 0xFFFF ? 1 : 2;
    }
  } else {
    for (var i = 0; i < stream.strdata.length; i++) {
      var codeUnit = stream.strdata.charCodeAt(i);
      stream.data.push(codeUnit);
    }
  }

  stream._size = stream.data.length;
} // If decodeToUnicodeCodePoints is true, the input is treated
// as a series of Unicode code points.
//
// Otherwise, the input is treated as a series of 16-bit UTF-16 code
// units.


function InputStream(data, decodeToUnicodeCodePoints) {
  this.name = "<empty>";
  this.strdata = data;
  this.decodeToUnicodeCodePoints = decodeToUnicodeCodePoints || false;

  _loadString(this);

  return this;
}

Object.defineProperty(InputStream.prototype, "index", {
  get: function get() {
    return this._index;
  }
});
Object.defineProperty(InputStream.prototype, "size", {
  get: function get() {
    return this._size;
  }
}); // Reset the stream so that it's in the same state it was
// when the object was created *except* the data array is not
// touched.
//

InputStream.prototype.reset = function () {
  this._index = 0;
};

InputStream.prototype.consume = function () {
  if (this._index >= this._size) {
    // assert this.LA(1) == Token.EOF
    throw "cannot consume EOF";
  }

  this._index += 1;
};

InputStream.prototype.LA = function (offset) {
  if (offset === 0) {
    return 0; // undefined
  }

  if (offset < 0) {
    offset += 1; // e.g., translate LA(-1) to use offset=0
  }

  var pos = this._index + offset - 1;

  if (pos < 0 || pos >= this._size) {
    // invalid
    return Token.EOF;
  }

  return this.data[pos];
};

InputStream.prototype.LT = function (offset) {
  return this.LA(offset);
}; // mark/release do nothing; we have entire buffer


InputStream.prototype.mark = function () {
  return -1;
};

InputStream.prototype.release = function (marker) {}; // consume() ahead until p==_index; can't just set p=_index as we must
// update line and column. If we seek backwards, just set p
//


InputStream.prototype.seek = function (_index) {
  if (_index <= this._index) {
    this._index = _index; // just jump; don't update stream state (line,
    // ...)

    return;
  } // seek forward


  this._index = Math.min(_index, this._size);
};

InputStream.prototype.getText = function (start, stop) {
  if (stop >= this._size) {
    stop = this._size - 1;
  }

  if (start >= this._size) {
    return "";
  } else {
    if (this.decodeToUnicodeCodePoints) {
      var result = "";

      for (var i = start; i <= stop; i++) {
        result += String.fromCodePoint(this.data[i]);
      }

      return result;
    } else {
      return this.strdata.slice(start, stop + 1);
    }
  }
};

InputStream.prototype.toString = function () {
  return this.strdata;
};

exports.InputStream = InputStream;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    group = _require$doc$builders.group,
    line = _require$doc$builders.line,
    concat = _require$doc$builders.concat,
    indent = _require$doc$builders.indent;

var comparison = __webpack_require__(48);

var groupIfNecessaryBuilder = function groupIfNecessaryBuilder(path) {
  return function (doc) {
    var parentNode = path.getParentNode();

    if (parentNode.type === 'BinaryOperation' && !comparison.match(parentNode.operator)) {
      return doc;
    }

    return group(doc);
  };
};

var indentIfNecessaryBuilder = function indentIfNecessaryBuilder(path) {
  return function (doc) {
    var parentNode = path.getParentNode();

    if (parentNode.type === 'BinaryOperation' && !comparison.match(parentNode.operator)) {
      return doc;
    }

    return indent(doc);
  };
};

module.exports = {
  match: function match(op) {
    return ['+', '-', '*', '/', '%'].includes(op);
  },
  print: function print(node, path, _print) {
    var groupIfNecessary = groupIfNecessaryBuilder(path);
    var indentIfNecessary = indentIfNecessaryBuilder(path);
    return groupIfNecessary(indentIfNecessary(concat([path.call(_print, 'left'), ' ', node.operator, line, path.call(_print, 'right')])));
  }
};

/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

var Utils = __webpack_require__(2);

var Token = __webpack_require__(3).Token;

var RuleNode = __webpack_require__(6).RuleNode;

var ErrorNode = __webpack_require__(6).ErrorNode;

var TerminalNode = __webpack_require__(6).TerminalNode;

var ParserRuleContext = __webpack_require__(28).ParserRuleContext;

var RuleContext = __webpack_require__(20).RuleContext;

var INVALID_ALT_NUMBER = __webpack_require__(9).INVALID_ALT_NUMBER;
/** A set of utility routines useful for all kinds of ANTLR trees. */


function Trees() {} // Print out a whole tree in LISP form. {@link //getNodeText} is used on the
//  node payloads to get the text for the nodes.  Detect
//  parse trees and extract data appropriately.


Trees.toStringTree = function (tree, ruleNames, recog) {
  ruleNames = ruleNames || null;
  recog = recog || null;

  if (recog !== null) {
    ruleNames = recog.ruleNames;
  }

  var s = Trees.getNodeText(tree, ruleNames);
  s = Utils.escapeWhitespace(s, false);
  var c = tree.getChildCount();

  if (c === 0) {
    return s;
  }

  var res = "(" + s + ' ';

  if (c > 0) {
    s = Trees.toStringTree(tree.getChild(0), ruleNames);
    res = res.concat(s);
  }

  for (var i = 1; i < c; i++) {
    s = Trees.toStringTree(tree.getChild(i), ruleNames);
    res = res.concat(' ' + s);
  }

  res = res.concat(")");
  return res;
};

Trees.getNodeText = function (t, ruleNames, recog) {
  ruleNames = ruleNames || null;
  recog = recog || null;

  if (recog !== null) {
    ruleNames = recog.ruleNames;
  }

  if (ruleNames !== null) {
    if (t instanceof RuleContext) {
      var altNumber = t.getAltNumber();

      if (altNumber != INVALID_ALT_NUMBER) {
        return ruleNames[t.ruleIndex] + ":" + altNumber;
      }

      return ruleNames[t.ruleIndex];
    } else if (t instanceof ErrorNode) {
      return t.toString();
    } else if (t instanceof TerminalNode) {
      if (t.symbol !== null) {
        return t.symbol.text;
      }
    }
  } // no recog for rule names


  var payload = t.getPayload();

  if (payload instanceof Token) {
    return payload.text;
  }

  return t.getPayload().toString();
}; // Return ordered list of all children of this node


Trees.getChildren = function (t) {
  var list = [];

  for (var i = 0; i < t.getChildCount(); i++) {
    list.push(t.getChild(i));
  }

  return list;
}; // Return a list of all ancestors of this node.  The first node of
//  list is the root and the last is the parent of this node.
//


Trees.getAncestors = function (t) {
  var ancestors = [];
  t = t.getParent();

  while (t !== null) {
    ancestors = [t].concat(ancestors);
    t = t.getParent();
  }

  return ancestors;
};

Trees.findAllTokenNodes = function (t, ttype) {
  return Trees.findAllNodes(t, ttype, true);
};

Trees.findAllRuleNodes = function (t, ruleIndex) {
  return Trees.findAllNodes(t, ruleIndex, false);
};

Trees.findAllNodes = function (t, index, findTokens) {
  var nodes = [];

  Trees._findAllNodes(t, index, findTokens, nodes);

  return nodes;
};

Trees._findAllNodes = function (t, index, findTokens, nodes) {
  // check this node (the root) first
  if (findTokens && t instanceof TerminalNode) {
    if (t.symbol.type === index) {
      nodes.push(t);
    }
  } else if (!findTokens && t instanceof ParserRuleContext) {
    if (t.ruleIndex === index) {
      nodes.push(t);
    }
  } // check children


  for (var i = 0; i < t.getChildCount(); i++) {
    Trees._findAllNodes(t.getChild(i), index, findTokens, nodes);
  }
};

Trees.descendants = function (t) {
  var nodes = [t];

  for (var i = 0; i < t.getChildCount(); i++) {
    nodes = nodes.concat(Trees.descendants(t.getChild(i)));
  }

  return nodes;
};

exports.Trees = Trees;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

var Token = __webpack_require__(3).Token;

var ATN = __webpack_require__(9).ATN;

var ATNType = __webpack_require__(92).ATNType;

var ATNStates = __webpack_require__(5);

var ATNState = ATNStates.ATNState;
var BasicState = ATNStates.BasicState;
var DecisionState = ATNStates.DecisionState;
var BlockStartState = ATNStates.BlockStartState;
var BlockEndState = ATNStates.BlockEndState;
var LoopEndState = ATNStates.LoopEndState;
var RuleStartState = ATNStates.RuleStartState;
var RuleStopState = ATNStates.RuleStopState;
var TokensStartState = ATNStates.TokensStartState;
var PlusLoopbackState = ATNStates.PlusLoopbackState;
var StarLoopbackState = ATNStates.StarLoopbackState;
var StarLoopEntryState = ATNStates.StarLoopEntryState;
var PlusBlockStartState = ATNStates.PlusBlockStartState;
var StarBlockStartState = ATNStates.StarBlockStartState;
var BasicBlockStartState = ATNStates.BasicBlockStartState;

var Transitions = __webpack_require__(10);

var Transition = Transitions.Transition;
var AtomTransition = Transitions.AtomTransition;
var SetTransition = Transitions.SetTransition;
var NotSetTransition = Transitions.NotSetTransition;
var RuleTransition = Transitions.RuleTransition;
var RangeTransition = Transitions.RangeTransition;
var ActionTransition = Transitions.ActionTransition;
var EpsilonTransition = Transitions.EpsilonTransition;
var WildcardTransition = Transitions.WildcardTransition;
var PredicateTransition = Transitions.PredicateTransition;
var PrecedencePredicateTransition = Transitions.PrecedencePredicateTransition;

var IntervalSet = __webpack_require__(4).IntervalSet;

var Interval = __webpack_require__(4).Interval;

var ATNDeserializationOptions = __webpack_require__(40).ATNDeserializationOptions;

var LexerActions = __webpack_require__(41);

var LexerActionType = LexerActions.LexerActionType;
var LexerSkipAction = LexerActions.LexerSkipAction;
var LexerChannelAction = LexerActions.LexerChannelAction;
var LexerCustomAction = LexerActions.LexerCustomAction;
var LexerMoreAction = LexerActions.LexerMoreAction;
var LexerTypeAction = LexerActions.LexerTypeAction;
var LexerPushModeAction = LexerActions.LexerPushModeAction;
var LexerPopModeAction = LexerActions.LexerPopModeAction;
var LexerModeAction = LexerActions.LexerModeAction; // This is the earliest supported serialized UUID.
// stick to serialized version for now, we don't need a UUID instance

var BASE_SERIALIZED_UUID = "AADB8D7E-AEEF-4415-AD2B-8204D6CF042E"; //
// This UUID indicates the serialized ATN contains two sets of
// IntervalSets, where the second set's values are encoded as
// 32-bit integers to support the full Unicode SMP range up to U+10FFFF.
//

var ADDED_UNICODE_SMP = "59627784-3BE5-417A-B9EB-8131A7286089"; // This list contains all of the currently supported UUIDs, ordered by when
// the feature first appeared in this branch.

var SUPPORTED_UUIDS = [BASE_SERIALIZED_UUID, ADDED_UNICODE_SMP];
var SERIALIZED_VERSION = 3; // This is the current serialized UUID.

var SERIALIZED_UUID = ADDED_UNICODE_SMP;

function initArray(length, value) {
  var tmp = [];
  tmp[length - 1] = value;
  return tmp.map(function (i) {
    return value;
  });
}

function ATNDeserializer(options) {
  if (options === undefined || options === null) {
    options = ATNDeserializationOptions.defaultOptions;
  }

  this.deserializationOptions = options;
  this.stateFactories = null;
  this.actionFactories = null;
  return this;
} // Determines if a particular serialized representation of an ATN supports
// a particular feature, identified by the {@link UUID} used for serializing
// the ATN at the time the feature was first introduced.
//
// @param feature The {@link UUID} marking the first time the feature was
// supported in the serialized ATN.
// @param actualUuid The {@link UUID} of the actual serialized ATN which is
// currently being deserialized.
// @return {@code true} if the {@code actualUuid} value represents a
// serialized ATN at or after the feature identified by {@code feature} was
// introduced; otherwise, {@code false}.


ATNDeserializer.prototype.isFeatureSupported = function (feature, actualUuid) {
  var idx1 = SUPPORTED_UUIDS.indexOf(feature);

  if (idx1 < 0) {
    return false;
  }

  var idx2 = SUPPORTED_UUIDS.indexOf(actualUuid);
  return idx2 >= idx1;
};

ATNDeserializer.prototype.deserialize = function (data) {
  this.reset(data);
  this.checkVersion();
  this.checkUUID();
  var atn = this.readATN();
  this.readStates(atn);
  this.readRules(atn);
  this.readModes(atn);
  var sets = []; // First, deserialize sets with 16-bit arguments <= U+FFFF.

  this.readSets(atn, sets, this.readInt.bind(this)); // Next, if the ATN was serialized with the Unicode SMP feature,
  // deserialize sets with 32-bit arguments <= U+10FFFF.

  if (this.isFeatureSupported(ADDED_UNICODE_SMP, this.uuid)) {
    this.readSets(atn, sets, this.readInt32.bind(this));
  }

  this.readEdges(atn, sets);
  this.readDecisions(atn);
  this.readLexerActions(atn);
  this.markPrecedenceDecisions(atn);
  this.verifyATN(atn);

  if (this.deserializationOptions.generateRuleBypassTransitions && atn.grammarType === ATNType.PARSER) {
    this.generateRuleBypassTransitions(atn); // re-verify after modification

    this.verifyATN(atn);
  }

  return atn;
};

ATNDeserializer.prototype.reset = function (data) {
  var adjust = function adjust(c) {
    var v = c.charCodeAt(0);
    return v > 1 ? v - 2 : -1;
  };

  var temp = data.split("").map(adjust); // don't adjust the first value since that's the version number

  temp[0] = data.charCodeAt(0);
  this.data = temp;
  this.pos = 0;
};

ATNDeserializer.prototype.checkVersion = function () {
  var version = this.readInt();

  if (version !== SERIALIZED_VERSION) {
    throw "Could not deserialize ATN with version " + version + " (expected " + SERIALIZED_VERSION + ").";
  }
};

ATNDeserializer.prototype.checkUUID = function () {
  var uuid = this.readUUID();

  if (SUPPORTED_UUIDS.indexOf(uuid) < 0) {
    throw "Could not deserialize ATN with UUID: " + uuid + " (expected " + SERIALIZED_UUID + " or a legacy UUID).", uuid, SERIALIZED_UUID;
  }

  this.uuid = uuid;
};

ATNDeserializer.prototype.readATN = function () {
  var grammarType = this.readInt();
  var maxTokenType = this.readInt();
  return new ATN(grammarType, maxTokenType);
};

ATNDeserializer.prototype.readStates = function (atn) {
  var j, pair, stateNumber;
  var loopBackStateNumbers = [];
  var endStateNumbers = [];
  var nstates = this.readInt();

  for (var i = 0; i < nstates; i++) {
    var stype = this.readInt(); // ignore bad type of states

    if (stype === ATNState.INVALID_TYPE) {
      atn.addState(null);
      continue;
    }

    var ruleIndex = this.readInt();

    if (ruleIndex === 0xFFFF) {
      ruleIndex = -1;
    }

    var s = this.stateFactory(stype, ruleIndex);

    if (stype === ATNState.LOOP_END) {
      // special case
      var loopBackStateNumber = this.readInt();
      loopBackStateNumbers.push([s, loopBackStateNumber]);
    } else if (s instanceof BlockStartState) {
      var endStateNumber = this.readInt();
      endStateNumbers.push([s, endStateNumber]);
    }

    atn.addState(s);
  } // delay the assignment of loop back and end states until we know all the
  // state instances have been initialized


  for (j = 0; j < loopBackStateNumbers.length; j++) {
    pair = loopBackStateNumbers[j];
    pair[0].loopBackState = atn.states[pair[1]];
  }

  for (j = 0; j < endStateNumbers.length; j++) {
    pair = endStateNumbers[j];
    pair[0].endState = atn.states[pair[1]];
  }

  var numNonGreedyStates = this.readInt();

  for (j = 0; j < numNonGreedyStates; j++) {
    stateNumber = this.readInt();
    atn.states[stateNumber].nonGreedy = true;
  }

  var numPrecedenceStates = this.readInt();

  for (j = 0; j < numPrecedenceStates; j++) {
    stateNumber = this.readInt();
    atn.states[stateNumber].isPrecedenceRule = true;
  }
};

ATNDeserializer.prototype.readRules = function (atn) {
  var i;
  var nrules = this.readInt();

  if (atn.grammarType === ATNType.LEXER) {
    atn.ruleToTokenType = initArray(nrules, 0);
  }

  atn.ruleToStartState = initArray(nrules, 0);

  for (i = 0; i < nrules; i++) {
    var s = this.readInt();
    var startState = atn.states[s];
    atn.ruleToStartState[i] = startState;

    if (atn.grammarType === ATNType.LEXER) {
      var tokenType = this.readInt();

      if (tokenType === 0xFFFF) {
        tokenType = Token.EOF;
      }

      atn.ruleToTokenType[i] = tokenType;
    }
  }

  atn.ruleToStopState = initArray(nrules, 0);

  for (i = 0; i < atn.states.length; i++) {
    var state = atn.states[i];

    if (!(state instanceof RuleStopState)) {
      continue;
    }

    atn.ruleToStopState[state.ruleIndex] = state;
    atn.ruleToStartState[state.ruleIndex].stopState = state;
  }
};

ATNDeserializer.prototype.readModes = function (atn) {
  var nmodes = this.readInt();

  for (var i = 0; i < nmodes; i++) {
    var s = this.readInt();
    atn.modeToStartState.push(atn.states[s]);
  }
};

ATNDeserializer.prototype.readSets = function (atn, sets, readUnicode) {
  var m = this.readInt();

  for (var i = 0; i < m; i++) {
    var iset = new IntervalSet();
    sets.push(iset);
    var n = this.readInt();
    var containsEof = this.readInt();

    if (containsEof !== 0) {
      iset.addOne(-1);
    }

    for (var j = 0; j < n; j++) {
      var i1 = readUnicode();
      var i2 = readUnicode();
      iset.addRange(i1, i2);
    }
  }
};

ATNDeserializer.prototype.readEdges = function (atn, sets) {
  var i, j, state, trans, target;
  var nedges = this.readInt();

  for (i = 0; i < nedges; i++) {
    var src = this.readInt();
    var trg = this.readInt();
    var ttype = this.readInt();
    var arg1 = this.readInt();
    var arg2 = this.readInt();
    var arg3 = this.readInt();
    trans = this.edgeFactory(atn, ttype, src, trg, arg1, arg2, arg3, sets);
    var srcState = atn.states[src];
    srcState.addTransition(trans);
  } // edges for rule stop states can be derived, so they aren't serialized


  for (i = 0; i < atn.states.length; i++) {
    state = atn.states[i];

    for (j = 0; j < state.transitions.length; j++) {
      var t = state.transitions[j];

      if (!(t instanceof RuleTransition)) {
        continue;
      }

      var outermostPrecedenceReturn = -1;

      if (atn.ruleToStartState[t.target.ruleIndex].isPrecedenceRule) {
        if (t.precedence === 0) {
          outermostPrecedenceReturn = t.target.ruleIndex;
        }
      }

      trans = new EpsilonTransition(t.followState, outermostPrecedenceReturn);
      atn.ruleToStopState[t.target.ruleIndex].addTransition(trans);
    }
  }

  for (i = 0; i < atn.states.length; i++) {
    state = atn.states[i];

    if (state instanceof BlockStartState) {
      // we need to know the end state to set its start state
      if (state.endState === null) {
        throw "IllegalState";
      } // block end states can only be associated to a single block start
      // state


      if (state.endState.startState !== null) {
        throw "IllegalState";
      }

      state.endState.startState = state;
    }

    if (state instanceof PlusLoopbackState) {
      for (j = 0; j < state.transitions.length; j++) {
        target = state.transitions[j].target;

        if (target instanceof PlusBlockStartState) {
          target.loopBackState = state;
        }
      }
    } else if (state instanceof StarLoopbackState) {
      for (j = 0; j < state.transitions.length; j++) {
        target = state.transitions[j].target;

        if (target instanceof StarLoopEntryState) {
          target.loopBackState = state;
        }
      }
    }
  }
};

ATNDeserializer.prototype.readDecisions = function (atn) {
  var ndecisions = this.readInt();

  for (var i = 0; i < ndecisions; i++) {
    var s = this.readInt();
    var decState = atn.states[s];
    atn.decisionToState.push(decState);
    decState.decision = i;
  }
};

ATNDeserializer.prototype.readLexerActions = function (atn) {
  if (atn.grammarType === ATNType.LEXER) {
    var count = this.readInt();
    atn.lexerActions = initArray(count, null);

    for (var i = 0; i < count; i++) {
      var actionType = this.readInt();
      var data1 = this.readInt();

      if (data1 === 0xFFFF) {
        data1 = -1;
      }

      var data2 = this.readInt();

      if (data2 === 0xFFFF) {
        data2 = -1;
      }

      var lexerAction = this.lexerActionFactory(actionType, data1, data2);
      atn.lexerActions[i] = lexerAction;
    }
  }
};

ATNDeserializer.prototype.generateRuleBypassTransitions = function (atn) {
  var i;
  var count = atn.ruleToStartState.length;

  for (i = 0; i < count; i++) {
    atn.ruleToTokenType[i] = atn.maxTokenType + i + 1;
  }

  for (i = 0; i < count; i++) {
    this.generateRuleBypassTransition(atn, i);
  }
};

ATNDeserializer.prototype.generateRuleBypassTransition = function (atn, idx) {
  var i, state;
  var bypassStart = new BasicBlockStartState();
  bypassStart.ruleIndex = idx;
  atn.addState(bypassStart);
  var bypassStop = new BlockEndState();
  bypassStop.ruleIndex = idx;
  atn.addState(bypassStop);
  bypassStart.endState = bypassStop;
  atn.defineDecisionState(bypassStart);
  bypassStop.startState = bypassStart;
  var excludeTransition = null;
  var endState = null;

  if (atn.ruleToStartState[idx].isPrecedenceRule) {
    // wrap from the beginning of the rule to the StarLoopEntryState
    endState = null;

    for (i = 0; i < atn.states.length; i++) {
      state = atn.states[i];

      if (this.stateIsEndStateFor(state, idx)) {
        endState = state;
        excludeTransition = state.loopBackState.transitions[0];
        break;
      }
    }

    if (excludeTransition === null) {
      throw "Couldn't identify final state of the precedence rule prefix section.";
    }
  } else {
    endState = atn.ruleToStopState[idx];
  } // all non-excluded transitions that currently target end state need to
  // target blockEnd instead


  for (i = 0; i < atn.states.length; i++) {
    state = atn.states[i];

    for (var j = 0; j < state.transitions.length; j++) {
      var transition = state.transitions[j];

      if (transition === excludeTransition) {
        continue;
      }

      if (transition.target === endState) {
        transition.target = bypassStop;
      }
    }
  } // all transitions leaving the rule start state need to leave blockStart
  // instead


  var ruleToStartState = atn.ruleToStartState[idx];
  var count = ruleToStartState.transitions.length;

  while (count > 0) {
    bypassStart.addTransition(ruleToStartState.transitions[count - 1]);
    ruleToStartState.transitions = ruleToStartState.transitions.slice(-1);
  } // link the new states


  atn.ruleToStartState[idx].addTransition(new EpsilonTransition(bypassStart));
  bypassStop.addTransition(new EpsilonTransition(endState));
  var matchState = new BasicState();
  atn.addState(matchState);
  matchState.addTransition(new AtomTransition(bypassStop, atn.ruleToTokenType[idx]));
  bypassStart.addTransition(new EpsilonTransition(matchState));
};

ATNDeserializer.prototype.stateIsEndStateFor = function (state, idx) {
  if (state.ruleIndex !== idx) {
    return null;
  }

  if (!(state instanceof StarLoopEntryState)) {
    return null;
  }

  var maybeLoopEndState = state.transitions[state.transitions.length - 1].target;

  if (!(maybeLoopEndState instanceof LoopEndState)) {
    return null;
  }

  if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transitions[0].target instanceof RuleStopState) {
    return state;
  } else {
    return null;
  }
}; //
// Analyze the {@link StarLoopEntryState} states in the specified ATN to set
// the {@link StarLoopEntryState//isPrecedenceDecision} field to the
// correct value.
//
// @param atn The ATN.
//


ATNDeserializer.prototype.markPrecedenceDecisions = function (atn) {
  for (var i = 0; i < atn.states.length; i++) {
    var state = atn.states[i];

    if (!(state instanceof StarLoopEntryState)) {
      continue;
    } // We analyze the ATN to determine if this ATN decision state is the
    // decision for the closure block that determines whether a
    // precedence rule should continue or complete.
    //


    if (atn.ruleToStartState[state.ruleIndex].isPrecedenceRule) {
      var maybeLoopEndState = state.transitions[state.transitions.length - 1].target;

      if (maybeLoopEndState instanceof LoopEndState) {
        if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transitions[0].target instanceof RuleStopState) {
          state.isPrecedenceDecision = true;
        }
      }
    }
  }
};

ATNDeserializer.prototype.verifyATN = function (atn) {
  if (!this.deserializationOptions.verifyATN) {
    return;
  } // verify assumptions


  for (var i = 0; i < atn.states.length; i++) {
    var state = atn.states[i];

    if (state === null) {
      continue;
    }

    this.checkCondition(state.epsilonOnlyTransitions || state.transitions.length <= 1);

    if (state instanceof PlusBlockStartState) {
      this.checkCondition(state.loopBackState !== null);
    } else if (state instanceof StarLoopEntryState) {
      this.checkCondition(state.loopBackState !== null);
      this.checkCondition(state.transitions.length === 2);

      if (state.transitions[0].target instanceof StarBlockStartState) {
        this.checkCondition(state.transitions[1].target instanceof LoopEndState);
        this.checkCondition(!state.nonGreedy);
      } else if (state.transitions[0].target instanceof LoopEndState) {
        this.checkCondition(state.transitions[1].target instanceof StarBlockStartState);
        this.checkCondition(state.nonGreedy);
      } else {
        throw "IllegalState";
      }
    } else if (state instanceof StarLoopbackState) {
      this.checkCondition(state.transitions.length === 1);
      this.checkCondition(state.transitions[0].target instanceof StarLoopEntryState);
    } else if (state instanceof LoopEndState) {
      this.checkCondition(state.loopBackState !== null);
    } else if (state instanceof RuleStartState) {
      this.checkCondition(state.stopState !== null);
    } else if (state instanceof BlockStartState) {
      this.checkCondition(state.endState !== null);
    } else if (state instanceof BlockEndState) {
      this.checkCondition(state.startState !== null);
    } else if (state instanceof DecisionState) {
      this.checkCondition(state.transitions.length <= 1 || state.decision >= 0);
    } else {
      this.checkCondition(state.transitions.length <= 1 || state instanceof RuleStopState);
    }
  }
};

ATNDeserializer.prototype.checkCondition = function (condition, message) {
  if (!condition) {
    if (message === undefined || message === null) {
      message = "IllegalState";
    }

    throw message;
  }
};

ATNDeserializer.prototype.readInt = function () {
  return this.data[this.pos++];
};

ATNDeserializer.prototype.readInt32 = function () {
  var low = this.readInt();
  var high = this.readInt();
  return low | high << 16;
};

ATNDeserializer.prototype.readLong = function () {
  var low = this.readInt32();
  var high = this.readInt32();
  return low & 0x00000000FFFFFFFF | high << 32;
};

function createByteToHex() {
  var bth = [];

  for (var i = 0; i < 256; i++) {
    bth[i] = (i + 0x100).toString(16).substr(1).toUpperCase();
  }

  return bth;
}

var byteToHex = createByteToHex();

ATNDeserializer.prototype.readUUID = function () {
  var bb = [];

  for (var i = 7; i >= 0; i--) {
    var _int = this.readInt();
    /* jshint bitwise: false */


    bb[2 * i + 1] = _int & 0xFF;
    bb[2 * i] = _int >> 8 & 0xFF;
  }

  return byteToHex[bb[0]] + byteToHex[bb[1]] + byteToHex[bb[2]] + byteToHex[bb[3]] + '-' + byteToHex[bb[4]] + byteToHex[bb[5]] + '-' + byteToHex[bb[6]] + byteToHex[bb[7]] + '-' + byteToHex[bb[8]] + byteToHex[bb[9]] + '-' + byteToHex[bb[10]] + byteToHex[bb[11]] + byteToHex[bb[12]] + byteToHex[bb[13]] + byteToHex[bb[14]] + byteToHex[bb[15]];
};

ATNDeserializer.prototype.edgeFactory = function (atn, type, src, trg, arg1, arg2, arg3, sets) {
  var target = atn.states[trg];

  switch (type) {
    case Transition.EPSILON:
      return new EpsilonTransition(target);

    case Transition.RANGE:
      return arg3 !== 0 ? new RangeTransition(target, Token.EOF, arg2) : new RangeTransition(target, arg1, arg2);

    case Transition.RULE:
      return new RuleTransition(atn.states[arg1], arg2, arg3, target);

    case Transition.PREDICATE:
      return new PredicateTransition(target, arg1, arg2, arg3 !== 0);

    case Transition.PRECEDENCE:
      return new PrecedencePredicateTransition(target, arg1);

    case Transition.ATOM:
      return arg3 !== 0 ? new AtomTransition(target, Token.EOF) : new AtomTransition(target, arg1);

    case Transition.ACTION:
      return new ActionTransition(target, arg1, arg2, arg3 !== 0);

    case Transition.SET:
      return new SetTransition(target, sets[arg1]);

    case Transition.NOT_SET:
      return new NotSetTransition(target, sets[arg1]);

    case Transition.WILDCARD:
      return new WildcardTransition(target);

    default:
      throw "The specified transition type: " + type + " is not valid.";
  }
};

ATNDeserializer.prototype.stateFactory = function (type, ruleIndex) {
  if (this.stateFactories === null) {
    var sf = [];
    sf[ATNState.INVALID_TYPE] = null;

    sf[ATNState.BASIC] = function () {
      return new BasicState();
    };

    sf[ATNState.RULE_START] = function () {
      return new RuleStartState();
    };

    sf[ATNState.BLOCK_START] = function () {
      return new BasicBlockStartState();
    };

    sf[ATNState.PLUS_BLOCK_START] = function () {
      return new PlusBlockStartState();
    };

    sf[ATNState.STAR_BLOCK_START] = function () {
      return new StarBlockStartState();
    };

    sf[ATNState.TOKEN_START] = function () {
      return new TokensStartState();
    };

    sf[ATNState.RULE_STOP] = function () {
      return new RuleStopState();
    };

    sf[ATNState.BLOCK_END] = function () {
      return new BlockEndState();
    };

    sf[ATNState.STAR_LOOP_BACK] = function () {
      return new StarLoopbackState();
    };

    sf[ATNState.STAR_LOOP_ENTRY] = function () {
      return new StarLoopEntryState();
    };

    sf[ATNState.PLUS_LOOP_BACK] = function () {
      return new PlusLoopbackState();
    };

    sf[ATNState.LOOP_END] = function () {
      return new LoopEndState();
    };

    this.stateFactories = sf;
  }

  if (type > this.stateFactories.length || this.stateFactories[type] === null) {
    throw "The specified state type " + type + " is not valid.";
  } else {
    var s = this.stateFactories[type]();

    if (s !== null) {
      s.ruleIndex = ruleIndex;
      return s;
    }
  }
};

ATNDeserializer.prototype.lexerActionFactory = function (type, data1, data2) {
  if (this.actionFactories === null) {
    var af = [];

    af[LexerActionType.CHANNEL] = function (data1, data2) {
      return new LexerChannelAction(data1);
    };

    af[LexerActionType.CUSTOM] = function (data1, data2) {
      return new LexerCustomAction(data1, data2);
    };

    af[LexerActionType.MODE] = function (data1, data2) {
      return new LexerModeAction(data1);
    };

    af[LexerActionType.MORE] = function (data1, data2) {
      return LexerMoreAction.INSTANCE;
    };

    af[LexerActionType.POP_MODE] = function (data1, data2) {
      return LexerPopModeAction.INSTANCE;
    };

    af[LexerActionType.PUSH_MODE] = function (data1, data2) {
      return new LexerPushModeAction(data1);
    };

    af[LexerActionType.SKIP] = function (data1, data2) {
      return LexerSkipAction.INSTANCE;
    };

    af[LexerActionType.TYPE] = function (data1, data2) {
      return new LexerTypeAction(data1);
    };

    this.actionFactories = af;
  }

  if (type > this.actionFactories.length || this.actionFactories[type] === null) {
    throw "The specified lexer action type " + type + " is not valid.";
  } else {
    return this.actionFactories[type](data1, data2);
  }
};

exports.ATNDeserializer = ATNDeserializer;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

function ATNDeserializationOptions(copyFrom) {
  if (copyFrom === undefined) {
    copyFrom = null;
  }

  this.readOnly = false;
  this.verifyATN = copyFrom === null ? true : copyFrom.verifyATN;
  this.generateRuleBypassTransitions = copyFrom === null ? false : copyFrom.generateRuleBypassTransitions;
  return this;
}

ATNDeserializationOptions.defaultOptions = new ATNDeserializationOptions();
ATNDeserializationOptions.defaultOptions.readOnly = true; //    def __setattr__(self, key, value):
//        if key!="readOnly" and self.readOnly:
//            raise Exception("The object is read only.")
//        super(type(self), self).__setattr__(key,value)

exports.ATNDeserializationOptions = ATNDeserializationOptions;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//

function LexerActionType() {}

LexerActionType.CHANNEL = 0; //The type of a {@link LexerChannelAction} action.

LexerActionType.CUSTOM = 1; //The type of a {@link LexerCustomAction} action.

LexerActionType.MODE = 2; //The type of a {@link LexerModeAction} action.

LexerActionType.MORE = 3; //The type of a {@link LexerMoreAction} action.

LexerActionType.POP_MODE = 4; //The type of a {@link LexerPopModeAction} action.

LexerActionType.PUSH_MODE = 5; //The type of a {@link LexerPushModeAction} action.

LexerActionType.SKIP = 6; //The type of a {@link LexerSkipAction} action.

LexerActionType.TYPE = 7; //The type of a {@link LexerTypeAction} action.

function LexerAction(action) {
  this.actionType = action;
  this.isPositionDependent = false;
  return this;
}

LexerAction.prototype.hashCode = function () {
  var hash = new Hash();
  this.updateHashCode(hash);
  return hash.finish();
};

LexerAction.prototype.updateHashCode = function (hash) {
  hash.update(this.actionType);
};

LexerAction.prototype.equals = function (other) {
  return this === other;
}; //
// Implements the {@code skip} lexer action by calling {@link Lexer//skip}.
//
// <p>The {@code skip} command does not have any parameters, so this action is
// implemented as a singleton instance exposed by {@link //INSTANCE}.</p>


function LexerSkipAction() {
  LexerAction.call(this, LexerActionType.SKIP);
  return this;
}

LexerSkipAction.prototype = Object.create(LexerAction.prototype);
LexerSkipAction.prototype.constructor = LexerSkipAction; // Provides a singleton instance of this parameterless lexer action.

LexerSkipAction.INSTANCE = new LexerSkipAction();

LexerSkipAction.prototype.execute = function (lexer) {
  lexer.skip();
};

LexerSkipAction.prototype.toString = function () {
  return "skip";
}; //  Implements the {@code type} lexer action by calling {@link Lexer//setType}
// with the assigned type.


function LexerTypeAction(type) {
  LexerAction.call(this, LexerActionType.TYPE);
  this.type = type;
  return this;
}

LexerTypeAction.prototype = Object.create(LexerAction.prototype);
LexerTypeAction.prototype.constructor = LexerTypeAction;

LexerTypeAction.prototype.execute = function (lexer) {
  lexer.type = this.type;
};

LexerTypeAction.prototype.updateHashCode = function (hash) {
  hash.update(this.actionType, this.type);
};

LexerTypeAction.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof LexerTypeAction)) {
    return false;
  } else {
    return this.type === other.type;
  }
};

LexerTypeAction.prototype.toString = function () {
  return "type(" + this.type + ")";
}; // Implements the {@code pushMode} lexer action by calling
// {@link Lexer//pushMode} with the assigned mode.


function LexerPushModeAction(mode) {
  LexerAction.call(this, LexerActionType.PUSH_MODE);
  this.mode = mode;
  return this;
}

LexerPushModeAction.prototype = Object.create(LexerAction.prototype);
LexerPushModeAction.prototype.constructor = LexerPushModeAction; // <p>This action is implemented by calling {@link Lexer//pushMode} with the
// value provided by {@link //getMode}.</p>

LexerPushModeAction.prototype.execute = function (lexer) {
  lexer.pushMode(this.mode);
};

LexerPushModeAction.prototype.updateHashCode = function (hash) {
  hash.update(this.actionType, this.mode);
};

LexerPushModeAction.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof LexerPushModeAction)) {
    return false;
  } else {
    return this.mode === other.mode;
  }
};

LexerPushModeAction.prototype.toString = function () {
  return "pushMode(" + this.mode + ")";
}; // Implements the {@code popMode} lexer action by calling {@link Lexer//popMode}.
//
// <p>The {@code popMode} command does not have any parameters, so this action is
// implemented as a singleton instance exposed by {@link //INSTANCE}.</p>


function LexerPopModeAction() {
  LexerAction.call(this, LexerActionType.POP_MODE);
  return this;
}

LexerPopModeAction.prototype = Object.create(LexerAction.prototype);
LexerPopModeAction.prototype.constructor = LexerPopModeAction;
LexerPopModeAction.INSTANCE = new LexerPopModeAction(); // <p>This action is implemented by calling {@link Lexer//popMode}.</p>

LexerPopModeAction.prototype.execute = function (lexer) {
  lexer.popMode();
};

LexerPopModeAction.prototype.toString = function () {
  return "popMode";
}; // Implements the {@code more} lexer action by calling {@link Lexer//more}.
//
// <p>The {@code more} command does not have any parameters, so this action is
// implemented as a singleton instance exposed by {@link //INSTANCE}.</p>


function LexerMoreAction() {
  LexerAction.call(this, LexerActionType.MORE);
  return this;
}

LexerMoreAction.prototype = Object.create(LexerAction.prototype);
LexerMoreAction.prototype.constructor = LexerMoreAction;
LexerMoreAction.INSTANCE = new LexerMoreAction(); // <p>This action is implemented by calling {@link Lexer//popMode}.</p>

LexerMoreAction.prototype.execute = function (lexer) {
  lexer.more();
};

LexerMoreAction.prototype.toString = function () {
  return "more";
}; // Implements the {@code mode} lexer action by calling {@link Lexer//mode} with
// the assigned mode.


function LexerModeAction(mode) {
  LexerAction.call(this, LexerActionType.MODE);
  this.mode = mode;
  return this;
}

LexerModeAction.prototype = Object.create(LexerAction.prototype);
LexerModeAction.prototype.constructor = LexerModeAction; // <p>This action is implemented by calling {@link Lexer//mode} with the
// value provided by {@link //getMode}.</p>

LexerModeAction.prototype.execute = function (lexer) {
  lexer.mode(this.mode);
};

LexerModeAction.prototype.updateHashCode = function (hash) {
  hash.update(this.actionType, this.mode);
};

LexerModeAction.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof LexerModeAction)) {
    return false;
  } else {
    return this.mode === other.mode;
  }
};

LexerModeAction.prototype.toString = function () {
  return "mode(" + this.mode + ")";
}; // Executes a custom lexer action by calling {@link Recognizer//action} with the
// rule and action indexes assigned to the custom action. The implementation of
// a custom action is added to the generated code for the lexer in an override
// of {@link Recognizer//action} when the grammar is compiled.
//
// <p>This class may represent embedded actions created with the <code>{...}</code>
// syntax in ANTLR 4, as well as actions created for lexer commands where the
// command argument could not be evaluated when the grammar was compiled.</p>
// Constructs a custom lexer action with the specified rule and action
// indexes.
//
// @param ruleIndex The rule index to use for calls to
// {@link Recognizer//action}.
// @param actionIndex The action index to use for calls to
// {@link Recognizer//action}.


function LexerCustomAction(ruleIndex, actionIndex) {
  LexerAction.call(this, LexerActionType.CUSTOM);
  this.ruleIndex = ruleIndex;
  this.actionIndex = actionIndex;
  this.isPositionDependent = true;
  return this;
}

LexerCustomAction.prototype = Object.create(LexerAction.prototype);
LexerCustomAction.prototype.constructor = LexerCustomAction; // <p>Custom actions are implemented by calling {@link Lexer//action} with the
// appropriate rule and action indexes.</p>

LexerCustomAction.prototype.execute = function (lexer) {
  lexer.action(null, this.ruleIndex, this.actionIndex);
};

LexerCustomAction.prototype.updateHashCode = function (hash) {
  hash.update(this.actionType, this.ruleIndex, this.actionIndex);
};

LexerCustomAction.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof LexerCustomAction)) {
    return false;
  } else {
    return this.ruleIndex === other.ruleIndex && this.actionIndex === other.actionIndex;
  }
}; // Implements the {@code channel} lexer action by calling
// {@link Lexer//setChannel} with the assigned channel.
// Constructs a new {@code channel} action with the specified channel value.
// @param channel The channel value to pass to {@link Lexer//setChannel}.


function LexerChannelAction(channel) {
  LexerAction.call(this, LexerActionType.CHANNEL);
  this.channel = channel;
  return this;
}

LexerChannelAction.prototype = Object.create(LexerAction.prototype);
LexerChannelAction.prototype.constructor = LexerChannelAction; // <p>This action is implemented by calling {@link Lexer//setChannel} with the
// value provided by {@link //getChannel}.</p>

LexerChannelAction.prototype.execute = function (lexer) {
  lexer._channel = this.channel;
};

LexerChannelAction.prototype.updateHashCode = function (hash) {
  hash.update(this.actionType, this.channel);
};

LexerChannelAction.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof LexerChannelAction)) {
    return false;
  } else {
    return this.channel === other.channel;
  }
};

LexerChannelAction.prototype.toString = function () {
  return "channel(" + this.channel + ")";
}; // This implementation of {@link LexerAction} is used for tracking input offsets
// for position-dependent actions within a {@link LexerActionExecutor}.
//
// <p>This action is not serialized as part of the ATN, and is only required for
// position-dependent lexer actions which appear at a location other than the
// end of a rule. For more information about DFA optimizations employed for
// lexer actions, see {@link LexerActionExecutor//append} and
// {@link LexerActionExecutor//fixOffsetBeforeMatch}.</p>
// Constructs a new indexed custom action by associating a character offset
// with a {@link LexerAction}.
//
// <p>Note: This class is only required for lexer actions for which
// {@link LexerAction//isPositionDependent} returns {@code true}.</p>
//
// @param offset The offset into the input {@link CharStream}, relative to
// the token start index, at which the specified lexer action should be
// executed.
// @param action The lexer action to execute at a particular offset in the
// input {@link CharStream}.


function LexerIndexedCustomAction(offset, action) {
  LexerAction.call(this, action.actionType);
  this.offset = offset;
  this.action = action;
  this.isPositionDependent = true;
  return this;
}

LexerIndexedCustomAction.prototype = Object.create(LexerAction.prototype);
LexerIndexedCustomAction.prototype.constructor = LexerIndexedCustomAction; // <p>This method calls {@link //execute} on the result of {@link //getAction}
// using the provided {@code lexer}.</p>

LexerIndexedCustomAction.prototype.execute = function (lexer) {
  // assume the input stream position was properly set by the calling code
  this.action.execute(lexer);
};

LexerIndexedCustomAction.prototype.updateHashCode = function (hash) {
  hash.update(this.actionType, this.offset, this.action);
};

LexerIndexedCustomAction.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof LexerIndexedCustomAction)) {
    return false;
  } else {
    return this.offset === other.offset && this.action === other.action;
  }
};

exports.LexerActionType = LexerActionType;
exports.LexerSkipAction = LexerSkipAction;
exports.LexerChannelAction = LexerChannelAction;
exports.LexerCustomAction = LexerCustomAction;
exports.LexerIndexedCustomAction = LexerIndexedCustomAction;
exports.LexerMoreAction = LexerMoreAction;
exports.LexerTypeAction = LexerTypeAction;
exports.LexerPushModeAction = LexerPushModeAction;
exports.LexerPopModeAction = LexerPopModeAction;
exports.LexerModeAction = LexerModeAction;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//

var Token = __webpack_require__(3).Token;

var ConsoleErrorListener = __webpack_require__(22).ConsoleErrorListener;

var ProxyErrorListener = __webpack_require__(22).ProxyErrorListener;

function Recognizer() {
  this._listeners = [ConsoleErrorListener.INSTANCE];
  this._interp = null;
  this._stateNumber = -1;
  return this;
}

Recognizer.tokenTypeMapCache = {};
Recognizer.ruleIndexMapCache = {};

Recognizer.prototype.checkVersion = function (toolVersion) {
  var runtimeVersion = "4.7";

  if (runtimeVersion !== toolVersion) {
    console.log("ANTLR runtime and generated code versions disagree: " + runtimeVersion + "!=" + toolVersion);
  }
};

Recognizer.prototype.addErrorListener = function (listener) {
  this._listeners.push(listener);
};

Recognizer.prototype.removeErrorListeners = function () {
  this._listeners = [];
};

Recognizer.prototype.getTokenTypeMap = function () {
  var tokenNames = this.getTokenNames();

  if (tokenNames === null) {
    throw "The current recognizer does not provide a list of token names.";
  }

  var result = this.tokenTypeMapCache[tokenNames];

  if (result === undefined) {
    result = tokenNames.reduce(function (o, k, i) {
      o[k] = i;
    });
    result.EOF = Token.EOF;
    this.tokenTypeMapCache[tokenNames] = result;
  }

  return result;
}; // Get a map from rule names to rule indexes.
//
// <p>Used for XPath and tree pattern compilation.</p>
//


Recognizer.prototype.getRuleIndexMap = function () {
  var ruleNames = this.ruleNames;

  if (ruleNames === null) {
    throw "The current recognizer does not provide a list of rule names.";
  }

  var result = this.ruleIndexMapCache[ruleNames];

  if (result === undefined) {
    result = ruleNames.reduce(function (o, k, i) {
      o[k] = i;
    });
    this.ruleIndexMapCache[ruleNames] = result;
  }

  return result;
};

Recognizer.prototype.getTokenType = function (tokenName) {
  var ttype = this.getTokenTypeMap()[tokenName];

  if (ttype !== undefined) {
    return ttype;
  } else {
    return Token.INVALID_TYPE;
  }
}; // What is the error header, normally line/character position information?//


Recognizer.prototype.getErrorHeader = function (e) {
  var line = e.getOffendingToken().line;
  var column = e.getOffendingToken().column;
  return "line " + line + ":" + column;
}; // How should a token be displayed in an error message? The default
//  is to display just the text, but during development you might
//  want to have a lot of information spit out.  Override in that case
//  to use t.toString() (which, for CommonToken, dumps everything about
//  the token). This is better than forcing you to override a method in
//  your token objects because you don't have to go modify your lexer
//  so that it creates a new Java type.
//
// @deprecated This method is not called by the ANTLR 4 Runtime. Specific
// implementations of {@link ANTLRErrorStrategy} may provide a similar
// feature when necessary. For example, see
// {@link DefaultErrorStrategy//getTokenErrorDisplay}.
//


Recognizer.prototype.getTokenErrorDisplay = function (t) {
  if (t === null) {
    return "<no token>";
  }

  var s = t.text;

  if (s === null) {
    if (t.type === Token.EOF) {
      s = "<EOF>";
    } else {
      s = "<" + t.type + ">";
    }
  }

  s = s.replace("\n", "\\n").replace("\r", "\\r").replace("\t", "\\t");
  return "'" + s + "'";
};

Recognizer.prototype.getErrorListenerDispatch = function () {
  return new ProxyErrorListener(this._listeners);
}; // subclass needs to override these if there are sempreds or actions
// that the ATN interp needs to execute


Recognizer.prototype.sempred = function (localctx, ruleIndex, actionIndex) {
  return true;
};

Recognizer.prototype.precpred = function (localctx, precedence) {
  return true;
}; //Indicate that the recognizer has changed internal state that is
//consistent with the ATN state passed in.  This way we always know
//where we are in the ATN as the parser goes along. The rule
//context objects form a stack that lets us see the stack of
//invoking rules. Combine this and we have complete ATN
//configuration information.


Object.defineProperty(Recognizer.prototype, "state", {
  get: function get() {
    return this._stateNumber;
  },
  set: function set(state) {
    this._stateNumber = state;
  }
});
exports.Recognizer = Recognizer;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///

var DFAState = __webpack_require__(15).DFAState;

var ATNConfigSet = __webpack_require__(12).ATNConfigSet;

var getCachedPredictionContext = __webpack_require__(8).getCachedPredictionContext;

function ATNSimulator(atn, sharedContextCache) {
  // The context cache maps all PredictionContext objects that are ==
  //  to a single cached copy. This cache is shared across all contexts
  //  in all ATNConfigs in all DFA states.  We rebuild each ATNConfigSet
  //  to use only cached nodes/graphs in addDFAState(). We don't want to
  //  fill this during closure() since there are lots of contexts that
  //  pop up but are not used ever again. It also greatly slows down closure().
  //
  //  <p>This cache makes a huge difference in memory and a little bit in speed.
  //  For the Java grammar on java.*, it dropped the memory requirements
  //  at the end from 25M to 16M. We don't store any of the full context
  //  graphs in the DFA because they are limited to local context only,
  //  but apparently there's a lot of repetition there as well. We optimize
  //  the config contexts before storing the config set in the DFA states
  //  by literally rebuilding them with cached subgraphs only.</p>
  //
  //  <p>I tried a cache for use during closure operations, that was
  //  whacked after each adaptivePredict(). It cost a little bit
  //  more time I think and doesn't save on the overall footprint
  //  so it's not worth the complexity.</p>
  ///
  this.atn = atn;
  this.sharedContextCache = sharedContextCache;
  return this;
} // Must distinguish between missing edge and edge we know leads nowhere///


ATNSimulator.ERROR = new DFAState(0x7FFFFFFF, new ATNConfigSet());

ATNSimulator.prototype.getCachedContext = function (context) {
  if (this.sharedContextCache === null) {
    return context;
  }

  var visited = {};
  return getCachedPredictionContext(context, this.sharedContextCache, visited);
};

exports.ATNSimulator = ATNSimulator;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
//
// This enumeration defines the prediction modes available in ANTLR 4 along with
// utility methods for analyzing configuration sets for conflicts and/or
// ambiguities.

var Set = __webpack_require__(2).Set;

var Map = __webpack_require__(2).Map;

var BitSet = __webpack_require__(2).BitSet;

var AltDict = __webpack_require__(2).AltDict;

var ATN = __webpack_require__(9).ATN;

var RuleStopState = __webpack_require__(5).RuleStopState;

var ATNConfigSet = __webpack_require__(12).ATNConfigSet;

var ATNConfig = __webpack_require__(19).ATNConfig;

var SemanticContext = __webpack_require__(14).SemanticContext;

var Hash = __webpack_require__(2).Hash;

var hashStuff = __webpack_require__(2).hashStuff;

var equalArrays = __webpack_require__(2).equalArrays;

function PredictionMode() {
  return this;
} //
// The SLL(*) prediction mode. This prediction mode ignores the current
// parser context when making predictions. This is the fastest prediction
// mode, and provides correct results for many grammars. This prediction
// mode is more powerful than the prediction mode provided by ANTLR 3, but
// may result in syntax errors for grammar and input combinations which are
// not SLL.
//
// <p>
// When using this prediction mode, the parser will either return a correct
// parse tree (i.e. the same parse tree that would be returned with the
// {@link //LL} prediction mode), or it will report a syntax error. If a
// syntax error is encountered when using the {@link //SLL} prediction mode,
// it may be due to either an actual syntax error in the input or indicate
// that the particular combination of grammar and input requires the more
// powerful {@link //LL} prediction abilities to complete successfully.</p>
//
// <p>
// This prediction mode does not provide any guarantees for prediction
// behavior for syntactically-incorrect inputs.</p>
//


PredictionMode.SLL = 0; //
// The LL(*) prediction mode. This prediction mode allows the current parser
// context to be used for resolving SLL conflicts that occur during
// prediction. This is the fastest prediction mode that guarantees correct
// parse results for all combinations of grammars with syntactically correct
// inputs.
//
// <p>
// When using this prediction mode, the parser will make correct decisions
// for all syntactically-correct grammar and input combinations. However, in
// cases where the grammar is truly ambiguous this prediction mode might not
// report a precise answer for <em>exactly which</em> alternatives are
// ambiguous.</p>
//
// <p>
// This prediction mode does not provide any guarantees for prediction
// behavior for syntactically-incorrect inputs.</p>
//

PredictionMode.LL = 1; //
// The LL(*) prediction mode with exact ambiguity detection. In addition to
// the correctness guarantees provided by the {@link //LL} prediction mode,
// this prediction mode instructs the prediction algorithm to determine the
// complete and exact set of ambiguous alternatives for every ambiguous
// decision encountered while parsing.
//
// <p>
// This prediction mode may be used for diagnosing ambiguities during
// grammar development. Due to the performance overhead of calculating sets
// of ambiguous alternatives, this prediction mode should be avoided when
// the exact results are not necessary.</p>
//
// <p>
// This prediction mode does not provide any guarantees for prediction
// behavior for syntactically-incorrect inputs.</p>
//

PredictionMode.LL_EXACT_AMBIG_DETECTION = 2; //
// Computes the SLL prediction termination condition.
//
// <p>
// This method computes the SLL prediction termination condition for both of
// the following cases.</p>
//
// <ul>
// <li>The usual SLL+LL fallback upon SLL conflict</li>
// <li>Pure SLL without LL fallback</li>
// </ul>
//
// <p><strong>COMBINED SLL+LL PARSING</strong></p>
//
// <p>When LL-fallback is enabled upon SLL conflict, correct predictions are
// ensured regardless of how the termination condition is computed by this
// method. Due to the substantially higher cost of LL prediction, the
// prediction should only fall back to LL when the additional lookahead
// cannot lead to a unique SLL prediction.</p>
//
// <p>Assuming combined SLL+LL parsing, an SLL configuration set with only
// conflicting subsets should fall back to full LL, even if the
// configuration sets don't resolve to the same alternative (e.g.
// {@code {1,2}} and {@code {3,4}}. If there is at least one non-conflicting
// configuration, SLL could continue with the hopes that more lookahead will
// resolve via one of those non-conflicting configurations.</p>
//
// <p>Here's the prediction termination rule them: SLL (for SLL+LL parsing)
// stops when it sees only conflicting configuration subsets. In contrast,
// full LL keeps going when there is uncertainty.</p>
//
// <p><strong>HEURISTIC</strong></p>
//
// <p>As a heuristic, we stop prediction when we see any conflicting subset
// unless we see a state that only has one alternative associated with it.
// The single-alt-state thing lets prediction continue upon rules like
// (otherwise, it would admit defeat too soon):</p>
//
// <p>{@code [12|1|[], 6|2|[], 12|2|[]]. s : (ID | ID ID?) ';' ;}</p>
//
// <p>When the ATN simulation reaches the state before {@code ';'}, it has a
// DFA state that looks like: {@code [12|1|[], 6|2|[], 12|2|[]]}. Naturally
// {@code 12|1|[]} and {@code 12|2|[]} conflict, but we cannot stop
// processing this node because alternative to has another way to continue,
// via {@code [6|2|[]]}.</p>
//
// <p>It also let's us continue for this rule:</p>
//
// <p>{@code [1|1|[], 1|2|[], 8|3|[]] a : A | A | A B ;}</p>
//
// <p>After matching input A, we reach the stop state for rule A, state 1.
// State 8 is the state right before B. Clearly alternatives 1 and 2
// conflict and no amount of further lookahead will separate the two.
// However, alternative 3 will be able to continue and so we do not stop
// working on this state. In the previous example, we're concerned with
// states associated with the conflicting alternatives. Here alt 3 is not
// associated with the conflicting configs, but since we can continue
// looking for input reasonably, don't declare the state done.</p>
//
// <p><strong>PURE SLL PARSING</strong></p>
//
// <p>To handle pure SLL parsing, all we have to do is make sure that we
// combine stack contexts for configurations that differ only by semantic
// predicate. From there, we can do the usual SLL termination heuristic.</p>
//
// <p><strong>PREDICATES IN SLL+LL PARSING</strong></p>
//
// <p>SLL decisions don't evaluate predicates until after they reach DFA stop
// states because they need to create the DFA cache that works in all
// semantic situations. In contrast, full LL evaluates predicates collected
// during start state computation so it can ignore predicates thereafter.
// This means that SLL termination detection can totally ignore semantic
// predicates.</p>
//
// <p>Implementation-wise, {@link ATNConfigSet} combines stack contexts but not
// semantic predicate contexts so we might see two configurations like the
// following.</p>
//
// <p>{@code (s, 1, x, {}), (s, 1, x', {p})}</p>
//
// <p>Before testing these configurations against others, we have to merge
// {@code x} and {@code x'} (without modifying the existing configurations).
// For example, we test {@code (x+x')==x''} when looking for conflicts in
// the following configurations.</p>
//
// <p>{@code (s, 1, x, {}), (s, 1, x', {p}), (s, 2, x'', {})}</p>
//
// <p>If the configuration set has predicates (as indicated by
// {@link ATNConfigSet//hasSemanticContext}), this algorithm makes a copy of
// the configurations to strip out all of the predicates so that a standard
// {@link ATNConfigSet} will merge everything ignoring predicates.</p>
//

PredictionMode.hasSLLConflictTerminatingPrediction = function (mode, configs) {
  // Configs in rule stop states indicate reaching the end of the decision
  // rule (local context) or end of start rule (full context). If all
  // configs meet this condition, then none of the configurations is able
  // to match additional input so we terminate prediction.
  //
  if (PredictionMode.allConfigsInRuleStopStates(configs)) {
    return true;
  } // pure SLL mode parsing


  if (mode === PredictionMode.SLL) {
    // Don't bother with combining configs from different semantic
    // contexts if we can fail over to full LL; costs more time
    // since we'll often fail over anyway.
    if (configs.hasSemanticContext) {
      // dup configs, tossing out semantic predicates
      var dup = new ATNConfigSet();

      for (var i = 0; i < configs.items.length; i++) {
        var c = configs.items[i];
        c = new ATNConfig({
          semanticContext: SemanticContext.NONE
        }, c);
        dup.add(c);
      }

      configs = dup;
    } // now we have combined contexts for configs with dissimilar preds

  } // pure SLL or combined SLL+LL mode parsing


  var altsets = PredictionMode.getConflictingAltSubsets(configs);
  return PredictionMode.hasConflictingAltSet(altsets) && !PredictionMode.hasStateAssociatedWithOneAlt(configs);
}; // Checks if any configuration in {@code configs} is in a
// {@link RuleStopState}. Configurations meeting this condition have reached
// the end of the decision rule (local context) or end of start rule (full
// context).
//
// @param configs the configuration set to test
// @return {@code true} if any configuration in {@code configs} is in a
// {@link RuleStopState}, otherwise {@code false}


PredictionMode.hasConfigInRuleStopState = function (configs) {
  for (var i = 0; i < configs.items.length; i++) {
    var c = configs.items[i];

    if (c.state instanceof RuleStopState) {
      return true;
    }
  }

  return false;
}; // Checks if all configurations in {@code configs} are in a
// {@link RuleStopState}. Configurations meeting this condition have reached
// the end of the decision rule (local context) or end of start rule (full
// context).
//
// @param configs the configuration set to test
// @return {@code true} if all configurations in {@code configs} are in a
// {@link RuleStopState}, otherwise {@code false}


PredictionMode.allConfigsInRuleStopStates = function (configs) {
  for (var i = 0; i < configs.items.length; i++) {
    var c = configs.items[i];

    if (!(c.state instanceof RuleStopState)) {
      return false;
    }
  }

  return true;
}; //
// Full LL prediction termination.
//
// <p>Can we stop looking ahead during ATN simulation or is there some
// uncertainty as to which alternative we will ultimately pick, after
// consuming more input? Even if there are partial conflicts, we might know
// that everything is going to resolve to the same minimum alternative. That
// means we can stop since no more lookahead will change that fact. On the
// other hand, there might be multiple conflicts that resolve to different
// minimums. That means we need more look ahead to decide which of those
// alternatives we should predict.</p>
//
// <p>The basic idea is to split the set of configurations {@code C}, into
// conflicting subsets {@code (s, _, ctx, _)} and singleton subsets with
// non-conflicting configurations. Two configurations conflict if they have
// identical {@link ATNConfig//state} and {@link ATNConfig//context} values
// but different {@link ATNConfig//alt} value, e.g. {@code (s, i, ctx, _)}
// and {@code (s, j, ctx, _)} for {@code i!=j}.</p>
//
// <p>Reduce these configuration subsets to the set of possible alternatives.
// You can compute the alternative subsets in one pass as follows:</p>
//
// <p>{@code A_s,ctx = {i | (s, i, ctx, _)}} for each configuration in
// {@code C} holding {@code s} and {@code ctx} fixed.</p>
//
// <p>Or in pseudo-code, for each configuration {@code c} in {@code C}:</p>
//
// <pre>
// map[c] U= c.{@link ATNConfig//alt alt} // map hash/equals uses s and x, not
// alt and not pred
// </pre>
//
// <p>The values in {@code map} are the set of {@code A_s,ctx} sets.</p>
//
// <p>If {@code |A_s,ctx|=1} then there is no conflict associated with
// {@code s} and {@code ctx}.</p>
//
// <p>Reduce the subsets to singletons by choosing a minimum of each subset. If
// the union of these alternative subsets is a singleton, then no amount of
// more lookahead will help us. We will always pick that alternative. If,
// however, there is more than one alternative, then we are uncertain which
// alternative to predict and must continue looking for resolution. We may
// or may not discover an ambiguity in the future, even if there are no
// conflicting subsets this round.</p>
//
// <p>The biggest sin is to terminate early because it means we've made a
// decision but were uncertain as to the eventual outcome. We haven't used
// enough lookahead. On the other hand, announcing a conflict too late is no
// big deal; you will still have the conflict. It's just inefficient. It
// might even look until the end of file.</p>
//
// <p>No special consideration for semantic predicates is required because
// predicates are evaluated on-the-fly for full LL prediction, ensuring that
// no configuration contains a semantic context during the termination
// check.</p>
//
// <p><strong>CONFLICTING CONFIGS</strong></p>
//
// <p>Two configurations {@code (s, i, x)} and {@code (s, j, x')}, conflict
// when {@code i!=j} but {@code x=x'}. Because we merge all
// {@code (s, i, _)} configurations together, that means that there are at
// most {@code n} configurations associated with state {@code s} for
// {@code n} possible alternatives in the decision. The merged stacks
// complicate the comparison of configuration contexts {@code x} and
// {@code x'}. Sam checks to see if one is a subset of the other by calling
// merge and checking to see if the merged result is either {@code x} or
// {@code x'}. If the {@code x} associated with lowest alternative {@code i}
// is the superset, then {@code i} is the only possible prediction since the
// others resolve to {@code min(i)} as well. However, if {@code x} is
// associated with {@code j>i} then at least one stack configuration for
// {@code j} is not in conflict with alternative {@code i}. The algorithm
// should keep going, looking for more lookahead due to the uncertainty.</p>
//
// <p>For simplicity, I'm doing a equality check between {@code x} and
// {@code x'} that lets the algorithm continue to consume lookahead longer
// than necessary. The reason I like the equality is of course the
// simplicity but also because that is the test you need to detect the
// alternatives that are actually in conflict.</p>
//
// <p><strong>CONTINUE/STOP RULE</strong></p>
//
// <p>Continue if union of resolved alternative sets from non-conflicting and
// conflicting alternative subsets has more than one alternative. We are
// uncertain about which alternative to predict.</p>
//
// <p>The complete set of alternatives, {@code [i for (_,i,_)]}, tells us which
// alternatives are still in the running for the amount of input we've
// consumed at this point. The conflicting sets let us to strip away
// configurations that won't lead to more states because we resolve
// conflicts to the configuration with a minimum alternate for the
// conflicting set.</p>
//
// <p><strong>CASES</strong></p>
//
// <ul>
//
// <li>no conflicts and more than 1 alternative in set =&gt; continue</li>
//
// <li> {@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s, 3, z)},
// {@code (s', 1, y)}, {@code (s', 2, y)} yields non-conflicting set
// {@code {3}} U conflicting sets {@code min({1,2})} U {@code min({1,2})} =
// {@code {1,3}} =&gt; continue
// </li>
//
// <li>{@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s', 1, y)},
// {@code (s', 2, y)}, {@code (s'', 1, z)} yields non-conflicting set
// {@code {1}} U conflicting sets {@code min({1,2})} U {@code min({1,2})} =
// {@code {1}} =&gt; stop and predict 1</li>
//
// <li>{@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s', 1, y)},
// {@code (s', 2, y)} yields conflicting, reduced sets {@code {1}} U
// {@code {1}} = {@code {1}} =&gt; stop and predict 1, can announce
// ambiguity {@code {1,2}}</li>
//
// <li>{@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s', 2, y)},
// {@code (s', 3, y)} yields conflicting, reduced sets {@code {1}} U
// {@code {2}} = {@code {1,2}} =&gt; continue</li>
//
// <li>{@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s', 3, y)},
// {@code (s', 4, y)} yields conflicting, reduced sets {@code {1}} U
// {@code {3}} = {@code {1,3}} =&gt; continue</li>
//
// </ul>
//
// <p><strong>EXACT AMBIGUITY DETECTION</strong></p>
//
// <p>If all states report the same conflicting set of alternatives, then we
// know we have the exact ambiguity set.</p>
//
// <p><code>|A_<em>i</em>|&gt;1</code> and
// <code>A_<em>i</em> = A_<em>j</em></code> for all <em>i</em>, <em>j</em>.</p>
//
// <p>In other words, we continue examining lookahead until all {@code A_i}
// have more than one alternative and all {@code A_i} are the same. If
// {@code A={{1,2}, {1,3}}}, then regular LL prediction would terminate
// because the resolved set is {@code {1}}. To determine what the real
// ambiguity is, we have to know whether the ambiguity is between one and
// two or one and three so we keep going. We can only stop prediction when
// we need exact ambiguity detection when the sets look like
// {@code A={{1,2}}} or {@code {{1,2},{1,2}}}, etc...</p>
//


PredictionMode.resolvesToJustOneViableAlt = function (altsets) {
  return PredictionMode.getSingleViableAlt(altsets);
}; //
// Determines if every alternative subset in {@code altsets} contains more
// than one alternative.
//
// @param altsets a collection of alternative subsets
// @return {@code true} if every {@link BitSet} in {@code altsets} has
// {@link BitSet//cardinality cardinality} &gt; 1, otherwise {@code false}
//


PredictionMode.allSubsetsConflict = function (altsets) {
  return !PredictionMode.hasNonConflictingAltSet(altsets);
}; //
// Determines if any single alternative subset in {@code altsets} contains
// exactly one alternative.
//
// @param altsets a collection of alternative subsets
// @return {@code true} if {@code altsets} contains a {@link BitSet} with
// {@link BitSet//cardinality cardinality} 1, otherwise {@code false}
//


PredictionMode.hasNonConflictingAltSet = function (altsets) {
  for (var i = 0; i < altsets.length; i++) {
    var alts = altsets[i];

    if (alts.length === 1) {
      return true;
    }
  }

  return false;
}; //
// Determines if any single alternative subset in {@code altsets} contains
// more than one alternative.
//
// @param altsets a collection of alternative subsets
// @return {@code true} if {@code altsets} contains a {@link BitSet} with
// {@link BitSet//cardinality cardinality} &gt; 1, otherwise {@code false}
//


PredictionMode.hasConflictingAltSet = function (altsets) {
  for (var i = 0; i < altsets.length; i++) {
    var alts = altsets[i];

    if (alts.length > 1) {
      return true;
    }
  }

  return false;
}; //
// Determines if every alternative subset in {@code altsets} is equivalent.
//
// @param altsets a collection of alternative subsets
// @return {@code true} if every member of {@code altsets} is equal to the
// others, otherwise {@code false}
//


PredictionMode.allSubsetsEqual = function (altsets) {
  var first = null;

  for (var i = 0; i < altsets.length; i++) {
    var alts = altsets[i];

    if (first === null) {
      first = alts;
    } else if (alts !== first) {
      return false;
    }
  }

  return true;
}; //
// Returns the unique alternative predicted by all alternative subsets in
// {@code altsets}. If no such alternative exists, this method returns
// {@link ATN//INVALID_ALT_NUMBER}.
//
// @param altsets a collection of alternative subsets
//


PredictionMode.getUniqueAlt = function (altsets) {
  var all = PredictionMode.getAlts(altsets);

  if (all.length === 1) {
    return all.minValue();
  } else {
    return ATN.INVALID_ALT_NUMBER;
  }
}; // Gets the complete set of represented alternatives for a collection of
// alternative subsets. This method returns the union of each {@link BitSet}
// in {@code altsets}.
//
// @param altsets a collection of alternative subsets
// @return the set of represented alternatives in {@code altsets}
//


PredictionMode.getAlts = function (altsets) {
  var all = new BitSet();
  altsets.map(function (alts) {
    all.or(alts);
  });
  return all;
}; //
// This function gets the conflicting alt subsets from a configuration set.
// For each configuration {@code c} in {@code configs}:
//
// <pre>
// map[c] U= c.{@link ATNConfig//alt alt} // map hash/equals uses s and x, not
// alt and not pred
// </pre>


PredictionMode.getConflictingAltSubsets = function (configs) {
  var configToAlts = new Map();

  configToAlts.hashFunction = function (cfg) {
    hashStuff(cfg.state.stateNumber, cfg.context);
  };

  configToAlts.equalsFunction = function (c1, c2) {
    return c1.state.stateNumber == c2.state.stateNumber && c1.context.equals(c2.context);
  };

  configs.items.map(function (cfg) {
    var alts = configToAlts.get(cfg);

    if (alts === null) {
      alts = new BitSet();
      configToAlts.put(cfg, alts);
    }

    alts.add(cfg.alt);
  });
  return configToAlts.getValues();
}; //
// Get a map from state to alt subset from a configuration set. For each
// configuration {@code c} in {@code configs}:
//
// <pre>
// map[c.{@link ATNConfig//state state}] U= c.{@link ATNConfig//alt alt}
// </pre>
//


PredictionMode.getStateToAltMap = function (configs) {
  var m = new AltDict();
  configs.items.map(function (c) {
    var alts = m.get(c.state);

    if (alts === null) {
      alts = new BitSet();
      m.put(c.state, alts);
    }

    alts.add(c.alt);
  });
  return m;
};

PredictionMode.hasStateAssociatedWithOneAlt = function (configs) {
  var values = PredictionMode.getStateToAltMap(configs).values();

  for (var i = 0; i < values.length; i++) {
    if (values[i].length === 1) {
      return true;
    }
  }

  return false;
};

PredictionMode.getSingleViableAlt = function (altsets) {
  var result = null;

  for (var i = 0; i < altsets.length; i++) {
    var alts = altsets[i];
    var minAlt = alts.minValue();

    if (result === null) {
      result = minAlt;
    } else if (result !== minAlt) {
      // more than 1 viable alt
      return ATN.INVALID_ALT_NUMBER;
    }
  }

  return result;
};

exports.PredictionMode = PredictionMode;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*! https://mths.be/codepointat v0.2.0 by @mathias */

if (!String.prototype.codePointAt) {
  (function () {
    'use strict'; // needed to support `apply`/`call` with `undefined`/`null`

    var defineProperty = function () {
      // IE 8 only supports `Object.defineProperty` on DOM elements
      try {
        var object = {};
        var $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch (error) {}

      return result;
    }();

    var codePointAt = function codePointAt(position) {
      if (this == null) {
        throw TypeError();
      }

      var string = String(this);
      var size = string.length; // `ToInteger`

      var index = position ? Number(position) : 0;

      if (index != index) {
        // better `isNaN`
        index = 0;
      } // Account for out-of-bounds indices:


      if (index < 0 || index >= size) {
        return undefined;
      } // Get the first code unit


      var first = string.charCodeAt(index);
      var second;

      if ( // check if it’s the start of a surrogate pair
      first >= 0xD800 && first <= 0xDBFF && // high surrogate
      size > index + 1 // there is a next code unit
      ) {
          second = string.charCodeAt(index + 1);

          if (second >= 0xDC00 && second <= 0xDFFF) {
            // low surrogate
            // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
          }
        }

      return first;
    };

    if (defineProperty) {
      defineProperty(String.prototype, 'codePointAt', {
        'value': codePointAt,
        'configurable': true,
        'writable': true
      });
    } else {
      String.prototype.codePointAt = codePointAt;
    }
  })();
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*! https://mths.be/fromcodepoint v0.2.1 by @mathias */

if (!String.fromCodePoint) {
  (function () {
    var defineProperty = function () {
      // IE 8 only supports `Object.defineProperty` on DOM elements
      try {
        var object = {};
        var $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch (error) {}

      return result;
    }();

    var stringFromCharCode = String.fromCharCode;
    var floor = Math.floor;

    var fromCodePoint = function fromCodePoint(_) {
      var MAX_SIZE = 0x4000;
      var codeUnits = [];
      var highSurrogate;
      var lowSurrogate;
      var index = -1;
      var length = arguments.length;

      if (!length) {
        return '';
      }

      var result = '';

      while (++index < length) {
        var codePoint = Number(arguments[index]);

        if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
        codePoint < 0 || // not a valid Unicode code point
        codePoint > 0x10FFFF || // not a valid Unicode code point
        floor(codePoint) != codePoint // not an integer
        ) {
            throw RangeError('Invalid code point: ' + codePoint);
          }

        if (codePoint <= 0xFFFF) {
          // BMP code point
          codeUnits.push(codePoint);
        } else {
          // Astral code point; split in surrogate halves
          // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          codePoint -= 0x10000;
          highSurrogate = (codePoint >> 10) + 0xD800;
          lowSurrogate = codePoint % 0x400 + 0xDC00;
          codeUnits.push(highSurrogate, lowSurrogate);
        }

        if (index + 1 == length || codeUnits.length > MAX_SIZE) {
          result += stringFromCharCode.apply(null, codeUnits);
          codeUnits.length = 0;
        }
      }

      return result;
    };

    if (defineProperty) {
      defineProperty(String, 'fromCodePoint', {
        'value': fromCodePoint,
        'configurable': true,
        'writable': true
      });
    } else {
      String.fromCodePoint = fromCodePoint;
    }
  })();
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//

var Token = __webpack_require__(3).Token;

var Errors = __webpack_require__(7);

var NoViableAltException = Errors.NoViableAltException;
var InputMismatchException = Errors.InputMismatchException;
var FailedPredicateException = Errors.FailedPredicateException;
var ParseCancellationException = Errors.ParseCancellationException;

var ATNState = __webpack_require__(5).ATNState;

var Interval = __webpack_require__(4).Interval;

var IntervalSet = __webpack_require__(4).IntervalSet;

function ErrorStrategy() {}

ErrorStrategy.prototype.reset = function (recognizer) {};

ErrorStrategy.prototype.recoverInline = function (recognizer) {};

ErrorStrategy.prototype.recover = function (recognizer, e) {};

ErrorStrategy.prototype.sync = function (recognizer) {};

ErrorStrategy.prototype.inErrorRecoveryMode = function (recognizer) {};

ErrorStrategy.prototype.reportError = function (recognizer) {}; // This is the default implementation of {@link ANTLRErrorStrategy} used for
// error reporting and recovery in ANTLR parsers.
//


function DefaultErrorStrategy() {
  ErrorStrategy.call(this); // Indicates whether the error strategy is currently "recovering from an
  // error". This is used to suppress reporting multiple error messages while
  // attempting to recover from a detected syntax error.
  //
  // @see //inErrorRecoveryMode
  //

  this.errorRecoveryMode = false; // The index into the input stream where the last error occurred.
  // This is used to prevent infinite loops where an error is found
  // but no token is consumed during recovery...another error is found,
  // ad nauseum. This is a failsafe mechanism to guarantee that at least
  // one token/tree node is consumed for two errors.
  //

  this.lastErrorIndex = -1;
  this.lastErrorStates = null;
  return this;
}

DefaultErrorStrategy.prototype = Object.create(ErrorStrategy.prototype);
DefaultErrorStrategy.prototype.constructor = DefaultErrorStrategy; // <p>The default implementation simply calls {@link //endErrorCondition} to
// ensure that the handler is not in error recovery mode.</p>

DefaultErrorStrategy.prototype.reset = function (recognizer) {
  this.endErrorCondition(recognizer);
}; //
// This method is called to enter error recovery mode when a recognition
// exception is reported.
//
// @param recognizer the parser instance
//


DefaultErrorStrategy.prototype.beginErrorCondition = function (recognizer) {
  this.errorRecoveryMode = true;
};

DefaultErrorStrategy.prototype.inErrorRecoveryMode = function (recognizer) {
  return this.errorRecoveryMode;
}; //
// This method is called to leave error recovery mode after recovering from
// a recognition exception.
//
// @param recognizer
//


DefaultErrorStrategy.prototype.endErrorCondition = function (recognizer) {
  this.errorRecoveryMode = false;
  this.lastErrorStates = null;
  this.lastErrorIndex = -1;
}; //
// {@inheritDoc}
//
// <p>The default implementation simply calls {@link //endErrorCondition}.</p>
//


DefaultErrorStrategy.prototype.reportMatch = function (recognizer) {
  this.endErrorCondition(recognizer);
}; //
// {@inheritDoc}
//
// <p>The default implementation returns immediately if the handler is already
// in error recovery mode. Otherwise, it calls {@link //beginErrorCondition}
// and dispatches the reporting task based on the runtime type of {@code e}
// according to the following table.</p>
//
// <ul>
// <li>{@link NoViableAltException}: Dispatches the call to
// {@link //reportNoViableAlternative}</li>
// <li>{@link InputMismatchException}: Dispatches the call to
// {@link //reportInputMismatch}</li>
// <li>{@link FailedPredicateException}: Dispatches the call to
// {@link //reportFailedPredicate}</li>
// <li>All other types: calls {@link Parser//notifyErrorListeners} to report
// the exception</li>
// </ul>
//


DefaultErrorStrategy.prototype.reportError = function (recognizer, e) {
  // if we've already reported an error and have not matched a token
  // yet successfully, don't report any errors.
  if (this.inErrorRecoveryMode(recognizer)) {
    return; // don't report spurious errors
  }

  this.beginErrorCondition(recognizer);

  if (e instanceof NoViableAltException) {
    this.reportNoViableAlternative(recognizer, e);
  } else if (e instanceof InputMismatchException) {
    this.reportInputMismatch(recognizer, e);
  } else if (e instanceof FailedPredicateException) {
    this.reportFailedPredicate(recognizer, e);
  } else {
    console.log("unknown recognition error type: " + e.constructor.name);
    console.log(e.stack);
    recognizer.notifyErrorListeners(e.getOffendingToken(), e.getMessage(), e);
  }
}; //
// {@inheritDoc}
//
// <p>The default implementation resynchronizes the parser by consuming tokens
// until we find one in the resynchronization set--loosely the set of tokens
// that can follow the current rule.</p>
//


DefaultErrorStrategy.prototype.recover = function (recognizer, e) {
  if (this.lastErrorIndex === recognizer.getInputStream().index && this.lastErrorStates !== null && this.lastErrorStates.indexOf(recognizer.state) >= 0) {
    // uh oh, another error at same token index and previously-visited
    // state in ATN; must be a case where LT(1) is in the recovery
    // token set so nothing got consumed. Consume a single token
    // at least to prevent an infinite loop; this is a failsafe.
    recognizer.consume();
  }

  this.lastErrorIndex = recognizer._input.index;

  if (this.lastErrorStates === null) {
    this.lastErrorStates = [];
  }

  this.lastErrorStates.push(recognizer.state);
  var followSet = this.getErrorRecoverySet(recognizer);
  this.consumeUntil(recognizer, followSet);
}; // The default implementation of {@link ANTLRErrorStrategy//sync} makes sure
// that the current lookahead symbol is consistent with what were expecting
// at this point in the ATN. You can call this anytime but ANTLR only
// generates code to check before subrules/loops and each iteration.
//
// <p>Implements Jim Idle's magic sync mechanism in closures and optional
// subrules. E.g.,</p>
//
// <pre>
// a : sync ( stuff sync )* ;
// sync : {consume to what can follow sync} ;
// </pre>
//
// At the start of a sub rule upon error, {@link //sync} performs single
// token deletion, if possible. If it can't do that, it bails on the current
// rule and uses the default error recovery, which consumes until the
// resynchronization set of the current rule.
//
// <p>If the sub rule is optional ({@code (...)?}, {@code (...)*}, or block
// with an empty alternative), then the expected set includes what follows
// the subrule.</p>
//
// <p>During loop iteration, it consumes until it sees a token that can start a
// sub rule or what follows loop. Yes, that is pretty aggressive. We opt to
// stay in the loop as long as possible.</p>
//
// <p><strong>ORIGINS</strong></p>
//
// <p>Previous versions of ANTLR did a poor job of their recovery within loops.
// A single mismatch token or missing token would force the parser to bail
// out of the entire rules surrounding the loop. So, for rule</p>
//
// <pre>
// classDef : 'class' ID '{' member* '}'
// </pre>
//
// input with an extra token between members would force the parser to
// consume until it found the next class definition rather than the next
// member definition of the current class.
//
// <p>This functionality cost a little bit of effort because the parser has to
// compare token set at the start of the loop and at each iteration. If for
// some reason speed is suffering for you, you can turn off this
// functionality by simply overriding this method as a blank { }.</p>
//


DefaultErrorStrategy.prototype.sync = function (recognizer) {
  // If already recovering, don't try to sync
  if (this.inErrorRecoveryMode(recognizer)) {
    return;
  }

  var s = recognizer._interp.atn.states[recognizer.state];
  var la = recognizer.getTokenStream().LA(1); // try cheaper subset first; might get lucky. seems to shave a wee bit off

  var nextTokens = recognizer.atn.nextTokens(s);

  if (nextTokens.contains(Token.EPSILON) || nextTokens.contains(la)) {
    return;
  }

  switch (s.stateType) {
    case ATNState.BLOCK_START:
    case ATNState.STAR_BLOCK_START:
    case ATNState.PLUS_BLOCK_START:
    case ATNState.STAR_LOOP_ENTRY:
      // report error and recover if possible
      if (this.singleTokenDeletion(recognizer) !== null) {
        return;
      } else {
        throw new InputMismatchException(recognizer);
      }

      break;

    case ATNState.PLUS_LOOP_BACK:
    case ATNState.STAR_LOOP_BACK:
      this.reportUnwantedToken(recognizer);
      var expecting = new IntervalSet();
      expecting.addSet(recognizer.getExpectedTokens());
      var whatFollowsLoopIterationOrRule = expecting.addSet(this.getErrorRecoverySet(recognizer));
      this.consumeUntil(recognizer, whatFollowsLoopIterationOrRule);
      break;

    default: // do nothing if we can't identify the exact kind of ATN state

  }
}; // This is called by {@link //reportError} when the exception is a
// {@link NoViableAltException}.
//
// @see //reportError
//
// @param recognizer the parser instance
// @param e the recognition exception
//


DefaultErrorStrategy.prototype.reportNoViableAlternative = function (recognizer, e) {
  var tokens = recognizer.getTokenStream();
  var input;

  if (tokens !== null) {
    if (e.startToken.type === Token.EOF) {
      input = "<EOF>";
    } else {
      input = tokens.getText(new Interval(e.startToken, e.offendingToken));
    }
  } else {
    input = "<unknown input>";
  }

  var msg = "no viable alternative at input " + this.escapeWSAndQuote(input);
  recognizer.notifyErrorListeners(msg, e.offendingToken, e);
}; //
// This is called by {@link //reportError} when the exception is an
// {@link InputMismatchException}.
//
// @see //reportError
//
// @param recognizer the parser instance
// @param e the recognition exception
//


DefaultErrorStrategy.prototype.reportInputMismatch = function (recognizer, e) {
  var msg = "mismatched input " + this.getTokenErrorDisplay(e.offendingToken) + " expecting " + e.getExpectedTokens().toString(recognizer.literalNames, recognizer.symbolicNames);
  recognizer.notifyErrorListeners(msg, e.offendingToken, e);
}; //
// This is called by {@link //reportError} when the exception is a
// {@link FailedPredicateException}.
//
// @see //reportError
//
// @param recognizer the parser instance
// @param e the recognition exception
//


DefaultErrorStrategy.prototype.reportFailedPredicate = function (recognizer, e) {
  var ruleName = recognizer.ruleNames[recognizer._ctx.ruleIndex];
  var msg = "rule " + ruleName + " " + e.message;
  recognizer.notifyErrorListeners(msg, e.offendingToken, e);
}; // This method is called to report a syntax error which requires the removal
// of a token from the input stream. At the time this method is called, the
// erroneous symbol is current {@code LT(1)} symbol and has not yet been
// removed from the input stream. When this method returns,
// {@code recognizer} is in error recovery mode.
//
// <p>This method is called when {@link //singleTokenDeletion} identifies
// single-token deletion as a viable recovery strategy for a mismatched
// input error.</p>
//
// <p>The default implementation simply returns if the handler is already in
// error recovery mode. Otherwise, it calls {@link //beginErrorCondition} to
// enter error recovery mode, followed by calling
// {@link Parser//notifyErrorListeners}.</p>
//
// @param recognizer the parser instance
//


DefaultErrorStrategy.prototype.reportUnwantedToken = function (recognizer) {
  if (this.inErrorRecoveryMode(recognizer)) {
    return;
  }

  this.beginErrorCondition(recognizer);
  var t = recognizer.getCurrentToken();
  var tokenName = this.getTokenErrorDisplay(t);
  var expecting = this.getExpectedTokens(recognizer);
  var msg = "extraneous input " + tokenName + " expecting " + expecting.toString(recognizer.literalNames, recognizer.symbolicNames);
  recognizer.notifyErrorListeners(msg, t, null);
}; // This method is called to report a syntax error which requires the
// insertion of a missing token into the input stream. At the time this
// method is called, the missing token has not yet been inserted. When this
// method returns, {@code recognizer} is in error recovery mode.
//
// <p>This method is called when {@link //singleTokenInsertion} identifies
// single-token insertion as a viable recovery strategy for a mismatched
// input error.</p>
//
// <p>The default implementation simply returns if the handler is already in
// error recovery mode. Otherwise, it calls {@link //beginErrorCondition} to
// enter error recovery mode, followed by calling
// {@link Parser//notifyErrorListeners}.</p>
//
// @param recognizer the parser instance
//


DefaultErrorStrategy.prototype.reportMissingToken = function (recognizer) {
  if (this.inErrorRecoveryMode(recognizer)) {
    return;
  }

  this.beginErrorCondition(recognizer);
  var t = recognizer.getCurrentToken();
  var expecting = this.getExpectedTokens(recognizer);
  var msg = "missing " + expecting.toString(recognizer.literalNames, recognizer.symbolicNames) + " at " + this.getTokenErrorDisplay(t);
  recognizer.notifyErrorListeners(msg, t, null);
}; // <p>The default implementation attempts to recover from the mismatched input
// by using single token insertion and deletion as described below. If the
// recovery attempt fails, this method throws an
// {@link InputMismatchException}.</p>
//
// <p><strong>EXTRA TOKEN</strong> (single token deletion)</p>
//
// <p>{@code LA(1)} is not what we are looking for. If {@code LA(2)} has the
// right token, however, then assume {@code LA(1)} is some extra spurious
// token and delete it. Then consume and return the next token (which was
// the {@code LA(2)} token) as the successful result of the match operation.</p>
//
// <p>This recovery strategy is implemented by {@link
// //singleTokenDeletion}.</p>
//
// <p><strong>MISSING TOKEN</strong> (single token insertion)</p>
//
// <p>If current token (at {@code LA(1)}) is consistent with what could come
// after the expected {@code LA(1)} token, then assume the token is missing
// and use the parser's {@link TokenFactory} to create it on the fly. The
// "insertion" is performed by returning the created token as the successful
// result of the match operation.</p>
//
// <p>This recovery strategy is implemented by {@link
// //singleTokenInsertion}.</p>
//
// <p><strong>EXAMPLE</strong></p>
//
// <p>For example, Input {@code i=(3;} is clearly missing the {@code ')'}. When
// the parser returns from the nested call to {@code expr}, it will have
// call chain:</p>
//
// <pre>
// stat &rarr; expr &rarr; atom
// </pre>
//
// and it will be trying to match the {@code ')'} at this point in the
// derivation:
//
// <pre>
// =&gt; ID '=' '(' INT ')' ('+' atom)* ';'
// ^
// </pre>
//
// The attempt to match {@code ')'} will fail when it sees {@code ';'} and
// call {@link //recoverInline}. To recover, it sees that {@code LA(1)==';'}
// is in the set of tokens that can follow the {@code ')'} token reference
// in rule {@code atom}. It can assume that you forgot the {@code ')'}.
//


DefaultErrorStrategy.prototype.recoverInline = function (recognizer) {
  // SINGLE TOKEN DELETION
  var matchedSymbol = this.singleTokenDeletion(recognizer);

  if (matchedSymbol !== null) {
    // we have deleted the extra token.
    // now, move past ttype token as if all were ok
    recognizer.consume();
    return matchedSymbol;
  } // SINGLE TOKEN INSERTION


  if (this.singleTokenInsertion(recognizer)) {
    return this.getMissingSymbol(recognizer);
  } // even that didn't work; must throw the exception


  throw new InputMismatchException(recognizer);
}; //
// This method implements the single-token insertion inline error recovery
// strategy. It is called by {@link //recoverInline} if the single-token
// deletion strategy fails to recover from the mismatched input. If this
// method returns {@code true}, {@code recognizer} will be in error recovery
// mode.
//
// <p>This method determines whether or not single-token insertion is viable by
// checking if the {@code LA(1)} input symbol could be successfully matched
// if it were instead the {@code LA(2)} symbol. If this method returns
// {@code true}, the caller is responsible for creating and inserting a
// token with the correct type to produce this behavior.</p>
//
// @param recognizer the parser instance
// @return {@code true} if single-token insertion is a viable recovery
// strategy for the current mismatched input, otherwise {@code false}
//


DefaultErrorStrategy.prototype.singleTokenInsertion = function (recognizer) {
  var currentSymbolType = recognizer.getTokenStream().LA(1); // if current token is consistent with what could come after current
  // ATN state, then we know we're missing a token; error recovery
  // is free to conjure up and insert the missing token

  var atn = recognizer._interp.atn;
  var currentState = atn.states[recognizer.state];
  var next = currentState.transitions[0].target;
  var expectingAtLL2 = atn.nextTokens(next, recognizer._ctx);

  if (expectingAtLL2.contains(currentSymbolType)) {
    this.reportMissingToken(recognizer);
    return true;
  } else {
    return false;
  }
}; // This method implements the single-token deletion inline error recovery
// strategy. It is called by {@link //recoverInline} to attempt to recover
// from mismatched input. If this method returns null, the parser and error
// handler state will not have changed. If this method returns non-null,
// {@code recognizer} will <em>not</em> be in error recovery mode since the
// returned token was a successful match.
//
// <p>If the single-token deletion is successful, this method calls
// {@link //reportUnwantedToken} to report the error, followed by
// {@link Parser//consume} to actually "delete" the extraneous token. Then,
// before returning {@link //reportMatch} is called to signal a successful
// match.</p>
//
// @param recognizer the parser instance
// @return the successfully matched {@link Token} instance if single-token
// deletion successfully recovers from the mismatched input, otherwise
// {@code null}
//


DefaultErrorStrategy.prototype.singleTokenDeletion = function (recognizer) {
  var nextTokenType = recognizer.getTokenStream().LA(2);
  var expecting = this.getExpectedTokens(recognizer);

  if (expecting.contains(nextTokenType)) {
    this.reportUnwantedToken(recognizer); // print("recoverFromMismatchedToken deleting " \
    // + str(recognizer.getTokenStream().LT(1)) \
    // + " since " + str(recognizer.getTokenStream().LT(2)) \
    // + " is what we want", file=sys.stderr)

    recognizer.consume(); // simply delete extra token
    // we want to return the token we're actually matching

    var matchedSymbol = recognizer.getCurrentToken();
    this.reportMatch(recognizer); // we know current token is correct

    return matchedSymbol;
  } else {
    return null;
  }
}; // Conjure up a missing token during error recovery.
//
// The recognizer attempts to recover from single missing
// symbols. But, actions might refer to that missing symbol.
// For example, x=ID {f($x);}. The action clearly assumes
// that there has been an identifier matched previously and that
// $x points at that token. If that token is missing, but
// the next token in the stream is what we want we assume that
// this token is missing and we keep going. Because we
// have to return some token to replace the missing token,
// we have to conjure one up. This method gives the user control
// over the tokens returned for missing tokens. Mostly,
// you will want to create something special for identifier
// tokens. For literals such as '{' and ',', the default
// action in the parser or tree parser works. It simply creates
// a CommonToken of the appropriate type. The text will be the token.
// If you change what tokens must be created by the lexer,
// override this method to create the appropriate tokens.
//


DefaultErrorStrategy.prototype.getMissingSymbol = function (recognizer) {
  var currentSymbol = recognizer.getCurrentToken();
  var expecting = this.getExpectedTokens(recognizer);
  var expectedTokenType = expecting.first(); // get any element

  var tokenText;

  if (expectedTokenType === Token.EOF) {
    tokenText = "<missing EOF>";
  } else {
    tokenText = "<missing " + recognizer.literalNames[expectedTokenType] + ">";
  }

  var current = currentSymbol;
  var lookback = recognizer.getTokenStream().LT(-1);

  if (current.type === Token.EOF && lookback !== null) {
    current = lookback;
  }

  return recognizer.getTokenFactory().create(current.source, expectedTokenType, tokenText, Token.DEFAULT_CHANNEL, -1, -1, current.line, current.column);
};

DefaultErrorStrategy.prototype.getExpectedTokens = function (recognizer) {
  return recognizer.getExpectedTokens();
}; // How should a token be displayed in an error message? The default
// is to display just the text, but during development you might
// want to have a lot of information spit out. Override in that case
// to use t.toString() (which, for CommonToken, dumps everything about
// the token). This is better than forcing you to override a method in
// your token objects because you don't have to go modify your lexer
// so that it creates a new Java type.
//


DefaultErrorStrategy.prototype.getTokenErrorDisplay = function (t) {
  if (t === null) {
    return "<no token>";
  }

  var s = t.text;

  if (s === null) {
    if (t.type === Token.EOF) {
      s = "<EOF>";
    } else {
      s = "<" + t.type + ">";
    }
  }

  return this.escapeWSAndQuote(s);
};

DefaultErrorStrategy.prototype.escapeWSAndQuote = function (s) {
  s = s.replace(/\n/g, "\\n");
  s = s.replace(/\r/g, "\\r");
  s = s.replace(/\t/g, "\\t");
  return "'" + s + "'";
}; // Compute the error recovery set for the current rule. During
// rule invocation, the parser pushes the set of tokens that can
// follow that rule reference on the stack; this amounts to
// computing FIRST of what follows the rule reference in the
// enclosing rule. See LinearApproximator.FIRST().
// This local follow set only includes tokens
// from within the rule; i.e., the FIRST computation done by
// ANTLR stops at the end of a rule.
//
// EXAMPLE
//
// When you find a "no viable alt exception", the input is not
// consistent with any of the alternatives for rule r. The best
// thing to do is to consume tokens until you see something that
// can legally follow a call to r//or* any rule that called r.
// You don't want the exact set of viable next tokens because the
// input might just be missing a token--you might consume the
// rest of the input looking for one of the missing tokens.
//
// Consider grammar:
//
// a : '[' b ']'
// | '(' b ')'
// ;
// b : c '^' INT ;
// c : ID
// | INT
// ;
//
// At each rule invocation, the set of tokens that could follow
// that rule is pushed on a stack. Here are the various
// context-sensitive follow sets:
//
// FOLLOW(b1_in_a) = FIRST(']') = ']'
// FOLLOW(b2_in_a) = FIRST(')') = ')'
// FOLLOW(c_in_b) = FIRST('^') = '^'
//
// Upon erroneous input "[]", the call chain is
//
// a -> b -> c
//
// and, hence, the follow context stack is:
//
// depth follow set start of rule execution
// 0 <EOF> a (from main())
// 1 ']' b
// 2 '^' c
//
// Notice that ')' is not included, because b would have to have
// been called from a different context in rule a for ')' to be
// included.
//
// For error recovery, we cannot consider FOLLOW(c)
// (context-sensitive or otherwise). We need the combined set of
// all context-sensitive FOLLOW sets--the set of all tokens that
// could follow any reference in the call chain. We need to
// resync to one of those tokens. Note that FOLLOW(c)='^' and if
// we resync'd to that token, we'd consume until EOF. We need to
// sync to context-sensitive FOLLOWs for a, b, and c: {']','^'}.
// In this case, for input "[]", LA(1) is ']' and in the set, so we would
// not consume anything. After printing an error, rule c would
// return normally. Rule b would not find the required '^' though.
// At this point, it gets a mismatched token error and throws an
// exception (since LA(1) is not in the viable following token
// set). The rule exception handler tries to recover, but finds
// the same recovery set and doesn't consume anything. Rule b
// exits normally returning to rule a. Now it finds the ']' (and
// with the successful match exits errorRecovery mode).
//
// So, you can see that the parser walks up the call chain looking
// for the token that was a member of the recovery set.
//
// Errors are not generated in errorRecovery mode.
//
// ANTLR's error recovery mechanism is based upon original ideas:
//
// "Algorithms + Data Structures = Programs" by Niklaus Wirth
//
// and
//
// "A note on error recovery in recursive descent parsers":
// http://portal.acm.org/citation.cfm?id=947902.947905
//
// Later, Josef Grosch had some good ideas:
//
// "Efficient and Comfortable Error Recovery in Recursive Descent
// Parsers":
// ftp://www.cocolab.com/products/cocktail/doca4.ps/ell.ps.zip
//
// Like Grosch I implement context-sensitive FOLLOW sets that are combined
// at run-time upon error to avoid overhead during parsing.
//


DefaultErrorStrategy.prototype.getErrorRecoverySet = function (recognizer) {
  var atn = recognizer._interp.atn;
  var ctx = recognizer._ctx;
  var recoverSet = new IntervalSet();

  while (ctx !== null && ctx.invokingState >= 0) {
    // compute what follows who invoked us
    var invokingState = atn.states[ctx.invokingState];
    var rt = invokingState.transitions[0];
    var follow = atn.nextTokens(rt.followState);
    recoverSet.addSet(follow);
    ctx = ctx.parentCtx;
  }

  recoverSet.removeOne(Token.EPSILON);
  return recoverSet;
}; // Consume tokens until one matches the given token set.//


DefaultErrorStrategy.prototype.consumeUntil = function (recognizer, set) {
  var ttype = recognizer.getTokenStream().LA(1);

  while (ttype !== Token.EOF && !set.contains(ttype)) {
    recognizer.consume();
    ttype = recognizer.getTokenStream().LA(1);
  }
}; //
// This implementation of {@link ANTLRErrorStrategy} responds to syntax errors
// by immediately canceling the parse operation with a
// {@link ParseCancellationException}. The implementation ensures that the
// {@link ParserRuleContext//exception} field is set for all parse tree nodes
// that were not completed prior to encountering the error.
//
// <p>
// This error strategy is useful in the following scenarios.</p>
//
// <ul>
// <li><strong>Two-stage parsing:</strong> This error strategy allows the first
// stage of two-stage parsing to immediately terminate if an error is
// encountered, and immediately fall back to the second stage. In addition to
// avoiding wasted work by attempting to recover from errors here, the empty
// implementation of {@link BailErrorStrategy//sync} improves the performance of
// the first stage.</li>
// <li><strong>Silent validation:</strong> When syntax errors are not being
// reported or logged, and the parse result is simply ignored if errors occur,
// the {@link BailErrorStrategy} avoids wasting work on recovering from errors
// when the result will be ignored either way.</li>
// </ul>
//
// <p>
// {@code myparser.setErrorHandler(new BailErrorStrategy());}</p>
//
// @see Parser//setErrorHandler(ANTLRErrorStrategy)
//


function BailErrorStrategy() {
  DefaultErrorStrategy.call(this);
  return this;
}

BailErrorStrategy.prototype = Object.create(DefaultErrorStrategy.prototype);
BailErrorStrategy.prototype.constructor = BailErrorStrategy; // Instead of recovering from exception {@code e}, re-throw it wrapped
// in a {@link ParseCancellationException} so it is not caught by the
// rule function catches. Use {@link Exception//getCause()} to get the
// original {@link RecognitionException}.
//

BailErrorStrategy.prototype.recover = function (recognizer, e) {
  var context = recognizer._ctx;

  while (context !== null) {
    context.exception = e;
    context = context.parentCtx;
  }

  throw new ParseCancellationException(e);
}; // Make sure we don't attempt to recover inline; if the parser
// successfully recovers, it won't throw an exception.
//


BailErrorStrategy.prototype.recoverInline = function (recognizer) {
  this.recover(recognizer, new InputMismatchException(recognizer));
}; // Make sure we don't attempt to recover from problems in subrules.//


BailErrorStrategy.prototype.sync = function (recognizer) {// pass
};

exports.BailErrorStrategy = BailErrorStrategy;
exports.DefaultErrorStrategy = DefaultErrorStrategy;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    group = _require$doc$builders.group,
    line = _require$doc$builders.line,
    concat = _require$doc$builders.concat,
    indent = _require$doc$builders.indent;

var indentIfNecessaryBuilder = function indentIfNecessaryBuilder(path) {
  return function (doc) {
    var parentNode = path.getParentNode();
    if (parentNode.type === 'IfStatement') return doc;
    if (parentNode.type === 'ForStatement') return doc;
    if (parentNode.type === 'WhileStatement') return doc;
    if (parentNode.type === 'BinaryOperation') return doc;
    return indent(doc);
  };
};

module.exports = {
  match: function match(op) {
    return ['<', '>', '<=', '>=', '==', '!='].includes(op);
  },
  print: function print(node, path, _print) {
    var indentIfNecessary = indentIfNecessaryBuilder(path);
    return group(indentIfNecessary(concat([path.call(_print, 'left'), ' ', node.operator, line, path.call(_print, 'right')])));
  }
};

/***/ }),
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(61),
    handleComments = _require.handleComments;

var massageAstNode = __webpack_require__(71);

var loc = __webpack_require__(72);

var options = __webpack_require__(73);

var parse = __webpack_require__(74);

var print = __webpack_require__(113); // https://prettier.io/docs/en/plugins.html#languages


var languages = [{
  extensions: ['.sol'],
  name: 'Solidity',
  parsers: ['solidity-parse'],
  vscodeLanguageIds: ['solidity']
}]; // https://prettier.io/docs/en/plugins.html#parsers

var parser = Object.assign({}, {
  astFormat: 'solidity-ast',
  parse: parse
}, loc);
var parsers = {
  'solidity-parse': parser
};

function canAttachComment(node) {
  return node.type && node.type !== 'BlockComment' && node.type !== 'LineComment';
}

function printComment(commentPath) {
  var comment = commentPath.getValue();

  switch (comment.type) {
    case 'BlockComment':
      {
        return "/*".concat(comment.raw, "*/");
      }

    case 'LineComment':
      return "//".concat(comment.raw.trimRight());

    default:
      throw new Error("Not a comment: ".concat(JSON.stringify(comment)));
  }
} // https://prettier.io/docs/en/plugins.html#printers


var printers = {
  'solidity-ast': {
    canAttachComment: canAttachComment,
    handleComments: {
      ownLine: handleComments.handleOwnLineComment,
      endOfLine: handleComments.handleEndOfLineComment,
      remaining: handleComments.handleRemainingComment
    },
    isBlockComment: handleComments.isBlockComment,
    massageAstNode: massageAstNode,
    print: print,
    printComment: printComment
  }
}; // https://prettier.io/docs/en/plugins.html#defaultoptions

var defaultOptions = {
  bracketSpacing: false,
  tabWidth: 4
};
module.exports = {
  languages: languages,
  parsers: parsers,
  printers: printers,
  options: options,
  defaultOptions: defaultOptions
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(185);


/***/ }),
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var comments = __webpack_require__(62);

module.exports = {
  handleComments: comments
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    _require$util = _require.util,
    addLeadingComment = _require$util.addLeadingComment,
    addTrailingComment = _require$util.addTrailingComment,
    addDanglingComment = _require$util.addDanglingComment,
    getNextNonSpaceNonCommentCharacterIndex = _require$util.getNextNonSpaceNonCommentCharacterIndex;

var privateUtil = __webpack_require__(63);

function handleOwnLineComment(comment, text, options, ast, isLastComment) {
  var precedingNode = comment.precedingNode,
      enclosingNode = comment.enclosingNode,
      followingNode = comment.followingNode;

  if (handleLastFunctionArgComments(text, precedingNode, enclosingNode, followingNode, comment, options) || handleMemberExpressionComments(enclosingNode, followingNode, comment) || handleIfStatementComments(text, precedingNode, enclosingNode, followingNode, comment, options) || handleWhileComments(text, precedingNode, enclosingNode, followingNode, comment, options) || handleTryStatementComments(enclosingNode, precedingNode, followingNode, comment) || handleClassComments(enclosingNode, precedingNode, followingNode, comment) || handleImportSpecifierComments(enclosingNode, comment) || handleForComments(enclosingNode, precedingNode, comment) || handleUnionTypeComments(precedingNode, enclosingNode, followingNode, comment) || handleOnlyComments(enclosingNode, ast, comment, isLastComment) || handleImportDeclarationComments(text, enclosingNode, precedingNode, comment, options) || handleAssignmentPatternComments(enclosingNode, comment) || handleMethodNameComments(text, enclosingNode, precedingNode, comment, options)) {
    return true;
  }

  return false;
}

function handleEndOfLineComment(comment, text, options, ast, isLastComment) {
  var precedingNode = comment.precedingNode,
      enclosingNode = comment.enclosingNode,
      followingNode = comment.followingNode;

  if (handleLastFunctionArgComments(text, precedingNode, enclosingNode, followingNode, comment, options) || handleConditionalExpressionComments(enclosingNode, precedingNode, followingNode, comment, text, options) || handleImportSpecifierComments(enclosingNode, comment) || handleIfStatementComments(text, precedingNode, enclosingNode, followingNode, comment, options) || handleWhileComments(text, precedingNode, enclosingNode, followingNode, comment, options) || handleTryStatementComments(enclosingNode, precedingNode, followingNode, comment) || handleClassComments(enclosingNode, precedingNode, followingNode, comment) || handleLabeledStatementComments(enclosingNode, comment) || handleCallExpressionComments(precedingNode, enclosingNode, comment) || handlePropertyComments(enclosingNode, comment) || handleOnlyComments(enclosingNode, ast, comment, isLastComment) || handleTypeAliasComments(enclosingNode, followingNode, comment) || handleVariableDeclaratorComments(enclosingNode, followingNode, comment)) {
    return true;
  }

  return false;
}

function handleRemainingComment(comment, text, options, ast, isLastComment) {
  var precedingNode = comment.precedingNode,
      enclosingNode = comment.enclosingNode,
      followingNode = comment.followingNode;

  if (handleIfStatementComments(text, precedingNode, enclosingNode, followingNode, comment, options) || handleWhileComments(text, precedingNode, enclosingNode, followingNode, comment, options) || handleObjectPropertyAssignment(enclosingNode, precedingNode, comment) || handleCommentInEmptyParens(text, enclosingNode, comment, options) || handleMethodNameComments(text, enclosingNode, precedingNode, comment, options) || handleOnlyComments(enclosingNode, ast, comment, isLastComment) || handleCommentAfterArrowParams(text, enclosingNode, comment, options) || handleFunctionNameComments(text, enclosingNode, precedingNode, comment, options) || handleTSMappedTypeComments(text, enclosingNode, precedingNode, followingNode, comment) || handleBreakAndContinueStatementComments(enclosingNode, comment)) {
    return true;
  }

  return false;
}

function addBlockStatementFirstComment(node, comment) {
  var body = node.body.filter(function (n) {
    return n.type !== "EmptyStatement";
  });

  if (body.length === 0) {
    addDanglingComment(node, comment);
  } else {
    addLeadingComment(body[0], comment);
  }
}

function addBlockOrNotComment(node, comment) {
  if (node.type === "BlockStatement") {
    addBlockStatementFirstComment(node, comment);
  } else {
    addLeadingComment(node, comment);
  }
} // There are often comments before the else clause of if statements like
//
//   if (1) { ... }
//   // comment
//   else { ... }
//
// They are being attached as leading comments of the BlockExpression which
// is not well printed. What we want is to instead move the comment inside
// of the block and make it leadingComment of the first element of the block
// or dangling comment of the block if there is nothing inside
//
//   if (1) { ... }
//   else {
//     // comment
//     ...
//   }


function handleIfStatementComments(text, precedingNode, enclosingNode, followingNode, comment, options) {
  if (!enclosingNode || enclosingNode.type !== "IfStatement" || !followingNode) {
    return false;
  } // We unfortunately have no way using the AST or location of nodes to know
  // if the comment is positioned before the condition parenthesis:
  //   if (a /* comment */) {}
  // The only workaround I found is to look at the next character to see if
  // it is a ).


  var nextCharacter = privateUtil.getNextNonSpaceNonCommentCharacter(text, comment, options.locEnd);

  if (nextCharacter === ")") {
    addTrailingComment(precedingNode, comment);
    return true;
  } // Comments before `else`:
  // - treat as trailing comments of the trueBody, if it's a ExpressionStatement
  // - treat as a dangling comment otherwise


  if (precedingNode === enclosingNode.trueBody && followingNode === enclosingNode.falseBody) {
    if (precedingNode.type === "ExpressionStatement") {
      addTrailingComment(precedingNode, comment);
    } else {
      addDanglingComment(enclosingNode, comment);
    }

    return true;
  }

  if (followingNode.type === "ExpressionStatement") {
    addBlockStatementFirstComment(followingNode, comment);
    return true;
  }

  if (followingNode.type === "IfStatement") {
    addBlockOrNotComment(followingNode.trueBody, comment);
    return true;
  } // For comments positioned after the condition parenthesis in an if statement
  // before the trueBody without brackets on, such as
  // if (a) /* comment */ true,
  // we look at the next character to see if the following node
  // is the trueBody for the if statement


  if (enclosingNode.trueBody === followingNode) {
    addLeadingComment(followingNode, comment);
    return true;
  }

  return false;
}

function handleWhileComments(text, precedingNode, enclosingNode, followingNode, comment, options) {
  if (!enclosingNode || enclosingNode.type !== "WhileStatement" || !followingNode) {
    return false;
  } // We unfortunately have no way using the AST or location of nodes to know
  // if the comment is positioned before the condition parenthesis:
  //   while (a /* comment */) {}
  // The only workaround I found is to look at the next character to see if
  // it is a ).


  var nextCharacter = privateUtil.getNextNonSpaceNonCommentCharacter(text, comment, options.locEnd);

  if (nextCharacter === ")") {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  if (followingNode.type === "BlockStatement") {
    addBlockStatementFirstComment(followingNode, comment);
    return true;
  }

  return false;
} // Same as IfStatement but for TryStatement


function handleTryStatementComments(enclosingNode, precedingNode, followingNode, comment) {
  if (!enclosingNode || enclosingNode.type !== "TryStatement" && enclosingNode.type !== "CatchClause" || !followingNode) {
    return false;
  }

  if (enclosingNode.type === "CatchClause" && precedingNode) {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  if (followingNode.type === "BlockStatement") {
    addBlockStatementFirstComment(followingNode, comment);
    return true;
  }

  if (followingNode.type === "TryStatement") {
    addBlockOrNotComment(followingNode.finalizer, comment);
    return true;
  }

  if (followingNode.type === "CatchClause") {
    addBlockOrNotComment(followingNode.body, comment);
    return true;
  }

  return false;
}

function handleMemberExpressionComments(enclosingNode, followingNode, comment) {
  if (enclosingNode && enclosingNode.type === "MemberExpression" && followingNode && followingNode.type === "Identifier") {
    addLeadingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

function handleConditionalExpressionComments(enclosingNode, precedingNode, followingNode, comment, text, options) {
  var isSameLineAsPrecedingNode = precedingNode && !privateUtil.hasNewlineInRange(text, options.locEnd(precedingNode), options.locStart(comment));

  if ((!precedingNode || !isSameLineAsPrecedingNode) && enclosingNode && enclosingNode.type === "ConditionalExpression" && followingNode) {
    addLeadingComment(followingNode, comment);
    return true;
  }

  return false;
}

function handleObjectPropertyAssignment(enclosingNode, precedingNode, comment) {
  if (enclosingNode && (enclosingNode.type === "ObjectProperty" || enclosingNode.type === "Property") && enclosingNode.shorthand && enclosingNode.key === precedingNode && enclosingNode.value.type === "AssignmentPattern") {
    addTrailingComment(enclosingNode.value.left, comment);
    return true;
  }

  return false;
}

function handleClassComments(enclosingNode, precedingNode, followingNode, comment) {
  if (enclosingNode && (enclosingNode.type === "ClassDeclaration" || enclosingNode.type === "ClassExpression") && enclosingNode.decorators && enclosingNode.decorators.length > 0 && !(followingNode && followingNode.type === "Decorator")) {
    if (!enclosingNode.decorators || enclosingNode.decorators.length === 0) {
      addLeadingComment(enclosingNode, comment);
    } else {
      addTrailingComment(enclosingNode.decorators[enclosingNode.decorators.length - 1], comment);
    }

    return true;
  }

  return false;
}

function handleMethodNameComments(text, enclosingNode, precedingNode, comment, options) {
  // This is only needed for estree parsers (flow, typescript) to attach
  // after a method name:
  // obj = { fn /*comment*/() {} };
  if (enclosingNode && precedingNode && (enclosingNode.type === "Property" || enclosingNode.type === "MethodDefinition") && precedingNode.type === "Identifier" && enclosingNode.key === precedingNode && // special Property case: { key: /*comment*/(value) };
  // comment should be attached to value instead of key
  privateUtil.getNextNonSpaceNonCommentCharacter(text, precedingNode, options.locEnd) !== ":") {
    addTrailingComment(precedingNode, comment);
    return true;
  } // Print comments between decorators and class methods as a trailing comment
  // on the decorator node instead of the method node


  if (precedingNode && enclosingNode && precedingNode.type === "Decorator" && (enclosingNode.type === "ClassMethod" || enclosingNode.type === "ClassProperty" || enclosingNode.type === "TSAbstractClassProperty" || enclosingNode.type === "TSAbstractMethodDefinition" || enclosingNode.type === "MethodDefinition")) {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  return false;
}

function handleFunctionNameComments(text, enclosingNode, precedingNode, comment, options) {
  if (privateUtil.getNextNonSpaceNonCommentCharacter(text, comment, options.locEnd) !== "(") {
    return false;
  }

  if (precedingNode && enclosingNode && (enclosingNode.type === "FunctionDeclaration" || enclosingNode.type === "FunctionExpression" || enclosingNode.type === "ClassMethod" || enclosingNode.type === "MethodDefinition" || enclosingNode.type === "ObjectMethod")) {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  return false;
}

function handleCommentAfterArrowParams(text, enclosingNode, comment, options) {
  if (!(enclosingNode && enclosingNode.type === "ArrowFunctionExpression")) {
    return false;
  }

  var index = getNextNonSpaceNonCommentCharacterIndex(text, comment, options);

  if (text.substr(index, 2) === "=>") {
    addDanglingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

function handleCommentInEmptyParens(text, enclosingNode, comment, options) {
  if (privateUtil.getNextNonSpaceNonCommentCharacter(text, comment, options.locEnd) !== ")") {
    return false;
  } // Only add dangling comments to fix the case when no params are present,
  // i.e. a function without any argument.


  if (enclosingNode && ((enclosingNode.type === "FunctionDeclaration" || enclosingNode.type === "FunctionExpression" || enclosingNode.type === "ArrowFunctionExpression" && (enclosingNode.body.type !== "CallExpression" || enclosingNode.body.arguments.length === 0) || enclosingNode.type === "ClassMethod" || enclosingNode.type === "ObjectMethod") && enclosingNode.params.length === 0 || (enclosingNode.type === "CallExpression" || enclosingNode.type === "NewExpression") && enclosingNode.arguments.length === 0)) {
    addDanglingComment(enclosingNode, comment);
    return true;
  }

  if (enclosingNode && enclosingNode.type === "MethodDefinition" && enclosingNode.value.params.length === 0) {
    addDanglingComment(enclosingNode.value, comment);
    return true;
  }

  return false;
}

function handleLastFunctionArgComments(text, precedingNode, enclosingNode, followingNode, comment, options) {
  // Type definitions functions
  if (precedingNode && precedingNode.type === "FunctionTypeParam" && enclosingNode && enclosingNode.type === "FunctionTypeAnnotation" && followingNode && followingNode.type !== "FunctionTypeParam") {
    addTrailingComment(precedingNode, comment);
    return true;
  } // Real functions


  if (precedingNode && (precedingNode.type === "Identifier" || precedingNode.type === "AssignmentPattern") && enclosingNode && (enclosingNode.type === "ArrowFunctionExpression" || enclosingNode.type === "FunctionExpression" || enclosingNode.type === "FunctionDeclaration" || enclosingNode.type === "ObjectMethod" || enclosingNode.type === "ClassMethod") && privateUtil.getNextNonSpaceNonCommentCharacter(text, comment, options.locEnd) === ")") {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  return false;
}

function handleImportSpecifierComments(enclosingNode, comment) {
  if (enclosingNode && enclosingNode.type === "ImportSpecifier") {
    addLeadingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

function handleLabeledStatementComments(enclosingNode, comment) {
  if (enclosingNode && enclosingNode.type === "LabeledStatement") {
    addLeadingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

function handleBreakAndContinueStatementComments(enclosingNode, comment) {
  if (enclosingNode && (enclosingNode.type === "ContinueStatement" || enclosingNode.type === "BreakStatement") && !enclosingNode.label) {
    addTrailingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

function handleCallExpressionComments(precedingNode, enclosingNode, comment) {
  if (enclosingNode && enclosingNode.type === "CallExpression" && precedingNode && enclosingNode.callee === precedingNode && enclosingNode.arguments.length > 0) {
    addLeadingComment(enclosingNode.arguments[0], comment);
    return true;
  }

  return false;
}

function handleUnionTypeComments(precedingNode, enclosingNode, followingNode, comment) {
  if (enclosingNode && (enclosingNode.type === "UnionTypeAnnotation" || enclosingNode.type === "TSUnionType")) {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  return false;
}

function handlePropertyComments(enclosingNode, comment) {
  if (enclosingNode && (enclosingNode.type === "Property" || enclosingNode.type === "ObjectProperty")) {
    addLeadingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

function handleOnlyComments(enclosingNode, ast, comment, isLastComment) {
  // With Flow the enclosingNode is undefined so use the AST instead.
  if (ast && ast.body && ast.body.length === 0) {
    if (isLastComment) {
      addDanglingComment(ast, comment);
    } else {
      addLeadingComment(ast, comment);
    }

    return true;
  } else if (enclosingNode && enclosingNode.type === "Program" && enclosingNode.body.length === 0 && enclosingNode.directives && enclosingNode.directives.length === 0) {
    if (isLastComment) {
      addDanglingComment(enclosingNode, comment);
    } else {
      addLeadingComment(enclosingNode, comment);
    }

    return true;
  }

  return false;
}

function handleForComments(enclosingNode, precedingNode, comment) {
  if (enclosingNode && (enclosingNode.type === "ForInStatement" || enclosingNode.type === "ForOfStatement")) {
    addLeadingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

function handleImportDeclarationComments(text, enclosingNode, precedingNode, comment, options) {
  if (precedingNode && precedingNode.type === "ImportSpecifier" && enclosingNode && enclosingNode.type === "ImportDeclaration" && privateUtil.hasNewline(text, options.locEnd(comment))) {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  return false;
}

function handleAssignmentPatternComments(enclosingNode, comment) {
  if (enclosingNode && enclosingNode.type === "AssignmentPattern") {
    addLeadingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

function handleTypeAliasComments(enclosingNode, followingNode, comment) {
  if (enclosingNode && enclosingNode.type === "TypeAlias") {
    addLeadingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

function handleVariableDeclaratorComments(enclosingNode, followingNode, comment) {
  if (enclosingNode && (enclosingNode.type === "VariableDeclarator" || enclosingNode.type === "AssignmentExpression") && followingNode && (followingNode.type === "ObjectExpression" || followingNode.type === "ArrayExpression" || followingNode.type === "TemplateLiteral" || followingNode.type === "TaggedTemplateExpression")) {
    addLeadingComment(followingNode, comment);
    return true;
  }

  return false;
}

function handleTSMappedTypeComments(text, enclosingNode, precedingNode, followingNode, comment) {
  if (!enclosingNode || enclosingNode.type !== "TSMappedType") {
    return false;
  }

  if (followingNode && followingNode.type === "TSTypeParameter" && followingNode.name) {
    addLeadingComment(followingNode.name, comment);
    return true;
  }

  if (precedingNode && precedingNode.type === "TSTypeParameter" && precedingNode.constraint) {
    addTrailingComment(precedingNode.constraint, comment);
    return true;
  }

  return false;
}

function isBlockComment(comment) {
  return comment.type === "Block" || comment.type === "CommentBlock";
}

module.exports = {
  handleOwnLineComment: handleOwnLineComment,
  handleEndOfLineComment: handleEndOfLineComment,
  handleRemainingComment: handleRemainingComment,
  isBlockComment: isBlockComment
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringWidth = __webpack_require__(64);

var emojiRegex = __webpack_require__(69)();

var escapeStringRegexp = __webpack_require__(70); // eslint-disable-next-line no-control-regex


var notAsciiRegex = /[^\x20-\x7F]/;

function isExportDeclaration(node) {
  if (node) {
    switch (node.type) {
      case "ExportDefaultDeclaration":
      case "ExportDefaultSpecifier":
      case "DeclareExportDeclaration":
      case "ExportNamedDeclaration":
      case "ExportAllDeclaration":
        return true;
    }
  }

  return false;
}

function getParentExportDeclaration(path) {
  var parentNode = path.getParentNode();

  if (path.getName() === "declaration" && isExportDeclaration(parentNode)) {
    return parentNode;
  }

  return null;
}

function getPenultimate(arr) {
  if (arr.length > 1) {
    return arr[arr.length - 2];
  }

  return null;
}

function getLast(arr) {
  if (arr.length > 0) {
    return arr[arr.length - 1];
  }

  return null;
}

function skip(chars) {
  return function (text, index, opts) {
    var backwards = opts && opts.backwards; // Allow `skip` functions to be threaded together without having
    // to check for failures (did someone say monads?).

    if (index === false) {
      return false;
    }

    var length = text.length;
    var cursor = index;

    while (cursor >= 0 && cursor < length) {
      var c = text.charAt(cursor);

      if (chars instanceof RegExp) {
        if (!chars.test(c)) {
          return cursor;
        }
      } else if (chars.indexOf(c) === -1) {
        return cursor;
      }

      backwards ? cursor-- : cursor++;
    }

    if (cursor === -1 || cursor === length) {
      // If we reached the beginning or end of the file, return the
      // out-of-bounds cursor. It's up to the caller to handle this
      // correctly. We don't want to indicate `false` though if it
      // actually skipped valid characters.
      return cursor;
    }

    return false;
  };
}

var skipWhitespace = skip(/\s/);
var skipSpaces = skip(" \t");
var skipToLineEnd = skip(",; \t");
var skipEverythingButNewLine = skip(/[^\r\n]/);

function skipInlineComment(text, index) {
  if (index === false) {
    return false;
  }

  if (text.charAt(index) === "/" && text.charAt(index + 1) === "*") {
    for (var i = index + 2; i < text.length; ++i) {
      if (text.charAt(i) === "*" && text.charAt(i + 1) === "/") {
        return i + 2;
      }
    }
  }

  return index;
}

function skipTrailingComment(text, index) {
  if (index === false) {
    return false;
  }

  if (text.charAt(index) === "/" && text.charAt(index + 1) === "/") {
    return skipEverythingButNewLine(text, index);
  }

  return index;
} // This one doesn't use the above helper function because it wants to
// test \r\n in order and `skip` doesn't support ordering and we only
// want to skip one newline. It's simple to implement.


function skipNewline(text, index, opts) {
  var backwards = opts && opts.backwards;

  if (index === false) {
    return false;
  }

  var atIndex = text.charAt(index);

  if (backwards) {
    if (text.charAt(index - 1) === "\r" && atIndex === "\n") {
      return index - 2;
    }

    if (atIndex === "\n" || atIndex === "\r" || atIndex === "\u2028" || atIndex === "\u2029") {
      return index - 1;
    }
  } else {
    if (atIndex === "\r" && text.charAt(index + 1) === "\n") {
      return index + 2;
    }

    if (atIndex === "\n" || atIndex === "\r" || atIndex === "\u2028" || atIndex === "\u2029") {
      return index + 1;
    }
  }

  return index;
}

function hasNewline(text, index, opts) {
  opts = opts || {};
  var idx = skipSpaces(text, opts.backwards ? index - 1 : index, opts);
  var idx2 = skipNewline(text, idx, opts);
  return idx !== idx2;
}

function hasNewlineInRange(text, start, end) {
  for (var i = start; i < end; ++i) {
    if (text.charAt(i) === "\n") {
      return true;
    }
  }

  return false;
} // Note: this function doesn't ignore leading comments unlike isNextLineEmpty


function isPreviousLineEmpty(text, node, locStart) {
  var idx = locStart(node) - 1;
  idx = skipSpaces(text, idx, {
    backwards: true
  });
  idx = skipNewline(text, idx, {
    backwards: true
  });
  idx = skipSpaces(text, idx, {
    backwards: true
  });
  var idx2 = skipNewline(text, idx, {
    backwards: true
  });
  return idx !== idx2;
}

function isNextLineEmptyAfterIndex(text, index) {
  var oldIdx = null;
  var idx = index;

  while (idx !== oldIdx) {
    // We need to skip all the potential trailing inline comments
    oldIdx = idx;
    idx = skipToLineEnd(text, idx);
    idx = skipInlineComment(text, idx);
    idx = skipSpaces(text, idx);
  }

  idx = skipTrailingComment(text, idx);
  idx = skipNewline(text, idx);
  return hasNewline(text, idx);
}

function isNextLineEmpty(text, node, locEnd) {
  return isNextLineEmptyAfterIndex(text, locEnd(node));
}

function getNextNonSpaceNonCommentCharacterIndex(text, node, locEnd) {
  var oldIdx = null;
  var idx = locEnd(node);

  while (idx !== oldIdx) {
    oldIdx = idx;
    idx = skipSpaces(text, idx);
    idx = skipInlineComment(text, idx);
    idx = skipTrailingComment(text, idx);
    idx = skipNewline(text, idx);
  }

  return idx;
}

function getNextNonSpaceNonCommentCharacter(text, node, locEnd) {
  return text.charAt(getNextNonSpaceNonCommentCharacterIndex(text, node, locEnd));
}

function hasSpaces(text, index, opts) {
  opts = opts || {};
  var idx = skipSpaces(text, opts.backwards ? index - 1 : index, opts);
  return idx !== index;
}

function setLocStart(node, index) {
  if (node.range) {
    node.range[0] = index;
  } else {
    node.start = index;
  }
}

function setLocEnd(node, index) {
  if (node.range) {
    node.range[1] = index;
  } else {
    node.end = index;
  }
}

var PRECEDENCE = {};
[["|>"], ["||", "??"], ["&&"], ["|"], ["^"], ["&"], ["==", "===", "!=", "!=="], ["<", ">", "<=", ">=", "in", "instanceof"], [">>", "<<", ">>>"], ["+", "-"], ["*", "/", "%"], ["**"]].forEach(function (tier, i) {
  tier.forEach(function (op) {
    PRECEDENCE[op] = i;
  });
});

function getPrecedence(op) {
  return PRECEDENCE[op];
}

var equalityOperators = {
  "==": true,
  "!=": true,
  "===": true,
  "!==": true
};
var multiplicativeOperators = {
  "*": true,
  "/": true,
  "%": true
};
var bitshiftOperators = {
  ">>": true,
  ">>>": true,
  "<<": true
};

function shouldFlatten(parentOp, nodeOp) {
  if (getPrecedence(nodeOp) !== getPrecedence(parentOp)) {
    return false;
  } // ** is right-associative
  // x ** y ** z --> x ** (y ** z)


  if (parentOp === "**") {
    return false;
  } // x == y == z --> (x == y) == z


  if (equalityOperators[parentOp] && equalityOperators[nodeOp]) {
    return false;
  } // x * y % z --> (x * y) % z


  if (nodeOp === "%" && multiplicativeOperators[parentOp] || parentOp === "%" && multiplicativeOperators[nodeOp]) {
    return false;
  } // x * y / z --> (x * y) / z
  // x / y * z --> (x / y) * z


  if (nodeOp !== parentOp && multiplicativeOperators[nodeOp] && multiplicativeOperators[parentOp]) {
    return false;
  } // x << y << z --> (x << y) << z


  if (bitshiftOperators[parentOp] && bitshiftOperators[nodeOp]) {
    return false;
  }

  return true;
}

function isBitwiseOperator(operator) {
  return !!bitshiftOperators[operator] || operator === "|" || operator === "^" || operator === "&";
} // Tests if an expression starts with `{`, or (if forbidFunctionClassAndDoExpr
// holds) `function`, `class`, or `do {}`. Will be overzealous if there's
// already necessary grouping parentheses.


function startsWithNoLookaheadToken(node, forbidFunctionClassAndDoExpr) {
  node = getLeftMost(node);

  switch (node.type) {
    case "FunctionExpression":
    case "ClassExpression":
    case "DoExpression":
      return forbidFunctionClassAndDoExpr;

    case "ObjectExpression":
      return true;

    case "MemberExpression":
      return startsWithNoLookaheadToken(node.object, forbidFunctionClassAndDoExpr);

    case "TaggedTemplateExpression":
      if (node.tag.type === "FunctionExpression") {
        // IIFEs are always already parenthesized
        return false;
      }

      return startsWithNoLookaheadToken(node.tag, forbidFunctionClassAndDoExpr);

    case "CallExpression":
      if (node.callee.type === "FunctionExpression") {
        // IIFEs are always already parenthesized
        return false;
      }

      return startsWithNoLookaheadToken(node.callee, forbidFunctionClassAndDoExpr);

    case "ConditionalExpression":
      return startsWithNoLookaheadToken(node.test, forbidFunctionClassAndDoExpr);

    case "UpdateExpression":
      return !node.prefix && startsWithNoLookaheadToken(node.argument, forbidFunctionClassAndDoExpr);

    case "BindExpression":
      return node.object && startsWithNoLookaheadToken(node.object, forbidFunctionClassAndDoExpr);

    case "SequenceExpression":
      return startsWithNoLookaheadToken(node.expressions[0], forbidFunctionClassAndDoExpr);

    case "TSAsExpression":
      return startsWithNoLookaheadToken(node.expression, forbidFunctionClassAndDoExpr);

    default:
      return false;
  }
}

function getLeftMost(node) {
  if (node.left) {
    return getLeftMost(node.left);
  }

  return node;
}

function getAlignmentSize(value, tabWidth, startIndex) {
  startIndex = startIndex || 0;
  var size = 0;

  for (var i = startIndex; i < value.length; ++i) {
    if (value[i] === "\t") {
      // Tabs behave in a way that they are aligned to the nearest
      // multiple of tabWidth:
      // 0 -> 4, 1 -> 4, 2 -> 4, 3 -> 4
      // 4 -> 8, 5 -> 8, 6 -> 8, 7 -> 8 ...
      size = size + tabWidth - size % tabWidth;
    } else {
      size++;
    }
  }

  return size;
}

function getIndentSize(value, tabWidth) {
  var lastNewlineIndex = value.lastIndexOf("\n");

  if (lastNewlineIndex === -1) {
    return 0;
  }

  return getAlignmentSize( // All the leading whitespaces
  value.slice(lastNewlineIndex + 1).match(/^[ \t]*/)[0], tabWidth);
}

function printString(raw, options, isDirectiveLiteral) {
  // `rawContent` is the string exactly like it appeared in the input source
  // code, without its enclosing quotes.
  var rawContent = raw.slice(1, -1);
  var _double = {
    quote: '"',
    regex: /"/g
  };
  var single = {
    quote: "'",
    regex: /'/g
  };
  var preferred = options.singleQuote ? single : _double;
  var alternate = preferred === single ? _double : single;
  var shouldUseAlternateQuote = false;
  var canChangeDirectiveQuotes = false; // If `rawContent` contains at least one of the quote preferred for enclosing
  // the string, we might want to enclose with the alternate quote instead, to
  // minimize the number of escaped quotes.
  // Also check for the alternate quote, to determine if we're allowed to swap
  // the quotes on a DirectiveLiteral.

  if (rawContent.includes(preferred.quote) || rawContent.includes(alternate.quote)) {
    var numPreferredQuotes = (rawContent.match(preferred.regex) || []).length;
    var numAlternateQuotes = (rawContent.match(alternate.regex) || []).length;
    shouldUseAlternateQuote = numPreferredQuotes > numAlternateQuotes;
  } else {
    canChangeDirectiveQuotes = true;
  }

  var enclosingQuote = options.parser === "json" ? _double.quote : shouldUseAlternateQuote ? alternate.quote : preferred.quote; // Directives are exact code unit sequences, which means that you can't
  // change the escape sequences they use.
  // See https://github.com/prettier/prettier/issues/1555
  // and https://tc39.github.io/ecma262/#directive-prologue

  if (isDirectiveLiteral) {
    if (canChangeDirectiveQuotes) {
      return enclosingQuote + rawContent + enclosingQuote;
    }

    return raw;
  } // It might sound unnecessary to use `makeString` even if the string already
  // is enclosed with `enclosingQuote`, but it isn't. The string could contain
  // unnecessary escapes (such as in `"\'"`). Always using `makeString` makes
  // sure that we consistently output the minimum amount of escaped quotes.


  return makeString(rawContent, enclosingQuote, !(options.parser === "css" || options.parser === "less" || options.parser === "scss"));
}

function makeString(rawContent, enclosingQuote, unescapeUnnecessaryEscapes) {
  var otherQuote = enclosingQuote === '"' ? "'" : '"'; // Matches _any_ escape and unescaped quotes (both single and double).

  var regex = /\\([\s\S])|(['"])/g; // Escape and unescape single and double quotes as needed to be able to
  // enclose `rawContent` with `enclosingQuote`.

  var newContent = rawContent.replace(regex, function (match, escaped, quote) {
    // If we matched an escape, and the escaped character is a quote of the
    // other type than we intend to enclose the string with, there's no need for
    // it to be escaped, so return it _without_ the backslash.
    if (escaped === otherQuote) {
      return escaped;
    } // If we matched an unescaped quote and it is of the _same_ type as we
    // intend to enclose the string with, it must be escaped, so return it with
    // a backslash.


    if (quote === enclosingQuote) {
      return "\\" + quote;
    }

    if (quote) {
      return quote;
    } // Unescape any unnecessarily escaped character.
    // Adapted from https://github.com/eslint/eslint/blob/de0b4ad7bd820ade41b1f606008bea68683dc11a/lib/rules/no-useless-escape.js#L27


    return unescapeUnnecessaryEscapes && /^[^\\nrvtbfux\r\n\u2028\u2029"'0-7]$/.test(escaped) ? escaped : "\\" + escaped;
  });
  return enclosingQuote + newContent + enclosingQuote;
}

function printNumber(rawNumber) {
  return rawNumber.toLowerCase() // Remove unnecessary plus and zeroes from scientific notation.
  .replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(\d)/, "$1$2$3") // Remove unnecessary scientific notation (1e0).
  .replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1") // Make sure numbers always start with a digit.
  .replace(/^([+-])?\./, "$10.") // Remove extraneous trailing decimal zeroes.
  .replace(/(\.\d+?)0+(?=e|$)/, "$1") // Remove trailing dot.
  .replace(/\.(?=e|$)/, "");
}

function getMaxContinuousCount(str, target) {
  var results = str.match(new RegExp("(".concat(escapeStringRegexp(target), ")+"), "g"));

  if (results === null) {
    return 0;
  }

  return results.reduce(function (maxCount, result) {
    return Math.max(maxCount, result.length / target.length);
  }, 0);
}

function getStringWidth(text) {
  if (!text) {
    return 0;
  } // shortcut to avoid needless string `RegExp`s, replacements, and allocations within `string-width`


  if (!notAsciiRegex.test(text)) {
    return text.length;
  } // emojis are considered 2-char width for consistency
  // see https://github.com/sindresorhus/string-width/issues/11
  // for the reason why not implemented in `string-width`


  return stringWidth(text.replace(emojiRegex, "  "));
}

function hasIgnoreComment(path) {
  var node = path.getValue();
  return hasNodeIgnoreComment(node);
}

function hasNodeIgnoreComment(node) {
  return node && node.comments && node.comments.length > 0 && node.comments.some(function (comment) {
    return comment.value.trim() === "prettier-ignore";
  });
}

function matchAncestorTypes(path, types, index) {
  index = index || 0;
  types = types.slice();

  while (types.length) {
    var parent = path.getParentNode(index);
    var type = types.shift();

    if (!parent || parent.type !== type) {
      return false;
    }

    index++;
  }

  return true;
}

function addCommentHelper(node, comment) {
  var comments = node.comments || (node.comments = []);
  comments.push(comment);
  comment.printed = false; // For some reason, TypeScript parses `// x` inside of JSXText as a comment
  // We already "print" it via the raw text, we don't need to re-print it as a
  // comment

  if (node.type === "JSXText") {
    comment.printed = true;
  }
}

function addLeadingComment(node, comment) {
  comment.leading = true;
  comment.trailing = false;
  addCommentHelper(node, comment);
}

function addDanglingComment(node, comment) {
  comment.leading = false;
  comment.trailing = false;
  addCommentHelper(node, comment);
}

function addTrailingComment(node, comment) {
  comment.leading = false;
  comment.trailing = true;
  addCommentHelper(node, comment);
}

function isWithinParentArrayProperty(path, propertyName) {
  var node = path.getValue();
  var parent = path.getParentNode();

  if (parent == null) {
    return false;
  }

  if (!Array.isArray(parent[propertyName])) {
    return false;
  }

  var key = path.getName();
  return parent[propertyName][key] === node;
}

module.exports = {
  getStringWidth: getStringWidth,
  getMaxContinuousCount: getMaxContinuousCount,
  getPrecedence: getPrecedence,
  shouldFlatten: shouldFlatten,
  isBitwiseOperator: isBitwiseOperator,
  isExportDeclaration: isExportDeclaration,
  getParentExportDeclaration: getParentExportDeclaration,
  getPenultimate: getPenultimate,
  getLast: getLast,
  getNextNonSpaceNonCommentCharacterIndex: getNextNonSpaceNonCommentCharacterIndex,
  getNextNonSpaceNonCommentCharacter: getNextNonSpaceNonCommentCharacter,
  skip: skip,
  skipWhitespace: skipWhitespace,
  skipSpaces: skipSpaces,
  skipToLineEnd: skipToLineEnd,
  skipEverythingButNewLine: skipEverythingButNewLine,
  skipInlineComment: skipInlineComment,
  skipTrailingComment: skipTrailingComment,
  skipNewline: skipNewline,
  isNextLineEmptyAfterIndex: isNextLineEmptyAfterIndex,
  isNextLineEmpty: isNextLineEmpty,
  isPreviousLineEmpty: isPreviousLineEmpty,
  hasNewline: hasNewline,
  hasNewlineInRange: hasNewlineInRange,
  hasSpaces: hasSpaces,
  setLocStart: setLocStart,
  setLocEnd: setLocEnd,
  startsWithNoLookaheadToken: startsWithNoLookaheadToken,
  getAlignmentSize: getAlignmentSize,
  getIndentSize: getIndentSize,
  printString: printString,
  printNumber: printNumber,
  hasIgnoreComment: hasIgnoreComment,
  hasNodeIgnoreComment: hasNodeIgnoreComment,
  makeString: makeString,
  matchAncestorTypes: matchAncestorTypes,
  addLeadingComment: addLeadingComment,
  addDanglingComment: addDanglingComment,
  addTrailingComment: addTrailingComment,
  isWithinParentArrayProperty: isWithinParentArrayProperty
};

/***/ }),
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */
/***/ (function(module, exports) {

// eslint-disable-next-line no-unused-vars
function clean(ast, newObj, parent) {
  ['code', 'codeStart', 'loc', 'range'].forEach(function (name) {
    delete newObj[name]; // eslint-disable-line no-param-reassign
  });
}

module.exports = clean;

/***/ }),
/* 72 */
/***/ (function(module, exports) {

// see: https://github.com/prettier/prettier/blob/master/src/language-js/loc.js
function getRange(index, node) {
  if (node.range) {
    return node.range[index];
  }

  if (node.expression.range) {
    return node.expression.range[index];
  }

  return null;
}

module.exports = {
  locEnd: function locEnd(node) {
    return getRange(1, node);
  },
  locStart: function locStart(node) {
    return getRange(0, node);
  }
};

/***/ }),
/* 73 */
/***/ (function(module, exports) {

var CATEGORY_GLOBAL = 'Global';
var CATEGORY_COMMON = 'Common';
var CATEGORY_SOLIDITY = 'Solidity';
var options = {
  bracketSpacing: {
    since: '0.0.0',
    category: CATEGORY_COMMON,
    type: 'boolean',
    default: false,
    description: 'Print spaces between brackets.',
    oppositeDescription: 'Do not print spaces between brackets.'
  },
  printWidth: {
    since: '0.0.0',
    category: CATEGORY_GLOBAL,
    type: 'int',
    default: 80,
    description: 'The line length where Prettier will try wrap.',
    range: {
      start: 0,
      end: Infinity,
      step: 1
    }
  },
  // TODO: uncomment when https://github.com/prettier-solidity/prettier-plugin-solidity/pull/144
  //       is merged.
  // singleQuote: {
  //   since: '0.0.0',
  //   category: CATEGORY_COMMON,
  //   type: 'boolean',
  //   default: false,
  //   description: 'Use single quotes instead of double quotes.'
  // },
  tabWidth: {
    type: 'int',
    category: CATEGORY_GLOBAL,
    default: 4,
    description: 'Number of spaces per indentation level.',
    range: {
      start: 0,
      end: Infinity,
      step: 1
    }
  },
  useTabs: {
    since: '1.0.0',
    category: CATEGORY_GLOBAL,
    type: 'boolean',
    default: false,
    description: 'Indent with tabs instead of spaces.'
  },
  explicitTypes: {
    category: CATEGORY_SOLIDITY,
    type: 'choice',
    default: 'always',
    description: 'Change when type aliases are used.',
    choices: [{
      value: 'always',
      description: 'Prefer the explicit types `uint256`, `int256`, and `bytes1`.'
    }, {
      value: 'never',
      description: 'Prefer the type aliases `uint`, `int`, and `byte`.'
    }, {
      value: 'preserve',
      description: 'Respect the type used by the developer.'
    }]
  },
  spacedExp: {
    category: CATEGORY_SOLIDITY,
    type: 'boolean',
    default: false,
    description: "Print spaces arround '**'."
  }
};
module.exports = options;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var extract = __webpack_require__(75); // https://prettier.io/docs/en/plugins.html#parsers


var parser = __webpack_require__(89);

function parse(text, parsers, options) {
  var parsed = parser.parse(text, {
    loc: true,
    range: true
  });
  parsed.comments = extract(text);
  parser.visit(parsed, {
    ForStatement: function ForStatement(ctx) {
      if (ctx.initExpression) {
        ctx.initExpression.omitSemicolon = true;
      }

      if (ctx.loopExpression) {
        ctx.loopExpression.omitSemicolon = true;
      }
    },
    ElementaryTypeName: function ElementaryTypeName(ctx) {
      if (options.explicitTypes === 'always') {
        if (ctx.name === 'uint') ctx.name = 'uint256';
        if (ctx.name === 'int') ctx.name = 'int256';
        if (ctx.name === 'byte') ctx.name = 'bytes1';
      } else if (options.explicitTypes === 'never') {
        if (ctx.name === 'uint256') ctx.name = 'uint';
        if (ctx.name === 'int256') ctx.name = 'int';
        if (ctx.name === 'bytes1') ctx.name = 'byte';
      }
    }
  });
  return parsed;
}

module.exports = parse;

/***/ }),
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var antlr4 = __webpack_require__(13);

var _require = __webpack_require__(107),
    SolidityLexer = _require.SolidityLexer;

var _require2 = __webpack_require__(108),
    SolidityParser = _require2.SolidityParser;

var ASTBuilder = __webpack_require__(110);

var ErrorListener = __webpack_require__(111);

var _require3 = __webpack_require__(112),
    buildTokenList = _require3.buildTokenList;

function ParserError(args) {
  var _args$errors$ = args.errors[0],
      message = _args$errors$.message,
      line = _args$errors$.line,
      column = _args$errors$.column;
  this.message = message + ' (' + line + ':' + column + ')';
  this.errors = args.errors;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
}

ParserError.prototype = Object.create(Error.prototype);
ParserError.prototype.constructor = ParserError;
ParserError.prototype.name = 'ParserError';

function tokenize(input, options) {
  options = options || {};
  var chars = antlr4.CharStreams.fromString(input);
  var lexer = new SolidityLexer(chars);
  var tokens = new antlr4.CommonTokenStream(lexer);
  return buildTokenList(tokens.tokenSource.getAllTokens(), options);
}

function parse(input, options) {
  options = options || {};
  var chars = antlr4.CharStreams.fromString(input);
  var listener = new ErrorListener();
  var lexer = new SolidityLexer(chars);
  lexer.removeErrorListeners();
  lexer.addErrorListener(listener);
  var tokens = new antlr4.CommonTokenStream(lexer);
  var parser = new SolidityParser(tokens);
  parser.removeErrorListeners();
  parser.addErrorListener(listener);
  parser.buildParseTrees = true;
  var tree = parser.sourceUnit();
  var tokenList = void 0;

  if (options.tokens) {
    var tokenSource = tokens.tokenSource;
    tokenSource.reset();
    tokenList = buildTokenList(tokenSource.getAllTokens(), options);
  }

  if (!options.tolerant && listener.hasErrors()) {
    throw new ParserError({
      errors: listener.getErrors()
    });
  }

  var visitor = new ASTBuilder(options);
  var ast = visitor.visit(tree);

  if (options.tolerant && listener.hasErrors()) {
    ast.errors = listener.getErrors();
  }

  if (options.tokens) {
    ast.tokens = tokenList;
  }

  return ast;
}

function _isASTNode(node) {
  return !!node && (typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && node.hasOwnProperty('type');
}

function visit(node, visitor) {
  if (Array.isArray(node)) {
    node.forEach(function (child) {
      return visit(child, visitor);
    });
  }

  if (!_isASTNode(node)) return;
  var cont = true;

  if (visitor[node.type]) {
    cont = visitor[node.type](node);
  }

  if (cont === false) return;

  for (var prop in node) {
    if (node.hasOwnProperty(prop)) {
      visit(node[prop], visitor);
    }
  }

  var selector = node.type + ':exit';

  if (visitor[selector]) {
    visitor[selector](node);
  }
}

exports.tokenize = tokenize;
exports.parse = parse;
exports.visit = visit;
exports.ParserError = ParserError;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

exports.ATN = __webpack_require__(9).ATN;
exports.ATNDeserializer = __webpack_require__(39).ATNDeserializer;
exports.LexerATNSimulator = __webpack_require__(93).LexerATNSimulator;
exports.ParserATNSimulator = __webpack_require__(96).ParserATNSimulator;
exports.PredictionMode = __webpack_require__(44).PredictionMode;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///

var Set = __webpack_require__(2).Set;

var BitSet = __webpack_require__(2).BitSet;

var Token = __webpack_require__(3).Token;

var ATNConfig = __webpack_require__(19).ATNConfig;

var Interval = __webpack_require__(4).Interval;

var IntervalSet = __webpack_require__(4).IntervalSet;

var RuleStopState = __webpack_require__(5).RuleStopState;

var RuleTransition = __webpack_require__(10).RuleTransition;

var NotSetTransition = __webpack_require__(10).NotSetTransition;

var WildcardTransition = __webpack_require__(10).WildcardTransition;

var AbstractPredicateTransition = __webpack_require__(10).AbstractPredicateTransition;

var pc = __webpack_require__(8);

var predictionContextFromRuleContext = pc.predictionContextFromRuleContext;
var PredictionContext = pc.PredictionContext;
var SingletonPredictionContext = pc.SingletonPredictionContext;

function LL1Analyzer(atn) {
  this.atn = atn;
} //* Special value added to the lookahead sets to indicate that we hit
//  a predicate during analysis if {@code seeThruPreds==false}.
///


LL1Analyzer.HIT_PRED = Token.INVALID_TYPE; //*
// Calculates the SLL(1) expected lookahead set for each outgoing transition
// of an {@link ATNState}. The returned array has one element for each
// outgoing transition in {@code s}. If the closure from transition
// <em>i</em> leads to a semantic predicate before matching a symbol, the
// element at index <em>i</em> of the result will be {@code null}.
//
// @param s the ATN state
// @return the expected symbols for each outgoing transition of {@code s}.
///

LL1Analyzer.prototype.getDecisionLookahead = function (s) {
  if (s === null) {
    return null;
  }

  var count = s.transitions.length;
  var look = [];

  for (var alt = 0; alt < count; alt++) {
    look[alt] = new IntervalSet();
    var lookBusy = new Set();
    var seeThruPreds = false; // fail to get lookahead upon pred

    this._LOOK(s.transition(alt).target, null, PredictionContext.EMPTY, look[alt], lookBusy, new BitSet(), seeThruPreds, false); // Wipe out lookahead for this alternative if we found nothing
    // or we had a predicate when we !seeThruPreds


    if (look[alt].length === 0 || look[alt].contains(LL1Analyzer.HIT_PRED)) {
      look[alt] = null;
    }
  }

  return look;
}; //*
// Compute set of tokens that can follow {@code s} in the ATN in the
// specified {@code ctx}.
//
// <p>If {@code ctx} is {@code null} and the end of the rule containing
// {@code s} is reached, {@link Token//EPSILON} is added to the result set.
// If {@code ctx} is not {@code null} and the end of the outermost rule is
// reached, {@link Token//EOF} is added to the result set.</p>
//
// @param s the ATN state
// @param stopState the ATN state to stop at. This can be a
// {@link BlockEndState} to detect epsilon paths through a closure.
// @param ctx the complete parser context, or {@code null} if the context
// should be ignored
//
// @return The set of tokens that can follow {@code s} in the ATN in the
// specified {@code ctx}.
///


LL1Analyzer.prototype.LOOK = function (s, stopState, ctx) {
  var r = new IntervalSet();
  var seeThruPreds = true; // ignore preds; get all lookahead

  ctx = ctx || null;
  var lookContext = ctx !== null ? predictionContextFromRuleContext(s.atn, ctx) : null;

  this._LOOK(s, stopState, lookContext, r, new Set(), new BitSet(), seeThruPreds, true);

  return r;
}; //*
// Compute set of tokens that can follow {@code s} in the ATN in the
// specified {@code ctx}.
//
// <p>If {@code ctx} is {@code null} and {@code stopState} or the end of the
// rule containing {@code s} is reached, {@link Token//EPSILON} is added to
// the result set. If {@code ctx} is not {@code null} and {@code addEOF} is
// {@code true} and {@code stopState} or the end of the outermost rule is
// reached, {@link Token//EOF} is added to the result set.</p>
//
// @param s the ATN state.
// @param stopState the ATN state to stop at. This can be a
// {@link BlockEndState} to detect epsilon paths through a closure.
// @param ctx The outer context, or {@code null} if the outer context should
// not be used.
// @param look The result lookahead set.
// @param lookBusy A set used for preventing epsilon closures in the ATN
// from causing a stack overflow. Outside code should pass
// {@code new Set<ATNConfig>} for this argument.
// @param calledRuleStack A set used for preventing left recursion in the
// ATN from causing a stack overflow. Outside code should pass
// {@code new BitSet()} for this argument.
// @param seeThruPreds {@code true} to true semantic predicates as
// implicitly {@code true} and "see through them", otherwise {@code false}
// to treat semantic predicates as opaque and add {@link //HIT_PRED} to the
// result if one is encountered.
// @param addEOF Add {@link Token//EOF} to the result if the end of the
// outermost context is reached. This parameter has no effect if {@code ctx}
// is {@code null}.
///


LL1Analyzer.prototype._LOOK = function (s, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF) {
  var c = new ATNConfig({
    state: s,
    alt: 0,
    context: ctx
  }, null);

  if (lookBusy.contains(c)) {
    return;
  }

  lookBusy.add(c);

  if (s === stopState) {
    if (ctx === null) {
      look.addOne(Token.EPSILON);
      return;
    } else if (ctx.isEmpty() && addEOF) {
      look.addOne(Token.EOF);
      return;
    }
  }

  if (s instanceof RuleStopState) {
    if (ctx === null) {
      look.addOne(Token.EPSILON);
      return;
    } else if (ctx.isEmpty() && addEOF) {
      look.addOne(Token.EOF);
      return;
    }

    if (ctx !== PredictionContext.EMPTY) {
      // run thru all possible stack tops in ctx
      for (var i = 0; i < ctx.length; i++) {
        var returnState = this.atn.states[ctx.getReturnState(i)];
        var removed = calledRuleStack.contains(returnState.ruleIndex);

        try {
          calledRuleStack.remove(returnState.ruleIndex);

          this._LOOK(returnState, stopState, ctx.getParent(i), look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
        } finally {
          if (removed) {
            calledRuleStack.add(returnState.ruleIndex);
          }
        }
      }

      return;
    }
  }

  for (var j = 0; j < s.transitions.length; j++) {
    var t = s.transitions[j];

    if (t.constructor === RuleTransition) {
      if (calledRuleStack.contains(t.target.ruleIndex)) {
        continue;
      }

      var newContext = SingletonPredictionContext.create(ctx, t.followState.stateNumber);

      try {
        calledRuleStack.add(t.target.ruleIndex);

        this._LOOK(t.target, stopState, newContext, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
      } finally {
        calledRuleStack.remove(t.target.ruleIndex);
      }
    } else if (t instanceof AbstractPredicateTransition) {
      if (seeThruPreds) {
        this._LOOK(t.target, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
      } else {
        look.addOne(LL1Analyzer.HIT_PRED);
      }
    } else if (t.isEpsilon) {
      this._LOOK(t.target, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
    } else if (t.constructor === WildcardTransition) {
      look.addRange(Token.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType);
    } else {
      var set = t.label;

      if (set !== null) {
        if (t instanceof NotSetTransition) {
          set = set.complement(Token.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType);
        }

        look.addSet(set);
      }
    }
  }
};

exports.LL1Analyzer = LL1Analyzer;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
// Represents the type of recognizer an ATN applies to.

function ATNType() {}

ATNType.LEXER = 0;
ATNType.PARSER = 1;
exports.ATNType = ATNType;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
// When we hit an accept state in either the DFA or the ATN, we
//  have to notify the character stream to start buffering characters
//  via {@link IntStream//mark} and record the current state. The current sim state
//  includes the current index into the input, the current line,
//  and current character position in that line. Note that the Lexer is
//  tracking the starting line and characterization of the token. These
//  variables track the "state" of the simulator when it hits an accept state.
//
//  <p>We track these variables separately for the DFA and ATN simulation
//  because the DFA simulation often has to fail over to the ATN
//  simulation. If the ATN simulation fails, we need the DFA to fall
//  back to its previously accepted state, if any. If the ATN succeeds,
//  then the ATN does the accept and the DFA simulator that invoked it
//  can simply return the predicted token type.</p>
///

var Token = __webpack_require__(3).Token;

var Lexer = __webpack_require__(21).Lexer;

var ATN = __webpack_require__(9).ATN;

var ATNSimulator = __webpack_require__(43).ATNSimulator;

var DFAState = __webpack_require__(15).DFAState;

var ATNConfigSet = __webpack_require__(12).ATNConfigSet;

var OrderedATNConfigSet = __webpack_require__(12).OrderedATNConfigSet;

var PredictionContext = __webpack_require__(8).PredictionContext;

var SingletonPredictionContext = __webpack_require__(8).SingletonPredictionContext;

var RuleStopState = __webpack_require__(5).RuleStopState;

var LexerATNConfig = __webpack_require__(19).LexerATNConfig;

var Transition = __webpack_require__(10).Transition;

var LexerActionExecutor = __webpack_require__(95).LexerActionExecutor;

var LexerNoViableAltException = __webpack_require__(7).LexerNoViableAltException;

function resetSimState(sim) {
  sim.index = -1;
  sim.line = 0;
  sim.column = -1;
  sim.dfaState = null;
}

function SimState() {
  resetSimState(this);
  return this;
}

SimState.prototype.reset = function () {
  resetSimState(this);
};

function LexerATNSimulator(recog, atn, decisionToDFA, sharedContextCache) {
  ATNSimulator.call(this, atn, sharedContextCache);
  this.decisionToDFA = decisionToDFA;
  this.recog = recog; // The current token's starting index into the character stream.
  // Shared across DFA to ATN simulation in case the ATN fails and the
  // DFA did not have a previous accept state. In this case, we use the
  // ATN-generated exception object.

  this.startIndex = -1; // line number 1..n within the input///

  this.line = 1; // The index of the character relative to the beginning of the line
  // 0..n-1///

  this.column = 0;
  this.mode = Lexer.DEFAULT_MODE; // Used during DFA/ATN exec to record the most recent accept configuration
  // info

  this.prevAccept = new SimState(); // done

  return this;
}

LexerATNSimulator.prototype = Object.create(ATNSimulator.prototype);
LexerATNSimulator.prototype.constructor = LexerATNSimulator;
LexerATNSimulator.debug = false;
LexerATNSimulator.dfa_debug = false;
LexerATNSimulator.MIN_DFA_EDGE = 0;
LexerATNSimulator.MAX_DFA_EDGE = 127; // forces unicode to stay in ATN

LexerATNSimulator.match_calls = 0;

LexerATNSimulator.prototype.copyState = function (simulator) {
  this.column = simulator.column;
  this.line = simulator.line;
  this.mode = simulator.mode;
  this.startIndex = simulator.startIndex;
};

LexerATNSimulator.prototype.match = function (input, mode) {
  this.match_calls += 1;
  this.mode = mode;
  var mark = input.mark();

  try {
    this.startIndex = input.index;
    this.prevAccept.reset();
    var dfa = this.decisionToDFA[mode];

    if (dfa.s0 === null) {
      return this.matchATN(input);
    } else {
      return this.execATN(input, dfa.s0);
    }
  } finally {
    input.release(mark);
  }
};

LexerATNSimulator.prototype.reset = function () {
  this.prevAccept.reset();
  this.startIndex = -1;
  this.line = 1;
  this.column = 0;
  this.mode = Lexer.DEFAULT_MODE;
};

LexerATNSimulator.prototype.matchATN = function (input) {
  var startState = this.atn.modeToStartState[this.mode];

  if (LexerATNSimulator.debug) {
    console.log("matchATN mode " + this.mode + " start: " + startState);
  }

  var old_mode = this.mode;
  var s0_closure = this.computeStartState(input, startState);
  var suppressEdge = s0_closure.hasSemanticContext;
  s0_closure.hasSemanticContext = false;
  var next = this.addDFAState(s0_closure);

  if (!suppressEdge) {
    this.decisionToDFA[this.mode].s0 = next;
  }

  var predict = this.execATN(input, next);

  if (LexerATNSimulator.debug) {
    console.log("DFA after matchATN: " + this.decisionToDFA[old_mode].toLexerString());
  }

  return predict;
};

LexerATNSimulator.prototype.execATN = function (input, ds0) {
  if (LexerATNSimulator.debug) {
    console.log("start state closure=" + ds0.configs);
  }

  if (ds0.isAcceptState) {
    // allow zero-length tokens
    this.captureSimState(this.prevAccept, input, ds0);
  }

  var t = input.LA(1);
  var s = ds0; // s is current/from DFA state

  while (true) {
    // while more work
    if (LexerATNSimulator.debug) {
      console.log("execATN loop starting closure: " + s.configs);
    } // As we move src->trg, src->trg, we keep track of the previous trg to
    // avoid looking up the DFA state again, which is expensive.
    // If the previous target was already part of the DFA, we might
    // be able to avoid doing a reach operation upon t. If s!=null,
    // it means that semantic predicates didn't prevent us from
    // creating a DFA state. Once we know s!=null, we check to see if
    // the DFA state has an edge already for t. If so, we can just reuse
    // it's configuration set; there's no point in re-computing it.
    // This is kind of like doing DFA simulation within the ATN
    // simulation because DFA simulation is really just a way to avoid
    // computing reach/closure sets. Technically, once we know that
    // we have a previously added DFA state, we could jump over to
    // the DFA simulator. But, that would mean popping back and forth
    // a lot and making things more complicated algorithmically.
    // This optimization makes a lot of sense for loops within DFA.
    // A character will take us back to an existing DFA state
    // that already has lots of edges out of it. e.g., .* in comments.
    // print("Target for:" + str(s) + " and:" + str(t))


    var target = this.getExistingTargetState(s, t); // print("Existing:" + str(target))

    if (target === null) {
      target = this.computeTargetState(input, s, t); // print("Computed:" + str(target))
    }

    if (target === ATNSimulator.ERROR) {
      break;
    } // If this is a consumable input element, make sure to consume before
    // capturing the accept state so the input index, line, and char
    // position accurately reflect the state of the interpreter at the
    // end of the token.


    if (t !== Token.EOF) {
      this.consume(input);
    }

    if (target.isAcceptState) {
      this.captureSimState(this.prevAccept, input, target);

      if (t === Token.EOF) {
        break;
      }
    }

    t = input.LA(1);
    s = target; // flip; current DFA target becomes new src/from state
  }

  return this.failOrAccept(this.prevAccept, input, s.configs, t);
}; // Get an existing target state for an edge in the DFA. If the target state
// for the edge has not yet been computed or is otherwise not available,
// this method returns {@code null}.
//
// @param s The current DFA state
// @param t The next input symbol
// @return The existing target DFA state for the given input symbol
// {@code t}, or {@code null} if the target state for this edge is not
// already cached


LexerATNSimulator.prototype.getExistingTargetState = function (s, t) {
  if (s.edges === null || t < LexerATNSimulator.MIN_DFA_EDGE || t > LexerATNSimulator.MAX_DFA_EDGE) {
    return null;
  }

  var target = s.edges[t - LexerATNSimulator.MIN_DFA_EDGE];

  if (target === undefined) {
    target = null;
  }

  if (LexerATNSimulator.debug && target !== null) {
    console.log("reuse state " + s.stateNumber + " edge to " + target.stateNumber);
  }

  return target;
}; // Compute a target state for an edge in the DFA, and attempt to add the
// computed state and corresponding edge to the DFA.
//
// @param input The input stream
// @param s The current DFA state
// @param t The next input symbol
//
// @return The computed target DFA state for the given input symbol
// {@code t}. If {@code t} does not lead to a valid DFA state, this method
// returns {@link //ERROR}.


LexerATNSimulator.prototype.computeTargetState = function (input, s, t) {
  var reach = new OrderedATNConfigSet(); // if we don't find an existing DFA state
  // Fill reach starting from closure, following t transitions

  this.getReachableConfigSet(input, s.configs, reach, t);

  if (reach.items.length === 0) {
    // we got nowhere on t from s
    if (!reach.hasSemanticContext) {
      // we got nowhere on t, don't throw out this knowledge; it'd
      // cause a failover from DFA later.
      this.addDFAEdge(s, t, ATNSimulator.ERROR);
    } // stop when we can't match any more char


    return ATNSimulator.ERROR;
  } // Add an edge from s to target DFA found/created for reach


  return this.addDFAEdge(s, t, null, reach);
};

LexerATNSimulator.prototype.failOrAccept = function (prevAccept, input, reach, t) {
  if (this.prevAccept.dfaState !== null) {
    var lexerActionExecutor = prevAccept.dfaState.lexerActionExecutor;
    this.accept(input, lexerActionExecutor, this.startIndex, prevAccept.index, prevAccept.line, prevAccept.column);
    return prevAccept.dfaState.prediction;
  } else {
    // if no accept and EOF is first char, return EOF
    if (t === Token.EOF && input.index === this.startIndex) {
      return Token.EOF;
    }

    throw new LexerNoViableAltException(this.recog, input, this.startIndex, reach);
  }
}; // Given a starting configuration set, figure out all ATN configurations
// we can reach upon input {@code t}. Parameter {@code reach} is a return
// parameter.


LexerATNSimulator.prototype.getReachableConfigSet = function (input, closure, reach, t) {
  // this is used to skip processing for configs which have a lower priority
  // than a config that already reached an accept state for the same rule
  var skipAlt = ATN.INVALID_ALT_NUMBER;

  for (var i = 0; i < closure.items.length; i++) {
    var cfg = closure.items[i];
    var currentAltReachedAcceptState = cfg.alt === skipAlt;

    if (currentAltReachedAcceptState && cfg.passedThroughNonGreedyDecision) {
      continue;
    }

    if (LexerATNSimulator.debug) {
      console.log("testing %s at %s\n", this.getTokenName(t), cfg.toString(this.recog, true));
    }

    for (var j = 0; j < cfg.state.transitions.length; j++) {
      var trans = cfg.state.transitions[j]; // for each transition

      var target = this.getReachableTarget(trans, t);

      if (target !== null) {
        var lexerActionExecutor = cfg.lexerActionExecutor;

        if (lexerActionExecutor !== null) {
          lexerActionExecutor = lexerActionExecutor.fixOffsetBeforeMatch(input.index - this.startIndex);
        }

        var treatEofAsEpsilon = t === Token.EOF;
        var config = new LexerATNConfig({
          state: target,
          lexerActionExecutor: lexerActionExecutor
        }, cfg);

        if (this.closure(input, config, reach, currentAltReachedAcceptState, true, treatEofAsEpsilon)) {
          // any remaining configs for this alt have a lower priority
          // than the one that just reached an accept state.
          skipAlt = cfg.alt;
        }
      }
    }
  }
};

LexerATNSimulator.prototype.accept = function (input, lexerActionExecutor, startIndex, index, line, charPos) {
  if (LexerATNSimulator.debug) {
    console.log("ACTION %s\n", lexerActionExecutor);
  } // seek to after last char in token


  input.seek(index);
  this.line = line;
  this.column = charPos;

  if (lexerActionExecutor !== null && this.recog !== null) {
    lexerActionExecutor.execute(this.recog, input, startIndex);
  }
};

LexerATNSimulator.prototype.getReachableTarget = function (trans, t) {
  if (trans.matches(t, 0, Lexer.MAX_CHAR_VALUE)) {
    return trans.target;
  } else {
    return null;
  }
};

LexerATNSimulator.prototype.computeStartState = function (input, p) {
  var initialContext = PredictionContext.EMPTY;
  var configs = new OrderedATNConfigSet();

  for (var i = 0; i < p.transitions.length; i++) {
    var target = p.transitions[i].target;
    var cfg = new LexerATNConfig({
      state: target,
      alt: i + 1,
      context: initialContext
    }, null);
    this.closure(input, cfg, configs, false, false, false);
  }

  return configs;
}; // Since the alternatives within any lexer decision are ordered by
// preference, this method stops pursuing the closure as soon as an accept
// state is reached. After the first accept state is reached by depth-first
// search from {@code config}, all other (potentially reachable) states for
// this rule would have a lower priority.
//
// @return {@code true} if an accept state is reached, otherwise
// {@code false}.


LexerATNSimulator.prototype.closure = function (input, config, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon) {
  var cfg = null;

  if (LexerATNSimulator.debug) {
    console.log("closure(" + config.toString(this.recog, true) + ")");
  }

  if (config.state instanceof RuleStopState) {
    if (LexerATNSimulator.debug) {
      if (this.recog !== null) {
        console.log("closure at %s rule stop %s\n", this.recog.ruleNames[config.state.ruleIndex], config);
      } else {
        console.log("closure at rule stop %s\n", config);
      }
    }

    if (config.context === null || config.context.hasEmptyPath()) {
      if (config.context === null || config.context.isEmpty()) {
        configs.add(config);
        return true;
      } else {
        configs.add(new LexerATNConfig({
          state: config.state,
          context: PredictionContext.EMPTY
        }, config));
        currentAltReachedAcceptState = true;
      }
    }

    if (config.context !== null && !config.context.isEmpty()) {
      for (var i = 0; i < config.context.length; i++) {
        if (config.context.getReturnState(i) !== PredictionContext.EMPTY_RETURN_STATE) {
          var newContext = config.context.getParent(i); // "pop" return state

          var returnState = this.atn.states[config.context.getReturnState(i)];
          cfg = new LexerATNConfig({
            state: returnState,
            context: newContext
          }, config);
          currentAltReachedAcceptState = this.closure(input, cfg, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon);
        }
      }
    }

    return currentAltReachedAcceptState;
  } // optimization


  if (!config.state.epsilonOnlyTransitions) {
    if (!currentAltReachedAcceptState || !config.passedThroughNonGreedyDecision) {
      configs.add(config);
    }
  }

  for (var j = 0; j < config.state.transitions.length; j++) {
    var trans = config.state.transitions[j];
    cfg = this.getEpsilonTarget(input, config, trans, configs, speculative, treatEofAsEpsilon);

    if (cfg !== null) {
      currentAltReachedAcceptState = this.closure(input, cfg, configs, currentAltReachedAcceptState, speculative, treatEofAsEpsilon);
    }
  }

  return currentAltReachedAcceptState;
}; // side-effect: can alter configs.hasSemanticContext


LexerATNSimulator.prototype.getEpsilonTarget = function (input, config, trans, configs, speculative, treatEofAsEpsilon) {
  var cfg = null;

  if (trans.serializationType === Transition.RULE) {
    var newContext = SingletonPredictionContext.create(config.context, trans.followState.stateNumber);
    cfg = new LexerATNConfig({
      state: trans.target,
      context: newContext
    }, config);
  } else if (trans.serializationType === Transition.PRECEDENCE) {
    throw "Precedence predicates are not supported in lexers.";
  } else if (trans.serializationType === Transition.PREDICATE) {
    // Track traversing semantic predicates. If we traverse,
    // we cannot add a DFA state for this "reach" computation
    // because the DFA would not test the predicate again in the
    // future. Rather than creating collections of semantic predicates
    // like v3 and testing them on prediction, v4 will test them on the
    // fly all the time using the ATN not the DFA. This is slower but
    // semantically it's not used that often. One of the key elements to
    // this predicate mechanism is not adding DFA states that see
    // predicates immediately afterwards in the ATN. For example,
    // a : ID {p1}? | ID {p2}? ;
    // should create the start state for rule 'a' (to save start state
    // competition), but should not create target of ID state. The
    // collection of ATN states the following ID references includes
    // states reached by traversing predicates. Since this is when we
    // test them, we cannot cash the DFA state target of ID.
    if (LexerATNSimulator.debug) {
      console.log("EVAL rule " + trans.ruleIndex + ":" + trans.predIndex);
    }

    configs.hasSemanticContext = true;

    if (this.evaluatePredicate(input, trans.ruleIndex, trans.predIndex, speculative)) {
      cfg = new LexerATNConfig({
        state: trans.target
      }, config);
    }
  } else if (trans.serializationType === Transition.ACTION) {
    if (config.context === null || config.context.hasEmptyPath()) {
      // execute actions anywhere in the start rule for a token.
      //
      // TODO: if the entry rule is invoked recursively, some
      // actions may be executed during the recursive call. The
      // problem can appear when hasEmptyPath() is true but
      // isEmpty() is false. In this case, the config needs to be
      // split into two contexts - one with just the empty path
      // and another with everything but the empty path.
      // Unfortunately, the current algorithm does not allow
      // getEpsilonTarget to return two configurations, so
      // additional modifications are needed before we can support
      // the split operation.
      var lexerActionExecutor = LexerActionExecutor.append(config.lexerActionExecutor, this.atn.lexerActions[trans.actionIndex]);
      cfg = new LexerATNConfig({
        state: trans.target,
        lexerActionExecutor: lexerActionExecutor
      }, config);
    } else {
      // ignore actions in referenced rules
      cfg = new LexerATNConfig({
        state: trans.target
      }, config);
    }
  } else if (trans.serializationType === Transition.EPSILON) {
    cfg = new LexerATNConfig({
      state: trans.target
    }, config);
  } else if (trans.serializationType === Transition.ATOM || trans.serializationType === Transition.RANGE || trans.serializationType === Transition.SET) {
    if (treatEofAsEpsilon) {
      if (trans.matches(Token.EOF, 0, Lexer.MAX_CHAR_VALUE)) {
        cfg = new LexerATNConfig({
          state: trans.target
        }, config);
      }
    }
  }

  return cfg;
}; // Evaluate a predicate specified in the lexer.
//
// <p>If {@code speculative} is {@code true}, this method was called before
// {@link //consume} for the matched character. This method should call
// {@link //consume} before evaluating the predicate to ensure position
// sensitive values, including {@link Lexer//getText}, {@link Lexer//getLine},
// and {@link Lexer//getcolumn}, properly reflect the current
// lexer state. This method should restore {@code input} and the simulator
// to the original state before returning (i.e. undo the actions made by the
// call to {@link //consume}.</p>
//
// @param input The input stream.
// @param ruleIndex The rule containing the predicate.
// @param predIndex The index of the predicate within the rule.
// @param speculative {@code true} if the current index in {@code input} is
// one character before the predicate's location.
//
// @return {@code true} if the specified predicate evaluates to
// {@code true}.
// /


LexerATNSimulator.prototype.evaluatePredicate = function (input, ruleIndex, predIndex, speculative) {
  // assume true if no recognizer was provided
  if (this.recog === null) {
    return true;
  }

  if (!speculative) {
    return this.recog.sempred(null, ruleIndex, predIndex);
  }

  var savedcolumn = this.column;
  var savedLine = this.line;
  var index = input.index;
  var marker = input.mark();

  try {
    this.consume(input);
    return this.recog.sempred(null, ruleIndex, predIndex);
  } finally {
    this.column = savedcolumn;
    this.line = savedLine;
    input.seek(index);
    input.release(marker);
  }
};

LexerATNSimulator.prototype.captureSimState = function (settings, input, dfaState) {
  settings.index = input.index;
  settings.line = this.line;
  settings.column = this.column;
  settings.dfaState = dfaState;
};

LexerATNSimulator.prototype.addDFAEdge = function (from_, tk, to, cfgs) {
  if (to === undefined) {
    to = null;
  }

  if (cfgs === undefined) {
    cfgs = null;
  }

  if (to === null && cfgs !== null) {
    // leading to this call, ATNConfigSet.hasSemanticContext is used as a
    // marker indicating dynamic predicate evaluation makes this edge
    // dependent on the specific input sequence, so the static edge in the
    // DFA should be omitted. The target DFAState is still created since
    // execATN has the ability to resynchronize with the DFA state cache
    // following the predicate evaluation step.
    //
    // TJP notes: next time through the DFA, we see a pred again and eval.
    // If that gets us to a previously created (but dangling) DFA
    // state, we can continue in pure DFA mode from there.
    // /
    var suppressEdge = cfgs.hasSemanticContext;
    cfgs.hasSemanticContext = false;
    to = this.addDFAState(cfgs);

    if (suppressEdge) {
      return to;
    }
  } // add the edge


  if (tk < LexerATNSimulator.MIN_DFA_EDGE || tk > LexerATNSimulator.MAX_DFA_EDGE) {
    // Only track edges within the DFA bounds
    return to;
  }

  if (LexerATNSimulator.debug) {
    console.log("EDGE " + from_ + " -> " + to + " upon " + tk);
  }

  if (from_.edges === null) {
    // make room for tokens 1..n and -1 masquerading as index 0
    from_.edges = [];
  }

  from_.edges[tk - LexerATNSimulator.MIN_DFA_EDGE] = to; // connect

  return to;
}; // Add a new DFA state if there isn't one with this set of
// configurations already. This method also detects the first
// configuration containing an ATN rule stop state. Later, when
// traversing the DFA, we will know which rule to accept.


LexerATNSimulator.prototype.addDFAState = function (configs) {
  var proposed = new DFAState(null, configs);
  var firstConfigWithRuleStopState = null;

  for (var i = 0; i < configs.items.length; i++) {
    var cfg = configs.items[i];

    if (cfg.state instanceof RuleStopState) {
      firstConfigWithRuleStopState = cfg;
      break;
    }
  }

  if (firstConfigWithRuleStopState !== null) {
    proposed.isAcceptState = true;
    proposed.lexerActionExecutor = firstConfigWithRuleStopState.lexerActionExecutor;
    proposed.prediction = this.atn.ruleToTokenType[firstConfigWithRuleStopState.state.ruleIndex];
  }

  var dfa = this.decisionToDFA[this.mode];
  var existing = dfa.states.get(proposed);

  if (existing !== null) {
    return existing;
  }

  var newState = proposed;
  newState.stateNumber = dfa.states.length;
  configs.setReadonly(true);
  newState.configs = configs;
  dfa.states.add(newState);
  return newState;
};

LexerATNSimulator.prototype.getDFA = function (mode) {
  return this.decisionToDFA[mode];
}; // Get the text matched so far for the current token.


LexerATNSimulator.prototype.getText = function (input) {
  // index is first lookahead char, don't include.
  return input.getText(this.startIndex, input.index - 1);
};

LexerATNSimulator.prototype.consume = function (input) {
  var curChar = input.LA(1);

  if (curChar === "\n".charCodeAt(0)) {
    this.line += 1;
    this.column = 0;
  } else {
    this.column += 1;
  }

  input.consume();
};

LexerATNSimulator.prototype.getTokenName = function (tt) {
  if (tt === -1) {
    return "EOF";
  } else {
    return "'" + String.fromCharCode(tt) + "'";
  }
};

exports.LexerATNSimulator = LexerATNSimulator;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
//
// This default implementation of {@link TokenFactory} creates
// {@link CommonToken} objects.
//

var CommonToken = __webpack_require__(3).CommonToken;

function TokenFactory() {
  return this;
}

function CommonTokenFactory(copyText) {
  TokenFactory.call(this); // Indicates whether {@link CommonToken//setText} should be called after
  // constructing tokens to explicitly set the text. This is useful for cases
  // where the input stream might not be able to provide arbitrary substrings
  // of text from the input after the lexer creates a token (e.g. the
  // implementation of {@link CharStream//getText} in
  // {@link UnbufferedCharStream} throws an
  // {@link UnsupportedOperationException}). Explicitly setting the token text
  // allows {@link Token//getText} to be called at any time regardless of the
  // input stream implementation.
  //
  // <p>
  // The default value is {@code false} to avoid the performance and memory
  // overhead of copying text for every token unless explicitly requested.</p>
  //

  this.copyText = copyText === undefined ? false : copyText;
  return this;
}

CommonTokenFactory.prototype = Object.create(TokenFactory.prototype);
CommonTokenFactory.prototype.constructor = CommonTokenFactory; //
// The default {@link CommonTokenFactory} instance.
//
// <p>
// This token factory does not explicitly copy token text when constructing
// tokens.</p>
//

CommonTokenFactory.DEFAULT = new CommonTokenFactory();

CommonTokenFactory.prototype.create = function (source, type, text, channel, start, stop, line, column) {
  var t = new CommonToken(source, type, channel, start, stop);
  t.line = line;
  t.column = column;

  if (text !== null) {
    t.text = text;
  } else if (this.copyText && source[1] !== null) {
    t.text = source[1].getText(start, stop);
  }

  return t;
};

CommonTokenFactory.prototype.createThin = function (type, text) {
  var t = new CommonToken(null, type);
  t.text = text;
  return t;
};

exports.CommonTokenFactory = CommonTokenFactory;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
// Represents an executor for a sequence of lexer actions which traversed during
// the matching operation of a lexer rule (token).
//
// <p>The executor tracks position information for position-dependent lexer actions
// efficiently, ensuring that actions appearing only at the end of the rule do
// not cause bloating of the {@link DFA} created for the lexer.</p>

var hashStuff = __webpack_require__(2).hashStuff;

var LexerIndexedCustomAction = __webpack_require__(41).LexerIndexedCustomAction;

function LexerActionExecutor(lexerActions) {
  this.lexerActions = lexerActions === null ? [] : lexerActions; // Caches the result of {@link //hashCode} since the hash code is an element
  // of the performance-critical {@link LexerATNConfig//hashCode} operation.

  this.cachedHashCode = hashStuff(lexerActions); // "".join([str(la) for la in
  // lexerActions]))

  return this;
} // Creates a {@link LexerActionExecutor} which executes the actions for
// the input {@code lexerActionExecutor} followed by a specified
// {@code lexerAction}.
//
// @param lexerActionExecutor The executor for actions already traversed by
// the lexer while matching a token within a particular
// {@link LexerATNConfig}. If this is {@code null}, the method behaves as
// though it were an empty executor.
// @param lexerAction The lexer action to execute after the actions
// specified in {@code lexerActionExecutor}.
//
// @return A {@link LexerActionExecutor} for executing the combine actions
// of {@code lexerActionExecutor} and {@code lexerAction}.


LexerActionExecutor.append = function (lexerActionExecutor, lexerAction) {
  if (lexerActionExecutor === null) {
    return new LexerActionExecutor([lexerAction]);
  }

  var lexerActions = lexerActionExecutor.lexerActions.concat([lexerAction]);
  return new LexerActionExecutor(lexerActions);
}; // Creates a {@link LexerActionExecutor} which encodes the current offset
// for position-dependent lexer actions.
//
// <p>Normally, when the executor encounters lexer actions where
// {@link LexerAction//isPositionDependent} returns {@code true}, it calls
// {@link IntStream//seek} on the input {@link CharStream} to set the input
// position to the <em>end</em> of the current token. This behavior provides
// for efficient DFA representation of lexer actions which appear at the end
// of a lexer rule, even when the lexer rule matches a variable number of
// characters.</p>
//
// <p>Prior to traversing a match transition in the ATN, the current offset
// from the token start index is assigned to all position-dependent lexer
// actions which have not already been assigned a fixed offset. By storing
// the offsets relative to the token start index, the DFA representation of
// lexer actions which appear in the middle of tokens remains efficient due
// to sharing among tokens of the same length, regardless of their absolute
// position in the input stream.</p>
//
// <p>If the current executor already has offsets assigned to all
// position-dependent lexer actions, the method returns {@code this}.</p>
//
// @param offset The current offset to assign to all position-dependent
// lexer actions which do not already have offsets assigned.
//
// @return A {@link LexerActionExecutor} which stores input stream offsets
// for all position-dependent lexer actions.
// /


LexerActionExecutor.prototype.fixOffsetBeforeMatch = function (offset) {
  var updatedLexerActions = null;

  for (var i = 0; i < this.lexerActions.length; i++) {
    if (this.lexerActions[i].isPositionDependent && !(this.lexerActions[i] instanceof LexerIndexedCustomAction)) {
      if (updatedLexerActions === null) {
        updatedLexerActions = this.lexerActions.concat([]);
      }

      updatedLexerActions[i] = new LexerIndexedCustomAction(offset, this.lexerActions[i]);
    }
  }

  if (updatedLexerActions === null) {
    return this;
  } else {
    return new LexerActionExecutor(updatedLexerActions);
  }
}; // Execute the actions encapsulated by this executor within the context of a
// particular {@link Lexer}.
//
// <p>This method calls {@link IntStream//seek} to set the position of the
// {@code input} {@link CharStream} prior to calling
// {@link LexerAction//execute} on a position-dependent action. Before the
// method returns, the input position will be restored to the same position
// it was in when the method was invoked.</p>
//
// @param lexer The lexer instance.
// @param input The input stream which is the source for the current token.
// When this method is called, the current {@link IntStream//index} for
// {@code input} should be the start of the following token, i.e. 1
// character past the end of the current token.
// @param startIndex The token start index. This value may be passed to
// {@link IntStream//seek} to set the {@code input} position to the beginning
// of the token.
// /


LexerActionExecutor.prototype.execute = function (lexer, input, startIndex) {
  var requiresSeek = false;
  var stopIndex = input.index;

  try {
    for (var i = 0; i < this.lexerActions.length; i++) {
      var lexerAction = this.lexerActions[i];

      if (lexerAction instanceof LexerIndexedCustomAction) {
        var offset = lexerAction.offset;
        input.seek(startIndex + offset);
        lexerAction = lexerAction.action;
        requiresSeek = startIndex + offset !== stopIndex;
      } else if (lexerAction.isPositionDependent) {
        input.seek(stopIndex);
        requiresSeek = false;
      }

      lexerAction.execute(lexer);
    }
  } finally {
    if (requiresSeek) {
      input.seek(stopIndex);
    }
  }
};

LexerActionExecutor.prototype.hashCode = function () {
  return this.cachedHashCode;
};

LexerActionExecutor.prototype.updateHashCode = function (hash) {
  hash.update(this.cachedHashCode);
};

LexerActionExecutor.prototype.equals = function (other) {
  if (this === other) {
    return true;
  } else if (!(other instanceof LexerActionExecutor)) {
    return false;
  } else if (this.cachedHashCode != other.cachedHashCode) {
    return false;
  } else if (this.lexerActions.length != other.lexerActions.length) {
    return false;
  } else {
    var numActions = this.lexerActions.length;

    for (var idx = 0; idx < numActions; ++idx) {
      if (!this.lexerActions[idx].equals(other.lexerActions[idx])) {
        return false;
      }
    }

    return true;
  }
};

exports.LexerActionExecutor = LexerActionExecutor;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
//
// The embodiment of the adaptive LL(*), ALL(*), parsing strategy.
//
// <p>
// The basic complexity of the adaptive strategy makes it harder to understand.
// We begin with ATN simulation to build paths in a DFA. Subsequent prediction
// requests go through the DFA first. If they reach a state without an edge for
// the current symbol, the algorithm fails over to the ATN simulation to
// complete the DFA path for the current input (until it finds a conflict state
// or uniquely predicting state).</p>
//
// <p>
// All of that is done without using the outer context because we want to create
// a DFA that is not dependent upon the rule invocation stack when we do a
// prediction. One DFA works in all contexts. We avoid using context not
// necessarily because it's slower, although it can be, but because of the DFA
// caching problem. The closure routine only considers the rule invocation stack
// created during prediction beginning in the decision rule. For example, if
// prediction occurs without invoking another rule's ATN, there are no context
// stacks in the configurations. When lack of context leads to a conflict, we
// don't know if it's an ambiguity or a weakness in the strong LL(*) parsing
// strategy (versus full LL(*)).</p>
//
// <p>
// When SLL yields a configuration set with conflict, we rewind the input and
// retry the ATN simulation, this time using full outer context without adding
// to the DFA. Configuration context stacks will be the full invocation stacks
// from the start rule. If we get a conflict using full context, then we can
// definitively say we have a true ambiguity for that input sequence. If we
// don't get a conflict, it implies that the decision is sensitive to the outer
// context. (It is not context-sensitive in the sense of context-sensitive
// grammars.)</p>
//
// <p>
// The next time we reach this DFA state with an SLL conflict, through DFA
// simulation, we will again retry the ATN simulation using full context mode.
// This is slow because we can't save the results and have to "interpret" the
// ATN each time we get that input.</p>
//
// <p>
// <strong>CACHING FULL CONTEXT PREDICTIONS</strong></p>
//
// <p>
// We could cache results from full context to predicted alternative easily and
// that saves a lot of time but doesn't work in presence of predicates. The set
// of visible predicates from the ATN start state changes depending on the
// context, because closure can fall off the end of a rule. I tried to cache
// tuples (stack context, semantic context, predicted alt) but it was slower
// than interpreting and much more complicated. Also required a huge amount of
// memory. The goal is not to create the world's fastest parser anyway. I'd like
// to keep this algorithm simple. By launching multiple threads, we can improve
// the speed of parsing across a large number of files.</p>
//
// <p>
// There is no strict ordering between the amount of input used by SLL vs LL,
// which makes it really hard to build a cache for full context. Let's say that
// we have input A B C that leads to an SLL conflict with full context X. That
// implies that using X we might only use A B but we could also use A B C D to
// resolve conflict. Input A B C D could predict alternative 1 in one position
// in the input and A B C E could predict alternative 2 in another position in
// input. The conflicting SLL configurations could still be non-unique in the
// full context prediction, which would lead us to requiring more input than the
// original A B C.	To make a	prediction cache work, we have to track	the exact
// input	used during the previous prediction. That amounts to a cache that maps
// X to a specific DFA for that context.</p>
//
// <p>
// Something should be done for left-recursive expression predictions. They are
// likely LL(1) + pred eval. Easier to do the whole SLL unless error and retry
// with full LL thing Sam does.</p>
//
// <p>
// <strong>AVOIDING FULL CONTEXT PREDICTION</strong></p>
//
// <p>
// We avoid doing full context retry when the outer context is empty, we did not
// dip into the outer context by falling off the end of the decision state rule,
// or when we force SLL mode.</p>
//
// <p>
// As an example of the not dip into outer context case, consider as super
// constructor calls versus function calls. One grammar might look like
// this:</p>
//
// <pre>
// ctorBody
//   : '{' superCall? stat* '}'
//   ;
// </pre>
//
// <p>
// Or, you might see something like</p>
//
// <pre>
// stat
//   : superCall ';'
//   | expression ';'
//   | ...
//   ;
// </pre>
//
// <p>
// In both cases I believe that no closure operations will dip into the outer
// context. In the first case ctorBody in the worst case will stop at the '}'.
// In the 2nd case it should stop at the ';'. Both cases should stay within the
// entry rule and not dip into the outer context.</p>
//
// <p>
// <strong>PREDICATES</strong></p>
//
// <p>
// Predicates are always evaluated if present in either SLL or LL both. SLL and
// LL simulation deals with predicates differently. SLL collects predicates as
// it performs closure operations like ANTLR v3 did. It delays predicate
// evaluation until it reaches and accept state. This allows us to cache the SLL
// ATN simulation whereas, if we had evaluated predicates on-the-fly during
// closure, the DFA state configuration sets would be different and we couldn't
// build up a suitable DFA.</p>
//
// <p>
// When building a DFA accept state during ATN simulation, we evaluate any
// predicates and return the sole semantically valid alternative. If there is
// more than 1 alternative, we report an ambiguity. If there are 0 alternatives,
// we throw an exception. Alternatives without predicates act like they have
// true predicates. The simple way to think about it is to strip away all
// alternatives with false predicates and choose the minimum alternative that
// remains.</p>
//
// <p>
// When we start in the DFA and reach an accept state that's predicated, we test
// those and return the minimum semantically viable alternative. If no
// alternatives are viable, we throw an exception.</p>
//
// <p>
// During full LL ATN simulation, closure always evaluates predicates and
// on-the-fly. This is crucial to reducing the configuration set size during
// closure. It hits a landmine when parsing with the Java grammar, for example,
// without this on-the-fly evaluation.</p>
//
// <p>
// <strong>SHARING DFA</strong></p>
//
// <p>
// All instances of the same parser share the same decision DFAs through a
// static field. Each instance gets its own ATN simulator but they share the
// same {@link //decisionToDFA} field. They also share a
// {@link PredictionContextCache} object that makes sure that all
// {@link PredictionContext} objects are shared among the DFA states. This makes
// a big size difference.</p>
//
// <p>
// <strong>THREAD SAFETY</strong></p>
//
// <p>
// The {@link ParserATNSimulator} locks on the {@link //decisionToDFA} field when
// it adds a new DFA object to that array. {@link //addDFAEdge}
// locks on the DFA for the current decision when setting the
// {@link DFAState//edges} field. {@link //addDFAState} locks on
// the DFA for the current decision when looking up a DFA state to see if it
// already exists. We must make sure that all requests to add DFA states that
// are equivalent result in the same shared DFA object. This is because lots of
// threads will be trying to update the DFA at once. The
// {@link //addDFAState} method also locks inside the DFA lock
// but this time on the shared context cache when it rebuilds the
// configurations' {@link PredictionContext} objects using cached
// subgraphs/nodes. No other locking occurs, even during DFA simulation. This is
// safe as long as we can guarantee that all threads referencing
// {@code s.edge[t]} get the same physical target {@link DFAState}, or
// {@code null}. Once into the DFA, the DFA simulation does not reference the
// {@link DFA//states} map. It follows the {@link DFAState//edges} field to new
// targets. The DFA simulator will either find {@link DFAState//edges} to be
// {@code null}, to be non-{@code null} and {@code dfa.edges[t]} null, or
// {@code dfa.edges[t]} to be non-null. The
// {@link //addDFAEdge} method could be racing to set the field
// but in either case the DFA simulator works; if {@code null}, and requests ATN
// simulation. It could also race trying to get {@code dfa.edges[t]}, but either
// way it will work because it's not doing a test and set operation.</p>
//
// <p>
// <strong>Starting with SLL then failing to combined SLL/LL (Two-Stage
// Parsing)</strong></p>
//
// <p>
// Sam pointed out that if SLL does not give a syntax error, then there is no
// point in doing full LL, which is slower. We only have to try LL if we get a
// syntax error. For maximum speed, Sam starts the parser set to pure SLL
// mode with the {@link BailErrorStrategy}:</p>
//
// <pre>
// parser.{@link Parser//getInterpreter() getInterpreter()}.{@link //setPredictionMode setPredictionMode}{@code (}{@link PredictionMode//SLL}{@code )};
// parser.{@link Parser//setErrorHandler setErrorHandler}(new {@link BailErrorStrategy}());
// </pre>
//
// <p>
// If it does not get a syntax error, then we're done. If it does get a syntax
// error, we need to retry with the combined SLL/LL strategy.</p>
//
// <p>
// The reason this works is as follows. If there are no SLL conflicts, then the
// grammar is SLL (at least for that input set). If there is an SLL conflict,
// the full LL analysis must yield a set of viable alternatives which is a
// subset of the alternatives reported by SLL. If the LL set is a singleton,
// then the grammar is LL but not SLL. If the LL set is the same size as the SLL
// set, the decision is SLL. If the LL set has size &gt; 1, then that decision
// is truly ambiguous on the current input. If the LL set is smaller, then the
// SLL conflict resolution might choose an alternative that the full LL would
// rule out as a possibility based upon better context information. If that's
// the case, then the SLL parse will definitely get an error because the full LL
// analysis says it's not viable. If SLL conflict resolution chooses an
// alternative within the LL set, them both SLL and LL would choose the same
// alternative because they both choose the minimum of multiple conflicting
// alternatives.</p>
//
// <p>
// Let's say we have a set of SLL conflicting alternatives {@code {1, 2, 3}} and
// a smaller LL set called <em>s</em>. If <em>s</em> is {@code {2, 3}}, then SLL
// parsing will get an error because SLL will pursue alternative 1. If
// <em>s</em> is {@code {1, 2}} or {@code {1, 3}} then both SLL and LL will
// choose the same alternative because alternative one is the minimum of either
// set. If <em>s</em> is {@code {2}} or {@code {3}} then SLL will get a syntax
// error. If <em>s</em> is {@code {1}} then SLL will succeed.</p>
//
// <p>
// Of course, if the input is invalid, then we will get an error for sure in
// both SLL and LL parsing. Erroneous input will therefore require 2 passes over
// the input.</p>
//

var Utils = __webpack_require__(2);

var Set = Utils.Set;
var BitSet = Utils.BitSet;
var DoubleDict = Utils.DoubleDict;

var ATN = __webpack_require__(9).ATN;

var ATNState = __webpack_require__(5).ATNState;

var ATNConfig = __webpack_require__(19).ATNConfig;

var ATNConfigSet = __webpack_require__(12).ATNConfigSet;

var Token = __webpack_require__(3).Token;

var DFAState = __webpack_require__(15).DFAState;

var PredPrediction = __webpack_require__(15).PredPrediction;

var ATNSimulator = __webpack_require__(43).ATNSimulator;

var PredictionMode = __webpack_require__(44).PredictionMode;

var RuleContext = __webpack_require__(20).RuleContext;

var ParserRuleContext = __webpack_require__(28).ParserRuleContext;

var SemanticContext = __webpack_require__(14).SemanticContext;

var StarLoopEntryState = __webpack_require__(5).StarLoopEntryState;

var RuleStopState = __webpack_require__(5).RuleStopState;

var PredictionContext = __webpack_require__(8).PredictionContext;

var Interval = __webpack_require__(4).Interval;

var Transitions = __webpack_require__(10);

var Transition = Transitions.Transition;
var SetTransition = Transitions.SetTransition;
var NotSetTransition = Transitions.NotSetTransition;
var RuleTransition = Transitions.RuleTransition;
var ActionTransition = Transitions.ActionTransition;

var NoViableAltException = __webpack_require__(7).NoViableAltException;

var SingletonPredictionContext = __webpack_require__(8).SingletonPredictionContext;

var predictionContextFromRuleContext = __webpack_require__(8).predictionContextFromRuleContext;

function ParserATNSimulator(parser, atn, decisionToDFA, sharedContextCache) {
  ATNSimulator.call(this, atn, sharedContextCache);
  this.parser = parser;
  this.decisionToDFA = decisionToDFA; // SLL, LL, or LL + exact ambig detection?//

  this.predictionMode = PredictionMode.LL; // LAME globals to avoid parameters!!!!! I need these down deep in predTransition

  this._input = null;
  this._startIndex = 0;
  this._outerContext = null;
  this._dfa = null; // Each prediction operation uses a cache for merge of prediction contexts.
  //  Don't keep around as it wastes huge amounts of memory. DoubleKeyMap
  //  isn't synchronized but we're ok since two threads shouldn't reuse same
  //  parser/atnsim object because it can only handle one input at a time.
  //  This maps graphs a and b to merged result c. (a,b)&rarr;c. We can avoid
  //  the merge if we ever see a and b again.  Note that (b,a)&rarr;c should
  //  also be examined during cache lookup.
  //

  this.mergeCache = null;
  return this;
}

ParserATNSimulator.prototype = Object.create(ATNSimulator.prototype);
ParserATNSimulator.prototype.constructor = ParserATNSimulator;
ParserATNSimulator.prototype.debug = false;
ParserATNSimulator.prototype.debug_closure = false;
ParserATNSimulator.prototype.debug_add = false;
ParserATNSimulator.prototype.debug_list_atn_decisions = false;
ParserATNSimulator.prototype.dfa_debug = false;
ParserATNSimulator.prototype.retry_debug = false;

ParserATNSimulator.prototype.reset = function () {};

ParserATNSimulator.prototype.adaptivePredict = function (input, decision, outerContext) {
  if (this.debug || this.debug_list_atn_decisions) {
    console.log("adaptivePredict decision " + decision + " exec LA(1)==" + this.getLookaheadName(input) + " line " + input.LT(1).line + ":" + input.LT(1).column);
  }

  this._input = input;
  this._startIndex = input.index;
  this._outerContext = outerContext;
  var dfa = this.decisionToDFA[decision];
  this._dfa = dfa;
  var m = input.mark();
  var index = input.index; // Now we are certain to have a specific decision's DFA
  // But, do we still need an initial state?

  try {
    var s0;

    if (dfa.precedenceDfa) {
      // the start state for a precedence DFA depends on the current
      // parser precedence, and is provided by a DFA method.
      s0 = dfa.getPrecedenceStartState(this.parser.getPrecedence());
    } else {
      // the start state for a "regular" DFA is just s0
      s0 = dfa.s0;
    }

    if (s0 === null) {
      if (outerContext === null) {
        outerContext = RuleContext.EMPTY;
      }

      if (this.debug || this.debug_list_atn_decisions) {
        console.log("predictATN decision " + dfa.decision + " exec LA(1)==" + this.getLookaheadName(input) + ", outerContext=" + outerContext.toString(this.parser.ruleNames));
      }

      var fullCtx = false;
      var s0_closure = this.computeStartState(dfa.atnStartState, RuleContext.EMPTY, fullCtx);

      if (dfa.precedenceDfa) {
        // If this is a precedence DFA, we use applyPrecedenceFilter
        // to convert the computed start state to a precedence start
        // state. We then use DFA.setPrecedenceStartState to set the
        // appropriate start state for the precedence level rather
        // than simply setting DFA.s0.
        //
        dfa.s0.configs = s0_closure; // not used for prediction but useful to know start configs anyway

        s0_closure = this.applyPrecedenceFilter(s0_closure);
        s0 = this.addDFAState(dfa, new DFAState(null, s0_closure));
        dfa.setPrecedenceStartState(this.parser.getPrecedence(), s0);
      } else {
        s0 = this.addDFAState(dfa, new DFAState(null, s0_closure));
        dfa.s0 = s0;
      }
    }

    var alt = this.execATN(dfa, s0, input, index, outerContext);

    if (this.debug) {
      console.log("DFA after predictATN: " + dfa.toString(this.parser.literalNames));
    }

    return alt;
  } finally {
    this._dfa = null;
    this.mergeCache = null; // wack cache after each prediction

    input.seek(index);
    input.release(m);
  }
}; // Performs ATN simulation to compute a predicted alternative based
//  upon the remaining input, but also updates the DFA cache to avoid
//  having to traverse the ATN again for the same input sequence.
// There are some key conditions we're looking for after computing a new
// set of ATN configs (proposed DFA state):
// if the set is empty, there is no viable alternative for current symbol
// does the state uniquely predict an alternative?
// does the state have a conflict that would prevent us from
//   putting it on the work list?
// We also have some key operations to do:
// add an edge from previous DFA state to potentially new DFA state, D,
//   upon current symbol but only if adding to work list, which means in all
//   cases except no viable alternative (and possibly non-greedy decisions?)
// collecting predicates and adding semantic context to DFA accept states
// adding rule context to context-sensitive DFA accept states
// consuming an input symbol
// reporting a conflict
// reporting an ambiguity
// reporting a context sensitivity
// reporting insufficient predicates
// cover these cases:
//    dead end
//    single alt
//    single alt + preds
//    conflict
//    conflict + preds
//


ParserATNSimulator.prototype.execATN = function (dfa, s0, input, startIndex, outerContext) {
  if (this.debug || this.debug_list_atn_decisions) {
    console.log("execATN decision " + dfa.decision + " exec LA(1)==" + this.getLookaheadName(input) + " line " + input.LT(1).line + ":" + input.LT(1).column);
  }

  var alt;
  var previousD = s0;

  if (this.debug) {
    console.log("s0 = " + s0);
  }

  var t = input.LA(1);

  while (true) {
    // while more work
    var D = this.getExistingTargetState(previousD, t);

    if (D === null) {
      D = this.computeTargetState(dfa, previousD, t);
    }

    if (D === ATNSimulator.ERROR) {
      // if any configs in previous dipped into outer context, that
      // means that input up to t actually finished entry rule
      // at least for SLL decision. Full LL doesn't dip into outer
      // so don't need special case.
      // We will get an error no matter what so delay until after
      // decision; better error message. Also, no reachable target
      // ATN states in SLL implies LL will also get nowhere.
      // If conflict in states that dip out, choose min since we
      // will get error no matter what.
      var e = this.noViableAlt(input, outerContext, previousD.configs, startIndex);
      input.seek(startIndex);
      alt = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(previousD.configs, outerContext);

      if (alt !== ATN.INVALID_ALT_NUMBER) {
        return alt;
      } else {
        throw e;
      }
    }

    if (D.requiresFullContext && this.predictionMode !== PredictionMode.SLL) {
      // IF PREDS, MIGHT RESOLVE TO SINGLE ALT => SLL (or syntax error)
      var conflictingAlts = null;

      if (D.predicates !== null) {
        if (this.debug) {
          console.log("DFA state has preds in DFA sim LL failover");
        }

        var conflictIndex = input.index;

        if (conflictIndex !== startIndex) {
          input.seek(startIndex);
        }

        conflictingAlts = this.evalSemanticContext(D.predicates, outerContext, true);

        if (conflictingAlts.length === 1) {
          if (this.debug) {
            console.log("Full LL avoided");
          }

          return conflictingAlts.minValue();
        }

        if (conflictIndex !== startIndex) {
          // restore the index so reporting the fallback to full
          // context occurs with the index at the correct spot
          input.seek(conflictIndex);
        }
      }

      if (this.dfa_debug) {
        console.log("ctx sensitive state " + outerContext + " in " + D);
      }

      var fullCtx = true;
      var s0_closure = this.computeStartState(dfa.atnStartState, outerContext, fullCtx);
      this.reportAttemptingFullContext(dfa, conflictingAlts, D.configs, startIndex, input.index);
      alt = this.execATNWithFullContext(dfa, D, s0_closure, input, startIndex, outerContext);
      return alt;
    }

    if (D.isAcceptState) {
      if (D.predicates === null) {
        return D.prediction;
      }

      var stopIndex = input.index;
      input.seek(startIndex);
      var alts = this.evalSemanticContext(D.predicates, outerContext, true);

      if (alts.length === 0) {
        throw this.noViableAlt(input, outerContext, D.configs, startIndex);
      } else if (alts.length === 1) {
        return alts.minValue();
      } else {
        // report ambiguity after predicate evaluation to make sure the correct set of ambig alts is reported.
        this.reportAmbiguity(dfa, D, startIndex, stopIndex, false, alts, D.configs);
        return alts.minValue();
      }
    }

    previousD = D;

    if (t !== Token.EOF) {
      input.consume();
      t = input.LA(1);
    }
  }
}; //
// Get an existing target state for an edge in the DFA. If the target state
// for the edge has not yet been computed or is otherwise not available,
// this method returns {@code null}.
//
// @param previousD The current DFA state
// @param t The next input symbol
// @return The existing target DFA state for the given input symbol
// {@code t}, or {@code null} if the target state for this edge is not
// already cached
//


ParserATNSimulator.prototype.getExistingTargetState = function (previousD, t) {
  var edges = previousD.edges;

  if (edges === null) {
    return null;
  } else {
    return edges[t + 1] || null;
  }
}; //
// Compute a target state for an edge in the DFA, and attempt to add the
// computed state and corresponding edge to the DFA.
//
// @param dfa The DFA
// @param previousD The current DFA state
// @param t The next input symbol
//
// @return The computed target DFA state for the given input symbol
// {@code t}. If {@code t} does not lead to a valid DFA state, this method
// returns {@link //ERROR}.
//


ParserATNSimulator.prototype.computeTargetState = function (dfa, previousD, t) {
  var reach = this.computeReachSet(previousD.configs, t, false);

  if (reach === null) {
    this.addDFAEdge(dfa, previousD, t, ATNSimulator.ERROR);
    return ATNSimulator.ERROR;
  } // create new target state; we'll add to DFA after it's complete


  var D = new DFAState(null, reach);
  var predictedAlt = this.getUniqueAlt(reach);

  if (this.debug) {
    var altSubSets = PredictionMode.getConflictingAltSubsets(reach);
    console.log("SLL altSubSets=" + Utils.arrayToString(altSubSets) + ", previous=" + previousD.configs + ", configs=" + reach + ", predict=" + predictedAlt + ", allSubsetsConflict=" + PredictionMode.allSubsetsConflict(altSubSets) + ", conflictingAlts=" + this.getConflictingAlts(reach));
  }

  if (predictedAlt !== ATN.INVALID_ALT_NUMBER) {
    // NO CONFLICT, UNIQUELY PREDICTED ALT
    D.isAcceptState = true;
    D.configs.uniqueAlt = predictedAlt;
    D.prediction = predictedAlt;
  } else if (PredictionMode.hasSLLConflictTerminatingPrediction(this.predictionMode, reach)) {
    // MORE THAN ONE VIABLE ALTERNATIVE
    D.configs.conflictingAlts = this.getConflictingAlts(reach);
    D.requiresFullContext = true; // in SLL-only mode, we will stop at this state and return the minimum alt

    D.isAcceptState = true;
    D.prediction = D.configs.conflictingAlts.minValue();
  }

  if (D.isAcceptState && D.configs.hasSemanticContext) {
    this.predicateDFAState(D, this.atn.getDecisionState(dfa.decision));

    if (D.predicates !== null) {
      D.prediction = ATN.INVALID_ALT_NUMBER;
    }
  } // all adds to dfa are done after we've created full D state


  D = this.addDFAEdge(dfa, previousD, t, D);
  return D;
};

ParserATNSimulator.prototype.predicateDFAState = function (dfaState, decisionState) {
  // We need to test all predicates, even in DFA states that
  // uniquely predict alternative.
  var nalts = decisionState.transitions.length; // Update DFA so reach becomes accept state with (predicate,alt)
  // pairs if preds found for conflicting alts

  var altsToCollectPredsFrom = this.getConflictingAltsOrUniqueAlt(dfaState.configs);
  var altToPred = this.getPredsForAmbigAlts(altsToCollectPredsFrom, dfaState.configs, nalts);

  if (altToPred !== null) {
    dfaState.predicates = this.getPredicatePredictions(altsToCollectPredsFrom, altToPred);
    dfaState.prediction = ATN.INVALID_ALT_NUMBER; // make sure we use preds
  } else {
    // There are preds in configs but they might go away
    // when OR'd together like {p}? || NONE == NONE. If neither
    // alt has preds, resolve to min alt
    dfaState.prediction = altsToCollectPredsFrom.minValue();
  }
}; // comes back with reach.uniqueAlt set to a valid alt


ParserATNSimulator.prototype.execATNWithFullContext = function (dfa, D, // how far we got before failing over
s0, input, startIndex, outerContext) {
  if (this.debug || this.debug_list_atn_decisions) {
    console.log("execATNWithFullContext " + s0);
  }

  var fullCtx = true;
  var foundExactAmbig = false;
  var reach = null;
  var previous = s0;
  input.seek(startIndex);
  var t = input.LA(1);
  var predictedAlt = -1;

  while (true) {
    // while more work
    reach = this.computeReachSet(previous, t, fullCtx);

    if (reach === null) {
      // if any configs in previous dipped into outer context, that
      // means that input up to t actually finished entry rule
      // at least for LL decision. Full LL doesn't dip into outer
      // so don't need special case.
      // We will get an error no matter what so delay until after
      // decision; better error message. Also, no reachable target
      // ATN states in SLL implies LL will also get nowhere.
      // If conflict in states that dip out, choose min since we
      // will get error no matter what.
      var e = this.noViableAlt(input, outerContext, previous, startIndex);
      input.seek(startIndex);
      var alt = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(previous, outerContext);

      if (alt !== ATN.INVALID_ALT_NUMBER) {
        return alt;
      } else {
        throw e;
      }
    }

    var altSubSets = PredictionMode.getConflictingAltSubsets(reach);

    if (this.debug) {
      console.log("LL altSubSets=" + altSubSets + ", predict=" + PredictionMode.getUniqueAlt(altSubSets) + ", resolvesToJustOneViableAlt=" + PredictionMode.resolvesToJustOneViableAlt(altSubSets));
    }

    reach.uniqueAlt = this.getUniqueAlt(reach); // unique prediction?

    if (reach.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
      predictedAlt = reach.uniqueAlt;
      break;
    } else if (this.predictionMode !== PredictionMode.LL_EXACT_AMBIG_DETECTION) {
      predictedAlt = PredictionMode.resolvesToJustOneViableAlt(altSubSets);

      if (predictedAlt !== ATN.INVALID_ALT_NUMBER) {
        break;
      }
    } else {
      // In exact ambiguity mode, we never try to terminate early.
      // Just keeps scarfing until we know what the conflict is
      if (PredictionMode.allSubsetsConflict(altSubSets) && PredictionMode.allSubsetsEqual(altSubSets)) {
        foundExactAmbig = true;
        predictedAlt = PredictionMode.getSingleViableAlt(altSubSets);
        break;
      } // else there are multiple non-conflicting subsets or
      // we're not sure what the ambiguity is yet.
      // So, keep going.

    }

    previous = reach;

    if (t !== Token.EOF) {
      input.consume();
      t = input.LA(1);
    }
  } // If the configuration set uniquely predicts an alternative,
  // without conflict, then we know that it's a full LL decision
  // not SLL.


  if (reach.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
    this.reportContextSensitivity(dfa, predictedAlt, reach, startIndex, input.index);
    return predictedAlt;
  } // We do not check predicates here because we have checked them
  // on-the-fly when doing full context prediction.
  //
  // In non-exact ambiguity detection mode, we might	actually be able to
  // detect an exact ambiguity, but I'm not going to spend the cycles
  // needed to check. We only emit ambiguity warnings in exact ambiguity
  // mode.
  //
  // For example, we might know that we have conflicting configurations.
  // But, that does not mean that there is no way forward without a
  // conflict. It's possible to have nonconflicting alt subsets as in:
  // altSubSets=[{1, 2}, {1, 2}, {1}, {1, 2}]
  // from
  //
  //    [(17,1,[5 $]), (13,1,[5 10 $]), (21,1,[5 10 $]), (11,1,[$]),
  //     (13,2,[5 10 $]), (21,2,[5 10 $]), (11,2,[$])]
  //
  // In this case, (17,1,[5 $]) indicates there is some next sequence that
  // would resolve this without conflict to alternative 1. Any other viable
  // next sequence, however, is associated with a conflict.  We stop
  // looking for input because no amount of further lookahead will alter
  // the fact that we should predict alternative 1.  We just can't say for
  // sure that there is an ambiguity without looking further.


  this.reportAmbiguity(dfa, D, startIndex, input.index, foundExactAmbig, null, reach);
  return predictedAlt;
};

ParserATNSimulator.prototype.computeReachSet = function (closure, t, fullCtx) {
  if (this.debug) {
    console.log("in computeReachSet, starting closure: " + closure);
  }

  if (this.mergeCache === null) {
    this.mergeCache = new DoubleDict();
  }

  var intermediate = new ATNConfigSet(fullCtx); // Configurations already in a rule stop state indicate reaching the end
  // of the decision rule (local context) or end of the start rule (full
  // context). Once reached, these configurations are never updated by a
  // closure operation, so they are handled separately for the performance
  // advantage of having a smaller intermediate set when calling closure.
  //
  // For full-context reach operations, separate handling is required to
  // ensure that the alternative matching the longest overall sequence is
  // chosen when multiple such configurations can match the input.

  var skippedStopStates = null; // First figure out where we can reach on input t

  for (var i = 0; i < closure.items.length; i++) {
    var c = closure.items[i];

    if (this.debug_add) {
      console.log("testing " + this.getTokenName(t) + " at " + c);
    }

    if (c.state instanceof RuleStopState) {
      if (fullCtx || t === Token.EOF) {
        if (skippedStopStates === null) {
          skippedStopStates = [];
        }

        skippedStopStates.push(c);

        if (this.debug_add) {
          console.log("added " + c + " to skippedStopStates");
        }
      }

      continue;
    }

    for (var j = 0; j < c.state.transitions.length; j++) {
      var trans = c.state.transitions[j];
      var target = this.getReachableTarget(trans, t);

      if (target !== null) {
        var cfg = new ATNConfig({
          state: target
        }, c);
        intermediate.add(cfg, this.mergeCache);

        if (this.debug_add) {
          console.log("added " + cfg + " to intermediate");
        }
      }
    }
  } // Now figure out where the reach operation can take us...


  var reach = null; // This block optimizes the reach operation for intermediate sets which
  // trivially indicate a termination state for the overall
  // adaptivePredict operation.
  //
  // The conditions assume that intermediate
  // contains all configurations relevant to the reach set, but this
  // condition is not true when one or more configurations have been
  // withheld in skippedStopStates, or when the current symbol is EOF.
  //

  if (skippedStopStates === null && t !== Token.EOF) {
    if (intermediate.items.length === 1) {
      // Don't pursue the closure if there is just one state.
      // It can only have one alternative; just add to result
      // Also don't pursue the closure if there is unique alternative
      // among the configurations.
      reach = intermediate;
    } else if (this.getUniqueAlt(intermediate) !== ATN.INVALID_ALT_NUMBER) {
      // Also don't pursue the closure if there is unique alternative
      // among the configurations.
      reach = intermediate;
    }
  } // If the reach set could not be trivially determined, perform a closure
  // operation on the intermediate set to compute its initial value.
  //


  if (reach === null) {
    reach = new ATNConfigSet(fullCtx);
    var closureBusy = new Set();
    var treatEofAsEpsilon = t === Token.EOF;

    for (var k = 0; k < intermediate.items.length; k++) {
      this.closure(intermediate.items[k], reach, closureBusy, false, fullCtx, treatEofAsEpsilon);
    }
  }

  if (t === Token.EOF) {
    // After consuming EOF no additional input is possible, so we are
    // only interested in configurations which reached the end of the
    // decision rule (local context) or end of the start rule (full
    // context). Update reach to contain only these configurations. This
    // handles both explicit EOF transitions in the grammar and implicit
    // EOF transitions following the end of the decision or start rule.
    //
    // When reach==intermediate, no closure operation was performed. In
    // this case, removeAllConfigsNotInRuleStopState needs to check for
    // reachable rule stop states as well as configurations already in
    // a rule stop state.
    //
    // This is handled before the configurations in skippedStopStates,
    // because any configurations potentially added from that list are
    // already guaranteed to meet this condition whether or not it's
    // required.
    //
    reach = this.removeAllConfigsNotInRuleStopState(reach, reach === intermediate);
  } // If skippedStopStates!==null, then it contains at least one
  // configuration. For full-context reach operations, these
  // configurations reached the end of the start rule, in which case we
  // only add them back to reach if no configuration during the current
  // closure operation reached such a state. This ensures adaptivePredict
  // chooses an alternative matching the longest overall sequence when
  // multiple alternatives are viable.
  //


  if (skippedStopStates !== null && (!fullCtx || !PredictionMode.hasConfigInRuleStopState(reach))) {
    for (var l = 0; l < skippedStopStates.length; l++) {
      reach.add(skippedStopStates[l], this.mergeCache);
    }
  }

  if (reach.items.length === 0) {
    return null;
  } else {
    return reach;
  }
}; //
// Return a configuration set containing only the configurations from
// {@code configs} which are in a {@link RuleStopState}. If all
// configurations in {@code configs} are already in a rule stop state, this
// method simply returns {@code configs}.
//
// <p>When {@code lookToEndOfRule} is true, this method uses
// {@link ATN//nextTokens} for each configuration in {@code configs} which is
// not already in a rule stop state to see if a rule stop state is reachable
// from the configuration via epsilon-only transitions.</p>
//
// @param configs the configuration set to update
// @param lookToEndOfRule when true, this method checks for rule stop states
// reachable by epsilon-only transitions from each configuration in
// {@code configs}.
//
// @return {@code configs} if all configurations in {@code configs} are in a
// rule stop state, otherwise return a new configuration set containing only
// the configurations from {@code configs} which are in a rule stop state
//


ParserATNSimulator.prototype.removeAllConfigsNotInRuleStopState = function (configs, lookToEndOfRule) {
  if (PredictionMode.allConfigsInRuleStopStates(configs)) {
    return configs;
  }

  var result = new ATNConfigSet(configs.fullCtx);

  for (var i = 0; i < configs.items.length; i++) {
    var config = configs.items[i];

    if (config.state instanceof RuleStopState) {
      result.add(config, this.mergeCache);
      continue;
    }

    if (lookToEndOfRule && config.state.epsilonOnlyTransitions) {
      var nextTokens = this.atn.nextTokens(config.state);

      if (nextTokens.contains(Token.EPSILON)) {
        var endOfRuleState = this.atn.ruleToStopState[config.state.ruleIndex];
        result.add(new ATNConfig({
          state: endOfRuleState
        }, config), this.mergeCache);
      }
    }
  }

  return result;
};

ParserATNSimulator.prototype.computeStartState = function (p, ctx, fullCtx) {
  // always at least the implicit call to start rule
  var initialContext = predictionContextFromRuleContext(this.atn, ctx);
  var configs = new ATNConfigSet(fullCtx);

  for (var i = 0; i < p.transitions.length; i++) {
    var target = p.transitions[i].target;
    var c = new ATNConfig({
      state: target,
      alt: i + 1,
      context: initialContext
    }, null);
    var closureBusy = new Set();
    this.closure(c, configs, closureBusy, true, fullCtx, false);
  }

  return configs;
}; //
// This method transforms the start state computed by
// {@link //computeStartState} to the special start state used by a
// precedence DFA for a particular precedence value. The transformation
// process applies the following changes to the start state's configuration
// set.
//
// <ol>
// <li>Evaluate the precedence predicates for each configuration using
// {@link SemanticContext//evalPrecedence}.</li>
// <li>Remove all configurations which predict an alternative greater than
// 1, for which another configuration that predicts alternative 1 is in the
// same ATN state with the same prediction context. This transformation is
// valid for the following reasons:
// <ul>
// <li>The closure block cannot contain any epsilon transitions which bypass
// the body of the closure, so all states reachable via alternative 1 are
// part of the precedence alternatives of the transformed left-recursive
// rule.</li>
// <li>The "primary" portion of a left recursive rule cannot contain an
// epsilon transition, so the only way an alternative other than 1 can exist
// in a state that is also reachable via alternative 1 is by nesting calls
// to the left-recursive rule, with the outer calls not being at the
// preferred precedence level.</li>
// </ul>
// </li>
// </ol>
//
// <p>
// The prediction context must be considered by this filter to address
// situations like the following.
// </p>
// <code>
// <pre>
// grammar TA;
// prog: statement* EOF;
// statement: letterA | statement letterA 'b' ;
// letterA: 'a';
// </pre>
// </code>
// <p>
// If the above grammar, the ATN state immediately before the token
// reference {@code 'a'} in {@code letterA} is reachable from the left edge
// of both the primary and closure blocks of the left-recursive rule
// {@code statement}. The prediction context associated with each of these
// configurations distinguishes between them, and prevents the alternative
// which stepped out to {@code prog} (and then back in to {@code statement}
// from being eliminated by the filter.
// </p>
//
// @param configs The configuration set computed by
// {@link //computeStartState} as the start state for the DFA.
// @return The transformed configuration set representing the start state
// for a precedence DFA at a particular precedence level (determined by
// calling {@link Parser//getPrecedence}).
//


ParserATNSimulator.prototype.applyPrecedenceFilter = function (configs) {
  var config;
  var statesFromAlt1 = [];
  var configSet = new ATNConfigSet(configs.fullCtx);

  for (var i = 0; i < configs.items.length; i++) {
    config = configs.items[i]; // handle alt 1 first

    if (config.alt !== 1) {
      continue;
    }

    var updatedContext = config.semanticContext.evalPrecedence(this.parser, this._outerContext);

    if (updatedContext === null) {
      // the configuration was eliminated
      continue;
    }

    statesFromAlt1[config.state.stateNumber] = config.context;

    if (updatedContext !== config.semanticContext) {
      configSet.add(new ATNConfig({
        semanticContext: updatedContext
      }, config), this.mergeCache);
    } else {
      configSet.add(config, this.mergeCache);
    }
  }

  for (i = 0; i < configs.items.length; i++) {
    config = configs.items[i];

    if (config.alt === 1) {
      // already handled
      continue;
    } // In the future, this elimination step could be updated to also
    // filter the prediction context for alternatives predicting alt>1
    // (basically a graph subtraction algorithm).


    if (!config.precedenceFilterSuppressed) {
      var context = statesFromAlt1[config.state.stateNumber] || null;

      if (context !== null && context.equals(config.context)) {
        // eliminated
        continue;
      }
    }

    configSet.add(config, this.mergeCache);
  }

  return configSet;
};

ParserATNSimulator.prototype.getReachableTarget = function (trans, ttype) {
  if (trans.matches(ttype, 0, this.atn.maxTokenType)) {
    return trans.target;
  } else {
    return null;
  }
};

ParserATNSimulator.prototype.getPredsForAmbigAlts = function (ambigAlts, configs, nalts) {
  // REACH=[1|1|[]|0:0, 1|2|[]|0:1]
  // altToPred starts as an array of all null contexts. The entry at index i
  // corresponds to alternative i. altToPred[i] may have one of three values:
  //   1. null: no ATNConfig c is found such that c.alt==i
  //   2. SemanticContext.NONE: At least one ATNConfig c exists such that
  //      c.alt==i and c.semanticContext==SemanticContext.NONE. In other words,
  //      alt i has at least one unpredicated config.
  //   3. Non-NONE Semantic Context: There exists at least one, and for all
  //      ATNConfig c such that c.alt==i, c.semanticContext!=SemanticContext.NONE.
  //
  // From this, it is clear that NONE||anything==NONE.
  //
  var altToPred = [];

  for (var i = 0; i < configs.items.length; i++) {
    var c = configs.items[i];

    if (ambigAlts.contains(c.alt)) {
      altToPred[c.alt] = SemanticContext.orContext(altToPred[c.alt] || null, c.semanticContext);
    }
  }

  var nPredAlts = 0;

  for (i = 1; i < nalts + 1; i++) {
    var pred = altToPred[i] || null;

    if (pred === null) {
      altToPred[i] = SemanticContext.NONE;
    } else if (pred !== SemanticContext.NONE) {
      nPredAlts += 1;
    }
  } // nonambig alts are null in altToPred


  if (nPredAlts === 0) {
    altToPred = null;
  }

  if (this.debug) {
    console.log("getPredsForAmbigAlts result " + Utils.arrayToString(altToPred));
  }

  return altToPred;
};

ParserATNSimulator.prototype.getPredicatePredictions = function (ambigAlts, altToPred) {
  var pairs = [];
  var containsPredicate = false;

  for (var i = 1; i < altToPred.length; i++) {
    var pred = altToPred[i]; // unpredicated is indicated by SemanticContext.NONE

    if (ambigAlts !== null && ambigAlts.contains(i)) {
      pairs.push(new PredPrediction(pred, i));
    }

    if (pred !== SemanticContext.NONE) {
      containsPredicate = true;
    }
  }

  if (!containsPredicate) {
    return null;
  }

  return pairs;
}; //
// This method is used to improve the localization of error messages by
// choosing an alternative rather than throwing a
// {@link NoViableAltException} in particular prediction scenarios where the
// {@link //ERROR} state was reached during ATN simulation.
//
// <p>
// The default implementation of this method uses the following
// algorithm to identify an ATN configuration which successfully parsed the
// decision entry rule. Choosing such an alternative ensures that the
// {@link ParserRuleContext} returned by the calling rule will be complete
// and valid, and the syntax error will be reported later at a more
// localized location.</p>
//
// <ul>
// <li>If a syntactically valid path or paths reach the end of the decision rule and
// they are semantically valid if predicated, return the min associated alt.</li>
// <li>Else, if a semantically invalid but syntactically valid path exist
// or paths exist, return the minimum associated alt.
// </li>
// <li>Otherwise, return {@link ATN//INVALID_ALT_NUMBER}.</li>
// </ul>
//
// <p>
// In some scenarios, the algorithm described above could predict an
// alternative which will result in a {@link FailedPredicateException} in
// the parser. Specifically, this could occur if the <em>only</em> configuration
// capable of successfully parsing to the end of the decision rule is
// blocked by a semantic predicate. By choosing this alternative within
// {@link //adaptivePredict} instead of throwing a
// {@link NoViableAltException}, the resulting
// {@link FailedPredicateException} in the parser will identify the specific
// predicate which is preventing the parser from successfully parsing the
// decision rule, which helps developers identify and correct logic errors
// in semantic predicates.
// </p>
//
// @param configs The ATN configurations which were valid immediately before
// the {@link //ERROR} state was reached
// @param outerContext The is the \gamma_0 initial parser context from the paper
// or the parser stack at the instant before prediction commences.
//
// @return The value to return from {@link //adaptivePredict}, or
// {@link ATN//INVALID_ALT_NUMBER} if a suitable alternative was not
// identified and {@link //adaptivePredict} should report an error instead.
//


ParserATNSimulator.prototype.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule = function (configs, outerContext) {
  var cfgs = this.splitAccordingToSemanticValidity(configs, outerContext);
  var semValidConfigs = cfgs[0];
  var semInvalidConfigs = cfgs[1];
  var alt = this.getAltThatFinishedDecisionEntryRule(semValidConfigs);

  if (alt !== ATN.INVALID_ALT_NUMBER) {
    // semantically/syntactically viable path exists
    return alt;
  } // Is there a syntactically valid path with a failed pred?


  if (semInvalidConfigs.items.length > 0) {
    alt = this.getAltThatFinishedDecisionEntryRule(semInvalidConfigs);

    if (alt !== ATN.INVALID_ALT_NUMBER) {
      // syntactically viable path exists
      return alt;
    }
  }

  return ATN.INVALID_ALT_NUMBER;
};

ParserATNSimulator.prototype.getAltThatFinishedDecisionEntryRule = function (configs) {
  var alts = [];

  for (var i = 0; i < configs.items.length; i++) {
    var c = configs.items[i];

    if (c.reachesIntoOuterContext > 0 || c.state instanceof RuleStopState && c.context.hasEmptyPath()) {
      if (alts.indexOf(c.alt) < 0) {
        alts.push(c.alt);
      }
    }
  }

  if (alts.length === 0) {
    return ATN.INVALID_ALT_NUMBER;
  } else {
    return Math.min.apply(null, alts);
  }
}; // Walk the list of configurations and split them according to
//  those that have preds evaluating to true/false.  If no pred, assume
//  true pred and include in succeeded set.  Returns Pair of sets.
//
//  Create a new set so as not to alter the incoming parameter.
//
//  Assumption: the input stream has been restored to the starting point
//  prediction, which is where predicates need to evaluate.
//


ParserATNSimulator.prototype.splitAccordingToSemanticValidity = function (configs, outerContext) {
  var succeeded = new ATNConfigSet(configs.fullCtx);
  var failed = new ATNConfigSet(configs.fullCtx);

  for (var i = 0; i < configs.items.length; i++) {
    var c = configs.items[i];

    if (c.semanticContext !== SemanticContext.NONE) {
      var predicateEvaluationResult = c.semanticContext.evaluate(this.parser, outerContext);

      if (predicateEvaluationResult) {
        succeeded.add(c);
      } else {
        failed.add(c);
      }
    } else {
      succeeded.add(c);
    }
  }

  return [succeeded, failed];
}; // Look through a list of predicate/alt pairs, returning alts for the
//  pairs that win. A {@code NONE} predicate indicates an alt containing an
//  unpredicated config which behaves as "always true." If !complete
//  then we stop at the first predicate that evaluates to true. This
//  includes pairs with null predicates.
//


ParserATNSimulator.prototype.evalSemanticContext = function (predPredictions, outerContext, complete) {
  var predictions = new BitSet();

  for (var i = 0; i < predPredictions.length; i++) {
    var pair = predPredictions[i];

    if (pair.pred === SemanticContext.NONE) {
      predictions.add(pair.alt);

      if (!complete) {
        break;
      }

      continue;
    }

    var predicateEvaluationResult = pair.pred.evaluate(this.parser, outerContext);

    if (this.debug || this.dfa_debug) {
      console.log("eval pred " + pair + "=" + predicateEvaluationResult);
    }

    if (predicateEvaluationResult) {
      if (this.debug || this.dfa_debug) {
        console.log("PREDICT " + pair.alt);
      }

      predictions.add(pair.alt);

      if (!complete) {
        break;
      }
    }
  }

  return predictions;
}; // TODO: If we are doing predicates, there is no point in pursuing
//     closure operations if we reach a DFA state that uniquely predicts
//     alternative. We will not be caching that DFA state and it is a
//     waste to pursue the closure. Might have to advance when we do
//     ambig detection thought :(
//


ParserATNSimulator.prototype.closure = function (config, configs, closureBusy, collectPredicates, fullCtx, treatEofAsEpsilon) {
  var initialDepth = 0;
  this.closureCheckingStopState(config, configs, closureBusy, collectPredicates, fullCtx, initialDepth, treatEofAsEpsilon);
};

ParserATNSimulator.prototype.closureCheckingStopState = function (config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon) {
  if (this.debug || this.debug_closure) {
    console.log("closure(" + config.toString(this.parser, true) + ")"); // console.log("configs(" + configs.toString() + ")");

    if (config.reachesIntoOuterContext > 50) {
      throw "problem";
    }
  }

  if (config.state instanceof RuleStopState) {
    // We hit rule end. If we have context info, use it
    // run thru all possible stack tops in ctx
    if (!config.context.isEmpty()) {
      for (var i = 0; i < config.context.length; i++) {
        if (config.context.getReturnState(i) === PredictionContext.EMPTY_RETURN_STATE) {
          if (fullCtx) {
            configs.add(new ATNConfig({
              state: config.state,
              context: PredictionContext.EMPTY
            }, config), this.mergeCache);
            continue;
          } else {
            // we have no context info, just chase follow links (if greedy)
            if (this.debug) {
              console.log("FALLING off rule " + this.getRuleName(config.state.ruleIndex));
            }

            this.closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon);
          }

          continue;
        }

        var returnState = this.atn.states[config.context.getReturnState(i)];
        var newContext = config.context.getParent(i); // "pop" return state

        var parms = {
          state: returnState,
          alt: config.alt,
          context: newContext,
          semanticContext: config.semanticContext
        };
        var c = new ATNConfig(parms, null); // While we have context to pop back from, we may have
        // gotten that context AFTER having falling off a rule.
        // Make sure we track that we are now out of context.

        c.reachesIntoOuterContext = config.reachesIntoOuterContext;
        this.closureCheckingStopState(c, configs, closureBusy, collectPredicates, fullCtx, depth - 1, treatEofAsEpsilon);
      }

      return;
    } else if (fullCtx) {
      // reached end of start rule
      configs.add(config, this.mergeCache);
      return;
    } else {
      // else if we have no context info, just chase follow links (if greedy)
      if (this.debug) {
        console.log("FALLING off rule " + this.getRuleName(config.state.ruleIndex));
      }
    }
  }

  this.closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon);
}; // Do the actual work of walking epsilon edges//


ParserATNSimulator.prototype.closure_ = function (config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon) {
  var p = config.state; // optimization

  if (!p.epsilonOnlyTransitions) {
    configs.add(config, this.mergeCache); // make sure to not return here, because EOF transitions can act as
    // both epsilon transitions and non-epsilon transitions.
  }

  for (var i = 0; i < p.transitions.length; i++) {
    if (i == 0 && this.canDropLoopEntryEdgeInLeftRecursiveRule(config)) continue;
    var t = p.transitions[i];
    var continueCollecting = collectPredicates && !(t instanceof ActionTransition);
    var c = this.getEpsilonTarget(config, t, continueCollecting, depth === 0, fullCtx, treatEofAsEpsilon);

    if (c !== null) {
      if (!t.isEpsilon && closureBusy.add(c) !== c) {
        // avoid infinite recursion for EOF* and EOF+
        continue;
      }

      var newDepth = depth;

      if (config.state instanceof RuleStopState) {
        // target fell off end of rule; mark resulting c as having dipped into outer context
        // We can't get here if incoming config was rule stop and we had context
        // track how far we dip into outer context.  Might
        // come in handy and we avoid evaluating context dependent
        // preds if this is > 0.
        if (closureBusy.add(c) !== c) {
          // avoid infinite recursion for right-recursive rules
          continue;
        }

        if (this._dfa !== null && this._dfa.precedenceDfa) {
          if (t.outermostPrecedenceReturn === this._dfa.atnStartState.ruleIndex) {
            c.precedenceFilterSuppressed = true;
          }
        }

        c.reachesIntoOuterContext += 1;
        configs.dipsIntoOuterContext = true; // TODO: can remove? only care when we add to set per middle of this method

        newDepth -= 1;

        if (this.debug) {
          console.log("dips into outer ctx: " + c);
        }
      } else if (t instanceof RuleTransition) {
        // latch when newDepth goes negative - once we step out of the entry context we can't return
        if (newDepth >= 0) {
          newDepth += 1;
        }
      }

      this.closureCheckingStopState(c, configs, closureBusy, continueCollecting, fullCtx, newDepth, treatEofAsEpsilon);
    }
  }
};

ParserATNSimulator.prototype.canDropLoopEntryEdgeInLeftRecursiveRule = function (config) {
  // return False
  var p = config.state; // First check to see if we are in StarLoopEntryState generated during
  // left-recursion elimination. For efficiency, also check if
  // the context has an empty stack case. If so, it would mean
  // global FOLLOW so we can't perform optimization
  // Are we the special loop entry/exit state? or SLL wildcard

  if (p.stateType != ATNState.STAR_LOOP_ENTRY) return false;
  if (p.stateType != ATNState.STAR_LOOP_ENTRY || !p.isPrecedenceDecision || config.context.isEmpty() || config.context.hasEmptyPath()) return false; // Require all return states to return back to the same rule that p is in.

  var numCtxs = config.context.length;

  for (var i = 0; i < numCtxs; i++) {
    // for each stack context
    var returnState = this.atn.states[config.context.getReturnState(i)];
    if (returnState.ruleIndex != p.ruleIndex) return false;
  }

  var decisionStartState = p.transitions[0].target;
  var blockEndStateNum = decisionStartState.endState.stateNumber;
  var blockEndState = this.atn.states[blockEndStateNum]; // Verify that the top of each stack context leads to loop entry/exit
  // state through epsilon edges and w/o leaving rule.

  for (var i = 0; i < numCtxs; i++) {
    // for each stack context
    var returnStateNumber = config.context.getReturnState(i);
    var returnState = this.atn.states[returnStateNumber]; // all states must have single outgoing epsilon edge

    if (returnState.transitions.length != 1 || !returnState.transitions[0].isEpsilon) return false; // Look for prefix op case like 'not expr', (' type ')' expr

    var returnStateTarget = returnState.transitions[0].target;
    if (returnState.stateType == ATNState.BLOCK_END && returnStateTarget == p) continue; // Look for 'expr op expr' or case where expr's return state is block end
    // of (...)* internal block; the block end points to loop back
    // which points to p but we don't need to check that

    if (returnState == blockEndState) continue; // Look for ternary expr ? expr : expr. The return state points at block end,
    // which points at loop entry state

    if (returnStateTarget == blockEndState) continue; // Look for complex prefix 'between expr and expr' case where 2nd expr's
    // return state points at block end state of (...)* internal block

    if (returnStateTarget.stateType == ATNState.BLOCK_END && returnStateTarget.transitions.length == 1 && returnStateTarget.transitions[0].isEpsilon && returnStateTarget.transitions[0].target == p) continue; // anything else ain't conforming

    return false;
  }

  return true;
};

ParserATNSimulator.prototype.getRuleName = function (index) {
  if (this.parser !== null && index >= 0) {
    return this.parser.ruleNames[index];
  } else {
    return "<rule " + index + ">";
  }
};

ParserATNSimulator.prototype.getEpsilonTarget = function (config, t, collectPredicates, inContext, fullCtx, treatEofAsEpsilon) {
  switch (t.serializationType) {
    case Transition.RULE:
      return this.ruleTransition(config, t);

    case Transition.PRECEDENCE:
      return this.precedenceTransition(config, t, collectPredicates, inContext, fullCtx);

    case Transition.PREDICATE:
      return this.predTransition(config, t, collectPredicates, inContext, fullCtx);

    case Transition.ACTION:
      return this.actionTransition(config, t);

    case Transition.EPSILON:
      return new ATNConfig({
        state: t.target
      }, config);

    case Transition.ATOM:
    case Transition.RANGE:
    case Transition.SET:
      // EOF transitions act like epsilon transitions after the first EOF
      // transition is traversed
      if (treatEofAsEpsilon) {
        if (t.matches(Token.EOF, 0, 1)) {
          return new ATNConfig({
            state: t.target
          }, config);
        }
      }

      return null;

    default:
      return null;
  }
};

ParserATNSimulator.prototype.actionTransition = function (config, t) {
  if (this.debug) {
    var index = t.actionIndex == -1 ? 65535 : t.actionIndex;
    console.log("ACTION edge " + t.ruleIndex + ":" + index);
  }

  return new ATNConfig({
    state: t.target
  }, config);
};

ParserATNSimulator.prototype.precedenceTransition = function (config, pt, collectPredicates, inContext, fullCtx) {
  if (this.debug) {
    console.log("PRED (collectPredicates=" + collectPredicates + ") " + pt.precedence + ">=_p, ctx dependent=true");

    if (this.parser !== null) {
      console.log("context surrounding pred is " + Utils.arrayToString(this.parser.getRuleInvocationStack()));
    }
  }

  var c = null;

  if (collectPredicates && inContext) {
    if (fullCtx) {
      // In full context mode, we can evaluate predicates on-the-fly
      // during closure, which dramatically reduces the size of
      // the config sets. It also obviates the need to test predicates
      // later during conflict resolution.
      var currentPosition = this._input.index;

      this._input.seek(this._startIndex);

      var predSucceeds = pt.getPredicate().evaluate(this.parser, this._outerContext);

      this._input.seek(currentPosition);

      if (predSucceeds) {
        c = new ATNConfig({
          state: pt.target
        }, config); // no pred context
      }
    } else {
      var newSemCtx = SemanticContext.andContext(config.semanticContext, pt.getPredicate());
      c = new ATNConfig({
        state: pt.target,
        semanticContext: newSemCtx
      }, config);
    }
  } else {
    c = new ATNConfig({
      state: pt.target
    }, config);
  }

  if (this.debug) {
    console.log("config from pred transition=" + c);
  }

  return c;
};

ParserATNSimulator.prototype.predTransition = function (config, pt, collectPredicates, inContext, fullCtx) {
  if (this.debug) {
    console.log("PRED (collectPredicates=" + collectPredicates + ") " + pt.ruleIndex + ":" + pt.predIndex + ", ctx dependent=" + pt.isCtxDependent);

    if (this.parser !== null) {
      console.log("context surrounding pred is " + Utils.arrayToString(this.parser.getRuleInvocationStack()));
    }
  }

  var c = null;

  if (collectPredicates && (pt.isCtxDependent && inContext || !pt.isCtxDependent)) {
    if (fullCtx) {
      // In full context mode, we can evaluate predicates on-the-fly
      // during closure, which dramatically reduces the size of
      // the config sets. It also obviates the need to test predicates
      // later during conflict resolution.
      var currentPosition = this._input.index;

      this._input.seek(this._startIndex);

      var predSucceeds = pt.getPredicate().evaluate(this.parser, this._outerContext);

      this._input.seek(currentPosition);

      if (predSucceeds) {
        c = new ATNConfig({
          state: pt.target
        }, config); // no pred context
      }
    } else {
      var newSemCtx = SemanticContext.andContext(config.semanticContext, pt.getPredicate());
      c = new ATNConfig({
        state: pt.target,
        semanticContext: newSemCtx
      }, config);
    }
  } else {
    c = new ATNConfig({
      state: pt.target
    }, config);
  }

  if (this.debug) {
    console.log("config from pred transition=" + c);
  }

  return c;
};

ParserATNSimulator.prototype.ruleTransition = function (config, t) {
  if (this.debug) {
    console.log("CALL rule " + this.getRuleName(t.target.ruleIndex) + ", ctx=" + config.context);
  }

  var returnState = t.followState;
  var newContext = SingletonPredictionContext.create(config.context, returnState.stateNumber);
  return new ATNConfig({
    state: t.target,
    context: newContext
  }, config);
};

ParserATNSimulator.prototype.getConflictingAlts = function (configs) {
  var altsets = PredictionMode.getConflictingAltSubsets(configs);
  return PredictionMode.getAlts(altsets);
}; // Sam pointed out a problem with the previous definition, v3, of
// ambiguous states. If we have another state associated with conflicting
// alternatives, we should keep going. For example, the following grammar
//
// s : (ID | ID ID?) ';' ;
//
// When the ATN simulation reaches the state before ';', it has a DFA
// state that looks like: [12|1|[], 6|2|[], 12|2|[]]. Naturally
// 12|1|[] and 12|2|[] conflict, but we cannot stop processing this node
// because alternative to has another way to continue, via [6|2|[]].
// The key is that we have a single state that has config's only associated
// with a single alternative, 2, and crucially the state transitions
// among the configurations are all non-epsilon transitions. That means
// we don't consider any conflicts that include alternative 2. So, we
// ignore the conflict between alts 1 and 2. We ignore a set of
// conflicting alts when there is an intersection with an alternative
// associated with a single alt state in the state&rarr;config-list map.
//
// It's also the case that we might have two conflicting configurations but
// also a 3rd nonconflicting configuration for a different alternative:
// [1|1|[], 1|2|[], 8|3|[]]. This can come about from grammar:
//
// a : A | A | A B ;
//
// After matching input A, we reach the stop state for rule A, state 1.
// State 8 is the state right before B. Clearly alternatives 1 and 2
// conflict and no amount of further lookahead will separate the two.
// However, alternative 3 will be able to continue and so we do not
// stop working on this state. In the previous example, we're concerned
// with states associated with the conflicting alternatives. Here alt
// 3 is not associated with the conflicting configs, but since we can continue
// looking for input reasonably, I don't declare the state done. We
// ignore a set of conflicting alts when we have an alternative
// that we still need to pursue.
//


ParserATNSimulator.prototype.getConflictingAltsOrUniqueAlt = function (configs) {
  var conflictingAlts = null;

  if (configs.uniqueAlt !== ATN.INVALID_ALT_NUMBER) {
    conflictingAlts = new BitSet();
    conflictingAlts.add(configs.uniqueAlt);
  } else {
    conflictingAlts = configs.conflictingAlts;
  }

  return conflictingAlts;
};

ParserATNSimulator.prototype.getTokenName = function (t) {
  if (t === Token.EOF) {
    return "EOF";
  }

  if (this.parser !== null && this.parser.literalNames !== null) {
    if (t >= this.parser.literalNames.length && t >= this.parser.symbolicNames.length) {
      console.log("" + t + " ttype out of range: " + this.parser.literalNames);
      console.log("" + this.parser.getInputStream().getTokens());
    } else {
      var name = this.parser.literalNames[t] || this.parser.symbolicNames[t];
      return name + "<" + t + ">";
    }
  }

  return "" + t;
};

ParserATNSimulator.prototype.getLookaheadName = function (input) {
  return this.getTokenName(input.LA(1));
}; // Used for debugging in adaptivePredict around execATN but I cut
//  it out for clarity now that alg. works well. We can leave this
//  "dead" code for a bit.
//


ParserATNSimulator.prototype.dumpDeadEndConfigs = function (nvae) {
  console.log("dead end configs: ");
  var decs = nvae.getDeadEndConfigs();

  for (var i = 0; i < decs.length; i++) {
    var c = decs[i];
    var trans = "no edges";

    if (c.state.transitions.length > 0) {
      var t = c.state.transitions[0];

      if (t instanceof AtomTransition) {
        trans = "Atom " + this.getTokenName(t.label);
      } else if (t instanceof SetTransition) {
        var neg = t instanceof NotSetTransition;
        trans = (neg ? "~" : "") + "Set " + t.set;
      }
    }

    console.error(c.toString(this.parser, true) + ":" + trans);
  }
};

ParserATNSimulator.prototype.noViableAlt = function (input, outerContext, configs, startIndex) {
  return new NoViableAltException(this.parser, input, input.get(startIndex), input.LT(1), configs, outerContext);
};

ParserATNSimulator.prototype.getUniqueAlt = function (configs) {
  var alt = ATN.INVALID_ALT_NUMBER;

  for (var i = 0; i < configs.items.length; i++) {
    var c = configs.items[i];

    if (alt === ATN.INVALID_ALT_NUMBER) {
      alt = c.alt; // found first alt
    } else if (c.alt !== alt) {
      return ATN.INVALID_ALT_NUMBER;
    }
  }

  return alt;
}; //
// Add an edge to the DFA, if possible. This method calls
// {@link //addDFAState} to ensure the {@code to} state is present in the
// DFA. If {@code from} is {@code null}, or if {@code t} is outside the
// range of edges that can be represented in the DFA tables, this method
// returns without adding the edge to the DFA.
//
// <p>If {@code to} is {@code null}, this method returns {@code null}.
// Otherwise, this method returns the {@link DFAState} returned by calling
// {@link //addDFAState} for the {@code to} state.</p>
//
// @param dfa The DFA
// @param from The source state for the edge
// @param t The input symbol
// @param to The target state for the edge
//
// @return If {@code to} is {@code null}, this method returns {@code null};
// otherwise this method returns the result of calling {@link //addDFAState}
// on {@code to}
//


ParserATNSimulator.prototype.addDFAEdge = function (dfa, from_, t, to) {
  if (this.debug) {
    console.log("EDGE " + from_ + " -> " + to + " upon " + this.getTokenName(t));
  }

  if (to === null) {
    return null;
  }

  to = this.addDFAState(dfa, to); // used existing if possible not incoming

  if (from_ === null || t < -1 || t > this.atn.maxTokenType) {
    return to;
  }

  if (from_.edges === null) {
    from_.edges = [];
  }

  from_.edges[t + 1] = to; // connect

  if (this.debug) {
    var literalNames = this.parser === null ? null : this.parser.literalNames;
    var symbolicNames = this.parser === null ? null : this.parser.symbolicNames;
    console.log("DFA=\n" + dfa.toString(literalNames, symbolicNames));
  }

  return to;
}; //
// Add state {@code D} to the DFA if it is not already present, and return
// the actual instance stored in the DFA. If a state equivalent to {@code D}
// is already in the DFA, the existing state is returned. Otherwise this
// method returns {@code D} after adding it to the DFA.
//
// <p>If {@code D} is {@link //ERROR}, this method returns {@link //ERROR} and
// does not change the DFA.</p>
//
// @param dfa The dfa
// @param D The DFA state to add
// @return The state stored in the DFA. This will be either the existing
// state if {@code D} is already in the DFA, or {@code D} itself if the
// state was not already present.
//


ParserATNSimulator.prototype.addDFAState = function (dfa, D) {
  if (D == ATNSimulator.ERROR) {
    return D;
  }

  var existing = dfa.states.get(D);

  if (existing !== null) {
    return existing;
  }

  D.stateNumber = dfa.states.length;

  if (!D.configs.readOnly) {
    D.configs.optimizeConfigs(this);
    D.configs.setReadonly(true);
  }

  dfa.states.add(D);

  if (this.debug) {
    console.log("adding new DFA state: " + D);
  }

  return D;
};

ParserATNSimulator.prototype.reportAttemptingFullContext = function (dfa, conflictingAlts, configs, startIndex, stopIndex) {
  if (this.debug || this.retry_debug) {
    var interval = new Interval(startIndex, stopIndex + 1);
    console.log("reportAttemptingFullContext decision=" + dfa.decision + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
  }

  if (this.parser !== null) {
    this.parser.getErrorListenerDispatch().reportAttemptingFullContext(this.parser, dfa, startIndex, stopIndex, conflictingAlts, configs);
  }
};

ParserATNSimulator.prototype.reportContextSensitivity = function (dfa, prediction, configs, startIndex, stopIndex) {
  if (this.debug || this.retry_debug) {
    var interval = new Interval(startIndex, stopIndex + 1);
    console.log("reportContextSensitivity decision=" + dfa.decision + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
  }

  if (this.parser !== null) {
    this.parser.getErrorListenerDispatch().reportContextSensitivity(this.parser, dfa, startIndex, stopIndex, prediction, configs);
  }
}; // If context sensitive parsing, we know it's ambiguity not conflict//


ParserATNSimulator.prototype.reportAmbiguity = function (dfa, D, startIndex, stopIndex, exact, ambigAlts, configs) {
  if (this.debug || this.retry_debug) {
    var interval = new Interval(startIndex, stopIndex + 1);
    console.log("reportAmbiguity " + ambigAlts + ":" + configs + ", input=" + this.parser.getTokenStream().getText(interval));
  }

  if (this.parser !== null) {
    this.parser.getErrorListenerDispatch().reportAmbiguity(this.parser, dfa, startIndex, stopIndex, exact, ambigAlts, configs);
  }
};

exports.ParserATNSimulator = ParserATNSimulator;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

exports.DFA = __webpack_require__(98).DFA;
exports.DFASerializer = __webpack_require__(23).DFASerializer;
exports.LexerDFASerializer = __webpack_require__(23).LexerDFASerializer;
exports.PredPrediction = __webpack_require__(15).PredPrediction;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

var Set = __webpack_require__(2).Set;

var DFAState = __webpack_require__(15).DFAState;

var StarLoopEntryState = __webpack_require__(5).StarLoopEntryState;

var ATNConfigSet = __webpack_require__(12).ATNConfigSet;

var DFASerializer = __webpack_require__(23).DFASerializer;

var LexerDFASerializer = __webpack_require__(23).LexerDFASerializer;

function DFA(atnStartState, decision) {
  if (decision === undefined) {
    decision = 0;
  } // From which ATN state did we create this DFA?


  this.atnStartState = atnStartState;
  this.decision = decision; // A set of all DFA states. Use {@link Map} so we can get old state back
  // ({@link Set} only allows you to see if it's there).

  this._states = new Set();
  this.s0 = null; // {@code true} if this DFA is for a precedence decision; otherwise,
  // {@code false}. This is the backing field for {@link //isPrecedenceDfa},
  // {@link //setPrecedenceDfa}.

  this.precedenceDfa = false;

  if (atnStartState instanceof StarLoopEntryState) {
    if (atnStartState.isPrecedenceDecision) {
      this.precedenceDfa = true;
      var precedenceState = new DFAState(null, new ATNConfigSet());
      precedenceState.edges = [];
      precedenceState.isAcceptState = false;
      precedenceState.requiresFullContext = false;
      this.s0 = precedenceState;
    }
  }

  return this;
} // Get the start state for a specific precedence value.
//
// @param precedence The current precedence.
// @return The start state corresponding to the specified precedence, or
// {@code null} if no start state exists for the specified precedence.
//
// @throws IllegalStateException if this is not a precedence DFA.
// @see //isPrecedenceDfa()


DFA.prototype.getPrecedenceStartState = function (precedence) {
  if (!this.precedenceDfa) {
    throw "Only precedence DFAs may contain a precedence start state.";
  } // s0.edges is never null for a precedence DFA


  if (precedence < 0 || precedence >= this.s0.edges.length) {
    return null;
  }

  return this.s0.edges[precedence] || null;
}; // Set the start state for a specific precedence value.
//
// @param precedence The current precedence.
// @param startState The start state corresponding to the specified
// precedence.
//
// @throws IllegalStateException if this is not a precedence DFA.
// @see //isPrecedenceDfa()
//


DFA.prototype.setPrecedenceStartState = function (precedence, startState) {
  if (!this.precedenceDfa) {
    throw "Only precedence DFAs may contain a precedence start state.";
  }

  if (precedence < 0) {
    return;
  } // synchronization on s0 here is ok. when the DFA is turned into a
  // precedence DFA, s0 will be initialized once and not updated again
  // s0.edges is never null for a precedence DFA


  this.s0.edges[precedence] = startState;
}; //
// Sets whether this is a precedence DFA. If the specified value differs
// from the current DFA configuration, the following actions are taken;
// otherwise no changes are made to the current DFA.
//
// <ul>
// <li>The {@link //states} map is cleared</li>
// <li>If {@code precedenceDfa} is {@code false}, the initial state
// {@link //s0} is set to {@code null}; otherwise, it is initialized to a new
// {@link DFAState} with an empty outgoing {@link DFAState//edges} array to
// store the start states for individual precedence values.</li>
// <li>The {@link //precedenceDfa} field is updated</li>
// </ul>
//
// @param precedenceDfa {@code true} if this is a precedence DFA; otherwise,
// {@code false}


DFA.prototype.setPrecedenceDfa = function (precedenceDfa) {
  if (this.precedenceDfa !== precedenceDfa) {
    this._states = new DFAStatesSet();

    if (precedenceDfa) {
      var precedenceState = new DFAState(null, new ATNConfigSet());
      precedenceState.edges = [];
      precedenceState.isAcceptState = false;
      precedenceState.requiresFullContext = false;
      this.s0 = precedenceState;
    } else {
      this.s0 = null;
    }

    this.precedenceDfa = precedenceDfa;
  }
};

Object.defineProperty(DFA.prototype, "states", {
  get: function get() {
    return this._states;
  }
}); // Return a list of all states in this DFA, ordered by state number.

DFA.prototype.sortedStates = function () {
  var list = this._states.values();

  return list.sort(function (a, b) {
    return a.stateNumber - b.stateNumber;
  });
};

DFA.prototype.toString = function (literalNames, symbolicNames) {
  literalNames = literalNames || null;
  symbolicNames = symbolicNames || null;

  if (this.s0 === null) {
    return "";
  }

  var serializer = new DFASerializer(this, literalNames, symbolicNames);
  return serializer.toString();
};

DFA.prototype.toLexerString = function () {
  if (this.s0 === null) {
    return "";
  }

  var serializer = new LexerDFASerializer(this);
  return serializer.toString();
};

exports.DFA = DFA;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

var Tree = __webpack_require__(6);

exports.Trees = __webpack_require__(38).Trees;
exports.RuleNode = Tree.RuleNode;
exports.ParseTreeListener = Tree.ParseTreeListener;
exports.ParseTreeVisitor = Tree.ParseTreeVisitor;
exports.ParseTreeWalker = Tree.ParseTreeWalker;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

exports.RecognitionException = __webpack_require__(7).RecognitionException;
exports.NoViableAltException = __webpack_require__(7).NoViableAltException;
exports.LexerNoViableAltException = __webpack_require__(7).LexerNoViableAltException;
exports.InputMismatchException = __webpack_require__(7).InputMismatchException;
exports.FailedPredicateException = __webpack_require__(7).FailedPredicateException;
exports.DiagnosticErrorListener = __webpack_require__(101).DiagnosticErrorListener;
exports.BailErrorStrategy = __webpack_require__(47).BailErrorStrategy;
exports.ErrorListener = __webpack_require__(22).ErrorListener;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
//
// This implementation of {@link ANTLRErrorListener} can be used to identify
// certain potential correctness and performance problems in grammars. "Reports"
// are made by calling {@link Parser//notifyErrorListeners} with the appropriate
// message.
//
// <ul>
// <li><b>Ambiguities</b>: These are cases where more than one path through the
// grammar can match the input.</li>
// <li><b>Weak context sensitivity</b>: These are cases where full-context
// prediction resolved an SLL conflict to a unique alternative which equaled the
// minimum alternative of the SLL conflict.</li>
// <li><b>Strong (forced) context sensitivity</b>: These are cases where the
// full-context prediction resolved an SLL conflict to a unique alternative,
// <em>and</em> the minimum alternative of the SLL conflict was found to not be
// a truly viable alternative. Two-stage parsing cannot be used for inputs where
// this situation occurs.</li>
// </ul>

var BitSet = __webpack_require__(2).BitSet;

var ErrorListener = __webpack_require__(22).ErrorListener;

var Interval = __webpack_require__(4).Interval;

function DiagnosticErrorListener(exactOnly) {
  ErrorListener.call(this);
  exactOnly = exactOnly || true; // whether all ambiguities or only exact ambiguities are reported.

  this.exactOnly = exactOnly;
  return this;
}

DiagnosticErrorListener.prototype = Object.create(ErrorListener.prototype);
DiagnosticErrorListener.prototype.constructor = DiagnosticErrorListener;

DiagnosticErrorListener.prototype.reportAmbiguity = function (recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
  if (this.exactOnly && !exact) {
    return;
  }

  var msg = "reportAmbiguity d=" + this.getDecisionDescription(recognizer, dfa) + ": ambigAlts=" + this.getConflictingAlts(ambigAlts, configs) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
  recognizer.notifyErrorListeners(msg);
};

DiagnosticErrorListener.prototype.reportAttemptingFullContext = function (recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
  var msg = "reportAttemptingFullContext d=" + this.getDecisionDescription(recognizer, dfa) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
  recognizer.notifyErrorListeners(msg);
};

DiagnosticErrorListener.prototype.reportContextSensitivity = function (recognizer, dfa, startIndex, stopIndex, prediction, configs) {
  var msg = "reportContextSensitivity d=" + this.getDecisionDescription(recognizer, dfa) + ", input='" + recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'";
  recognizer.notifyErrorListeners(msg);
};

DiagnosticErrorListener.prototype.getDecisionDescription = function (recognizer, dfa) {
  var decision = dfa.decision;
  var ruleIndex = dfa.atnStartState.ruleIndex;
  var ruleNames = recognizer.ruleNames;

  if (ruleIndex < 0 || ruleIndex >= ruleNames.length) {
    return "" + decision;
  }

  var ruleName = ruleNames[ruleIndex] || null;

  if (ruleName === null || ruleName.length === 0) {
    return "" + decision;
  }

  return "" + decision + " (" + ruleName + ")";
}; //
// Computes the set of conflicting or ambiguous alternatives from a
// configuration set, if that information was not already provided by the
// parser.
//
// @param reportedAlts The set of conflicting or ambiguous alternatives, as
// reported by the parser.
// @param configs The conflicting or ambiguous configuration set.
// @return Returns {@code reportedAlts} if it is not {@code null}, otherwise
// returns the set of alternatives represented in {@code configs}.
//


DiagnosticErrorListener.prototype.getConflictingAlts = function (reportedAlts, configs) {
  if (reportedAlts !== null) {
    return reportedAlts;
  }

  var result = new BitSet();

  for (var i = 0; i < configs.items.length; i++) {
    result.add(configs.items[i].alt);
  }

  return "{" + result.values().join(", ") + "}";
};

exports.DiagnosticErrorListener = DiagnosticErrorListener;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//

var InputStream = __webpack_require__(29).InputStream;

var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
var fs = isNodeJs ? __webpack_require__(18) : null; // Utility functions to create InputStreams from various sources.
//
// All returned InputStreams support the full range of Unicode
// up to U+10FFFF (the default behavior of InputStream only supports
// code points up to U+FFFF).

var CharStreams = {
  // Creates an InputStream from a string.
  fromString: function fromString(str) {
    return new InputStream(str, true);
  },
  // Asynchronously creates an InputStream from a blob given the
  // encoding of the bytes in that blob (defaults to 'utf8' if
  // encoding is null).
  //
  // Invokes onLoad(result) on success, onError(error) on
  // failure.
  fromBlob: function fromBlob(blob, encoding, onLoad, onError) {
    var reader = FileReader();

    reader.onload = function (e) {
      var is = new InputStream(e.target.result, true);
      onLoad(is);
    };

    reader.onerror = onError;
    reader.readAsText(blob, encoding);
  },
  // Creates an InputStream from a Buffer given the
  // encoding of the bytes in that buffer (defaults to 'utf8' if
  // encoding is null).
  fromBuffer: function fromBuffer(buffer, encoding) {
    return new InputStream(buffer.toString(encoding), true);
  },
  // Asynchronously creates an InputStream from a file on disk given
  // the encoding of the bytes in that file (defaults to 'utf8' if
  // encoding is null).
  //
  // Invokes callback(error, result) on completion.
  fromPath: function fromPath(path, encoding, callback) {
    fs.readFile(path, encoding, function (err, data) {
      var is = null;

      if (data !== null) {
        is = new InputStream(data, true);
      }

      callback(err, is);
    });
  },
  // Synchronously creates an InputStream given a path to a file
  // on disk and the encoding of the bytes in that file (defaults to
  // 'utf8' if encoding is null).
  fromPathSync: function fromPathSync(path, encoding) {
    var data = fs.readFileSync(path, encoding);
    return new InputStream(data, true);
  }
};
exports.CharStreams = CharStreams;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
//
//
//  This is an InputStream that is loaded from a file all at once
//  when you construct the object.
//

var InputStream = __webpack_require__(29).InputStream;

var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
var fs = isNodeJs ? __webpack_require__(18) : null;

function FileStream(fileName, decodeToUnicodeCodePoints) {
  var data = fs.readFileSync(fileName, "utf8");
  InputStream.call(this, data, decodeToUnicodeCodePoints);
  this.fileName = fileName;
  return this;
}

FileStream.prototype = Object.create(InputStream.prototype);
FileStream.prototype.constructor = FileStream;
exports.FileStream = FileStream;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
///
//
// This class extends {@link BufferedTokenStream} with functionality to filter
// token streams to tokens on a particular channel (tokens where
// {@link Token//getChannel} returns a particular value).
//
// <p>
// This token stream provides access to all tokens by index or when calling
// methods like {@link //getText}. The channel filtering is only used for code
// accessing tokens via the lookahead methods {@link //LA}, {@link //LT}, and
// {@link //LB}.</p>
//
// <p>
// By default, tokens are placed on the default channel
// ({@link Token//DEFAULT_CHANNEL}), but may be reassigned by using the
// {@code ->channel(HIDDEN)} lexer command, or by using an embedded action to
// call {@link Lexer//setChannel}.
// </p>
//
// <p>
// Note: lexer rules which use the {@code ->skip} lexer command or call
// {@link Lexer//skip} do not produce tokens at all, so input text matched by
// such a rule will not be available as part of the token stream, regardless of
// channel.</p>
///

var Token = __webpack_require__(3).Token;

var BufferedTokenStream = __webpack_require__(105).BufferedTokenStream;

function CommonTokenStream(lexer, channel) {
  BufferedTokenStream.call(this, lexer);
  this.channel = channel === undefined ? Token.DEFAULT_CHANNEL : channel;
  return this;
}

CommonTokenStream.prototype = Object.create(BufferedTokenStream.prototype);
CommonTokenStream.prototype.constructor = CommonTokenStream;

CommonTokenStream.prototype.adjustSeekIndex = function (i) {
  return this.nextTokenOnChannel(i, this.channel);
};

CommonTokenStream.prototype.LB = function (k) {
  if (k === 0 || this.index - k < 0) {
    return null;
  }

  var i = this.index;
  var n = 1; // find k good tokens looking backwards

  while (n <= k) {
    // skip off-channel tokens
    i = this.previousTokenOnChannel(i - 1, this.channel);
    n += 1;
  }

  if (i < 0) {
    return null;
  }

  return this.tokens[i];
};

CommonTokenStream.prototype.LT = function (k) {
  this.lazyInit();

  if (k === 0) {
    return null;
  }

  if (k < 0) {
    return this.LB(-k);
  }

  var i = this.index;
  var n = 1; // we know tokens[pos] is a good one
  // find k good tokens

  while (n < k) {
    // skip off-channel tokens, but make sure to not look past EOF
    if (this.sync(i + 1)) {
      i = this.nextTokenOnChannel(i + 1, this.channel);
    }

    n += 1;
  }

  return this.tokens[i];
}; // Count EOF just once.///


CommonTokenStream.prototype.getNumberOfOnChannelTokens = function () {
  var n = 0;
  this.fill();

  for (var i = 0; i < this.tokens.length; i++) {
    var t = this.tokens[i];

    if (t.channel === this.channel) {
      n += 1;
    }

    if (t.type === Token.EOF) {
      break;
    }
  }

  return n;
};

exports.CommonTokenStream = CommonTokenStream;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
// This implementation of {@link TokenStream} loads tokens from a
// {@link TokenSource} on-demand, and places the tokens in a buffer to provide
// access to any previous token by index.
//
// <p>
// This token stream ignores the value of {@link Token//getChannel}. If your
// parser requires the token stream filter tokens to only those on a particular
// channel, such as {@link Token//DEFAULT_CHANNEL} or
// {@link Token//HIDDEN_CHANNEL}, use a filtering token stream such a
// {@link CommonTokenStream}.</p>

var Token = __webpack_require__(3).Token;

var Lexer = __webpack_require__(21).Lexer;

var Interval = __webpack_require__(4).Interval; // this is just to keep meaningful parameter types to Parser


function TokenStream() {
  return this;
}

function BufferedTokenStream(tokenSource) {
  TokenStream.call(this); // The {@link TokenSource} from which tokens for this stream are fetched.

  this.tokenSource = tokenSource; // A collection of all tokens fetched from the token source. The list is
  // considered a complete view of the input once {@link //fetchedEOF} is set
  // to {@code true}.

  this.tokens = []; // The index into {@link //tokens} of the current token (next token to
  // {@link //consume}). {@link //tokens}{@code [}{@link //p}{@code ]} should
  // be
  // {@link //LT LT(1)}.
  //
  // <p>This field is set to -1 when the stream is first constructed or when
  // {@link //setTokenSource} is called, indicating that the first token has
  // not yet been fetched from the token source. For additional information,
  // see the documentation of {@link IntStream} for a description of
  // Initializing Methods.</p>

  this.index = -1; // Indicates whether the {@link Token//EOF} token has been fetched from
  // {@link //tokenSource} and added to {@link //tokens}. This field improves
  // performance for the following cases:
  //
  // <ul>
  // <li>{@link //consume}: The lookahead check in {@link //consume} to
  // prevent
  // consuming the EOF symbol is optimized by checking the values of
  // {@link //fetchedEOF} and {@link //p} instead of calling {@link
  // //LA}.</li>
  // <li>{@link //fetch}: The check to prevent adding multiple EOF symbols
  // into
  // {@link //tokens} is trivial with this field.</li>
  // <ul>

  this.fetchedEOF = false;
  return this;
}

BufferedTokenStream.prototype = Object.create(TokenStream.prototype);
BufferedTokenStream.prototype.constructor = BufferedTokenStream;

BufferedTokenStream.prototype.mark = function () {
  return 0;
};

BufferedTokenStream.prototype.release = function (marker) {// no resources to release
};

BufferedTokenStream.prototype.reset = function () {
  this.seek(0);
};

BufferedTokenStream.prototype.seek = function (index) {
  this.lazyInit();
  this.index = this.adjustSeekIndex(index);
};

BufferedTokenStream.prototype.get = function (index) {
  this.lazyInit();
  return this.tokens[index];
};

BufferedTokenStream.prototype.consume = function () {
  var skipEofCheck = false;

  if (this.index >= 0) {
    if (this.fetchedEOF) {
      // the last token in tokens is EOF. skip check if p indexes any
      // fetched token except the last.
      skipEofCheck = this.index < this.tokens.length - 1;
    } else {
      // no EOF token in tokens. skip check if p indexes a fetched token.
      skipEofCheck = this.index < this.tokens.length;
    }
  } else {
    // not yet initialized
    skipEofCheck = false;
  }

  if (!skipEofCheck && this.LA(1) === Token.EOF) {
    throw "cannot consume EOF";
  }

  if (this.sync(this.index + 1)) {
    this.index = this.adjustSeekIndex(this.index + 1);
  }
}; // Make sure index {@code i} in tokens has a token.
//
// @return {@code true} if a token is located at index {@code i}, otherwise
// {@code false}.
// @see //get(int i)
// /


BufferedTokenStream.prototype.sync = function (i) {
  var n = i - this.tokens.length + 1; // how many more elements we need?

  if (n > 0) {
    var fetched = this.fetch(n);
    return fetched >= n;
  }

  return true;
}; // Add {@code n} elements to buffer.
//
// @return The actual number of elements added to the buffer.
// /


BufferedTokenStream.prototype.fetch = function (n) {
  if (this.fetchedEOF) {
    return 0;
  }

  for (var i = 0; i < n; i++) {
    var t = this.tokenSource.nextToken();
    t.tokenIndex = this.tokens.length;
    this.tokens.push(t);

    if (t.type === Token.EOF) {
      this.fetchedEOF = true;
      return i + 1;
    }
  }

  return n;
}; // Get all tokens from start..stop inclusively///


BufferedTokenStream.prototype.getTokens = function (start, stop, types) {
  if (types === undefined) {
    types = null;
  }

  if (start < 0 || stop < 0) {
    return null;
  }

  this.lazyInit();
  var subset = [];

  if (stop >= this.tokens.length) {
    stop = this.tokens.length - 1;
  }

  for (var i = start; i < stop; i++) {
    var t = this.tokens[i];

    if (t.type === Token.EOF) {
      break;
    }

    if (types === null || types.contains(t.type)) {
      subset.push(t);
    }
  }

  return subset;
};

BufferedTokenStream.prototype.LA = function (i) {
  return this.LT(i).type;
};

BufferedTokenStream.prototype.LB = function (k) {
  if (this.index - k < 0) {
    return null;
  }

  return this.tokens[this.index - k];
};

BufferedTokenStream.prototype.LT = function (k) {
  this.lazyInit();

  if (k === 0) {
    return null;
  }

  if (k < 0) {
    return this.LB(-k);
  }

  var i = this.index + k - 1;
  this.sync(i);

  if (i >= this.tokens.length) {
    // return EOF token
    // EOF must be last token
    return this.tokens[this.tokens.length - 1];
  }

  return this.tokens[i];
}; // Allowed derived classes to modify the behavior of operations which change
// the current stream position by adjusting the target token index of a seek
// operation. The default implementation simply returns {@code i}. If an
// exception is thrown in this method, the current stream index should not be
// changed.
//
// <p>For example, {@link CommonTokenStream} overrides this method to ensure
// that
// the seek target is always an on-channel token.</p>
//
// @param i The target token index.
// @return The adjusted target token index.


BufferedTokenStream.prototype.adjustSeekIndex = function (i) {
  return i;
};

BufferedTokenStream.prototype.lazyInit = function () {
  if (this.index === -1) {
    this.setup();
  }
};

BufferedTokenStream.prototype.setup = function () {
  this.sync(0);
  this.index = this.adjustSeekIndex(0);
}; // Reset this token stream by setting its token source.///


BufferedTokenStream.prototype.setTokenSource = function (tokenSource) {
  this.tokenSource = tokenSource;
  this.tokens = [];
  this.index = -1;
  this.fetchedEOF = false;
}; // Given a starting index, return the index of the next token on channel.
// Return i if tokens[i] is on channel. Return -1 if there are no tokens
// on channel between i and EOF.
// /


BufferedTokenStream.prototype.nextTokenOnChannel = function (i, channel) {
  this.sync(i);

  if (i >= this.tokens.length) {
    return -1;
  }

  var token = this.tokens[i];

  while (token.channel !== this.channel) {
    if (token.type === Token.EOF) {
      return -1;
    }

    i += 1;
    this.sync(i);
    token = this.tokens[i];
  }

  return i;
}; // Given a starting index, return the index of the previous token on channel.
// Return i if tokens[i] is on channel. Return -1 if there are no tokens
// on channel between i and 0.


BufferedTokenStream.prototype.previousTokenOnChannel = function (i, channel) {
  while (i >= 0 && this.tokens[i].channel !== channel) {
    i -= 1;
  }

  return i;
}; // Collect all tokens on specified channel to the right of
// the current token up until we see a token on DEFAULT_TOKEN_CHANNEL or
// EOF. If channel is -1, find any non default channel token.


BufferedTokenStream.prototype.getHiddenTokensToRight = function (tokenIndex, channel) {
  if (channel === undefined) {
    channel = -1;
  }

  this.lazyInit();

  if (tokenIndex < 0 || tokenIndex >= this.tokens.length) {
    throw "" + tokenIndex + " not in 0.." + this.tokens.length - 1;
  }

  var nextOnChannel = this.nextTokenOnChannel(tokenIndex + 1, Lexer.DEFAULT_TOKEN_CHANNEL);
  var from_ = tokenIndex + 1; // if none onchannel to right, nextOnChannel=-1 so set to = last token

  var to = nextOnChannel === -1 ? this.tokens.length - 1 : nextOnChannel;
  return this.filterForChannel(from_, to, channel);
}; // Collect all tokens on specified channel to the left of
// the current token up until we see a token on DEFAULT_TOKEN_CHANNEL.
// If channel is -1, find any non default channel token.


BufferedTokenStream.prototype.getHiddenTokensToLeft = function (tokenIndex, channel) {
  if (channel === undefined) {
    channel = -1;
  }

  this.lazyInit();

  if (tokenIndex < 0 || tokenIndex >= this.tokens.length) {
    throw "" + tokenIndex + " not in 0.." + this.tokens.length - 1;
  }

  var prevOnChannel = this.previousTokenOnChannel(tokenIndex - 1, Lexer.DEFAULT_TOKEN_CHANNEL);

  if (prevOnChannel === tokenIndex - 1) {
    return null;
  } // if none on channel to left, prevOnChannel=-1 then from=0


  var from_ = prevOnChannel + 1;
  var to = tokenIndex - 1;
  return this.filterForChannel(from_, to, channel);
};

BufferedTokenStream.prototype.filterForChannel = function (left, right, channel) {
  var hidden = [];

  for (var i = left; i < right + 1; i++) {
    var t = this.tokens[i];

    if (channel === -1) {
      if (t.channel !== Lexer.DEFAULT_TOKEN_CHANNEL) {
        hidden.push(t);
      }
    } else if (t.channel === channel) {
      hidden.push(t);
    }
  }

  if (hidden.length === 0) {
    return null;
  }

  return hidden;
};

BufferedTokenStream.prototype.getSourceName = function () {
  return this.tokenSource.getSourceName();
}; // Get the text of all tokens in this buffer.///


BufferedTokenStream.prototype.getText = function (interval) {
  this.lazyInit();
  this.fill();

  if (interval === undefined || interval === null) {
    interval = new Interval(0, this.tokens.length - 1);
  }

  var start = interval.start;

  if (start instanceof Token) {
    start = start.tokenIndex;
  }

  var stop = interval.stop;

  if (stop instanceof Token) {
    stop = stop.tokenIndex;
  }

  if (start === null || stop === null || start < 0 || stop < 0) {
    return "";
  }

  if (stop >= this.tokens.length) {
    stop = this.tokens.length - 1;
  }

  var s = "";

  for (var i = start; i < stop + 1; i++) {
    var t = this.tokens[i];

    if (t.type === Token.EOF) {
      break;
    }

    s = s + t.text;
  }

  return s;
}; // Get all tokens from lexer until EOF///


BufferedTokenStream.prototype.fill = function () {
  this.lazyInit();

  while (this.fetch(1000) === 1000) {
    continue;
  }
};

exports.BufferedTokenStream = BufferedTokenStream;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

var Token = __webpack_require__(3).Token;

var ParseTreeListener = __webpack_require__(6).ParseTreeListener;

var Recognizer = __webpack_require__(42).Recognizer;

var DefaultErrorStrategy = __webpack_require__(47).DefaultErrorStrategy;

var ATNDeserializer = __webpack_require__(39).ATNDeserializer;

var ATNDeserializationOptions = __webpack_require__(40).ATNDeserializationOptions;

var TerminalNode = __webpack_require__(6).TerminalNode;

var ErrorNode = __webpack_require__(6).ErrorNode;

function TraceListener(parser) {
  ParseTreeListener.call(this);
  this.parser = parser;
  return this;
}

TraceListener.prototype = Object.create(ParseTreeListener.prototype);
TraceListener.prototype.constructor = TraceListener;

TraceListener.prototype.enterEveryRule = function (ctx) {
  console.log("enter   " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.parser._input.LT(1).text);
};

TraceListener.prototype.visitTerminal = function (node) {
  console.log("consume " + node.symbol + " rule " + this.parser.ruleNames[this.parser._ctx.ruleIndex]);
};

TraceListener.prototype.exitEveryRule = function (ctx) {
  console.log("exit    " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.parser._input.LT(1).text);
}; // this is all the parsing support code essentially; most of it is error
// recovery stuff.//


function Parser(input) {
  Recognizer.call(this); // The input stream.

  this._input = null; // The error handling strategy for the parser. The default value is a new
  // instance of {@link DefaultErrorStrategy}.

  this._errHandler = new DefaultErrorStrategy();
  this._precedenceStack = [];

  this._precedenceStack.push(0); // The {@link ParserRuleContext} object for the currently executing rule.
  // this is always non-null during the parsing process.


  this._ctx = null; // Specifies whether or not the parser should construct a parse tree during
  // the parsing process. The default value is {@code true}.

  this.buildParseTrees = true; // When {@link //setTrace}{@code (true)} is called, a reference to the
  // {@link TraceListener} is stored here so it can be easily removed in a
  // later call to {@link //setTrace}{@code (false)}. The listener itself is
  // implemented as a parser listener so this field is not directly used by
  // other parser methods.

  this._tracer = null; // The list of {@link ParseTreeListener} listeners registered to receive
  // events during the parse.

  this._parseListeners = null; // The number of syntax errors reported during parsing. this value is
  // incremented each time {@link //notifyErrorListeners} is called.

  this._syntaxErrors = 0;
  this.setInputStream(input);
  return this;
}

Parser.prototype = Object.create(Recognizer.prototype);
Parser.prototype.contructor = Parser; // this field maps from the serialized ATN string to the deserialized {@link
// ATN} with
// bypass alternatives.
//
// @see ATNDeserializationOptions//isGenerateRuleBypassTransitions()
//

Parser.bypassAltsAtnCache = {}; // reset the parser's state//

Parser.prototype.reset = function () {
  if (this._input !== null) {
    this._input.seek(0);
  }

  this._errHandler.reset(this);

  this._ctx = null;
  this._syntaxErrors = 0;
  this.setTrace(false);
  this._precedenceStack = [];

  this._precedenceStack.push(0);

  if (this._interp !== null) {
    this._interp.reset();
  }
}; // Match current input symbol against {@code ttype}. If the symbol type
// matches, {@link ANTLRErrorStrategy//reportMatch} and {@link //consume} are
// called to complete the match process.
//
// <p>If the symbol type does not match,
// {@link ANTLRErrorStrategy//recoverInline} is called on the current error
// strategy to attempt recovery. If {@link //getBuildParseTree} is
// {@code true} and the token index of the symbol returned by
// {@link ANTLRErrorStrategy//recoverInline} is -1, the symbol is added to
// the parse tree by calling {@link ParserRuleContext//addErrorNode}.</p>
//
// @param ttype the token type to match
// @return the matched symbol
// @throws RecognitionException if the current input symbol did not match
// {@code ttype} and the error strategy could not recover from the
// mismatched symbol


Parser.prototype.match = function (ttype) {
  var t = this.getCurrentToken();

  if (t.type === ttype) {
    this._errHandler.reportMatch(this);

    this.consume();
  } else {
    t = this._errHandler.recoverInline(this);

    if (this.buildParseTrees && t.tokenIndex === -1) {
      // we must have conjured up a new token during single token
      // insertion
      // if it's not the current symbol
      this._ctx.addErrorNode(t);
    }
  }

  return t;
}; // Match current input symbol as a wildcard. If the symbol type matches
// (i.e. has a value greater than 0), {@link ANTLRErrorStrategy//reportMatch}
// and {@link //consume} are called to complete the match process.
//
// <p>If the symbol type does not match,
// {@link ANTLRErrorStrategy//recoverInline} is called on the current error
// strategy to attempt recovery. If {@link //getBuildParseTree} is
// {@code true} and the token index of the symbol returned by
// {@link ANTLRErrorStrategy//recoverInline} is -1, the symbol is added to
// the parse tree by calling {@link ParserRuleContext//addErrorNode}.</p>
//
// @return the matched symbol
// @throws RecognitionException if the current input symbol did not match
// a wildcard and the error strategy could not recover from the mismatched
// symbol


Parser.prototype.matchWildcard = function () {
  var t = this.getCurrentToken();

  if (t.type > 0) {
    this._errHandler.reportMatch(this);

    this.consume();
  } else {
    t = this._errHandler.recoverInline(this);

    if (this._buildParseTrees && t.tokenIndex === -1) {
      // we must have conjured up a new token during single token
      // insertion
      // if it's not the current symbol
      this._ctx.addErrorNode(t);
    }
  }

  return t;
};

Parser.prototype.getParseListeners = function () {
  return this._parseListeners || [];
}; // Registers {@code listener} to receive events during the parsing process.
//
// <p>To support output-preserving grammar transformations (including but not
// limited to left-recursion removal, automated left-factoring, and
// optimized code generation), calls to listener methods during the parse
// may differ substantially from calls made by
// {@link ParseTreeWalker//DEFAULT} used after the parse is complete. In
// particular, rule entry and exit events may occur in a different order
// during the parse than after the parser. In addition, calls to certain
// rule entry methods may be omitted.</p>
//
// <p>With the following specific exceptions, calls to listener events are
// <em>deterministic</em>, i.e. for identical input the calls to listener
// methods will be the same.</p>
//
// <ul>
// <li>Alterations to the grammar used to generate code may change the
// behavior of the listener calls.</li>
// <li>Alterations to the command line options passed to ANTLR 4 when
// generating the parser may change the behavior of the listener calls.</li>
// <li>Changing the version of the ANTLR Tool used to generate the parser
// may change the behavior of the listener calls.</li>
// </ul>
//
// @param listener the listener to add
//
// @throws NullPointerException if {@code} listener is {@code null}
//


Parser.prototype.addParseListener = function (listener) {
  if (listener === null) {
    throw "listener";
  }

  if (this._parseListeners === null) {
    this._parseListeners = [];
  }

  this._parseListeners.push(listener);
}; //
// Remove {@code listener} from the list of parse listeners.
//
// <p>If {@code listener} is {@code null} or has not been added as a parse
// listener, this method does nothing.</p>
// @param listener the listener to remove
//


Parser.prototype.removeParseListener = function (listener) {
  if (this._parseListeners !== null) {
    var idx = this._parseListeners.indexOf(listener);

    if (idx >= 0) {
      this._parseListeners.splice(idx, 1);
    }

    if (this._parseListeners.length === 0) {
      this._parseListeners = null;
    }
  }
}; // Remove all parse listeners.


Parser.prototype.removeParseListeners = function () {
  this._parseListeners = null;
}; // Notify any parse listeners of an enter rule event.


Parser.prototype.triggerEnterRuleEvent = function () {
  if (this._parseListeners !== null) {
    var ctx = this._ctx;

    this._parseListeners.map(function (listener) {
      listener.enterEveryRule(ctx);
      ctx.enterRule(listener);
    });
  }
}; //
// Notify any parse listeners of an exit rule event.
//
// @see //addParseListener
//


Parser.prototype.triggerExitRuleEvent = function () {
  if (this._parseListeners !== null) {
    // reverse order walk of listeners
    var ctx = this._ctx;

    this._parseListeners.slice(0).reverse().map(function (listener) {
      ctx.exitRule(listener);
      listener.exitEveryRule(ctx);
    });
  }
};

Parser.prototype.getTokenFactory = function () {
  return this._input.tokenSource._factory;
}; // Tell our token source and error strategy about a new way to create tokens.//


Parser.prototype.setTokenFactory = function (factory) {
  this._input.tokenSource._factory = factory;
}; // The ATN with bypass alternatives is expensive to create so we create it
// lazily.
//
// @throws UnsupportedOperationException if the current parser does not
// implement the {@link //getSerializedATN()} method.
//


Parser.prototype.getATNWithBypassAlts = function () {
  var serializedAtn = this.getSerializedATN();

  if (serializedAtn === null) {
    throw "The current parser does not support an ATN with bypass alternatives.";
  }

  var result = this.bypassAltsAtnCache[serializedAtn];

  if (result === null) {
    var deserializationOptions = new ATNDeserializationOptions();
    deserializationOptions.generateRuleBypassTransitions = true;
    result = new ATNDeserializer(deserializationOptions).deserialize(serializedAtn);
    this.bypassAltsAtnCache[serializedAtn] = result;
  }

  return result;
}; // The preferred method of getting a tree pattern. For example, here's a
// sample use:
//
// <pre>
// ParseTree t = parser.expr();
// ParseTreePattern p = parser.compileParseTreePattern("&lt;ID&gt;+0",
// MyParser.RULE_expr);
// ParseTreeMatch m = p.match(t);
// String id = m.get("ID");
// </pre>


var Lexer = __webpack_require__(21).Lexer;

Parser.prototype.compileParseTreePattern = function (pattern, patternRuleIndex, lexer) {
  lexer = lexer || null;

  if (lexer === null) {
    if (this.getTokenStream() !== null) {
      var tokenSource = this.getTokenStream().tokenSource;

      if (tokenSource instanceof Lexer) {
        lexer = tokenSource;
      }
    }
  }

  if (lexer === null) {
    throw "Parser can't discover a lexer to use";
  }

  var m = new ParseTreePatternMatcher(lexer, this);
  return m.compile(pattern, patternRuleIndex);
};

Parser.prototype.getInputStream = function () {
  return this.getTokenStream();
};

Parser.prototype.setInputStream = function (input) {
  this.setTokenStream(input);
};

Parser.prototype.getTokenStream = function () {
  return this._input;
}; // Set the token stream and reset the parser.//


Parser.prototype.setTokenStream = function (input) {
  this._input = null;
  this.reset();
  this._input = input;
}; // Match needs to return the current input symbol, which gets put
// into the label for the associated token ref; e.g., x=ID.
//


Parser.prototype.getCurrentToken = function () {
  return this._input.LT(1);
};

Parser.prototype.notifyErrorListeners = function (msg, offendingToken, err) {
  offendingToken = offendingToken || null;
  err = err || null;

  if (offendingToken === null) {
    offendingToken = this.getCurrentToken();
  }

  this._syntaxErrors += 1;
  var line = offendingToken.line;
  var column = offendingToken.column;
  var listener = this.getErrorListenerDispatch();
  listener.syntaxError(this, offendingToken, line, column, msg, err);
}; //
// Consume and return the {@linkplain //getCurrentToken current symbol}.
//
// <p>E.g., given the following input with {@code A} being the current
// lookahead symbol, this function moves the cursor to {@code B} and returns
// {@code A}.</p>
//
// <pre>
// A B
// ^
// </pre>
//
// If the parser is not in error recovery mode, the consumed symbol is added
// to the parse tree using {@link ParserRuleContext//addChild(Token)}, and
// {@link ParseTreeListener//visitTerminal} is called on any parse listeners.
// If the parser <em>is</em> in error recovery mode, the consumed symbol is
// added to the parse tree using
// {@link ParserRuleContext//addErrorNode(Token)}, and
// {@link ParseTreeListener//visitErrorNode} is called on any parse
// listeners.
//


Parser.prototype.consume = function () {
  var o = this.getCurrentToken();

  if (o.type !== Token.EOF) {
    this.getInputStream().consume();
  }

  var hasListener = this._parseListeners !== null && this._parseListeners.length > 0;

  if (this.buildParseTrees || hasListener) {
    var node;

    if (this._errHandler.inErrorRecoveryMode(this)) {
      node = this._ctx.addErrorNode(o);
    } else {
      node = this._ctx.addTokenNode(o);
    }

    node.invokingState = this.state;

    if (hasListener) {
      this._parseListeners.map(function (listener) {
        if (node instanceof ErrorNode || node.isErrorNode !== undefined && node.isErrorNode()) {
          listener.visitErrorNode(node);
        } else if (node instanceof TerminalNode) {
          listener.visitTerminal(node);
        }
      });
    }
  }

  return o;
};

Parser.prototype.addContextToParseTree = function () {
  // add current context to parent if we have a parent
  if (this._ctx.parentCtx !== null) {
    this._ctx.parentCtx.addChild(this._ctx);
  }
}; // Always called by generated parsers upon entry to a rule. Access field
// {@link //_ctx} get the current context.


Parser.prototype.enterRule = function (localctx, state, ruleIndex) {
  this.state = state;
  this._ctx = localctx;
  this._ctx.start = this._input.LT(1);

  if (this.buildParseTrees) {
    this.addContextToParseTree();
  }

  if (this._parseListeners !== null) {
    this.triggerEnterRuleEvent();
  }
};

Parser.prototype.exitRule = function () {
  this._ctx.stop = this._input.LT(-1); // trigger event on _ctx, before it reverts to parent

  if (this._parseListeners !== null) {
    this.triggerExitRuleEvent();
  }

  this.state = this._ctx.invokingState;
  this._ctx = this._ctx.parentCtx;
};

Parser.prototype.enterOuterAlt = function (localctx, altNum) {
  localctx.setAltNumber(altNum); // if we have new localctx, make sure we replace existing ctx
  // that is previous child of parse tree

  if (this.buildParseTrees && this._ctx !== localctx) {
    if (this._ctx.parentCtx !== null) {
      this._ctx.parentCtx.removeLastChild();

      this._ctx.parentCtx.addChild(localctx);
    }
  }

  this._ctx = localctx;
}; // Get the precedence level for the top-most precedence rule.
//
// @return The precedence level for the top-most precedence rule, or -1 if
// the parser context is not nested within a precedence rule.


Parser.prototype.getPrecedence = function () {
  if (this._precedenceStack.length === 0) {
    return -1;
  } else {
    return this._precedenceStack[this._precedenceStack.length - 1];
  }
};

Parser.prototype.enterRecursionRule = function (localctx, state, ruleIndex, precedence) {
  this.state = state;

  this._precedenceStack.push(precedence);

  this._ctx = localctx;
  this._ctx.start = this._input.LT(1);

  if (this._parseListeners !== null) {
    this.triggerEnterRuleEvent(); // simulates rule entry for
    // left-recursive rules
  }
}; //
// Like {@link //enterRule} but for recursive rules.


Parser.prototype.pushNewRecursionContext = function (localctx, state, ruleIndex) {
  var previous = this._ctx;
  previous.parentCtx = localctx;
  previous.invokingState = state;
  previous.stop = this._input.LT(-1);
  this._ctx = localctx;
  this._ctx.start = previous.start;

  if (this.buildParseTrees) {
    this._ctx.addChild(previous);
  }

  if (this._parseListeners !== null) {
    this.triggerEnterRuleEvent(); // simulates rule entry for
    // left-recursive rules
  }
};

Parser.prototype.unrollRecursionContexts = function (parentCtx) {
  this._precedenceStack.pop();

  this._ctx.stop = this._input.LT(-1);
  var retCtx = this._ctx; // save current ctx (return value)
  // unroll so _ctx is as it was before call to recursive method

  if (this._parseListeners !== null) {
    while (this._ctx !== parentCtx) {
      this.triggerExitRuleEvent();
      this._ctx = this._ctx.parentCtx;
    }
  } else {
    this._ctx = parentCtx;
  } // hook into tree


  retCtx.parentCtx = parentCtx;

  if (this.buildParseTrees && parentCtx !== null) {
    // add return ctx into invoking rule's tree
    parentCtx.addChild(retCtx);
  }
};

Parser.prototype.getInvokingContext = function (ruleIndex) {
  var ctx = this._ctx;

  while (ctx !== null) {
    if (ctx.ruleIndex === ruleIndex) {
      return ctx;
    }

    ctx = ctx.parentCtx;
  }

  return null;
};

Parser.prototype.precpred = function (localctx, precedence) {
  return precedence >= this._precedenceStack[this._precedenceStack.length - 1];
};

Parser.prototype.inContext = function (context) {
  // TODO: useful in parser?
  return false;
}; //
// Checks whether or not {@code symbol} can follow the current state in the
// ATN. The behavior of this method is equivalent to the following, but is
// implemented such that the complete context-sensitive follow set does not
// need to be explicitly constructed.
//
// <pre>
// return getExpectedTokens().contains(symbol);
// </pre>
//
// @param symbol the symbol type to check
// @return {@code true} if {@code symbol} can follow the current state in
// the ATN, otherwise {@code false}.


Parser.prototype.isExpectedToken = function (symbol) {
  var atn = this._interp.atn;
  var ctx = this._ctx;
  var s = atn.states[this.state];
  var following = atn.nextTokens(s);

  if (following.contains(symbol)) {
    return true;
  }

  if (!following.contains(Token.EPSILON)) {
    return false;
  }

  while (ctx !== null && ctx.invokingState >= 0 && following.contains(Token.EPSILON)) {
    var invokingState = atn.states[ctx.invokingState];
    var rt = invokingState.transitions[0];
    following = atn.nextTokens(rt.followState);

    if (following.contains(symbol)) {
      return true;
    }

    ctx = ctx.parentCtx;
  }

  if (following.contains(Token.EPSILON) && symbol === Token.EOF) {
    return true;
  } else {
    return false;
  }
}; // Computes the set of input symbols which could follow the current parser
// state and context, as given by {@link //getState} and {@link //getContext},
// respectively.
//
// @see ATN//getExpectedTokens(int, RuleContext)
//


Parser.prototype.getExpectedTokens = function () {
  return this._interp.atn.getExpectedTokens(this.state, this._ctx);
};

Parser.prototype.getExpectedTokensWithinCurrentRule = function () {
  var atn = this._interp.atn;
  var s = atn.states[this.state];
  return atn.nextTokens(s);
}; // Get a rule's index (i.e., {@code RULE_ruleName} field) or -1 if not found.//


Parser.prototype.getRuleIndex = function (ruleName) {
  var ruleIndex = this.getRuleIndexMap()[ruleName];

  if (ruleIndex !== null) {
    return ruleIndex;
  } else {
    return -1;
  }
}; // Return List&lt;String&gt; of the rule names in your parser instance
// leading up to a call to the current rule. You could override if
// you want more details such as the file/line info of where
// in the ATN a rule is invoked.
//
// this is very useful for error messages.
//


Parser.prototype.getRuleInvocationStack = function (p) {
  p = p || null;

  if (p === null) {
    p = this._ctx;
  }

  var stack = [];

  while (p !== null) {
    // compute what follows who invoked us
    var ruleIndex = p.ruleIndex;

    if (ruleIndex < 0) {
      stack.push("n/a");
    } else {
      stack.push(this.ruleNames[ruleIndex]);
    }

    p = p.parentCtx;
  }

  return stack;
}; // For debugging and other purposes.//


Parser.prototype.getDFAStrings = function () {
  return this._interp.decisionToDFA.toString();
}; // For debugging and other purposes.//


Parser.prototype.dumpDFA = function () {
  var seenOne = false;

  for (var i = 0; i < this._interp.decisionToDFA.length; i++) {
    var dfa = this._interp.decisionToDFA[i];

    if (dfa.states.length > 0) {
      if (seenOne) {
        console.log();
      }

      this.printer.println("Decision " + dfa.decision + ":");
      this.printer.print(dfa.toString(this.literalNames, this.symbolicNames));
      seenOne = true;
    }
  }
};
/*
"			printer = function() {\r\n" +
"				this.println = function(s) { document.getElementById('output') += s + '\\n'; }\r\n" +
"				this.print = function(s) { document.getElementById('output') += s; }\r\n" +
"			};\r\n" +
*/


Parser.prototype.getSourceName = function () {
  return this._input.sourceName;
}; // During a parse is sometimes useful to listen in on the rule entry and exit
// events as well as token matches. this is for quick and dirty debugging.
//


Parser.prototype.setTrace = function (trace) {
  if (!trace) {
    this.removeParseListener(this._tracer);
    this._tracer = null;
  } else {
    if (this._tracer !== null) {
      this.removeParseListener(this._tracer);
    }

    this._tracer = new TraceListener(this);
    this.addParseListener(this._tracer);
  }
};

exports.Parser = Parser;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Generated from solidity-antlr4/Solidity.g4 by ANTLR 4.7.2
// jshint ignore: start

var antlr4 = __webpack_require__(13);

var serializedATN = ["\x03\u608B\uA72A\u8133\uB9ED\u417C\u3BE7\u7786\u5964", "\x02y\u06B4\b\x01\x04\x02\t\x02\x04\x03\t\x03\x04", "\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07\t", "\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\x0B\t\x0B\x04", "\f\t\f\x04\r\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10", "\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04\x13\t\x13", "\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17", "\t\x17\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A", "\x04\x1B\t\x1B\x04\x1C\t\x1C\x04\x1D\t\x1D\x04\x1E", "\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#", "\t#\x04$\t$\x04%\t%\x04&\t&\x04'\t'\x04(\t(\x04)\t)\x04", "*\t*\x04+\t+\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x04", "1\t1\x042\t2\x043\t3\x044\t4\x045\t5\x046\t6\x047\t7\x04", "8\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04=\t=\x04>\t>\x04", "?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04", "F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04", "M\tM\x04N\tN\x04O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04", "T\tT\x04U\tU\x04V\tV\x04W\tW\x04X\tX\x04Y\tY\x04Z\tZ\x04", "[\t[\x04\\\t\\\x04]\t]\x04^\t^\x04_\t_\x04`\t`\x04a\ta\x04", "b\tb\x04c\tc\x04d\td\x04e\te\x04f\tf\x04g\tg\x04h\th\x04", "i\ti\x04j\tj\x04k\tk\x04l\tl\x04m\tm\x04n\tn\x04o\to\x04", "p\tp\x04q\tq\x04r\tr\x04s\ts\x04t\tt\x04u\tu\x04v\tv\x04", "w\tw\x04x\tx\x04y\ty\x04z\tz\x04{\t{\x04|\t|\x04}\t}\x04", "~\t~\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03", "\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03", "\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03\x07\x03", "\x07\x03\b\x03\b\x03\t\x03\t\x03\t\x03\n\x03\n\x03", "\x0B\x03\x0B\x03\x0B\x03\f\x03\f\x03\f\x03\f\x03", "\f\x03\f\x03\f\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E", "\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x10\x03\x10", "\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12\x03\x12", "\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x13", "\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13", "\x03\x13\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14", "\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x15", "\x03\x15\x03\x15\x03\x16\x03\x16\x03\x17\x03\x17", "\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18", "\x03\x19\x03\x19\x03\x19\x03\x19\x03\x1A\x03\x1A", "\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1B", "\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B", "\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1C", "\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C", "\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D", "\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1E", "\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E", "\x03\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F", "\x03\x1F\x03 \x03 \x03 \x03 \x03 \x03!\x03!\x03", "\"\x03\"\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03", "$\x03$\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03", "&\x03&\x03&\x03'\x03'\x03'\x03'\x03'\x03'\x03", "'\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03)\x03", ")\x03)\x03)\x03)\x03)\x03)\x03)\x03)\x03*\x03*\x03", "*\x03+\x03+\x03+\x03+\x03+\x03,\x03,\x03,\x03,\x03", ",\x03,\x03-\x03-\x03-\x03-\x03-\x03-\x03-\x03-\x03", "-\x03.\x03.\x03.\x03/\x03/\x03/\x03/\x03/\x03/\x03", "/\x030\x030\x030\x030\x030\x030\x031\x031\x031\x03", "1\x031\x032\x032\x032\x032\x033\x033\x033\x033\x03", "3\x034\x034\x034\x034\x034\x034\x034\x035\x035\x03", "5\x035\x035\x036\x036\x036\x037\x037\x037\x038\x03", "8\x038\x038\x039\x039\x03:\x03:\x03;\x03;\x03;\x03", ";\x03;\x03;\x03<\x03<\x03<\x03<\x03<\x03<\x03<\x03", "=\x03=\x03>\x03>\x03>\x03?\x03?\x03@\x03@\x03A\x03", "A\x03A\x03B\x03B\x03B\x03C\x03C\x03D\x03D\x03E\x03", "E\x03E\x03F\x03F\x03F\x03G\x03G\x03G\x03H\x03H\x03", "H\x03I\x03I\x03J\x03J\x03K\x03K\x03K\x03L\x03L\x03", "L\x03M\x03M\x03M\x03N\x03N\x03N\x03N\x03O\x03O\x03", "O\x03O\x03P\x03P\x03P\x03Q\x03Q\x03Q\x03R\x03R\x03", "R\x03S\x03S\x03S\x03T\x03T\x03T\x03U\x03U\x03U\x03", "U\x03V\x03V\x03V\x03W\x03W\x03W\x03X\x03X\x03X\x03", "X\x03X\x03X\x03X\x03Y\x03Y\x03Y\x03Y\x03Y\x03Z\x03", "Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03[\x03[\x03[\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03", "\\\x03\\\x05\\\u0339\n\\\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03", "]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x05", "]\u0412\n]\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03^\x03", "^\x03^\x05^\u04F0\n^\x03_\x03_\x03_\x03_\x03_\x03_\x03", "_\x03_\x03_\x03_\x03_\x03_\x06_\u04FE\n_\r_\x0E_\u04FF", "\x03_\x03_\x06_\u0504\n_\r_\x0E_\u0505\x05_\u0508\n_\x03", "`\x03`\x03`\x03`\x03`\x03`\x03`\x03`\x03`\x03`\x03", "`\x03`\x03`\x03`\x06`\u0518\n`\r`\x0E`\u0519\x03`\x03", "`\x06`\u051E\n`\r`\x0E`\u051F\x05`\u0522\n`\x03a\x06a\u0525", "\na\ra\x0Ea\u0526\x03a\x03a\x06a\u052B\na\ra\x0Ea\u052C\x03", "a\x03a\x06a\u0531\na\ra\x0Ea\u0532\x03b\x03b\x03b\x03", "b\x03b\x03b\x03b\x03b\x03b\x05b\u053E\nb\x03c\x06c\u0541", "\nc\rc\x0Ec\u0542\x03c\x07c\u0546\nc\fc\x0Ec\u0549\x0Bc\x03", "c\x03c\x06c\u054D\nc\rc\x0Ec\u054E\x05c\u0551\nc\x03c\x03", "c\x06c\u0555\nc\rc\x0Ec\u0556\x05c\u0559\nc\x03d\x03d\x03", "d\x06d\u055E\nd\rd\x0Ed\u055F\x03e\x03e\x03e\x03e\x03", "e\x03e\x03e\x03e\x03e\x03e\x03e\x03e\x03e\x03e\x03", "e\x03e\x03e\x03e\x03e\x03e\x03e\x03e\x03e\x03e\x03", "e\x03e\x03e\x03e\x03e\x03e\x03e\x03e\x03e\x03e\x03", "e\x03e\x03e\x03e\x03e\x03e\x03e\x03e\x03e\x03e\x03", "e\x03e\x03e\x03e\x03e\x03e\x03e\x03e\x05e\u0596\ne\x03", "f\x03f\x03f\x03f\x03f\x03f\x07f\u059E\nf\ff\x0Ef\u05A1", "\x0Bf\x03f\x03f\x03f\x07f\u05A6\nf\ff\x0Ef\u05A9\x0Bf", "\x03f\x05f\u05AC\nf\x03g\x03g\x03g\x03h\x03h\x03i\x03", "i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03", "i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03", "i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03", "i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03", "i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03", "i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03", "i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03", "i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03", "i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03i\x03", "i\x05i\u060F\ni\x03j\x03j\x03j\x03j\x03j\x03j\x03j\x03", "j\x03j\x03j\x03k\x03k\x03k\x03k\x03k\x03k\x03l\x03", "l\x03l\x03l\x03l\x03l\x03l\x03l\x03l\x03m\x03m\x03", "m\x03m\x03m\x03m\x03m\x03m\x03m\x03n\x03n\x03n\x03", "n\x03n\x03n\x03n\x03n\x03n\x03o\x03o\x03o\x03o\x03", "o\x03o\x03o\x03o\x03p\x03p\x03p\x03p\x03p\x03p\x03", "p\x03p\x03p\x03q\x03q\x03q\x03q\x03q\x03q\x03q\x03", "q\x03r\x03r\x03r\x03r\x03r\x03r\x03r\x03r\x03s\x03", "s\x03s\x03s\x03s\x03s\x03s\x03t\x03t\x03t\x03t\x03", "t\x03u\x03u\x03u\x03u\x03u\x03v\x03v\x07v\u0670\nv\f", "v\x0Ev\u0673\x0Bv\x03w\x03w\x03x\x03x\x03y\x03y\x07", "y\u067B\ny\fy\x0Ey\u067E\x0By\x03y\x03y\x03y\x07y\u0683", "\ny\fy\x0Ey\u0686\x0By\x03y\x05y\u0689\ny\x03z\x03z\x03", "z\x05z\u068E\nz\x03{\x03{\x03{\x05{\u0693\n{\x03|\x06", "|\u0696\n|\r|\x0E|\u0697\x03|\x03|\x03}\x03}\x03}\x03", "}\x07}\u06A0\n}\f}\x0E}\u06A3\x0B}\x03}\x03}\x03}\x03", "}\x03}\x03~\x03~\x03~\x03~\x07~\u06AE\n~\f~\x0E~\u06B1", "\x0B~\x03~\x03~\x03\u06A1\x02\x7F\x03\x03\x05\x04", "\x07\x05\t\x06\x0B\x07\r\b\x0F\t\x11\n\x13\x0B\x15", "\f\x17\r\x19\x0E\x1B\x0F\x1D\x10\x1F\x11!\x12#\x13", "%\x14'\x15)\x16+\x17-\x18/\x191\x1A3\x1B5\x1C7\x1D", "9\x1E;\x1F= ?!A\"C#E$G%I&K'M(O)Q*S+U,W-Y.[/]0_1a2c3e4g5i6k7m8o", "9q:s;u<w=y>{?}@\x7FA\x81B\x83C\x85D\x87E\x89F\x8BG\x8D", "H\x8FI\x91J\x93K\x95L\x97M\x99N\x9BO\x9DP\x9FQ\xA1", "R\xA3S\xA5T\xA7U\xA9V\xABW\xADX\xAFY\xB1Z\xB3[\xB5", "\\\xB7]\xB9^\xBB_\xBD`\xBFa\xC1b\xC3c\xC5d\xC7e\xC9", "f\xCBg\xCD\x02\xCF\x02\xD1h\xD3i\xD5j\xD7k\xD9l", "\xDBm\xDDn\xDFo\xE1p\xE3q\xE5r\xE7s\xE9t\xEBu\xED", "\x02\xEF\x02\xF1v\xF3\x02\xF5\x02\xF7w\xF9x\xFB", "y\x03\x02\f\x03\x022;\x04\x02GGgg\x04\x02ZZzz\x05", "\x022;CHch\x06\x02&&C\\aac|\x07\x02&&2;C\\aac|\x06\x02", "\f\f\x0F\x0F$$^^\x06\x02\f\f\x0F\x0F))^^\x05\x02\x0B", "\f\x0E\x0F\"\"\x04\x02\f\f\x0F\x0F\x02\u0744\x02\x03", "\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07", "\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\x0B", "\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x02\x0F", "\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13", "\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17", "\x03\x02\x02\x02\x02\x19\x03\x02\x02\x02\x02\x1B", "\x03\x02\x02\x02\x02\x1D\x03\x02\x02\x02\x02\x1F", "\x03\x02\x02\x02\x02!\x03\x02\x02\x02\x02#\x03", "\x02\x02\x02\x02%\x03\x02\x02\x02\x02'\x03\x02", "\x02\x02\x02)\x03\x02\x02\x02\x02+\x03\x02\x02", "\x02\x02-\x03\x02\x02\x02\x02/\x03\x02\x02\x02", "\x021\x03\x02\x02\x02\x023\x03\x02\x02\x02\x02", "5\x03\x02\x02\x02\x027\x03\x02\x02\x02\x029\x03", "\x02\x02\x02\x02;\x03\x02\x02\x02\x02=\x03\x02", "\x02\x02\x02?\x03\x02\x02\x02\x02A\x03\x02\x02", "\x02\x02C\x03\x02\x02\x02\x02E\x03\x02\x02\x02", "\x02G\x03\x02\x02\x02\x02I\x03\x02\x02\x02\x02", "K\x03\x02\x02\x02\x02M\x03\x02\x02\x02\x02O\x03", "\x02\x02\x02\x02Q\x03\x02\x02\x02\x02S\x03\x02", "\x02\x02\x02U\x03\x02\x02\x02\x02W\x03\x02\x02", "\x02\x02Y\x03\x02\x02\x02\x02[\x03\x02\x02\x02", "\x02]\x03\x02\x02\x02\x02_\x03\x02\x02\x02\x02", "a\x03\x02\x02\x02\x02c\x03\x02\x02\x02\x02e\x03", "\x02\x02\x02\x02g\x03\x02\x02\x02\x02i\x03\x02", "\x02\x02\x02k\x03\x02\x02\x02\x02m\x03\x02\x02", "\x02\x02o\x03\x02\x02\x02\x02q\x03\x02\x02\x02", "\x02s\x03\x02\x02\x02\x02u\x03\x02\x02\x02\x02", "w\x03\x02\x02\x02\x02y\x03\x02\x02\x02\x02{\x03", "\x02\x02\x02\x02}\x03\x02\x02\x02\x02\x7F\x03", "\x02\x02\x02\x02\x81\x03\x02\x02\x02\x02\x83\x03", "\x02\x02\x02\x02\x85\x03\x02\x02\x02\x02\x87\x03", "\x02\x02\x02\x02\x89\x03\x02\x02\x02\x02\x8B\x03", "\x02\x02\x02\x02\x8D\x03\x02\x02\x02\x02\x8F\x03", "\x02\x02\x02\x02\x91\x03\x02\x02\x02\x02\x93\x03", "\x02\x02\x02\x02\x95\x03\x02\x02\x02\x02\x97\x03", "\x02\x02\x02\x02\x99\x03\x02\x02\x02\x02\x9B\x03", "\x02\x02\x02\x02\x9D\x03\x02\x02\x02\x02\x9F\x03", "\x02\x02\x02\x02\xA1\x03\x02\x02\x02\x02\xA3\x03", "\x02\x02\x02\x02\xA5\x03\x02\x02\x02\x02\xA7\x03", "\x02\x02\x02\x02\xA9\x03\x02\x02\x02\x02\xAB\x03", "\x02\x02\x02\x02\xAD\x03\x02\x02\x02\x02\xAF\x03", "\x02\x02\x02\x02\xB1\x03\x02\x02\x02\x02\xB3\x03", "\x02\x02\x02\x02\xB5\x03\x02\x02\x02\x02\xB7\x03", "\x02\x02\x02\x02\xB9\x03\x02\x02\x02\x02\xBB\x03", "\x02\x02\x02\x02\xBD\x03\x02\x02\x02\x02\xBF\x03", "\x02\x02\x02\x02\xC1\x03\x02\x02\x02\x02\xC3\x03", "\x02\x02\x02\x02\xC5\x03\x02\x02\x02\x02\xC7\x03", "\x02\x02\x02\x02\xC9\x03\x02\x02\x02\x02\xCB\x03", "\x02\x02\x02\x02\xD1\x03\x02\x02\x02\x02\xD3\x03", "\x02\x02\x02\x02\xD5\x03\x02\x02\x02\x02\xD7\x03", "\x02\x02\x02\x02\xD9\x03\x02\x02\x02\x02\xDB\x03", "\x02\x02\x02\x02\xDD\x03\x02\x02\x02\x02\xDF\x03", "\x02\x02\x02\x02\xE1\x03\x02\x02\x02\x02\xE3\x03", "\x02\x02\x02\x02\xE5\x03\x02\x02\x02\x02\xE7\x03", "\x02\x02\x02\x02\xE9\x03\x02\x02\x02\x02\xEB\x03", "\x02\x02\x02\x02\xF1\x03\x02\x02\x02\x02\xF7\x03", "\x02\x02\x02\x02\xF9\x03\x02\x02\x02\x02\xFB\x03", "\x02\x02\x02\x03\xFD\x03\x02\x02\x02\x05\u0104\x03", "\x02\x02\x02\x07\u0106\x03\x02\x02\x02\t\u0108\x03", "\x02\x02\x02\x0B\u010A\x03\x02\x02\x02\r\u010D\x03", "\x02\x02\x02\x0F\u010F\x03\x02\x02\x02\x11\u0111\x03", "\x02\x02\x02\x13\u0114\x03\x02\x02\x02\x15\u0116\x03", "\x02\x02\x02\x17\u0119\x03\x02\x02\x02\x19\u0120\x03", "\x02\x02\x02\x1B\u0122\x03\x02\x02\x02\x1D\u0127\x03", "\x02\x02\x02\x1F\u0129\x03\x02\x02\x02!\u012B\x03", "\x02\x02\x02#\u012D\x03\x02\x02\x02%\u0136\x03\x02", "\x02\x02'\u0140\x03\x02\x02\x02)\u0148\x03\x02\x02", "\x02+\u014B\x03\x02\x02\x02-\u014D\x03\x02\x02\x02", "/\u014F\x03\x02\x02\x021\u0155\x03\x02\x02\x023\u0159", "\x03\x02\x02\x025\u0160\x03\x02\x02\x027\u016C\x03", "\x02\x02\x029\u0175\x03\x02\x02\x02;\u017E\x03\x02", "\x02\x02=\u0186\x03\x02\x02\x02?\u018C\x03\x02\x02", "\x02A\u0191\x03\x02\x02\x02C\u0193\x03\x02\x02\x02", "E\u0195\x03\x02\x02\x02G\u019D\x03\x02\x02\x02I\u019F", "\x03\x02\x02\x02K\u01A7\x03\x02\x02\x02M\u01AA\x03", "\x02\x02\x02O\u01B1\x03\x02\x02\x02Q\u01B9\x03\x02", "\x02\x02S\u01C2\x03\x02\x02\x02U\u01C5\x03\x02\x02", "\x02W\u01CA\x03\x02\x02\x02Y\u01D0\x03\x02\x02\x02", "[\u01D9\x03\x02\x02\x02]\u01DC\x03\x02\x02\x02_\u01E3", "\x03\x02\x02\x02a\u01E9\x03\x02\x02\x02c\u01EE\x03", "\x02\x02\x02e\u01F2\x03\x02\x02\x02g\u01F7\x03\x02", "\x02\x02i\u01FE\x03\x02\x02\x02k\u0203\x03\x02\x02", "\x02m\u0206\x03\x02\x02\x02o\u0209\x03\x02\x02\x02", "q\u020D\x03\x02\x02\x02s\u020F\x03\x02\x02\x02u\u0211", "\x03\x02\x02\x02w\u0217\x03\x02\x02\x02y\u021E\x03", "\x02\x02\x02{\u0220\x03\x02\x02\x02}\u0223\x03\x02", "\x02\x02\x7F\u0225\x03\x02\x02\x02\x81\u0227\x03\x02", "\x02\x02\x83\u022A\x03\x02\x02\x02\x85\u022D\x03\x02", "\x02\x02\x87\u022F\x03\x02\x02\x02\x89\u0231\x03\x02", "\x02\x02\x8B\u0234\x03\x02\x02\x02\x8D\u0237\x03\x02", "\x02\x02\x8F\u023A\x03\x02\x02\x02\x91\u023D\x03\x02", "\x02\x02\x93\u023F\x03\x02\x02\x02\x95\u0241\x03\x02", "\x02\x02\x97\u0244\x03\x02\x02\x02\x99\u0247\x03\x02", "\x02\x02\x9B\u024A\x03\x02\x02\x02\x9D\u024E\x03\x02", "\x02\x02\x9F\u0252\x03\x02\x02\x02\xA1\u0255\x03\x02", "\x02\x02\xA3\u0258\x03\x02\x02\x02\xA5\u025B\x03\x02", "\x02\x02\xA7\u025E\x03\x02\x02\x02\xA9\u0261\x03\x02", "\x02\x02\xAB\u0265\x03\x02\x02\x02\xAD\u0268\x03\x02", "\x02\x02\xAF\u026B\x03\x02\x02\x02\xB1\u0272\x03\x02", "\x02\x02\xB3\u0277\x03\x02\x02\x02\xB5\u027F\x03\x02", "\x02\x02\xB7\u0338\x03\x02\x02\x02\xB9\u0411\x03\x02", "\x02\x02\xBB\u04EF\x03\x02\x02\x02\xBD\u0507\x03\x02", "\x02\x02\xBF\u0521\x03\x02\x02\x02\xC1\u0524\x03\x02", "\x02\x02\xC3\u053D\x03\x02\x02\x02\xC5\u0550\x03\x02", "\x02\x02\xC7\u055A\x03\x02\x02\x02\xC9\u0595\x03\x02", "\x02\x02\xCB\u0597\x03\x02\x02\x02\xCD\u05AD\x03\x02", "\x02\x02\xCF\u05B0\x03\x02\x02\x02\xD1\u060E\x03\x02", "\x02\x02\xD3\u0610\x03\x02\x02\x02\xD5\u061A\x03\x02", "\x02\x02\xD7\u0620\x03\x02\x02\x02\xD9\u0629\x03\x02", "\x02\x02\xDB\u0632\x03\x02\x02\x02\xDD\u063B\x03\x02", "\x02\x02\xDF\u0643\x03\x02\x02\x02\xE1\u064C\x03\x02", "\x02\x02\xE3\u0654\x03\x02\x02\x02\xE5\u065C\x03\x02", "\x02\x02\xE7\u0663\x03\x02\x02\x02\xE9\u0668\x03\x02", "\x02\x02\xEB\u066D\x03\x02\x02\x02\xED\u0674\x03\x02", "\x02\x02\xEF\u0676\x03\x02\x02\x02\xF1\u0688\x03\x02", "\x02\x02\xF3\u068D\x03\x02\x02\x02\xF5\u0692\x03\x02", "\x02\x02\xF7\u0695\x03\x02\x02\x02\xF9\u069B\x03\x02", "\x02\x02\xFB\u06A9\x03\x02\x02\x02\xFD\xFE\x07r", "\x02\x02\xFE\xFF\x07t\x02\x02\xFF\u0100\x07c\x02", "\x02\u0100\u0101\x07i\x02\x02\u0101\u0102\x07o\x02\x02", "\u0102\u0103\x07c\x02\x02\u0103\x04\x03\x02\x02\x02", "\u0104\u0105\x07=\x02\x02\u0105\x06\x03\x02\x02\x02", "\u0106\u0107\x07`\x02\x02\u0107\b\x03\x02\x02\x02\u0108", "\u0109\x07\x80\x02\x02\u0109\n\x03\x02\x02\x02\u010A", "\u010B\x07@\x02\x02\u010B\u010C\x07?\x02\x02\u010C\f\x03", "\x02\x02\x02\u010D\u010E\x07@\x02\x02\u010E\x0E\x03", "\x02\x02\x02\u010F\u0110\x07>\x02\x02\u0110\x10\x03", "\x02\x02\x02\u0111\u0112\x07>\x02\x02\u0112\u0113\x07", "?\x02\x02\u0113\x12\x03\x02\x02\x02\u0114\u0115\x07", "?\x02\x02\u0115\x14\x03\x02\x02\x02\u0116\u0117\x07", "c\x02\x02\u0117\u0118\x07u\x02\x02\u0118\x16\x03\x02", "\x02\x02\u0119\u011A\x07k\x02\x02\u011A\u011B\x07o\x02", "\x02\u011B\u011C\x07r\x02\x02\u011C\u011D\x07q\x02\x02", "\u011D\u011E\x07t\x02\x02\u011E\u011F\x07v\x02\x02\u011F", "\x18\x03\x02\x02\x02\u0120\u0121\x07,\x02\x02\u0121", "\x1A\x03\x02\x02\x02\u0122\u0123\x07h\x02\x02\u0123", "\u0124\x07t\x02\x02\u0124\u0125\x07q\x02\x02\u0125\u0126", "\x07o\x02\x02\u0126\x1C\x03\x02\x02\x02\u0127\u0128", "\x07}\x02\x02\u0128\x1E\x03\x02\x02\x02\u0129\u012A", "\x07.\x02\x02\u012A \x03\x02\x02\x02\u012B\u012C\x07", "\x7F\x02\x02\u012C\"\x03\x02\x02\x02\u012D\u012E\x07", "e\x02\x02\u012E\u012F\x07q\x02\x02\u012F\u0130\x07p\x02", "\x02\u0130\u0131\x07v\x02\x02\u0131\u0132\x07t\x02\x02", "\u0132\u0133\x07c\x02\x02\u0133\u0134\x07e\x02\x02\u0134", "\u0135\x07v\x02\x02\u0135$\x03\x02\x02\x02\u0136\u0137", "\x07k\x02\x02\u0137\u0138\x07p\x02\x02\u0138\u0139\x07", "v\x02\x02\u0139\u013A\x07g\x02\x02\u013A\u013B\x07t\x02", "\x02\u013B\u013C\x07h\x02\x02\u013C\u013D\x07c\x02\x02", "\u013D\u013E\x07e\x02\x02\u013E\u013F\x07g\x02\x02\u013F", "&\x03\x02\x02\x02\u0140\u0141\x07n\x02\x02\u0141\u0142", "\x07k\x02\x02\u0142\u0143\x07d\x02\x02\u0143\u0144\x07", "t\x02\x02\u0144\u0145\x07c\x02\x02\u0145\u0146\x07t\x02", "\x02\u0146\u0147\x07{\x02\x02\u0147(\x03\x02\x02\x02", "\u0148\u0149\x07k\x02\x02\u0149\u014A\x07u\x02\x02\u014A", "*\x03\x02\x02\x02\u014B\u014C\x07*\x02\x02\u014C,\x03", "\x02\x02\x02\u014D\u014E\x07+\x02\x02\u014E.\x03\x02", "\x02\x02\u014F\u0150\x07w\x02\x02\u0150\u0151\x07u\x02", "\x02\u0151\u0152\x07k\x02\x02\u0152\u0153\x07p\x02\x02", "\u0153\u0154\x07i\x02\x02\u01540\x03\x02\x02\x02\u0155", "\u0156\x07h\x02\x02\u0156\u0157\x07q\x02\x02\u0157\u0158", "\x07t\x02\x02\u01582\x03\x02\x02\x02\u0159\u015A\x07", "u\x02\x02\u015A\u015B\x07v\x02\x02\u015B\u015C\x07t\x02", "\x02\u015C\u015D\x07w\x02\x02\u015D\u015E\x07e\x02\x02", "\u015E\u015F\x07v\x02\x02\u015F4\x03\x02\x02\x02\u0160", "\u0161\x07e\x02\x02\u0161\u0162\x07q\x02\x02\u0162\u0163", "\x07p\x02\x02\u0163\u0164\x07u\x02\x02\u0164\u0165\x07", "v\x02\x02\u0165\u0166\x07t\x02\x02\u0166\u0167\x07w\x02", "\x02\u0167\u0168\x07e\x02\x02\u0168\u0169\x07v\x02\x02", "\u0169\u016A\x07q\x02\x02\u016A\u016B\x07t\x02\x02\u016B", "6\x03\x02\x02\x02\u016C\u016D\x07o\x02\x02\u016D\u016E", "\x07q\x02\x02\u016E\u016F\x07f\x02\x02\u016F\u0170\x07", "k\x02\x02\u0170\u0171\x07h\x02\x02\u0171\u0172\x07k\x02", "\x02\u0172\u0173\x07g\x02\x02\u0173\u0174\x07t\x02\x02", "\u01748\x03\x02\x02\x02\u0175\u0176\x07h\x02\x02\u0176", "\u0177\x07w\x02\x02\u0177\u0178\x07p\x02\x02\u0178\u0179", "\x07e\x02\x02\u0179\u017A\x07v\x02\x02\u017A\u017B\x07", "k\x02\x02\u017B\u017C\x07q\x02\x02\u017C\u017D\x07p\x02", "\x02\u017D:\x03\x02\x02\x02\u017E\u017F\x07t\x02\x02", "\u017F\u0180\x07g\x02\x02\u0180\u0181\x07v\x02\x02\u0181", "\u0182\x07w\x02\x02\u0182\u0183\x07t\x02\x02\u0183\u0184", "\x07p\x02\x02\u0184\u0185\x07u\x02\x02\u0185<\x03\x02", "\x02\x02\u0186\u0187\x07g\x02\x02\u0187\u0188\x07x\x02", "\x02\u0188\u0189\x07g\x02\x02\u0189\u018A\x07p\x02\x02", "\u018A\u018B\x07v\x02\x02\u018B>\x03\x02\x02\x02\u018C", "\u018D\x07g\x02\x02\u018D\u018E\x07p\x02\x02\u018E\u018F", "\x07w\x02\x02\u018F\u0190\x07o\x02\x02\u0190@\x03\x02", "\x02\x02\u0191\u0192\x07]\x02\x02\u0192B\x03\x02\x02", "\x02\u0193\u0194\x07_\x02\x02\u0194D\x03\x02\x02\x02", "\u0195\u0196\x07c\x02\x02\u0196\u0197\x07f\x02\x02\u0197", "\u0198\x07f\x02\x02\u0198\u0199\x07t\x02\x02\u0199\u019A", "\x07g\x02\x02\u019A\u019B\x07u\x02\x02\u019B\u019C\x07", "u\x02\x02\u019CF\x03\x02\x02\x02\u019D\u019E\x070\x02", "\x02\u019EH\x03\x02\x02\x02\u019F\u01A0\x07o\x02\x02", "\u01A0\u01A1\x07c\x02\x02\u01A1\u01A2\x07r\x02\x02\u01A2", "\u01A3\x07r\x02\x02\u01A3\u01A4\x07k\x02\x02\u01A4\u01A5", "\x07p\x02\x02\u01A5\u01A6\x07i\x02\x02\u01A6J\x03\x02", "\x02\x02\u01A7\u01A8\x07?\x02\x02\u01A8\u01A9\x07@\x02", "\x02\u01A9L\x03\x02\x02\x02\u01AA\u01AB\x07o\x02\x02", "\u01AB\u01AC\x07g\x02\x02\u01AC\u01AD\x07o\x02\x02\u01AD", "\u01AE\x07q\x02\x02\u01AE\u01AF\x07t\x02\x02\u01AF\u01B0", "\x07{\x02\x02\u01B0N\x03\x02\x02\x02\u01B1\u01B2\x07", "u\x02\x02\u01B2\u01B3\x07v\x02\x02\u01B3\u01B4\x07q\x02", "\x02\u01B4\u01B5\x07t\x02\x02\u01B5\u01B6\x07c\x02\x02", "\u01B6\u01B7\x07i\x02\x02\u01B7\u01B8\x07g\x02\x02\u01B8", "P\x03\x02\x02\x02\u01B9\u01BA\x07e\x02\x02\u01BA\u01BB", "\x07c\x02\x02\u01BB\u01BC\x07n\x02\x02\u01BC\u01BD\x07", "n\x02\x02\u01BD\u01BE\x07f\x02\x02\u01BE\u01BF\x07c\x02", "\x02\u01BF\u01C0\x07v\x02\x02\u01C0\u01C1\x07c\x02\x02", "\u01C1R\x03\x02\x02\x02\u01C2\u01C3\x07k\x02\x02\u01C3", "\u01C4\x07h\x02\x02\u01C4T\x03\x02\x02\x02\u01C5\u01C6", "\x07g\x02\x02\u01C6\u01C7\x07n\x02\x02\u01C7\u01C8\x07", "u\x02\x02\u01C8\u01C9\x07g\x02\x02\u01C9V\x03\x02\x02", "\x02\u01CA\u01CB\x07y\x02\x02\u01CB\u01CC\x07j\x02\x02", "\u01CC\u01CD\x07k\x02\x02\u01CD\u01CE\x07n\x02\x02\u01CE", "\u01CF\x07g\x02\x02\u01CFX\x03\x02\x02\x02\u01D0\u01D1", "\x07c\x02\x02\u01D1\u01D2\x07u\x02\x02\u01D2\u01D3\x07", "u\x02\x02\u01D3\u01D4\x07g\x02\x02\u01D4\u01D5\x07o\x02", "\x02\u01D5\u01D6\x07d\x02\x02\u01D6\u01D7\x07n\x02\x02", "\u01D7\u01D8\x07{\x02\x02\u01D8Z\x03\x02\x02\x02\u01D9", "\u01DA\x07f\x02\x02\u01DA\u01DB\x07q\x02\x02\u01DB\\\x03", "\x02\x02\x02\u01DC\u01DD\x07t\x02\x02\u01DD\u01DE\x07", "g\x02\x02\u01DE\u01DF\x07v\x02\x02\u01DF\u01E0\x07w\x02", "\x02\u01E0\u01E1\x07t\x02\x02\u01E1\u01E2\x07p\x02\x02", "\u01E2^\x03\x02\x02\x02\u01E3\u01E4\x07v\x02\x02\u01E4", "\u01E5\x07j\x02\x02\u01E5\u01E6\x07t\x02\x02\u01E6\u01E7", "\x07q\x02\x02\u01E7\u01E8\x07y\x02\x02\u01E8`\x03\x02", "\x02\x02\u01E9\u01EA\x07g\x02\x02\u01EA\u01EB\x07o\x02", "\x02\u01EB\u01EC\x07k\x02\x02\u01EC\u01ED\x07v\x02\x02", "\u01EDb\x03\x02\x02\x02\u01EE\u01EF\x07x\x02\x02\u01EF", "\u01F0\x07c\x02\x02\u01F0\u01F1\x07t\x02\x02\u01F1d\x03", "\x02\x02\x02\u01F2\u01F3\x07d\x02\x02\u01F3\u01F4\x07", "q\x02\x02\u01F4\u01F5\x07q\x02\x02\u01F5\u01F6\x07n\x02", "\x02\u01F6f\x03\x02\x02\x02\u01F7\u01F8\x07u\x02\x02", "\u01F8\u01F9\x07v\x02\x02\u01F9\u01FA\x07t\x02\x02\u01FA", "\u01FB\x07k\x02\x02\u01FB\u01FC\x07p\x02\x02\u01FC\u01FD", "\x07i\x02\x02\u01FDh\x03\x02\x02\x02\u01FE\u01FF\x07", "d\x02\x02\u01FF\u0200\x07{\x02\x02\u0200\u0201\x07v\x02", "\x02\u0201\u0202\x07g\x02\x02\u0202j\x03\x02\x02\x02", "\u0203\u0204\x07-\x02\x02\u0204\u0205\x07-\x02\x02\u0205", "l\x03\x02\x02\x02\u0206\u0207\x07/\x02\x02\u0207\u0208", "\x07/\x02\x02\u0208n\x03\x02\x02\x02\u0209\u020A\x07", "p\x02\x02\u020A\u020B\x07g\x02\x02\u020B\u020C\x07y\x02", "\x02\u020Cp\x03\x02\x02\x02\u020D\u020E\x07-\x02\x02", "\u020Er\x03\x02\x02\x02\u020F\u0210\x07/\x02\x02\u0210", "t\x03\x02\x02\x02\u0211\u0212\x07c\x02\x02\u0212\u0213", "\x07h\x02\x02\u0213\u0214\x07v\x02\x02\u0214\u0215\x07", "g\x02\x02\u0215\u0216\x07t\x02\x02\u0216v\x03\x02\x02", "\x02\u0217\u0218\x07f\x02\x02\u0218\u0219\x07g\x02\x02", "\u0219\u021A\x07n\x02\x02\u021A\u021B\x07g\x02\x02\u021B", "\u021C\x07v\x02\x02\u021C\u021D\x07g\x02\x02\u021Dx\x03", "\x02\x02\x02\u021E\u021F\x07#\x02\x02\u021Fz\x03\x02", "\x02\x02\u0220\u0221\x07,\x02\x02\u0221\u0222\x07,\x02", "\x02\u0222|\x03\x02\x02\x02\u0223\u0224\x071\x02\x02", "\u0224~\x03\x02\x02\x02\u0225\u0226\x07'\x02\x02\u0226", "\x80\x03\x02\x02\x02\u0227\u0228\x07>\x02\x02\u0228", "\u0229\x07>\x02\x02\u0229\x82\x03\x02\x02\x02\u022A", "\u022B\x07@\x02\x02\u022B\u022C\x07@\x02\x02\u022C\x84", "\x03\x02\x02\x02\u022D\u022E\x07(\x02\x02\u022E\x86", "\x03\x02\x02\x02\u022F\u0230\x07~\x02\x02\u0230\x88", "\x03\x02\x02\x02\u0231\u0232\x07?\x02\x02\u0232\u0233", "\x07?\x02\x02\u0233\x8A\x03\x02\x02\x02\u0234\u0235", "\x07#\x02\x02\u0235\u0236\x07?\x02\x02\u0236\x8C\x03", "\x02\x02\x02\u0237\u0238\x07(\x02\x02\u0238\u0239\x07", "(\x02\x02\u0239\x8E\x03\x02\x02\x02\u023A\u023B\x07", "~\x02\x02\u023B\u023C\x07~\x02\x02\u023C\x90\x03\x02", "\x02\x02\u023D\u023E\x07A\x02\x02\u023E\x92\x03\x02", "\x02\x02\u023F\u0240\x07<\x02\x02\u0240\x94\x03\x02", "\x02\x02\u0241\u0242\x07~\x02\x02\u0242\u0243\x07?\x02", "\x02\u0243\x96\x03\x02\x02\x02\u0244\u0245\x07`\x02", "\x02\u0245\u0246\x07?\x02\x02\u0246\x98\x03\x02\x02", "\x02\u0247\u0248\x07(\x02\x02\u0248\u0249\x07?\x02\x02", "\u0249\x9A\x03\x02\x02\x02\u024A\u024B\x07>\x02\x02", "\u024B\u024C\x07>\x02\x02\u024C\u024D\x07?\x02\x02\u024D", "\x9C\x03\x02\x02\x02\u024E\u024F\x07@\x02\x02\u024F", "\u0250\x07@\x02\x02\u0250\u0251\x07?\x02\x02\u0251\x9E", "\x03\x02\x02\x02\u0252\u0253\x07-\x02\x02\u0253\u0254", "\x07?\x02\x02\u0254\xA0\x03\x02\x02\x02\u0255\u0256", "\x07/\x02\x02\u0256\u0257\x07?\x02\x02\u0257\xA2\x03", "\x02\x02\x02\u0258\u0259\x07,\x02\x02\u0259\u025A\x07", "?\x02\x02\u025A\xA4\x03\x02\x02\x02\u025B\u025C\x07", "1\x02\x02\u025C\u025D\x07?\x02\x02\u025D\xA6\x03\x02", "\x02\x02\u025E\u025F\x07'\x02\x02\u025F\u0260\x07?\x02", "\x02\u0260\xA8\x03\x02\x02\x02\u0261\u0262\x07n\x02", "\x02\u0262\u0263\x07g\x02\x02\u0263\u0264\x07v\x02\x02", "\u0264\xAA\x03\x02\x02\x02\u0265\u0266\x07<\x02\x02", "\u0266\u0267\x07?\x02\x02\u0267\xAC\x03\x02\x02\x02", "\u0268\u0269\x07?\x02\x02\u0269\u026A\x07<\x02\x02\u026A", "\xAE\x03\x02\x02\x02\u026B\u026C\x07u\x02\x02\u026C", "\u026D\x07y\x02\x02\u026D\u026E\x07k\x02\x02\u026E\u026F", "\x07v\x02\x02\u026F\u0270\x07e\x02\x02\u0270\u0271\x07", "j\x02\x02\u0271\xB0\x03\x02\x02\x02\u0272\u0273\x07", "e\x02\x02\u0273\u0274\x07c\x02\x02\u0274\u0275\x07u\x02", "\x02\u0275\u0276\x07g\x02\x02\u0276\xB2\x03\x02\x02", "\x02\u0277\u0278\x07f\x02\x02\u0278\u0279\x07g\x02\x02", "\u0279\u027A\x07h\x02\x02\u027A\u027B\x07c\x02\x02\u027B", "\u027C\x07w\x02\x02\u027C\u027D\x07n\x02\x02\u027D\u027E", "\x07v\x02\x02\u027E\xB4\x03\x02\x02\x02\u027F\u0280", "\x07/\x02\x02\u0280\u0281\x07@\x02\x02\u0281\xB6\x03", "\x02\x02\x02\u0282\u0283\x07k\x02\x02\u0283\u0284\x07", "p\x02\x02\u0284\u0339\x07v\x02\x02\u0285\u0286\x07k\x02", "\x02\u0286\u0287\x07p\x02\x02\u0287\u0288\x07v\x02\x02", "\u0288\u0339\x07:\x02\x02\u0289\u028A\x07k\x02\x02\u028A", "\u028B\x07p\x02\x02\u028B\u028C\x07v\x02\x02\u028C\u028D", "\x073\x02\x02\u028D\u0339\x078\x02\x02\u028E\u028F\x07", "k\x02\x02\u028F\u0290\x07p\x02\x02\u0290\u0291\x07v\x02", "\x02\u0291\u0292\x074\x02\x02\u0292\u0339\x076\x02\x02", "\u0293\u0294\x07k\x02\x02\u0294\u0295\x07p\x02\x02\u0295", "\u0296\x07v\x02\x02\u0296\u0297\x075\x02\x02\u0297\u0339", "\x074\x02\x02\u0298\u0299\x07k\x02\x02\u0299\u029A\x07", "p\x02\x02\u029A\u029B\x07v\x02\x02\u029B\u029C\x076\x02", "\x02\u029C\u0339\x072\x02\x02\u029D\u029E\x07k\x02\x02", "\u029E\u029F\x07p\x02\x02\u029F\u02A0\x07v\x02\x02\u02A0", "\u02A1\x076\x02\x02\u02A1\u0339\x07:\x02\x02\u02A2\u02A3", "\x07k\x02\x02\u02A3\u02A4\x07p\x02\x02\u02A4\u02A5\x07", "v\x02\x02\u02A5\u02A6\x077\x02\x02\u02A6\u0339\x078\x02", "\x02\u02A7\u02A8\x07k\x02\x02\u02A8\u02A9\x07p\x02\x02", "\u02A9\u02AA\x07v\x02\x02\u02AA\u02AB\x078\x02\x02\u02AB", "\u0339\x076\x02\x02\u02AC\u02AD\x07k\x02\x02\u02AD\u02AE", "\x07p\x02\x02\u02AE\u02AF\x07v\x02\x02\u02AF\u02B0\x07", "9\x02\x02\u02B0\u0339\x074\x02\x02\u02B1\u02B2\x07k\x02", "\x02\u02B2\u02B3\x07p\x02\x02\u02B3\u02B4\x07v\x02\x02", "\u02B4\u02B5\x07:\x02\x02\u02B5\u0339\x072\x02\x02\u02B6", "\u02B7\x07k\x02\x02\u02B7\u02B8\x07p\x02\x02\u02B8\u02B9", "\x07v\x02\x02\u02B9\u02BA\x07:\x02\x02\u02BA\u0339\x07", ":\x02\x02\u02BB\u02BC\x07k\x02\x02\u02BC\u02BD\x07p\x02", "\x02\u02BD\u02BE\x07v\x02\x02\u02BE\u02BF\x07;\x02\x02", "\u02BF\u0339\x078\x02\x02\u02C0\u02C1\x07k\x02\x02\u02C1", "\u02C2\x07p\x02\x02\u02C2\u02C3\x07v\x02\x02\u02C3\u02C4", "\x073\x02\x02\u02C4\u02C5\x072\x02\x02\u02C5\u0339\x07", "6\x02\x02\u02C6\u02C7\x07k\x02\x02\u02C7\u02C8\x07p\x02", "\x02\u02C8\u02C9\x07v\x02\x02\u02C9\u02CA\x073\x02\x02", "\u02CA\u02CB\x073\x02\x02\u02CB\u0339\x074\x02\x02\u02CC", "\u02CD\x07k\x02\x02\u02CD\u02CE\x07p\x02\x02\u02CE\u02CF", "\x07v\x02\x02\u02CF\u02D0\x073\x02\x02\u02D0\u02D1\x07", "4\x02\x02\u02D1\u0339\x072\x02\x02\u02D2\u02D3\x07k\x02", "\x02\u02D3\u02D4\x07p\x02\x02\u02D4\u02D5\x07v\x02\x02", "\u02D5\u02D6\x073\x02\x02\u02D6\u02D7\x074\x02\x02\u02D7", "\u0339\x07:\x02\x02\u02D8\u02D9\x07k\x02\x02\u02D9\u02DA", "\x07p\x02\x02\u02DA\u02DB\x07v\x02\x02\u02DB\u02DC\x07", "3\x02\x02\u02DC\u02DD\x075\x02\x02\u02DD\u0339\x078\x02", "\x02\u02DE\u02DF\x07k\x02\x02\u02DF\u02E0\x07p\x02\x02", "\u02E0\u02E1\x07v\x02\x02\u02E1\u02E2\x073\x02\x02\u02E2", "\u02E3\x076\x02\x02\u02E3\u0339\x076\x02\x02\u02E4\u02E5", "\x07k\x02\x02\u02E5\u02E6\x07p\x02\x02\u02E6\u02E7\x07", "v\x02\x02\u02E7\u02E8\x073\x02\x02\u02E8\u02E9\x077\x02", "\x02\u02E9\u0339\x074\x02\x02\u02EA\u02EB\x07k\x02\x02", "\u02EB\u02EC\x07p\x02\x02\u02EC\u02ED\x07v\x02\x02\u02ED", "\u02EE\x073\x02\x02\u02EE\u02EF\x078\x02\x02\u02EF\u0339", "\x072\x02\x02\u02F0\u02F1\x07k\x02\x02\u02F1\u02F2\x07", "p\x02\x02\u02F2\u02F3\x07v\x02\x02\u02F3\u02F4\x073\x02", "\x02\u02F4\u02F5\x078\x02\x02\u02F5\u0339\x07:\x02\x02", "\u02F6\u02F7\x07k\x02\x02\u02F7\u02F8\x07p\x02\x02\u02F8", "\u02F9\x07v\x02\x02\u02F9\u02FA\x073\x02\x02\u02FA\u02FB", "\x079\x02\x02\u02FB\u0339\x078\x02\x02\u02FC\u02FD\x07", "k\x02\x02\u02FD\u02FE\x07p\x02\x02\u02FE\u02FF\x07v\x02", "\x02\u02FF\u0300\x073\x02\x02\u0300\u0301\x07:\x02\x02", "\u0301\u0339\x076\x02\x02\u0302\u0303\x07k\x02\x02\u0303", "\u0304\x07p\x02\x02\u0304\u0305\x07v\x02\x02\u0305\u0306", "\x073\x02\x02\u0306\u0307\x07;\x02\x02\u0307\u0339\x07", "4\x02\x02\u0308\u0309\x07k\x02\x02\u0309\u030A\x07p\x02", "\x02\u030A\u030B\x07v\x02\x02\u030B\u030C\x074\x02\x02", "\u030C\u030D\x072\x02\x02\u030D\u0339\x072\x02\x02\u030E", "\u030F\x07k\x02\x02\u030F\u0310\x07p\x02\x02\u0310\u0311", "\x07v\x02\x02\u0311\u0312\x074\x02\x02\u0312\u0313\x07", "2\x02\x02\u0313\u0339\x07:\x02\x02\u0314\u0315\x07k\x02", "\x02\u0315\u0316\x07p\x02\x02\u0316\u0317\x07v\x02\x02", "\u0317\u0318\x074\x02\x02\u0318\u0319\x073\x02\x02\u0319", "\u0339\x078\x02\x02\u031A\u031B\x07k\x02\x02\u031B\u031C", "\x07p\x02\x02\u031C\u031D\x07v\x02\x02\u031D\u031E\x07", "4\x02\x02\u031E\u031F\x074\x02\x02\u031F\u0339\x076\x02", "\x02\u0320\u0321\x07k\x02\x02\u0321\u0322\x07p\x02\x02", "\u0322\u0323\x07v\x02\x02\u0323\u0324\x074\x02\x02\u0324", "\u0325\x075\x02\x02\u0325\u0339\x074\x02\x02\u0326\u0327", "\x07k\x02\x02\u0327\u0328\x07p\x02\x02\u0328\u0329\x07", "v\x02\x02\u0329\u032A\x074\x02\x02\u032A\u032B\x076\x02", "\x02\u032B\u0339\x072\x02\x02\u032C\u032D\x07k\x02\x02", "\u032D\u032E\x07p\x02\x02\u032E\u032F\x07v\x02\x02\u032F", "\u0330\x074\x02\x02\u0330\u0331\x076\x02\x02\u0331\u0339", "\x07:\x02\x02\u0332\u0333\x07k\x02\x02\u0333\u0334\x07", "p\x02\x02\u0334\u0335\x07v\x02\x02\u0335\u0336\x074\x02", "\x02\u0336\u0337\x077\x02\x02\u0337\u0339\x078\x02\x02", "\u0338\u0282\x03\x02\x02\x02\u0338\u0285\x03\x02\x02\x02", "\u0338\u0289\x03\x02\x02\x02\u0338\u028E\x03\x02\x02\x02", "\u0338\u0293\x03\x02\x02\x02\u0338\u0298\x03\x02\x02\x02", "\u0338\u029D\x03\x02\x02\x02\u0338\u02A2\x03\x02\x02\x02", "\u0338\u02A7\x03\x02\x02\x02\u0338\u02AC\x03\x02\x02\x02", "\u0338\u02B1\x03\x02\x02\x02\u0338\u02B6\x03\x02\x02\x02", "\u0338\u02BB\x03\x02\x02\x02\u0338\u02C0\x03\x02\x02\x02", "\u0338\u02C6\x03\x02\x02\x02\u0338\u02CC\x03\x02\x02\x02", "\u0338\u02D2\x03\x02\x02\x02\u0338\u02D8\x03\x02\x02\x02", "\u0338\u02DE\x03\x02\x02\x02\u0338\u02E4\x03\x02\x02\x02", "\u0338\u02EA\x03\x02\x02\x02\u0338\u02F0\x03\x02\x02\x02", "\u0338\u02F6\x03\x02\x02\x02\u0338\u02FC\x03\x02\x02\x02", "\u0338\u0302\x03\x02\x02\x02\u0338\u0308\x03\x02\x02\x02", "\u0338\u030E\x03\x02\x02\x02\u0338\u0314\x03\x02\x02\x02", "\u0338\u031A\x03\x02\x02\x02\u0338\u0320\x03\x02\x02\x02", "\u0338\u0326\x03\x02\x02\x02\u0338\u032C\x03\x02\x02\x02", "\u0338\u0332\x03\x02\x02\x02\u0339\xB8\x03\x02\x02\x02", "\u033A\u033B\x07w\x02\x02\u033B\u033C\x07k\x02\x02\u033C", "\u033D\x07p\x02\x02\u033D\u0412\x07v\x02\x02\u033E\u033F", "\x07w\x02\x02\u033F\u0340\x07k\x02\x02\u0340\u0341\x07", "p\x02\x02\u0341\u0342\x07v\x02\x02\u0342\u0412\x07:\x02", "\x02\u0343\u0344\x07w\x02\x02\u0344\u0345\x07k\x02\x02", "\u0345\u0346\x07p\x02\x02\u0346\u0347\x07v\x02\x02\u0347", "\u0348\x073\x02\x02\u0348\u0412\x078\x02\x02\u0349\u034A", "\x07w\x02\x02\u034A\u034B\x07k\x02\x02\u034B\u034C\x07", "p\x02\x02\u034C\u034D\x07v\x02\x02\u034D\u034E\x074\x02", "\x02\u034E\u0412\x076\x02\x02\u034F\u0350\x07w\x02\x02", "\u0350\u0351\x07k\x02\x02\u0351\u0352\x07p\x02\x02\u0352", "\u0353\x07v\x02\x02\u0353\u0354\x075\x02\x02\u0354\u0412", "\x074\x02\x02\u0355\u0356\x07w\x02\x02\u0356\u0357\x07", "k\x02\x02\u0357\u0358\x07p\x02\x02\u0358\u0359\x07v\x02", "\x02\u0359\u035A\x076\x02\x02\u035A\u0412\x072\x02\x02", "\u035B\u035C\x07w\x02\x02\u035C\u035D\x07k\x02\x02\u035D", "\u035E\x07p\x02\x02\u035E\u035F\x07v\x02\x02\u035F\u0360", "\x076\x02\x02\u0360\u0412\x07:\x02\x02\u0361\u0362\x07", "w\x02\x02\u0362\u0363\x07k\x02\x02\u0363\u0364\x07p\x02", "\x02\u0364\u0365\x07v\x02\x02\u0365\u0366\x077\x02\x02", "\u0366\u0412\x078\x02\x02\u0367\u0368\x07w\x02\x02\u0368", "\u0369\x07k\x02\x02\u0369\u036A\x07p\x02\x02\u036A\u036B", "\x07v\x02\x02\u036B\u036C\x078\x02\x02\u036C\u0412\x07", "6\x02\x02\u036D\u036E\x07w\x02\x02\u036E\u036F\x07k\x02", "\x02\u036F\u0370\x07p\x02\x02\u0370\u0371\x07v\x02\x02", "\u0371\u0372\x079\x02\x02\u0372\u0412\x074\x02\x02\u0373", "\u0374\x07w\x02\x02\u0374\u0375\x07k\x02\x02\u0375\u0376", "\x07p\x02\x02\u0376\u0377\x07v\x02\x02\u0377\u0378\x07", ":\x02\x02\u0378\u0412\x072\x02\x02\u0379\u037A\x07w\x02", "\x02\u037A\u037B\x07k\x02\x02\u037B\u037C\x07p\x02\x02", "\u037C\u037D\x07v\x02\x02\u037D\u037E\x07:\x02\x02\u037E", "\u0412\x07:\x02\x02\u037F\u0380\x07w\x02\x02\u0380\u0381", "\x07k\x02\x02\u0381\u0382\x07p\x02\x02\u0382\u0383\x07", "v\x02\x02\u0383\u0384\x07;\x02\x02\u0384\u0412\x078\x02", "\x02\u0385\u0386\x07w\x02\x02\u0386\u0387\x07k\x02\x02", "\u0387\u0388\x07p\x02\x02\u0388\u0389\x07v\x02\x02\u0389", "\u038A\x073\x02\x02\u038A\u038B\x072\x02\x02\u038B\u0412", "\x076\x02\x02\u038C\u038D\x07w\x02\x02\u038D\u038E\x07", "k\x02\x02\u038E\u038F\x07p\x02\x02\u038F\u0390\x07v\x02", "\x02\u0390\u0391\x073\x02\x02\u0391\u0392\x073\x02\x02", "\u0392\u0412\x074\x02\x02\u0393\u0394\x07w\x02\x02\u0394", "\u0395\x07k\x02\x02\u0395\u0396\x07p\x02\x02\u0396\u0397", "\x07v\x02\x02\u0397\u0398\x073\x02\x02\u0398\u0399\x07", "4\x02\x02\u0399\u0412\x072\x02\x02\u039A\u039B\x07w\x02", "\x02\u039B\u039C\x07k\x02\x02\u039C\u039D\x07p\x02\x02", "\u039D\u039E\x07v\x02\x02\u039E\u039F\x073\x02\x02\u039F", "\u03A0\x074\x02\x02\u03A0\u0412\x07:\x02\x02\u03A1\u03A2", "\x07w\x02\x02\u03A2\u03A3\x07k\x02\x02\u03A3\u03A4\x07", "p\x02\x02\u03A4\u03A5\x07v\x02\x02\u03A5\u03A6\x073\x02", "\x02\u03A6\u03A7\x075\x02\x02\u03A7\u0412\x078\x02\x02", "\u03A8\u03A9\x07w\x02\x02\u03A9\u03AA\x07k\x02\x02\u03AA", "\u03AB\x07p\x02\x02\u03AB\u03AC\x07v\x02\x02\u03AC\u03AD", "\x073\x02\x02\u03AD\u03AE\x076\x02\x02\u03AE\u0412\x07", "6\x02\x02\u03AF\u03B0\x07w\x02\x02\u03B0\u03B1\x07k\x02", "\x02\u03B1\u03B2\x07p\x02\x02\u03B2\u03B3\x07v\x02\x02", "\u03B3\u03B4\x073\x02\x02\u03B4\u03B5\x077\x02\x02\u03B5", "\u0412\x074\x02\x02\u03B6\u03B7\x07w\x02\x02\u03B7\u03B8", "\x07k\x02\x02\u03B8\u03B9\x07p\x02\x02\u03B9\u03BA\x07", "v\x02\x02\u03BA\u03BB\x073\x02\x02\u03BB\u03BC\x078\x02", "\x02\u03BC\u0412\x072\x02\x02\u03BD\u03BE\x07w\x02\x02", "\u03BE\u03BF\x07k\x02\x02\u03BF\u03C0\x07p\x02\x02\u03C0", "\u03C1\x07v\x02\x02\u03C1\u03C2\x073\x02\x02\u03C2\u03C3", "\x078\x02\x02\u03C3\u0412\x07:\x02\x02\u03C4\u03C5\x07", "w\x02\x02\u03C5\u03C6\x07k\x02\x02\u03C6\u03C7\x07p\x02", "\x02\u03C7\u03C8\x07v\x02\x02\u03C8\u03C9\x073\x02\x02", "\u03C9\u03CA\x079\x02\x02\u03CA\u0412\x078\x02\x02\u03CB", "\u03CC\x07w\x02\x02\u03CC\u03CD\x07k\x02\x02\u03CD\u03CE", "\x07p\x02\x02\u03CE\u03CF\x07v\x02\x02\u03CF\u03D0\x07", "3\x02\x02\u03D0\u03D1\x07:\x02\x02\u03D1\u0412\x076\x02", "\x02\u03D2\u03D3\x07w\x02\x02\u03D3\u03D4\x07k\x02\x02", "\u03D4\u03D5\x07p\x02\x02\u03D5\u03D6\x07v\x02\x02\u03D6", "\u03D7\x073\x02\x02\u03D7\u03D8\x07;\x02\x02\u03D8\u0412", "\x074\x02\x02\u03D9\u03DA\x07w\x02\x02\u03DA\u03DB\x07", "k\x02\x02\u03DB\u03DC\x07p\x02\x02\u03DC\u03DD\x07v\x02", "\x02\u03DD\u03DE\x074\x02\x02\u03DE\u03DF\x072\x02\x02", "\u03DF\u0412\x072\x02\x02\u03E0\u03E1\x07w\x02\x02\u03E1", "\u03E2\x07k\x02\x02\u03E2\u03E3\x07p\x02\x02\u03E3\u03E4", "\x07v\x02\x02\u03E4\u03E5\x074\x02\x02\u03E5\u03E6\x07", "2\x02\x02\u03E6\u0412\x07:\x02\x02\u03E7\u03E8\x07w\x02", "\x02\u03E8\u03E9\x07k\x02\x02\u03E9\u03EA\x07p\x02\x02", "\u03EA\u03EB\x07v\x02\x02\u03EB\u03EC\x074\x02\x02\u03EC", "\u03ED\x073\x02\x02\u03ED\u0412\x078\x02\x02\u03EE\u03EF", "\x07w\x02\x02\u03EF\u03F0\x07k\x02\x02\u03F0\u03F1\x07", "p\x02\x02\u03F1\u03F2\x07v\x02\x02\u03F2\u03F3\x074\x02", "\x02\u03F3\u03F4\x074\x02\x02\u03F4\u0412\x076\x02\x02", "\u03F5\u03F6\x07w\x02\x02\u03F6\u03F7\x07k\x02\x02\u03F7", "\u03F8\x07p\x02\x02\u03F8\u03F9\x07v\x02\x02\u03F9\u03FA", "\x074\x02\x02\u03FA\u03FB\x075\x02\x02\u03FB\u0412\x07", "4\x02\x02\u03FC\u03FD\x07w\x02\x02\u03FD\u03FE\x07k\x02", "\x02\u03FE\u03FF\x07p\x02\x02\u03FF\u0400\x07v\x02\x02", "\u0400\u0401\x074\x02\x02\u0401\u0402\x076\x02\x02\u0402", "\u0412\x072\x02\x02\u0403\u0404\x07w\x02\x02\u0404\u0405", "\x07k\x02\x02\u0405\u0406\x07p\x02\x02\u0406\u0407\x07", "v\x02\x02\u0407\u0408\x074\x02\x02\u0408\u0409\x076\x02", "\x02\u0409\u0412\x07:\x02\x02\u040A\u040B\x07w\x02\x02", "\u040B\u040C\x07k\x02\x02\u040C\u040D\x07p\x02\x02\u040D", "\u040E\x07v\x02\x02\u040E\u040F\x074\x02\x02\u040F\u0410", "\x077\x02\x02\u0410\u0412\x078\x02\x02\u0411\u033A\x03", "\x02\x02\x02\u0411\u033E\x03\x02\x02\x02\u0411\u0343\x03", "\x02\x02\x02\u0411\u0349\x03\x02\x02\x02\u0411\u034F\x03", "\x02\x02\x02\u0411\u0355\x03\x02\x02\x02\u0411\u035B\x03", "\x02\x02\x02\u0411\u0361\x03\x02\x02\x02\u0411\u0367\x03", "\x02\x02\x02\u0411\u036D\x03\x02\x02\x02\u0411\u0373\x03", "\x02\x02\x02\u0411\u0379\x03\x02\x02\x02\u0411\u037F\x03", "\x02\x02\x02\u0411\u0385\x03\x02\x02\x02\u0411\u038C\x03", "\x02\x02\x02\u0411\u0393\x03\x02\x02\x02\u0411\u039A\x03", "\x02\x02\x02\u0411\u03A1\x03\x02\x02\x02\u0411\u03A8\x03", "\x02\x02\x02\u0411\u03AF\x03\x02\x02\x02\u0411\u03B6\x03", "\x02\x02\x02\u0411\u03BD\x03\x02\x02\x02\u0411\u03C4\x03", "\x02\x02\x02\u0411\u03CB\x03\x02\x02\x02\u0411\u03D2\x03", "\x02\x02\x02\u0411\u03D9\x03\x02\x02\x02\u0411\u03E0\x03", "\x02\x02\x02\u0411\u03E7\x03\x02\x02\x02\u0411\u03EE\x03", "\x02\x02\x02\u0411\u03F5\x03\x02\x02\x02\u0411\u03FC\x03", "\x02\x02\x02\u0411\u0403\x03\x02\x02\x02\u0411\u040A\x03", "\x02\x02\x02\u0412\xBA\x03\x02\x02\x02\u0413\u0414\x07", "d\x02\x02\u0414\u0415\x07{\x02\x02\u0415\u0416\x07v\x02", "\x02\u0416\u0417\x07g\x02\x02\u0417\u04F0\x07u\x02\x02", "\u0418\u0419\x07d\x02\x02\u0419\u041A\x07{\x02\x02\u041A", "\u041B\x07v\x02\x02\u041B\u041C\x07g\x02\x02\u041C\u041D", "\x07u\x02\x02\u041D\u04F0\x073\x02\x02\u041E\u041F\x07", "d\x02\x02\u041F\u0420\x07{\x02\x02\u0420\u0421\x07v\x02", "\x02\u0421\u0422\x07g\x02\x02\u0422\u0423\x07u\x02\x02", "\u0423\u04F0\x074\x02\x02\u0424\u0425\x07d\x02\x02\u0425", "\u0426\x07{\x02\x02\u0426\u0427\x07v\x02\x02\u0427\u0428", "\x07g\x02\x02\u0428\u0429\x07u\x02\x02\u0429\u04F0\x07", "5\x02\x02\u042A\u042B\x07d\x02\x02\u042B\u042C\x07{\x02", "\x02\u042C\u042D\x07v\x02\x02\u042D\u042E\x07g\x02\x02", "\u042E\u042F\x07u\x02\x02\u042F\u04F0\x076\x02\x02\u0430", "\u0431\x07d\x02\x02\u0431\u0432\x07{\x02\x02\u0432\u0433", "\x07v\x02\x02\u0433\u0434\x07g\x02\x02\u0434\u0435\x07", "u\x02\x02\u0435\u04F0\x077\x02\x02\u0436\u0437\x07d\x02", "\x02\u0437\u0438\x07{\x02\x02\u0438\u0439\x07v\x02\x02", "\u0439\u043A\x07g\x02\x02\u043A\u043B\x07u\x02\x02\u043B", "\u04F0\x078\x02\x02\u043C\u043D\x07d\x02\x02\u043D\u043E", "\x07{\x02\x02\u043E\u043F\x07v\x02\x02\u043F\u0440\x07", "g\x02\x02\u0440\u0441\x07u\x02\x02\u0441\u04F0\x079\x02", "\x02\u0442\u0443\x07d\x02\x02\u0443\u0444\x07{\x02\x02", "\u0444\u0445\x07v\x02\x02\u0445\u0446\x07g\x02\x02\u0446", "\u0447\x07u\x02\x02\u0447\u04F0\x07:\x02\x02\u0448\u0449", "\x07d\x02\x02\u0449\u044A\x07{\x02\x02\u044A\u044B\x07", "v\x02\x02\u044B\u044C\x07g\x02\x02\u044C\u044D\x07u\x02", "\x02\u044D\u04F0\x07;\x02\x02\u044E\u044F\x07d\x02\x02", "\u044F\u0450\x07{\x02\x02\u0450\u0451\x07v\x02\x02\u0451", "\u0452\x07g\x02\x02\u0452\u0453\x07u\x02\x02\u0453\u0454", "\x073\x02\x02\u0454\u04F0\x072\x02\x02\u0455\u0456\x07", "d\x02\x02\u0456\u0457\x07{\x02\x02\u0457\u0458\x07v\x02", "\x02\u0458\u0459\x07g\x02\x02\u0459\u045A\x07u\x02\x02", "\u045A\u045B\x073\x02\x02\u045B\u04F0\x073\x02\x02\u045C", "\u045D\x07d\x02\x02\u045D\u045E\x07{\x02\x02\u045E\u045F", "\x07v\x02\x02\u045F\u0460\x07g\x02\x02\u0460\u0461\x07", "u\x02\x02\u0461\u0462\x073\x02\x02\u0462\u04F0\x074\x02", "\x02\u0463\u0464\x07d\x02\x02\u0464\u0465\x07{\x02\x02", "\u0465\u0466\x07v\x02\x02\u0466\u0467\x07g\x02\x02\u0467", "\u0468\x07u\x02\x02\u0468\u0469\x073\x02\x02\u0469\u04F0", "\x075\x02\x02\u046A\u046B\x07d\x02\x02\u046B\u046C\x07", "{\x02\x02\u046C\u046D\x07v\x02\x02\u046D\u046E\x07g\x02", "\x02\u046E\u046F\x07u\x02\x02\u046F\u0470\x073\x02\x02", "\u0470\u04F0\x076\x02\x02\u0471\u0472\x07d\x02\x02\u0472", "\u0473\x07{\x02\x02\u0473\u0474\x07v\x02\x02\u0474\u0475", "\x07g\x02\x02\u0475\u0476\x07u\x02\x02\u0476\u0477\x07", "3\x02\x02\u0477\u04F0\x077\x02\x02\u0478\u0479\x07d\x02", "\x02\u0479\u047A\x07{\x02\x02\u047A\u047B\x07v\x02\x02", "\u047B\u047C\x07g\x02\x02\u047C\u047D\x07u\x02\x02\u047D", "\u047E\x073\x02\x02\u047E\u04F0\x078\x02\x02\u047F\u0480", "\x07d\x02\x02\u0480\u0481\x07{\x02\x02\u0481\u0482\x07", "v\x02\x02\u0482\u0483\x07g\x02\x02\u0483\u0484\x07u\x02", "\x02\u0484\u0485\x073\x02\x02\u0485\u04F0\x079\x02\x02", "\u0486\u0487\x07d\x02\x02\u0487\u0488\x07{\x02\x02\u0488", "\u0489\x07v\x02\x02\u0489\u048A\x07g\x02\x02\u048A\u048B", "\x07u\x02\x02\u048B\u048C\x073\x02\x02\u048C\u04F0\x07", ":\x02\x02\u048D\u048E\x07d\x02\x02\u048E\u048F\x07{\x02", "\x02\u048F\u0490\x07v\x02\x02\u0490\u0491\x07g\x02\x02", "\u0491\u0492\x07u\x02\x02\u0492\u0493\x073\x02\x02\u0493", "\u04F0\x07;\x02\x02\u0494\u0495\x07d\x02\x02\u0495\u0496", "\x07{\x02\x02\u0496\u0497\x07v\x02\x02\u0497\u0498\x07", "g\x02\x02\u0498\u0499\x07u\x02\x02\u0499\u049A\x074\x02", "\x02\u049A\u04F0\x072\x02\x02\u049B\u049C\x07d\x02\x02", "\u049C\u049D\x07{\x02\x02\u049D\u049E\x07v\x02\x02\u049E", "\u049F\x07g\x02\x02\u049F\u04A0\x07u\x02\x02\u04A0\u04A1", "\x074\x02\x02\u04A1\u04F0\x073\x02\x02\u04A2\u04A3\x07", "d\x02\x02\u04A3\u04A4\x07{\x02\x02\u04A4\u04A5\x07v\x02", "\x02\u04A5\u04A6\x07g\x02\x02\u04A6\u04A7\x07u\x02\x02", "\u04A7\u04A8\x074\x02\x02\u04A8\u04F0\x074\x02\x02\u04A9", "\u04AA\x07d\x02\x02\u04AA\u04AB\x07{\x02\x02\u04AB\u04AC", "\x07v\x02\x02\u04AC\u04AD\x07g\x02\x02\u04AD\u04AE\x07", "u\x02\x02\u04AE\u04AF\x074\x02\x02\u04AF\u04F0\x075\x02", "\x02\u04B0\u04B1\x07d\x02\x02\u04B1\u04B2\x07{\x02\x02", "\u04B2\u04B3\x07v\x02\x02\u04B3\u04B4\x07g\x02\x02\u04B4", "\u04B5\x07u\x02\x02\u04B5\u04B6\x074\x02\x02\u04B6\u04F0", "\x076\x02\x02\u04B7\u04B8\x07d\x02\x02\u04B8\u04B9\x07", "{\x02\x02\u04B9\u04BA\x07v\x02\x02\u04BA\u04BB\x07g\x02", "\x02\u04BB\u04BC\x07u\x02\x02\u04BC\u04BD\x074\x02\x02", "\u04BD\u04F0\x077\x02\x02\u04BE\u04BF\x07d\x02\x02\u04BF", "\u04C0\x07{\x02\x02\u04C0\u04C1\x07v\x02\x02\u04C1\u04C2", "\x07g\x02\x02\u04C2\u04C3\x07u\x02\x02\u04C3\u04C4\x07", "4\x02\x02\u04C4\u04F0\x078\x02\x02\u04C5\u04C6\x07d\x02", "\x02\u04C6\u04C7\x07{\x02\x02\u04C7\u04C8\x07v\x02\x02", "\u04C8\u04C9\x07g\x02\x02\u04C9\u04CA\x07u\x02\x02\u04CA", "\u04CB\x074\x02\x02\u04CB\u04F0\x079\x02\x02\u04CC\u04CD", "\x07d\x02\x02\u04CD\u04CE\x07{\x02\x02\u04CE\u04CF\x07", "v\x02\x02\u04CF\u04D0\x07g\x02\x02\u04D0\u04D1\x07u\x02", "\x02\u04D1\u04D2\x074\x02\x02\u04D2\u04F0\x07:\x02\x02", "\u04D3\u04D4\x07d\x02\x02\u04D4\u04D5\x07{\x02\x02\u04D5", "\u04D6\x07v\x02\x02\u04D6\u04D7\x07g\x02\x02\u04D7\u04D8", "\x07u\x02\x02\u04D8\u04D9\x074\x02\x02\u04D9\u04F0\x07", ";\x02\x02\u04DA\u04DB\x07d\x02\x02\u04DB\u04DC\x07{\x02", "\x02\u04DC\u04DD\x07v\x02\x02\u04DD\u04DE\x07g\x02\x02", "\u04DE\u04DF\x07u\x02\x02\u04DF\u04E0\x075\x02\x02\u04E0", "\u04F0\x072\x02\x02\u04E1\u04E2\x07d\x02\x02\u04E2\u04E3", "\x07{\x02\x02\u04E3\u04E4\x07v\x02\x02\u04E4\u04E5\x07", "g\x02\x02\u04E5\u04E6\x07u\x02\x02\u04E6\u04E7\x075\x02", "\x02\u04E7\u04F0\x073\x02\x02\u04E8\u04E9\x07d\x02\x02", "\u04E9\u04EA\x07{\x02\x02\u04EA\u04EB\x07v\x02\x02\u04EB", "\u04EC\x07g\x02\x02\u04EC\u04ED\x07u\x02\x02\u04ED\u04EE", "\x075\x02\x02\u04EE\u04F0\x074\x02\x02\u04EF\u0413\x03", "\x02\x02\x02\u04EF\u0418\x03\x02\x02\x02\u04EF\u041E\x03", "\x02\x02\x02\u04EF\u0424\x03\x02\x02\x02\u04EF\u042A\x03", "\x02\x02\x02\u04EF\u0430\x03\x02\x02\x02\u04EF\u0436\x03", "\x02\x02\x02\u04EF\u043C\x03\x02\x02\x02\u04EF\u0442\x03", "\x02\x02\x02\u04EF\u0448\x03\x02\x02\x02\u04EF\u044E\x03", "\x02\x02\x02\u04EF\u0455\x03\x02\x02\x02\u04EF\u045C\x03", "\x02\x02\x02\u04EF\u0463\x03\x02\x02\x02\u04EF\u046A\x03", "\x02\x02\x02\u04EF\u0471\x03\x02\x02\x02\u04EF\u0478\x03", "\x02\x02\x02\u04EF\u047F\x03\x02\x02\x02\u04EF\u0486\x03", "\x02\x02\x02\u04EF\u048D\x03\x02\x02\x02\u04EF\u0494\x03", "\x02\x02\x02\u04EF\u049B\x03\x02\x02\x02\u04EF\u04A2\x03", "\x02\x02\x02\u04EF\u04A9\x03\x02\x02\x02\u04EF\u04B0\x03", "\x02\x02\x02\u04EF\u04B7\x03\x02\x02\x02\u04EF\u04BE\x03", "\x02\x02\x02\u04EF\u04C5\x03\x02\x02\x02\u04EF\u04CC\x03", "\x02\x02\x02\u04EF\u04D3\x03\x02\x02\x02\u04EF\u04DA\x03", "\x02\x02\x02\u04EF\u04E1\x03\x02\x02\x02\u04EF\u04E8\x03", "\x02\x02\x02\u04F0\xBC\x03\x02\x02\x02\u04F1\u04F2\x07", "h\x02\x02\u04F2\u04F3\x07k\x02\x02\u04F3\u04F4\x07z\x02", "\x02\u04F4\u04F5\x07g\x02\x02\u04F5\u0508\x07f\x02\x02", "\u04F6\u04F7\x07h\x02\x02\u04F7\u04F8\x07k\x02\x02\u04F8", "\u04F9\x07z\x02\x02\u04F9\u04FA\x07g\x02\x02\u04FA\u04FB", "\x07f\x02\x02\u04FB\u04FD\x03\x02\x02\x02\u04FC\u04FE", "\t\x02\x02\x02\u04FD\u04FC\x03\x02\x02\x02\u04FE\u04FF", "\x03\x02\x02\x02\u04FF\u04FD\x03\x02\x02\x02\u04FF\u0500", "\x03\x02\x02\x02\u0500\u0501\x03\x02\x02\x02\u0501\u0503", "\x07z\x02\x02\u0502\u0504\t\x02\x02\x02\u0503\u0502\x03", "\x02\x02\x02\u0504\u0505\x03\x02\x02\x02\u0505\u0503\x03", "\x02\x02\x02\u0505\u0506\x03\x02\x02\x02\u0506\u0508\x03", "\x02\x02\x02\u0507\u04F1\x03\x02\x02\x02\u0507\u04F6\x03", "\x02\x02\x02\u0508\xBE\x03\x02\x02\x02\u0509\u050A\x07", "w\x02\x02\u050A\u050B\x07h\x02\x02\u050B\u050C\x07k\x02", "\x02\u050C\u050D\x07z\x02\x02\u050D\u050E\x07g\x02\x02", "\u050E\u0522\x07f\x02\x02\u050F\u0510\x07w\x02\x02\u0510", "\u0511\x07h\x02\x02\u0511\u0512\x07k\x02\x02\u0512\u0513", "\x07z\x02\x02\u0513\u0514\x07g\x02\x02\u0514\u0515\x07", "f\x02\x02\u0515\u0517\x03\x02\x02\x02\u0516\u0518\t\x02", "\x02\x02\u0517\u0516\x03\x02\x02\x02\u0518\u0519\x03\x02", "\x02\x02\u0519\u0517\x03\x02\x02\x02\u0519\u051A\x03\x02", "\x02\x02\u051A\u051B\x03\x02\x02\x02\u051B\u051D\x07z", "\x02\x02\u051C\u051E\t\x02\x02\x02\u051D\u051C\x03\x02", "\x02\x02\u051E\u051F\x03\x02\x02\x02\u051F\u051D\x03\x02", "\x02\x02\u051F\u0520\x03\x02\x02\x02\u0520\u0522\x03\x02", "\x02\x02\u0521\u0509\x03\x02\x02\x02\u0521\u050F\x03\x02", "\x02\x02\u0522\xC0\x03\x02\x02\x02\u0523\u0525\t\x02", "\x02\x02\u0524\u0523\x03\x02\x02\x02\u0525\u0526\x03\x02", "\x02\x02\u0526\u0524\x03\x02\x02\x02\u0526\u0527\x03\x02", "\x02\x02\u0527\u0528\x03\x02\x02\x02\u0528\u052A\x070", "\x02\x02\u0529\u052B\t\x02\x02\x02\u052A\u0529\x03\x02", "\x02\x02\u052B\u052C\x03\x02\x02\x02\u052C\u052A\x03\x02", "\x02\x02\u052C\u052D\x03\x02\x02\x02\u052D\u052E\x03\x02", "\x02\x02\u052E\u0530\x070\x02\x02\u052F\u0531\t\x02\x02", "\x02\u0530\u052F\x03\x02\x02\x02\u0531\u0532\x03\x02\x02", "\x02\u0532\u0530\x03\x02\x02\x02\u0532\u0533\x03\x02\x02", "\x02\u0533\xC2\x03\x02\x02\x02\u0534\u0535\x07v\x02", "\x02\u0535\u0536\x07t\x02\x02\u0536\u0537\x07w\x02\x02", "\u0537\u053E\x07g\x02\x02\u0538\u0539\x07h\x02\x02\u0539", "\u053A\x07c\x02\x02\u053A\u053B\x07n\x02\x02\u053B\u053C", "\x07u\x02\x02\u053C\u053E\x07g\x02\x02\u053D\u0534\x03", "\x02\x02\x02\u053D\u0538\x03\x02\x02\x02\u053E\xC4\x03", "\x02\x02\x02\u053F\u0541\t\x02\x02\x02\u0540\u053F\x03", "\x02\x02\x02\u0541\u0542\x03\x02\x02\x02\u0542\u0540\x03", "\x02\x02\x02\u0542\u0543\x03\x02\x02\x02\u0543\u0551\x03", "\x02\x02\x02\u0544\u0546\t\x02\x02\x02\u0545\u0544\x03", "\x02\x02\x02\u0546\u0549\x03\x02\x02\x02\u0547\u0545\x03", "\x02\x02\x02\u0547\u0548\x03\x02\x02\x02\u0548\u054A\x03", "\x02\x02\x02\u0549\u0547\x03\x02\x02\x02\u054A\u054C\x07", "0\x02\x02\u054B\u054D\t\x02\x02\x02\u054C\u054B\x03\x02", "\x02\x02\u054D\u054E\x03\x02\x02\x02\u054E\u054C\x03\x02", "\x02\x02\u054E\u054F\x03\x02\x02\x02\u054F\u0551\x03\x02", "\x02\x02\u0550\u0540\x03\x02\x02\x02\u0550\u0547\x03\x02", "\x02\x02\u0551\u0558\x03\x02\x02\x02\u0552\u0554\t\x03", "\x02\x02\u0553\u0555\t\x02\x02\x02\u0554\u0553\x03\x02", "\x02\x02\u0555\u0556\x03\x02\x02\x02\u0556\u0554\x03\x02", "\x02\x02\u0556\u0557\x03\x02\x02\x02\u0557\u0559\x03\x02", "\x02\x02\u0558\u0552\x03\x02\x02\x02\u0558\u0559\x03\x02", "\x02\x02\u0559\xC6\x03\x02\x02\x02\u055A\u055B\x072", "\x02\x02\u055B\u055D\t\x04\x02\x02\u055C\u055E\x05\xCF", "h\x02\u055D\u055C\x03\x02\x02\x02\u055E\u055F\x03\x02", "\x02\x02\u055F\u055D\x03\x02\x02\x02\u055F\u0560\x03\x02", "\x02\x02\u0560\xC8\x03\x02\x02\x02\u0561\u0562\x07y", "\x02\x02\u0562\u0563\x07g\x02\x02\u0563\u0596\x07k\x02", "\x02\u0564\u0565\x07u\x02\x02\u0565\u0566\x07|\x02\x02", "\u0566\u0567\x07c\x02\x02\u0567\u0568\x07d\x02\x02\u0568", "\u0596\x07q\x02\x02\u0569\u056A\x07h\x02\x02\u056A\u056B", "\x07k\x02\x02\u056B\u056C\x07p\x02\x02\u056C\u056D\x07", "p\x02\x02\u056D\u056E\x07g\x02\x02\u056E\u0596\x07{\x02", "\x02\u056F\u0570\x07g\x02\x02\u0570\u0571\x07v\x02\x02", "\u0571\u0572\x07j\x02\x02\u0572\u0573\x07g\x02\x02\u0573", "\u0596\x07t\x02\x02\u0574\u0575\x07u\x02\x02\u0575\u0576", "\x07g\x02\x02\u0576\u0577\x07e\x02\x02\u0577\u0578\x07", "q\x02\x02\u0578\u0579\x07p\x02\x02\u0579\u057A\x07f\x02", "\x02\u057A\u0596\x07u\x02\x02\u057B\u057C\x07o\x02\x02", "\u057C\u057D\x07k\x02\x02\u057D\u057E\x07p\x02\x02\u057E", "\u057F\x07w\x02\x02\u057F\u0580\x07v\x02\x02\u0580\u0581", "\x07g\x02\x02\u0581\u0596\x07u\x02\x02\u0582\u0583\x07", "j\x02\x02\u0583\u0584\x07q\x02\x02\u0584\u0585\x07w\x02", "\x02\u0585\u0586\x07t\x02\x02\u0586\u0596\x07u\x02\x02", "\u0587\u0588\x07f\x02\x02\u0588\u0589\x07c\x02\x02\u0589", "\u058A\x07{\x02\x02\u058A\u0596\x07u\x02\x02\u058B\u058C", "\x07y\x02\x02\u058C\u058D\x07g\x02\x02\u058D\u058E\x07", "g\x02\x02\u058E\u058F\x07m\x02\x02\u058F\u0596\x07u\x02", "\x02\u0590\u0591\x07{\x02\x02\u0591\u0592\x07g\x02\x02", "\u0592\u0593\x07c\x02\x02\u0593\u0594\x07t\x02\x02\u0594", "\u0596\x07u\x02\x02\u0595\u0561\x03\x02\x02\x02\u0595", "\u0564\x03\x02\x02\x02\u0595\u0569\x03\x02\x02\x02\u0595", "\u056F\x03\x02\x02\x02\u0595\u0574\x03\x02\x02\x02\u0595", "\u057B\x03\x02\x02\x02\u0595\u0582\x03\x02\x02\x02\u0595", "\u0587\x03\x02\x02\x02\u0595\u058B\x03\x02\x02\x02\u0595", "\u0590\x03\x02\x02\x02\u0596\xCA\x03\x02\x02\x02\u0597", "\u0598\x07j\x02\x02\u0598\u0599\x07g\x02\x02\u0599\u059A", "\x07z\x02\x02\u059A\u05AB\x03\x02\x02\x02\u059B\u059F", "\x07$\x02\x02\u059C\u059E\x05\xCDg\x02\u059D\u059C\x03", "\x02\x02\x02\u059E\u05A1\x03\x02\x02\x02\u059F\u059D\x03", "\x02\x02\x02\u059F\u05A0\x03\x02\x02\x02\u05A0\u05A2\x03", "\x02\x02\x02\u05A1\u059F\x03\x02\x02\x02\u05A2\u05AC\x07", "$\x02\x02\u05A3\u05A7\x07)\x02\x02\u05A4\u05A6\x05\xCD", "g\x02\u05A5\u05A4\x03\x02\x02\x02\u05A6\u05A9\x03\x02", "\x02\x02\u05A7\u05A5\x03\x02\x02\x02\u05A7\u05A8\x03\x02", "\x02\x02\u05A8\u05AA\x03\x02\x02\x02\u05A9\u05A7\x03\x02", "\x02\x02\u05AA\u05AC\x07)\x02\x02\u05AB\u059B\x03\x02", "\x02\x02\u05AB\u05A3\x03\x02\x02\x02\u05AC\xCC\x03\x02", "\x02\x02\u05AD\u05AE\x05\xCFh\x02\u05AE\u05AF\x05\xCF", "h\x02\u05AF\xCE\x03\x02\x02\x02\u05B0\u05B1\t\x05\x02", "\x02\u05B1\xD0\x03\x02\x02\x02\u05B2\u05B3\x07c\x02", "\x02\u05B3\u05B4\x07d\x02\x02\u05B4\u05B5\x07u\x02\x02", "\u05B5\u05B6\x07v\x02\x02\u05B6\u05B7\x07t\x02\x02\u05B7", "\u05B8\x07c\x02\x02\u05B8\u05B9\x07e\x02\x02\u05B9\u060F", "\x07v\x02\x02\u05BA\u05BB\x07c\x02\x02\u05BB\u05BC\x07", "h\x02\x02\u05BC\u05BD\x07v\x02\x02\u05BD\u05BE\x07g\x02", "\x02\u05BE\u060F\x07t\x02\x02\u05BF\u05C0\x07e\x02\x02", "\u05C0\u05C1\x07c\x02\x02\u05C1\u05C2\x07u\x02\x02\u05C2", "\u060F\x07g\x02\x02\u05C3\u05C4\x07e\x02\x02\u05C4\u05C5", "\x07c\x02\x02\u05C5\u05C6\x07v\x02\x02\u05C6\u05C7\x07", "e\x02\x02\u05C7\u060F\x07j\x02\x02\u05C8\u05C9\x07f\x02", "\x02\u05C9\u05CA\x07g\x02\x02\u05CA\u05CB\x07h\x02\x02", "\u05CB\u05CC\x07c\x02\x02\u05CC\u05CD\x07w\x02\x02\u05CD", "\u05CE\x07n\x02\x02\u05CE\u060F\x07v\x02\x02\u05CF\u05D0", "\x07h\x02\x02\u05D0\u05D1\x07k\x02\x02\u05D1\u05D2\x07", "p\x02\x02\u05D2\u05D3\x07c\x02\x02\u05D3\u060F\x07n\x02", "\x02\u05D4\u05D5\x07k\x02\x02\u05D5\u060F\x07p\x02\x02", "\u05D6\u05D7\x07k\x02\x02\u05D7\u05D8\x07p\x02\x02\u05D8", "\u05D9\x07n\x02\x02\u05D9\u05DA\x07k\x02\x02\u05DA\u05DB", "\x07p\x02\x02\u05DB\u060F\x07g\x02\x02\u05DC\u05DD\x07", "n\x02\x02\u05DD\u05DE\x07g\x02\x02\u05DE\u060F\x07v\x02", "\x02\u05DF\u05E0\x07o\x02\x02\u05E0\u05E1\x07c\x02\x02", "\u05E1\u05E2\x07v\x02\x02\u05E2\u05E3\x07e\x02\x02\u05E3", "\u060F\x07j\x02\x02\u05E4\u05E5\x07p\x02\x02\u05E5\u05E6", "\x07w\x02\x02\u05E6\u05E7\x07n\x02\x02\u05E7\u060F\x07", "n\x02\x02\u05E8\u05E9\x07q\x02\x02\u05E9\u060F\x07h\x02", "\x02\u05EA\u05EB\x07t\x02\x02\u05EB\u05EC\x07g\x02\x02", "\u05EC\u05ED\x07n\x02\x02\u05ED\u05EE\x07q\x02\x02\u05EE", "\u05EF\x07e\x02\x02\u05EF\u05F0\x07c\x02\x02\u05F0\u05F1", "\x07v\x02\x02\u05F1\u05F2\x07c\x02\x02\u05F2\u05F3\x07", "d\x02\x02\u05F3\u05F4\x07n\x02\x02\u05F4\u060F\x07g\x02", "\x02\u05F5\u05F6\x07u\x02\x02\u05F6\u05F7\x07v\x02\x02", "\u05F7\u05F8\x07c\x02\x02\u05F8\u05F9\x07v\x02\x02\u05F9", "\u05FA\x07k\x02\x02\u05FA\u060F\x07e\x02\x02\u05FB\u05FC", "\x07u\x02\x02\u05FC\u05FD\x07y\x02\x02\u05FD\u05FE\x07", "k\x02\x02\u05FE\u05FF\x07v\x02\x02\u05FF\u0600\x07e\x02", "\x02\u0600\u060F\x07j\x02\x02\u0601\u0602\x07v\x02\x02", "\u0602\u0603\x07t\x02\x02\u0603\u060F\x07{\x02\x02\u0604", "\u0605\x07v\x02\x02\u0605\u0606\x07{\x02\x02\u0606\u0607", "\x07r\x02\x02\u0607\u060F\x07g\x02\x02\u0608\u0609\x07", "v\x02\x02\u0609\u060A\x07{\x02\x02\u060A\u060B\x07r\x02", "\x02\u060B\u060C\x07g\x02\x02\u060C\u060D\x07q\x02\x02", "\u060D\u060F\x07h\x02\x02\u060E\u05B2\x03\x02\x02\x02", "\u060E\u05BA\x03\x02\x02\x02\u060E\u05BF\x03\x02\x02\x02", "\u060E\u05C3\x03\x02\x02\x02\u060E\u05C8\x03\x02\x02\x02", "\u060E\u05CF\x03\x02\x02\x02\u060E\u05D4\x03\x02\x02\x02", "\u060E\u05D6\x03\x02\x02\x02\u060E\u05DC\x03\x02\x02\x02", "\u060E\u05DF\x03\x02\x02\x02\u060E\u05E4\x03\x02\x02\x02", "\u060E\u05E8\x03\x02\x02\x02\u060E\u05EA\x03\x02\x02\x02", "\u060E\u05F5\x03\x02\x02\x02\u060E\u05FB\x03\x02\x02\x02", "\u060E\u0601\x03\x02\x02\x02\u060E\u0604\x03\x02\x02\x02", "\u060E\u0608\x03\x02\x02\x02\u060F\xD2\x03\x02\x02\x02", "\u0610\u0611\x07c\x02\x02\u0611\u0612\x07p\x02\x02\u0612", "\u0613\x07q\x02\x02\u0613\u0614\x07p\x02\x02\u0614\u0615", "\x07{\x02\x02\u0615\u0616\x07o\x02\x02\u0616\u0617\x07", "q\x02\x02\u0617\u0618\x07w\x02\x02\u0618\u0619\x07u\x02", "\x02\u0619\xD4\x03\x02\x02\x02\u061A\u061B\x07d\x02", "\x02\u061B\u061C\x07t\x02\x02\u061C\u061D\x07g\x02\x02", "\u061D\u061E\x07c\x02\x02\u061E\u061F\x07m\x02\x02\u061F", "\xD6\x03\x02\x02\x02\u0620\u0621\x07e\x02\x02\u0621", "\u0622\x07q\x02\x02\u0622\u0623\x07p\x02\x02\u0623\u0624", "\x07u\x02\x02\u0624\u0625\x07v\x02\x02\u0625\u0626\x07", "c\x02\x02\u0626\u0627\x07p\x02\x02\u0627\u0628\x07v\x02", "\x02\u0628\xD8\x03\x02\x02\x02\u0629\u062A\x07e\x02", "\x02\u062A\u062B\x07q\x02\x02\u062B\u062C\x07p\x02\x02", "\u062C\u062D\x07v\x02\x02\u062D\u062E\x07k\x02\x02\u062E", "\u062F\x07p\x02\x02\u062F\u0630\x07w\x02\x02\u0630\u0631", "\x07g\x02\x02\u0631\xDA\x03\x02\x02\x02\u0632\u0633", "\x07g\x02\x02\u0633\u0634\x07z\x02\x02\u0634\u0635\x07", "v\x02\x02\u0635\u0636\x07g\x02\x02\u0636\u0637\x07t\x02", "\x02\u0637\u0638\x07p\x02\x02\u0638\u0639\x07c\x02\x02", "\u0639\u063A\x07n\x02\x02\u063A\xDC\x03\x02\x02\x02", "\u063B\u063C\x07k\x02\x02\u063C\u063D\x07p\x02\x02\u063D", "\u063E\x07f\x02\x02\u063E\u063F\x07g\x02\x02\u063F\u0640", "\x07z\x02\x02\u0640\u0641\x07g\x02\x02\u0641\u0642\x07", "f\x02\x02\u0642\xDE\x03\x02\x02\x02\u0643\u0644\x07", "k\x02\x02\u0644\u0645\x07p\x02\x02\u0645\u0646\x07v\x02", "\x02\u0646\u0647\x07g\x02\x02\u0647\u0648\x07t\x02\x02", "\u0648\u0649\x07p\x02\x02\u0649\u064A\x07c\x02\x02\u064A", "\u064B\x07n\x02\x02\u064B\xE0\x03\x02\x02\x02\u064C", "\u064D\x07r\x02\x02\u064D\u064E\x07c\x02\x02\u064E\u064F", "\x07{\x02\x02\u064F\u0650\x07c\x02\x02\u0650\u0651\x07", "d\x02\x02\u0651\u0652\x07n\x02\x02\u0652\u0653\x07g\x02", "\x02\u0653\xE2\x03\x02\x02\x02\u0654\u0655\x07r\x02", "\x02\u0655\u0656\x07t\x02\x02\u0656\u0657\x07k\x02\x02", "\u0657\u0658\x07x\x02\x02\u0658\u0659\x07c\x02\x02\u0659", "\u065A\x07v\x02\x02\u065A\u065B\x07g\x02\x02\u065B\xE4", "\x03\x02\x02\x02\u065C\u065D\x07r\x02\x02\u065D\u065E", "\x07w\x02\x02\u065E\u065F\x07d\x02\x02\u065F\u0660\x07", "n\x02\x02\u0660\u0661\x07k\x02\x02\u0661\u0662\x07e\x02", "\x02\u0662\xE6\x03\x02\x02\x02\u0663\u0664\x07r\x02", "\x02\u0664\u0665\x07w\x02\x02\u0665\u0666\x07t\x02\x02", "\u0666\u0667\x07g\x02\x02\u0667\xE8\x03\x02\x02\x02", "\u0668\u0669\x07x\x02\x02\u0669\u066A\x07k\x02\x02\u066A", "\u066B\x07g\x02\x02\u066B\u066C\x07y\x02\x02\u066C\xEA", "\x03\x02\x02\x02\u066D\u0671\x05\xEDw\x02\u066E\u0670", "\x05\xEFx\x02\u066F\u066E\x03\x02\x02\x02\u0670\u0673", "\x03\x02\x02\x02\u0671\u066F\x03\x02\x02\x02\u0671\u0672", "\x03\x02\x02\x02\u0672\xEC\x03\x02\x02\x02\u0673\u0671", "\x03\x02\x02\x02\u0674\u0675\t\x06\x02\x02\u0675\xEE", "\x03\x02\x02\x02\u0676\u0677\t\x07\x02\x02\u0677\xF0", "\x03\x02\x02\x02\u0678\u067C\x07$\x02\x02\u0679\u067B", "\x05\xF3z\x02\u067A\u0679\x03\x02\x02\x02\u067B\u067E", "\x03\x02\x02\x02\u067C\u067A\x03\x02\x02\x02\u067C\u067D", "\x03\x02\x02\x02\u067D\u067F\x03\x02\x02\x02\u067E\u067C", "\x03\x02\x02\x02\u067F\u0689\x07$\x02\x02\u0680\u0684", "\x07)\x02\x02\u0681\u0683\x05\xF5{\x02\u0682\u0681\x03", "\x02\x02\x02\u0683\u0686\x03\x02\x02\x02\u0684\u0682\x03", "\x02\x02\x02\u0684\u0685\x03\x02\x02\x02\u0685\u0687\x03", "\x02\x02\x02\u0686\u0684\x03\x02\x02\x02\u0687\u0689\x07", ")\x02\x02\u0688\u0678\x03\x02\x02\x02\u0688\u0680\x03", "\x02\x02\x02\u0689\xF2\x03\x02\x02\x02\u068A\u068E\n", "\b\x02\x02\u068B\u068C\x07^\x02\x02\u068C\u068E\x0B\x02", "\x02\x02\u068D\u068A\x03\x02\x02\x02\u068D\u068B\x03\x02", "\x02\x02\u068E\xF4\x03\x02\x02\x02\u068F\u0693\n\t\x02", "\x02\u0690\u0691\x07^\x02\x02\u0691\u0693\x0B\x02\x02", "\x02\u0692\u068F\x03\x02\x02\x02\u0692\u0690\x03\x02\x02", "\x02\u0693\xF6\x03\x02\x02\x02\u0694\u0696\t\n\x02\x02", "\u0695\u0694\x03\x02\x02\x02\u0696\u0697\x03\x02\x02\x02", "\u0697\u0695\x03\x02\x02\x02\u0697\u0698\x03\x02\x02\x02", "\u0698\u0699\x03\x02\x02\x02\u0699\u069A\b|\x02\x02\u069A", "\xF8\x03\x02\x02\x02\u069B\u069C\x071\x02\x02\u069C", "\u069D\x07,\x02\x02\u069D\u06A1\x03\x02\x02\x02\u069E", "\u06A0\x0B\x02\x02\x02\u069F\u069E\x03\x02\x02\x02\u06A0", "\u06A3\x03\x02\x02\x02\u06A1\u06A2\x03\x02\x02\x02\u06A1", "\u069F\x03\x02\x02\x02\u06A2\u06A4\x03\x02\x02\x02\u06A3", "\u06A1\x03\x02\x02\x02\u06A4\u06A5\x07,\x02\x02\u06A5", "\u06A6\x071\x02\x02\u06A6\u06A7\x03\x02\x02\x02\u06A7", "\u06A8\b}\x03\x02\u06A8\xFA\x03\x02\x02\x02\u06A9\u06AA", "\x071\x02\x02\u06AA\u06AB\x071\x02\x02\u06AB\u06AF\x03", "\x02\x02\x02\u06AC\u06AE\n\x0B\x02\x02\u06AD\u06AC\x03", "\x02\x02\x02\u06AE\u06B1\x03\x02\x02\x02\u06AF\u06AD\x03", "\x02\x02\x02\u06AF\u06B0\x03\x02\x02\x02\u06B0\u06B2\x03", "\x02\x02\x02\u06B1\u06AF\x03\x02\x02\x02\u06B2\u06B3\b", "~\x03\x02\u06B3\xFC\x03\x02\x02\x02%\x02\u0338\u0411", "\u04EF\u04FF\u0505\u0507\u0519\u051F\u0521\u0526\u052C\u0532\u053D\u0542", "\u0547\u054E\u0550\u0556\u0558\u055F\u0595\u059F\u05A7\u05AB\u060E\u0671", "\u067C\u0684\u0688\u068D\u0692\u0697\u06A1\u06AF\x04\b\x02\x02", "\x02\x03\x02"].join("");
var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);
var decisionsToDFA = atn.decisionToState.map(function (ds, index) {
  return new antlr4.dfa.DFA(ds, index);
});

function SolidityLexer(input) {
  antlr4.Lexer.call(this, input);
  this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
  return this;
}

SolidityLexer.prototype = Object.create(antlr4.Lexer.prototype);
SolidityLexer.prototype.constructor = SolidityLexer;
Object.defineProperty(SolidityLexer.prototype, "atn", {
  get: function get() {
    return atn;
  }
});
SolidityLexer.EOF = antlr4.Token.EOF;
SolidityLexer.T__0 = 1;
SolidityLexer.T__1 = 2;
SolidityLexer.T__2 = 3;
SolidityLexer.T__3 = 4;
SolidityLexer.T__4 = 5;
SolidityLexer.T__5 = 6;
SolidityLexer.T__6 = 7;
SolidityLexer.T__7 = 8;
SolidityLexer.T__8 = 9;
SolidityLexer.T__9 = 10;
SolidityLexer.T__10 = 11;
SolidityLexer.T__11 = 12;
SolidityLexer.T__12 = 13;
SolidityLexer.T__13 = 14;
SolidityLexer.T__14 = 15;
SolidityLexer.T__15 = 16;
SolidityLexer.T__16 = 17;
SolidityLexer.T__17 = 18;
SolidityLexer.T__18 = 19;
SolidityLexer.T__19 = 20;
SolidityLexer.T__20 = 21;
SolidityLexer.T__21 = 22;
SolidityLexer.T__22 = 23;
SolidityLexer.T__23 = 24;
SolidityLexer.T__24 = 25;
SolidityLexer.T__25 = 26;
SolidityLexer.T__26 = 27;
SolidityLexer.T__27 = 28;
SolidityLexer.T__28 = 29;
SolidityLexer.T__29 = 30;
SolidityLexer.T__30 = 31;
SolidityLexer.T__31 = 32;
SolidityLexer.T__32 = 33;
SolidityLexer.T__33 = 34;
SolidityLexer.T__34 = 35;
SolidityLexer.T__35 = 36;
SolidityLexer.T__36 = 37;
SolidityLexer.T__37 = 38;
SolidityLexer.T__38 = 39;
SolidityLexer.T__39 = 40;
SolidityLexer.T__40 = 41;
SolidityLexer.T__41 = 42;
SolidityLexer.T__42 = 43;
SolidityLexer.T__43 = 44;
SolidityLexer.T__44 = 45;
SolidityLexer.T__45 = 46;
SolidityLexer.T__46 = 47;
SolidityLexer.T__47 = 48;
SolidityLexer.T__48 = 49;
SolidityLexer.T__49 = 50;
SolidityLexer.T__50 = 51;
SolidityLexer.T__51 = 52;
SolidityLexer.T__52 = 53;
SolidityLexer.T__53 = 54;
SolidityLexer.T__54 = 55;
SolidityLexer.T__55 = 56;
SolidityLexer.T__56 = 57;
SolidityLexer.T__57 = 58;
SolidityLexer.T__58 = 59;
SolidityLexer.T__59 = 60;
SolidityLexer.T__60 = 61;
SolidityLexer.T__61 = 62;
SolidityLexer.T__62 = 63;
SolidityLexer.T__63 = 64;
SolidityLexer.T__64 = 65;
SolidityLexer.T__65 = 66;
SolidityLexer.T__66 = 67;
SolidityLexer.T__67 = 68;
SolidityLexer.T__68 = 69;
SolidityLexer.T__69 = 70;
SolidityLexer.T__70 = 71;
SolidityLexer.T__71 = 72;
SolidityLexer.T__72 = 73;
SolidityLexer.T__73 = 74;
SolidityLexer.T__74 = 75;
SolidityLexer.T__75 = 76;
SolidityLexer.T__76 = 77;
SolidityLexer.T__77 = 78;
SolidityLexer.T__78 = 79;
SolidityLexer.T__79 = 80;
SolidityLexer.T__80 = 81;
SolidityLexer.T__81 = 82;
SolidityLexer.T__82 = 83;
SolidityLexer.T__83 = 84;
SolidityLexer.T__84 = 85;
SolidityLexer.T__85 = 86;
SolidityLexer.T__86 = 87;
SolidityLexer.T__87 = 88;
SolidityLexer.T__88 = 89;
SolidityLexer.T__89 = 90;
SolidityLexer.Int = 91;
SolidityLexer.Uint = 92;
SolidityLexer.Byte = 93;
SolidityLexer.Fixed = 94;
SolidityLexer.Ufixed = 95;
SolidityLexer.VersionLiteral = 96;
SolidityLexer.BooleanLiteral = 97;
SolidityLexer.DecimalNumber = 98;
SolidityLexer.HexNumber = 99;
SolidityLexer.NumberUnit = 100;
SolidityLexer.HexLiteral = 101;
SolidityLexer.ReservedKeyword = 102;
SolidityLexer.AnonymousKeyword = 103;
SolidityLexer.BreakKeyword = 104;
SolidityLexer.ConstantKeyword = 105;
SolidityLexer.ContinueKeyword = 106;
SolidityLexer.ExternalKeyword = 107;
SolidityLexer.IndexedKeyword = 108;
SolidityLexer.InternalKeyword = 109;
SolidityLexer.PayableKeyword = 110;
SolidityLexer.PrivateKeyword = 111;
SolidityLexer.PublicKeyword = 112;
SolidityLexer.PureKeyword = 113;
SolidityLexer.ViewKeyword = 114;
SolidityLexer.Identifier = 115;
SolidityLexer.StringLiteral = 116;
SolidityLexer.WS = 117;
SolidityLexer.COMMENT = 118;
SolidityLexer.LINE_COMMENT = 119;
SolidityLexer.prototype.channelNames = ["DEFAULT_TOKEN_CHANNEL", "HIDDEN"];
SolidityLexer.prototype.modeNames = ["DEFAULT_MODE"];
SolidityLexer.prototype.literalNames = [null, "'pragma'", "';'", "'^'", "'~'", "'>='", "'>'", "'<'", "'<='", "'='", "'as'", "'import'", "'*'", "'from'", "'{'", "','", "'}'", "'contract'", "'interface'", "'library'", "'is'", "'('", "')'", "'using'", "'for'", "'struct'", "'constructor'", "'modifier'", "'function'", "'returns'", "'event'", "'enum'", "'['", "']'", "'address'", "'.'", "'mapping'", "'=>'", "'memory'", "'storage'", "'calldata'", "'if'", "'else'", "'while'", "'assembly'", "'do'", "'return'", "'throw'", "'emit'", "'var'", "'bool'", "'string'", "'byte'", "'++'", "'--'", "'new'", "'+'", "'-'", "'after'", "'delete'", "'!'", "'**'", "'/'", "'%'", "'<<'", "'>>'", "'&'", "'|'", "'=='", "'!='", "'&&'", "'||'", "'?'", "':'", "'|='", "'^='", "'&='", "'<<='", "'>>='", "'+='", "'-='", "'*='", "'/='", "'%='", "'let'", "':='", "'=:'", "'switch'", "'case'", "'default'", "'->'", null, null, null, null, null, null, null, null, null, null, null, null, "'anonymous'", "'break'", "'constant'", "'continue'", "'external'", "'indexed'", "'internal'", "'payable'", "'private'", "'public'", "'pure'", "'view'"];
SolidityLexer.prototype.symbolicNames = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Int", "Uint", "Byte", "Fixed", "Ufixed", "VersionLiteral", "BooleanLiteral", "DecimalNumber", "HexNumber", "NumberUnit", "HexLiteral", "ReservedKeyword", "AnonymousKeyword", "BreakKeyword", "ConstantKeyword", "ContinueKeyword", "ExternalKeyword", "IndexedKeyword", "InternalKeyword", "PayableKeyword", "PrivateKeyword", "PublicKeyword", "PureKeyword", "ViewKeyword", "Identifier", "StringLiteral", "WS", "COMMENT", "LINE_COMMENT"];
SolidityLexer.prototype.ruleNames = ["T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", "T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", "T__16", "T__17", "T__18", "T__19", "T__20", "T__21", "T__22", "T__23", "T__24", "T__25", "T__26", "T__27", "T__28", "T__29", "T__30", "T__31", "T__32", "T__33", "T__34", "T__35", "T__36", "T__37", "T__38", "T__39", "T__40", "T__41", "T__42", "T__43", "T__44", "T__45", "T__46", "T__47", "T__48", "T__49", "T__50", "T__51", "T__52", "T__53", "T__54", "T__55", "T__56", "T__57", "T__58", "T__59", "T__60", "T__61", "T__62", "T__63", "T__64", "T__65", "T__66", "T__67", "T__68", "T__69", "T__70", "T__71", "T__72", "T__73", "T__74", "T__75", "T__76", "T__77", "T__78", "T__79", "T__80", "T__81", "T__82", "T__83", "T__84", "T__85", "T__86", "T__87", "T__88", "T__89", "Int", "Uint", "Byte", "Fixed", "Ufixed", "VersionLiteral", "BooleanLiteral", "DecimalNumber", "HexNumber", "NumberUnit", "HexLiteral", "HexPair", "HexCharacter", "ReservedKeyword", "AnonymousKeyword", "BreakKeyword", "ConstantKeyword", "ContinueKeyword", "ExternalKeyword", "IndexedKeyword", "InternalKeyword", "PayableKeyword", "PrivateKeyword", "PublicKeyword", "PureKeyword", "ViewKeyword", "Identifier", "IdentifierStart", "IdentifierPart", "StringLiteral", "DoubleQuotedStringCharacter", "SingleQuotedStringCharacter", "WS", "COMMENT", "LINE_COMMENT"];
SolidityLexer.prototype.grammarFileName = "Solidity.g4";
exports.SolidityLexer = SolidityLexer;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Generated from solidity-antlr4/Solidity.g4 by ANTLR 4.7.2
// jshint ignore: start

var antlr4 = __webpack_require__(13);

var SolidityListener = __webpack_require__(109).SolidityListener;

var grammarFileName = "Solidity.g4";
var serializedATN = ["\x03\u608B\uA72A\u8133\uB9ED\u417C\u3BE7\u7786\u5964", "\x03y\u03C5\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t", '\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07\t\x07\x04', '\b\t\b\x04\t\t\t\x04\n\t\n\x04\x0B\t\x0B\x04\f\t\f\x04', '\r\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04', '\x11\t\x11\x04\x12\t\x12\x04\x13\t\x13\x04\x14\t', '\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04', '\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t', '\x1B\x04\x1C\t\x1C\x04\x1D\t\x1D\x04\x1E\t\x1E\x04', '\x1F\t\x1F\x04 \t \x04!\t!\x04"\t"\x04#\t#\x04$\t$\x04', '%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t+\x04', ',\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x04', '3\t3\x044\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04', ':\t:\x04;\t;\x04<\t<\x04=\t=\x04>\t>\x04?\t?\x04@\t@\x04', 'A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04F\tF\x04G\tG\x04', 'H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x04', 'O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04U\tU\x03', '\x02\x03\x02\x03\x02\x07\x02\xAE\n\x02\f\x02\x0E', '\x02\xB1\x0B\x02\x03\x02\x03\x02\x03\x03\x03\x03', '\x03\x03\x03\x03\x03\x03\x03\x04\x03\x04\x03\x05', '\x03\x05\x05\x05\xBE\n\x05\x03\x06\x03\x06\x05', '\x06\xC2\n\x06\x03\x07\x03\x07\x03\b\x05\b\xC7\n', '\b\x03\b\x03\b\x03\t\x03\t\x03\t\x05\t\xCE\n\t\x03\n', '\x03\n\x03\n\x03\n\x05\n\xD4\n\n\x03\n\x03\n\x03\n\x03', '\n\x05\n\xDA\n\n\x03\n\x03\n\x05\n\xDE\n\n\x03\n\x03', '\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x07\n\xE8\n\n', '\f\n\x0E\n\xEB\x0B\n\x03\n\x03\n\x03\n\x03\n\x03\n\x05', '\n\xF2\n\n\x03\x0B\x03\x0B\x03\x0B\x03\x0B\x03\x0B', '\x03\x0B\x07\x0B\xFA\n\x0B\f\x0B\x0E\x0B\xFD\x0B', '\x0B\x05\x0B\xFF\n\x0B\x03\x0B\x03\x0B\x07\x0B', "\u0103\n\x0B\f\x0B\x0E\x0B\u0106\x0B\x0B\x03\x0B\x03", "\x0B\x03\f\x03\f\x03\f\x03\f\x03\f\x07\f\u010F\n\f\f\f", "\x0E\f\u0112\x0B\f\x03\f\x03\f\x05\f\u0116\n\f\x03\r\x03", "\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x05\r\u0120\n\r", "\x03\x0E\x03\x0E\x07\x0E\u0124\n\x0E\f\x0E\x0E\x0E", "\u0127\x0B\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\u012C", '\n\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F', "\x03\x0F\x03\x0F\x05\x0F\u0135\n\x0F\x03\x0F\x03", '\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03', "\x10\x03\x10\x03\x10\x07\x10\u0141\n\x10\f\x10\x0E", "\x10\u0144\x0B\x10\x05\x10\u0146\n\x10\x03\x10\x03", '\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03', "\x12\x03\x12\x03\x12\x05\x12\u0152\n\x12\x03\x12", "\x03\x12\x03\x13\x03\x13\x03\x13\x05\x13\u0159\n", "\x13\x03\x13\x05\x13\u015C\n\x13\x03\x14\x03\x14", "\x05\x14\u0160\n\x14\x03\x14\x03\x14\x03\x14\x05", "\x14\u0165\n\x14\x03\x14\x03\x14\x05\x14\u0169\n\x14", '\x03\x15\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16', "\x03\x16\x03\x16\x03\x16\x07\x16\u0174\n\x16\f\x16", "\x0E\x16\u0177\x0B\x16\x03\x17\x03\x17\x03\x17\x03", "\x17\x05\x17\u017D\n\x17\x03\x17\x03\x17\x03\x18", '\x03\x18\x03\x19\x03\x19\x03\x19\x03\x19\x05\x19', "\u0187\n\x19\x03\x19\x03\x19\x07\x19\u018B\n\x19\f\x19", "\x0E\x19\u018E\x0B\x19\x03\x19\x03\x19\x03\x1A\x03", "\x1A\x03\x1A\x03\x1A\x07\x1A\u0196\n\x1A\f\x1A\x0E", "\x1A\u0199\x0B\x1A\x05\x1A\u019B\n\x1A\x03\x1A\x03", "\x1A\x03\x1B\x03\x1B\x05\x1B\u01A1\n\x1B\x03\x1B", "\x05\x1B\u01A4\n\x1B\x03\x1C\x03\x1C\x03\x1C\x03", "\x1C\x07\x1C\u01AA\n\x1C\f\x1C\x0E\x1C\u01AD\x0B\x1C", "\x05\x1C\u01AF\n\x1C\x03\x1C\x03\x1C\x03\x1D\x03", "\x1D\x05\x1D\u01B5\n\x1D\x03\x1D\x05\x1D\u01B8\n\x1D", "\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x07\x1E\u01BE\n", "\x1E\f\x1E\x0E\x1E\u01C1\x0B\x1E\x05\x1E\u01C3\n\x1E", "\x03\x1E\x03\x1E\x03\x1F\x03\x1F\x05\x1F\u01C9\n", "\x1F\x03 \x03 \x05 \u01CD\n \x03 \x03 \x03!\x03!\x03", "!\x03!\x03!\x03!\x03!\x05!\u01D8\n!\x03!\x03!\x03!\x05", "!\u01DD\n!\x03!\x07!\u01E0\n!\f!\x0E!\u01E3\x0B!\x03\"\x03", "\"\x03\"\x07\"\u01E8\n\"\f\"\x0E\"\u01EB\x0B\"\x03#\x03", '#\x03#\x03#\x03#\x03#\x03#\x03$\x03$\x03$\x03$\x03', "$\x07$\u01F9\n$\f$\x0E$\u01FC\x0B$\x03$\x03$\x05$\u0200", "\n$\x03%\x03%\x03&\x03&\x03'\x03'\x07'\u0208\n'\f", "'\x0E'\u020B\x0B'\x03'\x03'\x03(\x03(\x03(\x03", "(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x05(\u021B", '\n(\x03)\x03)\x03)\x03*\x03*\x03*\x03*\x03*\x03*\x03', "*\x05*\u0227\n*\x03+\x03+\x03+\x03+\x03+\x03+\x03,\x03", ",\x05,\u0231\n,\x03-\x03-\x03-\x03-\x05-\u0237\n-\x03", "-\x03-\x05-\u023B\n-\x03-\x05-\u023E\n-\x03-\x03-\x03", "-\x03.\x03.\x05.\u0245\n.\x03.\x03.\x03/\x03/\x03/\x03", '/\x03/\x03/\x03/\x03/\x030\x030\x030\x031\x031\x03', "1\x032\x032\x052\u0259\n2\x032\x032\x033\x033\x033\x03", '4\x034\x034\x034\x035\x035\x035\x035\x035\x035\x03', "5\x055\u026B\n5\x035\x035\x055\u026F\n5\x035\x035\x03", "6\x056\u0274\n6\x036\x036\x056\u0278\n6\x076\u027A\n6\f6\x0E", "6\u027D\x0B6\x037\x037\x057\u0281\n7\x037\x077\u0284\n7", "\f7\x0E7\u0287\x0B7\x037\x057\u028A\n7\x037\x037\x038", '\x038\x039\x039\x039\x039\x039\x039\x039\x039\x03', '9\x039\x039\x039\x039\x039\x039\x039\x039\x039\x05', "9\u02A2\n9\x039\x039\x039\x039\x039\x039\x039\x039\x03", '9\x039\x039\x039\x039\x039\x039\x039\x039\x039\x03', '9\x039\x039\x039\x039\x039\x039\x039\x039\x039\x03', '9\x039\x039\x039\x039\x039\x039\x039\x039\x039\x03', '9\x039\x039\x039\x039\x039\x039\x039\x039\x039\x03', "9\x039\x039\x039\x039\x039\x039\x039\x039\x079\u02DD", "\n9\f9\x0E9\u02E0\x0B9\x03:\x03:\x03:\x03:\x03:\x03", ":\x03:\x05:\u02E9\n:\x03:\x03:\x03:\x03:\x05:\u02EF\n", ":\x05:\u02F1\n:\x03;\x03;\x03;\x07;\u02F6\n;\f;\x0E;\u02F9", "\x0B;\x03<\x03<\x03<\x07<\u02FE\n<\f<\x0E<\u0301\x0B<", "\x03<\x05<\u0304\n<\x03=\x03=\x03=\x03=\x03>\x03>\x05", ">\u030C\n>\x03>\x03>\x05>\u0310\n>\x05>\u0312\n>\x03?\x03", "?\x03?\x03?\x03?\x03@\x03@\x07@\u031B\n@\f@\x0E@\u031E", '\x0B@\x03@\x03@\x03A\x03A\x03A\x03A\x03A\x03A\x03', 'A\x03A\x03A\x03A\x03A\x03A\x03A\x03A\x03A\x03A\x03', "A\x05A\u0333\nA\x03B\x03B\x05B\u0337\nB\x03C\x03C\x03", "C\x03C\x05C\u033D\nC\x03C\x03C\x05C\u0341\nC\x03C\x03", "C\x07C\u0345\nC\fC\x0EC\u0348\x0BC\x03C\x05C\u034B\nC\x03", "D\x03D\x03D\x03D\x05D\u0351\nD\x03E\x03E\x03E\x03E\x03", "F\x03F\x03F\x03F\x03F\x05F\u035C\nF\x03G\x03G\x03G\x07", "G\u0361\nG\fG\x0EG\u0364\x0BG\x03H\x03H\x03H\x03I\x03", "I\x03I\x03J\x03J\x03J\x07J\u036F\nJ\fJ\x0EJ\u0372\x0B", "J\x03K\x03K\x03K\x03K\x03K\x03K\x05K\u037A\nK\x03L\x03", "L\x03L\x03L\x05L\u0380\nL\x03L\x03L\x05L\u0384\nL\x03", "L\x03L\x03M\x03M\x03M\x03N\x03N\x03N\x05N\u038E\nN\x03", "N\x03N\x03N\x05N\u0393\nN\x03N\x03N\x03O\x03O\x03O\x03", "O\x03P\x03P\x03Q\x03Q\x03Q\x03Q\x03R\x03R\x05R\u03A3", "\nR\x03R\x03R\x05R\u03A7\nR\x07R\u03A9\nR\fR\x0ER\u03AC\x0B", "R\x03R\x03R\x03R\x03R\x03R\x07R\u03B3\nR\fR\x0ER\u03B6", "\x0BR\x05R\u03B8\nR\x03R\x05R\u03BB\nR\x03S\x03S\x03T", "\x03T\x05T\u03C1\nT\x03U\x03U\x03U\x02\x04@pV\x02\x04", '\x06\b\n\f\x0E\x10\x12\x14\x16\x18\x1A\x1C\x1E ', '"$&(*,.02468:<>@BDFHJLNPRTVXZ\\^`bdfhjlnprtvxz|~\x80\x82\x84', '\x86\x88\x8A\x8C\x8E\x90\x92\x94\x96\x98\x9A\x9C', '\x9E\xA0\xA2\xA4\xA6\xA8\x02\x13\x03\x02\x05\x0B', '\x03\x02\x13\x15\x05\x02kkooqr\x03\x02(*\x05\x02', 'kkppst\x05\x02$$36]a\x03\x0278\x03\x02:;\x03\x02<=\x04', '\x02\x0E\x0E@A\x03\x02BC\x03\x02\x07\n\x03\x02F', 'G\x04\x02\x0B\x0BLU\x05\x02deggvv\x03\x02de\x05\x02', "\x0F\x0F**uu\x02\u041E\x02\xAF\x03\x02\x02\x02\x04", '\xB4\x03\x02\x02\x02\x06\xB9\x03\x02\x02\x02\b', '\xBD\x03\x02\x02\x02\n\xBF\x03\x02\x02\x02\f\xC3', '\x03\x02\x02\x02\x0E\xC6\x03\x02\x02\x02\x10\xCA', '\x03\x02\x02\x02\x12\xF1\x03\x02\x02\x02\x14\xF3', "\x03\x02\x02\x02\x16\u0109\x03\x02\x02\x02\x18\u011F", "\x03\x02\x02\x02\x1A\u0121\x03\x02\x02\x02\x1C\u012F", "\x03\x02\x02\x02\x1E\u0138\x03\x02\x02\x02 \u0149", "\x03\x02\x02\x02\"\u014E\x03\x02\x02\x02$\u0155\x03", "\x02\x02\x02&\u015D\x03\x02\x02\x02(\u016A\x03\x02", "\x02\x02*\u0175\x03\x02\x02\x02,\u0178\x03\x02\x02", "\x02.\u0180\x03\x02\x02\x020\u0182\x03\x02\x02\x02", "2\u0191\x03\x02\x02\x024\u019E\x03\x02\x02\x026\u01A5", "\x03\x02\x02\x028\u01B2\x03\x02\x02\x02:\u01B9\x03", "\x02\x02\x02<\u01C6\x03\x02\x02\x02>\u01CA\x03\x02", "\x02\x02@\u01D7\x03\x02\x02\x02B\u01E4\x03\x02\x02", "\x02D\u01EC\x03\x02\x02\x02F\u01F3\x03\x02\x02\x02", "H\u0201\x03\x02\x02\x02J\u0203\x03\x02\x02\x02L\u0205", "\x03\x02\x02\x02N\u021A\x03\x02\x02\x02P\u021C\x03", "\x02\x02\x02R\u021F\x03\x02\x02\x02T\u0228\x03\x02", "\x02\x02V\u0230\x03\x02\x02\x02X\u0232\x03\x02\x02", "\x02Z\u0242\x03\x02\x02\x02\\\u0248\x03\x02\x02\x02", "^\u0250\x03\x02\x02\x02`\u0253\x03\x02\x02\x02b\u0256", "\x03\x02\x02\x02d\u025C\x03\x02\x02\x02f\u025F\x03", "\x02\x02\x02h\u026A\x03\x02\x02\x02j\u0273\x03\x02", "\x02\x02l\u027E\x03\x02\x02\x02n\u028D\x03\x02\x02", "\x02p\u02A1\x03\x02\x02\x02r\u02F0\x03\x02\x02\x02", "t\u02F2\x03\x02\x02\x02v\u02FA\x03\x02\x02\x02x\u0305", "\x03\x02\x02\x02z\u0311\x03\x02\x02\x02|\u0313\x03", "\x02\x02\x02~\u0318\x03\x02\x02\x02\x80\u0332\x03", "\x02\x02\x02\x82\u0336\x03\x02\x02\x02\x84\u033C\x03", "\x02\x02\x02\x86\u034C\x03\x02\x02\x02\x88\u0352\x03", "\x02\x02\x02\x8A\u035B\x03\x02\x02\x02\x8C\u035D\x03", "\x02\x02\x02\x8E\u0365\x03\x02\x02\x02\x90\u0368\x03", "\x02\x02\x02\x92\u036B\x03\x02\x02\x02\x94\u0379\x03", "\x02\x02\x02\x96\u037B\x03\x02\x02\x02\x98\u0387\x03", "\x02\x02\x02\x9A\u038A\x03\x02\x02\x02\x9C\u0396\x03", "\x02\x02\x02\x9E\u039A\x03\x02\x02\x02\xA0\u039C\x03", "\x02\x02\x02\xA2\u03BA\x03\x02\x02\x02\xA4\u03BC\x03", "\x02\x02\x02\xA6\u03BE\x03\x02\x02\x02\xA8\u03C2\x03", '\x02\x02\x02\xAA\xAE\x05\x04\x03\x02\xAB\xAE\x05', '\x12\n\x02\xAC\xAE\x05\x14\x0B\x02\xAD\xAA\x03', '\x02\x02\x02\xAD\xAB\x03\x02\x02\x02\xAD\xAC\x03', '\x02\x02\x02\xAE\xB1\x03\x02\x02\x02\xAF\xAD\x03', '\x02\x02\x02\xAF\xB0\x03\x02\x02\x02\xB0\xB2\x03', '\x02\x02\x02\xB1\xAF\x03\x02\x02\x02\xB2\xB3\x07', '\x02\x02\x03\xB3\x03\x03\x02\x02\x02\xB4\xB5\x07', '\x03\x02\x02\xB5\xB6\x05\x06\x04\x02\xB6\xB7\x05', '\b\x05\x02\xB7\xB8\x07\x04\x02\x02\xB8\x05\x03', '\x02\x02\x02\xB9\xBA\x05\xA8U\x02\xBA\x07\x03', '\x02\x02\x02\xBB\xBE\x05\n\x06\x02\xBC\xBE\x05', 'p9\x02\xBD\xBB\x03\x02\x02\x02\xBD\xBC\x03\x02', '\x02\x02\xBE\t\x03\x02\x02\x02\xBF\xC1\x05\x0E', '\b\x02\xC0\xC2\x05\x0E\b\x02\xC1\xC0\x03\x02\x02', '\x02\xC1\xC2\x03\x02\x02\x02\xC2\x0B\x03\x02\x02', '\x02\xC3\xC4\t\x02\x02\x02\xC4\r\x03\x02\x02\x02', '\xC5\xC7\x05\f\x07\x02\xC6\xC5\x03\x02\x02\x02', '\xC6\xC7\x03\x02\x02\x02\xC7\xC8\x03\x02\x02\x02', '\xC8\xC9\x07b\x02\x02\xC9\x0F\x03\x02\x02\x02', '\xCA\xCD\x05\xA8U\x02\xCB\xCC\x07\f\x02\x02\xCC', '\xCE\x05\xA8U\x02\xCD\xCB\x03\x02\x02\x02\xCD', '\xCE\x03\x02\x02\x02\xCE\x11\x03\x02\x02\x02\xCF', '\xD0\x07\r\x02\x02\xD0\xD3\x07v\x02\x02\xD1\xD2', '\x07\f\x02\x02\xD2\xD4\x05\xA8U\x02\xD3\xD1\x03', '\x02\x02\x02\xD3\xD4\x03\x02\x02\x02\xD4\xD5\x03', '\x02\x02\x02\xD5\xF2\x07\x04\x02\x02\xD6\xD9\x07', '\r\x02\x02\xD7\xDA\x07\x0E\x02\x02\xD8\xDA\x05', '\xA8U\x02\xD9\xD7\x03\x02\x02\x02\xD9\xD8\x03', '\x02\x02\x02\xDA\xDD\x03\x02\x02\x02\xDB\xDC\x07', '\f\x02\x02\xDC\xDE\x05\xA8U\x02\xDD\xDB\x03\x02', '\x02\x02\xDD\xDE\x03\x02\x02\x02\xDE\xDF\x03\x02', '\x02\x02\xDF\xE0\x07\x0F\x02\x02\xE0\xE1\x07v', '\x02\x02\xE1\xF2\x07\x04\x02\x02\xE2\xE3\x07\r', '\x02\x02\xE3\xE4\x07\x10\x02\x02\xE4\xE9\x05\x10', '\t\x02\xE5\xE6\x07\x11\x02\x02\xE6\xE8\x05\x10', '\t\x02\xE7\xE5\x03\x02\x02\x02\xE8\xEB\x03\x02', '\x02\x02\xE9\xE7\x03\x02\x02\x02\xE9\xEA\x03\x02', '\x02\x02\xEA\xEC\x03\x02\x02\x02\xEB\xE9\x03\x02', '\x02\x02\xEC\xED\x07\x12\x02\x02\xED\xEE\x07\x0F', '\x02\x02\xEE\xEF\x07v\x02\x02\xEF\xF0\x07\x04', '\x02\x02\xF0\xF2\x03\x02\x02\x02\xF1\xCF\x03\x02', '\x02\x02\xF1\xD6\x03\x02\x02\x02\xF1\xE2\x03\x02', '\x02\x02\xF2\x13\x03\x02\x02\x02\xF3\xF4\t\x03', '\x02\x02\xF4\xFE\x05\xA8U\x02\xF5\xF6\x07\x16', '\x02\x02\xF6\xFB\x05\x16\f\x02\xF7\xF8\x07\x11', '\x02\x02\xF8\xFA\x05\x16\f\x02\xF9\xF7\x03\x02', '\x02\x02\xFA\xFD\x03\x02\x02\x02\xFB\xF9\x03\x02', '\x02\x02\xFB\xFC\x03\x02\x02\x02\xFC\xFF\x03\x02', '\x02\x02\xFD\xFB\x03\x02\x02\x02\xFE\xF5\x03\x02', "\x02\x02\xFE\xFF\x03\x02\x02\x02\xFF\u0100\x03\x02", "\x02\x02\u0100\u0104\x07\x10\x02\x02\u0101\u0103\x05\x18", "\r\x02\u0102\u0101\x03\x02\x02\x02\u0103\u0106\x03\x02", "\x02\x02\u0104\u0102\x03\x02\x02\x02\u0104\u0105\x03\x02", "\x02\x02\u0105\u0107\x03\x02\x02\x02\u0106\u0104\x03\x02", "\x02\x02\u0107\u0108\x07\x12\x02\x02\u0108\x15\x03\x02", "\x02\x02\u0109\u0115\x05B\"\x02\u010A\u010B\x07\x17\x02", "\x02\u010B\u0110\x05p9\x02\u010C\u010D\x07\x11\x02\x02", "\u010D\u010F\x05p9\x02\u010E\u010C\x03\x02\x02\x02\u010F", "\u0112\x03\x02\x02\x02\u0110\u010E\x03\x02\x02\x02\u0110", "\u0111\x03\x02\x02\x02\u0111\u0113\x03\x02\x02\x02\u0112", "\u0110\x03\x02\x02\x02\u0113\u0114\x07\x18\x02\x02\u0114", "\u0116\x03\x02\x02\x02\u0115\u010A\x03\x02\x02\x02\u0115", "\u0116\x03\x02\x02\x02\u0116\x17\x03\x02\x02\x02\u0117", "\u0120\x05\x1A\x0E\x02\u0118\u0120\x05\x1C\x0F\x02\u0119", "\u0120\x05\x1E\x10\x02\u011A\u0120\x05 \x11\x02\u011B", "\u0120\x05\"\x12\x02\u011C\u0120\x05&\x14\x02\u011D\u0120", "\x05,\x17\x02\u011E\u0120\x050\x19\x02\u011F\u0117\x03", "\x02\x02\x02\u011F\u0118\x03\x02\x02\x02\u011F\u0119\x03", "\x02\x02\x02\u011F\u011A\x03\x02\x02\x02\u011F\u011B\x03", "\x02\x02\x02\u011F\u011C\x03\x02\x02\x02\u011F\u011D\x03", "\x02\x02\x02\u011F\u011E\x03\x02\x02\x02\u0120\x19\x03", "\x02\x02\x02\u0121\u0125\x05@!\x02\u0122\u0124\t\x04\x02", "\x02\u0123\u0122\x03\x02\x02\x02\u0124\u0127\x03\x02\x02", "\x02\u0125\u0123\x03\x02\x02\x02\u0125\u0126\x03\x02\x02", "\x02\u0126\u0128\x03\x02\x02\x02\u0127\u0125\x03\x02\x02", "\x02\u0128\u012B\x05\xA8U\x02\u0129\u012A\x07\x0B\x02", "\x02\u012A\u012C\x05p9\x02\u012B\u0129\x03\x02\x02\x02", "\u012B\u012C\x03\x02\x02\x02\u012C\u012D\x03\x02\x02\x02", "\u012D\u012E\x07\x04\x02\x02\u012E\x1B\x03\x02\x02\x02", "\u012F\u0130\x07\x19\x02\x02\u0130\u0131\x05\xA8U\x02", "\u0131\u0134\x07\x1A\x02\x02\u0132\u0135\x07\x0E\x02\x02", "\u0133\u0135\x05@!\x02\u0134\u0132\x03\x02\x02\x02\u0134", "\u0133\x03\x02\x02\x02\u0135\u0136\x03\x02\x02\x02\u0136", "\u0137\x07\x04\x02\x02\u0137\x1D\x03\x02\x02\x02\u0138", "\u0139\x07\x1B\x02\x02\u0139\u013A\x05\xA8U\x02\u013A", "\u0145\x07\x10\x02\x02\u013B\u013C\x05> \x02\u013C\u0142", "\x07\x04\x02\x02\u013D\u013E\x05> \x02\u013E\u013F\x07", "\x04\x02\x02\u013F\u0141\x03\x02\x02\x02\u0140\u013D\x03", "\x02\x02\x02\u0141\u0144\x03\x02\x02\x02\u0142\u0140\x03", "\x02\x02\x02\u0142\u0143\x03\x02\x02\x02\u0143\u0146\x03", "\x02\x02\x02\u0144\u0142\x03\x02\x02\x02\u0145\u013B\x03", "\x02\x02\x02\u0145\u0146\x03\x02\x02\x02\u0146\u0147\x03", "\x02\x02\x02\u0147\u0148\x07\x12\x02\x02\u0148\x1F\x03", "\x02\x02\x02\u0149\u014A\x07\x1C\x02\x02\u014A\u014B\x05", "2\x1A\x02\u014B\u014C\x05*\x16\x02\u014C\u014D\x05L'\x02", "\u014D!\x03\x02\x02\x02\u014E\u014F\x07\x1D\x02\x02", "\u014F\u0151\x05\xA8U\x02\u0150\u0152\x052\x1A\x02\u0151", "\u0150\x03\x02\x02\x02\u0151\u0152\x03\x02\x02\x02\u0152", "\u0153\x03\x02\x02\x02\u0153\u0154\x05L'\x02\u0154#\x03", "\x02\x02\x02\u0155\u015B\x05\xA8U\x02\u0156\u0158\x07", "\x17\x02\x02\u0157\u0159\x05t;\x02\u0158\u0157\x03\x02", "\x02\x02\u0158\u0159\x03\x02\x02\x02\u0159\u015A\x03\x02", "\x02\x02\u015A\u015C\x07\x18\x02\x02\u015B\u0156\x03\x02", "\x02\x02\u015B\u015C\x03\x02\x02\x02\u015C%\x03\x02", "\x02\x02\u015D\u015F\x07\x1E\x02\x02\u015E\u0160\x05\xA8", "U\x02\u015F\u015E\x03\x02\x02\x02\u015F\u0160\x03\x02", "\x02\x02\u0160\u0161\x03\x02\x02\x02\u0161\u0162\x052", "\x1A\x02\u0162\u0164\x05*\x16\x02\u0163\u0165\x05(\x15", "\x02\u0164\u0163\x03\x02\x02\x02\u0164\u0165\x03\x02\x02", "\x02\u0165\u0168\x03\x02\x02\x02\u0166\u0169\x07\x04\x02", "\x02\u0167\u0169\x05L'\x02\u0168\u0166\x03\x02\x02\x02", "\u0168\u0167\x03\x02\x02\x02\u0169'\x03\x02\x02\x02", "\u016A\u016B\x07\x1F\x02\x02\u016B\u016C\x052\x1A\x02", "\u016C)\x03\x02\x02\x02\u016D\u0174\x05$\x13\x02\u016E", "\u0174\x05J&\x02\u016F\u0174\x07m\x02\x02\u0170\u0174\x07", "r\x02\x02\u0171\u0174\x07o\x02\x02\u0172\u0174\x07q\x02", "\x02\u0173\u016D\x03\x02\x02\x02\u0173\u016E\x03\x02\x02", "\x02\u0173\u016F\x03\x02\x02\x02\u0173\u0170\x03\x02\x02", "\x02\u0173\u0171\x03\x02\x02\x02\u0173\u0172\x03\x02\x02", "\x02\u0174\u0177\x03\x02\x02\x02\u0175\u0173\x03\x02\x02", "\x02\u0175\u0176\x03\x02\x02\x02\u0176+\x03\x02\x02", "\x02\u0177\u0175\x03\x02\x02\x02\u0178\u0179\x07 \x02", "\x02\u0179\u017A\x05\xA8U\x02\u017A\u017C\x056\x1C\x02", "\u017B\u017D\x07i\x02\x02\u017C\u017B\x03\x02\x02\x02", "\u017C\u017D\x03\x02\x02\x02\u017D\u017E\x03\x02\x02\x02", "\u017E\u017F\x07\x04\x02\x02\u017F-\x03\x02\x02\x02", "\u0180\u0181\x05\xA8U\x02\u0181/\x03\x02\x02\x02\u0182", "\u0183\x07!\x02\x02\u0183\u0184\x05\xA8U\x02\u0184\u0186", "\x07\x10\x02\x02\u0185\u0187\x05.\x18\x02\u0186\u0185", "\x03\x02\x02\x02\u0186\u0187\x03\x02\x02\x02\u0187\u018C", "\x03\x02\x02\x02\u0188\u0189\x07\x11\x02\x02\u0189\u018B", "\x05.\x18\x02\u018A\u0188\x03\x02\x02\x02\u018B\u018E", "\x03\x02\x02\x02\u018C\u018A\x03\x02\x02\x02\u018C\u018D", "\x03\x02\x02\x02\u018D\u018F\x03\x02\x02\x02\u018E\u018C", "\x03\x02\x02\x02\u018F\u0190\x07\x12\x02\x02\u01901", "\x03\x02\x02\x02\u0191\u019A\x07\x17\x02\x02\u0192\u0197", "\x054\x1B\x02\u0193\u0194\x07\x11\x02\x02\u0194\u0196", "\x054\x1B\x02\u0195\u0193\x03\x02\x02\x02\u0196\u0199", "\x03\x02\x02\x02\u0197\u0195\x03\x02\x02\x02\u0197\u0198", "\x03\x02\x02\x02\u0198\u019B\x03\x02\x02\x02\u0199\u0197", "\x03\x02\x02\x02\u019A\u0192\x03\x02\x02\x02\u019A\u019B", "\x03\x02\x02\x02\u019B\u019C\x03\x02\x02\x02\u019C\u019D", "\x07\x18\x02\x02\u019D3\x03\x02\x02\x02\u019E\u01A0", "\x05@!\x02\u019F\u01A1\x05H%\x02\u01A0\u019F\x03\x02\x02", "\x02\u01A0\u01A1\x03\x02\x02\x02\u01A1\u01A3\x03\x02\x02", "\x02\u01A2\u01A4\x05\xA8U\x02\u01A3\u01A2\x03\x02\x02", "\x02\u01A3\u01A4\x03\x02\x02\x02\u01A45\x03\x02\x02", "\x02\u01A5\u01AE\x07\x17\x02\x02\u01A6\u01AB\x058\x1D", "\x02\u01A7\u01A8\x07\x11\x02\x02\u01A8\u01AA\x058\x1D", "\x02\u01A9\u01A7\x03\x02\x02\x02\u01AA\u01AD\x03\x02\x02", "\x02\u01AB\u01A9\x03\x02\x02\x02\u01AB\u01AC\x03\x02\x02", "\x02\u01AC\u01AF\x03\x02\x02\x02\u01AD\u01AB\x03\x02\x02", "\x02\u01AE\u01A6\x03\x02\x02\x02\u01AE\u01AF\x03\x02\x02", "\x02\u01AF\u01B0\x03\x02\x02\x02\u01B0\u01B1\x07\x18\x02", "\x02\u01B17\x03\x02\x02\x02\u01B2\u01B4\x05@!\x02\u01B3", "\u01B5\x07n\x02\x02\u01B4\u01B3\x03\x02\x02\x02\u01B4", "\u01B5\x03\x02\x02\x02\u01B5\u01B7\x03\x02\x02\x02\u01B6", "\u01B8\x05\xA8U\x02\u01B7\u01B6\x03\x02\x02\x02\u01B7", "\u01B8\x03\x02\x02\x02\u01B89\x03\x02\x02\x02\u01B9", "\u01C2\x07\x17\x02\x02\u01BA\u01BF\x05<\x1F\x02\u01BB", "\u01BC\x07\x11\x02\x02\u01BC\u01BE\x05<\x1F\x02\u01BD", "\u01BB\x03\x02\x02\x02\u01BE\u01C1\x03\x02\x02\x02\u01BF", "\u01BD\x03\x02\x02\x02\u01BF\u01C0\x03\x02\x02\x02\u01C0", "\u01C3\x03\x02\x02\x02\u01C1\u01BF\x03\x02\x02\x02\u01C2", "\u01BA\x03\x02\x02\x02\u01C2\u01C3\x03\x02\x02\x02\u01C3", "\u01C4\x03\x02\x02\x02\u01C4\u01C5\x07\x18\x02\x02\u01C5", ";\x03\x02\x02\x02\u01C6\u01C8\x05@!\x02\u01C7\u01C9\x05", "H%\x02\u01C8\u01C7\x03\x02\x02\x02\u01C8\u01C9\x03\x02", "\x02\x02\u01C9=\x03\x02\x02\x02\u01CA\u01CC\x05@!\x02", "\u01CB\u01CD\x05H%\x02\u01CC\u01CB\x03\x02\x02\x02\u01CC", "\u01CD\x03\x02\x02\x02\u01CD\u01CE\x03\x02\x02\x02\u01CE", "\u01CF\x05\xA8U\x02\u01CF?\x03\x02\x02\x02\u01D0\u01D1", "\b!\x01\x02\u01D1\u01D8\x05n8\x02\u01D2\u01D8\x05B\"\x02", "\u01D3\u01D8\x05D#\x02\u01D4\u01D8\x05F$\x02\u01D5\u01D6\x07", "$\x02\x02\u01D6\u01D8\x07p\x02\x02\u01D7\u01D0\x03\x02", "\x02\x02\u01D7\u01D2\x03\x02\x02\x02\u01D7\u01D3\x03\x02", "\x02\x02\u01D7\u01D4\x03\x02\x02\x02\u01D7\u01D5\x03\x02", "\x02\x02\u01D8\u01E1\x03\x02\x02\x02\u01D9\u01DA\f\x05", "\x02\x02\u01DA\u01DC\x07\"\x02\x02\u01DB\u01DD\x05p9\x02", "\u01DC\u01DB\x03\x02\x02\x02\u01DC\u01DD\x03\x02\x02\x02", "\u01DD\u01DE\x03\x02\x02\x02\u01DE\u01E0\x07#\x02\x02", "\u01DF\u01D9\x03\x02\x02\x02\u01E0\u01E3\x03\x02\x02\x02", "\u01E1\u01DF\x03\x02\x02\x02\u01E1\u01E2\x03\x02\x02\x02", "\u01E2A\x03\x02\x02\x02\u01E3\u01E1\x03\x02\x02\x02", "\u01E4\u01E9\x05\xA8U\x02\u01E5\u01E6\x07%\x02\x02\u01E6", "\u01E8\x05\xA8U\x02\u01E7\u01E5\x03\x02\x02\x02\u01E8", "\u01EB\x03\x02\x02\x02\u01E9\u01E7\x03\x02\x02\x02\u01E9", "\u01EA\x03\x02\x02\x02\u01EAC\x03\x02\x02\x02\u01EB", "\u01E9\x03\x02\x02\x02\u01EC\u01ED\x07&\x02\x02\u01ED", "\u01EE\x07\x17\x02\x02\u01EE\u01EF\x05n8\x02\u01EF\u01F0", "\x07'\x02\x02\u01F0\u01F1\x05@!\x02\u01F1\u01F2\x07\x18", "\x02\x02\u01F2E\x03\x02\x02\x02\u01F3\u01F4\x07\x1E", "\x02\x02\u01F4\u01FA\x05:\x1E\x02\u01F5\u01F9\x07o\x02", "\x02\u01F6\u01F9\x07m\x02\x02\u01F7\u01F9\x05J&\x02\u01F8", "\u01F5\x03\x02\x02\x02\u01F8\u01F6\x03\x02\x02\x02\u01F8", "\u01F7\x03\x02\x02\x02\u01F9\u01FC\x03\x02\x02\x02\u01FA", "\u01F8\x03\x02\x02\x02\u01FA\u01FB\x03\x02\x02\x02\u01FB", "\u01FF\x03\x02\x02\x02\u01FC\u01FA\x03\x02\x02\x02\u01FD", "\u01FE\x07\x1F\x02\x02\u01FE\u0200\x05:\x1E\x02\u01FF", "\u01FD\x03\x02\x02\x02\u01FF\u0200\x03\x02\x02\x02\u0200", "G\x03\x02\x02\x02\u0201\u0202\t\x05\x02\x02\u0202I\x03", "\x02\x02\x02\u0203\u0204\t\x06\x02\x02\u0204K\x03\x02", "\x02\x02\u0205\u0209\x07\x10\x02\x02\u0206\u0208\x05N", "(\x02\u0207\u0206\x03\x02\x02\x02\u0208\u020B\x03\x02", "\x02\x02\u0209\u0207\x03\x02\x02\x02\u0209\u020A\x03\x02", "\x02\x02\u020A\u020C\x03\x02\x02\x02\u020B\u0209\x03\x02", "\x02\x02\u020C\u020D\x07\x12\x02\x02\u020DM\x03\x02", "\x02\x02\u020E\u021B\x05R*\x02\u020F\u021B\x05T+\x02\u0210", "\u021B\x05X-\x02\u0211\u021B\x05L'\x02\u0212\u021B\x05Z.", "\x02\u0213\u021B\x05\\/\x02\u0214\u021B\x05^0\x02\u0215\u021B", "\x05`1\x02\u0216\u021B\x05b2\x02\u0217\u021B\x05d3\x02\u0218", "\u021B\x05f4\x02\u0219\u021B\x05V,\x02\u021A\u020E\x03\x02", "\x02\x02\u021A\u020F\x03\x02\x02\x02\u021A\u0210\x03\x02", "\x02\x02\u021A\u0211\x03\x02\x02\x02\u021A\u0212\x03\x02", "\x02\x02\u021A\u0213\x03\x02\x02\x02\u021A\u0214\x03\x02", "\x02\x02\u021A\u0215\x03\x02\x02\x02\u021A\u0216\x03\x02", "\x02\x02\u021A\u0217\x03\x02\x02\x02\u021A\u0218\x03\x02", "\x02\x02\u021A\u0219\x03\x02\x02\x02\u021BO\x03\x02", "\x02\x02\u021C\u021D\x05p9\x02\u021D\u021E\x07\x04\x02", "\x02\u021EQ\x03\x02\x02\x02\u021F\u0220\x07+\x02\x02", "\u0220\u0221\x07\x17\x02\x02\u0221\u0222\x05p9\x02\u0222", "\u0223\x07\x18\x02\x02\u0223\u0226\x05N(\x02\u0224\u0225", "\x07,\x02\x02\u0225\u0227\x05N(\x02\u0226\u0224\x03\x02", "\x02\x02\u0226\u0227\x03\x02\x02\x02\u0227S\x03\x02", "\x02\x02\u0228\u0229\x07-\x02\x02\u0229\u022A\x07\x17", "\x02\x02\u022A\u022B\x05p9\x02\u022B\u022C\x07\x18\x02", "\x02\u022C\u022D\x05N(\x02\u022DU\x03\x02\x02\x02\u022E", "\u0231\x05h5\x02\u022F\u0231\x05P)\x02\u0230\u022E\x03\x02", "\x02\x02\u0230\u022F\x03\x02\x02\x02\u0231W\x03\x02", "\x02\x02\u0232\u0233\x07\x1A\x02\x02\u0233\u0236\x07\x17", "\x02\x02\u0234\u0237\x05V,\x02\u0235\u0237\x07\x04\x02", "\x02\u0236\u0234\x03\x02\x02\x02\u0236\u0235\x03\x02\x02", "\x02\u0237\u023A\x03\x02\x02\x02\u0238\u023B\x05P)\x02", "\u0239\u023B\x07\x04\x02\x02\u023A\u0238\x03\x02\x02\x02", "\u023A\u0239\x03\x02\x02\x02\u023B\u023D\x03\x02\x02\x02", "\u023C\u023E\x05p9\x02\u023D\u023C\x03\x02\x02\x02\u023D", "\u023E\x03\x02\x02\x02\u023E\u023F\x03\x02\x02\x02\u023F", "\u0240\x07\x18\x02\x02\u0240\u0241\x05N(\x02\u0241Y\x03", "\x02\x02\x02\u0242\u0244\x07.\x02\x02\u0243\u0245\x07", "v\x02\x02\u0244\u0243\x03\x02\x02\x02\u0244\u0245\x03", "\x02\x02\x02\u0245\u0246\x03\x02\x02\x02\u0246\u0247\x05", "~@\x02\u0247[\x03\x02\x02\x02\u0248\u0249\x07/\x02\x02", "\u0249\u024A\x05N(\x02\u024A\u024B\x07-\x02\x02\u024B\u024C", "\x07\x17\x02\x02\u024C\u024D\x05p9\x02\u024D\u024E\x07", "\x18\x02\x02\u024E\u024F\x07\x04\x02\x02\u024F]\x03", "\x02\x02\x02\u0250\u0251\x07l\x02\x02\u0251\u0252\x07", "\x04\x02\x02\u0252_\x03\x02\x02\x02\u0253\u0254\x07", "j\x02\x02\u0254\u0255\x07\x04\x02\x02\u0255a\x03\x02", "\x02\x02\u0256\u0258\x070\x02\x02\u0257\u0259\x05p9\x02", "\u0258\u0257\x03\x02\x02\x02\u0258\u0259\x03\x02\x02\x02", "\u0259\u025A\x03\x02\x02\x02\u025A\u025B\x07\x04\x02\x02", "\u025Bc\x03\x02\x02\x02\u025C\u025D\x071\x02\x02\u025D", "\u025E\x07\x04\x02\x02\u025Ee\x03\x02\x02\x02\u025F", "\u0260\x072\x02\x02\u0260\u0261\x05|?\x02\u0261\u0262\x07", "\x04\x02\x02\u0262g\x03\x02\x02\x02\u0263\u0264\x07", "3\x02\x02\u0264\u026B\x05l7\x02\u0265\u026B\x05> \x02\u0266", "\u0267\x07\x17\x02\x02\u0267\u0268\x05j6\x02\u0268\u0269", "\x07\x18\x02\x02\u0269\u026B\x03\x02\x02\x02\u026A\u0263", "\x03\x02\x02\x02\u026A\u0265\x03\x02\x02\x02\u026A\u0266", "\x03\x02\x02\x02\u026B\u026E\x03\x02\x02\x02\u026C\u026D", "\x07\x0B\x02\x02\u026D\u026F\x05p9\x02\u026E\u026C\x03", "\x02\x02\x02\u026E\u026F\x03\x02\x02\x02\u026F\u0270\x03", "\x02\x02\x02\u0270\u0271\x07\x04\x02\x02\u0271i\x03", "\x02\x02\x02\u0272\u0274\x05> \x02\u0273\u0272\x03\x02", "\x02\x02\u0273\u0274\x03\x02\x02\x02\u0274\u027B\x03\x02", "\x02\x02\u0275\u0277\x07\x11\x02\x02\u0276\u0278\x05>", " \x02\u0277\u0276\x03\x02\x02\x02\u0277\u0278\x03\x02", "\x02\x02\u0278\u027A\x03\x02\x02\x02\u0279\u0275\x03\x02", "\x02\x02\u027A\u027D\x03\x02\x02\x02\u027B\u0279\x03\x02", "\x02\x02\u027B\u027C\x03\x02\x02\x02\u027Ck\x03\x02", "\x02\x02\u027D\u027B\x03\x02\x02\x02\u027E\u0285\x07\x17", "\x02\x02\u027F\u0281\x05\xA8U\x02\u0280\u027F\x03\x02", "\x02\x02\u0280\u0281\x03\x02\x02\x02\u0281\u0282\x03\x02", "\x02\x02\u0282\u0284\x07\x11\x02\x02\u0283\u0280\x03\x02", "\x02\x02\u0284\u0287\x03\x02\x02\x02\u0285\u0283\x03\x02", "\x02\x02\u0285\u0286\x03\x02\x02\x02\u0286\u0289\x03\x02", "\x02\x02\u0287\u0285\x03\x02\x02\x02\u0288\u028A\x05\xA8", "U\x02\u0289\u0288\x03\x02\x02\x02\u0289\u028A\x03\x02", "\x02\x02\u028A\u028B\x03\x02\x02\x02\u028B\u028C\x07\x18", "\x02\x02\u028Cm\x03\x02\x02\x02\u028D\u028E\t\x07\x02", "\x02\u028Eo\x03\x02\x02\x02\u028F\u0290\b9\x01\x02\u0290", "\u0291\x079\x02\x02\u0291\u02A2\x05@!\x02\u0292\u0293\x07", "\x17\x02\x02\u0293\u0294\x05p9\x02\u0294\u0295\x07\x18", "\x02\x02\u0295\u02A2\x03\x02\x02\x02\u0296\u0297\t\b\x02", "\x02\u0297\u02A2\x05p9\x15\u0298\u0299\t\t\x02\x02\u0299\u02A2", "\x05p9\x14\u029A\u029B\t\n\x02\x02\u029B\u02A2\x05p9\x13", "\u029C\u029D\x07>\x02\x02\u029D\u02A2\x05p9\x12\u029E\u029F", "\x07\x06\x02\x02\u029F\u02A2\x05p9\x11\u02A0\u02A2\x05", "r:\x02\u02A1\u028F\x03\x02\x02\x02\u02A1\u0292\x03\x02", "\x02\x02\u02A1\u0296\x03\x02\x02\x02\u02A1\u0298\x03\x02", "\x02\x02\u02A1\u029A\x03\x02\x02\x02\u02A1\u029C\x03\x02", "\x02\x02\u02A1\u029E\x03\x02\x02\x02\u02A1\u02A0\x03\x02", "\x02\x02\u02A2\u02DE\x03\x02\x02\x02\u02A3\u02A4\f\x10", "\x02\x02\u02A4\u02A5\x07?\x02\x02\u02A5\u02DD\x05p9\x11", "\u02A6\u02A7\f\x0F\x02\x02\u02A7\u02A8\t\x0B\x02\x02\u02A8", "\u02DD\x05p9\x10\u02A9\u02AA\f\x0E\x02\x02\u02AA\u02AB\t\t", "\x02\x02\u02AB\u02DD\x05p9\x0F\u02AC\u02AD\f\r\x02\x02\u02AD", "\u02AE\t\f\x02\x02\u02AE\u02DD\x05p9\x0E\u02AF\u02B0\f\f\x02", "\x02\u02B0\u02B1\x07D\x02\x02\u02B1\u02DD\x05p9\r\u02B2\u02B3", "\f\x0B\x02\x02\u02B3\u02B4\x07\x05\x02\x02\u02B4\u02DD", "\x05p9\f\u02B5\u02B6\f\n\x02\x02\u02B6\u02B7\x07E\x02\x02", "\u02B7\u02DD\x05p9\x0B\u02B8\u02B9\f\t\x02\x02\u02B9\u02BA\t", "\r\x02\x02\u02BA\u02DD\x05p9\n\u02BB\u02BC\f\b\x02\x02\u02BC", "\u02BD\t\x0E\x02\x02\u02BD\u02DD\x05p9\t\u02BE\u02BF\f\x07", "\x02\x02\u02BF\u02C0\x07H\x02\x02\u02C0\u02DD\x05p9\b\u02C1", "\u02C2\f\x06\x02\x02\u02C2\u02C3\x07I\x02\x02\u02C3\u02DD", "\x05p9\x07\u02C4\u02C5\f\x05\x02\x02\u02C5\u02C6\x07J\x02", "\x02\u02C6\u02C7\x05p9\x02\u02C7\u02C8\x07K\x02\x02\u02C8", "\u02C9\x05p9\x06\u02C9\u02DD\x03\x02\x02\x02\u02CA\u02CB", "\f\x04\x02\x02\u02CB\u02CC\t\x0F\x02\x02\u02CC\u02DD\x05", "p9\x05\u02CD\u02CE\f\x1B\x02\x02\u02CE\u02DD\t\b\x02\x02", "\u02CF\u02D0\f\x19\x02\x02\u02D0\u02D1\x07\"\x02\x02\u02D1", "\u02D2\x05p9\x02\u02D2\u02D3\x07#\x02\x02\u02D3\u02DD\x03", "\x02\x02\x02\u02D4\u02D5\f\x18\x02\x02\u02D5\u02D6\x07", "\x17\x02\x02\u02D6\u02D7\x05z>\x02\u02D7\u02D8\x07\x18", "\x02\x02\u02D8\u02DD\x03\x02\x02\x02\u02D9\u02DA\f\x17", "\x02\x02\u02DA\u02DB\x07%\x02\x02\u02DB\u02DD\x05\xA8", "U\x02\u02DC\u02A3\x03\x02\x02\x02\u02DC\u02A6\x03\x02", "\x02\x02\u02DC\u02A9\x03\x02\x02\x02\u02DC\u02AC\x03\x02", "\x02\x02\u02DC\u02AF\x03\x02\x02\x02\u02DC\u02B2\x03\x02", "\x02\x02\u02DC\u02B5\x03\x02\x02\x02\u02DC\u02B8\x03\x02", "\x02\x02\u02DC\u02BB\x03\x02\x02\x02\u02DC\u02BE\x03\x02", "\x02\x02\u02DC\u02C1\x03\x02\x02\x02\u02DC\u02C4\x03\x02", "\x02\x02\u02DC\u02CA\x03\x02\x02\x02\u02DC\u02CD\x03\x02", "\x02\x02\u02DC\u02CF\x03\x02\x02\x02\u02DC\u02D4\x03\x02", "\x02\x02\u02DC\u02D9\x03\x02\x02\x02\u02DD\u02E0\x03\x02", "\x02\x02\u02DE\u02DC\x03\x02\x02\x02\u02DE\u02DF\x03\x02", "\x02\x02\u02DFq\x03\x02\x02\x02\u02E0\u02DE\x03\x02", "\x02\x02\u02E1\u02F1\x07c\x02\x02\u02E2\u02F1\x05\xA6", "T\x02\u02E3\u02F1\x07g\x02\x02\u02E4\u02F1\x07v\x02\x02", "\u02E5\u02E8\x05\xA8U\x02\u02E6\u02E7\x07\"\x02\x02\u02E7", "\u02E9\x07#\x02\x02\u02E8\u02E6\x03\x02\x02\x02\u02E8", "\u02E9\x03\x02\x02\x02\u02E9\u02F1\x03\x02\x02\x02\u02EA", "\u02F1\x05\xA2R\x02\u02EB\u02EE\x05\xA4S\x02\u02EC\u02ED", "\x07\"\x02\x02\u02ED\u02EF\x07#\x02\x02\u02EE\u02EC\x03", "\x02\x02\x02\u02EE\u02EF\x03\x02\x02\x02\u02EF\u02F1\x03", "\x02\x02\x02\u02F0\u02E1\x03\x02\x02\x02\u02F0\u02E2\x03", "\x02\x02\x02\u02F0\u02E3\x03\x02\x02\x02\u02F0\u02E4\x03", "\x02\x02\x02\u02F0\u02E5\x03\x02\x02\x02\u02F0\u02EA\x03", "\x02\x02\x02\u02F0\u02EB\x03\x02\x02\x02\u02F1s\x03", "\x02\x02\x02\u02F2\u02F7\x05p9\x02\u02F3\u02F4\x07\x11", "\x02\x02\u02F4\u02F6\x05p9\x02\u02F5\u02F3\x03\x02\x02", "\x02\u02F6\u02F9\x03\x02\x02\x02\u02F7\u02F5\x03\x02\x02", "\x02\u02F7\u02F8\x03\x02\x02\x02\u02F8u\x03\x02\x02", "\x02\u02F9\u02F7\x03\x02\x02\x02\u02FA\u02FF\x05x=\x02", "\u02FB\u02FC\x07\x11\x02\x02\u02FC\u02FE\x05x=\x02\u02FD", "\u02FB\x03\x02\x02\x02\u02FE\u0301\x03\x02\x02\x02\u02FF", "\u02FD\x03\x02\x02\x02\u02FF\u0300\x03\x02\x02\x02\u0300", "\u0303\x03\x02\x02\x02\u0301\u02FF\x03\x02\x02\x02\u0302", "\u0304\x07\x11\x02\x02\u0303\u0302\x03\x02\x02\x02\u0303", "\u0304\x03\x02\x02\x02\u0304w\x03\x02\x02\x02\u0305", "\u0306\x05\xA8U\x02\u0306\u0307\x07K\x02\x02\u0307\u0308", "\x05p9\x02\u0308y\x03\x02\x02\x02\u0309\u030B\x07\x10", "\x02\x02\u030A\u030C\x05v<\x02\u030B\u030A\x03\x02\x02", "\x02\u030B\u030C\x03\x02\x02\x02\u030C\u030D\x03\x02\x02", "\x02\u030D\u0312\x07\x12\x02\x02\u030E\u0310\x05t;\x02", "\u030F\u030E\x03\x02\x02\x02\u030F\u0310\x03\x02\x02\x02", "\u0310\u0312\x03\x02\x02\x02\u0311\u0309\x03\x02\x02\x02", "\u0311\u030F\x03\x02\x02\x02\u0312{\x03\x02\x02\x02", "\u0313\u0314\x05p9\x02\u0314\u0315\x07\x17\x02\x02\u0315", "\u0316\x05z>\x02\u0316\u0317\x07\x18\x02\x02\u0317}\x03", "\x02\x02\x02\u0318\u031C\x07\x10\x02\x02\u0319\u031B\x05", "\x80A\x02\u031A\u0319\x03\x02\x02\x02\u031B\u031E\x03", "\x02\x02\x02\u031C\u031A\x03\x02\x02\x02\u031C\u031D\x03", "\x02\x02\x02\u031D\u031F\x03\x02\x02\x02\u031E\u031C\x03", "\x02\x02\x02\u031F\u0320\x07\x12\x02\x02\u0320\x7F\x03", "\x02\x02\x02\u0321\u0333\x05\xA8U\x02\u0322\u0333\x05", "~@\x02\u0323\u0333\x05\x82B\x02\u0324\u0333\x05\x86D\x02", "\u0325\u0333\x05\x88E\x02\u0326\u0333\x05\x8EH\x02\u0327", "\u0333\x05\x90I\x02\u0328\u0333\x05\x92J\x02\u0329\u0333", "\x05\x96L\x02\u032A\u0333\x05\x9AN\x02\u032B\u0333\x05", "\x9CO\x02\u032C\u0333\x07j\x02\x02\u032D\u0333\x07l\x02", "\x02\u032E\u0333\x05\xA0Q\x02\u032F\u0333\x05\xA6T\x02", "\u0330\u0333\x07v\x02\x02\u0331\u0333\x07g\x02\x02\u0332", "\u0321\x03\x02\x02\x02\u0332\u0322\x03\x02\x02\x02\u0332", "\u0323\x03\x02\x02\x02\u0332\u0324\x03\x02\x02\x02\u0332", "\u0325\x03\x02\x02\x02\u0332\u0326\x03\x02\x02\x02\u0332", "\u0327\x03\x02\x02\x02\u0332\u0328\x03\x02\x02\x02\u0332", "\u0329\x03\x02\x02\x02\u0332\u032A\x03\x02\x02\x02\u0332", "\u032B\x03\x02\x02\x02\u0332\u032C\x03\x02\x02\x02\u0332", "\u032D\x03\x02\x02\x02\u0332\u032E\x03\x02\x02\x02\u0332", "\u032F\x03\x02\x02\x02\u0332\u0330\x03\x02\x02\x02\u0332", "\u0331\x03\x02\x02\x02\u0333\x81\x03\x02\x02\x02\u0334", "\u0337\x05\x84C\x02\u0335\u0337\x05\x9EP\x02\u0336\u0334", "\x03\x02\x02\x02\u0336\u0335\x03\x02\x02\x02\u0337\x83", "\x03\x02\x02\x02\u0338\u033D\x070\x02\x02\u0339\u033D", "\x07$\x02\x02\u033A\u033D\x076\x02\x02\u033B\u033D\x05", "\xA8U\x02\u033C\u0338\x03\x02\x02\x02\u033C\u0339\x03", "\x02\x02\x02\u033C\u033A\x03\x02\x02\x02\u033C\u033B\x03", "\x02\x02\x02\u033D\u034A\x03\x02\x02\x02\u033E\u0340\x07", "\x17\x02\x02\u033F\u0341\x05\x82B\x02\u0340\u033F\x03", "\x02\x02\x02\u0340\u0341\x03\x02\x02\x02\u0341\u0346\x03", "\x02\x02\x02\u0342\u0343\x07\x11\x02\x02\u0343\u0345\x05", "\x82B\x02\u0344\u0342\x03\x02\x02\x02\u0345\u0348\x03", "\x02\x02\x02\u0346\u0344\x03\x02\x02\x02\u0346\u0347\x03", "\x02\x02\x02\u0347\u0349\x03\x02\x02\x02\u0348\u0346\x03", "\x02\x02\x02\u0349\u034B\x07\x18\x02\x02\u034A\u033E\x03", "\x02\x02\x02\u034A\u034B\x03\x02\x02\x02\u034B\x85\x03", "\x02\x02\x02\u034C\u034D\x07V\x02\x02\u034D\u0350\x05", "\x8AF\x02\u034E\u034F\x07W\x02\x02\u034F\u0351\x05\x82", "B\x02\u0350\u034E\x03\x02\x02\x02\u0350\u0351\x03\x02", "\x02\x02\u0351\x87\x03\x02\x02\x02\u0352\u0353\x05\x8A", "F\x02\u0353\u0354\x07W\x02\x02\u0354\u0355\x05\x82B\x02", "\u0355\x89\x03\x02\x02\x02\u0356\u035C\x05\xA8U\x02", "\u0357\u0358\x07\x17\x02\x02\u0358\u0359\x05\x8CG\x02", "\u0359\u035A\x07\x18\x02\x02\u035A\u035C\x03\x02\x02\x02", "\u035B\u0356\x03\x02\x02\x02\u035B\u0357\x03\x02\x02\x02", "\u035C\x8B\x03\x02\x02\x02\u035D\u0362\x05\xA8U\x02", "\u035E\u035F\x07\x11\x02\x02\u035F\u0361\x05\xA8U\x02", "\u0360\u035E\x03\x02\x02\x02\u0361\u0364\x03\x02\x02\x02", "\u0362\u0360\x03\x02\x02\x02\u0362\u0363\x03\x02\x02\x02", "\u0363\x8D\x03\x02\x02\x02\u0364\u0362\x03\x02\x02\x02", "\u0365\u0366\x07X\x02\x02\u0366\u0367\x05\xA8U\x02\u0367", "\x8F\x03\x02\x02\x02\u0368\u0369\x05\xA8U\x02\u0369", "\u036A\x07K\x02\x02\u036A\x91\x03\x02\x02\x02\u036B", "\u036C\x07Y\x02\x02\u036C\u0370\x05\x82B\x02\u036D\u036F", "\x05\x94K\x02\u036E\u036D\x03\x02\x02\x02\u036F\u0372", "\x03\x02\x02\x02\u0370\u036E\x03\x02\x02\x02\u0370\u0371", "\x03\x02\x02\x02\u0371\x93\x03\x02\x02\x02\u0372\u0370", "\x03\x02\x02\x02\u0373\u0374\x07Z\x02\x02\u0374\u0375", "\x05\x9EP\x02\u0375\u0376\x05~@\x02\u0376\u037A\x03\x02", "\x02\x02\u0377\u0378\x07[\x02\x02\u0378\u037A\x05~@\x02", "\u0379\u0373\x03\x02\x02\x02\u0379\u0377\x03\x02\x02\x02", "\u037A\x95\x03\x02\x02\x02\u037B\u037C\x07\x1E\x02\x02", "\u037C\u037D\x05\xA8U\x02\u037D\u037F\x07\x17\x02\x02", "\u037E\u0380\x05\x8CG\x02\u037F\u037E\x03\x02\x02\x02", "\u037F\u0380\x03\x02\x02\x02\u0380\u0381\x03\x02\x02\x02", "\u0381\u0383\x07\x18\x02\x02\u0382\u0384\x05\x98M\x02", "\u0383\u0382\x03\x02\x02\x02\u0383\u0384\x03\x02\x02\x02", "\u0384\u0385\x03\x02\x02\x02\u0385\u0386\x05~@\x02\u0386", "\x97\x03\x02\x02\x02\u0387\u0388\x07\\\x02\x02\u0388", "\u0389\x05\x8CG\x02\u0389\x99\x03\x02\x02\x02\u038A", "\u038D\x07\x1A\x02\x02\u038B\u038E\x05~@\x02\u038C\u038E", "\x05\x82B\x02\u038D\u038B\x03\x02\x02\x02\u038D\u038C", "\x03\x02\x02\x02\u038E\u038F\x03\x02\x02\x02\u038F\u0392", "\x05\x82B\x02\u0390\u0393\x05~@\x02\u0391\u0393\x05\x82", "B\x02\u0392\u0390\x03\x02\x02\x02\u0392\u0391\x03\x02", "\x02\x02\u0393\u0394\x03\x02\x02\x02\u0394\u0395\x05~", "@\x02\u0395\x9B\x03\x02\x02\x02\u0396\u0397\x07+\x02", "\x02\u0397\u0398\x05\x82B\x02\u0398\u0399\x05~@\x02\u0399", "\x9D\x03\x02\x02\x02\u039A\u039B\t\x10\x02\x02\u039B", "\x9F\x03\x02\x02\x02\u039C\u039D\x07.\x02\x02\u039D", "\u039E\x05\xA8U\x02\u039E\u039F\x05~@\x02\u039F\xA1\x03", "\x02\x02\x02\u03A0\u03A2\x07\x17\x02\x02\u03A1\u03A3\x05", "p9\x02\u03A2\u03A1\x03\x02\x02\x02\u03A2\u03A3\x03\x02", "\x02\x02\u03A3\u03AA\x03\x02\x02\x02\u03A4\u03A6\x07\x11", "\x02\x02\u03A5\u03A7\x05p9\x02\u03A6\u03A5\x03\x02\x02", "\x02\u03A6\u03A7\x03\x02\x02\x02\u03A7\u03A9\x03\x02\x02", "\x02\u03A8\u03A4\x03\x02\x02\x02\u03A9\u03AC\x03\x02\x02", "\x02\u03AA\u03A8\x03\x02\x02\x02\u03AA\u03AB\x03\x02\x02", "\x02\u03AB\u03AD\x03\x02\x02\x02\u03AC\u03AA\x03\x02\x02", "\x02\u03AD\u03BB\x07\x18\x02\x02\u03AE\u03B7\x07\"\x02", "\x02\u03AF\u03B4\x05p9\x02\u03B0\u03B1\x07\x11\x02\x02", "\u03B1\u03B3\x05p9\x02\u03B2\u03B0\x03\x02\x02\x02\u03B3", "\u03B6\x03\x02\x02\x02\u03B4\u03B2\x03\x02\x02\x02\u03B4", "\u03B5\x03\x02\x02\x02\u03B5\u03B8\x03\x02\x02\x02\u03B6", "\u03B4\x03\x02\x02\x02\u03B7\u03AF\x03\x02\x02\x02\u03B7", "\u03B8\x03\x02\x02\x02\u03B8\u03B9\x03\x02\x02\x02\u03B9", "\u03BB\x07#\x02\x02\u03BA\u03A0\x03\x02\x02\x02\u03BA", "\u03AE\x03\x02\x02\x02\u03BB\xA3\x03\x02\x02\x02\u03BC", "\u03BD\x05n8\x02\u03BD\xA5\x03\x02\x02\x02\u03BE\u03C0", "\t\x11\x02\x02\u03BF\u03C1\x07f\x02\x02\u03C0\u03BF\x03", "\x02\x02\x02\u03C0\u03C1\x03\x02\x02\x02\u03C1\xA7\x03", "\x02\x02\x02\u03C2\u03C3\t\x12\x02\x02\u03C3\xA9\x03", '\x02\x02\x02j\xAD\xAF\xBD\xC1\xC6\xCD\xD3\xD9', "\xDD\xE9\xF1\xFB\xFE\u0104\u0110\u0115\u011F\u0125\u012B\u0134", "\u0142\u0145\u0151\u0158\u015B\u015F\u0164\u0168\u0173\u0175\u017C\u0186", "\u018C\u0197\u019A\u01A0\u01A3\u01AB\u01AE\u01B4\u01B7\u01BF\u01C2\u01C8", "\u01CC\u01D7\u01DC\u01E1\u01E9\u01F8\u01FA\u01FF\u0209\u021A\u0226\u0230", "\u0236\u023A\u023D\u0244\u0258\u026A\u026E\u0273\u0277\u027B\u0280\u0285", "\u0289\u02A1\u02DC\u02DE\u02E8\u02EE\u02F0\u02F7\u02FF\u0303\u030B\u030F", "\u0311\u031C\u0332\u0336\u033C\u0340\u0346\u034A\u0350\u035B\u0362\u0370", "\u0379\u037F\u0383\u038D\u0392\u03A2\u03A6\u03AA\u03B4\u03B7\u03BA\u03C0"].join("");
var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);
var decisionsToDFA = atn.decisionToState.map(function (ds, index) {
  return new antlr4.dfa.DFA(ds, index);
});
var sharedContextCache = new antlr4.PredictionContextCache();
var literalNames = [null, "'pragma'", "';'", "'^'", "'~'", "'>='", "'>'", "'<'", "'<='", "'='", "'as'", "'import'", "'*'", "'from'", "'{'", "','", "'}'", "'contract'", "'interface'", "'library'", "'is'", "'('", "')'", "'using'", "'for'", "'struct'", "'constructor'", "'modifier'", "'function'", "'returns'", "'event'", "'enum'", "'['", "']'", "'address'", "'.'", "'mapping'", "'=>'", "'memory'", "'storage'", "'calldata'", "'if'", "'else'", "'while'", "'assembly'", "'do'", "'return'", "'throw'", "'emit'", "'var'", "'bool'", "'string'", "'byte'", "'++'", "'--'", "'new'", "'+'", "'-'", "'after'", "'delete'", "'!'", "'**'", "'/'", "'%'", "'<<'", "'>>'", "'&'", "'|'", "'=='", "'!='", "'&&'", "'||'", "'?'", "':'", "'|='", "'^='", "'&='", "'<<='", "'>>='", "'+='", "'-='", "'*='", "'/='", "'%='", "'let'", "':='", "'=:'", "'switch'", "'case'", "'default'", "'->'", null, null, null, null, null, null, null, null, null, null, null, null, "'anonymous'", "'break'", "'constant'", "'continue'", "'external'", "'indexed'", "'internal'", "'payable'", "'private'", "'public'", "'pure'", "'view'"];
var symbolicNames = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Int", "Uint", "Byte", "Fixed", "Ufixed", "VersionLiteral", "BooleanLiteral", "DecimalNumber", "HexNumber", "NumberUnit", "HexLiteral", "ReservedKeyword", "AnonymousKeyword", "BreakKeyword", "ConstantKeyword", "ContinueKeyword", "ExternalKeyword", "IndexedKeyword", "InternalKeyword", "PayableKeyword", "PrivateKeyword", "PublicKeyword", "PureKeyword", "ViewKeyword", "Identifier", "StringLiteral", "WS", "COMMENT", "LINE_COMMENT"];
var ruleNames = ["sourceUnit", "pragmaDirective", "pragmaName", "pragmaValue", "version", "versionOperator", "versionConstraint", "importDeclaration", "importDirective", "contractDefinition", "inheritanceSpecifier", "contractPart", "stateVariableDeclaration", "usingForDeclaration", "structDefinition", "constructorDefinition", "modifierDefinition", "modifierInvocation", "functionDefinition", "returnParameters", "modifierList", "eventDefinition", "enumValue", "enumDefinition", "parameterList", "parameter", "eventParameterList", "eventParameter", "functionTypeParameterList", "functionTypeParameter", "variableDeclaration", "typeName", "userDefinedTypeName", "mapping", "functionTypeName", "storageLocation", "stateMutability", "block", "statement", "expressionStatement", "ifStatement", "whileStatement", "simpleStatement", "forStatement", "inlineAssemblyStatement", "doWhileStatement", "continueStatement", "breakStatement", "returnStatement", "throwStatement", "emitStatement", "variableDeclarationStatement", "variableDeclarationList", "identifierList", "elementaryTypeName", "expression", "primaryExpression", "expressionList", "nameValueList", "nameValue", "functionCallArguments", "functionCall", "assemblyBlock", "assemblyItem", "assemblyExpression", "assemblyCall", "assemblyLocalDefinition", "assemblyAssignment", "assemblyIdentifierOrList", "assemblyIdentifierList", "assemblyStackAssignment", "labelDefinition", "assemblySwitch", "assemblyCase", "assemblyFunctionDefinition", "assemblyFunctionReturns", "assemblyFor", "assemblyIf", "assemblyLiteral", "subAssembly", "tupleExpression", "elementaryTypeNameExpression", "numberLiteral", "identifier"];

function SolidityParser(input) {
  antlr4.Parser.call(this, input);
  this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
  this.ruleNames = ruleNames;
  this.literalNames = literalNames;
  this.symbolicNames = symbolicNames;
  return this;
}

SolidityParser.prototype = Object.create(antlr4.Parser.prototype);
SolidityParser.prototype.constructor = SolidityParser;
Object.defineProperty(SolidityParser.prototype, "atn", {
  get: function get() {
    return atn;
  }
});
SolidityParser.EOF = antlr4.Token.EOF;
SolidityParser.T__0 = 1;
SolidityParser.T__1 = 2;
SolidityParser.T__2 = 3;
SolidityParser.T__3 = 4;
SolidityParser.T__4 = 5;
SolidityParser.T__5 = 6;
SolidityParser.T__6 = 7;
SolidityParser.T__7 = 8;
SolidityParser.T__8 = 9;
SolidityParser.T__9 = 10;
SolidityParser.T__10 = 11;
SolidityParser.T__11 = 12;
SolidityParser.T__12 = 13;
SolidityParser.T__13 = 14;
SolidityParser.T__14 = 15;
SolidityParser.T__15 = 16;
SolidityParser.T__16 = 17;
SolidityParser.T__17 = 18;
SolidityParser.T__18 = 19;
SolidityParser.T__19 = 20;
SolidityParser.T__20 = 21;
SolidityParser.T__21 = 22;
SolidityParser.T__22 = 23;
SolidityParser.T__23 = 24;
SolidityParser.T__24 = 25;
SolidityParser.T__25 = 26;
SolidityParser.T__26 = 27;
SolidityParser.T__27 = 28;
SolidityParser.T__28 = 29;
SolidityParser.T__29 = 30;
SolidityParser.T__30 = 31;
SolidityParser.T__31 = 32;
SolidityParser.T__32 = 33;
SolidityParser.T__33 = 34;
SolidityParser.T__34 = 35;
SolidityParser.T__35 = 36;
SolidityParser.T__36 = 37;
SolidityParser.T__37 = 38;
SolidityParser.T__38 = 39;
SolidityParser.T__39 = 40;
SolidityParser.T__40 = 41;
SolidityParser.T__41 = 42;
SolidityParser.T__42 = 43;
SolidityParser.T__43 = 44;
SolidityParser.T__44 = 45;
SolidityParser.T__45 = 46;
SolidityParser.T__46 = 47;
SolidityParser.T__47 = 48;
SolidityParser.T__48 = 49;
SolidityParser.T__49 = 50;
SolidityParser.T__50 = 51;
SolidityParser.T__51 = 52;
SolidityParser.T__52 = 53;
SolidityParser.T__53 = 54;
SolidityParser.T__54 = 55;
SolidityParser.T__55 = 56;
SolidityParser.T__56 = 57;
SolidityParser.T__57 = 58;
SolidityParser.T__58 = 59;
SolidityParser.T__59 = 60;
SolidityParser.T__60 = 61;
SolidityParser.T__61 = 62;
SolidityParser.T__62 = 63;
SolidityParser.T__63 = 64;
SolidityParser.T__64 = 65;
SolidityParser.T__65 = 66;
SolidityParser.T__66 = 67;
SolidityParser.T__67 = 68;
SolidityParser.T__68 = 69;
SolidityParser.T__69 = 70;
SolidityParser.T__70 = 71;
SolidityParser.T__71 = 72;
SolidityParser.T__72 = 73;
SolidityParser.T__73 = 74;
SolidityParser.T__74 = 75;
SolidityParser.T__75 = 76;
SolidityParser.T__76 = 77;
SolidityParser.T__77 = 78;
SolidityParser.T__78 = 79;
SolidityParser.T__79 = 80;
SolidityParser.T__80 = 81;
SolidityParser.T__81 = 82;
SolidityParser.T__82 = 83;
SolidityParser.T__83 = 84;
SolidityParser.T__84 = 85;
SolidityParser.T__85 = 86;
SolidityParser.T__86 = 87;
SolidityParser.T__87 = 88;
SolidityParser.T__88 = 89;
SolidityParser.T__89 = 90;
SolidityParser.Int = 91;
SolidityParser.Uint = 92;
SolidityParser.Byte = 93;
SolidityParser.Fixed = 94;
SolidityParser.Ufixed = 95;
SolidityParser.VersionLiteral = 96;
SolidityParser.BooleanLiteral = 97;
SolidityParser.DecimalNumber = 98;
SolidityParser.HexNumber = 99;
SolidityParser.NumberUnit = 100;
SolidityParser.HexLiteral = 101;
SolidityParser.ReservedKeyword = 102;
SolidityParser.AnonymousKeyword = 103;
SolidityParser.BreakKeyword = 104;
SolidityParser.ConstantKeyword = 105;
SolidityParser.ContinueKeyword = 106;
SolidityParser.ExternalKeyword = 107;
SolidityParser.IndexedKeyword = 108;
SolidityParser.InternalKeyword = 109;
SolidityParser.PayableKeyword = 110;
SolidityParser.PrivateKeyword = 111;
SolidityParser.PublicKeyword = 112;
SolidityParser.PureKeyword = 113;
SolidityParser.ViewKeyword = 114;
SolidityParser.Identifier = 115;
SolidityParser.StringLiteral = 116;
SolidityParser.WS = 117;
SolidityParser.COMMENT = 118;
SolidityParser.LINE_COMMENT = 119;
SolidityParser.RULE_sourceUnit = 0;
SolidityParser.RULE_pragmaDirective = 1;
SolidityParser.RULE_pragmaName = 2;
SolidityParser.RULE_pragmaValue = 3;
SolidityParser.RULE_version = 4;
SolidityParser.RULE_versionOperator = 5;
SolidityParser.RULE_versionConstraint = 6;
SolidityParser.RULE_importDeclaration = 7;
SolidityParser.RULE_importDirective = 8;
SolidityParser.RULE_contractDefinition = 9;
SolidityParser.RULE_inheritanceSpecifier = 10;
SolidityParser.RULE_contractPart = 11;
SolidityParser.RULE_stateVariableDeclaration = 12;
SolidityParser.RULE_usingForDeclaration = 13;
SolidityParser.RULE_structDefinition = 14;
SolidityParser.RULE_constructorDefinition = 15;
SolidityParser.RULE_modifierDefinition = 16;
SolidityParser.RULE_modifierInvocation = 17;
SolidityParser.RULE_functionDefinition = 18;
SolidityParser.RULE_returnParameters = 19;
SolidityParser.RULE_modifierList = 20;
SolidityParser.RULE_eventDefinition = 21;
SolidityParser.RULE_enumValue = 22;
SolidityParser.RULE_enumDefinition = 23;
SolidityParser.RULE_parameterList = 24;
SolidityParser.RULE_parameter = 25;
SolidityParser.RULE_eventParameterList = 26;
SolidityParser.RULE_eventParameter = 27;
SolidityParser.RULE_functionTypeParameterList = 28;
SolidityParser.RULE_functionTypeParameter = 29;
SolidityParser.RULE_variableDeclaration = 30;
SolidityParser.RULE_typeName = 31;
SolidityParser.RULE_userDefinedTypeName = 32;
SolidityParser.RULE_mapping = 33;
SolidityParser.RULE_functionTypeName = 34;
SolidityParser.RULE_storageLocation = 35;
SolidityParser.RULE_stateMutability = 36;
SolidityParser.RULE_block = 37;
SolidityParser.RULE_statement = 38;
SolidityParser.RULE_expressionStatement = 39;
SolidityParser.RULE_ifStatement = 40;
SolidityParser.RULE_whileStatement = 41;
SolidityParser.RULE_simpleStatement = 42;
SolidityParser.RULE_forStatement = 43;
SolidityParser.RULE_inlineAssemblyStatement = 44;
SolidityParser.RULE_doWhileStatement = 45;
SolidityParser.RULE_continueStatement = 46;
SolidityParser.RULE_breakStatement = 47;
SolidityParser.RULE_returnStatement = 48;
SolidityParser.RULE_throwStatement = 49;
SolidityParser.RULE_emitStatement = 50;
SolidityParser.RULE_variableDeclarationStatement = 51;
SolidityParser.RULE_variableDeclarationList = 52;
SolidityParser.RULE_identifierList = 53;
SolidityParser.RULE_elementaryTypeName = 54;
SolidityParser.RULE_expression = 55;
SolidityParser.RULE_primaryExpression = 56;
SolidityParser.RULE_expressionList = 57;
SolidityParser.RULE_nameValueList = 58;
SolidityParser.RULE_nameValue = 59;
SolidityParser.RULE_functionCallArguments = 60;
SolidityParser.RULE_functionCall = 61;
SolidityParser.RULE_assemblyBlock = 62;
SolidityParser.RULE_assemblyItem = 63;
SolidityParser.RULE_assemblyExpression = 64;
SolidityParser.RULE_assemblyCall = 65;
SolidityParser.RULE_assemblyLocalDefinition = 66;
SolidityParser.RULE_assemblyAssignment = 67;
SolidityParser.RULE_assemblyIdentifierOrList = 68;
SolidityParser.RULE_assemblyIdentifierList = 69;
SolidityParser.RULE_assemblyStackAssignment = 70;
SolidityParser.RULE_labelDefinition = 71;
SolidityParser.RULE_assemblySwitch = 72;
SolidityParser.RULE_assemblyCase = 73;
SolidityParser.RULE_assemblyFunctionDefinition = 74;
SolidityParser.RULE_assemblyFunctionReturns = 75;
SolidityParser.RULE_assemblyFor = 76;
SolidityParser.RULE_assemblyIf = 77;
SolidityParser.RULE_assemblyLiteral = 78;
SolidityParser.RULE_subAssembly = 79;
SolidityParser.RULE_tupleExpression = 80;
SolidityParser.RULE_elementaryTypeNameExpression = 81;
SolidityParser.RULE_numberLiteral = 82;
SolidityParser.RULE_identifier = 83;

function SourceUnitContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_sourceUnit;
  return this;
}

SourceUnitContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SourceUnitContext.prototype.constructor = SourceUnitContext;

SourceUnitContext.prototype.EOF = function () {
  return this.getToken(SolidityParser.EOF, 0);
};

SourceUnitContext.prototype.pragmaDirective = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(PragmaDirectiveContext);
  } else {
    return this.getTypedRuleContext(PragmaDirectiveContext, i);
  }
};

SourceUnitContext.prototype.importDirective = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ImportDirectiveContext);
  } else {
    return this.getTypedRuleContext(ImportDirectiveContext, i);
  }
};

SourceUnitContext.prototype.contractDefinition = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ContractDefinitionContext);
  } else {
    return this.getTypedRuleContext(ContractDefinitionContext, i);
  }
};

SourceUnitContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterSourceUnit(this);
  }
};

SourceUnitContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitSourceUnit(this);
  }
};

SolidityParser.SourceUnitContext = SourceUnitContext;

SolidityParser.prototype.sourceUnit = function () {
  var localctx = new SourceUnitContext(this, this._ctx, this.state);
  this.enterRule(localctx, 0, SolidityParser.RULE_sourceUnit);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 173;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    while ((_la & ~0x1f) == 0 && (1 << _la & (1 << SolidityParser.T__0 | 1 << SolidityParser.T__10 | 1 << SolidityParser.T__16 | 1 << SolidityParser.T__17 | 1 << SolidityParser.T__18)) !== 0) {
      this.state = 171;

      this._errHandler.sync(this);

      switch (this._input.LA(1)) {
        case SolidityParser.T__0:
          this.state = 168;
          this.pragmaDirective();
          break;

        case SolidityParser.T__10:
          this.state = 169;
          this.importDirective();
          break;

        case SolidityParser.T__16:
        case SolidityParser.T__17:
        case SolidityParser.T__18:
          this.state = 170;
          this.contractDefinition();
          break;

        default:
          throw new antlr4.error.NoViableAltException(this);
      }

      this.state = 175;

      this._errHandler.sync(this);

      _la = this._input.LA(1);
    }

    this.state = 176;
    this.match(SolidityParser.EOF);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function PragmaDirectiveContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_pragmaDirective;
  return this;
}

PragmaDirectiveContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PragmaDirectiveContext.prototype.constructor = PragmaDirectiveContext;

PragmaDirectiveContext.prototype.pragmaName = function () {
  return this.getTypedRuleContext(PragmaNameContext, 0);
};

PragmaDirectiveContext.prototype.pragmaValue = function () {
  return this.getTypedRuleContext(PragmaValueContext, 0);
};

PragmaDirectiveContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterPragmaDirective(this);
  }
};

PragmaDirectiveContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitPragmaDirective(this);
  }
};

SolidityParser.PragmaDirectiveContext = PragmaDirectiveContext;

SolidityParser.prototype.pragmaDirective = function () {
  var localctx = new PragmaDirectiveContext(this, this._ctx, this.state);
  this.enterRule(localctx, 2, SolidityParser.RULE_pragmaDirective);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 178;
    this.match(SolidityParser.T__0);
    this.state = 179;
    this.pragmaName();
    this.state = 180;
    this.pragmaValue();
    this.state = 181;
    this.match(SolidityParser.T__1);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function PragmaNameContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_pragmaName;
  return this;
}

PragmaNameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PragmaNameContext.prototype.constructor = PragmaNameContext;

PragmaNameContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

PragmaNameContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterPragmaName(this);
  }
};

PragmaNameContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitPragmaName(this);
  }
};

SolidityParser.PragmaNameContext = PragmaNameContext;

SolidityParser.prototype.pragmaName = function () {
  var localctx = new PragmaNameContext(this, this._ctx, this.state);
  this.enterRule(localctx, 4, SolidityParser.RULE_pragmaName);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 183;
    this.identifier();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function PragmaValueContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_pragmaValue;
  return this;
}

PragmaValueContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PragmaValueContext.prototype.constructor = PragmaValueContext;

PragmaValueContext.prototype.version = function () {
  return this.getTypedRuleContext(VersionContext, 0);
};

PragmaValueContext.prototype.expression = function () {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

PragmaValueContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterPragmaValue(this);
  }
};

PragmaValueContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitPragmaValue(this);
  }
};

SolidityParser.PragmaValueContext = PragmaValueContext;

SolidityParser.prototype.pragmaValue = function () {
  var localctx = new PragmaValueContext(this, this._ctx, this.state);
  this.enterRule(localctx, 6, SolidityParser.RULE_pragmaValue);

  try {
    this.state = 187;

    this._errHandler.sync(this);

    var la_ = this._interp.adaptivePredict(this._input, 2, this._ctx);

    switch (la_) {
      case 1:
        this.enterOuterAlt(localctx, 1);
        this.state = 185;
        this.version();
        break;

      case 2:
        this.enterOuterAlt(localctx, 2);
        this.state = 186;
        this.expression(0);
        break;
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function VersionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_version;
  return this;
}

VersionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
VersionContext.prototype.constructor = VersionContext;

VersionContext.prototype.versionConstraint = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(VersionConstraintContext);
  } else {
    return this.getTypedRuleContext(VersionConstraintContext, i);
  }
};

VersionContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterVersion(this);
  }
};

VersionContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitVersion(this);
  }
};

SolidityParser.VersionContext = VersionContext;

SolidityParser.prototype.version = function () {
  var localctx = new VersionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 8, SolidityParser.RULE_version);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 189;
    this.versionConstraint();
    this.state = 191;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if ((_la & ~0x1f) == 0 && (1 << _la & (1 << SolidityParser.T__2 | 1 << SolidityParser.T__3 | 1 << SolidityParser.T__4 | 1 << SolidityParser.T__5 | 1 << SolidityParser.T__6 | 1 << SolidityParser.T__7 | 1 << SolidityParser.T__8)) !== 0 || _la === SolidityParser.VersionLiteral) {
      this.state = 190;
      this.versionConstraint();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function VersionOperatorContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_versionOperator;
  return this;
}

VersionOperatorContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
VersionOperatorContext.prototype.constructor = VersionOperatorContext;

VersionOperatorContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterVersionOperator(this);
  }
};

VersionOperatorContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitVersionOperator(this);
  }
};

SolidityParser.VersionOperatorContext = VersionOperatorContext;

SolidityParser.prototype.versionOperator = function () {
  var localctx = new VersionOperatorContext(this, this._ctx, this.state);
  this.enterRule(localctx, 10, SolidityParser.RULE_versionOperator);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 193;
    _la = this._input.LA(1);

    if (!((_la & ~0x1f) == 0 && (1 << _la & (1 << SolidityParser.T__2 | 1 << SolidityParser.T__3 | 1 << SolidityParser.T__4 | 1 << SolidityParser.T__5 | 1 << SolidityParser.T__6 | 1 << SolidityParser.T__7 | 1 << SolidityParser.T__8)) !== 0)) {
      this._errHandler.recoverInline(this);
    } else {
      this._errHandler.reportMatch(this);

      this.consume();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function VersionConstraintContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_versionConstraint;
  return this;
}

VersionConstraintContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
VersionConstraintContext.prototype.constructor = VersionConstraintContext;

VersionConstraintContext.prototype.VersionLiteral = function () {
  return this.getToken(SolidityParser.VersionLiteral, 0);
};

VersionConstraintContext.prototype.versionOperator = function () {
  return this.getTypedRuleContext(VersionOperatorContext, 0);
};

VersionConstraintContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterVersionConstraint(this);
  }
};

VersionConstraintContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitVersionConstraint(this);
  }
};

SolidityParser.VersionConstraintContext = VersionConstraintContext;

SolidityParser.prototype.versionConstraint = function () {
  var localctx = new VersionConstraintContext(this, this._ctx, this.state);
  this.enterRule(localctx, 12, SolidityParser.RULE_versionConstraint);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 196;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if ((_la & ~0x1f) == 0 && (1 << _la & (1 << SolidityParser.T__2 | 1 << SolidityParser.T__3 | 1 << SolidityParser.T__4 | 1 << SolidityParser.T__5 | 1 << SolidityParser.T__6 | 1 << SolidityParser.T__7 | 1 << SolidityParser.T__8)) !== 0) {
      this.state = 195;
      this.versionOperator();
    }

    this.state = 198;
    this.match(SolidityParser.VersionLiteral);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ImportDeclarationContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_importDeclaration;
  return this;
}

ImportDeclarationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ImportDeclarationContext.prototype.constructor = ImportDeclarationContext;

ImportDeclarationContext.prototype.identifier = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(IdentifierContext);
  } else {
    return this.getTypedRuleContext(IdentifierContext, i);
  }
};

ImportDeclarationContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterImportDeclaration(this);
  }
};

ImportDeclarationContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitImportDeclaration(this);
  }
};

SolidityParser.ImportDeclarationContext = ImportDeclarationContext;

SolidityParser.prototype.importDeclaration = function () {
  var localctx = new ImportDeclarationContext(this, this._ctx, this.state);
  this.enterRule(localctx, 14, SolidityParser.RULE_importDeclaration);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 200;
    this.identifier();
    this.state = 203;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__9) {
      this.state = 201;
      this.match(SolidityParser.T__9);
      this.state = 202;
      this.identifier();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ImportDirectiveContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_importDirective;
  return this;
}

ImportDirectiveContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ImportDirectiveContext.prototype.constructor = ImportDirectiveContext;

ImportDirectiveContext.prototype.StringLiteral = function () {
  return this.getToken(SolidityParser.StringLiteral, 0);
};

ImportDirectiveContext.prototype.identifier = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(IdentifierContext);
  } else {
    return this.getTypedRuleContext(IdentifierContext, i);
  }
};

ImportDirectiveContext.prototype.importDeclaration = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ImportDeclarationContext);
  } else {
    return this.getTypedRuleContext(ImportDeclarationContext, i);
  }
};

ImportDirectiveContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterImportDirective(this);
  }
};

ImportDirectiveContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitImportDirective(this);
  }
};

SolidityParser.ImportDirectiveContext = ImportDirectiveContext;

SolidityParser.prototype.importDirective = function () {
  var localctx = new ImportDirectiveContext(this, this._ctx, this.state);
  this.enterRule(localctx, 16, SolidityParser.RULE_importDirective);
  var _la = 0; // Token type

  try {
    this.state = 239;

    this._errHandler.sync(this);

    var la_ = this._interp.adaptivePredict(this._input, 10, this._ctx);

    switch (la_) {
      case 1:
        this.enterOuterAlt(localctx, 1);
        this.state = 205;
        this.match(SolidityParser.T__10);
        this.state = 206;
        this.match(SolidityParser.StringLiteral);
        this.state = 209;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if (_la === SolidityParser.T__9) {
          this.state = 207;
          this.match(SolidityParser.T__9);
          this.state = 208;
          this.identifier();
        }

        this.state = 211;
        this.match(SolidityParser.T__1);
        break;

      case 2:
        this.enterOuterAlt(localctx, 2);
        this.state = 212;
        this.match(SolidityParser.T__10);
        this.state = 215;

        this._errHandler.sync(this);

        switch (this._input.LA(1)) {
          case SolidityParser.T__11:
            this.state = 213;
            this.match(SolidityParser.T__11);
            break;

          case SolidityParser.T__12:
          case SolidityParser.T__39:
          case SolidityParser.Identifier:
            this.state = 214;
            this.identifier();
            break;

          default:
            throw new antlr4.error.NoViableAltException(this);
        }

        this.state = 219;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if (_la === SolidityParser.T__9) {
          this.state = 217;
          this.match(SolidityParser.T__9);
          this.state = 218;
          this.identifier();
        }

        this.state = 221;
        this.match(SolidityParser.T__12);
        this.state = 222;
        this.match(SolidityParser.StringLiteral);
        this.state = 223;
        this.match(SolidityParser.T__1);
        break;

      case 3:
        this.enterOuterAlt(localctx, 3);
        this.state = 224;
        this.match(SolidityParser.T__10);
        this.state = 225;
        this.match(SolidityParser.T__13);
        this.state = 226;
        this.importDeclaration();
        this.state = 231;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        while (_la === SolidityParser.T__14) {
          this.state = 227;
          this.match(SolidityParser.T__14);
          this.state = 228;
          this.importDeclaration();
          this.state = 233;

          this._errHandler.sync(this);

          _la = this._input.LA(1);
        }

        this.state = 234;
        this.match(SolidityParser.T__15);
        this.state = 235;
        this.match(SolidityParser.T__12);
        this.state = 236;
        this.match(SolidityParser.StringLiteral);
        this.state = 237;
        this.match(SolidityParser.T__1);
        break;
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ContractDefinitionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_contractDefinition;
  return this;
}

ContractDefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ContractDefinitionContext.prototype.constructor = ContractDefinitionContext;

ContractDefinitionContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

ContractDefinitionContext.prototype.inheritanceSpecifier = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(InheritanceSpecifierContext);
  } else {
    return this.getTypedRuleContext(InheritanceSpecifierContext, i);
  }
};

ContractDefinitionContext.prototype.contractPart = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ContractPartContext);
  } else {
    return this.getTypedRuleContext(ContractPartContext, i);
  }
};

ContractDefinitionContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterContractDefinition(this);
  }
};

ContractDefinitionContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitContractDefinition(this);
  }
};

SolidityParser.ContractDefinitionContext = ContractDefinitionContext;

SolidityParser.prototype.contractDefinition = function () {
  var localctx = new ContractDefinitionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 18, SolidityParser.RULE_contractDefinition);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 241;
    _la = this._input.LA(1);

    if (!((_la & ~0x1f) == 0 && (1 << _la & (1 << SolidityParser.T__16 | 1 << SolidityParser.T__17 | 1 << SolidityParser.T__18)) !== 0)) {
      this._errHandler.recoverInline(this);
    } else {
      this._errHandler.reportMatch(this);

      this.consume();
    }

    this.state = 242;
    this.identifier();
    this.state = 252;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__19) {
      this.state = 243;
      this.match(SolidityParser.T__19);
      this.state = 244;
      this.inheritanceSpecifier();
      this.state = 249;

      this._errHandler.sync(this);

      _la = this._input.LA(1);

      while (_la === SolidityParser.T__14) {
        this.state = 245;
        this.match(SolidityParser.T__14);
        this.state = 246;
        this.inheritanceSpecifier();
        this.state = 251;

        this._errHandler.sync(this);

        _la = this._input.LA(1);
      }
    }

    this.state = 254;
    this.match(SolidityParser.T__13);
    this.state = 258;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    while ((_la & ~0x1f) == 0 && (1 << _la & (1 << SolidityParser.T__12 | 1 << SolidityParser.T__22 | 1 << SolidityParser.T__24 | 1 << SolidityParser.T__25 | 1 << SolidityParser.T__26 | 1 << SolidityParser.T__27 | 1 << SolidityParser.T__29 | 1 << SolidityParser.T__30)) !== 0 || (_la - 34 & ~0x1f) == 0 && (1 << _la - 34 & (1 << SolidityParser.T__33 - 34 | 1 << SolidityParser.T__35 - 34 | 1 << SolidityParser.T__39 - 34 | 1 << SolidityParser.T__48 - 34 | 1 << SolidityParser.T__49 - 34 | 1 << SolidityParser.T__50 - 34 | 1 << SolidityParser.T__51 - 34)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91 | 1 << SolidityParser.Identifier - 91)) !== 0) {
      this.state = 255;
      this.contractPart();
      this.state = 260;

      this._errHandler.sync(this);

      _la = this._input.LA(1);
    }

    this.state = 261;
    this.match(SolidityParser.T__15);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function InheritanceSpecifierContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_inheritanceSpecifier;
  return this;
}

InheritanceSpecifierContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
InheritanceSpecifierContext.prototype.constructor = InheritanceSpecifierContext;

InheritanceSpecifierContext.prototype.userDefinedTypeName = function () {
  return this.getTypedRuleContext(UserDefinedTypeNameContext, 0);
};

InheritanceSpecifierContext.prototype.expression = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ExpressionContext);
  } else {
    return this.getTypedRuleContext(ExpressionContext, i);
  }
};

InheritanceSpecifierContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterInheritanceSpecifier(this);
  }
};

InheritanceSpecifierContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitInheritanceSpecifier(this);
  }
};

SolidityParser.InheritanceSpecifierContext = InheritanceSpecifierContext;

SolidityParser.prototype.inheritanceSpecifier = function () {
  var localctx = new InheritanceSpecifierContext(this, this._ctx, this.state);
  this.enterRule(localctx, 20, SolidityParser.RULE_inheritanceSpecifier);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 263;
    this.userDefinedTypeName();
    this.state = 275;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__20) {
      this.state = 264;
      this.match(SolidityParser.T__20);
      this.state = 265;
      this.expression(0);
      this.state = 270;

      this._errHandler.sync(this);

      _la = this._input.LA(1);

      while (_la === SolidityParser.T__14) {
        this.state = 266;
        this.match(SolidityParser.T__14);
        this.state = 267;
        this.expression(0);
        this.state = 272;

        this._errHandler.sync(this);

        _la = this._input.LA(1);
      }

      this.state = 273;
      this.match(SolidityParser.T__21);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ContractPartContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_contractPart;
  return this;
}

ContractPartContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ContractPartContext.prototype.constructor = ContractPartContext;

ContractPartContext.prototype.stateVariableDeclaration = function () {
  return this.getTypedRuleContext(StateVariableDeclarationContext, 0);
};

ContractPartContext.prototype.usingForDeclaration = function () {
  return this.getTypedRuleContext(UsingForDeclarationContext, 0);
};

ContractPartContext.prototype.structDefinition = function () {
  return this.getTypedRuleContext(StructDefinitionContext, 0);
};

ContractPartContext.prototype.constructorDefinition = function () {
  return this.getTypedRuleContext(ConstructorDefinitionContext, 0);
};

ContractPartContext.prototype.modifierDefinition = function () {
  return this.getTypedRuleContext(ModifierDefinitionContext, 0);
};

ContractPartContext.prototype.functionDefinition = function () {
  return this.getTypedRuleContext(FunctionDefinitionContext, 0);
};

ContractPartContext.prototype.eventDefinition = function () {
  return this.getTypedRuleContext(EventDefinitionContext, 0);
};

ContractPartContext.prototype.enumDefinition = function () {
  return this.getTypedRuleContext(EnumDefinitionContext, 0);
};

ContractPartContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterContractPart(this);
  }
};

ContractPartContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitContractPart(this);
  }
};

SolidityParser.ContractPartContext = ContractPartContext;

SolidityParser.prototype.contractPart = function () {
  var localctx = new ContractPartContext(this, this._ctx, this.state);
  this.enterRule(localctx, 22, SolidityParser.RULE_contractPart);

  try {
    this.state = 285;

    this._errHandler.sync(this);

    var la_ = this._interp.adaptivePredict(this._input, 16, this._ctx);

    switch (la_) {
      case 1:
        this.enterOuterAlt(localctx, 1);
        this.state = 277;
        this.stateVariableDeclaration();
        break;

      case 2:
        this.enterOuterAlt(localctx, 2);
        this.state = 278;
        this.usingForDeclaration();
        break;

      case 3:
        this.enterOuterAlt(localctx, 3);
        this.state = 279;
        this.structDefinition();
        break;

      case 4:
        this.enterOuterAlt(localctx, 4);
        this.state = 280;
        this.constructorDefinition();
        break;

      case 5:
        this.enterOuterAlt(localctx, 5);
        this.state = 281;
        this.modifierDefinition();
        break;

      case 6:
        this.enterOuterAlt(localctx, 6);
        this.state = 282;
        this.functionDefinition();
        break;

      case 7:
        this.enterOuterAlt(localctx, 7);
        this.state = 283;
        this.eventDefinition();
        break;

      case 8:
        this.enterOuterAlt(localctx, 8);
        this.state = 284;
        this.enumDefinition();
        break;
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function StateVariableDeclarationContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_stateVariableDeclaration;
  return this;
}

StateVariableDeclarationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StateVariableDeclarationContext.prototype.constructor = StateVariableDeclarationContext;

StateVariableDeclarationContext.prototype.typeName = function () {
  return this.getTypedRuleContext(TypeNameContext, 0);
};

StateVariableDeclarationContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

StateVariableDeclarationContext.prototype.expression = function () {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

StateVariableDeclarationContext.prototype.PublicKeyword = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTokens(SolidityParser.PublicKeyword);
  } else {
    return this.getToken(SolidityParser.PublicKeyword, i);
  }
};

StateVariableDeclarationContext.prototype.InternalKeyword = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTokens(SolidityParser.InternalKeyword);
  } else {
    return this.getToken(SolidityParser.InternalKeyword, i);
  }
};

StateVariableDeclarationContext.prototype.PrivateKeyword = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTokens(SolidityParser.PrivateKeyword);
  } else {
    return this.getToken(SolidityParser.PrivateKeyword, i);
  }
};

StateVariableDeclarationContext.prototype.ConstantKeyword = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTokens(SolidityParser.ConstantKeyword);
  } else {
    return this.getToken(SolidityParser.ConstantKeyword, i);
  }
};

StateVariableDeclarationContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterStateVariableDeclaration(this);
  }
};

StateVariableDeclarationContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitStateVariableDeclaration(this);
  }
};

SolidityParser.StateVariableDeclarationContext = StateVariableDeclarationContext;

SolidityParser.prototype.stateVariableDeclaration = function () {
  var localctx = new StateVariableDeclarationContext(this, this._ctx, this.state);
  this.enterRule(localctx, 24, SolidityParser.RULE_stateVariableDeclaration);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 287;
    this.typeName(0);
    this.state = 291;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    while ((_la - 105 & ~0x1f) == 0 && (1 << _la - 105 & (1 << SolidityParser.ConstantKeyword - 105 | 1 << SolidityParser.InternalKeyword - 105 | 1 << SolidityParser.PrivateKeyword - 105 | 1 << SolidityParser.PublicKeyword - 105)) !== 0) {
      this.state = 288;
      _la = this._input.LA(1);

      if (!((_la - 105 & ~0x1f) == 0 && (1 << _la - 105 & (1 << SolidityParser.ConstantKeyword - 105 | 1 << SolidityParser.InternalKeyword - 105 | 1 << SolidityParser.PrivateKeyword - 105 | 1 << SolidityParser.PublicKeyword - 105)) !== 0)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);

        this.consume();
      }

      this.state = 293;

      this._errHandler.sync(this);

      _la = this._input.LA(1);
    }

    this.state = 294;
    this.identifier();
    this.state = 297;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__8) {
      this.state = 295;
      this.match(SolidityParser.T__8);
      this.state = 296;
      this.expression(0);
    }

    this.state = 299;
    this.match(SolidityParser.T__1);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function UsingForDeclarationContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_usingForDeclaration;
  return this;
}

UsingForDeclarationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
UsingForDeclarationContext.prototype.constructor = UsingForDeclarationContext;

UsingForDeclarationContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

UsingForDeclarationContext.prototype.typeName = function () {
  return this.getTypedRuleContext(TypeNameContext, 0);
};

UsingForDeclarationContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterUsingForDeclaration(this);
  }
};

UsingForDeclarationContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitUsingForDeclaration(this);
  }
};

SolidityParser.UsingForDeclarationContext = UsingForDeclarationContext;

SolidityParser.prototype.usingForDeclaration = function () {
  var localctx = new UsingForDeclarationContext(this, this._ctx, this.state);
  this.enterRule(localctx, 26, SolidityParser.RULE_usingForDeclaration);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 301;
    this.match(SolidityParser.T__22);
    this.state = 302;
    this.identifier();
    this.state = 303;
    this.match(SolidityParser.T__23);
    this.state = 306;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case SolidityParser.T__11:
        this.state = 304;
        this.match(SolidityParser.T__11);
        break;

      case SolidityParser.T__12:
      case SolidityParser.T__27:
      case SolidityParser.T__33:
      case SolidityParser.T__35:
      case SolidityParser.T__39:
      case SolidityParser.T__48:
      case SolidityParser.T__49:
      case SolidityParser.T__50:
      case SolidityParser.T__51:
      case SolidityParser.Int:
      case SolidityParser.Uint:
      case SolidityParser.Byte:
      case SolidityParser.Fixed:
      case SolidityParser.Ufixed:
      case SolidityParser.Identifier:
        this.state = 305;
        this.typeName(0);
        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }

    this.state = 308;
    this.match(SolidityParser.T__1);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function StructDefinitionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_structDefinition;
  return this;
}

StructDefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StructDefinitionContext.prototype.constructor = StructDefinitionContext;

StructDefinitionContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

StructDefinitionContext.prototype.variableDeclaration = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(VariableDeclarationContext);
  } else {
    return this.getTypedRuleContext(VariableDeclarationContext, i);
  }
};

StructDefinitionContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterStructDefinition(this);
  }
};

StructDefinitionContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitStructDefinition(this);
  }
};

SolidityParser.StructDefinitionContext = StructDefinitionContext;

SolidityParser.prototype.structDefinition = function () {
  var localctx = new StructDefinitionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 28, SolidityParser.RULE_structDefinition);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 310;
    this.match(SolidityParser.T__24);
    this.state = 311;
    this.identifier();
    this.state = 312;
    this.match(SolidityParser.T__13);
    this.state = 323;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__12 || _la === SolidityParser.T__27 || (_la - 34 & ~0x1f) == 0 && (1 << _la - 34 & (1 << SolidityParser.T__33 - 34 | 1 << SolidityParser.T__35 - 34 | 1 << SolidityParser.T__39 - 34 | 1 << SolidityParser.T__48 - 34 | 1 << SolidityParser.T__49 - 34 | 1 << SolidityParser.T__50 - 34 | 1 << SolidityParser.T__51 - 34)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91 | 1 << SolidityParser.Identifier - 91)) !== 0) {
      this.state = 313;
      this.variableDeclaration();
      this.state = 314;
      this.match(SolidityParser.T__1);
      this.state = 320;

      this._errHandler.sync(this);

      _la = this._input.LA(1);

      while (_la === SolidityParser.T__12 || _la === SolidityParser.T__27 || (_la - 34 & ~0x1f) == 0 && (1 << _la - 34 & (1 << SolidityParser.T__33 - 34 | 1 << SolidityParser.T__35 - 34 | 1 << SolidityParser.T__39 - 34 | 1 << SolidityParser.T__48 - 34 | 1 << SolidityParser.T__49 - 34 | 1 << SolidityParser.T__50 - 34 | 1 << SolidityParser.T__51 - 34)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91 | 1 << SolidityParser.Identifier - 91)) !== 0) {
        this.state = 315;
        this.variableDeclaration();
        this.state = 316;
        this.match(SolidityParser.T__1);
        this.state = 322;

        this._errHandler.sync(this);

        _la = this._input.LA(1);
      }
    }

    this.state = 325;
    this.match(SolidityParser.T__15);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ConstructorDefinitionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_constructorDefinition;
  return this;
}

ConstructorDefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ConstructorDefinitionContext.prototype.constructor = ConstructorDefinitionContext;

ConstructorDefinitionContext.prototype.parameterList = function () {
  return this.getTypedRuleContext(ParameterListContext, 0);
};

ConstructorDefinitionContext.prototype.modifierList = function () {
  return this.getTypedRuleContext(ModifierListContext, 0);
};

ConstructorDefinitionContext.prototype.block = function () {
  return this.getTypedRuleContext(BlockContext, 0);
};

ConstructorDefinitionContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterConstructorDefinition(this);
  }
};

ConstructorDefinitionContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitConstructorDefinition(this);
  }
};

SolidityParser.ConstructorDefinitionContext = ConstructorDefinitionContext;

SolidityParser.prototype.constructorDefinition = function () {
  var localctx = new ConstructorDefinitionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 30, SolidityParser.RULE_constructorDefinition);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 327;
    this.match(SolidityParser.T__25);
    this.state = 328;
    this.parameterList();
    this.state = 329;
    this.modifierList();
    this.state = 330;
    this.block();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ModifierDefinitionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_modifierDefinition;
  return this;
}

ModifierDefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ModifierDefinitionContext.prototype.constructor = ModifierDefinitionContext;

ModifierDefinitionContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

ModifierDefinitionContext.prototype.block = function () {
  return this.getTypedRuleContext(BlockContext, 0);
};

ModifierDefinitionContext.prototype.parameterList = function () {
  return this.getTypedRuleContext(ParameterListContext, 0);
};

ModifierDefinitionContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterModifierDefinition(this);
  }
};

ModifierDefinitionContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitModifierDefinition(this);
  }
};

SolidityParser.ModifierDefinitionContext = ModifierDefinitionContext;

SolidityParser.prototype.modifierDefinition = function () {
  var localctx = new ModifierDefinitionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 32, SolidityParser.RULE_modifierDefinition);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 332;
    this.match(SolidityParser.T__26);
    this.state = 333;
    this.identifier();
    this.state = 335;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__20) {
      this.state = 334;
      this.parameterList();
    }

    this.state = 337;
    this.block();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ModifierInvocationContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_modifierInvocation;
  return this;
}

ModifierInvocationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ModifierInvocationContext.prototype.constructor = ModifierInvocationContext;

ModifierInvocationContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

ModifierInvocationContext.prototype.expressionList = function () {
  return this.getTypedRuleContext(ExpressionListContext, 0);
};

ModifierInvocationContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterModifierInvocation(this);
  }
};

ModifierInvocationContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitModifierInvocation(this);
  }
};

SolidityParser.ModifierInvocationContext = ModifierInvocationContext;

SolidityParser.prototype.modifierInvocation = function () {
  var localctx = new ModifierInvocationContext(this, this._ctx, this.state);
  this.enterRule(localctx, 34, SolidityParser.RULE_modifierInvocation);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 339;
    this.identifier();
    this.state = 345;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__20) {
      this.state = 340;
      this.match(SolidityParser.T__20);
      this.state = 342;

      this._errHandler.sync(this);

      _la = this._input.LA(1);

      if ((_la & ~0x1f) == 0 && (1 << _la & (1 << SolidityParser.T__3 | 1 << SolidityParser.T__12 | 1 << SolidityParser.T__20)) !== 0 || (_la - 32 & ~0x1f) == 0 && (1 << _la - 32 & (1 << SolidityParser.T__31 - 32 | 1 << SolidityParser.T__33 - 32 | 1 << SolidityParser.T__39 - 32 | 1 << SolidityParser.T__48 - 32 | 1 << SolidityParser.T__49 - 32 | 1 << SolidityParser.T__50 - 32 | 1 << SolidityParser.T__51 - 32 | 1 << SolidityParser.T__52 - 32 | 1 << SolidityParser.T__53 - 32 | 1 << SolidityParser.T__54 - 32 | 1 << SolidityParser.T__55 - 32 | 1 << SolidityParser.T__56 - 32 | 1 << SolidityParser.T__57 - 32 | 1 << SolidityParser.T__58 - 32 | 1 << SolidityParser.T__59 - 32)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91 | 1 << SolidityParser.BooleanLiteral - 91 | 1 << SolidityParser.DecimalNumber - 91 | 1 << SolidityParser.HexNumber - 91 | 1 << SolidityParser.HexLiteral - 91 | 1 << SolidityParser.Identifier - 91 | 1 << SolidityParser.StringLiteral - 91)) !== 0) {
        this.state = 341;
        this.expressionList();
      }

      this.state = 344;
      this.match(SolidityParser.T__21);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function FunctionDefinitionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_functionDefinition;
  return this;
}

FunctionDefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FunctionDefinitionContext.prototype.constructor = FunctionDefinitionContext;

FunctionDefinitionContext.prototype.parameterList = function () {
  return this.getTypedRuleContext(ParameterListContext, 0);
};

FunctionDefinitionContext.prototype.modifierList = function () {
  return this.getTypedRuleContext(ModifierListContext, 0);
};

FunctionDefinitionContext.prototype.block = function () {
  return this.getTypedRuleContext(BlockContext, 0);
};

FunctionDefinitionContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

FunctionDefinitionContext.prototype.returnParameters = function () {
  return this.getTypedRuleContext(ReturnParametersContext, 0);
};

FunctionDefinitionContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterFunctionDefinition(this);
  }
};

FunctionDefinitionContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitFunctionDefinition(this);
  }
};

SolidityParser.FunctionDefinitionContext = FunctionDefinitionContext;

SolidityParser.prototype.functionDefinition = function () {
  var localctx = new FunctionDefinitionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 36, SolidityParser.RULE_functionDefinition);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 347;
    this.match(SolidityParser.T__27);
    this.state = 349;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__12 || _la === SolidityParser.T__39 || _la === SolidityParser.Identifier) {
      this.state = 348;
      this.identifier();
    }

    this.state = 351;
    this.parameterList();
    this.state = 352;
    this.modifierList();
    this.state = 354;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__28) {
      this.state = 353;
      this.returnParameters();
    }

    this.state = 358;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case SolidityParser.T__1:
        this.state = 356;
        this.match(SolidityParser.T__1);
        break;

      case SolidityParser.T__13:
        this.state = 357;
        this.block();
        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ReturnParametersContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_returnParameters;
  return this;
}

ReturnParametersContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ReturnParametersContext.prototype.constructor = ReturnParametersContext;

ReturnParametersContext.prototype.parameterList = function () {
  return this.getTypedRuleContext(ParameterListContext, 0);
};

ReturnParametersContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterReturnParameters(this);
  }
};

ReturnParametersContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitReturnParameters(this);
  }
};

SolidityParser.ReturnParametersContext = ReturnParametersContext;

SolidityParser.prototype.returnParameters = function () {
  var localctx = new ReturnParametersContext(this, this._ctx, this.state);
  this.enterRule(localctx, 38, SolidityParser.RULE_returnParameters);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 360;
    this.match(SolidityParser.T__28);
    this.state = 361;
    this.parameterList();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ModifierListContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_modifierList;
  return this;
}

ModifierListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ModifierListContext.prototype.constructor = ModifierListContext;

ModifierListContext.prototype.modifierInvocation = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ModifierInvocationContext);
  } else {
    return this.getTypedRuleContext(ModifierInvocationContext, i);
  }
};

ModifierListContext.prototype.stateMutability = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(StateMutabilityContext);
  } else {
    return this.getTypedRuleContext(StateMutabilityContext, i);
  }
};

ModifierListContext.prototype.ExternalKeyword = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTokens(SolidityParser.ExternalKeyword);
  } else {
    return this.getToken(SolidityParser.ExternalKeyword, i);
  }
};

ModifierListContext.prototype.PublicKeyword = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTokens(SolidityParser.PublicKeyword);
  } else {
    return this.getToken(SolidityParser.PublicKeyword, i);
  }
};

ModifierListContext.prototype.InternalKeyword = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTokens(SolidityParser.InternalKeyword);
  } else {
    return this.getToken(SolidityParser.InternalKeyword, i);
  }
};

ModifierListContext.prototype.PrivateKeyword = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTokens(SolidityParser.PrivateKeyword);
  } else {
    return this.getToken(SolidityParser.PrivateKeyword, i);
  }
};

ModifierListContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterModifierList(this);
  }
};

ModifierListContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitModifierList(this);
  }
};

SolidityParser.ModifierListContext = ModifierListContext;

SolidityParser.prototype.modifierList = function () {
  var localctx = new ModifierListContext(this, this._ctx, this.state);
  this.enterRule(localctx, 40, SolidityParser.RULE_modifierList);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 371;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    while (_la === SolidityParser.T__12 || _la === SolidityParser.T__39 || (_la - 105 & ~0x1f) == 0 && (1 << _la - 105 & (1 << SolidityParser.ConstantKeyword - 105 | 1 << SolidityParser.ExternalKeyword - 105 | 1 << SolidityParser.InternalKeyword - 105 | 1 << SolidityParser.PayableKeyword - 105 | 1 << SolidityParser.PrivateKeyword - 105 | 1 << SolidityParser.PublicKeyword - 105 | 1 << SolidityParser.PureKeyword - 105 | 1 << SolidityParser.ViewKeyword - 105 | 1 << SolidityParser.Identifier - 105)) !== 0) {
      this.state = 369;

      this._errHandler.sync(this);

      switch (this._input.LA(1)) {
        case SolidityParser.T__12:
        case SolidityParser.T__39:
        case SolidityParser.Identifier:
          this.state = 363;
          this.modifierInvocation();
          break;

        case SolidityParser.ConstantKeyword:
        case SolidityParser.PayableKeyword:
        case SolidityParser.PureKeyword:
        case SolidityParser.ViewKeyword:
          this.state = 364;
          this.stateMutability();
          break;

        case SolidityParser.ExternalKeyword:
          this.state = 365;
          this.match(SolidityParser.ExternalKeyword);
          break;

        case SolidityParser.PublicKeyword:
          this.state = 366;
          this.match(SolidityParser.PublicKeyword);
          break;

        case SolidityParser.InternalKeyword:
          this.state = 367;
          this.match(SolidityParser.InternalKeyword);
          break;

        case SolidityParser.PrivateKeyword:
          this.state = 368;
          this.match(SolidityParser.PrivateKeyword);
          break;

        default:
          throw new antlr4.error.NoViableAltException(this);
      }

      this.state = 373;

      this._errHandler.sync(this);

      _la = this._input.LA(1);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function EventDefinitionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_eventDefinition;
  return this;
}

EventDefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EventDefinitionContext.prototype.constructor = EventDefinitionContext;

EventDefinitionContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

EventDefinitionContext.prototype.eventParameterList = function () {
  return this.getTypedRuleContext(EventParameterListContext, 0);
};

EventDefinitionContext.prototype.AnonymousKeyword = function () {
  return this.getToken(SolidityParser.AnonymousKeyword, 0);
};

EventDefinitionContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterEventDefinition(this);
  }
};

EventDefinitionContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitEventDefinition(this);
  }
};

SolidityParser.EventDefinitionContext = EventDefinitionContext;

SolidityParser.prototype.eventDefinition = function () {
  var localctx = new EventDefinitionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 42, SolidityParser.RULE_eventDefinition);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 374;
    this.match(SolidityParser.T__29);
    this.state = 375;
    this.identifier();
    this.state = 376;
    this.eventParameterList();
    this.state = 378;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.AnonymousKeyword) {
      this.state = 377;
      this.match(SolidityParser.AnonymousKeyword);
    }

    this.state = 380;
    this.match(SolidityParser.T__1);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function EnumValueContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_enumValue;
  return this;
}

EnumValueContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EnumValueContext.prototype.constructor = EnumValueContext;

EnumValueContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

EnumValueContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterEnumValue(this);
  }
};

EnumValueContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitEnumValue(this);
  }
};

SolidityParser.EnumValueContext = EnumValueContext;

SolidityParser.prototype.enumValue = function () {
  var localctx = new EnumValueContext(this, this._ctx, this.state);
  this.enterRule(localctx, 44, SolidityParser.RULE_enumValue);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 382;
    this.identifier();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function EnumDefinitionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_enumDefinition;
  return this;
}

EnumDefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EnumDefinitionContext.prototype.constructor = EnumDefinitionContext;

EnumDefinitionContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

EnumDefinitionContext.prototype.enumValue = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(EnumValueContext);
  } else {
    return this.getTypedRuleContext(EnumValueContext, i);
  }
};

EnumDefinitionContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterEnumDefinition(this);
  }
};

EnumDefinitionContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitEnumDefinition(this);
  }
};

SolidityParser.EnumDefinitionContext = EnumDefinitionContext;

SolidityParser.prototype.enumDefinition = function () {
  var localctx = new EnumDefinitionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 46, SolidityParser.RULE_enumDefinition);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 384;
    this.match(SolidityParser.T__30);
    this.state = 385;
    this.identifier();
    this.state = 386;
    this.match(SolidityParser.T__13);
    this.state = 388;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__12 || _la === SolidityParser.T__39 || _la === SolidityParser.Identifier) {
      this.state = 387;
      this.enumValue();
    }

    this.state = 394;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    while (_la === SolidityParser.T__14) {
      this.state = 390;
      this.match(SolidityParser.T__14);
      this.state = 391;
      this.enumValue();
      this.state = 396;

      this._errHandler.sync(this);

      _la = this._input.LA(1);
    }

    this.state = 397;
    this.match(SolidityParser.T__15);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ParameterListContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_parameterList;
  return this;
}

ParameterListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ParameterListContext.prototype.constructor = ParameterListContext;

ParameterListContext.prototype.parameter = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ParameterContext);
  } else {
    return this.getTypedRuleContext(ParameterContext, i);
  }
};

ParameterListContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterParameterList(this);
  }
};

ParameterListContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitParameterList(this);
  }
};

SolidityParser.ParameterListContext = ParameterListContext;

SolidityParser.prototype.parameterList = function () {
  var localctx = new ParameterListContext(this, this._ctx, this.state);
  this.enterRule(localctx, 48, SolidityParser.RULE_parameterList);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 399;
    this.match(SolidityParser.T__20);
    this.state = 408;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__12 || _la === SolidityParser.T__27 || (_la - 34 & ~0x1f) == 0 && (1 << _la - 34 & (1 << SolidityParser.T__33 - 34 | 1 << SolidityParser.T__35 - 34 | 1 << SolidityParser.T__39 - 34 | 1 << SolidityParser.T__48 - 34 | 1 << SolidityParser.T__49 - 34 | 1 << SolidityParser.T__50 - 34 | 1 << SolidityParser.T__51 - 34)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91 | 1 << SolidityParser.Identifier - 91)) !== 0) {
      this.state = 400;
      this.parameter();
      this.state = 405;

      this._errHandler.sync(this);

      _la = this._input.LA(1);

      while (_la === SolidityParser.T__14) {
        this.state = 401;
        this.match(SolidityParser.T__14);
        this.state = 402;
        this.parameter();
        this.state = 407;

        this._errHandler.sync(this);

        _la = this._input.LA(1);
      }
    }

    this.state = 410;
    this.match(SolidityParser.T__21);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ParameterContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_parameter;
  return this;
}

ParameterContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ParameterContext.prototype.constructor = ParameterContext;

ParameterContext.prototype.typeName = function () {
  return this.getTypedRuleContext(TypeNameContext, 0);
};

ParameterContext.prototype.storageLocation = function () {
  return this.getTypedRuleContext(StorageLocationContext, 0);
};

ParameterContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

ParameterContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterParameter(this);
  }
};

ParameterContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitParameter(this);
  }
};

SolidityParser.ParameterContext = ParameterContext;

SolidityParser.prototype.parameter = function () {
  var localctx = new ParameterContext(this, this._ctx, this.state);
  this.enterRule(localctx, 50, SolidityParser.RULE_parameter);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 412;
    this.typeName(0);
    this.state = 414;

    this._errHandler.sync(this);

    var la_ = this._interp.adaptivePredict(this._input, 35, this._ctx);

    if (la_ === 1) {
      this.state = 413;
      this.storageLocation();
    }

    this.state = 417;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__12 || _la === SolidityParser.T__39 || _la === SolidityParser.Identifier) {
      this.state = 416;
      this.identifier();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function EventParameterListContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_eventParameterList;
  return this;
}

EventParameterListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EventParameterListContext.prototype.constructor = EventParameterListContext;

EventParameterListContext.prototype.eventParameter = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(EventParameterContext);
  } else {
    return this.getTypedRuleContext(EventParameterContext, i);
  }
};

EventParameterListContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterEventParameterList(this);
  }
};

EventParameterListContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitEventParameterList(this);
  }
};

SolidityParser.EventParameterListContext = EventParameterListContext;

SolidityParser.prototype.eventParameterList = function () {
  var localctx = new EventParameterListContext(this, this._ctx, this.state);
  this.enterRule(localctx, 52, SolidityParser.RULE_eventParameterList);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 419;
    this.match(SolidityParser.T__20);
    this.state = 428;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__12 || _la === SolidityParser.T__27 || (_la - 34 & ~0x1f) == 0 && (1 << _la - 34 & (1 << SolidityParser.T__33 - 34 | 1 << SolidityParser.T__35 - 34 | 1 << SolidityParser.T__39 - 34 | 1 << SolidityParser.T__48 - 34 | 1 << SolidityParser.T__49 - 34 | 1 << SolidityParser.T__50 - 34 | 1 << SolidityParser.T__51 - 34)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91 | 1 << SolidityParser.Identifier - 91)) !== 0) {
      this.state = 420;
      this.eventParameter();
      this.state = 425;

      this._errHandler.sync(this);

      _la = this._input.LA(1);

      while (_la === SolidityParser.T__14) {
        this.state = 421;
        this.match(SolidityParser.T__14);
        this.state = 422;
        this.eventParameter();
        this.state = 427;

        this._errHandler.sync(this);

        _la = this._input.LA(1);
      }
    }

    this.state = 430;
    this.match(SolidityParser.T__21);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function EventParameterContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_eventParameter;
  return this;
}

EventParameterContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EventParameterContext.prototype.constructor = EventParameterContext;

EventParameterContext.prototype.typeName = function () {
  return this.getTypedRuleContext(TypeNameContext, 0);
};

EventParameterContext.prototype.IndexedKeyword = function () {
  return this.getToken(SolidityParser.IndexedKeyword, 0);
};

EventParameterContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

EventParameterContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterEventParameter(this);
  }
};

EventParameterContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitEventParameter(this);
  }
};

SolidityParser.EventParameterContext = EventParameterContext;

SolidityParser.prototype.eventParameter = function () {
  var localctx = new EventParameterContext(this, this._ctx, this.state);
  this.enterRule(localctx, 54, SolidityParser.RULE_eventParameter);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 432;
    this.typeName(0);
    this.state = 434;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.IndexedKeyword) {
      this.state = 433;
      this.match(SolidityParser.IndexedKeyword);
    }

    this.state = 437;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__12 || _la === SolidityParser.T__39 || _la === SolidityParser.Identifier) {
      this.state = 436;
      this.identifier();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function FunctionTypeParameterListContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_functionTypeParameterList;
  return this;
}

FunctionTypeParameterListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FunctionTypeParameterListContext.prototype.constructor = FunctionTypeParameterListContext;

FunctionTypeParameterListContext.prototype.functionTypeParameter = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(FunctionTypeParameterContext);
  } else {
    return this.getTypedRuleContext(FunctionTypeParameterContext, i);
  }
};

FunctionTypeParameterListContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterFunctionTypeParameterList(this);
  }
};

FunctionTypeParameterListContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitFunctionTypeParameterList(this);
  }
};

SolidityParser.FunctionTypeParameterListContext = FunctionTypeParameterListContext;

SolidityParser.prototype.functionTypeParameterList = function () {
  var localctx = new FunctionTypeParameterListContext(this, this._ctx, this.state);
  this.enterRule(localctx, 56, SolidityParser.RULE_functionTypeParameterList);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 439;
    this.match(SolidityParser.T__20);
    this.state = 448;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__12 || _la === SolidityParser.T__27 || (_la - 34 & ~0x1f) == 0 && (1 << _la - 34 & (1 << SolidityParser.T__33 - 34 | 1 << SolidityParser.T__35 - 34 | 1 << SolidityParser.T__39 - 34 | 1 << SolidityParser.T__48 - 34 | 1 << SolidityParser.T__49 - 34 | 1 << SolidityParser.T__50 - 34 | 1 << SolidityParser.T__51 - 34)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91 | 1 << SolidityParser.Identifier - 91)) !== 0) {
      this.state = 440;
      this.functionTypeParameter();
      this.state = 445;

      this._errHandler.sync(this);

      _la = this._input.LA(1);

      while (_la === SolidityParser.T__14) {
        this.state = 441;
        this.match(SolidityParser.T__14);
        this.state = 442;
        this.functionTypeParameter();
        this.state = 447;

        this._errHandler.sync(this);

        _la = this._input.LA(1);
      }
    }

    this.state = 450;
    this.match(SolidityParser.T__21);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function FunctionTypeParameterContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_functionTypeParameter;
  return this;
}

FunctionTypeParameterContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FunctionTypeParameterContext.prototype.constructor = FunctionTypeParameterContext;

FunctionTypeParameterContext.prototype.typeName = function () {
  return this.getTypedRuleContext(TypeNameContext, 0);
};

FunctionTypeParameterContext.prototype.storageLocation = function () {
  return this.getTypedRuleContext(StorageLocationContext, 0);
};

FunctionTypeParameterContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterFunctionTypeParameter(this);
  }
};

FunctionTypeParameterContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitFunctionTypeParameter(this);
  }
};

SolidityParser.FunctionTypeParameterContext = FunctionTypeParameterContext;

SolidityParser.prototype.functionTypeParameter = function () {
  var localctx = new FunctionTypeParameterContext(this, this._ctx, this.state);
  this.enterRule(localctx, 58, SolidityParser.RULE_functionTypeParameter);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 452;
    this.typeName(0);
    this.state = 454;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if ((_la - 38 & ~0x1f) == 0 && (1 << _la - 38 & (1 << SolidityParser.T__37 - 38 | 1 << SolidityParser.T__38 - 38 | 1 << SolidityParser.T__39 - 38)) !== 0) {
      this.state = 453;
      this.storageLocation();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function VariableDeclarationContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_variableDeclaration;
  return this;
}

VariableDeclarationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
VariableDeclarationContext.prototype.constructor = VariableDeclarationContext;

VariableDeclarationContext.prototype.typeName = function () {
  return this.getTypedRuleContext(TypeNameContext, 0);
};

VariableDeclarationContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

VariableDeclarationContext.prototype.storageLocation = function () {
  return this.getTypedRuleContext(StorageLocationContext, 0);
};

VariableDeclarationContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterVariableDeclaration(this);
  }
};

VariableDeclarationContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitVariableDeclaration(this);
  }
};

SolidityParser.VariableDeclarationContext = VariableDeclarationContext;

SolidityParser.prototype.variableDeclaration = function () {
  var localctx = new VariableDeclarationContext(this, this._ctx, this.state);
  this.enterRule(localctx, 60, SolidityParser.RULE_variableDeclaration);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 456;
    this.typeName(0);
    this.state = 458;

    this._errHandler.sync(this);

    var la_ = this._interp.adaptivePredict(this._input, 44, this._ctx);

    if (la_ === 1) {
      this.state = 457;
      this.storageLocation();
    }

    this.state = 460;
    this.identifier();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function TypeNameContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_typeName;
  return this;
}

TypeNameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TypeNameContext.prototype.constructor = TypeNameContext;

TypeNameContext.prototype.elementaryTypeName = function () {
  return this.getTypedRuleContext(ElementaryTypeNameContext, 0);
};

TypeNameContext.prototype.userDefinedTypeName = function () {
  return this.getTypedRuleContext(UserDefinedTypeNameContext, 0);
};

TypeNameContext.prototype.mapping = function () {
  return this.getTypedRuleContext(MappingContext, 0);
};

TypeNameContext.prototype.functionTypeName = function () {
  return this.getTypedRuleContext(FunctionTypeNameContext, 0);
};

TypeNameContext.prototype.PayableKeyword = function () {
  return this.getToken(SolidityParser.PayableKeyword, 0);
};

TypeNameContext.prototype.typeName = function () {
  return this.getTypedRuleContext(TypeNameContext, 0);
};

TypeNameContext.prototype.expression = function () {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

TypeNameContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterTypeName(this);
  }
};

TypeNameContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitTypeName(this);
  }
};

SolidityParser.prototype.typeName = function (_p) {
  if (_p === undefined) {
    _p = 0;
  }

  var _parentctx = this._ctx;
  var _parentState = this.state;
  var localctx = new TypeNameContext(this, this._ctx, _parentState);
  var _prevctx = localctx;
  var _startState = 62;
  this.enterRecursionRule(localctx, 62, SolidityParser.RULE_typeName, _p);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 469;

    this._errHandler.sync(this);

    var la_ = this._interp.adaptivePredict(this._input, 45, this._ctx);

    switch (la_) {
      case 1:
        this.state = 463;
        this.elementaryTypeName();
        break;

      case 2:
        this.state = 464;
        this.userDefinedTypeName();
        break;

      case 3:
        this.state = 465;
        this.mapping();
        break;

      case 4:
        this.state = 466;
        this.functionTypeName();
        break;

      case 5:
        this.state = 467;
        this.match(SolidityParser.T__33);
        this.state = 468;
        this.match(SolidityParser.PayableKeyword);
        break;
    }

    this._ctx.stop = this._input.LT(-1);
    this.state = 479;

    this._errHandler.sync(this);

    var _alt = this._interp.adaptivePredict(this._input, 47, this._ctx);

    while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
      if (_alt === 1) {
        if (this._parseListeners !== null) {
          this.triggerExitRuleEvent();
        }

        _prevctx = localctx;
        localctx = new TypeNameContext(this, _parentctx, _parentState);
        this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_typeName);
        this.state = 471;

        if (!this.precpred(this._ctx, 3)) {
          throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
        }

        this.state = 472;
        this.match(SolidityParser.T__31);
        this.state = 474;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if ((_la & ~0x1f) == 0 && (1 << _la & (1 << SolidityParser.T__3 | 1 << SolidityParser.T__12 | 1 << SolidityParser.T__20)) !== 0 || (_la - 32 & ~0x1f) == 0 && (1 << _la - 32 & (1 << SolidityParser.T__31 - 32 | 1 << SolidityParser.T__33 - 32 | 1 << SolidityParser.T__39 - 32 | 1 << SolidityParser.T__48 - 32 | 1 << SolidityParser.T__49 - 32 | 1 << SolidityParser.T__50 - 32 | 1 << SolidityParser.T__51 - 32 | 1 << SolidityParser.T__52 - 32 | 1 << SolidityParser.T__53 - 32 | 1 << SolidityParser.T__54 - 32 | 1 << SolidityParser.T__55 - 32 | 1 << SolidityParser.T__56 - 32 | 1 << SolidityParser.T__57 - 32 | 1 << SolidityParser.T__58 - 32 | 1 << SolidityParser.T__59 - 32)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91 | 1 << SolidityParser.BooleanLiteral - 91 | 1 << SolidityParser.DecimalNumber - 91 | 1 << SolidityParser.HexNumber - 91 | 1 << SolidityParser.HexLiteral - 91 | 1 << SolidityParser.Identifier - 91 | 1 << SolidityParser.StringLiteral - 91)) !== 0) {
          this.state = 473;
          this.expression(0);
        }

        this.state = 476;
        this.match(SolidityParser.T__32);
      }

      this.state = 481;

      this._errHandler.sync(this);

      _alt = this._interp.adaptivePredict(this._input, 47, this._ctx);
    }
  } catch (error) {
    if (error instanceof antlr4.error.RecognitionException) {
      localctx.exception = error;

      this._errHandler.reportError(this, error);

      this._errHandler.recover(this, error);
    } else {
      throw error;
    }
  } finally {
    this.unrollRecursionContexts(_parentctx);
  }

  return localctx;
};

function UserDefinedTypeNameContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_userDefinedTypeName;
  return this;
}

UserDefinedTypeNameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
UserDefinedTypeNameContext.prototype.constructor = UserDefinedTypeNameContext;

UserDefinedTypeNameContext.prototype.identifier = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(IdentifierContext);
  } else {
    return this.getTypedRuleContext(IdentifierContext, i);
  }
};

UserDefinedTypeNameContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterUserDefinedTypeName(this);
  }
};

UserDefinedTypeNameContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitUserDefinedTypeName(this);
  }
};

SolidityParser.UserDefinedTypeNameContext = UserDefinedTypeNameContext;

SolidityParser.prototype.userDefinedTypeName = function () {
  var localctx = new UserDefinedTypeNameContext(this, this._ctx, this.state);
  this.enterRule(localctx, 64, SolidityParser.RULE_userDefinedTypeName);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 482;
    this.identifier();
    this.state = 487;

    this._errHandler.sync(this);

    var _alt = this._interp.adaptivePredict(this._input, 48, this._ctx);

    while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
      if (_alt === 1) {
        this.state = 483;
        this.match(SolidityParser.T__34);
        this.state = 484;
        this.identifier();
      }

      this.state = 489;

      this._errHandler.sync(this);

      _alt = this._interp.adaptivePredict(this._input, 48, this._ctx);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function MappingContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_mapping;
  return this;
}

MappingContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
MappingContext.prototype.constructor = MappingContext;

MappingContext.prototype.elementaryTypeName = function () {
  return this.getTypedRuleContext(ElementaryTypeNameContext, 0);
};

MappingContext.prototype.typeName = function () {
  return this.getTypedRuleContext(TypeNameContext, 0);
};

MappingContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterMapping(this);
  }
};

MappingContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitMapping(this);
  }
};

SolidityParser.MappingContext = MappingContext;

SolidityParser.prototype.mapping = function () {
  var localctx = new MappingContext(this, this._ctx, this.state);
  this.enterRule(localctx, 66, SolidityParser.RULE_mapping);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 490;
    this.match(SolidityParser.T__35);
    this.state = 491;
    this.match(SolidityParser.T__20);
    this.state = 492;
    this.elementaryTypeName();
    this.state = 493;
    this.match(SolidityParser.T__36);
    this.state = 494;
    this.typeName(0);
    this.state = 495;
    this.match(SolidityParser.T__21);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function FunctionTypeNameContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_functionTypeName;
  return this;
}

FunctionTypeNameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FunctionTypeNameContext.prototype.constructor = FunctionTypeNameContext;

FunctionTypeNameContext.prototype.functionTypeParameterList = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(FunctionTypeParameterListContext);
  } else {
    return this.getTypedRuleContext(FunctionTypeParameterListContext, i);
  }
};

FunctionTypeNameContext.prototype.InternalKeyword = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTokens(SolidityParser.InternalKeyword);
  } else {
    return this.getToken(SolidityParser.InternalKeyword, i);
  }
};

FunctionTypeNameContext.prototype.ExternalKeyword = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTokens(SolidityParser.ExternalKeyword);
  } else {
    return this.getToken(SolidityParser.ExternalKeyword, i);
  }
};

FunctionTypeNameContext.prototype.stateMutability = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(StateMutabilityContext);
  } else {
    return this.getTypedRuleContext(StateMutabilityContext, i);
  }
};

FunctionTypeNameContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterFunctionTypeName(this);
  }
};

FunctionTypeNameContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitFunctionTypeName(this);
  }
};

SolidityParser.FunctionTypeNameContext = FunctionTypeNameContext;

SolidityParser.prototype.functionTypeName = function () {
  var localctx = new FunctionTypeNameContext(this, this._ctx, this.state);
  this.enterRule(localctx, 68, SolidityParser.RULE_functionTypeName);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 497;
    this.match(SolidityParser.T__27);
    this.state = 498;
    this.functionTypeParameterList();
    this.state = 504;

    this._errHandler.sync(this);

    var _alt = this._interp.adaptivePredict(this._input, 50, this._ctx);

    while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
      if (_alt === 1) {
        this.state = 502;

        this._errHandler.sync(this);

        switch (this._input.LA(1)) {
          case SolidityParser.InternalKeyword:
            this.state = 499;
            this.match(SolidityParser.InternalKeyword);
            break;

          case SolidityParser.ExternalKeyword:
            this.state = 500;
            this.match(SolidityParser.ExternalKeyword);
            break;

          case SolidityParser.ConstantKeyword:
          case SolidityParser.PayableKeyword:
          case SolidityParser.PureKeyword:
          case SolidityParser.ViewKeyword:
            this.state = 501;
            this.stateMutability();
            break;

          default:
            throw new antlr4.error.NoViableAltException(this);
        }
      }

      this.state = 506;

      this._errHandler.sync(this);

      _alt = this._interp.adaptivePredict(this._input, 50, this._ctx);
    }

    this.state = 509;

    this._errHandler.sync(this);

    var la_ = this._interp.adaptivePredict(this._input, 51, this._ctx);

    if (la_ === 1) {
      this.state = 507;
      this.match(SolidityParser.T__28);
      this.state = 508;
      this.functionTypeParameterList();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function StorageLocationContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_storageLocation;
  return this;
}

StorageLocationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StorageLocationContext.prototype.constructor = StorageLocationContext;

StorageLocationContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterStorageLocation(this);
  }
};

StorageLocationContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitStorageLocation(this);
  }
};

SolidityParser.StorageLocationContext = StorageLocationContext;

SolidityParser.prototype.storageLocation = function () {
  var localctx = new StorageLocationContext(this, this._ctx, this.state);
  this.enterRule(localctx, 70, SolidityParser.RULE_storageLocation);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 511;
    _la = this._input.LA(1);

    if (!((_la - 38 & ~0x1f) == 0 && (1 << _la - 38 & (1 << SolidityParser.T__37 - 38 | 1 << SolidityParser.T__38 - 38 | 1 << SolidityParser.T__39 - 38)) !== 0)) {
      this._errHandler.recoverInline(this);
    } else {
      this._errHandler.reportMatch(this);

      this.consume();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function StateMutabilityContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_stateMutability;
  return this;
}

StateMutabilityContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StateMutabilityContext.prototype.constructor = StateMutabilityContext;

StateMutabilityContext.prototype.PureKeyword = function () {
  return this.getToken(SolidityParser.PureKeyword, 0);
};

StateMutabilityContext.prototype.ConstantKeyword = function () {
  return this.getToken(SolidityParser.ConstantKeyword, 0);
};

StateMutabilityContext.prototype.ViewKeyword = function () {
  return this.getToken(SolidityParser.ViewKeyword, 0);
};

StateMutabilityContext.prototype.PayableKeyword = function () {
  return this.getToken(SolidityParser.PayableKeyword, 0);
};

StateMutabilityContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterStateMutability(this);
  }
};

StateMutabilityContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitStateMutability(this);
  }
};

SolidityParser.StateMutabilityContext = StateMutabilityContext;

SolidityParser.prototype.stateMutability = function () {
  var localctx = new StateMutabilityContext(this, this._ctx, this.state);
  this.enterRule(localctx, 72, SolidityParser.RULE_stateMutability);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 513;
    _la = this._input.LA(1);

    if (!((_la - 105 & ~0x1f) == 0 && (1 << _la - 105 & (1 << SolidityParser.ConstantKeyword - 105 | 1 << SolidityParser.PayableKeyword - 105 | 1 << SolidityParser.PureKeyword - 105 | 1 << SolidityParser.ViewKeyword - 105)) !== 0)) {
      this._errHandler.recoverInline(this);
    } else {
      this._errHandler.reportMatch(this);

      this.consume();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function BlockContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_block;
  return this;
}

BlockContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
BlockContext.prototype.constructor = BlockContext;

BlockContext.prototype.statement = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(StatementContext);
  } else {
    return this.getTypedRuleContext(StatementContext, i);
  }
};

BlockContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterBlock(this);
  }
};

BlockContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitBlock(this);
  }
};

SolidityParser.BlockContext = BlockContext;

SolidityParser.prototype.block = function () {
  var localctx = new BlockContext(this, this._ctx, this.state);
  this.enterRule(localctx, 74, SolidityParser.RULE_block);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 515;
    this.match(SolidityParser.T__13);
    this.state = 519;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    while ((_la & ~0x1f) == 0 && (1 << _la & (1 << SolidityParser.T__3 | 1 << SolidityParser.T__12 | 1 << SolidityParser.T__13 | 1 << SolidityParser.T__20 | 1 << SolidityParser.T__23 | 1 << SolidityParser.T__27)) !== 0 || (_la - 32 & ~0x1f) == 0 && (1 << _la - 32 & (1 << SolidityParser.T__31 - 32 | 1 << SolidityParser.T__33 - 32 | 1 << SolidityParser.T__35 - 32 | 1 << SolidityParser.T__39 - 32 | 1 << SolidityParser.T__40 - 32 | 1 << SolidityParser.T__42 - 32 | 1 << SolidityParser.T__43 - 32 | 1 << SolidityParser.T__44 - 32 | 1 << SolidityParser.T__45 - 32 | 1 << SolidityParser.T__46 - 32 | 1 << SolidityParser.T__47 - 32 | 1 << SolidityParser.T__48 - 32 | 1 << SolidityParser.T__49 - 32 | 1 << SolidityParser.T__50 - 32 | 1 << SolidityParser.T__51 - 32 | 1 << SolidityParser.T__52 - 32 | 1 << SolidityParser.T__53 - 32 | 1 << SolidityParser.T__54 - 32 | 1 << SolidityParser.T__55 - 32 | 1 << SolidityParser.T__56 - 32 | 1 << SolidityParser.T__57 - 32 | 1 << SolidityParser.T__58 - 32 | 1 << SolidityParser.T__59 - 32)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91 | 1 << SolidityParser.BooleanLiteral - 91 | 1 << SolidityParser.DecimalNumber - 91 | 1 << SolidityParser.HexNumber - 91 | 1 << SolidityParser.HexLiteral - 91 | 1 << SolidityParser.BreakKeyword - 91 | 1 << SolidityParser.ContinueKeyword - 91 | 1 << SolidityParser.Identifier - 91 | 1 << SolidityParser.StringLiteral - 91)) !== 0) {
      this.state = 516;
      this.statement();
      this.state = 521;

      this._errHandler.sync(this);

      _la = this._input.LA(1);
    }

    this.state = 522;
    this.match(SolidityParser.T__15);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function StatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_statement;
  return this;
}

StatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatementContext.prototype.constructor = StatementContext;

StatementContext.prototype.ifStatement = function () {
  return this.getTypedRuleContext(IfStatementContext, 0);
};

StatementContext.prototype.whileStatement = function () {
  return this.getTypedRuleContext(WhileStatementContext, 0);
};

StatementContext.prototype.forStatement = function () {
  return this.getTypedRuleContext(ForStatementContext, 0);
};

StatementContext.prototype.block = function () {
  return this.getTypedRuleContext(BlockContext, 0);
};

StatementContext.prototype.inlineAssemblyStatement = function () {
  return this.getTypedRuleContext(InlineAssemblyStatementContext, 0);
};

StatementContext.prototype.doWhileStatement = function () {
  return this.getTypedRuleContext(DoWhileStatementContext, 0);
};

StatementContext.prototype.continueStatement = function () {
  return this.getTypedRuleContext(ContinueStatementContext, 0);
};

StatementContext.prototype.breakStatement = function () {
  return this.getTypedRuleContext(BreakStatementContext, 0);
};

StatementContext.prototype.returnStatement = function () {
  return this.getTypedRuleContext(ReturnStatementContext, 0);
};

StatementContext.prototype.throwStatement = function () {
  return this.getTypedRuleContext(ThrowStatementContext, 0);
};

StatementContext.prototype.emitStatement = function () {
  return this.getTypedRuleContext(EmitStatementContext, 0);
};

StatementContext.prototype.simpleStatement = function () {
  return this.getTypedRuleContext(SimpleStatementContext, 0);
};

StatementContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterStatement(this);
  }
};

StatementContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitStatement(this);
  }
};

SolidityParser.StatementContext = StatementContext;

SolidityParser.prototype.statement = function () {
  var localctx = new StatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 76, SolidityParser.RULE_statement);

  try {
    this.state = 536;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case SolidityParser.T__40:
        this.enterOuterAlt(localctx, 1);
        this.state = 524;
        this.ifStatement();
        break;

      case SolidityParser.T__42:
        this.enterOuterAlt(localctx, 2);
        this.state = 525;
        this.whileStatement();
        break;

      case SolidityParser.T__23:
        this.enterOuterAlt(localctx, 3);
        this.state = 526;
        this.forStatement();
        break;

      case SolidityParser.T__13:
        this.enterOuterAlt(localctx, 4);
        this.state = 527;
        this.block();
        break;

      case SolidityParser.T__43:
        this.enterOuterAlt(localctx, 5);
        this.state = 528;
        this.inlineAssemblyStatement();
        break;

      case SolidityParser.T__44:
        this.enterOuterAlt(localctx, 6);
        this.state = 529;
        this.doWhileStatement();
        break;

      case SolidityParser.ContinueKeyword:
        this.enterOuterAlt(localctx, 7);
        this.state = 530;
        this.continueStatement();
        break;

      case SolidityParser.BreakKeyword:
        this.enterOuterAlt(localctx, 8);
        this.state = 531;
        this.breakStatement();
        break;

      case SolidityParser.T__45:
        this.enterOuterAlt(localctx, 9);
        this.state = 532;
        this.returnStatement();
        break;

      case SolidityParser.T__46:
        this.enterOuterAlt(localctx, 10);
        this.state = 533;
        this.throwStatement();
        break;

      case SolidityParser.T__47:
        this.enterOuterAlt(localctx, 11);
        this.state = 534;
        this.emitStatement();
        break;

      case SolidityParser.T__3:
      case SolidityParser.T__12:
      case SolidityParser.T__20:
      case SolidityParser.T__27:
      case SolidityParser.T__31:
      case SolidityParser.T__33:
      case SolidityParser.T__35:
      case SolidityParser.T__39:
      case SolidityParser.T__48:
      case SolidityParser.T__49:
      case SolidityParser.T__50:
      case SolidityParser.T__51:
      case SolidityParser.T__52:
      case SolidityParser.T__53:
      case SolidityParser.T__54:
      case SolidityParser.T__55:
      case SolidityParser.T__56:
      case SolidityParser.T__57:
      case SolidityParser.T__58:
      case SolidityParser.T__59:
      case SolidityParser.Int:
      case SolidityParser.Uint:
      case SolidityParser.Byte:
      case SolidityParser.Fixed:
      case SolidityParser.Ufixed:
      case SolidityParser.BooleanLiteral:
      case SolidityParser.DecimalNumber:
      case SolidityParser.HexNumber:
      case SolidityParser.HexLiteral:
      case SolidityParser.Identifier:
      case SolidityParser.StringLiteral:
        this.enterOuterAlt(localctx, 12);
        this.state = 535;
        this.simpleStatement();
        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ExpressionStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_expressionStatement;
  return this;
}

ExpressionStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionStatementContext.prototype.constructor = ExpressionStatementContext;

ExpressionStatementContext.prototype.expression = function () {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

ExpressionStatementContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterExpressionStatement(this);
  }
};

ExpressionStatementContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitExpressionStatement(this);
  }
};

SolidityParser.ExpressionStatementContext = ExpressionStatementContext;

SolidityParser.prototype.expressionStatement = function () {
  var localctx = new ExpressionStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 78, SolidityParser.RULE_expressionStatement);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 538;
    this.expression(0);
    this.state = 539;
    this.match(SolidityParser.T__1);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function IfStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_ifStatement;
  return this;
}

IfStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IfStatementContext.prototype.constructor = IfStatementContext;

IfStatementContext.prototype.expression = function () {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

IfStatementContext.prototype.statement = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(StatementContext);
  } else {
    return this.getTypedRuleContext(StatementContext, i);
  }
};

IfStatementContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterIfStatement(this);
  }
};

IfStatementContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitIfStatement(this);
  }
};

SolidityParser.IfStatementContext = IfStatementContext;

SolidityParser.prototype.ifStatement = function () {
  var localctx = new IfStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 80, SolidityParser.RULE_ifStatement);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 541;
    this.match(SolidityParser.T__40);
    this.state = 542;
    this.match(SolidityParser.T__20);
    this.state = 543;
    this.expression(0);
    this.state = 544;
    this.match(SolidityParser.T__21);
    this.state = 545;
    this.statement();
    this.state = 548;

    this._errHandler.sync(this);

    var la_ = this._interp.adaptivePredict(this._input, 54, this._ctx);

    if (la_ === 1) {
      this.state = 546;
      this.match(SolidityParser.T__41);
      this.state = 547;
      this.statement();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function WhileStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_whileStatement;
  return this;
}

WhileStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
WhileStatementContext.prototype.constructor = WhileStatementContext;

WhileStatementContext.prototype.expression = function () {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

WhileStatementContext.prototype.statement = function () {
  return this.getTypedRuleContext(StatementContext, 0);
};

WhileStatementContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterWhileStatement(this);
  }
};

WhileStatementContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitWhileStatement(this);
  }
};

SolidityParser.WhileStatementContext = WhileStatementContext;

SolidityParser.prototype.whileStatement = function () {
  var localctx = new WhileStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 82, SolidityParser.RULE_whileStatement);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 550;
    this.match(SolidityParser.T__42);
    this.state = 551;
    this.match(SolidityParser.T__20);
    this.state = 552;
    this.expression(0);
    this.state = 553;
    this.match(SolidityParser.T__21);
    this.state = 554;
    this.statement();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function SimpleStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_simpleStatement;
  return this;
}

SimpleStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SimpleStatementContext.prototype.constructor = SimpleStatementContext;

SimpleStatementContext.prototype.variableDeclarationStatement = function () {
  return this.getTypedRuleContext(VariableDeclarationStatementContext, 0);
};

SimpleStatementContext.prototype.expressionStatement = function () {
  return this.getTypedRuleContext(ExpressionStatementContext, 0);
};

SimpleStatementContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterSimpleStatement(this);
  }
};

SimpleStatementContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitSimpleStatement(this);
  }
};

SolidityParser.SimpleStatementContext = SimpleStatementContext;

SolidityParser.prototype.simpleStatement = function () {
  var localctx = new SimpleStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 84, SolidityParser.RULE_simpleStatement);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 558;

    this._errHandler.sync(this);

    var la_ = this._interp.adaptivePredict(this._input, 55, this._ctx);

    switch (la_) {
      case 1:
        this.state = 556;
        this.variableDeclarationStatement();
        break;

      case 2:
        this.state = 557;
        this.expressionStatement();
        break;
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ForStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_forStatement;
  return this;
}

ForStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ForStatementContext.prototype.constructor = ForStatementContext;

ForStatementContext.prototype.statement = function () {
  return this.getTypedRuleContext(StatementContext, 0);
};

ForStatementContext.prototype.simpleStatement = function () {
  return this.getTypedRuleContext(SimpleStatementContext, 0);
};

ForStatementContext.prototype.expressionStatement = function () {
  return this.getTypedRuleContext(ExpressionStatementContext, 0);
};

ForStatementContext.prototype.expression = function () {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

ForStatementContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterForStatement(this);
  }
};

ForStatementContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitForStatement(this);
  }
};

SolidityParser.ForStatementContext = ForStatementContext;

SolidityParser.prototype.forStatement = function () {
  var localctx = new ForStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 86, SolidityParser.RULE_forStatement);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 560;
    this.match(SolidityParser.T__23);
    this.state = 561;
    this.match(SolidityParser.T__20);
    this.state = 564;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case SolidityParser.T__3:
      case SolidityParser.T__12:
      case SolidityParser.T__20:
      case SolidityParser.T__27:
      case SolidityParser.T__31:
      case SolidityParser.T__33:
      case SolidityParser.T__35:
      case SolidityParser.T__39:
      case SolidityParser.T__48:
      case SolidityParser.T__49:
      case SolidityParser.T__50:
      case SolidityParser.T__51:
      case SolidityParser.T__52:
      case SolidityParser.T__53:
      case SolidityParser.T__54:
      case SolidityParser.T__55:
      case SolidityParser.T__56:
      case SolidityParser.T__57:
      case SolidityParser.T__58:
      case SolidityParser.T__59:
      case SolidityParser.Int:
      case SolidityParser.Uint:
      case SolidityParser.Byte:
      case SolidityParser.Fixed:
      case SolidityParser.Ufixed:
      case SolidityParser.BooleanLiteral:
      case SolidityParser.DecimalNumber:
      case SolidityParser.HexNumber:
      case SolidityParser.HexLiteral:
      case SolidityParser.Identifier:
      case SolidityParser.StringLiteral:
        this.state = 562;
        this.simpleStatement();
        break;

      case SolidityParser.T__1:
        this.state = 563;
        this.match(SolidityParser.T__1);
        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }

    this.state = 568;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case SolidityParser.T__3:
      case SolidityParser.T__12:
      case SolidityParser.T__20:
      case SolidityParser.T__31:
      case SolidityParser.T__33:
      case SolidityParser.T__39:
      case SolidityParser.T__48:
      case SolidityParser.T__49:
      case SolidityParser.T__50:
      case SolidityParser.T__51:
      case SolidityParser.T__52:
      case SolidityParser.T__53:
      case SolidityParser.T__54:
      case SolidityParser.T__55:
      case SolidityParser.T__56:
      case SolidityParser.T__57:
      case SolidityParser.T__58:
      case SolidityParser.T__59:
      case SolidityParser.Int:
      case SolidityParser.Uint:
      case SolidityParser.Byte:
      case SolidityParser.Fixed:
      case SolidityParser.Ufixed:
      case SolidityParser.BooleanLiteral:
      case SolidityParser.DecimalNumber:
      case SolidityParser.HexNumber:
      case SolidityParser.HexLiteral:
      case SolidityParser.Identifier:
      case SolidityParser.StringLiteral:
        this.state = 566;
        this.expressionStatement();
        break;

      case SolidityParser.T__1:
        this.state = 567;
        this.match(SolidityParser.T__1);
        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }

    this.state = 571;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if ((_la & ~0x1f) == 0 && (1 << _la & (1 << SolidityParser.T__3 | 1 << SolidityParser.T__12 | 1 << SolidityParser.T__20)) !== 0 || (_la - 32 & ~0x1f) == 0 && (1 << _la - 32 & (1 << SolidityParser.T__31 - 32 | 1 << SolidityParser.T__33 - 32 | 1 << SolidityParser.T__39 - 32 | 1 << SolidityParser.T__48 - 32 | 1 << SolidityParser.T__49 - 32 | 1 << SolidityParser.T__50 - 32 | 1 << SolidityParser.T__51 - 32 | 1 << SolidityParser.T__52 - 32 | 1 << SolidityParser.T__53 - 32 | 1 << SolidityParser.T__54 - 32 | 1 << SolidityParser.T__55 - 32 | 1 << SolidityParser.T__56 - 32 | 1 << SolidityParser.T__57 - 32 | 1 << SolidityParser.T__58 - 32 | 1 << SolidityParser.T__59 - 32)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91 | 1 << SolidityParser.BooleanLiteral - 91 | 1 << SolidityParser.DecimalNumber - 91 | 1 << SolidityParser.HexNumber - 91 | 1 << SolidityParser.HexLiteral - 91 | 1 << SolidityParser.Identifier - 91 | 1 << SolidityParser.StringLiteral - 91)) !== 0) {
      this.state = 570;
      this.expression(0);
    }

    this.state = 573;
    this.match(SolidityParser.T__21);
    this.state = 574;
    this.statement();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function InlineAssemblyStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_inlineAssemblyStatement;
  return this;
}

InlineAssemblyStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
InlineAssemblyStatementContext.prototype.constructor = InlineAssemblyStatementContext;

InlineAssemblyStatementContext.prototype.assemblyBlock = function () {
  return this.getTypedRuleContext(AssemblyBlockContext, 0);
};

InlineAssemblyStatementContext.prototype.StringLiteral = function () {
  return this.getToken(SolidityParser.StringLiteral, 0);
};

InlineAssemblyStatementContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterInlineAssemblyStatement(this);
  }
};

InlineAssemblyStatementContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitInlineAssemblyStatement(this);
  }
};

SolidityParser.InlineAssemblyStatementContext = InlineAssemblyStatementContext;

SolidityParser.prototype.inlineAssemblyStatement = function () {
  var localctx = new InlineAssemblyStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 88, SolidityParser.RULE_inlineAssemblyStatement);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 576;
    this.match(SolidityParser.T__43);
    this.state = 578;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.StringLiteral) {
      this.state = 577;
      this.match(SolidityParser.StringLiteral);
    }

    this.state = 580;
    this.assemblyBlock();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function DoWhileStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_doWhileStatement;
  return this;
}

DoWhileStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DoWhileStatementContext.prototype.constructor = DoWhileStatementContext;

DoWhileStatementContext.prototype.statement = function () {
  return this.getTypedRuleContext(StatementContext, 0);
};

DoWhileStatementContext.prototype.expression = function () {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

DoWhileStatementContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterDoWhileStatement(this);
  }
};

DoWhileStatementContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitDoWhileStatement(this);
  }
};

SolidityParser.DoWhileStatementContext = DoWhileStatementContext;

SolidityParser.prototype.doWhileStatement = function () {
  var localctx = new DoWhileStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 90, SolidityParser.RULE_doWhileStatement);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 582;
    this.match(SolidityParser.T__44);
    this.state = 583;
    this.statement();
    this.state = 584;
    this.match(SolidityParser.T__42);
    this.state = 585;
    this.match(SolidityParser.T__20);
    this.state = 586;
    this.expression(0);
    this.state = 587;
    this.match(SolidityParser.T__21);
    this.state = 588;
    this.match(SolidityParser.T__1);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ContinueStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_continueStatement;
  return this;
}

ContinueStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ContinueStatementContext.prototype.constructor = ContinueStatementContext;

ContinueStatementContext.prototype.ContinueKeyword = function () {
  return this.getToken(SolidityParser.ContinueKeyword, 0);
};

ContinueStatementContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterContinueStatement(this);
  }
};

ContinueStatementContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitContinueStatement(this);
  }
};

SolidityParser.ContinueStatementContext = ContinueStatementContext;

SolidityParser.prototype.continueStatement = function () {
  var localctx = new ContinueStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 92, SolidityParser.RULE_continueStatement);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 590;
    this.match(SolidityParser.ContinueKeyword);
    this.state = 591;
    this.match(SolidityParser.T__1);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function BreakStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_breakStatement;
  return this;
}

BreakStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
BreakStatementContext.prototype.constructor = BreakStatementContext;

BreakStatementContext.prototype.BreakKeyword = function () {
  return this.getToken(SolidityParser.BreakKeyword, 0);
};

BreakStatementContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterBreakStatement(this);
  }
};

BreakStatementContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitBreakStatement(this);
  }
};

SolidityParser.BreakStatementContext = BreakStatementContext;

SolidityParser.prototype.breakStatement = function () {
  var localctx = new BreakStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 94, SolidityParser.RULE_breakStatement);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 593;
    this.match(SolidityParser.BreakKeyword);
    this.state = 594;
    this.match(SolidityParser.T__1);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ReturnStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_returnStatement;
  return this;
}

ReturnStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ReturnStatementContext.prototype.constructor = ReturnStatementContext;

ReturnStatementContext.prototype.expression = function () {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

ReturnStatementContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterReturnStatement(this);
  }
};

ReturnStatementContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitReturnStatement(this);
  }
};

SolidityParser.ReturnStatementContext = ReturnStatementContext;

SolidityParser.prototype.returnStatement = function () {
  var localctx = new ReturnStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 96, SolidityParser.RULE_returnStatement);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 596;
    this.match(SolidityParser.T__45);
    this.state = 598;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if ((_la & ~0x1f) == 0 && (1 << _la & (1 << SolidityParser.T__3 | 1 << SolidityParser.T__12 | 1 << SolidityParser.T__20)) !== 0 || (_la - 32 & ~0x1f) == 0 && (1 << _la - 32 & (1 << SolidityParser.T__31 - 32 | 1 << SolidityParser.T__33 - 32 | 1 << SolidityParser.T__39 - 32 | 1 << SolidityParser.T__48 - 32 | 1 << SolidityParser.T__49 - 32 | 1 << SolidityParser.T__50 - 32 | 1 << SolidityParser.T__51 - 32 | 1 << SolidityParser.T__52 - 32 | 1 << SolidityParser.T__53 - 32 | 1 << SolidityParser.T__54 - 32 | 1 << SolidityParser.T__55 - 32 | 1 << SolidityParser.T__56 - 32 | 1 << SolidityParser.T__57 - 32 | 1 << SolidityParser.T__58 - 32 | 1 << SolidityParser.T__59 - 32)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91 | 1 << SolidityParser.BooleanLiteral - 91 | 1 << SolidityParser.DecimalNumber - 91 | 1 << SolidityParser.HexNumber - 91 | 1 << SolidityParser.HexLiteral - 91 | 1 << SolidityParser.Identifier - 91 | 1 << SolidityParser.StringLiteral - 91)) !== 0) {
      this.state = 597;
      this.expression(0);
    }

    this.state = 600;
    this.match(SolidityParser.T__1);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ThrowStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_throwStatement;
  return this;
}

ThrowStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ThrowStatementContext.prototype.constructor = ThrowStatementContext;

ThrowStatementContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterThrowStatement(this);
  }
};

ThrowStatementContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitThrowStatement(this);
  }
};

SolidityParser.ThrowStatementContext = ThrowStatementContext;

SolidityParser.prototype.throwStatement = function () {
  var localctx = new ThrowStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 98, SolidityParser.RULE_throwStatement);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 602;
    this.match(SolidityParser.T__46);
    this.state = 603;
    this.match(SolidityParser.T__1);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function EmitStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_emitStatement;
  return this;
}

EmitStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EmitStatementContext.prototype.constructor = EmitStatementContext;

EmitStatementContext.prototype.functionCall = function () {
  return this.getTypedRuleContext(FunctionCallContext, 0);
};

EmitStatementContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterEmitStatement(this);
  }
};

EmitStatementContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitEmitStatement(this);
  }
};

SolidityParser.EmitStatementContext = EmitStatementContext;

SolidityParser.prototype.emitStatement = function () {
  var localctx = new EmitStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 100, SolidityParser.RULE_emitStatement);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 605;
    this.match(SolidityParser.T__47);
    this.state = 606;
    this.functionCall();
    this.state = 607;
    this.match(SolidityParser.T__1);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function VariableDeclarationStatementContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_variableDeclarationStatement;
  return this;
}

VariableDeclarationStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
VariableDeclarationStatementContext.prototype.constructor = VariableDeclarationStatementContext;

VariableDeclarationStatementContext.prototype.identifierList = function () {
  return this.getTypedRuleContext(IdentifierListContext, 0);
};

VariableDeclarationStatementContext.prototype.variableDeclaration = function () {
  return this.getTypedRuleContext(VariableDeclarationContext, 0);
};

VariableDeclarationStatementContext.prototype.variableDeclarationList = function () {
  return this.getTypedRuleContext(VariableDeclarationListContext, 0);
};

VariableDeclarationStatementContext.prototype.expression = function () {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

VariableDeclarationStatementContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterVariableDeclarationStatement(this);
  }
};

VariableDeclarationStatementContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitVariableDeclarationStatement(this);
  }
};

SolidityParser.VariableDeclarationStatementContext = VariableDeclarationStatementContext;

SolidityParser.prototype.variableDeclarationStatement = function () {
  var localctx = new VariableDeclarationStatementContext(this, this._ctx, this.state);
  this.enterRule(localctx, 102, SolidityParser.RULE_variableDeclarationStatement);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 616;

    this._errHandler.sync(this);

    var la_ = this._interp.adaptivePredict(this._input, 61, this._ctx);

    switch (la_) {
      case 1:
        this.state = 609;
        this.match(SolidityParser.T__48);
        this.state = 610;
        this.identifierList();
        break;

      case 2:
        this.state = 611;
        this.variableDeclaration();
        break;

      case 3:
        this.state = 612;
        this.match(SolidityParser.T__20);
        this.state = 613;
        this.variableDeclarationList();
        this.state = 614;
        this.match(SolidityParser.T__21);
        break;
    }

    this.state = 620;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__8) {
      this.state = 618;
      this.match(SolidityParser.T__8);
      this.state = 619;
      this.expression(0);
    }

    this.state = 622;
    this.match(SolidityParser.T__1);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function VariableDeclarationListContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_variableDeclarationList;
  return this;
}

VariableDeclarationListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
VariableDeclarationListContext.prototype.constructor = VariableDeclarationListContext;

VariableDeclarationListContext.prototype.variableDeclaration = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(VariableDeclarationContext);
  } else {
    return this.getTypedRuleContext(VariableDeclarationContext, i);
  }
};

VariableDeclarationListContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterVariableDeclarationList(this);
  }
};

VariableDeclarationListContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitVariableDeclarationList(this);
  }
};

SolidityParser.VariableDeclarationListContext = VariableDeclarationListContext;

SolidityParser.prototype.variableDeclarationList = function () {
  var localctx = new VariableDeclarationListContext(this, this._ctx, this.state);
  this.enterRule(localctx, 104, SolidityParser.RULE_variableDeclarationList);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 625;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__12 || _la === SolidityParser.T__27 || (_la - 34 & ~0x1f) == 0 && (1 << _la - 34 & (1 << SolidityParser.T__33 - 34 | 1 << SolidityParser.T__35 - 34 | 1 << SolidityParser.T__39 - 34 | 1 << SolidityParser.T__48 - 34 | 1 << SolidityParser.T__49 - 34 | 1 << SolidityParser.T__50 - 34 | 1 << SolidityParser.T__51 - 34)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91 | 1 << SolidityParser.Identifier - 91)) !== 0) {
      this.state = 624;
      this.variableDeclaration();
    }

    this.state = 633;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    while (_la === SolidityParser.T__14) {
      this.state = 627;
      this.match(SolidityParser.T__14);
      this.state = 629;

      this._errHandler.sync(this);

      _la = this._input.LA(1);

      if (_la === SolidityParser.T__12 || _la === SolidityParser.T__27 || (_la - 34 & ~0x1f) == 0 && (1 << _la - 34 & (1 << SolidityParser.T__33 - 34 | 1 << SolidityParser.T__35 - 34 | 1 << SolidityParser.T__39 - 34 | 1 << SolidityParser.T__48 - 34 | 1 << SolidityParser.T__49 - 34 | 1 << SolidityParser.T__50 - 34 | 1 << SolidityParser.T__51 - 34)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91 | 1 << SolidityParser.Identifier - 91)) !== 0) {
        this.state = 628;
        this.variableDeclaration();
      }

      this.state = 635;

      this._errHandler.sync(this);

      _la = this._input.LA(1);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function IdentifierListContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_identifierList;
  return this;
}

IdentifierListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IdentifierListContext.prototype.constructor = IdentifierListContext;

IdentifierListContext.prototype.identifier = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(IdentifierContext);
  } else {
    return this.getTypedRuleContext(IdentifierContext, i);
  }
};

IdentifierListContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterIdentifierList(this);
  }
};

IdentifierListContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitIdentifierList(this);
  }
};

SolidityParser.IdentifierListContext = IdentifierListContext;

SolidityParser.prototype.identifierList = function () {
  var localctx = new IdentifierListContext(this, this._ctx, this.state);
  this.enterRule(localctx, 106, SolidityParser.RULE_identifierList);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 636;
    this.match(SolidityParser.T__20);
    this.state = 643;

    this._errHandler.sync(this);

    var _alt = this._interp.adaptivePredict(this._input, 67, this._ctx);

    while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
      if (_alt === 1) {
        this.state = 638;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if (_la === SolidityParser.T__12 || _la === SolidityParser.T__39 || _la === SolidityParser.Identifier) {
          this.state = 637;
          this.identifier();
        }

        this.state = 640;
        this.match(SolidityParser.T__14);
      }

      this.state = 645;

      this._errHandler.sync(this);

      _alt = this._interp.adaptivePredict(this._input, 67, this._ctx);
    }

    this.state = 647;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__12 || _la === SolidityParser.T__39 || _la === SolidityParser.Identifier) {
      this.state = 646;
      this.identifier();
    }

    this.state = 649;
    this.match(SolidityParser.T__21);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ElementaryTypeNameContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_elementaryTypeName;
  return this;
}

ElementaryTypeNameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ElementaryTypeNameContext.prototype.constructor = ElementaryTypeNameContext;

ElementaryTypeNameContext.prototype.Int = function () {
  return this.getToken(SolidityParser.Int, 0);
};

ElementaryTypeNameContext.prototype.Uint = function () {
  return this.getToken(SolidityParser.Uint, 0);
};

ElementaryTypeNameContext.prototype.Byte = function () {
  return this.getToken(SolidityParser.Byte, 0);
};

ElementaryTypeNameContext.prototype.Fixed = function () {
  return this.getToken(SolidityParser.Fixed, 0);
};

ElementaryTypeNameContext.prototype.Ufixed = function () {
  return this.getToken(SolidityParser.Ufixed, 0);
};

ElementaryTypeNameContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterElementaryTypeName(this);
  }
};

ElementaryTypeNameContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitElementaryTypeName(this);
  }
};

SolidityParser.ElementaryTypeNameContext = ElementaryTypeNameContext;

SolidityParser.prototype.elementaryTypeName = function () {
  var localctx = new ElementaryTypeNameContext(this, this._ctx, this.state);
  this.enterRule(localctx, 108, SolidityParser.RULE_elementaryTypeName);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 651;
    _la = this._input.LA(1);

    if (!((_la - 34 & ~0x1f) == 0 && (1 << _la - 34 & (1 << SolidityParser.T__33 - 34 | 1 << SolidityParser.T__48 - 34 | 1 << SolidityParser.T__49 - 34 | 1 << SolidityParser.T__50 - 34 | 1 << SolidityParser.T__51 - 34)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91)) !== 0)) {
      this._errHandler.recoverInline(this);
    } else {
      this._errHandler.reportMatch(this);

      this.consume();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ExpressionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_expression;
  return this;
}

ExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionContext.prototype.constructor = ExpressionContext;

ExpressionContext.prototype.typeName = function () {
  return this.getTypedRuleContext(TypeNameContext, 0);
};

ExpressionContext.prototype.expression = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ExpressionContext);
  } else {
    return this.getTypedRuleContext(ExpressionContext, i);
  }
};

ExpressionContext.prototype.primaryExpression = function () {
  return this.getTypedRuleContext(PrimaryExpressionContext, 0);
};

ExpressionContext.prototype.functionCallArguments = function () {
  return this.getTypedRuleContext(FunctionCallArgumentsContext, 0);
};

ExpressionContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

ExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterExpression(this);
  }
};

ExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitExpression(this);
  }
};

SolidityParser.prototype.expression = function (_p) {
  if (_p === undefined) {
    _p = 0;
  }

  var _parentctx = this._ctx;
  var _parentState = this.state;
  var localctx = new ExpressionContext(this, this._ctx, _parentState);
  var _prevctx = localctx;
  var _startState = 110;
  this.enterRecursionRule(localctx, 110, SolidityParser.RULE_expression, _p);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 671;

    this._errHandler.sync(this);

    var la_ = this._interp.adaptivePredict(this._input, 69, this._ctx);

    switch (la_) {
      case 1:
        this.state = 654;
        this.match(SolidityParser.T__54);
        this.state = 655;
        this.typeName(0);
        break;

      case 2:
        this.state = 656;
        this.match(SolidityParser.T__20);
        this.state = 657;
        this.expression(0);
        this.state = 658;
        this.match(SolidityParser.T__21);
        break;

      case 3:
        this.state = 660;
        _la = this._input.LA(1);

        if (!(_la === SolidityParser.T__52 || _la === SolidityParser.T__53)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);

          this.consume();
        }

        this.state = 661;
        this.expression(19);
        break;

      case 4:
        this.state = 662;
        _la = this._input.LA(1);

        if (!(_la === SolidityParser.T__55 || _la === SolidityParser.T__56)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);

          this.consume();
        }

        this.state = 663;
        this.expression(18);
        break;

      case 5:
        this.state = 664;
        _la = this._input.LA(1);

        if (!(_la === SolidityParser.T__57 || _la === SolidityParser.T__58)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);

          this.consume();
        }

        this.state = 665;
        this.expression(17);
        break;

      case 6:
        this.state = 666;
        this.match(SolidityParser.T__59);
        this.state = 667;
        this.expression(16);
        break;

      case 7:
        this.state = 668;
        this.match(SolidityParser.T__3);
        this.state = 669;
        this.expression(15);
        break;

      case 8:
        this.state = 670;
        this.primaryExpression();
        break;
    }

    this._ctx.stop = this._input.LT(-1);
    this.state = 732;

    this._errHandler.sync(this);

    var _alt = this._interp.adaptivePredict(this._input, 71, this._ctx);

    while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
      if (_alt === 1) {
        if (this._parseListeners !== null) {
          this.triggerExitRuleEvent();
        }

        _prevctx = localctx;
        this.state = 730;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 70, this._ctx);

        switch (la_) {
          case 1:
            localctx = new ExpressionContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_expression);
            this.state = 673;

            if (!this.precpred(this._ctx, 14)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
            }

            this.state = 674;
            this.match(SolidityParser.T__60);
            this.state = 675;
            this.expression(15);
            break;

          case 2:
            localctx = new ExpressionContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_expression);
            this.state = 676;

            if (!this.precpred(this._ctx, 13)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
            }

            this.state = 677;
            _la = this._input.LA(1);

            if (!(_la === SolidityParser.T__11 || _la === SolidityParser.T__61 || _la === SolidityParser.T__62)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            this.state = 678;
            this.expression(14);
            break;

          case 3:
            localctx = new ExpressionContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_expression);
            this.state = 679;

            if (!this.precpred(this._ctx, 12)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
            }

            this.state = 680;
            _la = this._input.LA(1);

            if (!(_la === SolidityParser.T__55 || _la === SolidityParser.T__56)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            this.state = 681;
            this.expression(13);
            break;

          case 4:
            localctx = new ExpressionContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_expression);
            this.state = 682;

            if (!this.precpred(this._ctx, 11)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
            }

            this.state = 683;
            _la = this._input.LA(1);

            if (!(_la === SolidityParser.T__63 || _la === SolidityParser.T__64)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            this.state = 684;
            this.expression(12);
            break;

          case 5:
            localctx = new ExpressionContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_expression);
            this.state = 685;

            if (!this.precpred(this._ctx, 10)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
            }

            this.state = 686;
            this.match(SolidityParser.T__65);
            this.state = 687;
            this.expression(11);
            break;

          case 6:
            localctx = new ExpressionContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_expression);
            this.state = 688;

            if (!this.precpred(this._ctx, 9)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
            }

            this.state = 689;
            this.match(SolidityParser.T__2);
            this.state = 690;
            this.expression(10);
            break;

          case 7:
            localctx = new ExpressionContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_expression);
            this.state = 691;

            if (!this.precpred(this._ctx, 8)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
            }

            this.state = 692;
            this.match(SolidityParser.T__66);
            this.state = 693;
            this.expression(9);
            break;

          case 8:
            localctx = new ExpressionContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_expression);
            this.state = 694;

            if (!this.precpred(this._ctx, 7)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
            }

            this.state = 695;
            _la = this._input.LA(1);

            if (!((_la & ~0x1f) == 0 && (1 << _la & (1 << SolidityParser.T__4 | 1 << SolidityParser.T__5 | 1 << SolidityParser.T__6 | 1 << SolidityParser.T__7)) !== 0)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            this.state = 696;
            this.expression(8);
            break;

          case 9:
            localctx = new ExpressionContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_expression);
            this.state = 697;

            if (!this.precpred(this._ctx, 6)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
            }

            this.state = 698;
            _la = this._input.LA(1);

            if (!(_la === SolidityParser.T__67 || _la === SolidityParser.T__68)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            this.state = 699;
            this.expression(7);
            break;

          case 10:
            localctx = new ExpressionContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_expression);
            this.state = 700;

            if (!this.precpred(this._ctx, 5)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
            }

            this.state = 701;
            this.match(SolidityParser.T__69);
            this.state = 702;
            this.expression(6);
            break;

          case 11:
            localctx = new ExpressionContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_expression);
            this.state = 703;

            if (!this.precpred(this._ctx, 4)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
            }

            this.state = 704;
            this.match(SolidityParser.T__70);
            this.state = 705;
            this.expression(5);
            break;

          case 12:
            localctx = new ExpressionContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_expression);
            this.state = 706;

            if (!this.precpred(this._ctx, 3)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
            }

            this.state = 707;
            this.match(SolidityParser.T__71);
            this.state = 708;
            this.expression(0);
            this.state = 709;
            this.match(SolidityParser.T__72);
            this.state = 710;
            this.expression(4);
            break;

          case 13:
            localctx = new ExpressionContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_expression);
            this.state = 712;

            if (!this.precpred(this._ctx, 2)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
            }

            this.state = 713;
            _la = this._input.LA(1);

            if (!(_la === SolidityParser.T__8 || (_la - 74 & ~0x1f) == 0 && (1 << _la - 74 & (1 << SolidityParser.T__73 - 74 | 1 << SolidityParser.T__74 - 74 | 1 << SolidityParser.T__75 - 74 | 1 << SolidityParser.T__76 - 74 | 1 << SolidityParser.T__77 - 74 | 1 << SolidityParser.T__78 - 74 | 1 << SolidityParser.T__79 - 74 | 1 << SolidityParser.T__80 - 74 | 1 << SolidityParser.T__81 - 74 | 1 << SolidityParser.T__82 - 74)) !== 0)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            this.state = 714;
            this.expression(3);
            break;

          case 14:
            localctx = new ExpressionContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_expression);
            this.state = 715;

            if (!this.precpred(this._ctx, 25)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 25)");
            }

            this.state = 716;
            _la = this._input.LA(1);

            if (!(_la === SolidityParser.T__52 || _la === SolidityParser.T__53)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            break;

          case 15:
            localctx = new ExpressionContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_expression);
            this.state = 717;

            if (!this.precpred(this._ctx, 23)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 23)");
            }

            this.state = 718;
            this.match(SolidityParser.T__31);
            this.state = 719;
            this.expression(0);
            this.state = 720;
            this.match(SolidityParser.T__32);
            break;

          case 16:
            localctx = new ExpressionContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_expression);
            this.state = 722;

            if (!this.precpred(this._ctx, 22)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 22)");
            }

            this.state = 723;
            this.match(SolidityParser.T__20);
            this.state = 724;
            this.functionCallArguments();
            this.state = 725;
            this.match(SolidityParser.T__21);
            break;

          case 17:
            localctx = new ExpressionContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, SolidityParser.RULE_expression);
            this.state = 727;

            if (!this.precpred(this._ctx, 21)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 21)");
            }

            this.state = 728;
            this.match(SolidityParser.T__34);
            this.state = 729;
            this.identifier();
            break;
        }
      }

      this.state = 734;

      this._errHandler.sync(this);

      _alt = this._interp.adaptivePredict(this._input, 71, this._ctx);
    }
  } catch (error) {
    if (error instanceof antlr4.error.RecognitionException) {
      localctx.exception = error;

      this._errHandler.reportError(this, error);

      this._errHandler.recover(this, error);
    } else {
      throw error;
    }
  } finally {
    this.unrollRecursionContexts(_parentctx);
  }

  return localctx;
};

function PrimaryExpressionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_primaryExpression;
  return this;
}

PrimaryExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PrimaryExpressionContext.prototype.constructor = PrimaryExpressionContext;

PrimaryExpressionContext.prototype.BooleanLiteral = function () {
  return this.getToken(SolidityParser.BooleanLiteral, 0);
};

PrimaryExpressionContext.prototype.numberLiteral = function () {
  return this.getTypedRuleContext(NumberLiteralContext, 0);
};

PrimaryExpressionContext.prototype.HexLiteral = function () {
  return this.getToken(SolidityParser.HexLiteral, 0);
};

PrimaryExpressionContext.prototype.StringLiteral = function () {
  return this.getToken(SolidityParser.StringLiteral, 0);
};

PrimaryExpressionContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

PrimaryExpressionContext.prototype.tupleExpression = function () {
  return this.getTypedRuleContext(TupleExpressionContext, 0);
};

PrimaryExpressionContext.prototype.elementaryTypeNameExpression = function () {
  return this.getTypedRuleContext(ElementaryTypeNameExpressionContext, 0);
};

PrimaryExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterPrimaryExpression(this);
  }
};

PrimaryExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitPrimaryExpression(this);
  }
};

SolidityParser.PrimaryExpressionContext = PrimaryExpressionContext;

SolidityParser.prototype.primaryExpression = function () {
  var localctx = new PrimaryExpressionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 112, SolidityParser.RULE_primaryExpression);

  try {
    this.state = 750;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case SolidityParser.BooleanLiteral:
        this.enterOuterAlt(localctx, 1);
        this.state = 735;
        this.match(SolidityParser.BooleanLiteral);
        break;

      case SolidityParser.DecimalNumber:
      case SolidityParser.HexNumber:
        this.enterOuterAlt(localctx, 2);
        this.state = 736;
        this.numberLiteral();
        break;

      case SolidityParser.HexLiteral:
        this.enterOuterAlt(localctx, 3);
        this.state = 737;
        this.match(SolidityParser.HexLiteral);
        break;

      case SolidityParser.StringLiteral:
        this.enterOuterAlt(localctx, 4);
        this.state = 738;
        this.match(SolidityParser.StringLiteral);
        break;

      case SolidityParser.T__12:
      case SolidityParser.T__39:
      case SolidityParser.Identifier:
        this.enterOuterAlt(localctx, 5);
        this.state = 739;
        this.identifier();
        this.state = 742;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 72, this._ctx);

        if (la_ === 1) {
          this.state = 740;
          this.match(SolidityParser.T__31);
          this.state = 741;
          this.match(SolidityParser.T__32);
        }

        break;

      case SolidityParser.T__20:
      case SolidityParser.T__31:
        this.enterOuterAlt(localctx, 6);
        this.state = 744;
        this.tupleExpression();
        break;

      case SolidityParser.T__33:
      case SolidityParser.T__48:
      case SolidityParser.T__49:
      case SolidityParser.T__50:
      case SolidityParser.T__51:
      case SolidityParser.Int:
      case SolidityParser.Uint:
      case SolidityParser.Byte:
      case SolidityParser.Fixed:
      case SolidityParser.Ufixed:
        this.enterOuterAlt(localctx, 7);
        this.state = 745;
        this.elementaryTypeNameExpression();
        this.state = 748;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 73, this._ctx);

        if (la_ === 1) {
          this.state = 746;
          this.match(SolidityParser.T__31);
          this.state = 747;
          this.match(SolidityParser.T__32);
        }

        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ExpressionListContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_expressionList;
  return this;
}

ExpressionListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionListContext.prototype.constructor = ExpressionListContext;

ExpressionListContext.prototype.expression = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ExpressionContext);
  } else {
    return this.getTypedRuleContext(ExpressionContext, i);
  }
};

ExpressionListContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterExpressionList(this);
  }
};

ExpressionListContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitExpressionList(this);
  }
};

SolidityParser.ExpressionListContext = ExpressionListContext;

SolidityParser.prototype.expressionList = function () {
  var localctx = new ExpressionListContext(this, this._ctx, this.state);
  this.enterRule(localctx, 114, SolidityParser.RULE_expressionList);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 752;
    this.expression(0);
    this.state = 757;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    while (_la === SolidityParser.T__14) {
      this.state = 753;
      this.match(SolidityParser.T__14);
      this.state = 754;
      this.expression(0);
      this.state = 759;

      this._errHandler.sync(this);

      _la = this._input.LA(1);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function NameValueListContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_nameValueList;
  return this;
}

NameValueListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NameValueListContext.prototype.constructor = NameValueListContext;

NameValueListContext.prototype.nameValue = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(NameValueContext);
  } else {
    return this.getTypedRuleContext(NameValueContext, i);
  }
};

NameValueListContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterNameValueList(this);
  }
};

NameValueListContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitNameValueList(this);
  }
};

SolidityParser.NameValueListContext = NameValueListContext;

SolidityParser.prototype.nameValueList = function () {
  var localctx = new NameValueListContext(this, this._ctx, this.state);
  this.enterRule(localctx, 116, SolidityParser.RULE_nameValueList);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 760;
    this.nameValue();
    this.state = 765;

    this._errHandler.sync(this);

    var _alt = this._interp.adaptivePredict(this._input, 76, this._ctx);

    while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
      if (_alt === 1) {
        this.state = 761;
        this.match(SolidityParser.T__14);
        this.state = 762;
        this.nameValue();
      }

      this.state = 767;

      this._errHandler.sync(this);

      _alt = this._interp.adaptivePredict(this._input, 76, this._ctx);
    }

    this.state = 769;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__14) {
      this.state = 768;
      this.match(SolidityParser.T__14);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function NameValueContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_nameValue;
  return this;
}

NameValueContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NameValueContext.prototype.constructor = NameValueContext;

NameValueContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

NameValueContext.prototype.expression = function () {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

NameValueContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterNameValue(this);
  }
};

NameValueContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitNameValue(this);
  }
};

SolidityParser.NameValueContext = NameValueContext;

SolidityParser.prototype.nameValue = function () {
  var localctx = new NameValueContext(this, this._ctx, this.state);
  this.enterRule(localctx, 118, SolidityParser.RULE_nameValue);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 771;
    this.identifier();
    this.state = 772;
    this.match(SolidityParser.T__72);
    this.state = 773;
    this.expression(0);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function FunctionCallArgumentsContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_functionCallArguments;
  return this;
}

FunctionCallArgumentsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FunctionCallArgumentsContext.prototype.constructor = FunctionCallArgumentsContext;

FunctionCallArgumentsContext.prototype.nameValueList = function () {
  return this.getTypedRuleContext(NameValueListContext, 0);
};

FunctionCallArgumentsContext.prototype.expressionList = function () {
  return this.getTypedRuleContext(ExpressionListContext, 0);
};

FunctionCallArgumentsContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterFunctionCallArguments(this);
  }
};

FunctionCallArgumentsContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitFunctionCallArguments(this);
  }
};

SolidityParser.FunctionCallArgumentsContext = FunctionCallArgumentsContext;

SolidityParser.prototype.functionCallArguments = function () {
  var localctx = new FunctionCallArgumentsContext(this, this._ctx, this.state);
  this.enterRule(localctx, 120, SolidityParser.RULE_functionCallArguments);
  var _la = 0; // Token type

  try {
    this.state = 783;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case SolidityParser.T__13:
        this.enterOuterAlt(localctx, 1);
        this.state = 775;
        this.match(SolidityParser.T__13);
        this.state = 777;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if (_la === SolidityParser.T__12 || _la === SolidityParser.T__39 || _la === SolidityParser.Identifier) {
          this.state = 776;
          this.nameValueList();
        }

        this.state = 779;
        this.match(SolidityParser.T__15);
        break;

      case SolidityParser.T__3:
      case SolidityParser.T__12:
      case SolidityParser.T__20:
      case SolidityParser.T__21:
      case SolidityParser.T__31:
      case SolidityParser.T__33:
      case SolidityParser.T__39:
      case SolidityParser.T__48:
      case SolidityParser.T__49:
      case SolidityParser.T__50:
      case SolidityParser.T__51:
      case SolidityParser.T__52:
      case SolidityParser.T__53:
      case SolidityParser.T__54:
      case SolidityParser.T__55:
      case SolidityParser.T__56:
      case SolidityParser.T__57:
      case SolidityParser.T__58:
      case SolidityParser.T__59:
      case SolidityParser.Int:
      case SolidityParser.Uint:
      case SolidityParser.Byte:
      case SolidityParser.Fixed:
      case SolidityParser.Ufixed:
      case SolidityParser.BooleanLiteral:
      case SolidityParser.DecimalNumber:
      case SolidityParser.HexNumber:
      case SolidityParser.HexLiteral:
      case SolidityParser.Identifier:
      case SolidityParser.StringLiteral:
        this.enterOuterAlt(localctx, 2);
        this.state = 781;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if ((_la & ~0x1f) == 0 && (1 << _la & (1 << SolidityParser.T__3 | 1 << SolidityParser.T__12 | 1 << SolidityParser.T__20)) !== 0 || (_la - 32 & ~0x1f) == 0 && (1 << _la - 32 & (1 << SolidityParser.T__31 - 32 | 1 << SolidityParser.T__33 - 32 | 1 << SolidityParser.T__39 - 32 | 1 << SolidityParser.T__48 - 32 | 1 << SolidityParser.T__49 - 32 | 1 << SolidityParser.T__50 - 32 | 1 << SolidityParser.T__51 - 32 | 1 << SolidityParser.T__52 - 32 | 1 << SolidityParser.T__53 - 32 | 1 << SolidityParser.T__54 - 32 | 1 << SolidityParser.T__55 - 32 | 1 << SolidityParser.T__56 - 32 | 1 << SolidityParser.T__57 - 32 | 1 << SolidityParser.T__58 - 32 | 1 << SolidityParser.T__59 - 32)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91 | 1 << SolidityParser.BooleanLiteral - 91 | 1 << SolidityParser.DecimalNumber - 91 | 1 << SolidityParser.HexNumber - 91 | 1 << SolidityParser.HexLiteral - 91 | 1 << SolidityParser.Identifier - 91 | 1 << SolidityParser.StringLiteral - 91)) !== 0) {
          this.state = 780;
          this.expressionList();
        }

        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function FunctionCallContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_functionCall;
  return this;
}

FunctionCallContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FunctionCallContext.prototype.constructor = FunctionCallContext;

FunctionCallContext.prototype.expression = function () {
  return this.getTypedRuleContext(ExpressionContext, 0);
};

FunctionCallContext.prototype.functionCallArguments = function () {
  return this.getTypedRuleContext(FunctionCallArgumentsContext, 0);
};

FunctionCallContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterFunctionCall(this);
  }
};

FunctionCallContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitFunctionCall(this);
  }
};

SolidityParser.FunctionCallContext = FunctionCallContext;

SolidityParser.prototype.functionCall = function () {
  var localctx = new FunctionCallContext(this, this._ctx, this.state);
  this.enterRule(localctx, 122, SolidityParser.RULE_functionCall);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 785;
    this.expression(0);
    this.state = 786;
    this.match(SolidityParser.T__20);
    this.state = 787;
    this.functionCallArguments();
    this.state = 788;
    this.match(SolidityParser.T__21);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function AssemblyBlockContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_assemblyBlock;
  return this;
}

AssemblyBlockContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssemblyBlockContext.prototype.constructor = AssemblyBlockContext;

AssemblyBlockContext.prototype.assemblyItem = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(AssemblyItemContext);
  } else {
    return this.getTypedRuleContext(AssemblyItemContext, i);
  }
};

AssemblyBlockContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterAssemblyBlock(this);
  }
};

AssemblyBlockContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitAssemblyBlock(this);
  }
};

SolidityParser.AssemblyBlockContext = AssemblyBlockContext;

SolidityParser.prototype.assemblyBlock = function () {
  var localctx = new AssemblyBlockContext(this, this._ctx, this.state);
  this.enterRule(localctx, 124, SolidityParser.RULE_assemblyBlock);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 790;
    this.match(SolidityParser.T__13);
    this.state = 794;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    while ((_la & ~0x1f) == 0 && (1 << _la & (1 << SolidityParser.T__12 | 1 << SolidityParser.T__13 | 1 << SolidityParser.T__20 | 1 << SolidityParser.T__23 | 1 << SolidityParser.T__27)) !== 0 || (_la - 34 & ~0x1f) == 0 && (1 << _la - 34 & (1 << SolidityParser.T__33 - 34 | 1 << SolidityParser.T__39 - 34 | 1 << SolidityParser.T__40 - 34 | 1 << SolidityParser.T__43 - 34 | 1 << SolidityParser.T__45 - 34 | 1 << SolidityParser.T__51 - 34)) !== 0 || (_la - 84 & ~0x1f) == 0 && (1 << _la - 84 & (1 << SolidityParser.T__83 - 84 | 1 << SolidityParser.T__85 - 84 | 1 << SolidityParser.T__86 - 84 | 1 << SolidityParser.DecimalNumber - 84 | 1 << SolidityParser.HexNumber - 84 | 1 << SolidityParser.HexLiteral - 84 | 1 << SolidityParser.BreakKeyword - 84 | 1 << SolidityParser.ContinueKeyword - 84 | 1 << SolidityParser.Identifier - 84)) !== 0 || _la === SolidityParser.StringLiteral) {
      this.state = 791;
      this.assemblyItem();
      this.state = 796;

      this._errHandler.sync(this);

      _la = this._input.LA(1);
    }

    this.state = 797;
    this.match(SolidityParser.T__15);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function AssemblyItemContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_assemblyItem;
  return this;
}

AssemblyItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssemblyItemContext.prototype.constructor = AssemblyItemContext;

AssemblyItemContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

AssemblyItemContext.prototype.assemblyBlock = function () {
  return this.getTypedRuleContext(AssemblyBlockContext, 0);
};

AssemblyItemContext.prototype.assemblyExpression = function () {
  return this.getTypedRuleContext(AssemblyExpressionContext, 0);
};

AssemblyItemContext.prototype.assemblyLocalDefinition = function () {
  return this.getTypedRuleContext(AssemblyLocalDefinitionContext, 0);
};

AssemblyItemContext.prototype.assemblyAssignment = function () {
  return this.getTypedRuleContext(AssemblyAssignmentContext, 0);
};

AssemblyItemContext.prototype.assemblyStackAssignment = function () {
  return this.getTypedRuleContext(AssemblyStackAssignmentContext, 0);
};

AssemblyItemContext.prototype.labelDefinition = function () {
  return this.getTypedRuleContext(LabelDefinitionContext, 0);
};

AssemblyItemContext.prototype.assemblySwitch = function () {
  return this.getTypedRuleContext(AssemblySwitchContext, 0);
};

AssemblyItemContext.prototype.assemblyFunctionDefinition = function () {
  return this.getTypedRuleContext(AssemblyFunctionDefinitionContext, 0);
};

AssemblyItemContext.prototype.assemblyFor = function () {
  return this.getTypedRuleContext(AssemblyForContext, 0);
};

AssemblyItemContext.prototype.assemblyIf = function () {
  return this.getTypedRuleContext(AssemblyIfContext, 0);
};

AssemblyItemContext.prototype.BreakKeyword = function () {
  return this.getToken(SolidityParser.BreakKeyword, 0);
};

AssemblyItemContext.prototype.ContinueKeyword = function () {
  return this.getToken(SolidityParser.ContinueKeyword, 0);
};

AssemblyItemContext.prototype.subAssembly = function () {
  return this.getTypedRuleContext(SubAssemblyContext, 0);
};

AssemblyItemContext.prototype.numberLiteral = function () {
  return this.getTypedRuleContext(NumberLiteralContext, 0);
};

AssemblyItemContext.prototype.StringLiteral = function () {
  return this.getToken(SolidityParser.StringLiteral, 0);
};

AssemblyItemContext.prototype.HexLiteral = function () {
  return this.getToken(SolidityParser.HexLiteral, 0);
};

AssemblyItemContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterAssemblyItem(this);
  }
};

AssemblyItemContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitAssemblyItem(this);
  }
};

SolidityParser.AssemblyItemContext = AssemblyItemContext;

SolidityParser.prototype.assemblyItem = function () {
  var localctx = new AssemblyItemContext(this, this._ctx, this.state);
  this.enterRule(localctx, 126, SolidityParser.RULE_assemblyItem);

  try {
    this.state = 816;

    this._errHandler.sync(this);

    var la_ = this._interp.adaptivePredict(this._input, 82, this._ctx);

    switch (la_) {
      case 1:
        this.enterOuterAlt(localctx, 1);
        this.state = 799;
        this.identifier();
        break;

      case 2:
        this.enterOuterAlt(localctx, 2);
        this.state = 800;
        this.assemblyBlock();
        break;

      case 3:
        this.enterOuterAlt(localctx, 3);
        this.state = 801;
        this.assemblyExpression();
        break;

      case 4:
        this.enterOuterAlt(localctx, 4);
        this.state = 802;
        this.assemblyLocalDefinition();
        break;

      case 5:
        this.enterOuterAlt(localctx, 5);
        this.state = 803;
        this.assemblyAssignment();
        break;

      case 6:
        this.enterOuterAlt(localctx, 6);
        this.state = 804;
        this.assemblyStackAssignment();
        break;

      case 7:
        this.enterOuterAlt(localctx, 7);
        this.state = 805;
        this.labelDefinition();
        break;

      case 8:
        this.enterOuterAlt(localctx, 8);
        this.state = 806;
        this.assemblySwitch();
        break;

      case 9:
        this.enterOuterAlt(localctx, 9);
        this.state = 807;
        this.assemblyFunctionDefinition();
        break;

      case 10:
        this.enterOuterAlt(localctx, 10);
        this.state = 808;
        this.assemblyFor();
        break;

      case 11:
        this.enterOuterAlt(localctx, 11);
        this.state = 809;
        this.assemblyIf();
        break;

      case 12:
        this.enterOuterAlt(localctx, 12);
        this.state = 810;
        this.match(SolidityParser.BreakKeyword);
        break;

      case 13:
        this.enterOuterAlt(localctx, 13);
        this.state = 811;
        this.match(SolidityParser.ContinueKeyword);
        break;

      case 14:
        this.enterOuterAlt(localctx, 14);
        this.state = 812;
        this.subAssembly();
        break;

      case 15:
        this.enterOuterAlt(localctx, 15);
        this.state = 813;
        this.numberLiteral();
        break;

      case 16:
        this.enterOuterAlt(localctx, 16);
        this.state = 814;
        this.match(SolidityParser.StringLiteral);
        break;

      case 17:
        this.enterOuterAlt(localctx, 17);
        this.state = 815;
        this.match(SolidityParser.HexLiteral);
        break;
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function AssemblyExpressionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_assemblyExpression;
  return this;
}

AssemblyExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssemblyExpressionContext.prototype.constructor = AssemblyExpressionContext;

AssemblyExpressionContext.prototype.assemblyCall = function () {
  return this.getTypedRuleContext(AssemblyCallContext, 0);
};

AssemblyExpressionContext.prototype.assemblyLiteral = function () {
  return this.getTypedRuleContext(AssemblyLiteralContext, 0);
};

AssemblyExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterAssemblyExpression(this);
  }
};

AssemblyExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitAssemblyExpression(this);
  }
};

SolidityParser.AssemblyExpressionContext = AssemblyExpressionContext;

SolidityParser.prototype.assemblyExpression = function () {
  var localctx = new AssemblyExpressionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 128, SolidityParser.RULE_assemblyExpression);

  try {
    this.state = 820;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case SolidityParser.T__12:
      case SolidityParser.T__33:
      case SolidityParser.T__39:
      case SolidityParser.T__45:
      case SolidityParser.T__51:
      case SolidityParser.Identifier:
        this.enterOuterAlt(localctx, 1);
        this.state = 818;
        this.assemblyCall();
        break;

      case SolidityParser.DecimalNumber:
      case SolidityParser.HexNumber:
      case SolidityParser.HexLiteral:
      case SolidityParser.StringLiteral:
        this.enterOuterAlt(localctx, 2);
        this.state = 819;
        this.assemblyLiteral();
        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function AssemblyCallContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_assemblyCall;
  return this;
}

AssemblyCallContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssemblyCallContext.prototype.constructor = AssemblyCallContext;

AssemblyCallContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

AssemblyCallContext.prototype.assemblyExpression = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(AssemblyExpressionContext);
  } else {
    return this.getTypedRuleContext(AssemblyExpressionContext, i);
  }
};

AssemblyCallContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterAssemblyCall(this);
  }
};

AssemblyCallContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitAssemblyCall(this);
  }
};

SolidityParser.AssemblyCallContext = AssemblyCallContext;

SolidityParser.prototype.assemblyCall = function () {
  var localctx = new AssemblyCallContext(this, this._ctx, this.state);
  this.enterRule(localctx, 130, SolidityParser.RULE_assemblyCall);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 826;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case SolidityParser.T__45:
        this.state = 822;
        this.match(SolidityParser.T__45);
        break;

      case SolidityParser.T__33:
        this.state = 823;
        this.match(SolidityParser.T__33);
        break;

      case SolidityParser.T__51:
        this.state = 824;
        this.match(SolidityParser.T__51);
        break;

      case SolidityParser.T__12:
      case SolidityParser.T__39:
      case SolidityParser.Identifier:
        this.state = 825;
        this.identifier();
        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }

    this.state = 840;

    this._errHandler.sync(this);

    var la_ = this._interp.adaptivePredict(this._input, 87, this._ctx);

    if (la_ === 1) {
      this.state = 828;
      this.match(SolidityParser.T__20);
      this.state = 830;

      this._errHandler.sync(this);

      _la = this._input.LA(1);

      if (_la === SolidityParser.T__12 || (_la - 34 & ~0x1f) == 0 && (1 << _la - 34 & (1 << SolidityParser.T__33 - 34 | 1 << SolidityParser.T__39 - 34 | 1 << SolidityParser.T__45 - 34 | 1 << SolidityParser.T__51 - 34)) !== 0 || (_la - 98 & ~0x1f) == 0 && (1 << _la - 98 & (1 << SolidityParser.DecimalNumber - 98 | 1 << SolidityParser.HexNumber - 98 | 1 << SolidityParser.HexLiteral - 98 | 1 << SolidityParser.Identifier - 98 | 1 << SolidityParser.StringLiteral - 98)) !== 0) {
        this.state = 829;
        this.assemblyExpression();
      }

      this.state = 836;

      this._errHandler.sync(this);

      _la = this._input.LA(1);

      while (_la === SolidityParser.T__14) {
        this.state = 832;
        this.match(SolidityParser.T__14);
        this.state = 833;
        this.assemblyExpression();
        this.state = 838;

        this._errHandler.sync(this);

        _la = this._input.LA(1);
      }

      this.state = 839;
      this.match(SolidityParser.T__21);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function AssemblyLocalDefinitionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_assemblyLocalDefinition;
  return this;
}

AssemblyLocalDefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssemblyLocalDefinitionContext.prototype.constructor = AssemblyLocalDefinitionContext;

AssemblyLocalDefinitionContext.prototype.assemblyIdentifierOrList = function () {
  return this.getTypedRuleContext(AssemblyIdentifierOrListContext, 0);
};

AssemblyLocalDefinitionContext.prototype.assemblyExpression = function () {
  return this.getTypedRuleContext(AssemblyExpressionContext, 0);
};

AssemblyLocalDefinitionContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterAssemblyLocalDefinition(this);
  }
};

AssemblyLocalDefinitionContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitAssemblyLocalDefinition(this);
  }
};

SolidityParser.AssemblyLocalDefinitionContext = AssemblyLocalDefinitionContext;

SolidityParser.prototype.assemblyLocalDefinition = function () {
  var localctx = new AssemblyLocalDefinitionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 132, SolidityParser.RULE_assemblyLocalDefinition);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 842;
    this.match(SolidityParser.T__83);
    this.state = 843;
    this.assemblyIdentifierOrList();
    this.state = 846;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__84) {
      this.state = 844;
      this.match(SolidityParser.T__84);
      this.state = 845;
      this.assemblyExpression();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function AssemblyAssignmentContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_assemblyAssignment;
  return this;
}

AssemblyAssignmentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssemblyAssignmentContext.prototype.constructor = AssemblyAssignmentContext;

AssemblyAssignmentContext.prototype.assemblyIdentifierOrList = function () {
  return this.getTypedRuleContext(AssemblyIdentifierOrListContext, 0);
};

AssemblyAssignmentContext.prototype.assemblyExpression = function () {
  return this.getTypedRuleContext(AssemblyExpressionContext, 0);
};

AssemblyAssignmentContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterAssemblyAssignment(this);
  }
};

AssemblyAssignmentContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitAssemblyAssignment(this);
  }
};

SolidityParser.AssemblyAssignmentContext = AssemblyAssignmentContext;

SolidityParser.prototype.assemblyAssignment = function () {
  var localctx = new AssemblyAssignmentContext(this, this._ctx, this.state);
  this.enterRule(localctx, 134, SolidityParser.RULE_assemblyAssignment);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 848;
    this.assemblyIdentifierOrList();
    this.state = 849;
    this.match(SolidityParser.T__84);
    this.state = 850;
    this.assemblyExpression();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function AssemblyIdentifierOrListContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_assemblyIdentifierOrList;
  return this;
}

AssemblyIdentifierOrListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssemblyIdentifierOrListContext.prototype.constructor = AssemblyIdentifierOrListContext;

AssemblyIdentifierOrListContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

AssemblyIdentifierOrListContext.prototype.assemblyIdentifierList = function () {
  return this.getTypedRuleContext(AssemblyIdentifierListContext, 0);
};

AssemblyIdentifierOrListContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterAssemblyIdentifierOrList(this);
  }
};

AssemblyIdentifierOrListContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitAssemblyIdentifierOrList(this);
  }
};

SolidityParser.AssemblyIdentifierOrListContext = AssemblyIdentifierOrListContext;

SolidityParser.prototype.assemblyIdentifierOrList = function () {
  var localctx = new AssemblyIdentifierOrListContext(this, this._ctx, this.state);
  this.enterRule(localctx, 136, SolidityParser.RULE_assemblyIdentifierOrList);

  try {
    this.state = 857;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case SolidityParser.T__12:
      case SolidityParser.T__39:
      case SolidityParser.Identifier:
        this.enterOuterAlt(localctx, 1);
        this.state = 852;
        this.identifier();
        break;

      case SolidityParser.T__20:
        this.enterOuterAlt(localctx, 2);
        this.state = 853;
        this.match(SolidityParser.T__20);
        this.state = 854;
        this.assemblyIdentifierList();
        this.state = 855;
        this.match(SolidityParser.T__21);
        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function AssemblyIdentifierListContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_assemblyIdentifierList;
  return this;
}

AssemblyIdentifierListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssemblyIdentifierListContext.prototype.constructor = AssemblyIdentifierListContext;

AssemblyIdentifierListContext.prototype.identifier = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(IdentifierContext);
  } else {
    return this.getTypedRuleContext(IdentifierContext, i);
  }
};

AssemblyIdentifierListContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterAssemblyIdentifierList(this);
  }
};

AssemblyIdentifierListContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitAssemblyIdentifierList(this);
  }
};

SolidityParser.AssemblyIdentifierListContext = AssemblyIdentifierListContext;

SolidityParser.prototype.assemblyIdentifierList = function () {
  var localctx = new AssemblyIdentifierListContext(this, this._ctx, this.state);
  this.enterRule(localctx, 138, SolidityParser.RULE_assemblyIdentifierList);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 859;
    this.identifier();
    this.state = 864;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    while (_la === SolidityParser.T__14) {
      this.state = 860;
      this.match(SolidityParser.T__14);
      this.state = 861;
      this.identifier();
      this.state = 866;

      this._errHandler.sync(this);

      _la = this._input.LA(1);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function AssemblyStackAssignmentContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_assemblyStackAssignment;
  return this;
}

AssemblyStackAssignmentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssemblyStackAssignmentContext.prototype.constructor = AssemblyStackAssignmentContext;

AssemblyStackAssignmentContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

AssemblyStackAssignmentContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterAssemblyStackAssignment(this);
  }
};

AssemblyStackAssignmentContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitAssemblyStackAssignment(this);
  }
};

SolidityParser.AssemblyStackAssignmentContext = AssemblyStackAssignmentContext;

SolidityParser.prototype.assemblyStackAssignment = function () {
  var localctx = new AssemblyStackAssignmentContext(this, this._ctx, this.state);
  this.enterRule(localctx, 140, SolidityParser.RULE_assemblyStackAssignment);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 867;
    this.match(SolidityParser.T__85);
    this.state = 868;
    this.identifier();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function LabelDefinitionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_labelDefinition;
  return this;
}

LabelDefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LabelDefinitionContext.prototype.constructor = LabelDefinitionContext;

LabelDefinitionContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

LabelDefinitionContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterLabelDefinition(this);
  }
};

LabelDefinitionContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitLabelDefinition(this);
  }
};

SolidityParser.LabelDefinitionContext = LabelDefinitionContext;

SolidityParser.prototype.labelDefinition = function () {
  var localctx = new LabelDefinitionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 142, SolidityParser.RULE_labelDefinition);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 870;
    this.identifier();
    this.state = 871;
    this.match(SolidityParser.T__72);
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function AssemblySwitchContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_assemblySwitch;
  return this;
}

AssemblySwitchContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssemblySwitchContext.prototype.constructor = AssemblySwitchContext;

AssemblySwitchContext.prototype.assemblyExpression = function () {
  return this.getTypedRuleContext(AssemblyExpressionContext, 0);
};

AssemblySwitchContext.prototype.assemblyCase = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(AssemblyCaseContext);
  } else {
    return this.getTypedRuleContext(AssemblyCaseContext, i);
  }
};

AssemblySwitchContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterAssemblySwitch(this);
  }
};

AssemblySwitchContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitAssemblySwitch(this);
  }
};

SolidityParser.AssemblySwitchContext = AssemblySwitchContext;

SolidityParser.prototype.assemblySwitch = function () {
  var localctx = new AssemblySwitchContext(this, this._ctx, this.state);
  this.enterRule(localctx, 144, SolidityParser.RULE_assemblySwitch);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 873;
    this.match(SolidityParser.T__86);
    this.state = 874;
    this.assemblyExpression();
    this.state = 878;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    while (_la === SolidityParser.T__87 || _la === SolidityParser.T__88) {
      this.state = 875;
      this.assemblyCase();
      this.state = 880;

      this._errHandler.sync(this);

      _la = this._input.LA(1);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function AssemblyCaseContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_assemblyCase;
  return this;
}

AssemblyCaseContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssemblyCaseContext.prototype.constructor = AssemblyCaseContext;

AssemblyCaseContext.prototype.assemblyLiteral = function () {
  return this.getTypedRuleContext(AssemblyLiteralContext, 0);
};

AssemblyCaseContext.prototype.assemblyBlock = function () {
  return this.getTypedRuleContext(AssemblyBlockContext, 0);
};

AssemblyCaseContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterAssemblyCase(this);
  }
};

AssemblyCaseContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitAssemblyCase(this);
  }
};

SolidityParser.AssemblyCaseContext = AssemblyCaseContext;

SolidityParser.prototype.assemblyCase = function () {
  var localctx = new AssemblyCaseContext(this, this._ctx, this.state);
  this.enterRule(localctx, 146, SolidityParser.RULE_assemblyCase);

  try {
    this.state = 887;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case SolidityParser.T__87:
        this.enterOuterAlt(localctx, 1);
        this.state = 881;
        this.match(SolidityParser.T__87);
        this.state = 882;
        this.assemblyLiteral();
        this.state = 883;
        this.assemblyBlock();
        break;

      case SolidityParser.T__88:
        this.enterOuterAlt(localctx, 2);
        this.state = 885;
        this.match(SolidityParser.T__88);
        this.state = 886;
        this.assemblyBlock();
        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function AssemblyFunctionDefinitionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_assemblyFunctionDefinition;
  return this;
}

AssemblyFunctionDefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssemblyFunctionDefinitionContext.prototype.constructor = AssemblyFunctionDefinitionContext;

AssemblyFunctionDefinitionContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

AssemblyFunctionDefinitionContext.prototype.assemblyBlock = function () {
  return this.getTypedRuleContext(AssemblyBlockContext, 0);
};

AssemblyFunctionDefinitionContext.prototype.assemblyIdentifierList = function () {
  return this.getTypedRuleContext(AssemblyIdentifierListContext, 0);
};

AssemblyFunctionDefinitionContext.prototype.assemblyFunctionReturns = function () {
  return this.getTypedRuleContext(AssemblyFunctionReturnsContext, 0);
};

AssemblyFunctionDefinitionContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterAssemblyFunctionDefinition(this);
  }
};

AssemblyFunctionDefinitionContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitAssemblyFunctionDefinition(this);
  }
};

SolidityParser.AssemblyFunctionDefinitionContext = AssemblyFunctionDefinitionContext;

SolidityParser.prototype.assemblyFunctionDefinition = function () {
  var localctx = new AssemblyFunctionDefinitionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 148, SolidityParser.RULE_assemblyFunctionDefinition);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 889;
    this.match(SolidityParser.T__27);
    this.state = 890;
    this.identifier();
    this.state = 891;
    this.match(SolidityParser.T__20);
    this.state = 893;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__12 || _la === SolidityParser.T__39 || _la === SolidityParser.Identifier) {
      this.state = 892;
      this.assemblyIdentifierList();
    }

    this.state = 895;
    this.match(SolidityParser.T__21);
    this.state = 897;

    this._errHandler.sync(this);

    _la = this._input.LA(1);

    if (_la === SolidityParser.T__89) {
      this.state = 896;
      this.assemblyFunctionReturns();
    }

    this.state = 899;
    this.assemblyBlock();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function AssemblyFunctionReturnsContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_assemblyFunctionReturns;
  return this;
}

AssemblyFunctionReturnsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssemblyFunctionReturnsContext.prototype.constructor = AssemblyFunctionReturnsContext;

AssemblyFunctionReturnsContext.prototype.assemblyIdentifierList = function () {
  return this.getTypedRuleContext(AssemblyIdentifierListContext, 0);
};

AssemblyFunctionReturnsContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterAssemblyFunctionReturns(this);
  }
};

AssemblyFunctionReturnsContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitAssemblyFunctionReturns(this);
  }
};

SolidityParser.AssemblyFunctionReturnsContext = AssemblyFunctionReturnsContext;

SolidityParser.prototype.assemblyFunctionReturns = function () {
  var localctx = new AssemblyFunctionReturnsContext(this, this._ctx, this.state);
  this.enterRule(localctx, 150, SolidityParser.RULE_assemblyFunctionReturns);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 901;
    this.match(SolidityParser.T__89);
    this.state = 902;
    this.assemblyIdentifierList();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function AssemblyForContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_assemblyFor;
  return this;
}

AssemblyForContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssemblyForContext.prototype.constructor = AssemblyForContext;

AssemblyForContext.prototype.assemblyExpression = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(AssemblyExpressionContext);
  } else {
    return this.getTypedRuleContext(AssemblyExpressionContext, i);
  }
};

AssemblyForContext.prototype.assemblyBlock = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(AssemblyBlockContext);
  } else {
    return this.getTypedRuleContext(AssemblyBlockContext, i);
  }
};

AssemblyForContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterAssemblyFor(this);
  }
};

AssemblyForContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitAssemblyFor(this);
  }
};

SolidityParser.AssemblyForContext = AssemblyForContext;

SolidityParser.prototype.assemblyFor = function () {
  var localctx = new AssemblyForContext(this, this._ctx, this.state);
  this.enterRule(localctx, 152, SolidityParser.RULE_assemblyFor);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 904;
    this.match(SolidityParser.T__23);
    this.state = 907;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case SolidityParser.T__13:
        this.state = 905;
        this.assemblyBlock();
        break;

      case SolidityParser.T__12:
      case SolidityParser.T__33:
      case SolidityParser.T__39:
      case SolidityParser.T__45:
      case SolidityParser.T__51:
      case SolidityParser.DecimalNumber:
      case SolidityParser.HexNumber:
      case SolidityParser.HexLiteral:
      case SolidityParser.Identifier:
      case SolidityParser.StringLiteral:
        this.state = 906;
        this.assemblyExpression();
        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }

    this.state = 909;
    this.assemblyExpression();
    this.state = 912;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case SolidityParser.T__13:
        this.state = 910;
        this.assemblyBlock();
        break;

      case SolidityParser.T__12:
      case SolidityParser.T__33:
      case SolidityParser.T__39:
      case SolidityParser.T__45:
      case SolidityParser.T__51:
      case SolidityParser.DecimalNumber:
      case SolidityParser.HexNumber:
      case SolidityParser.HexLiteral:
      case SolidityParser.Identifier:
      case SolidityParser.StringLiteral:
        this.state = 911;
        this.assemblyExpression();
        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }

    this.state = 914;
    this.assemblyBlock();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function AssemblyIfContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_assemblyIf;
  return this;
}

AssemblyIfContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssemblyIfContext.prototype.constructor = AssemblyIfContext;

AssemblyIfContext.prototype.assemblyExpression = function () {
  return this.getTypedRuleContext(AssemblyExpressionContext, 0);
};

AssemblyIfContext.prototype.assemblyBlock = function () {
  return this.getTypedRuleContext(AssemblyBlockContext, 0);
};

AssemblyIfContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterAssemblyIf(this);
  }
};

AssemblyIfContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitAssemblyIf(this);
  }
};

SolidityParser.AssemblyIfContext = AssemblyIfContext;

SolidityParser.prototype.assemblyIf = function () {
  var localctx = new AssemblyIfContext(this, this._ctx, this.state);
  this.enterRule(localctx, 154, SolidityParser.RULE_assemblyIf);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 916;
    this.match(SolidityParser.T__40);
    this.state = 917;
    this.assemblyExpression();
    this.state = 918;
    this.assemblyBlock();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function AssemblyLiteralContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_assemblyLiteral;
  return this;
}

AssemblyLiteralContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssemblyLiteralContext.prototype.constructor = AssemblyLiteralContext;

AssemblyLiteralContext.prototype.StringLiteral = function () {
  return this.getToken(SolidityParser.StringLiteral, 0);
};

AssemblyLiteralContext.prototype.DecimalNumber = function () {
  return this.getToken(SolidityParser.DecimalNumber, 0);
};

AssemblyLiteralContext.prototype.HexNumber = function () {
  return this.getToken(SolidityParser.HexNumber, 0);
};

AssemblyLiteralContext.prototype.HexLiteral = function () {
  return this.getToken(SolidityParser.HexLiteral, 0);
};

AssemblyLiteralContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterAssemblyLiteral(this);
  }
};

AssemblyLiteralContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitAssemblyLiteral(this);
  }
};

SolidityParser.AssemblyLiteralContext = AssemblyLiteralContext;

SolidityParser.prototype.assemblyLiteral = function () {
  var localctx = new AssemblyLiteralContext(this, this._ctx, this.state);
  this.enterRule(localctx, 156, SolidityParser.RULE_assemblyLiteral);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 920;
    _la = this._input.LA(1);

    if (!((_la - 98 & ~0x1f) == 0 && (1 << _la - 98 & (1 << SolidityParser.DecimalNumber - 98 | 1 << SolidityParser.HexNumber - 98 | 1 << SolidityParser.HexLiteral - 98 | 1 << SolidityParser.StringLiteral - 98)) !== 0)) {
      this._errHandler.recoverInline(this);
    } else {
      this._errHandler.reportMatch(this);

      this.consume();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function SubAssemblyContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_subAssembly;
  return this;
}

SubAssemblyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SubAssemblyContext.prototype.constructor = SubAssemblyContext;

SubAssemblyContext.prototype.identifier = function () {
  return this.getTypedRuleContext(IdentifierContext, 0);
};

SubAssemblyContext.prototype.assemblyBlock = function () {
  return this.getTypedRuleContext(AssemblyBlockContext, 0);
};

SubAssemblyContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterSubAssembly(this);
  }
};

SubAssemblyContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitSubAssembly(this);
  }
};

SolidityParser.SubAssemblyContext = SubAssemblyContext;

SolidityParser.prototype.subAssembly = function () {
  var localctx = new SubAssemblyContext(this, this._ctx, this.state);
  this.enterRule(localctx, 158, SolidityParser.RULE_subAssembly);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 922;
    this.match(SolidityParser.T__43);
    this.state = 923;
    this.identifier();
    this.state = 924;
    this.assemblyBlock();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function TupleExpressionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_tupleExpression;
  return this;
}

TupleExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TupleExpressionContext.prototype.constructor = TupleExpressionContext;

TupleExpressionContext.prototype.expression = function (i) {
  if (i === undefined) {
    i = null;
  }

  if (i === null) {
    return this.getTypedRuleContexts(ExpressionContext);
  } else {
    return this.getTypedRuleContext(ExpressionContext, i);
  }
};

TupleExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterTupleExpression(this);
  }
};

TupleExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitTupleExpression(this);
  }
};

SolidityParser.TupleExpressionContext = TupleExpressionContext;

SolidityParser.prototype.tupleExpression = function () {
  var localctx = new TupleExpressionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 160, SolidityParser.RULE_tupleExpression);
  var _la = 0; // Token type

  try {
    this.state = 952;

    this._errHandler.sync(this);

    switch (this._input.LA(1)) {
      case SolidityParser.T__20:
        this.enterOuterAlt(localctx, 1);
        this.state = 926;
        this.match(SolidityParser.T__20);
        this.state = 928;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if ((_la & ~0x1f) == 0 && (1 << _la & (1 << SolidityParser.T__3 | 1 << SolidityParser.T__12 | 1 << SolidityParser.T__20)) !== 0 || (_la - 32 & ~0x1f) == 0 && (1 << _la - 32 & (1 << SolidityParser.T__31 - 32 | 1 << SolidityParser.T__33 - 32 | 1 << SolidityParser.T__39 - 32 | 1 << SolidityParser.T__48 - 32 | 1 << SolidityParser.T__49 - 32 | 1 << SolidityParser.T__50 - 32 | 1 << SolidityParser.T__51 - 32 | 1 << SolidityParser.T__52 - 32 | 1 << SolidityParser.T__53 - 32 | 1 << SolidityParser.T__54 - 32 | 1 << SolidityParser.T__55 - 32 | 1 << SolidityParser.T__56 - 32 | 1 << SolidityParser.T__57 - 32 | 1 << SolidityParser.T__58 - 32 | 1 << SolidityParser.T__59 - 32)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91 | 1 << SolidityParser.BooleanLiteral - 91 | 1 << SolidityParser.DecimalNumber - 91 | 1 << SolidityParser.HexNumber - 91 | 1 << SolidityParser.HexLiteral - 91 | 1 << SolidityParser.Identifier - 91 | 1 << SolidityParser.StringLiteral - 91)) !== 0) {
          this.state = 927;
          this.expression(0);
        }

        this.state = 936;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        while (_la === SolidityParser.T__14) {
          this.state = 930;
          this.match(SolidityParser.T__14);
          this.state = 932;

          this._errHandler.sync(this);

          _la = this._input.LA(1);

          if ((_la & ~0x1f) == 0 && (1 << _la & (1 << SolidityParser.T__3 | 1 << SolidityParser.T__12 | 1 << SolidityParser.T__20)) !== 0 || (_la - 32 & ~0x1f) == 0 && (1 << _la - 32 & (1 << SolidityParser.T__31 - 32 | 1 << SolidityParser.T__33 - 32 | 1 << SolidityParser.T__39 - 32 | 1 << SolidityParser.T__48 - 32 | 1 << SolidityParser.T__49 - 32 | 1 << SolidityParser.T__50 - 32 | 1 << SolidityParser.T__51 - 32 | 1 << SolidityParser.T__52 - 32 | 1 << SolidityParser.T__53 - 32 | 1 << SolidityParser.T__54 - 32 | 1 << SolidityParser.T__55 - 32 | 1 << SolidityParser.T__56 - 32 | 1 << SolidityParser.T__57 - 32 | 1 << SolidityParser.T__58 - 32 | 1 << SolidityParser.T__59 - 32)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91 | 1 << SolidityParser.BooleanLiteral - 91 | 1 << SolidityParser.DecimalNumber - 91 | 1 << SolidityParser.HexNumber - 91 | 1 << SolidityParser.HexLiteral - 91 | 1 << SolidityParser.Identifier - 91 | 1 << SolidityParser.StringLiteral - 91)) !== 0) {
            this.state = 931;
            this.expression(0);
          }

          this.state = 938;

          this._errHandler.sync(this);

          _la = this._input.LA(1);
        }

        this.state = 939;
        this.match(SolidityParser.T__21);
        break;

      case SolidityParser.T__31:
        this.enterOuterAlt(localctx, 2);
        this.state = 940;
        this.match(SolidityParser.T__31);
        this.state = 949;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if ((_la & ~0x1f) == 0 && (1 << _la & (1 << SolidityParser.T__3 | 1 << SolidityParser.T__12 | 1 << SolidityParser.T__20)) !== 0 || (_la - 32 & ~0x1f) == 0 && (1 << _la - 32 & (1 << SolidityParser.T__31 - 32 | 1 << SolidityParser.T__33 - 32 | 1 << SolidityParser.T__39 - 32 | 1 << SolidityParser.T__48 - 32 | 1 << SolidityParser.T__49 - 32 | 1 << SolidityParser.T__50 - 32 | 1 << SolidityParser.T__51 - 32 | 1 << SolidityParser.T__52 - 32 | 1 << SolidityParser.T__53 - 32 | 1 << SolidityParser.T__54 - 32 | 1 << SolidityParser.T__55 - 32 | 1 << SolidityParser.T__56 - 32 | 1 << SolidityParser.T__57 - 32 | 1 << SolidityParser.T__58 - 32 | 1 << SolidityParser.T__59 - 32)) !== 0 || (_la - 91 & ~0x1f) == 0 && (1 << _la - 91 & (1 << SolidityParser.Int - 91 | 1 << SolidityParser.Uint - 91 | 1 << SolidityParser.Byte - 91 | 1 << SolidityParser.Fixed - 91 | 1 << SolidityParser.Ufixed - 91 | 1 << SolidityParser.BooleanLiteral - 91 | 1 << SolidityParser.DecimalNumber - 91 | 1 << SolidityParser.HexNumber - 91 | 1 << SolidityParser.HexLiteral - 91 | 1 << SolidityParser.Identifier - 91 | 1 << SolidityParser.StringLiteral - 91)) !== 0) {
          this.state = 941;
          this.expression(0);
          this.state = 946;

          this._errHandler.sync(this);

          _la = this._input.LA(1);

          while (_la === SolidityParser.T__14) {
            this.state = 942;
            this.match(SolidityParser.T__14);
            this.state = 943;
            this.expression(0);
            this.state = 948;

            this._errHandler.sync(this);

            _la = this._input.LA(1);
          }
        }

        this.state = 951;
        this.match(SolidityParser.T__32);
        break;

      default:
        throw new antlr4.error.NoViableAltException(this);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function ElementaryTypeNameExpressionContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_elementaryTypeNameExpression;
  return this;
}

ElementaryTypeNameExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ElementaryTypeNameExpressionContext.prototype.constructor = ElementaryTypeNameExpressionContext;

ElementaryTypeNameExpressionContext.prototype.elementaryTypeName = function () {
  return this.getTypedRuleContext(ElementaryTypeNameContext, 0);
};

ElementaryTypeNameExpressionContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterElementaryTypeNameExpression(this);
  }
};

ElementaryTypeNameExpressionContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitElementaryTypeNameExpression(this);
  }
};

SolidityParser.ElementaryTypeNameExpressionContext = ElementaryTypeNameExpressionContext;

SolidityParser.prototype.elementaryTypeNameExpression = function () {
  var localctx = new ElementaryTypeNameExpressionContext(this, this._ctx, this.state);
  this.enterRule(localctx, 162, SolidityParser.RULE_elementaryTypeNameExpression);

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 954;
    this.elementaryTypeName();
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function NumberLiteralContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_numberLiteral;
  return this;
}

NumberLiteralContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NumberLiteralContext.prototype.constructor = NumberLiteralContext;

NumberLiteralContext.prototype.DecimalNumber = function () {
  return this.getToken(SolidityParser.DecimalNumber, 0);
};

NumberLiteralContext.prototype.HexNumber = function () {
  return this.getToken(SolidityParser.HexNumber, 0);
};

NumberLiteralContext.prototype.NumberUnit = function () {
  return this.getToken(SolidityParser.NumberUnit, 0);
};

NumberLiteralContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterNumberLiteral(this);
  }
};

NumberLiteralContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitNumberLiteral(this);
  }
};

SolidityParser.NumberLiteralContext = NumberLiteralContext;

SolidityParser.prototype.numberLiteral = function () {
  var localctx = new NumberLiteralContext(this, this._ctx, this.state);
  this.enterRule(localctx, 164, SolidityParser.RULE_numberLiteral);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 956;
    _la = this._input.LA(1);

    if (!(_la === SolidityParser.DecimalNumber || _la === SolidityParser.HexNumber)) {
      this._errHandler.recoverInline(this);
    } else {
      this._errHandler.reportMatch(this);

      this.consume();
    }

    this.state = 958;

    this._errHandler.sync(this);

    var la_ = this._interp.adaptivePredict(this._input, 103, this._ctx);

    if (la_ === 1) {
      this.state = 957;
      this.match(SolidityParser.NumberUnit);
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

function IdentifierContext(parser, parent, invokingState) {
  if (parent === undefined) {
    parent = null;
  }

  if (invokingState === undefined || invokingState === null) {
    invokingState = -1;
  }

  antlr4.ParserRuleContext.call(this, parent, invokingState);
  this.parser = parser;
  this.ruleIndex = SolidityParser.RULE_identifier;
  return this;
}

IdentifierContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IdentifierContext.prototype.constructor = IdentifierContext;

IdentifierContext.prototype.Identifier = function () {
  return this.getToken(SolidityParser.Identifier, 0);
};

IdentifierContext.prototype.enterRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.enterIdentifier(this);
  }
};

IdentifierContext.prototype.exitRule = function (listener) {
  if (listener instanceof SolidityListener) {
    listener.exitIdentifier(this);
  }
};

SolidityParser.IdentifierContext = IdentifierContext;

SolidityParser.prototype.identifier = function () {
  var localctx = new IdentifierContext(this, this._ctx, this.state);
  this.enterRule(localctx, 166, SolidityParser.RULE_identifier);
  var _la = 0; // Token type

  try {
    this.enterOuterAlt(localctx, 1);
    this.state = 960;
    _la = this._input.LA(1);

    if (!(_la === SolidityParser.T__12 || _la === SolidityParser.T__39 || _la === SolidityParser.Identifier)) {
      this._errHandler.recoverInline(this);
    } else {
      this._errHandler.reportMatch(this);

      this.consume();
    }
  } catch (re) {
    if (re instanceof antlr4.error.RecognitionException) {
      localctx.exception = re;

      this._errHandler.reportError(this, re);

      this._errHandler.recover(this, re);
    } else {
      throw re;
    }
  } finally {
    this.exitRule();
  }

  return localctx;
};

SolidityParser.prototype.sempred = function (localctx, ruleIndex, predIndex) {
  switch (ruleIndex) {
    case 31:
      return this.typeName_sempred(localctx, predIndex);

    case 55:
      return this.expression_sempred(localctx, predIndex);

    default:
      throw "No predicate with index:" + ruleIndex;
  }
};

SolidityParser.prototype.typeName_sempred = function (localctx, predIndex) {
  switch (predIndex) {
    case 0:
      return this.precpred(this._ctx, 3);

    default:
      throw "No predicate with index:" + predIndex;
  }
};

SolidityParser.prototype.expression_sempred = function (localctx, predIndex) {
  switch (predIndex) {
    case 1:
      return this.precpred(this._ctx, 14);

    case 2:
      return this.precpred(this._ctx, 13);

    case 3:
      return this.precpred(this._ctx, 12);

    case 4:
      return this.precpred(this._ctx, 11);

    case 5:
      return this.precpred(this._ctx, 10);

    case 6:
      return this.precpred(this._ctx, 9);

    case 7:
      return this.precpred(this._ctx, 8);

    case 8:
      return this.precpred(this._ctx, 7);

    case 9:
      return this.precpred(this._ctx, 6);

    case 10:
      return this.precpred(this._ctx, 5);

    case 11:
      return this.precpred(this._ctx, 4);

    case 12:
      return this.precpred(this._ctx, 3);

    case 13:
      return this.precpred(this._ctx, 2);

    case 14:
      return this.precpred(this._ctx, 25);

    case 15:
      return this.precpred(this._ctx, 23);

    case 16:
      return this.precpred(this._ctx, 22);

    case 17:
      return this.precpred(this._ctx, 21);

    default:
      throw "No predicate with index:" + predIndex;
  }
};

exports.SolidityParser = SolidityParser;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Generated from solidity-antlr4/Solidity.g4 by ANTLR 4.7.2
// jshint ignore: start

var antlr4 = __webpack_require__(13); // This class defines a complete listener for a parse tree produced by SolidityParser.


function SolidityListener() {
  antlr4.tree.ParseTreeListener.call(this);
  return this;
}

SolidityListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
SolidityListener.prototype.constructor = SolidityListener; // Enter a parse tree produced by SolidityParser#sourceUnit.

SolidityListener.prototype.enterSourceUnit = function (ctx) {}; // Exit a parse tree produced by SolidityParser#sourceUnit.


SolidityListener.prototype.exitSourceUnit = function (ctx) {}; // Enter a parse tree produced by SolidityParser#pragmaDirective.


SolidityListener.prototype.enterPragmaDirective = function (ctx) {}; // Exit a parse tree produced by SolidityParser#pragmaDirective.


SolidityListener.prototype.exitPragmaDirective = function (ctx) {}; // Enter a parse tree produced by SolidityParser#pragmaName.


SolidityListener.prototype.enterPragmaName = function (ctx) {}; // Exit a parse tree produced by SolidityParser#pragmaName.


SolidityListener.prototype.exitPragmaName = function (ctx) {}; // Enter a parse tree produced by SolidityParser#pragmaValue.


SolidityListener.prototype.enterPragmaValue = function (ctx) {}; // Exit a parse tree produced by SolidityParser#pragmaValue.


SolidityListener.prototype.exitPragmaValue = function (ctx) {}; // Enter a parse tree produced by SolidityParser#version.


SolidityListener.prototype.enterVersion = function (ctx) {}; // Exit a parse tree produced by SolidityParser#version.


SolidityListener.prototype.exitVersion = function (ctx) {}; // Enter a parse tree produced by SolidityParser#versionOperator.


SolidityListener.prototype.enterVersionOperator = function (ctx) {}; // Exit a parse tree produced by SolidityParser#versionOperator.


SolidityListener.prototype.exitVersionOperator = function (ctx) {}; // Enter a parse tree produced by SolidityParser#versionConstraint.


SolidityListener.prototype.enterVersionConstraint = function (ctx) {}; // Exit a parse tree produced by SolidityParser#versionConstraint.


SolidityListener.prototype.exitVersionConstraint = function (ctx) {}; // Enter a parse tree produced by SolidityParser#importDeclaration.


SolidityListener.prototype.enterImportDeclaration = function (ctx) {}; // Exit a parse tree produced by SolidityParser#importDeclaration.


SolidityListener.prototype.exitImportDeclaration = function (ctx) {}; // Enter a parse tree produced by SolidityParser#importDirective.


SolidityListener.prototype.enterImportDirective = function (ctx) {}; // Exit a parse tree produced by SolidityParser#importDirective.


SolidityListener.prototype.exitImportDirective = function (ctx) {}; // Enter a parse tree produced by SolidityParser#contractDefinition.


SolidityListener.prototype.enterContractDefinition = function (ctx) {}; // Exit a parse tree produced by SolidityParser#contractDefinition.


SolidityListener.prototype.exitContractDefinition = function (ctx) {}; // Enter a parse tree produced by SolidityParser#inheritanceSpecifier.


SolidityListener.prototype.enterInheritanceSpecifier = function (ctx) {}; // Exit a parse tree produced by SolidityParser#inheritanceSpecifier.


SolidityListener.prototype.exitInheritanceSpecifier = function (ctx) {}; // Enter a parse tree produced by SolidityParser#contractPart.


SolidityListener.prototype.enterContractPart = function (ctx) {}; // Exit a parse tree produced by SolidityParser#contractPart.


SolidityListener.prototype.exitContractPart = function (ctx) {}; // Enter a parse tree produced by SolidityParser#stateVariableDeclaration.


SolidityListener.prototype.enterStateVariableDeclaration = function (ctx) {}; // Exit a parse tree produced by SolidityParser#stateVariableDeclaration.


SolidityListener.prototype.exitStateVariableDeclaration = function (ctx) {}; // Enter a parse tree produced by SolidityParser#usingForDeclaration.


SolidityListener.prototype.enterUsingForDeclaration = function (ctx) {}; // Exit a parse tree produced by SolidityParser#usingForDeclaration.


SolidityListener.prototype.exitUsingForDeclaration = function (ctx) {}; // Enter a parse tree produced by SolidityParser#structDefinition.


SolidityListener.prototype.enterStructDefinition = function (ctx) {}; // Exit a parse tree produced by SolidityParser#structDefinition.


SolidityListener.prototype.exitStructDefinition = function (ctx) {}; // Enter a parse tree produced by SolidityParser#constructorDefinition.


SolidityListener.prototype.enterConstructorDefinition = function (ctx) {}; // Exit a parse tree produced by SolidityParser#constructorDefinition.


SolidityListener.prototype.exitConstructorDefinition = function (ctx) {}; // Enter a parse tree produced by SolidityParser#modifierDefinition.


SolidityListener.prototype.enterModifierDefinition = function (ctx) {}; // Exit a parse tree produced by SolidityParser#modifierDefinition.


SolidityListener.prototype.exitModifierDefinition = function (ctx) {}; // Enter a parse tree produced by SolidityParser#modifierInvocation.


SolidityListener.prototype.enterModifierInvocation = function (ctx) {}; // Exit a parse tree produced by SolidityParser#modifierInvocation.


SolidityListener.prototype.exitModifierInvocation = function (ctx) {}; // Enter a parse tree produced by SolidityParser#functionDefinition.


SolidityListener.prototype.enterFunctionDefinition = function (ctx) {}; // Exit a parse tree produced by SolidityParser#functionDefinition.


SolidityListener.prototype.exitFunctionDefinition = function (ctx) {}; // Enter a parse tree produced by SolidityParser#returnParameters.


SolidityListener.prototype.enterReturnParameters = function (ctx) {}; // Exit a parse tree produced by SolidityParser#returnParameters.


SolidityListener.prototype.exitReturnParameters = function (ctx) {}; // Enter a parse tree produced by SolidityParser#modifierList.


SolidityListener.prototype.enterModifierList = function (ctx) {}; // Exit a parse tree produced by SolidityParser#modifierList.


SolidityListener.prototype.exitModifierList = function (ctx) {}; // Enter a parse tree produced by SolidityParser#eventDefinition.


SolidityListener.prototype.enterEventDefinition = function (ctx) {}; // Exit a parse tree produced by SolidityParser#eventDefinition.


SolidityListener.prototype.exitEventDefinition = function (ctx) {}; // Enter a parse tree produced by SolidityParser#enumValue.


SolidityListener.prototype.enterEnumValue = function (ctx) {}; // Exit a parse tree produced by SolidityParser#enumValue.


SolidityListener.prototype.exitEnumValue = function (ctx) {}; // Enter a parse tree produced by SolidityParser#enumDefinition.


SolidityListener.prototype.enterEnumDefinition = function (ctx) {}; // Exit a parse tree produced by SolidityParser#enumDefinition.


SolidityListener.prototype.exitEnumDefinition = function (ctx) {}; // Enter a parse tree produced by SolidityParser#parameterList.


SolidityListener.prototype.enterParameterList = function (ctx) {}; // Exit a parse tree produced by SolidityParser#parameterList.


SolidityListener.prototype.exitParameterList = function (ctx) {}; // Enter a parse tree produced by SolidityParser#parameter.


SolidityListener.prototype.enterParameter = function (ctx) {}; // Exit a parse tree produced by SolidityParser#parameter.


SolidityListener.prototype.exitParameter = function (ctx) {}; // Enter a parse tree produced by SolidityParser#eventParameterList.


SolidityListener.prototype.enterEventParameterList = function (ctx) {}; // Exit a parse tree produced by SolidityParser#eventParameterList.


SolidityListener.prototype.exitEventParameterList = function (ctx) {}; // Enter a parse tree produced by SolidityParser#eventParameter.


SolidityListener.prototype.enterEventParameter = function (ctx) {}; // Exit a parse tree produced by SolidityParser#eventParameter.


SolidityListener.prototype.exitEventParameter = function (ctx) {}; // Enter a parse tree produced by SolidityParser#functionTypeParameterList.


SolidityListener.prototype.enterFunctionTypeParameterList = function (ctx) {}; // Exit a parse tree produced by SolidityParser#functionTypeParameterList.


SolidityListener.prototype.exitFunctionTypeParameterList = function (ctx) {}; // Enter a parse tree produced by SolidityParser#functionTypeParameter.


SolidityListener.prototype.enterFunctionTypeParameter = function (ctx) {}; // Exit a parse tree produced by SolidityParser#functionTypeParameter.


SolidityListener.prototype.exitFunctionTypeParameter = function (ctx) {}; // Enter a parse tree produced by SolidityParser#variableDeclaration.


SolidityListener.prototype.enterVariableDeclaration = function (ctx) {}; // Exit a parse tree produced by SolidityParser#variableDeclaration.


SolidityListener.prototype.exitVariableDeclaration = function (ctx) {}; // Enter a parse tree produced by SolidityParser#typeName.


SolidityListener.prototype.enterTypeName = function (ctx) {}; // Exit a parse tree produced by SolidityParser#typeName.


SolidityListener.prototype.exitTypeName = function (ctx) {}; // Enter a parse tree produced by SolidityParser#userDefinedTypeName.


SolidityListener.prototype.enterUserDefinedTypeName = function (ctx) {}; // Exit a parse tree produced by SolidityParser#userDefinedTypeName.


SolidityListener.prototype.exitUserDefinedTypeName = function (ctx) {}; // Enter a parse tree produced by SolidityParser#mapping.


SolidityListener.prototype.enterMapping = function (ctx) {}; // Exit a parse tree produced by SolidityParser#mapping.


SolidityListener.prototype.exitMapping = function (ctx) {}; // Enter a parse tree produced by SolidityParser#functionTypeName.


SolidityListener.prototype.enterFunctionTypeName = function (ctx) {}; // Exit a parse tree produced by SolidityParser#functionTypeName.


SolidityListener.prototype.exitFunctionTypeName = function (ctx) {}; // Enter a parse tree produced by SolidityParser#storageLocation.


SolidityListener.prototype.enterStorageLocation = function (ctx) {}; // Exit a parse tree produced by SolidityParser#storageLocation.


SolidityListener.prototype.exitStorageLocation = function (ctx) {}; // Enter a parse tree produced by SolidityParser#stateMutability.


SolidityListener.prototype.enterStateMutability = function (ctx) {}; // Exit a parse tree produced by SolidityParser#stateMutability.


SolidityListener.prototype.exitStateMutability = function (ctx) {}; // Enter a parse tree produced by SolidityParser#block.


SolidityListener.prototype.enterBlock = function (ctx) {}; // Exit a parse tree produced by SolidityParser#block.


SolidityListener.prototype.exitBlock = function (ctx) {}; // Enter a parse tree produced by SolidityParser#statement.


SolidityListener.prototype.enterStatement = function (ctx) {}; // Exit a parse tree produced by SolidityParser#statement.


SolidityListener.prototype.exitStatement = function (ctx) {}; // Enter a parse tree produced by SolidityParser#expressionStatement.


SolidityListener.prototype.enterExpressionStatement = function (ctx) {}; // Exit a parse tree produced by SolidityParser#expressionStatement.


SolidityListener.prototype.exitExpressionStatement = function (ctx) {}; // Enter a parse tree produced by SolidityParser#ifStatement.


SolidityListener.prototype.enterIfStatement = function (ctx) {}; // Exit a parse tree produced by SolidityParser#ifStatement.


SolidityListener.prototype.exitIfStatement = function (ctx) {}; // Enter a parse tree produced by SolidityParser#whileStatement.


SolidityListener.prototype.enterWhileStatement = function (ctx) {}; // Exit a parse tree produced by SolidityParser#whileStatement.


SolidityListener.prototype.exitWhileStatement = function (ctx) {}; // Enter a parse tree produced by SolidityParser#simpleStatement.


SolidityListener.prototype.enterSimpleStatement = function (ctx) {}; // Exit a parse tree produced by SolidityParser#simpleStatement.


SolidityListener.prototype.exitSimpleStatement = function (ctx) {}; // Enter a parse tree produced by SolidityParser#forStatement.


SolidityListener.prototype.enterForStatement = function (ctx) {}; // Exit a parse tree produced by SolidityParser#forStatement.


SolidityListener.prototype.exitForStatement = function (ctx) {}; // Enter a parse tree produced by SolidityParser#inlineAssemblyStatement.


SolidityListener.prototype.enterInlineAssemblyStatement = function (ctx) {}; // Exit a parse tree produced by SolidityParser#inlineAssemblyStatement.


SolidityListener.prototype.exitInlineAssemblyStatement = function (ctx) {}; // Enter a parse tree produced by SolidityParser#doWhileStatement.


SolidityListener.prototype.enterDoWhileStatement = function (ctx) {}; // Exit a parse tree produced by SolidityParser#doWhileStatement.


SolidityListener.prototype.exitDoWhileStatement = function (ctx) {}; // Enter a parse tree produced by SolidityParser#continueStatement.


SolidityListener.prototype.enterContinueStatement = function (ctx) {}; // Exit a parse tree produced by SolidityParser#continueStatement.


SolidityListener.prototype.exitContinueStatement = function (ctx) {}; // Enter a parse tree produced by SolidityParser#breakStatement.


SolidityListener.prototype.enterBreakStatement = function (ctx) {}; // Exit a parse tree produced by SolidityParser#breakStatement.


SolidityListener.prototype.exitBreakStatement = function (ctx) {}; // Enter a parse tree produced by SolidityParser#returnStatement.


SolidityListener.prototype.enterReturnStatement = function (ctx) {}; // Exit a parse tree produced by SolidityParser#returnStatement.


SolidityListener.prototype.exitReturnStatement = function (ctx) {}; // Enter a parse tree produced by SolidityParser#throwStatement.


SolidityListener.prototype.enterThrowStatement = function (ctx) {}; // Exit a parse tree produced by SolidityParser#throwStatement.


SolidityListener.prototype.exitThrowStatement = function (ctx) {}; // Enter a parse tree produced by SolidityParser#emitStatement.


SolidityListener.prototype.enterEmitStatement = function (ctx) {}; // Exit a parse tree produced by SolidityParser#emitStatement.


SolidityListener.prototype.exitEmitStatement = function (ctx) {}; // Enter a parse tree produced by SolidityParser#variableDeclarationStatement.


SolidityListener.prototype.enterVariableDeclarationStatement = function (ctx) {}; // Exit a parse tree produced by SolidityParser#variableDeclarationStatement.


SolidityListener.prototype.exitVariableDeclarationStatement = function (ctx) {}; // Enter a parse tree produced by SolidityParser#variableDeclarationList.


SolidityListener.prototype.enterVariableDeclarationList = function (ctx) {}; // Exit a parse tree produced by SolidityParser#variableDeclarationList.


SolidityListener.prototype.exitVariableDeclarationList = function (ctx) {}; // Enter a parse tree produced by SolidityParser#identifierList.


SolidityListener.prototype.enterIdentifierList = function (ctx) {}; // Exit a parse tree produced by SolidityParser#identifierList.


SolidityListener.prototype.exitIdentifierList = function (ctx) {}; // Enter a parse tree produced by SolidityParser#elementaryTypeName.


SolidityListener.prototype.enterElementaryTypeName = function (ctx) {}; // Exit a parse tree produced by SolidityParser#elementaryTypeName.


SolidityListener.prototype.exitElementaryTypeName = function (ctx) {}; // Enter a parse tree produced by SolidityParser#expression.


SolidityListener.prototype.enterExpression = function (ctx) {}; // Exit a parse tree produced by SolidityParser#expression.


SolidityListener.prototype.exitExpression = function (ctx) {}; // Enter a parse tree produced by SolidityParser#primaryExpression.


SolidityListener.prototype.enterPrimaryExpression = function (ctx) {}; // Exit a parse tree produced by SolidityParser#primaryExpression.


SolidityListener.prototype.exitPrimaryExpression = function (ctx) {}; // Enter a parse tree produced by SolidityParser#expressionList.


SolidityListener.prototype.enterExpressionList = function (ctx) {}; // Exit a parse tree produced by SolidityParser#expressionList.


SolidityListener.prototype.exitExpressionList = function (ctx) {}; // Enter a parse tree produced by SolidityParser#nameValueList.


SolidityListener.prototype.enterNameValueList = function (ctx) {}; // Exit a parse tree produced by SolidityParser#nameValueList.


SolidityListener.prototype.exitNameValueList = function (ctx) {}; // Enter a parse tree produced by SolidityParser#nameValue.


SolidityListener.prototype.enterNameValue = function (ctx) {}; // Exit a parse tree produced by SolidityParser#nameValue.


SolidityListener.prototype.exitNameValue = function (ctx) {}; // Enter a parse tree produced by SolidityParser#functionCallArguments.


SolidityListener.prototype.enterFunctionCallArguments = function (ctx) {}; // Exit a parse tree produced by SolidityParser#functionCallArguments.


SolidityListener.prototype.exitFunctionCallArguments = function (ctx) {}; // Enter a parse tree produced by SolidityParser#functionCall.


SolidityListener.prototype.enterFunctionCall = function (ctx) {}; // Exit a parse tree produced by SolidityParser#functionCall.


SolidityListener.prototype.exitFunctionCall = function (ctx) {}; // Enter a parse tree produced by SolidityParser#assemblyBlock.


SolidityListener.prototype.enterAssemblyBlock = function (ctx) {}; // Exit a parse tree produced by SolidityParser#assemblyBlock.


SolidityListener.prototype.exitAssemblyBlock = function (ctx) {}; // Enter a parse tree produced by SolidityParser#assemblyItem.


SolidityListener.prototype.enterAssemblyItem = function (ctx) {}; // Exit a parse tree produced by SolidityParser#assemblyItem.


SolidityListener.prototype.exitAssemblyItem = function (ctx) {}; // Enter a parse tree produced by SolidityParser#assemblyExpression.


SolidityListener.prototype.enterAssemblyExpression = function (ctx) {}; // Exit a parse tree produced by SolidityParser#assemblyExpression.


SolidityListener.prototype.exitAssemblyExpression = function (ctx) {}; // Enter a parse tree produced by SolidityParser#assemblyCall.


SolidityListener.prototype.enterAssemblyCall = function (ctx) {}; // Exit a parse tree produced by SolidityParser#assemblyCall.


SolidityListener.prototype.exitAssemblyCall = function (ctx) {}; // Enter a parse tree produced by SolidityParser#assemblyLocalDefinition.


SolidityListener.prototype.enterAssemblyLocalDefinition = function (ctx) {}; // Exit a parse tree produced by SolidityParser#assemblyLocalDefinition.


SolidityListener.prototype.exitAssemblyLocalDefinition = function (ctx) {}; // Enter a parse tree produced by SolidityParser#assemblyAssignment.


SolidityListener.prototype.enterAssemblyAssignment = function (ctx) {}; // Exit a parse tree produced by SolidityParser#assemblyAssignment.


SolidityListener.prototype.exitAssemblyAssignment = function (ctx) {}; // Enter a parse tree produced by SolidityParser#assemblyIdentifierOrList.


SolidityListener.prototype.enterAssemblyIdentifierOrList = function (ctx) {}; // Exit a parse tree produced by SolidityParser#assemblyIdentifierOrList.


SolidityListener.prototype.exitAssemblyIdentifierOrList = function (ctx) {}; // Enter a parse tree produced by SolidityParser#assemblyIdentifierList.


SolidityListener.prototype.enterAssemblyIdentifierList = function (ctx) {}; // Exit a parse tree produced by SolidityParser#assemblyIdentifierList.


SolidityListener.prototype.exitAssemblyIdentifierList = function (ctx) {}; // Enter a parse tree produced by SolidityParser#assemblyStackAssignment.


SolidityListener.prototype.enterAssemblyStackAssignment = function (ctx) {}; // Exit a parse tree produced by SolidityParser#assemblyStackAssignment.


SolidityListener.prototype.exitAssemblyStackAssignment = function (ctx) {}; // Enter a parse tree produced by SolidityParser#labelDefinition.


SolidityListener.prototype.enterLabelDefinition = function (ctx) {}; // Exit a parse tree produced by SolidityParser#labelDefinition.


SolidityListener.prototype.exitLabelDefinition = function (ctx) {}; // Enter a parse tree produced by SolidityParser#assemblySwitch.


SolidityListener.prototype.enterAssemblySwitch = function (ctx) {}; // Exit a parse tree produced by SolidityParser#assemblySwitch.


SolidityListener.prototype.exitAssemblySwitch = function (ctx) {}; // Enter a parse tree produced by SolidityParser#assemblyCase.


SolidityListener.prototype.enterAssemblyCase = function (ctx) {}; // Exit a parse tree produced by SolidityParser#assemblyCase.


SolidityListener.prototype.exitAssemblyCase = function (ctx) {}; // Enter a parse tree produced by SolidityParser#assemblyFunctionDefinition.


SolidityListener.prototype.enterAssemblyFunctionDefinition = function (ctx) {}; // Exit a parse tree produced by SolidityParser#assemblyFunctionDefinition.


SolidityListener.prototype.exitAssemblyFunctionDefinition = function (ctx) {}; // Enter a parse tree produced by SolidityParser#assemblyFunctionReturns.


SolidityListener.prototype.enterAssemblyFunctionReturns = function (ctx) {}; // Exit a parse tree produced by SolidityParser#assemblyFunctionReturns.


SolidityListener.prototype.exitAssemblyFunctionReturns = function (ctx) {}; // Enter a parse tree produced by SolidityParser#assemblyFor.


SolidityListener.prototype.enterAssemblyFor = function (ctx) {}; // Exit a parse tree produced by SolidityParser#assemblyFor.


SolidityListener.prototype.exitAssemblyFor = function (ctx) {}; // Enter a parse tree produced by SolidityParser#assemblyIf.


SolidityListener.prototype.enterAssemblyIf = function (ctx) {}; // Exit a parse tree produced by SolidityParser#assemblyIf.


SolidityListener.prototype.exitAssemblyIf = function (ctx) {}; // Enter a parse tree produced by SolidityParser#assemblyLiteral.


SolidityListener.prototype.enterAssemblyLiteral = function (ctx) {}; // Exit a parse tree produced by SolidityParser#assemblyLiteral.


SolidityListener.prototype.exitAssemblyLiteral = function (ctx) {}; // Enter a parse tree produced by SolidityParser#subAssembly.


SolidityListener.prototype.enterSubAssembly = function (ctx) {}; // Exit a parse tree produced by SolidityParser#subAssembly.


SolidityListener.prototype.exitSubAssembly = function (ctx) {}; // Enter a parse tree produced by SolidityParser#tupleExpression.


SolidityListener.prototype.enterTupleExpression = function (ctx) {}; // Exit a parse tree produced by SolidityParser#tupleExpression.


SolidityListener.prototype.exitTupleExpression = function (ctx) {}; // Enter a parse tree produced by SolidityParser#elementaryTypeNameExpression.


SolidityListener.prototype.enterElementaryTypeNameExpression = function (ctx) {}; // Exit a parse tree produced by SolidityParser#elementaryTypeNameExpression.


SolidityListener.prototype.exitElementaryTypeNameExpression = function (ctx) {}; // Enter a parse tree produced by SolidityParser#numberLiteral.


SolidityListener.prototype.enterNumberLiteral = function (ctx) {}; // Exit a parse tree produced by SolidityParser#numberLiteral.


SolidityListener.prototype.exitNumberLiteral = function (ctx) {}; // Enter a parse tree produced by SolidityParser#identifier.


SolidityListener.prototype.enterIdentifier = function (ctx) {}; // Exit a parse tree produced by SolidityParser#identifier.


SolidityListener.prototype.exitIdentifier = function (ctx) {};

exports.SolidityListener = SolidityListener;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var antlr4 = __webpack_require__(13);

function toText(ctx) {
  if (ctx !== null) {
    return ctx.getText();
  }

  return null;
}

function mapCommasToNulls(children) {
  if (children.length === 0) {
    return [];
  }

  var values = [];
  var comma = true;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var el = _step.value;

      if (comma) {
        if (toText(el) === ',') {
          values.push(null);
        } else {
          values.push(el);
          comma = false;
        }
      } else {
        if (toText(el) !== ',') {
          throw new Error('expected comma');
        }

        comma = true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (comma) {
    values.push(null);
  }

  return values;
}

function isBinOp(op) {
  var binOps = ['+', '-', '*', '/', '**', '%', '<<', '>>', '&&', '||', '&', '|', '^', '<', '>', '<=', '>=', '==', '!=', '=', '|=', '^=', '&=', '<<=', '>>=', '+=', '-=', '*=', '/=', '%='];
  return binOps.includes(op);
}

var transformAST = {
  SourceUnit: function SourceUnit(ctx) {
    // last element is EOF terminal node
    return {
      children: this.visit(ctx.children.slice(0, -1))
    };
  },
  EnumDefinition: function EnumDefinition(ctx) {
    return {
      name: toText(ctx.identifier()),
      members: this.visit(ctx.enumValue())
    };
  },
  EnumValue: function EnumValue(ctx) {
    return {
      name: toText(ctx.identifier())
    };
  },
  UsingForDeclaration: function UsingForDeclaration(ctx) {
    var typeName = null;

    if (toText(ctx.getChild(3)) !== '*') {
      typeName = this.visit(ctx.getChild(3));
    }

    return {
      typeName: typeName,
      libraryName: toText(ctx.identifier())
    };
  },
  PragmaDirective: function PragmaDirective(ctx) {
    return {
      name: toText(ctx.pragmaName()),
      value: toText(ctx.pragmaValue())
    };
  },
  ContractDefinition: function ContractDefinition(ctx) {
    var name = toText(ctx.identifier());
    this._currentContract = name;
    return {
      name: name,
      baseContracts: this.visit(ctx.inheritanceSpecifier()),
      subNodes: this.visit(ctx.contractPart()),
      kind: toText(ctx.getChild(0))
    };
  },
  InheritanceSpecifier: function InheritanceSpecifier(ctx) {
    return {
      baseName: this.visit(ctx.userDefinedTypeName()),
      arguments: this.visit(ctx.expression())
    };
  },
  ContractPart: function ContractPart(ctx) {
    return this.visit(ctx.children[0]);
  },
  ConstructorDefinition: function ConstructorDefinition(ctx) {
    var _this = this;

    var parameters = this.visit(ctx.parameterList());
    var block = this.visit(ctx.block());
    var modifiers = ctx.modifierList().modifierInvocation().map(function (mod) {
      return _this.visit(mod);
    }); // parse function visibility

    var visibility = 'default';

    if (ctx.modifierList().ExternalKeyword(0)) {
      visibility = 'external';
    } else if (ctx.modifierList().InternalKeyword(0)) {
      visibility = 'internal';
    } else if (ctx.modifierList().PublicKeyword(0)) {
      visibility = 'public';
    } else if (ctx.modifierList().PrivateKeyword(0)) {
      visibility = 'private';
    }

    var stateMutability = null;

    if (ctx.modifierList().stateMutability(0)) {
      stateMutability = toText(ctx.modifierList().stateMutability(0));
    }

    return {
      type: 'FunctionDefinition',
      name: null,
      parameters: parameters,
      body: block,
      visibility: visibility,
      modifiers: modifiers,
      isConstructor: true,
      stateMutability: stateMutability
    };
  },
  FunctionDefinition: function FunctionDefinition(ctx) {
    var _this2 = this;

    var name = '';

    if (ctx.identifier(0)) {
      name = toText(ctx.identifier(0));
    }

    var parameters = this.visit(ctx.parameterList());
    var returnParameters = this.visit(ctx.returnParameters());
    var block = null;

    if (ctx.block()) {
      block = this.visit(ctx.block());
    }

    var modifiers = ctx.modifierList().modifierInvocation().map(function (mod) {
      return _this2.visit(mod);
    }); // parse function visibility

    var visibility = 'default';

    if (ctx.modifierList().ExternalKeyword(0)) {
      visibility = 'external';
    } else if (ctx.modifierList().InternalKeyword(0)) {
      visibility = 'internal';
    } else if (ctx.modifierList().PublicKeyword(0)) {
      visibility = 'public';
    } else if (ctx.modifierList().PrivateKeyword(0)) {
      visibility = 'private';
    }

    var stateMutability = null;

    if (ctx.modifierList().stateMutability(0)) {
      stateMutability = toText(ctx.modifierList().stateMutability(0));
    }

    return {
      name: name,
      parameters: parameters,
      returnParameters: returnParameters,
      body: block,
      visibility: visibility,
      modifiers: modifiers,
      isConstructor: name === this._currentContract,
      stateMutability: stateMutability
    };
  },
  ModifierInvocation: function ModifierInvocation(ctx) {
    var exprList = ctx.expressionList();
    var args = void 0;

    if (exprList != null) {
      args = this.visit(exprList.expression());
    } else if (ctx.children.length > 1) {
      args = [];
    } else {
      args = null;
    }

    return {
      name: toText(ctx.identifier()),
      arguments: args
    };
  },
  ElementaryTypeNameExpression: function ElementaryTypeNameExpression(ctx) {
    return {
      typeName: this.visit(ctx.elementaryTypeName())
    };
  },
  TypeName: function TypeName(ctx) {
    if (ctx.children.length > 2) {
      var length = null;

      if (ctx.children.length === 4) {
        length = this.visit(ctx.getChild(2));
      }

      return {
        type: 'ArrayTypeName',
        baseTypeName: this.visit(ctx.getChild(0)),
        length: length
      };
    }

    if (ctx.children.length === 2) {
      return {
        type: 'ElementaryTypeName',
        name: toText(ctx.getChild(0)),
        stateMutability: toText(ctx.getChild(1))
      };
    }

    return this.visit(ctx.getChild(0));
  },
  FunctionTypeName: function FunctionTypeName(ctx) {
    var _this3 = this;

    var parameterTypes = ctx.functionTypeParameterList(0).functionTypeParameter().map(function (typeCtx) {
      return _this3.visit(typeCtx);
    });
    var returnTypes = [];

    if (ctx.functionTypeParameterList(1)) {
      returnTypes = ctx.functionTypeParameterList(1).functionTypeParameter().map(function (typeCtx) {
        return _this3.visit(typeCtx);
      });
    }

    var visibility = 'default';

    if (ctx.InternalKeyword(0)) {
      visibility = 'internal';
    } else if (ctx.ExternalKeyword(0)) {
      visibility = 'external';
    }

    var stateMutability = null;

    if (ctx.stateMutability(0)) {
      stateMutability = toText(ctx.stateMutability(0));
    }

    return {
      parameterTypes: parameterTypes,
      returnTypes: returnTypes,
      visibility: visibility,
      stateMutability: stateMutability
    };
  },
  ReturnStatement: function ReturnStatement(ctx) {
    var expression = null;

    if (ctx.expression()) {
      expression = this.visit(ctx.expression());
    }

    return {
      expression: expression
    };
  },
  EmitStatement: function EmitStatement(ctx) {
    return {
      eventCall: this.visit(ctx.functionCall())
    };
  },
  FunctionCall: function FunctionCall(ctx) {
    var _this4 = this;

    var args = [];
    var names = [];
    var ctxArgs = ctx.functionCallArguments();

    if (ctxArgs.expressionList()) {
      args = ctxArgs.expressionList().expression().map(function (exprCtx) {
        return _this4.visit(exprCtx);
      });
    } else if (ctxArgs.nameValueList()) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = ctxArgs.nameValueList().nameValue()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var nameValue = _step2.value;
          args.push(this.visit(nameValue.expression()));
          names.push(toText(nameValue.identifier()));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    return {
      expression: this.visit(ctx.expression()),
      arguments: args,
      names: names
    };
  },
  StructDefinition: function StructDefinition(ctx) {
    return {
      name: toText(ctx.identifier()),
      members: this.visit(ctx.variableDeclaration())
    };
  },
  VariableDeclaration: function VariableDeclaration(ctx) {
    var storageLocation = null;

    if (ctx.storageLocation()) {
      storageLocation = toText(ctx.storageLocation());
    }

    return {
      typeName: this.visit(ctx.typeName()),
      name: toText(ctx.identifier()),
      storageLocation: storageLocation,
      isStateVar: false,
      isIndexed: false
    };
  },
  EventParameter: function EventParameter(ctx) {
    var storageLocation = null;

    if (ctx.storageLocation(0)) {
      storageLocation = toText(ctx.storageLocation(0));
    }

    return {
      type: 'VariableDeclaration',
      typeName: this.visit(ctx.typeName()),
      name: toText(ctx.identifier()),
      storageLocation: storageLocation,
      isStateVar: false,
      isIndexed: !!ctx.IndexedKeyword(0)
    };
  },
  FunctionTypeParameter: function FunctionTypeParameter(ctx) {
    var storageLocation = null;

    if (ctx.storageLocation()) {
      storageLocation = toText(ctx.storageLocation());
    }

    return {
      type: 'VariableDeclaration',
      typeName: this.visit(ctx.typeName()),
      name: null,
      storageLocation: storageLocation,
      isStateVar: false,
      isIndexed: false
    };
  },
  WhileStatement: function WhileStatement(ctx) {
    return {
      condition: this.visit(ctx.expression()),
      body: this.visit(ctx.statement())
    };
  },
  DoWhileStatement: function DoWhileStatement(ctx) {
    return {
      condition: this.visit(ctx.expression()),
      body: this.visit(ctx.statement())
    };
  },
  IfStatement: function IfStatement(ctx) {
    var trueBody = this.visit(ctx.statement(0));
    var falseBody = null;

    if (ctx.statement().length > 1) {
      falseBody = this.visit(ctx.statement(1));
    }

    return {
      condition: this.visit(ctx.expression()),
      trueBody: trueBody,
      falseBody: falseBody
    };
  },
  UserDefinedTypeName: function UserDefinedTypeName(ctx) {
    return {
      namePath: toText(ctx)
    };
  },
  ElementaryTypeName: function ElementaryTypeName(ctx) {
    return {
      name: toText(ctx)
    };
  },
  Block: function Block(ctx) {
    return {
      statements: this.visit(ctx.statement())
    };
  },
  ExpressionStatement: function ExpressionStatement(ctx) {
    return {
      expression: this.visit(ctx.expression())
    };
  },
  NumberLiteral: function NumberLiteral(ctx) {
    var number = toText(ctx.getChild(0));
    var subdenomination = null;

    if (ctx.children.length === 2) {
      subdenomination = toText(ctx.getChild(1));
    }

    return {
      number: number,
      subdenomination: subdenomination
    };
  },
  Mapping: function Mapping(ctx) {
    return {
      keyType: this.visit(ctx.elementaryTypeName()),
      valueType: this.visit(ctx.typeName())
    };
  },
  ModifierDefinition: function ModifierDefinition(ctx) {
    var parameters = [];

    if (ctx.parameterList()) {
      parameters = this.visit(ctx.parameterList());
    }

    return {
      name: toText(ctx.identifier()),
      parameters: parameters,
      body: this.visit(ctx.block())
    };
  },
  Statement: function Statement(ctx) {
    return this.visit(ctx.getChild(0));
  },
  SimpleStatement: function SimpleStatement(ctx) {
    return this.visit(ctx.getChild(0));
  },
  Expression: function Expression(ctx) {
    var _this5 = this;

    var op = void 0;

    switch (ctx.children.length) {
      case 1:
        // primary expression
        return this.visit(ctx.getChild(0));

      case 2:
        op = toText(ctx.getChild(0)); // new expression

        if (op === 'new') {
          return {
            type: 'NewExpression',
            typeName: this.visit(ctx.typeName())
          };
        } // prefix operators


        if (['+', '-', '++', '--', '!', '~', 'after', 'delete'].includes(op)) {
          return {
            type: 'UnaryOperation',
            operator: op,
            subExpression: this.visit(ctx.getChild(1)),
            isPrefix: true
          };
        }

        op = toText(ctx.getChild(1)); // postfix operators

        if (['++', '--'].includes(op)) {
          return {
            type: 'UnaryOperation',
            operator: op,
            subExpression: this.visit(ctx.getChild(0)),
            isPrefix: false
          };
        }

        break;

      case 3:
        // treat parenthesis as no-op
        if (toText(ctx.getChild(0)) === '(' && toText(ctx.getChild(2)) === ')') {
          return {
            type: 'TupleExpression',
            components: [this.visit(ctx.getChild(1))],
            isArray: false
          };
        }

        op = toText(ctx.getChild(1)); // tuple separator

        if (op === ',') {
          return {
            type: 'TupleExpression',
            components: [this.visit(ctx.getChild(0)), this.visit(ctx.getChild(2))],
            isArray: false
          };
        } // member access


        if (op === '.') {
          return {
            type: 'MemberAccess',
            expression: this.visit(ctx.getChild(0)),
            memberName: toText(ctx.getChild(2))
          };
        }

        if (isBinOp(op)) {
          return {
            type: 'BinaryOperation',
            operator: op,
            left: this.visit(ctx.getChild(0)),
            right: this.visit(ctx.getChild(2))
          };
        }

        break;

      case 4:
        // function call
        if (toText(ctx.getChild(1)) === '(' && toText(ctx.getChild(3)) === ')') {
          var args = [];
          var names = [];
          var ctxArgs = ctx.functionCallArguments();

          if (ctxArgs.expressionList()) {
            args = ctxArgs.expressionList().expression().map(function (exprCtx) {
              return _this5.visit(exprCtx);
            });
          } else if (ctxArgs.nameValueList()) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = ctxArgs.nameValueList().nameValue()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var nameValue = _step3.value;
                args.push(this.visit(nameValue.expression()));
                names.push(toText(nameValue.identifier()));
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }

          return {
            type: 'FunctionCall',
            expression: this.visit(ctx.getChild(0)),
            arguments: args,
            names: names
          };
        } // index access


        if (toText(ctx.getChild(1)) === '[' && toText(ctx.getChild(3)) === ']') {
          return {
            type: 'IndexAccess',
            base: this.visit(ctx.getChild(0)),
            index: this.visit(ctx.getChild(2))
          };
        }

        break;

      case 5:
        // ternary operator
        if (toText(ctx.getChild(1)) === '?' && toText(ctx.getChild(3)) === ':') {
          return {
            type: 'Conditional',
            condition: this.visit(ctx.getChild(0)),
            trueExpression: this.visit(ctx.getChild(2)),
            falseExpression: this.visit(ctx.getChild(4))
          };
        }

        break;
    }

    throw new Error('unrecognized expression');
  },
  StateVariableDeclaration: function StateVariableDeclaration(ctx) {
    var type = this.visit(ctx.typeName());
    var iden = ctx.identifier();
    var name = toText(iden);
    var expression = null;

    if (ctx.expression()) {
      expression = this.visit(ctx.expression());
    }

    var visibility = 'default';

    if (ctx.InternalKeyword(0)) {
      visibility = 'internal';
    } else if (ctx.PublicKeyword(0)) {
      visibility = 'public';
    } else if (ctx.PrivateKeyword(0)) {
      visibility = 'private';
    }

    var isDeclaredConst = false;

    if (ctx.ConstantKeyword(0)) {
      isDeclaredConst = true;
    }

    var decl = this.createNode({
      type: 'VariableDeclaration',
      typeName: type,
      name: name,
      expression: expression,
      visibility: visibility,
      isStateVar: true,
      isDeclaredConst: isDeclaredConst,
      isIndexed: false
    }, iden);
    return {
      variables: [decl],
      initialValue: expression
    };
  },
  ForStatement: function ForStatement(ctx) {
    var conditionExpression = this.visit(ctx.expressionStatement());

    if (conditionExpression) {
      conditionExpression = conditionExpression.expression;
    }

    return {
      initExpression: this.visit(ctx.simpleStatement()),
      conditionExpression: conditionExpression,
      loopExpression: {
        type: 'ExpressionStatement',
        expression: this.visit(ctx.expression())
      },
      body: this.visit(ctx.statement())
    };
  },
  PrimaryExpression: function PrimaryExpression(ctx) {
    if (ctx.BooleanLiteral()) {
      return {
        type: 'BooleanLiteral',
        value: toText(ctx.BooleanLiteral()) === 'true'
      };
    }

    if (ctx.HexLiteral()) {
      return {
        type: 'HexLiteral',
        value: toText(ctx.HexLiteral())
      };
    }

    if (ctx.StringLiteral()) {
      var text = toText(ctx);
      return {
        type: 'StringLiteral',
        value: text.substring(1, text.length - 1)
      };
    }

    if (ctx.children.length == 3 && toText(ctx.getChild(1)) === '[' && toText(ctx.getChild(2)) === ']') {
      var node = this.visit(ctx.getChild(0));

      if (node.type === 'Identifier') {
        node = {
          type: 'UserDefinedTypeName',
          namePath: node.name
        };
      } else {
        node = {
          type: 'ElementaryTypeName',
          name: toText(ctx.getChild(0))
        };
      }

      return {
        type: 'ArrayTypeName',
        baseTypeName: node,
        length: null
      };
    }

    return this.visit(ctx.getChild(0));
  },
  Identifier: function Identifier(ctx) {
    return {
      name: toText(ctx)
    };
  },
  TupleExpression: function TupleExpression(ctx) {
    var _this6 = this; // remove parentheses


    var children = ctx.children.slice(1, -1);
    var components = mapCommasToNulls(children).map(function (expr) {
      // add a null for each empty value
      if (expr === null) {
        return null;
      }

      return _this6.visit(expr);
    });
    return {
      components: components,
      isArray: toText(ctx.getChild(0)) === '['
    };
  },
  IdentifierList: function IdentifierList(ctx) {
    var _this7 = this; // remove parentheses


    var children = ctx.children.slice(1, -1);
    return mapCommasToNulls(children).map(function (iden) {
      // add a null for each empty value
      if (iden === null) {
        return null;
      }

      return _this7.createNode({
        type: 'VariableDeclaration',
        name: toText(iden),
        storageLocation: null,
        typeName: null,
        isStateVar: false,
        isIndexed: false
      }, iden);
    });
  },
  VariableDeclarationList: function VariableDeclarationList(ctx) {
    var _this8 = this; // remove parentheses


    return mapCommasToNulls(ctx.children).map(function (decl) {
      // add a null for each empty value
      if (decl === null) {
        return null;
      }

      var storageLocation = null;

      if (decl.storageLocation()) {
        storageLocation = toText(decl.storageLocation());
      }

      return _this8.createNode({
        type: 'VariableDeclaration',
        name: toText(decl.identifier()),
        typeName: _this8.visit(decl.typeName()),
        storageLocation: storageLocation,
        isStateVar: false,
        isIndexed: false
      }, decl);
    });
  },
  VariableDeclarationStatement: function VariableDeclarationStatement(ctx) {
    var variables = void 0;

    if (ctx.variableDeclaration()) {
      variables = [this.visit(ctx.variableDeclaration())];
    } else if (ctx.identifierList()) {
      variables = this.visit(ctx.identifierList());
    } else if (ctx.variableDeclarationList()) {
      variables = this.visit(ctx.variableDeclarationList());
    }

    var initialValue = null;

    if (ctx.expression()) {
      initialValue = this.visit(ctx.expression());
    }

    return {
      variables: variables,
      initialValue: initialValue
    };
  },
  ImportDirective: function ImportDirective(ctx) {
    var pathString = toText(ctx.StringLiteral());
    var unitAlias = null;
    var symbolAliases = null;

    if (ctx.importDeclaration().length > 0) {
      symbolAliases = ctx.importDeclaration().map(function (decl) {
        var symbol = toText(decl.identifier(0));
        var alias = null;

        if (decl.identifier(1)) {
          alias = toText(decl.identifier(1));
        }

        return [symbol, alias];
      });
    } else if (ctx.children.length === 7) {
      unitAlias = toText(ctx.getChild(3));
    } else if (ctx.children.length === 5) {
      unitAlias = toText(ctx.getChild(3));
    }

    return {
      path: pathString.substring(1, pathString.length - 1),
      unitAlias: unitAlias,
      symbolAliases: symbolAliases
    };
  },
  EventDefinition: function EventDefinition(ctx) {
    return {
      name: toText(ctx.identifier()),
      parameters: this.visit(ctx.eventParameterList()),
      isAnonymous: !!ctx.AnonymousKeyword()
    };
  },
  EventParameterList: function EventParameterList(ctx) {
    var parameters = ctx.eventParameter().map(function (paramCtx) {
      var type = this.visit(paramCtx.typeName());
      var name = null;

      if (paramCtx.identifier()) {
        name = toText(paramCtx.identifier());
      }

      return this.createNode({
        type: 'VariableDeclaration',
        typeName: type,
        name: name,
        isStateVar: false,
        isIndexed: !!paramCtx.IndexedKeyword(0)
      }, paramCtx);
    }, this);
    return {
      type: 'ParameterList',
      parameters: parameters
    };
  },
  ReturnParameters: function ReturnParameters(ctx) {
    return this.visit(ctx.parameterList());
  },
  ParameterList: function ParameterList(ctx) {
    var _this9 = this;

    var parameters = ctx.parameter().map(function (paramCtx) {
      return _this9.visit(paramCtx);
    });
    return {
      parameters: parameters
    };
  },
  Parameter: function Parameter(ctx) {
    var storageLocation = null;

    if (ctx.storageLocation()) {
      storageLocation = toText(ctx.storageLocation());
    }

    var name = null;

    if (ctx.identifier()) {
      name = toText(ctx.identifier());
    }

    return {
      typeName: this.visit(ctx.typeName()),
      name: name,
      storageLocation: storageLocation,
      isStateVar: false,
      isIndexed: false
    };
  },
  InlineAssemblyStatement: function InlineAssemblyStatement(ctx) {
    var language = null;

    if (ctx.StringLiteral()) {
      language = toText(ctx.StringLiteral());
      language = language.substring(1, language.length - 1);
    }

    return {
      language: language,
      body: this.visit(ctx.assemblyBlock())
    };
  },
  AssemblyBlock: function AssemblyBlock(ctx) {
    var _this10 = this;

    var operations = ctx.assemblyItem().map(function (it) {
      return _this10.visit(it);
    });
    return {
      operations: operations
    };
  },
  AssemblyItem: function AssemblyItem(ctx) {
    var text = void 0;

    if (ctx.HexLiteral()) {
      return {
        type: 'HexLiteral',
        value: toText(ctx.HexLiteral())
      };
    }

    if (ctx.StringLiteral()) {
      text = toText(ctx.StringLiteral());
      return {
        type: 'StringLiteral',
        value: text.substring(1, text.length - 1)
      };
    }

    if (ctx.BreakKeyword()) {
      return {
        type: 'Break'
      };
    }

    if (ctx.ContinueKeyword()) {
      return {
        type: 'Continue'
      };
    }

    return this.visit(ctx.getChild(0));
  },
  AssemblyExpression: function AssemblyExpression(ctx) {
    return this.visit(ctx.getChild(0));
  },
  AssemblyCall: function AssemblyCall(ctx) {
    var _this11 = this;

    var functionName = toText(ctx.getChild(0));
    var args = ctx.assemblyExpression().map(function (arg) {
      return _this11.visit(arg);
    });
    return {
      functionName: functionName,
      arguments: args
    };
  },
  AssemblyLiteral: function AssemblyLiteral(ctx) {
    var text = void 0;

    if (ctx.StringLiteral()) {
      text = toText(ctx);
      return {
        type: 'StringLiteral',
        value: text.substring(1, text.length - 1)
      };
    }

    if (ctx.DecimalNumber()) {
      return {
        type: 'DecimalNumber',
        value: toText(ctx)
      };
    }

    if (ctx.HexNumber()) {
      return {
        type: 'HexNumber',
        value: toText(ctx)
      };
    }

    if (ctx.HexLiteral()) {
      return {
        type: 'HexLiteral',
        value: toText(ctx)
      };
    }
  },
  AssemblySwitch: function AssemblySwitch(ctx) {
    var _this12 = this;

    return {
      expression: this.visit(ctx.assemblyExpression()),
      cases: ctx.assemblyCase().map(function (c) {
        return _this12.visit(c);
      })
    };
  },
  AssemblyCase: function AssemblyCase(ctx) {
    var value = null;

    if (toText(ctx.getChild(0)) === 'case') {
      value = this.visit(ctx.assemblyLiteral());
    }

    var node = {
      block: this.visit(ctx.assemblyBlock())
    };

    if (value !== null) {
      node.value = value;
    } else {
      node.default = true;
    }

    return node;
  },
  AssemblyLocalDefinition: function AssemblyLocalDefinition(ctx) {
    var names = ctx.assemblyIdentifierOrList();

    if (names.identifier()) {
      names = [this.visit(names.identifier())];
    } else {
      names = this.visit(names.assemblyIdentifierList().identifier());
    }

    return {
      names: names,
      expression: this.visit(ctx.assemblyExpression())
    };
  },
  AssemblyFunctionDefinition: function AssemblyFunctionDefinition(ctx) {
    var args = ctx.assemblyIdentifierList();
    args = args ? this.visit(args.identifier()) : [];
    var returnArgs = ctx.assemblyFunctionReturns();
    returnArgs = returnArgs ? this.visit(returnArgs.assemblyIdentifierList().identifier()) : [];
    return {
      name: toText(ctx.identifier()),
      arguments: args,
      returnArguments: returnArgs,
      body: this.visit(ctx.assemblyBlock())
    };
  },
  AssemblyAssignment: function AssemblyAssignment(ctx) {
    var names = ctx.assemblyIdentifierOrList();

    if (names.identifier()) {
      names = [this.visit(names.identifier())];
    } else {
      names = this.visit(names.assemblyIdentifierList().identifier());
    }

    return {
      names: names,
      expression: this.visit(ctx.assemblyExpression())
    };
  },
  LabelDefinition: function LabelDefinition(ctx) {
    return {
      name: toText(ctx.identifier())
    };
  },
  AssemblyStackAssignment: function AssemblyStackAssignment(ctx) {
    return {
      name: toText(ctx.identifier())
    };
  },
  AssemblyFor: function AssemblyFor(ctx) {
    return {
      pre: this.visit(ctx.getChild(1)),
      condition: this.visit(ctx.getChild(2)),
      post: this.visit(ctx.getChild(3)),
      body: this.visit(ctx.getChild(4))
    };
  },
  AssemblyIf: function AssemblyIf(ctx) {
    return {
      condition: this.visit(ctx.assemblyExpression()),
      body: this.visit(ctx.assemblyBlock())
    };
  }
};

function ASTBuilder(options) {
  antlr4.tree.ParseTreeVisitor.call(this);
  this.options = options;
}

ASTBuilder.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
ASTBuilder.prototype.constructor = ASTBuilder;

ASTBuilder.prototype._loc = function (ctx) {
  var sourceLocation = {
    start: {
      line: ctx.start.line,
      column: ctx.start.column
    },
    end: {
      line: ctx.stop.line,
      column: ctx.stop.column
    }
  };
  return {
    loc: sourceLocation
  };
};

ASTBuilder.prototype._range = function (ctx) {
  return {
    range: [ctx.start.start, ctx.stop.stop]
  };
};

ASTBuilder.prototype.meta = function (ctx) {
  var ret = {};

  if (this.options.loc) {
    Object.assign(ret, this._loc(ctx));
  }

  if (this.options.range) {
    Object.assign(ret, this._range(ctx));
  }

  return ret;
};

ASTBuilder.prototype.createNode = function (obj, ctx) {
  return Object.assign(obj, this.meta(ctx));
};

ASTBuilder.prototype.visit = function (ctx) {
  if (ctx == null) {
    return null;
  }

  if (Array.isArray(ctx)) {
    return ctx.map(function (child) {
      return this.visit(child);
    }, this);
  }

  var name = ctx.constructor.name;

  if (name.endsWith('Context')) {
    name = name.substring(0, name.length - 'Context'.length);
  }

  var node = {
    type: name
  };

  if (name in transformAST) {
    var visited = transformAST[name].call(this, ctx);

    if (Array.isArray(visited)) {
      return visited;
    }

    Object.assign(node, visited);
  }

  return this.createNode(node, ctx);
};

module.exports = ASTBuilder;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var antlr4 = __webpack_require__(13);

function ErrorListener() {
  antlr4.error.ErrorListener.call(this);
  this._errors = [];
}

ErrorListener.prototype = Object.create(antlr4.error.ErrorListener.prototype);
ErrorListener.prototype.constructor = ErrorListener;

ErrorListener.prototype.syntaxError = function (recognizer, offendingSymbol, line, column, message) {
  this._errors.push({
    message: message,
    line: line,
    column: column
  });
};

ErrorListener.prototype.getErrors = function () {
  return this._errors;
};

ErrorListener.prototype.hasErrors = function () {
  return this._errors.length > 0;
};

module.exports = ErrorListener;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var fs = __webpack_require__(18);

var path = __webpack_require__(36);

var TYPE_TOKENS = ['var', 'bool', 'address', 'string', 'Int', 'Uint', 'Byte', 'Fixed', 'UFixed'];

function rsplit(str, value) {
  var index = str.lastIndexOf(value);
  return [str.substring(0, index), str.substring(index + 1, str.length)];
}

function normalizeTokenType(value) {
  if (value.endsWith("'")) {
    value = value.substring(0, value.length - 1);
  }

  if (value.startsWith("'")) {
    value = value.substring(1, value.length);
  }

  return value;
}

function getTokenType(value) {
  if (value === 'Identifier' || value === 'from') {
    return 'Identifier';
  } else if (value === 'TrueLiteral' || value === 'FalseLiteral') {
    return 'Boolean';
  } else if (value === 'VersionLiteral') {
    return 'Version';
  } else if (value === 'StringLiteral') {
    return 'String';
  } else if (TYPE_TOKENS.includes(value)) {
    return 'Type';
  } else if (value === 'NumberUnit') {
    return 'Subdenomination';
  } else if (value === 'DecimalNumber') {
    return 'Numeric';
  } else if (value === 'HexLiteral') {
    return 'Hex';
  } else if (value === 'ReservedKeyword') {
    return 'Reserved';
  } else if (/^\W+$/.test(value)) {
    return 'Punctuator';
  } else {
    return 'Keyword';
  }
}

function getTokenTypeMap() {
  var filePath = path.join(__dirname, '../lib/Solidity.tokens');
  return fs.readFileSync(filePath).toString('utf-8').split('\n').map(function (line) {
    return rsplit(line, '=');
  }).reduce(function (acum, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        value = _ref2[0],
        key = _ref2[1];

    acum[parseInt(key, 10)] = normalizeTokenType(value);
    return acum;
  }, {});
}

function buildTokenList(tokens, options) {
  var tokenTypes = getTokenTypeMap();
  return tokens.map(function (token) {
    var type = getTokenType(tokenTypes[token.type]);
    var node = {
      type: type,
      value: token.text
    };

    if (options.range) {
      node.range = [token.start, token.stop + 1];
    }

    if (options.loc) {
      node.loc = {
        start: {
          line: token.line,
          column: token.column
        },
        end: {
          line: token.line,
          column: token.column + token.text.length
        }
      };
    }

    return node;
  });
}

exports.buildTokenList = buildTokenList;
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var nodes = __webpack_require__(114);

function genericPrint(path, options, print) {
  var node = path.getValue();

  if (node === null) {
    return '';
  }

  if (!(node.type in nodes)) {
    throw new Error("Unknown type: ".concat(JSON.stringify(node.type)));
  }

  return nodes[node.type].print({
    node: node,
    options: options,
    path: path,
    print: print
  });
}

module.exports = genericPrint;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

/* This file was automatically generated on 1562128164 */

/* eslint-disable global-require */
module.exports = {
  ArrayTypeName: __webpack_require__(115),
  AssemblyAssignment: __webpack_require__(116),
  AssemblyBlock: __webpack_require__(117),
  AssemblyCall: __webpack_require__(118),
  AssemblyCase: __webpack_require__(119),
  AssemblyFor: __webpack_require__(120),
  AssemblyIf: __webpack_require__(121),
  AssemblyLocalDefinition: __webpack_require__(122),
  AssemblySwitch: __webpack_require__(123),
  BinaryOperation: __webpack_require__(124),
  Block: __webpack_require__(131),
  BooleanLiteral: __webpack_require__(132),
  BreakStatement: __webpack_require__(133),
  Conditional: __webpack_require__(134),
  ContinueStatement: __webpack_require__(135),
  ContractDefinition: __webpack_require__(136),
  DecimalNumber: __webpack_require__(137),
  ElementaryTypeName: __webpack_require__(138),
  ElementaryTypeNameExpression: __webpack_require__(139),
  EmitStatement: __webpack_require__(140),
  EnumDefinition: __webpack_require__(141),
  EnumValue: __webpack_require__(142),
  EventDefinition: __webpack_require__(143),
  ExpressionStatement: __webpack_require__(144),
  ForStatement: __webpack_require__(145),
  FunctionCall: __webpack_require__(146),
  FunctionDefinition: __webpack_require__(147),
  FunctionTypeName: __webpack_require__(148),
  HexLiteral: __webpack_require__(149),
  HexNumber: __webpack_require__(150),
  Identifier: __webpack_require__(151),
  IfStatement: __webpack_require__(152),
  ImportDirective: __webpack_require__(153),
  IndexAccess: __webpack_require__(158),
  InheritanceSpecifier: __webpack_require__(159),
  InlineAssemblyStatement: __webpack_require__(160),
  LabelDefinition: __webpack_require__(161),
  Mapping: __webpack_require__(162),
  MemberAccess: __webpack_require__(163),
  ModifierDefinition: __webpack_require__(164),
  ModifierInvocation: __webpack_require__(165),
  NewExpression: __webpack_require__(166),
  NumberLiteral: __webpack_require__(167),
  Parameter: __webpack_require__(168),
  ParameterList: __webpack_require__(169),
  PragmaDirective: __webpack_require__(170),
  ReturnStatement: __webpack_require__(172),
  SourceUnit: __webpack_require__(173),
  StateVariableDeclaration: __webpack_require__(174),
  StringLiteral: __webpack_require__(175),
  StructDefinition: __webpack_require__(176),
  ThrowStatement: __webpack_require__(177),
  TupleExpression: __webpack_require__(178),
  UnaryOperation: __webpack_require__(179),
  UserDefinedTypeName: __webpack_require__(180),
  UsingForDeclaration: __webpack_require__(181),
  VariableDeclaration: __webpack_require__(182),
  VariableDeclarationStatement: __webpack_require__(183),
  WhileStatement: __webpack_require__(184)
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    concat = _require.doc.builders.concat;

var ArrayTypeName = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    var stateMutability = '';

    if (node.baseTypeName.name === 'address' && node.baseTypeName.stateMutability) {
      stateMutability = concat([' ', node.baseTypeName.stateMutability]);
    }

    return concat([path.call(_print, 'baseTypeName'), stateMutability, '[', node.length ? path.call(_print, 'length') : '', ']']);
  }
};
module.exports = ArrayTypeName;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    join = _require.doc.builders.join;

var AssemblyAssignment = {
  print: function print(_ref) {
    var path = _ref.path,
        _print = _ref.print;
    return join(' ', [join(', ', path.map(_print, 'names')), ':=', path.call(_print, 'expression')]);
  }
};
module.exports = AssemblyAssignment;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    hardline = _require$doc$builders.hardline,
    indent = _require$doc$builders.indent;

var printPreservingEmptyLines = __webpack_require__(24);

var AssemblyBlock = {
  print: function print(_ref) {
    var options = _ref.options,
        path = _ref.path,
        _print = _ref.print;
    return concat(['{', indent(hardline), indent(printPreservingEmptyLines(path, 'operations', options, _print)), hardline, '}']);
  }
};
module.exports = AssemblyBlock;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    group = _require$doc$builders.group,
    indent = _require$doc$builders.indent,
    join = _require$doc$builders.join,
    line = _require$doc$builders.line,
    softline = _require$doc$builders.softline;

var AssemblyCall = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;

    if (node.arguments.length === 0) {
      return node.functionName;
    }

    return concat([node.functionName, '(', group(concat([indent(concat([softline, join(concat([',', line]), path.map(_print, 'arguments'))])), softline])), ')']);
  }
};
module.exports = AssemblyCall;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    join = _require$doc$builders.join;

var AssemblyCase = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    var doc;

    if (node.default) {
      doc = concat(['default']);
    } else {
      doc = concat(['case ', path.call(_print, 'value')]);
    }

    return join(' ', [doc, path.call(_print, 'block')]);
  }
};
module.exports = AssemblyCase;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    join = _require.doc.builders.join;

var AssemblyFor = {
  print: function print(_ref) {
    var path = _ref.path,
        _print = _ref.print;
    return join(' ', ['for', path.call(_print, 'pre'), path.call(_print, 'condition'), path.call(_print, 'post'), path.call(_print, 'body')]);
  }
};
module.exports = AssemblyFor;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    concat = _require.doc.builders.concat;

var AssemblyIf = {
  print: function print(_ref) {
    var path = _ref.path,
        _print = _ref.print;
    return concat(['if ', path.call(_print, 'condition'), ' ', path.call(_print, 'body')]);
  }
};
module.exports = AssemblyIf;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    join = _require.doc.builders.join;

var AssemblyLocalDefinition = {
  print: function print(_ref) {
    var path = _ref.path,
        _print = _ref.print;
    return join(' ', ['let', join(', ', path.map(_print, 'names')), ':=', path.call(_print, 'expression')]);
  }
};
module.exports = AssemblyLocalDefinition;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    hardline = _require$doc$builders.hardline,
    indent = _require$doc$builders.indent,
    join = _require$doc$builders.join;

var AssemblySwitch = {
  print: function print(_ref) {
    var path = _ref.path,
        _print = _ref.print;
    var doc = join(hardline, path.map(_print, 'cases'));
    return concat(['switch ', path.call(_print, 'expression'), indent(hardline), indent(doc)]);
  }
};
module.exports = AssemblySwitch;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable consistent-return */
var printers = __webpack_require__(125);

var BinaryOperation = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print,
        options = _ref.options;
    var printerKeys = Object.keys(printers);

    for (var i = 0, len = printerKeys.length; i < len; i += 1) {
      if (printers[printerKeys[i]].match(node.operator)) return printers[printerKeys[i]].print(node, path, _print, options);
    }
  }
};
module.exports = BinaryOperation;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

/* This file was automatically generated on 1562128164 */

/* eslint-disable global-require */
module.exports = {
  arithmetic: __webpack_require__(30),
  assignment: __webpack_require__(126),
  bit: __webpack_require__(127),
  comparison: __webpack_require__(48),
  exponentiation: __webpack_require__(128),
  logical: __webpack_require__(129),
  shift: __webpack_require__(130)
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    group = _require$doc$builders.group,
    line = _require$doc$builders.line,
    concat = _require$doc$builders.concat,
    indent = _require$doc$builders.indent;

module.exports = {
  match: function match(op) {
    return ['=', '|=', '^=', '&=', '<<=', '>>=', '+=', '-=', '*=', '/=', '%='].includes(op);
  },
  print: function print(node, path, _print) {
    return concat([path.call(_print, 'left'), ' ', node.operator, node.right.type === 'BinaryOperation' ? group(indent(concat([line, path.call(_print, 'right')]))) : concat([' ', path.call(_print, 'right')])]);
  }
};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var arithmetic = __webpack_require__(30);

module.exports = {
  match: function match(op) {
    return ['&', '|', '^'].includes(op);
  },
  print: arithmetic.print
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    group = _require$doc$builders.group,
    concat = _require$doc$builders.concat,
    indent = _require$doc$builders.indent,
    line = _require$doc$builders.line,
    softline = _require$doc$builders.softline;

module.exports = {
  match: function match(op) {
    return op === '**';
  },
  print: function print(node, path, _print, options) {
    return group(indent(concat([path.call(_print, 'left'), options.spacedExp ? ' ' : '', node.operator, options.spacedExp ? line : softline, path.call(_print, 'right')])));
  }
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    group = _require$doc$builders.group,
    line = _require$doc$builders.line,
    concat = _require$doc$builders.concat,
    indent = _require$doc$builders.indent;

var groupIfNecessaryBuilder = function groupIfNecessaryBuilder(path) {
  return function (doc) {
    return path.getParentNode().type === 'BinaryOperation' ? doc : group(doc);
  };
};

var indentIfNecessaryBuilder = function indentIfNecessaryBuilder(path) {
  return function (doc) {
    var parentNode = path.getParentNode();
    if (parentNode.type === 'IfStatement') return doc;
    if (parentNode.type === 'WhileStatement') return doc;
    if (parentNode.type === 'BinaryOperation') return doc;
    return indent(doc);
  };
};

module.exports = {
  match: function match(op) {
    return ['&&', '||'].includes(op);
  },
  print: function print(node, path, _print) {
    var groupIfNecessary = groupIfNecessaryBuilder(path);
    var indentIfNecessary = indentIfNecessaryBuilder(path);
    return groupIfNecessary(indentIfNecessary(concat([path.call(_print, 'left'), ' ', node.operator, line, path.call(_print, 'right')])));
  }
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var arithmetic = __webpack_require__(30);

module.exports = {
  match: function match(op) {
    return ['<<', '>>'].includes(op);
  },
  print: arithmetic.print
};

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    indent = _require$doc$builders.indent,
    line = _require$doc$builders.line;

var printPreservingEmptyLines = __webpack_require__(24);

var Block = {
  print: function print(_ref) {
    var node = _ref.node,
        options = _ref.options,
        path = _ref.path,
        _print = _ref.print;

    // if block is empty, just return the pair of braces
    if (node.statements.length === 0 && !node.comments) {
      return '{}';
    }

    var parts = ['{', indent(line), indent(printPreservingEmptyLines(path, 'statements', options, _print))];

    if (node.comments) {
      var first = true;
      path.each(function (commentPath) {
        if (first) {
          first = false;
        } else {
          parts.push(indent(line));
        }

        var comment = commentPath.getValue();

        if (comment.trailing || comment.leading) {
          return;
        }

        comment.printed = true;
        parts.push(options.printer.printComment(commentPath));
      }, 'comments');
    }

    parts.push(line);
    parts.push('}');
    return concat(parts);
  }
};
module.exports = Block;

/***/ }),
/* 132 */
/***/ (function(module, exports) {

var BooleanLiteral = {
  print: function print(_ref) {
    var node = _ref.node;
    return node.value ? 'true' : 'false';
  }
};
module.exports = BooleanLiteral;

/***/ }),
/* 133 */
/***/ (function(module, exports) {

var BreakStatement = {
  print: function print() {
    return 'break;';
  }
};
module.exports = BreakStatement;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    group = _require$doc$builders.group,
    indent = _require$doc$builders.indent,
    line = _require$doc$builders.line;

var Conditional = {
  print: function print(_ref) {
    var path = _ref.path,
        _print = _ref.print;
    return group(concat([path.call(_print, 'condition'), indent(line), '? ', path.call(_print, 'trueExpression'), indent(line), ': ', path.call(_print, 'falseExpression')]));
  }
};
module.exports = Conditional;

/***/ }),
/* 135 */
/***/ (function(module, exports) {

var ContinueStatement = {
  print: function print() {
    return 'continue;';
  }
};
module.exports = ContinueStatement;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    group = _require$doc$builders.group,
    indent = _require$doc$builders.indent,
    join = _require$doc$builders.join,
    line = _require$doc$builders.line;

var printPreservingEmptyLines = __webpack_require__(24);

var inheritance = function inheritance(node, path, print) {
  if (node.baseContracts.length > 0) {
    return concat([' is', indent(concat([line, join(concat([',', line]), path.map(print, 'baseContracts'))]))]);
  }

  return '';
};

var body = function body(node, path, options, print) {
  if (node.subNodes.length > 0) {
    return concat([indent(line), indent(printPreservingEmptyLines(path, 'subNodes', options, print)), line]);
  }

  return '';
};

var ContractDefinition = {
  print: function print(_ref) {
    var node = _ref.node,
        options = _ref.options,
        path = _ref.path,
        _print = _ref.print;
    return concat([group(concat([node.kind, ' ', node.name, inheritance(node, path, _print), line, '{'])), body(node, path, options, _print), '}']);
  }
};
module.exports = ContractDefinition;

/***/ }),
/* 137 */
/***/ (function(module, exports) {

var DecimalNumber = {
  print: function print(_ref) {
    var node = _ref.node;
    return node.value;
  }
};
module.exports = DecimalNumber;

/***/ }),
/* 138 */
/***/ (function(module, exports) {

var ElementaryTypeName = {
  print: function print(_ref) {
    var node = _ref.node;
    return node.name;
  }
};
module.exports = ElementaryTypeName;

/***/ }),
/* 139 */
/***/ (function(module, exports) {

var ElementaryTypeNameExpression = {
  print: function print(_ref) {
    var path = _ref.path,
        _print = _ref.print;
    return path.call(_print, 'typeName');
  }
};
module.exports = ElementaryTypeNameExpression;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    concat = _require.doc.builders.concat;

var EmitStatement = {
  print: function print(_ref) {
    var path = _ref.path,
        _print = _ref.print;
    return concat(['emit ', path.call(_print, 'eventCall'), ';']);
  }
};
module.exports = EmitStatement;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    group = _require$doc$builders.group,
    indent = _require$doc$builders.indent,
    join = _require$doc$builders.join,
    line = _require$doc$builders.line,
    softline = _require$doc$builders.softline;

var EnumDefinition = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print,
        options = _ref.options;
    return group(concat(['enum ', node.name, ' {', indent(concat([options.bracketSpacing ? line : softline, join(concat([',', line]), path.map(_print, 'members'))])), options.bracketSpacing ? line : softline, '}']));
  }
};
module.exports = EnumDefinition;

/***/ }),
/* 142 */
/***/ (function(module, exports) {

var EnumValue = {
  print: function print(_ref) {
    var node = _ref.node;
    return node.name;
  }
};
module.exports = EnumValue;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    concat = _require.doc.builders.concat;

var EventDefinition = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    return concat(['event ', node.name, '(', path.call(_print, 'parameters'), ');']);
  }
};
module.exports = EventDefinition;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    concat = _require.doc.builders.concat;

var ExpressionStatement = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    return concat([node.expression ? path.call(_print, 'expression') : '', node.omitSemicolon ? '' : ';']);
  }
};
module.exports = ExpressionStatement;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    group = _require$doc$builders.group,
    indent = _require$doc$builders.indent,
    line = _require$doc$builders.line,
    softline = _require$doc$builders.softline;

var printBody = function printBody(node, path, print) {
  if (node.body.type === 'Block') {
    return concat([' ', path.call(print, 'body')]);
  }

  return group(indent(concat([line, path.call(print, 'body')])));
};

var ForStatement = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    return concat([group(concat(['for (', indent(concat([softline, node.initExpression ? path.call(_print, 'initExpression') : '', ';', line, node.conditionExpression ? path.call(_print, 'conditionExpression') : '', ';', line, path.call(_print, 'loopExpression')])), softline, ')'])), printBody(node, path, _print)]);
  }
};
module.exports = ForStatement;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    group = _require$doc$builders.group,
    indent = _require$doc$builders.indent,
    join = _require$doc$builders.join,
    line = _require$doc$builders.line,
    softline = _require$doc$builders.softline;

var printObject = function printObject(node, path, print, options) {
  return group(concat(['{', indent(concat([options.bracketSpacing ? line : softline, join(concat([',', line]), path.map(print, 'arguments').map(function (arg, index) {
    return concat([node.names[index], ': ', arg]);
  }))])), options.bracketSpacing ? line : softline, '}']));
};

var printParameters = function printParameters(node, path, print) {
  return group(concat([indent(concat([softline, join(concat([',', line]), path.map(print, 'arguments'))])), softline]));
};

var printArguments = function printArguments(node, path, print, options) {
  if (node.names && node.names.length > 0) {
    return printObject(node, path, print, options);
  }

  if (node.arguments && node.arguments.length > 0) {
    return printParameters(node, path, print);
  }

  return '';
};

var FunctionCall = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print,
        options = _ref.options;
    return concat([path.call(_print, 'expression'), '(', printArguments(node, path, _print, options), ')']);
  }
};
module.exports = FunctionCall;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    dedent = _require$doc$builders.dedent,
    group = _require$doc$builders.group,
    indent = _require$doc$builders.indent,
    join = _require$doc$builders.join,
    line = _require$doc$builders.line;

var functionName = function functionName(node) {
  if (node.isConstructor && !node.name) return 'constructor';
  if (node.name) return "function ".concat(node.name);
  return 'function';
};

var visibility = function visibility(node) {
  if (node.visibility && node.visibility !== 'default') {
    return concat([line, node.visibility]);
  }

  return '';
};

var stateMutability = function stateMutability(node) {
  if (node.stateMutability && node.stateMutability !== 'default') {
    return concat([line, node.stateMutability]);
  }

  return '';
};

var modifiers = function modifiers(node, path, print) {
  if (node.modifiers.length > 0) {
    return concat([line, join(line, path.map(print, 'modifiers'))]);
  }

  return '';
};

var returnParameters = function returnParameters(node, path, print) {
  if (node.returnParameters) {
    return concat([line, 'returns (', path.call(print, 'returnParameters'), ')']);
  }

  return '';
};

var signatureEnd = function signatureEnd(node) {
  if (node.body) return dedent(line);
  return ';';
};

var body = function body(node, path, print) {
  if (node.body) return path.call(print, 'body');
  return '';
};

var FunctionDefinition = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    return concat([functionName(node), '(', path.call(_print, 'parameters'), ')', indent(group(concat([visibility(node), stateMutability(node), modifiers(node, path, _print), returnParameters(node, path, _print), signatureEnd(node)]))), body(node, path, _print)]);
  }
};
module.exports = FunctionDefinition;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    group = _require$doc$builders.group,
    indent = _require$doc$builders.indent,
    join = _require$doc$builders.join,
    line = _require$doc$builders.line,
    softline = _require$doc$builders.softline;

var parameterTypes = function parameterTypes(node, path, print) {
  return group(concat([indent(concat([softline, join(concat([',', line]), path.map(print, 'parameterTypes'))])), softline]));
};

var returnTypes = function returnTypes(node, path, print) {
  if (node.returnTypes.length > 0) {
    return concat([line, 'returns (', join(', ', path.map(print, 'returnTypes')), ')']);
  }

  return '';
};

var visibility = function visibility(node) {
  if (node.visibility && node.visibility !== 'default') {
    return concat([line, node.visibility]);
  }

  return '';
};

var stateMutability = function stateMutability(node) {
  if (node.stateMutability && node.stateMutability !== 'default') {
    return concat([line, node.stateMutability]);
  }

  return '';
};

var FunctionTypeName = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    return concat(['function(', parameterTypes(node, path, _print), ')', indent(group(concat([returnTypes(node, path, _print), visibility(node), stateMutability(node)])))]);
  }
};
module.exports = FunctionTypeName;

/***/ }),
/* 149 */
/***/ (function(module, exports) {

var HexLiteral = {
  print: function print(_ref) {
    var node = _ref.node;
    return node.value;
  }
};
module.exports = HexLiteral;

/***/ }),
/* 150 */
/***/ (function(module, exports) {

var HexNumber = {
  print: function print(_ref) {
    var node = _ref.node;
    return node.value;
  }
};
module.exports = HexNumber;

/***/ }),
/* 151 */
/***/ (function(module, exports) {

var Identifier = {
  print: function print(_ref) {
    var node = _ref.node;
    return node.name;
  }
};
module.exports = Identifier;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    group = _require$doc$builders.group,
    hardline = _require$doc$builders.hardline,
    indent = _require$doc$builders.indent,
    line = _require$doc$builders.line,
    softline = _require$doc$builders.softline;

var printTrueBody = function printTrueBody(node, path, print) {
  if (node.trueBody.type === 'Block') {
    return concat([' ', path.call(print, 'trueBody')]);
  }

  var ifWithinIf = node.trueBody.type === 'IfStatement';
  return group(indent(concat([ifWithinIf ? hardline : line, path.call(print, 'trueBody')])));
};

var printFalseBody = function printFalseBody(node, path, print) {
  if (node.falseBody.type === 'Block' || node.falseBody.type === 'IfStatement') {
    return concat([' ', path.call(print, 'falseBody')]);
  }

  return group(indent(concat([line, path.call(print, 'falseBody')])));
};

var printElse = function printElse(node, path, print) {
  if (node.falseBody) {
    var elseOnSameLine = node.trueBody.type === 'Block';
    return concat([elseOnSameLine ? ' ' : hardline, 'else', printFalseBody(node, path, print)]);
  }

  return '';
};

var IfStatement = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    return concat([group(concat(['if (', indent(concat([softline, path.call(_print, 'condition')])), softline, ')'])), printTrueBody(node, path, _print), printElse(node, path, _print)]);
  }
};
module.exports = IfStatement;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var _slicedToArray = __webpack_require__(154);

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    join = _require$doc$builders.join;

var ImportDirective = {
  print: function print(_ref) {
    var node = _ref.node;
    // @TODO: handle proper escaping
    var doc = concat(['"', node.path, '"']);

    if (node.unitAlias) {
      doc = concat([doc, ' as ', node.unitAlias]);
    } else if (node.symbolAliases) {
      doc = concat(['{', join(', ', node.symbolAliases.map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            a = _ref3[0],
            b = _ref3[1];

        return b ? [a, b].join(' as ') : a;
      })), '} from ', doc]);
    }

    return concat(['import ', doc, ';']);
  }
};
module.exports = ImportDirective;

/***/ }),
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    concat = _require.doc.builders.concat;

var IndexAccess = {
  print: function print(_ref) {
    var path = _ref.path,
        _print = _ref.print;
    return concat([path.call(_print, 'base'), '[', path.call(_print, 'index'), ']']);
  }
};
module.exports = IndexAccess;

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    concat = _require.doc.builders.concat;

var InheritanceSpecifier = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    var parts = [path.call(_print, 'baseName')];

    if (node.arguments && node.arguments.length) {
      parts.push('(');
      parts = parts.concat(path.map(_print, 'arguments'));
      parts.push(')');
    }

    return concat(parts);
  }
};
module.exports = InheritanceSpecifier;

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    concat = _require.doc.builders.concat; // @TODO: add support for assembly language specifier


var InlineAssemblyStatement = {
  print: function print(_ref) {
    var path = _ref.path,
        _print = _ref.print;
    return concat(['assembly ', path.call(_print, 'body')]);
  }
};
module.exports = InlineAssemblyStatement;

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    line = _require$doc$builders.line;

var LabelDefinition = {
  print: function print(_ref) {
    var node = _ref.node;
    return concat([node.name, ':', line]);
  }
};
module.exports = LabelDefinition;

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    concat = _require.doc.builders.concat;

var Mapping = {
  print: function print(_ref) {
    var path = _ref.path,
        _print = _ref.print;
    return concat(['mapping(', path.call(_print, 'keyType'), ' => ', path.call(_print, 'valueType'), ')']);
  }
};
module.exports = Mapping;

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    group = _require$doc$builders.group,
    indent = _require$doc$builders.indent,
    softline = _require$doc$builders.softline;

var isBeginnigOfChain = function isBeginnigOfChain(path) {
  var parentNodeType = path.getParentNode().type;
  if (parentNodeType === 'MemberAccess') return false;

  if (parentNodeType === 'FunctionCall') {
    var grandParentNodeType = path.getParentNode(1).type;
    return grandParentNodeType !== 'MemberAccess';
  }

  return true;
};

var MemberAccess = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    var doc = concat([path.call(_print, 'expression'), indent(concat([softline, '.', node.memberName]))]);
    return isBeginnigOfChain(path) ? group(doc) : doc;
  }
};
module.exports = MemberAccess;

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    concat = _require.doc.builders.concat;

var ModifierDefinition = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    var parts = ['modifier ', node.name];

    if (node.parameters && node.parameters.parameters) {
      // if node.paremeters is an object, print parameter list
      parts.push('(');
      parts = parts.concat(path.call(_print, 'parameters'));
      parts.push(') ');
    } else if (node.parameters && node.parameters.length === 0) {
      // if node.paremeters is an empty array, don't print parentheses
      parts.push(' ');
    } else {
      // otherwise, throw a not implemented error
      throw new Error('[ModifierDefinition] Scenario not implemented');
    }

    parts.push(path.call(_print, 'body'));
    return concat(parts);
  }
};
module.exports = ModifierDefinition;

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    group = _require$doc$builders.group,
    indent = _require$doc$builders.indent,
    join = _require$doc$builders.join,
    line = _require$doc$builders.line,
    softline = _require$doc$builders.softline;

var modifierArguments = function modifierArguments(node, path, print) {
  if (node.arguments) {
    if (node.arguments.length > 0) {
      return group(concat(['(', indent(concat([softline, join(concat([',', line]), path.map(print, 'arguments'))])), softline, ')']));
    }

    return '()';
  }

  return '';
};

var ModifierInvocation = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    return concat([node.name, modifierArguments(node, path, _print)]);
  }
};
module.exports = ModifierInvocation;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    concat = _require.doc.builders.concat;

var NewExpression = {
  print: function print(_ref) {
    var path = _ref.path,
        _print = _ref.print;
    return concat(['new ', path.call(_print, 'typeName')]);
  }
};
module.exports = NewExpression;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    join = _require.doc.builders.join;

var NumberLiteral = {
  print: function print(_ref) {
    var node = _ref.node;

    if (node.subdenomination) {
      return join(' ', [node.number, node.subdenomination]);
    }

    return node.number;
  }
};
module.exports = NumberLiteral;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    join = _require.doc.builders.join;

var Parameter = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    var doc = path.call(_print, 'typeName');
    doc = join(' ', [doc, node.storageLocation, node.typeName.stateMutability, node.name].filter(function (element) {
      return element;
    }));
    return doc;
  }
};
module.exports = Parameter;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    group = _require$doc$builders.group,
    indent = _require$doc$builders.indent,
    join = _require$doc$builders.join,
    line = _require$doc$builders.line,
    softline = _require$doc$builders.softline;

var ParameterList = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;

    // don't insert softlines when there are no parameters
    if (node.parameters.length === 0) {
      return '';
    }

    return group(concat([indent(concat([softline, join(concat([',', line]), path.map(_print, 'parameters'))])), softline]));
  }
};
module.exports = ParameterList;

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    concat = _require.doc.builders.concat;

var semver = __webpack_require__(171);

var PragmaDirective = {
  print: function print(_ref) {
    var node = _ref.node;
    // @TODO: remove hack once solidity-parser-antlr is fixed
    var value = node.value.replace(/([<>=])/g, ' $1').replace(/< =/g, '<=').replace(/> =/g, '>=').trim();

    if (value.split(' ').length > 1) {
      value = semver.validRange(value);
    }

    return concat(['pragma ', node.name, ' ', value, ';']);
  }
};
module.exports = PragmaDirective;

/***/ }),
/* 171 */,
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    group = _require$doc$builders.group,
    indent = _require$doc$builders.indent,
    line = _require$doc$builders.line;

var expression = function expression(node, path, print) {
  if (node.expression) {
    if (node.expression.type === 'TupleExpression') {
      return concat([' ', path.call(print, 'expression')]);
    }

    return group(indent(concat([line, path.call(print, 'expression')])));
  }

  return '';
};

var ReturnStatement = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    return concat(['return', expression(node, path, _print), ';']);
  }
};
module.exports = ReturnStatement;

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    line = _require$doc$builders.line;

var printPreservingEmptyLines = __webpack_require__(24);

var SourceUnit = {
  print: function print(_ref) {
    var options = _ref.options,
        path = _ref.path,
        _print = _ref.print;
    return concat([printPreservingEmptyLines(path, 'children', options, _print), line]);
  }
};
module.exports = SourceUnit;

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    concat = _require.doc.builders.concat;

var StateVariableDeclaration = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    var doc = concat(path.map(function (statementPath) {
      if (!statementPath.getValue()) {
        return ', ';
      }

      return _print(statementPath);
    }, 'variables'));

    if (node.initialValue) {
      doc = concat([doc, ' = ', path.call(_print, 'initialValue')]);
    }

    return concat([doc, ';']);
  }
};
module.exports = StateVariableDeclaration;

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    concat = _require.doc.builders.concat; // @TODO: handle scaping, single/double quotes, etc.


var StringLiteral = {
  print: function print(_ref) {
    var node = _ref.node;
    return concat(['"', node.value, '"']);
  }
};
module.exports = StringLiteral;

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    hardline = _require$doc$builders.hardline,
    indent = _require$doc$builders.indent,
    join = _require$doc$builders.join,
    line = _require$doc$builders.line;

var StructDefinition = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    return concat(['struct ', node.name, ' {', indent(line), indent(join(hardline, path.map(_print, 'members').map(function (element) {
      return concat([element, ';']);
    }))), hardline, '}']);
  }
};
module.exports = StructDefinition;

/***/ }),
/* 177 */
/***/ (function(module, exports) {

var ThrowStatement = {
  print: function print() {
    return 'throw;';
  }
};
module.exports = ThrowStatement;

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    group = _require$doc$builders.group,
    indent = _require$doc$builders.indent,
    join = _require$doc$builders.join,
    line = _require$doc$builders.line,
    softline = _require$doc$builders.softline;

var TupleExpression = {
  // @TODO: remove hack once solidity-parser-antlr is fixed
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    return group(concat([node.isArray ? '[' : '(', indent(concat([softline, join(concat([',', line]), path.map(_print, node.components ? 'components' : 'elements'))])), softline, node.isArray ? ']' : ')']));
  }
};
module.exports = TupleExpression;

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    join = _require$doc$builders.join;

var UnaryOperation = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;

    if (node.isPrefix) {
      if (node.operator === 'delete') {
        return join(' ', [node.operator, path.call(_print, 'subExpression')]);
      }

      return concat([node.operator, path.call(_print, 'subExpression')]);
    }

    return concat([path.call(_print, 'subExpression'), node.operator]);
  }
};
module.exports = UnaryOperation;

/***/ }),
/* 180 */
/***/ (function(module, exports) {

var UserDefinedTypeName = {
  print: function print(_ref) {
    var node = _ref.node;
    return node.namePath;
  }
};
module.exports = UserDefinedTypeName;

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    concat = _require.doc.builders.concat;

var UsingForDeclaration = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;

    if (node.typeName) {
      return concat(['using ', node.libraryName, ' for ', path.call(_print, 'typeName'), ';']);
    }

    return concat(['using ', node.libraryName, ' for *;']);
  }
};
module.exports = UsingForDeclaration;

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    join = _require.doc.builders.join;

var VariableDeclaration = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;

    if (!node.typeName) {
      return node.name;
    }

    var doc = path.call(_print, 'typeName');

    if (node.isIndexed) {
      doc = join(' ', [doc, 'indexed']);
    }

    var constantKeyword = node.isDeclaredConst ? 'constant' : '';

    if (node.visibility === 'default') {
      return join(' ', [doc, node.typeName.stateMutability, constantKeyword, node.name].filter(function (element) {
        return element;
      }));
    }

    return join(' ', [doc, node.typeName.stateMutability, node.visibility, constantKeyword, node.storageLocation, node.name].filter(function (element) {
      return element;
    }));
  }
};
module.exports = VariableDeclaration;

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    join = _require$doc$builders.join;

var VariableDeclarationStatement = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    var startsWithVar = node.variables.filter(function (x) {
      return x && x.typeName;
    }).length === 0;
    var doc = join(', ', path.map(function (statementPath) {
      return _print(statementPath);
    }, 'variables'));

    if (node.variables.length > 1 || startsWithVar) {
      doc = concat(['(', doc, ')']);
    }

    if (node.initialValue) {
      doc = concat([doc, ' = ', path.call(_print, 'initialValue')]);
    }

    return concat([startsWithVar ? 'var ' : '', doc, node.omitSemicolon ? '' : ';']);
  }
};
module.exports = VariableDeclarationStatement;

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    _require$doc$builders = _require.doc.builders,
    concat = _require$doc$builders.concat,
    group = _require$doc$builders.group,
    indent = _require$doc$builders.indent,
    line = _require$doc$builders.line,
    softline = _require$doc$builders.softline;

var printBody = function printBody(node, path, print) {
  if (node.body.type === 'Block') {
    return concat([' ', path.call(print, 'body')]);
  }

  return group(indent(concat([line, path.call(print, 'body')])));
};

var WhileStatement = {
  print: function print(_ref) {
    var node = _ref.node,
        path = _ref.path,
        _print = _ref.print;
    return concat([group(concat(['while (', indent(concat([softline, path.call(_print, 'condition')])), softline, ')'])), printBody(node, path, _print)]);
  }
};
module.exports = WhileStatement;

/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.css
var bootstrap = __webpack_require__(54);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(49);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(17);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(50);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/remix-plugin/dist/index.js
var dist = __webpack_require__(32);

// EXTERNAL MODULE: ./src/prettier/style.css
var style = __webpack_require__(60);

// EXTERNAL MODULE: ./node_modules/prettier/standalone.js
var standalone = __webpack_require__(33);
var standalone_default = /*#__PURE__*/__webpack_require__.n(standalone);

// EXTERNAL MODULE: ./node_modules/prettier/parser-babylon.js
var parser_babylon = __webpack_require__(51);
var parser_babylon_default = /*#__PURE__*/__webpack_require__.n(parser_babylon);

// EXTERNAL MODULE: ../prettier-plugin-solidity/src/index.js
var src = __webpack_require__(52);
var src_default = /*#__PURE__*/__webpack_require__.n(src);

// EXTERNAL MODULE: ./package.json
var package_0 = __webpack_require__(25);

// CONCATENATED MODULE: ./src/PackageDetailView.js
// import packagePrettierInfo from "../node_modules/prettier-plugin-solidity/package.json";
// import packageRemixInfo from "../node_modules/remix-plugin/package.json";
var PackageDetailView_PackageDetailView=function PackageDetailView(){return react_default.a.createElement("div",{className:"jumbotron py-3 mb-0"},react_default.a.createElement("h1",{className:"h5"},package_0.name," ",react_default.a.createElement("small",null,package_0.version)),react_default.a.createElement("p",{className:"lead small"},package_0.description));};/* harmony default export */ var src_PackageDetailView = (PackageDetailView_PackageDetailView);
// CONCATENATED MODULE: ./src/App.js
// import Header from "./Header";
var client=Object(dist["createIframeClient"])({customApi:dist["remixApi"],devMode:{port:8080}});var App_App=function App(){var _useState=Object(react["useState"])(""),_useState2=Object(slicedToArray["a" /* default */])(_useState,2),currentFile=_useState2[0],setCurrentFile=_useState2[1];var _useState3=Object(react["useState"])(80),_useState4=Object(slicedToArray["a" /* default */])(_useState3,2),printWidth=_useState4[0],setPrintWidth=_useState4[1];var _useState5=Object(react["useState"])(4),_useState6=Object(slicedToArray["a" /* default */])(_useState5,2),tabWidth=_useState6[0],setTabWidth=_useState6[1];var _useState7=Object(react["useState"])(false),_useState8=Object(slicedToArray["a" /* default */])(_useState7,2),useTabs=_useState8[0],setUseTabs=_useState8[1];// const [singleQuote, setSingleQuote] = useState(false);
var _useState9=Object(react["useState"])(false),_useState10=Object(slicedToArray["a" /* default */])(_useState9,2),bracketSpacing=_useState10[0],setBracketSpacing=_useState10[1];var _useState11=Object(react["useState"])("always"),_useState12=Object(slicedToArray["a" /* default */])(_useState11,2),explicitTypes=_useState12[0],setExplicitTypes=_useState12[1];var _useState13=Object(react["useState"])(false),_useState14=Object(slicedToArray["a" /* default */])(_useState13,2),spacedExp=_useState14[0],setSpacedExp=_useState14[1];Object(react["useEffect"])(function(){var subscribeToCurrentFile=/*#__PURE__*/function(){var _ref=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee(){return regenerator_default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return client.onload(function(){client.fileManager.on("currentFileChanged",function(fileName){return setCurrentFile(fileName);});});case 2:case"end":return _context.stop();}}},_callee);}));return function subscribeToCurrentFile(){return _ref.apply(this,arguments);};}();subscribeToCurrentFile();},[]);var _onClick=/*#__PURE__*/function(){var _ref2=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee2(){var content,prettified;return regenerator_default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.next=2;return client.call("fileManager","getFile",currentFile);case 2:content=_context2.sent;prettified=standalone_default.a.format(content,{parser:"solidity-parse",plugins:[src_default.a],printWidth:printWidth,tabWidth:tabWidth,useTabs:useTabs,bracketSpacing:bracketSpacing,explicitTypes:explicitTypes,spacedExp:spacedExp});client.fileManager.setFile(currentFile,prettified);case 5:case"end":return _context2.stop();}}},_callee2);}));return function onClick(){return _ref2.apply(this,arguments);};}();return react_default.a.createElement("div",{className:"panels-item"},react_default.a.createElement("section",{className:"section"},react_default.a.createElement(src_PackageDetailView,null)),react_default.a.createElement("section",{className:"section settings-panel p-2"},react_default.a.createElement("div",{className:"button-container"},react_default.a.createElement("form",{className:"form-inline"},react_default.a.createElement("ul",{className:"list-group list-group-flush"},react_default.a.createElement("div",{className:"list-group-item form-group"},react_default.a.createElement("label",{className:"mr-1",htmlFor:"printWidth",title:"The line length where Prettier will try wrap."},"--print-width"),react_default.a.createElement("input",{type:"number",className:"form-control",id:"printWidth",value:printWidth,onChange:function onChange(e){return setPrintWidth(parseInt(e.target.value));}})),react_default.a.createElement("div",{className:"list-group-item form-group"},react_default.a.createElement("label",{className:"mr-1",htmlFor:"tabWidth",title:"Number of spaces per indentation level."},"--tab-width"),react_default.a.createElement("input",{type:"number",className:"form-control",id:"tabWidth",value:tabWidth,onChange:function onChange(e){return setTabWidth(parseInt(e.target.value));}})),react_default.a.createElement("div",{className:"list-group-item form-group"},react_default.a.createElement("div",{className:"checkbox"},react_default.a.createElement("label",{className:"form-check-label",title:"Indent with tabs instead of spaces."},react_default.a.createElement("input",{type:"checkbox",id:"useTabs",className:"form-check-input",checked:useTabs,onChange:function onChange(){return setUseTabs(!useTabs);}}),"--use-tabs"))),react_default.a.createElement("div",{className:"list-group-item form-group"},react_default.a.createElement("div",{className:"checkbox"},react_default.a.createElement("label",{className:"form-check-label",title:"Do not print spaces between brackets."},react_default.a.createElement("input",{type:"checkbox",id:"bracketSpacing",className:"form-check-input",checked:!bracketSpacing,onChange:function onChange(){return setBracketSpacing(!bracketSpacing);}}),"--no-bracket-spacing"))),react_default.a.createElement("div",{className:"list-group-item form-group"},react_default.a.createElement("label",{htmlFor:"explicitTypes",title:"Change when type aliases are used."},"--explicit-types"),react_default.a.createElement("select",{className:"form-control",id:"explicitTypes",value:explicitTypes,onChange:function onChange(e){return setExplicitTypes(e.target.value);}},react_default.a.createElement("option",{value:"always",title:"Prefer the explicit types `uint256`, `int256`, and `bytes1`."},"Always"),react_default.a.createElement("option",{value:"never",title:"Prefer the type aliases `uint`, `int`, and `byte`."},"Never"),react_default.a.createElement("option",{value:"preserve",title:"Respect the type used by the developer."},"Preserve"))),react_default.a.createElement("div",{className:"list-group-item form-group"},react_default.a.createElement("div",{className:"checkbox"},react_default.a.createElement("label",{className:"form-check-label"},react_default.a.createElement("input",{type:"checkbox",id:"spacedExp",className:"form-check-input",checked:spacedExp,onChange:function onChange(){return setSpacedExp(!spacedExp);}}),"--spaced-exp"))),react_default.a.createElement("div",{className:"list-group-item form-group"},react_default.a.createElement("a",{title:"To use in your projects.",className:"btn btn-primary btn-block",href:URL.createObjectURL(new Blob([standalone_default.a.format("// https://prettier.io/docs/en/configuration.html\nmodule.exports = {\n  // Global configuration\n  printWidth: ".concat(JSON.stringify(printWidth),",\n  tabWidth: ").concat(JSON.stringify(tabWidth),",\n  useTabs: ").concat(JSON.stringify(useTabs),",\n  // Common configuration\n  bracketSpacing: ").concat(JSON.stringify(bracketSpacing),",\n  // Solidity configuration\n  explicitTypes: ").concat(JSON.stringify(explicitTypes),",\n  spacedExp: ").concat(JSON.stringify(spacedExp),"\n}"),{parser:"babel",plugins:[parser_babylon_default.a]})],{type:"application/javascript"})),download:"prettier.config.js"},react_default.a.createElement("span",null,"Download configuration"))),react_default.a.createElement("div",{className:"list-group-item form-group"},react_default.a.createElement("button",{title:"Prettify",className:classnames_default()("btn","btn-primary","btn-block",{disabled:currentFile.length===0}),onClick:function onClick(event){event.preventDefault();_onClick();},disabled:currentFile.length===0},react_default.a.createElement("span",null,react_default.a.createElement("span",{className:"icon-prettier"})," Prettify"," ",currentFile.length?currentFile:"<no file selected>"))))))));};/* harmony default export */ var src_App = (App_App);
// CONCATENATED MODULE: ./src/serviceWorker.js
// This optional code is used to register a service worker.
// register() is not called by default.
// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.
// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA
var isLocalhost=Boolean(window.location.hostname==="localhost"||// [::1] is the IPv6 localhost address.
window.location.hostname==="[::1]"||// 127.0.0.1/8 is considered localhost for IPv4.
window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function register(config){if( true&&"serviceWorker"in navigator){// The URL constructor is available in all browsers that support SW.
var publicUrl=new URL("",window.location.href);if(publicUrl.origin!==window.location.origin){// Our service worker won't work if PUBLIC_URL is on a different origin
// from what our page is served on. This might happen if a CDN is used to
// serve assets; see https://github.com/facebook/create-react-app/issues/2374
return;}window.addEventListener("load",function(){var swUrl="".concat("","/service-worker.js");if(isLocalhost){// This is running on localhost. Let's check if a service worker still exists or not.
checkValidServiceWorker(swUrl,config);// Add some additional logging to localhost, pointing developers to the
// service worker/PWA documentation.
navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service "+"worker. To learn more, visit https://bit.ly/CRA-PWA");});}else{// Is not localhost. Just register service worker
registerValidSW(swUrl,config);}});}}function registerValidSW(swUrl,config){navigator.serviceWorker.register(swUrl).then(function(registration){registration.onupdatefound=function(){var installingWorker=registration.installing;if(installingWorker==null){return;}installingWorker.onstatechange=function(){if(installingWorker.state==="installed"){if(navigator.serviceWorker.controller){// At this point, the updated precached content has been fetched,
// but the previous service worker will still serve the older
// content until all client tabs are closed.
console.log("New content is available and will be used when all "+"tabs for this page are closed. See https://bit.ly/CRA-PWA.");// Execute callback
if(config&&config.onUpdate){config.onUpdate(registration);}}else{// At this point, everything has been precached.
// It's the perfect time to display a
// "Content is cached for offline use." message.
console.log("Content is cached for offline use.");// Execute callback
if(config&&config.onSuccess){config.onSuccess(registration);}}}};};}).catch(function(error){console.error("Error during service worker registration:",error);});}function checkValidServiceWorker(swUrl,config){// Check if the service worker can be found. If it can't reload the page.
fetch(swUrl).then(function(response){// Ensure service worker exists, and that we really are getting a JS file.
var contentType=response.headers.get("content-type");if(response.status===404||contentType!=null&&contentType.indexOf("javascript")===-1){// No service worker found. Probably a different app. Reload the page.
navigator.serviceWorker.ready.then(function(registration){registration.unregister().then(function(){window.location.reload();});});}else{// Service worker found. Proceed as normal.
registerValidSW(swUrl,config);}}).catch(function(){console.log("No internet connection found. App is running in offline mode.");});}function unregister(){if("serviceWorker"in navigator){navigator.serviceWorker.ready.then(function(registration){registration.unregister();});}}
// CONCATENATED MODULE: ./src/index.js
react_dom_default.a.render(react_default.a.createElement(src_App,null),document.getElementById("root"));// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();

/***/ })
],[[53,1,2]]]);
//# sourceMappingURL=main.3d02f772.chunk.js.map