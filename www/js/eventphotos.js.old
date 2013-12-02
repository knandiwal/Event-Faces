/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var eventID;
var event;
var pictureSource; // picture source
var destinationType; // sets the format of returned value
var eventFolder; //folder for the events
var wall; // all the wall pics
var latitude;
var longitude;
var location;
var picURL;
var date;

var events = {
     initialize: function() {
          events.bindEvents();
          console.log("initialize");
          events.clearEvent();
     },
     bindEvents: function() {
          document.addEventListener('deviceready', events.onDeviceReady, false);
          //document.addEventListener('newEvent', events.listEvents, false);

          console.log('bind events');
     },
     onDeviceReady: function() {
          console.log('Events page loading');
          pictureSource = navigator.camera.PictureSourceType;
          destinationType = navigator.camera.DestinationType;
          // $(document).on("pageshow", "#NewEventPage", events.startNew());
          $("#NewEventPage").ready(events.startNew());
          $("#EditEventPage").ready(events.loadEvent());
          // $(document).on("pageshow", "#EditEventPage", events.loadEvent());
          $("#EventListPage").ready(events.listEvents());
          //$(document).on("pageshow", "#EventListPage", events.listEvents());

     },
     go: function(link) {
          window.location = link;
          console.log('going to: ' + link);
     },
     startNew: function() {
          console.log('Starting New Event');
          var d = new Date();
          var n = d.getTime();
          date = n;
          var networkState = navigator.network.connection.type;
          var connected = function() {
               console.log('finding connection');
               if (networkState == Connection.NONE) {
                    return false;
               } else {
                    return true;
               }
          };
          if (connected && localStorage.getItem("e_title") === null) {
               console.log('finding clocation');
               events.getGeoTag();
               var latlng = new google.maps.LatLng(latitude, longitude);
               geocoder.geocode({'latLng': latlng}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                         console.log('got google');
                         //Check result 0
                         var result = results[0];
                         //look for locality tag and administrative_area_level_1
                         var city = "";
                         var state = "";
                         var poi = "";
                         for (var i = 0, len = result.address_components.length; i < len; i++) {
                              var ac = result.address_components[i];
                              if (ac.types.indexOf("locality") >= 0)
                                   city = ac.long_name;
                              if (ac.types.indexOf("administrative_area_level_1") >= 0)
                                   state = ac.long_name;
                              if (ac.types.indexOf("premise") >= 0)
                                   poi = ac.long_name;
                         }
                         //only report if we got Good Stuff
                         if (city != '' && state != '') {
                              if (poi != '') {
                                   location = poi + ' in ' + city + ", " + state;
                              }
                              else {
                                   location = city + ", " + state;
                              }
                         }
                         else {
                              location = 'Cannot find locations!';
                         }

                    }
               });

          }
          if (localStorage.getItem("e_title") !== null) {
               events.getEvent();
               //events.loadNewEvent();
          }

     },
     insertDate: function() {
          $('#newDate').text(date);
     },
     insertLoc: function() {
          $('#newLocation').text(location);
     },
     insertGeo: function() {
          $('#geotagText').html('<a>' + latitude + ', ' + longitude + '</a>');
     },
     getEvent: function() {

          var event_title = window.localStorage.getItem("e_title");
          var event_desc = window.localStorage.getItem("e_description");
          var event_date = window.localStorage.getItem("e_date");
          var event_loc = window.localStorage.getItem("e_loc");
          var event_comments = window.localStorage.getItem("e_comments");
          var photo_file = window.localStorage.getItem("p_file_name");
          var photo_folder = window.localStorage.getItem("p_file_loc");

          $('#newTitle').val(event_title);
          $('#newDate').val(event_date);
          $('#newLocation').val(event_loc);
          $('#geotagText').replaceWith('<a>' + latitude + ', ' + longitude + '</a>');
          $('#editComments').val(event_comments);
          $('#largeImage').attr(photo_file);
     },
     setEvent: function() {
          var desc = document.getElementById("newDate").value + " at " + document.getElementById("newLocation").value;

          window.localStorage.setItem("e_title", document.getElementById("newTitle").value);
          window.localStorage.setItem("e_description", desc);
          window.localStorage.setItem("e_date", document.getElementById("newDate").value);
          window.localStorage.setItem("e_loc", document.getElementById("newLocation").value);
          window.localStorage.setItem("e_comments", document.getElementById("newComments").value);
          window.localStorage.setItem("p_file_name", document.getElementById("largeImage").src);
          window.localStorage.setItem("geotag", document.getElementById("geotagText").text);
          window.localStorage.setItem("p_file_loc", document.getElementById("largeImage").src);
     },
     loadNewEvent: function() {

          $('#newTitle').val(results.rows.item(0).title);
          $('#newDate').val(results.rows.item(0).date);
          $('#newLocation').val(results.rows.item(0).locaation);
          $('#geotagText').text(results.rows.item(0).geoLat + ', ' + results.rows.item(0).geoLong);
          $('#editComments').val(results.rows.item(0).comments);
          $('#largeImage').attr("scr", results.rows.item(0).picWallLoc);
     },
     loadEditEvent: function() {

          $('#newTitle').val(results.rows.item(0).title);
          $('#newDate').val(results.rows.item(0).date);
          $('#newLocation').val(results.rows.item(0).locaation);
          $('#geotagText').text(results.rows.item(0).geoLat + ', ' + results.rows.item(0).geoLong);
          $('#editComments').val(results.rows.item(0).comments);
          $('#largeImage').attr("scr", results.rows.item(0).picWallLoc);
     },
     clearEvent: function() {
          window.localStorage.clear();
     },
     onFileRequest: function() {
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, onFail);
     },
     gotFS: function(F) {

     },
// Called when a photo is successfully retrieved
//

     onPhotoDataSuccess: function(imageURI) {
          // Uncomment to view the base64 encoded image data
          // console.log(imageData);

          // Get image handle
          //
          var imgProfile = document.getElementById('largeImage');
          // Show the captured photo
          // The inline CSS rules are used to resize the image
          //
          imgProfile.src = imageURI;
          if (sessionStorage.isprofileimage == 1) {
               getLocation();
          }
          movePic(imageURI);
     },
// Called if something bad happens.
// 
     onFail: function(message) {
          alert('Failed because: ' + message);
     },
     movePic: function(file) {
          window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError);
     },
//Callback function when the file system uri has been resolved
     resolveOnSuccess: function(entry) {
          var d = new Date();
          var n = d.getTime();
          //new file name
          var newFileName = n + ".jpg";
          var myFolderApp = eventFolder + 'Gallery/';
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
               //The folder is created if doesn't exist
               fileSys.root.getDirectory(myFolderApp,
                       {create: true, exclusive: false},
               function(directory) {
                    entry.moveTo(directory, newFileName, successMove, resOnError);
               }, resOnError);
          }, resOnError);
     },
//Callback function when the file has been moved successfully - inserting the complete path
     successMove: function(entry) {
          //Store imagepath in session for future use
          // like to store it in database
          window.localStorage.setItem('imagepath', entry.fullPath);
          picURL = entry.toURL();
          addPhoto();
     },
     resOnError: function(error) {
          console.log()(error.code);
     },
     // A button will call this function
     //
     capturePhoto: function() {
          // Take picture using device camera and retrieve image as base64-encoded string
          navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: 50,
               destinationType: destinationType.FILE_URI});
     },
     // A button will call this function
     //
     getPhoto: function(source) {
          // Retrieve image file location from specified source
          navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: 50,
               destinationType: destinationType.FILE_URI,
               sourceType: source});
     },
     //

     /*
      * setup a rectangle of squares of 16 x 8 units
      * if single face - big v small
      * if faces are even balance between the two sides 
      */
     setupWall: function() {

     },
     addPhoto: function(image) {

     },
     addFace: function(face) {

     },
     saveWall: function() {

     },
     getGeoTag: function() {
          navigator.geolocation.getCurrentPosition(events.geotagOnSuccess, events.onError);
     },
     // onSuccess Geolocation
     //
     geotagOnSuccess: function(position) {
          var element = document.getElementById('geolocation');
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
     },
     // onError Callback receives a PositionError object
     //
     onError: function(error) {
          console.log('code: ' + error.code + ', ' +
                  'message: ' + error.message + '\n');
     },
     // Transaction error callback
     //
     errorCB: function(err) {
          console.log("APP_LOG: Error processing SQL: " + err.message);
     },
     // Transaction success callback
     //
     successCB: function() {
          console.log('APP_LOG: DB access success...');
     },
     listEvents: function() {
          var db = window.openDatabase("EventFacesDB", "", "Event Faces Database", 200000);
          db.transaction(events.getListQuerry, events.errorCB, events.successDB);
          console.log('Getting List of events');
     },
     successDB: function() {
          console.log('APP_LOG: successDB()...');
     },
     getListQuerry: function(tx) {
          tx.executeSql("SELECT id, title, description, picNum, FaceNum FROM EventFacesDB.events", [], events.createList, events.errorCB);
     },
     setEventID: function(id) {
          window.localStorage.setItem("eventID", id);
     },
     createList: function(tx, results) {
          window.localStorage.setItem("eventID", results.rows.length);
          window.localStorage.setItem("eventID", id);
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
               for (var i = 0; i < results.rows.length; i++) {
                    var thumbnail = "Events/Event" + results.rows.item(i).id + "/thumb.jpg";
                    var url = "";
                    fileSystem.root.getFile(thumbnail, NULL, function(fileEntry) {
                         fileEntry.file(function(file) {
                              var reader = new FileReader();
                              reader.onloadend = function(evt) {
                                   url = evt.target.result;
                              };
                         }, events.onError);
                    }, events.onError);
                    $(eventList).append(
                            '<li><a href="#EditEvent" onclick="setEventID(' + results.rows.item(i).id + ');">' +
                            '<img src="' + url + '" alt="thumb">' +
                            '<h4>' + results.rows.item(i).title + '</h4><p>' + results.rows.item(i).description + '</p>' +
                            '<span class="ui-li-count ui-btn-up-b ui-btn-corner-all">' + results.rows.item(i).picNum + '</span>' +
                            '<span class="ui-li-count ui-btn-up-c ui-btn-corner-all">' + results.rows.item(i).faceNum + '</span>' +
                            '</a></li>');
               }
          }
          , fsFail);
     },
     loadEvent: function(id) {
          var db = window.openDatabase("EventFacesDB", "", "Event Faces Database", 200000);
          db.transaction(events.getSingleEvent, events.errorCB, events.successCB);
          console.log('Getting event ' + id);
     },
     getSingleEvent: function(tx) {
          tx.executeSql("SELECT title, date, location, geoLat, geoLong, comments, picWallLoc, picWallName  FROM EventFacesDB.events where id=" + eventID + ";",
                  [], events.eventLoadByID, events.errorCB);
     },
     eventLoadByID: function(tx, results) {
          $('#editTitle').val(results.rows.item(0).title);
          $('#editDate').val(results.rows.item(0).date);
          $('#editLocaation').val(results.rows.item(0).locaation)
                  ;
          $('#editGeolocationTag').text(results.rows.item(0).geoLat + ', ' + results.rows.item(0).geoLong);
          $('#editComments').val(results.rows.item(0).comments);
          $('#largeImage').attr("scr", results.rows.item(0).picWallLoc + results.rows.item(0).picWallName);
     },
     saveEvent: function() {
          events.setEvent();
          var db = window.openDatabase("EventFacesDB", "", "Event Faces Database", 200000);
          db.transaction(events.eventToDB, events.errorCB, events.successCB);
     },
     eventToDB: function(tx) {
          var title = window.localStorage.getItem("e_title");
          var desc = window.localStorage.getItem("e_description");
          var comments = window.localStorage.getItem("e_comments");
          var date = window.localStorage.getItem("e_date");
          var geolat = window.localStorage.getItem("g_lat");
          var geolong = window.localStorage.getItem("g_long");
          var location = window.localStorage.getItem("g_loc");
          var wallName = window.localStorage.getItem("p_wall_file");
          var wallLoc = window.localStorage.getItem("p_wall_folder");
          var picNum = window.localStorage.getItem("p_count");
          var faceNum = window.localStorage.getItem("f_count");
          var thumb = window.localStorage.getItem("has_thumb");

          var sql = 'INSERT INTO events (thumb, title, description, ' +
                  'location, geoLat, geoLong, date, comments, ' +
                  'picWallName, picWallLoc, picNum, faceNum) VALUES' +
                  '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ';
          tx.executeSql(sql, [thumb, title, desc, location, geolat, geolong, date, comments, wallName, wallLoc, picNum, faceNum], events.errorCB, events.successCB);
     },
     eventChangeDB: function(tx) {
          var title = window.localStorage.getItem("e_title");
          var desc = window.localStorage.getItem("e_description");
          var comments = window.localStorage.getItem("e_comments");
          var date = window.localStorage.getItem("e_date");
          var geolat = window.localStorage.getItem("g_lat");
          var geolong = window.localStorage.getItem("g_long");
          var location = window.localStorage.getItem("g_loc");
          var wallName = window.localStorage.getItem("p_wall_file");
          var wallLoc = window.localStorage.getItem("p_wall_folder");
          var picNum = window.localStorage.getItem("p_count");
          var faceNum = window.localStorage.getItem("f_count");
          var thumb = window.localStorage.getItem("has_thumb");

          var sql = 'UPDATE events SET thumb="?", title="?", description="?", ' +
                  'location="?", geoLat="?", geoLong="?", date="?", comments="?", ' +
                  'picWallName="?", picWallLoc="?", picNum="?", faceNum="?"' +
                  'WHERE id="?"; ';
          tx.executeSql(sql, [thumb, title, desc, location, geolat, geolong, date, comments, wallName, wallLoc, picNum, faceNum, eventID], errorCB, successCB);
     },
     setPhoto: function() {
          tx.executeSql();
     },
     setFace: function() {
          tx.executeSql();
     }
};

