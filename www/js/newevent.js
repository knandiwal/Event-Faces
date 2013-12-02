/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var newevent = {
     initialize: function() {
          this.bindEvents();
     },
     bindEvents: function() {
          document.addEventListener('deviceready', newevent.onDeviceReady, false);
          console.log('waiting for device ready');
     },
     onDeviceReady: function() {
          console.log('device ready on new event page');
          newevent.setup();
     },
     setup: function() {
          this.getCurrentLocation();
          $('input.editTitle').text("At : " + getTime());
          console.log('setup new event')
     },
     getTime: function() {
          var a_p = "";
          var d = new Date();
          var curr_date = d.getDate();
          var curr_month = d.getMonth();
          curr_month++;
          var curr_year = d.getFullYear();
          var curr_hour = d.getHours();
          if (curr_hour < 12) {
               a_p = "AM";
          } else {
               a_p = "PM";
          }
          if (curr_hour == 0) {
               curr_hour = 12;
          }
          if (curr_hour > 12) {
               curr_hour = curr_hour - 12;
          }
          var curr_min = d.getMinutes();
          curr_min = curr_min + "";
          if (curr_min.length == 1) {
               curr_min = "0" + curr_min;
          }
          return curr_month + "/" + curr_date + "/" + curr_year + ", " + curr_hour + " : " + curr_min + " " + a_p;
     },
     getConnection: function() {
          var connected = function() {
               console.log('finding connection');
               if (networkState == Connection.NONE) {
                    return false;
               } else {
                    return true;
               }
          };
     },
     getGeoLocation: function() {
          if (getConnection()) {
               console.log('finding clocation');
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
     },
};