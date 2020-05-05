// Example for using local storage:
// you and your team should modify this to fit your use case
// include on all pages that need the search history feature

let searchHistory = [
    // Figure out a data format that fits your needs...
    // (this is just example data, should not actually be used.)
    { kind: "Recipes", search: "Chinese", },
    { kind: "Recipes", search: "Italian", },
    { kind: "Restaurants", search: "Ramen", }
]

// Load saved search history when the page loads
// There may or may not be any search history saved
if (localStorage["searchHistory"]) {
    // if there is .... load it
    searchHistory = JSON.parse(localStorage["searchHistory"]);
} else {
    // if there is nothing, start with an empty history.
    searchHistory = []
}

// Use this function to save the history 
// any time you make changes to it.
function saveSearchHistory() {
    // local storage can only store strings
    // so first we turn the array into a string
    const json = JSON.stringify(searchHistory);
    // Then we set that into local storage
    localStorage["searchHistory"] = json;
}

// Usage:
// say a user selects a search query and then click the 
// button to search 
// at that point, an object (like the example one) 
// could be added to the search history 
// `searchHistory.push({ /*...*/ });`
// and then the history could be saved with 
// `saveSearchHistory();`



