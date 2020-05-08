// Defining Recipe ID for API call
//var recipeID; 
//var recipeElement
//var numberInput = $(".input-field").val()


// User selects cuisine

function getCuisine(event){

    var e= document.getElementById("cuisine");

    var result = e.options[e.selectedIndex].text;

    // User selects number of recipes from dropdown 

    var recipenumberDropdown= document.getElementById("numberofRecipes");

// User selected number of recipes

    var pullnumber = recipenumberDropdown.options[recipenumberDropdown.selectedIndex].text;

    // API calls to user selected cuisine to find recipes 

    $.ajax({
        url: "https://api.spoonacular.com/recipes/search?apiKey=f8990570b1cb4139919e3cfa23f3c241&number="+pullnumber+"&cuisine=" + result, 
    // On success, print user selections to div 
        success: function(APIdata){
            var outputcontainer= document.getElementById("output") ;
            outputcontainer.innerHTML= "";
           
            // 
            APIdata.results.forEach(function(recipe){

                $.ajax({
                    url: "https://api.spoonacular.com/recipes/"+recipe.id+"/information?apiKey=f8990570b1cb4139919e3cfa23f3c241&number=1", 

                    success: function (recipeinfo){
                        var title= recipe.title;
                        var image= recipe.image;
                        var outputtitle= "<h1>"+title+"</h1>";
                        var outputimage= "<img height=\"200\"src=\"" +APIdata.baseUri+recipe.image+"\"/>";
                        var instructions = recipeinfo.instructions;
                        var outputinstructions= "<p>"+instructions+"</p>";
                        var recipehtml= "<div class=\"row\"><div class=\"col s12 l4\"><div class=\"card-image\">"+outputimage+"<\/div><\/div><div class=\"col s12 l8\"><div class=\"card-content\">"+outputtitle+outputinstructions+"<\/div><\/div><\/div>" ;
                        outputcontainer.innerHTML+=recipehtml;

                        
                    }});

            })                

// Clear previous results when "get recipe" boton is selected 
            
        }
    

}
    )



}



