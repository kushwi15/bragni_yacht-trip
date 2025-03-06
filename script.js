// ========================
//         HOME PAGE
// ========================

document.addEventListener("DOMContentLoaded", function () {
    const sliderContainer = document.querySelector(".slider-container");
    const images = document.querySelectorAll(".gallery-img");
    const leftArrow = document.querySelector(".arrow.left");
    const rightArrow = document.querySelector(".arrow.right");

    let index = 0;
    const visibleImages = 3;
    const imageWidth = images[0].offsetWidth + 15; // Including margin-right

    rightArrow.addEventListener("click", function () {
        if (index < images.length - visibleImages) {
            index++;
        } else {
            index = 0; // Loop back to start
        }
        updateSlider();
    });

    leftArrow.addEventListener("click", function () {
        if (index > 0) {
            index--;
        } else {
            index = images.length - visibleImages; // Loop back to end
        }
        updateSlider();
    });

    function updateSlider() {
        sliderContainer.style.transform = `translateX(-${index * imageWidth}px)`;
    }
});

// ========================
//         STATS PAGE
// ========================
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const statsSection = document.querySelector(".stats-section"); // Update with the actual class or ID of your stats section
    let started = false; // Flag to prevent multiple triggers

    const startCounting = () => {
        if (started) return; // Prevent multiple triggers
        started = true;

        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            let count = 0;
            const increment = target / 100;

            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target;
                }
            };

            updateCounter();
        });
    };

    // Intersection Observer to detect when the section is visible
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            startCounting();
        }
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    observer.observe(statsSection);
});


// ========================
//         NEAREST TRIP PAGE
// ========================


document.addEventListener("DOMContentLoaded", function () {
    const tripsContainer = document.querySelector(".trips-container");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const pageNumber = document.querySelector(".page-number");
    const dotsContainer = document.querySelector(".dots-container");
    let dots = [];

    let tripsPerPage;
    let totalTrips = document.querySelectorAll(".trip-card").length;
    let totalPages;
    let currentIndex = 0;

    function updateTripsPerPage() {
        if (window.innerWidth <= 768) {
            tripsPerPage = 1;
        } else if (window.innerWidth <= 1024) {
            tripsPerPage = 2;
        } else {
            tripsPerPage = 3;
        }
        totalPages = Math.ceil(totalTrips / tripsPerPage);
        createDots();
        updateSlider();
    }

    function createDots() {
        dotsContainer.innerHTML = "";
        dots = [];
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                currentIndex = i * tripsPerPage;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
            dots.push(dot);
        }
    }

    function updateSlider() {
        const offset = currentIndex * -(100 / tripsPerPage);
        tripsContainer.style.transform = `translateX(${offset}%)`;

        // Calculate current page number
        let currentPage = Math.floor(currentIndex / tripsPerPage) + 1;
        pageNumber.textContent = `${currentPage} / ${totalPages}`;

        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentPage - 1);
        });
    }

    nextBtn.addEventListener("click", function () {
        if (currentIndex + tripsPerPage < totalTrips) {
            currentIndex += tripsPerPage;
            if (currentIndex >= totalTrips) currentIndex = totalTrips - tripsPerPage;
            updateSlider();
        }
    });

    prevBtn.addEventListener("click", function () {
        if (currentIndex - tripsPerPage >= 0) {
            currentIndex -= tripsPerPage;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    });

    window.addEventListener("resize", updateTripsPerPage);
    updateTripsPerPage();
});

// ========================
//         VIDEO TOUR PAGE
// ========================

function playVideo() {
    document.querySelector('.video-thumbnail').style.display = 'none';
    const video = document.getElementById('video');
    video.style.display = 'block';
    video.play();
}