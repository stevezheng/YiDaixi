var optimizeCb = function (func, context, argCount) {
  if (context === void 0) return func;
  switch (argCount == null ? 3 : argCount) {
    case 1:
      return function (value) {
        return func.call(context, value);
      };
    case 2:
      return function (value, other) {
        return func.call(context, value, other);
      };
    case 3:
      return function (value, index, collection) {
        return func.call(context, value, index, collection);
      };
    case 4:
      return function (accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
  }
  return function () {
    return func.apply(context, arguments);
  };
};

var cb = function (value, context, argCount) {
  if (value == null) return AV._.identity;
  if (AV._.isFunction(value)) return optimizeCb(value, context, argCount);
  if (AV._.isObject(value)) return AV._.matcher(value);
  return AV._.property(value);
};

AV._.mapObject = function (obj, iteratee, context) {
  iteratee = cb(iteratee, context);
  var keys = AV._.keys(obj),
    length = keys.length,
    results = {},
    currentKey;
  for (var index = 0; index < length; index++) {
    currentKey = keys[index];
    results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
  }
  return results;
};

function D(model) {
  return {
    where: function (where) {
    },
    select: function () {
    },
    query: function (sql, parse) {
      return AV.Query.doCloudQuery(sql, parse);
    },
    add: function (data) {
      var Model = AV.Object.extend(model);
      var instance = new Model();

      AV._.mapObject(data, function (val, key) {
        instance.set(key, val);
      });

      return instance.save();
    }
  }
}
