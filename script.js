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

        const productId =
            productCard.dataset.id;

        const productName =
            productCard.querySelector("h3").textContent;

        const productPrice =
            productCard.querySelector(".productPrice").textContent;

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


const orderList =
    document.querySelector("#orderList");

const cartTotal =
    document.querySelector("#cartTotal");


if (orderList) {

    const savedCart =
        localStorage.getItem("cart");

    const orders =
        savedCart
        ? JSON.parse(savedCart)
        : [];

    let total = 0;


    orders.forEach(function(item){

        const itemTotal =
            parseInt(
                item.price.replace(/[₦,]/g, "")
            ) * item.quantity;

        total += itemTotal;

    });


    cartTotal.innerHTML =
        `<h3>Total: ₦${total.toLocaleString()}</h3>`;


    console.log(orders);
    console.log(total);


    function calculateTotal(){

        let total = 0;

        orders.forEach(function(item){

            const itemTotal =
                parseInt(
                    item.price.replace(/[₦,]/g, "")
                ) * item.quantity;

            total += itemTotal;

        });

        cartTotal.innerHTML =
            `<h3>Total: ₦${total.toLocaleString()}</h3>`;

    }


    if (orders.length === 0) {

        orderList.innerHTML =
            `<p class="emptyCart">Your cart is empty.</p>`;

    }


    orders.forEach(function(item){

        const orderItem =
            document.createElement("div");

        orderItem.classList.add("orderItem");


        orderItem.innerHTML = `
            <h3>${item.name}</h3>

            <p>${item.price}</p>

            <div class="quantityControls">

                <button class="decreaseQuantity">
                    −
                </button>

                <span>${item.quantity}</span>

                <button class="increaseQuantity">
                    +
                </button>

            </div>

            <button class="removeItem">
                Remove
            </button>
        `;


        const decreaseButton =
            orderItem.querySelector(".decreaseQuantity");

        const increaseButton =
            orderItem.querySelector(".increaseQuantity");


        increaseButton.addEventListener("click", function(){

            item.quantity++;

            orderItem.querySelector("span").textContent =
                item.quantity;

            localStorage.setItem(
                "cart",
                JSON.stringify(orders)
            );

            calculateTotal();

        });


        decreaseButton.addEventListener("click", function(){

            if (item.quantity > 1) {

                item.quantity--;

                orderItem.querySelector("span").textContent =
                    item.quantity;

                localStorage.setItem(
                    "cart",
                    JSON.stringify(orders)
                );

                calculateTotal();

            }

        });


        orderList.appendChild(orderItem);

        calculateTotal();


        const removeButton =
            orderItem.querySelector(".removeItem");


        removeButton.addEventListener("click", function(){

            const itemIndex =
                orders.indexOf(item);

            orders.splice(itemIndex, 1);

            localStorage.setItem(
                "cart",
                JSON.stringify(orders)
            );

            orderItem.remove();


            if (orders.length === 0) {

                orderList.innerHTML =
                    `<p class="emptyCart">Your cart is empty.</p>`;

            }

            calculateTotal();

        });

    });

}


const loginForm =
    document.querySelector("#loginForm");

const emailInput =
    document.querySelector("#email");

const passwordInput =
    document.querySelector("#password");

const errorMessage =
    document.querySelector("#loginError");

const success =
    document.querySelector("#success");


const users = [

    {
        name: "Nathaniel",
        email: "Nathaniel@gmail.com",
        password: "123456"
    },

    {
        name: "Elisha",
        email: "Elisha@gmail.com",
        password: "asdfghjkl"
    },

    {
        name: "Kasang",
        email: "kasang@gmail.com",
        password: "kasang123"
    }

];


if (loginForm) {

    loginForm.addEventListener("submit", function(event){

        event.preventDefault();

        errorMessage.textContent = "";

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        const user =
            users.find(function(user){

                return user.email.toLowerCase() ===
                    email.toLowerCase();

            });


        if (!user) {

            errorMessage.textContent =
                "User not found.";

            return;

        }


        if (user.password !== password) {

            errorMessage.textContent =
                "Incorrect password.";

            return;

        }


        success.textContent =
            `Welcome ${user.name}!`;

    });

}

const sendWhatsAppBtn = document.querySelector("#sendWhatsAppBtn");
const orderModal = document.querySelector("#orderModal");
const modalOrderItems = document.querySelector("#modalOrderItems");
const modalOrderTotal = document.querySelector("#modalOrderTotal");
const closeModalBtn = document.querySelector("#closeModalBtn");
const confirmOrderBtn = document.querySelector("#confirmOrderBtn");

// Phone number (international format without + or spaces)
const phoneNumber = "2347081178816"; // Replace with your actual phone number

// 1. Show modal when user clicks "Send Order via WhatsApp"
if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener("click", function () {
        const savedCart = localStorage.getItem("cart");
        const orders = savedCart ? JSON.parse(savedCart) : [];

        if (orders.length === 0) {
            alert("Your cart is empty! Add items before ordering.");
            return;
        }

        modalOrderItems.innerHTML = "";
        let total = 0;

        orders.forEach(function (item) {
            const numericPrice = parseInt(item.price.replace(/[₦,]/g, ""));
            const itemTotal = numericPrice * item.quantity;
            total += itemTotal;

            const itemRow = document.createElement("div");
            itemRow.classList.add("modalItem");
            itemRow.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>₦${itemTotal.toLocaleString()}</span>
            `;
            modalOrderItems.appendChild(itemRow);
        });

        modalOrderTotal.textContent = `Total: ₦${total.toLocaleString()}`;
        orderModal.classList.remove("hidden");
    });
}

// 2. Hide modal when user clicks "Make Changes"
if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
        orderModal.classList.add("hidden");
    });
}

// 3. Confirm & redirect to WhatsApp
if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener("click", function () {
        const savedCart = localStorage.getItem("cart");
        const orders = savedCart ? JSON.parse(savedCart) : [];

        let message = "Hello! I would like to place an order:\n\n";
        let total = 0;

        orders.forEach(function (item, index) {
            const numericPrice = parseInt(item.price.replace(/[₦,]/g, ""));
            const itemTotal = numericPrice * item.quantity;
            total += itemTotal;

            message += `${index + 1}. *${item.name}*\n`;
            message += `   Quantity: ${item.quantity}\n`;
            message += `   Price: ${item.price}\n`;
            message += `   Subtotal: ₦${itemTotal.toLocaleString()}\n\n`;
        });

        message += `*Total Amount:* ₦${total.toLocaleString()}\n\n`;
        message += "Please let me know the delivery details and payment process!";

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        orderModal.classList.add("hidden");
        window.open(whatsappURL, "_blank");
    });
}