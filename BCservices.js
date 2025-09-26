// Author: Alberto Gonzalez
// Started:  03/06/2025
// Updated:  09/26/2025
// Filename: BCservices.js

// All service content (titles, descriptions, images, videos)
const MEDIA = {
  veh: {
    title: "Suspension & Vehicle Parts",
    desc: "One-off or small-batch parts for suspension and vehicle builds: brackets, tabs, gussets, mounts, and more.",
    images: ["img/VEH/VEH1.jpg","img/VEH/VEH2.jpg","img/VEH/VEH3.jpg","img/VEH/VEH4.jpg","img/VEH/VEH5.jpg","img/VEH/VEH6.jpg"],
    videos: [],
  },
  fab: {
    title: "Fabrication & Welding",
    desc: "Custom fabrication, repairs, and clean welds with attention to fitment and finish.",
    images: ["img/FAB/FAB1.jpg","img/FAB/FAB2.jpg","img/FAB/FAB3.jpg","img/FAB/FAB4.jpg","img/FAB/FAB5.jpg","img/FAB/FAB6.jpg","img/FAB/FAB7.jpg","img/FAB/FAB8.jpg","img/FAB/FAB9.jpg","img/FAB/FAB10.jpg","img/FAB/FAB11.jpg","img/FAB/FAB13.jpg","img/FAB/FAB14.jpg"],
    videos: ["img/FAB/FAB12.MP4"],
  },
  cnc: {
    title: "CNC & Machining Services",
    desc: "Precision CNC cutting/machining for parts, signage, and small production runs.",
    images: ["img/CNC/CNC1.jpg","img/CNC/CNC2.jpg","img/CNC/CNC3.jpg","img/CNC/CNC4.jpg","img/CNC/CNC5.jpg","img/CNC/CNC6.jpg"],
    videos: [],
  },
};

// Grab DOM elements
const descEl = document.getElementById("serviceDescription");
const galleryEl = document.getElementById("serviceGallery");
const tabButtons = document.querySelectorAll(".svc-tabs .svc-card");

// Lightbox state
let lb, lbImg, lbPrev, lbNext, lbClose;
let lbIdx = 0;
let lbSources = [];
let lastFocused = null;

// Create the lightbox overlay once
function ensureLightbox() {
  if (lb) return;

  lb = document.createElement("div");
  lb.className = "lb";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-hidden", "true");
  lb.innerHTML = `
    <div class="lb__bg" data-close="1"></div>
    <figure class="lb__box">
      <button class="lb__close" type="button" aria-label="Close (Esc)" data-close="1">×</button>
      <img class="lb__img" alt="Full view">
      <figcaption class="lb__cap" hidden></figcaption>
      <button class="lb__nav lb__prev" aria-label="Previous" data-prev="1">‹</button>
      <button class="lb__nav lb__next" aria-label="Next" data-next="1">›</button>
    </figure>
  `;
  document.body.appendChild(lb);

  lbImg   = lb.querySelector(".lb__img");
  lbPrev  = lb.querySelector(".lb__prev");
  lbNext  = lb.querySelector(".lb__next");
  lbClose = lb.querySelector(".lb__close");

  // Handle clicks inside overlay
  lb.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-close")) return hideLB();
    if (e.target.hasAttribute("data-prev")) return step(-1);
    if (e.target.hasAttribute("data-next")) return step(1);
  });

  // Keyboard controls
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") hideLB();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}

// Open the lightbox at given index
function openLB(index) {
  if (!lbSources.length) return;
  lastFocused = document.activeElement;

  showLB(index);
  lb.classList.add("is-open");
  lb.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  lbClose.focus();
}

// Show image at given index
function showLB(i) {
  lbIdx = (i + lbSources.length) % lbSources.length;
  lbImg.src = lbSources[lbIdx];
}

// Hide the lightbox
function hideLB() {
  lb.classList.remove("is-open");
  lb.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  lbImg.removeAttribute("src");

  if (lastFocused && typeof lastFocused.focus === "function") {
    lastFocused.focus();
  }
}

// Move forward/backward
function step(delta) {
  showLB(lbIdx + delta);
}

// Fill the gallery for the chosen service
function renderService(key) {
  const payload = MEDIA[key];
  if (!payload) return;

  descEl.textContent = payload.desc;
  lbSources = [...payload.images];

  const html = [];

  payload.images.forEach((src, i) => {
    html.push(`
      <figure>
        <img src="${src}" alt="${payload.title} image ${i + 1}" loading="lazy" data-idx="${i}" tabindex="0">
      </figure>
    `);
  });

  payload.videos.forEach((src) => {
    html.push(`
      <figure>
        <video controls preload="metadata">
          <source src="${src}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </figure>
    `);
  });

  galleryEl.innerHTML = html.join("");
}

// Highlight active tab
function setActive(btn) {
  tabButtons.forEach(b => {
    const on = b === btn;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-selected", on ? "true" : "false");
  });
}

// Tab button clicks
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    setActive(btn);
    renderService(btn.dataset.key);
  });
});

// Open gallery image with click or Enter/Space
galleryEl.addEventListener("click", (e) => {
  const img = e.target.closest("img[data-idx]");
  if (!img) return;
  ensureLightbox();
  openLB(parseInt(img.dataset.idx, 10));
});
galleryEl.addEventListener("keydown", (e) => {
  const img = e.target.closest("img[data-idx]");
  if (!img) return;
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    ensureLightbox();
    openLB(parseInt(img.dataset.idx, 10));
  }
});

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  ensureLightbox();
  descEl.textContent = "Select a service above to see photos.";
  galleryEl.innerHTML = "";
});
