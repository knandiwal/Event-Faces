/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var edit = {
     initialize: function() {
          eventlist.bindEvents();
     },
     bindEvents: function() {
          document.addEventListener('deviceready', eventlist.onDeviceReady, false);
          //document.addEventListener('newEvent', events.listEvents, false);
          console.log('waiting for device ready');
     },
     onDeviceReady: function() {
          console.log('device ready on edit event page');
          edit.setup();
     },
     setup: function() {
          var results = window.localStorage.getItem('results');
          var id = window.localStorage.getItem('eventID');
          $('img.largeImage').aattr('src', esults.rows.item(id).picWallLoc);
          $('input.editTitle').text(results.rows.item(id).title);
          $('input.editDate').text(results.rows.item(id).date);
          $('input.editLocation').text(results.rows.item(id).location);
          $('a.geotagText').text(results.rows.item(id).geolat + ', ' + results.rows.item(id).geolong);
          $('textarea.editComments').text(results.rows.item(id).comments);

     }
};
