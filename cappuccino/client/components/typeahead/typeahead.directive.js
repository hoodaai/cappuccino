'use strict';

// TypEahead Controller
angular.module('cappuccinoApp')
    .controller('TypeaheadCtrl', function ($scope) {

    $scope.data = [{
                        "_id": 0,
                        "firstname": "Lucinda",
                        "lastname": "Lara",
                        "email": "lucida@email.com"}, {
                        "_id": 1,
                        "firstname": "Castro",
                        "lastname": "Norman",
                        "email": "Norman@email.com"}, {
                        "_id": 2,
                        "firstname": "Mavis",
                        "lastname": "Moody",
                        "email": " mavis@email.com" }];
    
    $scope.name = ""
    
    $scope.search = function(query) {
      if (!query) {
            return [];
        }

        var filtered = [];
        query = query.toLowerCase()
        angular.forEach($scope.data, function(chunck) {
            var nameStr = (chunck.firstname + " " + chunck.lastname).toLowerCase();

            if (nameStr.indexOf(query) >= 0)
                filtered.push(chunck);
        });
        return filtered;
    }
    
    $scope.select = function(item) {
       $scope.name = item.firstname + " " + item.lastname
       $scope.model = $scope.name;
    }

})

// typeahead Directive
.directive('typeahead', function ($timeout) {
    return {   
        restrict: 'AEC',
        transclude: true,
       // replace: true,
        templateUrl: 'components/typeahead/typeahead.html',
        
        scope: {
            placeholder: '@',
            model: "=",
            "templateType": "@",
            "addBtnText": "@",
            search: '&',
            select: '&',
        },
        
        controller:  function($scope, $modal) {
             $scope.items = [];
             $scope.hide = false;
             $scope.isEmpty = true;
             //$scope.currentItem = -1;
                     
             this.activate = function(item) {
                $scope.active = item;
             }

             this.activateNextItem = function() {
                var index = $scope.items.indexOf($scope.active);
                this.activate($scope.items[(index + 1) % $scope.items.length]);             
            };
 
            this.activatePreviousItem = function() {
                var index = $scope.items.indexOf($scope.active);
                this.activate($scope.items[index === 0 ? $scope.items.length - 1 : index - 1]);
            };          
            
            this.activateEnter = function() {
                var index = $scope.items.indexOf($scope.active);
                this.activate($scope.items[index]);
            };     
            
             this.isActive = function(item) {
                return $scope.active === item;
            };
            
            this.selectActive = function() {
                $scope.selectItem($scope.active);
            };
            
            $scope.setCurrent = function (item) {
                $scope.active = item;
            };
            
            $scope.isCurrent = function (item) {                
                return $scope.active === item;
            };
            
            
            $scope.isVisible = function() {
                return !$scope.hide && ($scope.focused || $scope.mousedOver);
            };
 
            $scope.querySearch = function() {
                $scope.hide = false;
                $scope.items = $scope.search({model:$scope.model});
                
                if ($scope.items.length > 0)
                    $scope.isEmpty = true;
                else
                    $scope.isEmpty = false;
            }
             
            $scope.selectItem = function (item) {
                $scope.hide = true;
                $scope.focused = true;
                $scope.active = item;
                $scope.select({item: item})
            };
            
            
            $scope.addNew = function (size) {
                var str = $scope.model.split(" ", 2);
                
                $scope.items = {
                                    "firstname": str[0] ? str[0] : "" ,
                                    "lastname": str[1] ? str[1] : "" ,
                                    "email": ""
                                };
                
                 var modalInstance = $modal.open({
                    templateUrl: 'typeaheadModalContent.html',
                    controller: 'typeaheadModalInstanceCtrl',
                    size: size,
                      resolve: {
                        items: function () {
                          return $scope.items;
                        }
                    }

                });

                modalInstance.result.then(function (data) {
                    console.log("Saving Form Data :" , data);
                    // Save Info
                }, function () {
                    // cancel
                    console.log('Modal dismissed at: ' + new Date());
                });
            };
         },
       
        link: function (scope, elem, attrs, controller) {
            
            var $input = elem.find('input');
            var $list = elem.find('ul');
            
            $input.bind('focus', function() {
                scope.$apply(function() { scope.focused = true; });
            });
            
            $input.bind('blur', function() {
                scope.$apply(function() { scope.focused = false; });
            });
            
            $list.bind('mouseover', function() {
                scope.$apply(function() { scope.mousedOver = true; });
            });
            
            $list.bind('mouseleave', function() {
                scope.$apply(function() { scope.mousedOver = false; });
            });
 
            $input.bind('keyup', function(e) {
                
                // Tab button and Enter
                if (e.keyCode === 9 || e.keyCode === 13) {
                    scope.$apply(function() { 
                        controller.selectActive();
                    });
                }
                
                // ESC button
                if (e.keyCode === 27) {
                    scope.$apply(function() {
                        scope.hide = true;
                    });
                }
            });
 
            $input.bind('keydown', function(e) {
                if (e.keyCode === 9 || e.keyCode === 13 || e.keyCode === 27) {
                    e.preventDefault();
                };
 
                // Down arrow
                if (e.keyCode === 40) {
                    e.preventDefault();
                    scope.$apply(function() { controller.activateNextItem(); });
                }
 
                // Left arrow
                if (e.keyCode === 38) {
                    e.preventDefault();
                    scope.$apply(function() { controller.activatePreviousItem(); });
                }
                
               scope.$watch('focused', function(focused) {
                    if (focused) {
                        $timeout(function() { $input.focus(); }, 0, false);
                    }
                });
            });
        }
    };
}).controller('typeaheadModalInstanceCtrl', function ($scope, $modalInstance, items) {
    $scope.formData = items;

    $scope.save = function () {
        $modalInstance.close($scope.formData);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});