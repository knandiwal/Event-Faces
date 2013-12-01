/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    //*************************ADDED BY SHEY: 29 NOV 2013 ****************************//
    //
   // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log("APP_LOG: onDeviceReady!");
        app.setupDB('deviceready');
    },
            
    setupDB: function() {
        var db = window.openDatabase("EventFacesDB", "", "Event Faces Database", 200000);
        db.changeVersion(db.version, "1.2");
        db.transaction(this.createDB, this.errorCB, this.successCB);
    },

    // Create the database 
    //
    createDB: function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY, thumb TEXT, ' + 
                                                    'title TEXT, description TEXT, '+
                                                    'location TEXT, geoLat NUMERIC, '+
                                                    'geoLong NUMERIC, date DATETIME, '+
                                                    'postSoc BOOLEAN, comments TEXT, '+
                                                    'picWallName TEXT, picWallLoc TEXT, '+
                                                    'picNum NUMERIC, faceNum NUMERIC)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS photos (' + 
                                                    'id INTEGER PRIMARY KEY, ' + 
                                                    'fileName TEXT, fileLoc TEXT, '+
                                                    'eventID NUMERIC, '+
                                                    'FOREIGN KEY(eventID) REFERENCES events(id))');
        tx.executeSql('CREATE TABLE IF NOT EXISTS identity (' +
                                                    'id INTEGER PRIMARY KEY, ' + 
                                                    'name TEXT, trainFile TEXT, '+
                                                    'trainLoc TEXT, vector TEXT)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS faces (' + 
                                                    'id INTEGER PRIMARY KEY, ' + 
                                                    'fileName TEXT, fileLoc TEXT, '+
                                                    'eventID NUMERIC, identID NUMERIC, '+
                                                    'photoID NUMERIC, vector TEXT, '+
                                                    'position NUMERIC, width NUMERIC, '+
                                                    'height NUMERIC, '+
                                                    'FOREIGN KEY(photoID) REFERENCES photos(id),'+
                                                    'FOREIGN KEY(identID) REFERENCES identity(id),'+
                                                    'FOREIGN KEY(eventID) REFERENCES events(id))');
        tx.executeSql('CREATE TABLE IF NOT EXISTS social (' + 
                                                    'id INTEGER PRIMARY KEY, ' + 
                                                    'site TEXT, user TEXT, pass TEXT)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS userPrefs (' +
                                                    'id INTEGER PRIMARY KEY, prefKey TEXT UNIQUE, value BOOLEAN)');  
    },
    
    // Transaction error callback
    //
    errorCB: function(err) {
        console.log("APP_LOG: Error processing SQL: "+ err.message);
    },

    // Transaction success callback
    //
    successCB: function() {
        console.log('APP_LOG: createDB success...');
        app.callQueryDB();
    },
            
    callQueryDB: function() {
        var db = window.openDatabase("EventFacesDB", "", "Event Faces Database", 200000);
        db.transaction(this.queryDB, this.errorCB);
        console.log('APP_LOG: dispatched queryDB()!');
    },
            
    queryDB: function(tx) {
        app.selectQuery(tx);
        console.log("APP_LOG: dispatched selectQuery()...");
    },
            
    selectQuery: function(tx) {
        tx.executeSql('SELECT * FROM userPrefs', [], this.querySuccess, this.errorCB);
    },
    
    successDB: function() {
        console.log('APP_LOG: successDB()...');
    },
    
    querySuccess: function(tx, results) {    
        console.log('APP_LOG: querySuccess()...');    
        var numRec = results.rows.length;
        console.log("APP_LOG: userPrefs.numRecords = " + numRec);   
        
        if (numRec > 0) {
            app.setupFileSystem();
        }
        else {
            app.setupUserPref();
        }
    },  
    
    setupUserPref: function() {
        var db = window.openDatabase("EventFacesDB", "", "Event Faces Database", 200000);
        db.transaction(this.setDefaultValues, this.errorCB, this.onSetDefaultSuccess);
    },
            
    //Add Default Data for social media and geotag settings:: 0=false, 1=true
    setDefaultValues: function(tx) {        
        tx.executeSql('INSERT INTO userPrefs (prefKey, value) VALUES ("FACEBOOK", 0)');
        tx.executeSql('INSERT INTO userPrefs (prefKey, value) VALUES ("INSTAGRAM", 1)');
        tx.executeSql('INSERT INTO userPrefs (prefKey, value) VALUES ("GEOTAG", 0)');
        
        // TO BE REMOVED OR COMMENTED OUT - FOR TESTING PUPOSES ONLY
        tx.executeSql('INSERT INTO social (site, user, pass) VALUES ("FACEBOOK", "sheyFB", "pass")');
        tx.executeSql('INSERT INTO social (site, user, pass) VALUES ("INSTAGRAM", "sheyInst", "pass")');        
        
        console.log('APP_LOG: setDefaultValues...');
    },
            
    onSetDefaultSuccess: function(tx) {
        console.log('APP_LOG: onSetDefaultSuccess()');
        app.setupFileSystem();
    },
            
    //***************FILE SYSTEM SETUP***********************************************//
    
    setupFileSystem: function() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.onRequestFileSystemSuccess, this.errorCB);
    },
    
    onRequestFileSystemSuccess: function (fileSystem) {
        console.log("APP_LOG: Got File System: " + fileSystem.toString());
        app.getDirectory(fileSystem);
    },
            
    getDirectory: function(fileSystem) {
        var entry=fileSystem.root; 
        entry.getDirectory("Events", {create: true, exclusive: false}, this.onGetDirectorySuccess, this.onGetDirectoryFail); 
   },

   onGetDirectorySuccess: function (dir) { 
       console.log("APP_LOG: Created dir "+dir.name);
       app.createUserPrefsFile();
   },

   onGetDirectoryFail: function (error) { 
       console.log("APP_LOG: Error creating directory "+error.code); 
   }, 
           
    createUserPrefsFile: function() {
        app.receivedEvent("deviceready");
    },
            
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('APP_LOG: Received Event: ' + id);
        
        // Redirect to the Main Menu Screen
        //window.location='./main.html';
        window.location='./settings.html';
    }
    
    //**************************************************** ****************************//
         
};
