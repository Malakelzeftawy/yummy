// loading screen 
jQuery(function(){
    $(".loading").fadeOut(4000, function(){
        $("body").css({overflow : "auto"});
    });
});

// open and close side-bar 
function openSideBar() {
    $(".side-bar").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}
function closeSideBar() {
    let boxWidth = $(".side-bar .content").outerWidth()
    $(".side-bar").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links ul li").animate({
        top: 300
    }, 700)
}

closeSideBar()
$(".side-bar i.open-close-icon").click(() => {
    if ($(".side-bar").css("left") == "0px") {
        closeSideBar()
    } else {
        openSideBar()
    }
})


// home function 
let homeSection = document.querySelector("#home");
let rowHome = document.querySelector("#home .row");
async function getMeals(){
    let respone = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef`);
    let data = await respone.json()
    let final = data.meals.slice(0,20)
    displayMeals(final);
}
function displayMeals(arr){
    let container ="";
    for(var i=0; i<arr.length; i++){
        container += `
        <div class="col-md-3">
        <div onclick="getDetails('${arr[i].idMeal}')" class="item position-relative overflow-hidden">
            <img src="${arr[i].strMealThumb}" class="w-100">
            <div class="layer bg-white bg-opacity-75 position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
                <h3 class="text-capitalize">${arr[i].strMeal}</h3>
            </div>
        </div>
    </div>
        `
    }
    rowHome.innerHTML = container;
}
getMeals()



// search functions 
let rowsearch = document.querySelector("#search .row-search");
let searchLink = document.querySelector(".links .search");
let searchSection = document.querySelector("#search");
let rowSearchResult = document.querySelector("#search .row-result")

searchLink.addEventListener("click" , function(){
    searchSection.classList.remove("d-none");
    categorySection.classList.add("d-none");
    homeSection.classList.add("d-none");
    areaSection.classList.add("d-none");
    ingradientsSection.classList.add("d-none");
    contactSection.classList.add("d-none");
})
async function searchByName(name){
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let data = await response.json();
    let final = data.meals;
    displaySearchMeal(final)
}
async function searchByLetter(letter){
    let respone = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let data = await respone.json();
    let final = data.meals;
    displaySearchMeal(final)
}
function displaySearchMeal(arr){
    let container ="";
    for(var i=0; i<arr.length; i++){
        container += `
        <div class="col-md-3">
        <div onclick="getSearchDetails('${arr[i].idMeal}')"  class="item position-relative overflow-hidden">
            <img src="${arr[i].strMealThumb}" class="w-100">
            <div class="layer bg-white bg-opacity-75 position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
                <h3 class="text-capitalize">${arr[i].strMeal}</h3>
            </div>
        </div>
    </div>
        `
    }
    rowSearchResult.innerHTML = container;
}
async function getSearchDetails(mealID){
    $(".loading").fadeIn(400);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    let data = await response.json();
    let final = data.meals[0]
    displaySearchDetails(final);
    $(".loading").fadeOut(400);
}
function displaySearchDetails(meal){
    rowSearchResult.innerHTML = ""
    let ingredients = "";

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let container =`
    <div class="col-md-4 ">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2 class="text-white">${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                     ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
    `;
    rowSearchResult.innerHTML = container
}


// category functions 
let rowCategory = document.querySelector("#category .row");
let categoryLink = document.querySelector(".links .category");
let categorySection = document.querySelector("#category");
categoryLink.addEventListener("click" , function(){
    categorySection.classList.remove("d-none");
    homeSection.classList.add("d-none");
    areaSection.classList.add("d-none");
    ingradientsSection.classList.add("d-none");
    contactSection.classList.add("d-none");
    searchSection.classList.add("d-none");
})

async function getCategories(){
    $(".loading").fadeIn(400)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let data = await response.json();
    let final = data.categories
    displayCategories(final)
    $(".loading").fadeOut(400)    

}
function displayCategories(final){
    let container = "";
    for(let i=0; i<final.length; i++){
        container += `
        <div class="col-md-3">
        <div onclick="getCategoryMeals('${final[i].strCategory}')" class="item position-relative overflow-hidden">
            <img src="${final[i].strCategoryThumb}" class="w-100">
            <div class="layer bg-white bg-opacity-75 position-absolute w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                <h3 class="text-capitalize">${final[i].strCategory}</h3>
                <p class="text-center fs-6">${final[i].strCategoryDescription.split(" ").slice(0,15).join(" ")}</p>
            </div>
        </div>
    </div>
        `
    }   
    rowCategory.innerHTML = container;
}
async function getCategoryMeals(category){
    $(".loading").fadeIn(400)
    let respone = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let data = await respone.json()
    displayCategoryMeals(data.meals.slice(0,20));
    $(".loading").fadeOut(400)
}
function displayCategoryMeals(arr){
    let container ="";
    for(var i=0; i<arr.length; i++){
        container += `
        <div class="col-md-3">
        <div onclick="getDetails('${arr[i].idMeal}')" class="item position-relative overflow-hidden">
            <img src="${arr[i].strMealThumb}" class="w-100">
            <div class="layer bg-white bg-opacity-75 position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
                <h3 class="text-capitalize">${arr[i].strMeal}</h3>
            </div>
        </div>
    </div>
        `
    } 
    rowCategory.innerHTML = container;
}


// Area functions 
let rowArea = document.querySelector("#area .row");
let areaLink = document.querySelector(".links .area");
let areaSection = document.querySelector("#area");

areaLink.addEventListener("click", function(){
    areaSection.classList.remove("d-none");
    homeSection.classList.add("d-none");
    categorySection.classList.add("d-none");
    ingradientsSection.classList.add("d-none");
    contactSection.classList.add("d-none");
    searchSection.classList.add("d-none");
})

async function getArea(){
    $(".loading").fadeIn(400)
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let data = await respone.json();
    let final = data.meals;
    displayArae(final);
    $(".loading").fadeOut(400);

}
function displayArae(final){
    let container = "";
    for (var i=0; i<final.length; i++){
        container += `
        <div class="col-md-3">
                    <div onclick="getAreaMeals('${final[i].strArea}')" class="item text-white d-flex justify-content-center align-items-center flex-column">
                        <i class="fa-solid fa-house-laptop fa-5x"></i>
                        <h3 class="fs-1">${final[i].strArea}</h3>
                    </div>
                </div>
        `
    }
    rowArea.innerHTML = container
}
async function getAreaMeals(area){
    $(".loading").fadeIn(400);
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let data =await respone.json();
    displayAreaMeals(data.meals.slice(0, 20))
    $(".loading").fadeOut(400);

}
function displayAreaMeals(arr){
    let container ="";
    for(var i=0; i< arr.length; i++){
        container += `
        <div class="col-md-3">
        <div onclick="getDetails('${arr[i].idMeal}')" class="item position-relative overflow-hidden">
            <img src="${arr[i].strMealThumb}" class="w-100">
            <div class="layer bg-white bg-opacity-75 position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
                <h3 class="text-capitalize">${arr[i].strMeal}</h3>
            </div>
        </div>
    </div>
        `
        rowArea.innerHTML = container;
    }

}

// ingradients functions 

let rowigradients = document.querySelector("#ingradients .row");
let ingradientsLink = document.querySelector(".links .ingradients");
let ingradientsSection = document.querySelector("#ingradients");

ingradientsLink.addEventListener("click" , function(){
    ingradientsSection.classList.remove("d-none");
    homeSection.classList.add("d-none");
    areaSection.classList.add("d-none");
    categorySection.classList.add("d-none");
    contactSection.classList.add("d-none");
    searchSection.classList.add("d-none");
})

async function getIngradients(){
    $(".loading").fadeIn(400);
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let data = await respone.json();
    let final = data.meals.slice(0,20);
    displayIngradients(final)
    $(".loading").fadeOut(400);
}
function displayIngradients(final){
    let container ="";
    for(var i=0;i<final.length;i++){
        container +=`
        <div class="col-md-3">
                    <div onclick="getIngradientsMeals('${final[i].strIngredient}')" class="item p-2 d-flex  flex-column justify-content-center align-items-center text-white">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h5 class="mt-3">${final[i].strIngredient}</h5>
                    <p class="text-center">${final[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        `
    }
    rowigradients.innerHTML = container;
}
async function getIngradientsMeals(ingredients){
    $(".loading").fadeIn(400);
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    let data = await respone.json()
    displayIngradientsMeals(data.meals.slice(0,20));
    $(".loading").fadeOut(400);
}
function displayIngradientsMeals(arr){
    let container = "";
    for(var i=0; i<arr.length; i++){
        container += `
        <div class="col-md-3">
        <div onclick="getDetails('${arr[i].idMeal}')" class="item position-relative overflow-hidden">
            <img src="${arr[i].strMealThumb}" class="w-100">
            <div class="layer bg-white bg-opacity-75 position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
                <h3 class="text-capitalize">${arr[i].strMeal}</h3>
            </div>
        </div>
    </div>
        `
    }
    rowigradients.innerHTML = container;
}


// show datails 

async function getDetails(mealID){
    $(".loading").fadeIn(400);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    let data = await response.json();
    let final = data.meals[0]
    displayDetails(final);
    $(".loading").fadeOut(400);
}
function displayDetails(meal){
    rowHome.innerHTML ="";
    rowCategory.innerHTML = "";
    rowArea.innerHTML = "";
    rowigradients.innerHTML = "";
    let ingredients = "";

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let container =`
    <div class="col-md-4 ">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2 class="text-white">${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                     ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
    `;
    rowHome.innerHTML = container;
    rowCategory.innerHTML = container;
    rowArea.innerHTML = container;
    rowigradients.innerHTML = container;
}



// contact functions 
let contactLink = document.querySelector(".links .contact");
let contactSection = document.querySelector("#contact");
let rowContact = document.querySelector("#contact .row");

contactLink.addEventListener("click", function(){
    contactSection.classList.remove("d-none");
    homeSection.classList.add("d-none");
    categorySection.classList.add("d-none");
    areaSection.classList.add("d-none");
    ingradientsSection.classList.add("d-none");
    searchSection.classList.add("d-none");
})


function showContact(){
    rowContact.innerHTML= `
    <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
            <button disabled class="submit btn btn-outline-danger px-2 mt-3">Submit</button>

    `

    submitBtn = document.querySelector(".submit");
    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })                
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }

}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}