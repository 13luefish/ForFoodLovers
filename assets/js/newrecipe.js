// User selects cuisine
function getCuisine() {
    var e = document.getElementById("cuisine");
    var result = e.options[e.selectedIndex].text;
    var recipenumberDropdown = document.getElementById("numberofRecipes");

    // User selected number of recipes
    var pullnumber = recipenumberDropdown.options[recipenumberDropdown.selectedIndex].text;

    $(".recipes-results").empty()

    // API calls to user selected cuisine to find recipes 
    $.ajax({
        url: "https://api.spoonacular.com/recipes/search?apiKey=f8990570b1cb4139919e3cfa23f3c241&number=" + pullnumber + "&cuisine=" + result,

        // On success, print user selections to div 
        success: function (APIdata) {
            console.log(pullnumber)
            // var outputcontainer = document.getElementById("output");
            // outputcontainer.innerHTML = "";

            if (pullnumber >= 3) {
                $(".recipes-section").attr("style", "height:auto")
            }

            APIdata.results.forEach(function (recipe) {
                $.ajax({
                    url: "https://api.spoonacular.com/recipes/" + recipe.id + "/information?apiKey=f8990570b1cb4139919e3cfa23f3c241&number=1",
                    success: function (recipeinfo) {
                        var newRow = $("<div>").addClass("row card").attr("style", "padding-top:5px")
                        var imgCol = $("<div>").addClass("col s12 m6 l4")
                        var contentCol = $("<div>").addClass("col s12 m6 l8").attr("style", "padding-top:20px")
                        var image = $("<img>").attr("src", APIdata.baseUri + recipe.image).attr("height", "350px").attr("width", "350px")
                        var title = $("<h5>").text(recipe.title)
                        var URL = $("<a>").attr("href", recipe.sourceUrl).attr("target", "_blank").text("Click Here to View the Recipe")
                        // var instructions = $("<p>").text(JSON.stringify(recipeinfo.summary));
                        var instructions = "<p>" + recipeinfo.summary + "</p>";
                        imgCol.append(image)
                        contentCol.prepend(title, instructions, URL)
                        $(".recipes-results").append(newRow.prepend(imgCol, contentCol))


                        // var title = recipe.title;
                        // console.log(recipe)
                        // console.log(recipeinfo)
                        // var outputtitle = "<h5>" + title + "</h5>";
                        // var outputimage = "<img height=\"250px\" width=250px src=\"" + APIdata.baseUri + recipe.image + "\"/>";
                        // var instructions = recipeinfo.summary;
                        // var outputinstructions = "<p>" + instructions + "</p>";

                        // var source = JSON.stringify(recipeinfo.sourceUrl)
                        // var sourceUrl = document.createElement("a").setAttribute("href", source)
                        // console.log(recipe.sourceUrl)
                        // var sourceUrl = $("<a>").attr("href", source).text("Click here to view the recipe")

                        // var recipehtml = "<div class=\"row\"><div class=\"col s12 l4\"><div class=\"card-image\">" + outputimage + "<\/div><\/div><div class=\"col s12 l8\"><div class=\"card-content\">" + outputtitle + outputinstructions + "<\/div><\/div><\/div>";
                        // outputcontainer.innerHTML += recipehtml;
                    }
                });
            })
        }
    })
}