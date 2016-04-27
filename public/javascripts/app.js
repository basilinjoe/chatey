(function() {
    'use strict';

    angular
        .module('chat', [

        ])
        .run(function($rootScope){
          var socket = io();
          var userId = sessionStorage.getItem('userId');
          var username = sessionStorage.getItem('username');
          if(userId){
            console.log('if',userId);
            $rootScope.userId = userId;
            $rootScope.username = username;
          }
          else {
            userId = String(parseInt(Math.random()*100000)) + String(parseInt(Math.random()*100000)) + String(parseInt(Math.random()*100000));
            sessionStorage.setItem('userId',userId);
            console.log(userId);
            $rootScope.userId = userId;
          }

        });
        ;
})();
