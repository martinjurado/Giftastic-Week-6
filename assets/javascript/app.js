// Initial Array of shows

var nickshows = ["Rugrats", "Hey Arnold", "CatDog", "Ren and Stimpy", "The Wild Thornberrys", "All That", "Drake and Josh"];

// Function turn array into buttons 

function buttonDump() {

    $(".button-container").empty();

    // loops through array of shows
    for (var i = 0; i < nickshows.length; i++) {

        var b = $("<button>");

        b.addClass("show-btn btn btn-warning");

        b.attr("data-name", nickshows[i]);

        b.text(nickshows[i]);

        $(".button-container").append(b)

    }

}
// Click event that pushes user input into array of buttons 
$(".search-button").on("click", function turn(event) {

    event.preventDefault();

    var show = $(".search").val().trim();

    nickshows.push(show);

    buttonDump();


});

buttonDump();



// Function that puts out all GIFS in gif-container
function showInfo() {

    $(".gif-container").empty(); // empties out the container when clicked
    var nickShow = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        nickShow + "&api_key=dc6zaTOxFJmzC&limit=10";

    // AJAX CALL
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {



        // contains data of specific gif
        var results = response.data;
        console.log(results)

        for (var i = 0; i < results.length; i++) {

            // div that contains all gifs 
            var gifDiv = $("<div>");

            // div class
            gifDiv.addClass("nick-container");

            // p tag 
            var p = $("<p>");

            // rating

            p.text("Rating: " + results[i].rating);

            // img tag
            var nickImg = $("<img>");

            // set the src of gif to url of img from api result
            nickImg.attr("src", results[i].images.fixed_width_still.url);

            // class
            nickImg.addClass("nickGif");

            // set attr data-state to still 
            nickImg.attr("data-state", "still");

            // set attr data-still to url of still gif
            nickImg.attr("data-still", results[i].images.fixed_width_still.url);

            // set attr data-animale to url of moving gif
            nickImg.attr("data-animate", results[i].images.fixed_width.url);

            // append P tag to gifDiv
            gifDiv.append(p);

            // append gif to gifDiv
            gifDiv.append(nickImg);

            $(".gif-container").prepend(gifDiv);

        }
    })
};



// Adding click event listeners to all elements with a class of "show-btn"
$(document).on("click", ".show-btn", showInfo);

// Calling the buttonDump function to display the intial buttons
buttonDump();

$(document).on("click", ".nickGif", function () {

    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

