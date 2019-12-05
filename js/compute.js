
var member;
$(document).ready(function () {
    getDefaultRecipe();
    $('button').on('click', () => {
        var newMember = $('#members').val();
        if(newMember != "") {
            updateRecipe();
            member = newMember;
        }
        
    })
});
function getDefaultRecipe() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => defaultRecipe(data),
        error: () => getError(),
    });
}
function updateRecipe() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => getRecipe(data),
        error: () => getError(),
    });
}
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

function getError() { console.log("Error") }

function getRecipe(myData) {
    var result = "";
    myData.recipes.forEach( recipe => {
        updateIngredient(recipe.ingredients);
        result += `
            <tr>
                <td><img src="${recipe.iconUrl}" width="100"></td>
                <td>${recipe.name}</td>
                <td>${recipe.nbGuests * addMember(member)}</td>
            </tr>
        `;
    });
    printOut("recipe",result);
}

function defaultRecipe(myData) {
    var result = "";
    myData.recipes.forEach( recipe => {
        defaultIngredient(recipe.ingredients);
        result += `
            <tr>
                <td><img src="${recipe.iconUrl}" width="100"></td>
                <td>${recipe.name}</td>
                <td>${recipe.nbGuests}</td>
            </tr>
        `;
    });
    printOut("recipe",result);
}

function defaultIngredient(ing) {
    result = "";
    ing.forEach(item => {
        result += `
            <tr>
                <td><img src="${item.iconUrl}" width="100"></td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.unit[0]}</td>
            </tr>
        `;
    });
    printOut('ingredient', result);  
}

function updateIngredient(ing) {
    result = "";
    ing.forEach(item => {
        result += `
            <tr>
                <td><img src="${item.iconUrl}" width="100"></td>
                <td>${item.name}</td>
                <td>${item.quantity * addMember(member)}</td>
                <td>${item.unit[0]}</td>
            </tr>
        `;
    });
    printOut('ingredient', result);  
}

function printOut(elmentId, out) {
    $('#' + elmentId).html(out);
}

function addMember(member) {
    return  parseInt(member);
}
