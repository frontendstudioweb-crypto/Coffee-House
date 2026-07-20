/**
 * AURA CAFÉ EXECUTIVE ADMINISTRATIVE DASHBOARD CORE DRIVER
 * Architecture: Pure Vanilla JS / No jQuery Dependency
 * Year: 2026
 */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Dashboard Processes
    initPreloader();
    initLiveClock();
    initCounterAnimations();
    initAnalyticsCharts();
    initInteractiveToDo();
    initScrollToTop();
    initThemeToggle();
    initFullscreenSystem();
    initRealtimeFiltering();
});

/**
 * Destroys loading screen and activates smooth entrance animations
 */
function initPreloader() {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
        });
        // Safety execution fallback line
        setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
        }, 800);
    }
}

/**
 * Drives the real-time operational dashboard clock display
 */
function initLiveClock() {
    const clockElement = document.getElementById("liveClock");
    if (!clockElement) return;

    setInterval(() => {
        const now = new Date();
        clockElement.textContent = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    }, 1000);
}

/**
 * Triggers clean numeric incremental counter calculations for top cards
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll(".text-counter");
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const speed = target / 50; // Dynamic scaling speed matrix

        const updateCount = () => {
            const current = +counter.innerText.replace(/,/g, '');
            if (current < target) {
                counter.innerText = Math.ceil(current + speed).toLocaleString();
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    });
}

/**
 * Compiles and mounts complex graphical charts via Chart.js layout configs
 */
function initAnalyticsCharts() {
    // Global Configuration Overrides for Premium Theme Palette
    Chart.defaults.color = '#A9A9A9';
    Chart.defaults.font.family = "'Poppins', sans-serif";

    // 1. Dual Metric Line & Bar Chart Combo (Revenue & Orders)
    const ctxRevenue = document.getElementById('revenueOrdersChart');
    if (ctxRevenue) {
        new Chart(ctxRevenue, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [
                    {
                        label: 'Revenue ($)',
                        data: [8200, 9400, 11000, 10200, 13500, 12800, 14850],
                        borderColor: '#D4AF37',
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Orders Processed',
                        type: 'bar',
                        data: [95, 120, 140, 110, 174, 160, 184],
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        hoverBackgroundColor: '#ffffff',
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { boxWidth: 12 } }
                },
                scales: {
                    y: { type: 'linear', position: 'left', grid: { color: 'rgba(255,255,255,0.04)' } },
                    y1: { type: 'linear', position: 'right', grid: { display: false } },
                    x: { grid: { color: 'rgba(255,255,255,0.04)' } }
                }
            }
        });
    }

    // 2. High-End Pie Mix Selection Chart (Coffee Sales distribution)
    const ctxCoffee = document.getElementById('coffeeSalesChart');
    if (ctxCoffee) {
        new Chart(ctxCoffee, {
            type: 'pie',
            data: {
                labels: ['Truffle Brew', 'Siphon Draft', 'Espresso Stout', 'Nitro Gold'],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: [
                        '#D4AF37',
                        '#1E1814',
                        '#A9A9A9',
                        '#B89026'
                    ],
                    borderWidth: 2,
                    borderColor: '#17110D'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { padding: 15, boxWidth: 10 } }
                }
            }
        });
    }
}

/**
 * Handles interactive luxury shift-task additions and management
 */
function initInteractiveToDo() {
    const input = document.getElementById("todoInput");
    const btn = document.getElementById("addToDoBtn");
    const container = document.getElementById("todoContainer");

    if (!btn || !container) return;

    const addTask = () => {
        const text = input.value.trim();
        if (!text) return;

        const uniqueId = "todo_" + Date.now();
        const li = document.createElement("li");
        li.className = "list-group-item bg-transparent text-white px-0 d-flex justify-content-between align-items-center border-secondary-custom fade-in-up";
        li.innerHTML = `
            <div class="form-check m-0">
                <input class="form-check-input custom-checkbox-gold" type="checkbox" id="${uniqueId}">
                <label class="form-check-label small" for="${uniqueId}">${text}</label>
            </div>
        `;
        container.appendChild(li);
        input.value = "";
        showToast("New operational task added.");
    };

    btn.addEventListener("click", addTask);
    input.addEventListener("keypress", (e) => { if (e.key === "Enter") addTask(); });
}

/**
 * Manages the toast system alerts cleanly across the lifecycle
 */
function showToast(message) {
    const toastEl = document.getElementById("actionToast");
    const msgEl = document.getElementById("toastMessage");
    if (toastEl && msgEl) {
        msgEl.textContent = message;
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
}

/**
 * Simulate professional table export conversions
 */
function exportData(tableName, format) {
    showToast(`Exporting operational dataset [${tableName}] to high-fidelity ${format} format...`);
}

/**
 * Drives Scroll-to-Top behaviors smoothly
 */
function initScrollToTop() {
    const btn = document.getElementById("btnScrollTop");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            btn.style.display = "flex";
        } else {
            btn.style.display = "none";
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/**
 * Toggles a simulated high-fidelity light/dark theme environment
 */
function initThemeToggle() {
    const toggleBtn = document.getElementById("themeToggle");
    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
        const currentTheme = document.body.getAttribute("data-theme");
        if (currentTheme === "light") {
            document.body.removeAttribute("data-theme");
            toggleBtn.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
            showToast("Switched to Ultra Dark Premium Theme Environment.");
        } else {
            document.body.setAttribute("data-theme", "light");
            toggleBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
            showToast("Switched to Soft Clean Light Contrast Theme.");
        }
    });
}

/**
 * Native request management for native dashboard application display optimization
 */
function initFullscreenSystem() {
    const toggle = document.getElementById("fullscreenToggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
                .then(() => showToast("Fullscreen mode enabled."))
                .catch(err => showToast("Error initializing fullscreen canvas environment."));
        } else {
            document.exitFullscreen();
        }
    });
}

/**
 * Instantly handles high speed search field character matching logic
 */
function initRealtimeFiltering() {
    const search = document.getElementById("dashboardSearch");
    if (!search) return;

    search.addEventListener("keyup", (e) => {
        const query = e.target.value.toLowerCase();
        const rows = document.querySelectorAll("table tbody tr");

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query) ? "" : "none";
        });
    });
}