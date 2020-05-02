//when user clicks on a variable, saving recipe ID 
var recipeID;
var recipeElement
function getCuisine(event) {
    var e = document.getElementById("cuisine");
var result = e.options[e.selectedIndex].text;


    event.preventDefault();
    $.ajax({
        url: "https://api.spoonacular.com/recipes/search?apiKey=f8990570b1cb4139919e3cfa23f3c241&number=1&cuisine=" + result,
        
        success: function (res) {
            console.log (res.results[0])
            recipeID= res.results[0].id

           document.getElementById("output").innerHTML = "<h1 id=NameofRecipe>" + res.results[0].title + "</h1> <br> <img src=''" + res.baseUri + res.results[0].image + "'width='400'/> <br> ready in" + res.results[0].cusine + "cuisine";
           
           
            
        }
    }
    )
    

}



//this function pulls recipe instructions

function getRecipe(event) { 
    console.log (recipeID)
    
    event.preventDefault();
    $.ajax({
        url: "https://api.spoonacular.com/recipes/"+recipeID+"/information?apiKey=f8990570b1cb4139919e3cfa23f3c241&number=1", 
        success: function (res) {
            console.log (res)
            document.getElementById("instructions").innerHTML = "<p>"+ res.instructions+ "</p>"
        }
    }
   
        
    )
}
recipeElement= document.getElementById("output")
console.log (recipeElement)
recipeElement.onclick= getRecipe; 

//this function displays ingredients for recipes based on recipe ID

function getIngredients (event) {
    event.preventdefault();
    $.ajax({
        url: "https://api.spoonacular.com/recipes/"+recipeID+"/ingredientWidget.json",
        succss: function (res) {
            console.log (res)
            document.getElementById("ingredients").innerHTMl = "<p>"+ res.ingredients + "</p>"
        }
    })
}

recipeElement= document.getElementById("ingredients")
console.log (getIngredients)
getIngredients.onclick= getIngredients


