$(document).ready(function(){

// Set Up Variables
//==============================================================================

// API Key
var apiKey = "KjV6PD0sUPN2D8Nmytfy8AAJlXFY6bcfXnrQdO9R";

// Search Parameter Date Initialized to Empty String
var date = "";

// URL Base
var queryURLBase = "https://api.nasa.gov/planetary/apod?" + "api_key=" + apiKey;

// Functions
//==============================================================================

  // Main Function that Takes the Query URL Parameter
  function runQuery(queryURL){

  // AJAX Function
  $.ajax({
      url: queryURL,
      success: function(result){
        if("copyright" in result) {
          $("#copyright").text("Image Credits: " + result.copyright);
        }
        else {
          $("#copyright").text("Image Credits: " + "Public Domain");
        }
        
        if(result.media_type == "video") {
          $("#apod_img_id").css("display", "none"); 
          $("#apod_vid_id").attr("src", result.url);
        }
        else {
          $("#apod_vid_id").css("display", "none"); 
          $("#apod_img_id").attr("src", result.url);
        }
        $("#apod_explaination").text(result.explanation);
        $("#apod_title").text(result.title);
      }
    });

  }

// Main Processes
//==============================================================================

  // Function For What Happens When You Click Submit Button
  $("#search-btn").on("click", function(){

    // Displays the Well Section
    $(".well-section").css("display", "block");

    // Captures The Value Of What Is In The Search Bar
    date = $("#search").val().trim();

    //creates the whole URL 
    var newURL = queryURLBase + "&date=" + date;

    // AJAX Function Call
    runQuery(newURL); 

  });

  // Empty the Returned Data from the Well Section
  // Hide the Well Section
  $("#clear-btn").on("click", function(){
      $("#copyright").empty();
      $("#apod_explaination").empty();
      $("#apod_title").empty();
      $(".well-section").css("display", "none");
  });

});



