
branches.controller('allBranchController', function($http, $scope, $localStorage, $rootScope, $location) {

	$scope.cities = ["MUMBAI","HYDERABAD","DELHI","JAIPUR","BIKANER"];
	$scope.filters = [10, 20, 30, 40, 50];
	$rootScope.currentCity;
	$scope.loadData = loadData;
	$scope.addBranch = addBranch;
	$scope.searchData = searchData;
	$scope.addFavourite = addFavourite;
	$scope.removeFavourite = removeFavourite;
	$scope.filterValue = 10;
	$scope.searchString = "";
	if($rootScope.currentCity != undefined) {
		$scope.city = $rootScope.currentCity;
		$scope.loadData();
	}

	function loadData() {
		$rootScope.currentCity = $scope.city;
		if($scope.city == 'MUMBAI' && $localStorage.mumbaiData != undefined) {
			$scope.branchList = $localStorage.mumbaiData;
			$localStorage.branchListMain = $localStorage.mumbaiData;
		} else if($scope.city == 'HYDERABAD' && $localStorage.hyderabadData != undefined) {
			$scope.branchList = $localStorage.hyderabadData;
			$localStorage.branchListMain = $localStorage.hyderabadData;
		} else if($scope.city == 'DELHI' && $localStorage.delhiData != undefined) {
			$scope.branchList = $localStorage.delhiData;
			$localStorage.branchListMain = $localStorage.delhiData;
		} else if($scope.city == 'JAIPUR' && $localStorage.jaipurData != undefined) {
			$scope.branchList = $localStorage.jaipurData;
			$localStorage.branchListMain = $localStorage.jaipurData;
		} else if($scope.city == 'BIKANER' && $localStorage.bikanerData != undefined) {
			$scope.branchList = $localStorage.bikanerData;
			$localStorage.branchListMain = $localStorage.bikanerData;
		} else {
			var url = "https://vast-shore-74260.herokuapp.com/banks?city=" + $scope.city;
			$http.get(url).then(function(res) {
				$scope.branchList = [];
				angular.forEach(res.data, function(item) {
		            item.favourite = false;
		            $scope.branchList.push(item);
		        });
		        switch($scope.city) {
		        	case 'MUMBAI': $localStorage.mumbaiData =  $scope.branchList;
		        					break;
		        	case 'HYDERABAD': $localStorage.hyderabadData =  $scope.branchList;
		        					break;
		        	case 'DELHI': $localStorage.delhiData =  $scope.branchList;
		        					break;
		        	case 'JAIPUR': $localStorage.jaipurData =  $scope.branchList;
		        					break;
		        	case 'BIKANER': $localStorage.bikanerData =  $scope.branchList;
		        					break;																
		        }
				$localStorage.branchListMain = $scope.branchList;
			}, function(e) {
				if(e && e.data && e.data.error && e.data.error.status) {
					if(e.data.error.code == 404 && e.data.error.message == "Not Found") {
						$scope.error = "Data Not Found";
					} else {
						$scope.error = e.data.error.message ? e.data.error.message : e.data.error.status;	
					}
					
				}
			});
		}
	}

	$rootScope.branches = {};

	function addBranch (ifscValue, branchValue, addressValue, cityValue, stateValue, bank_nameValue) {
		if (ifscValue in $rootScope.branches) {
		} else {
			$rootScope.branches[ifscValue] = { ifsc: ifscValue, branch:branchValue, address: addressValue, 
											city: cityValue, state: stateValue, bank_name: bank_nameValue };
		}
		$location.path('/branch/' + ifscValue);
	}	

	function searchData() {
		if(!$scope.searchString) {
        }
        var result = [];
        var searchStringTemp = $scope.searchString.toLowerCase();
        angular.forEach($localStorage.branchListMain, function(item) {
            if(item.state.toLowerCase().indexOf(searchStringTemp) !== -1){
            	result.push(item);
        	} else if(item.ifsc.toLowerCase().indexOf(searchStringTemp) !== -1){
            	result.push(item);
        	} else if(item.branch.toLowerCase().indexOf(searchStringTemp) !== -1){
            	result.push(item);
        	} else if(item.address.toLowerCase().indexOf(searchStringTemp) !== -1){
            	result.push(item);
        	} else if(item.city.toLowerCase().indexOf(searchStringTemp) !== -1){
            	result.push(item);
        	} else if(item.bank_name.toLowerCase().indexOf(searchStringTemp) !== -1){
            	result.push(item);
        	}
        });
        $scope.branchList = result;
	}

	function addFavourite(item) {
		if($localStorage.favouriteList == undefined) {
			$localStorage.favouriteList = [];
			$localStorage.favouriteList.push(item);
		} else {
			$localStorage.favouriteList.push(item);
		}
		for(let i = 0; i < $scope.branchList.length; i++) {
			if($scope.branchList[i].ifsc == item.ifsc) {
				$scope.branchList[i].favourite = true;
				break;
			}
		}

		if($scope.city == 'MUMBAI') {
			for(let i = 0; i < $localStorage.mumbaiData.length; i++) {
				if($localStorage.mumbaiData[i].ifsc == item.ifsc) {
					$localStorage.mumbaiData[i].favourite = true;
					break;
				}
			}
		} else if($scope.city == 'HYDERABAD') {
			for(let i = 0; i < $localStorage.hyderabadData.length; i++) {
				if($localStorage.hyderabadData[i].ifsc == item.ifsc) {
					$localStorage.hyderabadData[i].favourite = true;
					break;
				}
			}
		} else if($scope.city == 'DELHI') {
			for(let i = 0; i < $localStorage.delhiData.length; i++) {
				if($localStorage.delhiData[i].ifsc == item.ifsc) {
					$localStorage.delhiData[i].favourite = true;
					break;
				}
			}
		} else if($scope.city == 'JAIPUR') {
			for(let i = 0; i < $localStorage.jaipurData.length; i++) {
				if($localStorage.jaipurData[i].ifsc == item.ifsc) {
					$localStorage.jaipurData[i].favourite = true;
					break;
				}
			}
		} else if($scope.city == 'BIKANER') {
			for(let i = 0; i < $localStorage.bikanerData.length; i++) {
				if($localStorage.bikanerData[i].ifsc == item.ifsc) {
					$localStorage.bikanerData[i].favourite = true;
					break;
				}
			}
		}
	}

	function removeFavourite(item) {
		var filtered = $localStorage.favouriteList.filter(function(value, index, arr){
			return value.ifsc != item.ifsc;
		});
		$localStorage.favouriteList = filtered;
		for(let i = 0; i < $scope.branchList.length; i++) {
			if($scope.branchList[i].ifsc == item.ifsc) {
				$scope.branchList[i].favourite = false;
				break;
			}
		}
		if($scope.city == 'MUMBAI') {
			for(let i = 0; i < $localStorage.mumbaiData.length; i++) {
				if($localStorage.mumbaiData[i].ifsc == item.ifsc) {
					$localStorage.mumbaiData[i].favourite = false;
					break;
				}
			}
		} else if($scope.city == 'HYDERABAD') {
			for(let i = 0; i < $localStorage.hyderabadData.length; i++) {
				if($localStorage.hyderabadData[i].ifsc == item.ifsc) {
					$localStorage.hyderabadData[i].favourite = false;
					break;
				}
			}
		} else if($scope.city == 'DELHI') {
			for(let i = 0; i < $localStorage.delhiData.length; i++) {
				if($localStorage.delhiData[i].ifsc == item.ifsc) {
					$localStorage.delhiData[i].favourite = false;
					break;
				}
			}
		} else if($scope.city == 'JAIPUR') {
			for(let i = 0; i < $localStorage.jaipurData.length; i++) {
				if($localStorage.jaipurData[i].ifsc == item.ifsc) {
					$localStorage.jaipurData[i].favourite = false;
					break;
				}
			}
		} else if($scope.city == 'BIKANER') {
			for(let i = 0; i < $localStorage.bikanerData.length; i++) {
				if($localStorage.bikanerData[i].ifsc == item.ifsc) {
					$localStorage.bikanerData[i].favourite = false;
					break;
				}
			}
		}
	}
}); 