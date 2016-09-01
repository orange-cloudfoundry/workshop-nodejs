'use strict';

describe('Controller: ListuserCtrl', function () {

  // load the controller's module
  beforeEach(module('clientWorkshopApp'));

  var ListuserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListuserCtrl = $controller('ListuserCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ListuserCtrl.awesomeThings.length).toBe(3);
  });
});
