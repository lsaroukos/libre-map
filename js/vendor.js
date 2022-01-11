function abstract() {
    return function() {
      throw new Error("Unimplemented abstract method.");
    }();
  }
  var uidCounter_ = 0;
  function getUid(obj) {
    return obj.ol_uid || (obj.ol_uid = String(++uidCounter_));
  }
  var VERSION = "6.9.0";
  var __extends$1a = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var AssertionError = function(_super) {
    __extends$1a(AssertionError2, _super);
    function AssertionError2(code) {
      var _this = this;
      var path = "v" + VERSION.split("-")[0];
      var message = "Assertion failed. See https://openlayers.org/en/" + path + "/doc/errors/#" + code + " for details.";
      _this = _super.call(this, message) || this;
      _this.code = code;
      _this.name = "AssertionError";
      _this.message = message;
      return _this;
    }
    return AssertionError2;
  }(Error);
  var AssertionError$1 = AssertionError;
  var BaseEvent = function() {
    function BaseEvent2(type) {
      this.propagationStopped;
      this.defaultPrevented;
      this.type = type;
      this.target = null;
    }
    BaseEvent2.prototype.preventDefault = function() {
      this.defaultPrevented = true;
    };
    BaseEvent2.prototype.stopPropagation = function() {
      this.propagationStopped = true;
    };
    return BaseEvent2;
  }();
  var Event = BaseEvent;
  var ObjectEventType = {
    PROPERTYCHANGE: "propertychange"
  };
  var Disposable = function() {
    function Disposable2() {
      this.disposed = false;
    }
    Disposable2.prototype.dispose = function() {
      if (!this.disposed) {
        this.disposed = true;
        this.disposeInternal();
      }
    };
    Disposable2.prototype.disposeInternal = function() {
    };
    return Disposable2;
  }();
  var Disposable$1 = Disposable;
  function numberSafeCompareFunction(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }
  function linearFindNearest(arr, target, direction) {
    var n = arr.length;
    if (arr[0] <= target) {
      return 0;
    } else if (target <= arr[n - 1]) {
      return n - 1;
    } else {
      var i = void 0;
      if (direction > 0) {
        for (i = 1; i < n; ++i) {
          if (arr[i] < target) {
            return i - 1;
          }
        }
      } else if (direction < 0) {
        for (i = 1; i < n; ++i) {
          if (arr[i] <= target) {
            return i;
          }
        }
      } else {
        for (i = 1; i < n; ++i) {
          if (arr[i] == target) {
            return i;
          } else if (arr[i] < target) {
            if (typeof direction === "function") {
              if (direction(target, arr[i - 1], arr[i]) > 0) {
                return i - 1;
              } else {
                return i;
              }
            } else if (arr[i - 1] - target < target - arr[i]) {
              return i - 1;
            } else {
              return i;
            }
          }
        }
      }
      return n - 1;
    }
  }
  function reverseSubArray(arr, begin, end) {
    while (begin < end) {
      var tmp = arr[begin];
      arr[begin] = arr[end];
      arr[end] = tmp;
      ++begin;
      --end;
    }
  }
  function extend$2(arr, data) {
    var extension = Array.isArray(data) ? data : [data];
    var length = extension.length;
    for (var i = 0; i < length; i++) {
      arr[arr.length] = extension[i];
    }
  }
  function equals$2(arr1, arr2) {
    var len1 = arr1.length;
    if (len1 !== arr2.length) {
      return false;
    }
    for (var i = 0; i < len1; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
  function isSorted(arr, opt_func, opt_strict) {
    var compare = opt_func || numberSafeCompareFunction;
    return arr.every(function(currentVal, index) {
      if (index === 0) {
        return true;
      }
      var res = compare(arr[index - 1], currentVal);
      return !(res > 0 || opt_strict && res === 0);
    });
  }
  function TRUE() {
    return true;
  }
  function FALSE() {
    return false;
  }
  function VOID() {
  }
  function memoizeOne(fn) {
    var called = false;
    var lastResult;
    var lastArgs;
    var lastThis;
    return function() {
      var nextArgs = Array.prototype.slice.call(arguments);
      if (!called || this !== lastThis || !equals$2(nextArgs, lastArgs)) {
        called = true;
        lastThis = this;
        lastArgs = nextArgs;
        lastResult = fn.apply(this, arguments);
      }
      return lastResult;
    };
  }
  var assign = typeof Object.assign === "function" ? Object.assign : function(target, var_sources) {
    if (target === void 0 || target === null) {
      throw new TypeError("Cannot convert undefined or null to object");
    }
    var output = Object(target);
    for (var i = 1, ii = arguments.length; i < ii; ++i) {
      var source = arguments[i];
      if (source !== void 0 && source !== null) {
        for (var key in source) {
          if (source.hasOwnProperty(key)) {
            output[key] = source[key];
          }
        }
      }
    }
    return output;
  };
  function clear(object) {
    for (var property in object) {
      delete object[property];
    }
  }
  var getValues = typeof Object.values === "function" ? Object.values : function(object) {
    var values = [];
    for (var property in object) {
      values.push(object[property]);
    }
    return values;
  };
  function isEmpty$1(object) {
    var property;
    for (property in object) {
      return false;
    }
    return !property;
  }
  var __extends$19 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Target = function(_super) {
    __extends$19(Target2, _super);
    function Target2(opt_target) {
      var _this = _super.call(this) || this;
      _this.eventTarget_ = opt_target;
      _this.pendingRemovals_ = null;
      _this.dispatching_ = null;
      _this.listeners_ = null;
      return _this;
    }
    Target2.prototype.addEventListener = function(type, listener) {
      if (!type || !listener) {
        return;
      }
      var listeners = this.listeners_ || (this.listeners_ = {});
      var listenersForType = listeners[type] || (listeners[type] = []);
      if (listenersForType.indexOf(listener) === -1) {
        listenersForType.push(listener);
      }
    };
    Target2.prototype.dispatchEvent = function(event) {
      var evt = typeof event === "string" ? new Event(event) : event;
      var type = evt.type;
      if (!evt.target) {
        evt.target = this.eventTarget_ || this;
      }
      var listeners = this.listeners_ && this.listeners_[type];
      var propagate;
      if (listeners) {
        var dispatching = this.dispatching_ || (this.dispatching_ = {});
        var pendingRemovals = this.pendingRemovals_ || (this.pendingRemovals_ = {});
        if (!(type in dispatching)) {
          dispatching[type] = 0;
          pendingRemovals[type] = 0;
        }
        ++dispatching[type];
        for (var i = 0, ii = listeners.length; i < ii; ++i) {
          if ("handleEvent" in listeners[i]) {
            propagate = listeners[i].handleEvent(evt);
          } else {
            propagate = listeners[i].call(this, evt);
          }
          if (propagate === false || evt.propagationStopped) {
            propagate = false;
            break;
          }
        }
        --dispatching[type];
        if (dispatching[type] === 0) {
          var pr = pendingRemovals[type];
          delete pendingRemovals[type];
          while (pr--) {
            this.removeEventListener(type, VOID);
          }
          delete dispatching[type];
        }
        return propagate;
      }
    };
    Target2.prototype.disposeInternal = function() {
      this.listeners_ && clear(this.listeners_);
    };
    Target2.prototype.getListeners = function(type) {
      return this.listeners_ && this.listeners_[type] || void 0;
    };
    Target2.prototype.hasListener = function(opt_type) {
      if (!this.listeners_) {
        return false;
      }
      return opt_type ? opt_type in this.listeners_ : Object.keys(this.listeners_).length > 0;
    };
    Target2.prototype.removeEventListener = function(type, listener) {
      var listeners = this.listeners_ && this.listeners_[type];
      if (listeners) {
        var index = listeners.indexOf(listener);
        if (index !== -1) {
          if (this.pendingRemovals_ && type in this.pendingRemovals_) {
            listeners[index] = VOID;
            ++this.pendingRemovals_[type];
          } else {
            listeners.splice(index, 1);
            if (listeners.length === 0) {
              delete this.listeners_[type];
            }
          }
        }
      }
    };
    return Target2;
  }(Disposable$1);
  var Target$1 = Target;
  var EventType = {
    CHANGE: "change",
    ERROR: "error",
    BLUR: "blur",
    CLEAR: "clear",
    CONTEXTMENU: "contextmenu",
    CLICK: "click",
    DBLCLICK: "dblclick",
    DRAGENTER: "dragenter",
    DRAGOVER: "dragover",
    DROP: "drop",
    FOCUS: "focus",
    KEYDOWN: "keydown",
    KEYPRESS: "keypress",
    LOAD: "load",
    RESIZE: "resize",
    TOUCHMOVE: "touchmove",
    WHEEL: "wheel"
  };
  function listen(target, type, listener, opt_this, opt_once) {
    if (opt_this && opt_this !== target) {
      listener = listener.bind(opt_this);
    }
    if (opt_once) {
      var originalListener_1 = listener;
      listener = function() {
        target.removeEventListener(type, listener);
        originalListener_1.apply(this, arguments);
      };
    }
    var eventsKey = {
      target,
      type,
      listener
    };
    target.addEventListener(type, listener);
    return eventsKey;
  }
  function listenOnce(target, type, listener, opt_this) {
    return listen(target, type, listener, opt_this, true);
  }
  function unlistenByKey(key) {
    if (key && key.target) {
      key.target.removeEventListener(key.type, key.listener);
      clear(key);
    }
  }
  var __extends$18 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Observable = function(_super) {
    __extends$18(Observable2, _super);
    function Observable2() {
      var _this = _super.call(this) || this;
      _this.on = _this.onInternal;
      _this.once = _this.onceInternal;
      _this.un = _this.unInternal;
      _this.revision_ = 0;
      return _this;
    }
    Observable2.prototype.changed = function() {
      ++this.revision_;
      this.dispatchEvent(EventType.CHANGE);
    };
    Observable2.prototype.getRevision = function() {
      return this.revision_;
    };
    Observable2.prototype.onInternal = function(type, listener) {
      if (Array.isArray(type)) {
        var len = type.length;
        var keys = new Array(len);
        for (var i = 0; i < len; ++i) {
          keys[i] = listen(this, type[i], listener);
        }
        return keys;
      } else {
        return listen(this, type, listener);
      }
    };
    Observable2.prototype.onceInternal = function(type, listener) {
      var key;
      if (Array.isArray(type)) {
        var len = type.length;
        key = new Array(len);
        for (var i = 0; i < len; ++i) {
          key[i] = listenOnce(this, type[i], listener);
        }
      } else {
        key = listenOnce(this, type, listener);
      }
      listener.ol_key = key;
      return key;
    };
    Observable2.prototype.unInternal = function(type, listener) {
      var key = listener.ol_key;
      if (key) {
        unByKey(key);
      } else if (Array.isArray(type)) {
        for (var i = 0, ii = type.length; i < ii; ++i) {
          this.removeEventListener(type[i], listener);
        }
      } else {
        this.removeEventListener(type, listener);
      }
    };
    return Observable2;
  }(Target$1);
  Observable.prototype.on;
  Observable.prototype.once;
  Observable.prototype.un;
  function unByKey(key) {
    if (Array.isArray(key)) {
      for (var i = 0, ii = key.length; i < ii; ++i) {
        unlistenByKey(key[i]);
      }
    } else {
      unlistenByKey(key);
    }
  }
  var Observable$1 = Observable;
  var __extends$17 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var ObjectEvent = function(_super) {
    __extends$17(ObjectEvent2, _super);
    function ObjectEvent2(type, key, oldValue) {
      var _this = _super.call(this, type) || this;
      _this.key = key;
      _this.oldValue = oldValue;
      return _this;
    }
    return ObjectEvent2;
  }(Event);
  var BaseObject = function(_super) {
    __extends$17(BaseObject2, _super);
    function BaseObject2(opt_values) {
      var _this = _super.call(this) || this;
      _this.on;
      _this.once;
      _this.un;
      getUid(_this);
      _this.values_ = null;
      if (opt_values !== void 0) {
        _this.setProperties(opt_values);
      }
      return _this;
    }
    BaseObject2.prototype.get = function(key) {
      var value;
      if (this.values_ && this.values_.hasOwnProperty(key)) {
        value = this.values_[key];
      }
      return value;
    };
    BaseObject2.prototype.getKeys = function() {
      return this.values_ && Object.keys(this.values_) || [];
    };
    BaseObject2.prototype.getProperties = function() {
      return this.values_ && assign({}, this.values_) || {};
    };
    BaseObject2.prototype.hasProperties = function() {
      return !!this.values_;
    };
    BaseObject2.prototype.notify = function(key, oldValue) {
      var eventType;
      eventType = "change:" + key;
      this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
      eventType = ObjectEventType.PROPERTYCHANGE;
      this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
    };
    BaseObject2.prototype.addChangeListener = function(key, listener) {
      this.addEventListener("change:" + key, listener);
    };
    BaseObject2.prototype.removeChangeListener = function(key, listener) {
      this.removeEventListener("change:" + key, listener);
    };
    BaseObject2.prototype.set = function(key, value, opt_silent) {
      var values = this.values_ || (this.values_ = {});
      if (opt_silent) {
        values[key] = value;
      } else {
        var oldValue = values[key];
        values[key] = value;
        if (oldValue !== value) {
          this.notify(key, oldValue);
        }
      }
    };
    BaseObject2.prototype.setProperties = function(values, opt_silent) {
      for (var key in values) {
        this.set(key, values[key], opt_silent);
      }
    };
    BaseObject2.prototype.applyProperties = function(source) {
      if (!source.values_) {
        return;
      }
      assign(this.values_ || (this.values_ = {}), source.values_);
    };
    BaseObject2.prototype.unset = function(key, opt_silent) {
      if (this.values_ && key in this.values_) {
        var oldValue = this.values_[key];
        delete this.values_[key];
        if (isEmpty$1(this.values_)) {
          this.values_ = null;
        }
        if (!opt_silent) {
          this.notify(key, oldValue);
        }
      }
    };
    return BaseObject2;
  }(Observable$1);
  var BaseObject$1 = BaseObject;
  var CollectionEventType = {
    ADD: "add",
    REMOVE: "remove"
  };
  var __extends$16 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Property$3 = {
    LENGTH: "length"
  };
  var CollectionEvent = function(_super) {
    __extends$16(CollectionEvent2, _super);
    function CollectionEvent2(type, opt_element, opt_index) {
      var _this = _super.call(this, type) || this;
      _this.element = opt_element;
      _this.index = opt_index;
      return _this;
    }
    return CollectionEvent2;
  }(Event);
  var Collection = function(_super) {
    __extends$16(Collection2, _super);
    function Collection2(opt_array, opt_options) {
      var _this = _super.call(this) || this;
      _this.on;
      _this.once;
      _this.un;
      var options = opt_options || {};
      _this.unique_ = !!options.unique;
      _this.array_ = opt_array ? opt_array : [];
      if (_this.unique_) {
        for (var i = 0, ii = _this.array_.length; i < ii; ++i) {
          _this.assertUnique_(_this.array_[i], i);
        }
      }
      _this.updateLength_();
      return _this;
    }
    Collection2.prototype.clear = function() {
      while (this.getLength() > 0) {
        this.pop();
      }
    };
    Collection2.prototype.extend = function(arr) {
      for (var i = 0, ii = arr.length; i < ii; ++i) {
        this.push(arr[i]);
      }
      return this;
    };
    Collection2.prototype.forEach = function(f) {
      var array = this.array_;
      for (var i = 0, ii = array.length; i < ii; ++i) {
        f(array[i], i, array);
      }
    };
    Collection2.prototype.getArray = function() {
      return this.array_;
    };
    Collection2.prototype.item = function(index) {
      return this.array_[index];
    };
    Collection2.prototype.getLength = function() {
      return this.get(Property$3.LENGTH);
    };
    Collection2.prototype.insertAt = function(index, elem) {
      if (this.unique_) {
        this.assertUnique_(elem);
      }
      this.array_.splice(index, 0, elem);
      this.updateLength_();
      this.dispatchEvent(new CollectionEvent(CollectionEventType.ADD, elem, index));
    };
    Collection2.prototype.pop = function() {
      return this.removeAt(this.getLength() - 1);
    };
    Collection2.prototype.push = function(elem) {
      if (this.unique_) {
        this.assertUnique_(elem);
      }
      var n = this.getLength();
      this.insertAt(n, elem);
      return this.getLength();
    };
    Collection2.prototype.remove = function(elem) {
      var arr = this.array_;
      for (var i = 0, ii = arr.length; i < ii; ++i) {
        if (arr[i] === elem) {
          return this.removeAt(i);
        }
      }
      return void 0;
    };
    Collection2.prototype.removeAt = function(index) {
      var prev = this.array_[index];
      this.array_.splice(index, 1);
      this.updateLength_();
      this.dispatchEvent(new CollectionEvent(CollectionEventType.REMOVE, prev, index));
      return prev;
    };
    Collection2.prototype.setAt = function(index, elem) {
      var n = this.getLength();
      if (index < n) {
        if (this.unique_) {
          this.assertUnique_(elem, index);
        }
        var prev = this.array_[index];
        this.array_[index] = elem;
        this.dispatchEvent(new CollectionEvent(CollectionEventType.REMOVE, prev, index));
        this.dispatchEvent(new CollectionEvent(CollectionEventType.ADD, elem, index));
      } else {
        for (var j = n; j < index; ++j) {
          this.insertAt(j, void 0);
        }
        this.insertAt(index, elem);
      }
    };
    Collection2.prototype.updateLength_ = function() {
      this.set(Property$3.LENGTH, this.array_.length);
    };
    Collection2.prototype.assertUnique_ = function(elem, opt_except) {
      for (var i = 0, ii = this.array_.length; i < ii; ++i) {
        if (this.array_[i] === elem && i !== opt_except) {
          throw new AssertionError$1(58);
        }
      }
    };
    return Collection2;
  }(BaseObject$1);
  var Collection$1 = Collection;
  function assert(assertion, errorCode) {
    if (!assertion) {
      throw new AssertionError$1(errorCode);
    }
  }
  var __extends$15 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Feature = function(_super) {
    __extends$15(Feature2, _super);
    function Feature2(opt_geometryOrProperties) {
      var _this = _super.call(this) || this;
      _this.on;
      _this.once;
      _this.un;
      _this.id_ = void 0;
      _this.geometryName_ = "geometry";
      _this.style_ = null;
      _this.styleFunction_ = void 0;
      _this.geometryChangeKey_ = null;
      _this.addChangeListener(_this.geometryName_, _this.handleGeometryChanged_);
      if (opt_geometryOrProperties) {
        if (typeof opt_geometryOrProperties.getSimplifiedGeometry === "function") {
          var geometry = opt_geometryOrProperties;
          _this.setGeometry(geometry);
        } else {
          var properties = opt_geometryOrProperties;
          _this.setProperties(properties);
        }
      }
      return _this;
    }
    Feature2.prototype.clone = function() {
      var clone2 = new Feature2(this.hasProperties() ? this.getProperties() : null);
      clone2.setGeometryName(this.getGeometryName());
      var geometry = this.getGeometry();
      if (geometry) {
        clone2.setGeometry(geometry.clone());
      }
      var style = this.getStyle();
      if (style) {
        clone2.setStyle(style);
      }
      return clone2;
    };
    Feature2.prototype.getGeometry = function() {
      return this.get(this.geometryName_);
    };
    Feature2.prototype.getId = function() {
      return this.id_;
    };
    Feature2.prototype.getGeometryName = function() {
      return this.geometryName_;
    };
    Feature2.prototype.getStyle = function() {
      return this.style_;
    };
    Feature2.prototype.getStyleFunction = function() {
      return this.styleFunction_;
    };
    Feature2.prototype.handleGeometryChange_ = function() {
      this.changed();
    };
    Feature2.prototype.handleGeometryChanged_ = function() {
      if (this.geometryChangeKey_) {
        unlistenByKey(this.geometryChangeKey_);
        this.geometryChangeKey_ = null;
      }
      var geometry = this.getGeometry();
      if (geometry) {
        this.geometryChangeKey_ = listen(geometry, EventType.CHANGE, this.handleGeometryChange_, this);
      }
      this.changed();
    };
    Feature2.prototype.setGeometry = function(geometry) {
      this.set(this.geometryName_, geometry);
    };
    Feature2.prototype.setStyle = function(opt_style) {
      this.style_ = opt_style;
      this.styleFunction_ = !opt_style ? void 0 : createStyleFunction(opt_style);
      this.changed();
    };
    Feature2.prototype.setId = function(id) {
      this.id_ = id;
      this.changed();
    };
    Feature2.prototype.setGeometryName = function(name) {
      this.removeChangeListener(this.geometryName_, this.handleGeometryChanged_);
      this.geometryName_ = name;
      this.addChangeListener(this.geometryName_, this.handleGeometryChanged_);
      this.handleGeometryChanged_();
    };
    return Feature2;
  }(BaseObject$1);
  function createStyleFunction(obj) {
    if (typeof obj === "function") {
      return obj;
    } else {
      var styles_1;
      if (Array.isArray(obj)) {
        styles_1 = obj;
      } else {
        assert(typeof obj.getZIndex === "function", 41);
        var style = obj;
        styles_1 = [style];
      }
      return function() {
        return styles_1;
      };
    }
  }
  var Feature$1 = Feature;
  var GeometryLayout = {
    XY: "XY",
    XYZ: "XYZ",
    XYM: "XYM",
    XYZM: "XYZM"
  };
  var GeometryType = {
    POINT: "Point",
    LINE_STRING: "LineString",
    LINEAR_RING: "LinearRing",
    POLYGON: "Polygon",
    MULTI_POINT: "MultiPoint",
    MULTI_LINE_STRING: "MultiLineString",
    MULTI_POLYGON: "MultiPolygon",
    GEOMETRY_COLLECTION: "GeometryCollection",
    CIRCLE: "Circle"
  };
  var Units = {
    RADIANS: "radians",
    DEGREES: "degrees",
    FEET: "ft",
    METERS: "m",
    PIXELS: "pixels",
    TILE_PIXELS: "tile-pixels",
    USFEET: "us-ft"
  };
  var METERS_PER_UNIT$1 = {};
  METERS_PER_UNIT$1[Units.RADIANS] = 6370997 / (2 * Math.PI);
  METERS_PER_UNIT$1[Units.DEGREES] = 2 * Math.PI * 6370997 / 360;
  METERS_PER_UNIT$1[Units.FEET] = 0.3048;
  METERS_PER_UNIT$1[Units.METERS] = 1;
  METERS_PER_UNIT$1[Units.USFEET] = 1200 / 3937;
  var Units$1 = Units;
  var ua = typeof navigator !== "undefined" && typeof navigator.userAgent !== "undefined" ? navigator.userAgent.toLowerCase() : "";
  var FIREFOX = ua.indexOf("firefox") !== -1;
  ua.indexOf("safari") !== -1 && ua.indexOf("chrom") == -1;
  var WEBKIT = ua.indexOf("webkit") !== -1 && ua.indexOf("edge") == -1;
  var MAC = ua.indexOf("macintosh") !== -1;
  var DEVICE_PIXEL_RATIO = typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1;
  var WORKER_OFFSCREEN_CANVAS = typeof WorkerGlobalScope !== "undefined" && typeof OffscreenCanvas !== "undefined" && self instanceof WorkerGlobalScope;
  var IMAGE_DECODE = typeof Image !== "undefined" && Image.prototype.decode;
  var PASSIVE_EVENT_LISTENERS = function() {
    var passive = false;
    try {
      var options = Object.defineProperty({}, "passive", {
        get: function() {
          passive = true;
        }
      });
      window.addEventListener("_", null, options);
      window.removeEventListener("_", null, options);
    } catch (error) {
    }
    return passive;
  }();
  new Array(6);
  function create() {
    return [1, 0, 0, 1, 0, 0];
  }
  function set(transform2, a, b, c, d, e, f) {
    transform2[0] = a;
    transform2[1] = b;
    transform2[2] = c;
    transform2[3] = d;
    transform2[4] = e;
    transform2[5] = f;
    return transform2;
  }
  function setFromArray(transform1, transform2) {
    transform1[0] = transform2[0];
    transform1[1] = transform2[1];
    transform1[2] = transform2[2];
    transform1[3] = transform2[3];
    transform1[4] = transform2[4];
    transform1[5] = transform2[5];
    return transform1;
  }
  function apply(transform2, coordinate) {
    var x = coordinate[0];
    var y = coordinate[1];
    coordinate[0] = transform2[0] * x + transform2[2] * y + transform2[4];
    coordinate[1] = transform2[1] * x + transform2[3] * y + transform2[5];
    return coordinate;
  }
  function makeScale(target, x, y) {
    return set(target, x, 0, 0, y, 0, 0);
  }
  function compose(transform2, dx1, dy1, sx, sy, angle, dx2, dy2) {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    transform2[0] = sx * cos;
    transform2[1] = sy * sin;
    transform2[2] = -sx * sin;
    transform2[3] = sy * cos;
    transform2[4] = dx2 * sx * cos - dy2 * sx * sin + dx1;
    transform2[5] = dx2 * sy * sin + dy2 * sy * cos + dy1;
    return transform2;
  }
  function makeInverse(target, source) {
    var det = determinant(source);
    assert(det !== 0, 32);
    var a = source[0];
    var b = source[1];
    var c = source[2];
    var d = source[3];
    var e = source[4];
    var f = source[5];
    target[0] = d / det;
    target[1] = -b / det;
    target[2] = -c / det;
    target[3] = a / det;
    target[4] = (c * f - d * e) / det;
    target[5] = -(a * f - b * e) / det;
    return target;
  }
  function determinant(mat) {
    return mat[0] * mat[3] - mat[1] * mat[2];
  }
  var transformStringDiv;
  function toString$1(mat) {
    var transformString = "matrix(" + mat.join(", ") + ")";
    if (WORKER_OFFSCREEN_CANVAS) {
      return transformString;
    }
    var node = transformStringDiv || (transformStringDiv = document.createElement("div"));
    node.style.transform = transformString;
    return node.style.transform;
  }
  var Corner = {
    BOTTOM_LEFT: "bottom-left",
    BOTTOM_RIGHT: "bottom-right",
    TOP_LEFT: "top-left",
    TOP_RIGHT: "top-right"
  };
  var Relationship = {
    UNKNOWN: 0,
    INTERSECTING: 1,
    ABOVE: 2,
    RIGHT: 4,
    BELOW: 8,
    LEFT: 16
  };
  function boundingExtent(coordinates2) {
    var extent = createEmpty();
    for (var i = 0, ii = coordinates2.length; i < ii; ++i) {
      extendCoordinate(extent, coordinates2[i]);
    }
    return extent;
  }
  function buffer(extent, value, opt_extent) {
    if (opt_extent) {
      opt_extent[0] = extent[0] - value;
      opt_extent[1] = extent[1] - value;
      opt_extent[2] = extent[2] + value;
      opt_extent[3] = extent[3] + value;
      return opt_extent;
    } else {
      return [
        extent[0] - value,
        extent[1] - value,
        extent[2] + value,
        extent[3] + value
      ];
    }
  }
  function clone(extent, opt_extent) {
    if (opt_extent) {
      opt_extent[0] = extent[0];
      opt_extent[1] = extent[1];
      opt_extent[2] = extent[2];
      opt_extent[3] = extent[3];
      return opt_extent;
    } else {
      return extent.slice();
    }
  }
  function closestSquaredDistanceXY(extent, x, y) {
    var dx, dy;
    if (x < extent[0]) {
      dx = extent[0] - x;
    } else if (extent[2] < x) {
      dx = x - extent[2];
    } else {
      dx = 0;
    }
    if (y < extent[1]) {
      dy = extent[1] - y;
    } else if (extent[3] < y) {
      dy = y - extent[3];
    } else {
      dy = 0;
    }
    return dx * dx + dy * dy;
  }
  function containsCoordinate(extent, coordinate) {
    return containsXY(extent, coordinate[0], coordinate[1]);
  }
  function containsExtent(extent1, extent2) {
    return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
  }
  function containsXY(extent, x, y) {
    return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
  }
  function coordinateRelationship(extent, coordinate) {
    var minX = extent[0];
    var minY = extent[1];
    var maxX = extent[2];
    var maxY = extent[3];
    var x = coordinate[0];
    var y = coordinate[1];
    var relationship = Relationship.UNKNOWN;
    if (x < minX) {
      relationship = relationship | Relationship.LEFT;
    } else if (x > maxX) {
      relationship = relationship | Relationship.RIGHT;
    }
    if (y < minY) {
      relationship = relationship | Relationship.BELOW;
    } else if (y > maxY) {
      relationship = relationship | Relationship.ABOVE;
    }
    if (relationship === Relationship.UNKNOWN) {
      relationship = Relationship.INTERSECTING;
    }
    return relationship;
  }
  function createEmpty() {
    return [Infinity, Infinity, -Infinity, -Infinity];
  }
  function createOrUpdate$2(minX, minY, maxX, maxY, opt_extent) {
    if (opt_extent) {
      opt_extent[0] = minX;
      opt_extent[1] = minY;
      opt_extent[2] = maxX;
      opt_extent[3] = maxY;
      return opt_extent;
    } else {
      return [minX, minY, maxX, maxY];
    }
  }
  function createOrUpdateEmpty(opt_extent) {
    return createOrUpdate$2(Infinity, Infinity, -Infinity, -Infinity, opt_extent);
  }
  function createOrUpdateFromCoordinate(coordinate, opt_extent) {
    var x = coordinate[0];
    var y = coordinate[1];
    return createOrUpdate$2(x, y, x, y, opt_extent);
  }
  function createOrUpdateFromFlatCoordinates(flatCoordinates, offset, end, stride, opt_extent) {
    var extent = createOrUpdateEmpty(opt_extent);
    return extendFlatCoordinates(extent, flatCoordinates, offset, end, stride);
  }
  function equals$1(extent1, extent2) {
    return extent1[0] == extent2[0] && extent1[2] == extent2[2] && extent1[1] == extent2[1] && extent1[3] == extent2[3];
  }
  function extend$1(extent1, extent2) {
    if (extent2[0] < extent1[0]) {
      extent1[0] = extent2[0];
    }
    if (extent2[2] > extent1[2]) {
      extent1[2] = extent2[2];
    }
    if (extent2[1] < extent1[1]) {
      extent1[1] = extent2[1];
    }
    if (extent2[3] > extent1[3]) {
      extent1[3] = extent2[3];
    }
    return extent1;
  }
  function extendCoordinate(extent, coordinate) {
    if (coordinate[0] < extent[0]) {
      extent[0] = coordinate[0];
    }
    if (coordinate[0] > extent[2]) {
      extent[2] = coordinate[0];
    }
    if (coordinate[1] < extent[1]) {
      extent[1] = coordinate[1];
    }
    if (coordinate[1] > extent[3]) {
      extent[3] = coordinate[1];
    }
  }
  function extendFlatCoordinates(extent, flatCoordinates, offset, end, stride) {
    for (; offset < end; offset += stride) {
      extendXY(extent, flatCoordinates[offset], flatCoordinates[offset + 1]);
    }
    return extent;
  }
  function extendXY(extent, x, y) {
    extent[0] = Math.min(extent[0], x);
    extent[1] = Math.min(extent[1], y);
    extent[2] = Math.max(extent[2], x);
    extent[3] = Math.max(extent[3], y);
  }
  function forEachCorner(extent, callback) {
    var val;
    val = callback(getBottomLeft(extent));
    if (val) {
      return val;
    }
    val = callback(getBottomRight(extent));
    if (val) {
      return val;
    }
    val = callback(getTopRight(extent));
    if (val) {
      return val;
    }
    val = callback(getTopLeft(extent));
    if (val) {
      return val;
    }
    return false;
  }
  function getArea(extent) {
    var area = 0;
    if (!isEmpty(extent)) {
      area = getWidth(extent) * getHeight(extent);
    }
    return area;
  }
  function getBottomLeft(extent) {
    return [extent[0], extent[1]];
  }
  function getBottomRight(extent) {
    return [extent[2], extent[1]];
  }
  function getCenter(extent) {
    return [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
  }
  function getCorner(extent, corner) {
    var coordinate;
    if (corner === Corner.BOTTOM_LEFT) {
      coordinate = getBottomLeft(extent);
    } else if (corner === Corner.BOTTOM_RIGHT) {
      coordinate = getBottomRight(extent);
    } else if (corner === Corner.TOP_LEFT) {
      coordinate = getTopLeft(extent);
    } else if (corner === Corner.TOP_RIGHT) {
      coordinate = getTopRight(extent);
    } else {
      assert(false, 13);
    }
    return coordinate;
  }
  function getForViewAndSize(center, resolution, rotation, size, opt_extent) {
    var dx = resolution * size[0] / 2;
    var dy = resolution * size[1] / 2;
    var cosRotation = Math.cos(rotation);
    var sinRotation = Math.sin(rotation);
    var xCos = dx * cosRotation;
    var xSin = dx * sinRotation;
    var yCos = dy * cosRotation;
    var ySin = dy * sinRotation;
    var x = center[0];
    var y = center[1];
    var x0 = x - xCos + ySin;
    var x1 = x - xCos - ySin;
    var x2 = x + xCos - ySin;
    var x3 = x + xCos + ySin;
    var y0 = y - xSin - yCos;
    var y1 = y - xSin + yCos;
    var y2 = y + xSin + yCos;
    var y3 = y + xSin - yCos;
    return createOrUpdate$2(Math.min(x0, x1, x2, x3), Math.min(y0, y1, y2, y3), Math.max(x0, x1, x2, x3), Math.max(y0, y1, y2, y3), opt_extent);
  }
  function getHeight(extent) {
    return extent[3] - extent[1];
  }
  function getIntersection(extent1, extent2, opt_extent) {
    var intersection = opt_extent ? opt_extent : createEmpty();
    if (intersects$1(extent1, extent2)) {
      if (extent1[0] > extent2[0]) {
        intersection[0] = extent1[0];
      } else {
        intersection[0] = extent2[0];
      }
      if (extent1[1] > extent2[1]) {
        intersection[1] = extent1[1];
      } else {
        intersection[1] = extent2[1];
      }
      if (extent1[2] < extent2[2]) {
        intersection[2] = extent1[2];
      } else {
        intersection[2] = extent2[2];
      }
      if (extent1[3] < extent2[3]) {
        intersection[3] = extent1[3];
      } else {
        intersection[3] = extent2[3];
      }
    } else {
      createOrUpdateEmpty(intersection);
    }
    return intersection;
  }
  function getTopLeft(extent) {
    return [extent[0], extent[3]];
  }
  function getTopRight(extent) {
    return [extent[2], extent[3]];
  }
  function getWidth(extent) {
    return extent[2] - extent[0];
  }
  function intersects$1(extent1, extent2) {
    return extent1[0] <= extent2[2] && extent1[2] >= extent2[0] && extent1[1] <= extent2[3] && extent1[3] >= extent2[1];
  }
  function isEmpty(extent) {
    return extent[2] < extent[0] || extent[3] < extent[1];
  }
  function returnOrUpdate(extent, opt_extent) {
    if (opt_extent) {
      opt_extent[0] = extent[0];
      opt_extent[1] = extent[1];
      opt_extent[2] = extent[2];
      opt_extent[3] = extent[3];
      return opt_extent;
    } else {
      return extent;
    }
  }
  function intersectsSegment(extent, start, end) {
    var intersects2 = false;
    var startRel = coordinateRelationship(extent, start);
    var endRel = coordinateRelationship(extent, end);
    if (startRel === Relationship.INTERSECTING || endRel === Relationship.INTERSECTING) {
      intersects2 = true;
    } else {
      var minX = extent[0];
      var minY = extent[1];
      var maxX = extent[2];
      var maxY = extent[3];
      var startX = start[0];
      var startY = start[1];
      var endX = end[0];
      var endY = end[1];
      var slope = (endY - startY) / (endX - startX);
      var x = void 0, y = void 0;
      if (!!(endRel & Relationship.ABOVE) && !(startRel & Relationship.ABOVE)) {
        x = endX - (endY - maxY) / slope;
        intersects2 = x >= minX && x <= maxX;
      }
      if (!intersects2 && !!(endRel & Relationship.RIGHT) && !(startRel & Relationship.RIGHT)) {
        y = endY - (endX - maxX) * slope;
        intersects2 = y >= minY && y <= maxY;
      }
      if (!intersects2 && !!(endRel & Relationship.BELOW) && !(startRel & Relationship.BELOW)) {
        x = endX - (endY - minY) / slope;
        intersects2 = x >= minX && x <= maxX;
      }
      if (!intersects2 && !!(endRel & Relationship.LEFT) && !(startRel & Relationship.LEFT)) {
        y = endY - (endX - minX) * slope;
        intersects2 = y >= minY && y <= maxY;
      }
    }
    return intersects2;
  }
  function wrapX$2(extent, projection) {
    var projectionExtent = projection.getExtent();
    var center = getCenter(extent);
    if (projection.canWrapX() && (center[0] < projectionExtent[0] || center[0] >= projectionExtent[2])) {
      var worldWidth = getWidth(projectionExtent);
      var worldsAway = Math.floor((center[0] - projectionExtent[0]) / worldWidth);
      var offset = worldsAway * worldWidth;
      extent[0] -= offset;
      extent[2] -= offset;
    }
    return extent;
  }
  var Projection = function() {
    function Projection2(options) {
      this.code_ = options.code;
      this.units_ = options.units;
      this.extent_ = options.extent !== void 0 ? options.extent : null;
      this.worldExtent_ = options.worldExtent !== void 0 ? options.worldExtent : null;
      this.axisOrientation_ = options.axisOrientation !== void 0 ? options.axisOrientation : "enu";
      this.global_ = options.global !== void 0 ? options.global : false;
      this.canWrapX_ = !!(this.global_ && this.extent_);
      this.getPointResolutionFunc_ = options.getPointResolution;
      this.defaultTileGrid_ = null;
      this.metersPerUnit_ = options.metersPerUnit;
    }
    Projection2.prototype.canWrapX = function() {
      return this.canWrapX_;
    };
    Projection2.prototype.getCode = function() {
      return this.code_;
    };
    Projection2.prototype.getExtent = function() {
      return this.extent_;
    };
    Projection2.prototype.getUnits = function() {
      return this.units_;
    };
    Projection2.prototype.getMetersPerUnit = function() {
      return this.metersPerUnit_ || METERS_PER_UNIT$1[this.units_];
    };
    Projection2.prototype.getWorldExtent = function() {
      return this.worldExtent_;
    };
    Projection2.prototype.getAxisOrientation = function() {
      return this.axisOrientation_;
    };
    Projection2.prototype.isGlobal = function() {
      return this.global_;
    };
    Projection2.prototype.setGlobal = function(global) {
      this.global_ = global;
      this.canWrapX_ = !!(global && this.extent_);
    };
    Projection2.prototype.getDefaultTileGrid = function() {
      return this.defaultTileGrid_;
    };
    Projection2.prototype.setDefaultTileGrid = function(tileGrid) {
      this.defaultTileGrid_ = tileGrid;
    };
    Projection2.prototype.setExtent = function(extent) {
      this.extent_ = extent;
      this.canWrapX_ = !!(this.global_ && extent);
    };
    Projection2.prototype.setWorldExtent = function(worldExtent) {
      this.worldExtent_ = worldExtent;
    };
    Projection2.prototype.setGetPointResolution = function(func) {
      this.getPointResolutionFunc_ = func;
    };
    Projection2.prototype.getPointResolutionFunc = function() {
      return this.getPointResolutionFunc_;
    };
    return Projection2;
  }();
  var Projection$1 = Projection;
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  var cosh = function() {
    var cosh2;
    if ("cosh" in Math) {
      cosh2 = Math.cosh;
    } else {
      cosh2 = function(x) {
        var y = Math.exp(x);
        return (y + 1 / y) / 2;
      };
    }
    return cosh2;
  }();
  var log2 = function() {
    var log22;
    if ("log2" in Math) {
      log22 = Math.log2;
    } else {
      log22 = function(x) {
        return Math.log(x) * Math.LOG2E;
      };
    }
    return log22;
  }();
  function squaredSegmentDistance(x, y, x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    if (dx !== 0 || dy !== 0) {
      var t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
      if (t > 1) {
        x1 = x2;
        y1 = y2;
      } else if (t > 0) {
        x1 += dx * t;
        y1 += dy * t;
      }
    }
    return squaredDistance(x, y, x1, y1);
  }
  function squaredDistance(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return dx * dx + dy * dy;
  }
  function solveLinearSystem(mat) {
    var n = mat.length;
    for (var i = 0; i < n; i++) {
      var maxRow = i;
      var maxEl = Math.abs(mat[i][i]);
      for (var r = i + 1; r < n; r++) {
        var absValue = Math.abs(mat[r][i]);
        if (absValue > maxEl) {
          maxEl = absValue;
          maxRow = r;
        }
      }
      if (maxEl === 0) {
        return null;
      }
      var tmp = mat[maxRow];
      mat[maxRow] = mat[i];
      mat[i] = tmp;
      for (var j = i + 1; j < n; j++) {
        var coef = -mat[j][i] / mat[i][i];
        for (var k = i; k < n + 1; k++) {
          if (i == k) {
            mat[j][k] = 0;
          } else {
            mat[j][k] += coef * mat[i][k];
          }
        }
      }
    }
    var x = new Array(n);
    for (var l = n - 1; l >= 0; l--) {
      x[l] = mat[l][n] / mat[l][l];
      for (var m = l - 1; m >= 0; m--) {
        mat[m][n] -= mat[m][l] * x[l];
      }
    }
    return x;
  }
  function toRadians(angleInDegrees) {
    return angleInDegrees * Math.PI / 180;
  }
  function modulo(a, b) {
    var r = a % b;
    return r * b < 0 ? r + b : r;
  }
  function lerp(a, b, x) {
    return a + x * (b - a);
  }
  var __extends$14 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var RADIUS$1 = 6378137;
  var HALF_SIZE = Math.PI * RADIUS$1;
  var EXTENT$1 = [-HALF_SIZE, -HALF_SIZE, HALF_SIZE, HALF_SIZE];
  var WORLD_EXTENT = [-180, -85, 180, 85];
  var MAX_SAFE_Y = RADIUS$1 * Math.log(Math.tan(Math.PI / 2));
  var EPSG3857Projection = function(_super) {
    __extends$14(EPSG3857Projection2, _super);
    function EPSG3857Projection2(code) {
      return _super.call(this, {
        code,
        units: Units$1.METERS,
        extent: EXTENT$1,
        global: true,
        worldExtent: WORLD_EXTENT,
        getPointResolution: function(resolution, point) {
          return resolution / cosh(point[1] / RADIUS$1);
        }
      }) || this;
    }
    return EPSG3857Projection2;
  }(Projection$1);
  var PROJECTIONS$1 = [
    new EPSG3857Projection("EPSG:3857"),
    new EPSG3857Projection("EPSG:102100"),
    new EPSG3857Projection("EPSG:102113"),
    new EPSG3857Projection("EPSG:900913"),
    new EPSG3857Projection("http://www.opengis.net/def/crs/EPSG/0/3857"),
    new EPSG3857Projection("http://www.opengis.net/gml/srs/epsg.xml#3857")
  ];
  function fromEPSG4326(input, opt_output, opt_dimension) {
    var length = input.length;
    var dimension = opt_dimension > 1 ? opt_dimension : 2;
    var output = opt_output;
    if (output === void 0) {
      if (dimension > 2) {
        output = input.slice();
      } else {
        output = new Array(length);
      }
    }
    for (var i = 0; i < length; i += dimension) {
      output[i] = HALF_SIZE * input[i] / 180;
      var y = RADIUS$1 * Math.log(Math.tan(Math.PI * (+input[i + 1] + 90) / 360));
      if (y > MAX_SAFE_Y) {
        y = MAX_SAFE_Y;
      } else if (y < -MAX_SAFE_Y) {
        y = -MAX_SAFE_Y;
      }
      output[i + 1] = y;
    }
    return output;
  }
  function toEPSG4326(input, opt_output, opt_dimension) {
    var length = input.length;
    var dimension = opt_dimension > 1 ? opt_dimension : 2;
    var output = opt_output;
    if (output === void 0) {
      if (dimension > 2) {
        output = input.slice();
      } else {
        output = new Array(length);
      }
    }
    for (var i = 0; i < length; i += dimension) {
      output[i] = 180 * input[i] / HALF_SIZE;
      output[i + 1] = 360 * Math.atan(Math.exp(input[i + 1] / RADIUS$1)) / Math.PI - 90;
    }
    return output;
  }
  var __extends$13 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var RADIUS = 6378137;
  var EXTENT = [-180, -90, 180, 90];
  var METERS_PER_UNIT = Math.PI * RADIUS / 180;
  var EPSG4326Projection = function(_super) {
    __extends$13(EPSG4326Projection2, _super);
    function EPSG4326Projection2(code, opt_axisOrientation) {
      return _super.call(this, {
        code,
        units: Units$1.DEGREES,
        extent: EXTENT,
        axisOrientation: opt_axisOrientation,
        global: true,
        metersPerUnit: METERS_PER_UNIT,
        worldExtent: EXTENT
      }) || this;
    }
    return EPSG4326Projection2;
  }(Projection$1);
  var PROJECTIONS = [
    new EPSG4326Projection("CRS:84"),
    new EPSG4326Projection("EPSG:4326", "neu"),
    new EPSG4326Projection("urn:ogc:def:crs:OGC:1.3:CRS84"),
    new EPSG4326Projection("urn:ogc:def:crs:OGC:2:84"),
    new EPSG4326Projection("http://www.opengis.net/def/crs/OGC/1.3/CRS84", "neu"),
    new EPSG4326Projection("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
    new EPSG4326Projection("http://www.opengis.net/def/crs/EPSG/0/4326", "neu")
  ];
  var cache = {};
  function get$3(code) {
    return cache[code] || cache[code.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
  }
  function add$2(code, projection) {
    cache[code] = projection;
  }
  var transforms = {};
  function add$1(source, destination, transformFn) {
    var sourceCode = source.getCode();
    var destinationCode = destination.getCode();
    if (!(sourceCode in transforms)) {
      transforms[sourceCode] = {};
    }
    transforms[sourceCode][destinationCode] = transformFn;
  }
  function get$2(sourceCode, destinationCode) {
    var transform2;
    if (sourceCode in transforms && destinationCode in transforms[sourceCode]) {
      transform2 = transforms[sourceCode][destinationCode];
    }
    return transform2;
  }
  var DEFAULT_RADIUS = 63710088e-1;
  function getDistance(c1, c2, opt_radius) {
    var radius = opt_radius || DEFAULT_RADIUS;
    var lat1 = toRadians(c1[1]);
    var lat2 = toRadians(c2[1]);
    var deltaLatBy2 = (lat2 - lat1) / 2;
    var deltaLonBy2 = toRadians(c2[0] - c1[0]) / 2;
    var a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) + Math.sin(deltaLonBy2) * Math.sin(deltaLonBy2) * Math.cos(lat1) * Math.cos(lat2);
    return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
  function add(coordinate, delta) {
    coordinate[0] += +delta[0];
    coordinate[1] += +delta[1];
    return coordinate;
  }
  function equals(coordinate1, coordinate2) {
    var equals2 = true;
    for (var i = coordinate1.length - 1; i >= 0; --i) {
      if (coordinate1[i] != coordinate2[i]) {
        equals2 = false;
        break;
      }
    }
    return equals2;
  }
  function rotate$1(coordinate, angle) {
    var cosAngle = Math.cos(angle);
    var sinAngle = Math.sin(angle);
    var x = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
    var y = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
    coordinate[0] = x;
    coordinate[1] = y;
    return coordinate;
  }
  function scale$2(coordinate, scale2) {
    coordinate[0] *= scale2;
    coordinate[1] *= scale2;
    return coordinate;
  }
  function wrapX$1(coordinate, projection) {
    if (projection.canWrapX()) {
      var worldWidth = getWidth(projection.getExtent());
      var worldsAway = getWorldsAway(coordinate, projection, worldWidth);
      if (worldsAway) {
        coordinate[0] -= worldsAway * worldWidth;
      }
    }
    return coordinate;
  }
  function getWorldsAway(coordinate, projection, opt_sourceExtentWidth) {
    var projectionExtent = projection.getExtent();
    var worldsAway = 0;
    if (projection.canWrapX() && (coordinate[0] < projectionExtent[0] || coordinate[0] > projectionExtent[2])) {
      var sourceExtentWidth = opt_sourceExtentWidth || getWidth(projectionExtent);
      worldsAway = Math.floor((coordinate[0] - projectionExtent[0]) / sourceExtentWidth);
    }
    return worldsAway;
  }
  function cloneTransform(input, opt_output, opt_dimension) {
    var output;
    if (opt_output !== void 0) {
      for (var i = 0, ii = input.length; i < ii; ++i) {
        opt_output[i] = input[i];
      }
      output = opt_output;
    } else {
      output = input.slice();
    }
    return output;
  }
  function identityTransform(input, opt_output, opt_dimension) {
    if (opt_output !== void 0 && input !== opt_output) {
      for (var i = 0, ii = input.length; i < ii; ++i) {
        opt_output[i] = input[i];
      }
      input = opt_output;
    }
    return input;
  }
  function addProjection(projection) {
    add$2(projection.getCode(), projection);
    add$1(projection, projection, cloneTransform);
  }
  function addProjections(projections) {
    projections.forEach(addProjection);
  }
  function get$1(projectionLike) {
    return typeof projectionLike === "string" ? get$3(projectionLike) : projectionLike || null;
  }
  function getPointResolution(projection, resolution, point, opt_units) {
    projection = get$1(projection);
    var pointResolution;
    var getter = projection.getPointResolutionFunc();
    if (getter) {
      pointResolution = getter(resolution, point);
      if (opt_units && opt_units !== projection.getUnits()) {
        var metersPerUnit = projection.getMetersPerUnit();
        if (metersPerUnit) {
          pointResolution = pointResolution * metersPerUnit / METERS_PER_UNIT$1[opt_units];
        }
      }
    } else {
      var units = projection.getUnits();
      if (units == Units$1.DEGREES && !opt_units || opt_units == Units$1.DEGREES) {
        pointResolution = resolution;
      } else {
        var toEPSG4326_1 = getTransformFromProjections(projection, get$1("EPSG:4326"));
        if (toEPSG4326_1 === identityTransform && units !== Units$1.DEGREES) {
          pointResolution = resolution * projection.getMetersPerUnit();
        } else {
          var vertices = [
            point[0] - resolution / 2,
            point[1],
            point[0] + resolution / 2,
            point[1],
            point[0],
            point[1] - resolution / 2,
            point[0],
            point[1] + resolution / 2
          ];
          vertices = toEPSG4326_1(vertices, vertices, 2);
          var width = getDistance(vertices.slice(0, 2), vertices.slice(2, 4));
          var height = getDistance(vertices.slice(4, 6), vertices.slice(6, 8));
          pointResolution = (width + height) / 2;
        }
        var metersPerUnit = opt_units ? METERS_PER_UNIT$1[opt_units] : projection.getMetersPerUnit();
        if (metersPerUnit !== void 0) {
          pointResolution /= metersPerUnit;
        }
      }
    }
    return pointResolution;
  }
  function addEquivalentProjections(projections) {
    addProjections(projections);
    projections.forEach(function(source) {
      projections.forEach(function(destination) {
        if (source !== destination) {
          add$1(source, destination, cloneTransform);
        }
      });
    });
  }
  function addEquivalentTransforms(projections1, projections2, forwardTransform, inverseTransform) {
    projections1.forEach(function(projection1) {
      projections2.forEach(function(projection2) {
        add$1(projection1, projection2, forwardTransform);
        add$1(projection2, projection1, inverseTransform);
      });
    });
  }
  function createProjection(projection, defaultCode) {
    if (!projection) {
      return get$1(defaultCode);
    } else if (typeof projection === "string") {
      return get$1(projection);
    } else {
      return projection;
    }
  }
  function fromLonLat(coordinate, opt_projection) {
    return transform(coordinate, "EPSG:4326", opt_projection !== void 0 ? opt_projection : "EPSG:3857");
  }
  function equivalent(projection1, projection2) {
    if (projection1 === projection2) {
      return true;
    }
    var equalUnits = projection1.getUnits() === projection2.getUnits();
    if (projection1.getCode() === projection2.getCode()) {
      return equalUnits;
    } else {
      var transformFunc = getTransformFromProjections(projection1, projection2);
      return transformFunc === cloneTransform && equalUnits;
    }
  }
  function getTransformFromProjections(sourceProjection, destinationProjection) {
    var sourceCode = sourceProjection.getCode();
    var destinationCode = destinationProjection.getCode();
    var transformFunc = get$2(sourceCode, destinationCode);
    if (!transformFunc) {
      transformFunc = identityTransform;
    }
    return transformFunc;
  }
  function getTransform(source, destination) {
    var sourceProjection = get$1(source);
    var destinationProjection = get$1(destination);
    return getTransformFromProjections(sourceProjection, destinationProjection);
  }
  function transform(coordinate, source, destination) {
    var transformFunc = getTransform(source, destination);
    return transformFunc(coordinate, void 0, coordinate.length);
  }
  var userProjection = null;
  function getUserProjection() {
    return userProjection;
  }
  function toUserCoordinate(coordinate, sourceProjection) {
    {
      return coordinate;
    }
  }
  function fromUserCoordinate(coordinate, destProjection) {
    {
      return coordinate;
    }
  }
  function toUserExtent(extent, sourceProjection) {
    {
      return extent;
    }
  }
  function fromUserExtent(extent, destProjection) {
    {
      return extent;
    }
  }
  function addCommon() {
    addEquivalentProjections(PROJECTIONS$1);
    addEquivalentProjections(PROJECTIONS);
    addEquivalentTransforms(PROJECTIONS, PROJECTIONS$1, fromEPSG4326, toEPSG4326);
  }
  addCommon();
  function transform2D(flatCoordinates, offset, end, stride, transform2, opt_dest) {
    var dest = opt_dest ? opt_dest : [];
    var i = 0;
    for (var j = offset; j < end; j += stride) {
      var x = flatCoordinates[j];
      var y = flatCoordinates[j + 1];
      dest[i++] = transform2[0] * x + transform2[2] * y + transform2[4];
      dest[i++] = transform2[1] * x + transform2[3] * y + transform2[5];
    }
    if (opt_dest && dest.length != i) {
      dest.length = i;
    }
    return dest;
  }
  function rotate(flatCoordinates, offset, end, stride, angle, anchor, opt_dest) {
    var dest = opt_dest ? opt_dest : [];
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var anchorX = anchor[0];
    var anchorY = anchor[1];
    var i = 0;
    for (var j = offset; j < end; j += stride) {
      var deltaX = flatCoordinates[j] - anchorX;
      var deltaY = flatCoordinates[j + 1] - anchorY;
      dest[i++] = anchorX + deltaX * cos - deltaY * sin;
      dest[i++] = anchorY + deltaX * sin + deltaY * cos;
      for (var k = j + 2; k < j + stride; ++k) {
        dest[i++] = flatCoordinates[k];
      }
    }
    if (opt_dest && dest.length != i) {
      dest.length = i;
    }
    return dest;
  }
  function scale$1(flatCoordinates, offset, end, stride, sx, sy, anchor, opt_dest) {
    var dest = opt_dest ? opt_dest : [];
    var anchorX = anchor[0];
    var anchorY = anchor[1];
    var i = 0;
    for (var j = offset; j < end; j += stride) {
      var deltaX = flatCoordinates[j] - anchorX;
      var deltaY = flatCoordinates[j + 1] - anchorY;
      dest[i++] = anchorX + sx * deltaX;
      dest[i++] = anchorY + sy * deltaY;
      for (var k = j + 2; k < j + stride; ++k) {
        dest[i++] = flatCoordinates[k];
      }
    }
    if (opt_dest && dest.length != i) {
      dest.length = i;
    }
    return dest;
  }
  function translate(flatCoordinates, offset, end, stride, deltaX, deltaY, opt_dest) {
    var dest = opt_dest ? opt_dest : [];
    var i = 0;
    for (var j = offset; j < end; j += stride) {
      dest[i++] = flatCoordinates[j] + deltaX;
      dest[i++] = flatCoordinates[j + 1] + deltaY;
      for (var k = j + 2; k < j + stride; ++k) {
        dest[i++] = flatCoordinates[k];
      }
    }
    if (opt_dest && dest.length != i) {
      dest.length = i;
    }
    return dest;
  }
  var __extends$12 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var tmpTransform = create();
  var Geometry = function(_super) {
    __extends$12(Geometry2, _super);
    function Geometry2() {
      var _this = _super.call(this) || this;
      _this.extent_ = createEmpty();
      _this.extentRevision_ = -1;
      _this.simplifiedGeometryMaxMinSquaredTolerance = 0;
      _this.simplifiedGeometryRevision = 0;
      _this.simplifyTransformedInternal = memoizeOne(function(revision, squaredTolerance, opt_transform) {
        if (!opt_transform) {
          return this.getSimplifiedGeometry(squaredTolerance);
        }
        var clone2 = this.clone();
        clone2.applyTransform(opt_transform);
        return clone2.getSimplifiedGeometry(squaredTolerance);
      });
      return _this;
    }
    Geometry2.prototype.simplifyTransformed = function(squaredTolerance, opt_transform) {
      return this.simplifyTransformedInternal(this.getRevision(), squaredTolerance, opt_transform);
    };
    Geometry2.prototype.clone = function() {
      return abstract();
    };
    Geometry2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
      return abstract();
    };
    Geometry2.prototype.containsXY = function(x, y) {
      var coord = this.getClosestPoint([x, y]);
      return coord[0] === x && coord[1] === y;
    };
    Geometry2.prototype.getClosestPoint = function(point, opt_closestPoint) {
      var closestPoint = opt_closestPoint ? opt_closestPoint : [NaN, NaN];
      this.closestPointXY(point[0], point[1], closestPoint, Infinity);
      return closestPoint;
    };
    Geometry2.prototype.intersectsCoordinate = function(coordinate) {
      return this.containsXY(coordinate[0], coordinate[1]);
    };
    Geometry2.prototype.computeExtent = function(extent) {
      return abstract();
    };
    Geometry2.prototype.getExtent = function(opt_extent) {
      if (this.extentRevision_ != this.getRevision()) {
        var extent = this.computeExtent(this.extent_);
        if (isNaN(extent[0]) || isNaN(extent[1])) {
          createOrUpdateEmpty(extent);
        }
        this.extentRevision_ = this.getRevision();
      }
      return returnOrUpdate(this.extent_, opt_extent);
    };
    Geometry2.prototype.rotate = function(angle, anchor) {
      abstract();
    };
    Geometry2.prototype.scale = function(sx, opt_sy, opt_anchor) {
      abstract();
    };
    Geometry2.prototype.simplify = function(tolerance) {
      return this.getSimplifiedGeometry(tolerance * tolerance);
    };
    Geometry2.prototype.getSimplifiedGeometry = function(squaredTolerance) {
      return abstract();
    };
    Geometry2.prototype.getType = function() {
      return abstract();
    };
    Geometry2.prototype.applyTransform = function(transformFn) {
      abstract();
    };
    Geometry2.prototype.intersectsExtent = function(extent) {
      return abstract();
    };
    Geometry2.prototype.translate = function(deltaX, deltaY) {
      abstract();
    };
    Geometry2.prototype.transform = function(source, destination) {
      var sourceProj = get$1(source);
      var transformFn = sourceProj.getUnits() == Units$1.TILE_PIXELS ? function(inCoordinates, outCoordinates, stride) {
        var pixelExtent = sourceProj.getExtent();
        var projectedExtent = sourceProj.getWorldExtent();
        var scale2 = getHeight(projectedExtent) / getHeight(pixelExtent);
        compose(tmpTransform, projectedExtent[0], projectedExtent[3], scale2, -scale2, 0, 0, 0);
        transform2D(inCoordinates, 0, inCoordinates.length, stride, tmpTransform, outCoordinates);
        return getTransform(sourceProj, destination)(inCoordinates, outCoordinates, stride);
      } : getTransform(sourceProj, destination);
      this.applyTransform(transformFn);
      return this;
    };
    return Geometry2;
  }(BaseObject$1);
  var Geometry$1 = Geometry;
  var __extends$11 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var SimpleGeometry = function(_super) {
    __extends$11(SimpleGeometry2, _super);
    function SimpleGeometry2() {
      var _this = _super.call(this) || this;
      _this.layout = GeometryLayout.XY;
      _this.stride = 2;
      _this.flatCoordinates = null;
      return _this;
    }
    SimpleGeometry2.prototype.computeExtent = function(extent) {
      return createOrUpdateFromFlatCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
    };
    SimpleGeometry2.prototype.getCoordinates = function() {
      return abstract();
    };
    SimpleGeometry2.prototype.getFirstCoordinate = function() {
      return this.flatCoordinates.slice(0, this.stride);
    };
    SimpleGeometry2.prototype.getFlatCoordinates = function() {
      return this.flatCoordinates;
    };
    SimpleGeometry2.prototype.getLastCoordinate = function() {
      return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride);
    };
    SimpleGeometry2.prototype.getLayout = function() {
      return this.layout;
    };
    SimpleGeometry2.prototype.getSimplifiedGeometry = function(squaredTolerance) {
      if (this.simplifiedGeometryRevision !== this.getRevision()) {
        this.simplifiedGeometryMaxMinSquaredTolerance = 0;
        this.simplifiedGeometryRevision = this.getRevision();
      }
      if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance <= this.simplifiedGeometryMaxMinSquaredTolerance) {
        return this;
      }
      var simplifiedGeometry = this.getSimplifiedGeometryInternal(squaredTolerance);
      var simplifiedFlatCoordinates = simplifiedGeometry.getFlatCoordinates();
      if (simplifiedFlatCoordinates.length < this.flatCoordinates.length) {
        return simplifiedGeometry;
      } else {
        this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
        return this;
      }
    };
    SimpleGeometry2.prototype.getSimplifiedGeometryInternal = function(squaredTolerance) {
      return this;
    };
    SimpleGeometry2.prototype.getStride = function() {
      return this.stride;
    };
    SimpleGeometry2.prototype.setFlatCoordinates = function(layout, flatCoordinates) {
      this.stride = getStrideForLayout(layout);
      this.layout = layout;
      this.flatCoordinates = flatCoordinates;
    };
    SimpleGeometry2.prototype.setCoordinates = function(coordinates2, opt_layout) {
      abstract();
    };
    SimpleGeometry2.prototype.setLayout = function(layout, coordinates2, nesting) {
      var stride;
      if (layout) {
        stride = getStrideForLayout(layout);
      } else {
        for (var i = 0; i < nesting; ++i) {
          if (coordinates2.length === 0) {
            this.layout = GeometryLayout.XY;
            this.stride = 2;
            return;
          } else {
            coordinates2 = coordinates2[0];
          }
        }
        stride = coordinates2.length;
        layout = getLayoutForStride(stride);
      }
      this.layout = layout;
      this.stride = stride;
    };
    SimpleGeometry2.prototype.applyTransform = function(transformFn) {
      if (this.flatCoordinates) {
        transformFn(this.flatCoordinates, this.flatCoordinates, this.stride);
        this.changed();
      }
    };
    SimpleGeometry2.prototype.rotate = function(angle, anchor) {
      var flatCoordinates = this.getFlatCoordinates();
      if (flatCoordinates) {
        var stride = this.getStride();
        rotate(flatCoordinates, 0, flatCoordinates.length, stride, angle, anchor, flatCoordinates);
        this.changed();
      }
    };
    SimpleGeometry2.prototype.scale = function(sx, opt_sy, opt_anchor) {
      var sy = opt_sy;
      if (sy === void 0) {
        sy = sx;
      }
      var anchor = opt_anchor;
      if (!anchor) {
        anchor = getCenter(this.getExtent());
      }
      var flatCoordinates = this.getFlatCoordinates();
      if (flatCoordinates) {
        var stride = this.getStride();
        scale$1(flatCoordinates, 0, flatCoordinates.length, stride, sx, sy, anchor, flatCoordinates);
        this.changed();
      }
    };
    SimpleGeometry2.prototype.translate = function(deltaX, deltaY) {
      var flatCoordinates = this.getFlatCoordinates();
      if (flatCoordinates) {
        var stride = this.getStride();
        translate(flatCoordinates, 0, flatCoordinates.length, stride, deltaX, deltaY, flatCoordinates);
        this.changed();
      }
    };
    return SimpleGeometry2;
  }(Geometry$1);
  function getLayoutForStride(stride) {
    var layout;
    if (stride == 2) {
      layout = GeometryLayout.XY;
    } else if (stride == 3) {
      layout = GeometryLayout.XYZ;
    } else if (stride == 4) {
      layout = GeometryLayout.XYZM;
    }
    return layout;
  }
  function getStrideForLayout(layout) {
    var stride;
    if (layout == GeometryLayout.XY) {
      stride = 2;
    } else if (layout == GeometryLayout.XYZ || layout == GeometryLayout.XYM) {
      stride = 3;
    } else if (layout == GeometryLayout.XYZM) {
      stride = 4;
    }
    return stride;
  }
  function transformGeom2D(simpleGeometry, transform2, opt_dest) {
    var flatCoordinates = simpleGeometry.getFlatCoordinates();
    if (!flatCoordinates) {
      return null;
    } else {
      var stride = simpleGeometry.getStride();
      return transform2D(flatCoordinates, 0, flatCoordinates.length, stride, transform2, opt_dest);
    }
  }
  var SimpleGeometry$1 = SimpleGeometry;
  function assignClosest(flatCoordinates, offset1, offset2, stride, x, y, closestPoint) {
    var x1 = flatCoordinates[offset1];
    var y1 = flatCoordinates[offset1 + 1];
    var dx = flatCoordinates[offset2] - x1;
    var dy = flatCoordinates[offset2 + 1] - y1;
    var offset;
    if (dx === 0 && dy === 0) {
      offset = offset1;
    } else {
      var t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
      if (t > 1) {
        offset = offset2;
      } else if (t > 0) {
        for (var i = 0; i < stride; ++i) {
          closestPoint[i] = lerp(flatCoordinates[offset1 + i], flatCoordinates[offset2 + i], t);
        }
        closestPoint.length = stride;
        return;
      } else {
        offset = offset1;
      }
    }
    for (var i = 0; i < stride; ++i) {
      closestPoint[i] = flatCoordinates[offset + i];
    }
    closestPoint.length = stride;
  }
  function maxSquaredDelta(flatCoordinates, offset, end, stride, max) {
    var x1 = flatCoordinates[offset];
    var y1 = flatCoordinates[offset + 1];
    for (offset += stride; offset < end; offset += stride) {
      var x2 = flatCoordinates[offset];
      var y2 = flatCoordinates[offset + 1];
      var squaredDelta = squaredDistance(x1, y1, x2, y2);
      if (squaredDelta > max) {
        max = squaredDelta;
      }
      x1 = x2;
      y1 = y2;
    }
    return max;
  }
  function arrayMaxSquaredDelta(flatCoordinates, offset, ends, stride, max) {
    for (var i = 0, ii = ends.length; i < ii; ++i) {
      var end = ends[i];
      max = maxSquaredDelta(flatCoordinates, offset, end, stride, max);
      offset = end;
    }
    return max;
  }
  function assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
    if (offset == end) {
      return minSquaredDistance;
    }
    var i, squaredDistance$1;
    if (maxDelta === 0) {
      squaredDistance$1 = squaredDistance(x, y, flatCoordinates[offset], flatCoordinates[offset + 1]);
      if (squaredDistance$1 < minSquaredDistance) {
        for (i = 0; i < stride; ++i) {
          closestPoint[i] = flatCoordinates[offset + i];
        }
        closestPoint.length = stride;
        return squaredDistance$1;
      } else {
        return minSquaredDistance;
      }
    }
    var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];
    var index = offset + stride;
    while (index < end) {
      assignClosest(flatCoordinates, index - stride, index, stride, x, y, tmpPoint);
      squaredDistance$1 = squaredDistance(x, y, tmpPoint[0], tmpPoint[1]);
      if (squaredDistance$1 < minSquaredDistance) {
        minSquaredDistance = squaredDistance$1;
        for (i = 0; i < stride; ++i) {
          closestPoint[i] = tmpPoint[i];
        }
        closestPoint.length = stride;
        index += stride;
      } else {
        index += stride * Math.max((Math.sqrt(squaredDistance$1) - Math.sqrt(minSquaredDistance)) / maxDelta | 0, 1);
      }
    }
    if (isRing) {
      assignClosest(flatCoordinates, end - stride, offset, stride, x, y, tmpPoint);
      squaredDistance$1 = squaredDistance(x, y, tmpPoint[0], tmpPoint[1]);
      if (squaredDistance$1 < minSquaredDistance) {
        minSquaredDistance = squaredDistance$1;
        for (i = 0; i < stride; ++i) {
          closestPoint[i] = tmpPoint[i];
        }
        closestPoint.length = stride;
      }
    }
    return minSquaredDistance;
  }
  function assignClosestArrayPoint(flatCoordinates, offset, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
    var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];
    for (var i = 0, ii = ends.length; i < ii; ++i) {
      var end = ends[i];
      minSquaredDistance = assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint);
      offset = end;
    }
    return minSquaredDistance;
  }
  function deflateCoordinate(flatCoordinates, offset, coordinate, stride) {
    for (var i = 0, ii = coordinate.length; i < ii; ++i) {
      flatCoordinates[offset++] = coordinate[i];
    }
    return offset;
  }
  function deflateCoordinates(flatCoordinates, offset, coordinates2, stride) {
    for (var i = 0, ii = coordinates2.length; i < ii; ++i) {
      var coordinate = coordinates2[i];
      for (var j = 0; j < stride; ++j) {
        flatCoordinates[offset++] = coordinate[j];
      }
    }
    return offset;
  }
  function deflateCoordinatesArray(flatCoordinates, offset, coordinatess, stride, opt_ends) {
    var ends = opt_ends ? opt_ends : [];
    var i = 0;
    for (var j = 0, jj = coordinatess.length; j < jj; ++j) {
      var end = deflateCoordinates(flatCoordinates, offset, coordinatess[j], stride);
      ends[i++] = end;
      offset = end;
    }
    ends.length = i;
    return ends;
  }
  function douglasPeucker(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset) {
    var n = (end - offset) / stride;
    if (n < 3) {
      for (; offset < end; offset += stride) {
        simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset];
        simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + 1];
      }
      return simplifiedOffset;
    }
    var markers = new Array(n);
    markers[0] = 1;
    markers[n - 1] = 1;
    var stack = [offset, end - stride];
    var index = 0;
    while (stack.length > 0) {
      var last = stack.pop();
      var first = stack.pop();
      var maxSquaredDistance = 0;
      var x1 = flatCoordinates[first];
      var y1 = flatCoordinates[first + 1];
      var x2 = flatCoordinates[last];
      var y2 = flatCoordinates[last + 1];
      for (var i = first + stride; i < last; i += stride) {
        var x = flatCoordinates[i];
        var y = flatCoordinates[i + 1];
        var squaredDistance_1 = squaredSegmentDistance(x, y, x1, y1, x2, y2);
        if (squaredDistance_1 > maxSquaredDistance) {
          index = i;
          maxSquaredDistance = squaredDistance_1;
        }
      }
      if (maxSquaredDistance > squaredTolerance) {
        markers[(index - offset) / stride] = 1;
        if (first + stride < index) {
          stack.push(first, index);
        }
        if (index + stride < last) {
          stack.push(index, last);
        }
      }
    }
    for (var i = 0; i < n; ++i) {
      if (markers[i]) {
        simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i * stride];
        simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i * stride + 1];
      }
    }
    return simplifiedOffset;
  }
  function snap(value, tolerance) {
    return tolerance * Math.round(value / tolerance);
  }
  function quantize(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset) {
    if (offset == end) {
      return simplifiedOffset;
    }
    var x1 = snap(flatCoordinates[offset], tolerance);
    var y1 = snap(flatCoordinates[offset + 1], tolerance);
    offset += stride;
    simplifiedFlatCoordinates[simplifiedOffset++] = x1;
    simplifiedFlatCoordinates[simplifiedOffset++] = y1;
    var x2, y2;
    do {
      x2 = snap(flatCoordinates[offset], tolerance);
      y2 = snap(flatCoordinates[offset + 1], tolerance);
      offset += stride;
      if (offset == end) {
        simplifiedFlatCoordinates[simplifiedOffset++] = x2;
        simplifiedFlatCoordinates[simplifiedOffset++] = y2;
        return simplifiedOffset;
      }
    } while (x2 == x1 && y2 == y1);
    while (offset < end) {
      var x3 = snap(flatCoordinates[offset], tolerance);
      var y3 = snap(flatCoordinates[offset + 1], tolerance);
      offset += stride;
      if (x3 == x2 && y3 == y2) {
        continue;
      }
      var dx1 = x2 - x1;
      var dy1 = y2 - y1;
      var dx2 = x3 - x1;
      var dy2 = y3 - y1;
      if (dx1 * dy2 == dy1 * dx2 && (dx1 < 0 && dx2 < dx1 || dx1 == dx2 || dx1 > 0 && dx2 > dx1) && (dy1 < 0 && dy2 < dy1 || dy1 == dy2 || dy1 > 0 && dy2 > dy1)) {
        x2 = x3;
        y2 = y3;
        continue;
      }
      simplifiedFlatCoordinates[simplifiedOffset++] = x2;
      simplifiedFlatCoordinates[simplifiedOffset++] = y2;
      x1 = x2;
      y1 = y2;
      x2 = x3;
      y2 = y3;
    }
    simplifiedFlatCoordinates[simplifiedOffset++] = x2;
    simplifiedFlatCoordinates[simplifiedOffset++] = y2;
    return simplifiedOffset;
  }
  function quantizeArray(flatCoordinates, offset, ends, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds) {
    for (var i = 0, ii = ends.length; i < ii; ++i) {
      var end = ends[i];
      simplifiedOffset = quantize(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset);
      simplifiedEnds.push(simplifiedOffset);
      offset = end;
    }
    return simplifiedOffset;
  }
  function inflateCoordinates(flatCoordinates, offset, end, stride, opt_coordinates) {
    var coordinates2 = opt_coordinates !== void 0 ? opt_coordinates : [];
    var i = 0;
    for (var j = offset; j < end; j += stride) {
      coordinates2[i++] = flatCoordinates.slice(j, j + stride);
    }
    coordinates2.length = i;
    return coordinates2;
  }
  function inflateCoordinatesArray(flatCoordinates, offset, ends, stride, opt_coordinatess) {
    var coordinatess = opt_coordinatess !== void 0 ? opt_coordinatess : [];
    var i = 0;
    for (var j = 0, jj = ends.length; j < jj; ++j) {
      var end = ends[j];
      coordinatess[i++] = inflateCoordinates(flatCoordinates, offset, end, stride, coordinatess[i]);
      offset = end;
    }
    coordinatess.length = i;
    return coordinatess;
  }
  function inflateMultiCoordinatesArray(flatCoordinates, offset, endss, stride, opt_coordinatesss) {
    var coordinatesss = opt_coordinatesss !== void 0 ? opt_coordinatesss : [];
    var i = 0;
    for (var j = 0, jj = endss.length; j < jj; ++j) {
      var ends = endss[j];
      coordinatesss[i++] = inflateCoordinatesArray(flatCoordinates, offset, ends, stride, coordinatesss[i]);
      offset = ends[ends.length - 1];
    }
    coordinatesss.length = i;
    return coordinatesss;
  }
  function linearRing(flatCoordinates, offset, end, stride) {
    var twiceArea = 0;
    var x1 = flatCoordinates[end - stride];
    var y1 = flatCoordinates[end - stride + 1];
    for (; offset < end; offset += stride) {
      var x2 = flatCoordinates[offset];
      var y2 = flatCoordinates[offset + 1];
      twiceArea += y1 * x2 - x1 * y2;
      x1 = x2;
      y1 = y2;
    }
    return twiceArea / 2;
  }
  function linearRings(flatCoordinates, offset, ends, stride) {
    var area = 0;
    for (var i = 0, ii = ends.length; i < ii; ++i) {
      var end = ends[i];
      area += linearRing(flatCoordinates, offset, end, stride);
      offset = end;
    }
    return area;
  }
  var __extends$10 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var LinearRing = function(_super) {
    __extends$10(LinearRing2, _super);
    function LinearRing2(coordinates2, opt_layout) {
      var _this = _super.call(this) || this;
      _this.maxDelta_ = -1;
      _this.maxDeltaRevision_ = -1;
      if (opt_layout !== void 0 && !Array.isArray(coordinates2[0])) {
        _this.setFlatCoordinates(opt_layout, coordinates2);
      } else {
        _this.setCoordinates(coordinates2, opt_layout);
      }
      return _this;
    }
    LinearRing2.prototype.clone = function() {
      return new LinearRing2(this.flatCoordinates.slice(), this.layout);
    };
    LinearRing2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
      if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
        return minSquaredDistance;
      }
      if (this.maxDeltaRevision_ != this.getRevision()) {
        this.maxDelta_ = Math.sqrt(maxSquaredDelta(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
        this.maxDeltaRevision_ = this.getRevision();
      }
      return assignClosestPoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
    };
    LinearRing2.prototype.getArea = function() {
      return linearRing(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    };
    LinearRing2.prototype.getCoordinates = function() {
      return inflateCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    };
    LinearRing2.prototype.getSimplifiedGeometryInternal = function(squaredTolerance) {
      var simplifiedFlatCoordinates = [];
      simplifiedFlatCoordinates.length = douglasPeucker(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
      return new LinearRing2(simplifiedFlatCoordinates, GeometryLayout.XY);
    };
    LinearRing2.prototype.getType = function() {
      return GeometryType.LINEAR_RING;
    };
    LinearRing2.prototype.intersectsExtent = function(extent) {
      return false;
    };
    LinearRing2.prototype.setCoordinates = function(coordinates2, opt_layout) {
      this.setLayout(opt_layout, coordinates2, 1);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      this.flatCoordinates.length = deflateCoordinates(this.flatCoordinates, 0, coordinates2, this.stride);
      this.changed();
    };
    return LinearRing2;
  }(SimpleGeometry$1);
  var LinearRing$1 = LinearRing;
  var __extends$$ = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Point = function(_super) {
    __extends$$(Point2, _super);
    function Point2(coordinates2, opt_layout) {
      var _this = _super.call(this) || this;
      _this.setCoordinates(coordinates2, opt_layout);
      return _this;
    }
    Point2.prototype.clone = function() {
      var point = new Point2(this.flatCoordinates.slice(), this.layout);
      point.applyProperties(this);
      return point;
    };
    Point2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
      var flatCoordinates = this.flatCoordinates;
      var squaredDistance$1 = squaredDistance(x, y, flatCoordinates[0], flatCoordinates[1]);
      if (squaredDistance$1 < minSquaredDistance) {
        var stride = this.stride;
        for (var i = 0; i < stride; ++i) {
          closestPoint[i] = flatCoordinates[i];
        }
        closestPoint.length = stride;
        return squaredDistance$1;
      } else {
        return minSquaredDistance;
      }
    };
    Point2.prototype.getCoordinates = function() {
      return !this.flatCoordinates ? [] : this.flatCoordinates.slice();
    };
    Point2.prototype.computeExtent = function(extent) {
      return createOrUpdateFromCoordinate(this.flatCoordinates, extent);
    };
    Point2.prototype.getType = function() {
      return GeometryType.POINT;
    };
    Point2.prototype.intersectsExtent = function(extent) {
      return containsXY(extent, this.flatCoordinates[0], this.flatCoordinates[1]);
    };
    Point2.prototype.setCoordinates = function(coordinates2, opt_layout) {
      this.setLayout(opt_layout, coordinates2, 0);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      this.flatCoordinates.length = deflateCoordinate(this.flatCoordinates, 0, coordinates2, this.stride);
      this.changed();
    };
    return Point2;
  }(SimpleGeometry$1);
  var Point$1 = Point;
  function linearRingContainsExtent(flatCoordinates, offset, end, stride, extent) {
    var outside = forEachCorner(extent, function(coordinate) {
      return !linearRingContainsXY(flatCoordinates, offset, end, stride, coordinate[0], coordinate[1]);
    });
    return !outside;
  }
  function linearRingContainsXY(flatCoordinates, offset, end, stride, x, y) {
    var wn = 0;
    var x1 = flatCoordinates[end - stride];
    var y1 = flatCoordinates[end - stride + 1];
    for (; offset < end; offset += stride) {
      var x2 = flatCoordinates[offset];
      var y2 = flatCoordinates[offset + 1];
      if (y1 <= y) {
        if (y2 > y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) > 0) {
          wn++;
        }
      } else if (y2 <= y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) < 0) {
        wn--;
      }
      x1 = x2;
      y1 = y2;
    }
    return wn !== 0;
  }
  function linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y) {
    if (ends.length === 0) {
      return false;
    }
    if (!linearRingContainsXY(flatCoordinates, offset, ends[0], stride, x, y)) {
      return false;
    }
    for (var i = 1, ii = ends.length; i < ii; ++i) {
      if (linearRingContainsXY(flatCoordinates, ends[i - 1], ends[i], stride, x, y)) {
        return false;
      }
    }
    return true;
  }
  function getInteriorPointOfArray(flatCoordinates, offset, ends, stride, flatCenters, flatCentersOffset, opt_dest) {
    var i, ii, x, x1, x2, y1, y2;
    var y = flatCenters[flatCentersOffset + 1];
    var intersections = [];
    for (var r = 0, rr = ends.length; r < rr; ++r) {
      var end = ends[r];
      x1 = flatCoordinates[end - stride];
      y1 = flatCoordinates[end - stride + 1];
      for (i = offset; i < end; i += stride) {
        x2 = flatCoordinates[i];
        y2 = flatCoordinates[i + 1];
        if (y <= y1 && y2 <= y || y1 <= y && y <= y2) {
          x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
          intersections.push(x);
        }
        x1 = x2;
        y1 = y2;
      }
    }
    var pointX = NaN;
    var maxSegmentLength = -Infinity;
    intersections.sort(numberSafeCompareFunction);
    x1 = intersections[0];
    for (i = 1, ii = intersections.length; i < ii; ++i) {
      x2 = intersections[i];
      var segmentLength = Math.abs(x2 - x1);
      if (segmentLength > maxSegmentLength) {
        x = (x1 + x2) / 2;
        if (linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y)) {
          pointX = x;
          maxSegmentLength = segmentLength;
        }
      }
      x1 = x2;
    }
    if (isNaN(pointX)) {
      pointX = flatCenters[flatCentersOffset];
    }
    if (opt_dest) {
      opt_dest.push(pointX, y, maxSegmentLength);
      return opt_dest;
    } else {
      return [pointX, y, maxSegmentLength];
    }
  }
  function forEach(flatCoordinates, offset, end, stride, callback) {
    var ret;
    offset += stride;
    for (; offset < end; offset += stride) {
      ret = callback(flatCoordinates.slice(offset - stride, offset), flatCoordinates.slice(offset, offset + stride));
      if (ret) {
        return ret;
      }
    }
    return false;
  }
  function intersectsLineString(flatCoordinates, offset, end, stride, extent) {
    var coordinatesExtent = extendFlatCoordinates(createEmpty(), flatCoordinates, offset, end, stride);
    if (!intersects$1(extent, coordinatesExtent)) {
      return false;
    }
    if (containsExtent(extent, coordinatesExtent)) {
      return true;
    }
    if (coordinatesExtent[0] >= extent[0] && coordinatesExtent[2] <= extent[2]) {
      return true;
    }
    if (coordinatesExtent[1] >= extent[1] && coordinatesExtent[3] <= extent[3]) {
      return true;
    }
    return forEach(flatCoordinates, offset, end, stride, function(point1, point2) {
      return intersectsSegment(extent, point1, point2);
    });
  }
  function intersectsLinearRing(flatCoordinates, offset, end, stride, extent) {
    if (intersectsLineString(flatCoordinates, offset, end, stride, extent)) {
      return true;
    }
    if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[0], extent[1])) {
      return true;
    }
    if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[0], extent[3])) {
      return true;
    }
    if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[2], extent[1])) {
      return true;
    }
    if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[2], extent[3])) {
      return true;
    }
    return false;
  }
  function intersectsLinearRingArray(flatCoordinates, offset, ends, stride, extent) {
    if (!intersectsLinearRing(flatCoordinates, offset, ends[0], stride, extent)) {
      return false;
    }
    if (ends.length === 1) {
      return true;
    }
    for (var i = 1, ii = ends.length; i < ii; ++i) {
      if (linearRingContainsExtent(flatCoordinates, ends[i - 1], ends[i], stride, extent)) {
        if (!intersectsLineString(flatCoordinates, ends[i - 1], ends[i], stride, extent)) {
          return false;
        }
      }
    }
    return true;
  }
  function coordinates(flatCoordinates, offset, end, stride) {
    while (offset < end - stride) {
      for (var i = 0; i < stride; ++i) {
        var tmp = flatCoordinates[offset + i];
        flatCoordinates[offset + i] = flatCoordinates[end - stride + i];
        flatCoordinates[end - stride + i] = tmp;
      }
      offset += stride;
      end -= stride;
    }
  }
  function linearRingIsClockwise(flatCoordinates, offset, end, stride) {
    var edge = 0;
    var x1 = flatCoordinates[end - stride];
    var y1 = flatCoordinates[end - stride + 1];
    for (; offset < end; offset += stride) {
      var x2 = flatCoordinates[offset];
      var y2 = flatCoordinates[offset + 1];
      edge += (x2 - x1) * (y2 + y1);
      x1 = x2;
      y1 = y2;
    }
    return edge === 0 ? void 0 : edge > 0;
  }
  function linearRingsAreOriented(flatCoordinates, offset, ends, stride, opt_right) {
    var right = opt_right !== void 0 ? opt_right : false;
    for (var i = 0, ii = ends.length; i < ii; ++i) {
      var end = ends[i];
      var isClockwise = linearRingIsClockwise(flatCoordinates, offset, end, stride);
      if (i === 0) {
        if (right && isClockwise || !right && !isClockwise) {
          return false;
        }
      } else {
        if (right && !isClockwise || !right && isClockwise) {
          return false;
        }
      }
      offset = end;
    }
    return true;
  }
  function orientLinearRings(flatCoordinates, offset, ends, stride, opt_right) {
    var right = opt_right !== void 0 ? opt_right : false;
    for (var i = 0, ii = ends.length; i < ii; ++i) {
      var end = ends[i];
      var isClockwise = linearRingIsClockwise(flatCoordinates, offset, end, stride);
      var reverse = i === 0 ? right && isClockwise || !right && !isClockwise : right && !isClockwise || !right && isClockwise;
      if (reverse) {
        coordinates(flatCoordinates, offset, end, stride);
      }
      offset = end;
    }
    return offset;
  }
  var __extends$_ = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Polygon = function(_super) {
    __extends$_(Polygon2, _super);
    function Polygon2(coordinates2, opt_layout, opt_ends) {
      var _this = _super.call(this) || this;
      _this.ends_ = [];
      _this.flatInteriorPointRevision_ = -1;
      _this.flatInteriorPoint_ = null;
      _this.maxDelta_ = -1;
      _this.maxDeltaRevision_ = -1;
      _this.orientedRevision_ = -1;
      _this.orientedFlatCoordinates_ = null;
      if (opt_layout !== void 0 && opt_ends) {
        _this.setFlatCoordinates(opt_layout, coordinates2);
        _this.ends_ = opt_ends;
      } else {
        _this.setCoordinates(coordinates2, opt_layout);
      }
      return _this;
    }
    Polygon2.prototype.appendLinearRing = function(linearRing2) {
      if (!this.flatCoordinates) {
        this.flatCoordinates = linearRing2.getFlatCoordinates().slice();
      } else {
        extend$2(this.flatCoordinates, linearRing2.getFlatCoordinates());
      }
      this.ends_.push(this.flatCoordinates.length);
      this.changed();
    };
    Polygon2.prototype.clone = function() {
      var polygon = new Polygon2(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
      polygon.applyProperties(this);
      return polygon;
    };
    Polygon2.prototype.closestPointXY = function(x, y, closestPoint, minSquaredDistance) {
      if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
        return minSquaredDistance;
      }
      if (this.maxDeltaRevision_ != this.getRevision()) {
        this.maxDelta_ = Math.sqrt(arrayMaxSquaredDelta(this.flatCoordinates, 0, this.ends_, this.stride, 0));
        this.maxDeltaRevision_ = this.getRevision();
      }
      return assignClosestArrayPoint(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
    };
    Polygon2.prototype.containsXY = function(x, y) {
      return linearRingsContainsXY(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, x, y);
    };
    Polygon2.prototype.getArea = function() {
      return linearRings(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride);
    };
    Polygon2.prototype.getCoordinates = function(opt_right) {
      var flatCoordinates;
      if (opt_right !== void 0) {
        flatCoordinates = this.getOrientedFlatCoordinates().slice();
        orientLinearRings(flatCoordinates, 0, this.ends_, this.stride, opt_right);
      } else {
        flatCoordinates = this.flatCoordinates;
      }
      return inflateCoordinatesArray(flatCoordinates, 0, this.ends_, this.stride);
    };
    Polygon2.prototype.getEnds = function() {
      return this.ends_;
    };
    Polygon2.prototype.getFlatInteriorPoint = function() {
      if (this.flatInteriorPointRevision_ != this.getRevision()) {
        var flatCenter = getCenter(this.getExtent());
        this.flatInteriorPoint_ = getInteriorPointOfArray(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, flatCenter, 0);
        this.flatInteriorPointRevision_ = this.getRevision();
      }
      return this.flatInteriorPoint_;
    };
    Polygon2.prototype.getInteriorPoint = function() {
      return new Point$1(this.getFlatInteriorPoint(), GeometryLayout.XYM);
    };
    Polygon2.prototype.getLinearRingCount = function() {
      return this.ends_.length;
    };
    Polygon2.prototype.getLinearRing = function(index) {
      if (index < 0 || this.ends_.length <= index) {
        return null;
      }
      return new LinearRing$1(this.flatCoordinates.slice(index === 0 ? 0 : this.ends_[index - 1], this.ends_[index]), this.layout);
    };
    Polygon2.prototype.getLinearRings = function() {
      var layout = this.layout;
      var flatCoordinates = this.flatCoordinates;
      var ends = this.ends_;
      var linearRings2 = [];
      var offset = 0;
      for (var i = 0, ii = ends.length; i < ii; ++i) {
        var end = ends[i];
        var linearRing2 = new LinearRing$1(flatCoordinates.slice(offset, end), layout);
        linearRings2.push(linearRing2);
        offset = end;
      }
      return linearRings2;
    };
    Polygon2.prototype.getOrientedFlatCoordinates = function() {
      if (this.orientedRevision_ != this.getRevision()) {
        var flatCoordinates = this.flatCoordinates;
        if (linearRingsAreOriented(flatCoordinates, 0, this.ends_, this.stride)) {
          this.orientedFlatCoordinates_ = flatCoordinates;
        } else {
          this.orientedFlatCoordinates_ = flatCoordinates.slice();
          this.orientedFlatCoordinates_.length = orientLinearRings(this.orientedFlatCoordinates_, 0, this.ends_, this.stride);
        }
        this.orientedRevision_ = this.getRevision();
      }
      return this.orientedFlatCoordinates_;
    };
    Polygon2.prototype.getSimplifiedGeometryInternal = function(squaredTolerance) {
      var simplifiedFlatCoordinates = [];
      var simplifiedEnds = [];
      simplifiedFlatCoordinates.length = quantizeArray(this.flatCoordinates, 0, this.ends_, this.stride, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEnds);
      return new Polygon2(simplifiedFlatCoordinates, GeometryLayout.XY, simplifiedEnds);
    };
    Polygon2.prototype.getType = function() {
      return GeometryType.POLYGON;
    };
    Polygon2.prototype.intersectsExtent = function(extent) {
      return intersectsLinearRingArray(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, extent);
    };
    Polygon2.prototype.setCoordinates = function(coordinates2, opt_layout) {
      this.setLayout(opt_layout, coordinates2, 2);
      if (!this.flatCoordinates) {
        this.flatCoordinates = [];
      }
      var ends = deflateCoordinatesArray(this.flatCoordinates, 0, coordinates2, this.stride, this.ends_);
      this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
      this.changed();
    };
    return Polygon2;
  }(SimpleGeometry$1);
  function fromExtent(extent) {
    var minX = extent[0];
    var minY = extent[1];
    var maxX = extent[2];
    var maxY = extent[3];
    var flatCoordinates = [
      minX,
      minY,
      minX,
      maxY,
      maxX,
      maxY,
      maxX,
      minY,
      minX,
      minY
    ];
    return new Polygon(flatCoordinates, GeometryLayout.XY, [
      flatCoordinates.length
    ]);
  }
  var RenderEventType = {
    PRERENDER: "prerender",
    POSTRENDER: "postrender",
    PRECOMPOSE: "precompose",
    POSTCOMPOSE: "postcompose",
    RENDERCOMPLETE: "rendercomplete"
  };
  var Fill = function() {
    function Fill2(opt_options) {
      var options = opt_options || {};
      this.color_ = options.color !== void 0 ? options.color : null;
    }
    Fill2.prototype.clone = function() {
      var color = this.getColor();
      return new Fill2({
        color: Array.isArray(color) ? color.slice() : color || void 0
      });
    };
    Fill2.prototype.getColor = function() {
      return this.color_;
    };
    Fill2.prototype.setColor = function(color) {
      this.color_ = color;
    };
    return Fill2;
  }();
  var Fill$1 = Fill;
  function lineStringLength(flatCoordinates, offset, end, stride) {
    var x1 = flatCoordinates[offset];
    var y1 = flatCoordinates[offset + 1];
    var length = 0;
    for (var i = offset + stride; i < end; i += stride) {
      var x2 = flatCoordinates[i];
      var y2 = flatCoordinates[i + 1];
      length += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      x1 = x2;
      y1 = y2;
    }
    return length;
  }
  var Stroke = function() {
    function Stroke2(opt_options) {
      var options = opt_options || {};
      this.color_ = options.color !== void 0 ? options.color : null;
      this.lineCap_ = options.lineCap;
      this.lineDash_ = options.lineDash !== void 0 ? options.lineDash : null;
      this.lineDashOffset_ = options.lineDashOffset;
      this.lineJoin_ = options.lineJoin;
      this.miterLimit_ = options.miterLimit;
      this.width_ = options.width;
    }
    Stroke2.prototype.clone = function() {
      var color = this.getColor();
      return new Stroke2({
        color: Array.isArray(color) ? color.slice() : color || void 0,
        lineCap: this.getLineCap(),
        lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0,
        lineDashOffset: this.getLineDashOffset(),
        lineJoin: this.getLineJoin(),
        miterLimit: this.getMiterLimit(),
        width: this.getWidth()
      });
    };
    Stroke2.prototype.getColor = function() {
      return this.color_;
    };
    Stroke2.prototype.getLineCap = function() {
      return this.lineCap_;
    };
    Stroke2.prototype.getLineDash = function() {
      return this.lineDash_;
    };
    Stroke2.prototype.getLineDashOffset = function() {
      return this.lineDashOffset_;
    };
    Stroke2.prototype.getLineJoin = function() {
      return this.lineJoin_;
    };
    Stroke2.prototype.getMiterLimit = function() {
      return this.miterLimit_;
    };
    Stroke2.prototype.getWidth = function() {
      return this.width_;
    };
    Stroke2.prototype.setColor = function(color) {
      this.color_ = color;
    };
    Stroke2.prototype.setLineCap = function(lineCap) {
      this.lineCap_ = lineCap;
    };
    Stroke2.prototype.setLineDash = function(lineDash) {
      this.lineDash_ = lineDash;
    };
    Stroke2.prototype.setLineDashOffset = function(lineDashOffset) {
      this.lineDashOffset_ = lineDashOffset;
    };
    Stroke2.prototype.setLineJoin = function(lineJoin) {
      this.lineJoin_ = lineJoin;
    };
    Stroke2.prototype.setMiterLimit = function(miterLimit) {
      this.miterLimit_ = miterLimit;
    };
    Stroke2.prototype.setWidth = function(width) {
      this.width_ = width;
    };
    return Stroke2;
  }();
  var Stroke$1 = Stroke;
  var ImageState = {
    IDLE: 0,
    LOADING: 1,
    LOADED: 2,
    ERROR: 3,
    EMPTY: 4
  };
  function hasArea(size) {
    return size[0] > 0 && size[1] > 0;
  }
  function scale(size, ratio, opt_size) {
    if (opt_size === void 0) {
      opt_size = [0, 0];
    }
    opt_size[0] = size[0] * ratio + 0.5 | 0;
    opt_size[1] = size[1] * ratio + 0.5 | 0;
    return opt_size;
  }
  function toSize(size, opt_size) {
    if (Array.isArray(size)) {
      return size;
    } else {
      if (opt_size === void 0) {
        opt_size = [size, size];
      } else {
        opt_size[0] = size;
        opt_size[1] = size;
      }
      return opt_size;
    }
  }
  var ImageStyle = function() {
    function ImageStyle2(options) {
      this.opacity_ = options.opacity;
      this.rotateWithView_ = options.rotateWithView;
      this.rotation_ = options.rotation;
      this.scale_ = options.scale;
      this.scaleArray_ = toSize(options.scale);
      this.displacement_ = options.displacement;
    }
    ImageStyle2.prototype.clone = function() {
      var scale2 = this.getScale();
      return new ImageStyle2({
        opacity: this.getOpacity(),
        scale: Array.isArray(scale2) ? scale2.slice() : scale2,
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView(),
        displacement: this.getDisplacement().slice()
      });
    };
    ImageStyle2.prototype.getOpacity = function() {
      return this.opacity_;
    };
    ImageStyle2.prototype.getRotateWithView = function() {
      return this.rotateWithView_;
    };
    ImageStyle2.prototype.getRotation = function() {
      return this.rotation_;
    };
    ImageStyle2.prototype.getScale = function() {
      return this.scale_;
    };
    ImageStyle2.prototype.getScaleArray = function() {
      return this.scaleArray_;
    };
    ImageStyle2.prototype.getDisplacement = function() {
      return this.displacement_;
    };
    ImageStyle2.prototype.getAnchor = function() {
      return abstract();
    };
    ImageStyle2.prototype.getImage = function(pixelRatio) {
      return abstract();
    };
    ImageStyle2.prototype.getHitDetectionImage = function() {
      return abstract();
    };
    ImageStyle2.prototype.getPixelRatio = function(pixelRatio) {
      return 1;
    };
    ImageStyle2.prototype.getImageState = function() {
      return abstract();
    };
    ImageStyle2.prototype.getImageSize = function() {
      return abstract();
    };
    ImageStyle2.prototype.getOrigin = function() {
      return abstract();
    };
    ImageStyle2.prototype.getSize = function() {
      return abstract();
    };
    ImageStyle2.prototype.setOpacity = function(opacity) {
      this.opacity_ = opacity;
    };
    ImageStyle2.prototype.setRotateWithView = function(rotateWithView) {
      this.rotateWithView_ = rotateWithView;
    };
    ImageStyle2.prototype.setRotation = function(rotation) {
      this.rotation_ = rotation;
    };
    ImageStyle2.prototype.setScale = function(scale2) {
      this.scale_ = scale2;
      this.scaleArray_ = toSize(scale2);
    };
    ImageStyle2.prototype.listenImageChange = function(listener) {
      abstract();
    };
    ImageStyle2.prototype.load = function() {
      abstract();
    };
    ImageStyle2.prototype.unlistenImageChange = function(listener) {
      abstract();
    };
    return ImageStyle2;
  }();
  var ImageStyle$1 = ImageStyle;
  var HEX_COLOR_RE_ = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i;
  var NAMED_COLOR_RE_ = /^([a-z]*)$|^hsla?\(.*\)$/i;
  function asString(color) {
    if (typeof color === "string") {
      return color;
    } else {
      return toString(color);
    }
  }
  function fromNamed(color) {
    var el = document.createElement("div");
    el.style.color = color;
    if (el.style.color !== "") {
      document.body.appendChild(el);
      var rgb = getComputedStyle(el).color;
      document.body.removeChild(el);
      return rgb;
    } else {
      return "";
    }
  }
  var fromString = function() {
    var MAX_CACHE_SIZE = 1024;
    var cache2 = {};
    var cacheSize = 0;
    return function(s) {
      var color;
      if (cache2.hasOwnProperty(s)) {
        color = cache2[s];
      } else {
        if (cacheSize >= MAX_CACHE_SIZE) {
          var i = 0;
          for (var key in cache2) {
            if ((i++ & 3) === 0) {
              delete cache2[key];
              --cacheSize;
            }
          }
        }
        color = fromStringInternal_(s);
        cache2[s] = color;
        ++cacheSize;
      }
      return color;
    };
  }();
  function asArray(color) {
    if (Array.isArray(color)) {
      return color;
    } else {
      return fromString(color);
    }
  }
  function fromStringInternal_(s) {
    var r, g, b, a, color;
    if (NAMED_COLOR_RE_.exec(s)) {
      s = fromNamed(s);
    }
    if (HEX_COLOR_RE_.exec(s)) {
      var n = s.length - 1;
      var d = void 0;
      if (n <= 4) {
        d = 1;
      } else {
        d = 2;
      }
      var hasAlpha = n === 4 || n === 8;
      r = parseInt(s.substr(1 + 0 * d, d), 16);
      g = parseInt(s.substr(1 + 1 * d, d), 16);
      b = parseInt(s.substr(1 + 2 * d, d), 16);
      if (hasAlpha) {
        a = parseInt(s.substr(1 + 3 * d, d), 16);
      } else {
        a = 255;
      }
      if (d == 1) {
        r = (r << 4) + r;
        g = (g << 4) + g;
        b = (b << 4) + b;
        if (hasAlpha) {
          a = (a << 4) + a;
        }
      }
      color = [r, g, b, a / 255];
    } else if (s.indexOf("rgba(") == 0) {
      color = s.slice(5, -1).split(",").map(Number);
      normalize(color);
    } else if (s.indexOf("rgb(") == 0) {
      color = s.slice(4, -1).split(",").map(Number);
      color.push(1);
      normalize(color);
    } else {
      assert(false, 14);
    }
    return color;
  }
  function normalize(color) {
    color[0] = clamp(color[0] + 0.5 | 0, 0, 255);
    color[1] = clamp(color[1] + 0.5 | 0, 0, 255);
    color[2] = clamp(color[2] + 0.5 | 0, 0, 255);
    color[3] = clamp(color[3], 0, 1);
    return color;
  }
  function toString(color) {
    var r = color[0];
    if (r != (r | 0)) {
      r = r + 0.5 | 0;
    }
    var g = color[1];
    if (g != (g | 0)) {
      g = g + 0.5 | 0;
    }
    var b = color[2];
    if (b != (b | 0)) {
      b = b + 0.5 | 0;
    }
    var a = color[3] === void 0 ? 1 : color[3];
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }
  function asColorLike(color) {
    if (Array.isArray(color)) {
      return toString(color);
    } else {
      return color;
    }
  }
  function createCanvasContext2D(opt_width, opt_height, opt_canvasPool, opt_Context2DSettings) {
    var canvas;
    if (opt_canvasPool && opt_canvasPool.length) {
      canvas = opt_canvasPool.shift();
    } else if (WORKER_OFFSCREEN_CANVAS) {
      canvas = new OffscreenCanvas(opt_width || 300, opt_height || 300);
    } else {
      canvas = document.createElement("canvas");
      canvas.style.all = "unset";
    }
    if (opt_width) {
      canvas.width = opt_width;
    }
    if (opt_height) {
      canvas.height = opt_height;
    }
    return canvas.getContext("2d", opt_Context2DSettings);
  }
  function outerWidth(element) {
    var width = element.offsetWidth;
    var style = getComputedStyle(element);
    width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
    return width;
  }
  function outerHeight(element) {
    var height = element.offsetHeight;
    var style = getComputedStyle(element);
    height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
    return height;
  }
  function replaceNode(newNode, oldNode) {
    var parent = oldNode.parentNode;
    if (parent) {
      parent.replaceChild(newNode, oldNode);
    }
  }
  function removeNode(node) {
    return node && node.parentNode ? node.parentNode.removeChild(node) : null;
  }
  function removeChildren(node) {
    while (node.lastChild) {
      node.removeChild(node.lastChild);
    }
  }
  function replaceChildren(node, children) {
    var oldChildren = node.childNodes;
    for (var i = 0; true; ++i) {
      var oldChild = oldChildren[i];
      var newChild = children[i];
      if (!oldChild && !newChild) {
        break;
      }
      if (oldChild === newChild) {
        continue;
      }
      if (!oldChild) {
        node.appendChild(newChild);
        continue;
      }
      if (!newChild) {
        node.removeChild(oldChild);
        --i;
        continue;
      }
      node.insertBefore(newChild, oldChild);
    }
  }
  var CLASS_HIDDEN = "ol-hidden";
  var CLASS_SELECTABLE = "ol-selectable";
  var CLASS_UNSELECTABLE = "ol-unselectable";
  var CLASS_CONTROL = "ol-control";
  var CLASS_COLLAPSED = "ol-collapsed";
  var fontRegEx = new RegExp([
    "^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)",
    "(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)",
    "(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)",
    "(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?",
    "(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))",
    "(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))",
    `?\\s*([-,\\"\\'\\sa-z]+?)\\s*$`
  ].join(""), "i");
  var fontRegExMatchIndex = [
    "style",
    "variant",
    "weight",
    "size",
    "lineHeight",
    "family"
  ];
  var getFontParameters = function(fontSpec) {
    var match = fontSpec.match(fontRegEx);
    if (!match) {
      return null;
    }
    var style = {
      lineHeight: "normal",
      size: "1.2em",
      style: "normal",
      weight: "normal",
      variant: "normal"
    };
    for (var i = 0, ii = fontRegExMatchIndex.length; i < ii; ++i) {
      var value = match[i + 1];
      if (value !== void 0) {
        style[fontRegExMatchIndex[i]] = value;
      }
    }
    style.families = style.family.split(/,\s?/);
    return style;
  };
  function cssOpacity(opacity) {
    return opacity === 1 ? "" : String(Math.round(opacity * 100) / 100);
  }
  var defaultFont = "10px sans-serif";
  var defaultFillStyle = "#000";
  var defaultLineCap = "round";
  var defaultLineDash = [];
  var defaultLineDashOffset = 0;
  var defaultLineJoin = "round";
  var defaultMiterLimit = 10;
  var defaultStrokeStyle = "#000";
  var defaultTextAlign = "center";
  var defaultTextBaseline = "middle";
  var defaultPadding = [0, 0, 0, 0];
  var defaultLineWidth = 1;
  var checkedFonts = new BaseObject$1();
  var labelCache = new Target$1();
  labelCache.setSize = function() {
    console.warn("labelCache is deprecated.");
  };
  var measureContext = null;
  var measureFont;
  var textHeights = {};
  var registerFont = function() {
    var retries = 100;
    var size = "32px ";
    var referenceFonts = ["monospace", "serif"];
    var len = referenceFonts.length;
    var text = "wmytzilWMYTZIL@#/&?$%10\uF013";
    var interval, referenceWidth;
    function isAvailable(fontStyle, fontWeight, fontFamily) {
      var available = true;
      for (var i = 0; i < len; ++i) {
        var referenceFont = referenceFonts[i];
        referenceWidth = measureTextWidth(fontStyle + " " + fontWeight + " " + size + referenceFont, text);
        if (fontFamily != referenceFont) {
          var width = measureTextWidth(fontStyle + " " + fontWeight + " " + size + fontFamily + "," + referenceFont, text);
          available = available && width != referenceWidth;
        }
      }
      if (available) {
        return true;
      }
      return false;
    }
    function check() {
      var done = true;
      var fonts = checkedFonts.getKeys();
      for (var i = 0, ii = fonts.length; i < ii; ++i) {
        var font = fonts[i];
        if (checkedFonts.get(font) < retries) {
          if (isAvailable.apply(this, font.split("\n"))) {
            clear(textHeights);
            measureContext = null;
            measureFont = void 0;
            checkedFonts.set(font, retries);
          } else {
            checkedFonts.set(font, checkedFonts.get(font) + 1, true);
            done = false;
          }
        }
      }
      if (done) {
        clearInterval(interval);
        interval = void 0;
      }
    }
    return function(fontSpec) {
      var font = getFontParameters(fontSpec);
      if (!font) {
        return;
      }
      var families = font.families;
      for (var i = 0, ii = families.length; i < ii; ++i) {
        var family = families[i];
        var key = font.style + "\n" + font.weight + "\n" + family;
        if (checkedFonts.get(key) === void 0) {
          checkedFonts.set(key, retries, true);
          if (!isAvailable(font.style, font.weight, family)) {
            checkedFonts.set(key, 0, true);
            if (interval === void 0) {
              interval = setInterval(check, 32);
            }
          }
        }
      }
    };
  }();
  var measureTextHeight = function() {
    var measureElement;
    return function(fontSpec) {
      var height = textHeights[fontSpec];
      if (height == void 0) {
        if (WORKER_OFFSCREEN_CANVAS) {
          var font = getFontParameters(fontSpec);
          var metrics = measureText(fontSpec, "\u017Dg");
          var lineHeight = isNaN(Number(font.lineHeight)) ? 1.2 : Number(font.lineHeight);
          height = lineHeight * (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
        } else {
          if (!measureElement) {
            measureElement = document.createElement("div");
            measureElement.innerHTML = "M";
            measureElement.style.minHeight = "0";
            measureElement.style.maxHeight = "none";
            measureElement.style.height = "auto";
            measureElement.style.padding = "0";
            measureElement.style.border = "none";
            measureElement.style.position = "absolute";
            measureElement.style.display = "block";
            measureElement.style.left = "-99999px";
          }
          measureElement.style.font = fontSpec;
          document.body.appendChild(measureElement);
          height = measureElement.offsetHeight;
          document.body.removeChild(measureElement);
        }
        textHeights[fontSpec] = height;
      }
      return height;
    };
  }();
  function measureText(font, text) {
    if (!measureContext) {
      measureContext = createCanvasContext2D(1, 1);
    }
    if (font != measureFont) {
      measureContext.font = font;
      measureFont = measureContext.font;
    }
    return measureContext.measureText(text);
  }
  function measureTextWidth(font, text) {
    return measureText(font, text).width;
  }
  function measureAndCacheTextWidth(font, text, cache2) {
    if (text in cache2) {
      return cache2[text];
    }
    var width = measureTextWidth(font, text);
    cache2[text] = width;
    return width;
  }
  function measureTextWidths(font, lines, widths) {
    var numLines = lines.length;
    var width = 0;
    for (var i = 0; i < numLines; ++i) {
      var currentWidth = measureTextWidth(font, lines[i]);
      width = Math.max(width, currentWidth);
      widths.push(currentWidth);
    }
    return width;
  }
  function drawImageOrLabel(context, transform2, opacity, labelOrImage, originX, originY, w, h, x, y, scale2) {
    context.save();
    if (opacity !== 1) {
      context.globalAlpha *= opacity;
    }
    if (transform2) {
      context.setTransform.apply(context, transform2);
    }
    if (labelOrImage.contextInstructions) {
      context.translate(x, y);
      context.scale(scale2[0], scale2[1]);
      executeLabelInstructions(labelOrImage, context);
    } else if (scale2[0] < 0 || scale2[1] < 0) {
      context.translate(x, y);
      context.scale(scale2[0], scale2[1]);
      context.drawImage(labelOrImage, originX, originY, w, h, 0, 0, w, h);
    } else {
      context.drawImage(labelOrImage, originX, originY, w, h, x, y, w * scale2[0], h * scale2[1]);
    }
    context.restore();
  }
  function executeLabelInstructions(label, context) {
    var contextInstructions = label.contextInstructions;
    for (var i = 0, ii = contextInstructions.length; i < ii; i += 2) {
      if (Array.isArray(contextInstructions[i + 1])) {
        context[contextInstructions[i]].apply(context, contextInstructions[i + 1]);
      } else {
        context[contextInstructions[i]] = contextInstructions[i + 1];
      }
    }
  }
  var __extends$Z = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var RegularShape = function(_super) {
    __extends$Z(RegularShape2, _super);
    function RegularShape2(options) {
      var _this = this;
      var rotateWithView = options.rotateWithView !== void 0 ? options.rotateWithView : false;
      _this = _super.call(this, {
        opacity: 1,
        rotateWithView,
        rotation: options.rotation !== void 0 ? options.rotation : 0,
        scale: options.scale !== void 0 ? options.scale : 1,
        displacement: options.displacement !== void 0 ? options.displacement : [0, 0]
      }) || this;
      _this.canvas_ = void 0;
      _this.hitDetectionCanvas_ = null;
      _this.fill_ = options.fill !== void 0 ? options.fill : null;
      _this.origin_ = [0, 0];
      _this.points_ = options.points;
      _this.radius_ = options.radius !== void 0 ? options.radius : options.radius1;
      _this.radius2_ = options.radius2;
      _this.angle_ = options.angle !== void 0 ? options.angle : 0;
      _this.stroke_ = options.stroke !== void 0 ? options.stroke : null;
      _this.anchor_ = null;
      _this.size_ = null;
      _this.renderOptions_ = null;
      _this.render();
      return _this;
    }
    RegularShape2.prototype.clone = function() {
      var scale2 = this.getScale();
      var style = new RegularShape2({
        fill: this.getFill() ? this.getFill().clone() : void 0,
        points: this.getPoints(),
        radius: this.getRadius(),
        radius2: this.getRadius2(),
        angle: this.getAngle(),
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView(),
        scale: Array.isArray(scale2) ? scale2.slice() : scale2,
        displacement: this.getDisplacement().slice()
      });
      style.setOpacity(this.getOpacity());
      return style;
    };
    RegularShape2.prototype.getAnchor = function() {
      return this.anchor_;
    };
    RegularShape2.prototype.getAngle = function() {
      return this.angle_;
    };
    RegularShape2.prototype.getFill = function() {
      return this.fill_;
    };
    RegularShape2.prototype.getHitDetectionImage = function() {
      if (!this.hitDetectionCanvas_) {
        this.createHitDetectionCanvas_(this.renderOptions_);
      }
      return this.hitDetectionCanvas_;
    };
    RegularShape2.prototype.getImage = function(pixelRatio) {
      var image = this.canvas_[pixelRatio];
      if (!image) {
        var renderOptions = this.renderOptions_;
        var context = createCanvasContext2D(renderOptions.size * pixelRatio, renderOptions.size * pixelRatio);
        this.draw_(renderOptions, context, pixelRatio);
        image = context.canvas;
        this.canvas_[pixelRatio] = image;
      }
      return image;
    };
    RegularShape2.prototype.getPixelRatio = function(pixelRatio) {
      return pixelRatio;
    };
    RegularShape2.prototype.getImageSize = function() {
      return this.size_;
    };
    RegularShape2.prototype.getImageState = function() {
      return ImageState.LOADED;
    };
    RegularShape2.prototype.getOrigin = function() {
      return this.origin_;
    };
    RegularShape2.prototype.getPoints = function() {
      return this.points_;
    };
    RegularShape2.prototype.getRadius = function() {
      return this.radius_;
    };
    RegularShape2.prototype.getRadius2 = function() {
      return this.radius2_;
    };
    RegularShape2.prototype.getSize = function() {
      return this.size_;
    };
    RegularShape2.prototype.getStroke = function() {
      return this.stroke_;
    };
    RegularShape2.prototype.listenImageChange = function(listener) {
    };
    RegularShape2.prototype.load = function() {
    };
    RegularShape2.prototype.unlistenImageChange = function(listener) {
    };
    RegularShape2.prototype.calculateLineJoinSize_ = function(lineJoin, strokeWidth, miterLimit) {
      if (strokeWidth === 0 || this.points_ === Infinity || lineJoin !== "bevel" && lineJoin !== "miter") {
        return strokeWidth;
      }
      var r1 = this.radius_;
      var r2 = this.radius2_ === void 0 ? r1 : this.radius2_;
      if (r1 < r2) {
        var tmp = r1;
        r1 = r2;
        r2 = tmp;
      }
      var points = this.radius2_ === void 0 ? this.points_ : this.points_ * 2;
      var alpha = 2 * Math.PI / points;
      var a = r2 * Math.sin(alpha);
      var b = Math.sqrt(r2 * r2 - a * a);
      var d = r1 - b;
      var e = Math.sqrt(a * a + d * d);
      var miterRatio = e / a;
      if (lineJoin === "miter" && miterRatio <= miterLimit) {
        return miterRatio * strokeWidth;
      }
      var k = strokeWidth / 2 / miterRatio;
      var l = strokeWidth / 2 * (d / e);
      var maxr = Math.sqrt((r1 + k) * (r1 + k) + l * l);
      var bevelAdd = maxr - r1;
      if (this.radius2_ === void 0 || lineJoin === "bevel") {
        return bevelAdd * 2;
      }
      var aa = r1 * Math.sin(alpha);
      var bb = Math.sqrt(r1 * r1 - aa * aa);
      var dd = r2 - bb;
      var ee = Math.sqrt(aa * aa + dd * dd);
      var innerMiterRatio = ee / aa;
      if (innerMiterRatio <= miterLimit) {
        var innerLength = innerMiterRatio * strokeWidth / 2 - r2 - r1;
        return 2 * Math.max(bevelAdd, innerLength);
      }
      return bevelAdd * 2;
    };
    RegularShape2.prototype.createRenderOptions = function() {
      var lineJoin = defaultLineJoin;
      var miterLimit = 0;
      var lineDash = null;
      var lineDashOffset = 0;
      var strokeStyle;
      var strokeWidth = 0;
      if (this.stroke_) {
        strokeStyle = this.stroke_.getColor();
        if (strokeStyle === null) {
          strokeStyle = defaultStrokeStyle;
        }
        strokeStyle = asColorLike(strokeStyle);
        strokeWidth = this.stroke_.getWidth();
        if (strokeWidth === void 0) {
          strokeWidth = defaultLineWidth;
        }
        lineDash = this.stroke_.getLineDash();
        lineDashOffset = this.stroke_.getLineDashOffset();
        lineJoin = this.stroke_.getLineJoin();
        if (lineJoin === void 0) {
          lineJoin = defaultLineJoin;
        }
        miterLimit = this.stroke_.getMiterLimit();
        if (miterLimit === void 0) {
          miterLimit = defaultMiterLimit;
        }
      }
      var add2 = this.calculateLineJoinSize_(lineJoin, strokeWidth, miterLimit);
      var maxRadius = Math.max(this.radius_, this.radius2_ || 0);
      var size = Math.ceil(2 * maxRadius + add2);
      return {
        strokeStyle,
        strokeWidth,
        size,
        lineDash,
        lineDashOffset,
        lineJoin,
        miterLimit
      };
    };
    RegularShape2.prototype.render = function() {
      this.renderOptions_ = this.createRenderOptions();
      var size = this.renderOptions_.size;
      var displacement = this.getDisplacement();
      this.canvas_ = {};
      this.anchor_ = [size / 2 - displacement[0], size / 2 + displacement[1]];
      this.size_ = [size, size];
    };
    RegularShape2.prototype.draw_ = function(renderOptions, context, pixelRatio) {
      context.scale(pixelRatio, pixelRatio);
      context.translate(renderOptions.size / 2, renderOptions.size / 2);
      this.createPath_(context);
      if (this.fill_) {
        var color = this.fill_.getColor();
        if (color === null) {
          color = defaultFillStyle;
        }
        context.fillStyle = asColorLike(color);
        context.fill();
      }
      if (this.stroke_) {
        context.strokeStyle = renderOptions.strokeStyle;
        context.lineWidth = renderOptions.strokeWidth;
        if (context.setLineDash && renderOptions.lineDash) {
          context.setLineDash(renderOptions.lineDash);
          context.lineDashOffset = renderOptions.lineDashOffset;
        }
        context.lineJoin = renderOptions.lineJoin;
        context.miterLimit = renderOptions.miterLimit;
        context.stroke();
      }
    };
    RegularShape2.prototype.createHitDetectionCanvas_ = function(renderOptions) {
      if (this.fill_) {
        var color = this.fill_.getColor();
        var opacity = 0;
        if (typeof color === "string") {
          color = asArray(color);
        }
        if (color === null) {
          opacity = 1;
        } else if (Array.isArray(color)) {
          opacity = color.length === 4 ? color[3] : 1;
        }
        if (opacity === 0) {
          var context = createCanvasContext2D(renderOptions.size, renderOptions.size);
          this.hitDetectionCanvas_ = context.canvas;
          this.drawHitDetectionCanvas_(renderOptions, context);
        }
      }
      if (!this.hitDetectionCanvas_) {
        this.hitDetectionCanvas_ = this.getImage(1);
      }
    };
    RegularShape2.prototype.createPath_ = function(context) {
      var points = this.points_;
      var radius = this.radius_;
      if (points === Infinity) {
        context.arc(0, 0, radius, 0, 2 * Math.PI);
      } else {
        var radius2 = this.radius2_ === void 0 ? radius : this.radius2_;
        if (this.radius2_ !== void 0) {
          points *= 2;
        }
        var startAngle = this.angle_ - Math.PI / 2;
        var step = 2 * Math.PI / points;
        for (var i = 0; i < points; i++) {
          var angle0 = startAngle + i * step;
          var radiusC = i % 2 === 0 ? radius : radius2;
          context.lineTo(radiusC * Math.cos(angle0), radiusC * Math.sin(angle0));
        }
        context.closePath();
      }
    };
    RegularShape2.prototype.drawHitDetectionCanvas_ = function(renderOptions, context) {
      context.translate(renderOptions.size / 2, renderOptions.size / 2);
      this.createPath_(context);
      context.fillStyle = defaultFillStyle;
      context.fill();
      if (this.stroke_) {
        context.strokeStyle = renderOptions.strokeStyle;
        context.lineWidth = renderOptions.strokeWidth;
        if (renderOptions.lineDash) {
          context.setLineDash(renderOptions.lineDash);
          context.lineDashOffset = renderOptions.lineDashOffset;
        }
        context.lineJoin = renderOptions.lineJoin;
        context.miterLimit = renderOptions.miterLimit;
        context.stroke();
      }
    };
    return RegularShape2;
  }(ImageStyle$1);
  var RegularShape$1 = RegularShape;
  var __extends$Y = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var CircleStyle = function(_super) {
    __extends$Y(CircleStyle2, _super);
    function CircleStyle2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(this, {
        points: Infinity,
        fill: options.fill,
        radius: options.radius,
        stroke: options.stroke,
        scale: options.scale !== void 0 ? options.scale : 1,
        rotation: options.rotation !== void 0 ? options.rotation : 0,
        rotateWithView: options.rotateWithView !== void 0 ? options.rotateWithView : false,
        displacement: options.displacement !== void 0 ? options.displacement : [0, 0]
      }) || this;
      return _this;
    }
    CircleStyle2.prototype.clone = function() {
      var scale2 = this.getScale();
      var style = new CircleStyle2({
        fill: this.getFill() ? this.getFill().clone() : void 0,
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        radius: this.getRadius(),
        scale: Array.isArray(scale2) ? scale2.slice() : scale2,
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView(),
        displacement: this.getDisplacement().slice()
      });
      style.setOpacity(this.getOpacity());
      return style;
    };
    CircleStyle2.prototype.setRadius = function(radius) {
      this.radius_ = radius;
      this.render();
    };
    return CircleStyle2;
  }(RegularShape$1);
  var CircleStyle$1 = CircleStyle;
  var Style = function() {
    function Style2(opt_options) {
      var options = opt_options || {};
      this.geometry_ = null;
      this.geometryFunction_ = defaultGeometryFunction;
      if (options.geometry !== void 0) {
        this.setGeometry(options.geometry);
      }
      this.fill_ = options.fill !== void 0 ? options.fill : null;
      this.image_ = options.image !== void 0 ? options.image : null;
      this.renderer_ = options.renderer !== void 0 ? options.renderer : null;
      this.hitDetectionRenderer_ = options.hitDetectionRenderer !== void 0 ? options.hitDetectionRenderer : null;
      this.stroke_ = options.stroke !== void 0 ? options.stroke : null;
      this.text_ = options.text !== void 0 ? options.text : null;
      this.zIndex_ = options.zIndex;
    }
    Style2.prototype.clone = function() {
      var geometry = this.getGeometry();
      if (geometry && typeof geometry === "object") {
        geometry = geometry.clone();
      }
      return new Style2({
        geometry,
        fill: this.getFill() ? this.getFill().clone() : void 0,
        image: this.getImage() ? this.getImage().clone() : void 0,
        renderer: this.getRenderer(),
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        text: this.getText() ? this.getText().clone() : void 0,
        zIndex: this.getZIndex()
      });
    };
    Style2.prototype.getRenderer = function() {
      return this.renderer_;
    };
    Style2.prototype.setRenderer = function(renderer) {
      this.renderer_ = renderer;
    };
    Style2.prototype.setHitDetectionRenderer = function(renderer) {
      this.hitDetectionRenderer_ = renderer;
    };
    Style2.prototype.getHitDetectionRenderer = function() {
      return this.hitDetectionRenderer_;
    };
    Style2.prototype.getGeometry = function() {
      return this.geometry_;
    };
    Style2.prototype.getGeometryFunction = function() {
      return this.geometryFunction_;
    };
    Style2.prototype.getFill = function() {
      return this.fill_;
    };
    Style2.prototype.setFill = function(fill) {
      this.fill_ = fill;
    };
    Style2.prototype.getImage = function() {
      return this.image_;
    };
    Style2.prototype.setImage = function(image) {
      this.image_ = image;
    };
    Style2.prototype.getStroke = function() {
      return this.stroke_;
    };
    Style2.prototype.setStroke = function(stroke) {
      this.stroke_ = stroke;
    };
    Style2.prototype.getText = function() {
      return this.text_;
    };
    Style2.prototype.setText = function(text) {
      this.text_ = text;
    };
    Style2.prototype.getZIndex = function() {
      return this.zIndex_;
    };
    Style2.prototype.setGeometry = function(geometry) {
      if (typeof geometry === "function") {
        this.geometryFunction_ = geometry;
      } else if (typeof geometry === "string") {
        this.geometryFunction_ = function(feature) {
          return feature.get(geometry);
        };
      } else if (!geometry) {
        this.geometryFunction_ = defaultGeometryFunction;
      } else if (geometry !== void 0) {
        this.geometryFunction_ = function() {
          return geometry;
        };
      }
      this.geometry_ = geometry;
    };
    Style2.prototype.setZIndex = function(zIndex) {
      this.zIndex_ = zIndex;
    };
    return Style2;
  }();
  function toFunction(obj) {
    var styleFunction;
    if (typeof obj === "function") {
      styleFunction = obj;
    } else {
      var styles_1;
      if (Array.isArray(obj)) {
        styles_1 = obj;
      } else {
        assert(typeof obj.getZIndex === "function", 41);
        var style = obj;
        styles_1 = [style];
      }
      styleFunction = function() {
        return styles_1;
      };
    }
    return styleFunction;
  }
  var defaultStyles = null;
  function createDefaultStyle(feature, resolution) {
    if (!defaultStyles) {
      var fill = new Fill$1({
        color: "rgba(255,255,255,0.4)"
      });
      var stroke = new Stroke$1({
        color: "#3399CC",
        width: 1.25
      });
      defaultStyles = [
        new Style({
          image: new CircleStyle$1({
            fill,
            stroke,
            radius: 5
          }),
          fill,
          stroke
        })
      ];
    }
    return defaultStyles;
  }
  function defaultGeometryFunction(feature) {
    return feature.getGeometry();
  }
  var Style$1 = Style;
  var TextPlacement = {
    POINT: "point",
    LINE: "line"
  };
  var LayerProperty = {
    OPACITY: "opacity",
    VISIBLE: "visible",
    EXTENT: "extent",
    Z_INDEX: "zIndex",
    MAX_RESOLUTION: "maxResolution",
    MIN_RESOLUTION: "minResolution",
    MAX_ZOOM: "maxZoom",
    MIN_ZOOM: "minZoom",
    SOURCE: "source"
  };
  var __extends$X = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var BaseLayer = function(_super) {
    __extends$X(BaseLayer2, _super);
    function BaseLayer2(options) {
      var _this = _super.call(this) || this;
      _this.on;
      _this.once;
      _this.un;
      var properties = assign({}, options);
      if (typeof options.properties === "object") {
        delete properties.properties;
        assign(properties, options.properties);
      }
      properties[LayerProperty.OPACITY] = options.opacity !== void 0 ? options.opacity : 1;
      assert(typeof properties[LayerProperty.OPACITY] === "number", 64);
      properties[LayerProperty.VISIBLE] = options.visible !== void 0 ? options.visible : true;
      properties[LayerProperty.Z_INDEX] = options.zIndex;
      properties[LayerProperty.MAX_RESOLUTION] = options.maxResolution !== void 0 ? options.maxResolution : Infinity;
      properties[LayerProperty.MIN_RESOLUTION] = options.minResolution !== void 0 ? options.minResolution : 0;
      properties[LayerProperty.MIN_ZOOM] = options.minZoom !== void 0 ? options.minZoom : -Infinity;
      properties[LayerProperty.MAX_ZOOM] = options.maxZoom !== void 0 ? options.maxZoom : Infinity;
      _this.className_ = properties.className !== void 0 ? options.className : "ol-layer";
      delete properties.className;
      _this.setProperties(properties);
      _this.state_ = null;
      return _this;
    }
    BaseLayer2.prototype.getClassName = function() {
      return this.className_;
    };
    BaseLayer2.prototype.getLayerState = function(opt_managed) {
      var state = this.state_ || {
        layer: this,
        managed: opt_managed === void 0 ? true : opt_managed
      };
      var zIndex = this.getZIndex();
      state.opacity = clamp(Math.round(this.getOpacity() * 100) / 100, 0, 1);
      state.sourceState = this.getSourceState();
      state.visible = this.getVisible();
      state.extent = this.getExtent();
      state.zIndex = zIndex === void 0 && !state.managed ? Infinity : zIndex;
      state.maxResolution = this.getMaxResolution();
      state.minResolution = Math.max(this.getMinResolution(), 0);
      state.minZoom = this.getMinZoom();
      state.maxZoom = this.getMaxZoom();
      this.state_ = state;
      return state;
    };
    BaseLayer2.prototype.getLayersArray = function(opt_array) {
      return abstract();
    };
    BaseLayer2.prototype.getLayerStatesArray = function(opt_states) {
      return abstract();
    };
    BaseLayer2.prototype.getExtent = function() {
      return this.get(LayerProperty.EXTENT);
    };
    BaseLayer2.prototype.getMaxResolution = function() {
      return this.get(LayerProperty.MAX_RESOLUTION);
    };
    BaseLayer2.prototype.getMinResolution = function() {
      return this.get(LayerProperty.MIN_RESOLUTION);
    };
    BaseLayer2.prototype.getMinZoom = function() {
      return this.get(LayerProperty.MIN_ZOOM);
    };
    BaseLayer2.prototype.getMaxZoom = function() {
      return this.get(LayerProperty.MAX_ZOOM);
    };
    BaseLayer2.prototype.getOpacity = function() {
      return this.get(LayerProperty.OPACITY);
    };
    BaseLayer2.prototype.getSourceState = function() {
      return abstract();
    };
    BaseLayer2.prototype.getVisible = function() {
      return this.get(LayerProperty.VISIBLE);
    };
    BaseLayer2.prototype.getZIndex = function() {
      return this.get(LayerProperty.Z_INDEX);
    };
    BaseLayer2.prototype.setExtent = function(extent) {
      this.set(LayerProperty.EXTENT, extent);
    };
    BaseLayer2.prototype.setMaxResolution = function(maxResolution) {
      this.set(LayerProperty.MAX_RESOLUTION, maxResolution);
    };
    BaseLayer2.prototype.setMinResolution = function(minResolution) {
      this.set(LayerProperty.MIN_RESOLUTION, minResolution);
    };
    BaseLayer2.prototype.setMaxZoom = function(maxZoom) {
      this.set(LayerProperty.MAX_ZOOM, maxZoom);
    };
    BaseLayer2.prototype.setMinZoom = function(minZoom) {
      this.set(LayerProperty.MIN_ZOOM, minZoom);
    };
    BaseLayer2.prototype.setOpacity = function(opacity) {
      assert(typeof opacity === "number", 64);
      this.set(LayerProperty.OPACITY, opacity);
    };
    BaseLayer2.prototype.setVisible = function(visible) {
      this.set(LayerProperty.VISIBLE, visible);
    };
    BaseLayer2.prototype.setZIndex = function(zindex) {
      this.set(LayerProperty.Z_INDEX, zindex);
    };
    BaseLayer2.prototype.disposeInternal = function() {
      if (this.state_) {
        this.state_.layer = null;
        this.state_ = null;
      }
      _super.prototype.disposeInternal.call(this);
    };
    return BaseLayer2;
  }(BaseObject$1);
  var BaseLayer$1 = BaseLayer;
  var SourceState = {
    UNDEFINED: "undefined",
    LOADING: "loading",
    READY: "ready",
    ERROR: "error"
  };
  var __extends$W = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Layer = function(_super) {
    __extends$W(Layer2, _super);
    function Layer2(options) {
      var _this = this;
      var baseOptions = assign({}, options);
      delete baseOptions.source;
      _this = _super.call(this, baseOptions) || this;
      _this.on;
      _this.once;
      _this.un;
      _this.mapPrecomposeKey_ = null;
      _this.mapRenderKey_ = null;
      _this.sourceChangeKey_ = null;
      _this.renderer_ = null;
      if (options.render) {
        _this.render = options.render;
      }
      if (options.map) {
        _this.setMap(options.map);
      }
      _this.addChangeListener(LayerProperty.SOURCE, _this.handleSourcePropertyChange_);
      var source = options.source ? options.source : null;
      _this.setSource(source);
      return _this;
    }
    Layer2.prototype.getLayersArray = function(opt_array) {
      var array = opt_array ? opt_array : [];
      array.push(this);
      return array;
    };
    Layer2.prototype.getLayerStatesArray = function(opt_states) {
      var states = opt_states ? opt_states : [];
      states.push(this.getLayerState());
      return states;
    };
    Layer2.prototype.getSource = function() {
      return this.get(LayerProperty.SOURCE) || null;
    };
    Layer2.prototype.getSourceState = function() {
      var source = this.getSource();
      return !source ? SourceState.UNDEFINED : source.getState();
    };
    Layer2.prototype.handleSourceChange_ = function() {
      this.changed();
    };
    Layer2.prototype.handleSourcePropertyChange_ = function() {
      if (this.sourceChangeKey_) {
        unlistenByKey(this.sourceChangeKey_);
        this.sourceChangeKey_ = null;
      }
      var source = this.getSource();
      if (source) {
        this.sourceChangeKey_ = listen(source, EventType.CHANGE, this.handleSourceChange_, this);
      }
      this.changed();
    };
    Layer2.prototype.getFeatures = function(pixel) {
      if (!this.renderer_) {
        return new Promise(function(resolve) {
          return resolve([]);
        });
      }
      return this.renderer_.getFeatures(pixel);
    };
    Layer2.prototype.render = function(frameState, target) {
      var layerRenderer = this.getRenderer();
      if (layerRenderer.prepareFrame(frameState)) {
        return layerRenderer.renderFrame(frameState, target);
      }
    };
    Layer2.prototype.setMap = function(map) {
      if (this.mapPrecomposeKey_) {
        unlistenByKey(this.mapPrecomposeKey_);
        this.mapPrecomposeKey_ = null;
      }
      if (!map) {
        this.changed();
      }
      if (this.mapRenderKey_) {
        unlistenByKey(this.mapRenderKey_);
        this.mapRenderKey_ = null;
      }
      if (map) {
        this.mapPrecomposeKey_ = listen(map, RenderEventType.PRECOMPOSE, function(evt) {
          var renderEvent = evt;
          var layerStatesArray = renderEvent.frameState.layerStatesArray;
          var layerState = this.getLayerState(false);
          assert(!layerStatesArray.some(function(arrayLayerState) {
            return arrayLayerState.layer === layerState.layer;
          }), 67);
          layerStatesArray.push(layerState);
        }, this);
        this.mapRenderKey_ = listen(this, EventType.CHANGE, map.render, map);
        this.changed();
      }
    };
    Layer2.prototype.setSource = function(source) {
      this.set(LayerProperty.SOURCE, source);
    };
    Layer2.prototype.getRenderer = function() {
      if (!this.renderer_) {
        this.renderer_ = this.createRenderer();
      }
      return this.renderer_;
    };
    Layer2.prototype.hasRenderer = function() {
      return !!this.renderer_;
    };
    Layer2.prototype.createRenderer = function() {
      return null;
    };
    Layer2.prototype.disposeInternal = function() {
      if (this.renderer_) {
        this.renderer_.dispose();
        delete this.renderer_;
      }
      this.setSource(null);
      _super.prototype.disposeInternal.call(this);
    };
    return Layer2;
  }(BaseLayer$1);
  function inView(layerState, viewState) {
    if (!layerState.visible) {
      return false;
    }
    var resolution = viewState.resolution;
    if (resolution < layerState.minResolution || resolution >= layerState.maxResolution) {
      return false;
    }
    var zoom = viewState.zoom;
    return zoom > layerState.minZoom && zoom <= layerState.maxZoom;
  }
  var Layer$1 = Layer;
  function quickselect(arr, k, left, right, compare) {
    quickselectStep(arr, k, left || 0, right || arr.length - 1, compare || defaultCompare);
  }
  function quickselectStep(arr, k, left, right, compare) {
    while (right > left) {
      if (right - left > 600) {
        var n = right - left + 1;
        var m = k - left + 1;
        var z = Math.log(n);
        var s = 0.5 * Math.exp(2 * z / 3);
        var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
        var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
        var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
        quickselectStep(arr, k, newLeft, newRight, compare);
      }
      var t = arr[k];
      var i = left;
      var j = right;
      swap(arr, left, k);
      if (compare(arr[right], t) > 0)
        swap(arr, left, right);
      while (i < j) {
        swap(arr, i, j);
        i++;
        j--;
        while (compare(arr[i], t) < 0)
          i++;
        while (compare(arr[j], t) > 0)
          j--;
      }
      if (compare(arr[left], t) === 0)
        swap(arr, left, j);
      else {
        j++;
        swap(arr, j, right);
      }
      if (j <= k)
        left = j + 1;
      if (k <= j)
        right = j - 1;
    }
  }
  function swap(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  class RBush$2 {
    constructor(maxEntries = 9) {
      this._maxEntries = Math.max(4, maxEntries);
      this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4));
      this.clear();
    }
    all() {
      return this._all(this.data, []);
    }
    search(bbox) {
      let node = this.data;
      const result = [];
      if (!intersects(bbox, node))
        return result;
      const toBBox = this.toBBox;
      const nodesToSearch = [];
      while (node) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          const childBBox = node.leaf ? toBBox(child) : child;
          if (intersects(bbox, childBBox)) {
            if (node.leaf)
              result.push(child);
            else if (contains(bbox, childBBox))
              this._all(child, result);
            else
              nodesToSearch.push(child);
          }
        }
        node = nodesToSearch.pop();
      }
      return result;
    }
    collides(bbox) {
      let node = this.data;
      if (!intersects(bbox, node))
        return false;
      const nodesToSearch = [];
      while (node) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          const childBBox = node.leaf ? this.toBBox(child) : child;
          if (intersects(bbox, childBBox)) {
            if (node.leaf || contains(bbox, childBBox))
              return true;
            nodesToSearch.push(child);
          }
        }
        node = nodesToSearch.pop();
      }
      return false;
    }
    load(data) {
      if (!(data && data.length))
        return this;
      if (data.length < this._minEntries) {
        for (let i = 0; i < data.length; i++) {
          this.insert(data[i]);
        }
        return this;
      }
      let node = this._build(data.slice(), 0, data.length - 1, 0);
      if (!this.data.children.length) {
        this.data = node;
      } else if (this.data.height === node.height) {
        this._splitRoot(this.data, node);
      } else {
        if (this.data.height < node.height) {
          const tmpNode = this.data;
          this.data = node;
          node = tmpNode;
        }
        this._insert(node, this.data.height - node.height - 1, true);
      }
      return this;
    }
    insert(item) {
      if (item)
        this._insert(item, this.data.height - 1);
      return this;
    }
    clear() {
      this.data = createNode([]);
      return this;
    }
    remove(item, equalsFn) {
      if (!item)
        return this;
      let node = this.data;
      const bbox = this.toBBox(item);
      const path = [];
      const indexes = [];
      let i, parent, goingUp;
      while (node || path.length) {
        if (!node) {
          node = path.pop();
          parent = path[path.length - 1];
          i = indexes.pop();
          goingUp = true;
        }
        if (node.leaf) {
          const index = findItem(item, node.children, equalsFn);
          if (index !== -1) {
            node.children.splice(index, 1);
            path.push(node);
            this._condense(path);
            return this;
          }
        }
        if (!goingUp && !node.leaf && contains(node, bbox)) {
          path.push(node);
          indexes.push(i);
          i = 0;
          parent = node;
          node = node.children[0];
        } else if (parent) {
          i++;
          node = parent.children[i];
          goingUp = false;
        } else
          node = null;
      }
      return this;
    }
    toBBox(item) {
      return item;
    }
    compareMinX(a, b) {
      return a.minX - b.minX;
    }
    compareMinY(a, b) {
      return a.minY - b.minY;
    }
    toJSON() {
      return this.data;
    }
    fromJSON(data) {
      this.data = data;
      return this;
    }
    _all(node, result) {
      const nodesToSearch = [];
      while (node) {
        if (node.leaf)
          result.push(...node.children);
        else
          nodesToSearch.push(...node.children);
        node = nodesToSearch.pop();
      }
      return result;
    }
    _build(items, left, right, height) {
      const N = right - left + 1;
      let M = this._maxEntries;
      let node;
      if (N <= M) {
        node = createNode(items.slice(left, right + 1));
        calcBBox(node, this.toBBox);
        return node;
      }
      if (!height) {
        height = Math.ceil(Math.log(N) / Math.log(M));
        M = Math.ceil(N / Math.pow(M, height - 1));
      }
      node = createNode([]);
      node.leaf = false;
      node.height = height;
      const N2 = Math.ceil(N / M);
      const N1 = N2 * Math.ceil(Math.sqrt(M));
      multiSelect(items, left, right, N1, this.compareMinX);
      for (let i = left; i <= right; i += N1) {
        const right2 = Math.min(i + N1 - 1, right);
        multiSelect(items, i, right2, N2, this.compareMinY);
        for (let j = i; j <= right2; j += N2) {
          const right3 = Math.min(j + N2 - 1, right2);
          node.children.push(this._build(items, j, right3, height - 1));
        }
      }
      calcBBox(node, this.toBBox);
      return node;
    }
    _chooseSubtree(bbox, node, level, path) {
      while (true) {
        path.push(node);
        if (node.leaf || path.length - 1 === level)
          break;
        let minArea = Infinity;
        let minEnlargement = Infinity;
        let targetNode;
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          const area = bboxArea(child);
          const enlargement = enlargedArea(bbox, child) - area;
          if (enlargement < minEnlargement) {
            minEnlargement = enlargement;
            minArea = area < minArea ? area : minArea;
            targetNode = child;
          } else if (enlargement === minEnlargement) {
            if (area < minArea) {
              minArea = area;
              targetNode = child;
            }
          }
        }
        node = targetNode || node.children[0];
      }
      return node;
    }
    _insert(item, level, isNode) {
      const bbox = isNode ? item : this.toBBox(item);
      const insertPath = [];
      const node = this._chooseSubtree(bbox, this.data, level, insertPath);
      node.children.push(item);
      extend(node, bbox);
      while (level >= 0) {
        if (insertPath[level].children.length > this._maxEntries) {
          this._split(insertPath, level);
          level--;
        } else
          break;
      }
      this._adjustParentBBoxes(bbox, insertPath, level);
    }
    _split(insertPath, level) {
      const node = insertPath[level];
      const M = node.children.length;
      const m = this._minEntries;
      this._chooseSplitAxis(node, m, M);
      const splitIndex = this._chooseSplitIndex(node, m, M);
      const newNode = createNode(node.children.splice(splitIndex, node.children.length - splitIndex));
      newNode.height = node.height;
      newNode.leaf = node.leaf;
      calcBBox(node, this.toBBox);
      calcBBox(newNode, this.toBBox);
      if (level)
        insertPath[level - 1].children.push(newNode);
      else
        this._splitRoot(node, newNode);
    }
    _splitRoot(node, newNode) {
      this.data = createNode([node, newNode]);
      this.data.height = node.height + 1;
      this.data.leaf = false;
      calcBBox(this.data, this.toBBox);
    }
    _chooseSplitIndex(node, m, M) {
      let index;
      let minOverlap = Infinity;
      let minArea = Infinity;
      for (let i = m; i <= M - m; i++) {
        const bbox1 = distBBox(node, 0, i, this.toBBox);
        const bbox2 = distBBox(node, i, M, this.toBBox);
        const overlap = intersectionArea(bbox1, bbox2);
        const area = bboxArea(bbox1) + bboxArea(bbox2);
        if (overlap < minOverlap) {
          minOverlap = overlap;
          index = i;
          minArea = area < minArea ? area : minArea;
        } else if (overlap === minOverlap) {
          if (area < minArea) {
            minArea = area;
            index = i;
          }
        }
      }
      return index || M - m;
    }
    _chooseSplitAxis(node, m, M) {
      const compareMinX = node.leaf ? this.compareMinX : compareNodeMinX;
      const compareMinY = node.leaf ? this.compareMinY : compareNodeMinY;
      const xMargin = this._allDistMargin(node, m, M, compareMinX);
      const yMargin = this._allDistMargin(node, m, M, compareMinY);
      if (xMargin < yMargin)
        node.children.sort(compareMinX);
    }
    _allDistMargin(node, m, M, compare) {
      node.children.sort(compare);
      const toBBox = this.toBBox;
      const leftBBox = distBBox(node, 0, m, toBBox);
      const rightBBox = distBBox(node, M - m, M, toBBox);
      let margin = bboxMargin(leftBBox) + bboxMargin(rightBBox);
      for (let i = m; i < M - m; i++) {
        const child = node.children[i];
        extend(leftBBox, node.leaf ? toBBox(child) : child);
        margin += bboxMargin(leftBBox);
      }
      for (let i = M - m - 1; i >= m; i--) {
        const child = node.children[i];
        extend(rightBBox, node.leaf ? toBBox(child) : child);
        margin += bboxMargin(rightBBox);
      }
      return margin;
    }
    _adjustParentBBoxes(bbox, path, level) {
      for (let i = level; i >= 0; i--) {
        extend(path[i], bbox);
      }
    }
    _condense(path) {
      for (let i = path.length - 1, siblings; i >= 0; i--) {
        if (path[i].children.length === 0) {
          if (i > 0) {
            siblings = path[i - 1].children;
            siblings.splice(siblings.indexOf(path[i]), 1);
          } else
            this.clear();
        } else
          calcBBox(path[i], this.toBBox);
      }
    }
  }
  function findItem(item, items, equalsFn) {
    if (!equalsFn)
      return items.indexOf(item);
    for (let i = 0; i < items.length; i++) {
      if (equalsFn(item, items[i]))
        return i;
    }
    return -1;
  }
  function calcBBox(node, toBBox) {
    distBBox(node, 0, node.children.length, toBBox, node);
  }
  function distBBox(node, k, p, toBBox, destNode) {
    if (!destNode)
      destNode = createNode(null);
    destNode.minX = Infinity;
    destNode.minY = Infinity;
    destNode.maxX = -Infinity;
    destNode.maxY = -Infinity;
    for (let i = k; i < p; i++) {
      const child = node.children[i];
      extend(destNode, node.leaf ? toBBox(child) : child);
    }
    return destNode;
  }
  function extend(a, b) {
    a.minX = Math.min(a.minX, b.minX);
    a.minY = Math.min(a.minY, b.minY);
    a.maxX = Math.max(a.maxX, b.maxX);
    a.maxY = Math.max(a.maxY, b.maxY);
    return a;
  }
  function compareNodeMinX(a, b) {
    return a.minX - b.minX;
  }
  function compareNodeMinY(a, b) {
    return a.minY - b.minY;
  }
  function bboxArea(a) {
    return (a.maxX - a.minX) * (a.maxY - a.minY);
  }
  function bboxMargin(a) {
    return a.maxX - a.minX + (a.maxY - a.minY);
  }
  function enlargedArea(a, b) {
    return (Math.max(b.maxX, a.maxX) - Math.min(b.minX, a.minX)) * (Math.max(b.maxY, a.maxY) - Math.min(b.minY, a.minY));
  }
  function intersectionArea(a, b) {
    const minX = Math.max(a.minX, b.minX);
    const minY = Math.max(a.minY, b.minY);
    const maxX = Math.min(a.maxX, b.maxX);
    const maxY = Math.min(a.maxY, b.maxY);
    return Math.max(0, maxX - minX) * Math.max(0, maxY - minY);
  }
  function contains(a, b) {
    return a.minX <= b.minX && a.minY <= b.minY && b.maxX <= a.maxX && b.maxY <= a.maxY;
  }
  function intersects(a, b) {
    return b.minX <= a.maxX && b.minY <= a.maxY && b.maxX >= a.minX && b.maxY >= a.minY;
  }
  function createNode(children) {
    return {
      children,
      height: 1,
      leaf: true,
      minX: Infinity,
      minY: Infinity,
      maxX: -Infinity,
      maxY: -Infinity
    };
  }
  function multiSelect(arr, left, right, n, compare) {
    const stack = [left, right];
    while (stack.length) {
      right = stack.pop();
      left = stack.pop();
      if (right - left <= n)
        continue;
      const mid = left + Math.ceil((right - left) / n / 2) * n;
      quickselect(arr, mid, left, right, compare);
      stack.push(left, mid, mid, right);
    }
  }
  var __extends$V = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Property$2 = {
    RENDER_ORDER: "renderOrder"
  };
  var BaseVectorLayer = function(_super) {
    __extends$V(BaseVectorLayer2, _super);
    function BaseVectorLayer2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      var baseOptions = assign({}, options);
      delete baseOptions.style;
      delete baseOptions.renderBuffer;
      delete baseOptions.updateWhileAnimating;
      delete baseOptions.updateWhileInteracting;
      _this = _super.call(this, baseOptions) || this;
      _this.declutter_ = options.declutter !== void 0 ? options.declutter : false;
      _this.renderBuffer_ = options.renderBuffer !== void 0 ? options.renderBuffer : 100;
      _this.style_ = null;
      _this.styleFunction_ = void 0;
      _this.setStyle(options.style);
      _this.updateWhileAnimating_ = options.updateWhileAnimating !== void 0 ? options.updateWhileAnimating : false;
      _this.updateWhileInteracting_ = options.updateWhileInteracting !== void 0 ? options.updateWhileInteracting : false;
      return _this;
    }
    BaseVectorLayer2.prototype.getDeclutter = function() {
      return this.declutter_;
    };
    BaseVectorLayer2.prototype.getFeatures = function(pixel) {
      return _super.prototype.getFeatures.call(this, pixel);
    };
    BaseVectorLayer2.prototype.getRenderBuffer = function() {
      return this.renderBuffer_;
    };
    BaseVectorLayer2.prototype.getRenderOrder = function() {
      return this.get(Property$2.RENDER_ORDER);
    };
    BaseVectorLayer2.prototype.getStyle = function() {
      return this.style_;
    };
    BaseVectorLayer2.prototype.getStyleFunction = function() {
      return this.styleFunction_;
    };
    BaseVectorLayer2.prototype.getUpdateWhileAnimating = function() {
      return this.updateWhileAnimating_;
    };
    BaseVectorLayer2.prototype.getUpdateWhileInteracting = function() {
      return this.updateWhileInteracting_;
    };
    BaseVectorLayer2.prototype.renderDeclutter = function(frameState) {
      if (!frameState.declutterTree) {
        frameState.declutterTree = new RBush$2(9);
      }
      this.getRenderer().renderDeclutter(frameState);
    };
    BaseVectorLayer2.prototype.setRenderOrder = function(renderOrder) {
      this.set(Property$2.RENDER_ORDER, renderOrder);
    };
    BaseVectorLayer2.prototype.setStyle = function(opt_style) {
      this.style_ = opt_style !== void 0 ? opt_style : createDefaultStyle;
      this.styleFunction_ = opt_style === null ? void 0 : toFunction(this.style_);
      this.changed();
    };
    return BaseVectorLayer2;
  }(Layer$1);
  var BaseVectorLayer$1 = BaseVectorLayer;
  var Instruction = {
    BEGIN_GEOMETRY: 0,
    BEGIN_PATH: 1,
    CIRCLE: 2,
    CLOSE_PATH: 3,
    CUSTOM: 4,
    DRAW_CHARS: 5,
    DRAW_IMAGE: 6,
    END_GEOMETRY: 7,
    FILL: 8,
    MOVE_TO_LINE_TO: 9,
    SET_FILL_STYLE: 10,
    SET_STROKE_STYLE: 11,
    STROKE: 12
  };
  var fillInstruction = [Instruction.FILL];
  var strokeInstruction = [Instruction.STROKE];
  var beginPathInstruction = [Instruction.BEGIN_PATH];
  var closePathInstruction = [Instruction.CLOSE_PATH];
  var CanvasInstruction = Instruction;
  var VectorContext = function() {
    function VectorContext2() {
    }
    VectorContext2.prototype.drawCustom = function(geometry, feature, renderer, hitDetectionRenderer) {
    };
    VectorContext2.prototype.drawGeometry = function(geometry) {
    };
    VectorContext2.prototype.setStyle = function(style) {
    };
    VectorContext2.prototype.drawCircle = function(circleGeometry, feature) {
    };
    VectorContext2.prototype.drawFeature = function(feature, style) {
    };
    VectorContext2.prototype.drawGeometryCollection = function(geometryCollectionGeometry, feature) {
    };
    VectorContext2.prototype.drawLineString = function(lineStringGeometry, feature) {
    };
    VectorContext2.prototype.drawMultiLineString = function(multiLineStringGeometry, feature) {
    };
    VectorContext2.prototype.drawMultiPoint = function(multiPointGeometry, feature) {
    };
    VectorContext2.prototype.drawMultiPolygon = function(multiPolygonGeometry, feature) {
    };
    VectorContext2.prototype.drawPoint = function(pointGeometry, feature) {
    };
    VectorContext2.prototype.drawPolygon = function(polygonGeometry, feature) {
    };
    VectorContext2.prototype.drawText = function(geometry, feature) {
    };
    VectorContext2.prototype.setFillStrokeStyle = function(fillStyle, strokeStyle) {
    };
    VectorContext2.prototype.setImageStyle = function(imageStyle, opt_declutterImageWithText) {
    };
    VectorContext2.prototype.setTextStyle = function(textStyle, opt_declutterImageWithText) {
    };
    return VectorContext2;
  }();
  var VectorContext$1 = VectorContext;
  var __extends$U = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var CanvasBuilder = function(_super) {
    __extends$U(CanvasBuilder2, _super);
    function CanvasBuilder2(tolerance, maxExtent, resolution, pixelRatio) {
      var _this = _super.call(this) || this;
      _this.tolerance = tolerance;
      _this.maxExtent = maxExtent;
      _this.pixelRatio = pixelRatio;
      _this.maxLineWidth = 0;
      _this.resolution = resolution;
      _this.beginGeometryInstruction1_ = null;
      _this.beginGeometryInstruction2_ = null;
      _this.bufferedMaxExtent_ = null;
      _this.instructions = [];
      _this.coordinates = [];
      _this.tmpCoordinate_ = [];
      _this.hitDetectionInstructions = [];
      _this.state = {};
      return _this;
    }
    CanvasBuilder2.prototype.applyPixelRatio = function(dashArray) {
      var pixelRatio = this.pixelRatio;
      return pixelRatio == 1 ? dashArray : dashArray.map(function(dash) {
        return dash * pixelRatio;
      });
    };
    CanvasBuilder2.prototype.appendFlatPointCoordinates = function(flatCoordinates, stride) {
      var extent = this.getBufferedMaxExtent();
      var tmpCoord = this.tmpCoordinate_;
      var coordinates2 = this.coordinates;
      var myEnd = coordinates2.length;
      for (var i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
        tmpCoord[0] = flatCoordinates[i];
        tmpCoord[1] = flatCoordinates[i + 1];
        if (containsCoordinate(extent, tmpCoord)) {
          coordinates2[myEnd++] = tmpCoord[0];
          coordinates2[myEnd++] = tmpCoord[1];
        }
      }
      return myEnd;
    };
    CanvasBuilder2.prototype.appendFlatLineCoordinates = function(flatCoordinates, offset, end, stride, closed, skipFirst) {
      var coordinates2 = this.coordinates;
      var myEnd = coordinates2.length;
      var extent = this.getBufferedMaxExtent();
      if (skipFirst) {
        offset += stride;
      }
      var lastXCoord = flatCoordinates[offset];
      var lastYCoord = flatCoordinates[offset + 1];
      var nextCoord = this.tmpCoordinate_;
      var skipped = true;
      var i, lastRel, nextRel;
      for (i = offset + stride; i < end; i += stride) {
        nextCoord[0] = flatCoordinates[i];
        nextCoord[1] = flatCoordinates[i + 1];
        nextRel = coordinateRelationship(extent, nextCoord);
        if (nextRel !== lastRel) {
          if (skipped) {
            coordinates2[myEnd++] = lastXCoord;
            coordinates2[myEnd++] = lastYCoord;
            skipped = false;
          }
          coordinates2[myEnd++] = nextCoord[0];
          coordinates2[myEnd++] = nextCoord[1];
        } else if (nextRel === Relationship.INTERSECTING) {
          coordinates2[myEnd++] = nextCoord[0];
          coordinates2[myEnd++] = nextCoord[1];
          skipped = false;
        } else {
          skipped = true;
        }
        lastXCoord = nextCoord[0];
        lastYCoord = nextCoord[1];
        lastRel = nextRel;
      }
      if (closed && skipped || i === offset + stride) {
        coordinates2[myEnd++] = lastXCoord;
        coordinates2[myEnd++] = lastYCoord;
      }
      return myEnd;
    };
    CanvasBuilder2.prototype.drawCustomCoordinates_ = function(flatCoordinates, offset, ends, stride, builderEnds) {
      for (var i = 0, ii = ends.length; i < ii; ++i) {
        var end = ends[i];
        var builderEnd = this.appendFlatLineCoordinates(flatCoordinates, offset, end, stride, false, false);
        builderEnds.push(builderEnd);
        offset = end;
      }
      return offset;
    };
    CanvasBuilder2.prototype.drawCustom = function(geometry, feature, renderer, hitDetectionRenderer) {
      this.beginGeometry(geometry, feature);
      var type = geometry.getType();
      var stride = geometry.getStride();
      var builderBegin = this.coordinates.length;
      var flatCoordinates, builderEnd, builderEnds, builderEndss;
      var offset;
      switch (type) {
        case GeometryType.MULTI_POLYGON:
          flatCoordinates = geometry.getOrientedFlatCoordinates();
          builderEndss = [];
          var endss = geometry.getEndss();
          offset = 0;
          for (var i = 0, ii = endss.length; i < ii; ++i) {
            var myEnds = [];
            offset = this.drawCustomCoordinates_(flatCoordinates, offset, endss[i], stride, myEnds);
            builderEndss.push(myEnds);
          }
          this.instructions.push([
            CanvasInstruction.CUSTOM,
            builderBegin,
            builderEndss,
            geometry,
            renderer,
            inflateMultiCoordinatesArray
          ]);
          this.hitDetectionInstructions.push([
            CanvasInstruction.CUSTOM,
            builderBegin,
            builderEndss,
            geometry,
            hitDetectionRenderer || renderer,
            inflateMultiCoordinatesArray
          ]);
          break;
        case GeometryType.POLYGON:
        case GeometryType.MULTI_LINE_STRING:
          builderEnds = [];
          flatCoordinates = type == GeometryType.POLYGON ? geometry.getOrientedFlatCoordinates() : geometry.getFlatCoordinates();
          offset = this.drawCustomCoordinates_(flatCoordinates, 0, geometry.getEnds(), stride, builderEnds);
          this.instructions.push([
            CanvasInstruction.CUSTOM,
            builderBegin,
            builderEnds,
            geometry,
            renderer,
            inflateCoordinatesArray
          ]);
          this.hitDetectionInstructions.push([
            CanvasInstruction.CUSTOM,
            builderBegin,
            builderEnds,
            geometry,
            hitDetectionRenderer || renderer,
            inflateCoordinatesArray
          ]);
          break;
        case GeometryType.LINE_STRING:
        case GeometryType.CIRCLE:
          flatCoordinates = geometry.getFlatCoordinates();
          builderEnd = this.appendFlatLineCoordinates(flatCoordinates, 0, flatCoordinates.length, stride, false, false);
          this.instructions.push([
            CanvasInstruction.CUSTOM,
            builderBegin,
            builderEnd,
            geometry,
            renderer,
            inflateCoordinates
          ]);
          this.hitDetectionInstructions.push([
            CanvasInstruction.CUSTOM,
            builderBegin,
            builderEnd,
            geometry,
            hitDetectionRenderer || renderer,
            inflateCoordinates
          ]);
          break;
        case GeometryType.MULTI_POINT:
          flatCoordinates = geometry.getFlatCoordinates();
          builderEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
          if (builderEnd > builderBegin) {
            this.instructions.push([
              CanvasInstruction.CUSTOM,
              builderBegin,
              builderEnd,
              geometry,
              renderer,
              inflateCoordinates
            ]);
            this.hitDetectionInstructions.push([
              CanvasInstruction.CUSTOM,
              builderBegin,
              builderEnd,
              geometry,
              hitDetectionRenderer || renderer,
              inflateCoordinates
            ]);
          }
          break;
        case GeometryType.POINT:
          flatCoordinates = geometry.getFlatCoordinates();
          this.coordinates.push(flatCoordinates[0], flatCoordinates[1]);
          builderEnd = this.coordinates.length;
          this.instructions.push([
            CanvasInstruction.CUSTOM,
            builderBegin,
            builderEnd,
            geometry,
            renderer
          ]);
          this.hitDetectionInstructions.push([
            CanvasInstruction.CUSTOM,
            builderBegin,
            builderEnd,
            geometry,
            hitDetectionRenderer || renderer
          ]);
          break;
      }
      this.endGeometry(feature);
    };
    CanvasBuilder2.prototype.beginGeometry = function(geometry, feature) {
      this.beginGeometryInstruction1_ = [
        CanvasInstruction.BEGIN_GEOMETRY,
        feature,
        0,
        geometry
      ];
      this.instructions.push(this.beginGeometryInstruction1_);
      this.beginGeometryInstruction2_ = [
        CanvasInstruction.BEGIN_GEOMETRY,
        feature,
        0,
        geometry
      ];
      this.hitDetectionInstructions.push(this.beginGeometryInstruction2_);
    };
    CanvasBuilder2.prototype.finish = function() {
      return {
        instructions: this.instructions,
        hitDetectionInstructions: this.hitDetectionInstructions,
        coordinates: this.coordinates
      };
    };
    CanvasBuilder2.prototype.reverseHitDetectionInstructions = function() {
      var hitDetectionInstructions = this.hitDetectionInstructions;
      hitDetectionInstructions.reverse();
      var i;
      var n = hitDetectionInstructions.length;
      var instruction;
      var type;
      var begin = -1;
      for (i = 0; i < n; ++i) {
        instruction = hitDetectionInstructions[i];
        type = instruction[0];
        if (type == CanvasInstruction.END_GEOMETRY) {
          begin = i;
        } else if (type == CanvasInstruction.BEGIN_GEOMETRY) {
          instruction[2] = i;
          reverseSubArray(this.hitDetectionInstructions, begin, i);
          begin = -1;
        }
      }
    };
    CanvasBuilder2.prototype.setFillStrokeStyle = function(fillStyle, strokeStyle) {
      var state = this.state;
      if (fillStyle) {
        var fillStyleColor = fillStyle.getColor();
        state.fillStyle = asColorLike(fillStyleColor ? fillStyleColor : defaultFillStyle);
      } else {
        state.fillStyle = void 0;
      }
      if (strokeStyle) {
        var strokeStyleColor = strokeStyle.getColor();
        state.strokeStyle = asColorLike(strokeStyleColor ? strokeStyleColor : defaultStrokeStyle);
        var strokeStyleLineCap = strokeStyle.getLineCap();
        state.lineCap = strokeStyleLineCap !== void 0 ? strokeStyleLineCap : defaultLineCap;
        var strokeStyleLineDash = strokeStyle.getLineDash();
        state.lineDash = strokeStyleLineDash ? strokeStyleLineDash.slice() : defaultLineDash;
        var strokeStyleLineDashOffset = strokeStyle.getLineDashOffset();
        state.lineDashOffset = strokeStyleLineDashOffset ? strokeStyleLineDashOffset : defaultLineDashOffset;
        var strokeStyleLineJoin = strokeStyle.getLineJoin();
        state.lineJoin = strokeStyleLineJoin !== void 0 ? strokeStyleLineJoin : defaultLineJoin;
        var strokeStyleWidth = strokeStyle.getWidth();
        state.lineWidth = strokeStyleWidth !== void 0 ? strokeStyleWidth : defaultLineWidth;
        var strokeStyleMiterLimit = strokeStyle.getMiterLimit();
        state.miterLimit = strokeStyleMiterLimit !== void 0 ? strokeStyleMiterLimit : defaultMiterLimit;
        if (state.lineWidth > this.maxLineWidth) {
          this.maxLineWidth = state.lineWidth;
          this.bufferedMaxExtent_ = null;
        }
      } else {
        state.strokeStyle = void 0;
        state.lineCap = void 0;
        state.lineDash = null;
        state.lineDashOffset = void 0;
        state.lineJoin = void 0;
        state.lineWidth = void 0;
        state.miterLimit = void 0;
      }
    };
    CanvasBuilder2.prototype.createFill = function(state) {
      var fillStyle = state.fillStyle;
      var fillInstruction2 = [CanvasInstruction.SET_FILL_STYLE, fillStyle];
      if (typeof fillStyle !== "string") {
        fillInstruction2.push(true);
      }
      return fillInstruction2;
    };
    CanvasBuilder2.prototype.applyStroke = function(state) {
      this.instructions.push(this.createStroke(state));
    };
    CanvasBuilder2.prototype.createStroke = function(state) {
      return [
        CanvasInstruction.SET_STROKE_STYLE,
        state.strokeStyle,
        state.lineWidth * this.pixelRatio,
        state.lineCap,
        state.lineJoin,
        state.miterLimit,
        this.applyPixelRatio(state.lineDash),
        state.lineDashOffset * this.pixelRatio
      ];
    };
    CanvasBuilder2.prototype.updateFillStyle = function(state, createFill) {
      var fillStyle = state.fillStyle;
      if (typeof fillStyle !== "string" || state.currentFillStyle != fillStyle) {
        if (fillStyle !== void 0) {
          this.instructions.push(createFill.call(this, state));
        }
        state.currentFillStyle = fillStyle;
      }
    };
    CanvasBuilder2.prototype.updateStrokeStyle = function(state, applyStroke) {
      var strokeStyle = state.strokeStyle;
      var lineCap = state.lineCap;
      var lineDash = state.lineDash;
      var lineDashOffset = state.lineDashOffset;
      var lineJoin = state.lineJoin;
      var lineWidth = state.lineWidth;
      var miterLimit = state.miterLimit;
      if (state.currentStrokeStyle != strokeStyle || state.currentLineCap != lineCap || lineDash != state.currentLineDash && !equals$2(state.currentLineDash, lineDash) || state.currentLineDashOffset != lineDashOffset || state.currentLineJoin != lineJoin || state.currentLineWidth != lineWidth || state.currentMiterLimit != miterLimit) {
        if (strokeStyle !== void 0) {
          applyStroke.call(this, state);
        }
        state.currentStrokeStyle = strokeStyle;
        state.currentLineCap = lineCap;
        state.currentLineDash = lineDash;
        state.currentLineDashOffset = lineDashOffset;
        state.currentLineJoin = lineJoin;
        state.currentLineWidth = lineWidth;
        state.currentMiterLimit = miterLimit;
      }
    };
    CanvasBuilder2.prototype.endGeometry = function(feature) {
      this.beginGeometryInstruction1_[2] = this.instructions.length;
      this.beginGeometryInstruction1_ = null;
      this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length;
      this.beginGeometryInstruction2_ = null;
      var endGeometryInstruction = [CanvasInstruction.END_GEOMETRY, feature];
      this.instructions.push(endGeometryInstruction);
      this.hitDetectionInstructions.push(endGeometryInstruction);
    };
    CanvasBuilder2.prototype.getBufferedMaxExtent = function() {
      if (!this.bufferedMaxExtent_) {
        this.bufferedMaxExtent_ = clone(this.maxExtent);
        if (this.maxLineWidth > 0) {
          var width = this.resolution * (this.maxLineWidth + 1) / 2;
          buffer(this.bufferedMaxExtent_, width, this.bufferedMaxExtent_);
        }
      }
      return this.bufferedMaxExtent_;
    };
    return CanvasBuilder2;
  }(VectorContext$1);
  var Builder = CanvasBuilder;
  var __extends$T = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var CanvasImageBuilder = function(_super) {
    __extends$T(CanvasImageBuilder2, _super);
    function CanvasImageBuilder2(tolerance, maxExtent, resolution, pixelRatio) {
      var _this = _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
      _this.hitDetectionImage_ = null;
      _this.image_ = null;
      _this.imagePixelRatio_ = void 0;
      _this.anchorX_ = void 0;
      _this.anchorY_ = void 0;
      _this.height_ = void 0;
      _this.opacity_ = void 0;
      _this.originX_ = void 0;
      _this.originY_ = void 0;
      _this.rotateWithView_ = void 0;
      _this.rotation_ = void 0;
      _this.scale_ = void 0;
      _this.width_ = void 0;
      _this.declutterImageWithText_ = void 0;
      return _this;
    }
    CanvasImageBuilder2.prototype.drawPoint = function(pointGeometry, feature) {
      if (!this.image_) {
        return;
      }
      this.beginGeometry(pointGeometry, feature);
      var flatCoordinates = pointGeometry.getFlatCoordinates();
      var stride = pointGeometry.getStride();
      var myBegin = this.coordinates.length;
      var myEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
      this.instructions.push([
        CanvasInstruction.DRAW_IMAGE,
        myBegin,
        myEnd,
        this.image_,
        this.anchorX_ * this.imagePixelRatio_,
        this.anchorY_ * this.imagePixelRatio_,
        Math.ceil(this.height_ * this.imagePixelRatio_),
        this.opacity_,
        this.originX_,
        this.originY_,
        this.rotateWithView_,
        this.rotation_,
        [
          this.scale_[0] * this.pixelRatio / this.imagePixelRatio_,
          this.scale_[1] * this.pixelRatio / this.imagePixelRatio_
        ],
        Math.ceil(this.width_ * this.imagePixelRatio_),
        this.declutterImageWithText_
      ]);
      this.hitDetectionInstructions.push([
        CanvasInstruction.DRAW_IMAGE,
        myBegin,
        myEnd,
        this.hitDetectionImage_,
        this.anchorX_,
        this.anchorY_,
        this.height_,
        this.opacity_,
        this.originX_,
        this.originY_,
        this.rotateWithView_,
        this.rotation_,
        this.scale_,
        this.width_,
        this.declutterImageWithText_
      ]);
      this.endGeometry(feature);
    };
    CanvasImageBuilder2.prototype.drawMultiPoint = function(multiPointGeometry, feature) {
      if (!this.image_) {
        return;
      }
      this.beginGeometry(multiPointGeometry, feature);
      var flatCoordinates = multiPointGeometry.getFlatCoordinates();
      var stride = multiPointGeometry.getStride();
      var myBegin = this.coordinates.length;
      var myEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
      this.instructions.push([
        CanvasInstruction.DRAW_IMAGE,
        myBegin,
        myEnd,
        this.image_,
        this.anchorX_ * this.imagePixelRatio_,
        this.anchorY_ * this.imagePixelRatio_,
        Math.ceil(this.height_ * this.imagePixelRatio_),
        this.opacity_,
        this.originX_,
        this.originY_,
        this.rotateWithView_,
        this.rotation_,
        [
          this.scale_[0] * this.pixelRatio / this.imagePixelRatio_,
          this.scale_[1] * this.pixelRatio / this.imagePixelRatio_
        ],
        Math.ceil(this.width_ * this.imagePixelRatio_),
        this.declutterImageWithText_
      ]);
      this.hitDetectionInstructions.push([
        CanvasInstruction.DRAW_IMAGE,
        myBegin,
        myEnd,
        this.hitDetectionImage_,
        this.anchorX_,
        this.anchorY_,
        this.height_,
        this.opacity_,
        this.originX_,
        this.originY_,
        this.rotateWithView_,
        this.rotation_,
        this.scale_,
        this.width_,
        this.declutterImageWithText_
      ]);
      this.endGeometry(feature);
    };
    CanvasImageBuilder2.prototype.finish = function() {
      this.reverseHitDetectionInstructions();
      this.anchorX_ = void 0;
      this.anchorY_ = void 0;
      this.hitDetectionImage_ = null;
      this.image_ = null;
      this.imagePixelRatio_ = void 0;
      this.height_ = void 0;
      this.scale_ = void 0;
      this.opacity_ = void 0;
      this.originX_ = void 0;
      this.originY_ = void 0;
      this.rotateWithView_ = void 0;
      this.rotation_ = void 0;
      this.width_ = void 0;
      return _super.prototype.finish.call(this);
    };
    CanvasImageBuilder2.prototype.setImageStyle = function(imageStyle, opt_sharedData) {
      var anchor = imageStyle.getAnchor();
      var size = imageStyle.getSize();
      var hitDetectionImage = imageStyle.getHitDetectionImage();
      var image = imageStyle.getImage(this.pixelRatio);
      var origin = imageStyle.getOrigin();
      this.imagePixelRatio_ = imageStyle.getPixelRatio(this.pixelRatio);
      this.anchorX_ = anchor[0];
      this.anchorY_ = anchor[1];
      this.hitDetectionImage_ = hitDetectionImage;
      this.image_ = image;
      this.height_ = size[1];
      this.opacity_ = imageStyle.getOpacity();
      this.originX_ = origin[0] * this.imagePixelRatio_;
      this.originY_ = origin[1] * this.imagePixelRatio_;
      this.rotateWithView_ = imageStyle.getRotateWithView();
      this.rotation_ = imageStyle.getRotation();
      this.scale_ = imageStyle.getScaleArray();
      this.width_ = size[0];
      this.declutterImageWithText_ = opt_sharedData;
    };
    return CanvasImageBuilder2;
  }(Builder);
  var ImageBuilder = CanvasImageBuilder;
  var __extends$S = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var CanvasLineStringBuilder = function(_super) {
    __extends$S(CanvasLineStringBuilder2, _super);
    function CanvasLineStringBuilder2(tolerance, maxExtent, resolution, pixelRatio) {
      return _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
    }
    CanvasLineStringBuilder2.prototype.drawFlatCoordinates_ = function(flatCoordinates, offset, end, stride) {
      var myBegin = this.coordinates.length;
      var myEnd = this.appendFlatLineCoordinates(flatCoordinates, offset, end, stride, false, false);
      var moveToLineToInstruction = [
        CanvasInstruction.MOVE_TO_LINE_TO,
        myBegin,
        myEnd
      ];
      this.instructions.push(moveToLineToInstruction);
      this.hitDetectionInstructions.push(moveToLineToInstruction);
      return end;
    };
    CanvasLineStringBuilder2.prototype.drawLineString = function(lineStringGeometry, feature) {
      var state = this.state;
      var strokeStyle = state.strokeStyle;
      var lineWidth = state.lineWidth;
      if (strokeStyle === void 0 || lineWidth === void 0) {
        return;
      }
      this.updateStrokeStyle(state, this.applyStroke);
      this.beginGeometry(lineStringGeometry, feature);
      this.hitDetectionInstructions.push([
        CanvasInstruction.SET_STROKE_STYLE,
        state.strokeStyle,
        state.lineWidth,
        state.lineCap,
        state.lineJoin,
        state.miterLimit,
        defaultLineDash,
        defaultLineDashOffset
      ], beginPathInstruction);
      var flatCoordinates = lineStringGeometry.getFlatCoordinates();
      var stride = lineStringGeometry.getStride();
      this.drawFlatCoordinates_(flatCoordinates, 0, flatCoordinates.length, stride);
      this.hitDetectionInstructions.push(strokeInstruction);
      this.endGeometry(feature);
    };
    CanvasLineStringBuilder2.prototype.drawMultiLineString = function(multiLineStringGeometry, feature) {
      var state = this.state;
      var strokeStyle = state.strokeStyle;
      var lineWidth = state.lineWidth;
      if (strokeStyle === void 0 || lineWidth === void 0) {
        return;
      }
      this.updateStrokeStyle(state, this.applyStroke);
      this.beginGeometry(multiLineStringGeometry, feature);
      this.hitDetectionInstructions.push([
        CanvasInstruction.SET_STROKE_STYLE,
        state.strokeStyle,
        state.lineWidth,
        state.lineCap,
        state.lineJoin,
        state.miterLimit,
        state.lineDash,
        state.lineDashOffset
      ], beginPathInstruction);
      var ends = multiLineStringGeometry.getEnds();
      var flatCoordinates = multiLineStringGeometry.getFlatCoordinates();
      var stride = multiLineStringGeometry.getStride();
      var offset = 0;
      for (var i = 0, ii = ends.length; i < ii; ++i) {
        offset = this.drawFlatCoordinates_(flatCoordinates, offset, ends[i], stride);
      }
      this.hitDetectionInstructions.push(strokeInstruction);
      this.endGeometry(feature);
    };
    CanvasLineStringBuilder2.prototype.finish = function() {
      var state = this.state;
      if (state.lastStroke != void 0 && state.lastStroke != this.coordinates.length) {
        this.instructions.push(strokeInstruction);
      }
      this.reverseHitDetectionInstructions();
      this.state = null;
      return _super.prototype.finish.call(this);
    };
    CanvasLineStringBuilder2.prototype.applyStroke = function(state) {
      if (state.lastStroke != void 0 && state.lastStroke != this.coordinates.length) {
        this.instructions.push(strokeInstruction);
        state.lastStroke = this.coordinates.length;
      }
      state.lastStroke = 0;
      _super.prototype.applyStroke.call(this, state);
      this.instructions.push(beginPathInstruction);
    };
    return CanvasLineStringBuilder2;
  }(Builder);
  var LineStringBuilder = CanvasLineStringBuilder;
  var __extends$R = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var CanvasPolygonBuilder = function(_super) {
    __extends$R(CanvasPolygonBuilder2, _super);
    function CanvasPolygonBuilder2(tolerance, maxExtent, resolution, pixelRatio) {
      return _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
    }
    CanvasPolygonBuilder2.prototype.drawFlatCoordinatess_ = function(flatCoordinates, offset, ends, stride) {
      var state = this.state;
      var fill = state.fillStyle !== void 0;
      var stroke = state.strokeStyle !== void 0;
      var numEnds = ends.length;
      this.instructions.push(beginPathInstruction);
      this.hitDetectionInstructions.push(beginPathInstruction);
      for (var i = 0; i < numEnds; ++i) {
        var end = ends[i];
        var myBegin = this.coordinates.length;
        var myEnd = this.appendFlatLineCoordinates(flatCoordinates, offset, end, stride, true, !stroke);
        var moveToLineToInstruction = [
          CanvasInstruction.MOVE_TO_LINE_TO,
          myBegin,
          myEnd
        ];
        this.instructions.push(moveToLineToInstruction);
        this.hitDetectionInstructions.push(moveToLineToInstruction);
        if (stroke) {
          this.instructions.push(closePathInstruction);
          this.hitDetectionInstructions.push(closePathInstruction);
        }
        offset = end;
      }
      if (fill) {
        this.instructions.push(fillInstruction);
        this.hitDetectionInstructions.push(fillInstruction);
      }
      if (stroke) {
        this.instructions.push(strokeInstruction);
        this.hitDetectionInstructions.push(strokeInstruction);
      }
      return offset;
    };
    CanvasPolygonBuilder2.prototype.drawCircle = function(circleGeometry, feature) {
      var state = this.state;
      var fillStyle = state.fillStyle;
      var strokeStyle = state.strokeStyle;
      if (fillStyle === void 0 && strokeStyle === void 0) {
        return;
      }
      this.setFillStrokeStyles_();
      this.beginGeometry(circleGeometry, feature);
      if (state.fillStyle !== void 0) {
        this.hitDetectionInstructions.push([
          CanvasInstruction.SET_FILL_STYLE,
          defaultFillStyle
        ]);
      }
      if (state.strokeStyle !== void 0) {
        this.hitDetectionInstructions.push([
          CanvasInstruction.SET_STROKE_STYLE,
          state.strokeStyle,
          state.lineWidth,
          state.lineCap,
          state.lineJoin,
          state.miterLimit,
          state.lineDash,
          state.lineDashOffset
        ]);
      }
      var flatCoordinates = circleGeometry.getFlatCoordinates();
      var stride = circleGeometry.getStride();
      var myBegin = this.coordinates.length;
      this.appendFlatLineCoordinates(flatCoordinates, 0, flatCoordinates.length, stride, false, false);
      var circleInstruction = [CanvasInstruction.CIRCLE, myBegin];
      this.instructions.push(beginPathInstruction, circleInstruction);
      this.hitDetectionInstructions.push(beginPathInstruction, circleInstruction);
      if (state.fillStyle !== void 0) {
        this.instructions.push(fillInstruction);
        this.hitDetectionInstructions.push(fillInstruction);
      }
      if (state.strokeStyle !== void 0) {
        this.instructions.push(strokeInstruction);
        this.hitDetectionInstructions.push(strokeInstruction);
      }
      this.endGeometry(feature);
    };
    CanvasPolygonBuilder2.prototype.drawPolygon = function(polygonGeometry, feature) {
      var state = this.state;
      var fillStyle = state.fillStyle;
      var strokeStyle = state.strokeStyle;
      if (fillStyle === void 0 && strokeStyle === void 0) {
        return;
      }
      this.setFillStrokeStyles_();
      this.beginGeometry(polygonGeometry, feature);
      if (state.fillStyle !== void 0) {
        this.hitDetectionInstructions.push([
          CanvasInstruction.SET_FILL_STYLE,
          defaultFillStyle
        ]);
      }
      if (state.strokeStyle !== void 0) {
        this.hitDetectionInstructions.push([
          CanvasInstruction.SET_STROKE_STYLE,
          state.strokeStyle,
          state.lineWidth,
          state.lineCap,
          state.lineJoin,
          state.miterLimit,
          state.lineDash,
          state.lineDashOffset
        ]);
      }
      var ends = polygonGeometry.getEnds();
      var flatCoordinates = polygonGeometry.getOrientedFlatCoordinates();
      var stride = polygonGeometry.getStride();
      this.drawFlatCoordinatess_(flatCoordinates, 0, ends, stride);
      this.endGeometry(feature);
    };
    CanvasPolygonBuilder2.prototype.drawMultiPolygon = function(multiPolygonGeometry, feature) {
      var state = this.state;
      var fillStyle = state.fillStyle;
      var strokeStyle = state.strokeStyle;
      if (fillStyle === void 0 && strokeStyle === void 0) {
        return;
      }
      this.setFillStrokeStyles_();
      this.beginGeometry(multiPolygonGeometry, feature);
      if (state.fillStyle !== void 0) {
        this.hitDetectionInstructions.push([
          CanvasInstruction.SET_FILL_STYLE,
          defaultFillStyle
        ]);
      }
      if (state.strokeStyle !== void 0) {
        this.hitDetectionInstructions.push([
          CanvasInstruction.SET_STROKE_STYLE,
          state.strokeStyle,
          state.lineWidth,
          state.lineCap,
          state.lineJoin,
          state.miterLimit,
          state.lineDash,
          state.lineDashOffset
        ]);
      }
      var endss = multiPolygonGeometry.getEndss();
      var flatCoordinates = multiPolygonGeometry.getOrientedFlatCoordinates();
      var stride = multiPolygonGeometry.getStride();
      var offset = 0;
      for (var i = 0, ii = endss.length; i < ii; ++i) {
        offset = this.drawFlatCoordinatess_(flatCoordinates, offset, endss[i], stride);
      }
      this.endGeometry(feature);
    };
    CanvasPolygonBuilder2.prototype.finish = function() {
      this.reverseHitDetectionInstructions();
      this.state = null;
      var tolerance = this.tolerance;
      if (tolerance !== 0) {
        var coordinates2 = this.coordinates;
        for (var i = 0, ii = coordinates2.length; i < ii; ++i) {
          coordinates2[i] = snap(coordinates2[i], tolerance);
        }
      }
      return _super.prototype.finish.call(this);
    };
    CanvasPolygonBuilder2.prototype.setFillStrokeStyles_ = function() {
      var state = this.state;
      var fillStyle = state.fillStyle;
      if (fillStyle !== void 0) {
        this.updateFillStyle(state, this.createFill);
      }
      if (state.strokeStyle !== void 0) {
        this.updateStrokeStyle(state, this.applyStroke);
      }
    };
    return CanvasPolygonBuilder2;
  }(Builder);
  var PolygonBuilder = CanvasPolygonBuilder;
  function matchingChunk(maxAngle, flatCoordinates, offset, end, stride) {
    var chunkStart = offset;
    var chunkEnd = offset;
    var chunkM = 0;
    var m = 0;
    var start = offset;
    var acos, i, m12, m23, x1, y1, x12, y12, x23, y23;
    for (i = offset; i < end; i += stride) {
      var x2 = flatCoordinates[i];
      var y2 = flatCoordinates[i + 1];
      if (x1 !== void 0) {
        x23 = x2 - x1;
        y23 = y2 - y1;
        m23 = Math.sqrt(x23 * x23 + y23 * y23);
        if (x12 !== void 0) {
          m += m12;
          acos = Math.acos((x12 * x23 + y12 * y23) / (m12 * m23));
          if (acos > maxAngle) {
            if (m > chunkM) {
              chunkM = m;
              chunkStart = start;
              chunkEnd = i;
            }
            m = 0;
            start = i - stride;
          }
        }
        m12 = m23;
        x12 = x23;
        y12 = y23;
      }
      x1 = x2;
      y1 = y2;
    }
    m += m23;
    return m > chunkM ? [start, i] : [chunkStart, chunkEnd];
  }
  var __extends$Q = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var TEXT_ALIGN = {
    "left": 0,
    "end": 0,
    "center": 0.5,
    "right": 1,
    "start": 1,
    "top": 0,
    "middle": 0.5,
    "hanging": 0.2,
    "alphabetic": 0.8,
    "ideographic": 0.8,
    "bottom": 1
  };
  var CanvasTextBuilder = function(_super) {
    __extends$Q(CanvasTextBuilder2, _super);
    function CanvasTextBuilder2(tolerance, maxExtent, resolution, pixelRatio) {
      var _this = _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
      _this.labels_ = null;
      _this.text_ = "";
      _this.textOffsetX_ = 0;
      _this.textOffsetY_ = 0;
      _this.textRotateWithView_ = void 0;
      _this.textRotation_ = 0;
      _this.textFillState_ = null;
      _this.fillStates = {};
      _this.textStrokeState_ = null;
      _this.strokeStates = {};
      _this.textState_ = {};
      _this.textStates = {};
      _this.textKey_ = "";
      _this.fillKey_ = "";
      _this.strokeKey_ = "";
      _this.declutterImageWithText_ = void 0;
      return _this;
    }
    CanvasTextBuilder2.prototype.finish = function() {
      var instructions = _super.prototype.finish.call(this);
      instructions.textStates = this.textStates;
      instructions.fillStates = this.fillStates;
      instructions.strokeStates = this.strokeStates;
      return instructions;
    };
    CanvasTextBuilder2.prototype.drawText = function(geometry, feature) {
      var fillState = this.textFillState_;
      var strokeState = this.textStrokeState_;
      var textState = this.textState_;
      if (this.text_ === "" || !textState || !fillState && !strokeState) {
        return;
      }
      var coordinates2 = this.coordinates;
      var begin = coordinates2.length;
      var geometryType = geometry.getType();
      var flatCoordinates = null;
      var stride = geometry.getStride();
      if (textState.placement === TextPlacement.LINE && (geometryType == GeometryType.LINE_STRING || geometryType == GeometryType.MULTI_LINE_STRING || geometryType == GeometryType.POLYGON || geometryType == GeometryType.MULTI_POLYGON)) {
        if (!intersects$1(this.getBufferedMaxExtent(), geometry.getExtent())) {
          return;
        }
        var ends = void 0;
        flatCoordinates = geometry.getFlatCoordinates();
        if (geometryType == GeometryType.LINE_STRING) {
          ends = [flatCoordinates.length];
        } else if (geometryType == GeometryType.MULTI_LINE_STRING) {
          ends = geometry.getEnds();
        } else if (geometryType == GeometryType.POLYGON) {
          ends = geometry.getEnds().slice(0, 1);
        } else if (geometryType == GeometryType.MULTI_POLYGON) {
          var endss = geometry.getEndss();
          ends = [];
          for (var i = 0, ii = endss.length; i < ii; ++i) {
            ends.push(endss[i][0]);
          }
        }
        this.beginGeometry(geometry, feature);
        var textAlign = textState.textAlign;
        var flatOffset = 0;
        var flatEnd = void 0;
        for (var o = 0, oo = ends.length; o < oo; ++o) {
          if (textAlign == void 0) {
            var range = matchingChunk(textState.maxAngle, flatCoordinates, flatOffset, ends[o], stride);
            flatOffset = range[0];
            flatEnd = range[1];
          } else {
            flatEnd = ends[o];
          }
          for (var i = flatOffset; i < flatEnd; i += stride) {
            coordinates2.push(flatCoordinates[i], flatCoordinates[i + 1]);
          }
          var end = coordinates2.length;
          flatOffset = ends[o];
          this.drawChars_(begin, end);
          begin = end;
        }
        this.endGeometry(feature);
      } else {
        var geometryWidths = textState.overflow ? null : [];
        switch (geometryType) {
          case GeometryType.POINT:
          case GeometryType.MULTI_POINT:
            flatCoordinates = geometry.getFlatCoordinates();
            break;
          case GeometryType.LINE_STRING:
            flatCoordinates = geometry.getFlatMidpoint();
            break;
          case GeometryType.CIRCLE:
            flatCoordinates = geometry.getCenter();
            break;
          case GeometryType.MULTI_LINE_STRING:
            flatCoordinates = geometry.getFlatMidpoints();
            stride = 2;
            break;
          case GeometryType.POLYGON:
            flatCoordinates = geometry.getFlatInteriorPoint();
            if (!textState.overflow) {
              geometryWidths.push(flatCoordinates[2] / this.resolution);
            }
            stride = 3;
            break;
          case GeometryType.MULTI_POLYGON:
            var interiorPoints = geometry.getFlatInteriorPoints();
            flatCoordinates = [];
            for (var i = 0, ii = interiorPoints.length; i < ii; i += 3) {
              if (!textState.overflow) {
                geometryWidths.push(interiorPoints[i + 2] / this.resolution);
              }
              flatCoordinates.push(interiorPoints[i], interiorPoints[i + 1]);
            }
            if (flatCoordinates.length === 0) {
              return;
            }
            stride = 2;
            break;
        }
        var end = this.appendFlatPointCoordinates(flatCoordinates, stride);
        if (end === begin) {
          return;
        }
        if (geometryWidths && (end - begin) / 2 !== flatCoordinates.length / stride) {
          var beg_1 = begin / 2;
          geometryWidths = geometryWidths.filter(function(w, i2) {
            var keep = coordinates2[(beg_1 + i2) * 2] === flatCoordinates[i2 * stride] && coordinates2[(beg_1 + i2) * 2 + 1] === flatCoordinates[i2 * stride + 1];
            if (!keep) {
              --beg_1;
            }
            return keep;
          });
        }
        this.saveTextStates_();
        if (textState.backgroundFill || textState.backgroundStroke) {
          this.setFillStrokeStyle(textState.backgroundFill, textState.backgroundStroke);
          if (textState.backgroundFill) {
            this.updateFillStyle(this.state, this.createFill);
            this.hitDetectionInstructions.push(this.createFill(this.state));
          }
          if (textState.backgroundStroke) {
            this.updateStrokeStyle(this.state, this.applyStroke);
            this.hitDetectionInstructions.push(this.createStroke(this.state));
          }
        }
        this.beginGeometry(geometry, feature);
        var padding = textState.padding;
        if (padding != defaultPadding && (textState.scale[0] < 0 || textState.scale[1] < 0)) {
          var p0 = textState.padding[0];
          var p12 = textState.padding[1];
          var p22 = textState.padding[2];
          var p32 = textState.padding[3];
          if (textState.scale[0] < 0) {
            p12 = -p12;
            p32 = -p32;
          }
          if (textState.scale[1] < 0) {
            p0 = -p0;
            p22 = -p22;
          }
          padding = [p0, p12, p22, p32];
        }
        var pixelRatio_1 = this.pixelRatio;
        this.instructions.push([
          CanvasInstruction.DRAW_IMAGE,
          begin,
          end,
          null,
          NaN,
          NaN,
          NaN,
          1,
          0,
          0,
          this.textRotateWithView_,
          this.textRotation_,
          [1, 1],
          NaN,
          this.declutterImageWithText_,
          padding == defaultPadding ? defaultPadding : padding.map(function(p) {
            return p * pixelRatio_1;
          }),
          !!textState.backgroundFill,
          !!textState.backgroundStroke,
          this.text_,
          this.textKey_,
          this.strokeKey_,
          this.fillKey_,
          this.textOffsetX_,
          this.textOffsetY_,
          geometryWidths
        ]);
        var scale2 = 1 / pixelRatio_1;
        this.hitDetectionInstructions.push([
          CanvasInstruction.DRAW_IMAGE,
          begin,
          end,
          null,
          NaN,
          NaN,
          NaN,
          1,
          0,
          0,
          this.textRotateWithView_,
          this.textRotation_,
          [scale2, scale2],
          NaN,
          this.declutterImageWithText_,
          padding,
          !!textState.backgroundFill,
          !!textState.backgroundStroke,
          this.text_,
          this.textKey_,
          this.strokeKey_,
          this.fillKey_,
          this.textOffsetX_,
          this.textOffsetY_,
          geometryWidths
        ]);
        this.endGeometry(feature);
      }
    };
    CanvasTextBuilder2.prototype.saveTextStates_ = function() {
      var strokeState = this.textStrokeState_;
      var textState = this.textState_;
      var fillState = this.textFillState_;
      var strokeKey = this.strokeKey_;
      if (strokeState) {
        if (!(strokeKey in this.strokeStates)) {
          this.strokeStates[strokeKey] = {
            strokeStyle: strokeState.strokeStyle,
            lineCap: strokeState.lineCap,
            lineDashOffset: strokeState.lineDashOffset,
            lineWidth: strokeState.lineWidth,
            lineJoin: strokeState.lineJoin,
            miterLimit: strokeState.miterLimit,
            lineDash: strokeState.lineDash
          };
        }
      }
      var textKey = this.textKey_;
      if (!(textKey in this.textStates)) {
        this.textStates[textKey] = {
          font: textState.font,
          textAlign: textState.textAlign || defaultTextAlign,
          textBaseline: textState.textBaseline || defaultTextBaseline,
          scale: textState.scale
        };
      }
      var fillKey = this.fillKey_;
      if (fillState) {
        if (!(fillKey in this.fillStates)) {
          this.fillStates[fillKey] = {
            fillStyle: fillState.fillStyle
          };
        }
      }
    };
    CanvasTextBuilder2.prototype.drawChars_ = function(begin, end) {
      var strokeState = this.textStrokeState_;
      var textState = this.textState_;
      var strokeKey = this.strokeKey_;
      var textKey = this.textKey_;
      var fillKey = this.fillKey_;
      this.saveTextStates_();
      var pixelRatio = this.pixelRatio;
      var baseline = TEXT_ALIGN[textState.textBaseline];
      var offsetY = this.textOffsetY_ * pixelRatio;
      var text = this.text_;
      var strokeWidth = strokeState ? strokeState.lineWidth * Math.abs(textState.scale[0]) / 2 : 0;
      this.instructions.push([
        CanvasInstruction.DRAW_CHARS,
        begin,
        end,
        baseline,
        textState.overflow,
        fillKey,
        textState.maxAngle,
        pixelRatio,
        offsetY,
        strokeKey,
        strokeWidth * pixelRatio,
        text,
        textKey,
        1
      ]);
      this.hitDetectionInstructions.push([
        CanvasInstruction.DRAW_CHARS,
        begin,
        end,
        baseline,
        textState.overflow,
        fillKey,
        textState.maxAngle,
        1,
        offsetY,
        strokeKey,
        strokeWidth,
        text,
        textKey,
        1 / pixelRatio
      ]);
    };
    CanvasTextBuilder2.prototype.setTextStyle = function(textStyle, opt_sharedData) {
      var textState, fillState, strokeState;
      if (!textStyle) {
        this.text_ = "";
      } else {
        var textFillStyle = textStyle.getFill();
        if (!textFillStyle) {
          fillState = null;
          this.textFillState_ = fillState;
        } else {
          fillState = this.textFillState_;
          if (!fillState) {
            fillState = {};
            this.textFillState_ = fillState;
          }
          fillState.fillStyle = asColorLike(textFillStyle.getColor() || defaultFillStyle);
        }
        var textStrokeStyle = textStyle.getStroke();
        if (!textStrokeStyle) {
          strokeState = null;
          this.textStrokeState_ = strokeState;
        } else {
          strokeState = this.textStrokeState_;
          if (!strokeState) {
            strokeState = {};
            this.textStrokeState_ = strokeState;
          }
          var lineDash = textStrokeStyle.getLineDash();
          var lineDashOffset = textStrokeStyle.getLineDashOffset();
          var lineWidth = textStrokeStyle.getWidth();
          var miterLimit = textStrokeStyle.getMiterLimit();
          strokeState.lineCap = textStrokeStyle.getLineCap() || defaultLineCap;
          strokeState.lineDash = lineDash ? lineDash.slice() : defaultLineDash;
          strokeState.lineDashOffset = lineDashOffset === void 0 ? defaultLineDashOffset : lineDashOffset;
          strokeState.lineJoin = textStrokeStyle.getLineJoin() || defaultLineJoin;
          strokeState.lineWidth = lineWidth === void 0 ? defaultLineWidth : lineWidth;
          strokeState.miterLimit = miterLimit === void 0 ? defaultMiterLimit : miterLimit;
          strokeState.strokeStyle = asColorLike(textStrokeStyle.getColor() || defaultStrokeStyle);
        }
        textState = this.textState_;
        var font = textStyle.getFont() || defaultFont;
        registerFont(font);
        var textScale = textStyle.getScaleArray();
        textState.overflow = textStyle.getOverflow();
        textState.font = font;
        textState.maxAngle = textStyle.getMaxAngle();
        textState.placement = textStyle.getPlacement();
        textState.textAlign = textStyle.getTextAlign();
        textState.textBaseline = textStyle.getTextBaseline() || defaultTextBaseline;
        textState.backgroundFill = textStyle.getBackgroundFill();
        textState.backgroundStroke = textStyle.getBackgroundStroke();
        textState.padding = textStyle.getPadding() || defaultPadding;
        textState.scale = textScale === void 0 ? [1, 1] : textScale;
        var textOffsetX = textStyle.getOffsetX();
        var textOffsetY = textStyle.getOffsetY();
        var textRotateWithView = textStyle.getRotateWithView();
        var textRotation = textStyle.getRotation();
        this.text_ = textStyle.getText() || "";
        this.textOffsetX_ = textOffsetX === void 0 ? 0 : textOffsetX;
        this.textOffsetY_ = textOffsetY === void 0 ? 0 : textOffsetY;
        this.textRotateWithView_ = textRotateWithView === void 0 ? false : textRotateWithView;
        this.textRotation_ = textRotation === void 0 ? 0 : textRotation;
        this.strokeKey_ = strokeState ? (typeof strokeState.strokeStyle == "string" ? strokeState.strokeStyle : getUid(strokeState.strokeStyle)) + strokeState.lineCap + strokeState.lineDashOffset + "|" + strokeState.lineWidth + strokeState.lineJoin + strokeState.miterLimit + "[" + strokeState.lineDash.join() + "]" : "";
        this.textKey_ = textState.font + textState.scale + (textState.textAlign || "?") + (textState.textBaseline || "?");
        this.fillKey_ = fillState ? typeof fillState.fillStyle == "string" ? fillState.fillStyle : "|" + getUid(fillState.fillStyle) : "";
      }
      this.declutterImageWithText_ = opt_sharedData;
    };
    return CanvasTextBuilder2;
  }(Builder);
  var TextBuilder = CanvasTextBuilder;
  var BATCH_CONSTRUCTORS = {
    "Circle": PolygonBuilder,
    "Default": Builder,
    "Image": ImageBuilder,
    "LineString": LineStringBuilder,
    "Polygon": PolygonBuilder,
    "Text": TextBuilder
  };
  var BuilderGroup = function() {
    function BuilderGroup2(tolerance, maxExtent, resolution, pixelRatio) {
      this.tolerance_ = tolerance;
      this.maxExtent_ = maxExtent;
      this.pixelRatio_ = pixelRatio;
      this.resolution_ = resolution;
      this.buildersByZIndex_ = {};
    }
    BuilderGroup2.prototype.finish = function() {
      var builderInstructions = {};
      for (var zKey in this.buildersByZIndex_) {
        builderInstructions[zKey] = builderInstructions[zKey] || {};
        var builders = this.buildersByZIndex_[zKey];
        for (var builderKey in builders) {
          var builderInstruction = builders[builderKey].finish();
          builderInstructions[zKey][builderKey] = builderInstruction;
        }
      }
      return builderInstructions;
    };
    BuilderGroup2.prototype.getBuilder = function(zIndex, builderType) {
      var zIndexKey = zIndex !== void 0 ? zIndex.toString() : "0";
      var replays = this.buildersByZIndex_[zIndexKey];
      if (replays === void 0) {
        replays = {};
        this.buildersByZIndex_[zIndexKey] = replays;
      }
      var replay = replays[builderType];
      if (replay === void 0) {
        var Constructor = BATCH_CONSTRUCTORS[builderType];
        replay = new Constructor(this.tolerance_, this.maxExtent_, this.resolution_, this.pixelRatio_);
        replays[builderType] = replay;
      }
      return replay;
    };
    return BuilderGroup2;
  }();
  var CanvasBuilderGroup = BuilderGroup;
  var __extends$P = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var LayerRenderer = function(_super) {
    __extends$P(LayerRenderer2, _super);
    function LayerRenderer2(layer) {
      var _this = _super.call(this) || this;
      _this.boundHandleImageChange_ = _this.handleImageChange_.bind(_this);
      _this.layer_ = layer;
      _this.declutterExecutorGroup = null;
      return _this;
    }
    LayerRenderer2.prototype.getFeatures = function(pixel) {
      return abstract();
    };
    LayerRenderer2.prototype.prepareFrame = function(frameState) {
      return abstract();
    };
    LayerRenderer2.prototype.renderFrame = function(frameState, target) {
      return abstract();
    };
    LayerRenderer2.prototype.loadedTileCallback = function(tiles, zoom, tile) {
      if (!tiles[zoom]) {
        tiles[zoom] = {};
      }
      tiles[zoom][tile.tileCoord.toString()] = tile;
      return void 0;
    };
    LayerRenderer2.prototype.createLoadedTileFinder = function(source, projection, tiles) {
      return function(zoom, tileRange) {
        var callback = this.loadedTileCallback.bind(this, tiles, zoom);
        return source.forEachLoadedTile(projection, zoom, tileRange, callback);
      }.bind(this);
    };
    LayerRenderer2.prototype.forEachFeatureAtCoordinate = function(coordinate, frameState, hitTolerance, callback, matches) {
      return void 0;
    };
    LayerRenderer2.prototype.getDataAtPixel = function(pixel, frameState, hitTolerance) {
      return null;
    };
    LayerRenderer2.prototype.getLayer = function() {
      return this.layer_;
    };
    LayerRenderer2.prototype.handleFontsChanged = function() {
    };
    LayerRenderer2.prototype.handleImageChange_ = function(event) {
      var image = event.target;
      if (image.getState() === ImageState.LOADED) {
        this.renderIfReadyAndVisible();
      }
    };
    LayerRenderer2.prototype.loadImage = function(image) {
      var imageState = image.getState();
      if (imageState != ImageState.LOADED && imageState != ImageState.ERROR) {
        image.addEventListener(EventType.CHANGE, this.boundHandleImageChange_);
      }
      if (imageState == ImageState.IDLE) {
        image.load();
        imageState = image.getState();
      }
      return imageState == ImageState.LOADED;
    };
    LayerRenderer2.prototype.renderIfReadyAndVisible = function() {
      var layer = this.getLayer();
      if (layer.getVisible() && layer.getSourceState() == SourceState.READY) {
        layer.changed();
      }
    };
    return LayerRenderer2;
  }(Observable$1);
  var LayerRenderer$1 = LayerRenderer;
  var __extends$O = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var RenderEvent = function(_super) {
    __extends$O(RenderEvent2, _super);
    function RenderEvent2(type, opt_inversePixelTransform, opt_frameState, opt_context) {
      var _this = _super.call(this, type) || this;
      _this.inversePixelTransform = opt_inversePixelTransform;
      _this.frameState = opt_frameState;
      _this.context = opt_context;
      return _this;
    }
    return RenderEvent2;
  }(Event);
  var RenderEvent$1 = RenderEvent;
  var __extends$N = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var CanvasLayerRenderer = function(_super) {
    __extends$N(CanvasLayerRenderer2, _super);
    function CanvasLayerRenderer2(layer) {
      var _this = _super.call(this, layer) || this;
      _this.container = null;
      _this.renderedResolution;
      _this.tempTransform = create();
      _this.pixelTransform = create();
      _this.inversePixelTransform = create();
      _this.context = null;
      _this.containerReused = false;
      return _this;
    }
    CanvasLayerRenderer2.prototype.useContainer = function(target, transform2, opacity) {
      var layerClassName = this.getLayer().getClassName();
      var container, context;
      if (target && target.style.opacity === cssOpacity(opacity) && target.className === layerClassName) {
        var canvas = target.firstElementChild;
        if (canvas instanceof HTMLCanvasElement) {
          context = canvas.getContext("2d");
        }
      }
      if (context && context.canvas.style.transform === transform2) {
        this.container = target;
        this.context = context;
        this.containerReused = true;
      } else if (this.containerReused) {
        this.container = null;
        this.context = null;
        this.containerReused = false;
      }
      if (!this.container) {
        container = document.createElement("div");
        container.className = layerClassName;
        var style = container.style;
        style.position = "absolute";
        style.width = "100%";
        style.height = "100%";
        context = createCanvasContext2D();
        var canvas = context.canvas;
        container.appendChild(canvas);
        style = canvas.style;
        style.position = "absolute";
        style.left = "0";
        style.transformOrigin = "top left";
        this.container = container;
        this.context = context;
      }
    };
    CanvasLayerRenderer2.prototype.clipUnrotated = function(context, frameState, extent) {
      var topLeft = getTopLeft(extent);
      var topRight = getTopRight(extent);
      var bottomRight = getBottomRight(extent);
      var bottomLeft = getBottomLeft(extent);
      apply(frameState.coordinateToPixelTransform, topLeft);
      apply(frameState.coordinateToPixelTransform, topRight);
      apply(frameState.coordinateToPixelTransform, bottomRight);
      apply(frameState.coordinateToPixelTransform, bottomLeft);
      var inverted = this.inversePixelTransform;
      apply(inverted, topLeft);
      apply(inverted, topRight);
      apply(inverted, bottomRight);
      apply(inverted, bottomLeft);
      context.save();
      context.beginPath();
      context.moveTo(Math.round(topLeft[0]), Math.round(topLeft[1]));
      context.lineTo(Math.round(topRight[0]), Math.round(topRight[1]));
      context.lineTo(Math.round(bottomRight[0]), Math.round(bottomRight[1]));
      context.lineTo(Math.round(bottomLeft[0]), Math.round(bottomLeft[1]));
      context.clip();
    };
    CanvasLayerRenderer2.prototype.dispatchRenderEvent_ = function(type, context, frameState) {
      var layer = this.getLayer();
      if (layer.hasListener(type)) {
        var event_1 = new RenderEvent$1(type, this.inversePixelTransform, frameState, context);
        layer.dispatchEvent(event_1);
      }
    };
    CanvasLayerRenderer2.prototype.preRender = function(context, frameState) {
      this.dispatchRenderEvent_(RenderEventType.PRERENDER, context, frameState);
    };
    CanvasLayerRenderer2.prototype.postRender = function(context, frameState) {
      this.dispatchRenderEvent_(RenderEventType.POSTRENDER, context, frameState);
    };
    CanvasLayerRenderer2.prototype.getRenderTransform = function(center, resolution, rotation, pixelRatio, width, height, offsetX) {
      var dx1 = width / 2;
      var dy1 = height / 2;
      var sx = pixelRatio / resolution;
      var sy = -sx;
      var dx2 = -center[0] + offsetX;
      var dy2 = -center[1];
      return compose(this.tempTransform, dx1, dy1, sx, sy, -rotation, dx2, dy2);
    };
    CanvasLayerRenderer2.prototype.getDataAtPixel = function(pixel, frameState, hitTolerance) {
      var renderPixel = apply(this.inversePixelTransform, pixel.slice());
      var context = this.context;
      var layer = this.getLayer();
      var layerExtent = layer.getExtent();
      if (layerExtent) {
        var renderCoordinate = apply(frameState.pixelToCoordinateTransform, pixel.slice());
        if (!containsCoordinate(layerExtent, renderCoordinate)) {
          return null;
        }
      }
      var data;
      try {
        var x = Math.round(renderPixel[0]);
        var y = Math.round(renderPixel[1]);
        var newCanvas = document.createElement("canvas");
        var newContext = newCanvas.getContext("2d");
        newCanvas.width = 1;
        newCanvas.height = 1;
        newContext.clearRect(0, 0, 1, 1);
        newContext.drawImage(context.canvas, x, y, 1, 1, 0, 0, 1, 1);
        data = newContext.getImageData(0, 0, 1, 1).data;
      } catch (err) {
        if (err.name === "SecurityError") {
          return new Uint8Array();
        }
        return data;
      }
      if (data[3] === 0) {
        return null;
      }
      return data;
    };
    return CanvasLayerRenderer2;
  }(LayerRenderer$1);
  var CanvasLayerRenderer$1 = CanvasLayerRenderer;
  var BuilderType = {
    CIRCLE: "Circle",
    DEFAULT: "Default",
    IMAGE: "Image",
    LINE_STRING: "LineString",
    POLYGON: "Polygon",
    TEXT: "Text"
  };
  function drawTextOnPath(flatCoordinates, offset, end, stride, text, startM, maxAngle, scale2, measureAndCacheTextWidth2, font, cache2, rotation) {
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];
    var x1 = 0;
    var y1 = 0;
    var segmentLength = 0;
    var segmentM = 0;
    function advance() {
      x1 = x2;
      y1 = y2;
      offset += stride;
      x2 = flatCoordinates[offset];
      y2 = flatCoordinates[offset + 1];
      segmentM += segmentLength;
      segmentLength = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }
    do {
      advance();
    } while (offset < end - stride && segmentM + segmentLength < startM);
    var interpolate = segmentLength === 0 ? 0 : (startM - segmentM) / segmentLength;
    var beginX = lerp(x1, x2, interpolate);
    var beginY = lerp(y1, y2, interpolate);
    var startOffset = offset - stride;
    var startLength = segmentM;
    var endM = startM + scale2 * measureAndCacheTextWidth2(font, text, cache2);
    while (offset < end - stride && segmentM + segmentLength < endM) {
      advance();
    }
    interpolate = segmentLength === 0 ? 0 : (endM - segmentM) / segmentLength;
    var endX = lerp(x1, x2, interpolate);
    var endY = lerp(y1, y2, interpolate);
    var reverse;
    if (rotation) {
      var flat = [beginX, beginY, endX, endY];
      rotate(flat, 0, 4, 2, rotation, flat, flat);
      reverse = flat[0] > flat[2];
    } else {
      reverse = beginX > endX;
    }
    var PI = Math.PI;
    var result = [];
    var singleSegment = startOffset + stride === offset;
    offset = startOffset;
    segmentLength = 0;
    segmentM = startLength;
    x2 = flatCoordinates[offset];
    y2 = flatCoordinates[offset + 1];
    var previousAngle;
    if (singleSegment) {
      advance();
      previousAngle = Math.atan2(y2 - y1, x2 - x1);
      if (reverse) {
        previousAngle += previousAngle > 0 ? -PI : PI;
      }
      var x = (endX + beginX) / 2;
      var y = (endY + beginY) / 2;
      result[0] = [x, y, (endM - startM) / 2, previousAngle, text];
      return result;
    }
    for (var i = 0, ii = text.length; i < ii; ) {
      advance();
      var angle = Math.atan2(y2 - y1, x2 - x1);
      if (reverse) {
        angle += angle > 0 ? -PI : PI;
      }
      if (previousAngle !== void 0) {
        var delta = angle - previousAngle;
        delta += delta > PI ? -2 * PI : delta < -PI ? 2 * PI : 0;
        if (Math.abs(delta) > maxAngle) {
          return null;
        }
      }
      previousAngle = angle;
      var iStart = i;
      var charLength = 0;
      for (; i < ii; ++i) {
        var index = reverse ? ii - i - 1 : i;
        var len = scale2 * measureAndCacheTextWidth2(font, text[index], cache2);
        if (offset + stride < end && segmentM + segmentLength < startM + charLength + len / 2) {
          break;
        }
        charLength += len;
      }
      if (i === iStart) {
        continue;
      }
      var chars = reverse ? text.substring(ii - iStart, ii - i) : text.substring(iStart, i);
      interpolate = segmentLength === 0 ? 0 : (startM + charLength / 2 - segmentM) / segmentLength;
      var x = lerp(x1, x2, interpolate);
      var y = lerp(y1, y2, interpolate);
      result.push([x, y, charLength / 2, angle, chars]);
      startM += charLength;
    }
    return result;
  }
  var tmpExtent = createEmpty();
  var p1 = [];
  var p2 = [];
  var p3 = [];
  var p4 = [];
  function getDeclutterBox(replayImageOrLabelArgs) {
    return replayImageOrLabelArgs[3].declutterBox;
  }
  var rtlRegEx = new RegExp("[" + String.fromCharCode(1425) + "-" + String.fromCharCode(2303) + String.fromCharCode(64285) + "-" + String.fromCharCode(65023) + String.fromCharCode(65136) + "-" + String.fromCharCode(65276) + String.fromCharCode(67584) + "-" + String.fromCharCode(69631) + String.fromCharCode(124928) + "-" + String.fromCharCode(126975) + "]");
  function horizontalTextAlign(text, align) {
    if ((align === "start" || align === "end") && !rtlRegEx.test(text)) {
      align = align === "start" ? "left" : "right";
    }
    return TEXT_ALIGN[align];
  }
  var Executor = function() {
    function Executor2(resolution, pixelRatio, overlaps, instructions) {
      this.overlaps = overlaps;
      this.pixelRatio = pixelRatio;
      this.resolution = resolution;
      this.alignFill_;
      this.instructions = instructions.instructions;
      this.coordinates = instructions.coordinates;
      this.coordinateCache_ = {};
      this.renderedTransform_ = create();
      this.hitDetectionInstructions = instructions.hitDetectionInstructions;
      this.pixelCoordinates_ = null;
      this.viewRotation_ = 0;
      this.fillStates = instructions.fillStates || {};
      this.strokeStates = instructions.strokeStates || {};
      this.textStates = instructions.textStates || {};
      this.widths_ = {};
      this.labels_ = {};
    }
    Executor2.prototype.createLabel = function(text, textKey, fillKey, strokeKey) {
      var key = text + textKey + fillKey + strokeKey;
      if (this.labels_[key]) {
        return this.labels_[key];
      }
      var strokeState = strokeKey ? this.strokeStates[strokeKey] : null;
      var fillState = fillKey ? this.fillStates[fillKey] : null;
      var textState = this.textStates[textKey];
      var pixelRatio = this.pixelRatio;
      var scale2 = [
        textState.scale[0] * pixelRatio,
        textState.scale[1] * pixelRatio
      ];
      var align = horizontalTextAlign(text, textState.textAlign || defaultTextAlign);
      var strokeWidth = strokeKey && strokeState.lineWidth ? strokeState.lineWidth : 0;
      var lines = text.split("\n");
      var numLines = lines.length;
      var widths = [];
      var width = measureTextWidths(textState.font, lines, widths);
      var lineHeight = measureTextHeight(textState.font);
      var height = lineHeight * numLines;
      var renderWidth = width + strokeWidth;
      var contextInstructions = [];
      var w = (renderWidth + 2) * scale2[0];
      var h = (height + strokeWidth) * scale2[1];
      var label = {
        width: w < 0 ? Math.floor(w) : Math.ceil(w),
        height: h < 0 ? Math.floor(h) : Math.ceil(h),
        contextInstructions
      };
      if (scale2[0] != 1 || scale2[1] != 1) {
        contextInstructions.push("scale", scale2);
      }
      contextInstructions.push("font", textState.font);
      if (strokeKey) {
        contextInstructions.push("strokeStyle", strokeState.strokeStyle);
        contextInstructions.push("lineWidth", strokeWidth);
        contextInstructions.push("lineCap", strokeState.lineCap);
        contextInstructions.push("lineJoin", strokeState.lineJoin);
        contextInstructions.push("miterLimit", strokeState.miterLimit);
        var Context = WORKER_OFFSCREEN_CANVAS ? OffscreenCanvasRenderingContext2D : CanvasRenderingContext2D;
        if (Context.prototype.setLineDash) {
          contextInstructions.push("setLineDash", [strokeState.lineDash]);
          contextInstructions.push("lineDashOffset", strokeState.lineDashOffset);
        }
      }
      if (fillKey) {
        contextInstructions.push("fillStyle", fillState.fillStyle);
      }
      contextInstructions.push("textBaseline", "middle");
      contextInstructions.push("textAlign", "center");
      var leftRight = 0.5 - align;
      var x = align * renderWidth + leftRight * strokeWidth;
      var i;
      if (strokeKey) {
        for (i = 0; i < numLines; ++i) {
          contextInstructions.push("strokeText", [
            lines[i],
            x + leftRight * widths[i],
            0.5 * (strokeWidth + lineHeight) + i * lineHeight
          ]);
        }
      }
      if (fillKey) {
        for (i = 0; i < numLines; ++i) {
          contextInstructions.push("fillText", [
            lines[i],
            x + leftRight * widths[i],
            0.5 * (strokeWidth + lineHeight) + i * lineHeight
          ]);
        }
      }
      this.labels_[key] = label;
      return label;
    };
    Executor2.prototype.replayTextBackground_ = function(context, p12, p22, p32, p42, fillInstruction2, strokeInstruction2) {
      context.beginPath();
      context.moveTo.apply(context, p12);
      context.lineTo.apply(context, p22);
      context.lineTo.apply(context, p32);
      context.lineTo.apply(context, p42);
      context.lineTo.apply(context, p12);
      if (fillInstruction2) {
        this.alignFill_ = fillInstruction2[2];
        this.fill_(context);
      }
      if (strokeInstruction2) {
        this.setStrokeStyle_(context, strokeInstruction2);
        context.stroke();
      }
    };
    Executor2.prototype.calculateImageOrLabelDimensions_ = function(sheetWidth, sheetHeight, centerX, centerY, width, height, anchorX, anchorY, originX, originY, rotation, scale2, snapToPixel, padding, fillStroke, feature) {
      anchorX *= scale2[0];
      anchorY *= scale2[1];
      var x = centerX - anchorX;
      var y = centerY - anchorY;
      var w = width + originX > sheetWidth ? sheetWidth - originX : width;
      var h = height + originY > sheetHeight ? sheetHeight - originY : height;
      var boxW = padding[3] + w * scale2[0] + padding[1];
      var boxH = padding[0] + h * scale2[1] + padding[2];
      var boxX = x - padding[3];
      var boxY = y - padding[0];
      if (fillStroke || rotation !== 0) {
        p1[0] = boxX;
        p4[0] = boxX;
        p1[1] = boxY;
        p2[1] = boxY;
        p2[0] = boxX + boxW;
        p3[0] = p2[0];
        p3[1] = boxY + boxH;
        p4[1] = p3[1];
      }
      var transform2;
      if (rotation !== 0) {
        transform2 = compose(create(), centerX, centerY, 1, 1, rotation, -centerX, -centerY);
        apply(transform2, p1);
        apply(transform2, p2);
        apply(transform2, p3);
        apply(transform2, p4);
        createOrUpdate$2(Math.min(p1[0], p2[0], p3[0], p4[0]), Math.min(p1[1], p2[1], p3[1], p4[1]), Math.max(p1[0], p2[0], p3[0], p4[0]), Math.max(p1[1], p2[1], p3[1], p4[1]), tmpExtent);
      } else {
        createOrUpdate$2(Math.min(boxX, boxX + boxW), Math.min(boxY, boxY + boxH), Math.max(boxX, boxX + boxW), Math.max(boxY, boxY + boxH), tmpExtent);
      }
      if (snapToPixel) {
        x = Math.round(x);
        y = Math.round(y);
      }
      return {
        drawImageX: x,
        drawImageY: y,
        drawImageW: w,
        drawImageH: h,
        originX,
        originY,
        declutterBox: {
          minX: tmpExtent[0],
          minY: tmpExtent[1],
          maxX: tmpExtent[2],
          maxY: tmpExtent[3],
          value: feature
        },
        canvasTransform: transform2,
        scale: scale2
      };
    };
    Executor2.prototype.replayImageOrLabel_ = function(context, contextScale, imageOrLabel, dimensions, opacity, fillInstruction2, strokeInstruction2) {
      var fillStroke = !!(fillInstruction2 || strokeInstruction2);
      var box = dimensions.declutterBox;
      var canvas = context.canvas;
      var strokePadding = strokeInstruction2 ? strokeInstruction2[2] * dimensions.scale[0] / 2 : 0;
      var intersects2 = box.minX - strokePadding <= canvas.width / contextScale && box.maxX + strokePadding >= 0 && box.minY - strokePadding <= canvas.height / contextScale && box.maxY + strokePadding >= 0;
      if (intersects2) {
        if (fillStroke) {
          this.replayTextBackground_(context, p1, p2, p3, p4, fillInstruction2, strokeInstruction2);
        }
        drawImageOrLabel(context, dimensions.canvasTransform, opacity, imageOrLabel, dimensions.originX, dimensions.originY, dimensions.drawImageW, dimensions.drawImageH, dimensions.drawImageX, dimensions.drawImageY, dimensions.scale);
      }
      return true;
    };
    Executor2.prototype.fill_ = function(context) {
      if (this.alignFill_) {
        var origin_1 = apply(this.renderedTransform_, [0, 0]);
        var repeatSize = 512 * this.pixelRatio;
        context.save();
        context.translate(origin_1[0] % repeatSize, origin_1[1] % repeatSize);
        context.rotate(this.viewRotation_);
      }
      context.fill();
      if (this.alignFill_) {
        context.restore();
      }
    };
    Executor2.prototype.setStrokeStyle_ = function(context, instruction) {
      context["strokeStyle"] = instruction[1];
      context.lineWidth = instruction[2];
      context.lineCap = instruction[3];
      context.lineJoin = instruction[4];
      context.miterLimit = instruction[5];
      if (context.setLineDash) {
        context.lineDashOffset = instruction[7];
        context.setLineDash(instruction[6]);
      }
    };
    Executor2.prototype.drawLabelWithPointPlacement_ = function(text, textKey, strokeKey, fillKey) {
      var textState = this.textStates[textKey];
      var label = this.createLabel(text, textKey, fillKey, strokeKey);
      var strokeState = this.strokeStates[strokeKey];
      var pixelRatio = this.pixelRatio;
      var align = horizontalTextAlign(text, textState.textAlign || defaultTextAlign);
      var baseline = TEXT_ALIGN[textState.textBaseline || defaultTextBaseline];
      var strokeWidth = strokeState && strokeState.lineWidth ? strokeState.lineWidth : 0;
      var width = label.width / pixelRatio - 2 * textState.scale[0];
      var anchorX = align * width + 2 * (0.5 - align) * strokeWidth;
      var anchorY = baseline * label.height / pixelRatio + 2 * (0.5 - baseline) * strokeWidth;
      return {
        label,
        anchorX,
        anchorY
      };
    };
    Executor2.prototype.execute_ = function(context, contextScale, transform2, instructions, snapToPixel, opt_featureCallback, opt_hitExtent, opt_declutterTree) {
      var pixelCoordinates;
      if (this.pixelCoordinates_ && equals$2(transform2, this.renderedTransform_)) {
        pixelCoordinates = this.pixelCoordinates_;
      } else {
        if (!this.pixelCoordinates_) {
          this.pixelCoordinates_ = [];
        }
        pixelCoordinates = transform2D(this.coordinates, 0, this.coordinates.length, 2, transform2, this.pixelCoordinates_);
        setFromArray(this.renderedTransform_, transform2);
      }
      var i = 0;
      var ii = instructions.length;
      var d = 0;
      var dd;
      var anchorX, anchorY, prevX, prevY, roundX, roundY, image, text, textKey, strokeKey, fillKey;
      var pendingFill = 0;
      var pendingStroke = 0;
      var lastFillInstruction = null;
      var lastStrokeInstruction = null;
      var coordinateCache = this.coordinateCache_;
      var viewRotation = this.viewRotation_;
      var viewRotationFromTransform = Math.round(Math.atan2(-transform2[1], transform2[0]) * 1e12) / 1e12;
      var state = {
        context,
        pixelRatio: this.pixelRatio,
        resolution: this.resolution,
        rotation: viewRotation
      };
      var batchSize = this.instructions != instructions || this.overlaps ? 0 : 200;
      var feature;
      var x, y, currentGeometry;
      while (i < ii) {
        var instruction = instructions[i];
        var type = instruction[0];
        switch (type) {
          case CanvasInstruction.BEGIN_GEOMETRY:
            feature = instruction[1];
            currentGeometry = instruction[3];
            if (!feature.getGeometry()) {
              i = instruction[2];
            } else if (opt_hitExtent !== void 0 && !intersects$1(opt_hitExtent, currentGeometry.getExtent())) {
              i = instruction[2] + 1;
            } else {
              ++i;
            }
            break;
          case CanvasInstruction.BEGIN_PATH:
            if (pendingFill > batchSize) {
              this.fill_(context);
              pendingFill = 0;
            }
            if (pendingStroke > batchSize) {
              context.stroke();
              pendingStroke = 0;
            }
            if (!pendingFill && !pendingStroke) {
              context.beginPath();
              prevX = NaN;
              prevY = NaN;
            }
            ++i;
            break;
          case CanvasInstruction.CIRCLE:
            d = instruction[1];
            var x1 = pixelCoordinates[d];
            var y1 = pixelCoordinates[d + 1];
            var x2 = pixelCoordinates[d + 2];
            var y2 = pixelCoordinates[d + 3];
            var dx = x2 - x1;
            var dy = y2 - y1;
            var r = Math.sqrt(dx * dx + dy * dy);
            context.moveTo(x1 + r, y1);
            context.arc(x1, y1, r, 0, 2 * Math.PI, true);
            ++i;
            break;
          case CanvasInstruction.CLOSE_PATH:
            context.closePath();
            ++i;
            break;
          case CanvasInstruction.CUSTOM:
            d = instruction[1];
            dd = instruction[2];
            var geometry = instruction[3];
            var renderer = instruction[4];
            var fn = instruction.length == 6 ? instruction[5] : void 0;
            state.geometry = geometry;
            state.feature = feature;
            if (!(i in coordinateCache)) {
              coordinateCache[i] = [];
            }
            var coords = coordinateCache[i];
            if (fn) {
              fn(pixelCoordinates, d, dd, 2, coords);
            } else {
              coords[0] = pixelCoordinates[d];
              coords[1] = pixelCoordinates[d + 1];
              coords.length = 2;
            }
            renderer(coords, state);
            ++i;
            break;
          case CanvasInstruction.DRAW_IMAGE:
            d = instruction[1];
            dd = instruction[2];
            image = instruction[3];
            anchorX = instruction[4];
            anchorY = instruction[5];
            var height = instruction[6];
            var opacity = instruction[7];
            var originX = instruction[8];
            var originY = instruction[9];
            var rotateWithView = instruction[10];
            var rotation = instruction[11];
            var scale2 = instruction[12];
            var width = instruction[13];
            var declutterImageWithText = instruction[14];
            if (!image && instruction.length >= 19) {
              text = instruction[18];
              textKey = instruction[19];
              strokeKey = instruction[20];
              fillKey = instruction[21];
              var labelWithAnchor = this.drawLabelWithPointPlacement_(text, textKey, strokeKey, fillKey);
              image = labelWithAnchor.label;
              instruction[3] = image;
              var textOffsetX = instruction[22];
              anchorX = (labelWithAnchor.anchorX - textOffsetX) * this.pixelRatio;
              instruction[4] = anchorX;
              var textOffsetY = instruction[23];
              anchorY = (labelWithAnchor.anchorY - textOffsetY) * this.pixelRatio;
              instruction[5] = anchorY;
              height = image.height;
              instruction[6] = height;
              width = image.width;
              instruction[13] = width;
            }
            var geometryWidths = void 0;
            if (instruction.length > 24) {
              geometryWidths = instruction[24];
            }
            var padding = void 0, backgroundFill = void 0, backgroundStroke = void 0;
            if (instruction.length > 16) {
              padding = instruction[15];
              backgroundFill = instruction[16];
              backgroundStroke = instruction[17];
            } else {
              padding = defaultPadding;
              backgroundFill = false;
              backgroundStroke = false;
            }
            if (rotateWithView && viewRotationFromTransform) {
              rotation += viewRotation;
            } else if (!rotateWithView && !viewRotationFromTransform) {
              rotation -= viewRotation;
            }
            var widthIndex = 0;
            for (; d < dd; d += 2) {
              if (geometryWidths && geometryWidths[widthIndex++] < width / this.pixelRatio) {
                continue;
              }
              var dimensions = this.calculateImageOrLabelDimensions_(image.width, image.height, pixelCoordinates[d], pixelCoordinates[d + 1], width, height, anchorX, anchorY, originX, originY, rotation, scale2, snapToPixel, padding, backgroundFill || backgroundStroke, feature);
              var args = [
                context,
                contextScale,
                image,
                dimensions,
                opacity,
                backgroundFill ? lastFillInstruction : null,
                backgroundStroke ? lastStrokeInstruction : null
              ];
              var imageArgs = void 0;
              var imageDeclutterBox = void 0;
              if (opt_declutterTree && declutterImageWithText) {
                var index = dd - d;
                if (!declutterImageWithText[index]) {
                  declutterImageWithText[index] = args;
                  continue;
                }
                imageArgs = declutterImageWithText[index];
                delete declutterImageWithText[index];
                imageDeclutterBox = getDeclutterBox(imageArgs);
                if (opt_declutterTree.collides(imageDeclutterBox)) {
                  continue;
                }
              }
              if (opt_declutterTree && opt_declutterTree.collides(dimensions.declutterBox)) {
                continue;
              }
              if (imageArgs) {
                if (opt_declutterTree) {
                  opt_declutterTree.insert(imageDeclutterBox);
                }
                this.replayImageOrLabel_.apply(this, imageArgs);
              }
              if (opt_declutterTree) {
                opt_declutterTree.insert(dimensions.declutterBox);
              }
              this.replayImageOrLabel_.apply(this, args);
            }
            ++i;
            break;
          case CanvasInstruction.DRAW_CHARS:
            var begin = instruction[1];
            var end = instruction[2];
            var baseline = instruction[3];
            var overflow = instruction[4];
            fillKey = instruction[5];
            var maxAngle = instruction[6];
            var measurePixelRatio = instruction[7];
            var offsetY = instruction[8];
            strokeKey = instruction[9];
            var strokeWidth = instruction[10];
            text = instruction[11];
            textKey = instruction[12];
            var pixelRatioScale = [
              instruction[13],
              instruction[13]
            ];
            var textState = this.textStates[textKey];
            var font = textState.font;
            var textScale = [
              textState.scale[0] * measurePixelRatio,
              textState.scale[1] * measurePixelRatio
            ];
            var cachedWidths = void 0;
            if (font in this.widths_) {
              cachedWidths = this.widths_[font];
            } else {
              cachedWidths = {};
              this.widths_[font] = cachedWidths;
            }
            var pathLength = lineStringLength(pixelCoordinates, begin, end, 2);
            var textLength = Math.abs(textScale[0]) * measureAndCacheTextWidth(font, text, cachedWidths);
            if (overflow || textLength <= pathLength) {
              var textAlign = this.textStates[textKey].textAlign;
              var startM = (pathLength - textLength) * TEXT_ALIGN[textAlign];
              var parts = drawTextOnPath(pixelCoordinates, begin, end, 2, text, startM, maxAngle, Math.abs(textScale[0]), measureAndCacheTextWidth, font, cachedWidths, viewRotationFromTransform ? 0 : this.viewRotation_);
              drawChars:
                if (parts) {
                  var replayImageOrLabelArgs = [];
                  var c = void 0, cc = void 0, chars = void 0, label = void 0, part = void 0;
                  if (strokeKey) {
                    for (c = 0, cc = parts.length; c < cc; ++c) {
                      part = parts[c];
                      chars = part[4];
                      label = this.createLabel(chars, textKey, "", strokeKey);
                      anchorX = part[2] + (textScale[0] < 0 ? -strokeWidth : strokeWidth);
                      anchorY = baseline * label.height + (0.5 - baseline) * 2 * strokeWidth * textScale[1] / textScale[0] - offsetY;
                      var dimensions = this.calculateImageOrLabelDimensions_(label.width, label.height, part[0], part[1], label.width, label.height, anchorX, anchorY, 0, 0, part[3], pixelRatioScale, false, defaultPadding, false, feature);
                      if (opt_declutterTree && opt_declutterTree.collides(dimensions.declutterBox)) {
                        break drawChars;
                      }
                      replayImageOrLabelArgs.push([
                        context,
                        contextScale,
                        label,
                        dimensions,
                        1,
                        null,
                        null
                      ]);
                    }
                  }
                  if (fillKey) {
                    for (c = 0, cc = parts.length; c < cc; ++c) {
                      part = parts[c];
                      chars = part[4];
                      label = this.createLabel(chars, textKey, fillKey, "");
                      anchorX = part[2];
                      anchorY = baseline * label.height - offsetY;
                      var dimensions = this.calculateImageOrLabelDimensions_(label.width, label.height, part[0], part[1], label.width, label.height, anchorX, anchorY, 0, 0, part[3], pixelRatioScale, false, defaultPadding, false, feature);
                      if (opt_declutterTree && opt_declutterTree.collides(dimensions.declutterBox)) {
                        break drawChars;
                      }
                      replayImageOrLabelArgs.push([
                        context,
                        contextScale,
                        label,
                        dimensions,
                        1,
                        null,
                        null
                      ]);
                    }
                  }
                  if (opt_declutterTree) {
                    opt_declutterTree.load(replayImageOrLabelArgs.map(getDeclutterBox));
                  }
                  for (var i_1 = 0, ii_1 = replayImageOrLabelArgs.length; i_1 < ii_1; ++i_1) {
                    this.replayImageOrLabel_.apply(this, replayImageOrLabelArgs[i_1]);
                  }
                }
            }
            ++i;
            break;
          case CanvasInstruction.END_GEOMETRY:
            if (opt_featureCallback !== void 0) {
              feature = instruction[1];
              var result = opt_featureCallback(feature, currentGeometry);
              if (result) {
                return result;
              }
            }
            ++i;
            break;
          case CanvasInstruction.FILL:
            if (batchSize) {
              pendingFill++;
            } else {
              this.fill_(context);
            }
            ++i;
            break;
          case CanvasInstruction.MOVE_TO_LINE_TO:
            d = instruction[1];
            dd = instruction[2];
            x = pixelCoordinates[d];
            y = pixelCoordinates[d + 1];
            roundX = x + 0.5 | 0;
            roundY = y + 0.5 | 0;
            if (roundX !== prevX || roundY !== prevY) {
              context.moveTo(x, y);
              prevX = roundX;
              prevY = roundY;
            }
            for (d += 2; d < dd; d += 2) {
              x = pixelCoordinates[d];
              y = pixelCoordinates[d + 1];
              roundX = x + 0.5 | 0;
              roundY = y + 0.5 | 0;
              if (d == dd - 2 || roundX !== prevX || roundY !== prevY) {
                context.lineTo(x, y);
                prevX = roundX;
                prevY = roundY;
              }
            }
            ++i;
            break;
          case CanvasInstruction.SET_FILL_STYLE:
            lastFillInstruction = instruction;
            this.alignFill_ = instruction[2];
            if (pendingFill) {
              this.fill_(context);
              pendingFill = 0;
              if (pendingStroke) {
                context.stroke();
                pendingStroke = 0;
              }
            }
            context.fillStyle = instruction[1];
            ++i;
            break;
          case CanvasInstruction.SET_STROKE_STYLE:
            lastStrokeInstruction = instruction;
            if (pendingStroke) {
              context.stroke();
              pendingStroke = 0;
            }
            this.setStrokeStyle_(context, instruction);
            ++i;
            break;
          case CanvasInstruction.STROKE:
            if (batchSize) {
              pendingStroke++;
            } else {
              context.stroke();
            }
            ++i;
            break;
          default:
            ++i;
            break;
        }
      }
      if (pendingFill) {
        this.fill_(context);
      }
      if (pendingStroke) {
        context.stroke();
      }
      return void 0;
    };
    Executor2.prototype.execute = function(context, contextScale, transform2, viewRotation, snapToPixel, opt_declutterTree) {
      this.viewRotation_ = viewRotation;
      this.execute_(context, contextScale, transform2, this.instructions, snapToPixel, void 0, void 0, opt_declutterTree);
    };
    Executor2.prototype.executeHitDetection = function(context, transform2, viewRotation, opt_featureCallback, opt_hitExtent) {
      this.viewRotation_ = viewRotation;
      return this.execute_(context, 1, transform2, this.hitDetectionInstructions, true, opt_featureCallback, opt_hitExtent);
    };
    return Executor2;
  }();
  var Executor$1 = Executor;
  var ORDER = [
    BuilderType.POLYGON,
    BuilderType.CIRCLE,
    BuilderType.LINE_STRING,
    BuilderType.IMAGE,
    BuilderType.TEXT,
    BuilderType.DEFAULT
  ];
  var ExecutorGroup = function() {
    function ExecutorGroup2(maxExtent, resolution, pixelRatio, overlaps, allInstructions, opt_renderBuffer) {
      this.maxExtent_ = maxExtent;
      this.overlaps_ = overlaps;
      this.pixelRatio_ = pixelRatio;
      this.resolution_ = resolution;
      this.renderBuffer_ = opt_renderBuffer;
      this.executorsByZIndex_ = {};
      this.hitDetectionContext_ = null;
      this.hitDetectionTransform_ = create();
      this.createExecutors_(allInstructions);
    }
    ExecutorGroup2.prototype.clip = function(context, transform2) {
      var flatClipCoords = this.getClipCoords(transform2);
      context.beginPath();
      context.moveTo(flatClipCoords[0], flatClipCoords[1]);
      context.lineTo(flatClipCoords[2], flatClipCoords[3]);
      context.lineTo(flatClipCoords[4], flatClipCoords[5]);
      context.lineTo(flatClipCoords[6], flatClipCoords[7]);
      context.clip();
    };
    ExecutorGroup2.prototype.createExecutors_ = function(allInstructions) {
      for (var zIndex in allInstructions) {
        var executors = this.executorsByZIndex_[zIndex];
        if (executors === void 0) {
          executors = {};
          this.executorsByZIndex_[zIndex] = executors;
        }
        var instructionByZindex = allInstructions[zIndex];
        for (var builderType in instructionByZindex) {
          var instructions = instructionByZindex[builderType];
          executors[builderType] = new Executor$1(this.resolution_, this.pixelRatio_, this.overlaps_, instructions);
        }
      }
    };
    ExecutorGroup2.prototype.hasExecutors = function(executors) {
      for (var zIndex in this.executorsByZIndex_) {
        var candidates = this.executorsByZIndex_[zIndex];
        for (var i = 0, ii = executors.length; i < ii; ++i) {
          if (executors[i] in candidates) {
            return true;
          }
        }
      }
      return false;
    };
    ExecutorGroup2.prototype.forEachFeatureAtCoordinate = function(coordinate, resolution, rotation, hitTolerance, callback, declutteredFeatures) {
      hitTolerance = Math.round(hitTolerance);
      var contextSize = hitTolerance * 2 + 1;
      var transform2 = compose(this.hitDetectionTransform_, hitTolerance + 0.5, hitTolerance + 0.5, 1 / resolution, -1 / resolution, -rotation, -coordinate[0], -coordinate[1]);
      var newContext = !this.hitDetectionContext_;
      if (newContext) {
        this.hitDetectionContext_ = createCanvasContext2D(contextSize, contextSize);
      }
      var context = this.hitDetectionContext_;
      if (context.canvas.width !== contextSize || context.canvas.height !== contextSize) {
        context.canvas.width = contextSize;
        context.canvas.height = contextSize;
      } else if (!newContext) {
        context.clearRect(0, 0, contextSize, contextSize);
      }
      var hitExtent;
      if (this.renderBuffer_ !== void 0) {
        hitExtent = createEmpty();
        extendCoordinate(hitExtent, coordinate);
        buffer(hitExtent, resolution * (this.renderBuffer_ + hitTolerance), hitExtent);
      }
      var indexes = getPixelIndexArray(hitTolerance);
      var builderType;
      function featureCallback(feature, geometry) {
        var imageData = context.getImageData(0, 0, contextSize, contextSize).data;
        for (var i_1 = 0, ii = indexes.length; i_1 < ii; i_1++) {
          if (imageData[indexes[i_1]] > 0) {
            if (!declutteredFeatures || builderType !== BuilderType.IMAGE && builderType !== BuilderType.TEXT || declutteredFeatures.indexOf(feature) !== -1) {
              var idx = (indexes[i_1] - 3) / 4;
              var x = hitTolerance - idx % contextSize;
              var y = hitTolerance - (idx / contextSize | 0);
              var result_1 = callback(feature, geometry, x * x + y * y);
              if (result_1) {
                return result_1;
              }
            }
            context.clearRect(0, 0, contextSize, contextSize);
            break;
          }
        }
        return void 0;
      }
      var zs = Object.keys(this.executorsByZIndex_).map(Number);
      zs.sort(numberSafeCompareFunction);
      var i, j, executors, executor, result;
      for (i = zs.length - 1; i >= 0; --i) {
        var zIndexKey = zs[i].toString();
        executors = this.executorsByZIndex_[zIndexKey];
        for (j = ORDER.length - 1; j >= 0; --j) {
          builderType = ORDER[j];
          executor = executors[builderType];
          if (executor !== void 0) {
            result = executor.executeHitDetection(context, transform2, rotation, featureCallback, hitExtent);
            if (result) {
              return result;
            }
          }
        }
      }
      return void 0;
    };
    ExecutorGroup2.prototype.getClipCoords = function(transform2) {
      var maxExtent = this.maxExtent_;
      if (!maxExtent) {
        return null;
      }
      var minX = maxExtent[0];
      var minY = maxExtent[1];
      var maxX = maxExtent[2];
      var maxY = maxExtent[3];
      var flatClipCoords = [minX, minY, minX, maxY, maxX, maxY, maxX, minY];
      transform2D(flatClipCoords, 0, 8, 2, transform2, flatClipCoords);
      return flatClipCoords;
    };
    ExecutorGroup2.prototype.isEmpty = function() {
      return isEmpty$1(this.executorsByZIndex_);
    };
    ExecutorGroup2.prototype.execute = function(context, contextScale, transform2, viewRotation, snapToPixel, opt_builderTypes, opt_declutterTree) {
      var zs = Object.keys(this.executorsByZIndex_).map(Number);
      zs.sort(numberSafeCompareFunction);
      if (this.maxExtent_) {
        context.save();
        this.clip(context, transform2);
      }
      var builderTypes = opt_builderTypes ? opt_builderTypes : ORDER;
      var i, ii, j, jj, replays, replay;
      if (opt_declutterTree) {
        zs.reverse();
      }
      for (i = 0, ii = zs.length; i < ii; ++i) {
        var zIndexKey = zs[i].toString();
        replays = this.executorsByZIndex_[zIndexKey];
        for (j = 0, jj = builderTypes.length; j < jj; ++j) {
          var builderType = builderTypes[j];
          replay = replays[builderType];
          if (replay !== void 0) {
            replay.execute(context, contextScale, transform2, viewRotation, snapToPixel, opt_declutterTree);
          }
        }
      }
      if (this.maxExtent_) {
        context.restore();
      }
    };
    return ExecutorGroup2;
  }();
  var circlePixelIndexArrayCache = {};
  function getPixelIndexArray(radius) {
    if (circlePixelIndexArrayCache[radius] !== void 0) {
      return circlePixelIndexArrayCache[radius];
    }
    var size = radius * 2 + 1;
    var maxDistanceSq = radius * radius;
    var distances = new Array(maxDistanceSq + 1);
    for (var i = 0; i <= radius; ++i) {
      for (var j = 0; j <= radius; ++j) {
        var distanceSq = i * i + j * j;
        if (distanceSq > maxDistanceSq) {
          break;
        }
        var distance = distances[distanceSq];
        if (!distance) {
          distance = [];
          distances[distanceSq] = distance;
        }
        distance.push(((radius + i) * size + (radius + j)) * 4 + 3);
        if (i > 0) {
          distance.push(((radius - i) * size + (radius + j)) * 4 + 3);
        }
        if (j > 0) {
          distance.push(((radius + i) * size + (radius - j)) * 4 + 3);
          if (i > 0) {
            distance.push(((radius - i) * size + (radius - j)) * 4 + 3);
          }
        }
      }
    }
    var pixelIndex = [];
    for (var i = 0, ii = distances.length; i < ii; ++i) {
      if (distances[i]) {
        pixelIndex.push.apply(pixelIndex, distances[i]);
      }
    }
    circlePixelIndexArrayCache[radius] = pixelIndex;
    return pixelIndex;
  }
  var ExecutorGroup$1 = ExecutorGroup;
  var ViewHint = {
    ANIMATING: 0,
    INTERACTING: 1
  };
  var __extends$M = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var CanvasImmediateRenderer = function(_super) {
    __extends$M(CanvasImmediateRenderer2, _super);
    function CanvasImmediateRenderer2(context, pixelRatio, extent, transform2, viewRotation, opt_squaredTolerance, opt_userTransform) {
      var _this = _super.call(this) || this;
      _this.context_ = context;
      _this.pixelRatio_ = pixelRatio;
      _this.extent_ = extent;
      _this.transform_ = transform2;
      _this.viewRotation_ = viewRotation;
      _this.squaredTolerance_ = opt_squaredTolerance;
      _this.userTransform_ = opt_userTransform;
      _this.contextFillState_ = null;
      _this.contextStrokeState_ = null;
      _this.contextTextState_ = null;
      _this.fillState_ = null;
      _this.strokeState_ = null;
      _this.image_ = null;
      _this.imageAnchorX_ = 0;
      _this.imageAnchorY_ = 0;
      _this.imageHeight_ = 0;
      _this.imageOpacity_ = 0;
      _this.imageOriginX_ = 0;
      _this.imageOriginY_ = 0;
      _this.imageRotateWithView_ = false;
      _this.imageRotation_ = 0;
      _this.imageScale_ = [0, 0];
      _this.imageWidth_ = 0;
      _this.text_ = "";
      _this.textOffsetX_ = 0;
      _this.textOffsetY_ = 0;
      _this.textRotateWithView_ = false;
      _this.textRotation_ = 0;
      _this.textScale_ = [0, 0];
      _this.textFillState_ = null;
      _this.textStrokeState_ = null;
      _this.textState_ = null;
      _this.pixelCoordinates_ = [];
      _this.tmpLocalTransform_ = create();
      return _this;
    }
    CanvasImmediateRenderer2.prototype.drawImages_ = function(flatCoordinates, offset, end, stride) {
      if (!this.image_) {
        return;
      }
      var pixelCoordinates = transform2D(flatCoordinates, offset, end, stride, this.transform_, this.pixelCoordinates_);
      var context = this.context_;
      var localTransform = this.tmpLocalTransform_;
      var alpha = context.globalAlpha;
      if (this.imageOpacity_ != 1) {
        context.globalAlpha = alpha * this.imageOpacity_;
      }
      var rotation = this.imageRotation_;
      if (this.imageRotateWithView_) {
        rotation += this.viewRotation_;
      }
      for (var i = 0, ii = pixelCoordinates.length; i < ii; i += 2) {
        var x = pixelCoordinates[i] - this.imageAnchorX_;
        var y = pixelCoordinates[i + 1] - this.imageAnchorY_;
        if (rotation !== 0 || this.imageScale_[0] != 1 || this.imageScale_[1] != 1) {
          var centerX = x + this.imageAnchorX_;
          var centerY = y + this.imageAnchorY_;
          compose(localTransform, centerX, centerY, 1, 1, rotation, -centerX, -centerY);
          context.setTransform.apply(context, localTransform);
          context.translate(centerX, centerY);
          context.scale(this.imageScale_[0], this.imageScale_[1]);
          context.drawImage(this.image_, this.imageOriginX_, this.imageOriginY_, this.imageWidth_, this.imageHeight_, -this.imageAnchorX_, -this.imageAnchorY_, this.imageWidth_, this.imageHeight_);
          context.setTransform(1, 0, 0, 1, 0, 0);
        } else {
          context.drawImage(this.image_, this.imageOriginX_, this.imageOriginY_, this.imageWidth_, this.imageHeight_, x, y, this.imageWidth_, this.imageHeight_);
        }
      }
      if (this.imageOpacity_ != 1) {
        context.globalAlpha = alpha;
      }
    };
    CanvasImmediateRenderer2.prototype.drawText_ = function(flatCoordinates, offset, end, stride) {
      if (!this.textState_ || this.text_ === "") {
        return;
      }
      if (this.textFillState_) {
        this.setContextFillState_(this.textFillState_);
      }
      if (this.textStrokeState_) {
        this.setContextStrokeState_(this.textStrokeState_);
      }
      this.setContextTextState_(this.textState_);
      var pixelCoordinates = transform2D(flatCoordinates, offset, end, stride, this.transform_, this.pixelCoordinates_);
      var context = this.context_;
      var rotation = this.textRotation_;
      if (this.textRotateWithView_) {
        rotation += this.viewRotation_;
      }
      for (; offset < end; offset += stride) {
        var x = pixelCoordinates[offset] + this.textOffsetX_;
        var y = pixelCoordinates[offset + 1] + this.textOffsetY_;
        if (rotation !== 0 || this.textScale_[0] != 1 || this.textScale_[1] != 1) {
          var localTransform = compose(this.tmpLocalTransform_, x, y, 1, 1, rotation, -x, -y);
          context.setTransform.apply(context, localTransform);
          context.translate(x, y);
          context.scale(this.textScale_[0], this.textScale_[1]);
          if (this.textStrokeState_) {
            context.strokeText(this.text_, 0, 0);
          }
          if (this.textFillState_) {
            context.fillText(this.text_, 0, 0);
          }
          context.setTransform(1, 0, 0, 1, 0, 0);
        } else {
          if (this.textStrokeState_) {
            context.strokeText(this.text_, x, y);
          }
          if (this.textFillState_) {
            context.fillText(this.text_, x, y);
          }
        }
      }
    };
    CanvasImmediateRenderer2.prototype.moveToLineTo_ = function(flatCoordinates, offset, end, stride, close) {
      var context = this.context_;
      var pixelCoordinates = transform2D(flatCoordinates, offset, end, stride, this.transform_, this.pixelCoordinates_);
      context.moveTo(pixelCoordinates[0], pixelCoordinates[1]);
      var length = pixelCoordinates.length;
      if (close) {
        length -= 2;
      }
      for (var i = 2; i < length; i += 2) {
        context.lineTo(pixelCoordinates[i], pixelCoordinates[i + 1]);
      }
      if (close) {
        context.closePath();
      }
      return end;
    };
    CanvasImmediateRenderer2.prototype.drawRings_ = function(flatCoordinates, offset, ends, stride) {
      for (var i = 0, ii = ends.length; i < ii; ++i) {
        offset = this.moveToLineTo_(flatCoordinates, offset, ends[i], stride, true);
      }
      return offset;
    };
    CanvasImmediateRenderer2.prototype.drawCircle = function(geometry) {
      if (!intersects$1(this.extent_, geometry.getExtent())) {
        return;
      }
      if (this.fillState_ || this.strokeState_) {
        if (this.fillState_) {
          this.setContextFillState_(this.fillState_);
        }
        if (this.strokeState_) {
          this.setContextStrokeState_(this.strokeState_);
        }
        var pixelCoordinates = transformGeom2D(geometry, this.transform_, this.pixelCoordinates_);
        var dx = pixelCoordinates[2] - pixelCoordinates[0];
        var dy = pixelCoordinates[3] - pixelCoordinates[1];
        var radius = Math.sqrt(dx * dx + dy * dy);
        var context = this.context_;
        context.beginPath();
        context.arc(pixelCoordinates[0], pixelCoordinates[1], radius, 0, 2 * Math.PI);
        if (this.fillState_) {
          context.fill();
        }
        if (this.strokeState_) {
          context.stroke();
        }
      }
      if (this.text_ !== "") {
        this.drawText_(geometry.getCenter(), 0, 2, 2);
      }
    };
    CanvasImmediateRenderer2.prototype.setStyle = function(style) {
      this.setFillStrokeStyle(style.getFill(), style.getStroke());
      this.setImageStyle(style.getImage());
      this.setTextStyle(style.getText());
    };
    CanvasImmediateRenderer2.prototype.setTransform = function(transform2) {
      this.transform_ = transform2;
    };
    CanvasImmediateRenderer2.prototype.drawGeometry = function(geometry) {
      var type = geometry.getType();
      switch (type) {
        case GeometryType.POINT:
          this.drawPoint(geometry);
          break;
        case GeometryType.LINE_STRING:
          this.drawLineString(geometry);
          break;
        case GeometryType.POLYGON:
          this.drawPolygon(geometry);
          break;
        case GeometryType.MULTI_POINT:
          this.drawMultiPoint(geometry);
          break;
        case GeometryType.MULTI_LINE_STRING:
          this.drawMultiLineString(geometry);
          break;
        case GeometryType.MULTI_POLYGON:
          this.drawMultiPolygon(geometry);
          break;
        case GeometryType.GEOMETRY_COLLECTION:
          this.drawGeometryCollection(geometry);
          break;
        case GeometryType.CIRCLE:
          this.drawCircle(geometry);
          break;
      }
    };
    CanvasImmediateRenderer2.prototype.drawFeature = function(feature, style) {
      var geometry = style.getGeometryFunction()(feature);
      if (!geometry || !intersects$1(this.extent_, geometry.getExtent())) {
        return;
      }
      this.setStyle(style);
      this.drawGeometry(geometry);
    };
    CanvasImmediateRenderer2.prototype.drawGeometryCollection = function(geometry) {
      var geometries = geometry.getGeometriesArray();
      for (var i = 0, ii = geometries.length; i < ii; ++i) {
        this.drawGeometry(geometries[i]);
      }
    };
    CanvasImmediateRenderer2.prototype.drawPoint = function(geometry) {
      if (this.squaredTolerance_) {
        geometry = geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
      }
      var flatCoordinates = geometry.getFlatCoordinates();
      var stride = geometry.getStride();
      if (this.image_) {
        this.drawImages_(flatCoordinates, 0, flatCoordinates.length, stride);
      }
      if (this.text_ !== "") {
        this.drawText_(flatCoordinates, 0, flatCoordinates.length, stride);
      }
    };
    CanvasImmediateRenderer2.prototype.drawMultiPoint = function(geometry) {
      if (this.squaredTolerance_) {
        geometry = geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
      }
      var flatCoordinates = geometry.getFlatCoordinates();
      var stride = geometry.getStride();
      if (this.image_) {
        this.drawImages_(flatCoordinates, 0, flatCoordinates.length, stride);
      }
      if (this.text_ !== "") {
        this.drawText_(flatCoordinates, 0, flatCoordinates.length, stride);
      }
    };
    CanvasImmediateRenderer2.prototype.drawLineString = function(geometry) {
      if (this.squaredTolerance_) {
        geometry = geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
      }
      if (!intersects$1(this.extent_, geometry.getExtent())) {
        return;
      }
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        var context = this.context_;
        var flatCoordinates = geometry.getFlatCoordinates();
        context.beginPath();
        this.moveToLineTo_(flatCoordinates, 0, flatCoordinates.length, geometry.getStride(), false);
        context.stroke();
      }
      if (this.text_ !== "") {
        var flatMidpoint = geometry.getFlatMidpoint();
        this.drawText_(flatMidpoint, 0, 2, 2);
      }
    };
    CanvasImmediateRenderer2.prototype.drawMultiLineString = function(geometry) {
      if (this.squaredTolerance_) {
        geometry = geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
      }
      var geometryExtent = geometry.getExtent();
      if (!intersects$1(this.extent_, geometryExtent)) {
        return;
      }
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        var context = this.context_;
        var flatCoordinates = geometry.getFlatCoordinates();
        var offset = 0;
        var ends = geometry.getEnds();
        var stride = geometry.getStride();
        context.beginPath();
        for (var i = 0, ii = ends.length; i < ii; ++i) {
          offset = this.moveToLineTo_(flatCoordinates, offset, ends[i], stride, false);
        }
        context.stroke();
      }
      if (this.text_ !== "") {
        var flatMidpoints = geometry.getFlatMidpoints();
        this.drawText_(flatMidpoints, 0, flatMidpoints.length, 2);
      }
    };
    CanvasImmediateRenderer2.prototype.drawPolygon = function(geometry) {
      if (this.squaredTolerance_) {
        geometry = geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
      }
      if (!intersects$1(this.extent_, geometry.getExtent())) {
        return;
      }
      if (this.strokeState_ || this.fillState_) {
        if (this.fillState_) {
          this.setContextFillState_(this.fillState_);
        }
        if (this.strokeState_) {
          this.setContextStrokeState_(this.strokeState_);
        }
        var context = this.context_;
        context.beginPath();
        this.drawRings_(geometry.getOrientedFlatCoordinates(), 0, geometry.getEnds(), geometry.getStride());
        if (this.fillState_) {
          context.fill();
        }
        if (this.strokeState_) {
          context.stroke();
        }
      }
      if (this.text_ !== "") {
        var flatInteriorPoint = geometry.getFlatInteriorPoint();
        this.drawText_(flatInteriorPoint, 0, 2, 2);
      }
    };
    CanvasImmediateRenderer2.prototype.drawMultiPolygon = function(geometry) {
      if (this.squaredTolerance_) {
        geometry = geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
      }
      if (!intersects$1(this.extent_, geometry.getExtent())) {
        return;
      }
      if (this.strokeState_ || this.fillState_) {
        if (this.fillState_) {
          this.setContextFillState_(this.fillState_);
        }
        if (this.strokeState_) {
          this.setContextStrokeState_(this.strokeState_);
        }
        var context = this.context_;
        var flatCoordinates = geometry.getOrientedFlatCoordinates();
        var offset = 0;
        var endss = geometry.getEndss();
        var stride = geometry.getStride();
        context.beginPath();
        for (var i = 0, ii = endss.length; i < ii; ++i) {
          var ends = endss[i];
          offset = this.drawRings_(flatCoordinates, offset, ends, stride);
        }
        if (this.fillState_) {
          context.fill();
        }
        if (this.strokeState_) {
          context.stroke();
        }
      }
      if (this.text_ !== "") {
        var flatInteriorPoints = geometry.getFlatInteriorPoints();
        this.drawText_(flatInteriorPoints, 0, flatInteriorPoints.length, 2);
      }
    };
    CanvasImmediateRenderer2.prototype.setContextFillState_ = function(fillState) {
      var context = this.context_;
      var contextFillState = this.contextFillState_;
      if (!contextFillState) {
        context.fillStyle = fillState.fillStyle;
        this.contextFillState_ = {
          fillStyle: fillState.fillStyle
        };
      } else {
        if (contextFillState.fillStyle != fillState.fillStyle) {
          contextFillState.fillStyle = fillState.fillStyle;
          context.fillStyle = fillState.fillStyle;
        }
      }
    };
    CanvasImmediateRenderer2.prototype.setContextStrokeState_ = function(strokeState) {
      var context = this.context_;
      var contextStrokeState = this.contextStrokeState_;
      if (!contextStrokeState) {
        context.lineCap = strokeState.lineCap;
        if (context.setLineDash) {
          context.setLineDash(strokeState.lineDash);
          context.lineDashOffset = strokeState.lineDashOffset;
        }
        context.lineJoin = strokeState.lineJoin;
        context.lineWidth = strokeState.lineWidth;
        context.miterLimit = strokeState.miterLimit;
        context.strokeStyle = strokeState.strokeStyle;
        this.contextStrokeState_ = {
          lineCap: strokeState.lineCap,
          lineDash: strokeState.lineDash,
          lineDashOffset: strokeState.lineDashOffset,
          lineJoin: strokeState.lineJoin,
          lineWidth: strokeState.lineWidth,
          miterLimit: strokeState.miterLimit,
          strokeStyle: strokeState.strokeStyle
        };
      } else {
        if (contextStrokeState.lineCap != strokeState.lineCap) {
          contextStrokeState.lineCap = strokeState.lineCap;
          context.lineCap = strokeState.lineCap;
        }
        if (context.setLineDash) {
          if (!equals$2(contextStrokeState.lineDash, strokeState.lineDash)) {
            context.setLineDash(contextStrokeState.lineDash = strokeState.lineDash);
          }
          if (contextStrokeState.lineDashOffset != strokeState.lineDashOffset) {
            contextStrokeState.lineDashOffset = strokeState.lineDashOffset;
            context.lineDashOffset = strokeState.lineDashOffset;
          }
        }
        if (contextStrokeState.lineJoin != strokeState.lineJoin) {
          contextStrokeState.lineJoin = strokeState.lineJoin;
          context.lineJoin = strokeState.lineJoin;
        }
        if (contextStrokeState.lineWidth != strokeState.lineWidth) {
          contextStrokeState.lineWidth = strokeState.lineWidth;
          context.lineWidth = strokeState.lineWidth;
        }
        if (contextStrokeState.miterLimit != strokeState.miterLimit) {
          contextStrokeState.miterLimit = strokeState.miterLimit;
          context.miterLimit = strokeState.miterLimit;
        }
        if (contextStrokeState.strokeStyle != strokeState.strokeStyle) {
          contextStrokeState.strokeStyle = strokeState.strokeStyle;
          context.strokeStyle = strokeState.strokeStyle;
        }
      }
    };
    CanvasImmediateRenderer2.prototype.setContextTextState_ = function(textState) {
      var context = this.context_;
      var contextTextState = this.contextTextState_;
      var textAlign = textState.textAlign ? textState.textAlign : defaultTextAlign;
      if (!contextTextState) {
        context.font = textState.font;
        context.textAlign = textAlign;
        context.textBaseline = textState.textBaseline;
        this.contextTextState_ = {
          font: textState.font,
          textAlign,
          textBaseline: textState.textBaseline
        };
      } else {
        if (contextTextState.font != textState.font) {
          contextTextState.font = textState.font;
          context.font = textState.font;
        }
        if (contextTextState.textAlign != textAlign) {
          contextTextState.textAlign = textAlign;
          context.textAlign = textAlign;
        }
        if (contextTextState.textBaseline != textState.textBaseline) {
          contextTextState.textBaseline = textState.textBaseline;
          context.textBaseline = textState.textBaseline;
        }
      }
    };
    CanvasImmediateRenderer2.prototype.setFillStrokeStyle = function(fillStyle, strokeStyle) {
      var _this = this;
      if (!fillStyle) {
        this.fillState_ = null;
      } else {
        var fillStyleColor = fillStyle.getColor();
        this.fillState_ = {
          fillStyle: asColorLike(fillStyleColor ? fillStyleColor : defaultFillStyle)
        };
      }
      if (!strokeStyle) {
        this.strokeState_ = null;
      } else {
        var strokeStyleColor = strokeStyle.getColor();
        var strokeStyleLineCap = strokeStyle.getLineCap();
        var strokeStyleLineDash = strokeStyle.getLineDash();
        var strokeStyleLineDashOffset = strokeStyle.getLineDashOffset();
        var strokeStyleLineJoin = strokeStyle.getLineJoin();
        var strokeStyleWidth = strokeStyle.getWidth();
        var strokeStyleMiterLimit = strokeStyle.getMiterLimit();
        var lineDash = strokeStyleLineDash ? strokeStyleLineDash : defaultLineDash;
        this.strokeState_ = {
          lineCap: strokeStyleLineCap !== void 0 ? strokeStyleLineCap : defaultLineCap,
          lineDash: this.pixelRatio_ === 1 ? lineDash : lineDash.map(function(n) {
            return n * _this.pixelRatio_;
          }),
          lineDashOffset: (strokeStyleLineDashOffset ? strokeStyleLineDashOffset : defaultLineDashOffset) * this.pixelRatio_,
          lineJoin: strokeStyleLineJoin !== void 0 ? strokeStyleLineJoin : defaultLineJoin,
          lineWidth: (strokeStyleWidth !== void 0 ? strokeStyleWidth : defaultLineWidth) * this.pixelRatio_,
          miterLimit: strokeStyleMiterLimit !== void 0 ? strokeStyleMiterLimit : defaultMiterLimit,
          strokeStyle: asColorLike(strokeStyleColor ? strokeStyleColor : defaultStrokeStyle)
        };
      }
    };
    CanvasImmediateRenderer2.prototype.setImageStyle = function(imageStyle) {
      var imageSize;
      if (!imageStyle || !(imageSize = imageStyle.getSize())) {
        this.image_ = null;
        return;
      }
      var imageAnchor = imageStyle.getAnchor();
      var imageOrigin = imageStyle.getOrigin();
      this.image_ = imageStyle.getImage(this.pixelRatio_);
      this.imageAnchorX_ = imageAnchor[0] * this.pixelRatio_;
      this.imageAnchorY_ = imageAnchor[1] * this.pixelRatio_;
      this.imageHeight_ = imageSize[1] * this.pixelRatio_;
      this.imageOpacity_ = imageStyle.getOpacity();
      this.imageOriginX_ = imageOrigin[0];
      this.imageOriginY_ = imageOrigin[1];
      this.imageRotateWithView_ = imageStyle.getRotateWithView();
      this.imageRotation_ = imageStyle.getRotation();
      this.imageScale_ = imageStyle.getScaleArray();
      this.imageWidth_ = imageSize[0] * this.pixelRatio_;
    };
    CanvasImmediateRenderer2.prototype.setTextStyle = function(textStyle) {
      if (!textStyle) {
        this.text_ = "";
      } else {
        var textFillStyle = textStyle.getFill();
        if (!textFillStyle) {
          this.textFillState_ = null;
        } else {
          var textFillStyleColor = textFillStyle.getColor();
          this.textFillState_ = {
            fillStyle: asColorLike(textFillStyleColor ? textFillStyleColor : defaultFillStyle)
          };
        }
        var textStrokeStyle = textStyle.getStroke();
        if (!textStrokeStyle) {
          this.textStrokeState_ = null;
        } else {
          var textStrokeStyleColor = textStrokeStyle.getColor();
          var textStrokeStyleLineCap = textStrokeStyle.getLineCap();
          var textStrokeStyleLineDash = textStrokeStyle.getLineDash();
          var textStrokeStyleLineDashOffset = textStrokeStyle.getLineDashOffset();
          var textStrokeStyleLineJoin = textStrokeStyle.getLineJoin();
          var textStrokeStyleWidth = textStrokeStyle.getWidth();
          var textStrokeStyleMiterLimit = textStrokeStyle.getMiterLimit();
          this.textStrokeState_ = {
            lineCap: textStrokeStyleLineCap !== void 0 ? textStrokeStyleLineCap : defaultLineCap,
            lineDash: textStrokeStyleLineDash ? textStrokeStyleLineDash : defaultLineDash,
            lineDashOffset: textStrokeStyleLineDashOffset ? textStrokeStyleLineDashOffset : defaultLineDashOffset,
            lineJoin: textStrokeStyleLineJoin !== void 0 ? textStrokeStyleLineJoin : defaultLineJoin,
            lineWidth: textStrokeStyleWidth !== void 0 ? textStrokeStyleWidth : defaultLineWidth,
            miterLimit: textStrokeStyleMiterLimit !== void 0 ? textStrokeStyleMiterLimit : defaultMiterLimit,
            strokeStyle: asColorLike(textStrokeStyleColor ? textStrokeStyleColor : defaultStrokeStyle)
          };
        }
        var textFont = textStyle.getFont();
        var textOffsetX = textStyle.getOffsetX();
        var textOffsetY = textStyle.getOffsetY();
        var textRotateWithView = textStyle.getRotateWithView();
        var textRotation = textStyle.getRotation();
        var textScale = textStyle.getScaleArray();
        var textText = textStyle.getText();
        var textTextAlign = textStyle.getTextAlign();
        var textTextBaseline = textStyle.getTextBaseline();
        this.textState_ = {
          font: textFont !== void 0 ? textFont : defaultFont,
          textAlign: textTextAlign !== void 0 ? textTextAlign : defaultTextAlign,
          textBaseline: textTextBaseline !== void 0 ? textTextBaseline : defaultTextBaseline
        };
        this.text_ = textText !== void 0 ? textText : "";
        this.textOffsetX_ = textOffsetX !== void 0 ? this.pixelRatio_ * textOffsetX : 0;
        this.textOffsetY_ = textOffsetY !== void 0 ? this.pixelRatio_ * textOffsetY : 0;
        this.textRotateWithView_ = textRotateWithView !== void 0 ? textRotateWithView : false;
        this.textRotation_ = textRotation !== void 0 ? textRotation : 0;
        this.textScale_ = [
          this.pixelRatio_ * textScale[0],
          this.pixelRatio_ * textScale[1]
        ];
      }
    };
    return CanvasImmediateRenderer2;
  }(VectorContext$1);
  var CanvasImmediateRenderer$1 = CanvasImmediateRenderer;
  var IconAnchorUnits = {
    FRACTION: "fraction",
    PIXELS: "pixels"
  };
  var IconOrigin = {
    BOTTOM_LEFT: "bottom-left",
    BOTTOM_RIGHT: "bottom-right",
    TOP_LEFT: "top-left",
    TOP_RIGHT: "top-right"
  };
  var IconImageCache = function() {
    function IconImageCache2() {
      this.cache_ = {};
      this.cacheSize_ = 0;
      this.maxCacheSize_ = 32;
    }
    IconImageCache2.prototype.clear = function() {
      this.cache_ = {};
      this.cacheSize_ = 0;
    };
    IconImageCache2.prototype.canExpireCache = function() {
      return this.cacheSize_ > this.maxCacheSize_;
    };
    IconImageCache2.prototype.expire = function() {
      if (this.canExpireCache()) {
        var i = 0;
        for (var key in this.cache_) {
          var iconImage = this.cache_[key];
          if ((i++ & 3) === 0 && !iconImage.hasListener()) {
            delete this.cache_[key];
            --this.cacheSize_;
          }
        }
      }
    };
    IconImageCache2.prototype.get = function(src, crossOrigin, color) {
      var key = getKey$1(src, crossOrigin, color);
      return key in this.cache_ ? this.cache_[key] : null;
    };
    IconImageCache2.prototype.set = function(src, crossOrigin, color, iconImage) {
      var key = getKey$1(src, crossOrigin, color);
      this.cache_[key] = iconImage;
      ++this.cacheSize_;
    };
    IconImageCache2.prototype.setSize = function(maxCacheSize) {
      this.maxCacheSize_ = maxCacheSize;
      this.expire();
    };
    return IconImageCache2;
  }();
  function getKey$1(src, crossOrigin, color) {
    var colorString = color ? asString(color) : "null";
    return crossOrigin + ":" + src + ":" + colorString;
  }
  var shared = new IconImageCache();
  var __extends$L = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var ImageBase = function(_super) {
    __extends$L(ImageBase2, _super);
    function ImageBase2(extent, resolution, pixelRatio, state) {
      var _this = _super.call(this) || this;
      _this.extent = extent;
      _this.pixelRatio_ = pixelRatio;
      _this.resolution = resolution;
      _this.state = state;
      return _this;
    }
    ImageBase2.prototype.changed = function() {
      this.dispatchEvent(EventType.CHANGE);
    };
    ImageBase2.prototype.getExtent = function() {
      return this.extent;
    };
    ImageBase2.prototype.getImage = function() {
      return abstract();
    };
    ImageBase2.prototype.getPixelRatio = function() {
      return this.pixelRatio_;
    };
    ImageBase2.prototype.getResolution = function() {
      return this.resolution;
    };
    ImageBase2.prototype.getState = function() {
      return this.state;
    };
    ImageBase2.prototype.load = function() {
      abstract();
    };
    return ImageBase2;
  }(Target$1);
  var ImageBase$1 = ImageBase;
  var __extends$K = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  (function(_super) {
    __extends$K(ImageWrapper, _super);
    function ImageWrapper(extent, resolution, pixelRatio, src, crossOrigin, imageLoadFunction) {
      var _this = _super.call(this, extent, resolution, pixelRatio, ImageState.IDLE) || this;
      _this.src_ = src;
      _this.image_ = new Image();
      if (crossOrigin !== null) {
        _this.image_.crossOrigin = crossOrigin;
      }
      _this.unlisten_ = null;
      _this.state = ImageState.IDLE;
      _this.imageLoadFunction_ = imageLoadFunction;
      return _this;
    }
    ImageWrapper.prototype.getImage = function() {
      return this.image_;
    };
    ImageWrapper.prototype.handleImageError_ = function() {
      this.state = ImageState.ERROR;
      this.unlistenImage_();
      this.changed();
    };
    ImageWrapper.prototype.handleImageLoad_ = function() {
      if (this.resolution === void 0) {
        this.resolution = getHeight(this.extent) / this.image_.height;
      }
      this.state = ImageState.LOADED;
      this.unlistenImage_();
      this.changed();
    };
    ImageWrapper.prototype.load = function() {
      if (this.state == ImageState.IDLE || this.state == ImageState.ERROR) {
        this.state = ImageState.LOADING;
        this.changed();
        this.imageLoadFunction_(this, this.src_);
        this.unlisten_ = listenImage(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
      }
    };
    ImageWrapper.prototype.setImage = function(image) {
      this.image_ = image;
      this.resolution = getHeight(this.extent) / this.image_.height;
    };
    ImageWrapper.prototype.unlistenImage_ = function() {
      if (this.unlisten_) {
        this.unlisten_();
        this.unlisten_ = null;
      }
    };
    return ImageWrapper;
  })(ImageBase$1);
  function listenImage(image, loadHandler, errorHandler) {
    var img = image;
    if (img.src && IMAGE_DECODE) {
      var promise = img.decode();
      var listening_1 = true;
      var unlisten = function() {
        listening_1 = false;
      };
      promise.then(function() {
        if (listening_1) {
          loadHandler();
        }
      }).catch(function(error) {
        if (listening_1) {
          if (error.name === "EncodingError" && error.message === "Invalid image type.") {
            loadHandler();
          } else {
            errorHandler();
          }
        }
      });
      return unlisten;
    }
    var listenerKeys = [
      listenOnce(img, EventType.LOAD, loadHandler),
      listenOnce(img, EventType.ERROR, errorHandler)
    ];
    return function unlisten2() {
      listenerKeys.forEach(unlistenByKey);
    };
  }
  var __extends$J = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var taintedTestContext = null;
  var IconImage = function(_super) {
    __extends$J(IconImage2, _super);
    function IconImage2(image, src, size, crossOrigin, imageState, color) {
      var _this = _super.call(this) || this;
      _this.hitDetectionImage_ = null;
      _this.image_ = !image ? new Image() : image;
      if (crossOrigin !== null) {
        _this.image_.crossOrigin = crossOrigin;
      }
      _this.canvas_ = {};
      _this.color_ = color;
      _this.unlisten_ = null;
      _this.imageState_ = imageState;
      _this.size_ = size;
      _this.src_ = src;
      _this.tainted_;
      return _this;
    }
    IconImage2.prototype.isTainted_ = function() {
      if (this.tainted_ === void 0 && this.imageState_ === ImageState.LOADED) {
        if (!taintedTestContext) {
          taintedTestContext = createCanvasContext2D(1, 1);
        }
        taintedTestContext.drawImage(this.image_, 0, 0);
        try {
          taintedTestContext.getImageData(0, 0, 1, 1);
          this.tainted_ = false;
        } catch (e) {
          taintedTestContext = null;
          this.tainted_ = true;
        }
      }
      return this.tainted_ === true;
    };
    IconImage2.prototype.dispatchChangeEvent_ = function() {
      this.dispatchEvent(EventType.CHANGE);
    };
    IconImage2.prototype.handleImageError_ = function() {
      this.imageState_ = ImageState.ERROR;
      this.unlistenImage_();
      this.dispatchChangeEvent_();
    };
    IconImage2.prototype.handleImageLoad_ = function() {
      this.imageState_ = ImageState.LOADED;
      if (this.size_) {
        this.image_.width = this.size_[0];
        this.image_.height = this.size_[1];
      } else {
        this.size_ = [this.image_.width, this.image_.height];
      }
      this.unlistenImage_();
      this.dispatchChangeEvent_();
    };
    IconImage2.prototype.getImage = function(pixelRatio) {
      this.replaceColor_(pixelRatio);
      return this.canvas_[pixelRatio] ? this.canvas_[pixelRatio] : this.image_;
    };
    IconImage2.prototype.getPixelRatio = function(pixelRatio) {
      this.replaceColor_(pixelRatio);
      return this.canvas_[pixelRatio] ? pixelRatio : 1;
    };
    IconImage2.prototype.getImageState = function() {
      return this.imageState_;
    };
    IconImage2.prototype.getHitDetectionImage = function() {
      if (!this.hitDetectionImage_) {
        if (this.isTainted_()) {
          var width = this.size_[0];
          var height = this.size_[1];
          var context = createCanvasContext2D(width, height);
          context.fillRect(0, 0, width, height);
          this.hitDetectionImage_ = context.canvas;
        } else {
          this.hitDetectionImage_ = this.image_;
        }
      }
      return this.hitDetectionImage_;
    };
    IconImage2.prototype.getSize = function() {
      return this.size_;
    };
    IconImage2.prototype.getSrc = function() {
      return this.src_;
    };
    IconImage2.prototype.load = function() {
      if (this.imageState_ == ImageState.IDLE) {
        this.imageState_ = ImageState.LOADING;
        try {
          this.image_.src = this.src_;
        } catch (e) {
          this.handleImageError_();
        }
        this.unlisten_ = listenImage(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
      }
    };
    IconImage2.prototype.replaceColor_ = function(pixelRatio) {
      if (!this.color_ || this.canvas_[pixelRatio] || this.imageState_ !== ImageState.LOADED) {
        return;
      }
      var canvas = document.createElement("canvas");
      this.canvas_[pixelRatio] = canvas;
      canvas.width = Math.ceil(this.image_.width * pixelRatio);
      canvas.height = Math.ceil(this.image_.height * pixelRatio);
      var ctx = canvas.getContext("2d");
      ctx.scale(pixelRatio, pixelRatio);
      ctx.drawImage(this.image_, 0, 0);
      ctx.globalCompositeOperation = "multiply";
      if (ctx.globalCompositeOperation === "multiply" || this.isTainted_()) {
        ctx.fillStyle = asString(this.color_);
        ctx.fillRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(this.image_, 0, 0);
      } else {
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        var r = this.color_[0] / 255;
        var g = this.color_[1] / 255;
        var b = this.color_[2] / 255;
        var a = this.color_[3];
        for (var i = 0, ii = data.length; i < ii; i += 4) {
          data[i] *= r;
          data[i + 1] *= g;
          data[i + 2] *= b;
          data[i + 3] *= a;
        }
        ctx.putImageData(imgData, 0, 0);
      }
    };
    IconImage2.prototype.unlistenImage_ = function() {
      if (this.unlisten_) {
        this.unlisten_();
        this.unlisten_ = null;
      }
    };
    return IconImage2;
  }(Target$1);
  function get(image, src, size, crossOrigin, imageState, color) {
    var iconImage = shared.get(src, crossOrigin, color);
    if (!iconImage) {
      iconImage = new IconImage(image, src, size, crossOrigin, imageState, color);
      shared.set(src, crossOrigin, color, iconImage);
    }
    return iconImage;
  }
  var __extends$I = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Icon = function(_super) {
    __extends$I(Icon2, _super);
    function Icon2(opt_options) {
      var _this = this;
      var options = opt_options || {};
      var opacity = options.opacity !== void 0 ? options.opacity : 1;
      var rotation = options.rotation !== void 0 ? options.rotation : 0;
      var scale2 = options.scale !== void 0 ? options.scale : 1;
      var rotateWithView = options.rotateWithView !== void 0 ? options.rotateWithView : false;
      _this = _super.call(this, {
        opacity,
        rotation,
        scale: scale2,
        displacement: options.displacement !== void 0 ? options.displacement : [0, 0],
        rotateWithView
      }) || this;
      _this.anchor_ = options.anchor !== void 0 ? options.anchor : [0.5, 0.5];
      _this.normalizedAnchor_ = null;
      _this.anchorOrigin_ = options.anchorOrigin !== void 0 ? options.anchorOrigin : IconOrigin.TOP_LEFT;
      _this.anchorXUnits_ = options.anchorXUnits !== void 0 ? options.anchorXUnits : IconAnchorUnits.FRACTION;
      _this.anchorYUnits_ = options.anchorYUnits !== void 0 ? options.anchorYUnits : IconAnchorUnits.FRACTION;
      _this.crossOrigin_ = options.crossOrigin !== void 0 ? options.crossOrigin : null;
      var image = options.img !== void 0 ? options.img : null;
      var imgSize = options.imgSize !== void 0 ? options.imgSize : null;
      var src = options.src;
      assert(!(src !== void 0 && image), 4);
      assert(!image || image && imgSize, 5);
      if ((src === void 0 || src.length === 0) && image) {
        src = image.src || getUid(image);
      }
      assert(src !== void 0 && src.length > 0, 6);
      var imageState = options.src !== void 0 ? ImageState.IDLE : ImageState.LOADED;
      _this.color_ = options.color !== void 0 ? asArray(options.color) : null;
      _this.iconImage_ = get(image, src, imgSize, _this.crossOrigin_, imageState, _this.color_);
      _this.offset_ = options.offset !== void 0 ? options.offset : [0, 0];
      _this.offsetOrigin_ = options.offsetOrigin !== void 0 ? options.offsetOrigin : IconOrigin.TOP_LEFT;
      _this.origin_ = null;
      _this.size_ = options.size !== void 0 ? options.size : null;
      return _this;
    }
    Icon2.prototype.clone = function() {
      var scale2 = this.getScale();
      return new Icon2({
        anchor: this.anchor_.slice(),
        anchorOrigin: this.anchorOrigin_,
        anchorXUnits: this.anchorXUnits_,
        anchorYUnits: this.anchorYUnits_,
        crossOrigin: this.crossOrigin_,
        color: this.color_ && this.color_.slice ? this.color_.slice() : this.color_ || void 0,
        src: this.getSrc(),
        offset: this.offset_.slice(),
        offsetOrigin: this.offsetOrigin_,
        size: this.size_ !== null ? this.size_.slice() : void 0,
        opacity: this.getOpacity(),
        scale: Array.isArray(scale2) ? scale2.slice() : scale2,
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView()
      });
    };
    Icon2.prototype.getAnchor = function() {
      if (this.normalizedAnchor_) {
        return this.normalizedAnchor_;
      }
      var anchor = this.anchor_;
      var size = this.getSize();
      if (this.anchorXUnits_ == IconAnchorUnits.FRACTION || this.anchorYUnits_ == IconAnchorUnits.FRACTION) {
        if (!size) {
          return null;
        }
        anchor = this.anchor_.slice();
        if (this.anchorXUnits_ == IconAnchorUnits.FRACTION) {
          anchor[0] *= size[0];
        }
        if (this.anchorYUnits_ == IconAnchorUnits.FRACTION) {
          anchor[1] *= size[1];
        }
      }
      if (this.anchorOrigin_ != IconOrigin.TOP_LEFT) {
        if (!size) {
          return null;
        }
        if (anchor === this.anchor_) {
          anchor = this.anchor_.slice();
        }
        if (this.anchorOrigin_ == IconOrigin.TOP_RIGHT || this.anchorOrigin_ == IconOrigin.BOTTOM_RIGHT) {
          anchor[0] = -anchor[0] + size[0];
        }
        if (this.anchorOrigin_ == IconOrigin.BOTTOM_LEFT || this.anchorOrigin_ == IconOrigin.BOTTOM_RIGHT) {
          anchor[1] = -anchor[1] + size[1];
        }
      }
      var displacement = this.getDisplacement();
      anchor[0] -= displacement[0];
      anchor[1] += displacement[1];
      this.normalizedAnchor_ = anchor;
      return this.normalizedAnchor_;
    };
    Icon2.prototype.setAnchor = function(anchor) {
      this.anchor_ = anchor;
      this.normalizedAnchor_ = null;
    };
    Icon2.prototype.getColor = function() {
      return this.color_;
    };
    Icon2.prototype.getImage = function(pixelRatio) {
      return this.iconImage_.getImage(pixelRatio);
    };
    Icon2.prototype.getPixelRatio = function(pixelRatio) {
      return this.iconImage_.getPixelRatio(pixelRatio);
    };
    Icon2.prototype.getImageSize = function() {
      return this.iconImage_.getSize();
    };
    Icon2.prototype.getImageState = function() {
      return this.iconImage_.getImageState();
    };
    Icon2.prototype.getHitDetectionImage = function() {
      return this.iconImage_.getHitDetectionImage();
    };
    Icon2.prototype.getOrigin = function() {
      if (this.origin_) {
        return this.origin_;
      }
      var offset = this.offset_;
      if (this.offsetOrigin_ != IconOrigin.TOP_LEFT) {
        var size = this.getSize();
        var iconImageSize = this.iconImage_.getSize();
        if (!size || !iconImageSize) {
          return null;
        }
        offset = offset.slice();
        if (this.offsetOrigin_ == IconOrigin.TOP_RIGHT || this.offsetOrigin_ == IconOrigin.BOTTOM_RIGHT) {
          offset[0] = iconImageSize[0] - size[0] - offset[0];
        }
        if (this.offsetOrigin_ == IconOrigin.BOTTOM_LEFT || this.offsetOrigin_ == IconOrigin.BOTTOM_RIGHT) {
          offset[1] = iconImageSize[1] - size[1] - offset[1];
        }
      }
      this.origin_ = offset;
      return this.origin_;
    };
    Icon2.prototype.getSrc = function() {
      return this.iconImage_.getSrc();
    };
    Icon2.prototype.getSize = function() {
      return !this.size_ ? this.iconImage_.getSize() : this.size_;
    };
    Icon2.prototype.listenImageChange = function(listener) {
      this.iconImage_.addEventListener(EventType.CHANGE, listener);
    };
    Icon2.prototype.load = function() {
      this.iconImage_.load();
    };
    Icon2.prototype.unlistenImageChange = function(listener) {
      this.iconImage_.removeEventListener(EventType.CHANGE, listener);
    };
    return Icon2;
  }(ImageStyle$1);
  var Icon$1 = Icon;
  var HIT_DETECT_RESOLUTION = 0.5;
  function createHitDetectionImageData(size, transforms2, features, styleFunction, extent, resolution, rotation) {
    var width = size[0] * HIT_DETECT_RESOLUTION;
    var height = size[1] * HIT_DETECT_RESOLUTION;
    var context = createCanvasContext2D(width, height);
    context.imageSmoothingEnabled = false;
    var canvas = context.canvas;
    var renderer = new CanvasImmediateRenderer$1(context, HIT_DETECT_RESOLUTION, extent, null, rotation);
    var featureCount = features.length;
    var indexFactor = Math.floor((256 * 256 * 256 - 1) / featureCount);
    var featuresByZIndex = {};
    for (var i = 1; i <= featureCount; ++i) {
      var feature = features[i - 1];
      var featureStyleFunction = feature.getStyleFunction() || styleFunction;
      if (!styleFunction) {
        continue;
      }
      var styles = featureStyleFunction(feature, resolution);
      if (!styles) {
        continue;
      }
      if (!Array.isArray(styles)) {
        styles = [styles];
      }
      var index = i * indexFactor;
      var color = "#" + ("000000" + index.toString(16)).slice(-6);
      for (var j = 0, jj = styles.length; j < jj; ++j) {
        var originalStyle = styles[j];
        var geometry = originalStyle.getGeometryFunction()(feature);
        if (!geometry || !intersects$1(extent, geometry.getExtent())) {
          continue;
        }
        var style = originalStyle.clone();
        var fill = style.getFill();
        if (fill) {
          fill.setColor(color);
        }
        var stroke = style.getStroke();
        if (stroke) {
          stroke.setColor(color);
          stroke.setLineDash(null);
        }
        style.setText(void 0);
        var image = originalStyle.getImage();
        if (image && image.getOpacity() !== 0) {
          var imgSize = image.getImageSize();
          if (!imgSize) {
            continue;
          }
          var imgContext = createCanvasContext2D(imgSize[0], imgSize[1], void 0, { alpha: false });
          var img = imgContext.canvas;
          imgContext.fillStyle = color;
          imgContext.fillRect(0, 0, img.width, img.height);
          style.setImage(new Icon$1({
            img,
            imgSize,
            anchor: image.getAnchor(),
            anchorXUnits: IconAnchorUnits.PIXELS,
            anchorYUnits: IconAnchorUnits.PIXELS,
            offset: image.getOrigin(),
            opacity: 1,
            size: image.getSize(),
            scale: image.getScale(),
            rotation: image.getRotation(),
            rotateWithView: image.getRotateWithView()
          }));
        }
        var zIndex = style.getZIndex() || 0;
        var byGeometryType = featuresByZIndex[zIndex];
        if (!byGeometryType) {
          byGeometryType = {};
          featuresByZIndex[zIndex] = byGeometryType;
          byGeometryType[GeometryType.POLYGON] = [];
          byGeometryType[GeometryType.CIRCLE] = [];
          byGeometryType[GeometryType.LINE_STRING] = [];
          byGeometryType[GeometryType.POINT] = [];
        }
        byGeometryType[geometry.getType().replace("Multi", "")].push(geometry, style);
      }
    }
    var zIndexKeys = Object.keys(featuresByZIndex).map(Number).sort(numberSafeCompareFunction);
    for (var i = 0, ii = zIndexKeys.length; i < ii; ++i) {
      var byGeometryType = featuresByZIndex[zIndexKeys[i]];
      for (var type in byGeometryType) {
        var geomAndStyle = byGeometryType[type];
        for (var j = 0, jj = geomAndStyle.length; j < jj; j += 2) {
          renderer.setStyle(geomAndStyle[j + 1]);
          for (var k = 0, kk = transforms2.length; k < kk; ++k) {
            renderer.setTransform(transforms2[k]);
            renderer.drawGeometry(geomAndStyle[j]);
          }
        }
      }
    }
    return context.getImageData(0, 0, canvas.width, canvas.height);
  }
  function hitDetect(pixel, features, imageData) {
    var resultFeatures = [];
    if (imageData) {
      var x = Math.floor(Math.round(pixel[0]) * HIT_DETECT_RESOLUTION);
      var y = Math.floor(Math.round(pixel[1]) * HIT_DETECT_RESOLUTION);
      var index = (clamp(x, 0, imageData.width - 1) + clamp(y, 0, imageData.height - 1) * imageData.width) * 4;
      var r = imageData.data[index];
      var g = imageData.data[index + 1];
      var b = imageData.data[index + 2];
      var i = b + 256 * (g + 256 * r);
      var indexFactor = Math.floor((256 * 256 * 256 - 1) / features.length);
      if (i && i % indexFactor === 0) {
        resultFeatures.push(features[i / indexFactor - 1]);
      }
    }
    return resultFeatures;
  }
  var SIMPLIFY_TOLERANCE = 0.5;
  var GEOMETRY_RENDERERS = {
    "Point": renderPointGeometry,
    "LineString": renderLineStringGeometry,
    "Polygon": renderPolygonGeometry,
    "MultiPoint": renderMultiPointGeometry,
    "MultiLineString": renderMultiLineStringGeometry,
    "MultiPolygon": renderMultiPolygonGeometry,
    "GeometryCollection": renderGeometryCollectionGeometry,
    "Circle": renderCircleGeometry
  };
  function defaultOrder(feature1, feature2) {
    return parseInt(getUid(feature1), 10) - parseInt(getUid(feature2), 10);
  }
  function getSquaredTolerance(resolution, pixelRatio) {
    var tolerance = getTolerance(resolution, pixelRatio);
    return tolerance * tolerance;
  }
  function getTolerance(resolution, pixelRatio) {
    return SIMPLIFY_TOLERANCE * resolution / pixelRatio;
  }
  function renderCircleGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
    var fillStyle = style.getFill();
    var strokeStyle = style.getStroke();
    if (fillStyle || strokeStyle) {
      var circleReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType.CIRCLE);
      circleReplay.setFillStrokeStyle(fillStyle, strokeStyle);
      circleReplay.drawCircle(geometry, feature);
    }
    var textStyle = style.getText();
    if (textStyle && textStyle.getText()) {
      var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType.TEXT);
      textReplay.setTextStyle(textStyle);
      textReplay.drawText(geometry, feature);
    }
  }
  function renderFeature(replayGroup, feature, style, squaredTolerance, listener, opt_transform, opt_declutterBuilderGroup) {
    var loading = false;
    var imageStyle = style.getImage();
    if (imageStyle) {
      var imageState = imageStyle.getImageState();
      if (imageState == ImageState.LOADED || imageState == ImageState.ERROR) {
        imageStyle.unlistenImageChange(listener);
      } else {
        if (imageState == ImageState.IDLE) {
          imageStyle.load();
        }
        imageState = imageStyle.getImageState();
        imageStyle.listenImageChange(listener);
        loading = true;
      }
    }
    renderFeatureInternal(replayGroup, feature, style, squaredTolerance, opt_transform, opt_declutterBuilderGroup);
    return loading;
  }
  function renderFeatureInternal(replayGroup, feature, style, squaredTolerance, opt_transform, opt_declutterBuilderGroup) {
    var geometry = style.getGeometryFunction()(feature);
    if (!geometry) {
      return;
    }
    var simplifiedGeometry = geometry.simplifyTransformed(squaredTolerance, opt_transform);
    var renderer = style.getRenderer();
    if (renderer) {
      renderGeometry(replayGroup, simplifiedGeometry, style, feature);
    } else {
      var geometryRenderer = GEOMETRY_RENDERERS[simplifiedGeometry.getType()];
      geometryRenderer(replayGroup, simplifiedGeometry, style, feature, opt_declutterBuilderGroup);
    }
  }
  function renderGeometry(replayGroup, geometry, style, feature) {
    if (geometry.getType() == GeometryType.GEOMETRY_COLLECTION) {
      var geometries = geometry.getGeometries();
      for (var i = 0, ii = geometries.length; i < ii; ++i) {
        renderGeometry(replayGroup, geometries[i], style, feature);
      }
      return;
    }
    var replay = replayGroup.getBuilder(style.getZIndex(), BuilderType.DEFAULT);
    replay.drawCustom(geometry, feature, style.getRenderer(), style.getHitDetectionRenderer());
  }
  function renderGeometryCollectionGeometry(replayGroup, geometry, style, feature, opt_declutterBuilderGroup) {
    var geometries = geometry.getGeometriesArray();
    var i, ii;
    for (i = 0, ii = geometries.length; i < ii; ++i) {
      var geometryRenderer = GEOMETRY_RENDERERS[geometries[i].getType()];
      geometryRenderer(replayGroup, geometries[i], style, feature, opt_declutterBuilderGroup);
    }
  }
  function renderLineStringGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
    var strokeStyle = style.getStroke();
    if (strokeStyle) {
      var lineStringReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType.LINE_STRING);
      lineStringReplay.setFillStrokeStyle(null, strokeStyle);
      lineStringReplay.drawLineString(geometry, feature);
    }
    var textStyle = style.getText();
    if (textStyle && textStyle.getText()) {
      var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType.TEXT);
      textReplay.setTextStyle(textStyle);
      textReplay.drawText(geometry, feature);
    }
  }
  function renderMultiLineStringGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
    var strokeStyle = style.getStroke();
    if (strokeStyle) {
      var lineStringReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType.LINE_STRING);
      lineStringReplay.setFillStrokeStyle(null, strokeStyle);
      lineStringReplay.drawMultiLineString(geometry, feature);
    }
    var textStyle = style.getText();
    if (textStyle && textStyle.getText()) {
      var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType.TEXT);
      textReplay.setTextStyle(textStyle);
      textReplay.drawText(geometry, feature);
    }
  }
  function renderMultiPolygonGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
    var fillStyle = style.getFill();
    var strokeStyle = style.getStroke();
    if (strokeStyle || fillStyle) {
      var polygonReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType.POLYGON);
      polygonReplay.setFillStrokeStyle(fillStyle, strokeStyle);
      polygonReplay.drawMultiPolygon(geometry, feature);
    }
    var textStyle = style.getText();
    if (textStyle && textStyle.getText()) {
      var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType.TEXT);
      textReplay.setTextStyle(textStyle);
      textReplay.drawText(geometry, feature);
    }
  }
  function renderPointGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
    var imageStyle = style.getImage();
    var textStyle = style.getText();
    var declutterImageWithText;
    if (opt_declutterBuilderGroup) {
      builderGroup = opt_declutterBuilderGroup;
      declutterImageWithText = imageStyle && textStyle && textStyle.getText() ? {} : void 0;
    }
    if (imageStyle) {
      if (imageStyle.getImageState() != ImageState.LOADED) {
        return;
      }
      var imageReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType.IMAGE);
      imageReplay.setImageStyle(imageStyle, declutterImageWithText);
      imageReplay.drawPoint(geometry, feature);
    }
    if (textStyle && textStyle.getText()) {
      var textReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType.TEXT);
      textReplay.setTextStyle(textStyle, declutterImageWithText);
      textReplay.drawText(geometry, feature);
    }
  }
  function renderMultiPointGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
    var imageStyle = style.getImage();
    var textStyle = style.getText();
    var declutterImageWithText;
    if (opt_declutterBuilderGroup) {
      builderGroup = opt_declutterBuilderGroup;
      declutterImageWithText = imageStyle && textStyle && textStyle.getText() ? {} : void 0;
    }
    if (imageStyle) {
      if (imageStyle.getImageState() != ImageState.LOADED) {
        return;
      }
      var imageReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType.IMAGE);
      imageReplay.setImageStyle(imageStyle, declutterImageWithText);
      imageReplay.drawMultiPoint(geometry, feature);
    }
    if (textStyle && textStyle.getText()) {
      var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType.TEXT);
      textReplay.setTextStyle(textStyle, declutterImageWithText);
      textReplay.drawText(geometry, feature);
    }
  }
  function renderPolygonGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
    var fillStyle = style.getFill();
    var strokeStyle = style.getStroke();
    if (fillStyle || strokeStyle) {
      var polygonReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType.POLYGON);
      polygonReplay.setFillStrokeStyle(fillStyle, strokeStyle);
      polygonReplay.drawPolygon(geometry, feature);
    }
    var textStyle = style.getText();
    if (textStyle && textStyle.getText()) {
      var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType.TEXT);
      textReplay.setTextStyle(textStyle);
      textReplay.drawText(geometry, feature);
    }
  }
  var __extends$H = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var CanvasVectorLayerRenderer = function(_super) {
    __extends$H(CanvasVectorLayerRenderer2, _super);
    function CanvasVectorLayerRenderer2(vectorLayer) {
      var _this = _super.call(this, vectorLayer) || this;
      _this.boundHandleStyleImageChange_ = _this.handleStyleImageChange_.bind(_this);
      _this.animatingOrInteracting_;
      _this.dirty_ = false;
      _this.hitDetectionImageData_ = null;
      _this.renderedFeatures_ = null;
      _this.renderedRevision_ = -1;
      _this.renderedResolution_ = NaN;
      _this.renderedExtent_ = createEmpty();
      _this.wrappedRenderedExtent_ = createEmpty();
      _this.renderedRotation_;
      _this.renderedCenter_ = null;
      _this.renderedProjection_ = null;
      _this.renderedRenderOrder_ = null;
      _this.replayGroup_ = null;
      _this.replayGroupChanged = true;
      _this.declutterExecutorGroup = null;
      _this.clipping = true;
      return _this;
    }
    CanvasVectorLayerRenderer2.prototype.useContainer = function(target, transform2, opacity) {
      if (opacity < 1) {
        target = null;
      }
      _super.prototype.useContainer.call(this, target, transform2, opacity);
    };
    CanvasVectorLayerRenderer2.prototype.renderWorlds = function(executorGroup, frameState, opt_declutterTree) {
      var extent = frameState.extent;
      var viewState = frameState.viewState;
      var center = viewState.center;
      var resolution = viewState.resolution;
      var projection = viewState.projection;
      var rotation = viewState.rotation;
      var projectionExtent = projection.getExtent();
      var vectorSource = this.getLayer().getSource();
      var pixelRatio = frameState.pixelRatio;
      var viewHints = frameState.viewHints;
      var snapToPixel = !(viewHints[ViewHint.ANIMATING] || viewHints[ViewHint.INTERACTING]);
      var context = this.context;
      var width = Math.round(frameState.size[0] * pixelRatio);
      var height = Math.round(frameState.size[1] * pixelRatio);
      var multiWorld = vectorSource.getWrapX() && projection.canWrapX();
      var worldWidth = multiWorld ? getWidth(projectionExtent) : null;
      var endWorld = multiWorld ? Math.ceil((extent[2] - projectionExtent[2]) / worldWidth) + 1 : 1;
      var world = multiWorld ? Math.floor((extent[0] - projectionExtent[0]) / worldWidth) : 0;
      do {
        var transform2 = this.getRenderTransform(center, resolution, rotation, pixelRatio, width, height, world * worldWidth);
        executorGroup.execute(context, 1, transform2, rotation, snapToPixel, void 0, opt_declutterTree);
      } while (++world < endWorld);
    };
    CanvasVectorLayerRenderer2.prototype.renderDeclutter = function(frameState) {
      if (this.declutterExecutorGroup) {
        this.renderWorlds(this.declutterExecutorGroup, frameState, frameState.declutterTree);
      }
    };
    CanvasVectorLayerRenderer2.prototype.renderFrame = function(frameState, target) {
      var pixelRatio = frameState.pixelRatio;
      var layerState = frameState.layerStatesArray[frameState.layerIndex];
      makeScale(this.pixelTransform, 1 / pixelRatio, 1 / pixelRatio);
      makeInverse(this.inversePixelTransform, this.pixelTransform);
      var canvasTransform = toString$1(this.pixelTransform);
      this.useContainer(target, canvasTransform, layerState.opacity);
      var context = this.context;
      var canvas = context.canvas;
      var replayGroup = this.replayGroup_;
      var declutterExecutorGroup = this.declutterExecutorGroup;
      if ((!replayGroup || replayGroup.isEmpty()) && (!declutterExecutorGroup || declutterExecutorGroup.isEmpty())) {
        return null;
      }
      var width = Math.round(frameState.size[0] * pixelRatio);
      var height = Math.round(frameState.size[1] * pixelRatio);
      if (canvas.width != width || canvas.height != height) {
        canvas.width = width;
        canvas.height = height;
        if (canvas.style.transform !== canvasTransform) {
          canvas.style.transform = canvasTransform;
        }
      } else if (!this.containerReused) {
        context.clearRect(0, 0, width, height);
      }
      this.preRender(context, frameState);
      var viewState = frameState.viewState;
      viewState.projection;
      var clipped = false;
      var render2 = true;
      if (layerState.extent && this.clipping) {
        var layerExtent = fromUserExtent(layerState.extent);
        render2 = intersects$1(layerExtent, frameState.extent);
        clipped = render2 && !containsExtent(layerExtent, frameState.extent);
        if (clipped) {
          this.clipUnrotated(context, frameState, layerExtent);
        }
      }
      if (render2) {
        this.renderWorlds(replayGroup, frameState);
      }
      if (clipped) {
        context.restore();
      }
      this.postRender(context, frameState);
      var opacity = cssOpacity(layerState.opacity);
      var container = this.container;
      if (opacity !== container.style.opacity) {
        container.style.opacity = opacity;
      }
      if (this.renderedRotation_ !== viewState.rotation) {
        this.renderedRotation_ = viewState.rotation;
        this.hitDetectionImageData_ = null;
      }
      return this.container;
    };
    CanvasVectorLayerRenderer2.prototype.getFeatures = function(pixel) {
      return new Promise(function(resolve) {
        if (!this.hitDetectionImageData_ && !this.animatingOrInteracting_) {
          var size = [this.context.canvas.width, this.context.canvas.height];
          apply(this.pixelTransform, size);
          var center = this.renderedCenter_;
          var resolution = this.renderedResolution_;
          var rotation = this.renderedRotation_;
          var projection = this.renderedProjection_;
          var extent = this.wrappedRenderedExtent_;
          var layer = this.getLayer();
          var transforms2 = [];
          var width = size[0] * HIT_DETECT_RESOLUTION;
          var height = size[1] * HIT_DETECT_RESOLUTION;
          transforms2.push(this.getRenderTransform(center, resolution, rotation, HIT_DETECT_RESOLUTION, width, height, 0).slice());
          var source = layer.getSource();
          var projectionExtent = projection.getExtent();
          if (source.getWrapX() && projection.canWrapX() && !containsExtent(projectionExtent, extent)) {
            var startX = extent[0];
            var worldWidth = getWidth(projectionExtent);
            var world = 0;
            var offsetX = void 0;
            while (startX < projectionExtent[0]) {
              --world;
              offsetX = worldWidth * world;
              transforms2.push(this.getRenderTransform(center, resolution, rotation, HIT_DETECT_RESOLUTION, width, height, offsetX).slice());
              startX += worldWidth;
            }
            world = 0;
            startX = extent[2];
            while (startX > projectionExtent[2]) {
              ++world;
              offsetX = worldWidth * world;
              transforms2.push(this.getRenderTransform(center, resolution, rotation, HIT_DETECT_RESOLUTION, width, height, offsetX).slice());
              startX -= worldWidth;
            }
          }
          this.hitDetectionImageData_ = createHitDetectionImageData(size, transforms2, this.renderedFeatures_, layer.getStyleFunction(), extent, resolution, rotation);
        }
        resolve(hitDetect(pixel, this.renderedFeatures_, this.hitDetectionImageData_));
      }.bind(this));
    };
    CanvasVectorLayerRenderer2.prototype.forEachFeatureAtCoordinate = function(coordinate, frameState, hitTolerance, callback, matches) {
      var _this = this;
      if (!this.replayGroup_) {
        return void 0;
      }
      var resolution = frameState.viewState.resolution;
      var rotation = frameState.viewState.rotation;
      var layer = this.getLayer();
      var features = {};
      var featureCallback = function(feature, geometry, distanceSq) {
        var key = getUid(feature);
        var match = features[key];
        if (!match) {
          if (distanceSq === 0) {
            features[key] = true;
            return callback(feature, layer, geometry);
          }
          matches.push(features[key] = {
            feature,
            layer,
            geometry,
            distanceSq,
            callback
          });
        } else if (match !== true && distanceSq < match.distanceSq) {
          if (distanceSq === 0) {
            features[key] = true;
            matches.splice(matches.lastIndexOf(match), 1);
            return callback(feature, layer, geometry);
          }
          match.geometry = geometry;
          match.distanceSq = distanceSq;
        }
        return void 0;
      };
      var result;
      var executorGroups = [this.replayGroup_];
      if (this.declutterExecutorGroup) {
        executorGroups.push(this.declutterExecutorGroup);
      }
      executorGroups.some(function(executorGroup) {
        return result = executorGroup.forEachFeatureAtCoordinate(coordinate, resolution, rotation, hitTolerance, featureCallback, executorGroup === _this.declutterExecutorGroup ? frameState.declutterTree.all().map(function(item) {
          return item.value;
        }) : null);
      });
      return result;
    };
    CanvasVectorLayerRenderer2.prototype.handleFontsChanged = function() {
      var layer = this.getLayer();
      if (layer.getVisible() && this.replayGroup_) {
        layer.changed();
      }
    };
    CanvasVectorLayerRenderer2.prototype.handleStyleImageChange_ = function(event) {
      this.renderIfReadyAndVisible();
    };
    CanvasVectorLayerRenderer2.prototype.prepareFrame = function(frameState) {
      var vectorLayer = this.getLayer();
      var vectorSource = vectorLayer.getSource();
      if (!vectorSource) {
        return false;
      }
      var animating = frameState.viewHints[ViewHint.ANIMATING];
      var interacting = frameState.viewHints[ViewHint.INTERACTING];
      var updateWhileAnimating = vectorLayer.getUpdateWhileAnimating();
      var updateWhileInteracting = vectorLayer.getUpdateWhileInteracting();
      if (!this.dirty_ && !updateWhileAnimating && animating || !updateWhileInteracting && interacting) {
        this.animatingOrInteracting_ = true;
        return true;
      }
      this.animatingOrInteracting_ = false;
      var frameStateExtent = frameState.extent;
      var viewState = frameState.viewState;
      var projection = viewState.projection;
      var resolution = viewState.resolution;
      var pixelRatio = frameState.pixelRatio;
      var vectorLayerRevision = vectorLayer.getRevision();
      var vectorLayerRenderBuffer = vectorLayer.getRenderBuffer();
      var vectorLayerRenderOrder = vectorLayer.getRenderOrder();
      if (vectorLayerRenderOrder === void 0) {
        vectorLayerRenderOrder = defaultOrder;
      }
      var center = viewState.center.slice();
      var extent = buffer(frameStateExtent, vectorLayerRenderBuffer * resolution);
      var renderedExtent = extent.slice();
      var loadExtents = [extent.slice()];
      var projectionExtent = projection.getExtent();
      if (vectorSource.getWrapX() && projection.canWrapX() && !containsExtent(projectionExtent, frameState.extent)) {
        var worldWidth = getWidth(projectionExtent);
        var gutter = Math.max(getWidth(extent) / 2, worldWidth);
        extent[0] = projectionExtent[0] - gutter;
        extent[2] = projectionExtent[2] + gutter;
        wrapX$1(center, projection);
        var loadExtent = wrapX$2(loadExtents[0], projection);
        if (loadExtent[0] < projectionExtent[0] && loadExtent[2] < projectionExtent[2]) {
          loadExtents.push([
            loadExtent[0] + worldWidth,
            loadExtent[1],
            loadExtent[2] + worldWidth,
            loadExtent[3]
          ]);
        } else if (loadExtent[0] > projectionExtent[0] && loadExtent[2] > projectionExtent[2]) {
          loadExtents.push([
            loadExtent[0] - worldWidth,
            loadExtent[1],
            loadExtent[2] - worldWidth,
            loadExtent[3]
          ]);
        }
      }
      if (!this.dirty_ && this.renderedResolution_ == resolution && this.renderedRevision_ == vectorLayerRevision && this.renderedRenderOrder_ == vectorLayerRenderOrder && containsExtent(this.wrappedRenderedExtent_, extent)) {
        if (!equals$2(this.renderedExtent_, renderedExtent)) {
          this.hitDetectionImageData_ = null;
          this.renderedExtent_ = renderedExtent;
        }
        this.renderedCenter_ = center;
        this.replayGroupChanged = false;
        return true;
      }
      this.replayGroup_ = null;
      this.dirty_ = false;
      var replayGroup = new CanvasBuilderGroup(getTolerance(resolution, pixelRatio), extent, resolution, pixelRatio);
      var declutterBuilderGroup;
      if (this.getLayer().getDeclutter()) {
        declutterBuilderGroup = new CanvasBuilderGroup(getTolerance(resolution, pixelRatio), extent, resolution, pixelRatio);
      }
      var userTransform;
      var i, ii;
      {
        for (var i = 0, ii = loadExtents.length; i < ii; ++i) {
          vectorSource.loadFeatures(loadExtents[i], resolution, projection);
        }
      }
      var squaredTolerance = getSquaredTolerance(resolution, pixelRatio);
      var render2 = function(feature) {
        var styles;
        var styleFunction = feature.getStyleFunction() || vectorLayer.getStyleFunction();
        if (styleFunction) {
          styles = styleFunction(feature, resolution);
        }
        if (styles) {
          var dirty = this.renderFeature(feature, squaredTolerance, styles, replayGroup, userTransform, declutterBuilderGroup);
          this.dirty_ = this.dirty_ || dirty;
        }
      }.bind(this);
      var userExtent = toUserExtent(extent);
      var features = vectorSource.getFeaturesInExtent(userExtent);
      if (vectorLayerRenderOrder) {
        features.sort(vectorLayerRenderOrder);
      }
      for (var i = 0, ii = features.length; i < ii; ++i) {
        render2(features[i]);
      }
      this.renderedFeatures_ = features;
      var replayGroupInstructions = replayGroup.finish();
      var executorGroup = new ExecutorGroup$1(extent, resolution, pixelRatio, vectorSource.getOverlaps(), replayGroupInstructions, vectorLayer.getRenderBuffer());
      if (declutterBuilderGroup) {
        this.declutterExecutorGroup = new ExecutorGroup$1(extent, resolution, pixelRatio, vectorSource.getOverlaps(), declutterBuilderGroup.finish(), vectorLayer.getRenderBuffer());
      }
      this.renderedResolution_ = resolution;
      this.renderedRevision_ = vectorLayerRevision;
      this.renderedRenderOrder_ = vectorLayerRenderOrder;
      this.renderedExtent_ = renderedExtent;
      this.wrappedRenderedExtent_ = extent;
      this.renderedCenter_ = center;
      this.renderedProjection_ = projection;
      this.replayGroup_ = executorGroup;
      this.hitDetectionImageData_ = null;
      this.replayGroupChanged = true;
      return true;
    };
    CanvasVectorLayerRenderer2.prototype.renderFeature = function(feature, squaredTolerance, styles, builderGroup, opt_transform, opt_declutterBuilderGroup) {
      if (!styles) {
        return false;
      }
      var loading = false;
      if (Array.isArray(styles)) {
        for (var i = 0, ii = styles.length; i < ii; ++i) {
          loading = renderFeature(builderGroup, feature, styles[i], squaredTolerance, this.boundHandleStyleImageChange_, opt_transform, opt_declutterBuilderGroup) || loading;
        }
      } else {
        loading = renderFeature(builderGroup, feature, styles, squaredTolerance, this.boundHandleStyleImageChange_, opt_transform, opt_declutterBuilderGroup);
      }
      return loading;
    };
    return CanvasVectorLayerRenderer2;
  }(CanvasLayerRenderer$1);
  var CanvasVectorLayerRenderer$1 = CanvasVectorLayerRenderer;
  var __extends$G = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var VectorLayer = function(_super) {
    __extends$G(VectorLayer2, _super);
    function VectorLayer2(opt_options) {
      return _super.call(this, opt_options) || this;
    }
    VectorLayer2.prototype.createRenderer = function() {
      return new CanvasVectorLayerRenderer$1(this);
    };
    return VectorLayer2;
  }(BaseVectorLayer$1);
  var VectorLayer$1 = VectorLayer;
  var RBush = function() {
    function RBush2(opt_maxEntries) {
      this.rbush_ = new RBush$2(opt_maxEntries);
      this.items_ = {};
    }
    RBush2.prototype.insert = function(extent, value) {
      var item = {
        minX: extent[0],
        minY: extent[1],
        maxX: extent[2],
        maxY: extent[3],
        value
      };
      this.rbush_.insert(item);
      this.items_[getUid(value)] = item;
    };
    RBush2.prototype.load = function(extents, values) {
      var items = new Array(values.length);
      for (var i = 0, l = values.length; i < l; i++) {
        var extent = extents[i];
        var value = values[i];
        var item = {
          minX: extent[0],
          minY: extent[1],
          maxX: extent[2],
          maxY: extent[3],
          value
        };
        items[i] = item;
        this.items_[getUid(value)] = item;
      }
      this.rbush_.load(items);
    };
    RBush2.prototype.remove = function(value) {
      var uid = getUid(value);
      var item = this.items_[uid];
      delete this.items_[uid];
      return this.rbush_.remove(item) !== null;
    };
    RBush2.prototype.update = function(extent, value) {
      var item = this.items_[getUid(value)];
      var bbox = [item.minX, item.minY, item.maxX, item.maxY];
      if (!equals$1(bbox, extent)) {
        this.remove(value);
        this.insert(extent, value);
      }
    };
    RBush2.prototype.getAll = function() {
      var items = this.rbush_.all();
      return items.map(function(item) {
        return item.value;
      });
    };
    RBush2.prototype.getInExtent = function(extent) {
      var bbox = {
        minX: extent[0],
        minY: extent[1],
        maxX: extent[2],
        maxY: extent[3]
      };
      var items = this.rbush_.search(bbox);
      return items.map(function(item) {
        return item.value;
      });
    };
    RBush2.prototype.forEach = function(callback) {
      return this.forEach_(this.getAll(), callback);
    };
    RBush2.prototype.forEachInExtent = function(extent, callback) {
      return this.forEach_(this.getInExtent(extent), callback);
    };
    RBush2.prototype.forEach_ = function(values, callback) {
      var result;
      for (var i = 0, l = values.length; i < l; i++) {
        result = callback(values[i]);
        if (result) {
          return result;
        }
      }
      return result;
    };
    RBush2.prototype.isEmpty = function() {
      return isEmpty$1(this.items_);
    };
    RBush2.prototype.clear = function() {
      this.rbush_.clear();
      this.items_ = {};
    };
    RBush2.prototype.getExtent = function(opt_extent) {
      var data = this.rbush_.toJSON();
      return createOrUpdate$2(data.minX, data.minY, data.maxX, data.maxY, opt_extent);
    };
    RBush2.prototype.concat = function(rbush) {
      this.rbush_.load(rbush.rbush_.all());
      for (var i in rbush.items_) {
        this.items_[i] = rbush.items_[i];
      }
    };
    return RBush2;
  }();
  var RBush$1 = RBush;
  var __extends$F = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Source = function(_super) {
    __extends$F(Source2, _super);
    function Source2(options) {
      var _this = _super.call(this) || this;
      _this.projection = get$1(options.projection);
      _this.attributions_ = adaptAttributions(options.attributions);
      _this.attributionsCollapsible_ = options.attributionsCollapsible !== void 0 ? options.attributionsCollapsible : true;
      _this.loading = false;
      _this.state_ = options.state !== void 0 ? options.state : SourceState.READY;
      _this.wrapX_ = options.wrapX !== void 0 ? options.wrapX : false;
      _this.viewResolver = null;
      _this.viewRejector = null;
      var self2 = _this;
      _this.viewPromise_ = new Promise(function(resolve, reject) {
        self2.viewResolver = resolve;
        self2.viewRejector = reject;
      });
      return _this;
    }
    Source2.prototype.getAttributions = function() {
      return this.attributions_;
    };
    Source2.prototype.getAttributionsCollapsible = function() {
      return this.attributionsCollapsible_;
    };
    Source2.prototype.getProjection = function() {
      return this.projection;
    };
    Source2.prototype.getResolutions = function() {
      return abstract();
    };
    Source2.prototype.getView = function() {
      return this.viewPromise_;
    };
    Source2.prototype.getState = function() {
      return this.state_;
    };
    Source2.prototype.getWrapX = function() {
      return this.wrapX_;
    };
    Source2.prototype.getContextOptions = function() {
      return void 0;
    };
    Source2.prototype.refresh = function() {
      this.changed();
    };
    Source2.prototype.setAttributions = function(attributions) {
      this.attributions_ = adaptAttributions(attributions);
      this.changed();
    };
    Source2.prototype.setState = function(state) {
      this.state_ = state;
      this.changed();
    };
    return Source2;
  }(BaseObject$1);
  function adaptAttributions(attributionLike) {
    if (!attributionLike) {
      return null;
    }
    if (Array.isArray(attributionLike)) {
      return function(frameState) {
        return attributionLike;
      };
    }
    if (typeof attributionLike === "function") {
      return attributionLike;
    }
    return function(frameState) {
      return [attributionLike];
    };
  }
  var Source$1 = Source;
  var VectorEventType = {
    ADDFEATURE: "addfeature",
    CHANGEFEATURE: "changefeature",
    CLEAR: "clear",
    REMOVEFEATURE: "removefeature",
    FEATURESLOADSTART: "featuresloadstart",
    FEATURESLOADEND: "featuresloadend",
    FEATURESLOADERROR: "featuresloaderror"
  };
  function all$1(extent, resolution) {
    return [[-Infinity, -Infinity, Infinity, Infinity]];
  }
  var FormatType = {
    ARRAY_BUFFER: "arraybuffer",
    JSON: "json",
    TEXT: "text",
    XML: "xml"
  };
  var withCredentials = false;
  function loadFeaturesXhr(url, format, extent, resolution, projection, success, failure) {
    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", typeof url === "function" ? url(extent, resolution, projection) : url, true);
    if (format.getType() == FormatType.ARRAY_BUFFER) {
      xhr2.responseType = "arraybuffer";
    }
    xhr2.withCredentials = withCredentials;
    xhr2.onload = function(event) {
      if (!xhr2.status || xhr2.status >= 200 && xhr2.status < 300) {
        var type = format.getType();
        var source = void 0;
        if (type == FormatType.JSON || type == FormatType.TEXT) {
          source = xhr2.responseText;
        } else if (type == FormatType.XML) {
          source = xhr2.responseXML;
          if (!source) {
            source = new DOMParser().parseFromString(xhr2.responseText, "application/xml");
          }
        } else if (type == FormatType.ARRAY_BUFFER) {
          source = xhr2.response;
        }
        if (source) {
          success(format.readFeatures(source, {
            extent,
            featureProjection: projection
          }), format.readProjection(source));
        } else {
          failure();
        }
      } else {
        failure();
      }
    };
    xhr2.onerror = failure;
    xhr2.send();
  }
  function xhr(url, format) {
    return function(extent, resolution, projection, success, failure) {
      var source = this;
      loadFeaturesXhr(url, format, extent, resolution, projection, function(features, dataProjection) {
        source.addFeatures(features);
        if (success !== void 0) {
          success(features);
        }
      }, failure ? failure : VOID);
    };
  }
  var __extends$E = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var VectorSourceEvent = function(_super) {
    __extends$E(VectorSourceEvent2, _super);
    function VectorSourceEvent2(type, opt_feature, opt_features) {
      var _this = _super.call(this, type) || this;
      _this.feature = opt_feature;
      _this.features = opt_features;
      return _this;
    }
    return VectorSourceEvent2;
  }(Event);
  var VectorSource = function(_super) {
    __extends$E(VectorSource2, _super);
    function VectorSource2(opt_options) {
      var _this = this;
      var options = opt_options || {};
      _this = _super.call(this, {
        attributions: options.attributions,
        projection: void 0,
        state: SourceState.READY,
        wrapX: options.wrapX !== void 0 ? options.wrapX : true
      }) || this;
      _this.on;
      _this.once;
      _this.un;
      _this.loader_ = VOID;
      _this.format_ = options.format;
      _this.overlaps_ = options.overlaps === void 0 ? true : options.overlaps;
      _this.url_ = options.url;
      if (options.loader !== void 0) {
        _this.loader_ = options.loader;
      } else if (_this.url_ !== void 0) {
        assert(_this.format_, 7);
        _this.loader_ = xhr(_this.url_, _this.format_);
      }
      _this.strategy_ = options.strategy !== void 0 ? options.strategy : all$1;
      var useSpatialIndex = options.useSpatialIndex !== void 0 ? options.useSpatialIndex : true;
      _this.featuresRtree_ = useSpatialIndex ? new RBush$1() : null;
      _this.loadedExtentsRtree_ = new RBush$1();
      _this.loadingExtentsCount_ = 0;
      _this.nullGeometryFeatures_ = {};
      _this.idIndex_ = {};
      _this.uidIndex_ = {};
      _this.featureChangeKeys_ = {};
      _this.featuresCollection_ = null;
      var collection, features;
      if (Array.isArray(options.features)) {
        features = options.features;
      } else if (options.features) {
        collection = options.features;
        features = collection.getArray();
      }
      if (!useSpatialIndex && collection === void 0) {
        collection = new Collection$1(features);
      }
      if (features !== void 0) {
        _this.addFeaturesInternal(features);
      }
      if (collection !== void 0) {
        _this.bindFeaturesCollection_(collection);
      }
      return _this;
    }
    VectorSource2.prototype.addFeature = function(feature) {
      this.addFeatureInternal(feature);
      this.changed();
    };
    VectorSource2.prototype.addFeatureInternal = function(feature) {
      var featureKey = getUid(feature);
      if (!this.addToIndex_(featureKey, feature)) {
        if (this.featuresCollection_) {
          this.featuresCollection_.remove(feature);
        }
        return;
      }
      this.setupChangeEvents_(featureKey, feature);
      var geometry = feature.getGeometry();
      if (geometry) {
        var extent = geometry.getExtent();
        if (this.featuresRtree_) {
          this.featuresRtree_.insert(extent, feature);
        }
      } else {
        this.nullGeometryFeatures_[featureKey] = feature;
      }
      this.dispatchEvent(new VectorSourceEvent(VectorEventType.ADDFEATURE, feature));
    };
    VectorSource2.prototype.setupChangeEvents_ = function(featureKey, feature) {
      this.featureChangeKeys_[featureKey] = [
        listen(feature, EventType.CHANGE, this.handleFeatureChange_, this),
        listen(feature, ObjectEventType.PROPERTYCHANGE, this.handleFeatureChange_, this)
      ];
    };
    VectorSource2.prototype.addToIndex_ = function(featureKey, feature) {
      var valid = true;
      var id = feature.getId();
      if (id !== void 0) {
        if (!(id.toString() in this.idIndex_)) {
          this.idIndex_[id.toString()] = feature;
        } else {
          valid = false;
        }
      }
      if (valid) {
        assert(!(featureKey in this.uidIndex_), 30);
        this.uidIndex_[featureKey] = feature;
      }
      return valid;
    };
    VectorSource2.prototype.addFeatures = function(features) {
      this.addFeaturesInternal(features);
      this.changed();
    };
    VectorSource2.prototype.addFeaturesInternal = function(features) {
      var extents = [];
      var newFeatures = [];
      var geometryFeatures = [];
      for (var i = 0, length_1 = features.length; i < length_1; i++) {
        var feature = features[i];
        var featureKey = getUid(feature);
        if (this.addToIndex_(featureKey, feature)) {
          newFeatures.push(feature);
        }
      }
      for (var i = 0, length_2 = newFeatures.length; i < length_2; i++) {
        var feature = newFeatures[i];
        var featureKey = getUid(feature);
        this.setupChangeEvents_(featureKey, feature);
        var geometry = feature.getGeometry();
        if (geometry) {
          var extent = geometry.getExtent();
          extents.push(extent);
          geometryFeatures.push(feature);
        } else {
          this.nullGeometryFeatures_[featureKey] = feature;
        }
      }
      if (this.featuresRtree_) {
        this.featuresRtree_.load(extents, geometryFeatures);
      }
      for (var i = 0, length_3 = newFeatures.length; i < length_3; i++) {
        this.dispatchEvent(new VectorSourceEvent(VectorEventType.ADDFEATURE, newFeatures[i]));
      }
    };
    VectorSource2.prototype.bindFeaturesCollection_ = function(collection) {
      var modifyingCollection = false;
      this.addEventListener(VectorEventType.ADDFEATURE, function(evt) {
        if (!modifyingCollection) {
          modifyingCollection = true;
          collection.push(evt.feature);
          modifyingCollection = false;
        }
      });
      this.addEventListener(VectorEventType.REMOVEFEATURE, function(evt) {
        if (!modifyingCollection) {
          modifyingCollection = true;
          collection.remove(evt.feature);
          modifyingCollection = false;
        }
      });
      collection.addEventListener(CollectionEventType.ADD, function(evt) {
        if (!modifyingCollection) {
          modifyingCollection = true;
          this.addFeature(evt.element);
          modifyingCollection = false;
        }
      }.bind(this));
      collection.addEventListener(CollectionEventType.REMOVE, function(evt) {
        if (!modifyingCollection) {
          modifyingCollection = true;
          this.removeFeature(evt.element);
          modifyingCollection = false;
        }
      }.bind(this));
      this.featuresCollection_ = collection;
    };
    VectorSource2.prototype.clear = function(opt_fast) {
      if (opt_fast) {
        for (var featureId in this.featureChangeKeys_) {
          var keys = this.featureChangeKeys_[featureId];
          keys.forEach(unlistenByKey);
        }
        if (!this.featuresCollection_) {
          this.featureChangeKeys_ = {};
          this.idIndex_ = {};
          this.uidIndex_ = {};
        }
      } else {
        if (this.featuresRtree_) {
          this.featuresRtree_.forEach(this.removeFeatureInternal.bind(this));
          for (var id in this.nullGeometryFeatures_) {
            this.removeFeatureInternal(this.nullGeometryFeatures_[id]);
          }
        }
      }
      if (this.featuresCollection_) {
        this.featuresCollection_.clear();
      }
      if (this.featuresRtree_) {
        this.featuresRtree_.clear();
      }
      this.nullGeometryFeatures_ = {};
      var clearEvent = new VectorSourceEvent(VectorEventType.CLEAR);
      this.dispatchEvent(clearEvent);
      this.changed();
    };
    VectorSource2.prototype.forEachFeature = function(callback) {
      if (this.featuresRtree_) {
        return this.featuresRtree_.forEach(callback);
      } else if (this.featuresCollection_) {
        this.featuresCollection_.forEach(callback);
      }
    };
    VectorSource2.prototype.forEachFeatureAtCoordinateDirect = function(coordinate, callback) {
      var extent = [coordinate[0], coordinate[1], coordinate[0], coordinate[1]];
      return this.forEachFeatureInExtent(extent, function(feature) {
        var geometry = feature.getGeometry();
        if (geometry.intersectsCoordinate(coordinate)) {
          return callback(feature);
        } else {
          return void 0;
        }
      });
    };
    VectorSource2.prototype.forEachFeatureInExtent = function(extent, callback) {
      if (this.featuresRtree_) {
        return this.featuresRtree_.forEachInExtent(extent, callback);
      } else if (this.featuresCollection_) {
        this.featuresCollection_.forEach(callback);
      }
    };
    VectorSource2.prototype.forEachFeatureIntersectingExtent = function(extent, callback) {
      return this.forEachFeatureInExtent(extent, function(feature) {
        var geometry = feature.getGeometry();
        if (geometry.intersectsExtent(extent)) {
          var result = callback(feature);
          if (result) {
            return result;
          }
        }
      });
    };
    VectorSource2.prototype.getFeaturesCollection = function() {
      return this.featuresCollection_;
    };
    VectorSource2.prototype.getFeatures = function() {
      var features;
      if (this.featuresCollection_) {
        features = this.featuresCollection_.getArray().slice(0);
      } else if (this.featuresRtree_) {
        features = this.featuresRtree_.getAll();
        if (!isEmpty$1(this.nullGeometryFeatures_)) {
          extend$2(features, getValues(this.nullGeometryFeatures_));
        }
      }
      return features;
    };
    VectorSource2.prototype.getFeaturesAtCoordinate = function(coordinate) {
      var features = [];
      this.forEachFeatureAtCoordinateDirect(coordinate, function(feature) {
        features.push(feature);
      });
      return features;
    };
    VectorSource2.prototype.getFeaturesInExtent = function(extent) {
      if (this.featuresRtree_) {
        return this.featuresRtree_.getInExtent(extent);
      } else if (this.featuresCollection_) {
        return this.featuresCollection_.getArray().slice(0);
      } else {
        return [];
      }
    };
    VectorSource2.prototype.getClosestFeatureToCoordinate = function(coordinate, opt_filter) {
      var x = coordinate[0];
      var y = coordinate[1];
      var closestFeature = null;
      var closestPoint = [NaN, NaN];
      var minSquaredDistance = Infinity;
      var extent = [-Infinity, -Infinity, Infinity, Infinity];
      var filter = opt_filter ? opt_filter : TRUE;
      this.featuresRtree_.forEachInExtent(extent, function(feature) {
        if (filter(feature)) {
          var geometry = feature.getGeometry();
          var previousMinSquaredDistance = minSquaredDistance;
          minSquaredDistance = geometry.closestPointXY(x, y, closestPoint, minSquaredDistance);
          if (minSquaredDistance < previousMinSquaredDistance) {
            closestFeature = feature;
            var minDistance = Math.sqrt(minSquaredDistance);
            extent[0] = x - minDistance;
            extent[1] = y - minDistance;
            extent[2] = x + minDistance;
            extent[3] = y + minDistance;
          }
        }
      });
      return closestFeature;
    };
    VectorSource2.prototype.getExtent = function(opt_extent) {
      return this.featuresRtree_.getExtent(opt_extent);
    };
    VectorSource2.prototype.getFeatureById = function(id) {
      var feature = this.idIndex_[id.toString()];
      return feature !== void 0 ? feature : null;
    };
    VectorSource2.prototype.getFeatureByUid = function(uid) {
      var feature = this.uidIndex_[uid];
      return feature !== void 0 ? feature : null;
    };
    VectorSource2.prototype.getFormat = function() {
      return this.format_;
    };
    VectorSource2.prototype.getOverlaps = function() {
      return this.overlaps_;
    };
    VectorSource2.prototype.getUrl = function() {
      return this.url_;
    };
    VectorSource2.prototype.handleFeatureChange_ = function(event) {
      var feature = event.target;
      var featureKey = getUid(feature);
      var geometry = feature.getGeometry();
      if (!geometry) {
        if (!(featureKey in this.nullGeometryFeatures_)) {
          if (this.featuresRtree_) {
            this.featuresRtree_.remove(feature);
          }
          this.nullGeometryFeatures_[featureKey] = feature;
        }
      } else {
        var extent = geometry.getExtent();
        if (featureKey in this.nullGeometryFeatures_) {
          delete this.nullGeometryFeatures_[featureKey];
          if (this.featuresRtree_) {
            this.featuresRtree_.insert(extent, feature);
          }
        } else {
          if (this.featuresRtree_) {
            this.featuresRtree_.update(extent, feature);
          }
        }
      }
      var id = feature.getId();
      if (id !== void 0) {
        var sid = id.toString();
        if (this.idIndex_[sid] !== feature) {
          this.removeFromIdIndex_(feature);
          this.idIndex_[sid] = feature;
        }
      } else {
        this.removeFromIdIndex_(feature);
        this.uidIndex_[featureKey] = feature;
      }
      this.changed();
      this.dispatchEvent(new VectorSourceEvent(VectorEventType.CHANGEFEATURE, feature));
    };
    VectorSource2.prototype.hasFeature = function(feature) {
      var id = feature.getId();
      if (id !== void 0) {
        return id in this.idIndex_;
      } else {
        return getUid(feature) in this.uidIndex_;
      }
    };
    VectorSource2.prototype.isEmpty = function() {
      return this.featuresRtree_.isEmpty() && isEmpty$1(this.nullGeometryFeatures_);
    };
    VectorSource2.prototype.loadFeatures = function(extent, resolution, projection) {
      var loadedExtentsRtree = this.loadedExtentsRtree_;
      var extentsToLoad = this.strategy_(extent, resolution, projection);
      var _loop_1 = function(i2, ii2) {
        var extentToLoad = extentsToLoad[i2];
        var alreadyLoaded = loadedExtentsRtree.forEachInExtent(extentToLoad, function(object) {
          return containsExtent(object.extent, extentToLoad);
        });
        if (!alreadyLoaded) {
          ++this_1.loadingExtentsCount_;
          this_1.dispatchEvent(new VectorSourceEvent(VectorEventType.FEATURESLOADSTART));
          this_1.loader_.call(this_1, extentToLoad, resolution, projection, function(features) {
            --this.loadingExtentsCount_;
            this.dispatchEvent(new VectorSourceEvent(VectorEventType.FEATURESLOADEND, void 0, features));
          }.bind(this_1), function() {
            --this.loadingExtentsCount_;
            this.dispatchEvent(new VectorSourceEvent(VectorEventType.FEATURESLOADERROR));
          }.bind(this_1));
          loadedExtentsRtree.insert(extentToLoad, { extent: extentToLoad.slice() });
        }
      };
      var this_1 = this;
      for (var i = 0, ii = extentsToLoad.length; i < ii; ++i) {
        _loop_1(i);
      }
      this.loading = this.loader_.length < 4 ? false : this.loadingExtentsCount_ > 0;
    };
    VectorSource2.prototype.refresh = function() {
      this.clear(true);
      this.loadedExtentsRtree_.clear();
      _super.prototype.refresh.call(this);
    };
    VectorSource2.prototype.removeLoadedExtent = function(extent) {
      var loadedExtentsRtree = this.loadedExtentsRtree_;
      var obj;
      loadedExtentsRtree.forEachInExtent(extent, function(object) {
        if (equals$1(object.extent, extent)) {
          obj = object;
          return true;
        }
      });
      if (obj) {
        loadedExtentsRtree.remove(obj);
      }
    };
    VectorSource2.prototype.removeFeature = function(feature) {
      var featureKey = getUid(feature);
      if (featureKey in this.nullGeometryFeatures_) {
        delete this.nullGeometryFeatures_[featureKey];
      } else {
        if (this.featuresRtree_) {
          this.featuresRtree_.remove(feature);
        }
      }
      this.removeFeatureInternal(feature);
      this.changed();
    };
    VectorSource2.prototype.removeFeatureInternal = function(feature) {
      var featureKey = getUid(feature);
      this.featureChangeKeys_[featureKey].forEach(unlistenByKey);
      delete this.featureChangeKeys_[featureKey];
      var id = feature.getId();
      if (id !== void 0) {
        delete this.idIndex_[id.toString()];
      }
      delete this.uidIndex_[featureKey];
      this.dispatchEvent(new VectorSourceEvent(VectorEventType.REMOVEFEATURE, feature));
    };
    VectorSource2.prototype.removeFromIdIndex_ = function(feature) {
      var removed = false;
      for (var id in this.idIndex_) {
        if (this.idIndex_[id] === feature) {
          delete this.idIndex_[id];
          removed = true;
          break;
        }
      }
      return removed;
    };
    VectorSource2.prototype.setLoader = function(loader) {
      this.loader_ = loader;
    };
    VectorSource2.prototype.setUrl = function(url) {
      assert(this.format_, 7);
      this.url_ = url;
      this.setLoader(xhr(url, this.format_));
    };
    return VectorSource2;
  }(Source$1);
  var Vector = VectorSource;
  var TileState = {
    IDLE: 0,
    LOADING: 1,
    LOADED: 2,
    ERROR: 3,
    EMPTY: 4
  };
  function easeIn(t) {
    return Math.pow(t, 3);
  }
  function easeOut(t) {
    return 1 - easeIn(1 - t);
  }
  function inAndOut(t) {
    return 3 * t * t - 2 * t * t * t;
  }
  function linear(t) {
    return t;
  }
  var __extends$D = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Tile = function(_super) {
    __extends$D(Tile2, _super);
    function Tile2(tileCoord, state, opt_options) {
      var _this = _super.call(this) || this;
      var options = opt_options ? opt_options : {};
      _this.tileCoord = tileCoord;
      _this.state = state;
      _this.interimTile = null;
      _this.key = "";
      _this.transition_ = options.transition === void 0 ? 250 : options.transition;
      _this.transitionStarts_ = {};
      return _this;
    }
    Tile2.prototype.changed = function() {
      this.dispatchEvent(EventType.CHANGE);
    };
    Tile2.prototype.release = function() {
    };
    Tile2.prototype.getKey = function() {
      return this.key + "/" + this.tileCoord;
    };
    Tile2.prototype.getInterimTile = function() {
      if (!this.interimTile) {
        return this;
      }
      var tile = this.interimTile;
      do {
        if (tile.getState() == TileState.LOADED) {
          this.transition_ = 0;
          return tile;
        }
        tile = tile.interimTile;
      } while (tile);
      return this;
    };
    Tile2.prototype.refreshInterimChain = function() {
      if (!this.interimTile) {
        return;
      }
      var tile = this.interimTile;
      var prev = this;
      do {
        if (tile.getState() == TileState.LOADED) {
          tile.interimTile = null;
          break;
        } else if (tile.getState() == TileState.LOADING) {
          prev = tile;
        } else if (tile.getState() == TileState.IDLE) {
          prev.interimTile = tile.interimTile;
        } else {
          prev = tile;
        }
        tile = prev.interimTile;
      } while (tile);
    };
    Tile2.prototype.getTileCoord = function() {
      return this.tileCoord;
    };
    Tile2.prototype.getState = function() {
      return this.state;
    };
    Tile2.prototype.setState = function(state) {
      if (this.state !== TileState.ERROR && this.state > state) {
        throw new Error("Tile load sequence violation");
      }
      this.state = state;
      this.changed();
    };
    Tile2.prototype.load = function() {
      abstract();
    };
    Tile2.prototype.getAlpha = function(id, time) {
      if (!this.transition_) {
        return 1;
      }
      var start = this.transitionStarts_[id];
      if (!start) {
        start = time;
        this.transitionStarts_[id] = start;
      } else if (start === -1) {
        return 1;
      }
      var delta = time - start + 1e3 / 60;
      if (delta >= this.transition_) {
        return 1;
      }
      return easeIn(delta / this.transition_);
    };
    Tile2.prototype.inTransition = function(id) {
      if (!this.transition_) {
        return false;
      }
      return this.transitionStarts_[id] !== -1;
    };
    Tile2.prototype.endTransition = function(id) {
      if (this.transition_) {
        this.transitionStarts_[id] = -1;
      }
    };
    return Tile2;
  }(Target$1);
  var Tile$1 = Tile;
  var __extends$C = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var ImageTile = function(_super) {
    __extends$C(ImageTile2, _super);
    function ImageTile2(tileCoord, state, src, crossOrigin, tileLoadFunction, opt_options) {
      var _this = _super.call(this, tileCoord, state, opt_options) || this;
      _this.crossOrigin_ = crossOrigin;
      _this.src_ = src;
      _this.key = src;
      _this.image_ = new Image();
      if (crossOrigin !== null) {
        _this.image_.crossOrigin = crossOrigin;
      }
      _this.unlisten_ = null;
      _this.tileLoadFunction_ = tileLoadFunction;
      return _this;
    }
    ImageTile2.prototype.getImage = function() {
      return this.image_;
    };
    ImageTile2.prototype.setImage = function(element) {
      this.image_ = element;
      this.state = TileState.LOADED;
      this.unlistenImage_();
      this.changed();
    };
    ImageTile2.prototype.handleImageError_ = function() {
      this.state = TileState.ERROR;
      this.unlistenImage_();
      this.image_ = getBlankImage();
      this.changed();
    };
    ImageTile2.prototype.handleImageLoad_ = function() {
      var image = this.image_;
      if (image.naturalWidth && image.naturalHeight) {
        this.state = TileState.LOADED;
      } else {
        this.state = TileState.EMPTY;
      }
      this.unlistenImage_();
      this.changed();
    };
    ImageTile2.prototype.load = function() {
      if (this.state == TileState.ERROR) {
        this.state = TileState.IDLE;
        this.image_ = new Image();
        if (this.crossOrigin_ !== null) {
          this.image_.crossOrigin = this.crossOrigin_;
        }
      }
      if (this.state == TileState.IDLE) {
        this.state = TileState.LOADING;
        this.changed();
        this.tileLoadFunction_(this, this.src_);
        this.unlisten_ = listenImage(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
      }
    };
    ImageTile2.prototype.unlistenImage_ = function() {
      if (this.unlisten_) {
        this.unlisten_();
        this.unlisten_ = null;
      }
    };
    return ImageTile2;
  }(Tile$1);
  function getBlankImage() {
    var ctx = createCanvasContext2D(1, 1);
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, 1, 1);
    return ctx.canvas;
  }
  var ImageTile$1 = ImageTile;
  var Kinetic = function() {
    function Kinetic2(decay, minVelocity, delay) {
      this.decay_ = decay;
      this.minVelocity_ = minVelocity;
      this.delay_ = delay;
      this.points_ = [];
      this.angle_ = 0;
      this.initialVelocity_ = 0;
    }
    Kinetic2.prototype.begin = function() {
      this.points_.length = 0;
      this.angle_ = 0;
      this.initialVelocity_ = 0;
    };
    Kinetic2.prototype.update = function(x, y) {
      this.points_.push(x, y, Date.now());
    };
    Kinetic2.prototype.end = function() {
      if (this.points_.length < 6) {
        return false;
      }
      var delay = Date.now() - this.delay_;
      var lastIndex = this.points_.length - 3;
      if (this.points_[lastIndex + 2] < delay) {
        return false;
      }
      var firstIndex = lastIndex - 3;
      while (firstIndex > 0 && this.points_[firstIndex + 2] > delay) {
        firstIndex -= 3;
      }
      var duration = this.points_[lastIndex + 2] - this.points_[firstIndex + 2];
      if (duration < 1e3 / 60) {
        return false;
      }
      var dx = this.points_[lastIndex] - this.points_[firstIndex];
      var dy = this.points_[lastIndex + 1] - this.points_[firstIndex + 1];
      this.angle_ = Math.atan2(dy, dx);
      this.initialVelocity_ = Math.sqrt(dx * dx + dy * dy) / duration;
      return this.initialVelocity_ > this.minVelocity_;
    };
    Kinetic2.prototype.getDistance = function() {
      return (this.minVelocity_ - this.initialVelocity_) / this.decay_;
    };
    Kinetic2.prototype.getAngle = function() {
      return this.angle_;
    };
    return Kinetic2;
  }();
  var Kinetic$1 = Kinetic;
  var __extends$B = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var MapRenderer = function(_super) {
    __extends$B(MapRenderer2, _super);
    function MapRenderer2(map) {
      var _this = _super.call(this) || this;
      _this.map_ = map;
      return _this;
    }
    MapRenderer2.prototype.dispatchRenderEvent = function(type, frameState) {
      abstract();
    };
    MapRenderer2.prototype.calculateMatrices2D = function(frameState) {
      var viewState = frameState.viewState;
      var coordinateToPixelTransform = frameState.coordinateToPixelTransform;
      var pixelToCoordinateTransform = frameState.pixelToCoordinateTransform;
      compose(coordinateToPixelTransform, frameState.size[0] / 2, frameState.size[1] / 2, 1 / viewState.resolution, -1 / viewState.resolution, -viewState.rotation, -viewState.center[0], -viewState.center[1]);
      makeInverse(pixelToCoordinateTransform, coordinateToPixelTransform);
    };
    MapRenderer2.prototype.forEachFeatureAtCoordinate = function(coordinate, frameState, hitTolerance, checkWrapped, callback, thisArg, layerFilter, thisArg2) {
      var result;
      var viewState = frameState.viewState;
      function forEachFeatureAtCoordinate(managed, feature, layer2, geometry) {
        return callback.call(thisArg, feature, managed ? layer2 : null, geometry);
      }
      var projection = viewState.projection;
      var translatedCoordinate = wrapX$1(coordinate.slice(), projection);
      var offsets = [[0, 0]];
      if (projection.canWrapX() && checkWrapped) {
        var projectionExtent = projection.getExtent();
        var worldWidth = getWidth(projectionExtent);
        offsets.push([-worldWidth, 0], [worldWidth, 0]);
      }
      var layerStates = frameState.layerStatesArray;
      var numLayers = layerStates.length;
      var matches = [];
      var tmpCoord = [];
      for (var i = 0; i < offsets.length; i++) {
        for (var j = numLayers - 1; j >= 0; --j) {
          var layerState = layerStates[j];
          var layer = layerState.layer;
          if (layer.hasRenderer() && inView(layerState, viewState) && layerFilter.call(thisArg2, layer)) {
            var layerRenderer = layer.getRenderer();
            var source = layer.getSource();
            if (layerRenderer && source) {
              var coordinates2 = source.getWrapX() ? translatedCoordinate : coordinate;
              var callback_1 = forEachFeatureAtCoordinate.bind(null, layerState.managed);
              tmpCoord[0] = coordinates2[0] + offsets[i][0];
              tmpCoord[1] = coordinates2[1] + offsets[i][1];
              result = layerRenderer.forEachFeatureAtCoordinate(tmpCoord, frameState, hitTolerance, callback_1, matches);
            }
            if (result) {
              return result;
            }
          }
        }
      }
      if (matches.length === 0) {
        return void 0;
      }
      var order = 1 / matches.length;
      matches.forEach(function(m, i2) {
        return m.distanceSq += i2 * order;
      });
      matches.sort(function(a, b) {
        return a.distanceSq - b.distanceSq;
      });
      matches.some(function(m) {
        return result = m.callback(m.feature, m.layer, m.geometry);
      });
      return result;
    };
    MapRenderer2.prototype.forEachLayerAtPixel = function(pixel, frameState, hitTolerance, callback, layerFilter) {
      return abstract();
    };
    MapRenderer2.prototype.hasFeatureAtCoordinate = function(coordinate, frameState, hitTolerance, checkWrapped, layerFilter, thisArg) {
      var hasFeature = this.forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, checkWrapped, TRUE, this, layerFilter, thisArg);
      return hasFeature !== void 0;
    };
    MapRenderer2.prototype.getMap = function() {
      return this.map_;
    };
    MapRenderer2.prototype.renderFrame = function(frameState) {
      abstract();
    };
    MapRenderer2.prototype.scheduleExpireIconCache = function(frameState) {
      if (shared.canExpireCache()) {
        frameState.postRenderFunctions.push(expireIconCache);
      }
    };
    return MapRenderer2;
  }(Disposable$1);
  function expireIconCache(map, frameState) {
    shared.expire();
  }
  var MapRenderer$1 = MapRenderer;
  var __extends$A = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var CompositeMapRenderer = function(_super) {
    __extends$A(CompositeMapRenderer2, _super);
    function CompositeMapRenderer2(map) {
      var _this = _super.call(this, map) || this;
      _this.fontChangeListenerKey_ = listen(checkedFonts, ObjectEventType.PROPERTYCHANGE, map.redrawText.bind(map));
      _this.element_ = document.createElement("div");
      var style = _this.element_.style;
      style.position = "absolute";
      style.width = "100%";
      style.height = "100%";
      style.zIndex = "0";
      _this.element_.className = CLASS_UNSELECTABLE + " ol-layers";
      var container = map.getViewport();
      container.insertBefore(_this.element_, container.firstChild || null);
      _this.children_ = [];
      _this.renderedVisible_ = true;
      return _this;
    }
    CompositeMapRenderer2.prototype.dispatchRenderEvent = function(type, frameState) {
      var map = this.getMap();
      if (map.hasListener(type)) {
        var event_1 = new RenderEvent$1(type, void 0, frameState);
        map.dispatchEvent(event_1);
      }
    };
    CompositeMapRenderer2.prototype.disposeInternal = function() {
      unlistenByKey(this.fontChangeListenerKey_);
      this.element_.parentNode.removeChild(this.element_);
      _super.prototype.disposeInternal.call(this);
    };
    CompositeMapRenderer2.prototype.renderFrame = function(frameState) {
      if (!frameState) {
        if (this.renderedVisible_) {
          this.element_.style.display = "none";
          this.renderedVisible_ = false;
        }
        return;
      }
      this.calculateMatrices2D(frameState);
      this.dispatchRenderEvent(RenderEventType.PRECOMPOSE, frameState);
      var layerStatesArray = frameState.layerStatesArray.sort(function(a, b) {
        return a.zIndex - b.zIndex;
      });
      var viewState = frameState.viewState;
      this.children_.length = 0;
      var declutterLayers = [];
      var previousElement = null;
      for (var i = 0, ii = layerStatesArray.length; i < ii; ++i) {
        var layerState = layerStatesArray[i];
        frameState.layerIndex = i;
        if (!inView(layerState, viewState) || layerState.sourceState != SourceState.READY && layerState.sourceState != SourceState.UNDEFINED) {
          continue;
        }
        var layer = layerState.layer;
        var element = layer.render(frameState, previousElement);
        if (!element) {
          continue;
        }
        if (element !== previousElement) {
          this.children_.push(element);
          previousElement = element;
        }
        if ("getDeclutter" in layer) {
          declutterLayers.push(layer);
        }
      }
      for (var i = declutterLayers.length - 1; i >= 0; --i) {
        declutterLayers[i].renderDeclutter(frameState);
      }
      replaceChildren(this.element_, this.children_);
      this.dispatchRenderEvent(RenderEventType.POSTCOMPOSE, frameState);
      if (!this.renderedVisible_) {
        this.element_.style.display = "";
        this.renderedVisible_ = true;
      }
      this.scheduleExpireIconCache(frameState);
    };
    CompositeMapRenderer2.prototype.forEachLayerAtPixel = function(pixel, frameState, hitTolerance, callback, layerFilter) {
      var viewState = frameState.viewState;
      var layerStates = frameState.layerStatesArray;
      var numLayers = layerStates.length;
      for (var i = numLayers - 1; i >= 0; --i) {
        var layerState = layerStates[i];
        var layer = layerState.layer;
        if (layer.hasRenderer() && inView(layerState, viewState) && layerFilter(layer)) {
          var layerRenderer = layer.getRenderer();
          var data = layerRenderer.getDataAtPixel(pixel, frameState, hitTolerance);
          if (data) {
            var result = callback(layer, data);
            if (result) {
              return result;
            }
          }
        }
      }
      return void 0;
    };
    return CompositeMapRenderer2;
  }(MapRenderer$1);
  var CompositeMapRenderer$1 = CompositeMapRenderer;
  var __extends$z = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Property$1 = {
    LAYERS: "layers"
  };
  var LayerGroup = function(_super) {
    __extends$z(LayerGroup2, _super);
    function LayerGroup2(opt_options) {
      var _this = this;
      var options = opt_options || {};
      var baseOptions = assign({}, options);
      delete baseOptions.layers;
      var layers = options.layers;
      _this = _super.call(this, baseOptions) || this;
      _this.on;
      _this.once;
      _this.un;
      _this.layersListenerKeys_ = [];
      _this.listenerKeys_ = {};
      _this.addChangeListener(Property$1.LAYERS, _this.handleLayersChanged_);
      if (layers) {
        if (Array.isArray(layers)) {
          layers = new Collection$1(layers.slice(), { unique: true });
        } else {
          assert(typeof layers.getArray === "function", 43);
        }
      } else {
        layers = new Collection$1(void 0, { unique: true });
      }
      _this.setLayers(layers);
      return _this;
    }
    LayerGroup2.prototype.handleLayerChange_ = function() {
      this.changed();
    };
    LayerGroup2.prototype.handleLayersChanged_ = function() {
      this.layersListenerKeys_.forEach(unlistenByKey);
      this.layersListenerKeys_.length = 0;
      var layers = this.getLayers();
      this.layersListenerKeys_.push(listen(layers, CollectionEventType.ADD, this.handleLayersAdd_, this), listen(layers, CollectionEventType.REMOVE, this.handleLayersRemove_, this));
      for (var id in this.listenerKeys_) {
        this.listenerKeys_[id].forEach(unlistenByKey);
      }
      clear(this.listenerKeys_);
      var layersArray = layers.getArray();
      for (var i = 0, ii = layersArray.length; i < ii; i++) {
        var layer = layersArray[i];
        this.listenerKeys_[getUid(layer)] = [
          listen(layer, ObjectEventType.PROPERTYCHANGE, this.handleLayerChange_, this),
          listen(layer, EventType.CHANGE, this.handleLayerChange_, this)
        ];
      }
      this.changed();
    };
    LayerGroup2.prototype.handleLayersAdd_ = function(collectionEvent) {
      var layer = collectionEvent.element;
      this.listenerKeys_[getUid(layer)] = [
        listen(layer, ObjectEventType.PROPERTYCHANGE, this.handleLayerChange_, this),
        listen(layer, EventType.CHANGE, this.handleLayerChange_, this)
      ];
      this.changed();
    };
    LayerGroup2.prototype.handleLayersRemove_ = function(collectionEvent) {
      var layer = collectionEvent.element;
      var key = getUid(layer);
      this.listenerKeys_[key].forEach(unlistenByKey);
      delete this.listenerKeys_[key];
      this.changed();
    };
    LayerGroup2.prototype.getLayers = function() {
      return this.get(Property$1.LAYERS);
    };
    LayerGroup2.prototype.setLayers = function(layers) {
      this.set(Property$1.LAYERS, layers);
    };
    LayerGroup2.prototype.getLayersArray = function(opt_array) {
      var array = opt_array !== void 0 ? opt_array : [];
      this.getLayers().forEach(function(layer) {
        layer.getLayersArray(array);
      });
      return array;
    };
    LayerGroup2.prototype.getLayerStatesArray = function(opt_states) {
      var states = opt_states !== void 0 ? opt_states : [];
      var pos = states.length;
      this.getLayers().forEach(function(layer) {
        layer.getLayerStatesArray(states);
      });
      var ownLayerState = this.getLayerState();
      var defaultZIndex = ownLayerState.zIndex;
      if (!opt_states && ownLayerState.zIndex === void 0) {
        defaultZIndex = 0;
      }
      for (var i = pos, ii = states.length; i < ii; i++) {
        var layerState = states[i];
        layerState.opacity *= ownLayerState.opacity;
        layerState.visible = layerState.visible && ownLayerState.visible;
        layerState.maxResolution = Math.min(layerState.maxResolution, ownLayerState.maxResolution);
        layerState.minResolution = Math.max(layerState.minResolution, ownLayerState.minResolution);
        layerState.minZoom = Math.max(layerState.minZoom, ownLayerState.minZoom);
        layerState.maxZoom = Math.min(layerState.maxZoom, ownLayerState.maxZoom);
        if (ownLayerState.extent !== void 0) {
          if (layerState.extent !== void 0) {
            layerState.extent = getIntersection(layerState.extent, ownLayerState.extent);
          } else {
            layerState.extent = ownLayerState.extent;
          }
        }
        if (layerState.zIndex === void 0) {
          layerState.zIndex = defaultZIndex;
        }
      }
      return states;
    };
    LayerGroup2.prototype.getSourceState = function() {
      return SourceState.READY;
    };
    return LayerGroup2;
  }(BaseLayer$1);
  var LayerGroup$1 = LayerGroup;
  var __extends$y = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var MapEvent = function(_super) {
    __extends$y(MapEvent2, _super);
    function MapEvent2(type, map, opt_frameState) {
      var _this = _super.call(this, type) || this;
      _this.map = map;
      _this.frameState = opt_frameState !== void 0 ? opt_frameState : null;
      return _this;
    }
    return MapEvent2;
  }(Event);
  var MapEvent$1 = MapEvent;
  var __extends$x = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var MapBrowserEvent = function(_super) {
    __extends$x(MapBrowserEvent2, _super);
    function MapBrowserEvent2(type, map, originalEvent, opt_dragging, opt_frameState) {
      var _this = _super.call(this, type, map, opt_frameState) || this;
      _this.originalEvent = originalEvent;
      _this.pixel_ = null;
      _this.coordinate_ = null;
      _this.dragging = opt_dragging !== void 0 ? opt_dragging : false;
      return _this;
    }
    Object.defineProperty(MapBrowserEvent2.prototype, "pixel", {
      get: function() {
        if (!this.pixel_) {
          this.pixel_ = this.map.getEventPixel(this.originalEvent);
        }
        return this.pixel_;
      },
      set: function(pixel) {
        this.pixel_ = pixel;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MapBrowserEvent2.prototype, "coordinate", {
      get: function() {
        if (!this.coordinate_) {
          this.coordinate_ = this.map.getCoordinateFromPixel(this.pixel);
        }
        return this.coordinate_;
      },
      set: function(coordinate) {
        this.coordinate_ = coordinate;
      },
      enumerable: false,
      configurable: true
    });
    MapBrowserEvent2.prototype.preventDefault = function() {
      _super.prototype.preventDefault.call(this);
      if ("preventDefault" in this.originalEvent) {
        this.originalEvent.preventDefault();
      }
    };
    MapBrowserEvent2.prototype.stopPropagation = function() {
      _super.prototype.stopPropagation.call(this);
      if ("stopPropagation" in this.originalEvent) {
        this.originalEvent.stopPropagation();
      }
    };
    return MapBrowserEvent2;
  }(MapEvent$1);
  var MapBrowserEvent$1 = MapBrowserEvent;
  var MapBrowserEventType = {
    SINGLECLICK: "singleclick",
    CLICK: EventType.CLICK,
    DBLCLICK: EventType.DBLCLICK,
    POINTERDRAG: "pointerdrag",
    POINTERMOVE: "pointermove",
    POINTERDOWN: "pointerdown",
    POINTERUP: "pointerup",
    POINTEROVER: "pointerover",
    POINTEROUT: "pointerout",
    POINTERENTER: "pointerenter",
    POINTERLEAVE: "pointerleave",
    POINTERCANCEL: "pointercancel"
  };
  var PointerEventType = {
    POINTERMOVE: "pointermove",
    POINTERDOWN: "pointerdown",
    POINTERUP: "pointerup",
    POINTEROVER: "pointerover",
    POINTEROUT: "pointerout",
    POINTERENTER: "pointerenter",
    POINTERLEAVE: "pointerleave",
    POINTERCANCEL: "pointercancel"
  };
  var __extends$w = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var MapBrowserEventHandler = function(_super) {
    __extends$w(MapBrowserEventHandler2, _super);
    function MapBrowserEventHandler2(map, moveTolerance) {
      var _this = _super.call(this, map) || this;
      _this.map_ = map;
      _this.clickTimeoutId_;
      _this.emulateClicks_ = false;
      _this.dragging_ = false;
      _this.dragListenerKeys_ = [];
      _this.moveTolerance_ = moveTolerance === void 0 ? 1 : moveTolerance;
      _this.down_ = null;
      var element = _this.map_.getViewport();
      _this.activePointers_ = 0;
      _this.trackedTouches_ = {};
      _this.element_ = element;
      _this.pointerdownListenerKey_ = listen(element, PointerEventType.POINTERDOWN, _this.handlePointerDown_, _this);
      _this.originalPointerMoveEvent_;
      _this.relayedListenerKey_ = listen(element, PointerEventType.POINTERMOVE, _this.relayEvent_, _this);
      _this.boundHandleTouchMove_ = _this.handleTouchMove_.bind(_this);
      _this.element_.addEventListener(EventType.TOUCHMOVE, _this.boundHandleTouchMove_, PASSIVE_EVENT_LISTENERS ? { passive: false } : false);
      return _this;
    }
    MapBrowserEventHandler2.prototype.emulateClick_ = function(pointerEvent) {
      var newEvent = new MapBrowserEvent$1(MapBrowserEventType.CLICK, this.map_, pointerEvent);
      this.dispatchEvent(newEvent);
      if (this.clickTimeoutId_ !== void 0) {
        clearTimeout(this.clickTimeoutId_);
        this.clickTimeoutId_ = void 0;
        newEvent = new MapBrowserEvent$1(MapBrowserEventType.DBLCLICK, this.map_, pointerEvent);
        this.dispatchEvent(newEvent);
      } else {
        this.clickTimeoutId_ = setTimeout(function() {
          this.clickTimeoutId_ = void 0;
          var newEvent2 = new MapBrowserEvent$1(MapBrowserEventType.SINGLECLICK, this.map_, pointerEvent);
          this.dispatchEvent(newEvent2);
        }.bind(this), 250);
      }
    };
    MapBrowserEventHandler2.prototype.updateActivePointers_ = function(pointerEvent) {
      var event = pointerEvent;
      if (event.type == MapBrowserEventType.POINTERUP || event.type == MapBrowserEventType.POINTERCANCEL) {
        delete this.trackedTouches_[event.pointerId];
      } else if (event.type == MapBrowserEventType.POINTERDOWN) {
        this.trackedTouches_[event.pointerId] = true;
      }
      this.activePointers_ = Object.keys(this.trackedTouches_).length;
    };
    MapBrowserEventHandler2.prototype.handlePointerUp_ = function(pointerEvent) {
      this.updateActivePointers_(pointerEvent);
      var newEvent = new MapBrowserEvent$1(MapBrowserEventType.POINTERUP, this.map_, pointerEvent);
      this.dispatchEvent(newEvent);
      if (this.emulateClicks_ && !newEvent.defaultPrevented && !this.dragging_ && this.isMouseActionButton_(pointerEvent)) {
        this.emulateClick_(this.down_);
      }
      if (this.activePointers_ === 0) {
        this.dragListenerKeys_.forEach(unlistenByKey);
        this.dragListenerKeys_.length = 0;
        this.dragging_ = false;
        this.down_ = null;
      }
    };
    MapBrowserEventHandler2.prototype.isMouseActionButton_ = function(pointerEvent) {
      return pointerEvent.button === 0;
    };
    MapBrowserEventHandler2.prototype.handlePointerDown_ = function(pointerEvent) {
      this.emulateClicks_ = this.activePointers_ === 0;
      this.updateActivePointers_(pointerEvent);
      var newEvent = new MapBrowserEvent$1(MapBrowserEventType.POINTERDOWN, this.map_, pointerEvent);
      this.dispatchEvent(newEvent);
      this.down_ = {};
      for (var property in pointerEvent) {
        var value = pointerEvent[property];
        this.down_[property] = typeof value === "function" ? VOID : value;
      }
      if (this.dragListenerKeys_.length === 0) {
        var doc = this.map_.getOwnerDocument();
        this.dragListenerKeys_.push(listen(doc, MapBrowserEventType.POINTERMOVE, this.handlePointerMove_, this), listen(doc, MapBrowserEventType.POINTERUP, this.handlePointerUp_, this), listen(this.element_, MapBrowserEventType.POINTERCANCEL, this.handlePointerUp_, this));
        if (this.element_.getRootNode && this.element_.getRootNode() !== doc) {
          this.dragListenerKeys_.push(listen(this.element_.getRootNode(), MapBrowserEventType.POINTERUP, this.handlePointerUp_, this));
        }
      }
    };
    MapBrowserEventHandler2.prototype.handlePointerMove_ = function(pointerEvent) {
      if (this.isMoving_(pointerEvent)) {
        this.dragging_ = true;
        var newEvent = new MapBrowserEvent$1(MapBrowserEventType.POINTERDRAG, this.map_, pointerEvent, this.dragging_);
        this.dispatchEvent(newEvent);
      }
    };
    MapBrowserEventHandler2.prototype.relayEvent_ = function(pointerEvent) {
      this.originalPointerMoveEvent_ = pointerEvent;
      var dragging = !!(this.down_ && this.isMoving_(pointerEvent));
      this.dispatchEvent(new MapBrowserEvent$1(pointerEvent.type, this.map_, pointerEvent, dragging));
    };
    MapBrowserEventHandler2.prototype.handleTouchMove_ = function(event) {
      var originalEvent = this.originalPointerMoveEvent_;
      if ((!originalEvent || originalEvent.defaultPrevented) && (typeof event.cancelable !== "boolean" || event.cancelable === true)) {
        event.preventDefault();
      }
    };
    MapBrowserEventHandler2.prototype.isMoving_ = function(pointerEvent) {
      return this.dragging_ || Math.abs(pointerEvent.clientX - this.down_.clientX) > this.moveTolerance_ || Math.abs(pointerEvent.clientY - this.down_.clientY) > this.moveTolerance_;
    };
    MapBrowserEventHandler2.prototype.disposeInternal = function() {
      if (this.relayedListenerKey_) {
        unlistenByKey(this.relayedListenerKey_);
        this.relayedListenerKey_ = null;
      }
      this.element_.removeEventListener(EventType.TOUCHMOVE, this.boundHandleTouchMove_);
      if (this.pointerdownListenerKey_) {
        unlistenByKey(this.pointerdownListenerKey_);
        this.pointerdownListenerKey_ = null;
      }
      this.dragListenerKeys_.forEach(unlistenByKey);
      this.dragListenerKeys_.length = 0;
      this.element_ = null;
      _super.prototype.disposeInternal.call(this);
    };
    return MapBrowserEventHandler2;
  }(Target$1);
  var MapBrowserEventHandler$1 = MapBrowserEventHandler;
  var MapEventType = {
    POSTRENDER: "postrender",
    MOVESTART: "movestart",
    MOVEEND: "moveend"
  };
  var MapProperty = {
    LAYERGROUP: "layergroup",
    SIZE: "size",
    TARGET: "target",
    VIEW: "view"
  };
  var DROP = Infinity;
  var PriorityQueue = function() {
    function PriorityQueue2(priorityFunction, keyFunction) {
      this.priorityFunction_ = priorityFunction;
      this.keyFunction_ = keyFunction;
      this.elements_ = [];
      this.priorities_ = [];
      this.queuedElements_ = {};
    }
    PriorityQueue2.prototype.clear = function() {
      this.elements_.length = 0;
      this.priorities_.length = 0;
      clear(this.queuedElements_);
    };
    PriorityQueue2.prototype.dequeue = function() {
      var elements = this.elements_;
      var priorities = this.priorities_;
      var element = elements[0];
      if (elements.length == 1) {
        elements.length = 0;
        priorities.length = 0;
      } else {
        elements[0] = elements.pop();
        priorities[0] = priorities.pop();
        this.siftUp_(0);
      }
      var elementKey = this.keyFunction_(element);
      delete this.queuedElements_[elementKey];
      return element;
    };
    PriorityQueue2.prototype.enqueue = function(element) {
      assert(!(this.keyFunction_(element) in this.queuedElements_), 31);
      var priority = this.priorityFunction_(element);
      if (priority != DROP) {
        this.elements_.push(element);
        this.priorities_.push(priority);
        this.queuedElements_[this.keyFunction_(element)] = true;
        this.siftDown_(0, this.elements_.length - 1);
        return true;
      }
      return false;
    };
    PriorityQueue2.prototype.getCount = function() {
      return this.elements_.length;
    };
    PriorityQueue2.prototype.getLeftChildIndex_ = function(index) {
      return index * 2 + 1;
    };
    PriorityQueue2.prototype.getRightChildIndex_ = function(index) {
      return index * 2 + 2;
    };
    PriorityQueue2.prototype.getParentIndex_ = function(index) {
      return index - 1 >> 1;
    };
    PriorityQueue2.prototype.heapify_ = function() {
      var i;
      for (i = (this.elements_.length >> 1) - 1; i >= 0; i--) {
        this.siftUp_(i);
      }
    };
    PriorityQueue2.prototype.isEmpty = function() {
      return this.elements_.length === 0;
    };
    PriorityQueue2.prototype.isKeyQueued = function(key) {
      return key in this.queuedElements_;
    };
    PriorityQueue2.prototype.isQueued = function(element) {
      return this.isKeyQueued(this.keyFunction_(element));
    };
    PriorityQueue2.prototype.siftUp_ = function(index) {
      var elements = this.elements_;
      var priorities = this.priorities_;
      var count = elements.length;
      var element = elements[index];
      var priority = priorities[index];
      var startIndex = index;
      while (index < count >> 1) {
        var lIndex = this.getLeftChildIndex_(index);
        var rIndex = this.getRightChildIndex_(index);
        var smallerChildIndex = rIndex < count && priorities[rIndex] < priorities[lIndex] ? rIndex : lIndex;
        elements[index] = elements[smallerChildIndex];
        priorities[index] = priorities[smallerChildIndex];
        index = smallerChildIndex;
      }
      elements[index] = element;
      priorities[index] = priority;
      this.siftDown_(startIndex, index);
    };
    PriorityQueue2.prototype.siftDown_ = function(startIndex, index) {
      var elements = this.elements_;
      var priorities = this.priorities_;
      var element = elements[index];
      var priority = priorities[index];
      while (index > startIndex) {
        var parentIndex = this.getParentIndex_(index);
        if (priorities[parentIndex] > priority) {
          elements[index] = elements[parentIndex];
          priorities[index] = priorities[parentIndex];
          index = parentIndex;
        } else {
          break;
        }
      }
      elements[index] = element;
      priorities[index] = priority;
    };
    PriorityQueue2.prototype.reprioritize = function() {
      var priorityFunction = this.priorityFunction_;
      var elements = this.elements_;
      var priorities = this.priorities_;
      var index = 0;
      var n = elements.length;
      var element, i, priority;
      for (i = 0; i < n; ++i) {
        element = elements[i];
        priority = priorityFunction(element);
        if (priority == DROP) {
          delete this.queuedElements_[this.keyFunction_(element)];
        } else {
          priorities[index] = priority;
          elements[index++] = element;
        }
      }
      elements.length = index;
      priorities.length = index;
      this.heapify_();
    };
    return PriorityQueue2;
  }();
  var PriorityQueue$1 = PriorityQueue;
  var __extends$v = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var TileQueue = function(_super) {
    __extends$v(TileQueue2, _super);
    function TileQueue2(tilePriorityFunction, tileChangeCallback) {
      var _this = _super.call(this, function(element) {
        return tilePriorityFunction.apply(null, element);
      }, function(element) {
        return element[0].getKey();
      }) || this;
      _this.boundHandleTileChange_ = _this.handleTileChange.bind(_this);
      _this.tileChangeCallback_ = tileChangeCallback;
      _this.tilesLoading_ = 0;
      _this.tilesLoadingKeys_ = {};
      return _this;
    }
    TileQueue2.prototype.enqueue = function(element) {
      var added = _super.prototype.enqueue.call(this, element);
      if (added) {
        var tile = element[0];
        tile.addEventListener(EventType.CHANGE, this.boundHandleTileChange_);
      }
      return added;
    };
    TileQueue2.prototype.getTilesLoading = function() {
      return this.tilesLoading_;
    };
    TileQueue2.prototype.handleTileChange = function(event) {
      var tile = event.target;
      var state = tile.getState();
      if (state === TileState.LOADED || state === TileState.ERROR || state === TileState.EMPTY) {
        tile.removeEventListener(EventType.CHANGE, this.boundHandleTileChange_);
        var tileKey = tile.getKey();
        if (tileKey in this.tilesLoadingKeys_) {
          delete this.tilesLoadingKeys_[tileKey];
          --this.tilesLoading_;
        }
        this.tileChangeCallback_();
      }
    };
    TileQueue2.prototype.loadMoreTiles = function(maxTotalLoading, maxNewLoads) {
      var newLoads = 0;
      var state, tile, tileKey;
      while (this.tilesLoading_ < maxTotalLoading && newLoads < maxNewLoads && this.getCount() > 0) {
        tile = this.dequeue()[0];
        tileKey = tile.getKey();
        state = tile.getState();
        if (state === TileState.IDLE && !(tileKey in this.tilesLoadingKeys_)) {
          this.tilesLoadingKeys_[tileKey] = true;
          ++this.tilesLoading_;
          ++newLoads;
          tile.load();
        }
      }
    };
    return TileQueue2;
  }(PriorityQueue$1);
  var TileQueue$1 = TileQueue;
  function getTilePriority(frameState, tile, tileSourceKey, tileCenter, tileResolution) {
    if (!frameState || !(tileSourceKey in frameState.wantedTiles)) {
      return DROP;
    }
    if (!frameState.wantedTiles[tileSourceKey][tile.getKey()]) {
      return DROP;
    }
    var center = frameState.viewState.center;
    var deltaX = tileCenter[0] - center[0];
    var deltaY = tileCenter[1] - center[1];
    return 65536 * Math.log(tileResolution) + Math.sqrt(deltaX * deltaX + deltaY * deltaY) / tileResolution;
  }
  var ViewProperty = {
    CENTER: "center",
    RESOLUTION: "resolution",
    ROTATION: "rotation"
  };
  var DEFAULT_MAX_ZOOM = 42;
  var DEFAULT_TILE_SIZE = 256;
  function createExtent(extent, onlyCenter, smooth) {
    return function(center, resolution, size, opt_isMoving, opt_centerShift) {
      if (center) {
        var viewWidth = onlyCenter ? 0 : size[0] * resolution;
        var viewHeight = onlyCenter ? 0 : size[1] * resolution;
        var shiftX = opt_centerShift ? opt_centerShift[0] : 0;
        var shiftY = opt_centerShift ? opt_centerShift[1] : 0;
        var minX = extent[0] + viewWidth / 2 + shiftX;
        var maxX = extent[2] - viewWidth / 2 + shiftX;
        var minY = extent[1] + viewHeight / 2 + shiftY;
        var maxY = extent[3] - viewHeight / 2 + shiftY;
        if (minX > maxX) {
          minX = (maxX + minX) / 2;
          maxX = minX;
        }
        if (minY > maxY) {
          minY = (maxY + minY) / 2;
          maxY = minY;
        }
        var x = clamp(center[0], minX, maxX);
        var y = clamp(center[1], minY, maxY);
        var ratio = 30 * resolution;
        if (opt_isMoving && smooth) {
          x += -ratio * Math.log(1 + Math.max(0, minX - center[0]) / ratio) + ratio * Math.log(1 + Math.max(0, center[0] - maxX) / ratio);
          y += -ratio * Math.log(1 + Math.max(0, minY - center[1]) / ratio) + ratio * Math.log(1 + Math.max(0, center[1] - maxY) / ratio);
        }
        return [x, y];
      } else {
        return void 0;
      }
    };
  }
  function none$1(center) {
    return center;
  }
  function getViewportClampedResolution(resolution, maxExtent, viewportSize, showFullExtent) {
    var xResolution = getWidth(maxExtent) / viewportSize[0];
    var yResolution = getHeight(maxExtent) / viewportSize[1];
    if (showFullExtent) {
      return Math.min(resolution, Math.max(xResolution, yResolution));
    }
    return Math.min(resolution, Math.min(xResolution, yResolution));
  }
  function getSmoothClampedResolution(resolution, maxResolution, minResolution) {
    var result = Math.min(resolution, maxResolution);
    var ratio = 50;
    result *= Math.log(1 + ratio * Math.max(0, resolution / maxResolution - 1)) / ratio + 1;
    if (minResolution) {
      result = Math.max(result, minResolution);
      result /= Math.log(1 + ratio * Math.max(0, minResolution / resolution - 1)) / ratio + 1;
    }
    return clamp(result, minResolution / 2, maxResolution * 2);
  }
  function createSnapToResolutions(resolutions, opt_smooth, opt_maxExtent, opt_showFullExtent) {
    return function(resolution, direction, size, opt_isMoving) {
      if (resolution !== void 0) {
        var maxResolution = resolutions[0];
        var minResolution = resolutions[resolutions.length - 1];
        var cappedMaxRes = opt_maxExtent ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent) : maxResolution;
        if (opt_isMoving) {
          var smooth = opt_smooth !== void 0 ? opt_smooth : true;
          if (!smooth) {
            return clamp(resolution, minResolution, cappedMaxRes);
          }
          return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
        }
        var capped = Math.min(cappedMaxRes, resolution);
        var z = Math.floor(linearFindNearest(resolutions, capped, direction));
        if (resolutions[z] > cappedMaxRes && z < resolutions.length - 1) {
          return resolutions[z + 1];
        }
        return resolutions[z];
      } else {
        return void 0;
      }
    };
  }
  function createSnapToPower(power, maxResolution, opt_minResolution, opt_smooth, opt_maxExtent, opt_showFullExtent) {
    return function(resolution, direction, size, opt_isMoving) {
      if (resolution !== void 0) {
        var cappedMaxRes = opt_maxExtent ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent) : maxResolution;
        var minResolution = opt_minResolution !== void 0 ? opt_minResolution : 0;
        if (opt_isMoving) {
          var smooth = opt_smooth !== void 0 ? opt_smooth : true;
          if (!smooth) {
            return clamp(resolution, minResolution, cappedMaxRes);
          }
          return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
        }
        var tolerance = 1e-9;
        var minZoomLevel = Math.ceil(Math.log(maxResolution / cappedMaxRes) / Math.log(power) - tolerance);
        var offset = -direction * (0.5 - tolerance) + 0.5;
        var capped = Math.min(cappedMaxRes, resolution);
        var cappedZoomLevel = Math.floor(Math.log(maxResolution / capped) / Math.log(power) + offset);
        var zoomLevel = Math.max(minZoomLevel, cappedZoomLevel);
        var newResolution = maxResolution / Math.pow(power, zoomLevel);
        return clamp(newResolution, minResolution, cappedMaxRes);
      } else {
        return void 0;
      }
    };
  }
  function createMinMaxResolution(maxResolution, minResolution, opt_smooth, opt_maxExtent, opt_showFullExtent) {
    return function(resolution, direction, size, opt_isMoving) {
      if (resolution !== void 0) {
        var cappedMaxRes = opt_maxExtent ? getViewportClampedResolution(maxResolution, opt_maxExtent, size, opt_showFullExtent) : maxResolution;
        var smooth = opt_smooth !== void 0 ? opt_smooth : true;
        if (!smooth || !opt_isMoving) {
          return clamp(resolution, minResolution, cappedMaxRes);
        }
        return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
      } else {
        return void 0;
      }
    };
  }
  function disable(rotation) {
    if (rotation !== void 0) {
      return 0;
    } else {
      return void 0;
    }
  }
  function none(rotation) {
    if (rotation !== void 0) {
      return rotation;
    } else {
      return void 0;
    }
  }
  function createSnapToN(n) {
    var theta = 2 * Math.PI / n;
    return function(rotation, opt_isMoving) {
      if (opt_isMoving) {
        return rotation;
      }
      if (rotation !== void 0) {
        rotation = Math.floor(rotation / theta + 0.5) * theta;
        return rotation;
      } else {
        return void 0;
      }
    };
  }
  function createSnapToZero(opt_tolerance) {
    var tolerance = opt_tolerance || toRadians(5);
    return function(rotation, opt_isMoving) {
      if (opt_isMoving) {
        return rotation;
      }
      if (rotation !== void 0) {
        if (Math.abs(rotation) <= tolerance) {
          return 0;
        } else {
          return rotation;
        }
      } else {
        return void 0;
      }
    };
  }
  var __extends$u = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var DEFAULT_MIN_ZOOM = 0;
  var View = function(_super) {
    __extends$u(View2, _super);
    function View2(opt_options) {
      var _this = _super.call(this) || this;
      _this.on;
      _this.once;
      _this.un;
      var options = assign({}, opt_options);
      _this.hints_ = [0, 0];
      _this.animations_ = [];
      _this.updateAnimationKey_;
      _this.projection_ = createProjection(options.projection, "EPSG:3857");
      _this.viewportSize_ = [100, 100];
      _this.targetCenter_ = null;
      _this.targetResolution_;
      _this.targetRotation_;
      _this.nextCenter_ = null;
      _this.nextResolution_;
      _this.nextRotation_;
      _this.cancelAnchor_ = void 0;
      if (options.center) {
        options.center = fromUserCoordinate(options.center, _this.projection_);
      }
      if (options.extent) {
        options.extent = fromUserExtent(options.extent, _this.projection_);
      }
      _this.applyOptions_(options);
      return _this;
    }
    View2.prototype.applyOptions_ = function(options) {
      var properties = {};
      var resolutionConstraintInfo = createResolutionConstraint(options);
      this.maxResolution_ = resolutionConstraintInfo.maxResolution;
      this.minResolution_ = resolutionConstraintInfo.minResolution;
      this.zoomFactor_ = resolutionConstraintInfo.zoomFactor;
      this.resolutions_ = options.resolutions;
      this.padding_ = options.padding;
      this.minZoom_ = resolutionConstraintInfo.minZoom;
      var centerConstraint = createCenterConstraint(options);
      var resolutionConstraint = resolutionConstraintInfo.constraint;
      var rotationConstraint = createRotationConstraint(options);
      this.constraints_ = {
        center: centerConstraint,
        resolution: resolutionConstraint,
        rotation: rotationConstraint
      };
      this.setRotation(options.rotation !== void 0 ? options.rotation : 0);
      this.setCenterInternal(options.center !== void 0 ? options.center : null);
      if (options.resolution !== void 0) {
        this.setResolution(options.resolution);
      } else if (options.zoom !== void 0) {
        this.setZoom(options.zoom);
      }
      this.setProperties(properties);
      this.options_ = options;
    };
    Object.defineProperty(View2.prototype, "padding", {
      get: function() {
        return this.padding_;
      },
      set: function(padding) {
        var oldPadding = this.padding_;
        this.padding_ = padding;
        var center = this.getCenter();
        if (center) {
          var newPadding = padding || [0, 0, 0, 0];
          oldPadding = oldPadding || [0, 0, 0, 0];
          var resolution = this.getResolution();
          var offsetX = resolution / 2 * (newPadding[3] - oldPadding[3] + oldPadding[1] - newPadding[1]);
          var offsetY = resolution / 2 * (newPadding[0] - oldPadding[0] + oldPadding[2] - newPadding[2]);
          this.setCenterInternal([center[0] + offsetX, center[1] - offsetY]);
        }
      },
      enumerable: false,
      configurable: true
    });
    View2.prototype.getUpdatedOptions_ = function(newOptions) {
      var options = assign({}, this.options_);
      if (options.resolution !== void 0) {
        options.resolution = this.getResolution();
      } else {
        options.zoom = this.getZoom();
      }
      options.center = this.getCenterInternal();
      options.rotation = this.getRotation();
      return assign({}, options, newOptions);
    };
    View2.prototype.animate = function(var_args) {
      if (this.isDef() && !this.getAnimating()) {
        this.resolveConstraints(0);
      }
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; ++i) {
        var options = arguments[i];
        if (options.center) {
          options = assign({}, options);
          options.center = fromUserCoordinate(options.center, this.getProjection());
        }
        if (options.anchor) {
          options = assign({}, options);
          options.anchor = fromUserCoordinate(options.anchor, this.getProjection());
        }
        args[i] = options;
      }
      this.animateInternal.apply(this, args);
    };
    View2.prototype.animateInternal = function(var_args) {
      var animationCount = arguments.length;
      var callback;
      if (animationCount > 1 && typeof arguments[animationCount - 1] === "function") {
        callback = arguments[animationCount - 1];
        --animationCount;
      }
      var i = 0;
      for (; i < animationCount && !this.isDef(); ++i) {
        var state = arguments[i];
        if (state.center) {
          this.setCenterInternal(state.center);
        }
        if (state.zoom !== void 0) {
          this.setZoom(state.zoom);
        } else if (state.resolution) {
          this.setResolution(state.resolution);
        }
        if (state.rotation !== void 0) {
          this.setRotation(state.rotation);
        }
      }
      if (i === animationCount) {
        if (callback) {
          animationCallback(callback, true);
        }
        return;
      }
      var start = Date.now();
      var center = this.targetCenter_.slice();
      var resolution = this.targetResolution_;
      var rotation = this.targetRotation_;
      var series = [];
      for (; i < animationCount; ++i) {
        var options = arguments[i];
        var animation = {
          start,
          complete: false,
          anchor: options.anchor,
          duration: options.duration !== void 0 ? options.duration : 1e3,
          easing: options.easing || inAndOut,
          callback
        };
        if (options.center) {
          animation.sourceCenter = center;
          animation.targetCenter = options.center.slice();
          center = animation.targetCenter;
        }
        if (options.zoom !== void 0) {
          animation.sourceResolution = resolution;
          animation.targetResolution = this.getResolutionForZoom(options.zoom);
          resolution = animation.targetResolution;
        } else if (options.resolution) {
          animation.sourceResolution = resolution;
          animation.targetResolution = options.resolution;
          resolution = animation.targetResolution;
        }
        if (options.rotation !== void 0) {
          animation.sourceRotation = rotation;
          var delta = modulo(options.rotation - rotation + Math.PI, 2 * Math.PI) - Math.PI;
          animation.targetRotation = rotation + delta;
          rotation = animation.targetRotation;
        }
        if (isNoopAnimation(animation)) {
          animation.complete = true;
        } else {
          start += animation.duration;
        }
        series.push(animation);
      }
      this.animations_.push(series);
      this.setHint(ViewHint.ANIMATING, 1);
      this.updateAnimations_();
    };
    View2.prototype.getAnimating = function() {
      return this.hints_[ViewHint.ANIMATING] > 0;
    };
    View2.prototype.getInteracting = function() {
      return this.hints_[ViewHint.INTERACTING] > 0;
    };
    View2.prototype.cancelAnimations = function() {
      this.setHint(ViewHint.ANIMATING, -this.hints_[ViewHint.ANIMATING]);
      var anchor;
      for (var i = 0, ii = this.animations_.length; i < ii; ++i) {
        var series = this.animations_[i];
        if (series[0].callback) {
          animationCallback(series[0].callback, false);
        }
        if (!anchor) {
          for (var j = 0, jj = series.length; j < jj; ++j) {
            var animation = series[j];
            if (!animation.complete) {
              anchor = animation.anchor;
              break;
            }
          }
        }
      }
      this.animations_.length = 0;
      this.cancelAnchor_ = anchor;
      this.nextCenter_ = null;
      this.nextResolution_ = NaN;
      this.nextRotation_ = NaN;
    };
    View2.prototype.updateAnimations_ = function() {
      if (this.updateAnimationKey_ !== void 0) {
        cancelAnimationFrame(this.updateAnimationKey_);
        this.updateAnimationKey_ = void 0;
      }
      if (!this.getAnimating()) {
        return;
      }
      var now = Date.now();
      var more = false;
      for (var i = this.animations_.length - 1; i >= 0; --i) {
        var series = this.animations_[i];
        var seriesComplete = true;
        for (var j = 0, jj = series.length; j < jj; ++j) {
          var animation = series[j];
          if (animation.complete) {
            continue;
          }
          var elapsed = now - animation.start;
          var fraction = animation.duration > 0 ? elapsed / animation.duration : 1;
          if (fraction >= 1) {
            animation.complete = true;
            fraction = 1;
          } else {
            seriesComplete = false;
          }
          var progress = animation.easing(fraction);
          if (animation.sourceCenter) {
            var x0 = animation.sourceCenter[0];
            var y0 = animation.sourceCenter[1];
            var x1 = animation.targetCenter[0];
            var y1 = animation.targetCenter[1];
            this.nextCenter_ = animation.targetCenter;
            var x = x0 + progress * (x1 - x0);
            var y = y0 + progress * (y1 - y0);
            this.targetCenter_ = [x, y];
          }
          if (animation.sourceResolution && animation.targetResolution) {
            var resolution = progress === 1 ? animation.targetResolution : animation.sourceResolution + progress * (animation.targetResolution - animation.sourceResolution);
            if (animation.anchor) {
              var size = this.getViewportSize_(this.getRotation());
              var constrainedResolution = this.constraints_.resolution(resolution, 0, size, true);
              this.targetCenter_ = this.calculateCenterZoom(constrainedResolution, animation.anchor);
            }
            this.nextResolution_ = animation.targetResolution;
            this.targetResolution_ = resolution;
            this.applyTargetState_(true);
          }
          if (animation.sourceRotation !== void 0 && animation.targetRotation !== void 0) {
            var rotation = progress === 1 ? modulo(animation.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : animation.sourceRotation + progress * (animation.targetRotation - animation.sourceRotation);
            if (animation.anchor) {
              var constrainedRotation = this.constraints_.rotation(rotation, true);
              this.targetCenter_ = this.calculateCenterRotate(constrainedRotation, animation.anchor);
            }
            this.nextRotation_ = animation.targetRotation;
            this.targetRotation_ = rotation;
          }
          this.applyTargetState_(true);
          more = true;
          if (!animation.complete) {
            break;
          }
        }
        if (seriesComplete) {
          this.animations_[i] = null;
          this.setHint(ViewHint.ANIMATING, -1);
          this.nextCenter_ = null;
          this.nextResolution_ = NaN;
          this.nextRotation_ = NaN;
          var callback = series[0].callback;
          if (callback) {
            animationCallback(callback, true);
          }
        }
      }
      this.animations_ = this.animations_.filter(Boolean);
      if (more && this.updateAnimationKey_ === void 0) {
        this.updateAnimationKey_ = requestAnimationFrame(this.updateAnimations_.bind(this));
      }
    };
    View2.prototype.calculateCenterRotate = function(rotation, anchor) {
      var center;
      var currentCenter = this.getCenterInternal();
      if (currentCenter !== void 0) {
        center = [currentCenter[0] - anchor[0], currentCenter[1] - anchor[1]];
        rotate$1(center, rotation - this.getRotation());
        add(center, anchor);
      }
      return center;
    };
    View2.prototype.calculateCenterZoom = function(resolution, anchor) {
      var center;
      var currentCenter = this.getCenterInternal();
      var currentResolution = this.getResolution();
      if (currentCenter !== void 0 && currentResolution !== void 0) {
        var x = anchor[0] - resolution * (anchor[0] - currentCenter[0]) / currentResolution;
        var y = anchor[1] - resolution * (anchor[1] - currentCenter[1]) / currentResolution;
        center = [x, y];
      }
      return center;
    };
    View2.prototype.getViewportSize_ = function(opt_rotation) {
      var size = this.viewportSize_;
      if (opt_rotation) {
        var w = size[0];
        var h = size[1];
        return [
          Math.abs(w * Math.cos(opt_rotation)) + Math.abs(h * Math.sin(opt_rotation)),
          Math.abs(w * Math.sin(opt_rotation)) + Math.abs(h * Math.cos(opt_rotation))
        ];
      } else {
        return size;
      }
    };
    View2.prototype.setViewportSize = function(opt_size) {
      this.viewportSize_ = Array.isArray(opt_size) ? opt_size.slice() : [100, 100];
      if (!this.getAnimating()) {
        this.resolveConstraints(0);
      }
    };
    View2.prototype.getCenter = function() {
      var center = this.getCenterInternal();
      if (!center) {
        return center;
      }
      return toUserCoordinate(center, this.getProjection());
    };
    View2.prototype.getCenterInternal = function() {
      return this.get(ViewProperty.CENTER);
    };
    View2.prototype.getConstraints = function() {
      return this.constraints_;
    };
    View2.prototype.getConstrainResolution = function() {
      return this.options_.constrainResolution;
    };
    View2.prototype.getHints = function(opt_hints) {
      if (opt_hints !== void 0) {
        opt_hints[0] = this.hints_[0];
        opt_hints[1] = this.hints_[1];
        return opt_hints;
      } else {
        return this.hints_.slice();
      }
    };
    View2.prototype.calculateExtent = function(opt_size) {
      var extent = this.calculateExtentInternal(opt_size);
      return toUserExtent(extent, this.getProjection());
    };
    View2.prototype.calculateExtentInternal = function(opt_size) {
      var size = opt_size || this.getViewportSizeMinusPadding_();
      var center = this.getCenterInternal();
      assert(center, 1);
      var resolution = this.getResolution();
      assert(resolution !== void 0, 2);
      var rotation = this.getRotation();
      assert(rotation !== void 0, 3);
      return getForViewAndSize(center, resolution, rotation, size);
    };
    View2.prototype.getMaxResolution = function() {
      return this.maxResolution_;
    };
    View2.prototype.getMinResolution = function() {
      return this.minResolution_;
    };
    View2.prototype.getMaxZoom = function() {
      return this.getZoomForResolution(this.minResolution_);
    };
    View2.prototype.setMaxZoom = function(zoom) {
      this.applyOptions_(this.getUpdatedOptions_({ maxZoom: zoom }));
    };
    View2.prototype.getMinZoom = function() {
      return this.getZoomForResolution(this.maxResolution_);
    };
    View2.prototype.setMinZoom = function(zoom) {
      this.applyOptions_(this.getUpdatedOptions_({ minZoom: zoom }));
    };
    View2.prototype.setConstrainResolution = function(enabled) {
      this.applyOptions_(this.getUpdatedOptions_({ constrainResolution: enabled }));
    };
    View2.prototype.getProjection = function() {
      return this.projection_;
    };
    View2.prototype.getResolution = function() {
      return this.get(ViewProperty.RESOLUTION);
    };
    View2.prototype.getResolutions = function() {
      return this.resolutions_;
    };
    View2.prototype.getResolutionForExtent = function(extent, opt_size) {
      return this.getResolutionForExtentInternal(fromUserExtent(extent, this.getProjection()), opt_size);
    };
    View2.prototype.getResolutionForExtentInternal = function(extent, opt_size) {
      var size = opt_size || this.getViewportSizeMinusPadding_();
      var xResolution = getWidth(extent) / size[0];
      var yResolution = getHeight(extent) / size[1];
      return Math.max(xResolution, yResolution);
    };
    View2.prototype.getResolutionForValueFunction = function(opt_power) {
      var power = opt_power || 2;
      var maxResolution = this.getConstrainedResolution(this.maxResolution_);
      var minResolution = this.minResolution_;
      var max = Math.log(maxResolution / minResolution) / Math.log(power);
      return function(value) {
        var resolution = maxResolution / Math.pow(power, value * max);
        return resolution;
      };
    };
    View2.prototype.getRotation = function() {
      return this.get(ViewProperty.ROTATION);
    };
    View2.prototype.getValueForResolutionFunction = function(opt_power) {
      var logPower = Math.log(opt_power || 2);
      var maxResolution = this.getConstrainedResolution(this.maxResolution_);
      var minResolution = this.minResolution_;
      var max = Math.log(maxResolution / minResolution) / logPower;
      return function(resolution) {
        var value = Math.log(maxResolution / resolution) / logPower / max;
        return value;
      };
    };
    View2.prototype.getViewportSizeMinusPadding_ = function(opt_rotation) {
      var size = this.getViewportSize_(opt_rotation);
      var padding = this.padding_;
      if (padding) {
        size = [
          size[0] - padding[1] - padding[3],
          size[1] - padding[0] - padding[2]
        ];
      }
      return size;
    };
    View2.prototype.getState = function() {
      var projection = this.getProjection();
      var resolution = this.getResolution();
      var rotation = this.getRotation();
      var center = this.getCenterInternal();
      var padding = this.padding_;
      if (padding) {
        var reducedSize = this.getViewportSizeMinusPadding_();
        center = calculateCenterOn(center, this.getViewportSize_(), [reducedSize[0] / 2 + padding[3], reducedSize[1] / 2 + padding[0]], resolution, rotation);
      }
      return {
        center: center.slice(0),
        projection: projection !== void 0 ? projection : null,
        resolution,
        nextCenter: this.nextCenter_,
        nextResolution: this.nextResolution_,
        nextRotation: this.nextRotation_,
        rotation,
        zoom: this.getZoom()
      };
    };
    View2.prototype.getZoom = function() {
      var zoom;
      var resolution = this.getResolution();
      if (resolution !== void 0) {
        zoom = this.getZoomForResolution(resolution);
      }
      return zoom;
    };
    View2.prototype.getZoomForResolution = function(resolution) {
      var offset = this.minZoom_ || 0;
      var max, zoomFactor;
      if (this.resolutions_) {
        var nearest = linearFindNearest(this.resolutions_, resolution, 1);
        offset = nearest;
        max = this.resolutions_[nearest];
        if (nearest == this.resolutions_.length - 1) {
          zoomFactor = 2;
        } else {
          zoomFactor = max / this.resolutions_[nearest + 1];
        }
      } else {
        max = this.maxResolution_;
        zoomFactor = this.zoomFactor_;
      }
      return offset + Math.log(max / resolution) / Math.log(zoomFactor);
    };
    View2.prototype.getResolutionForZoom = function(zoom) {
      if (this.resolutions_) {
        if (this.resolutions_.length <= 1) {
          return 0;
        }
        var baseLevel = clamp(Math.floor(zoom), 0, this.resolutions_.length - 2);
        var zoomFactor = this.resolutions_[baseLevel] / this.resolutions_[baseLevel + 1];
        return this.resolutions_[baseLevel] / Math.pow(zoomFactor, clamp(zoom - baseLevel, 0, 1));
      } else {
        return this.maxResolution_ / Math.pow(this.zoomFactor_, zoom - this.minZoom_);
      }
    };
    View2.prototype.fit = function(geometryOrExtent, opt_options) {
      var geometry;
      assert(Array.isArray(geometryOrExtent) || typeof geometryOrExtent.getSimplifiedGeometry === "function", 24);
      if (Array.isArray(geometryOrExtent)) {
        assert(!isEmpty(geometryOrExtent), 25);
        var extent = fromUserExtent(geometryOrExtent, this.getProjection());
        geometry = fromExtent(extent);
      } else if (geometryOrExtent.getType() === GeometryType.CIRCLE) {
        var extent = fromUserExtent(geometryOrExtent.getExtent(), this.getProjection());
        geometry = fromExtent(extent);
        geometry.rotate(this.getRotation(), getCenter(extent));
      } else {
        var userProjection2 = getUserProjection();
        if (userProjection2) {
          geometry = geometryOrExtent.clone().transform(userProjection2, this.getProjection());
        } else {
          geometry = geometryOrExtent;
        }
      }
      this.fitInternal(geometry, opt_options);
    };
    View2.prototype.rotatedExtentForGeometry = function(geometry) {
      var rotation = this.getRotation();
      var cosAngle = Math.cos(rotation);
      var sinAngle = Math.sin(-rotation);
      var coords = geometry.getFlatCoordinates();
      var stride = geometry.getStride();
      var minRotX = Infinity;
      var minRotY = Infinity;
      var maxRotX = -Infinity;
      var maxRotY = -Infinity;
      for (var i = 0, ii = coords.length; i < ii; i += stride) {
        var rotX = coords[i] * cosAngle - coords[i + 1] * sinAngle;
        var rotY = coords[i] * sinAngle + coords[i + 1] * cosAngle;
        minRotX = Math.min(minRotX, rotX);
        minRotY = Math.min(minRotY, rotY);
        maxRotX = Math.max(maxRotX, rotX);
        maxRotY = Math.max(maxRotY, rotY);
      }
      return [minRotX, minRotY, maxRotX, maxRotY];
    };
    View2.prototype.fitInternal = function(geometry, opt_options) {
      var options = opt_options || {};
      var size = options.size;
      if (!size) {
        size = this.getViewportSizeMinusPadding_();
      }
      var padding = options.padding !== void 0 ? options.padding : [0, 0, 0, 0];
      var nearest = options.nearest !== void 0 ? options.nearest : false;
      var minResolution;
      if (options.minResolution !== void 0) {
        minResolution = options.minResolution;
      } else if (options.maxZoom !== void 0) {
        minResolution = this.getResolutionForZoom(options.maxZoom);
      } else {
        minResolution = 0;
      }
      var rotatedExtent = this.rotatedExtentForGeometry(geometry);
      var resolution = this.getResolutionForExtentInternal(rotatedExtent, [
        size[0] - padding[1] - padding[3],
        size[1] - padding[0] - padding[2]
      ]);
      resolution = isNaN(resolution) ? minResolution : Math.max(resolution, minResolution);
      resolution = this.getConstrainedResolution(resolution, nearest ? 0 : 1);
      var rotation = this.getRotation();
      var sinAngle = Math.sin(rotation);
      var cosAngle = Math.cos(rotation);
      var centerRot = getCenter(rotatedExtent);
      centerRot[0] += (padding[1] - padding[3]) / 2 * resolution;
      centerRot[1] += (padding[0] - padding[2]) / 2 * resolution;
      var centerX = centerRot[0] * cosAngle - centerRot[1] * sinAngle;
      var centerY = centerRot[1] * cosAngle + centerRot[0] * sinAngle;
      var center = this.getConstrainedCenter([centerX, centerY], resolution);
      var callback = options.callback ? options.callback : VOID;
      if (options.duration !== void 0) {
        this.animateInternal({
          resolution,
          center,
          duration: options.duration,
          easing: options.easing
        }, callback);
      } else {
        this.targetResolution_ = resolution;
        this.targetCenter_ = center;
        this.applyTargetState_(false, true);
        animationCallback(callback, true);
      }
    };
    View2.prototype.centerOn = function(coordinate, size, position) {
      this.centerOnInternal(fromUserCoordinate(coordinate, this.getProjection()), size, position);
    };
    View2.prototype.centerOnInternal = function(coordinate, size, position) {
      this.setCenterInternal(calculateCenterOn(coordinate, size, position, this.getResolution(), this.getRotation()));
    };
    View2.prototype.calculateCenterShift = function(center, resolution, rotation, size) {
      var centerShift;
      var padding = this.padding_;
      if (padding && center) {
        var reducedSize = this.getViewportSizeMinusPadding_(-rotation);
        var shiftedCenter = calculateCenterOn(center, size, [reducedSize[0] / 2 + padding[3], reducedSize[1] / 2 + padding[0]], resolution, rotation);
        centerShift = [
          center[0] - shiftedCenter[0],
          center[1] - shiftedCenter[1]
        ];
      }
      return centerShift;
    };
    View2.prototype.isDef = function() {
      return !!this.getCenterInternal() && this.getResolution() !== void 0;
    };
    View2.prototype.adjustCenter = function(deltaCoordinates) {
      var center = toUserCoordinate(this.targetCenter_, this.getProjection());
      this.setCenter([
        center[0] + deltaCoordinates[0],
        center[1] + deltaCoordinates[1]
      ]);
    };
    View2.prototype.adjustCenterInternal = function(deltaCoordinates) {
      var center = this.targetCenter_;
      this.setCenterInternal([
        center[0] + deltaCoordinates[0],
        center[1] + deltaCoordinates[1]
      ]);
    };
    View2.prototype.adjustResolution = function(ratio, opt_anchor) {
      var anchor = opt_anchor && fromUserCoordinate(opt_anchor, this.getProjection());
      this.adjustResolutionInternal(ratio, anchor);
    };
    View2.prototype.adjustResolutionInternal = function(ratio, opt_anchor) {
      var isMoving = this.getAnimating() || this.getInteracting();
      var size = this.getViewportSize_(this.getRotation());
      var newResolution = this.constraints_.resolution(this.targetResolution_ * ratio, 0, size, isMoving);
      if (opt_anchor) {
        this.targetCenter_ = this.calculateCenterZoom(newResolution, opt_anchor);
      }
      this.targetResolution_ *= ratio;
      this.applyTargetState_();
    };
    View2.prototype.adjustZoom = function(delta, opt_anchor) {
      this.adjustResolution(Math.pow(this.zoomFactor_, -delta), opt_anchor);
    };
    View2.prototype.adjustRotation = function(delta, opt_anchor) {
      if (opt_anchor) {
        opt_anchor = fromUserCoordinate(opt_anchor, this.getProjection());
      }
      this.adjustRotationInternal(delta, opt_anchor);
    };
    View2.prototype.adjustRotationInternal = function(delta, opt_anchor) {
      var isMoving = this.getAnimating() || this.getInteracting();
      var newRotation = this.constraints_.rotation(this.targetRotation_ + delta, isMoving);
      if (opt_anchor) {
        this.targetCenter_ = this.calculateCenterRotate(newRotation, opt_anchor);
      }
      this.targetRotation_ += delta;
      this.applyTargetState_();
    };
    View2.prototype.setCenter = function(center) {
      this.setCenterInternal(fromUserCoordinate(center, this.getProjection()));
    };
    View2.prototype.setCenterInternal = function(center) {
      this.targetCenter_ = center;
      this.applyTargetState_();
    };
    View2.prototype.setHint = function(hint, delta) {
      this.hints_[hint] += delta;
      this.changed();
      return this.hints_[hint];
    };
    View2.prototype.setResolution = function(resolution) {
      this.targetResolution_ = resolution;
      this.applyTargetState_();
    };
    View2.prototype.setRotation = function(rotation) {
      this.targetRotation_ = rotation;
      this.applyTargetState_();
    };
    View2.prototype.setZoom = function(zoom) {
      this.setResolution(this.getResolutionForZoom(zoom));
    };
    View2.prototype.applyTargetState_ = function(opt_doNotCancelAnims, opt_forceMoving) {
      var isMoving = this.getAnimating() || this.getInteracting() || opt_forceMoving;
      var newRotation = this.constraints_.rotation(this.targetRotation_, isMoving);
      var size = this.getViewportSize_(newRotation);
      var newResolution = this.constraints_.resolution(this.targetResolution_, 0, size, isMoving);
      var newCenter = this.constraints_.center(this.targetCenter_, newResolution, size, isMoving, this.calculateCenterShift(this.targetCenter_, newResolution, newRotation, size));
      if (this.get(ViewProperty.ROTATION) !== newRotation) {
        this.set(ViewProperty.ROTATION, newRotation);
      }
      if (this.get(ViewProperty.RESOLUTION) !== newResolution) {
        this.set(ViewProperty.RESOLUTION, newResolution);
      }
      if (!this.get(ViewProperty.CENTER) || !equals(this.get(ViewProperty.CENTER), newCenter)) {
        this.set(ViewProperty.CENTER, newCenter);
      }
      if (this.getAnimating() && !opt_doNotCancelAnims) {
        this.cancelAnimations();
      }
      this.cancelAnchor_ = void 0;
    };
    View2.prototype.resolveConstraints = function(opt_duration, opt_resolutionDirection, opt_anchor) {
      var duration = opt_duration !== void 0 ? opt_duration : 200;
      var direction = opt_resolutionDirection || 0;
      var newRotation = this.constraints_.rotation(this.targetRotation_);
      var size = this.getViewportSize_(newRotation);
      var newResolution = this.constraints_.resolution(this.targetResolution_, direction, size);
      var newCenter = this.constraints_.center(this.targetCenter_, newResolution, size, false, this.calculateCenterShift(this.targetCenter_, newResolution, newRotation, size));
      if (duration === 0 && !this.cancelAnchor_) {
        this.targetResolution_ = newResolution;
        this.targetRotation_ = newRotation;
        this.targetCenter_ = newCenter;
        this.applyTargetState_();
        return;
      }
      var anchor = opt_anchor || (duration === 0 ? this.cancelAnchor_ : void 0);
      this.cancelAnchor_ = void 0;
      if (this.getResolution() !== newResolution || this.getRotation() !== newRotation || !this.getCenterInternal() || !equals(this.getCenterInternal(), newCenter)) {
        if (this.getAnimating()) {
          this.cancelAnimations();
        }
        this.animateInternal({
          rotation: newRotation,
          center: newCenter,
          resolution: newResolution,
          duration,
          easing: easeOut,
          anchor
        });
      }
    };
    View2.prototype.beginInteraction = function() {
      this.resolveConstraints(0);
      this.setHint(ViewHint.INTERACTING, 1);
    };
    View2.prototype.endInteraction = function(opt_duration, opt_resolutionDirection, opt_anchor) {
      var anchor = opt_anchor && fromUserCoordinate(opt_anchor, this.getProjection());
      this.endInteractionInternal(opt_duration, opt_resolutionDirection, anchor);
    };
    View2.prototype.endInteractionInternal = function(opt_duration, opt_resolutionDirection, opt_anchor) {
      this.setHint(ViewHint.INTERACTING, -1);
      this.resolveConstraints(opt_duration, opt_resolutionDirection, opt_anchor);
    };
    View2.prototype.getConstrainedCenter = function(targetCenter, opt_targetResolution) {
      var size = this.getViewportSize_(this.getRotation());
      return this.constraints_.center(targetCenter, opt_targetResolution || this.getResolution(), size);
    };
    View2.prototype.getConstrainedZoom = function(targetZoom, opt_direction) {
      var targetRes = this.getResolutionForZoom(targetZoom);
      return this.getZoomForResolution(this.getConstrainedResolution(targetRes, opt_direction));
    };
    View2.prototype.getConstrainedResolution = function(targetResolution, opt_direction) {
      var direction = opt_direction || 0;
      var size = this.getViewportSize_(this.getRotation());
      return this.constraints_.resolution(targetResolution, direction, size);
    };
    return View2;
  }(BaseObject$1);
  function animationCallback(callback, returnValue) {
    setTimeout(function() {
      callback(returnValue);
    }, 0);
  }
  function createCenterConstraint(options) {
    if (options.extent !== void 0) {
      var smooth = options.smoothExtentConstraint !== void 0 ? options.smoothExtentConstraint : true;
      return createExtent(options.extent, options.constrainOnlyCenter, smooth);
    }
    var projection = createProjection(options.projection, "EPSG:3857");
    if (options.multiWorld !== true && projection.isGlobal()) {
      var extent = projection.getExtent().slice();
      extent[0] = -Infinity;
      extent[2] = Infinity;
      return createExtent(extent, false, false);
    }
    return none$1;
  }
  function createResolutionConstraint(options) {
    var resolutionConstraint;
    var maxResolution;
    var minResolution;
    var defaultMaxZoom = 28;
    var defaultZoomFactor = 2;
    var minZoom = options.minZoom !== void 0 ? options.minZoom : DEFAULT_MIN_ZOOM;
    var maxZoom = options.maxZoom !== void 0 ? options.maxZoom : defaultMaxZoom;
    var zoomFactor = options.zoomFactor !== void 0 ? options.zoomFactor : defaultZoomFactor;
    var multiWorld = options.multiWorld !== void 0 ? options.multiWorld : false;
    var smooth = options.smoothResolutionConstraint !== void 0 ? options.smoothResolutionConstraint : true;
    var showFullExtent = options.showFullExtent !== void 0 ? options.showFullExtent : false;
    var projection = createProjection(options.projection, "EPSG:3857");
    var projExtent = projection.getExtent();
    var constrainOnlyCenter = options.constrainOnlyCenter;
    var extent = options.extent;
    if (!multiWorld && !extent && projection.isGlobal()) {
      constrainOnlyCenter = false;
      extent = projExtent;
    }
    if (options.resolutions !== void 0) {
      var resolutions = options.resolutions;
      maxResolution = resolutions[minZoom];
      minResolution = resolutions[maxZoom] !== void 0 ? resolutions[maxZoom] : resolutions[resolutions.length - 1];
      if (options.constrainResolution) {
        resolutionConstraint = createSnapToResolutions(resolutions, smooth, !constrainOnlyCenter && extent, showFullExtent);
      } else {
        resolutionConstraint = createMinMaxResolution(maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
      }
    } else {
      var size = !projExtent ? 360 * METERS_PER_UNIT$1[Units$1.DEGREES] / projection.getMetersPerUnit() : Math.max(getWidth(projExtent), getHeight(projExtent));
      var defaultMaxResolution = size / DEFAULT_TILE_SIZE / Math.pow(defaultZoomFactor, DEFAULT_MIN_ZOOM);
      var defaultMinResolution = defaultMaxResolution / Math.pow(defaultZoomFactor, defaultMaxZoom - DEFAULT_MIN_ZOOM);
      maxResolution = options.maxResolution;
      if (maxResolution !== void 0) {
        minZoom = 0;
      } else {
        maxResolution = defaultMaxResolution / Math.pow(zoomFactor, minZoom);
      }
      minResolution = options.minResolution;
      if (minResolution === void 0) {
        if (options.maxZoom !== void 0) {
          if (options.maxResolution !== void 0) {
            minResolution = maxResolution / Math.pow(zoomFactor, maxZoom);
          } else {
            minResolution = defaultMaxResolution / Math.pow(zoomFactor, maxZoom);
          }
        } else {
          minResolution = defaultMinResolution;
        }
      }
      maxZoom = minZoom + Math.floor(Math.log(maxResolution / minResolution) / Math.log(zoomFactor));
      minResolution = maxResolution / Math.pow(zoomFactor, maxZoom - minZoom);
      if (options.constrainResolution) {
        resolutionConstraint = createSnapToPower(zoomFactor, maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
      } else {
        resolutionConstraint = createMinMaxResolution(maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
      }
    }
    return {
      constraint: resolutionConstraint,
      maxResolution,
      minResolution,
      minZoom,
      zoomFactor
    };
  }
  function createRotationConstraint(options) {
    var enableRotation = options.enableRotation !== void 0 ? options.enableRotation : true;
    if (enableRotation) {
      var constrainRotation = options.constrainRotation;
      if (constrainRotation === void 0 || constrainRotation === true) {
        return createSnapToZero();
      } else if (constrainRotation === false) {
        return none;
      } else if (typeof constrainRotation === "number") {
        return createSnapToN(constrainRotation);
      } else {
        return none;
      }
    } else {
      return disable;
    }
  }
  function isNoopAnimation(animation) {
    if (animation.sourceCenter && animation.targetCenter) {
      if (!equals(animation.sourceCenter, animation.targetCenter)) {
        return false;
      }
    }
    if (animation.sourceResolution !== animation.targetResolution) {
      return false;
    }
    if (animation.sourceRotation !== animation.targetRotation) {
      return false;
    }
    return true;
  }
  function calculateCenterOn(coordinate, size, position, resolution, rotation) {
    var cosAngle = Math.cos(-rotation);
    var sinAngle = Math.sin(-rotation);
    var rotX = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
    var rotY = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
    rotX += (size[0] / 2 - position[0]) * resolution;
    rotY += (position[1] - size[1] / 2) * resolution;
    sinAngle = -sinAngle;
    var centerX = rotX * cosAngle - rotY * sinAngle;
    var centerY = rotY * cosAngle + rotX * sinAngle;
    return [centerX, centerY];
  }
  var View$1 = View;
  var __extends$t = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var PluggableMap = function(_super) {
    __extends$t(PluggableMap2, _super);
    function PluggableMap2(options) {
      var _this = _super.call(this) || this;
      _this.on;
      _this.once;
      _this.un;
      var optionsInternal = createOptionsInternal(options);
      _this.boundHandleBrowserEvent_ = _this.handleBrowserEvent.bind(_this);
      _this.maxTilesLoading_ = options.maxTilesLoading !== void 0 ? options.maxTilesLoading : 16;
      _this.pixelRatio_ = options.pixelRatio !== void 0 ? options.pixelRatio : DEVICE_PIXEL_RATIO;
      _this.postRenderTimeoutHandle_;
      _this.animationDelayKey_;
      _this.animationDelay_ = function() {
        this.animationDelayKey_ = void 0;
        this.renderFrame_(Date.now());
      }.bind(_this);
      _this.coordinateToPixelTransform_ = create();
      _this.pixelToCoordinateTransform_ = create();
      _this.frameIndex_ = 0;
      _this.frameState_ = null;
      _this.previousExtent_ = null;
      _this.viewPropertyListenerKey_ = null;
      _this.viewChangeListenerKey_ = null;
      _this.layerGroupPropertyListenerKeys_ = null;
      _this.viewport_ = document.createElement("div");
      _this.viewport_.className = "ol-viewport" + ("ontouchstart" in window ? " ol-touch" : "");
      _this.viewport_.style.position = "relative";
      _this.viewport_.style.overflow = "hidden";
      _this.viewport_.style.width = "100%";
      _this.viewport_.style.height = "100%";
      _this.overlayContainer_ = document.createElement("div");
      _this.overlayContainer_.style.position = "absolute";
      _this.overlayContainer_.style.zIndex = "0";
      _this.overlayContainer_.style.width = "100%";
      _this.overlayContainer_.style.height = "100%";
      _this.overlayContainer_.style.pointerEvents = "none";
      _this.overlayContainer_.className = "ol-overlaycontainer";
      _this.viewport_.appendChild(_this.overlayContainer_);
      _this.overlayContainerStopEvent_ = document.createElement("div");
      _this.overlayContainerStopEvent_.style.position = "absolute";
      _this.overlayContainerStopEvent_.style.zIndex = "0";
      _this.overlayContainerStopEvent_.style.width = "100%";
      _this.overlayContainerStopEvent_.style.height = "100%";
      _this.overlayContainerStopEvent_.style.pointerEvents = "none";
      _this.overlayContainerStopEvent_.className = "ol-overlaycontainer-stopevent";
      _this.viewport_.appendChild(_this.overlayContainerStopEvent_);
      _this.mapBrowserEventHandler_ = null;
      _this.moveTolerance_ = options.moveTolerance;
      _this.keyboardEventTarget_ = optionsInternal.keyboardEventTarget;
      _this.keyHandlerKeys_ = null;
      _this.controls = optionsInternal.controls || new Collection$1();
      _this.interactions = optionsInternal.interactions || new Collection$1();
      _this.overlays_ = optionsInternal.overlays;
      _this.overlayIdIndex_ = {};
      _this.renderer_ = null;
      _this.handleResize_;
      _this.postRenderFunctions_ = [];
      _this.tileQueue_ = new TileQueue$1(_this.getTilePriority.bind(_this), _this.handleTileChange_.bind(_this));
      _this.addChangeListener(MapProperty.LAYERGROUP, _this.handleLayerGroupChanged_);
      _this.addChangeListener(MapProperty.VIEW, _this.handleViewChanged_);
      _this.addChangeListener(MapProperty.SIZE, _this.handleSizeChanged_);
      _this.addChangeListener(MapProperty.TARGET, _this.handleTargetChanged_);
      _this.setProperties(optionsInternal.values);
      var map = _this;
      if (options.view && !(options.view instanceof View$1)) {
        options.view.then(function(viewOptions) {
          map.setView(new View$1(viewOptions));
        });
      }
      _this.controls.addEventListener(CollectionEventType.ADD, function(event) {
        event.element.setMap(this);
      }.bind(_this));
      _this.controls.addEventListener(CollectionEventType.REMOVE, function(event) {
        event.element.setMap(null);
      }.bind(_this));
      _this.interactions.addEventListener(CollectionEventType.ADD, function(event) {
        event.element.setMap(this);
      }.bind(_this));
      _this.interactions.addEventListener(CollectionEventType.REMOVE, function(event) {
        event.element.setMap(null);
      }.bind(_this));
      _this.overlays_.addEventListener(CollectionEventType.ADD, function(event) {
        this.addOverlayInternal_(event.element);
      }.bind(_this));
      _this.overlays_.addEventListener(CollectionEventType.REMOVE, function(event) {
        var overlay = event.element;
        var id = overlay.getId();
        if (id !== void 0) {
          delete this.overlayIdIndex_[id.toString()];
        }
        event.element.setMap(null);
      }.bind(_this));
      _this.controls.forEach(function(control) {
        control.setMap(this);
      }.bind(_this));
      _this.interactions.forEach(function(interaction) {
        interaction.setMap(this);
      }.bind(_this));
      _this.overlays_.forEach(_this.addOverlayInternal_.bind(_this));
      return _this;
    }
    PluggableMap2.prototype.createRenderer = function() {
      throw new Error("Use a map type that has a createRenderer method");
    };
    PluggableMap2.prototype.addControl = function(control) {
      this.getControls().push(control);
    };
    PluggableMap2.prototype.addInteraction = function(interaction) {
      this.getInteractions().push(interaction);
    };
    PluggableMap2.prototype.addLayer = function(layer) {
      var layers = this.getLayerGroup().getLayers();
      layers.push(layer);
    };
    PluggableMap2.prototype.addOverlay = function(overlay) {
      this.getOverlays().push(overlay);
    };
    PluggableMap2.prototype.addOverlayInternal_ = function(overlay) {
      var id = overlay.getId();
      if (id !== void 0) {
        this.overlayIdIndex_[id.toString()] = overlay;
      }
      overlay.setMap(this);
    };
    PluggableMap2.prototype.disposeInternal = function() {
      this.setTarget(null);
      _super.prototype.disposeInternal.call(this);
    };
    PluggableMap2.prototype.forEachFeatureAtPixel = function(pixel, callback, opt_options) {
      if (!this.frameState_) {
        return;
      }
      var coordinate = this.getCoordinateFromPixelInternal(pixel);
      opt_options = opt_options !== void 0 ? opt_options : {};
      var hitTolerance = opt_options.hitTolerance !== void 0 ? opt_options.hitTolerance : 0;
      var layerFilter = opt_options.layerFilter !== void 0 ? opt_options.layerFilter : TRUE;
      var checkWrapped = opt_options.checkWrapped !== false;
      return this.renderer_.forEachFeatureAtCoordinate(coordinate, this.frameState_, hitTolerance, checkWrapped, callback, null, layerFilter, null);
    };
    PluggableMap2.prototype.getFeaturesAtPixel = function(pixel, opt_options) {
      var features = [];
      this.forEachFeatureAtPixel(pixel, function(feature) {
        features.push(feature);
      }, opt_options);
      return features;
    };
    PluggableMap2.prototype.forEachLayerAtPixel = function(pixel, callback, opt_options) {
      if (!this.frameState_) {
        return;
      }
      var options = opt_options || {};
      var hitTolerance = options.hitTolerance !== void 0 ? options.hitTolerance : 0;
      var layerFilter = options.layerFilter || TRUE;
      return this.renderer_.forEachLayerAtPixel(pixel, this.frameState_, hitTolerance, callback, layerFilter);
    };
    PluggableMap2.prototype.hasFeatureAtPixel = function(pixel, opt_options) {
      if (!this.frameState_) {
        return false;
      }
      var coordinate = this.getCoordinateFromPixelInternal(pixel);
      opt_options = opt_options !== void 0 ? opt_options : {};
      var layerFilter = opt_options.layerFilter !== void 0 ? opt_options.layerFilter : TRUE;
      var hitTolerance = opt_options.hitTolerance !== void 0 ? opt_options.hitTolerance : 0;
      var checkWrapped = opt_options.checkWrapped !== false;
      return this.renderer_.hasFeatureAtCoordinate(coordinate, this.frameState_, hitTolerance, checkWrapped, layerFilter, null);
    };
    PluggableMap2.prototype.getEventCoordinate = function(event) {
      return this.getCoordinateFromPixel(this.getEventPixel(event));
    };
    PluggableMap2.prototype.getEventCoordinateInternal = function(event) {
      return this.getCoordinateFromPixelInternal(this.getEventPixel(event));
    };
    PluggableMap2.prototype.getEventPixel = function(event) {
      var viewportPosition = this.viewport_.getBoundingClientRect();
      var eventPosition = "changedTouches" in event ? event.changedTouches[0] : event;
      return [
        eventPosition.clientX - viewportPosition.left,
        eventPosition.clientY - viewportPosition.top
      ];
    };
    PluggableMap2.prototype.getTarget = function() {
      return this.get(MapProperty.TARGET);
    };
    PluggableMap2.prototype.getTargetElement = function() {
      var target = this.getTarget();
      if (target !== void 0) {
        return typeof target === "string" ? document.getElementById(target) : target;
      } else {
        return null;
      }
    };
    PluggableMap2.prototype.getCoordinateFromPixel = function(pixel) {
      return toUserCoordinate(this.getCoordinateFromPixelInternal(pixel), this.getView().getProjection());
    };
    PluggableMap2.prototype.getCoordinateFromPixelInternal = function(pixel) {
      var frameState = this.frameState_;
      if (!frameState) {
        return null;
      } else {
        return apply(frameState.pixelToCoordinateTransform, pixel.slice());
      }
    };
    PluggableMap2.prototype.getControls = function() {
      return this.controls;
    };
    PluggableMap2.prototype.getOverlays = function() {
      return this.overlays_;
    };
    PluggableMap2.prototype.getOverlayById = function(id) {
      var overlay = this.overlayIdIndex_[id.toString()];
      return overlay !== void 0 ? overlay : null;
    };
    PluggableMap2.prototype.getInteractions = function() {
      return this.interactions;
    };
    PluggableMap2.prototype.getLayerGroup = function() {
      return this.get(MapProperty.LAYERGROUP);
    };
    PluggableMap2.prototype.setLayers = function(layers) {
      var group = this.getLayerGroup();
      if (layers instanceof Collection$1) {
        group.setLayers(layers);
        return;
      }
      var collection = group.getLayers();
      collection.clear();
      collection.extend(layers);
    };
    PluggableMap2.prototype.getLayers = function() {
      var layers = this.getLayerGroup().getLayers();
      return layers;
    };
    PluggableMap2.prototype.getLoading = function() {
      var layerStatesArray = this.getLayerGroup().getLayerStatesArray();
      for (var i = 0, ii = layerStatesArray.length; i < ii; ++i) {
        var layer = layerStatesArray[i].layer;
        var source = layer.getSource();
        if (source && source.loading) {
          return true;
        }
      }
      return false;
    };
    PluggableMap2.prototype.getPixelFromCoordinate = function(coordinate) {
      var viewCoordinate = fromUserCoordinate(coordinate, this.getView().getProjection());
      return this.getPixelFromCoordinateInternal(viewCoordinate);
    };
    PluggableMap2.prototype.getPixelFromCoordinateInternal = function(coordinate) {
      var frameState = this.frameState_;
      if (!frameState) {
        return null;
      } else {
        return apply(frameState.coordinateToPixelTransform, coordinate.slice(0, 2));
      }
    };
    PluggableMap2.prototype.getRenderer = function() {
      return this.renderer_;
    };
    PluggableMap2.prototype.getSize = function() {
      return this.get(MapProperty.SIZE);
    };
    PluggableMap2.prototype.getView = function() {
      return this.get(MapProperty.VIEW);
    };
    PluggableMap2.prototype.getViewport = function() {
      return this.viewport_;
    };
    PluggableMap2.prototype.getOverlayContainer = function() {
      return this.overlayContainer_;
    };
    PluggableMap2.prototype.getOverlayContainerStopEvent = function() {
      return this.overlayContainerStopEvent_;
    };
    PluggableMap2.prototype.getOwnerDocument = function() {
      var targetElement = this.getTargetElement();
      return targetElement ? targetElement.ownerDocument : document;
    };
    PluggableMap2.prototype.getTilePriority = function(tile, tileSourceKey, tileCenter, tileResolution) {
      return getTilePriority(this.frameState_, tile, tileSourceKey, tileCenter, tileResolution);
    };
    PluggableMap2.prototype.handleBrowserEvent = function(browserEvent, opt_type) {
      var type = opt_type || browserEvent.type;
      var mapBrowserEvent = new MapBrowserEvent$1(type, this, browserEvent);
      this.handleMapBrowserEvent(mapBrowserEvent);
    };
    PluggableMap2.prototype.handleMapBrowserEvent = function(mapBrowserEvent) {
      if (!this.frameState_) {
        return;
      }
      var originalEvent = mapBrowserEvent.originalEvent;
      var eventType = originalEvent.type;
      if (eventType === PointerEventType.POINTERDOWN || eventType === EventType.WHEEL || eventType === EventType.KEYDOWN) {
        var doc = this.getOwnerDocument();
        var rootNode = this.viewport_.getRootNode ? this.viewport_.getRootNode() : doc;
        var target = originalEvent.target;
        if (this.overlayContainerStopEvent_.contains(target) || !(rootNode === doc ? doc.documentElement : rootNode).contains(target)) {
          return;
        }
      }
      mapBrowserEvent.frameState = this.frameState_;
      if (this.dispatchEvent(mapBrowserEvent) !== false) {
        var interactionsArray = this.getInteractions().getArray().slice();
        for (var i = interactionsArray.length - 1; i >= 0; i--) {
          var interaction = interactionsArray[i];
          if (interaction.getMap() !== this || !interaction.getActive() || !this.getTargetElement()) {
            continue;
          }
          var cont = interaction.handleEvent(mapBrowserEvent);
          if (!cont || mapBrowserEvent.propagationStopped) {
            break;
          }
        }
      }
    };
    PluggableMap2.prototype.handlePostRender = function() {
      var frameState = this.frameState_;
      var tileQueue = this.tileQueue_;
      if (!tileQueue.isEmpty()) {
        var maxTotalLoading = this.maxTilesLoading_;
        var maxNewLoads = maxTotalLoading;
        if (frameState) {
          var hints = frameState.viewHints;
          if (hints[ViewHint.ANIMATING] || hints[ViewHint.INTERACTING]) {
            var lowOnFrameBudget = Date.now() - frameState.time > 8;
            maxTotalLoading = lowOnFrameBudget ? 0 : 8;
            maxNewLoads = lowOnFrameBudget ? 0 : 2;
          }
        }
        if (tileQueue.getTilesLoading() < maxTotalLoading) {
          tileQueue.reprioritize();
          tileQueue.loadMoreTiles(maxTotalLoading, maxNewLoads);
        }
      }
      if (frameState && this.hasListener(RenderEventType.RENDERCOMPLETE) && !frameState.animate && !this.tileQueue_.getTilesLoading() && !this.getLoading()) {
        this.renderer_.dispatchRenderEvent(RenderEventType.RENDERCOMPLETE, frameState);
      }
      var postRenderFunctions = this.postRenderFunctions_;
      for (var i = 0, ii = postRenderFunctions.length; i < ii; ++i) {
        postRenderFunctions[i](this, frameState);
      }
      postRenderFunctions.length = 0;
    };
    PluggableMap2.prototype.handleSizeChanged_ = function() {
      if (this.getView() && !this.getView().getAnimating()) {
        this.getView().resolveConstraints(0);
      }
      this.render();
    };
    PluggableMap2.prototype.handleTargetChanged_ = function() {
      var targetElement;
      if (this.getTarget()) {
        targetElement = this.getTargetElement();
      }
      if (this.mapBrowserEventHandler_) {
        for (var i = 0, ii = this.keyHandlerKeys_.length; i < ii; ++i) {
          unlistenByKey(this.keyHandlerKeys_[i]);
        }
        this.keyHandlerKeys_ = null;
        this.viewport_.removeEventListener(EventType.CONTEXTMENU, this.boundHandleBrowserEvent_);
        this.viewport_.removeEventListener(EventType.WHEEL, this.boundHandleBrowserEvent_);
        if (this.handleResize_ !== void 0) {
          removeEventListener(EventType.RESIZE, this.handleResize_, false);
          this.handleResize_ = void 0;
        }
        this.mapBrowserEventHandler_.dispose();
        this.mapBrowserEventHandler_ = null;
        removeNode(this.viewport_);
      }
      if (!targetElement) {
        if (this.renderer_) {
          clearTimeout(this.postRenderTimeoutHandle_);
          this.postRenderTimeoutHandle_ = void 0;
          this.postRenderFunctions_.length = 0;
          this.renderer_.dispose();
          this.renderer_ = null;
        }
        if (this.animationDelayKey_) {
          cancelAnimationFrame(this.animationDelayKey_);
          this.animationDelayKey_ = void 0;
        }
      } else {
        targetElement.appendChild(this.viewport_);
        if (!this.renderer_) {
          this.renderer_ = this.createRenderer();
        }
        this.mapBrowserEventHandler_ = new MapBrowserEventHandler$1(this, this.moveTolerance_);
        for (var key in MapBrowserEventType) {
          this.mapBrowserEventHandler_.addEventListener(MapBrowserEventType[key], this.handleMapBrowserEvent.bind(this));
        }
        this.viewport_.addEventListener(EventType.CONTEXTMENU, this.boundHandleBrowserEvent_, false);
        this.viewport_.addEventListener(EventType.WHEEL, this.boundHandleBrowserEvent_, PASSIVE_EVENT_LISTENERS ? { passive: false } : false);
        var keyboardEventTarget = !this.keyboardEventTarget_ ? targetElement : this.keyboardEventTarget_;
        this.keyHandlerKeys_ = [
          listen(keyboardEventTarget, EventType.KEYDOWN, this.handleBrowserEvent, this),
          listen(keyboardEventTarget, EventType.KEYPRESS, this.handleBrowserEvent, this)
        ];
        if (!this.handleResize_) {
          this.handleResize_ = this.updateSize.bind(this);
          window.addEventListener(EventType.RESIZE, this.handleResize_, false);
        }
      }
      this.updateSize();
    };
    PluggableMap2.prototype.handleTileChange_ = function() {
      this.render();
    };
    PluggableMap2.prototype.handleViewPropertyChanged_ = function() {
      this.render();
    };
    PluggableMap2.prototype.handleViewChanged_ = function() {
      if (this.viewPropertyListenerKey_) {
        unlistenByKey(this.viewPropertyListenerKey_);
        this.viewPropertyListenerKey_ = null;
      }
      if (this.viewChangeListenerKey_) {
        unlistenByKey(this.viewChangeListenerKey_);
        this.viewChangeListenerKey_ = null;
      }
      var view = this.getView();
      if (view) {
        this.updateViewportSize_();
        this.viewPropertyListenerKey_ = listen(view, ObjectEventType.PROPERTYCHANGE, this.handleViewPropertyChanged_, this);
        this.viewChangeListenerKey_ = listen(view, EventType.CHANGE, this.handleViewPropertyChanged_, this);
        view.resolveConstraints(0);
      }
      this.render();
    };
    PluggableMap2.prototype.handleLayerGroupChanged_ = function() {
      if (this.layerGroupPropertyListenerKeys_) {
        this.layerGroupPropertyListenerKeys_.forEach(unlistenByKey);
        this.layerGroupPropertyListenerKeys_ = null;
      }
      var layerGroup = this.getLayerGroup();
      if (layerGroup) {
        this.layerGroupPropertyListenerKeys_ = [
          listen(layerGroup, ObjectEventType.PROPERTYCHANGE, this.render, this),
          listen(layerGroup, EventType.CHANGE, this.render, this)
        ];
      }
      this.render();
    };
    PluggableMap2.prototype.isRendered = function() {
      return !!this.frameState_;
    };
    PluggableMap2.prototype.renderSync = function() {
      if (this.animationDelayKey_) {
        cancelAnimationFrame(this.animationDelayKey_);
      }
      this.animationDelay_();
    };
    PluggableMap2.prototype.redrawText = function() {
      var layerStates = this.getLayerGroup().getLayerStatesArray();
      for (var i = 0, ii = layerStates.length; i < ii; ++i) {
        var layer = layerStates[i].layer;
        if (layer.hasRenderer()) {
          layer.getRenderer().handleFontsChanged();
        }
      }
    };
    PluggableMap2.prototype.render = function() {
      if (this.renderer_ && this.animationDelayKey_ === void 0) {
        this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_);
      }
    };
    PluggableMap2.prototype.removeControl = function(control) {
      return this.getControls().remove(control);
    };
    PluggableMap2.prototype.removeInteraction = function(interaction) {
      return this.getInteractions().remove(interaction);
    };
    PluggableMap2.prototype.removeLayer = function(layer) {
      var layers = this.getLayerGroup().getLayers();
      return layers.remove(layer);
    };
    PluggableMap2.prototype.removeOverlay = function(overlay) {
      return this.getOverlays().remove(overlay);
    };
    PluggableMap2.prototype.renderFrame_ = function(time) {
      var _this = this;
      var size = this.getSize();
      var view = this.getView();
      var previousFrameState = this.frameState_;
      var frameState = null;
      if (size !== void 0 && hasArea(size) && view && view.isDef()) {
        var viewHints = view.getHints(this.frameState_ ? this.frameState_.viewHints : void 0);
        var viewState = view.getState();
        frameState = {
          animate: false,
          coordinateToPixelTransform: this.coordinateToPixelTransform_,
          declutterTree: null,
          extent: getForViewAndSize(viewState.center, viewState.resolution, viewState.rotation, size),
          index: this.frameIndex_++,
          layerIndex: 0,
          layerStatesArray: this.getLayerGroup().getLayerStatesArray(),
          pixelRatio: this.pixelRatio_,
          pixelToCoordinateTransform: this.pixelToCoordinateTransform_,
          postRenderFunctions: [],
          size,
          tileQueue: this.tileQueue_,
          time,
          usedTiles: {},
          viewState,
          viewHints,
          wantedTiles: {}
        };
        if (viewState.nextCenter && viewState.nextResolution) {
          var rotation = isNaN(viewState.nextRotation) ? viewState.rotation : viewState.nextRotation;
          frameState.nextExtent = getForViewAndSize(viewState.nextCenter, viewState.nextResolution, rotation, size);
        }
      }
      this.frameState_ = frameState;
      this.renderer_.renderFrame(frameState);
      if (frameState) {
        if (frameState.animate) {
          this.render();
        }
        Array.prototype.push.apply(this.postRenderFunctions_, frameState.postRenderFunctions);
        if (previousFrameState) {
          var moveStart = !this.previousExtent_ || !isEmpty(this.previousExtent_) && !equals$1(frameState.extent, this.previousExtent_);
          if (moveStart) {
            this.dispatchEvent(new MapEvent$1(MapEventType.MOVESTART, this, previousFrameState));
            this.previousExtent_ = createOrUpdateEmpty(this.previousExtent_);
          }
        }
        var idle = this.previousExtent_ && !frameState.viewHints[ViewHint.ANIMATING] && !frameState.viewHints[ViewHint.INTERACTING] && !equals$1(frameState.extent, this.previousExtent_);
        if (idle) {
          this.dispatchEvent(new MapEvent$1(MapEventType.MOVEEND, this, frameState));
          clone(frameState.extent, this.previousExtent_);
        }
      }
      this.dispatchEvent(new MapEvent$1(MapEventType.POSTRENDER, this, frameState));
      if (!this.postRenderTimeoutHandle_) {
        this.postRenderTimeoutHandle_ = setTimeout(function() {
          _this.postRenderTimeoutHandle_ = void 0;
          _this.handlePostRender();
        }, 0);
      }
    };
    PluggableMap2.prototype.setLayerGroup = function(layerGroup) {
      this.set(MapProperty.LAYERGROUP, layerGroup);
    };
    PluggableMap2.prototype.setSize = function(size) {
      this.set(MapProperty.SIZE, size);
    };
    PluggableMap2.prototype.setTarget = function(target) {
      this.set(MapProperty.TARGET, target);
    };
    PluggableMap2.prototype.setView = function(view) {
      if (!view || view instanceof View$1) {
        this.set(MapProperty.VIEW, view);
        return;
      }
      this.set(MapProperty.VIEW, new View$1());
      var map = this;
      view.then(function(viewOptions) {
        map.setView(new View$1(viewOptions));
      });
    };
    PluggableMap2.prototype.updateSize = function() {
      var targetElement = this.getTargetElement();
      var size = void 0;
      if (targetElement) {
        var computedStyle = getComputedStyle(targetElement);
        var width = targetElement.offsetWidth - parseFloat(computedStyle["borderLeftWidth"]) - parseFloat(computedStyle["paddingLeft"]) - parseFloat(computedStyle["paddingRight"]) - parseFloat(computedStyle["borderRightWidth"]);
        var height = targetElement.offsetHeight - parseFloat(computedStyle["borderTopWidth"]) - parseFloat(computedStyle["paddingTop"]) - parseFloat(computedStyle["paddingBottom"]) - parseFloat(computedStyle["borderBottomWidth"]);
        if (!isNaN(width) && !isNaN(height)) {
          size = [width, height];
          if (!hasArea(size) && !!(targetElement.offsetWidth || targetElement.offsetHeight || targetElement.getClientRects().length)) {
            console.warn("No map visible because the map container's width or height are 0.");
          }
        }
      }
      this.setSize(size);
      this.updateViewportSize_();
    };
    PluggableMap2.prototype.updateViewportSize_ = function() {
      var view = this.getView();
      if (view) {
        var size = void 0;
        var computedStyle = getComputedStyle(this.viewport_);
        if (computedStyle.width && computedStyle.height) {
          size = [
            parseInt(computedStyle.width, 10),
            parseInt(computedStyle.height, 10)
          ];
        }
        view.setViewportSize(size);
      }
    };
    return PluggableMap2;
  }(BaseObject$1);
  function createOptionsInternal(options) {
    var keyboardEventTarget = null;
    if (options.keyboardEventTarget !== void 0) {
      keyboardEventTarget = typeof options.keyboardEventTarget === "string" ? document.getElementById(options.keyboardEventTarget) : options.keyboardEventTarget;
    }
    var values = {};
    var layerGroup = options.layers && typeof options.layers.getLayers === "function" ? options.layers : new LayerGroup$1({ layers: options.layers });
    values[MapProperty.LAYERGROUP] = layerGroup;
    values[MapProperty.TARGET] = options.target;
    values[MapProperty.VIEW] = options.view instanceof View$1 ? options.view : new View$1();
    var controls;
    if (options.controls !== void 0) {
      if (Array.isArray(options.controls)) {
        controls = new Collection$1(options.controls.slice());
      } else {
        assert(typeof options.controls.getArray === "function", 47);
        controls = options.controls;
      }
    }
    var interactions;
    if (options.interactions !== void 0) {
      if (Array.isArray(options.interactions)) {
        interactions = new Collection$1(options.interactions.slice());
      } else {
        assert(typeof options.interactions.getArray === "function", 48);
        interactions = options.interactions;
      }
    }
    var overlays;
    if (options.overlays !== void 0) {
      if (Array.isArray(options.overlays)) {
        overlays = new Collection$1(options.overlays.slice());
      } else {
        assert(typeof options.overlays.getArray === "function", 49);
        overlays = options.overlays;
      }
    } else {
      overlays = new Collection$1();
    }
    return {
      controls,
      interactions,
      keyboardEventTarget,
      overlays,
      values
    };
  }
  var PluggableMap$1 = PluggableMap;
  var __extends$s = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Control = function(_super) {
    __extends$s(Control2, _super);
    function Control2(options) {
      var _this = _super.call(this) || this;
      var element = options.element;
      if (element && !options.target && !element.style.pointerEvents) {
        element.style.pointerEvents = "auto";
      }
      _this.element = element ? element : null;
      _this.target_ = null;
      _this.map_ = null;
      _this.listenerKeys = [];
      if (options.render) {
        _this.render = options.render;
      }
      if (options.target) {
        _this.setTarget(options.target);
      }
      return _this;
    }
    Control2.prototype.disposeInternal = function() {
      removeNode(this.element);
      _super.prototype.disposeInternal.call(this);
    };
    Control2.prototype.getMap = function() {
      return this.map_;
    };
    Control2.prototype.setMap = function(map) {
      if (this.map_) {
        removeNode(this.element);
      }
      for (var i = 0, ii = this.listenerKeys.length; i < ii; ++i) {
        unlistenByKey(this.listenerKeys[i]);
      }
      this.listenerKeys.length = 0;
      this.map_ = map;
      if (this.map_) {
        var target = this.target_ ? this.target_ : map.getOverlayContainerStopEvent();
        target.appendChild(this.element);
        if (this.render !== VOID) {
          this.listenerKeys.push(listen(map, MapEventType.POSTRENDER, this.render, this));
        }
        map.render();
      }
    };
    Control2.prototype.render = function(mapEvent) {
    };
    Control2.prototype.setTarget = function(target) {
      this.target_ = typeof target === "string" ? document.getElementById(target) : target;
    };
    return Control2;
  }(BaseObject$1);
  var Control$1 = Control;
  var __extends$r = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Attribution = function(_super) {
    __extends$r(Attribution2, _super);
    function Attribution2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(this, {
        element: document.createElement("div"),
        render: options.render,
        target: options.target
      }) || this;
      _this.ulElement_ = document.createElement("ul");
      _this.collapsed_ = options.collapsed !== void 0 ? options.collapsed : true;
      _this.userCollapsed_ = _this.collapsed_;
      _this.overrideCollapsible_ = options.collapsible !== void 0;
      _this.collapsible_ = options.collapsible !== void 0 ? options.collapsible : true;
      if (!_this.collapsible_) {
        _this.collapsed_ = false;
      }
      var className = options.className !== void 0 ? options.className : "ol-attribution";
      var tipLabel = options.tipLabel !== void 0 ? options.tipLabel : "Attributions";
      var expandClassName = options.expandClassName !== void 0 ? options.expandClassName : className + "-expand";
      var collapseLabel = options.collapseLabel !== void 0 ? options.collapseLabel : "\u203A";
      var collapseClassName = options.collapseClassName !== void 0 ? options.collapseClassName : className + "-collpase";
      if (typeof collapseLabel === "string") {
        _this.collapseLabel_ = document.createElement("span");
        _this.collapseLabel_.textContent = collapseLabel;
        _this.collapseLabel_.className = collapseClassName;
      } else {
        _this.collapseLabel_ = collapseLabel;
      }
      var label = options.label !== void 0 ? options.label : "i";
      if (typeof label === "string") {
        _this.label_ = document.createElement("span");
        _this.label_.textContent = label;
        _this.label_.className = expandClassName;
      } else {
        _this.label_ = label;
      }
      var activeLabel = _this.collapsible_ && !_this.collapsed_ ? _this.collapseLabel_ : _this.label_;
      _this.toggleButton_ = document.createElement("button");
      _this.toggleButton_.setAttribute("type", "button");
      _this.toggleButton_.setAttribute("aria-expanded", String(!_this.collapsed_));
      _this.toggleButton_.title = tipLabel;
      _this.toggleButton_.appendChild(activeLabel);
      _this.toggleButton_.addEventListener(EventType.CLICK, _this.handleClick_.bind(_this), false);
      var cssClasses = className + " " + CLASS_UNSELECTABLE + " " + CLASS_CONTROL + (_this.collapsed_ && _this.collapsible_ ? " " + CLASS_COLLAPSED : "") + (_this.collapsible_ ? "" : " ol-uncollapsible");
      var element = _this.element;
      element.className = cssClasses;
      element.appendChild(_this.toggleButton_);
      element.appendChild(_this.ulElement_);
      _this.renderedAttributions_ = [];
      _this.renderedVisible_ = true;
      return _this;
    }
    Attribution2.prototype.collectSourceAttributions_ = function(frameState) {
      var lookup = {};
      var visibleAttributions = [];
      var collapsible = true;
      var layerStatesArray = frameState.layerStatesArray;
      for (var i = 0, ii = layerStatesArray.length; i < ii; ++i) {
        var layerState = layerStatesArray[i];
        if (!inView(layerState, frameState.viewState)) {
          continue;
        }
        var source = layerState.layer.getSource();
        if (!source) {
          continue;
        }
        var attributionGetter = source.getAttributions();
        if (!attributionGetter) {
          continue;
        }
        var attributions = attributionGetter(frameState);
        if (!attributions) {
          continue;
        }
        collapsible = collapsible && source.getAttributionsCollapsible() !== false;
        if (Array.isArray(attributions)) {
          for (var j = 0, jj = attributions.length; j < jj; ++j) {
            if (!(attributions[j] in lookup)) {
              visibleAttributions.push(attributions[j]);
              lookup[attributions[j]] = true;
            }
          }
        } else {
          if (!(attributions in lookup)) {
            visibleAttributions.push(attributions);
            lookup[attributions] = true;
          }
        }
      }
      if (!this.overrideCollapsible_) {
        this.setCollapsible(collapsible);
      }
      return visibleAttributions;
    };
    Attribution2.prototype.updateElement_ = function(frameState) {
      if (!frameState) {
        if (this.renderedVisible_) {
          this.element.style.display = "none";
          this.renderedVisible_ = false;
        }
        return;
      }
      var attributions = this.collectSourceAttributions_(frameState);
      var visible = attributions.length > 0;
      if (this.renderedVisible_ != visible) {
        this.element.style.display = visible ? "" : "none";
        this.renderedVisible_ = visible;
      }
      if (equals$2(attributions, this.renderedAttributions_)) {
        return;
      }
      removeChildren(this.ulElement_);
      for (var i = 0, ii = attributions.length; i < ii; ++i) {
        var element = document.createElement("li");
        element.innerHTML = attributions[i];
        this.ulElement_.appendChild(element);
      }
      this.renderedAttributions_ = attributions;
    };
    Attribution2.prototype.handleClick_ = function(event) {
      event.preventDefault();
      this.handleToggle_();
      this.userCollapsed_ = this.collapsed_;
    };
    Attribution2.prototype.handleToggle_ = function() {
      this.element.classList.toggle(CLASS_COLLAPSED);
      if (this.collapsed_) {
        replaceNode(this.collapseLabel_, this.label_);
      } else {
        replaceNode(this.label_, this.collapseLabel_);
      }
      this.collapsed_ = !this.collapsed_;
      this.toggleButton_.setAttribute("aria-expanded", String(!this.collapsed_));
    };
    Attribution2.prototype.getCollapsible = function() {
      return this.collapsible_;
    };
    Attribution2.prototype.setCollapsible = function(collapsible) {
      if (this.collapsible_ === collapsible) {
        return;
      }
      this.collapsible_ = collapsible;
      this.element.classList.toggle("ol-uncollapsible");
      if (this.userCollapsed_) {
        this.handleToggle_();
      }
    };
    Attribution2.prototype.setCollapsed = function(collapsed) {
      this.userCollapsed_ = collapsed;
      if (!this.collapsible_ || this.collapsed_ === collapsed) {
        return;
      }
      this.handleToggle_();
    };
    Attribution2.prototype.getCollapsed = function() {
      return this.collapsed_;
    };
    Attribution2.prototype.render = function(mapEvent) {
      this.updateElement_(mapEvent.frameState);
    };
    return Attribution2;
  }(Control$1);
  var Attribution$1 = Attribution;
  var __extends$q = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Rotate = function(_super) {
    __extends$q(Rotate2, _super);
    function Rotate2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(this, {
        element: document.createElement("div"),
        render: options.render,
        target: options.target
      }) || this;
      var className = options.className !== void 0 ? options.className : "ol-rotate";
      var label = options.label !== void 0 ? options.label : "\u21E7";
      var compassClassName = options.compassClassName !== void 0 ? options.compassClassName : "ol-compass";
      _this.label_ = null;
      if (typeof label === "string") {
        _this.label_ = document.createElement("span");
        _this.label_.className = compassClassName;
        _this.label_.textContent = label;
      } else {
        _this.label_ = label;
        _this.label_.classList.add(compassClassName);
      }
      var tipLabel = options.tipLabel ? options.tipLabel : "Reset rotation";
      var button = document.createElement("button");
      button.className = className + "-reset";
      button.setAttribute("type", "button");
      button.title = tipLabel;
      button.appendChild(_this.label_);
      button.addEventListener(EventType.CLICK, _this.handleClick_.bind(_this), false);
      var cssClasses = className + " " + CLASS_UNSELECTABLE + " " + CLASS_CONTROL;
      var element = _this.element;
      element.className = cssClasses;
      element.appendChild(button);
      _this.callResetNorth_ = options.resetNorth ? options.resetNorth : void 0;
      _this.duration_ = options.duration !== void 0 ? options.duration : 250;
      _this.autoHide_ = options.autoHide !== void 0 ? options.autoHide : true;
      _this.rotation_ = void 0;
      if (_this.autoHide_) {
        _this.element.classList.add(CLASS_HIDDEN);
      }
      return _this;
    }
    Rotate2.prototype.handleClick_ = function(event) {
      event.preventDefault();
      if (this.callResetNorth_ !== void 0) {
        this.callResetNorth_();
      } else {
        this.resetNorth_();
      }
    };
    Rotate2.prototype.resetNorth_ = function() {
      var map = this.getMap();
      var view = map.getView();
      if (!view) {
        return;
      }
      var rotation = view.getRotation();
      if (rotation !== void 0) {
        if (this.duration_ > 0 && rotation % (2 * Math.PI) !== 0) {
          view.animate({
            rotation: 0,
            duration: this.duration_,
            easing: easeOut
          });
        } else {
          view.setRotation(0);
        }
      }
    };
    Rotate2.prototype.render = function(mapEvent) {
      var frameState = mapEvent.frameState;
      if (!frameState) {
        return;
      }
      var rotation = frameState.viewState.rotation;
      if (rotation != this.rotation_) {
        var transform2 = "rotate(" + rotation + "rad)";
        if (this.autoHide_) {
          var contains2 = this.element.classList.contains(CLASS_HIDDEN);
          if (!contains2 && rotation === 0) {
            this.element.classList.add(CLASS_HIDDEN);
          } else if (contains2 && rotation !== 0) {
            this.element.classList.remove(CLASS_HIDDEN);
          }
        }
        this.label_.style.transform = transform2;
      }
      this.rotation_ = rotation;
    };
    return Rotate2;
  }(Control$1);
  var Rotate$1 = Rotate;
  var __extends$p = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Zoom = function(_super) {
    __extends$p(Zoom2, _super);
    function Zoom2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(this, {
        element: document.createElement("div"),
        target: options.target
      }) || this;
      var className = options.className !== void 0 ? options.className : "ol-zoom";
      var delta = options.delta !== void 0 ? options.delta : 1;
      var zoomInClassName = options.zoomInClassName !== void 0 ? options.zoomInClassName : className + "-in";
      var zoomOutClassName = options.zoomOutClassName !== void 0 ? options.zoomOutClassName : className + "-out";
      var zoomInLabel = options.zoomInLabel !== void 0 ? options.zoomInLabel : "+";
      var zoomOutLabel = options.zoomOutLabel !== void 0 ? options.zoomOutLabel : "\u2013";
      var zoomInTipLabel = options.zoomInTipLabel !== void 0 ? options.zoomInTipLabel : "Zoom in";
      var zoomOutTipLabel = options.zoomOutTipLabel !== void 0 ? options.zoomOutTipLabel : "Zoom out";
      var inElement = document.createElement("button");
      inElement.className = zoomInClassName;
      inElement.setAttribute("type", "button");
      inElement.title = zoomInTipLabel;
      inElement.appendChild(typeof zoomInLabel === "string" ? document.createTextNode(zoomInLabel) : zoomInLabel);
      inElement.addEventListener(EventType.CLICK, _this.handleClick_.bind(_this, delta), false);
      var outElement = document.createElement("button");
      outElement.className = zoomOutClassName;
      outElement.setAttribute("type", "button");
      outElement.title = zoomOutTipLabel;
      outElement.appendChild(typeof zoomOutLabel === "string" ? document.createTextNode(zoomOutLabel) : zoomOutLabel);
      outElement.addEventListener(EventType.CLICK, _this.handleClick_.bind(_this, -delta), false);
      var cssClasses = className + " " + CLASS_UNSELECTABLE + " " + CLASS_CONTROL;
      var element = _this.element;
      element.className = cssClasses;
      element.appendChild(inElement);
      element.appendChild(outElement);
      _this.duration_ = options.duration !== void 0 ? options.duration : 250;
      return _this;
    }
    Zoom2.prototype.handleClick_ = function(delta, event) {
      event.preventDefault();
      this.zoomByDelta_(delta);
    };
    Zoom2.prototype.zoomByDelta_ = function(delta) {
      var map = this.getMap();
      var view = map.getView();
      if (!view) {
        return;
      }
      var currentZoom = view.getZoom();
      if (currentZoom !== void 0) {
        var newZoom = view.getConstrainedZoom(currentZoom + delta);
        if (this.duration_ > 0) {
          if (view.getAnimating()) {
            view.cancelAnimations();
          }
          view.animate({
            zoom: newZoom,
            duration: this.duration_,
            easing: easeOut
          });
        } else {
          view.setZoom(newZoom);
        }
      }
    };
    return Zoom2;
  }(Control$1);
  var Zoom$1 = Zoom;
  var OverlayPositioning = {
    BOTTOM_LEFT: "bottom-left",
    BOTTOM_CENTER: "bottom-center",
    BOTTOM_RIGHT: "bottom-right",
    CENTER_LEFT: "center-left",
    CENTER_CENTER: "center-center",
    CENTER_RIGHT: "center-right",
    TOP_LEFT: "top-left",
    TOP_CENTER: "top-center",
    TOP_RIGHT: "top-right"
  };
  var __extends$o = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Property = {
    ELEMENT: "element",
    MAP: "map",
    OFFSET: "offset",
    POSITION: "position",
    POSITIONING: "positioning"
  };
  var Overlay = function(_super) {
    __extends$o(Overlay2, _super);
    function Overlay2(options) {
      var _this = _super.call(this) || this;
      _this.on;
      _this.once;
      _this.un;
      _this.options = options;
      _this.id = options.id;
      _this.insertFirst = options.insertFirst !== void 0 ? options.insertFirst : true;
      _this.stopEvent = options.stopEvent !== void 0 ? options.stopEvent : true;
      _this.element = document.createElement("div");
      _this.element.className = options.className !== void 0 ? options.className : "ol-overlay-container " + CLASS_SELECTABLE;
      _this.element.style.position = "absolute";
      _this.element.style.pointerEvents = "auto";
      var autoPan = options.autoPan;
      if (autoPan && typeof autoPan !== "object") {
        autoPan = {
          animation: options.autoPanAnimation,
          margin: options.autoPanMargin
        };
      }
      _this.autoPan = autoPan || false;
      _this.rendered = {
        transform_: "",
        visible: true
      };
      _this.mapPostrenderListenerKey = null;
      _this.addChangeListener(Property.ELEMENT, _this.handleElementChanged);
      _this.addChangeListener(Property.MAP, _this.handleMapChanged);
      _this.addChangeListener(Property.OFFSET, _this.handleOffsetChanged);
      _this.addChangeListener(Property.POSITION, _this.handlePositionChanged);
      _this.addChangeListener(Property.POSITIONING, _this.handlePositioningChanged);
      if (options.element !== void 0) {
        _this.setElement(options.element);
      }
      _this.setOffset(options.offset !== void 0 ? options.offset : [0, 0]);
      _this.setPositioning(options.positioning !== void 0 ? options.positioning : OverlayPositioning.TOP_LEFT);
      if (options.position !== void 0) {
        _this.setPosition(options.position);
      }
      return _this;
    }
    Overlay2.prototype.getElement = function() {
      return this.get(Property.ELEMENT);
    };
    Overlay2.prototype.getId = function() {
      return this.id;
    };
    Overlay2.prototype.getMap = function() {
      return this.get(Property.MAP);
    };
    Overlay2.prototype.getOffset = function() {
      return this.get(Property.OFFSET);
    };
    Overlay2.prototype.getPosition = function() {
      return this.get(Property.POSITION);
    };
    Overlay2.prototype.getPositioning = function() {
      return this.get(Property.POSITIONING);
    };
    Overlay2.prototype.handleElementChanged = function() {
      removeChildren(this.element);
      var element = this.getElement();
      if (element) {
        this.element.appendChild(element);
      }
    };
    Overlay2.prototype.handleMapChanged = function() {
      if (this.mapPostrenderListenerKey) {
        removeNode(this.element);
        unlistenByKey(this.mapPostrenderListenerKey);
        this.mapPostrenderListenerKey = null;
      }
      var map = this.getMap();
      if (map) {
        this.mapPostrenderListenerKey = listen(map, MapEventType.POSTRENDER, this.render, this);
        this.updatePixelPosition();
        var container = this.stopEvent ? map.getOverlayContainerStopEvent() : map.getOverlayContainer();
        if (this.insertFirst) {
          container.insertBefore(this.element, container.childNodes[0] || null);
        } else {
          container.appendChild(this.element);
        }
        this.performAutoPan();
      }
    };
    Overlay2.prototype.render = function() {
      this.updatePixelPosition();
    };
    Overlay2.prototype.handleOffsetChanged = function() {
      this.updatePixelPosition();
    };
    Overlay2.prototype.handlePositionChanged = function() {
      this.updatePixelPosition();
      this.performAutoPan();
    };
    Overlay2.prototype.handlePositioningChanged = function() {
      this.updatePixelPosition();
    };
    Overlay2.prototype.setElement = function(element) {
      this.set(Property.ELEMENT, element);
    };
    Overlay2.prototype.setMap = function(map) {
      this.set(Property.MAP, map);
    };
    Overlay2.prototype.setOffset = function(offset) {
      this.set(Property.OFFSET, offset);
    };
    Overlay2.prototype.setPosition = function(position) {
      this.set(Property.POSITION, position);
    };
    Overlay2.prototype.performAutoPan = function() {
      if (this.autoPan) {
        this.panIntoView(this.autoPan);
      }
    };
    Overlay2.prototype.panIntoView = function(opt_panIntoViewOptions) {
      var map = this.getMap();
      if (!map || !map.getTargetElement() || !this.get(Property.POSITION)) {
        return;
      }
      var mapRect = this.getRect(map.getTargetElement(), map.getSize());
      var element = this.getElement();
      var overlayRect = this.getRect(element, [
        outerWidth(element),
        outerHeight(element)
      ]);
      var panIntoViewOptions = opt_panIntoViewOptions || {};
      var myMargin = panIntoViewOptions.margin === void 0 ? 20 : panIntoViewOptions.margin;
      if (!containsExtent(mapRect, overlayRect)) {
        var offsetLeft = overlayRect[0] - mapRect[0];
        var offsetRight = mapRect[2] - overlayRect[2];
        var offsetTop = overlayRect[1] - mapRect[1];
        var offsetBottom = mapRect[3] - overlayRect[3];
        var delta = [0, 0];
        if (offsetLeft < 0) {
          delta[0] = offsetLeft - myMargin;
        } else if (offsetRight < 0) {
          delta[0] = Math.abs(offsetRight) + myMargin;
        }
        if (offsetTop < 0) {
          delta[1] = offsetTop - myMargin;
        } else if (offsetBottom < 0) {
          delta[1] = Math.abs(offsetBottom) + myMargin;
        }
        if (delta[0] !== 0 || delta[1] !== 0) {
          var center = map.getView().getCenterInternal();
          var centerPx = map.getPixelFromCoordinateInternal(center);
          if (!centerPx) {
            return;
          }
          var newCenterPx = [centerPx[0] + delta[0], centerPx[1] + delta[1]];
          var panOptions = panIntoViewOptions.animation || {};
          map.getView().animateInternal({
            center: map.getCoordinateFromPixelInternal(newCenterPx),
            duration: panOptions.duration,
            easing: panOptions.easing
          });
        }
      }
    };
    Overlay2.prototype.getRect = function(element, size) {
      var box = element.getBoundingClientRect();
      var offsetX = box.left + window.pageXOffset;
      var offsetY = box.top + window.pageYOffset;
      return [offsetX, offsetY, offsetX + size[0], offsetY + size[1]];
    };
    Overlay2.prototype.setPositioning = function(positioning) {
      this.set(Property.POSITIONING, positioning);
    };
    Overlay2.prototype.setVisible = function(visible) {
      if (this.rendered.visible !== visible) {
        this.element.style.display = visible ? "" : "none";
        this.rendered.visible = visible;
      }
    };
    Overlay2.prototype.updatePixelPosition = function() {
      var map = this.getMap();
      var position = this.getPosition();
      if (!map || !map.isRendered() || !position) {
        this.setVisible(false);
        return;
      }
      var pixel = map.getPixelFromCoordinate(position);
      var mapSize = map.getSize();
      this.updateRenderedPosition(pixel, mapSize);
    };
    Overlay2.prototype.updateRenderedPosition = function(pixel, mapSize) {
      var style = this.element.style;
      var offset = this.getOffset();
      var positioning = this.getPositioning();
      this.setVisible(true);
      var x = Math.round(pixel[0] + offset[0]) + "px";
      var y = Math.round(pixel[1] + offset[1]) + "px";
      var posX = "0%";
      var posY = "0%";
      if (positioning == OverlayPositioning.BOTTOM_RIGHT || positioning == OverlayPositioning.CENTER_RIGHT || positioning == OverlayPositioning.TOP_RIGHT) {
        posX = "-100%";
      } else if (positioning == OverlayPositioning.BOTTOM_CENTER || positioning == OverlayPositioning.CENTER_CENTER || positioning == OverlayPositioning.TOP_CENTER) {
        posX = "-50%";
      }
      if (positioning == OverlayPositioning.BOTTOM_LEFT || positioning == OverlayPositioning.BOTTOM_CENTER || positioning == OverlayPositioning.BOTTOM_RIGHT) {
        posY = "-100%";
      } else if (positioning == OverlayPositioning.CENTER_LEFT || positioning == OverlayPositioning.CENTER_CENTER || positioning == OverlayPositioning.CENTER_RIGHT) {
        posY = "-50%";
      }
      var transform2 = "translate(" + posX + ", " + posY + ") translate(" + x + ", " + y + ")";
      if (this.rendered.transform_ != transform2) {
        this.rendered.transform_ = transform2;
        style.transform = transform2;
        style.msTransform = transform2;
      }
    };
    Overlay2.prototype.getOptions = function() {
      return this.options;
    };
    return Overlay2;
  }(BaseObject$1);
  var Overlay$1 = Overlay;
  function defaults$1(opt_options) {
    var options = opt_options ? opt_options : {};
    var controls = new Collection$1();
    var zoomControl = options.zoom !== void 0 ? options.zoom : true;
    if (zoomControl) {
      controls.push(new Zoom$1(options.zoomOptions));
    }
    var rotateControl = options.rotate !== void 0 ? options.rotate : true;
    if (rotateControl) {
      controls.push(new Rotate$1(options.rotateOptions));
    }
    var attributionControl = options.attribution !== void 0 ? options.attribution : true;
    if (attributionControl) {
      controls.push(new Attribution$1(options.attributionOptions));
    }
    return controls;
  }
  var InteractionProperty = {
    ACTIVE: "active"
  };
  var __extends$n = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Interaction = function(_super) {
    __extends$n(Interaction2, _super);
    function Interaction2(opt_options) {
      var _this = _super.call(this) || this;
      _this.on;
      _this.once;
      _this.un;
      if (opt_options && opt_options.handleEvent) {
        _this.handleEvent = opt_options.handleEvent;
      }
      _this.map_ = null;
      _this.setActive(true);
      return _this;
    }
    Interaction2.prototype.getActive = function() {
      return this.get(InteractionProperty.ACTIVE);
    };
    Interaction2.prototype.getMap = function() {
      return this.map_;
    };
    Interaction2.prototype.handleEvent = function(mapBrowserEvent) {
      return true;
    };
    Interaction2.prototype.setActive = function(active) {
      this.set(InteractionProperty.ACTIVE, active);
    };
    Interaction2.prototype.setMap = function(map) {
      this.map_ = map;
    };
    return Interaction2;
  }(BaseObject$1);
  function pan(view, delta, opt_duration) {
    var currentCenter = view.getCenterInternal();
    if (currentCenter) {
      var center = [currentCenter[0] + delta[0], currentCenter[1] + delta[1]];
      view.animateInternal({
        duration: opt_duration !== void 0 ? opt_duration : 250,
        easing: linear,
        center: view.getConstrainedCenter(center)
      });
    }
  }
  function zoomByDelta(view, delta, opt_anchor, opt_duration) {
    var currentZoom = view.getZoom();
    if (currentZoom === void 0) {
      return;
    }
    var newZoom = view.getConstrainedZoom(currentZoom + delta);
    var newResolution = view.getResolutionForZoom(newZoom);
    if (view.getAnimating()) {
      view.cancelAnimations();
    }
    view.animate({
      resolution: newResolution,
      anchor: opt_anchor,
      duration: opt_duration !== void 0 ? opt_duration : 250,
      easing: easeOut
    });
  }
  var Interaction$1 = Interaction;
  var __extends$m = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var DoubleClickZoom = function(_super) {
    __extends$m(DoubleClickZoom2, _super);
    function DoubleClickZoom2(opt_options) {
      var _this = _super.call(this) || this;
      var options = opt_options ? opt_options : {};
      _this.delta_ = options.delta ? options.delta : 1;
      _this.duration_ = options.duration !== void 0 ? options.duration : 250;
      return _this;
    }
    DoubleClickZoom2.prototype.handleEvent = function(mapBrowserEvent) {
      var stopEvent = false;
      if (mapBrowserEvent.type == MapBrowserEventType.DBLCLICK) {
        var browserEvent = mapBrowserEvent.originalEvent;
        var map = mapBrowserEvent.map;
        var anchor = mapBrowserEvent.coordinate;
        var delta = browserEvent.shiftKey ? -this.delta_ : this.delta_;
        var view = map.getView();
        zoomByDelta(view, delta, anchor, this.duration_);
        browserEvent.preventDefault();
        stopEvent = true;
      }
      return !stopEvent;
    };
    return DoubleClickZoom2;
  }(Interaction$1);
  var DoubleClickZoom$1 = DoubleClickZoom;
  var __extends$l = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var PointerInteraction = function(_super) {
    __extends$l(PointerInteraction2, _super);
    function PointerInteraction2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(this, options) || this;
      if (options.handleDownEvent) {
        _this.handleDownEvent = options.handleDownEvent;
      }
      if (options.handleDragEvent) {
        _this.handleDragEvent = options.handleDragEvent;
      }
      if (options.handleMoveEvent) {
        _this.handleMoveEvent = options.handleMoveEvent;
      }
      if (options.handleUpEvent) {
        _this.handleUpEvent = options.handleUpEvent;
      }
      if (options.stopDown) {
        _this.stopDown = options.stopDown;
      }
      _this.handlingDownUpSequence = false;
      _this.trackedPointers_ = {};
      _this.targetPointers = [];
      return _this;
    }
    PointerInteraction2.prototype.getPointerCount = function() {
      return this.targetPointers.length;
    };
    PointerInteraction2.prototype.handleDownEvent = function(mapBrowserEvent) {
      return false;
    };
    PointerInteraction2.prototype.handleDragEvent = function(mapBrowserEvent) {
    };
    PointerInteraction2.prototype.handleEvent = function(mapBrowserEvent) {
      if (!mapBrowserEvent.originalEvent) {
        return true;
      }
      var stopEvent = false;
      this.updateTrackedPointers_(mapBrowserEvent);
      if (this.handlingDownUpSequence) {
        if (mapBrowserEvent.type == MapBrowserEventType.POINTERDRAG) {
          this.handleDragEvent(mapBrowserEvent);
          mapBrowserEvent.originalEvent.preventDefault();
        } else if (mapBrowserEvent.type == MapBrowserEventType.POINTERUP) {
          var handledUp = this.handleUpEvent(mapBrowserEvent);
          this.handlingDownUpSequence = handledUp && this.targetPointers.length > 0;
        }
      } else {
        if (mapBrowserEvent.type == MapBrowserEventType.POINTERDOWN) {
          var handled = this.handleDownEvent(mapBrowserEvent);
          this.handlingDownUpSequence = handled;
          stopEvent = this.stopDown(handled);
        } else if (mapBrowserEvent.type == MapBrowserEventType.POINTERMOVE) {
          this.handleMoveEvent(mapBrowserEvent);
        }
      }
      return !stopEvent;
    };
    PointerInteraction2.prototype.handleMoveEvent = function(mapBrowserEvent) {
    };
    PointerInteraction2.prototype.handleUpEvent = function(mapBrowserEvent) {
      return false;
    };
    PointerInteraction2.prototype.stopDown = function(handled) {
      return handled;
    };
    PointerInteraction2.prototype.updateTrackedPointers_ = function(mapBrowserEvent) {
      if (isPointerDraggingEvent(mapBrowserEvent)) {
        var event_1 = mapBrowserEvent.originalEvent;
        var id = event_1.pointerId.toString();
        if (mapBrowserEvent.type == MapBrowserEventType.POINTERUP) {
          delete this.trackedPointers_[id];
        } else if (mapBrowserEvent.type == MapBrowserEventType.POINTERDOWN) {
          this.trackedPointers_[id] = event_1;
        } else if (id in this.trackedPointers_) {
          this.trackedPointers_[id] = event_1;
        }
        this.targetPointers = getValues(this.trackedPointers_);
      }
    };
    return PointerInteraction2;
  }(Interaction$1);
  function centroid(pointerEvents) {
    var length = pointerEvents.length;
    var clientX = 0;
    var clientY = 0;
    for (var i = 0; i < length; i++) {
      clientX += pointerEvents[i].clientX;
      clientY += pointerEvents[i].clientY;
    }
    return [clientX / length, clientY / length];
  }
  function isPointerDraggingEvent(mapBrowserEvent) {
    var type = mapBrowserEvent.type;
    return type === MapBrowserEventType.POINTERDOWN || type === MapBrowserEventType.POINTERDRAG || type === MapBrowserEventType.POINTERUP;
  }
  var PointerInteraction$1 = PointerInteraction;
  function all(var_args) {
    var conditions = arguments;
    return function(event) {
      var pass = true;
      for (var i = 0, ii = conditions.length; i < ii; ++i) {
        pass = pass && conditions[i](event);
        if (!pass) {
          break;
        }
      }
      return pass;
    };
  }
  var altShiftKeysOnly = function(mapBrowserEvent) {
    var originalEvent = mapBrowserEvent.originalEvent;
    return originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && originalEvent.shiftKey;
  };
  var focus = function(event) {
    return event.target.getTargetElement().contains(document.activeElement);
  };
  var focusWithTabindex = function(event) {
    return event.map.getTargetElement().hasAttribute("tabindex") ? focus(event) : true;
  };
  var always = TRUE;
  var mouseActionButton = function(mapBrowserEvent) {
    var originalEvent = mapBrowserEvent.originalEvent;
    return originalEvent.button == 0 && !(WEBKIT && MAC && originalEvent.ctrlKey);
  };
  var noModifierKeys = function(mapBrowserEvent) {
    var originalEvent = mapBrowserEvent.originalEvent;
    return !originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && !originalEvent.shiftKey;
  };
  var platformModifierKeyOnly = function(mapBrowserEvent) {
    var originalEvent = mapBrowserEvent.originalEvent;
    return !originalEvent.altKey && (MAC ? originalEvent.metaKey : originalEvent.ctrlKey) && !originalEvent.shiftKey;
  };
  var shiftKeyOnly = function(mapBrowserEvent) {
    var originalEvent = mapBrowserEvent.originalEvent;
    return !originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && originalEvent.shiftKey;
  };
  var targetNotEditable = function(mapBrowserEvent) {
    var originalEvent = mapBrowserEvent.originalEvent;
    var tagName = originalEvent.target.tagName;
    return tagName !== "INPUT" && tagName !== "SELECT" && tagName !== "TEXTAREA";
  };
  var mouseOnly = function(mapBrowserEvent) {
    var pointerEvent = mapBrowserEvent.originalEvent;
    assert(pointerEvent !== void 0, 56);
    return pointerEvent.pointerType == "mouse";
  };
  var primaryAction = function(mapBrowserEvent) {
    var pointerEvent = mapBrowserEvent.originalEvent;
    assert(pointerEvent !== void 0, 56);
    return pointerEvent.isPrimary && pointerEvent.button === 0;
  };
  var __extends$k = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var DragPan = function(_super) {
    __extends$k(DragPan2, _super);
    function DragPan2(opt_options) {
      var _this = _super.call(this, {
        stopDown: FALSE
      }) || this;
      var options = opt_options ? opt_options : {};
      _this.kinetic_ = options.kinetic;
      _this.lastCentroid = null;
      _this.lastPointersCount_;
      _this.panning_ = false;
      var condition = options.condition ? options.condition : all(noModifierKeys, primaryAction);
      _this.condition_ = options.onFocusOnly ? all(focusWithTabindex, condition) : condition;
      _this.noKinetic_ = false;
      return _this;
    }
    DragPan2.prototype.handleDragEvent = function(mapBrowserEvent) {
      if (!this.panning_) {
        this.panning_ = true;
        this.getMap().getView().beginInteraction();
      }
      var targetPointers = this.targetPointers;
      var centroid$1 = centroid(targetPointers);
      if (targetPointers.length == this.lastPointersCount_) {
        if (this.kinetic_) {
          this.kinetic_.update(centroid$1[0], centroid$1[1]);
        }
        if (this.lastCentroid) {
          var delta = [
            this.lastCentroid[0] - centroid$1[0],
            centroid$1[1] - this.lastCentroid[1]
          ];
          var map = mapBrowserEvent.map;
          var view = map.getView();
          scale$2(delta, view.getResolution());
          rotate$1(delta, view.getRotation());
          view.adjustCenterInternal(delta);
        }
      } else if (this.kinetic_) {
        this.kinetic_.begin();
      }
      this.lastCentroid = centroid$1;
      this.lastPointersCount_ = targetPointers.length;
      mapBrowserEvent.originalEvent.preventDefault();
    };
    DragPan2.prototype.handleUpEvent = function(mapBrowserEvent) {
      var map = mapBrowserEvent.map;
      var view = map.getView();
      if (this.targetPointers.length === 0) {
        if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
          var distance = this.kinetic_.getDistance();
          var angle = this.kinetic_.getAngle();
          var center = view.getCenterInternal();
          var centerpx = map.getPixelFromCoordinateInternal(center);
          var dest = map.getCoordinateFromPixelInternal([
            centerpx[0] - distance * Math.cos(angle),
            centerpx[1] - distance * Math.sin(angle)
          ]);
          view.animateInternal({
            center: view.getConstrainedCenter(dest),
            duration: 500,
            easing: easeOut
          });
        }
        if (this.panning_) {
          this.panning_ = false;
          view.endInteraction();
        }
        return false;
      } else {
        if (this.kinetic_) {
          this.kinetic_.begin();
        }
        this.lastCentroid = null;
        return true;
      }
    };
    DragPan2.prototype.handleDownEvent = function(mapBrowserEvent) {
      if (this.targetPointers.length > 0 && this.condition_(mapBrowserEvent)) {
        var map = mapBrowserEvent.map;
        var view = map.getView();
        this.lastCentroid = null;
        if (view.getAnimating()) {
          view.cancelAnimations();
        }
        if (this.kinetic_) {
          this.kinetic_.begin();
        }
        this.noKinetic_ = this.targetPointers.length > 1;
        return true;
      } else {
        return false;
      }
    };
    return DragPan2;
  }(PointerInteraction$1);
  var DragPan$1 = DragPan;
  var __extends$j = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var DragRotate = function(_super) {
    __extends$j(DragRotate2, _super);
    function DragRotate2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(this, {
        stopDown: FALSE
      }) || this;
      _this.condition_ = options.condition ? options.condition : altShiftKeysOnly;
      _this.lastAngle_ = void 0;
      _this.duration_ = options.duration !== void 0 ? options.duration : 250;
      return _this;
    }
    DragRotate2.prototype.handleDragEvent = function(mapBrowserEvent) {
      if (!mouseOnly(mapBrowserEvent)) {
        return;
      }
      var map = mapBrowserEvent.map;
      var view = map.getView();
      if (view.getConstraints().rotation === disable) {
        return;
      }
      var size = map.getSize();
      var offset = mapBrowserEvent.pixel;
      var theta = Math.atan2(size[1] / 2 - offset[1], offset[0] - size[0] / 2);
      if (this.lastAngle_ !== void 0) {
        var delta = theta - this.lastAngle_;
        view.adjustRotationInternal(-delta);
      }
      this.lastAngle_ = theta;
    };
    DragRotate2.prototype.handleUpEvent = function(mapBrowserEvent) {
      if (!mouseOnly(mapBrowserEvent)) {
        return true;
      }
      var map = mapBrowserEvent.map;
      var view = map.getView();
      view.endInteraction(this.duration_);
      return false;
    };
    DragRotate2.prototype.handleDownEvent = function(mapBrowserEvent) {
      if (!mouseOnly(mapBrowserEvent)) {
        return false;
      }
      if (mouseActionButton(mapBrowserEvent) && this.condition_(mapBrowserEvent)) {
        var map = mapBrowserEvent.map;
        map.getView().beginInteraction();
        this.lastAngle_ = void 0;
        return true;
      } else {
        return false;
      }
    };
    return DragRotate2;
  }(PointerInteraction$1);
  var DragRotate$1 = DragRotate;
  var __extends$i = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var RenderBox = function(_super) {
    __extends$i(RenderBox2, _super);
    function RenderBox2(className) {
      var _this = _super.call(this) || this;
      _this.geometry_ = null;
      _this.element_ = document.createElement("div");
      _this.element_.style.position = "absolute";
      _this.element_.style.pointerEvents = "auto";
      _this.element_.className = "ol-box " + className;
      _this.map_ = null;
      _this.startPixel_ = null;
      _this.endPixel_ = null;
      return _this;
    }
    RenderBox2.prototype.disposeInternal = function() {
      this.setMap(null);
    };
    RenderBox2.prototype.render_ = function() {
      var startPixel = this.startPixel_;
      var endPixel = this.endPixel_;
      var px = "px";
      var style = this.element_.style;
      style.left = Math.min(startPixel[0], endPixel[0]) + px;
      style.top = Math.min(startPixel[1], endPixel[1]) + px;
      style.width = Math.abs(endPixel[0] - startPixel[0]) + px;
      style.height = Math.abs(endPixel[1] - startPixel[1]) + px;
    };
    RenderBox2.prototype.setMap = function(map) {
      if (this.map_) {
        this.map_.getOverlayContainer().removeChild(this.element_);
        var style = this.element_.style;
        style.left = "inherit";
        style.top = "inherit";
        style.width = "inherit";
        style.height = "inherit";
      }
      this.map_ = map;
      if (this.map_) {
        this.map_.getOverlayContainer().appendChild(this.element_);
      }
    };
    RenderBox2.prototype.setPixels = function(startPixel, endPixel) {
      this.startPixel_ = startPixel;
      this.endPixel_ = endPixel;
      this.createOrUpdateGeometry();
      this.render_();
    };
    RenderBox2.prototype.createOrUpdateGeometry = function() {
      var startPixel = this.startPixel_;
      var endPixel = this.endPixel_;
      var pixels = [
        startPixel,
        [startPixel[0], endPixel[1]],
        endPixel,
        [endPixel[0], startPixel[1]]
      ];
      var coordinates2 = pixels.map(this.map_.getCoordinateFromPixelInternal, this.map_);
      coordinates2[4] = coordinates2[0].slice();
      if (!this.geometry_) {
        this.geometry_ = new Polygon([coordinates2]);
      } else {
        this.geometry_.setCoordinates([coordinates2]);
      }
    };
    RenderBox2.prototype.getGeometry = function() {
      return this.geometry_;
    };
    return RenderBox2;
  }(Disposable$1);
  var RenderBox$1 = RenderBox;
  var __extends$h = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var DragBoxEventType = {
    BOXSTART: "boxstart",
    BOXDRAG: "boxdrag",
    BOXEND: "boxend",
    BOXCANCEL: "boxcancel"
  };
  var DragBoxEvent = function(_super) {
    __extends$h(DragBoxEvent2, _super);
    function DragBoxEvent2(type, coordinate, mapBrowserEvent) {
      var _this = _super.call(this, type) || this;
      _this.coordinate = coordinate;
      _this.mapBrowserEvent = mapBrowserEvent;
      return _this;
    }
    return DragBoxEvent2;
  }(Event);
  var DragBox = function(_super) {
    __extends$h(DragBox2, _super);
    function DragBox2(opt_options) {
      var _this = _super.call(this) || this;
      _this.on;
      _this.once;
      _this.un;
      var options = opt_options ? opt_options : {};
      _this.box_ = new RenderBox$1(options.className || "ol-dragbox");
      _this.minArea_ = options.minArea !== void 0 ? options.minArea : 64;
      if (options.onBoxEnd) {
        _this.onBoxEnd = options.onBoxEnd;
      }
      _this.startPixel_ = null;
      _this.condition_ = options.condition ? options.condition : mouseActionButton;
      _this.boxEndCondition_ = options.boxEndCondition ? options.boxEndCondition : _this.defaultBoxEndCondition;
      return _this;
    }
    DragBox2.prototype.defaultBoxEndCondition = function(mapBrowserEvent, startPixel, endPixel) {
      var width = endPixel[0] - startPixel[0];
      var height = endPixel[1] - startPixel[1];
      return width * width + height * height >= this.minArea_;
    };
    DragBox2.prototype.getGeometry = function() {
      return this.box_.getGeometry();
    };
    DragBox2.prototype.handleDragEvent = function(mapBrowserEvent) {
      this.box_.setPixels(this.startPixel_, mapBrowserEvent.pixel);
      this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXDRAG, mapBrowserEvent.coordinate, mapBrowserEvent));
    };
    DragBox2.prototype.handleUpEvent = function(mapBrowserEvent) {
      this.box_.setMap(null);
      var completeBox = this.boxEndCondition_(mapBrowserEvent, this.startPixel_, mapBrowserEvent.pixel);
      if (completeBox) {
        this.onBoxEnd(mapBrowserEvent);
      }
      this.dispatchEvent(new DragBoxEvent(completeBox ? DragBoxEventType.BOXEND : DragBoxEventType.BOXCANCEL, mapBrowserEvent.coordinate, mapBrowserEvent));
      return false;
    };
    DragBox2.prototype.handleDownEvent = function(mapBrowserEvent) {
      if (this.condition_(mapBrowserEvent)) {
        this.startPixel_ = mapBrowserEvent.pixel;
        this.box_.setMap(mapBrowserEvent.map);
        this.box_.setPixels(this.startPixel_, this.startPixel_);
        this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXSTART, mapBrowserEvent.coordinate, mapBrowserEvent));
        return true;
      } else {
        return false;
      }
    };
    DragBox2.prototype.onBoxEnd = function(event) {
    };
    return DragBox2;
  }(PointerInteraction$1);
  var DragBox$1 = DragBox;
  var __extends$g = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var DragZoom = function(_super) {
    __extends$g(DragZoom2, _super);
    function DragZoom2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      var condition = options.condition ? options.condition : shiftKeyOnly;
      _this = _super.call(this, {
        condition,
        className: options.className || "ol-dragzoom",
        minArea: options.minArea
      }) || this;
      _this.duration_ = options.duration !== void 0 ? options.duration : 200;
      _this.out_ = options.out !== void 0 ? options.out : false;
      return _this;
    }
    DragZoom2.prototype.onBoxEnd = function(event) {
      var map = this.getMap();
      var view = map.getView();
      var geometry = this.getGeometry();
      if (this.out_) {
        var rotatedExtent = view.rotatedExtentForGeometry(geometry);
        var resolution = view.getResolutionForExtentInternal(rotatedExtent);
        var factor = view.getResolution() / resolution;
        geometry = geometry.clone();
        geometry.scale(factor * factor);
      }
      view.fitInternal(geometry, {
        duration: this.duration_,
        easing: easeOut
      });
    };
    return DragZoom2;
  }(DragBox$1);
  var DragZoom$1 = DragZoom;
  var KeyCode = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  };
  var __extends$f = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var KeyboardPan = function(_super) {
    __extends$f(KeyboardPan2, _super);
    function KeyboardPan2(opt_options) {
      var _this = _super.call(this) || this;
      var options = opt_options || {};
      _this.defaultCondition_ = function(mapBrowserEvent) {
        return noModifierKeys(mapBrowserEvent) && targetNotEditable(mapBrowserEvent);
      };
      _this.condition_ = options.condition !== void 0 ? options.condition : _this.defaultCondition_;
      _this.duration_ = options.duration !== void 0 ? options.duration : 100;
      _this.pixelDelta_ = options.pixelDelta !== void 0 ? options.pixelDelta : 128;
      return _this;
    }
    KeyboardPan2.prototype.handleEvent = function(mapBrowserEvent) {
      var stopEvent = false;
      if (mapBrowserEvent.type == EventType.KEYDOWN) {
        var keyEvent = mapBrowserEvent.originalEvent;
        var keyCode = keyEvent.keyCode;
        if (this.condition_(mapBrowserEvent) && (keyCode == KeyCode.DOWN || keyCode == KeyCode.LEFT || keyCode == KeyCode.RIGHT || keyCode == KeyCode.UP)) {
          var map = mapBrowserEvent.map;
          var view = map.getView();
          var mapUnitsDelta = view.getResolution() * this.pixelDelta_;
          var deltaX = 0, deltaY = 0;
          if (keyCode == KeyCode.DOWN) {
            deltaY = -mapUnitsDelta;
          } else if (keyCode == KeyCode.LEFT) {
            deltaX = -mapUnitsDelta;
          } else if (keyCode == KeyCode.RIGHT) {
            deltaX = mapUnitsDelta;
          } else {
            deltaY = mapUnitsDelta;
          }
          var delta = [deltaX, deltaY];
          rotate$1(delta, view.getRotation());
          pan(view, delta, this.duration_);
          keyEvent.preventDefault();
          stopEvent = true;
        }
      }
      return !stopEvent;
    };
    return KeyboardPan2;
  }(Interaction$1);
  var KeyboardPan$1 = KeyboardPan;
  var __extends$e = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var KeyboardZoom = function(_super) {
    __extends$e(KeyboardZoom2, _super);
    function KeyboardZoom2(opt_options) {
      var _this = _super.call(this) || this;
      var options = opt_options ? opt_options : {};
      _this.condition_ = options.condition ? options.condition : targetNotEditable;
      _this.delta_ = options.delta ? options.delta : 1;
      _this.duration_ = options.duration !== void 0 ? options.duration : 100;
      return _this;
    }
    KeyboardZoom2.prototype.handleEvent = function(mapBrowserEvent) {
      var stopEvent = false;
      if (mapBrowserEvent.type == EventType.KEYDOWN || mapBrowserEvent.type == EventType.KEYPRESS) {
        var keyEvent = mapBrowserEvent.originalEvent;
        var charCode = keyEvent.charCode;
        if (this.condition_(mapBrowserEvent) && (charCode == "+".charCodeAt(0) || charCode == "-".charCodeAt(0))) {
          var map = mapBrowserEvent.map;
          var delta = charCode == "+".charCodeAt(0) ? this.delta_ : -this.delta_;
          var view = map.getView();
          zoomByDelta(view, delta, void 0, this.duration_);
          keyEvent.preventDefault();
          stopEvent = true;
        }
      }
      return !stopEvent;
    };
    return KeyboardZoom2;
  }(Interaction$1);
  var KeyboardZoom$1 = KeyboardZoom;
  var __extends$d = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Mode = {
    TRACKPAD: "trackpad",
    WHEEL: "wheel"
  };
  var MouseWheelZoom = function(_super) {
    __extends$d(MouseWheelZoom2, _super);
    function MouseWheelZoom2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      _this = _super.call(this, options) || this;
      _this.totalDelta_ = 0;
      _this.lastDelta_ = 0;
      _this.maxDelta_ = options.maxDelta !== void 0 ? options.maxDelta : 1;
      _this.duration_ = options.duration !== void 0 ? options.duration : 250;
      _this.timeout_ = options.timeout !== void 0 ? options.timeout : 80;
      _this.useAnchor_ = options.useAnchor !== void 0 ? options.useAnchor : true;
      _this.constrainResolution_ = options.constrainResolution !== void 0 ? options.constrainResolution : false;
      var condition = options.condition ? options.condition : always;
      _this.condition_ = options.onFocusOnly ? all(focusWithTabindex, condition) : condition;
      _this.lastAnchor_ = null;
      _this.startTime_ = void 0;
      _this.timeoutId_;
      _this.mode_ = void 0;
      _this.trackpadEventGap_ = 400;
      _this.trackpadTimeoutId_;
      _this.deltaPerZoom_ = 300;
      return _this;
    }
    MouseWheelZoom2.prototype.endInteraction_ = function() {
      this.trackpadTimeoutId_ = void 0;
      var view = this.getMap().getView();
      view.endInteraction(void 0, this.lastDelta_ ? this.lastDelta_ > 0 ? 1 : -1 : 0, this.lastAnchor_);
    };
    MouseWheelZoom2.prototype.handleEvent = function(mapBrowserEvent) {
      if (!this.condition_(mapBrowserEvent)) {
        return true;
      }
      var type = mapBrowserEvent.type;
      if (type !== EventType.WHEEL) {
        return true;
      }
      var map = mapBrowserEvent.map;
      var wheelEvent = mapBrowserEvent.originalEvent;
      wheelEvent.preventDefault();
      if (this.useAnchor_) {
        this.lastAnchor_ = mapBrowserEvent.coordinate;
      }
      var delta;
      if (mapBrowserEvent.type == EventType.WHEEL) {
        delta = wheelEvent.deltaY;
        if (FIREFOX && wheelEvent.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
          delta /= DEVICE_PIXEL_RATIO;
        }
        if (wheelEvent.deltaMode === WheelEvent.DOM_DELTA_LINE) {
          delta *= 40;
        }
      }
      if (delta === 0) {
        return false;
      } else {
        this.lastDelta_ = delta;
      }
      var now = Date.now();
      if (this.startTime_ === void 0) {
        this.startTime_ = now;
      }
      if (!this.mode_ || now - this.startTime_ > this.trackpadEventGap_) {
        this.mode_ = Math.abs(delta) < 4 ? Mode.TRACKPAD : Mode.WHEEL;
      }
      var view = map.getView();
      if (this.mode_ === Mode.TRACKPAD && !(view.getConstrainResolution() || this.constrainResolution_)) {
        if (this.trackpadTimeoutId_) {
          clearTimeout(this.trackpadTimeoutId_);
        } else {
          if (view.getAnimating()) {
            view.cancelAnimations();
          }
          view.beginInteraction();
        }
        this.trackpadTimeoutId_ = setTimeout(this.endInteraction_.bind(this), this.timeout_);
        view.adjustZoom(-delta / this.deltaPerZoom_, this.lastAnchor_);
        this.startTime_ = now;
        return false;
      }
      this.totalDelta_ += delta;
      var timeLeft = Math.max(this.timeout_ - (now - this.startTime_), 0);
      clearTimeout(this.timeoutId_);
      this.timeoutId_ = setTimeout(this.handleWheelZoom_.bind(this, map), timeLeft);
      return false;
    };
    MouseWheelZoom2.prototype.handleWheelZoom_ = function(map) {
      var view = map.getView();
      if (view.getAnimating()) {
        view.cancelAnimations();
      }
      var delta = -clamp(this.totalDelta_, -this.maxDelta_ * this.deltaPerZoom_, this.maxDelta_ * this.deltaPerZoom_) / this.deltaPerZoom_;
      if (view.getConstrainResolution() || this.constrainResolution_) {
        delta = delta ? delta > 0 ? 1 : -1 : 0;
      }
      zoomByDelta(view, delta, this.lastAnchor_, this.duration_);
      this.mode_ = void 0;
      this.totalDelta_ = 0;
      this.lastAnchor_ = null;
      this.startTime_ = void 0;
      this.timeoutId_ = void 0;
    };
    MouseWheelZoom2.prototype.setMouseAnchor = function(useAnchor) {
      this.useAnchor_ = useAnchor;
      if (!useAnchor) {
        this.lastAnchor_ = null;
      }
    };
    return MouseWheelZoom2;
  }(Interaction$1);
  var MouseWheelZoom$1 = MouseWheelZoom;
  var __extends$c = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var PinchRotate = function(_super) {
    __extends$c(PinchRotate2, _super);
    function PinchRotate2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      var pointerOptions = options;
      if (!pointerOptions.stopDown) {
        pointerOptions.stopDown = FALSE;
      }
      _this = _super.call(this, pointerOptions) || this;
      _this.anchor_ = null;
      _this.lastAngle_ = void 0;
      _this.rotating_ = false;
      _this.rotationDelta_ = 0;
      _this.threshold_ = options.threshold !== void 0 ? options.threshold : 0.3;
      _this.duration_ = options.duration !== void 0 ? options.duration : 250;
      return _this;
    }
    PinchRotate2.prototype.handleDragEvent = function(mapBrowserEvent) {
      var rotationDelta = 0;
      var touch0 = this.targetPointers[0];
      var touch1 = this.targetPointers[1];
      var angle = Math.atan2(touch1.clientY - touch0.clientY, touch1.clientX - touch0.clientX);
      if (this.lastAngle_ !== void 0) {
        var delta = angle - this.lastAngle_;
        this.rotationDelta_ += delta;
        if (!this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_) {
          this.rotating_ = true;
        }
        rotationDelta = delta;
      }
      this.lastAngle_ = angle;
      var map = mapBrowserEvent.map;
      var view = map.getView();
      if (view.getConstraints().rotation === disable) {
        return;
      }
      var viewportPosition = map.getViewport().getBoundingClientRect();
      var centroid$1 = centroid(this.targetPointers);
      centroid$1[0] -= viewportPosition.left;
      centroid$1[1] -= viewportPosition.top;
      this.anchor_ = map.getCoordinateFromPixelInternal(centroid$1);
      if (this.rotating_) {
        map.render();
        view.adjustRotationInternal(rotationDelta, this.anchor_);
      }
    };
    PinchRotate2.prototype.handleUpEvent = function(mapBrowserEvent) {
      if (this.targetPointers.length < 2) {
        var map = mapBrowserEvent.map;
        var view = map.getView();
        view.endInteraction(this.duration_);
        return false;
      } else {
        return true;
      }
    };
    PinchRotate2.prototype.handleDownEvent = function(mapBrowserEvent) {
      if (this.targetPointers.length >= 2) {
        var map = mapBrowserEvent.map;
        this.anchor_ = null;
        this.lastAngle_ = void 0;
        this.rotating_ = false;
        this.rotationDelta_ = 0;
        if (!this.handlingDownUpSequence) {
          map.getView().beginInteraction();
        }
        return true;
      } else {
        return false;
      }
    };
    return PinchRotate2;
  }(PointerInteraction$1);
  var PinchRotate$1 = PinchRotate;
  var __extends$b = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var PinchZoom = function(_super) {
    __extends$b(PinchZoom2, _super);
    function PinchZoom2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      var pointerOptions = options;
      if (!pointerOptions.stopDown) {
        pointerOptions.stopDown = FALSE;
      }
      _this = _super.call(this, pointerOptions) || this;
      _this.anchor_ = null;
      _this.duration_ = options.duration !== void 0 ? options.duration : 400;
      _this.lastDistance_ = void 0;
      _this.lastScaleDelta_ = 1;
      return _this;
    }
    PinchZoom2.prototype.handleDragEvent = function(mapBrowserEvent) {
      var scaleDelta = 1;
      var touch0 = this.targetPointers[0];
      var touch1 = this.targetPointers[1];
      var dx = touch0.clientX - touch1.clientX;
      var dy = touch0.clientY - touch1.clientY;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (this.lastDistance_ !== void 0) {
        scaleDelta = this.lastDistance_ / distance;
      }
      this.lastDistance_ = distance;
      var map = mapBrowserEvent.map;
      var view = map.getView();
      if (scaleDelta != 1) {
        this.lastScaleDelta_ = scaleDelta;
      }
      var viewportPosition = map.getViewport().getBoundingClientRect();
      var centroid$1 = centroid(this.targetPointers);
      centroid$1[0] -= viewportPosition.left;
      centroid$1[1] -= viewportPosition.top;
      this.anchor_ = map.getCoordinateFromPixelInternal(centroid$1);
      map.render();
      view.adjustResolutionInternal(scaleDelta, this.anchor_);
    };
    PinchZoom2.prototype.handleUpEvent = function(mapBrowserEvent) {
      if (this.targetPointers.length < 2) {
        var map = mapBrowserEvent.map;
        var view = map.getView();
        var direction = this.lastScaleDelta_ > 1 ? 1 : -1;
        view.endInteraction(this.duration_, direction);
        return false;
      } else {
        return true;
      }
    };
    PinchZoom2.prototype.handleDownEvent = function(mapBrowserEvent) {
      if (this.targetPointers.length >= 2) {
        var map = mapBrowserEvent.map;
        this.anchor_ = null;
        this.lastDistance_ = void 0;
        this.lastScaleDelta_ = 1;
        if (!this.handlingDownUpSequence) {
          map.getView().beginInteraction();
        }
        return true;
      } else {
        return false;
      }
    };
    return PinchZoom2;
  }(PointerInteraction$1);
  var PinchZoom$1 = PinchZoom;
  function defaults(opt_options) {
    var options = opt_options ? opt_options : {};
    var interactions = new Collection$1();
    var kinetic = new Kinetic$1(-5e-3, 0.05, 100);
    var altShiftDragRotate = options.altShiftDragRotate !== void 0 ? options.altShiftDragRotate : true;
    if (altShiftDragRotate) {
      interactions.push(new DragRotate$1());
    }
    var doubleClickZoom = options.doubleClickZoom !== void 0 ? options.doubleClickZoom : true;
    if (doubleClickZoom) {
      interactions.push(new DoubleClickZoom$1({
        delta: options.zoomDelta,
        duration: options.zoomDuration
      }));
    }
    var dragPan = options.dragPan !== void 0 ? options.dragPan : true;
    if (dragPan) {
      interactions.push(new DragPan$1({
        onFocusOnly: options.onFocusOnly,
        kinetic
      }));
    }
    var pinchRotate = options.pinchRotate !== void 0 ? options.pinchRotate : true;
    if (pinchRotate) {
      interactions.push(new PinchRotate$1());
    }
    var pinchZoom = options.pinchZoom !== void 0 ? options.pinchZoom : true;
    if (pinchZoom) {
      interactions.push(new PinchZoom$1({
        duration: options.zoomDuration
      }));
    }
    var keyboard = options.keyboard !== void 0 ? options.keyboard : true;
    if (keyboard) {
      interactions.push(new KeyboardPan$1());
      interactions.push(new KeyboardZoom$1({
        delta: options.zoomDelta,
        duration: options.zoomDuration
      }));
    }
    var mouseWheelZoom = options.mouseWheelZoom !== void 0 ? options.mouseWheelZoom : true;
    if (mouseWheelZoom) {
      interactions.push(new MouseWheelZoom$1({
        onFocusOnly: options.onFocusOnly,
        duration: options.zoomDuration
      }));
    }
    var shiftDragZoom = options.shiftDragZoom !== void 0 ? options.shiftDragZoom : true;
    if (shiftDragZoom) {
      interactions.push(new DragZoom$1({
        duration: options.zoomDuration
      }));
    }
    return interactions;
  }
  var __extends$a = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var Map = function(_super) {
    __extends$a(Map2, _super);
    function Map2(options) {
      var _this = this;
      options = assign({}, options);
      if (!options.controls) {
        options.controls = defaults$1();
      }
      if (!options.interactions) {
        options.interactions = defaults({
          onFocusOnly: true
        });
      }
      _this = _super.call(this, options) || this;
      return _this;
    }
    Map2.prototype.createRenderer = function() {
      return new CompositeMapRenderer$1(this);
    };
    return Map2;
  }(PluggableMap$1);
  var Map$1 = Map;
  var LRUCache = function() {
    function LRUCache2(opt_highWaterMark) {
      this.highWaterMark = opt_highWaterMark !== void 0 ? opt_highWaterMark : 2048;
      this.count_ = 0;
      this.entries_ = {};
      this.oldest_ = null;
      this.newest_ = null;
    }
    LRUCache2.prototype.canExpireCache = function() {
      return this.highWaterMark > 0 && this.getCount() > this.highWaterMark;
    };
    LRUCache2.prototype.clear = function() {
      this.count_ = 0;
      this.entries_ = {};
      this.oldest_ = null;
      this.newest_ = null;
    };
    LRUCache2.prototype.containsKey = function(key) {
      return this.entries_.hasOwnProperty(key);
    };
    LRUCache2.prototype.forEach = function(f) {
      var entry = this.oldest_;
      while (entry) {
        f(entry.value_, entry.key_, this);
        entry = entry.newer;
      }
    };
    LRUCache2.prototype.get = function(key, opt_options) {
      var entry = this.entries_[key];
      assert(entry !== void 0, 15);
      if (entry === this.newest_) {
        return entry.value_;
      } else if (entry === this.oldest_) {
        this.oldest_ = this.oldest_.newer;
        this.oldest_.older = null;
      } else {
        entry.newer.older = entry.older;
        entry.older.newer = entry.newer;
      }
      entry.newer = null;
      entry.older = this.newest_;
      this.newest_.newer = entry;
      this.newest_ = entry;
      return entry.value_;
    };
    LRUCache2.prototype.remove = function(key) {
      var entry = this.entries_[key];
      assert(entry !== void 0, 15);
      if (entry === this.newest_) {
        this.newest_ = entry.older;
        if (this.newest_) {
          this.newest_.newer = null;
        }
      } else if (entry === this.oldest_) {
        this.oldest_ = entry.newer;
        if (this.oldest_) {
          this.oldest_.older = null;
        }
      } else {
        entry.newer.older = entry.older;
        entry.older.newer = entry.newer;
      }
      delete this.entries_[key];
      --this.count_;
      return entry.value_;
    };
    LRUCache2.prototype.getCount = function() {
      return this.count_;
    };
    LRUCache2.prototype.getKeys = function() {
      var keys = new Array(this.count_);
      var i = 0;
      var entry;
      for (entry = this.newest_; entry; entry = entry.older) {
        keys[i++] = entry.key_;
      }
      return keys;
    };
    LRUCache2.prototype.getValues = function() {
      var values = new Array(this.count_);
      var i = 0;
      var entry;
      for (entry = this.newest_; entry; entry = entry.older) {
        values[i++] = entry.value_;
      }
      return values;
    };
    LRUCache2.prototype.peekLast = function() {
      return this.oldest_.value_;
    };
    LRUCache2.prototype.peekLastKey = function() {
      return this.oldest_.key_;
    };
    LRUCache2.prototype.peekFirstKey = function() {
      return this.newest_.key_;
    };
    LRUCache2.prototype.pop = function() {
      var entry = this.oldest_;
      delete this.entries_[entry.key_];
      if (entry.newer) {
        entry.newer.older = null;
      }
      this.oldest_ = entry.newer;
      if (!this.oldest_) {
        this.newest_ = null;
      }
      --this.count_;
      return entry.value_;
    };
    LRUCache2.prototype.replace = function(key, value) {
      this.get(key);
      this.entries_[key].value_ = value;
    };
    LRUCache2.prototype.set = function(key, value) {
      assert(!(key in this.entries_), 16);
      var entry = {
        key_: key,
        newer: null,
        older: this.newest_,
        value_: value
      };
      if (!this.newest_) {
        this.oldest_ = entry;
      } else {
        this.newest_.newer = entry;
      }
      this.newest_ = entry;
      this.entries_[key] = entry;
      ++this.count_;
    };
    LRUCache2.prototype.setSize = function(size) {
      this.highWaterMark = size;
    };
    return LRUCache2;
  }();
  var LRUCache$1 = LRUCache;
  function createOrUpdate$1(z, x, y, opt_tileCoord) {
    if (opt_tileCoord !== void 0) {
      opt_tileCoord[0] = z;
      opt_tileCoord[1] = x;
      opt_tileCoord[2] = y;
      return opt_tileCoord;
    } else {
      return [z, x, y];
    }
  }
  function getKeyZXY(z, x, y) {
    return z + "/" + x + "/" + y;
  }
  function getKey(tileCoord) {
    return getKeyZXY(tileCoord[0], tileCoord[1], tileCoord[2]);
  }
  function fromKey(key) {
    return key.split("/").map(Number);
  }
  function hash(tileCoord) {
    return (tileCoord[1] << tileCoord[0]) + tileCoord[2];
  }
  function withinExtentAndZ(tileCoord, tileGrid) {
    var z = tileCoord[0];
    var x = tileCoord[1];
    var y = tileCoord[2];
    if (tileGrid.getMinZoom() > z || z > tileGrid.getMaxZoom()) {
      return false;
    }
    var tileRange = tileGrid.getFullTileRange(z);
    if (!tileRange) {
      return true;
    } else {
      return tileRange.containsXY(x, y);
    }
  }
  var __extends$9 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var TileCache = function(_super) {
    __extends$9(TileCache2, _super);
    function TileCache2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    TileCache2.prototype.expireCache = function(usedTiles) {
      while (this.canExpireCache()) {
        var tile = this.peekLast();
        if (tile.getKey() in usedTiles) {
          break;
        } else {
          this.pop().release();
        }
      }
    };
    TileCache2.prototype.pruneExceptNewestZ = function() {
      if (this.getCount() === 0) {
        return;
      }
      var key = this.peekFirstKey();
      var tileCoord = fromKey(key);
      var z = tileCoord[0];
      this.forEach(function(tile) {
        if (tile.tileCoord[0] !== z) {
          this.remove(getKey(tile.tileCoord));
          tile.release();
        }
      }.bind(this));
    };
    return TileCache2;
  }(LRUCache$1);
  var TileCache$1 = TileCache;
  var TileRange = function() {
    function TileRange2(minX, maxX, minY, maxY) {
      this.minX = minX;
      this.maxX = maxX;
      this.minY = minY;
      this.maxY = maxY;
    }
    TileRange2.prototype.contains = function(tileCoord) {
      return this.containsXY(tileCoord[1], tileCoord[2]);
    };
    TileRange2.prototype.containsTileRange = function(tileRange) {
      return this.minX <= tileRange.minX && tileRange.maxX <= this.maxX && this.minY <= tileRange.minY && tileRange.maxY <= this.maxY;
    };
    TileRange2.prototype.containsXY = function(x, y) {
      return this.minX <= x && x <= this.maxX && this.minY <= y && y <= this.maxY;
    };
    TileRange2.prototype.equals = function(tileRange) {
      return this.minX == tileRange.minX && this.minY == tileRange.minY && this.maxX == tileRange.maxX && this.maxY == tileRange.maxY;
    };
    TileRange2.prototype.extend = function(tileRange) {
      if (tileRange.minX < this.minX) {
        this.minX = tileRange.minX;
      }
      if (tileRange.maxX > this.maxX) {
        this.maxX = tileRange.maxX;
      }
      if (tileRange.minY < this.minY) {
        this.minY = tileRange.minY;
      }
      if (tileRange.maxY > this.maxY) {
        this.maxY = tileRange.maxY;
      }
    };
    TileRange2.prototype.getHeight = function() {
      return this.maxY - this.minY + 1;
    };
    TileRange2.prototype.getSize = function() {
      return [this.getWidth(), this.getHeight()];
    };
    TileRange2.prototype.getWidth = function() {
      return this.maxX - this.minX + 1;
    };
    TileRange2.prototype.intersects = function(tileRange) {
      return this.minX <= tileRange.maxX && this.maxX >= tileRange.minX && this.minY <= tileRange.maxY && this.maxY >= tileRange.minY;
    };
    return TileRange2;
  }();
  function createOrUpdate(minX, maxX, minY, maxY, tileRange) {
    if (tileRange !== void 0) {
      tileRange.minX = minX;
      tileRange.maxX = maxX;
      tileRange.minY = minY;
      tileRange.maxY = maxY;
      return tileRange;
    } else {
      return new TileRange(minX, maxX, minY, maxY);
    }
  }
  var TileRange$1 = TileRange;
  var TileProperty = {
    PRELOAD: "preload",
    USE_INTERIM_TILES_ON_ERROR: "useInterimTilesOnError"
  };
  var __extends$8 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var BaseTileLayer = function(_super) {
    __extends$8(BaseTileLayer2, _super);
    function BaseTileLayer2(opt_options) {
      var _this = this;
      var options = opt_options ? opt_options : {};
      var baseOptions = assign({}, options);
      delete baseOptions.preload;
      delete baseOptions.useInterimTilesOnError;
      _this = _super.call(this, baseOptions) || this;
      _this.on;
      _this.once;
      _this.un;
      _this.setPreload(options.preload !== void 0 ? options.preload : 0);
      _this.setUseInterimTilesOnError(options.useInterimTilesOnError !== void 0 ? options.useInterimTilesOnError : true);
      return _this;
    }
    BaseTileLayer2.prototype.getPreload = function() {
      return this.get(TileProperty.PRELOAD);
    };
    BaseTileLayer2.prototype.setPreload = function(preload) {
      this.set(TileProperty.PRELOAD, preload);
    };
    BaseTileLayer2.prototype.getUseInterimTilesOnError = function() {
      return this.get(TileProperty.USE_INTERIM_TILES_ON_ERROR);
    };
    BaseTileLayer2.prototype.setUseInterimTilesOnError = function(useInterimTilesOnError) {
      this.set(TileProperty.USE_INTERIM_TILES_ON_ERROR, useInterimTilesOnError);
    };
    return BaseTileLayer2;
  }(Layer$1);
  var BaseTileLayer$1 = BaseTileLayer;
  var __extends$7 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var CanvasTileLayerRenderer = function(_super) {
    __extends$7(CanvasTileLayerRenderer2, _super);
    function CanvasTileLayerRenderer2(tileLayer) {
      var _this = _super.call(this, tileLayer) || this;
      _this.extentChanged = true;
      _this.renderedExtent_ = null;
      _this.renderedPixelRatio;
      _this.renderedProjection = null;
      _this.renderedRevision;
      _this.renderedTiles = [];
      _this.newTiles_ = false;
      _this.tmpExtent = createEmpty();
      _this.tmpTileRange_ = new TileRange$1(0, 0, 0, 0);
      return _this;
    }
    CanvasTileLayerRenderer2.prototype.isDrawableTile = function(tile) {
      var tileLayer = this.getLayer();
      var tileState = tile.getState();
      var useInterimTilesOnError = tileLayer.getUseInterimTilesOnError();
      return tileState == TileState.LOADED || tileState == TileState.EMPTY || tileState == TileState.ERROR && !useInterimTilesOnError;
    };
    CanvasTileLayerRenderer2.prototype.getTile = function(z, x, y, frameState) {
      var pixelRatio = frameState.pixelRatio;
      var projection = frameState.viewState.projection;
      var tileLayer = this.getLayer();
      var tileSource = tileLayer.getSource();
      var tile = tileSource.getTile(z, x, y, pixelRatio, projection);
      if (tile.getState() == TileState.ERROR) {
        if (!tileLayer.getUseInterimTilesOnError()) {
          tile.setState(TileState.LOADED);
        } else if (tileLayer.getPreload() > 0) {
          this.newTiles_ = true;
        }
      }
      if (!this.isDrawableTile(tile)) {
        tile = tile.getInterimTile();
      }
      return tile;
    };
    CanvasTileLayerRenderer2.prototype.loadedTileCallback = function(tiles, zoom, tile) {
      if (this.isDrawableTile(tile)) {
        return _super.prototype.loadedTileCallback.call(this, tiles, zoom, tile);
      }
      return false;
    };
    CanvasTileLayerRenderer2.prototype.prepareFrame = function(frameState) {
      return !!this.getLayer().getSource();
    };
    CanvasTileLayerRenderer2.prototype.renderFrame = function(frameState, target) {
      var layerState = frameState.layerStatesArray[frameState.layerIndex];
      var viewState = frameState.viewState;
      var projection = viewState.projection;
      var viewResolution = viewState.resolution;
      var viewCenter = viewState.center;
      var rotation = viewState.rotation;
      var pixelRatio = frameState.pixelRatio;
      var tileLayer = this.getLayer();
      var tileSource = tileLayer.getSource();
      var sourceRevision = tileSource.getRevision();
      var tileGrid = tileSource.getTileGridForProjection(projection);
      var z = tileGrid.getZForResolution(viewResolution, tileSource.zDirection);
      var tileResolution = tileGrid.getResolution(z);
      var extent = frameState.extent;
      var layerExtent = layerState.extent && fromUserExtent(layerState.extent);
      if (layerExtent) {
        extent = getIntersection(extent, fromUserExtent(layerState.extent));
      }
      var tilePixelRatio = tileSource.getTilePixelRatio(pixelRatio);
      var width = Math.round(frameState.size[0] * tilePixelRatio);
      var height = Math.round(frameState.size[1] * tilePixelRatio);
      if (rotation) {
        var size = Math.round(Math.sqrt(width * width + height * height));
        width = size;
        height = size;
      }
      var dx = tileResolution * width / 2 / tilePixelRatio;
      var dy = tileResolution * height / 2 / tilePixelRatio;
      var canvasExtent = [
        viewCenter[0] - dx,
        viewCenter[1] - dy,
        viewCenter[0] + dx,
        viewCenter[1] + dy
      ];
      var tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z);
      var tilesToDrawByZ = {};
      tilesToDrawByZ[z] = {};
      var findLoadedTiles = this.createLoadedTileFinder(tileSource, projection, tilesToDrawByZ);
      var tmpExtent2 = this.tmpExtent;
      var tmpTileRange = this.tmpTileRange_;
      this.newTiles_ = false;
      for (var x = tileRange.minX; x <= tileRange.maxX; ++x) {
        for (var y = tileRange.minY; y <= tileRange.maxY; ++y) {
          var tile = this.getTile(z, x, y, frameState);
          if (this.isDrawableTile(tile)) {
            var uid = getUid(this);
            if (tile.getState() == TileState.LOADED) {
              tilesToDrawByZ[z][tile.tileCoord.toString()] = tile;
              var inTransition = tile.inTransition(uid);
              if (!this.newTiles_ && (inTransition || this.renderedTiles.indexOf(tile) === -1)) {
                this.newTiles_ = true;
              }
            }
            if (tile.getAlpha(uid, frameState.time) === 1) {
              continue;
            }
          }
          var childTileRange = tileGrid.getTileCoordChildTileRange(tile.tileCoord, tmpTileRange, tmpExtent2);
          var covered = false;
          if (childTileRange) {
            covered = findLoadedTiles(z + 1, childTileRange);
          }
          if (!covered) {
            tileGrid.forEachTileCoordParentTileRange(tile.tileCoord, findLoadedTiles, tmpTileRange, tmpExtent2);
          }
        }
      }
      var canvasScale = tileResolution / viewResolution;
      compose(this.pixelTransform, frameState.size[0] / 2, frameState.size[1] / 2, 1 / tilePixelRatio, 1 / tilePixelRatio, rotation, -width / 2, -height / 2);
      var canvasTransform = toString$1(this.pixelTransform);
      this.useContainer(target, canvasTransform, layerState.opacity);
      var context = this.context;
      var canvas = context.canvas;
      makeInverse(this.inversePixelTransform, this.pixelTransform);
      compose(this.tempTransform, width / 2, height / 2, canvasScale, canvasScale, 0, -width / 2, -height / 2);
      if (canvas.width != width || canvas.height != height) {
        canvas.width = width;
        canvas.height = height;
      } else if (!this.containerReused) {
        context.clearRect(0, 0, width, height);
      }
      if (layerExtent) {
        this.clipUnrotated(context, frameState, layerExtent);
      }
      assign(context, tileSource.getContextOptions());
      this.preRender(context, frameState);
      this.renderedTiles.length = 0;
      var zs = Object.keys(tilesToDrawByZ).map(Number);
      zs.sort(numberSafeCompareFunction);
      var clips, clipZs, currentClip;
      if (layerState.opacity === 1 && (!this.containerReused || tileSource.getOpaque(frameState.viewState.projection))) {
        zs = zs.reverse();
      } else {
        clips = [];
        clipZs = [];
      }
      for (var i = zs.length - 1; i >= 0; --i) {
        var currentZ = zs[i];
        var currentTilePixelSize = tileSource.getTilePixelSize(currentZ, pixelRatio, projection);
        var currentResolution = tileGrid.getResolution(currentZ);
        var currentScale = currentResolution / tileResolution;
        var dx_1 = currentTilePixelSize[0] * currentScale * canvasScale;
        var dy_1 = currentTilePixelSize[1] * currentScale * canvasScale;
        var originTileCoord = tileGrid.getTileCoordForCoordAndZ(getTopLeft(canvasExtent), currentZ);
        var originTileExtent = tileGrid.getTileCoordExtent(originTileCoord);
        var origin_1 = apply(this.tempTransform, [
          tilePixelRatio * (originTileExtent[0] - canvasExtent[0]) / tileResolution,
          tilePixelRatio * (canvasExtent[3] - originTileExtent[3]) / tileResolution
        ]);
        var tileGutter = tilePixelRatio * tileSource.getGutterForProjection(projection);
        var tilesToDraw = tilesToDrawByZ[currentZ];
        for (var tileCoordKey in tilesToDraw) {
          var tile = tilesToDraw[tileCoordKey];
          var tileCoord = tile.tileCoord;
          var xIndex = originTileCoord[1] - tileCoord[1];
          var nextX = Math.round(origin_1[0] - (xIndex - 1) * dx_1);
          var yIndex = originTileCoord[2] - tileCoord[2];
          var nextY = Math.round(origin_1[1] - (yIndex - 1) * dy_1);
          var x = Math.round(origin_1[0] - xIndex * dx_1);
          var y = Math.round(origin_1[1] - yIndex * dy_1);
          var w = nextX - x;
          var h = nextY - y;
          var transition = z === currentZ;
          var inTransition = transition && tile.getAlpha(getUid(this), frameState.time) !== 1;
          if (!inTransition) {
            if (clips) {
              context.save();
              currentClip = [x, y, x + w, y, x + w, y + h, x, y + h];
              for (var i_1 = 0, ii = clips.length; i_1 < ii; ++i_1) {
                if (z !== currentZ && currentZ < clipZs[i_1]) {
                  var clip = clips[i_1];
                  context.beginPath();
                  context.moveTo(currentClip[0], currentClip[1]);
                  context.lineTo(currentClip[2], currentClip[3]);
                  context.lineTo(currentClip[4], currentClip[5]);
                  context.lineTo(currentClip[6], currentClip[7]);
                  context.moveTo(clip[6], clip[7]);
                  context.lineTo(clip[4], clip[5]);
                  context.lineTo(clip[2], clip[3]);
                  context.lineTo(clip[0], clip[1]);
                  context.clip();
                }
              }
              clips.push(currentClip);
              clipZs.push(currentZ);
            } else {
              context.clearRect(x, y, w, h);
            }
          }
          this.drawTileImage(tile, frameState, x, y, w, h, tileGutter, transition);
          if (clips && !inTransition) {
            context.restore();
            this.renderedTiles.unshift(tile);
          } else {
            this.renderedTiles.push(tile);
          }
          this.updateUsedTiles(frameState.usedTiles, tileSource, tile);
        }
      }
      this.renderedRevision = sourceRevision;
      this.renderedResolution = tileResolution;
      this.extentChanged = !this.renderedExtent_ || !equals$1(this.renderedExtent_, canvasExtent);
      this.renderedExtent_ = canvasExtent;
      this.renderedPixelRatio = pixelRatio;
      this.renderedProjection = projection;
      this.manageTilePyramid(frameState, tileSource, tileGrid, pixelRatio, projection, extent, z, tileLayer.getPreload());
      this.scheduleExpireCache(frameState, tileSource);
      this.postRender(context, frameState);
      if (layerState.extent) {
        context.restore();
      }
      if (canvasTransform !== canvas.style.transform) {
        canvas.style.transform = canvasTransform;
      }
      var opacity = cssOpacity(layerState.opacity);
      var container = this.container;
      if (opacity !== container.style.opacity) {
        container.style.opacity = opacity;
      }
      return this.container;
    };
    CanvasTileLayerRenderer2.prototype.drawTileImage = function(tile, frameState, x, y, w, h, gutter, transition) {
      var image = this.getTileImage(tile);
      if (!image) {
        return;
      }
      var uid = getUid(this);
      var alpha = transition ? tile.getAlpha(uid, frameState.time) : 1;
      var alphaChanged = alpha !== this.context.globalAlpha;
      if (alphaChanged) {
        this.context.save();
        this.context.globalAlpha = alpha;
      }
      this.context.drawImage(image, gutter, gutter, image.width - 2 * gutter, image.height - 2 * gutter, x, y, w, h);
      if (alphaChanged) {
        this.context.restore();
      }
      if (alpha !== 1) {
        frameState.animate = true;
      } else if (transition) {
        tile.endTransition(uid);
      }
    };
    CanvasTileLayerRenderer2.prototype.getImage = function() {
      var context = this.context;
      return context ? context.canvas : null;
    };
    CanvasTileLayerRenderer2.prototype.getTileImage = function(tile) {
      return tile.getImage();
    };
    CanvasTileLayerRenderer2.prototype.scheduleExpireCache = function(frameState, tileSource) {
      if (tileSource.canExpireCache()) {
        var postRenderFunction = function(tileSource2, map, frameState2) {
          var tileSourceKey = getUid(tileSource2);
          if (tileSourceKey in frameState2.usedTiles) {
            tileSource2.expireCache(frameState2.viewState.projection, frameState2.usedTiles[tileSourceKey]);
          }
        }.bind(null, tileSource);
        frameState.postRenderFunctions.push(postRenderFunction);
      }
    };
    CanvasTileLayerRenderer2.prototype.updateUsedTiles = function(usedTiles, tileSource, tile) {
      var tileSourceKey = getUid(tileSource);
      if (!(tileSourceKey in usedTiles)) {
        usedTiles[tileSourceKey] = {};
      }
      usedTiles[tileSourceKey][tile.getKey()] = true;
    };
    CanvasTileLayerRenderer2.prototype.manageTilePyramid = function(frameState, tileSource, tileGrid, pixelRatio, projection, extent, currentZ, preload, opt_tileCallback) {
      var tileSourceKey = getUid(tileSource);
      if (!(tileSourceKey in frameState.wantedTiles)) {
        frameState.wantedTiles[tileSourceKey] = {};
      }
      var wantedTiles = frameState.wantedTiles[tileSourceKey];
      var tileQueue = frameState.tileQueue;
      var minZoom = tileGrid.getMinZoom();
      var tileCount = 0;
      var tile, tileRange, tileResolution, x, y, z;
      for (z = minZoom; z <= currentZ; ++z) {
        tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z, tileRange);
        tileResolution = tileGrid.getResolution(z);
        for (x = tileRange.minX; x <= tileRange.maxX; ++x) {
          for (y = tileRange.minY; y <= tileRange.maxY; ++y) {
            if (currentZ - z <= preload) {
              ++tileCount;
              tile = tileSource.getTile(z, x, y, pixelRatio, projection);
              if (tile.getState() == TileState.IDLE) {
                wantedTiles[tile.getKey()] = true;
                if (!tileQueue.isKeyQueued(tile.getKey())) {
                  tileQueue.enqueue([
                    tile,
                    tileSourceKey,
                    tileGrid.getTileCoordCenter(tile.tileCoord),
                    tileResolution
                  ]);
                }
              }
              if (opt_tileCallback !== void 0) {
                opt_tileCallback(tile);
              }
            } else {
              tileSource.useTile(z, x, y, projection);
            }
          }
        }
      }
      tileSource.updateCacheSize(tileCount, projection);
    };
    return CanvasTileLayerRenderer2;
  }(CanvasLayerRenderer$1);
  CanvasTileLayerRenderer.prototype.getLayer;
  var CanvasTileLayerRenderer$1 = CanvasTileLayerRenderer;
  var __extends$6 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var TileLayer = function(_super) {
    __extends$6(TileLayer2, _super);
    function TileLayer2(opt_options) {
      return _super.call(this, opt_options) || this;
    }
    TileLayer2.prototype.createRenderer = function() {
      return new CanvasTileLayerRenderer$1(this);
    };
    return TileLayer2;
  }(BaseTileLayer$1);
  var TileLayer$1 = TileLayer;
  var ERROR_THRESHOLD = 0.5;
  var ENABLE_RASTER_REPROJECTION = true;
  var MAX_SUBDIVISION = 10;
  var MAX_TRIANGLE_WIDTH = 0.25;
  var Triangulation = function() {
    function Triangulation2(sourceProj, targetProj, targetExtent, maxSourceExtent, errorThreshold, opt_destinationResolution) {
      this.sourceProj_ = sourceProj;
      this.targetProj_ = targetProj;
      var transformInvCache = {};
      var transformInv = getTransform(this.targetProj_, this.sourceProj_);
      this.transformInv_ = function(c) {
        var key = c[0] + "/" + c[1];
        if (!transformInvCache[key]) {
          transformInvCache[key] = transformInv(c);
        }
        return transformInvCache[key];
      };
      this.maxSourceExtent_ = maxSourceExtent;
      this.errorThresholdSquared_ = errorThreshold * errorThreshold;
      this.triangles_ = [];
      this.wrapsXInSource_ = false;
      this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!maxSourceExtent && !!this.sourceProj_.getExtent() && getWidth(maxSourceExtent) == getWidth(this.sourceProj_.getExtent());
      this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? getWidth(this.sourceProj_.getExtent()) : null;
      this.targetWorldWidth_ = this.targetProj_.getExtent() ? getWidth(this.targetProj_.getExtent()) : null;
      var destinationTopLeft = getTopLeft(targetExtent);
      var destinationTopRight = getTopRight(targetExtent);
      var destinationBottomRight = getBottomRight(targetExtent);
      var destinationBottomLeft = getBottomLeft(targetExtent);
      var sourceTopLeft = this.transformInv_(destinationTopLeft);
      var sourceTopRight = this.transformInv_(destinationTopRight);
      var sourceBottomRight = this.transformInv_(destinationBottomRight);
      var sourceBottomLeft = this.transformInv_(destinationBottomLeft);
      var maxSubdivision = MAX_SUBDIVISION + (opt_destinationResolution ? Math.max(0, Math.ceil(log2(getArea(targetExtent) / (opt_destinationResolution * opt_destinationResolution * 256 * 256)))) : 0);
      this.addQuad_(destinationTopLeft, destinationTopRight, destinationBottomRight, destinationBottomLeft, sourceTopLeft, sourceTopRight, sourceBottomRight, sourceBottomLeft, maxSubdivision);
      if (this.wrapsXInSource_) {
        var leftBound_1 = Infinity;
        this.triangles_.forEach(function(triangle, i, arr) {
          leftBound_1 = Math.min(leftBound_1, triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]);
        });
        this.triangles_.forEach(function(triangle) {
          if (Math.max(triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]) - leftBound_1 > this.sourceWorldWidth_ / 2) {
            var newTriangle = [
              [triangle.source[0][0], triangle.source[0][1]],
              [triangle.source[1][0], triangle.source[1][1]],
              [triangle.source[2][0], triangle.source[2][1]]
            ];
            if (newTriangle[0][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
              newTriangle[0][0] -= this.sourceWorldWidth_;
            }
            if (newTriangle[1][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
              newTriangle[1][0] -= this.sourceWorldWidth_;
            }
            if (newTriangle[2][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
              newTriangle[2][0] -= this.sourceWorldWidth_;
            }
            var minX = Math.min(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);
            var maxX = Math.max(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);
            if (maxX - minX < this.sourceWorldWidth_ / 2) {
              triangle.source = newTriangle;
            }
          }
        }.bind(this));
      }
      transformInvCache = {};
    }
    Triangulation2.prototype.addTriangle_ = function(a, b, c, aSrc, bSrc, cSrc) {
      this.triangles_.push({
        source: [aSrc, bSrc, cSrc],
        target: [a, b, c]
      });
    };
    Triangulation2.prototype.addQuad_ = function(a, b, c, d, aSrc, bSrc, cSrc, dSrc, maxSubdivision) {
      var sourceQuadExtent = boundingExtent([aSrc, bSrc, cSrc, dSrc]);
      var sourceCoverageX = this.sourceWorldWidth_ ? getWidth(sourceQuadExtent) / this.sourceWorldWidth_ : null;
      var sourceWorldWidth = this.sourceWorldWidth_;
      var wrapsX = this.sourceProj_.canWrapX() && sourceCoverageX > 0.5 && sourceCoverageX < 1;
      var needsSubdivision = false;
      if (maxSubdivision > 0) {
        if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
          var targetQuadExtent = boundingExtent([a, b, c, d]);
          var targetCoverageX = getWidth(targetQuadExtent) / this.targetWorldWidth_;
          needsSubdivision = targetCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
        }
        if (!wrapsX && this.sourceProj_.isGlobal() && sourceCoverageX) {
          needsSubdivision = sourceCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
        }
      }
      if (!needsSubdivision && this.maxSourceExtent_) {
        if (isFinite(sourceQuadExtent[0]) && isFinite(sourceQuadExtent[1]) && isFinite(sourceQuadExtent[2]) && isFinite(sourceQuadExtent[3])) {
          if (!intersects$1(sourceQuadExtent, this.maxSourceExtent_)) {
            return;
          }
        }
      }
      var isNotFinite = 0;
      if (!needsSubdivision) {
        if (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) || !isFinite(bSrc[0]) || !isFinite(bSrc[1]) || !isFinite(cSrc[0]) || !isFinite(cSrc[1]) || !isFinite(dSrc[0]) || !isFinite(dSrc[1])) {
          if (maxSubdivision > 0) {
            needsSubdivision = true;
          } else {
            isNotFinite = (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) ? 8 : 0) + (!isFinite(bSrc[0]) || !isFinite(bSrc[1]) ? 4 : 0) + (!isFinite(cSrc[0]) || !isFinite(cSrc[1]) ? 2 : 0) + (!isFinite(dSrc[0]) || !isFinite(dSrc[1]) ? 1 : 0);
            if (isNotFinite != 1 && isNotFinite != 2 && isNotFinite != 4 && isNotFinite != 8) {
              return;
            }
          }
        }
      }
      if (maxSubdivision > 0) {
        if (!needsSubdivision) {
          var center = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
          var centerSrc = this.transformInv_(center);
          var dx = void 0;
          if (wrapsX) {
            var centerSrcEstimX = (modulo(aSrc[0], sourceWorldWidth) + modulo(cSrc[0], sourceWorldWidth)) / 2;
            dx = centerSrcEstimX - modulo(centerSrc[0], sourceWorldWidth);
          } else {
            dx = (aSrc[0] + cSrc[0]) / 2 - centerSrc[0];
          }
          var dy = (aSrc[1] + cSrc[1]) / 2 - centerSrc[1];
          var centerSrcErrorSquared = dx * dx + dy * dy;
          needsSubdivision = centerSrcErrorSquared > this.errorThresholdSquared_;
        }
        if (needsSubdivision) {
          if (Math.abs(a[0] - c[0]) <= Math.abs(a[1] - c[1])) {
            var bc = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2];
            var bcSrc = this.transformInv_(bc);
            var da = [(d[0] + a[0]) / 2, (d[1] + a[1]) / 2];
            var daSrc = this.transformInv_(da);
            this.addQuad_(a, b, bc, da, aSrc, bSrc, bcSrc, daSrc, maxSubdivision - 1);
            this.addQuad_(da, bc, c, d, daSrc, bcSrc, cSrc, dSrc, maxSubdivision - 1);
          } else {
            var ab = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
            var abSrc = this.transformInv_(ab);
            var cd = [(c[0] + d[0]) / 2, (c[1] + d[1]) / 2];
            var cdSrc = this.transformInv_(cd);
            this.addQuad_(a, ab, cd, d, aSrc, abSrc, cdSrc, dSrc, maxSubdivision - 1);
            this.addQuad_(ab, b, c, cd, abSrc, bSrc, cSrc, cdSrc, maxSubdivision - 1);
          }
          return;
        }
      }
      if (wrapsX) {
        if (!this.canWrapXInSource_) {
          return;
        }
        this.wrapsXInSource_ = true;
      }
      if ((isNotFinite & 11) == 0) {
        this.addTriangle_(a, c, d, aSrc, cSrc, dSrc);
      }
      if ((isNotFinite & 14) == 0) {
        this.addTriangle_(a, c, b, aSrc, cSrc, bSrc);
      }
      if (isNotFinite) {
        if ((isNotFinite & 13) == 0) {
          this.addTriangle_(b, d, a, bSrc, dSrc, aSrc);
        }
        if ((isNotFinite & 7) == 0) {
          this.addTriangle_(b, d, c, bSrc, dSrc, cSrc);
        }
      }
    };
    Triangulation2.prototype.calculateSourceExtent = function() {
      var extent = createEmpty();
      this.triangles_.forEach(function(triangle, i, arr) {
        var src = triangle.source;
        extendCoordinate(extent, src[0]);
        extendCoordinate(extent, src[1]);
        extendCoordinate(extent, src[2]);
      });
      return extent;
    };
    Triangulation2.prototype.getTriangles = function() {
      return this.triangles_;
    };
    return Triangulation2;
  }();
  var Triangulation$1 = Triangulation;
  var IMAGE_SMOOTHING_DISABLED = {
    imageSmoothingEnabled: false,
    msImageSmoothingEnabled: false
  };
  var brokenDiagonalRendering_;
  function drawTestTriangle(ctx, u1, v1, u2, v2) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(u1, v1);
    ctx.lineTo(u2, v2);
    ctx.closePath();
    ctx.save();
    ctx.clip();
    ctx.fillRect(0, 0, Math.max(u1, u2) + 1, Math.max(v1, v2));
    ctx.restore();
  }
  function verifyBrokenDiagonalRendering(data, offset) {
    return Math.abs(data[offset * 4] - 210) > 2 || Math.abs(data[offset * 4 + 3] - 0.75 * 255) > 2;
  }
  function isBrokenDiagonalRendering() {
    if (brokenDiagonalRendering_ === void 0) {
      var ctx = document.createElement("canvas").getContext("2d");
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = "rgba(210, 0, 0, 0.75)";
      drawTestTriangle(ctx, 4, 5, 4, 0);
      drawTestTriangle(ctx, 4, 5, 0, 5);
      var data = ctx.getImageData(0, 0, 3, 3).data;
      brokenDiagonalRendering_ = verifyBrokenDiagonalRendering(data, 0) || verifyBrokenDiagonalRendering(data, 4) || verifyBrokenDiagonalRendering(data, 8);
    }
    return brokenDiagonalRendering_;
  }
  function calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution) {
    var sourceCenter = transform(targetCenter, targetProj, sourceProj);
    var sourceResolution = getPointResolution(targetProj, targetResolution, targetCenter);
    var targetMetersPerUnit = targetProj.getMetersPerUnit();
    if (targetMetersPerUnit !== void 0) {
      sourceResolution *= targetMetersPerUnit;
    }
    var sourceMetersPerUnit = sourceProj.getMetersPerUnit();
    if (sourceMetersPerUnit !== void 0) {
      sourceResolution /= sourceMetersPerUnit;
    }
    var sourceExtent = sourceProj.getExtent();
    if (!sourceExtent || containsCoordinate(sourceExtent, sourceCenter)) {
      var compensationFactor = getPointResolution(sourceProj, sourceResolution, sourceCenter) / sourceResolution;
      if (isFinite(compensationFactor) && compensationFactor > 0) {
        sourceResolution /= compensationFactor;
      }
    }
    return sourceResolution;
  }
  function calculateSourceExtentResolution(sourceProj, targetProj, targetExtent, targetResolution) {
    var targetCenter = getCenter(targetExtent);
    var sourceResolution = calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution);
    if (!isFinite(sourceResolution) || sourceResolution <= 0) {
      forEachCorner(targetExtent, function(corner) {
        sourceResolution = calculateSourceResolution(sourceProj, targetProj, corner, targetResolution);
        return isFinite(sourceResolution) && sourceResolution > 0;
      });
    }
    return sourceResolution;
  }
  function render(width, height, pixelRatio, sourceResolution, sourceExtent, targetResolution, targetExtent, triangulation, sources, gutter, opt_renderEdges, opt_contextOptions) {
    var context = createCanvasContext2D(Math.round(pixelRatio * width), Math.round(pixelRatio * height));
    assign(context, opt_contextOptions);
    if (sources.length === 0) {
      return context.canvas;
    }
    context.scale(pixelRatio, pixelRatio);
    function pixelRound(value) {
      return Math.round(value * pixelRatio) / pixelRatio;
    }
    context.globalCompositeOperation = "lighter";
    var sourceDataExtent = createEmpty();
    sources.forEach(function(src, i, arr) {
      extend$1(sourceDataExtent, src.extent);
    });
    var canvasWidthInUnits = getWidth(sourceDataExtent);
    var canvasHeightInUnits = getHeight(sourceDataExtent);
    var stitchContext = createCanvasContext2D(Math.round(pixelRatio * canvasWidthInUnits / sourceResolution), Math.round(pixelRatio * canvasHeightInUnits / sourceResolution));
    assign(stitchContext, opt_contextOptions);
    var stitchScale = pixelRatio / sourceResolution;
    sources.forEach(function(src, i, arr) {
      var xPos = src.extent[0] - sourceDataExtent[0];
      var yPos = -(src.extent[3] - sourceDataExtent[3]);
      var srcWidth = getWidth(src.extent);
      var srcHeight = getHeight(src.extent);
      if (src.image.width > 0 && src.image.height > 0) {
        stitchContext.drawImage(src.image, gutter, gutter, src.image.width - 2 * gutter, src.image.height - 2 * gutter, xPos * stitchScale, yPos * stitchScale, srcWidth * stitchScale, srcHeight * stitchScale);
      }
    });
    var targetTopLeft = getTopLeft(targetExtent);
    triangulation.getTriangles().forEach(function(triangle, i, arr) {
      var source = triangle.source;
      var target = triangle.target;
      var x0 = source[0][0], y0 = source[0][1];
      var x1 = source[1][0], y1 = source[1][1];
      var x2 = source[2][0], y2 = source[2][1];
      var u0 = pixelRound((target[0][0] - targetTopLeft[0]) / targetResolution);
      var v0 = pixelRound(-(target[0][1] - targetTopLeft[1]) / targetResolution);
      var u1 = pixelRound((target[1][0] - targetTopLeft[0]) / targetResolution);
      var v1 = pixelRound(-(target[1][1] - targetTopLeft[1]) / targetResolution);
      var u2 = pixelRound((target[2][0] - targetTopLeft[0]) / targetResolution);
      var v2 = pixelRound(-(target[2][1] - targetTopLeft[1]) / targetResolution);
      var sourceNumericalShiftX = x0;
      var sourceNumericalShiftY = y0;
      x0 = 0;
      y0 = 0;
      x1 -= sourceNumericalShiftX;
      y1 -= sourceNumericalShiftY;
      x2 -= sourceNumericalShiftX;
      y2 -= sourceNumericalShiftY;
      var augmentedMatrix = [
        [x1, y1, 0, 0, u1 - u0],
        [x2, y2, 0, 0, u2 - u0],
        [0, 0, x1, y1, v1 - v0],
        [0, 0, x2, y2, v2 - v0]
      ];
      var affineCoefs = solveLinearSystem(augmentedMatrix);
      if (!affineCoefs) {
        return;
      }
      context.save();
      context.beginPath();
      if (isBrokenDiagonalRendering() || opt_contextOptions === IMAGE_SMOOTHING_DISABLED) {
        context.moveTo(u1, v1);
        var steps = 4;
        var ud = u0 - u1;
        var vd = v0 - v1;
        for (var step = 0; step < steps; step++) {
          context.lineTo(u1 + pixelRound((step + 1) * ud / steps), v1 + pixelRound(step * vd / (steps - 1)));
          if (step != steps - 1) {
            context.lineTo(u1 + pixelRound((step + 1) * ud / steps), v1 + pixelRound((step + 1) * vd / (steps - 1)));
          }
        }
        context.lineTo(u2, v2);
      } else {
        context.moveTo(u1, v1);
        context.lineTo(u0, v0);
        context.lineTo(u2, v2);
      }
      context.clip();
      context.transform(affineCoefs[0], affineCoefs[2], affineCoefs[1], affineCoefs[3], u0, v0);
      context.translate(sourceDataExtent[0] - sourceNumericalShiftX, sourceDataExtent[3] - sourceNumericalShiftY);
      context.scale(sourceResolution / pixelRatio, -sourceResolution / pixelRatio);
      context.drawImage(stitchContext.canvas, 0, 0);
      context.restore();
    });
    if (opt_renderEdges) {
      context.save();
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = "black";
      context.lineWidth = 1;
      triangulation.getTriangles().forEach(function(triangle, i, arr) {
        var target = triangle.target;
        var u0 = (target[0][0] - targetTopLeft[0]) / targetResolution;
        var v0 = -(target[0][1] - targetTopLeft[1]) / targetResolution;
        var u1 = (target[1][0] - targetTopLeft[0]) / targetResolution;
        var v1 = -(target[1][1] - targetTopLeft[1]) / targetResolution;
        var u2 = (target[2][0] - targetTopLeft[0]) / targetResolution;
        var v2 = -(target[2][1] - targetTopLeft[1]) / targetResolution;
        context.beginPath();
        context.moveTo(u1, v1);
        context.lineTo(u0, v0);
        context.lineTo(u2, v2);
        context.closePath();
        context.stroke();
      });
      context.restore();
    }
    return context.canvas;
  }
  var __extends$5 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var ReprojTile = function(_super) {
    __extends$5(ReprojTile2, _super);
    function ReprojTile2(sourceProj, sourceTileGrid, targetProj, targetTileGrid, tileCoord, wrappedTileCoord, pixelRatio, gutter, getTileFunction, opt_errorThreshold, opt_renderEdges, opt_contextOptions) {
      var _this = _super.call(this, tileCoord, TileState.IDLE) || this;
      _this.renderEdges_ = opt_renderEdges !== void 0 ? opt_renderEdges : false;
      _this.contextOptions_ = opt_contextOptions;
      _this.pixelRatio_ = pixelRatio;
      _this.gutter_ = gutter;
      _this.canvas_ = null;
      _this.sourceTileGrid_ = sourceTileGrid;
      _this.targetTileGrid_ = targetTileGrid;
      _this.wrappedTileCoord_ = wrappedTileCoord ? wrappedTileCoord : tileCoord;
      _this.sourceTiles_ = [];
      _this.sourcesListenerKeys_ = null;
      _this.sourceZ_ = 0;
      var targetExtent = targetTileGrid.getTileCoordExtent(_this.wrappedTileCoord_);
      var maxTargetExtent = _this.targetTileGrid_.getExtent();
      var maxSourceExtent = _this.sourceTileGrid_.getExtent();
      var limitedTargetExtent = maxTargetExtent ? getIntersection(targetExtent, maxTargetExtent) : targetExtent;
      if (getArea(limitedTargetExtent) === 0) {
        _this.state = TileState.EMPTY;
        return _this;
      }
      var sourceProjExtent = sourceProj.getExtent();
      if (sourceProjExtent) {
        if (!maxSourceExtent) {
          maxSourceExtent = sourceProjExtent;
        } else {
          maxSourceExtent = getIntersection(maxSourceExtent, sourceProjExtent);
        }
      }
      var targetResolution = targetTileGrid.getResolution(_this.wrappedTileCoord_[0]);
      var sourceResolution = calculateSourceExtentResolution(sourceProj, targetProj, limitedTargetExtent, targetResolution);
      if (!isFinite(sourceResolution) || sourceResolution <= 0) {
        _this.state = TileState.EMPTY;
        return _this;
      }
      var errorThresholdInPixels = opt_errorThreshold !== void 0 ? opt_errorThreshold : ERROR_THRESHOLD;
      _this.triangulation_ = new Triangulation$1(sourceProj, targetProj, limitedTargetExtent, maxSourceExtent, sourceResolution * errorThresholdInPixels, targetResolution);
      if (_this.triangulation_.getTriangles().length === 0) {
        _this.state = TileState.EMPTY;
        return _this;
      }
      _this.sourceZ_ = sourceTileGrid.getZForResolution(sourceResolution);
      var sourceExtent = _this.triangulation_.calculateSourceExtent();
      if (maxSourceExtent) {
        if (sourceProj.canWrapX()) {
          sourceExtent[1] = clamp(sourceExtent[1], maxSourceExtent[1], maxSourceExtent[3]);
          sourceExtent[3] = clamp(sourceExtent[3], maxSourceExtent[1], maxSourceExtent[3]);
        } else {
          sourceExtent = getIntersection(sourceExtent, maxSourceExtent);
        }
      }
      if (!getArea(sourceExtent)) {
        _this.state = TileState.EMPTY;
      } else {
        var sourceRange = sourceTileGrid.getTileRangeForExtentAndZ(sourceExtent, _this.sourceZ_);
        for (var srcX = sourceRange.minX; srcX <= sourceRange.maxX; srcX++) {
          for (var srcY = sourceRange.minY; srcY <= sourceRange.maxY; srcY++) {
            var tile = getTileFunction(_this.sourceZ_, srcX, srcY, pixelRatio);
            if (tile) {
              _this.sourceTiles_.push(tile);
            }
          }
        }
        if (_this.sourceTiles_.length === 0) {
          _this.state = TileState.EMPTY;
        }
      }
      return _this;
    }
    ReprojTile2.prototype.getImage = function() {
      return this.canvas_;
    };
    ReprojTile2.prototype.reproject_ = function() {
      var sources = [];
      this.sourceTiles_.forEach(function(tile, i, arr) {
        if (tile && tile.getState() == TileState.LOADED) {
          sources.push({
            extent: this.sourceTileGrid_.getTileCoordExtent(tile.tileCoord),
            image: tile.getImage()
          });
        }
      }.bind(this));
      this.sourceTiles_.length = 0;
      if (sources.length === 0) {
        this.state = TileState.ERROR;
      } else {
        var z = this.wrappedTileCoord_[0];
        var size = this.targetTileGrid_.getTileSize(z);
        var width = typeof size === "number" ? size : size[0];
        var height = typeof size === "number" ? size : size[1];
        var targetResolution = this.targetTileGrid_.getResolution(z);
        var sourceResolution = this.sourceTileGrid_.getResolution(this.sourceZ_);
        var targetExtent = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
        this.canvas_ = render(width, height, this.pixelRatio_, sourceResolution, this.sourceTileGrid_.getExtent(), targetResolution, targetExtent, this.triangulation_, sources, this.gutter_, this.renderEdges_, this.contextOptions_);
        this.state = TileState.LOADED;
      }
      this.changed();
    };
    ReprojTile2.prototype.load = function() {
      if (this.state == TileState.IDLE) {
        this.state = TileState.LOADING;
        this.changed();
        var leftToLoad_1 = 0;
        this.sourcesListenerKeys_ = [];
        this.sourceTiles_.forEach(function(tile, i, arr) {
          var state = tile.getState();
          if (state == TileState.IDLE || state == TileState.LOADING) {
            leftToLoad_1++;
            var sourceListenKey_1 = listen(tile, EventType.CHANGE, function(e) {
              var state2 = tile.getState();
              if (state2 == TileState.LOADED || state2 == TileState.ERROR || state2 == TileState.EMPTY) {
                unlistenByKey(sourceListenKey_1);
                leftToLoad_1--;
                if (leftToLoad_1 === 0) {
                  this.unlistenSources_();
                  this.reproject_();
                }
              }
            }, this);
            this.sourcesListenerKeys_.push(sourceListenKey_1);
          }
        }.bind(this));
        if (leftToLoad_1 === 0) {
          setTimeout(this.reproject_.bind(this), 0);
        } else {
          this.sourceTiles_.forEach(function(tile, i, arr) {
            var state = tile.getState();
            if (state == TileState.IDLE) {
              tile.load();
            }
          });
        }
      }
    };
    ReprojTile2.prototype.unlistenSources_ = function() {
      this.sourcesListenerKeys_.forEach(unlistenByKey);
      this.sourcesListenerKeys_ = null;
    };
    return ReprojTile2;
  }(Tile$1);
  var ReprojTile$1 = ReprojTile;
  var TileEventType = {
    TILELOADSTART: "tileloadstart",
    TILELOADEND: "tileloadend",
    TILELOADERROR: "tileloaderror"
  };
  var tmpTileCoord = [0, 0, 0];
  var TileGrid = function() {
    function TileGrid2(options) {
      this.minZoom = options.minZoom !== void 0 ? options.minZoom : 0;
      this.resolutions_ = options.resolutions;
      assert(isSorted(this.resolutions_, function(a, b) {
        return b - a;
      }, true), 17);
      var zoomFactor;
      if (!options.origins) {
        for (var i = 0, ii = this.resolutions_.length - 1; i < ii; ++i) {
          if (!zoomFactor) {
            zoomFactor = this.resolutions_[i] / this.resolutions_[i + 1];
          } else {
            if (this.resolutions_[i] / this.resolutions_[i + 1] !== zoomFactor) {
              zoomFactor = void 0;
              break;
            }
          }
        }
      }
      this.zoomFactor_ = zoomFactor;
      this.maxZoom = this.resolutions_.length - 1;
      this.origin_ = options.origin !== void 0 ? options.origin : null;
      this.origins_ = null;
      if (options.origins !== void 0) {
        this.origins_ = options.origins;
        assert(this.origins_.length == this.resolutions_.length, 20);
      }
      var extent = options.extent;
      if (extent !== void 0 && !this.origin_ && !this.origins_) {
        this.origin_ = getTopLeft(extent);
      }
      assert(!this.origin_ && this.origins_ || this.origin_ && !this.origins_, 18);
      this.tileSizes_ = null;
      if (options.tileSizes !== void 0) {
        this.tileSizes_ = options.tileSizes;
        assert(this.tileSizes_.length == this.resolutions_.length, 19);
      }
      this.tileSize_ = options.tileSize !== void 0 ? options.tileSize : !this.tileSizes_ ? DEFAULT_TILE_SIZE : null;
      assert(!this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_, 22);
      this.extent_ = extent !== void 0 ? extent : null;
      this.fullTileRanges_ = null;
      this.tmpSize_ = [0, 0];
      this.tmpExtent_ = [0, 0, 0, 0];
      if (options.sizes !== void 0) {
        this.fullTileRanges_ = options.sizes.map(function(size, z) {
          var tileRange = new TileRange$1(Math.min(0, size[0]), Math.max(size[0] - 1, -1), Math.min(0, size[1]), Math.max(size[1] - 1, -1));
          if (extent) {
            var restrictedTileRange = this.getTileRangeForExtentAndZ(extent, z);
            tileRange.minX = Math.max(restrictedTileRange.minX, tileRange.minX);
            tileRange.maxX = Math.min(restrictedTileRange.maxX, tileRange.maxX);
            tileRange.minY = Math.max(restrictedTileRange.minY, tileRange.minY);
            tileRange.maxY = Math.min(restrictedTileRange.maxY, tileRange.maxY);
          }
          return tileRange;
        }, this);
      } else if (extent) {
        this.calculateTileRanges_(extent);
      }
    }
    TileGrid2.prototype.forEachTileCoord = function(extent, zoom, callback) {
      var tileRange = this.getTileRangeForExtentAndZ(extent, zoom);
      for (var i = tileRange.minX, ii = tileRange.maxX; i <= ii; ++i) {
        for (var j = tileRange.minY, jj = tileRange.maxY; j <= jj; ++j) {
          callback([zoom, i, j]);
        }
      }
    };
    TileGrid2.prototype.forEachTileCoordParentTileRange = function(tileCoord, callback, opt_tileRange, opt_extent) {
      var tileRange, x, y;
      var tileCoordExtent = null;
      var z = tileCoord[0] - 1;
      if (this.zoomFactor_ === 2) {
        x = tileCoord[1];
        y = tileCoord[2];
      } else {
        tileCoordExtent = this.getTileCoordExtent(tileCoord, opt_extent);
      }
      while (z >= this.minZoom) {
        if (this.zoomFactor_ === 2) {
          x = Math.floor(x / 2);
          y = Math.floor(y / 2);
          tileRange = createOrUpdate(x, x, y, y, opt_tileRange);
        } else {
          tileRange = this.getTileRangeForExtentAndZ(tileCoordExtent, z, opt_tileRange);
        }
        if (callback(z, tileRange)) {
          return true;
        }
        --z;
      }
      return false;
    };
    TileGrid2.prototype.getExtent = function() {
      return this.extent_;
    };
    TileGrid2.prototype.getMaxZoom = function() {
      return this.maxZoom;
    };
    TileGrid2.prototype.getMinZoom = function() {
      return this.minZoom;
    };
    TileGrid2.prototype.getOrigin = function(z) {
      if (this.origin_) {
        return this.origin_;
      } else {
        return this.origins_[z];
      }
    };
    TileGrid2.prototype.getResolution = function(z) {
      return this.resolutions_[z];
    };
    TileGrid2.prototype.getResolutions = function() {
      return this.resolutions_;
    };
    TileGrid2.prototype.getTileCoordChildTileRange = function(tileCoord, opt_tileRange, opt_extent) {
      if (tileCoord[0] < this.maxZoom) {
        if (this.zoomFactor_ === 2) {
          var minX = tileCoord[1] * 2;
          var minY = tileCoord[2] * 2;
          return createOrUpdate(minX, minX + 1, minY, minY + 1, opt_tileRange);
        }
        var tileCoordExtent = this.getTileCoordExtent(tileCoord, opt_extent || this.tmpExtent_);
        return this.getTileRangeForExtentAndZ(tileCoordExtent, tileCoord[0] + 1, opt_tileRange);
      }
      return null;
    };
    TileGrid2.prototype.getTileRangeForTileCoordAndZ = function(tileCoord, z, opt_tileRange) {
      if (z > this.maxZoom || z < this.minZoom) {
        return null;
      }
      var tileCoordZ = tileCoord[0];
      var tileCoordX = tileCoord[1];
      var tileCoordY = tileCoord[2];
      if (z === tileCoordZ) {
        return createOrUpdate(tileCoordX, tileCoordY, tileCoordX, tileCoordY, opt_tileRange);
      }
      if (this.zoomFactor_) {
        var factor = Math.pow(this.zoomFactor_, z - tileCoordZ);
        var minX = Math.floor(tileCoordX * factor);
        var minY = Math.floor(tileCoordY * factor);
        if (z < tileCoordZ) {
          return createOrUpdate(minX, minX, minY, minY, opt_tileRange);
        }
        var maxX = Math.floor(factor * (tileCoordX + 1)) - 1;
        var maxY = Math.floor(factor * (tileCoordY + 1)) - 1;
        return createOrUpdate(minX, maxX, minY, maxY, opt_tileRange);
      }
      var tileCoordExtent = this.getTileCoordExtent(tileCoord, this.tmpExtent_);
      return this.getTileRangeForExtentAndZ(tileCoordExtent, z, opt_tileRange);
    };
    TileGrid2.prototype.getTileRangeExtent = function(z, tileRange, opt_extent) {
      var origin = this.getOrigin(z);
      var resolution = this.getResolution(z);
      var tileSize = toSize(this.getTileSize(z), this.tmpSize_);
      var minX = origin[0] + tileRange.minX * tileSize[0] * resolution;
      var maxX = origin[0] + (tileRange.maxX + 1) * tileSize[0] * resolution;
      var minY = origin[1] + tileRange.minY * tileSize[1] * resolution;
      var maxY = origin[1] + (tileRange.maxY + 1) * tileSize[1] * resolution;
      return createOrUpdate$2(minX, minY, maxX, maxY, opt_extent);
    };
    TileGrid2.prototype.getTileRangeForExtentAndZ = function(extent, z, opt_tileRange) {
      var tileCoord = tmpTileCoord;
      this.getTileCoordForXYAndZ_(extent[0], extent[3], z, false, tileCoord);
      var minX = tileCoord[1];
      var minY = tileCoord[2];
      this.getTileCoordForXYAndZ_(extent[2], extent[1], z, true, tileCoord);
      return createOrUpdate(minX, tileCoord[1], minY, tileCoord[2], opt_tileRange);
    };
    TileGrid2.prototype.getTileCoordCenter = function(tileCoord) {
      var origin = this.getOrigin(tileCoord[0]);
      var resolution = this.getResolution(tileCoord[0]);
      var tileSize = toSize(this.getTileSize(tileCoord[0]), this.tmpSize_);
      return [
        origin[0] + (tileCoord[1] + 0.5) * tileSize[0] * resolution,
        origin[1] - (tileCoord[2] + 0.5) * tileSize[1] * resolution
      ];
    };
    TileGrid2.prototype.getTileCoordExtent = function(tileCoord, opt_extent) {
      var origin = this.getOrigin(tileCoord[0]);
      var resolution = this.getResolution(tileCoord[0]);
      var tileSize = toSize(this.getTileSize(tileCoord[0]), this.tmpSize_);
      var minX = origin[0] + tileCoord[1] * tileSize[0] * resolution;
      var minY = origin[1] - (tileCoord[2] + 1) * tileSize[1] * resolution;
      var maxX = minX + tileSize[0] * resolution;
      var maxY = minY + tileSize[1] * resolution;
      return createOrUpdate$2(minX, minY, maxX, maxY, opt_extent);
    };
    TileGrid2.prototype.getTileCoordForCoordAndResolution = function(coordinate, resolution, opt_tileCoord) {
      return this.getTileCoordForXYAndResolution_(coordinate[0], coordinate[1], resolution, false, opt_tileCoord);
    };
    TileGrid2.prototype.getTileCoordForXYAndResolution_ = function(x, y, resolution, reverseIntersectionPolicy, opt_tileCoord) {
      var z = this.getZForResolution(resolution);
      var scale2 = resolution / this.getResolution(z);
      var origin = this.getOrigin(z);
      var tileSize = toSize(this.getTileSize(z), this.tmpSize_);
      var adjustX = reverseIntersectionPolicy ? 0.5 : 0;
      var adjustY = reverseIntersectionPolicy ? 0.5 : 0;
      var xFromOrigin = Math.floor((x - origin[0]) / resolution + adjustX);
      var yFromOrigin = Math.floor((origin[1] - y) / resolution + adjustY);
      var tileCoordX = scale2 * xFromOrigin / tileSize[0];
      var tileCoordY = scale2 * yFromOrigin / tileSize[1];
      if (reverseIntersectionPolicy) {
        tileCoordX = Math.ceil(tileCoordX) - 1;
        tileCoordY = Math.ceil(tileCoordY) - 1;
      } else {
        tileCoordX = Math.floor(tileCoordX);
        tileCoordY = Math.floor(tileCoordY);
      }
      return createOrUpdate$1(z, tileCoordX, tileCoordY, opt_tileCoord);
    };
    TileGrid2.prototype.getTileCoordForXYAndZ_ = function(x, y, z, reverseIntersectionPolicy, opt_tileCoord) {
      var origin = this.getOrigin(z);
      var resolution = this.getResolution(z);
      var tileSize = toSize(this.getTileSize(z), this.tmpSize_);
      var adjustX = reverseIntersectionPolicy ? 0.5 : 0;
      var adjustY = reverseIntersectionPolicy ? 0.5 : 0;
      var xFromOrigin = Math.floor((x - origin[0]) / resolution + adjustX);
      var yFromOrigin = Math.floor((origin[1] - y) / resolution + adjustY);
      var tileCoordX = xFromOrigin / tileSize[0];
      var tileCoordY = yFromOrigin / tileSize[1];
      if (reverseIntersectionPolicy) {
        tileCoordX = Math.ceil(tileCoordX) - 1;
        tileCoordY = Math.ceil(tileCoordY) - 1;
      } else {
        tileCoordX = Math.floor(tileCoordX);
        tileCoordY = Math.floor(tileCoordY);
      }
      return createOrUpdate$1(z, tileCoordX, tileCoordY, opt_tileCoord);
    };
    TileGrid2.prototype.getTileCoordForCoordAndZ = function(coordinate, z, opt_tileCoord) {
      return this.getTileCoordForXYAndZ_(coordinate[0], coordinate[1], z, false, opt_tileCoord);
    };
    TileGrid2.prototype.getTileCoordResolution = function(tileCoord) {
      return this.resolutions_[tileCoord[0]];
    };
    TileGrid2.prototype.getTileSize = function(z) {
      if (this.tileSize_) {
        return this.tileSize_;
      } else {
        return this.tileSizes_[z];
      }
    };
    TileGrid2.prototype.getFullTileRange = function(z) {
      if (!this.fullTileRanges_) {
        return this.extent_ ? this.getTileRangeForExtentAndZ(this.extent_, z) : null;
      } else {
        return this.fullTileRanges_[z];
      }
    };
    TileGrid2.prototype.getZForResolution = function(resolution, opt_direction) {
      var z = linearFindNearest(this.resolutions_, resolution, opt_direction || 0);
      return clamp(z, this.minZoom, this.maxZoom);
    };
    TileGrid2.prototype.calculateTileRanges_ = function(extent) {
      var length = this.resolutions_.length;
      var fullTileRanges = new Array(length);
      for (var z = this.minZoom; z < length; ++z) {
        fullTileRanges[z] = this.getTileRangeForExtentAndZ(extent, z);
      }
      this.fullTileRanges_ = fullTileRanges;
    };
    return TileGrid2;
  }();
  var TileGrid$1 = TileGrid;
  function getForProjection(projection) {
    var tileGrid = projection.getDefaultTileGrid();
    if (!tileGrid) {
      tileGrid = createForProjection(projection);
      projection.setDefaultTileGrid(tileGrid);
    }
    return tileGrid;
  }
  function wrapX(tileGrid, tileCoord, projection) {
    var z = tileCoord[0];
    var center = tileGrid.getTileCoordCenter(tileCoord);
    var projectionExtent = extentFromProjection(projection);
    if (!containsCoordinate(projectionExtent, center)) {
      var worldWidth = getWidth(projectionExtent);
      var worldsAway = Math.ceil((projectionExtent[0] - center[0]) / worldWidth);
      center[0] += worldWidth * worldsAway;
      return tileGrid.getTileCoordForCoordAndZ(center, z);
    } else {
      return tileCoord;
    }
  }
  function createForExtent(extent, opt_maxZoom, opt_tileSize, opt_corner) {
    var corner = opt_corner !== void 0 ? opt_corner : Corner.TOP_LEFT;
    var resolutions = resolutionsFromExtent(extent, opt_maxZoom, opt_tileSize);
    return new TileGrid$1({
      extent,
      origin: getCorner(extent, corner),
      resolutions,
      tileSize: opt_tileSize
    });
  }
  function createXYZ(opt_options) {
    var xyzOptions = opt_options || {};
    var extent = xyzOptions.extent || get$1("EPSG:3857").getExtent();
    var gridOptions = {
      extent,
      minZoom: xyzOptions.minZoom,
      tileSize: xyzOptions.tileSize,
      resolutions: resolutionsFromExtent(extent, xyzOptions.maxZoom, xyzOptions.tileSize, xyzOptions.maxResolution)
    };
    return new TileGrid$1(gridOptions);
  }
  function resolutionsFromExtent(extent, opt_maxZoom, opt_tileSize, opt_maxResolution) {
    var maxZoom = opt_maxZoom !== void 0 ? opt_maxZoom : DEFAULT_MAX_ZOOM;
    var height = getHeight(extent);
    var width = getWidth(extent);
    var tileSize = toSize(opt_tileSize !== void 0 ? opt_tileSize : DEFAULT_TILE_SIZE);
    var maxResolution = opt_maxResolution > 0 ? opt_maxResolution : Math.max(width / tileSize[0], height / tileSize[1]);
    var length = maxZoom + 1;
    var resolutions = new Array(length);
    for (var z = 0; z < length; ++z) {
      resolutions[z] = maxResolution / Math.pow(2, z);
    }
    return resolutions;
  }
  function createForProjection(projection, opt_maxZoom, opt_tileSize, opt_corner) {
    var extent = extentFromProjection(projection);
    return createForExtent(extent, opt_maxZoom, opt_tileSize, opt_corner);
  }
  function extentFromProjection(projection) {
    projection = get$1(projection);
    var extent = projection.getExtent();
    if (!extent) {
      var half = 180 * METERS_PER_UNIT$1[Units$1.DEGREES] / projection.getMetersPerUnit();
      extent = createOrUpdate$2(-half, -half, half, half);
    }
    return extent;
  }
  var __extends$4 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var TileSource = function(_super) {
    __extends$4(TileSource2, _super);
    function TileSource2(options) {
      var _this = _super.call(this, {
        attributions: options.attributions,
        attributionsCollapsible: options.attributionsCollapsible,
        projection: options.projection,
        state: options.state,
        wrapX: options.wrapX
      }) || this;
      _this.on;
      _this.once;
      _this.un;
      _this.opaque_ = options.opaque !== void 0 ? options.opaque : false;
      _this.tilePixelRatio_ = options.tilePixelRatio !== void 0 ? options.tilePixelRatio : 1;
      _this.tileGrid = options.tileGrid !== void 0 ? options.tileGrid : null;
      var tileSize = [256, 256];
      var tileGrid = options.tileGrid;
      if (tileGrid) {
        toSize(tileGrid.getTileSize(tileGrid.getMinZoom()), tileSize);
      }
      _this.tileCache = new TileCache$1(options.cacheSize || 0);
      _this.tmpSize = [0, 0];
      _this.key_ = options.key || "";
      _this.tileOptions = { transition: options.transition };
      _this.zDirection = options.zDirection ? options.zDirection : 0;
      return _this;
    }
    TileSource2.prototype.canExpireCache = function() {
      return this.tileCache.canExpireCache();
    };
    TileSource2.prototype.expireCache = function(projection, usedTiles) {
      var tileCache = this.getTileCacheForProjection(projection);
      if (tileCache) {
        tileCache.expireCache(usedTiles);
      }
    };
    TileSource2.prototype.forEachLoadedTile = function(projection, z, tileRange, callback) {
      var tileCache = this.getTileCacheForProjection(projection);
      if (!tileCache) {
        return false;
      }
      var covered = true;
      var tile, tileCoordKey, loaded;
      for (var x = tileRange.minX; x <= tileRange.maxX; ++x) {
        for (var y = tileRange.minY; y <= tileRange.maxY; ++y) {
          tileCoordKey = getKeyZXY(z, x, y);
          loaded = false;
          if (tileCache.containsKey(tileCoordKey)) {
            tile = tileCache.get(tileCoordKey);
            loaded = tile.getState() === TileState.LOADED;
            if (loaded) {
              loaded = callback(tile) !== false;
            }
          }
          if (!loaded) {
            covered = false;
          }
        }
      }
      return covered;
    };
    TileSource2.prototype.getGutterForProjection = function(projection) {
      return 0;
    };
    TileSource2.prototype.getKey = function() {
      return this.key_;
    };
    TileSource2.prototype.setKey = function(key) {
      if (this.key_ !== key) {
        this.key_ = key;
        this.changed();
      }
    };
    TileSource2.prototype.getOpaque = function(projection) {
      return this.opaque_;
    };
    TileSource2.prototype.getResolutions = function() {
      return this.tileGrid.getResolutions();
    };
    TileSource2.prototype.getTile = function(z, x, y, pixelRatio, projection) {
      return abstract();
    };
    TileSource2.prototype.getTileGrid = function() {
      return this.tileGrid;
    };
    TileSource2.prototype.getTileGridForProjection = function(projection) {
      if (!this.tileGrid) {
        return getForProjection(projection);
      } else {
        return this.tileGrid;
      }
    };
    TileSource2.prototype.getTileCacheForProjection = function(projection) {
      assert(equivalent(this.getProjection(), projection), 68);
      return this.tileCache;
    };
    TileSource2.prototype.getTilePixelRatio = function(pixelRatio) {
      return this.tilePixelRatio_;
    };
    TileSource2.prototype.getTilePixelSize = function(z, pixelRatio, projection) {
      var tileGrid = this.getTileGridForProjection(projection);
      var tilePixelRatio = this.getTilePixelRatio(pixelRatio);
      var tileSize = toSize(tileGrid.getTileSize(z), this.tmpSize);
      if (tilePixelRatio == 1) {
        return tileSize;
      } else {
        return scale(tileSize, tilePixelRatio, this.tmpSize);
      }
    };
    TileSource2.prototype.getTileCoordForTileUrlFunction = function(tileCoord, opt_projection) {
      var projection = opt_projection !== void 0 ? opt_projection : this.getProjection();
      var tileGrid = this.getTileGridForProjection(projection);
      if (this.getWrapX() && projection.isGlobal()) {
        tileCoord = wrapX(tileGrid, tileCoord, projection);
      }
      return withinExtentAndZ(tileCoord, tileGrid) ? tileCoord : null;
    };
    TileSource2.prototype.clear = function() {
      this.tileCache.clear();
    };
    TileSource2.prototype.refresh = function() {
      this.clear();
      _super.prototype.refresh.call(this);
    };
    TileSource2.prototype.updateCacheSize = function(tileCount, projection) {
      var tileCache = this.getTileCacheForProjection(projection);
      if (tileCount > tileCache.highWaterMark) {
        tileCache.highWaterMark = tileCount;
      }
    };
    TileSource2.prototype.useTile = function(z, x, y, projection) {
    };
    return TileSource2;
  }(Source$1);
  var TileSourceEvent = function(_super) {
    __extends$4(TileSourceEvent2, _super);
    function TileSourceEvent2(type, tile) {
      var _this = _super.call(this, type) || this;
      _this.tile = tile;
      return _this;
    }
    return TileSourceEvent2;
  }(Event);
  var TileSource$1 = TileSource;
  function createFromTemplate(template, tileGrid) {
    var zRegEx = /\{z\}/g;
    var xRegEx = /\{x\}/g;
    var yRegEx = /\{y\}/g;
    var dashYRegEx = /\{-y\}/g;
    return function(tileCoord, pixelRatio, projection) {
      if (!tileCoord) {
        return void 0;
      } else {
        return template.replace(zRegEx, tileCoord[0].toString()).replace(xRegEx, tileCoord[1].toString()).replace(yRegEx, tileCoord[2].toString()).replace(dashYRegEx, function() {
          var z = tileCoord[0];
          var range = tileGrid.getFullTileRange(z);
          assert(range, 55);
          var y = range.getHeight() - tileCoord[2] - 1;
          return y.toString();
        });
      }
    };
  }
  function createFromTemplates(templates, tileGrid) {
    var len = templates.length;
    var tileUrlFunctions = new Array(len);
    for (var i = 0; i < len; ++i) {
      tileUrlFunctions[i] = createFromTemplate(templates[i], tileGrid);
    }
    return createFromTileUrlFunctions(tileUrlFunctions);
  }
  function createFromTileUrlFunctions(tileUrlFunctions) {
    if (tileUrlFunctions.length === 1) {
      return tileUrlFunctions[0];
    }
    return function(tileCoord, pixelRatio, projection) {
      if (!tileCoord) {
        return void 0;
      } else {
        var h = hash(tileCoord);
        var index = modulo(h, tileUrlFunctions.length);
        return tileUrlFunctions[index](tileCoord, pixelRatio, projection);
      }
    };
  }
  function expandUrl(url) {
    var urls = [];
    var match = /\{([a-z])-([a-z])\}/.exec(url);
    if (match) {
      var startCharCode = match[1].charCodeAt(0);
      var stopCharCode = match[2].charCodeAt(0);
      var charCode = void 0;
      for (charCode = startCharCode; charCode <= stopCharCode; ++charCode) {
        urls.push(url.replace(match[0], String.fromCharCode(charCode)));
      }
      return urls;
    }
    match = /\{(\d+)-(\d+)\}/.exec(url);
    if (match) {
      var stop_1 = parseInt(match[2], 10);
      for (var i = parseInt(match[1], 10); i <= stop_1; i++) {
        urls.push(url.replace(match[0], i.toString()));
      }
      return urls;
    }
    urls.push(url);
    return urls;
  }
  var __extends$3 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var UrlTile = function(_super) {
    __extends$3(UrlTile2, _super);
    function UrlTile2(options) {
      var _this = _super.call(this, {
        attributions: options.attributions,
        cacheSize: options.cacheSize,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state,
        tileGrid: options.tileGrid,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX,
        transition: options.transition,
        key: options.key,
        attributionsCollapsible: options.attributionsCollapsible,
        zDirection: options.zDirection
      }) || this;
      _this.generateTileUrlFunction_ = _this.tileUrlFunction === UrlTile2.prototype.tileUrlFunction;
      _this.tileLoadFunction = options.tileLoadFunction;
      if (options.tileUrlFunction) {
        _this.tileUrlFunction = options.tileUrlFunction;
      }
      _this.urls = null;
      if (options.urls) {
        _this.setUrls(options.urls);
      } else if (options.url) {
        _this.setUrl(options.url);
      }
      _this.tileLoadingKeys_ = {};
      return _this;
    }
    UrlTile2.prototype.getTileLoadFunction = function() {
      return this.tileLoadFunction;
    };
    UrlTile2.prototype.getTileUrlFunction = function() {
      return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction ? this.tileUrlFunction.bind(this) : this.tileUrlFunction;
    };
    UrlTile2.prototype.getUrls = function() {
      return this.urls;
    };
    UrlTile2.prototype.handleTileChange = function(event) {
      var tile = event.target;
      var uid = getUid(tile);
      var tileState = tile.getState();
      var type;
      if (tileState == TileState.LOADING) {
        this.tileLoadingKeys_[uid] = true;
        type = TileEventType.TILELOADSTART;
      } else if (uid in this.tileLoadingKeys_) {
        delete this.tileLoadingKeys_[uid];
        type = tileState == TileState.ERROR ? TileEventType.TILELOADERROR : tileState == TileState.LOADED ? TileEventType.TILELOADEND : void 0;
      }
      if (type != void 0) {
        this.dispatchEvent(new TileSourceEvent(type, tile));
      }
    };
    UrlTile2.prototype.setTileLoadFunction = function(tileLoadFunction) {
      this.tileCache.clear();
      this.tileLoadFunction = tileLoadFunction;
      this.changed();
    };
    UrlTile2.prototype.setTileUrlFunction = function(tileUrlFunction, key) {
      this.tileUrlFunction = tileUrlFunction;
      this.tileCache.pruneExceptNewestZ();
      if (typeof key !== "undefined") {
        this.setKey(key);
      } else {
        this.changed();
      }
    };
    UrlTile2.prototype.setUrl = function(url) {
      var urls = expandUrl(url);
      this.urls = urls;
      this.setUrls(urls);
    };
    UrlTile2.prototype.setUrls = function(urls) {
      this.urls = urls;
      var key = urls.join("\n");
      if (this.generateTileUrlFunction_) {
        this.setTileUrlFunction(createFromTemplates(urls, this.tileGrid), key);
      } else {
        this.setKey(key);
      }
    };
    UrlTile2.prototype.tileUrlFunction = function(tileCoord, pixelRatio, projection) {
      return void 0;
    };
    UrlTile2.prototype.useTile = function(z, x, y) {
      var tileCoordKey = getKeyZXY(z, x, y);
      if (this.tileCache.containsKey(tileCoordKey)) {
        this.tileCache.get(tileCoordKey);
      }
    };
    return UrlTile2;
  }(TileSource$1);
  var UrlTile$1 = UrlTile;
  var __extends$2 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var TileImage = function(_super) {
    __extends$2(TileImage2, _super);
    function TileImage2(options) {
      var _this = _super.call(this, {
        attributions: options.attributions,
        cacheSize: options.cacheSize,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state,
        tileGrid: options.tileGrid,
        tileLoadFunction: options.tileLoadFunction ? options.tileLoadFunction : defaultTileLoadFunction,
        tilePixelRatio: options.tilePixelRatio,
        tileUrlFunction: options.tileUrlFunction,
        url: options.url,
        urls: options.urls,
        wrapX: options.wrapX,
        transition: options.transition,
        key: options.key,
        attributionsCollapsible: options.attributionsCollapsible,
        zDirection: options.zDirection
      }) || this;
      _this.crossOrigin = options.crossOrigin !== void 0 ? options.crossOrigin : null;
      _this.tileClass = options.tileClass !== void 0 ? options.tileClass : ImageTile$1;
      _this.tileCacheForProjection = {};
      _this.tileGridForProjection = {};
      _this.reprojectionErrorThreshold_ = options.reprojectionErrorThreshold;
      _this.contextOptions_ = options.imageSmoothing === false ? IMAGE_SMOOTHING_DISABLED : void 0;
      _this.renderReprojectionEdges_ = false;
      return _this;
    }
    TileImage2.prototype.canExpireCache = function() {
      if (!ENABLE_RASTER_REPROJECTION) {
        return _super.prototype.canExpireCache.call(this);
      }
      if (this.tileCache.canExpireCache()) {
        return true;
      } else {
        for (var key in this.tileCacheForProjection) {
          if (this.tileCacheForProjection[key].canExpireCache()) {
            return true;
          }
        }
      }
      return false;
    };
    TileImage2.prototype.expireCache = function(projection, usedTiles) {
      if (!ENABLE_RASTER_REPROJECTION) {
        _super.prototype.expireCache.call(this, projection, usedTiles);
        return;
      }
      var usedTileCache = this.getTileCacheForProjection(projection);
      this.tileCache.expireCache(this.tileCache == usedTileCache ? usedTiles : {});
      for (var id in this.tileCacheForProjection) {
        var tileCache = this.tileCacheForProjection[id];
        tileCache.expireCache(tileCache == usedTileCache ? usedTiles : {});
      }
    };
    TileImage2.prototype.getContextOptions = function() {
      return this.contextOptions_;
    };
    TileImage2.prototype.getGutterForProjection = function(projection) {
      if (ENABLE_RASTER_REPROJECTION && this.getProjection() && projection && !equivalent(this.getProjection(), projection)) {
        return 0;
      } else {
        return this.getGutter();
      }
    };
    TileImage2.prototype.getGutter = function() {
      return 0;
    };
    TileImage2.prototype.getKey = function() {
      return _super.prototype.getKey.call(this) + (this.contextOptions_ ? "\n" + JSON.stringify(this.contextOptions_) : "");
    };
    TileImage2.prototype.getOpaque = function(projection) {
      if (ENABLE_RASTER_REPROJECTION && this.getProjection() && projection && !equivalent(this.getProjection(), projection)) {
        return false;
      } else {
        return _super.prototype.getOpaque.call(this, projection);
      }
    };
    TileImage2.prototype.getTileGridForProjection = function(projection) {
      if (!ENABLE_RASTER_REPROJECTION) {
        return _super.prototype.getTileGridForProjection.call(this, projection);
      }
      var thisProj = this.getProjection();
      if (this.tileGrid && (!thisProj || equivalent(thisProj, projection))) {
        return this.tileGrid;
      } else {
        var projKey = getUid(projection);
        if (!(projKey in this.tileGridForProjection)) {
          this.tileGridForProjection[projKey] = getForProjection(projection);
        }
        return this.tileGridForProjection[projKey];
      }
    };
    TileImage2.prototype.getTileCacheForProjection = function(projection) {
      if (!ENABLE_RASTER_REPROJECTION) {
        return _super.prototype.getTileCacheForProjection.call(this, projection);
      }
      var thisProj = this.getProjection();
      if (!thisProj || equivalent(thisProj, projection)) {
        return this.tileCache;
      } else {
        var projKey = getUid(projection);
        if (!(projKey in this.tileCacheForProjection)) {
          this.tileCacheForProjection[projKey] = new TileCache$1(this.tileCache.highWaterMark);
        }
        return this.tileCacheForProjection[projKey];
      }
    };
    TileImage2.prototype.createTile_ = function(z, x, y, pixelRatio, projection, key) {
      var tileCoord = [z, x, y];
      var urlTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
      var tileUrl = urlTileCoord ? this.tileUrlFunction(urlTileCoord, pixelRatio, projection) : void 0;
      var tile = new this.tileClass(tileCoord, tileUrl !== void 0 ? TileState.IDLE : TileState.EMPTY, tileUrl !== void 0 ? tileUrl : "", this.crossOrigin, this.tileLoadFunction, this.tileOptions);
      tile.key = key;
      tile.addEventListener(EventType.CHANGE, this.handleTileChange.bind(this));
      return tile;
    };
    TileImage2.prototype.getTile = function(z, x, y, pixelRatio, projection) {
      var sourceProjection = this.getProjection();
      if (!ENABLE_RASTER_REPROJECTION || !sourceProjection || !projection || equivalent(sourceProjection, projection)) {
        return this.getTileInternal(z, x, y, pixelRatio, sourceProjection || projection);
      } else {
        var cache2 = this.getTileCacheForProjection(projection);
        var tileCoord = [z, x, y];
        var tile = void 0;
        var tileCoordKey = getKey(tileCoord);
        if (cache2.containsKey(tileCoordKey)) {
          tile = cache2.get(tileCoordKey);
        }
        var key = this.getKey();
        if (tile && tile.key == key) {
          return tile;
        } else {
          var sourceTileGrid = this.getTileGridForProjection(sourceProjection);
          var targetTileGrid = this.getTileGridForProjection(projection);
          var wrappedTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
          var newTile = new ReprojTile$1(sourceProjection, sourceTileGrid, projection, targetTileGrid, tileCoord, wrappedTileCoord, this.getTilePixelRatio(pixelRatio), this.getGutter(), function(z2, x2, y2, pixelRatio2) {
            return this.getTileInternal(z2, x2, y2, pixelRatio2, sourceProjection);
          }.bind(this), this.reprojectionErrorThreshold_, this.renderReprojectionEdges_, this.contextOptions_);
          newTile.key = key;
          if (tile) {
            newTile.interimTile = tile;
            newTile.refreshInterimChain();
            cache2.replace(tileCoordKey, newTile);
          } else {
            cache2.set(tileCoordKey, newTile);
          }
          return newTile;
        }
      }
    };
    TileImage2.prototype.getTileInternal = function(z, x, y, pixelRatio, projection) {
      var tile = null;
      var tileCoordKey = getKeyZXY(z, x, y);
      var key = this.getKey();
      if (!this.tileCache.containsKey(tileCoordKey)) {
        tile = this.createTile_(z, x, y, pixelRatio, projection, key);
        this.tileCache.set(tileCoordKey, tile);
      } else {
        tile = this.tileCache.get(tileCoordKey);
        if (tile.key != key) {
          var interimTile = tile;
          tile = this.createTile_(z, x, y, pixelRatio, projection, key);
          if (interimTile.getState() == TileState.IDLE) {
            tile.interimTile = interimTile.interimTile;
          } else {
            tile.interimTile = interimTile;
          }
          tile.refreshInterimChain();
          this.tileCache.replace(tileCoordKey, tile);
        }
      }
      return tile;
    };
    TileImage2.prototype.setRenderReprojectionEdges = function(render2) {
      if (!ENABLE_RASTER_REPROJECTION || this.renderReprojectionEdges_ == render2) {
        return;
      }
      this.renderReprojectionEdges_ = render2;
      for (var id in this.tileCacheForProjection) {
        this.tileCacheForProjection[id].clear();
      }
      this.changed();
    };
    TileImage2.prototype.setTileGridForProjection = function(projection, tilegrid) {
      if (ENABLE_RASTER_REPROJECTION) {
        var proj = get$1(projection);
        if (proj) {
          var projKey = getUid(proj);
          if (!(projKey in this.tileGridForProjection)) {
            this.tileGridForProjection[projKey] = tilegrid;
          }
        }
      }
    };
    return TileImage2;
  }(UrlTile$1);
  function defaultTileLoadFunction(imageTile, src) {
    imageTile.getImage().src = src;
  }
  var TileImage$1 = TileImage;
  var __extends$1 = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var XYZ = function(_super) {
    __extends$1(XYZ2, _super);
    function XYZ2(opt_options) {
      var _this = this;
      var options = opt_options || {};
      var projection = options.projection !== void 0 ? options.projection : "EPSG:3857";
      var tileGrid = options.tileGrid !== void 0 ? options.tileGrid : createXYZ({
        extent: extentFromProjection(projection),
        maxResolution: options.maxResolution,
        maxZoom: options.maxZoom,
        minZoom: options.minZoom,
        tileSize: options.tileSize
      });
      _this = _super.call(this, {
        attributions: options.attributions,
        cacheSize: options.cacheSize,
        crossOrigin: options.crossOrigin,
        imageSmoothing: options.imageSmoothing,
        opaque: options.opaque,
        projection,
        reprojectionErrorThreshold: options.reprojectionErrorThreshold,
        tileGrid,
        tileLoadFunction: options.tileLoadFunction,
        tilePixelRatio: options.tilePixelRatio,
        tileUrlFunction: options.tileUrlFunction,
        url: options.url,
        urls: options.urls,
        wrapX: options.wrapX !== void 0 ? options.wrapX : true,
        transition: options.transition,
        attributionsCollapsible: options.attributionsCollapsible,
        zDirection: options.zDirection
      }) || this;
      return _this;
    }
    return XYZ2;
  }(TileImage$1);
  var XYZ$1 = XYZ;
  var __extends = function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var ATTRIBUTION = '&#169; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.';
  var OSM = function(_super) {
    __extends(OSM2, _super);
    function OSM2(opt_options) {
      var _this = this;
      var options = opt_options || {};
      var attributions;
      if (options.attributions !== void 0) {
        attributions = options.attributions;
      } else {
        attributions = [ATTRIBUTION];
      }
      var crossOrigin = options.crossOrigin !== void 0 ? options.crossOrigin : "anonymous";
      var url = options.url !== void 0 ? options.url : "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      _this = _super.call(this, {
        attributions,
        attributionsCollapsible: false,
        cacheSize: options.cacheSize,
        crossOrigin,
        imageSmoothing: options.imageSmoothing,
        maxZoom: options.maxZoom !== void 0 ? options.maxZoom : 19,
        opaque: options.opaque !== void 0 ? options.opaque : true,
        reprojectionErrorThreshold: options.reprojectionErrorThreshold,
        tileLoadFunction: options.tileLoadFunction,
        transition: options.transition,
        url,
        wrapX: options.wrapX,
        zDirection: options.zDirection
      }) || this;
      return _this;
    }
    return OSM2;
  }(XYZ$1);
  var OSM$1 = OSM;
  export { DragPan$1 as D, Feature$1 as F, Icon$1 as I, Map$1 as M, OSM$1 as O, Point$1 as P, Style$1 as S, TileLayer$1 as T, VectorLayer$1 as V, Vector as a, View$1 as b, MouseWheelZoom$1 as c, defaults as d, Overlay$1 as e, fromLonLat as f, platformModifierKeyOnly as p, toSize as t };
  //# sourceMappingURL=vendor.d0c246e3.js.map
  