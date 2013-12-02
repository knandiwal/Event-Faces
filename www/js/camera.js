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
          pictureSource = navigator.camera.PictureSourceType;
          destinationType = navigator.camera.DestinationType;
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
     // Called when a photo is successfully retrieved
     //
     onPhotoDataSuccess: function(imageData) {
          // Uncomment to view the base64-encoded image data
          // console.log(imageData);

          // Get image handle
          //
          var smallImage = document.getElementById('smallImage');

          // Unhide image elements
          //
          smallImage.style.display = 'block';

          // Show the captured photo
          // The inline CSS rules are used to resize the image
          //
          smallImage.src = "data:image/jpeg;base64," + imageData;
     },
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
     },
     capturePhoto: function() {
          // Take picture using device camera and retrieve image as base64-encoded string
          navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, {quality: 70,
               destinationType: destinationType.DATA_URL});
     },
     // A button will call this function
//
     getPhoto: function(source) {
          // Retrieve image file location from specified source
          navigator.camera.getPicture(this.nPhotoURISuccess, this.onFail, {quality: 70,
               destinationType: destinationType.FILE_URI,
               sourceType: source});
     },
     capturePhotoEdit: function() {
          // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
          navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: 20, allowEdit: true,
               destinationType: destinationType.DATA_URL});
     },
     onFail: function(message) {
          alert('Failed because: ' + message);
     }


};

var pictureSource;   // picture source
var destinationType; // sets the format of returned value





// Called if something bad happens.
//

