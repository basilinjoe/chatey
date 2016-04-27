(function() {
    'use strict';

    angular
        .module('chat')
        .controller('ChatController', chatController);

    chatController.$inject = ['$scope','$rootScope','$timeout'];

    /* @ngInject */
    function chatController($scope,$rootScope,$timeout) {
        var socket = io();
        var vm = this;
        vm.message = {
          user:$rootScope.userId,
          username:$rootScope.username,
          message:null,
          time:null,
          textStyle:null,
          blockquote:null
        }
        vm.messages = [];
        socket.on('messageb', function(data) {
          vm.messages.push(data);
          $scope.$apply();
        });

        vm.sendMessage=function(message){
          if(message){
            var date = new Date();
            var temp = null;
            vm.message.message = message;
            vm.message.time = date.getHours() + ":" + date.getMinutes();
            vm.message.textStyle = 'text-primary';
            vm.message.blockquote = false;

            temp = angular.copy(vm.message);
            socket.emit('message',temp);
            temp.textStyle = 'text-muted';
            temp.blockquote = true;
            vm.messages.push(temp);
            vm.message.message = null;
          }
        }

        vm.saveUser = function(username){
          vm.message.username = username;
          sessionStorage.setItem('username',username);
        }
    }
})();
