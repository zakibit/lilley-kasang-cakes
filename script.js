const menuButton = document.querySelector(".hamBurgerMenu");
const navList = document.querySelector(".navList");
const navLinks = document.querySelectorAll(".nav");
console.log(menuButton);
menuButton.addEventListener("click", function(){
    navList.classList.toggle("menuOpen");
    menuButton.textContent = navList.classList.contains("menuOpen") ? "✕" : "☰";
})
navLinks.forEach(function(link){

    link.addEventListener("click", function(){

        navList.classList.remove("openMenu");
        menuButton.textContent = "☰";

    });

});