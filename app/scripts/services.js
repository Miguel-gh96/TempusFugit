exports.apiconnect = function ($http, $q) {

  var serviceBase = 'http://localhost/nfu/api/v1/';
  var obj = {};

  //get data
  obj.get = function (module, method, data) {

    var defered = $q.defer();
    var promise = defered.promise;

    $http({
      method:'GET',
      url: serviceBase + module +'/' + method + '&id=' + data,
    }).success(function (data, status, headers, config){
      defered.resolve(data);
    }).error(function(data,status, headers, config){
      defered.reject(data);
    });

    return promise;

  }

  //delete data
  obj.delete = function (module, method, data) {

    var defered = $q.defer();
    var promise = defered.promise;

    $http({
      method:'DELETE',
      url: serviceBase + module +'/' + method + '&id=' + data,
    }).success(function (data, status, headers, config){
      defered.resolve(data);
    }).error(function(data,status, headers, config){
      defered.reject(data);
    });

    return promise;

  }

  //new data
  obj.post = function (module, method, data) {

    var defered = $q.defer();
    var promise = defered.promise;

    $http({
      method:'POST',
      url: serviceBase + module +'/' + method,
      data: data
    }).success(function (data, status, headers, config){
      defered.resolve(data);
    }).error(function(data,status, headers, config){
      defered.reject(data);
    });

    return promise;

  }

  //update data
  obj.put = function (module, method, data) {

    var defered = $q.defer();
    var promise = defered.promise;

    $http({
      method:'PUT',
      url: serviceBase + module +'/' + method,
      data: data
    }).success(function (data, status, headers, config){
      defered.resolve(data);
    }).error(function(data,status, headers, config){
      defered.reject(data);
    });

    return promise;

  }

  return obj

};
