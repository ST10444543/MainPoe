// Function to load cart items from local storage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Clear existing items

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is currently empty.</p>';
        document.getElementById('order-button').style.display = 'none'; // Hide the order button if empty
        document.getElementById('track-button').style.display = 'none'; // Hide the track button if empty
    } else {
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';

            const img = document.createElement('img');
            img.src = item.image; // Use the image URL stored in cart
            img.alt = item.name;
            img.className = 'cart-item-image';

            const details = document.createElement('div');
            details.className = 'cart-item-details';
            details.textContent = `${item.name} - R${item.price}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeFromCart(index); // Remove item from cart
            
            details.appendChild(removeButton);
            itemElement.appendChild(img);
            itemElement.appendChild(details);
            cartContainer.appendChild(itemElement);
        });
        document.getElementById('order-button').style.display = 'block'; // Show the order button
        document.getElementById('track-button').style.display = 'block'; // Show the track button
    }
}

// Function to handle adding a product to the cart with image
function addToCart(productName, productPrice, productImage) {
    // Get existing cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Add new product to cart
    cart.push({ name: productName, price: productPrice, image: productImage });
    // Save updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart!`);
}

// Function to handle placing an order
function placeOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!"); // Notify if cart is empty
        return;
    }

    // Here you would handle order processing (e.g., API call)
    alert("Your order has been placed!");

    // Optionally clear the cart after placing the order
    localStorage.removeItem('cart');

    // Immediately track the order
    trackOrder();
}

// Function to handle tracking an order
function trackOrder() {
    alert("Tracking your order..."); // Placeholder for tracking logic
    // You can implement further logic to fetch and display tracking information.
}

// Function to remove an item from the cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    loadCart(); // Reload cart items
}

// Load cart items when the page is loaded
window.onload = loadCart;
