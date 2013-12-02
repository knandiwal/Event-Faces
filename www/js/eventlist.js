/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var eventlist = {
     initialize: function() {
          eventlist.bindEvents();
     },
     bindEvents: function() {
          document.addEventListener('deviceready', eventlist.onDeviceReady, false);
          //document.addEventListener('newEvent', events.listEvents, false);
          console.log('waiting for for device ready');
     },
     onDeviceReady: function() {
          console.log('device ready');
          eventlist.setup();
     },
     setup: function() {
          var db = window.openDatabase("EventFacesDB", "", "Event Faces Database", 200000);
          db.transaction(this.querryDB, this.errorCB, this.successCB);
     },
     errorCB: function(err) {
          console.log("APP_LOG: Error processing SQL: " + err.message);
     },
     fail: function(evt) {
          console.log(evt.target.error.code);
     },
     successCB: function() {
          console.log('APP_LOG: DB access success...');
          var urlList = [];
          window.localStorage.setItem('urlList', urlList);
     },
     querryDB: function(tx) {
          tx.executeSql('SELECT * FROM events', [], this.querySuccess, this.errorCB);
     },
     querySuccess: function(tx, results) {
          window.localStorage.setItem('results', results);
          eventlist.getfile();
     },
     getfile: function() {
          window.requestFileSystem(LocaFileSystem.PERSISTENT, 0, this.gotFS, this.fail);
     },
     gotFS: function(fileSystem) {
          var results = window.localStorage.getItem('results');
          window.localStorage.setItem('listSize', results.row.length);
          for (var i = 0; i < results.row.length; i++) {
               fileSystem.root.getFile(results.rows.item(i).thumb, null, this.gotFileEntry, this.fail);
          }
     },
     gotFileEntry: function(fileEntry) {
          fileEntry.file(this.gotFile, this.fail);
     },
     gotFile: function(file) {
          var reader = new FileReader();
          reader.onloadend = function(evt) {
               console.log(evt.target.result);
          };
          var link = reader.toURL(file);
          this.createURLlist(link);
     },
     createURLlist: function(link) {
          var URLlist = window.localStorage.getItem('urlList');
          URLlist.push(link);
          window.localStorage.setItem('urlList', URLlist);

     },
     createlist: function() {
          var results = window.localStorage.getItem('results');
          var size = window.localStorage.getItem('listSize');
          var URLlist = window.localStorage.getItem('urlList');
          URLlist.reverse();
          for (var i = 0; i < size; i++) {
               $('#eventList').append('<li><a href="newevent.html" ' +
                       'onclick="eventlist.link(' + results.rows.item(i).id +
                       ')><img src="' + URLlist.pop() + '" alt ="New Event"><h4>' +
                       results.rows.item(i).title + '</h4><p>' +
                       results.rows.item(i).description + '</p></a></li>');
          }
     },
     link: function(id) {
          $.when(window.localStorage.setItem('eventID', id)).then(window.location = 'newevent.html');
     }
};

