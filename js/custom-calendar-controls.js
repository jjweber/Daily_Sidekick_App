$(function() {
  // This is Dummy Data that will load to show functionality

    // Creating a variable to hold my events array.
    var eventStore = {
      "monthly": [
        {
          "name": "Demo JSON Event 1",
          "startdate": "2017-5-15",
          "enddate": "2017-5-15",
          "starttime": "12:00",
          "endtime": "2:00",
          "color": "#FFB128",
          "url": ""
        },
        {
          "name": "Demo JSON Event 2",
          "startdate": "2017-10-15",
          "enddate": "2017-10-15",
          "starttime": "12:00",
          "endtime": "2:00",
          "color": "#EF44EF",
          "url": ""
        }
      ]
    };

    // Creating a function to build the Calendar object from my monthly.js file
    // in the mycalendar div on my calendar.html page
    function drawCalendar() {
      $('#mycalendar').monthly({
        mode: 'event',
        events: eventStore,
        dataType: 'json'
      });
    }

    // Setting up click event on my Add Event btn.
    $( ".add-new-event-btn" ).click(function() {

      // Creating a new Instance of my New Event object
      var newEvent = {
          "name": $("#event-info").val(),
          "startdate": $("#new-event-start-date").val(), // 05/18/2017
          "enddate": $("#new-event-end-date").val(),
          "starttime": $("#new-event-start-time").val(),
          "endtime": $("#new-event-end-time").val(),
          "color": "#4D91BF",
          "url": ""
      };

      console.log("New Event Created:", newEvent);

      // Pushing the new created event object to my Monthly array.
      eventStore.monthly.push(newEvent);


      $('#addEventModal').modal('toggle');


      // Removing the old Calendar object from the mycalendar
      // div on my calendar.html page if one exists
      $('#mycalendar').empty();

      // Creating an Instance of my Calendar object
      drawCalendar();
    });

    // Creating an Instance of my Calendar object
    drawCalendar();

    // Changing the format of date returned from datepicker to fit
    //required format from my monthly array.
    $( "#new-event-date" ).datepicker({dateFormat:'yy-mm-dd',});
});
