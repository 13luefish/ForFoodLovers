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
      console.log(response);
    });
  }
}
