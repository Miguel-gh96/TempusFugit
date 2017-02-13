(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  //dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger) {
    var service = {
      serve: 'http://localhost',
      port: '8000',
      sendEmail: sendEmail,
      getPeople: getPeople,
      getMessageCount: getMessageCount
    };

    return service;

    function getMessageCount() { return $q.when(72); }

    function getPeople() {
      return $http.get('/api/people')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getPeople')(e);
      }
    }

    function sendEmail(data) {
      return $http.post(service.serve + ':' + service.port + '/api/v1/contact/', data)
      .then(success)
      .catch(fail);

      function success() {
        return true;
      }

      function fail() {
        return false;
      }
    }

  }
})();
