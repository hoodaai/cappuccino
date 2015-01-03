'use strict';

describe('Controller: GuestnavbarCtrl', function () {

  // load the controller's module
  beforeEach(module('cappuccinoApp'));

  var GuestnavbarCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GuestnavbarCtrl = $controller('GuestnavbarCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
