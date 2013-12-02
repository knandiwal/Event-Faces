/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var screen = {
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
   
   // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log("APP_LOG: GALLERY.onDeviceReady!");
        //screen.setupDBCall();
        screen.useTestData(1, 'Event A');
    },
    
    setupDBCall: function() {
        var db = window.openDatabase("EventFacesDB", "", "Event Faces Database", 200000);
        db.transaction(this.getEvents, this.errorCB, this.onGetEventSuccess);
    },
    
    getEvents: function(tx) {
        tx.executeSql('SELECT id, title FROM events');                                            
     },
    
     errorCB: function(err) {
        console.log("APP_LOG: Error processing SQL: "+ err.message);
    },

    onGetEventSuccess: function(tx, results) {
        console.log('APP_LOG: onGetEventSuccess...');        
        var numRec = results.rows.length, i;
        console.log("APP_LOG: events.numRecords = " + numRec); 
        var eventIds = [];
        
        if (numRec > 0) {            
            for (i=0; i<numRec; i++) {
                console.log(results.rows.item(i).id);
                console.log(results.rows.item(i).title);
                
                var id = results.rows.item(i).id;
                var title = results.rows.item(i).title;
                
                eventIds.push(id);
                
                // Create List Item and add to the page
                var eventItem = '<li><a href="#Event' + id +'">' + title + '</a></li>';
                $("#EventList").append(eventItem).listview('refresh');
            }      
            
            // Save to local storage for later use
            window.localStorage.setItem("eventTitles", eventIds);
        }
        else {
            var eventItem = '<li><a>NO EVENTS</a></li>';
            $("#EventList").append(eventItem).listview('refresh');
        }
    },
    
    getEventImageLoc: function() {
        
    },
    
    createEventGalleryPage: function() {
        screen.useTestData(id, title);
    },
    
    //*************************************//
    useTestData: function(id, title) {   
        //var id = 1;
        //var title = 'Event A';
        var eventItem = '<li><a href="#Event' + id +'">' + title + '</a></li>';
        console.log(eventItem);
        $("#EventList").append(eventItem).listview('refresh');
        
        //Add photo page
        var eventPage = '<div data-role="page" id="Event' + id + '" class="gallery-page">' +
                                        '<div data-role="header"><h1>' + title + '</h1></div>' +
                                        '<div data-role="content">' +
                                            '<div class="gallery">' +
                                                '<div class="gallery-row">' +
                                                    '<div class="gallery-item"><a href="img/images/full/001.jpg" rel="external"><img src="img/images/thumb/001.jpg" alt="Image 001" /></a></div>' +
                                                    '<div class="gallery-item"><a href="img/images/full/002.jpg" rel="external"><img src="img/images/thumb/002.jpg" alt="Image 002" /></a></div>' +
                                                    '<div class="gallery-item"><a href="img/images/full/003.jpg" rel="external"><img src="img/images/thumb/003.jpg" alt="Image 003" /></a></div>' +
                                               '</div>' +
                                                '<div class="gallery-row">' +
                                                    '<div class="gallery-item"><a href="img/images/full/004.jpg" rel="external"><img src="img/images/thumb/004.jpg" alt="Image 004" /></a></div>' +
                                                    '<div class="gallery-item"><a href="img/images/full/005.jpg" rel="external"><img src="img/images/thumb/005.jpg" alt="Image 005" /></a></div>' +
                                                    '<div class="gallery-item"><a href="img/images/full/006.jpg" rel="external"><img src="img/images/thumb/006.jpg" alt="Image 006" /></a></div>' +
                                               '</div>' +
                                                '<div class="gallery-row">' +
                                                    '<div class="gallery-item"><a href="img/images/full/007.jpg" rel="external"><img src="img/images/thumb/007.jpg" alt="Image 007" /></a></div>' +
                                                    '<div class="gallery-item"><a href="img/images/full/008.jpg" rel="external"><img src="img/images/thumb/008.jpg" alt="Image 008" /></a></div>' +
                                                    '<div class="gallery-item"><a href="img/images/full/009.jpg" rel="external"><img src="img/images/thumb/009.jpg" alt="Image 009" /></a></div>' +
                                               '</div>' +
                                            '</div>' +
                                        '</div>'+
                                        '<div data-role="footer" data-theme="a" data-position="fixed">'+
                                            '<div data-role="navbar">'+
//                                                '<ul>'+
//                                                    '<li><a onclick="go("main");" data-icon="home">Home</a></li>'+
//                                                    '<li><a onclick="go("event");" data-icon="plus">New Event</a></li>'+
//                                                    '<li><a onclick="go("faces");" data-icon="user">Faces</a></li>'+
//                                                '</ul>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>';
        
        $('body').append(eventPage);
        $.mobile.initializePage();
    }
    //************************************************************//
            
};

