// // Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCPazKr5_ubtL8F9Gbong0AahLPwPFk4uA",
  authDomain: "time-ngo.firebaseapp.com",
  projectId: "time-ngo",
  storageBucket: "time-ngo.appspot.com",
  messagingSenderId: "287411013881",
  appId: "1:287411013881:web:fafe3c3b88343f31d2ba28",
  measurementId: "G-LW6JNM7NQ6",
  databaseURL: "https://time-ngo-default-rtdb.europe-west1.firebasedatabase.app"
};



// Back to top btn
const backToTopBtn = document.getElementById('back-to-top-btn');
// Function to scroll to the top of the page
function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: "smooth" // Smooth scroll animation
  });
}
// Add a click event listener to the button
backToTopBtn.addEventListener("click", scrollToTop);

// ================================================================

// side menu for mobile view
const menuButton = document.querySelector("#mobile-nav-menu-btn");
const navMenu = document.querySelector("#nav-list");
const body = document.querySelector("body");

menuButton.addEventListener("click", function () {
  event.preventDefault(); // prevent default form submission behavior
  // navMenu.classList.toggle("open"); // open side menu
//   body.style.overflow = "hidden"; // prevent scrolling
});

// closeButton.addEventListener("click", function () {
//   event.preventDefault(); // prevent default form submission behavior
//   navMenu.classList.remove("open"); // close side menu
// //   body.style.overflow = "auto"; // allow scrolling
// });

// // JavaScript for handling tap event on mobile
// document.addEventListener('DOMContentLoaded', function () {
//   const cards = document.querySelectorAll('.sect.cs-grid-3-hover-box .card');
//   cards.forEach(card => {
//       card.addEventListener('click', function () {
//           // Toggle 'active' class on the clicked card
//           this.classList.toggle('active');
//       });
//   });
// });

// JavaScript for handling tap event on mobile
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.sect.cs-grid-3-hover-box .card');
  cards.forEach(card => {
      card.addEventListener('click', function () {
          // Toggle 'active' class on the clicked card
          this.classList.toggle('active');
      });

      // Add event listener to child hover-text to stop event propagation
      const hoverText = card.querySelector('.hover-text');
      hoverText.addEventListener('click', function (event) {
          event.stopPropagation(); // Prevent event from bubbling up to parent card
      });
  });

  // Remove 'active' class when clicking anywhere on the document
  document.addEventListener('click', function (event) {
      cards.forEach(card => {
          if (!card.contains(event.target)) {
              card.classList.remove('active');
          }
      });
  });
});