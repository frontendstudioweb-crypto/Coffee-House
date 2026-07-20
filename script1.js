document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    const showLogin = document.getElementById("showLogin");
    const showRegister = document.getElementById("showRegister");

    const cardTitle = document.getElementById("cardTitle");
    const cardImage = document.getElementById("cardImage");

    // -----------------------------
    // Default
    // -----------------------------

    registerForm.style.display = "block";
    loginForm.style.display = "none";

    // -----------------------------
    // Switch to Login
    // -----------------------------

    showLogin.addEventListener("click", function (e) {

        e.preventDefault();

        registerForm.style.display = "none";

        loginForm.style.display = "block";

        loginForm.style.animation = "fade .5s";

        cardTitle.innerHTML = "Welcome Back";

        cardImage.src = "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80";

    });

    // -----------------------------
    // Switch to Register
    // -----------------------------

    showRegister.addEventListener("click", function (e) {

        e.preventDefault();

        loginForm.style.display = "none";

        registerForm.style.display = "block";

        registerForm.style.animation = "fade .5s";

        cardTitle.innerHTML = "Create Account";

        cardImage.src = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80";

    });

    // -----------------------------
    // Password Show Hide
    // -----------------------------

    const toggles = document.querySelectorAll(".toggle-password");

    toggles.forEach(function (button) {

        button.addEventListener("click", function () {

            const input = this.parentElement.querySelector(".password");

            const icon = this.querySelector("i");

            if (input.type === "password") {

                input.type = "text";

                icon.classList.remove("bi-eye");

                icon.classList.add("bi-eye-slash");

            }

            else {

                input.type = "password";

                icon.classList.remove("bi-eye-slash");

                icon.classList.add("bi-eye");

            }

        });

    });

    // -----------------------------
    // Register Validation
    // -----------------------------

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const username = document.getElementById("username").value.trim();

        const email = document.getElementById("regEmail").value.trim();

        const password = document.querySelector("#registerForm .password").value;

        const confirmPassword = document.querySelectorAll("#registerForm .password")[1].value;

        if (username === "") {

            alert("Please enter username.");

            return;

        }

        if (!validateEmail(email)) {

            alert("Please enter valid email.");

            return;

        }

        if (password.length < 8) {

            alert("Password must be at least 8 characters.");

            return;

        }

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        const button = this.querySelector(".btn-premium");

        loading(button);

        setTimeout(function () {

            reset(button, "Create Account");

            success("🎉 Account Created Successfully!");

            registerForm.reset();

        }, 1800);

    });

    // -----------------------------
    // Login Validation
    // -----------------------------

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();

        const password = document.querySelector("#loginForm .password").value;

        if (!validateEmail(email)) {

            alert("Please enter valid email.");

            return;

        }

        if (password === "") {

            alert("Please enter password.");

            return;

        }

        const button = this.querySelector(".btn-premium");

        loading(button);

        setTimeout(function () {

            reset(button, "Login");

            success("☕ Welcome Back!");

            loginForm.reset();

        }, 1500);

    });

});

// =====================================
// Email Validation
// =====================================

function validateEmail(email) {

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

// =====================================
// Loading Button
// =====================================

function loading(button) {

    button.disabled = true;

    button.innerHTML = `

        <span class="spinner-border spinner-border-sm me-2"></span>

        Loading...

    `;

}

// =====================================
// Reset Button
// =====================================

function reset(button, text) {

    button.disabled = false;

    button.innerHTML = text;

}

// =====================================
// Success Alert
// =====================================

function success(message) {

    const alert = document.createElement("div");

    alert.className =
        "alert alert-success position-fixed top-0 start-50 translate-middle-x mt-4 shadow";

    alert.style.zIndex = "9999";

    alert.style.minWidth = "320px";

    alert.innerHTML = message;

    document.body.appendChild(alert);

    setTimeout(function () {

        alert.remove();

    }, 3000);

}