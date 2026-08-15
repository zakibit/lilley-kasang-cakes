const menuButton = document.querySelector(".hamBurgerMenu");
const navList = document.querySelector(".navList");
const navLinks = document.querySelectorAll(".nav");
const categoryButtons = document.querySelectorAll(".category");
const productCards = document.querySelectorAll(".productCard");
const searchBox = document.querySelector("#searchBox");
const cartButtons = document.querySelectorAll(".addToCart");

let cart = [];

if (menuButton && navList) {

    menuButton.addEventListener("click", function(){

        navList.classList.toggle("menuOpen");

        menuButton.textContent =
            navList.classList.contains("menuOpen")
            ? "✕"
            : "☰";

    });

}

navLinks.forEach(function(link){

    link.addEventListener("click", function(){

        if (navList) {
            navList.classList.remove("menuOpen");
        }

        if (menuButton) {
            menuButton.textContent = "☰";
        }

    });

});

document.addEventListener("click", function(event){

    if (!event.target.closest(".navBar")) {

        if (navList) {
            navList.classList.remove("menuOpen");
        }

        if (menuButton) {
            menuButton.textContent = "☰";
        }

    }

});

let selectedCategory = "all";

function filterProducts(){

    const searchTerm = searchBox.value.toLowerCase().trim();

    productCards.forEach(function(card){

        const productCategory = card.dataset.category;

        const productName =
            card.querySelector("h3").textContent
            .toLowerCase()
            .trim();

        const matchesCategory =
            selectedCategory === "all" ||
            selectedCategory === productCategory;

        const matchesSearch =
            productName.includes(searchTerm);

        if (matchesCategory && matchesSearch) {

            card.classList.remove("hidden");

        } else {

            card.classList.add("hidden");

        }

    });

}

categoryButtons.forEach(function(button){

    button.addEventListener("click", function(){

        categoryButtons.forEach(function(category){

            category.classList.remove("activeCategory");

        });

        button.classList.add("activeCategory");

        selectedCategory = button.dataset.category;

        filterProducts();

    });

});

if (searchBox) {

    searchBox.addEventListener("input", function(){

        filterProducts();

    });

}

cartButtons.forEach(function(button){

    button.addEventListener("click", function(){

        const productCard = button.closest(".productCard");
        const productId = productCard.dataset.id;
        const productName = productCard.querySelector("h3").textContent;
        const productPrice = productCard.querySelector(".productPrice").textContent;
        const product = {

            id: productId,

            name: productName,

            price: productPrice,

            quantity: 1

        };

        const existingProduct =
            cart.find(function(item){

                return item.id === productId;

            });

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push(product);

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        console.log(cart);

    });

});

const orderList = document.querySelector("#orderList");
const cartTotal = document.querySelector("#cartTotal");
if (orderList) {

    const savedCart = localStorage.getItem("cart");
    const orders =
        savedCart
        ? JSON.parse(savedCart) : [];
    let total = 0;

orders.forEach(function(item){

    const itemTotal = parseInt(item.price.replace(/[₦,]/g, "")) * item.quantity;
    total += itemTotal;
});
cartTotal.innerHTML = `<h3>Total: ₦${total.toLocaleString()}</h3>`;
    console.log(orders);
    console.log(total);
function calculateTotal(){

    let total = 0;

    orders.forEach(function(item){

        const itemTotal =
            parseInt(item.price.replace(/[₦,]/g, "")) * item.quantity;

        total += itemTotal;

    });

    cartTotal.innerHTML = `<h3>Total: ₦${total.toLocaleString()}</h3>`;
}
if (orders.length === 0) {
    orderList.innerHTML = ` <p class="emptyCart">Your cart is empty.</p>`;

}
    orders.forEach(function(item){
        const orderItem = document.createElement("div");
        orderItem.classList.add("orderItem");
        orderItem.innerHTML = `<h3>${item.name}</h3><p>${item.price}</p><div class="quantityControls">
        <button class="decreaseQuantity">−</button>
        <span>${item.quantity}</span>
        <button class="increaseQuantity">+</button>
    </div><button class="removeItem">Remove</button>`;
    const decreaseButton = orderItem.querySelector(".decreaseQuantity");
    const increaseButton = orderItem.querySelector(".increaseQuantity");
    increaseButton.addEventListener("click", function(){
    item.quantity++;
});
decreaseButton.addEventListener("click", function(){
    item.quantity--;
});
        orderList.appendChild(orderItem);
        calculateTotal();
    const removeButton = orderItem.querySelector(".removeItem");
    removeButton.addEventListener("click", function(){
   const itemIndex = orders.indexOf(item);
   orders.splice(itemIndex, 1); 
   localStorage.setItem("cart", JSON.stringify(orders));
   orderItem.remove();
   if (orders.length === 0) {
    orderList.innerHTML = `<p class="emptyCart">Your cart is empty.</p>   `;
}
   calculateTotal();
});
    });

}