(function() {
  'use strict';

  angular
    .module('chat')
    .factory('dataFactory', dataFactory);

  dataFactory.$inject = [];

  /* @ngInject */
  function dataFactory() {
    console.log('data factory');
    var db = new Dexie('chatey');
    db.version(1).stores({ chats: '_id' });
    
    function open(){
      return db.open()
    }
    open().then(function(r){console.log('db open status',r)});
    
    function findAll() {
      return db.chats.toArray();
    }
    
    function create(data){
      return db.chats.put(data);
    }
    function remove(id){
      return db.chats.where('_id').equals(id).delete();
    }
    function removeAll(){
      return db.chats.clear();
    }
    
    function find(key,val){
      return db.chats.where(key).equals(val);
    }
    
    var service = {
      create: create,
      find: find,
      findAll: findAll,
      remove: remove,
      removeAll:removeAll
    };

    return service;

  }
})();
