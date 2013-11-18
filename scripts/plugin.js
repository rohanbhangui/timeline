(function ($) {

  $.fn.timeline = function( options ) {

    // This is the easiest way to have default options.
    var settings = $.extend({
      timelineItemClass: ".item",
      dayPixelAmount: 1
    }, options );

    //setting the css of some elements to reduce reliance on stylesheet
    $(".display").css("position", "absolute");
    $(".display").css("width", "79%");
    $(".display").css("right", "0px");

    //for the timeline line
    var containerHeight;

    //for getting the total number of days from data-date
    var totalDays;

    //the last timeline item
    var lastItem;

    $(settings.timelineItemClass).each(function(index) {

      //spliting the date data for point into year, month and day
      var currYear = parseInt($(this).attr("data-date").split("/")[0]);
      var currMonth = parseInt($(this).attr("data-date").split("/")[1]);
      var currDay = parseInt($(this).attr("data-date").split("/")[2]);


      //check if month exists in data
      if(isNaN(currDay))
      {
        currDay = 1;
      }

      //check if day exists in data
      if(isNaN(currMonth))
      {
        currMonth = 1;
      }

      //doing some date math
      var Date1 = new Date (currYear, currMonth, currDay);
      var Date2 = new Date (2014, 1, 1);
      var deltaDays = Math.floor((Date2.getTime() - Date1.getTime())/(1000*60*60*24));

      //calculate vertical offset based on how man pixels define a day and the delta days
      var verticalOffset = deltaDays*settings.dayPixelAmount;
      
      $(this).css("margin-top", verticalOffset);

      //set the intital value of container height 
      if(index == 0)
      {
        containerHeight = verticalOffset;
      }
      else if (index > 0)
      {
        if(verticalOffset > containerHeight)
        {
          containerHeight = verticalOffset;
        }
      }

      lastItem = $(this);
    });

    $(".container, .display").css("height", containerHeight + lastItem.children(".content").height() + 20);
  };

}( jQuery ));