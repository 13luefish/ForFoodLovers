//Yelp API Requests

function getRestaurants() {
  // Empty Restaurants Div
  $(".restaurant-results").empty();

  navigator.geolocation.getCurrentPosition(getLocation);
  function getLocation(position) {
    //Query URL Variables
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var foodType = $(".food-type")
      .children(":selected")
      .attr("selected", true)
      .val();
    var resultNum = $(".limit")
      .children(":selected")
      .attr("selected", true)
      .val();

    var yelpAPIKey =
      "4DBMEQnFM1zFlRsPVpLfOamUM4QoayMJttYa14Sn5PXAnv-CiaSNe833S5RwHFiPcYiEMtKT1HSIczMSHNAyegAlqNpZn7Rc6MWsdc4GSvxzEfS5aDw804BuBRGqXnYx";

    var yelpQueryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=${foodType}&limit=${resultNum}`;

    $.ajax({
      url: yelpQueryURL,
      method: "GET",
      headers: {
        Authorization: "Bearer " + yelpAPIKey,
      },
    }).then(function (response) {
      var result = response.businesses;

      console.log(response);

      // Loop Through Response Object
      for (var i = 0; i < result.length; i++) {

        // Rating Number
        var rating = JSON.parse(result[i].rating);

        // Dynamic Variables
        var ratingEl;
        var priceEl;

        // Switch Statement For Yelp Stars

        switch (rating) {
          case 0 || undefined:
            ratingEl = $("<img>").attr("src", "assets/img/yelp/regular_0.png");
            break;
          case 1:
            ratingEl = $("<img>").attr("src", "assets/img/yelp/regular_1.png");
            break;
          case 1.5:
            ratingEl = $("<img>").attr(
              "src",
              "assets/img/yelp/regular_1_half.png"
            );
            break;
          case 2:
            ratingEl = $("<img>").attr("src", "assets/img/yelp/regular_2.png");
            break;
          case 2.5:
            ratingEl = $("<img>").attr(
              "src",
              "assets/img/yelp/regular_2_half.png"
            );
            break;
          case 3:
            ratingEl = $("<img>").attr("src", "assets/img/yelp/regular_3.png");
            break;
          case 3.5:
            ratingEl = $("<img>").attr(
              "src",
              "assets/img/yelp/regular_3_half.png"
            );
            break;
          case 4:
            ratingEl = $("<img>").attr("src", "assets/img/yelp/regular_4.png");
            break;
          case 4.5:
            ratingEl = $("<img>").attr(
              "src",
              "assets/img/yelp/regular_4_half.png"
            );
            break;
          case 5:
            ratingEl = $("<img>").attr("src", "assets/img/yelp/regular_5.png");
            break;
          default:
            break;
        }

        // Check if Price is Valid

        if (result[i].price === undefined) {
          priceEl = $("<p>").text("Click below to learn more");
        } else {
          priceEl = $("<p>").text("Price: " + result[i].price);
        }

        // Defining Variables Before Append

        var newDiv = $("<div>").addClass("col s12 m4");
        var cardDiv = $("<div>").addClass("card");
        var contentDiv = $("<div>").addClass("card-content");

        var nameEl = $("<h5>").text(result[i].name);
        var img = $("<img/>")
          .attr("src", result[i].image_url)
          .addClass("card-image responsive-img")
          .attr({
            style: "padding: 5px 10px 5px 10px",
          });
        var reviewCount = $("<p>")
          .text(`Based on ${result[i].review_count} reviews`)
          .attr({ style: "color: gray; padding-bottom: 5px;" });
        var addressEl = $("<p>").text(
          "Address: " + result[i].location.display_address.join(" ")
        );
        var link = $("<a>")
          .text("Learn More")
          .attr("href", result[i].url)
          .addClass("waves-effect waves-light red darken-3 btn");
        var breakEl = $("<br />");

        // Appending Variables to DOM
        contentDiv.append(
          img,
          nameEl,
          priceEl,
          ratingEl,
          reviewCount,
          addressEl,
          breakEl,
          link
        );
        cardDiv.append(contentDiv);
        newDiv.append(cardDiv);

        $(".restaurant-results").append(newDiv);
      }
    });
  }
}
