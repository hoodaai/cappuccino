'use strict';

describe('Controller: GuestCtrl', function () {

  // load the controller's module
  beforeEach(module('placementloopApp'));

  var GuestCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GuestCtrl = $controller('GuestCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
