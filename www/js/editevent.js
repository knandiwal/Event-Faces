/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var eventedit = {
     initialize: function() {
          eventedit.bindEvents();
     },
     bindEvents: function() {
          document.addEventListener('deviceready', eventedit.onDeviceReady, false);
          //document.addEventListener('newEvent', events.listEvents, false);
          console.log('waiting for device ready');
     },
     onDeviceReady: function() {
          console.log('device ready on edit event page');
          eventedit.setup();
     },
     setup: function() {
          var results = window.localStorage.getItem('results');
          var id = window.localStorage.getItem('eventID');
          $('#largeImage').attr('src', results.rows.item(id).picWallLoc);
          $('#editTitle').val(results.rows.item(id).title);
          $('#editDate').val(results.rows.item(id).date);
          $('#editLocation').val(results.rows.item(id).location);
          $('#geotagText').text(results.rows.item(id).geolat + ', ' + results.rows.item(id).geolong);
          $('#editComments').val(results.rows.item(id).comments);
     }


};
