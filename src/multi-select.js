angular.module('ivar.multiselect', [])
.directive('dropdownMultiselect', function ($document) {
    return {
        restrict: 'EA',
        scope: {
            model: '=',
            options: '=',
            process:'&',
            dropdownTitle: '@',
            showActions:'='
        },
        link : function(scope, element) {
        	$document.bind('click',function(event) {
        		 event.stopPropagation();
        		 var isChild = element[0].contains(event.target);
                 var isSelf = element[0] == event.target;
                 var isInside = isChild || isSelf;
                 if (!isInside) {
                	 scope.open = false;
                     scope.$apply();
                 }


        	});

        },
        template: "<div class='btn-block btn-group mulsel' data-ng-class='{open: open}'>" +
        	"<button class='btn btn-small btn-block form-control main'  data-ng-click='open=!open;'>" +
        		"<span class='title' ng-show='selectedCodes.length == 0'>{{dropdownTitle}}</span>" +
        		"<span class='title' ng-show='selectedCodes.length >0'>  {{selectedCodes}}</span>" +
        		" <span class='caret'></span>" +
        	"</button>" +
            "<ul class='dropdown-menu scrollable-menu' aria-labelledby='dropdownMenu'>" +
            	"<li class='actions' ng-show='showActions'>"+
            		"<span class='action' data-ng-click='selectAll()'><span class='icon glyphicon glyphicon-ok-circle' aria-hidden='true'></span>Add all</span>"+
            		"<span class='action' data-ng-click='removeAll()'><span class='icon glyphicon glyphicon-remove-circle' aria-hidden='true'></span>Remove all</span>"+
            	 "</li>" +
            	 "<li class='divider'  ng-show='showActions'></li>" +
                "<li data-ng-repeat='option in dataModel'> " +
            	    "<input type='checkbox' data-ng-change='setSelectedItem(option.id)'" +
            	    "ng-model='selectedItems[option.id]'>{{option.name}}" +
            	"</li>" +
            "</ul>" +
            "</div>",
        controller: function ($scope) {
            $scope.selectedItems = {};
            $scope.checkAll = false;
            $scope.dataModel = [];
            $scope.selectedCodes = "";
            init();

            function init() {
                console.log('init multiselect');
            };


            $scope.$watch('options',function(newValue, oldValue) {
            	if(newValue != oldValue) {
            		if(!angular.isUndefined($scope.process)) {
            			$scope.dataModel = $scope.process({'options':newValue});
            		}
            		$scope.model = [];
            		$scope.open = false;
            		$scope.selectedCodes = '';
            		$scope.selectedItems = {};
            	}
            });

            $scope.checkAllClicked = function () {
                if ($scope.checkAll) {
                    selectAll();
                } else {
                    deselectAll();
                }
            }

            $scope.selectAll = function() {
                $scope.model = [];
                $scope.selectedItems = {};
                angular.forEach($scope.dataModel, function (option) {
                    $scope.model.push(option.id);
                });
                angular.forEach($scope.model, function (id) {
                    $scope.selectedItems[id] = true;
                });
                $scope.selectedCodes = $scope.model.join(',');
            };

            $scope.removeAll = function() {
                $scope.model = [];
                $scope.selectedItems = {};
                console.log($scope.model);
                $scope.selectedCodes = '';
            };

            $scope.setSelectedItem = function (id) {
                var filteredArray = [];
                if ($scope.selectedItems[id] == true) {
                    $scope.model.push(id);
                } else {
                	filteredArray = $scope.model.filter(function (value) {
                        return value != id;
                    });
                	$scope.model = filteredArray;
                }

                $scope.selectedCodes = $scope.model.join(',');
                return false;
            };
        }
    }
});