'use strict';
/**
 * Created by Costas Zarifis on 11/6/14.
 */
angular.module('controllers', []).controller('controllers', function ($scope, $http) {

    var TRUCKS_NO = 100;
    var DELIVERIES_NO = 40;
    var PERCENTAGE = 1;

    // map attributes
    $scope.map = {
        center: {
            latitude: 45,
            longitude: -73
        },
        zoom: 2,
        bounds: {}
    };

    // The ranges that are being displayed next to the check boxes
    $scope.ranges = [
        {
            min: 0,
            max: 10,
            checked: true
        },
        {
            min: 11,
            max: 50,
            checked: true
        },
        {
            min: 51,
            max: 100,
            checked: false
        }
    ];

    // When the user clicks on a check box this watcher will get executed
    // and it will filter out the delivery trucks
    $scope.$watch('ranges', function (nv, ov) {
        if (ov !== nv) {
            var range_list_max = [];
            var range_list_min = [];
            for (var k = 0; k < nv.length; k++) {
                if ($scope.ranges[k].checked) {
                    range_list_max.push($scope.ranges[k].max);
                    range_list_min.push($scope.ranges[k].min);
                }
            }

            for (k = 0; k < $scope.deliver_trucks.length; k++) {
                if (($scope.deliver_trucks[k].pending_deliveries < Math.min.apply(null, range_list_min)) ||
                    ($scope.deliver_trucks[k].pending_deliveries > Math.max.apply(null, range_list_max)))
                    $scope.deliver_trucks[k].visible = false;
                else
                    $scope.deliver_trucks[k].visible = true;
            }
        }
    }, true);

    /**
     * This function will modify the position of a percentage of the delivery trucks
     */
    $scope.modifyMarkers = function () {

        for (var marki = 0; marki < $scope.deliver_trucks.length * PERCENTAGE; marki++) {
            console.log('modifying markers here');
//            console.log('about to get modified:',$scope.randomMarkersAboutToChange[marki]);
//            console.log('before $scope.deliver_trucks[marki].coords.latitude:',$scope.deliver_trucks[marki].coords.latitude);
            $scope.deliver_trucks[marki].coords.latitude = $scope.deliver_trucks[marki].coords.latitude + 5;
            $scope.deliver_trucks[marki].coords.longitude = $scope.deliver_trucks[marki].coords.longitude + 5;
//            console.log('after $scope.deliver_trucks[marki].coords.latitude:',$scope.deliver_trucks[marki].coords.latitude);

        }
    };


    // array with delivery trucks, each truck has a collection
    // of items that will soon be delivered
    $scope.deliver_trucks = [];




    $http.jsonp('http://zarifis1.ucsd.edu:3000/delivery_trucks?callback=JSON_CALLBACK').
        success(function(data) {
            $scope.deliver_trucks = data;
        });


});