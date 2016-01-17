app.controller('ctrlAdd', ['$http', '$scope', '$location', function ($http, $scope, $location) {
     
     $scope.add = function (){
        var dataWithoutId = {
            name: $scope.contact.name,
            email: $scope.contact.email,
            url: $scope.contact.url
        };
        $http.post('/phonebook/posts', dataWithoutId).success(function (params) {
            console.log('from ctrl id: ' + params._id);
            $location.path('/contacts');
        });
    };
}]);