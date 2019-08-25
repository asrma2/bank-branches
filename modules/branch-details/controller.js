branches.controller('singleBranchController',function($http, $routeParams, $scope, $rootScope) {

    var ifsc = $routeParams.ifsc;
    $scope.flag = false;
    if(ifsc in $rootScope.branches) {
    	$scope.singleBranch = $rootScope.branches[ifsc];
    	//console.log($scope.singleBranch);
    	$scope.flag = true;
    }
    

});