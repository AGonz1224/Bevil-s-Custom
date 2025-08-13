// Author: Alberto Gonzalez
// Date:   03/06/2025

// Filename: BCservices.js

function showServiceInfo() {
    const service = document.getElementById("serviceSelector").value;
    let serviceInfo = "";

    switch(service) {
        case "carports":
            serviceInfo = "We specialize in custom carports, designed to fit your space and style.";
            break;
        case "fences":
            serviceInfo = "Our custom fences are built for durability and aesthetic appeal.";
            break;
        case "ranchSigns":
            serviceInfo = "Get personalized ranch signs, crafted from high-quality metal.";
            break;
        case "carParts":
            serviceInfo = "We create custom car parts tailored to your needs and specifications.";
            break;
        default:
            serviceInfo = "Select a service to see more details.";
            break;
    }
    document.getElementById("serviceDescription").innerHTML = serviceInfo;
}
