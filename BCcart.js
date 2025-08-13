// Author: Alberto Gonzalez
// Start Date:   03/11/2025

// Filename: BCcart.js

// Item Class to manage each product
class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        this.quantity = 0;
    }

    setQuantity(qty) {
        this.quantity = qty;
    }

    getTotal() {
        return this.quantity * this.price;
    }

    toString() {
        return `${this.name} x${this.quantity}`;
    }
}

// Cart Class to manage cart items
class Cart {
    constructor() {
        this.items = {
            firepit: new Item('Firepit', 250),
            jigsawFirepit: new Item('Jigsaw Firepit', 300),
            wallArt: new Item('Wall Art', 150)
        };
    }

    addToCart(itemName) {
        const qty = parseInt(document.getElementById(`${itemName}Qty`).value);
        if (qty > 0) {
            this.items[itemName].setQuantity(qty);
        } else {
            this.items[itemName].setQuantity(0); // Remove item if qty is zero
        }
        this.updateCart();
    }

    updateCart() {
        let total = 0;
        let cartDetails = [];

        for (let key in this.items) {
            if (this.items[key].quantity > 0) {
                total += this.items[key].getTotal();
                cartDetails.push(this.items[key].toString());
            }
        }

        document.getElementById("cartTotal").innerText = `Total Price: $${total}`;
        document.getElementById("cartDetails").innerText = cartDetails.length
            ? `Items: ${cartDetails.join(', ')}`
            : 'No items in cart.';
    }
}

// Create cart instance
const cart = new Cart();

// Add-to-cart function
function addToCart(itemName) {
    cart.addToCart(itemName);
}
