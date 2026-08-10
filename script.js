const menuButton = document.querySelector(".hamBurgerMenu");
const navList = document.querySelector(".navList");
const navLinks = document.querySelectorAll(".nav");
const categoryButtons = document.querySelectorAll(".category");
const productCards = document.querySelectorAll(".productCard");
const searchBox = document.querySelector("#searchBox");

menuButton.addEventListener("click", function(){
    navList.classList.toggle("menuOpen");
    menuButton.textContent = navList.classList.contains("menuOpen") ? "✕" : "☰";
})
navLinks.forEach(function(link){

    link.addEventListener("click", function(){

        navList.classList.remove("menuOpen");
        menuButton.textContent = "☰";

    });

});
document.addEventListener("click", function (event) {
    if (!event.target.closest(".navBar")) {navList.classList.remove("menuOpen");
        menuButton.textContent = "☰";
    }
});

categoryButtons.forEach(function(button){

    button.addEventListener("click", function(){

        categoryButtons.forEach(function(category){
            category.classList.remove("activeCategory");
        });

        button.classList.add("activeCategory");

        const selectedCategory = button.dataset.category;

        productCards.forEach(function(card){

            const productCategory = card.dataset.category;

            if(selectedCategory === "all" || selectedCategory === productCategory){
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }

        });

    });

});

searchBox.addEventListener("input", function(){
    const searchTerm = searchBox.value.toLowerCase();
    productCards.forEach(function(card){

        const productName = card.querySelector("h3").textContent.toLowerCase();

        if(productName.includes(searchTerm)){
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }

    });

});
