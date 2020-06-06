function getCuisine() {
    var e = document.getElementById("cuisine");
    var result = e.options[e.selectedIndex].text;
    var recipesNum = document.getElementById("recipesNum");
    var pullNum = recipesNum.options[recipesNum.selectedIndex].text;

    $(".recipes-results").empty()

    $.ajax({
        url: "https://api.spoonacular.com/recipes/search?apiKey=f8990570b1cb4139919e3cfa23f3c241&number=" + pullNum + "&cuisine=" + result,

        success: function (APIdata) {
            console.log(pullNum)

            if (pullNum >= 3) {
                $(".recipes-section").attr("style", "height:auto")
            }

            APIdata.results.forEach(function (recipe) {
                $.ajax({
                    url: "https://api.spoonacular.com/recipes/" + recipe.id + "/information?apiKey=f8990570b1cb4139919e3cfa23f3c241&number=1",
                    success: function (recipeInfo) {
                        var newRow = $("<div>").addClass("row card").attr("style", "padding-top:5px")
                        var imgCol = $("<div>").addClass("col s12 m12 l4")
                        var contentCol = $("<div>").addClass("col s12 m12 l8")
                        var image = $("<img>").attr("src", APIdata.baseUri + recipe.image).attr("height", "300px").attr("width", "300px").attr("style", "padding-top:60px")
                        var title = $("<h5>").text(recipe.title)
                        var URL = $("<a>").attr("href", recipe.sourceUrl).attr("target", "_blank").text("Click Here to View the Recipe")
                        var instructions = "<p>" + recipeInfo.summary + "</p>";
                        imgCol.append(image)
                        contentCol.prepend(title, instructions, URL)
                        $(".recipes-results").append(newRow.prepend(imgCol, contentCol))
                    }
                });
            })
        }
    })
}