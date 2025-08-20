// Author: Alberto Gonzalez
// Date:   08/20/2025
// Filename: BCcontactus.js

document.addEventListener("DOMContentLoaded", () => {
    /* =========================
     *  FORM VALIDATION + FILES
     * ========================= */
    const form = document.getElementById("contactForm");
    const errorBox = document.getElementById("errorMessages");
    const successBox = document.getElementById("successMessage");
    const fileInput = document.getElementById("attachment");
    const fileList = document.getElementById("fileList");
  
    const emailOK = (val) => /^\S+@\S+\.\S+$/.test(val);
  
    // Show selected file names
    if (fileInput && fileList) {
      fileInput.addEventListener("change", () => {
        fileList.innerHTML = "";
        const files = Array.from(fileInput.files || []);
        if (files.length) {
          const list = document.createElement("ul");
          list.style.margin = "6px 0 0";
          files.forEach((f) => {
            const li = document.createElement("li");
            li.textContent = f.name;
            list.appendChild(li);
          });
          fileList.appendChild(list);
        }
      });
    }
  
    const showErrors = (arr) => {
      if (!errorBox) return;
      errorBox.innerHTML = arr.map((e) => `<p>• ${e}</p>`).join("");
      errorBox.style.display = arr.length ? "block" : "none";
      if (successBox) {
        successBox.textContent = "";
        successBox.style.display = "none";
      }
    };
  
    const showSuccess = (msg) => {
      if (successBox) {
        successBox.textContent = msg;
        successBox.style.display = "block";
      } else {
        alert(msg);
      }
      if (errorBox) errorBox.style.display = "none";
    };
  
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = form.name?.value.trim() || "";
      const email = form.email?.value.trim() || "";
      const service = form.service?.value.trim() || "";
      const businessType = form.querySelector('input[name="businessType"]:checked');
      const message = form.message?.value.trim() || "";
  
      const errs = [];
      if (!name) errs.push("Name is required.");
      if (!email) errs.push("Email is required.");
      else if (!emailOK(email)) errs.push("Please enter a valid email address.");
      if (!service) errs.push("Please select a service.");
      if (!businessType) errs.push("Please choose a business type.");
      if (!message) errs.push("Message cannot be empty.");
      else if (message.length < 20) errs.push("Message must be at least 20 characters long.");
  
      if (errs.length) {
        showErrors(errs);
        return;
      }
  
      showErrors([]);
      showSuccess("✅ Thank you! Your message has been sent successfully.");
      form.reset();
      if (fileList) fileList.innerHTML = "";
    });
  
    /* =========================
     *           MAP
     * ========================= */
    const shopCoords = [26.3043942, -98.2499959];
    const addressText = "10701 N Ware Rd, McAllen, TX 78504";
  
    const mapEl = document.getElementById("map");
    if (mapEl && window.L) {
      const map = L.map("map").setView(shopCoords, 15);
  
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);
  
      // Marker with **no directions link**
      const popupHTML = `
        <b>Bevil's Custom Fabrication</b><br>
        ${addressText}
      `;
      const bizMarker = L.marker(shopCoords).addTo(map).bindPopup(popupHTML).openPopup();
  
      const geoStatus = document.getElementById("geo-status");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const userLatLng = [pos.coords.latitude, pos.coords.longitude];
            const userMarker = L.marker(userLatLng).addTo(map).bindPopup("📍 You are here");
  
            const group = L.featureGroup([bizMarker, userMarker]);
            map.fitBounds(group.getBounds(), { padding: [30, 30] });
  
            if (geoStatus) geoStatus.textContent = "Your location is shown on the map.";
          },
          () => {
            if (geoStatus) geoStatus.textContent = "Location access denied. Only business location shown.";
            map.setView(shopCoords, 15);
          }
        );
      }
    }
  
    /* =========================
     *   DIRECTIONS BUTTON
     * ========================= */
    const directionsBtn = document.getElementById("directionsBtn");
    if (directionsBtn) {
      directionsBtn.addEventListener("click", (e) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          addressText
        )}`;
        window.open(url, "_blank");
        e.preventDefault();
      });
    }
  });
  