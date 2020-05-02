

function getCuisine(event) {
    var e = document.getElementById("cuisine");
var result = e.options[e.selectedIndex].text;

    event.preventDefault();
    $.ajax({
        url: "https://api.spoonacular.com/recipes/search?apiKey=f8990570b1cb4139919e3cfa23f3c241&number=1&cuisine=" + result,
        success: function (res) {
           document.getElementById("output").innerHTML = "<h1>" + res.results[0].title + "</h1> <br> <img src=''" + res.baseUri + res.results[0].image + "'width='400'/> <br> ready in" + res.results[0].cusine + "cuisine";
           
            
        }
    }
    )
    
}







