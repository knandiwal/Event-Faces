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
            
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
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
        var db = window.openDatabase("EventFacesDB", "1.0", "Event Faces Database", 200000);
        db.transaction(this.createDB, this.errorCB, this.successCB);
    },

    // Populate the database 
    //
    createDB: function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Events (id unique, title, description, geo_tag_lat, geo_tag_long, date_time, post_to_soc_media_event_folder)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Faces (id unique, file_name, file_location, face_name, face_vector, photo_id, event_id, identity_id)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Photos (id unique, file_name, file_location, event_id)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Identity (id, person_name, file_name, file_location, identity_vector)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Social (id INTEGER PRIMARY KEY, service, login, password)');
        
        //Add Test Data - To confirm that same DB is accessed later on in the app
        tx.executeSql('INSERT INTO tbl_Social (service, login, password) VALUES ("SERVICE_TEST_555", "LOGIN_TEST", "PWD_TEST")');
    },
    
    // Transaction error callback
    //
    errorCB: function(err) {
        console.log("Error processing SQL: "+ err.message);
    },

    // Transaction success callback
    //
    successCB: function() {
        console.log('APP_LOG: successCB()...');
        app.callQueryDB();
    },
            
    callQueryDB: function() {
        var db = window.openDatabase("EventFacesDB", "1.0", "Event Faces Database", 200000);
        db.transaction(this.queryDB, this.errorCB);       
        console.log('APP_LOG: dispatched queryDB()!');
    },
            
    queryDB: function(tx) {
        app.selectQuery(tx);
        console.log("APP_LOG: queryDB()...");
    },
            
    selectQuery: function(tx) {
        //tx.executeSql('SELECT * FROM tbl_Social', [], this.querySuccess, this.errorCB);
        tx.executeSql('SELECT * FROM tbl_Social WHERE service="SERVICE_TEST_555"', [], this.querySuccess, this.errorCB);
    },
    
    // Transaction success callback
    //
    successDB: function() {
        console.log('APP_LOG: successDB()...');
    },
    
    querySuccess: function(tx, results) {        
        console.log("Insert ID = " + results.rows.length);   
        console.log('APP_LOG: querySuccess()...');
        app.setupFileSystem();
    },
            
    //***************FILE SYSTEM SETUP***************** ****************************//
    
    setupFileSystem: function() {
        //window.webkitStorageInfo.requestQuota(PERSISTENT, 1024*1024)
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
       console.log("Created dir "+dir.name);
   },

   onGetDirectoryFail: function (error) { 
       console.log("Error creating directory "+error.code); 
   } 
    
    //**************************************************** ****************************//
};
