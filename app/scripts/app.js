'use strict';
angular.module('tedxUofT2015App', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'LocalStorageModule',
	'wu.masonry',
	'angularSmoothscroll',
	'mm.foundation'
  ], [ "$httpProvider", function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for(name in obj) {
      value = obj[name];

      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
}]).config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('ls');
}]).config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainCtrl'
      })
	  .when('/speakers', {
        templateUrl: 'views/speakers.html',
        controller: 'MainCtrl'
      })
	  .when('/conference', {
        templateUrl: 'views/conference.html',
        controller: 'ConferenceCtrl'
      })
	  .when('/videos', {
        templateUrl: 'views/videos.html',
        controller: 'VideoCtrl'
      })
	  .when('/nomination', {
        templateUrl: 'views/nomination.html',
        controller: 'NominationCtrl'
      })
      /*
      .when('/volunteer', {
        templateUrl: 'views/volunteer.html',
        controller: 'VolunteerCtrl'
      })
      */
      .when('/ticket', {
        templateUrl: 'views/application.html',
        controller: 'ApplicationCtrl'
      })
      .when('/application', {
        templateUrl: 'views/application.html',
        controller: 'ApplicationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
