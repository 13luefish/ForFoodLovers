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
    console.log(foodType);
    var yelpAPIKey =
      "4DBMEQnFM1zFlRsPVpLfOamUM4QoayMJttYa14Sn5PXAnv-CiaSNe833S5RwHFiPcYiEMtKT1HSIczMSHNAyegAlqNpZn7Rc6MWsdc4GSvxzEfS5aDw804BuBRGqXnYx";

    var yelpQueryURL =
      "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&limit=5&term=" +
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
        var newDiv = $("<div>");

        var nameH1 = $("<h1>").text(result[i].name);
        var img = $("<img/>").attr("src", result[i].image_url);
        var price = $("<p>").text(result[i].price);
        var rating = $("<p>").text(result[i].rating);
        var address = $("<p>").text(
          result[i].location.display_address.join(" ")
        );
        var link = $("<a>").text("Learn More").attr("href", result[i].url);

        newDiv.append(nameH1, img, price, rating, address, link);

        $("#restaurants").append(newDiv);
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
