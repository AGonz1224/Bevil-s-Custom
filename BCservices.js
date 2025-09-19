// Author: Alberto Gonzalez
// Started:  03/06/2025
// Updated: 09/19/2025
// Filename: BCcontactus.js

const MEDIA = {
  veh: {
    title: "Suspension & Vehicle Parts",
    desc:
      "One-off or small-batch parts for suspension and vehicle builds: brackets, tabs, gussets, mounts, and more.",
    images: [
      "img/VEH/VEH1.jpg","img/VEH/VEH2.jpg","img/VEH/VEH3.jpg",
      "img/VEH/VEH4.jpg","img/VEH/VEH5.jpg","img/VEH/VEH6.jpg",
    ],
    videos: [],
  },
  fab: {
    title: "Fabrication & Welding",
    desc:
      "Custom fabrication, repairs, and clean welds with attention to fitment and finish.",
    images: [
      "img/FAB/FAB1.jpg","img/FAB/FAB2.jpg","img/FAB/FAB3.jpg",
      "img/FAB/FAB4.jpg","img/FAB/FAB5.jpg","img/FAB/FAB6.jpg",
      "img/FAB/FAB7.jpg","img/FAB/FAB8.jpg","img/FAB/FAB9.jpg",
      "img/FAB/FAB10.jpg","img/FAB/FAB11.jpg","img/FAB/FAB13.jpg",
      "img/FAB/FAB14.jpg",
    ],
    videos: ["img/FAB/FAB12.MP4"],
  },
  cnc: {
    title: "CNC & Machining Services",
    desc:
      "Precision CNC cutting/machining for parts, signage, and small production runs.",
    images: [
      "img/CNC/CNC1.jpg","img/CNC/CNC2.jpg","img/CNC/CNC3.jpg",
      "img/CNC/CNC4.jpg","img/CNC/CNC5.jpg","img/CNC/CNC6.jpg",
    ],
    videos: [],
  },
};

// DOM
const descEl = document.getElementById("serviceDescription");
const galleryEl = document.getElementById("serviceGallery");
const tabButtons = document.querySelectorAll(".svc-tabs .svc-card");

// ===== Lightbox (super-simple) =====
let lb, lbImg, lbPrev, lbNext, lbIdx = 0, lbSources = [];

function ensureLightbox() {
  if (lb) return;

  // build minimal overlay
  lb = document.createElement("div");
  lb.className = "lb";
  lb.innerHTML = `
    <div class="lb__bg" data-close="1"></div>
    <figure class="lb__box">
      <img class="lb__img" alt="Full view">
      <figcaption class="lb__cap"></figcaption>
      <button class="lb__nav lb__prev" aria-label="Previous" data-prev="1">‹</button>
      <button class="lb__nav lb__next" aria-label="Next" data-next="1">›</button>
    </figure>
  `;
  document.body.appendChild(lb);

  lbImg  = lb.querySelector(".lb__img");
  lbPrev = lb.querySelector(".lb__prev");
  lbNext = lb.querySelector(".lb__next");

  // clicks
  lb.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-close")) return hideLB();
    if (e.target.hasAttribute("data-prev")) return step(-1);
    if (e.target.hasAttribute("data-next")) return step(1);
  });

  // keys
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") hideLB();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}

function showLB(i) {
  if (!lbSources.length) return;
  lbIdx = (i + lbSources.length) % lbSources.length;
  lbImg.src = lbSources[lbIdx];
  lb.classList.add("is-open");
}

function hideLB() {
  lb.classList.remove("is-open");
  lbImg.removeAttribute("src");
}

function step(delta) {
  showLB(lbIdx + delta);
}

// ===== Render =====
function renderService(key) {
  const payload = MEDIA[key];
  if (!payload) return;

  descEl.textContent = payload.desc;
  lbSources = [...payload.images];

  const html = [];

  payload.images.forEach((src, i) => {
    html.push(`
      <figure>
        <img src="${src}" alt="${payload.title} image ${i + 1}" loading="lazy" data-idx="${i}">
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

// active tab styling
function setActive(btn) {
  tabButtons.forEach(b => {
    const on = b === btn;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-selected", on ? "true" : "false");
  });
}

// tab clicks
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    setActive(btn);
    renderService(btn.dataset.key);
  });
});

// gallery click → open LB
galleryEl.addEventListener("click", (e) => {
  const img = e.target.closest("img[data-idx]");
  if (!img) return;
  ensureLightbox();
  const i = parseInt(img.getAttribute("data-idx"), 10) || 0;
  showLB(i);
});

// init
document.addEventListener("DOMContentLoaded", () => {
  ensureLightbox();
  descEl.textContent = "Select a service above to see photos.";
  galleryEl.innerHTML = "";
});
    