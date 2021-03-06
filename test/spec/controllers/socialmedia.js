'use strict';

describe('Controller: SocialmediaCtrl', function () {

  // load the controller's module
  beforeEach(module('tedxUofT2015App'));

  var SocialmediaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SocialmediaCtrl = $controller('SocialmediaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
