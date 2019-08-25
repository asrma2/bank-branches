branches.config(['$routeProvider',function($routeProvider){ 
$routeProvider 
        .when('/',{ 
            templateUrl     : 'modules/branch-list/template.html', 
            controller      :  'allBranchController'
        })
         .when('/branch/:ifsc',{

            templateUrl     : 'modules/branch-details/template.html',
            controller      : 'singleBranchController'
        })
         .when('/favourites',{

            templateUrl     : 'modules/favourites/template.html',
            controller      : 'favouritesController'
        })
        .otherwise( 
            { 
                template   : '<h1>404 page not found</h1>' 
            } 
        ); 
}]);