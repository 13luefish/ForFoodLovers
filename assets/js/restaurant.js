//Yelp API Requests

function getRestaurants() {
  navigator.geolocation.getCurrentPosition(getLocation);
  function getLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var foodType = $(".input-field")
      .children(":selected")
      .attr("selected", true)
      .text();
    var resultNum = parseInt(
      $(".limit").children(":selected").attr("selected", true).val()
    );
    console.log(resultNum);
    var yelpAPIKey =
      "4DBMEQnFM1zFlRsPVpLfOamUM4QoayMJttYa14Sn5PXAnv-CiaSNe833S5RwHFiPcYiEMtKT1HSIczMSHNAyegAlqNpZn7Rc6MWsdc4GSvxzEfS5aDw804BuBRGqXnYx";

    var yelpQueryURL =
      "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&limit=" +
      resultNum +
      "&term=" +
      foodType;

    $.ajax({
      url: yelpQueryURL,
      method: "GET",
      headers: {
        Authorization: "Bearer " + yelpAPIKey,
      },
    }).then(function (response) {
      var result = response.businesses;

      console.log(result);
      for (var i = 0; i < result.length; i++) {
        var rating = Math.floor(result[i].rating);
        // var ratingImg;

        switch (rating) {
          case 0:
            console.log("-0");
            break;
          case 1:
            console.log("-1");
            break;
          case 2:
            console.log("-2");
            break;
          case 3:
            console.log("-3");
            break;
          case 4:
            console.log("-4");
            break;
          case 5:
            console.log("-5");
            break;
          default:
            break;
        }

        var newDiv = $("<div>").addClass("col s12 m3");
        var cardDiv = $("<div>").addClass("card");
        var contentDiv = $("<div>").addClass("card-content");

        var nameH3 = $("<h3>").text(result[i].name);
        var img = $("<img/>")
          .attr("src", result[i].image_url)
          .addClass("card-image responsive-img")
          .attr({
            style: "padding: 5px 10px 5px 10px",
          });
        var price = $("<p>").text("Price: " + result[i].price);
        var rating = $("<p>").text("Rating: " + result[i].rating);
        var address = $("<p>").text(
          "Address: " + result[i].location.display_address.join(" ")
        );
        var link = $("<a>")
          .text("Learn More")
          .attr("href", result[i].url)
          .addClass("waves-effect waves-light btn");
        var breakEl = $("<br />");

        contentDiv.append(img, nameH3, price, rating, address, breakEl, link);
        cardDiv.append(contentDiv);
        newDiv.append(cardDiv);

        $(".restaurant-results").append(newDiv);
      }
    });
  }
}

// function appendRestaurants(response) {
//   console.log("this is running");
//   for (var i = 0; i < response.length; i++) {
//     console.log(response.businesses[i].name);
//     console.log(response.businesses[i].image_url);
//     console.log(response.businesses[i].price);
//     console.log(response.businesses[i].rating);
//     console.log(response.businesses[i].location);
//   }
// }
