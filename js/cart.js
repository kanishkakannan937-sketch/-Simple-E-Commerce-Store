function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
    const cartContainer = document.getElementById("cart-container");
    const totalElement = document.getElementById("cart-total");

    if (!cartContainer) return;

    const cart = getCart();

    cartContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalElement.textContent = "Total: ₹0";
        return;
    }

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        cartContainer.innerHTML += `
            <div>
                <img src="${item.image}" width="100">

                <h3>${item.name}</h3>

                <p>Price: ₹${item.price}</p>

                <div>
                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span style="margin: 0 10px;">
                        ${item.quantity}
                    </span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>
                </div>

                <p>
                    Subtotal: ₹${itemTotal}
                </p>

                <button onclick="removeFromCart(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    totalElement.textContent = `Total: ₹${total}`;
}

function increaseQuantity(index) {

    const cart = getCart();
    const item = cart[index];

    if (item.quantity >= item.stock) {
        alert("Sorry, stock limit reached!");
        return;
    }

    item.quantity += 1;

    saveCart(cart);

    displayCart();
}

function decreaseQuantity(index) {

    const cart = getCart();

    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    saveCart(cart);

    displayCart();
}

function removeFromCart(index) {

    const cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);

    displayCart();
}

displayCart();