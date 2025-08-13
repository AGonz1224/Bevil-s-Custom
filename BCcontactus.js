// Author: Alberto Gonzalez
// Date:   03/10/2025

// Filename: BCservices.js

function validateForm(event) {
    event.preventDefault(); // Prevent form submission
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let service = document.getElementById("service").value;
    let businessType = document.querySelector('input[name="businessType"]:checked');
    let errorDiv = document.getElementById("errorMessages");
    errorDiv.innerHTML = "";
    let errors = [];

    try {
        if (name.trim() === "") throw "Name is required.";
        if (email.trim() === "") throw "Email is required.";
        if (!email.includes("@") || !email.includes(".")) throw "Invalid email format.";
        if (service === "") throw "Please select a service.";
        if (!businessType) throw "Please select a business type.";
        if (message.trim() === "") throw "Message cannot be empty.";
        if (message.length < 20) throw "Message must be at least 20 characters long.";
    } catch (err) {
        errors.push(err);
    }

    if (errors.length > 0) {
        errors.forEach(error => {
            let errorMsg = document.createElement("p");
            errorMsg.style.color = "red";
            errorMsg.textContent = error;
            errorDiv.appendChild(errorMsg);
        });
    } else {
        document.getElementById("contactForm").submit();
    }
}

