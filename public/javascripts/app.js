(function() {
    'use strict';

    angular
        .module('chat', [
            'ngScrollbars'
        ])
        .run(function($rootScope) {
            // var socket = io();
            var userId = localStorage.getItem('userId');
            var username = localStorage.getItem('username');
            if (userId) {
                console.log('if', userId);
                $rootScope.userId = userId;
                $rootScope.username = username;
            } else {
                userId = String(parseInt(Math.random() * 100000)) + String(parseInt(Math.random() * 100000)) + String(parseInt(Math.random() * 100000));
                localStorage.setItem('userId', userId);
                $rootScope.userId = userId;
                console.log(userId);
            }

        })
        .directive('schrollBottom', function() {
            return {
                scope: {
                    schrollBottom: '='
                },
                link: function(scope, element) {
                    scope.$watchCollection('schrollBottom', function(newValue) {
                        if (newValue) {
                          angular.element(element)[0].scrollTop = angular.element(element)[0].scrollHeight;
                        }
                    });
                }
            };
        });

})();
