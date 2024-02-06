// Animate Data Target

const animateStats = () => {
    document.addEventListener("DOMContentLoaded", () => {
        const statsSection = document.querySelector(".cs-grid-4-data-target");
        const config = {
        rootMargin: "0px",
        threshold: 0.5,
        };

        let hasRun = sessionStorage.getItem("statsAnimationDone");

        const observer = new IntersectionObserver(function (entries, self) {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !hasRun) {
            animateNumbers();
            sessionStorage.setItem("statsAnimationDone", "true");
            }
        });
        }, config);

        observer.observe(statsSection);
    });

    // Reset the sessionStorage item when the user leaves the page
    window.addEventListener("beforeunload", () => {
        sessionStorage.removeItem("statsAnimationDone");
    });
};
  
function animateNumbers() {
const counters = document.querySelectorAll('.cs-grid-4-data-target h4');

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace('+', '');
        const increment = target / 200; 

        if (count < target) {
            counter.innerText = '+' + Math.ceil(count + increment);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = '+' + target;
        }
    };

    updateCount();
});
}

animateStats();