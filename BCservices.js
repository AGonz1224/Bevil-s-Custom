// Author: Alberto Gonzalez
// Updated: 08/20/2025
// Filename: BCservices.js

function showServiceInfo() {
    const service = document.getElementById("serviceSelector").value;
    let serviceInfo = "";
  
    switch (service) {
      case "fencesRanch":
        serviceInfo =
          "Strong, clean welds with alignment accuracy. Options for pipe, panel, and custom ranch signage, including powder coat finishes.";
        break;
  
      case "vehicleParts":
        serviceInfo =
          "One-off or small-batch vehicle parts: brackets, gussets, intake/exhaust components, and repair pieces in steel or aluminum.";
        break;
  
      case "metalArt":
        serviceInfo =
          "Custom wall art, ranch logos, and signage—CNC plasma or hand-crafted pieces with a variety of finishes.";
        break;
  
      default:
        serviceInfo = "Select a service to see more details.";
    }
  
    document.getElementById("serviceDescription").textContent = serviceInfo;
  }
  