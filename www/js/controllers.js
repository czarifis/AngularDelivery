'use strict';
/**
 * Created by Costas Zarifis on 11/6/14.
 */
angular.module('controllers', []).controller('controllers', function ($scope, $http) {



    // array with delivery trucks, each truck has a collection
    // of items that will soon be delivered
    $http.jsonp('http://zarifis1.ucsd.edu:3000/delivery_trucks?callback=JSON_CALLBACK').
        success(function(data) {
            $scope.deliver_trucks = data;
    });

    $scope.filter_var =  true;


    $scope.choices =
        [
            true,
            false

        ];


});