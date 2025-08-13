// Author: Alberto Gonzalez
// Date:   03/06/2025

// Filename: BCcommonorders.js

function calculateTotal() {
    // Prices for items
    const prices = {
        firepit: 250,
        jigsawFirepit: 300,
        wallArt: 150
    };
    
    let total = 0;
    let selectedItems = document.querySelectorAll('input[type=checkbox]:checked');
    
    selectedItems.forEach(item => {
        total += prices[item.value];
    });
    
    document.getElementById("totalPrice").innerText = "Total Price: $" + total;
}
