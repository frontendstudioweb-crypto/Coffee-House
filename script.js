/**
 * Aura Café Architecture Control Script
 * Pure Vanilla JS (ES6) - Zero Dependencies System
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Kill Preloader Element Frame
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
        });
    }

    // 1. Sticky Alpha Navbar Scroll Logic
    const navbar = document.querySelector(".main-navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Active Intersectional Navigation Link Highlights 
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // 3. Gallery / Menu Filtering Engine Block
    const filterButtons = document.querySelectorAll(".btn-filter");
    const menuItems = document.querySelectorAll(".menu-item-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Adjust Active Class Toggles
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const targetedCategory = btn.getAttribute("data-filter");

            menuItems.forEach(item => {
                const itemCategory = item.getAttribute("data-category");
                if (targetedCategory === "all" || itemCategory === targetedCategory) {
                    item.style.display = "block";
                    setTimeout(() => item.style.opacity = "1", 10);
                } else {
                    item.style.opacity = "0";
                    setTimeout(() => item.style.display = "none", 300);
                }
            });
        });
    });

    // 4. Custom Intersectional Scroll-Reveal Engine Configuration
    const revealTargets = document.querySelectorAll(".scroll-reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
                // Optional: stop un-observing element to allow persistent animation triggers
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealTargets.forEach(target => revealObserver.observe(target));

    // 5. Statistics Counter Metric Animation Module
    const counterElements = document.querySelectorAll(".counter");
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const targetedValue = parseInt(targetElement.getAttribute("data-target"), 10);
                animateCounter(targetElement, targetedValue);
                counterObserver.unobserve(targetElement);
            }
        });
    }, { threshold: 0.8 });

    counterElements.forEach(el => counterObserver.observe(el));

    function animateCounter(element, target) {
        let countStart = 0;
        const duration = 2000; // 2 seconds total duration window
        const intervals = Math.floor(duration / target);
        
        const counterTimer = setInterval(() => {
            countStart++;
            element.textContent = countStart + (element.getAttribute("data-target") === "100" ? "%" : "+");
            if (countStart >= target) {
                clearInterval(counterTimer);
                // Hard reset string definition formatting verification
                if(target === 100) element.textContent = "100%";
                if(target === 50) element.textContent = "50K";
                if(target === 15) element.textContent = "15+";
                if(target === 25) element.textContent = "25+";
            }
        }, Math.max(intervals, 15));
    }

    // 6. Back To Top Target Visibility Loop Logic
    const backToTopButton = document.getElementById("scrollToTopBtn");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            backToTopButton.style.display = "flex";
        } else {
            backToTopButton.style.display = "none";
        }
    });
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 7. Frontend Reservation Validation and Alert Trigger Architecture
    const reservationForm = document.getElementById("frontendReservationForm");
    const alertPlaceholder = document.getElementById("reservationAlertPlaceholder");

    if (reservationForm) {
        reservationForm.addEventListener("submit", (event) => {
            event.preventDefault();
            
            if (!reservationForm.checkValidity()) {
                event.stopPropagation();
                reservationForm.classList.add("was-validated");
                return;
            }

            // Capture context values safely
            const name = document.getElementById("resName").value;
            const date = document.getElementById("resDate").value;
            const time = document.getElementById("resTime").value;

            // Generate clean Bootstrap dismissible structural alert framework
            alertPlaceholder.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show border-0 text-dark bg-gold" role="alert" style="border-radius:12px;">
                    <i class="bi bi-check-circle-fill me-2"></i>
                    <strong>Reservation Confirmed!</strong> Exceptional choice, ${name}. Your table is provisionally locked for ${date} around ${time}.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            
            // Clean resetting sequences
            reservationForm.reset();
            reservationForm.classList.remove("was-validated");
        });
    }

    // 8. Newsletter Simple Toast Simulation Link
    const newsletter = document.getElementById("newsletterForm");
    if(newsletter) {
        newsletter.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Privilege Allocation Activated. Thank you for connecting with Aura Café.");
            newsletter.reset();
        });
    }
});

// 9. Global Modal Open Injection Layer
function openOrderModal(itemName, itemPrice) {
    document.getElementById("modalItemName").textContent = itemName;
    document.getElementById("modalItemPrice").textContent = itemPrice;
    
    const operationalModalElement = new bootstrap.Modal(document.getElementById('orderModal'));
    operationalModalElement.show();
}

function confirmOrderSubmit() {
    const activeModalInstance = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
    activeModalInstance.hide();
    
    // Quick success confirmation tracking
    alert("Artisan dispatch command routing successful. Your premium brew is being built.");
}