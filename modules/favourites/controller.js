
branches.controller('favouritesController', function($http, $scope, $localStorage, $rootScope, $location) {

	$scope.filters = [10, 20, 30, 40, 50];
	$scope.addBranch = addBranch;
	$scope.removeFavourite = removeFavourite;
	$scope.filterValue = 10;

	$scope.branchList = $localStorage.favouriteList;

	function addBranch (ifscValue, branchValue, addressValue, cityValue, stateValue, bank_nameValue) {
		if($rootScope.branches != undefined) {
			if (ifscValue in $rootScope.branches) {
			} else {
				$rootScope.branches[ifscValue] = { ifsc: ifscValue, branch:branchValue, address: addressValue, 
												city: cityValue, state: stateValue, bank_name: bank_nameValue };
			}
		} else {
			$rootScope.branches = {};
			$rootScope.branches[ifscValue] = { ifsc: ifscValue, branch:branchValue, address: addressValue, 
												city: cityValue, state: stateValue, bank_name: bank_nameValue };
		}
		$location.path('/branch/' + ifscValue);
	}	

	function removeFavourite(item) {
		var filtered = $scope.branchList.filter(function(value, index, arr){
			return value.ifsc != item.ifsc;
		});
		$scope.branchList = filtered;
		$localStorage.favouriteList = $scope.branchList;
		var city = '';
		var flag = 0;
		for(let j = 0; j < 5; j++) {
			if(flag == 1) {
				break;
			}

			if(j == 0) {
				if($localStorage.mumbaiData != undefined) {
					for(let i = 0; i < $localStorage.mumbaiData.length; i++) {
						if($localStorage.mumbaiData[i].ifsc == item.ifsc) {
							$localStorage.mumbaiData[i].favourite = false;
							flag = 1;
							break;
						}
					}
				}
			} else if(j == 1) {
				if($localStorage.hyderabadData != undefined) {
					for(let i = 0; i < $localStorage.hyderabadData.length; i++) {
						if($localStorage.hyderabadData[i].ifsc == item.ifsc) {
							$localStorage.hyderabadData[i].favourite = false;
							flag = 1;
							break;
						}
					}
				}
			} else if(j == 2) {
				if($localStorage.delhiData != undefined) {
					for(let i = 0; i < $localStorage.delhiData.length; i++) {
						if($localStorage.delhiData[i].ifsc == item.ifsc) {
							$localStorage.delhiData[i].favourite = false;
							flag = 1;
							break;
						}
					}
				}
			} else if(j == 3) {
				if($localStorage.jaipurData != undefined) {
					for(let i = 0; i < $localStorage.jaipurData.length; i++) {
						if($localStorage.jaipurData[i].ifsc == item.ifsc) {
							$localStorage.jaipurData[i].favourite = false;
							flag = 1;
							break;
						}
					}
				}
			} else if(j == 4) {
				if($localStorage.bikanerData != undefined) {
					for(let i = 0; i < $localStorage.bikanerData.length; i++) {
						if($localStorage.bikanerData[i].ifsc == item.ifsc) {
							$localStorage.bikanerData[i].favourite = false;
							flag = 1;
							break;
						}
					}
				}
			}
			
		}
	}
}); 