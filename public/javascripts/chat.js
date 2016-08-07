(function() {
    'use strict';

    angular
        .module('chat')
        .controller('ChatController', chatController);

    chatController.$inject = ['$scope','$rootScope','$timeout','dataFactory'];

    /* @ngInject */
    function chatController($scope,$rootScope,$timeout,dataFactory) {
        var socket = io();
        var vm = this;
        
        vm.sendMessage=sendMessage;
        vm.saveUser = saveUser;
        vm.clearChat = clearChat;
         
        vm.username = $rootScope.username;
        vm.messages = [];
        
        vm.message = {
          user:$rootScope.userId,
          username:$rootScope.username,
          message:null,
          time:null,
          textStyle:null,
          blockquote:null
        };
        
        function init(){
          initSocket();
          getAllMessageFromDb().then(function(data){
            vm.messages = data;
            $scope.$apply();
          });
        }
        
        init();
        
        function initSocket(){
          socket.on('messageb', function(data) {
            vm.messages.push(data);
            saveToDb(data);
            document.getElementById('sound').innerHTML='<audio autoplay="autoplay"><source src="popup.mp3" type="audio/mpeg" /><embed hidden="true" autostart="true" loop="false" src="popup.mp3" /></audio>';
            $scope.$apply();
          });
        }
        
        function saveToDb(data){
          data._id = new Date().getTime();
            dataFactory.create(data).then(function(r){
              console.log('data-saved');
            });
        }
        function getAllMessageFromDb(){
          return dataFactory.findAll().then(function(data){
                  return data;
                 });
        }
         
        function sendMessage(message){
          if(message){
            var date = new Date();
            var temp = null;
            vm.message.message = message;
            vm.message.time = date.getHours() + ':' + date.getMinutes();
            vm.message.textStyle = 'text-primary';
            vm.message.blockquote = false;

            temp = angular.copy(vm.message);
            socket.emit('message',temp);
            temp.textStyle = 'text-muted';
            temp.blockquote = true;
            saveToDb(temp);
            vm.messages.push(temp);
            vm.message.message = null;
          }
        };

        function saveUser(username){
          vm.message.username = username;
          localStorage.setItem('username',username);
        };
        
        function clearChat(){
          dataFactory.removeAll().then(function(r){console.log(r)});
        }
    }
})();
