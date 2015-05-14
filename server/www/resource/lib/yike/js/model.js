function D(model) {
  return {
    where: function(where) {},
    select: function() {},
    query: function(sql, parse) {
      return AV.Query.doCloudQuery(sql, parse);
    }
  }
}