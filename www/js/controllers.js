'use strict';
/**
 * Created by Costas Zarifis on 11/6/14.
 */
angular.module('controllers',[]).controller('controllers', function ($scope) {

    var TRUCKS_NO = 100;
    var DELIVERIES_NO = 40;
    var PERCENTAGE = 1;





    // map attributes
    $scope.map = {
        center: {
            latitude:45,
            longitude : -73
        },
        zoom:2,
        bounds: {}
    };

    Array.prototype.max = function() {
        return Math.max.apply(null, this);
    };

    Array.prototype.min = function() {
        return Math.min.apply(null, this);
    };

    $scope.ranges = [
        {
            min:0,
            max:10,
            checked : true
        },
        {
            min:11,
            max:50,
            checked : true
        },
        {
            min:51,
            max:100,
            checked : false
        }
    ];

    $scope.$watch('ranges', function(nv, ov) {
        if(ov!==nv) {
//            console.log('before:', $scope.deliver_trucks);
            var rangeListMax = [];
            var rangeListMin = [];
            for (var k = 0; k < nv.length; k++) {
                if ($scope.ranges[k].checked) {
                    rangeListMax.push($scope.ranges[k].max);
                    rangeListMin.push($scope.ranges[k].min);
                }
//                console.log('max:', Math.max.apply(null, rangeListMax));
//                console.log('min:', Math.min.apply(null, rangeListMin));
            }

            for (k = 0; k < $scope.deliver_trucks.length; k++) {
                if (($scope.deliver_trucks[k].pending_deliveries < Math.min.apply(null, rangeListMin)) ||
                    ($scope.deliver_trucks[k].pending_deliveries > Math.max.apply(null, rangeListMax)))
                    $scope.deliver_trucks[k].visible = false;
                else
                    $scope.deliver_trucks[k].visible = true;
            }
//            console.log('after', $scope.deliver_trucks);
        }

    },true);

    /**
     * This function will modify the position of a percentage of the delivery trucks
     */
    $scope.modifyMarkers = function(){

        for(var marki=0;marki<$scope.deliver_trucks.length*PERCENTAGE;marki++){
            console.log('modifying markers here');
//            console.log('about to get modified:',$scope.randomMarkersAboutToChange[marki]);
//            console.log('before $scope.deliver_trucks[marki].coords.latitude:',$scope.deliver_trucks[marki].coords.latitude);
            $scope.deliver_trucks[marki].coords.latitude = $scope.deliver_trucks[marki].coords.latitude+5;
            $scope.deliver_trucks[marki].coords.longitude = $scope.deliver_trucks[marki].coords.longitude+5;
//            console.log('after $scope.deliver_trucks[marki].coords.latitude:',$scope.deliver_trucks[marki].coords.latitude);

        }
    };



    // array with delivery trucks, each truck has a collection
    // of items that will soon be delivered
    $scope.deliver_trucks = [];

    var createDeliveries = function(j){

        var ret = {
            delivery_id: j,
            recipient: 'The White House',
            //...

            scheduled_time: '14:19',
            delivered_time: '14:19',
            item_title: 'item title'+j,
            item_description: 'blahBlahBlah'
        };
        return ret;
    };

    var createRandomTruck = function (i) {
        var lat_min = -90,
            lat_range = 90 - lat_min,
            lng_min = -180,
            lng_range = 180 - lng_min;

        var truck_key = "id";

        var deliveries = [];

        for (var k =0;k<DELIVERIES_NO;k++){

            var del = createDeliveries(k);
            deliveries.push(del);
        }

        var latitude = lat_min + (Math.random() * lat_range);
        var longitude = lng_min + (Math.random() * lng_range);
        var ret = {
            truck_key: i,
            coords: {
                latitude: latitude,
                longitude: longitude
            },
            all_deliveries: deliveries,
            pending_deliveries : deliveries.length,
            visible:true


        };
        ret[truck_key] = i;


        return ret;
    };

    $scope.$watch(function() { return $scope.map; }, function(nv, ov) {
//        console.log('creating delivery trucks');
        // Only need to regenerate once
        if (ov===nv) {
            var trucks = [];
//                console.log($scope.map.bounds);
            for (var i = 0; i < TRUCKS_NO; i++) {

                $scope.mm = createRandomTruck(i);
                trucks.push($scope.mm);

            }
            $scope.deliver_trucks =trucks;
//            console.log(trucks);
        }
    }, true);
});