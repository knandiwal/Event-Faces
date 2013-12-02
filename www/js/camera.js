/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var camera = {
     initialize: function() {
          document.addEventListener("deviceready", onDeviceReady, false);
     },
     onDeviceReady: function() {
//request the persistent file system
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
     },
     fileSystemSuccess: function(fileSystem) {
          var directoryEntry = fileSystem.root; // to get root path to directory 
          var eventID = window.localStorage.getItem;
          var folder = "Events/Event" + eventID + "/Gallery/";
          directoryEntry.getDirectory(folder, {create: true, exclusive: false}, this.onDirectorySuccess, this.onDirectoryFail);
          var rootdir = fileSystem.root;
          var fp = rootdir.fullPath;
          fp = fp + "image_name.png";
          var fileTransfer = new FileTransfer();
          fileTransfer.download("<url_to_download>", fp,
                  function(entry) {
                       alert("download complete: " + entry.fullPath);
                  },
                  function(error) {
                       alert("download error source " + error.source);
                       alert("download error target " + error.target);
                       alert("upload error code" + error.code);
                  }
          );
     },
     onDirectorySuccess: function(parent) {
          console.log(parent);
     },
     onDirectoryFail: function(error) {
          alert("Unable to create new directory: " + error.code);
     },
     fileSystemFail: function(evt) {
          console.log(evt.target.error.code);
     },
     getPhoto: function(source) {
// Retrieve image file location from specified source
          navigator.camera.getPicture(onPhotoURISuccess, onFail, {quality: 50,
               destinationType: destinationType.FILE_URI,
               sourceType: source});
     },
// Called when a photo is successfully retrieved
//
     onPhotoURISuccess: function(imageURI) {
// Uncomment to view the image file URI
// console.log(imageURI);

// Get image handle
//
          var largeImage = document.getElementById('largeImage');
          // Unhide image elements
          //
          largeImage.style.display = 'block';
          // Show the captured photo
          // The inline CSS rules are used to resize the image
          //
          largeImage.src = imageURI;
     }


};